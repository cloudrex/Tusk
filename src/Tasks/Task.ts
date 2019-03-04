export type Callback<T = void> = (...args: any[]) => T;

export type TaskCallback = Callback<void | boolean>;

export interface ITask {
    readonly name: string;
    readonly description?: string;
    readonly callback: TaskCallback;
};

export const Tasks: Map<string, ITask> = new Map();

const Task = (name: string, description: string | undefined, callback: TaskCallback): void => {
    Tasks.set(name, {
        name,
        callback,
        description
    });
}

export default Task;
