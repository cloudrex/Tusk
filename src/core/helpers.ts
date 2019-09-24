import GithubEvent from "./githubEvent";

export type PromiseOr<T> = Promise<T> | T;

/**
 * A callback invoked to execute a single operation.
 */
export type Operation = () => PromiseOr<boolean> | PromiseOr<void>;

/**
 * A queued operation.
 */
export interface ISavedOp {
    readonly operation: Operation;

    readonly regardless: boolean;
}

/**
 * The final process result.
 */
export enum RunState {
    OK,
    Failed
}

export type Action<T = void> = () => T;

export type GithubWebhookCallback<T> = (type: GithubEvent, body: T) => void;

export type WebhookCallback<T> = (body: T) => void;

export type ProgressCallback = (current: number, left: number, total: number, percentage: number) => void;
