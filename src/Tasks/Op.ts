import {PromiseOr} from "../Core/Helpers";

export type Callback<T = void> = (...args: any[]) => T;

export type OpCallback = Callback<void | PromiseOr<boolean>>;

export interface IOp {
    readonly name: string;
    readonly description?: string;
    readonly callback: OpCallback;
};


