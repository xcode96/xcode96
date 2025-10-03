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
  author: {
    name: string;
    avatarUrl: string;
  };
  imageUrl: string;
  category: string;
  tagColor: TagColor;
}

export interface AdminUser {
  id: number;
  username: string;
  email: string;
  role: 'Admin' | 'Super Admin';
  createdAt: string;
}