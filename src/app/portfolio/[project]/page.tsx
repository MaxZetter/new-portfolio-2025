// app/portfolio/[project]/page.tsx
import { getRepositories } from 'src/lib/github';
import projectsData from 'src/data/projects.json';
import Link from 'next/link';
import Image from 'next/image';
import { Octokit } from '@octokit/rest';

// Interface based on GitHub API response for repos.listForUser
interface GitHubRepo {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  created_at: string;
  full_name?: string;
  private?: boolean;
  updated_at?: string;
  pushed_at?: string;
}

// Interface based on projects.json structure
interface ProjectData {
  repo_name: string;
  title: string;
  image: string;
  description: string;
  hashtags: string[];
}

// Interface based on GitHub API response for repos.listCommits
interface Commit {
  sha: string;
  url: string;
  html_url: string;
  commit: {
    message: string;
    author: {
      name?: string;
      email?: string;
      date: string;
    };
  };
  author?: {
    login?: string;
    id?: number;
    avatar_url?: string;
  };
}

export default async function ProjectPage({
  params,
}: {
  params: { project: string };
}) {
  const repos: GitHubRepo[] = await getRepositories();
  const repo: GitHubRepo | undefined = repos.find((r: GitHubRepo) => r.name === params.project);

  if (!repo) {
    return { notFound: true }; // Next.js will render a 404 page
  }

  const octokit = new Octokit({ auth: process.env.GITHUB_TOKEN });
  let commits: Commit[] = [];
  try {
    const { data } = await octokit.repos.listCommits({
      owner: 'MaxZetter', // Your GitHub username
      repo: params.project,
      per_page: 5,
    });
    commits = data as Commit[]; // Type assertion for valid data
  } catch (error: unknown) {
    if (error instanceof Error && 'status' in error && error.status === 409) {
      console.log(`Repository ${params.project} has no commits.`);
    } else if (error instanceof Error) {
      console.error('Error fetching commits:', error);
    } else {
      console.error('Unexpected error fetching commits:', error);
    }
  }

  console.log('Commits Data:', commits);

  const projectData: ProjectData | undefined = (projectsData as ProjectData[]).find(
    (p: ProjectData) => p.repo_name === params.project
  );
  const fallbackProjectData: ProjectData = {
    repo_name: params.project,
    title: params.project,
    image: '',
    description: '',
    hashtags: [],
  };

  return (
    <div
      className="my-20 mx-15 py-6 min-h-[calc(80vh-40px)] bg-transparent backdrop-blur-md relative"
      style={{ backdropFilter: 'blur(4px)' }} // Frosted effect with 4px blur
    >
      <div className="grid grid-cols-3 grid-rows-1 gap-6">
        {/* Left 75% for project details */}
        <div className="col-span-2 backdrop-blur-md p-6 rounded-xl borde shadow-lg">
          <h1 className="text-3xl font-bold text-white mb-4">{(projectData || fallbackProjectData).title}</h1>
          {(projectData || fallbackProjectData).image && (
            <Image
              src={(projectData || fallbackProjectData).image}
              alt={(projectData || fallbackProjectData).title}
              width={800}
              height={384}
              className="w-full h-96 object-cover rounded-xl my-6"
            />
          )}
          <p className="text-gray-200 mb-4">{repo.description || (projectData || fallbackProjectData).description || 'No description available'}</p>
        </div>
        {/* Right 25% for Update feed */}
        <div className="col-span-1 bg-gray-700 my-40 backdrop-blur-md p-6 rounded-xl border shadow-lg">
          <h2 className="text-2xl font-semibold centre text-white mb-4">Project Feed</h2>
          <ul className="space-y-4">
            {commits.length > 0 ? (
              commits.map((commit: Commit) => (
                <li key={commit.sha} className="border-l-4 border-blue-500 pl-4">
                  <p className="text-gray-200">{commit.commit.message}</p>
                  <p className="text-sm text-gray-500">
                    {new Date(commit.commit.author.date).toLocaleDateString()}
                  </p>
                </li>
              ))
            ) : (
              <li className="text-white">No recent activity available.</li>
            )}
          </ul>
        </div>
      </div>
      <a
        href={repo.html_url}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-300 hover:text-blue-400 underline mt-4 inline-block"
      >
        View on GitHub
      </a>
    </div>
  );
}