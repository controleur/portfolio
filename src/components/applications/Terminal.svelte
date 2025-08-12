<script lang="ts">
	import { onMount, tick } from 'svelte';
	
	let terminalOutput: string[] = [
		'Welcome to Portfolio Terminal!',
		'Type "help" to see available commands.',
		'',
	];
	
	let currentInput = '';
	let terminalInput: HTMLTextAreaElement;
	let terminalContainer: HTMLDivElement;
	
	onMount(() => {
		if (terminalInput) {
			terminalInput.focus();
		}

	});
	
	function handleKeydown(event: KeyboardEvent) {
		scrollToBottom();
		if (event.ctrlKey && event.key === 'c') { // Ctrl+C to interrupt
			handleCtrlC();
			return;
		}

		if (event.ctrlKey && event.key === 'l') { // Ctrl+L to clear
			event.preventDefault();
			terminalOutput = [];
			currentInput = '';
			return;
		}

		if (event.key === 'Enter') { // Enter to execute command
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
				terminalOutput = [...terminalOutput, 
					'Available commands:',
					'  help     - Show this help',
					'  clear    - Clear the terminal',
					'  ls       - List files',
					'  pwd      - Show current directory',
					'  whoami   - Show username',
					'  date     - Show current date',
					'  neofetch - Show system info',
					'  echo     - Echo text back',
					'',
					'Keyboard shortcuts:',
					'  Ctrl+C   - Interrupt current command',
					'  Ctrl+L   - Clear screen'
				];
				break;
			case 'clear':
				terminalOutput = [];
				break;
			case 'ls':
				terminalOutput = [...terminalOutput, 
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
				terminalOutput = [...terminalOutput, new Date().toLocaleString('en-US', {
					weekday: 'long',
					year: 'numeric',
					month: 'long',
					day: 'numeric',
					hour: '2-digit',
					minute: '2-digit',
					second: '2-digit'
				})];
				break;
			case 'neofetch':
				terminalOutput = [...terminalOutput,
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
					terminalOutput = [...terminalOutput, `bash: ${command}: command not found`];
				}
		}
		
		terminalOutput = [...terminalOutput, ''];
		
		if (terminalInput) { 
			terminalInput.focus();
		}
	}
</script>

 <style>	
	.terminal-scroll {
		scrollbar-width: none;
		scroll-behavior: smooth;
	}
</style>

<div 
	   class="flex-1 h-full w-full min-h-0 bg-black text-green-400 font-mono text-sm flex flex-col tracking-wide" 
	   on:click={handleTerminalClick} 
	   on:keydown={(e) => e.key === 'Enter' && handleTerminalClick()}
	   role="button"
	   tabindex="0"
>
	   <div class="flex-1 overflow-y-auto terminal-scroll" bind:this={terminalContainer}>
			   <div class="flex flex-col h-full min-h-0 p-4">
					   {#each terminalOutput as line}
							   <div class="whitespace-pre-wrap leading-relaxed select-text">{line}</div>
					   {/each}
					   
					   <div class="flex mt-2">
						   <span class="text-green-400 select-none mr-1">user@portfolio:~$</span>
						   <span class="text-green-400 relative">
							   <span class="min-h-[1.5em] outline-none bg-transparent whitespace-pre-wrap break-all" style="display:inline-block;">
								   {currentInput}<span class="animate-blink">█</span>
							   </span>
							   <textarea
								   bind:this={terminalInput}
								   bind:value={currentInput}
								   on:keydown={handleKeydown}
								   class="absolute inset-0 w-full h-full opacity-0"
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
	   <div class="flex-shrink-0 px-4 py-2 bg-gray-900 text-xs text-gray-400 border-t border-gray-700 select-none">
			   <span class="font-medium">Terminal</span> - Type 'help' to see available commands | 
			   <span class="text-gray-500">Ctrl+C to interrupt | Ctrl+L to clear</span>
	   </div>
</div>
