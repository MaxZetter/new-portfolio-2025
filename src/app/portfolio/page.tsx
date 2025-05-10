import Link from 'next/link';
import Image from 'next/image';
import { getRepositories } from '../../lib/github';
import projectsData from 'src/data/projects.json';

interface GitHubRepo {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
}

interface Project {
  repo_name: string;
  title: string;
  image: string;
  description: string;
  hashtags: string[];
}

export const revalidate = 3600;

export default async function Portfolio() {
  const repos = await getRepositories();
  const hasProjects = repos.length > 0 && projectsData.length > 0;

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-4xl font-bold mb-8">Portfolio</h1>
      {hasProjects ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projectsData.map((project: Project) => {
            const repo = repos.find((r: GitHubRepo) => r.name === project.repo_name);
            if (!repo) return null;
            return (
              <Link href={`/portfolio/${repo.name}`} key={repo.id}>
                <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition cursor-pointer">
                  <Image
                    src={project.image}
                    alt={project.title}
                    height={192}
                    width={192}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-4">
                    <h2 className="text-xl font-semibold">{project.title}</h2>
                    <p className="text-gray-600 mt-2 line-clamp-2">{project.description}</p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {project.hashtags.map((tag, index) => (
                        <span key={index} className="text-sm text-blue-500">{tag}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      ) : (
        <div className="bg-blue-900 rounded-xl shadow-lg p-6 text-center">
          <h2 className="text-2xl font-semibold text-yellow-300">Project in the Making</h2>
          <p className="text-yellow-300 mt-2">Exciting things are coming soon! Stay tuned for updates.</p>
        </div>
      )}
    </div>
  );
}