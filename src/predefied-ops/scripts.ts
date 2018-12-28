import {exec, execSync} from "child_process";

export default abstract class ScriptOperations {
    public static execute(base: string, params: string[], output: boolean = false): Promise<boolean> {
        return new Promise((resolve) => {
            exec(`${base} ${params.join(" ")}`.trim(), (error: Error | null, out: string) => {
                if (output) {
                    console.log(out);
                }

                if (error !== null) {
                    resolve(false);

                    return;
                }

                resolve(true);
            });
        });
    }

    public static executeSync(base: string, params: string[], output: boolean = false): boolean {
        try {
            const out: string = execSync(`${base} ${params.join(" ")}`.trim()).toString();

            if (output) {
                console.log(out);
            }

            return true;
        }
        catch {
            return false;
        }
    }

    public static npm(name: string, output?: boolean): Promise<boolean> {
        return ScriptOperations.execute("npm", ["run-script", name], output);
    }

    public static npmSync(name: string, output?: boolean): boolean {
        return ScriptOperations.executeSync("npm", ["run-script", name], output);
    }

    public static npmStart(output?: boolean): Promise<boolean> {
        return ScriptOperations.execute("npm", ["start"], output);
    }

    public static npmTest(output?: boolean): Promise<boolean> {
        return ScriptOperations.execute("npm", ["test"], output);
    }

    public static npmTestSync(output?: boolean): boolean {
        return ScriptOperations.executeSync("npm", ["test"], output);
    }

    public static npmBuild(output?: boolean): Promise<boolean> {
        return ScriptOperations.npm("build", output);
    }

    public static npmBuildSync(output?: boolean): boolean {
        return ScriptOperations.npmSync("build", output);
    }

    public static npmInstall(output?: boolean): Promise<boolean> {
        return ScriptOperations.execute("npm", ["install"], output);
    }

    public static npmInstallSync(output?: boolean): boolean {
        return ScriptOperations.executeSync("npm", ["install"], output);
    }
}