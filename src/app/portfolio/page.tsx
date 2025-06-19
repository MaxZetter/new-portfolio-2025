import Link from 'next/link';
import Image from 'next/image';
import { getRepositories } from '../../lib/github';

interface GitHubRepo {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  created_at: string;
  image?: string | null;
}

export const revalidate = 3600;

export default async function Portfolio() {
  const repos: GitHubRepo[] = await getRepositories();
  const hasProjects = repos.length > 0

  return (
    <div className="container mx-auto py-30">
      <h1 className="text-4xl font-bold mb-8 text-white">Past Projects</h1>
      {hasProjects ? (
        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {repos.map((repo: GitHubRepo) => (
            <Link href={`/portfolio/${repo.name}`} key={repo.id}>
              <div className="bg-gray-700 backdrop-blur-md rounded-xl shadow-lg hover:shadow-xl transition cursor-pointer border-2 border-blue-500 w-full h-auto">
                <div className="flex items-start justify-between p-4">
                  <div className="flex-1 min-w-0 pr-4">
                    <h2 className="text-xl font-semibold text-white truncate">{repo.name}</h2>
                    <p className="text-gray-200 mt-1 line-clamp-2">
                      {repo.description || "No description available"}
                    </p>
                  </div>
                  {repo.image && ( // Type guard to ensure image is a string
                    <div className="flex-shrink-0">
                      <Image
                        src={repo.image} // Now safely a string
                        alt={repo.name}
                        height={80}
                        width={80}
                        className="object-cover rounded-lg"
                      />
                    </div>
                  )}
                </div>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div className="bg-white/30 backdrop-blur-md rounded-xl shadow-lg p-6 text-center border border-gray-200">
          <h2 className="text-2xl font-semibold text-white">Project in the Making</h2>
          <p className="text-gray-200 mt-2">Exciting things are coming soon! Stay tuned for updates.</p>
        </div>
      )}
    </div>
  );
}