import {ITaskResult, Coordinator, ICoordinator} from "./core/coordinator";
import FileOps from "./predefied-ops/files";
import GitOps from "./predefied-ops/git";
import ScriptOps from "./predefied-ops/script";
import TestOps from "./predefied-ops/test";
import {Operation, ISavedOp, RunState, Action, GithubWebhookCallback, ProgressCallback} from "./core/helpers";
import GithubEvent from "./core/github-event";
import task from "./tasks/task";

export {
    // Core infrastructure.
    Operation,
    ISavedOp,
    RunState,
    GithubEvent,
    Action,
    GithubWebhookCallback,
    ProgressCallback,
    ITaskResult,
    Coordinator,
    ICoordinator,

    // Pre-defined operations.
    FileOps,
    GitOps,
    ScriptOps,
    TestOps,

    // Tasks.
    task
};
