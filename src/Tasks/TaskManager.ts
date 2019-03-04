import {ITask} from "./Task";
import colors from "colors";
import SpaceMachine from "./SpaceMachine";

export default class TaskManager {
    protected static readonly tasks: Map<string, ITask> = new Map();

    /**
     * Append a task to the task queue.
     */
    public static queue(task: ITask): void {
        TaskManager.tasks.set(task.name, task);
    }

    /**
     * Retrieve the task queue.
     */
    public static getQueue(): ReadonlyArray<ITask> {
        const tasks: ITask[] = [];

        for (const task of TaskManager.tasks.values()) {
            tasks.push(task);
        }

        return tasks;
    }

    /**
     * Determine if a task is registered.
     */
    public static hasTask(name: string): boolean {
        return this.tasks.has(name);
    }

    /**
     * Run all queued tasks.
     */
    public static async run(): Promise<void> {
        let counter: number = 1;

        for (const task of this.tasks.values()) {
            // Prepare styled entities.
            const progress: string = colors.gray(`${counter}/${this.tasks.size}`);
            const name: string = colors.cyan(task.name);

            const description: string = colors.gray(TaskManager.breakDescription(
                (counter.toString().length + this.tasks.size.toString().length + 1),
                task.name.length,
                task.description || "")
            );

            // Display task info.
            console.log(`  ${progress} ${name} ${description}`);

            // Execute the task and capture the result.
            const result: undefined | boolean = await task.callback() as undefined | boolean;

            // Task was successfully completed.
            if (result === undefined || result === true) {
                counter++;

                continue;
            }

            // Otherwise, the task failed.
            console.log(colors.red(`\n  Task '${task.name}' failed\n`));

            return;
        }

        console.log(colors.green(`\n  Process completed successfully\n`));
    }

    /**
     * Break up description with newlines using a threshold amount of characters.
     */
    protected static breakDescription(tasksLength: number, nameLength: number, description: string, threshold: number = 45): string {
        let result: string = "";
        let counter: number = 0;

        for (const char of description) {
            if (counter >= threshold) {
                // '+ 4' corresponds to 2 initial spaces and the counter-name-desc (3) separation spaces.
                result += "\n" + SpaceMachine.make(nameLength + tasksLength + 4);
                counter = 0;
            }
            else {
                counter++;
            }

            result += char;
        }

        return result.trim();
    }
}
