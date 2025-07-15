<script lang="ts">
	import FileExplorer from './FileExplorer.svelte';
	import Terminal from './Terminal.svelte';
	import Browser from './Browser.svelte';
	import Editor from './Editor.svelte';
	
	export let appName: string;
</script>

<div class="h-full min-h-0 flex flex-col text-gray-700 dark:text-gray-300">	
	{#if appName === "File Explorer"}
		<FileExplorer />
	{:else if appName === "Terminal"}
		<Terminal />
	{:else if appName === "Browser"}
		<Browser />
	{:else if appName === "Editor"}
		<Editor />
	{:else}
		<p>Welcome to {appName}!</p>
	{/if}
</div>
