<script lang="ts">
	interface EditorFile {
		name: string;
		content: string[];
		language: string;
		modified: boolean;
	}

	let files: EditorFile[] = [
		{
			name: 'about.md',
			language: 'Markdown Components',
			modified: true,
			content: [
				'# About this Portfolio',
				'',
				'## Stack',
				'- Svelte',
				'- SvelteKit',
				'- TypeScript',
				'- Tailwind CSS',
				'- Node.js',
				'',
				'## Features',
				'  - Responsive Design',
				'  - Dark Mode',
				'  - File Explorer',
				'  - Taskbar',
				'  - Terminal',
				'  - Code "Editor"'
			]
		},
		{
			name: 'knowledge.ts',
			language: 'typescript',
			modified: false,
			content: [
				'import * from "svelte";',
				'import * from "react";',
				'',
				'export const Tools = {',
				'  tailwind: "Tailwind CSS",',
				'  sass: "Sass",',
				'  git: "Git",',
				'  express: "Express.js",',
				'  vite: "Vite",',
				'  node: "Node.js",',
				'  mongodb: "MongoDB",',
				'  postgresql: "PostgreSQL",',
				'  docker: "Docker",',

				'}',
				''
			]
		},
		{
			name: 'credits.json',
			language: 'JSON',
			modified: false,
			content: [
				'"AppIcons": FlowbiteIcons,',
				'"HomeButton&LoadingIcon": KDE Plasma Logo,',
				'"Wallpaper": [',
				'  "Name": KDE Plasma Wallpaper "Coast",',
				'  "Author": Krystian Zajdel,',
				'],',
				'"Design inspiration": KDE Plasma HIG & Figma project',
				'',
				'',
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
			case 'JSON':
				return 'bg-orange-500';
			case 'typescript':
				return 'bg-blue-500';
			case 'javascript':
				return 'bg-yellow-500';
			default:
				return 'bg-gray-400';
		}
	}

	function highlightLine(line: string, language: string): string {
		if (language === 'JSON' || language === 'typescript') {
			// Highlight keywords only outside of strings
			let inString = false;
			let stringChar = '';
			let result = '';
			let buffer = '';
			for (let i = 0; i < line.length; i++) {
				const char = line[i];
				// Enter or exit string
				if (!inString && (char === '"' || char === "'")) {
					inString = true;
					stringChar = char;
					// Highlight code before string
					result += buffer
						.replace(
							/\b(import|export|from|let|const|function|interface)\b/g,
							'<span class="text-blue-400">$1</span>'
						)
						.replace(/(\{[^}]*\})/g, '<span class="text-yellow-400">$1</span>')
						.replace(/(\/\/.*$)/g, '<span class="text-green-400">$1</span>');
					buffer = char;
				} else if (inString && char === stringChar) {
					inString = false;
					buffer += char;
					// Highlight string
					result += `<span class="text-green-300">${buffer}</span>`;
					buffer = '';
				} else {
					buffer += char;
				}
			}
			// Highlight whatever is left
			if (buffer) {
				if (inString) {
					result += `<span class="text-green-300">${buffer}</span>`;
				} else {
					result += buffer
						.replace(
							/\b(import|export|from|let|const|function|interface)\b/g,
							'<span class="text-blue-400">$1</span>'
						)
						.replace(/(\{[^}]*\})/g, '<span class="text-yellow-400">$1</span>')
						.replace(/(\/\/.*$)/g, '<span class="text-green-400">$1</span>');
				}
			}
			return result;
		}
		return line;
	}
</script>

<div class="flex h-full flex-col bg-gray-900 text-gray-100">
	<!-- Tab Bar -->
	<div class="flex border-b border-gray-700 bg-gray-800">
		{#each files as file, index (file.name)}
			<button
				on:click={() => switchFile(index)}
				class="flex items-center gap-2 border-r border-gray-700 px-4 py-2 text-sm transition-colors {index ===
				activeFileIndex
					? 'bg-gray-900 text-white'
					: 'bg-gray-800 text-gray-400 hover:bg-gray-700'}"
			>
				<div class="h-2 w-2 rounded-full {getLanguageColor(file.language)}"></div>
				<span>{file.name}</span>
				{#if file.modified}
					<div class="h-1.5 w-1.5 rounded-full bg-orange-400"></div>
				{/if}
			</button>
		{/each}
	</div>

	<!-- Editor Content -->
	<div class="flex h-full flex-1 overflow-auto">
		<!-- Line Numbers -->
		<div class="flex w-12 flex-col bg-gray-800 pt-4 font-mono text-sm text-gray-500">
			<!-- eslint-disable-next-line @typescript-eslint/no-unused-vars -->
			{#each activeFile.content as _, index (index)}
				<div class="bg-gray-800 px-2 text-right leading-6">{index + 1}</div>
			{/each}
		</div>

		<!-- Code Content -->
		<div class="flex-1">
			<div class="p-4 font-mono text-sm leading-6">
				{#each activeFile.content as line, index (index)}
					<div class="text-gray-200">{@html highlightLine(line, activeFile.language)}</div>
				{/each}
			</div>
		</div>
	</div>

	<!-- Status Bar -->
	<div
		class="flex items-center justify-between border-t border-gray-700 bg-gray-800 px-4 py-1 text-xs text-gray-400"
	>
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
