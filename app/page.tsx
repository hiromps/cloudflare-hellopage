export default function Home() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-500 to-purple-600">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-white mb-4">
          Hello World
        </h1>
        <p className="text-xl text-white/90 mb-8">
          Next.js on Cloudflare Pages
        </p>
        <div className="inline-block px-6 py-3 bg-white/20 backdrop-blur-sm rounded-lg border border-white/30">
          <p className="text-white font-medium">
            🚀 Successfully deployed to Cloudflare Pages
          </p>
        </div>
      </div>
    </main>
  );
}