// app/page.tsx
import Link from 'next/link';

export default function HomePage() {
  return (
    <div
      className="min-h-[calc(100vh-40px)] bg-transparent relative pt-60 mx-6 py-6"
    >
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 h-full">
        {/* Full Width on Mobile, Left 50% on Desktop - Centered Content Bubble */}
        <div className="col-span-1 flex items-center justify-center md:col-span-1">
          <div className="max-w-md p-6 backdrop-blur-md rounded-xl border border-gray-200 shadow-lg">
            <h1 className="text-5xl font-bold text-center mb-4 font-lora text-white">
              Max
            </h1>
            <p className="text-2xl text-center text-gray-200 mb-6 leading-tight font-lora">
              Innovative Developer | Building Modern Web Solutions with Next.js, TypeScript, and More
            </p>
            <p className="text-gray-300 mb-8 font-lora">
              I craft efficient, user-friendly web experiences that drive results. Explore my portfolio to see how I can contribute to your team.
            </p>
            <Link
              href="/portfolio"
              className="inline-block bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition-colors font-lora"
            >
              View My Work
            </Link>
          </div>
        </div>
        {/* Right 50% on Desktop - Reserved for Animation/Image (hidden on mobile) */}
        <div className="col-span-1 hidden md:block">
          {/* Placeholder for future animation or image */}
          <div className="h-full opacity-50">
            {/* Add your animation or image here later */}
          </div>
        </div>
      </div>
    </div>
  );
}