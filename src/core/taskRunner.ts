import {performance} from "perf_hooks";
import {PromiseOr, ISavedOp} from "./helpers";

export interface IOperationResult {
    readonly time: number;

    readonly value: boolean | void;
}

export default class TaskRunner {
    public static async run(savedOp: ISavedOp): Promise<IOperationResult> {
        // Start measuring time.
        const start: number = performance.now();

        let value: PromiseOr<boolean> | PromiseOr<void> = savedOp.regardless ? true : savedOp.operation();
        let time: number;

        // Await the callback if it's a promise.
        if (value instanceof Promise) {
            value = await value;
        }

        // Calculate the time it took to execute the operation.
        time = Math.round(performance.now() - start);

        return {
            time,
            value
        };
    }
}
