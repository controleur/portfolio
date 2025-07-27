<script lang="ts">
	interface FileItem {
		name: string;
		type: 'folder' | 'file' | 'image' | 'audio' | 'video';
		size?: string;
		modified: string;
		icon?: string;
	}
	
	const currentPath = 'C:\\Users\\User\\Documents';
	
	const files: FileItem[] = [
		{ name: 'Projects', type: 'folder', modified: '2024-01-15', icon: '📁' },
		{ name: 'Portfolio', type: 'folder', modified: '2024-01-20', icon: '📁' },
		{ name: 'Documents', type: 'folder', modified: '2024-01-10', icon: '📁' },
		{ name: 'Pictures', type: 'folder', modified: '2024-01-12', icon: '📁' },
		{ name: 'README.md', type: 'file', size: '2.3 KB', modified: '2024-01-18', icon: '📄' },
		{ name: 'package.json', type: 'file', size: '1.2 KB', modified: '2024-01-19', icon: '📄' },
		{ name: 'screenshot.png', type: 'image', size: '845 KB', modified: '2024-01-16', icon: '🖼️' },
		{ name: 'demo.mp4', type: 'video', size: '12.5 MB', modified: '2024-01-14', icon: '🎬' },
		{ name: 'music.mp3', type: 'audio', size: '5.2 MB', modified: '2024-01-12', icon: '🎵' }
	];
	
	function formatSize(size?: string) {
		return size || '--';
	}
	
	function handleClick(file: FileItem) {
		if (file.type === 'folder') {
			console.log(`Navigate to ${file.name}`);
		} else {
			console.log(`Open ${file.name}`);
		}
	}
</script>

<div class="flex flex-col h-full bg-white dark:bg-gray-800">
	<!-- Toolbar -->
	<div class="flex items-center gap-2 p-3 border-b border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700">
		<button class="px-3 py-1.5 text-sm bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors">
			← Back
		</button>
		<button class="px-3 py-1.5 text-sm bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-200 rounded hover:bg-gray-300 dark:hover:bg-gray-500 transition-colors">
			→ Forward
		</button>
		<div class="flex-1 mx-3">
			<input 
				type="text" 
				value={currentPath}
				class="w-full px-3 py-1.5 text-sm border border-gray-300 dark:border-gray-500 rounded bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
				readonly
			/>
		</div>
		<button class="px-3 py-1.5 text-sm bg-green-500 text-white rounded hover:bg-green-600 transition-colors">
			New Folder
		</button>
	</div>
	
	<!-- File List -->
	<div class="flex-1 overflow-auto">
		<!-- Header -->
		<div class="grid grid-cols-4 gap-4 p-3 text-sm font-medium text-gray-600 dark:text-gray-400 bg-gray-50 dark:bg-gray-700 border-b border-gray-200 dark:border-gray-600">
			<div>Name</div>
			<div>Type</div>
			<div>Size</div>
			<div>Modified</div>
		</div>
		
		<!-- Files -->
		<div class="divide-y divide-gray-100 dark:divide-gray-600">
			{#each files as file}
				<div 
					class="grid grid-cols-4 gap-4 p-3 hover:bg-blue-50 dark:hover:bg-blue-900/20 cursor-pointer group transition-colors"
					role="button"
					tabindex="0"
					on:click={() => handleClick(file)}
					on:keydown={(e) => e.key === 'Enter' && handleClick(file)}
				>
					<div class="flex items-center gap-2">
						<span class="text-lg">{file.icon}</span>
						<span class="text-sm truncate group-hover:text-blue-600 dark:group-hover:text-blue-400 dark:text-gray-200">{file.name}</span>
					</div>
					<div class="text-sm text-gray-500 dark:text-gray-400 capitalize">
						{file.type === 'folder' ? 'Folder' : 'File'}
					</div>
					<div class="text-sm text-gray-500 dark:text-gray-400">{formatSize(file.size)}</div>
					<div class="text-sm text-gray-500 dark:text-gray-400">{file.modified}</div>
				</div>
			{/each}
		</div>
	</div>
	
	<!-- Status Bar -->
	<div class="p-2 text-xs text-gray-500 dark:text-gray-400 bg-gray-50 dark:bg-gray-700 border-t border-gray-200 dark:border-gray-600">
		{files.length} item(s) | {files.filter(f => f.type === 'folder').length} folder(s) | {files.filter(f => f.type !== 'folder').length} file(s)
	</div>
</div>
