<script lang="ts">
import Explorer from './Explorer.svelte';
import Terminal from './Terminal.svelte';
import Browser from './Browser.svelte';
import Editor from './Editor.svelte';

type AppKey = 'Explorer' | 'Terminal' | 'Browser' | 'Editor';
export let appName: string;
const components: Record<AppKey, typeof Explorer> = {
	Explorer,
	Terminal,
	Browser,
	Editor
};

$: component = components[appName as AppKey];
</script>

<div class="h-full min-h-0 flex flex-col text-gray-700 dark:text-gray-300">
	{#if component}
		<svelte:component this={component} />
	{:else}
		<p>Unknown application: {appName}</p>
	{/if}
</div>
