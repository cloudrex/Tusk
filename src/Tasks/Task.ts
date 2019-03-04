export type Callback<T = void> = (...args: any[]) => T;

export const Tasks: Map<string, Callback> = new Map();

const Task = (name: string, callback: Callback): void => {
    Tasks.set(name, callback);
}

export default Task;
