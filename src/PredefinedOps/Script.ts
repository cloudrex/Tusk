import {exec, execSync} from "child_process";

export default abstract class ScriptOps {
    public static execute(base: string, params: string[], output: boolean = false): Promise<boolean> {
        return new Promise((resolve) => {
            const joinParams: string = params !== undefined && Array.isArray(params) && params.length > 0 ? params.join(" ") : "";

            exec(`${base} ${joinParams}`.trim(), (error: Error | null, out: string) => {
                if (output && out) {
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
            const joinParams: string = params !== undefined && Array.isArray(params) && params.length > 0 ? params.join(" ") : "";
            const out: string = execSync(`${base} ${joinParams}`.trim()).toString();

            if (output && out) {
                console.log(out);
            }

            return true;
        }
        catch (error) {
            return false;
        }
    }

    public static npm(name: string, output?: boolean): Promise<boolean> {
        return ScriptOps.execute("npm", ["run-script", name], output);
    }

    public static npmSync(name: string, output?: boolean): boolean {
        return ScriptOps.executeSync("npm", ["run-script", name], output);
    }

    public static npmStart(output?: boolean): Promise<boolean> {
        return ScriptOps.execute("npm", ["start"], output);
    }

    public static npmStartSync(output?: boolean): boolean {
        return ScriptOps.executeSync("npm", ["start"], output);
    }

    public static npmTest(output?: boolean): Promise<boolean> {
        return ScriptOps.execute("npm", ["test"], output);
    }

    public static npmTestSync(output?: boolean): boolean {
        return ScriptOps.executeSync("npm", ["test"], output);
    }

    public static npmBuild(output?: boolean): Promise<boolean> {
        return ScriptOps.npm("build", output);
    }

    public static npmBuildSync(output?: boolean): boolean {
        return ScriptOps.npmSync("build", output);
    }

    public static npmInstall(output?: boolean): Promise<boolean> {
        return ScriptOps.execute("npm", ["install"], output);
    }

    public static npmInstallSync(output?: boolean): boolean {
        return ScriptOps.executeSync("npm", ["install"], output);
    }

    public static typescriptBuild(output?: boolean): Promise<boolean> {
        return ScriptOps.execute("tsc", [], output);
    }

    public static typescriptBuildSync(output?: boolean): boolean {
        return ScriptOps.executeSync("tsc", [], output);
    }
}
