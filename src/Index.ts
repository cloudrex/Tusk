import {ITaskResult, Coordinator, ICoordinator} from "./core/coordinator";
import FileOps from "./PredefinedOps/Files";
import GitOps from "./PredefinedOps/Git";
import ScriptOps from "./PredefinedOps/Script";
import TestOps from "./PredefinedOps/Test";
import {Operation, ISavedOp, RunState, Action, GithubWebhookCallback, ProgressCallback} from "./Core/Helpers";
import GithubEvent from "./Core/GithubEvent";

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
