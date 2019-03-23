import {ITaskResult, Coordinator, ICoordinator} from "./core/coordinator";
import FileOps from "./predefinedOps/files";
import GitOps from "./predefinedOps/git";
import ScriptOps from "./predefinedOps/script";
import TestOps from "./predefinedOps/test";
import {Operation, ISavedOp, RunState, Action, GithubWebhookCallback, ProgressCallback} from "./core/helpers";
import GithubEvent from "./core/githubEvent";

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
    TestOps
};
