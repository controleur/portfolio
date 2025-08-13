<script lang="ts">
	import { bookmarks } from '$lib/stores';
	import type { Bookmark } from '$lib/stores';
	import { locale, _ } from 'svelte-i18n';
	interface FileItem {
		name: string;
		type: 'folder' | 'file' | 'link';
		icon: string;
		content?: string;
		url?: string;
	}
	let selectedProject: Bookmark | null = null;
	let currentFileContent: string | null = null;
	let history: (Bookmark | null)[] = [null];
	let historyIndex = 0;

		$: projectFiles = (() => {
		if (!selectedProject) return [];

		const description = $locale === 'fr' ? selectedProject.description_fr : selectedProject.description_en;

		return [
			{
				name: 'about.txt',
				type: 'file',
				icon: '📄',
				content: description ?? ''
			},
			{
				name: `${selectedProject.name}.lnk`,
				type: 'link',
				icon: '🔗',
				url: selectedProject.url
			},
			selectedProject.github
				? {
						name: 'github.url',
						type: 'link',
						icon: '🌐',
						url: selectedProject.github
				  }
				: null
		].filter(Boolean) as FileItem[];
	})();

	$: if (currentFileContent !== null) {
		const aboutFile = projectFiles.find(f => f.name === 'about.txt');
		if (aboutFile && currentFileContent !== aboutFile.content) {
			currentFileContent = aboutFile.content ?? '';
		}
	}

	function navigateTo(project: Bookmark | null) {
		if (historyIndex < history.length - 1) {
			history = history.slice(0, historyIndex + 1);
		}
		history.push(project);
		historyIndex++;
		selectedProject = project;
		currentFileContent = null;
	}

	function goBack() {
		if (historyIndex > 0) {
			historyIndex--;
			selectedProject = history[historyIndex];
			currentFileContent = null;
		}
	}

	function goForward() {
		if (historyIndex < history.length - 1) {
			historyIndex++;
			selectedProject = history[historyIndex];
			currentFileContent = null;
		}
	}

	function handleFileClick(file: FileItem) {
		if (file.type === 'file') {
			currentFileContent = file.content || '';
		} else if (file.type === 'link' && file.url) {
			if (file.name.endsWith('.lnk')) {
				window.dispatchEvent(
					new CustomEvent('open-virtual-browser', { detail: { url: file.url } })
				);
			} else if (file.name === 'github.url') {
				window.open(file.url, '_blank');
			}
		}
	}
</script>

<div class="flex h-full flex-col bg-white dark:bg-gray-800">
	<!-- Toolbar -->
	<div class="flex items-center gap-2 border-b border-gray-200 bg-gray-50 p-3 dark:border-gray-600 dark:bg-gray-700">
		<button
			class="rounded bg-blue-500 px-3 py-1.5 text-sm text-white transition-colors hover:bg-blue-600"
			on:click={goBack}
			disabled={historyIndex === 0}
		>
			← {$_('explorer.back')}
		</button>
		<button
			class="rounded bg-gray-200 px-3 py-1.5 text-sm text-gray-700 transition-colors hover:bg-gray-300 dark:bg-gray-600 dark:text-gray-200 dark:hover:bg-gray-500"
			on:click={goForward}
			disabled={historyIndex === history.length - 1}
		>
			→ {$_('explorer.forward')}
		</button>
		<div class="mx-3 flex-1">
			<input
				type="text"
				value={selectedProject ? `Projects / ${selectedProject.name}` : $_('explorer.projects')}
				class="w-full rounded border border-gray-300 bg-white px-3 py-1.5 text-sm text-gray-900 focus:ring-2 focus:ring-blue-500 focus:outline-none dark:border-gray-500 dark:bg-gray-800 dark:text-gray-100"
				readonly
			/>
		</div>
		{#if selectedProject}
			<button
				class="rounded bg-blue-500 px-3 py-1.5 text-sm text-white transition-colors hover:bg-blue-600"
				on:click={() => navigateTo(null)}
			>
				← {$_('explorer.backToProjects')}
			</button>
		{/if}
		<button class="rounded bg-green-500 px-3 py-1.5 text-sm text-white transition-colors hover:bg-green-600">
			{$_('explorer.newFolder')}
		</button>
	</div>

	<!-- Content View -->
	<div class="flex-1 overflow-auto">
		{#if !selectedProject}
			<!-- Projects View -->
			<div class="p-4">
				<ul>
					{#each $bookmarks as project}
						<li class="mb-2">
							<button
								class="flex w-full items-center gap-2 rounded bg-gray-100 px-3 py-2 text-left transition-colors hover:bg-blue-100 dark:bg-gray-700 dark:hover:bg-blue-800"
								on:click={() => navigateTo(project)}
							>
								<span>📁</span>
								<span class="font-semibold">{project.name}</span>
							</button>
						</li>
					{/each}
				</ul>
			</div>
		{:else}
			<!-- Files View -->
			<div class="p-4">
				<ul>
					{#each projectFiles as file}
						<li class="mb-2">
							<button
								class="flex w-full items-center gap-2 rounded bg-gray-100 px-3 py-2 text-left transition-colors hover:bg-blue-100 dark:bg-gray-700 dark:hover:bg-blue-800"
								on:click={() => handleFileClick(file)}
							>
								<span>{file.icon}</span>
								<span>{file.name}</span>
							</button>
						</li>
					{/each}
				</ul>
				<!-- File Content Display -->
				{#if currentFileContent}
					<div class="mt-6 rounded bg-white p-4 shadow dark:bg-gray-900">
						<h3 class="mb-2 font-bold">about.txt</h3>
						<pre class="whitespace-pre-wrap text-sm">{currentFileContent}</pre>
					</div>
				{/if}
			</div>
		{/if}
	</div>

	<!-- Status Bar -->
	<div class="border-t border-gray-200 bg-gray-50 p-2 text-xs text-gray-500 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-400">
		{$_('explorer.projectsCount', { values: { count: $bookmarks.length } })}
	</div>
</div>