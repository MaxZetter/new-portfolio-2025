// app/about/page.tsx
import Link from 'next/link';
import Image from 'next/image';

// Placeholder image and data (replace with your own)
const aboutImage = '/images/placeholder-about.jpg'; // Replace with your photo
const bio = "Hello! I'm Max, a passionate developer with a love for creating innovative web experiences. With expertise in Next.js, TypeScript, and modern design, I build projects that blend functionality with aesthetics. When I'm not coding, you can find me exploring new technologies or enjoying a good cup of coffee.";
const skills = ['Next.js', 'TypeScript', 'Tailwind CSS', 'React', 'GitHub'];

export default function AboutPage() {
  return (
    <div
      className="min-h-[calc(100vh-40px)] bg-transparent backdrop-blur-md relative pt-50 mx-6 py-6" // pt-16 to avoid menu bar collision
      style={{ backdropFilter: 'blur(4px)' }} // Frosted effect
    >
      <div className="max-w-4xl mx-auto p-6 backdrop-blur-md rounded-xl border border-gray-200 shadow-lg">
        <div className="flex flex-col md:flex-row items-center gap-6">
          {/* About Image */}
          <div className="w-full md:w-1/3">
            <Image
              src={aboutImage}
              alt="Max Zetter"
              width={300}
              height={300}
              className="rounded-lg object-cover shadow-md"
            />
          </div>
          {/* About Content */}
          <div className="w-full md:w-2/3 text-white">
            <h1 className="text-4xl font-bold mb-4 font-pirata-one">About Me</h1>
            <p className="text-gray-200 mb-6 leading-relaxed">{bio}</p>
            <h2 className="text-2xl font-semibold mb-2">Skills</h2>
            <ul className="list-disc list-inside mb-6">
              {skills.map((skill, index) => (
                <li key={index} className="text-gray-300">{skill}</li>
              ))}
            </ul>
            <Link
              href="/contact"
              className="inline-block bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
            >
              Get in Touch
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}