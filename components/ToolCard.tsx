import React from 'react';
import type { Tool } from '../types';
import { StarIcon, StarFilledIcon, PlayCircleIcon } from './Icons';

interface ToolCardProps {
  tool: Tool;
  isFavorite: boolean;
  onToggleFavorite: (toolId: string) => void;
  onRatingRequest: () => void;
}

const colorMap = {
  red: {
    tag: 'bg-red-500 text-white',
    glow: 'hover:shadow-red-500/40',
  },
  blue: {
    tag: 'bg-blue-600 text-white',
    glow: 'hover:shadow-blue-600/40',
  },
  green: {
    tag: 'bg-green-500 text-white',
    glow: 'hover:shadow-green-500/40',
  },
  yellow: {
    tag: 'bg-yellow-500 text-white',
    glow: 'hover:shadow-yellow-500/40',
  },
  purple: {
    tag: 'bg-purple-600 text-white',
    glow: 'hover:shadow-purple-600/40',
  },
  indigo: {
    tag: 'bg-indigo-600 text-white',
    glow: 'hover:shadow-indigo-600/40',
  },
  pink: {
    tag: 'bg-pink-600 text-white',
    glow: 'hover:shadow-pink-600/40',
  },
};

const getRatingColorClass = (rating: number): string => {
    switch (rating) {
        case 1: return 'text-red-500';
        case 2: return 'text-yellow-400';
        case 3: return 'text-green-500';
        case 4: return 'text-blue-600';
        case 5: return 'text-purple-600';
        default: return 'text-gray-300 dark:text-slate-600';
    }
};

const defaultColor = colorMap.blue;

export const ToolCard: React.FC<ToolCardProps> = ({ tool, isFavorite, onToggleFavorite, onRatingRequest }) => {
  const colors = colorMap[tool.tagColor] || defaultColor;

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onToggleFavorite(tool.id);
  };

  const handleRatingRequest = (e: React.MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();
      onRatingRequest();
  }

  const ratingColorClass = getRatingColorClass(tool.rating);

  return (
    <a
      href={tool.link}
      target="_blank"
      rel="noopener noreferrer"
      className={`group bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-xl overflow-hidden flex flex-col transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 ${colors.glow}`}
    >
      <div className="relative aspect-video overflow-hidden">
        <img
          src={tool.imageUrl}
          alt={tool.name}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
        />
        {tool.videoUrl && (
            <a 
                href={tool.videoUrl} 
                target="_blank" 
                rel="noopener noreferrer" 
                onClick={(e) => e.stopPropagation()} 
                className="absolute top-3 left-3 p-1 bg-black/40 text-white rounded-full hover:bg-black/60 transition-colors"
                aria-label="Watch video"
            >
                <PlayCircleIcon className="w-6 h-6" />
            </a>
        )}
        <div className="absolute top-3 right-3">
          <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${colors.tag}`}>
            {tool.category}
          </span>
        </div>
      </div>
      <div className="p-4 flex-grow flex flex-col">
        <h3 className="font-bold text-lg text-gray-900 dark:text-white mb-1">{tool.name}</h3>
        <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed line-clamp-2 flex-grow">
          {tool.description}
        </p>
      </div>
      <div className="px-4 py-3 border-t border-gray-100 dark:border-slate-700 flex justify-between items-center">
        <button
          className="flex items-center"
          onClick={handleRatingRequest}
          aria-label="Submit a rating request for this tool"
        >
          {[1, 2, 3, 4, 5].map(star => (
            <StarFilledIcon key={star} className={`w-5 h-5 transition-colors ${
              tool.rating >= star
                ? ratingColorClass
                : 'text-gray-300 dark:text-slate-600'
            }`} />
          ))}
        </button>
        
        <button onClick={handleFavoriteClick} className="p-1 -m-1" aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}>
            {isFavorite ? (
                <StarFilledIcon className="w-5 h-5 text-pink-500" />
            ) : (
                <StarIcon className={`w-5 h-5 text-gray-400 dark:text-slate-500 transition-colors group-hover:text-pink-500`} />
            )}
        </button>
      </div>
    </a>
  );
};
