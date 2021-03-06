enum GithubEvent {
    CheckRun = "check_run",

    CheckSuite = "check_suite",

    CommitComment = "commit_comment",

    BranchOrTagCreation = "create",

    BranchOrTagDeletion = "delete",

    Deployment = "deployment",

    DeploymentStatus = "deployment_status",

    Fork = "fork",

    GithubAppAuthorization = "github_app_authorization",

    Wiki = "gollum",

    AppInstallation = "installation",

    RepositoryAppInstallation = "installation_repositories",

    IssueComment = "issue_comment",

    Issue = "issues",

    Label = "label",

    MarketplacePurchase = "marketplace_purchase",

    Member = "member",

    Membership = "membership",

    Milestone = "milestone",

    Organization = "organization",

    OrganizationBlock = "org_block",

    PageBuild = "page_build",

    ProjectCard = "project_card",

    Project = "project",

    Public = "public",

    PullRequestReviewComment = "pull_request_review_comment",

    PullRequestReview = "pull_request_review",

    PullRequest = "pull_request",

    Push = "push",

    Repository = "repository",

    RepositoryImport = "repository_import",

    RepositoryVulnerabilityAlert = "repository_vulnerability_alert",

    Release = "release",

    SecurityAdvisory = "security_advisory",

    Status = "status",

    Team = "team",

    TeamRepositoryAdd = "team_add",

    Watch = "watch"
}

export default GithubEvent;
