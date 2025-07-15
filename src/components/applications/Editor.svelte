<script lang="ts">
	interface EditorFile {
		name: string;
		content: string[];
		language: string;
		modified: boolean;
	}
	
	let files: EditorFile[] = [
		{
			name: 'App.svelte',
			language: 'svelte',
			modified: true,
			content: [
				'<script>',
				'  import Window from "./Window.svelte";',
				'  import Taskbar from "./Taskbar.svelte";',
				'  let windows = [];',
				'</scr' + 'ipt>',
				'',
				'<div class="desktop">',
				'  {#each windows as window (window.id)}',
				'    <Window {window} />',
				'  {/each}',
				'  <Taskbar />',
				'</div>'
			]
		},
		{
			name: 'Window.svelte',
			language: 'svelte',
			modified: false,
			content: [
				'<script>',
				'  export let window;',
				'  let dragging = false;',
				'</scr' + 'ipt>',
				'',
				'<div class="window" class:dragging>',
				'  <div class="titlebar">',
				'    <span>{window.title}</span>',
				'  </div>',
				'  <div class="content">',
				'    <slot />',
				'  </div>',
				'</div>'
			]
		},
		{
			name: 'windowManager.ts',
			language: 'typescript',
			modified: false,
			content: [
				'import { writable } from "svelte/store";',
				'',
				'export interface WindowState {',
				'  id: string;',
				'  title: string;',
				'  appName: string;',
				'  x: number;',
				'  y: number;',
				'  width: number;',
				'  height: number;',
				'  isMinimized: boolean;',
				'  isMaximized: boolean;',
				'  isActive: boolean;',
				'  zIndex: number;',
				'}',
				'',
				'export const windows = writable<WindowState[]>([]);'
			]
		}
	];
	
	let activeFileIndex = 0;
	let activeFile = files[activeFileIndex];
	
	function switchFile(index: number) {
		activeFileIndex = index;
		activeFile = files[index];
	}
	
	function getLanguageColor(language: string) {
		switch (language) {
			case 'svelte': return 'bg-orange-500';
			case 'typescript': return 'bg-blue-500';
			case 'javascript': return 'bg-yellow-500';
			default: return 'bg-gray-400';
		}
	}
	
	function highlightLine(line: string, language: string): string {
		if (language === 'svelte' || language === 'typescript') {
			return line
				.replace(/(import|export|from|let|const|function|interface)/g, '<span class="text-blue-400">$1</span>')
				.replace(/(\{[^}]*\})/g, '<span class="text-yellow-400">$1</span>')
				.replace(/(\/\/.*$)/g, '<span class="text-green-400">$1</span>')
				.replace(/(".*?"|'.*?')/g, '<span class="text-green-300">$1</span>');
		}
		return line;
	}
</script>

<div class="h-full flex flex-col bg-gray-900 text-gray-100">
	<!-- Tab Bar -->
	<div class="flex border-b border-gray-700 bg-gray-800">
		{#each files as file, index}
			<button
				on:click={() => switchFile(index)}
				class="flex items-center gap-2 px-4 py-2 text-sm border-r border-gray-700 transition-colors {
					index === activeFileIndex 
						? 'bg-gray-900 text-white' 
						: 'bg-gray-800 text-gray-400 hover:bg-gray-700'
				}"
			>
				<div class="w-2 h-2 rounded-full {getLanguageColor(file.language)}"></div>
				<span>{file.name}</span>
				{#if file.modified}
					<div class="w-1.5 h-1.5 bg-orange-400 rounded-full"></div>
				{/if}
			</button>
		{/each}
	</div>
	
	<!-- Editor Content -->
	<div class="flex-1 flex overflow-auto h-full">
		<!-- Line Numbers -->
		<div class="w-12 bg-gray-800 text-gray-500 text-sm font-mono flex flex-col pt-4">
			{#each activeFile.content as line, index}
				<div class="bg-gray-800 px-2 text-right leading-6">{index + 1}</div>
			{/each}
		</div>
		
		<!-- Code Content -->
		<div class="flex-1">
			<div class="p-4 font-mono text-sm leading-6">
				{#each activeFile.content as line}
					<div class="text-gray-200">{@html highlightLine(line, activeFile.language)}</div>
				{/each}
			</div>
		</div>
	</div>
	
	<!-- Status Bar -->
	<div class="flex items-center justify-between px-4 py-1 bg-gray-800 border-t border-gray-700 text-xs text-gray-400">
		<div class="flex items-center gap-4">
			<span>{activeFile.language.toUpperCase()}</span>
			<span>UTF-8</span>
			<span>LF</span>
		</div>
		<div class="flex items-center gap-4">
			<span>Ln {activeFile.content.length}, Col 1</span>
			<span>{activeFile.content.join('\n').length} characters</span>
		</div>
	</div>
</div>
