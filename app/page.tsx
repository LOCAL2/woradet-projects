import { getVercelProjects } from '@/lib/vercel';
import { ProjectCard } from '@/components/project-card';
import { ThemeToggle } from '@/components/theme-toggle';

export const revalidate = 60; // Revalidate every minute

export default async function Home() {
  let projects: Awaited<ReturnType<typeof getVercelProjects>> = [];
  let error: string | null = null;

  try {
    projects = await getVercelProjects();
  } catch (e) {
    error = e instanceof Error ? e.message : 'Failed to load projects';
    console.error('Error fetching projects:', e);
  }

  return (
    <div className="min-h-screen bg-white dark:bg-black transition-colors duration-300">
      <ThemeToggle />
      
      {/* Hero Section */}
      <header className="relative overflow-hidden border-b border-zinc-200 dark:border-zinc-800">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 via-white to-purple-50/50 dark:from-zinc-900/50 dark:via-black dark:to-zinc-900/50" />
        <div className="relative max-w-7xl mx-auto px-6 py-12 sm:py-16">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6">
            {/* Title Section */}
            <div className="space-y-2">
              <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">
                <span className="bg-gradient-to-r from-zinc-900 via-zinc-700 to-zinc-900 dark:from-zinc-100 dark:via-zinc-300 dark:to-zinc-100 bg-clip-text text-transparent">
                  My Projects
                </span>
              </h1>
              <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-400 max-w-xl">
                A collection of my deployed projects and experiments
              </p>
            </div>
            
            {/* Stats */}
            {projects.length > 0 && (
              <div className="flex items-center gap-6 sm:gap-8">
                <div className="text-center sm:text-right">
                  <div className="text-2xl sm:text-3xl font-bold text-zinc-900 dark:text-zinc-100">
                    {projects.length}
                  </div>
                  <div className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400">
                    Projects
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-16 sm:py-24">
        {error ? (
          <div className="text-center py-20">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-100 dark:bg-red-900/20 mb-4">
              <svg className="w-8 h-8 text-red-600 dark:text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <h2 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-100 mb-2">
              Unable to load projects
            </h2>
            <p className="text-zinc-600 dark:text-zinc-400 mb-6">
              {error}
            </p>
            <div className="max-w-md mx-auto text-left bg-zinc-100 dark:bg-zinc-900 rounded-lg p-6 text-sm">
              <p className="font-semibold mb-2 text-zinc-900 dark:text-zinc-100">Setup Instructions:</p>
              <ol className="list-decimal list-inside space-y-2 text-zinc-700 dark:text-zinc-300">
                <li>Get your Vercel token from <a href="https://vercel.com/account/tokens" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline">vercel.com/account/tokens</a></li>
                <li>Add it to <code className="bg-zinc-200 dark:bg-zinc-800 px-2 py-1 rounded">.env.local</code></li>
                <li>Restart the development server</li>
              </ol>
            </div>
          </div>
        ) : projects.length === 0 ? (
          <div className="text-center py-20">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-zinc-100 dark:bg-zinc-900 mb-4">
              <svg className="w-8 h-8 text-zinc-400 dark:text-zinc-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
              </svg>
            </div>
            <h2 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-100 mb-2">
              No projects found
            </h2>
            <p className="text-zinc-600 dark:text-zinc-400">
              Deploy your first project on Vercel to see it here
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 animate-fade-in">
            {projects.map((project, index) => (
              <ProjectCard key={project.id} project={project} index={index} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
