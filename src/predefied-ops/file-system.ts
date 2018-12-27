import fs from "fs";
import rimraf = require("rimraf");
import {execFile, execFileSync} from "child_process";

export default abstract class FileSystemOperations {
    public static moveSync(from: string, to: string): boolean {
        try {
            fs.renameSync(from, to);

            return true;
        }
        catch {
            return false;
        }
    }

    public static move(from: string, to: string): Promise<boolean> {
        return new Promise((resolve) => {
            fs.rename(from, to, (error: Error) => {
                if (error) {
                    resolve(false);

                    return;
                }

                resolve(true);
            });
        });
    }

    public static removeSync(path: string): boolean {
        try {
            fs.unlinkSync(path);
            return true;
        }
        catch {
            return false;
        }
    }

    public static remove(path: string): Promise<boolean> {
        return new Promise((resolve) => {
            fs.unlink(path, (error: Error) => {
                if (error) {
                    resolve(false);

                    return;
                }

                resolve(true);
            });
        });
    }

    public static forceRemove(path: string): Promise<boolean> {
        return new Promise((resolve) => {
            rimraf(path, (error: Error) => {
                if (error) {
                    resolve(false);

                    return;
                }

                resolve(true);
            });
        });
    }

    public static forceRemoveSync(path: string): boolean {
        try {
            rimraf.sync(path);

            return true;
        }
        catch {
            return false;
        }
    }

    public static copy(from: string, to: string): Promise<boolean> {
        return new Promise((resolve) => {
            fs.copyFile(from, to, (error: Error) => {
                if (error) {
                    resolve(false);

                    return;
                }

                resolve(true);
            });
        });
    }

    public static copySync(from: string, to: string): boolean {
        try {
            fs.copyFileSync(from, to);

            return true;
        }
        catch {
            return false;
        }
    }

    public static run(path: string): Promise<boolean> {
        return new Promise((resolve) => {
            execFile(path, (error: Error | null) => {
                if (error) {
                    resolve(false);

                    return;
                }

                resolve(true);
            });
        });
    }

    public static runSync(path: string): boolean {
        try {
            execFileSync(path);

            return true;
        }
        catch {
            return false;
        }
    }

    public static workingDir(path: string): boolean {
        try {
            process.chdir(path);

            return true;
        }
        catch {
            return false;
        }
    }

    public ensure(path: string): boolean {
        return fs.existsSync(path);
    }
}