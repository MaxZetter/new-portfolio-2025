import { useRouter } from 'next/router';
import { Octokit } from '@octokit/rest';
import projectsData from '../../data/projects.json';
import Image from 'next/image';

const octokit = new Octokit({ auth: process.env.GITHUB_TOKEN });

export async function getStaticPaths() {
  const { data: repos } = await octokit.repos.listForUser({
    username: 'YOUR_GITHUB_USERNAME',
  });
  const paths = repos.map((repo) => ({ params: { project: repo.name } }));
  return { paths, fallback: 'blocking' };
}

export async function getStaticProps({ params }) {
  const { data: repo } = await octokit.repos.get({
    owner: 'YOUR_GITHUB_USERNAME',
    repo: params.project,
  });
  const { data: commits } = await octokit.repos.listCommits({
    owner: 'YOUR_GITHUB_USERNAME',
    repo: params.project,
  });
  const projectData = projectsData.find((p) => p.repo_name === params.project);
  return { props: { repo, commits, projectData }, revalidate: 3600 };
}

export default function ProjectPage({ repo, commits, projectData }) {
  const router = useRouter();

  if (router.isFallback) return <div>Loading...</div>;

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-4xl font-bold">{projectData.title}</h1>
      <Image src={projectData.image} alt={projectData.title} className="w-full h-96 object-cover rounded-xl my-6" />
      <p className="text-lg">{repo.description}</p>
      <div className="mt-4">
        <h2 className="text-2xl font-semibold">Recent Activity</h2>
        <ul className="mt-4 space-y-4">
          {commits.slice(0, 5).map((commit) => (
            <li key={commit.sha} className="border-l-4 border-blue-500 pl-4">
              <p>{commit.commit.message}</p>
              <p className="text-sm text-gray-500">
                {new Date(commit.commit.author.date).toLocaleDateString()}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}