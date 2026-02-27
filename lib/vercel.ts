export interface VercelProject {
  id: string;
  name: string;
  accountId: string;
  createdAt: number;
  framework: string | null;
  link?: {
    type: string;
    repo: string;
    repoId: number;
    org?: string;
  };
  targets?: {
    production?: {
      alias?: string[];
    };
  };
  latestDeployments?: Array<{
    url: string;
    createdAt: number;
    created: number;
    state: string;
    ready?: number;
    meta?: {
      githubCommitMessage?: string;
      githubCommitAuthorName?: string;
      githubCommitRef?: string;
      githubCommitSha?: string;
    };
  }>;
}

export async function getVercelProjects(): Promise<VercelProject[]> {
  const token = process.env.VERCEL_TOKEN;
  const teamId = process.env.VERCEL_TEAM_ID;

  if (!token) {
    throw new Error('VERCEL_TOKEN is not set');
  }

  const url = teamId 
    ? `https://api.vercel.com/v9/projects?teamId=${teamId}`
    : 'https://api.vercel.com/v9/projects';

  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    next: { revalidate: 3600 }, // Cache for 1 hour
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch projects: ${response.statusText}`);
  }

  const data = await response.json();
  return data.projects || [];
}
