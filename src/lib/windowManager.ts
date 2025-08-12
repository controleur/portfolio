import { writable } from 'svelte/store';
import type { ICONS } from './icons';
import type { WindowData } from '$lib';

function createWindowManager() {
	const { subscribe, set, update } = writable<WindowData[]>([]);
	
	let nextZIndex = 100;
	const MAX_WINDOW_Z_INDEX = 9000; // Keep windows below taskbar (z-9999)
	
	return {
		subscribe,
		
		openWindow: (appName: string, title: string, appIcon: keyof typeof ICONS = 'fileManager', content: string = '') => {
			const id = `window-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
			
			// Calculate offset position for new windows to avoid overlap
			let baseX = 100;
			let baseY = 100;
			
			update(windows => {
				// Count existing windows to create cascade effect
				const existingCount = windows.length;
				const offset = existingCount * 30; // 30px offset per window
				
				const newWindow: WindowData = {
					id,
					title,
					content,
					appName,
					appIcon,
					x: baseX + offset,
					y: baseY + offset,
					width: 640,
					height: 480,
					zIndex: Math.min(nextZIndex++, MAX_WINDOW_Z_INDEX),
					isMinimized: false,
					isMaximized: false,
					isActive: true
				};
				
				// Deactivate all other windows
				const updatedWindows = windows.map(w => ({ ...w, isActive: false }));
				return [...updatedWindows, newWindow];
			});
		},
		
		closeWindow: (id: string) => {
			update(windows => windows.filter(w => w.id !== id));
		},
		
		focusWindow: (id: string) => {
			update(windows => {
				// Ensure nextZIndex doesn't exceed the limit
				if (nextZIndex > MAX_WINDOW_Z_INDEX) {
					nextZIndex = 100; // Reset if limit reached
				}
				
				return windows.map(w => ({
					...w,
					isActive: w.id === id,
					zIndex: w.id === id ? Math.min(nextZIndex++, MAX_WINDOW_Z_INDEX) : w.zIndex
				}));
			});
		},
		
		minimizeWindow: (id: string) => {
			update(windows => {
				const targetWindow = windows.find(w => w.id === id);
				if (!targetWindow) return windows;
				
				const updatedWindows = windows.map(w => 
					w.id === id ? { ...w, isMinimized: !w.isMinimized } : w
				);
				
				const willBeMinimized = !targetWindow.isMinimized; // If was false, becomes true
				
				// If we just minimized a window that was active
				if (targetWindow.isActive && willBeMinimized) {
					// Find the non-minimized window with the highest zIndex to make it active
					const visibleWindows = updatedWindows.filter(w => !w.isMinimized && w.id !== id);
					if (visibleWindows.length > 0) {
						const topWindow = visibleWindows.reduce((prev, current) => 
							current.zIndex > prev.zIndex ? current : prev
						);
						return updatedWindows.map(w => ({
							...w,
							isActive: w.id === topWindow.id
						}));
					} else {
						// No visible window, deactivate all
						return updatedWindows.map(w => ({ ...w, isActive: false }));
					}
				}
				
				// If we restore a window, make it active
				if (!willBeMinimized && targetWindow.isMinimized) {
					return updatedWindows.map(w => ({
						...w,
						isActive: w.id === id,
						zIndex: w.id === id ? Math.min(nextZIndex++, MAX_WINDOW_Z_INDEX) : w.zIndex
					}));
				}
				
				return updatedWindows;
			});
		},
		
		maximizeWindow: (id: string) => {
			update(windows => {
				return windows.map(w => 
					w.id === id ? { ...w, isMaximized: !w.isMaximized } : w
				);
			});
		},
		
		updateWindow: (id: string, updates: Partial<WindowData>) => {
			update(windows => {
				return windows.map(w => 
					w.id === id ? { ...w, ...updates } : w
				);
			});
		}
	};
}

export const windowManager = createWindowManager();
