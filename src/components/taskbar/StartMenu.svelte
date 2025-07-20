
<script lang="ts">
import { onMount } from 'svelte';
import { TASKBAR_ICONS } from '../../lib/taskbarIcons';
import { ICONS } from '../../lib/icons';

export let apps: Array<{ id: number; name: string; icon: keyof typeof TASKBAR_ICONS; description: string } > = [];
export let onLaunch: (appId: number) => void;
export let onClose: () => void;

let search = '';

let filteredApps: typeof apps = apps;

let searchInput: HTMLInputElement;

let starMenuRef: HTMLDivElement;



$: filteredApps = search
  ? apps.filter(app => app.name.toLowerCase().includes(search.toLowerCase()))
  : apps;


function handleLaunch(appId: number) {
  onLaunch(appId);
  onClose();
}

function handleKeydown(e: KeyboardEvent) {
  if (e.key === 'Escape') onClose();
}

onMount(() => {
  window.addEventListener('keydown', handleKeydown);
  searchInput && searchInput.focus();
  const handleClickOutside = (event: MouseEvent) => {
			if (starMenuRef && event.target instanceof Node && !starMenuRef.contains(event.target)) {
				onClose();
			}
		};

		setTimeout(() => {
			document.addEventListener('click', handleClickOutside);
		}, 100);
  return () => {window.removeEventListener('keydown', handleKeydown);
    document.removeEventListener('click', handleClickOutside);
  }
});
</script>

<div class="fixed left-2 bottom-14 z-[10000] w-80 rounded-xl shadow-2xl bg-white/90 dark:bg-gray-800/95 border border-gray-300 dark:border-gray-700 flex flex-col overflow-hidden animate-fade-in" bind:this={starMenuRef}>
  <div class="flex items-center gap-2 px-4 py-3 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900">
    <span class="text-2xl dark:text-gray-300">{@html ICONS.startMenu}</span>
    <input
      class="flex-1 ml-2 px-2 py-1 rounded bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none"
      type="text"
      placeholder="Search apps..."
      bind:value={search}
      bind:this={searchInput}
      aria-label="Search applications"
    />
  </div>
  <div class="flex-1 overflow-y-auto p-2 bg-white dark:bg-gray-800">
    {#if filteredApps.length === 0}
      <div class="text-center text-gray-400 py-8">No applications found</div>
    {:else}
      <ul class="space-y-1">
        {#each filteredApps as app}
          <li>
            <button
              class="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-900 transition-colors group"
              on:click={() => handleLaunch(app.id)}
            >
              <span class="text-xl dark:text-gray-300">{@html TASKBAR_ICONS[app.icon]}</span>
              <div class="flex flex-col items-start text-left">
                <span class="font-medium text-gray-900 dark:text-gray-300 group-hover:text-blue-700 dark:group-hover:text-blue-300">{app.name}</span>
                <span class="text-xs text-gray-500 dark:text-gray-400">{app.description}</span>
              </div>
            </button>
          </li>
        {/each}
      </ul>
    {/if}
  </div>
</div>

<style>
  .animate-fade-in {
    animation: fadeIn 0.18s cubic-bezier(0.4,0,0.2,1);
  }
  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
  }
</style>
