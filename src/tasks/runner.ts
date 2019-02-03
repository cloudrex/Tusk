#!/usr/bin/env node

import {Tasks, Callback} from "./task";

console.log(process.argv);

const taskName: string = process.argv[3];

if (Tasks.has(taskName)) {
    // Run the task.
    (Tasks.get(taskName) as Callback)();
}
else {
    console.log("That task does not exist");
}
