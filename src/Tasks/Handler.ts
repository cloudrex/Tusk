#!/usr/bin/env node

import colors from "colors";
import ScriptOps from "../PredefinedOps/Script";
import Task, {Tasks} from "./Task";
import OpRunner from "./OpRunner";
import fs from "fs";
import path from "path";

const actionFileName: string = "ActionFile.js";

// Ensure ActionFile exists.
if (!fs.existsSync(actionFileName)) {
    console.log(colors.red("ActionFile.js not found"));
    process.exit(1);
}

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

// Inject globals.
(global as any).Task = Task;

// Import ActionFile.
require(path.resolve(path.join(".", actionFileName)));

// Begin processing arguments.
const args: string[] = process.argv.slice(2);
const taskName: string | undefined = args[0];

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
    console.log(colors.red("That task does not exist"));
}
