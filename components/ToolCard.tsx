import React from 'react';
import type { Tool } from '../types';
import { StarIcon } from './Icons';

interface ToolCardProps {
  tool: Tool;
}

const colorMap = {
  red: {
    tag: 'bg-red-100 text-red-700 border border-red-200/80',
    hover: 'group-hover:border-red-400 group-hover:shadow-lg group-hover:shadow-red-500/10',
    star: 'group-hover:text-red-500',
  },
  blue: {
    tag: 'bg-blue-100 text-blue-700 border border-blue-200/80',
    hover: 'group-hover:border-blue-400 group-hover:shadow-lg group-hover:shadow-blue-500/10',
    star: 'group-hover:text-blue-500',
  },
  green: {
    tag: 'bg-green-100 text-green-700 border border-green-200/80',
    hover: 'group-hover:border-green-400 group-hover:shadow-lg group-hover:shadow-green-500/10',
    star: 'group-hover:text-green-500',
  },
  yellow: {
    tag: 'bg-yellow-100 text-yellow-700 border border-yellow-200/80',
    hover: 'group-hover:border-yellow-400 group-hover:shadow-lg group-hover:shadow-yellow-500/10',
    star: 'group-hover:text-yellow-500',
  },
  purple: {
    tag: 'bg-purple-100 text-purple-700 border border-purple-200/80',
    hover: 'group-hover:border-purple-400 group-hover:shadow-lg group-hover:shadow-purple-500/10',
    star: 'group-hover:text-purple-500',
  },
  indigo: {
    tag: 'bg-indigo-100 text-indigo-700 border border-indigo-200/80',
    hover: 'group-hover:border-indigo-400 group-hover:shadow-lg group-hover:shadow-indigo-500/10',
    star: 'group-hover:text-indigo-500',
  },
  pink: {
    tag: 'bg-pink-100 text-pink-700 border border-pink-200/80',
    hover: 'group-hover:border-pink-400 group-hover:shadow-lg group-hover:shadow-pink-500/10',
    star: 'group-hover:text-pink-500',
  },
};

const defaultColor = colorMap.blue;

export const ToolCard: React.FC<ToolCardProps> = ({ tool }) => {
  const colors = colorMap[tool.tagColor] || defaultColor;

  return (
    <a
      href={tool.link}
      target="_blank"
      rel="noopener noreferrer"
      className={`group bg-white border border-gray-200 rounded-xl overflow-hidden flex flex-col transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 ${colors.hover}`}
    >
      <div className="relative aspect-video overflow-hidden">
        <img
          src={tool.imageUrl}
          alt={tool.name}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-white via-white/60 to-transparent"></div>
        <div className="absolute top-3 right-3">
          <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${colors.tag}`}>
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
      <div className="px-4 py-3 border-t border-gray-100 flex justify-end items-center">
         <StarIcon className={`w-5 h-5 text-gray-400 transition-colors ${colors.star}`} />
      </div>
    </a>
  );
};