import { Octokit } from '@octokit/rest';

const octokit = new Octokit({ auth: process.env.GITHUB_TOKEN });

export async function getRepositories() {
  try {
    const { data } = await octokit.repos.listForUser({
      username: 'MaxZetter',
      per_page: 100,
    });
    return data;
  } catch (error) {
    console.error('Error fetching repositories:', error);
    return []; // Return empty array if API call fails
  }
}