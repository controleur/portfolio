<script lang="ts">
	export let icon: string = '';
	export let value: string = '';
	export let tooltip: string = '';
	export let clickable: boolean = false;
	export let onclick: () => void = () => {};

	function handleClick(): void {
		if (clickable) {
			onclick();
		}
	}
</script>

{#if clickable}
	<button
		class="font-inherit flex items-center gap-1 rounded border-none bg-transparent px-1 py-0.5 text-gray-900 transition-colors hover:bg-black/10 focus:outline-2 focus:outline-offset-2 focus:outline-blue-500 dark:text-gray-100 dark:hover:bg-white/10"
		title={tooltip}
		on:click={handleClick}
	>
		{@html icon}
		{#if value}
			<span class="text-gray-900 dark:text-gray-100">{value}</span>
		{/if}
	</button>
{:else}
	<div
		class="flex items-center gap-1 rounded px-1 py-0.5 text-gray-900 transition-colors dark:text-gray-100"
		title={tooltip}
	>
		{@html icon}
		{#if value}
			<span class="text-gray-900 dark:text-gray-100">{value}</span>
		{/if}
	</div>
{/if}
