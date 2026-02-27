'use client';

import { VercelProject } from '@/lib/vercel';
import { useState } from 'react';

interface ProjectCardProps {
  project: VercelProject;
  index: number;
}

export function ProjectCard({ project, index }: ProjectCardProps) {
  const [imageError, setImageError] = useState(false);
  
  // ใช้ production domain แทน deployment URL
  const productionDomain = project.targets?.production?.alias?.[0] || `${project.name}.vercel.app`;
  const fullUrl = `https://${productionDomain}`;
  const screenshotUrl = `https://api.microlink.io/?url=${encodeURIComponent(fullUrl)}&screenshot=true&meta=false&embed=screenshot.url`;

  const latestDeployment = project.latestDeployments?.[0];
  const deploymentDate = latestDeployment?.createdAt || latestDeployment?.created;
  const commitMessage = latestDeployment?.meta?.githubCommitMessage;
  const commitAuthor = latestDeployment?.meta?.githubCommitAuthorName;
  const commitRef = latestDeployment?.meta?.githubCommitRef;
  
  // Format date
  const formatDate = (timestamp: number) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);
    
    if (diffInSeconds < 60) return 'เมื่อสักครู่';
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} นาทีที่แล้ว`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} ชั่วโมงที่แล้ว`;
    if (diffInSeconds < 604800) return `${Math.floor(diffInSeconds / 86400)} วันที่แล้ว`;
    
    return date.toLocaleDateString('th-TH', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  const getDeploymentStatus = () => {
    if (!latestDeployment) return null;
    
    const state = latestDeployment.state;
    
    if (state === 'READY') {
      return {
        color: 'bg-green-500',
        text: 'Live',
        textColor: 'text-green-600 dark:text-green-400'
      };
    } else if (state === 'BUILDING' || state === 'QUEUED') {
      return {
        color: 'bg-yellow-500 animate-pulse',
        text: 'กำลัง Deploy',
        textColor: 'text-yellow-600 dark:text-yellow-400'
      };
    } else if (state === 'ERROR' || state === 'CANCELED') {
      return {
        color: 'bg-red-500',
        text: 'Error',
        textColor: 'text-red-600 dark:text-red-400'
      };
    }
    
    return {
      color: 'bg-zinc-500',
      text: state,
      textColor: 'text-zinc-600 dark:text-zinc-400'
    };
  };

  const deploymentStatus = getDeploymentStatus();

  return (
    <div
      className="group relative overflow-hidden rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 transition-all duration-500 hover:shadow-2xl hover:scale-[1.02] hover:-translate-y-1"
      style={{
        animationDelay: `${index * 100}ms`,
      }}
    >
      <a href={fullUrl} target="_blank" rel="noopener noreferrer" className="block">
        {/* Screenshot Preview */}
        <div className="relative aspect-video overflow-hidden bg-gradient-to-br from-zinc-100 to-zinc-200 dark:from-zinc-800 dark:to-zinc-900">
          {!imageError ? (
            <img
              src={screenshotUrl}
              alt={`${project.name} preview`}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              onError={() => setImageError(true)}
              loading="lazy"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <svg className="w-16 h-16 text-zinc-400 dark:text-zinc-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 10h.01M15 10h.01M9.5 15.5c1.5 1 3.5 1 5 0" />
              </svg>
            </div>
          )}
          
          {/* Overlay on hover */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          
          {/* Visit icon */}
          <div className="absolute top-4 right-4 p-2 rounded-full bg-white/90 dark:bg-zinc-900/90 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-2 group-hover:translate-x-0">
            <svg className="w-5 h-5 text-zinc-900 dark:text-zinc-100" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Header with title and time */}
          <div className="flex items-start justify-between gap-3 mb-3">
            <h3 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors flex-1">
              {project.name}
            </h3>
            {deploymentDate && (
              <div className="flex flex-col items-end flex-shrink-0">
                <span className="text-[10px] uppercase tracking-wide text-zinc-400 dark:text-zinc-600 font-medium">
                  Updated
                </span>
                <span className="text-xs text-zinc-600 dark:text-zinc-400 font-medium">
                  {formatDate(deploymentDate)}
                </span>
              </div>
            )}
          </div>
          
          {/* Framework and Repo */}
          <div className="flex items-center gap-3 text-sm text-zinc-600 dark:text-zinc-400 mb-4">
            {project.framework && (
              <span className="px-3 py-1 rounded-full bg-zinc-100 dark:bg-zinc-800 font-medium text-xs">
                {project.framework}
              </span>
            )}
            {project.link?.repo && (
              <div className="flex items-center gap-1">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                </svg>
                <span className="truncate max-w-[150px] text-xs">{project.link.repo}</span>
              </div>
            )}
          </div>

          {/* Deployment status and commit */}
          {commitMessage && (
            <div className="pt-4 border-t border-zinc-200 dark:border-zinc-800 space-y-3">
              {/* Commit message */}
              <div className="flex items-start gap-2 text-xs">
                <svg className="w-3.5 h-3.5 text-zinc-400 dark:text-zinc-600 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 16 16">
                  <path fillRule="evenodd" d="M11.75 2.5a.75.75 0 100 1.5.75.75 0 000-1.5zm-2.25.75a2.25 2.25 0 113 2.122V6A2.5 2.5 0 0110 8.5H6a1 1 0 00-1 1v1.128a2.251 2.251 0 11-1.5 0V5.372a2.25 2.25 0 111.5 0v1.836A2.492 2.492 0 016 7h4a1 1 0 001-1v-.628A2.25 2.25 0 019.5 3.25zM4.25 12a.75.75 0 100 1.5.75.75 0 000-1.5zM3.5 3.25a.75.75 0 111.5 0 .75.75 0 01-1.5 0z" />
                </svg>
                <div className="flex-1 min-w-0">
                  <p className="text-zinc-700 dark:text-zinc-300 line-clamp-2 leading-relaxed">
                    {commitMessage}
                  </p>
                  {(commitAuthor || commitRef) && (
                    <p className="text-zinc-500 dark:text-zinc-500 mt-1.5">
                      {commitAuthor && <span>{commitAuthor}</span>}
                      {commitAuthor && commitRef && <span> • </span>}
                      {commitRef && <span className="font-mono">{commitRef}</span>}
                    </p>
                  )}
                </div>
              </div>
              
              {/* Building progress bar */}
              {latestDeployment?.state === 'BUILDING' && (
                <div className="w-full bg-zinc-200 dark:bg-zinc-800 rounded-full h-1 overflow-hidden">
                  <div className="h-full bg-yellow-500 rounded-full animate-[progress_2s_ease-in-out_infinite]" style={{ width: '60%' }} />
                </div>
              )}
            </div>
          )}
        </div>
      </a>
    </div>
  );
}
