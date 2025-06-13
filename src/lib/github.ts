import { Octokit } from '@octokit/rest';

interface GitHubRepo {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  created_at: string;
  image?: string | null;
}

const octokit = new Octokit({ auth: process.env.GITHUB_TOKEN });

export async function getRepositories(): Promise<GitHubRepo[]> {
  try {
    const { data: repos } = await octokit.repos.listForUser({
      username: 'MaxZetter', // Replace with your GitHub username
      per_page: 100,
    });
    console.log('Fetched Repositories (Raw):', repos); // Log raw data
    return repos as GitHubRepo[]; // Temporary type assertion
  } catch (error) {
    console.error('Error fetching repositories:', error);
    return [];
  }
}