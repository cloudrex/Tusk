import GithubEvent from "./GithubEvent";

export type PromiseOr<T> = Promise<T> | T;

export type Operation = () => PromiseOr<boolean> | PromiseOr<void>;

export interface ISavedOp {
    readonly operation: Operation;

    readonly regardless: boolean;
}

export enum RunState {
    OK,
    Failed
}

export type Action<T = void> = () => T;

export type GithubWebhookCallback<T> = (type: GithubEvent, body: T) => void;

export type WebhookCallback<T> = (body: T) => void;

export type ProgressCallback = (current: number, left: number, total: number, percentage: number) => void;
