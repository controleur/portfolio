import { writable } from 'svelte/store';
import type { WindowData } from '$lib';
import { ICONS } from '$lib';

const initial: WindowData[] = [];
export const windows = writable<WindowData[]>(initial);

export function openWindow(appName: string, title: string, appIcon: keyof typeof ICONS, content = '') {
  windows.update(wins => {
    // Check if a window for this app already exists
    const existing = wins.find(w => w.appName === appName);
    if (existing) {
      // Calcule le zIndex maximal
      const maxZ = Math.max(...wins.map(w => w.zIndex), 100);
      const updatedWindow: WindowData = {
        ...existing,
        content,
        isActive: true,
        isMinimized: false,
        zIndex: maxZ + 1
      };
      return wins.map(w =>
        w.appName === appName ? updatedWindow : { ...w, isActive: false }
      );
    }
    // Otherwise, create a new window
    const id = `window-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    const offset = wins.length * 30;
    const newWindow: WindowData = {
      id,
      title,
      content,
      appName,
      appIcon,
      x: 100 + offset,
      y: 100 + offset,
      width: 640,
      height: 480,
      zIndex: 100 + wins.length,
      isMinimized: false,
      isMaximized: false,
      isActive: true
    };
    // Deactivate others
    return [...wins.map(w => ({ ...w, isActive: false })), newWindow];
  });
}

export function closeWindow(id: string) {
  windows.update(wins => wins.filter(w => w.id !== id));
}

let nextZIndex = 100;
export function focusWindow(id: string) {
  windows.update(wins => {
  // Find current max z-index
    const maxZ = Math.max(...wins.map(w => w.zIndex), nextZIndex);
    nextZIndex = maxZ + 1;
    return wins.map(w =>
      w.id === id
        ? { ...w, isActive: true, zIndex: nextZIndex }
        : { ...w, isActive: false }
    );
  });
}


export function minimizeWindow(id: string) {
  windows.update(wins => wins.map(w => w.id === id ? { ...w, isMinimized: !w.isMinimized } : w));
}

export function maximizeWindow(id: string) {
  windows.update(wins => wins.map(w => w.id === id ? { ...w, isMaximized: !w.isMaximized } : w));
}

export function updateWindow(id: string, updates: Partial<WindowData>) {
  windows.update(wins => wins.map(w => w.id === id ? { ...w, ...updates } : w));
}

if (typeof window !== 'undefined') {
  window.addEventListener('open-virtual-browser', (e: Event) => {
    const detail = (e as CustomEvent).detail;
    if (detail && detail.url) {
      // Le titre reste 'Browser', seul le content (URL) change
      openWindow('Browser', 'Browser', 'browser', detail.url);
    }
  });
}