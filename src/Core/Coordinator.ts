import express from "express";
import bodyParser = require("body-parser");
import crypto from "crypto";
import {Server} from "http";
import TaskRunner, {IOperationResult} from "./TaskRunner";
import GithubEvent from "./GithubEvent";
import {WebhookCallback, Action, Operation, PromiseOr, ProgressCallback, GithubWebhookCallback, RunState, ISavedOp} from "./Helpers";

export interface ITaskResult {
    readonly state: RunState;
    readonly operations: number;
    readonly operationsCompleted: number;
    readonly time: number;
    readonly averageTime: number;
}

export interface ICoordinator {
    retry(times: number): this;
    then(operation: Operation, regardless: boolean): this;
    fallback(callback: Action): this;
    timeout(time: number): this;
    run(): PromiseOr<ITaskResult>;
    clear(): this;
    webhook<T extends object>(callback: WebhookCallback<T>, secret?: string, port?: number): number;
    clearWebhooks(): this;

    readonly running: boolean;
}

// TODO: Implement retry functionality
export class Coordinator implements ICoordinator {
    public static webhookPort: number = 52671;

    protected operations: ISavedOp[];
    protected isRunning: boolean;
    protected webhooks: Server[];
    protected retryTimes: number;
    protected fallbackCallback?: Action;
    protected timeoutTime: number;

    public constructor(...operations: Operation[]) {
        this.operations = operations !== undefined && Array.isArray(operations) ? operations.map((op: Operation): ISavedOp => {
            return {
                operation: op,
                regardless: false
            };
        }) : [];

        this.isRunning = false;
        this.webhooks = [];
        this.retryTimes = 0;
        this.timeoutTime = 30_000;
    }

    public retry(times: number): this {
        if (this.isRunning) {
            throw new Error("Cannot set retry times while running");
        }

        this.retryTimes = times;

        return this;
    }

    public then(operation: Operation, regardless: boolean = false): this {
        if (typeof operation !== "function") {
            throw new Error("Expecting operation to be a function");
        }
        else if (typeof regardless !== "boolean") {
            throw new Error("Expecting the regardless parameter to be a boolean");
        }

        if (this.isRunning) {
            throw new Error("Cannot append operation while running");
        }

        this.operations.push({
            operation,
            regardless
        });

        return this;
    }

    public get running(): boolean {
        return this.isRunning;
    }

    public fallback(callback: Action): this {
        if (typeof callback !== "function") {
            throw new Error("Expecting callback to be a function");
        }

        this.fallbackCallback = callback;

        return this;
    }

    public timeout(time: number): this {
        if (typeof time !== "number") {
            throw new Error("Expecting timeout time to be a number");
        }
        else if (time <= 0) {
            throw new Error("Expecting timeout time to be positive");
        }

        this.timeoutTime = time;

        return this;
    }

    // TOOD: Better report of why failed/completed
    public async run(callback?: ProgressCallback, clear: boolean = true): Promise<ITaskResult> {
        if (callback !== undefined && typeof callback !== "function") {
            throw new Error("Expecting callback to be a function");
        }
        else if (this.isRunning) {
            throw new Error("Cannot run; Already running");
        }

        this.isRunning = true;

        let completed: number = 0;

        const totalLength: number = this.operations.length;

        const pending: ITaskResult = {
            operations: totalLength,
            time: 0,
            averageTime: 0,
            operationsCompleted: 0,
            state: RunState.Failed
        };

        for (const savedOp of this.operations) {
            if (callback !== undefined) {
                callback(completed + 1, totalLength - (completed + 1), totalLength, Math.round(completed / totalLength * 100));
            }

            const result: IOperationResult = await TaskRunner.run(savedOp);

            if (result.value === false) {
                this.isRunning = false;

                if (clear) {
                    this.clear();
                }

                if (this.fallbackCallback) {
                    const fallback: Action = this.fallbackCallback;

                    this.fallbackCallback = undefined;
                    fallback();
                }

                // TODO: Should return final fallback result (if any fallback was set)
                return {
                    ...pending,
                    state: RunState.Failed,
                    operationsCompleted: completed,
                    averageTime: Math.round(pending.time / completed)
                };
            }

            // TODO: Read-only hotfix
            (pending.time as any) += result.time;
            completed++;
        }

        this.isRunning = false;

        if (clear) {
            this.clear();
        }

        return {
            ...pending,
            state: RunState.OK,
            operationsCompleted: completed,
            averageTime: Math.round(pending.time / completed)
        };
    }

