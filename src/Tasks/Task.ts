import {IOp} from "./Op";

export const Tasks: Map<string, IOp[]> = new Map();

export type TaskDef = (name: string, desc: string | undefined, ops: IOp[]) => void;

const Task: TaskDef = (name: string, description: string | undefined, ops: IOp[]): void => {
    Tasks.set(name, ops);
};

export default Task;
