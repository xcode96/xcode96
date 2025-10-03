import type React from 'react';
import { tagColors } from './constants';

export interface Category {
  id: string;
  name: string;
  count: number;
  icon: React.ComponentType<{ className?: string }>;
}

export type TagColor = typeof tagColors[number];

export interface Tool {
  id: string;
  name: string;
  description: string;
  link: string;
  videoUrl?: string;
  author: {
    name: string;
    avatarUrl: string;
  };
  imageUrl: string;
  category: string;
  tagColor: TagColor;
}

export interface SuggestedTool extends Omit<Tool, 'id' | 'author'> {
  suggestionId: string;
  status: 'pending' | 'approved' | 'rejected';
}

export interface AdminUser {
  id: number;
  username: string;
  password: string;
  email: string;
  role: 'Admin' | 'Super Admin';
  createdAt: string;
}