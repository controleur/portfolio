<script lang="ts">
	import { onMount, tick } from 'svelte';
	import { _ } from 'svelte-i18n';

	let terminalOutput: string[] = [];
	
	let currentInput = '';
	let terminalInput: HTMLTextAreaElement;
	let terminalContainer: HTMLDivElement;

	onMount(() => {
		// Initialize with localized welcome message
		terminalOutput = [
			$_('terminal.welcome'),
			$_('terminal.helpHint'),
			''
		];
		
		if (terminalInput) {
			terminalInput.focus();
		}
	});

	function handleKeydown(event: KeyboardEvent) {
		scrollToBottom();
		if (event.ctrlKey && event.key === 'c') {
			// Ctrl+C to interrupt
			handleCtrlC();
			return;
		}

		if (event.ctrlKey && event.key === 'l') {
			// Ctrl+L to clear
			event.preventDefault();
			terminalOutput = [];
			currentInput = '';
			return;
		}

		if (event.key === 'Enter') {
			// Enter to execute command
			event.preventDefault();
			executeCommand(currentInput.trim());
			currentInput = '';
		}
	}

	function handleCtrlC() {
		terminalOutput = [...terminalOutput, `user@portfolio:~$ ${currentInput}^C`];
	}
	function scrollToBottom() {
		tick().then(() => {
			if (terminalContainer) {
				terminalContainer.scrollTop = terminalContainer.scrollHeight;
			}
		});
	}

	function handleTerminalClick() {
		if (terminalInput) {
			terminalInput.focus();
		}
	}

	function executeCommand(command: string) {
		if (command === '') {
			terminalOutput = [...terminalOutput, ''];
			return;
		}

		terminalOutput = [...terminalOutput, `user@portfolio:~$ ${command}`];
		switch (command.toLowerCase()) {
			case 'help':
				terminalOutput = [
					...terminalOutput,
					$_('terminal.helpTitle'),
					`  help     - ${$_('terminal.helpCommands.help')}`,
					`  clear    - ${$_('terminal.helpCommands.clear')}`,
					`  ls       - ${$_('terminal.helpCommands.ls')}`,
					`  pwd      - ${$_('terminal.helpCommands.pwd')}`,
					`  whoami   - ${$_('terminal.helpCommands.whoami')}`,
					`  date     - ${$_('terminal.helpCommands.date')}`,
					`  neofetch - ${$_('terminal.helpCommands.neofetch')}`,
					`  echo     - ${$_('terminal.helpCommands.echo')}`,
					'',
					$_('terminal.keyboardShortcuts'),
					`  Ctrl+C   - ${$_('terminal.shortcuts.ctrlC')}`,
					`  Ctrl+L   - ${$_('terminal.shortcuts.ctrlL')}`
				];
				break;
			case 'clear':
				terminalOutput = [];
				break;
			case 'ls':
				terminalOutput = [
					...terminalOutput,
					'total 12',
					'drwxr-xr-x  2 user user 4096 Dec 20 10:30 Documents',
					'drwxr-xr-x  3 user user 4096 Dec 20 10:30 Projects',
					'-rw-r--r--  1 user user 1024 Dec 20 10:30 README.md',
					'-rw-r--r--  1 user user  220 Dec 20 10:30 .bashrc'
				];
				break;
			case 'pwd':
				terminalOutput = [...terminalOutput, '/home/user'];
				break;
			case 'whoami':
				terminalOutput = [...terminalOutput, 'user'];
				break;
			case 'date':
				terminalOutput = [
					...terminalOutput,
					new Date().toLocaleString('en-US', {
						weekday: 'long',
						year: 'numeric',
						month: 'long',
						day: 'numeric',
						hour: '2-digit',
						minute: '2-digit',
						second: '2-digit'
					})
				];
				break;
			case 'neofetch':
				terminalOutput = [
					...terminalOutput,
					'                   -`                    user@portfolio',
					'                  .o+`                   ─────────────',
					'                 `ooo/                   OS: Portfolio Linux x86_64',
					'                `+oooo:                  Host: KDE Plasma Desktop',
					'               `+oooooo:                 Kernel: 6.5.0-portfolio',
					'               -+oooooo+:                Uptime: 2 days, 13 hours',
					'             `/:-:++oooo+:               Packages: 1337 (npm)',
					'            `/++++/+++++++:              Shell: bash 5.2.15',
					'           `/++++++++++++++:             Resolution: 1920x1080',
					'          `/+++ooooooooo+++/             DE: KDE Plasma 5.27',
					'         ./ooosssso++osssssso+`          WM: KWin',
					'        .oossssso-````/ossssss+`         Theme: Breeze [Plasma]',
					'       -osssssso.      :ssssssso.        Icons: Breeze [Plasma]',
					'      :osssssss/        osssso+++.       Terminal: Portfolio Terminal',
					'     /ossssssss/        +ssssooo/-       CPU: Intel i9-13900K',
					'   `/ossssso+/:-        -:/+osssso+-     GPU: NVIDIA RTX 4090',
					'  `+sso+:-`                 `.-/+oso:    Memory: 8192MB / 32768MB',
					' `++:.                           `-/+/',
					' .`                                 `/'
				];
				break;
			default:
				if (command.toLowerCase().startsWith('echo ')) {
					const text = command.slice(5);
					terminalOutput = [...terminalOutput, text];
				} else {
					terminalOutput = [...terminalOutput, `bash: ${command}: ${$_('terminal.commandNotFound')}`];
				}
		}

		terminalOutput = [...terminalOutput, ''];

		if (terminalInput) {
			terminalInput.focus();
		}
	}
</script>

<div
	class="flex h-full min-h-0 w-full flex-1 flex-col bg-black font-mono text-sm tracking-wide text-green-400"
	on:click={handleTerminalClick}
	on:keydown={(e) => e.key === 'Enter' && handleTerminalClick()}
	role="button"
	tabindex="0"
>
	<div class="terminal-scroll flex-1 overflow-y-auto" bind:this={terminalContainer}>
		<div class="flex h-full min-h-0 flex-col p-4">
			{#each terminalOutput as line}
				<div class="leading-relaxed whitespace-pre-wrap select-text">{line}</div>
			{/each}

			<div class="mt-2 flex">
				<span class="mr-1 text-green-400 select-none">user@portfolio:~$</span>
				<span class="relative text-green-400">
					<span
						class="min-h-[1.5em] bg-transparent break-all whitespace-pre-wrap outline-none"
						style="display:inline-block;"
					>
						{currentInput}<span class="animate-blink">█</span>
					</span>
					<textarea
						bind:this={terminalInput}
						bind:value={currentInput}
						on:keydown={handleKeydown}
						class="absolute inset-0 h-full w-full opacity-0"
						autocomplete="off"
						spellcheck="false"
						name="terminal-input"
						rows="1"
						aria-label="Terminal command input"
						tabindex="0"
					></textarea>
				</span>
			</div>
			<div class="h-4"></div>
		</div>
	</div>
	<div
		class="flex-shrink-0 border-t border-gray-700 bg-gray-900 px-4 py-2 text-xs text-gray-400 select-none"
	>
		<span class="font-medium">Terminal</span> - {$_('terminal.statusBar')} |
		<span class="text-gray-500">{$_('terminal.statusShortcuts')}</span>
	</div>
</div>

<style>
	.terminal-scroll {
		scrollbar-width: none;
		scroll-behavior: smooth;
	}
</style>
