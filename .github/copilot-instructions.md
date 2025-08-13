# Portfolio Desktop Environment

Always reference these instructions first and fallback to search or bash commands only when you encounter unexpected information that does not match the info here.

This is a SvelteKit-based portfolio application that simulates a KDE Plasma desktop environment with functional terminal, browser, file explorer, and code editor applications. Built with TypeScript, Tailwind CSS 4, and internationalization support.

## Working Effectively

### Bootstrap and Setup
- NEVER CANCEL: `npm install` takes 1 minute. Set timeout to 3+ minutes.
- Always run these commands in sequence for fresh setup:
  1. `npm install` -- 1 minute
  2. `npm run format` -- formats all files with Prettier
  3. `npm run check` -- TypeScript validation, 6 seconds, MUST show 0 errors

### Build and Development  
- NEVER CANCEL: `npm run build` takes 7.5 seconds. Set timeout to 2+ minutes.
- Build the application: `npm run build` -- 7.5 seconds
- Development server: `npm run dev` -- starts in 2.4 seconds on port 5173
- Production preview: `npm run preview` -- runs built app on port 4173
- TypeScript checking: `npm run check` -- 6 seconds, should report 0 errors and 0 warnings

### Code Quality
- Format code: `npm run format` -- applies Prettier formatting to all files
- Lint code: `npm run lint` -- EXPECTED: 34 existing linting errors (mostly XSS warnings from {@html} usage and unused variables). These do not block functionality.
- ALWAYS run `npm run format` before committing changes
- DO NOT try to fix existing linting errors unless specifically working on code quality - they are known issues

## Manual Validation Scenarios

### CRITICAL: Always Test These Scenarios After Making Changes
1. **Application Loading**: Navigate to http://localhost:5173 and verify the desktop environment loads completely (should show taskbar and terminal window)
2. **Terminal Functionality**: 
   - Type `help` in terminal and press Enter - should show available commands
   - Type `neofetch` - should display system information with ASCII art
   - Type `ls` - should list mock files
3. **Start Menu**: Click the start menu button (KDE logo) - should show applications list with Explorer, Browser, Terminal, Editor, Settings, About
4. **Browser Application**: Click Browser from start menu - should open browser window with bookmarks toolbar
5. **Window Management**: Test minimize, maximize, and close buttons on any application window

### Expected Behavior
- Application loads within 3 seconds on development server
- Terminal responds instantly to commands with mock data
- All applications open from start menu without errors
- Window controls (minimize/maximize/close) work correctly
- Desktop environment feels responsive and functional

## Docker Support

### Docker Development (HAS KNOWN ISSUES)
- `docker compose -f docker-compose.yml up --build` -- FAILS with npm install errors in container
- Use local development instead: `npm run dev`
- Production Docker: `docker compose -f docker-compose.build.yml up --build` -- untested due to npm install issues

### Known Docker Limitation
- npm install fails in Docker container environment
- Always use local Node.js development workflow instead
- Document any Docker fixes in commit messages

## Application Architecture

### Key Directories
- `src/routes/` - SvelteKit page routes (+layout.svelte, +page.svelte)
- `src/components/` - Svelte components for desktop environment
  - `applications/` - Individual desktop applications (Terminal.svelte, Browser.svelte, etc.)
  - `taskbar/` - Taskbar components (StartMenu.svelte, AppIcon.svelte, etc.)
- `src/lib/` - Shared utilities and stores
  - `stores/` - Svelte stores for state management (windowStore.ts, appStore.ts, etc.)
- `src/locales/` - Internationalization files (en.json, fr.json)
- `static/` - Static assets including wallpapers

### Technology Stack
- **Framework**: SvelteKit with TypeScript
- **Styling**: Tailwind CSS 4 with @tailwindcss/vite plugin  
- **Build Tool**: Vite 6
- **Node Version**: 22 (as specified in Docker files)
- **Package Manager**: npm
- **Internationalization**: svelte-i18n
- **Adapter**: @sveltejs/adapter-node for production

### Configuration Files
- `package.json` - npm scripts and dependencies
- `svelte.config.js` - SvelteKit configuration with adapter-node
- `vite.config.ts` - Vite configuration with Tailwind and development server settings
- `tsconfig.json` - TypeScript configuration
- `eslint.config.js` - ESLint configuration for TypeScript and Svelte
- `.prettierrc` - Prettier code formatting rules

## Common Tasks

### Making UI Changes
- Always test in development server: `npm run dev`
- ALWAYS manually validate the desktop environment after changes
- Take screenshots for significant UI changes
- Test both light and dark themes using the theme toggle button

### Working with Applications
- Desktop applications are in `src/components/applications/`
- Window management is handled by `src/components/Window.svelte`
- Application state is managed in `src/lib/stores/`
- Always test opening and closing applications from the start menu

### Internationalization
- English translations: `src/locales/en.json`
- French translations: `src/locales/fr.json`
- Test language switching using the language button in taskbar

### Expected File Structure Output
```
ls -la (project root):
.dockerignore
.git/
.gitignore
.npmrc
.prettierignore  
.prettierrc
README.md
docker/
docker-compose.build.yml
docker-compose.yml
eslint.config.js
package-lock.json
package.json
src/
static/
svelte.config.js
tsconfig.json
vite.config.ts
```

### Build Output Validation
- Build creates `.svelte-kit/output/` directory
- Client bundle should be ~200KB (gzipped ~40KB)
- Server bundle should include all necessary files
- Build should complete without TypeScript errors

## Performance Expectations

### Command Timing (NEVER CANCEL)
- `npm install`: 1 minute - Set 3+ minute timeout
- `npm run build`: 7.5 seconds - Set 2+ minute timeout  
- `npm run dev`: 2.4 seconds startup - Set 1+ minute timeout
- `npm run check`: 6 seconds - Set 1+ minute timeout
- `npm run format`: <10 seconds - Set 30 second timeout
- `npm run lint`: ~10 seconds - Set 1+ minute timeout

### Application Performance
- Desktop environment loads in <3 seconds
- Terminal commands respond instantly
- Application switching is immediate
- Window operations (minimize/maximize/close) are instant

## Known Issues and Limitations

### Linting
- 34 existing linting errors are EXPECTED and functional
- Most errors are XSS warnings from {@html} usage (required for desktop simulation)
- Some unused variables and missing Svelte keys
- DO NOT fix these unless specifically working on code quality

### Docker
- npm install fails in Docker container environment
- Use local Node.js development workflow
- Docker Compose files exist but are not functional due to npm issues

### Browser Application
- Iframe content may be blocked in testing environments (expected)
- Portfolio project links are external and may not load in sandboxed environments
- Browser functionality works correctly for navigation and bookmarks

## Debugging Tips

### Development Issues
- If development server fails to start, check port 5173 availability
- If build fails, run `npm run check` to identify TypeScript errors
- If applications don't load, check browser console for JavaScript errors
- If styles look broken, verify Tailwind CSS compilation

### Testing Changes
- ALWAYS run full manual validation after making changes
- Test both development (`npm run dev`) and production (`npm run preview`) builds
- Verify desktop environment functionality completely
- Test multiple applications and window operations