import { getVercelProjects } from '@/lib/vercel';
import { ProjectCard } from '@/components/project-card';
import { ThemeToggle } from '@/components/theme-toggle';
import { ProjectsClient } from '@/components/projects-client';

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
    <ProjectsClient initialProjects={projects} initialError={error} />
  );
}