    public clear(): this {
        if (this.isRunning) {
            throw new Error("Cannot clear operations while running");
        }

        this.operations.length = 0;
        this.retryTimes = 0;

        return this;
    }

    // TODO: Repeated usage of both functions's functionality, .webhook() and .githubWebhook(); Use a generic function
    /**
     * Create a webhook server. Content type must be set to application/json only.
     * @param {GithubWebhookCallback} callback The callback to invoke upon receiving a valid and authorized request
     * @param {string | undefined} secret A key that must be sent as authorization
     * @param {number} port The port that the webhook server will listen on
     */
    public webhook<T = object>(callback: WebhookCallback<T>, secret?: string, port: number = Coordinator.webhookPort++): number {
        // TODO: CRITICAL: Express throws errors (internal errors, 500) into the response stream!
        const app: express.Express = express();
        const shasum = crypto.createHash("sha1");

        let secretHash: string | null = null;

        if (secret !== undefined) {
            // Hash for future authentication
            shasum.update(secret);

            secretHash = shasum.digest("hex");
        }

        app.use(bodyParser.json());

        app.post("/", (req, res) => {
            const inputHash: string | undefined = req.header("authorization");

            if ((!inputHash && secretHash !== null) || inputHash !== secretHash) {
                res.status(401).end("Unauthorized");

                return;
            }

            res.status(200).end("OK");
            callback(req.body);
        });

        this.webhooks.push(app.listen(port));

        return port;
    }

    // TODO: Port may be constant, meaning that it does not ++ on each function call. Same for above. (.webhook())
    /**
     * Create a webhook server for GitHub events. Content type must be set to application/json only.
     * @param {string} secret The secret which must be sent as authorization
     * @param {GithubWebhookCallback} callback The callback to invoke upon valid request with authorization
     * @param {number} port The port that the webhook server will listen on
     * @return {number} The port that the webhook will listen on
     */
    public githubWebhook<T = object>(secret: string, callback: GithubWebhookCallback<T>, port: number = Coordinator.webhookPort++): number {
        // TODO: CRITICAL: Express throws errors (internal errors, 500) into the response stream!
        const app: express.Express = express();

        app.use(bodyParser.json());

        app.post("/github", (req, res) => {
            const inputHash: string | undefined = req.header("X-Hub-Signature");
            const event: GithubEvent | undefined = req.header("X-GitHub-Event") as GithubEvent | undefined;

            if (!inputHash || !event) {
                res.status(401).end("Unauthorized");

                return;
            }
            else {
                const shasum = crypto.createHmac("sha1", secret);

                // TODO: Inefficient, express should already contain a property like this
                shasum.update(JSON.stringify(req.body));

                const secretHash: string = shasum.digest("hex");

                if (!crypto.timingSafeEqual(Buffer.from(secretHash), Buffer.from(inputHash.substr(5)))) {
                    res.status(401).end("Unauthorized");

                    return;
                }
            }

            res.status(200).end("OK");
            callback(event, req.body);
        });

        this.webhooks.push(app.listen(port));

        return port;
    }

    public clearWebhooks(): this {
        for (let i: number = 0; i < this.webhooks.length; i++) {
            this.webhooks[i].close();
            this.webhooks.splice(i, 1);
        }

        return this;
    }
}
