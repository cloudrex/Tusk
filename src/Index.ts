import {ITaskResult, Coordinator, ICoordinator} from "./Core/Coordinator";
import FileOps from "./PredefinedOps/Files";
import GitOps from "./PredefinedOps/Git";
import ScriptOps from "./PredefinedOps/Script";
import TestOps from "./PredefinedOps/Test";
import {Operation, ISavedOp, RunState, Action, GithubWebhookCallback, ProgressCallback} from "./Core/Helpers";
import GithubEvent from "./Core/GithubEvent";
import {OpCallback, IOp} from "./Tasks/Op";
import OpRunner from "./Tasks/OpRunner";
import SpaceFactory from "./Tasks/SpaceFactory";
import Task from "./Tasks/Task";

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
    Task,
    OpRunner,
    IOp,
    OpCallback,

    // Other.
    SpaceFactory
};
