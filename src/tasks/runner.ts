#!/usr/bin/env node

import {Tasks, Callback} from "./task";
import ScriptOps from "../predefied-ops/script";

const args: string[] = process.argv.slice(2);
const taskName: string | undefined = args[0];

// Register default tasks.
Tasks.set("build", () => {
    ScriptOps.npmBuildSync(true);
});

Tasks.set("test", () => {
    ScriptOps.npmTestSync(true);
});

// Run npm start.
if (taskName === undefined) {
    ScriptOps.npmStartSync(true);
}
else if (Tasks.has(taskName)) {
    // Run the task.
    (Tasks.get(taskName) as Callback)(args.slice(1));
}
else {
    console.log("That task does not exist");
}
