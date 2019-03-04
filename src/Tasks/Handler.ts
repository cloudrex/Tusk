#!/usr/bin/env node

import colors from "colors";
import Task, {Tasks, ITask} from "./Task";
import ScriptOps from "../PredefinedOps/Script";

const args: string[] = process.argv.slice(2);
const taskName: string | undefined = args[0];

// Register default tasks.
Task("build", "Build the project", () => {
    ScriptOps.npmBuildSync(true);
});

Task("test", "Run tests", () => {
    ScriptOps.npmTestSync(true);
});

// Run 'npm start'.
if (taskName === undefined) {
    ScriptOps.npmStartSync(true);
}
// Run a specific task.
else if (Tasks.has(taskName)) {
    const task: ITask = Tasks.get(taskName)!;

    console.log(colors.gray(`0/${Tasks.size} ${colors.cyan(taskName)} ${colors.gray(task.description || "")}`));
    task.callback(args.slice(1));
}
// Otherwise, task does not exist.
else {
    console.log("That task does not exist");
}
