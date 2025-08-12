<script lang="ts">
import { bookmarks } from '$lib/stores/bookmarkStore';
import type { Bookmark } from '$lib/stores/bookmarkStore';

interface FileItem {
    name: string;
    type: 'folder' | 'file' | 'link';
    icon: string;
    content?: string;
    url?: string;
}


let currentPath: string = 'Projects';
let selectedProject: Bookmark | null = null;
let fileContent: string | null = null;
let history: (Bookmark | null)[] = [null];
let historyIndex = 0;

function goBack() {
    if (historyIndex > 0) {
        historyIndex--;
        selectedProject = history[historyIndex];
        fileContent = null;
    }
}

function goForward() {
    if (historyIndex < history.length - 1) {
        historyIndex++;
        selectedProject = history[historyIndex];
        fileContent = null;
    }
}

function getProjectFiles(project: Bookmark): FileItem[] {
    return [
        {
            name: 'about.txt',
            type: 'file',
            icon: '📄',
            content: project.description,
        },
        {
            name: `${project.name}.lnk`,
            type: 'link',
            icon: '🔗',
            url: project.url,
        },
        project.github
            ? {
                    name: 'github.url',
                    type: 'link',
                    icon: '🌐',
                    url: project.github,
                }
            : null,
    ].filter(Boolean) as FileItem[];
}

function handleFolderClick(project: Bookmark) {
    // Si on navigue vers un nouveau projet, tronque l'historique
    if (historyIndex < history.length - 1) {
        history = history.slice(0, historyIndex + 1);
    }
    history.push(project);
    historyIndex = history.length - 1;
    selectedProject = project;
    fileContent = null;
}

function handleFileClick(file: FileItem) {
    if (file.type === 'file') {
        fileContent = file.content || '';
    } else if (file.type === 'link' && file.url) {
        if (file.name.endsWith('.lnk')) {
            window.dispatchEvent(new CustomEvent('open-virtual-browser', { detail: { url: file.url } }));
        } else if (file.name === 'github.url') {
            window.open(file.url, '_blank');
        }
    }
}
</script>

<div class="flex flex-col h-full bg-white dark:bg-gray-800">
    <!-- Toolbar -->
        <div class="flex items-center gap-2 p-3 border-b border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700">
            <button class="px-3 py-1.5 text-sm bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors" on:click={goBack} disabled={historyIndex === 0}>
                ← Back
            </button>
            <button class="px-3 py-1.5 text-sm bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-200 rounded hover:bg-gray-300 dark:hover:bg-gray-500 transition-colors" on:click={goForward} disabled={historyIndex === history.length - 1}>
                → Forward
            </button>
            <div class="flex-1 mx-3">
                <input 
                    type="text" 
                    value={selectedProject ? selectedProject.name : 'Projects'}
                    class="w-full px-3 py-1.5 text-sm border border-gray-300 dark:border-gray-500 rounded bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    readonly
                />
            </div>
            {#if selectedProject}
                <button class="px-3 py-1.5 text-sm bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors" on:click={() => { selectedProject = null; fileContent = null; history.push(null); historyIndex = history.length - 1; }}>
                    ← Retour aux projets
                </button>
            {/if}
            <button class="px-3 py-1.5 text-sm bg-green-500 text-white rounded hover:bg-green-600 transition-colors">
                New Folder
            </button>
        </div>

        <!-- Vue dossiers projets -->
        <div class="flex-1 overflow-auto">
            {#if !selectedProject}
                <div class="p-4">
                    <ul>
                        {#each $bookmarks as project}
                            <li class="mb-2">
                                <button class="flex items-center gap-2 px-3 py-2 rounded bg-gray-100 dark:bg-gray-700 hover:bg-blue-100 dark:hover:bg-blue-800 transition-colors w-full text-left" on:click={() => handleFolderClick(project)}>
                                    <span>📁</span>
                                    <span class="font-semibold">{project.name}</span>
                                </button>
                            </li>
                        {/each}
                    </ul>
                </div>
            {:else}
                <div class="p-4">
                    <ul>
                        {#each getProjectFiles(selectedProject) as file}
                            <li class="mb-2">
                                <button class="flex items-center gap-2 px-3 py-2 rounded bg-gray-100 dark:bg-gray-700 hover:bg-blue-100 dark:hover:bg-blue-800 transition-colors w-full text-left" on:click={() => handleFileClick(file)}>
                                    <span>{file.icon}</span>
                                    <span>{file.name}</span>
                                </button>
                            </li>
                        {/each}
                    </ul>
                    {#if fileContent}
                        <div class="mt-6 p-4 bg-white dark:bg-gray-900 rounded shadow">
                            <h3 class="font-bold mb-2">about.txt</h3>
                            <pre class="whitespace-pre-wrap text-sm">{fileContent}</pre>
                        </div>
                    {/if}
                </div>
            {/if}
        </div>

    <!-- Status Bar -->
    <div class="p-2 text-xs text-gray-500 dark:text-gray-400 bg-gray-50 dark:bg-gray-700 border-t border-gray-200 dark:border-gray-600">
        {$bookmarks.length} projet(s)
    </div>
</div>