import {Operation, ISavedOp, CoordinatorState, GithubEvent, Action, GithubWebhookCallback, ProgressCallback, ITaskResult, Coordinator, ICoordinator} from "./core/coordinator";
import FileSystemOperations from "./predefied-ops/file-system";
import GitOperations from "./predefied-ops/git";
import ScriptOperations from "./predefied-ops/scripts";
import TestOperations from "./predefied-ops/test";

export {
    // Core
    Operation,
    ISavedOp,
    CoordinatorState,
    GithubEvent,
    Action,
    GithubWebhookCallback,
    ProgressCallback,
    ITaskResult,
    Coordinator,
    ICoordinator,

    // Pre-defined
    FileSystemOperations,
    GitOperations,
    ScriptOperations,
    TestOperations
};