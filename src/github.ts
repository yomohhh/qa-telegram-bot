export interface WorkflowRun {
    name: string | null;
    head_branch: string | null;
    head_sha: string;
    status: string | null;
    conclusion: string | null;
    created_at: string;
    html_url: string;
}

interface RunsResponse {
    workflow_runs: WorkflowRun[];
}

const API_URL = "https://api.github.com";
const TIMEOUT_MS = 10_000;

export async function getLatestRun(): Promise<WorkflowRun | null> {
    const repo = process.env.GITHUB_REPO;
    if (!repo) {
        throw new Error("GITHUB_REPO is not set in .env");
    }

    const headers: Record<string, string> = {
        Accept: "application/vnd.github+json",
        "X-GitHub-Api-Version": "2022-11-28",
    };

    // Токен необязателен для публичного репозитория, но без него лимит
    // GitHub API ниже (60 запросов в час с одного IP). Для личного бота хватает.
    const token = process.env.GITHUB_TOKEN;
    if (token) {
        headers.Authorization = `Bearer ${token}`;
    }

    const response = await fetch(
        `${API_URL}/repos/${repo}/actions/runs?per_page=1`,
        { headers, signal: AbortSignal.timeout(TIMEOUT_MS) }
    );

    if (!response.ok) {
        throw new Error(`GitHub API responded with ${response.status}`);
    }

    const data = (await response.json()) as RunsResponse;
    return data.workflow_runs[0] ?? null;
}