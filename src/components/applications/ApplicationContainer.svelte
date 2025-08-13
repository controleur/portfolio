<script lang="ts">
	import Explorer from './Explorer.svelte';
	import Terminal from './Terminal.svelte';
	import Browser from './Browser.svelte';
	import Editor from './Editor.svelte';

	type AppKey = 'Explorer' | 'Terminal' | 'Browser' | 'Editor';
	export let appName: string;
	export let content: string = '';
	import type { SvelteComponent } from 'svelte';
	const components: Record<AppKey, typeof SvelteComponent<Record<string, unknown>>> = {
		Explorer,
		Terminal,
		Browser,
		Editor
	};

	$: component = components[appName as AppKey];
</script>

<div class="flex h-full min-h-0 flex-col text-gray-700 dark:text-gray-300">
	{#if component}
		{#if appName === 'Browser'}
			<svelte:component this={component} {content} />
		{:else}
			<svelte:component this={component} />
		{/if}
	{:else}
		<p>Unknown application: {appName}</p>
	{/if}
</div>
