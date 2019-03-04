#!/usr/bin/env node

import colors from "colors";
import ScriptOps from "../PredefinedOps/Script";
import Task, {Tasks} from "./Task";
import OpRunner from "./OpRunner";

const args: string[] = process.argv.slice(2);
const taskName: string | undefined = args[0];

// Register default tasks.
Task("build", "Build the project", [
    {
        name: "build",
        description: "Build the project",
        callback: ScriptOps.npmBuild
    }
]);

Task("test", "Run tests", [
    {
        name: "test",
        description: "Run tests",
        callback: ScriptOps.npmTest
    }
]);

// Run 'npm start'.
if (taskName === undefined) {
    ScriptOps.npmStartSync(true);
}
// List registered tasks.
else if (taskName === "list") {
    for (const task of Tasks.values()) {
        console.log(colors.cyan(task.name) + " " + colors.gray(task.desc || ""));
    }
}
// Run a specific task.
else if (Tasks.has(taskName)) {
    OpRunner.prepare(taskName);
    OpRunner.run();
}
// Otherwise, task does not exist.
else {
    console.log("That task does not exist");
}
