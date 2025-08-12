import type { ICONS } from '$lib';
export interface App {
  id: number;
  name: string;
  icon: keyof typeof ICONS;
  description: string;
}

export interface WindowData {
  id: string;
  title: string;
  content: string;
  appName: string;
  appIcon: keyof typeof ICONS;
  x: number;
  y: number;
  width: number;
  height: number;
  zIndex: number;
  isMinimized: boolean;
  isMaximized: boolean;
  isActive: boolean;
}
