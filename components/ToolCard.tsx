import React, { useState } from 'react';
import type { Tool } from '../types';
import { StarIcon, StarFilledIcon, PlayCircleIcon } from './Icons';

interface ToolCardProps {
  tool: Tool;
  isFavorite: boolean;
  onToggleFavorite: (toolId: string) => void;
  rating: number | undefined;
  onSetRating: (toolId: string, rating: number) => void;
}

const colorMap = {
  red: {
    tag: 'bg-red-500',
    glow: 'group-hover:shadow-red-500/25',
  },
  blue: {
    tag: 'bg-blue-600',
    glow: 'group-hover:shadow-blue-500/25',
  },
  green: {
    tag: 'bg-green-500',
    glow: 'group-hover:shadow-green-500/25',
  },
  yellow: {
    tag: 'bg-yellow-500',
    glow: 'group-hover:shadow-yellow-500/25',
  },
  purple: {
    tag: 'bg-purple-600',
    glow: 'group-hover:shadow-purple-500/25',
  },
  indigo: {
    tag: 'bg-indigo-600',
    glow: 'group-hover:shadow-indigo-500/25',
  },
  pink: {
    tag: 'bg-pink-600',
    glow: 'group-hover:shadow-pink-500/25',
  },
};

const getRatingColorClass = (rating: number): string => {
    switch (rating) {
        case 1: return 'text-red-500';
        case 2: return 'text-yellow-400';
        case 3: return 'text-green-500';
        case 4: return 'text-blue-600';
        case 5: return 'text-purple-600';
        default: return 'text-gray-300';
    }
};

const defaultColor = colorMap.blue;

export const ToolCard: React.FC<ToolCardProps> = ({ tool, isFavorite, onToggleFavorite, rating, onSetRating }) => {
  const [hoverRating, setHoverRating] = useState(0);
  const colors = colorMap[tool.tagColor] || defaultColor;
  const currentRating = rating || 0;

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onToggleFavorite(tool.id);
  };

  const displayRating = hoverRating || currentRating;
  const ratingColorClass = getRatingColorClass(displayRating);

  return (
    <a
      href={tool.link}
      target="_blank"
      rel="noopener noreferrer"
      className={`group bg-white border border-gray-200 rounded-xl overflow-hidden flex flex-col transition-all duration-300 hover:shadow-2xl hover:-translate-y-1.5 ${colors.glow}`}
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
          <span className={`text-xs font-semibold px-2.5 py-1 rounded-full text-white ${colors.tag}`}>
            {tool.category}
          </span>
        </div>
      </div>
      <div className="p-4 flex-grow flex flex-col">
        <h3 className="font-bold text-lg text-gray-900 mb-1">{tool.name}</h3>
        <p className="text-gray-600 text-sm leading-relaxed line-clamp-2 flex-grow">
          {tool.description}
        </p>
      </div>
      <div className="px-4 py-3 border-t border-gray-100 flex justify-between items-center">
        <div className="flex items-center" onMouseLeave={() => setHoverRating(0)}>
            {[1, 2, 3, 4, 5].map(star => (
                <button 
                    key={star}
                    onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        onSetRating(tool.id, star);
                    }}
                    onMouseEnter={() => setHoverRating(star)}
                    className="p-0.5"
                    aria-label={`Rate ${star} stars`}
                >
                    <StarFilledIcon className={`w-5 h-5 transition-colors ${
                        displayRating >= star 
                        ? ratingColorClass 
                        : 'text-gray-300'
                    }`} />
                </button>
            ))}
        </div>
        
        <button onClick={handleFavoriteClick} className="p-1 -m-1" aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}>
            {isFavorite ? (
                <StarFilledIcon className="w-5 h-5 text-pink-500" />
            ) : (
                <StarIcon className={`w-5 h-5 text-gray-400 transition-colors group-hover:text-pink-500`} />
            )}
        </button>
      </div>
    </a>
  );
};