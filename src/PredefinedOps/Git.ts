import ScriptOps from "./Script";

export default abstract class GitOps {
    public static pull(): Promise<boolean> {
        return ScriptOps.execute("git", ["pull"]);
    }

    public static pullSync(): boolean {
        return ScriptOps.executeSync("git", ["pull"]);
    }

    public static push(): Promise<boolean> {
        return ScriptOps.execute("git", ["push"]);
    }

    public static pushSync(): boolean {
        return ScriptOps.executeSync("git", ["push"]);
    }

    public static merge(branch: string): Promise<boolean> {
        return ScriptOps.execute("git", ["merge", branch]);
    }

    public static mergeSync(branch: string): boolean {
        return ScriptOps.executeSync("git", ["merge", branch]);
    }

    public static branch(name: string): Promise<boolean> {
        return ScriptOps.execute("git", ["checkout", name]);
    }

    public static branchSync(name: string): boolean {
        return ScriptOps.executeSync("git", ["checkout", name]);
    }

    public add(items: string = "*"): Promise<boolean> {
        return ScriptOps.execute("git", ["add", items]);
    }

    public addSync(items: string = "*"): boolean {
        return ScriptOps.executeSync("git", ["add", items]);
    }

    public static commit(message: string): Promise<boolean> {
        return ScriptOps.execute("git", ["commit", "-m", message]);
    }

    public static commitSync(message: string): boolean {
        return ScriptOps.executeSync("git", ["commit", "-m", message]);
    }

    public static commitAll(message: string): Promise<boolean> {
        return ScriptOps.execute("git", ["commit", "-am", message]);
    }

    public static commitAllSync(message: string): boolean {
        return ScriptOps.executeSync("git", ["commit", "-am", message]);
    }

    public static revert(commit: string = "HEAD"): Promise<boolean> {
        return ScriptOps.execute("git", ["revert", commit]);
    }

    public static revertSync(commit: string = "HEAD"): boolean {
        return ScriptOps.executeSync("git", ["revert", commit]);
    }

    public static createBranch(name: string): Promise<boolean> {
        return ScriptOps.execute("git", ["checkout", "-b", name]);
    }

    public static createBranchSync(name: string): boolean {
        return ScriptOps.executeSync("git", ["checkout", "-b", name]);
    }

    public static deleteBranch(name: string): Promise<boolean> {
        return ScriptOps.execute("git", ["branch", "-D", name]);
    }

    public static deleteBranchSync(name: string): boolean {
        return ScriptOps.executeSync("git", ["branch", "-D", name]);
    }

    public static setUpstream(remoteBranch: string, remote: string = "origin"): Promise<boolean> {
        return ScriptOps.execute("git", ["branch", `--set-upstream-to=${remote}/${remoteBranch}`]);
    }

    public static setUpstreamSync(remoteBranch: string, remote: string = "origin"): boolean {
        return ScriptOps.executeSync("git", ["branch", `--set-upstream-to=${remote}/${remoteBranch}`]);
    }

    public static clone(url: string, path?: string): Promise<boolean> {
        const params: string[] = ["clone", url];

        if (path) {
            params.push(path);
        }

        return ScriptOps.execute("git", params);
    }

    public static cloneSync(url: string, path?: string): boolean {
        const params: string[] = ["clone", url];

        if (path) {
            params.push(path);
        }

        return ScriptOps.executeSync("git", params);
    }
}
