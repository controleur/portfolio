# Portfoli.OS - Desktop Environment Portfolio

Portfoli.OS is a SvelteKit-based portfolio application that simulates a KDE Plasma-inspired desktop environment. It features a taskbar, window management system, terminal, file explorer, and multiple applications showcasing various projects.

**ALWAYS follow these instructions first and only fall back to additional search or bash commands if the information here is incomplete or found to be in error.**

## Working Effectively

### Bootstrap and Build (VALIDATED)

Always run these commands in this exact order:

```bash
npm install  # Takes ~1.5 minutes. NEVER CANCEL. Set timeout to 3+ minutes.
npm run build  # Takes ~10 seconds. Set timeout to 30+ seconds.
```

### Development Server (VALIDATED)

```bash
npm run dev  # Starts dev server on http://localhost:5173
```

- Server starts in ~3 seconds
- Hot reload is enabled
- Always test the application by navigating to http://localhost:5173

### Production Build Testing (VALIDATED)

```bash
npm run build  # Build for production
npm run preview  # Serves production build on http://localhost:4173
```

### Code Quality (VALIDATED - WITH KNOWN ISSUES)

```bash
npm run format  # Takes ~2 seconds. ALWAYS run before committing.
npm run check   # Takes ~6 seconds. TypeScript check - PASSES.
npm run lint    # Takes ~8 seconds. FAILS with 34 pre-existing errors.
```

**IMPORTANT**: The lint command currently fails with 34 pre-existing linting errors related to:

- Unused variables
- XSS warnings from `{@html}` usage
- Missing keys in `each` blocks
- TypeScript `any` types

These are existing code issues. Do NOT fix unrelated linting errors unless specifically asked.

### Docker Setup (DOES NOT WORK)

```bash
docker compose up --build -d  # FAILS during npm install step
```

**KNOWN ISSUE**: Docker build fails with npm install errors. Use local development instead.

## Validation Scenarios

**CRITICAL**: After making any changes, ALWAYS validate the application by running through these complete user scenarios:

### Basic Desktop Environment Test

1. Start dev server: `npm run dev`
2. Navigate to http://localhost:5173
3. Wait for loading screen to complete (~5 seconds)
4. Verify desktop loads with wallpaper and taskbar
5. Verify terminal automatically opens

### Terminal Functionality Test

1. Type `help` in the terminal and press Enter
2. Verify command list appears
3. Test other commands: `ls`, `pwd`, `whoami`, `date`, `neofetch`

### Application Navigation Test

1. Click the start menu button (bottom-left)
2. Verify menu opens showing: Explorer, Browser, Terminal, Editor, Settings, About
3. Click "Explorer Browse your files"
4. Verify Explorer window opens showing portfolio projects
5. Verify both Terminal and Explorer appear in taskbar

### Theme and UI Test

1. Click the theme toggle button in taskbar
2. Verify wallpaper and UI switch between light/dark modes
3. Test language toggle (en/fr)
4. Verify time displays correctly in taskbar

### Window Management Test

1. Test minimizing/maximizing windows using window controls
2. Test moving windows by dragging title bars
3. Test clicking taskbar icons to focus windows

## Timing Expectations

- **npm install**: 1-2 minutes. NEVER CANCEL. Set timeout to 180+ seconds.
- **npm run build**: 8-15 seconds. Set timeout to 60+ seconds.
- **npm run dev**: 3-5 seconds to start. Set timeout to 30+ seconds.
- **npm run format**: 2-3 seconds. Set timeout to 30+ seconds.
- **npm run check**: 6-10 seconds. Set timeout to 60+ seconds.
- **npm run lint**: 8-12 seconds. Set timeout to 60+ seconds. (FAILS with pre-existing issues)

## Key Technologies and Architecture

### Tech Stack

- **SvelteKit** with TypeScript for the main framework
- **TailwindCSS** for styling and responsive design
- **Svelte-i18n** for internationalization (English/French)
- **Vite** as build tool with HMR
- **Node.js adapter** for production deployment

### Project Structure

```
src/
├── routes/              # SvelteKit pages
├── components/          # Reusable UI components
│   ├── applications/    # Desktop applications (Terminal, Explorer, etc.)
│   ├── taskbar/        # Taskbar components
│   ├── LoadingScreen.svelte
│   └── Window.svelte   # Window management system
├── lib/                # Utilities and stores
│   ├── stores/         # Svelte stores for state management
│   ├── icons.ts        # Icon definitions
│   └── types.ts        # TypeScript types
├── locales/            # i18n translation files
└── static/             # Static assets (wallpapers, favicon)
```

### Important Files to Check When Making Changes

- **src/lib/stores/windowStore.ts** - Window management state
- **src/lib/stores/appStore.ts** - Application registry
- **src/components/Window.svelte** - Window component behavior
- **src/components/taskbar/Taskbar.svelte** - Taskbar functionality
- **src/routes/+layout.svelte** - Main application layout and loading

## Common Tasks

### Adding New Applications

1. Create new component in `src/components/applications/`
2. Register in `src/lib/stores/appStore.ts`
3. Add icon to `src/lib/icons.ts`
4. Test via start menu

### Modifying Desktop Behavior

1. Check `src/routes/+layout.svelte` for main desktop logic
2. Window management in `src/lib/stores/windowStore.ts`
3. UI state in `src/lib/stores/uiStore.ts`

### Adding Translations

1. Add keys to `src/locales/en.json` and `src/locales/fr.json`
2. Use `$_('key')` in Svelte components
3. Test language toggle in taskbar

## Known Limitations

- **Docker builds fail** - Use local development only
- **Linting has 34 pre-existing errors** - Do not fix unless specifically requested
- **npm audit reports 6 vulnerabilities** - These are dependency-related
- **No automated tests** - Manual validation is required

## Required Dependencies

The application uses Node.js 22+ and requires these exact commands:

```bash
npm install  # Installs all dependencies from package.json
```

No additional system dependencies are required beyond Node.js and npm.

## Emergency Troubleshooting

If build fails:

1. Delete `node_modules` and `package-lock.json`
2. Run `npm install` again
3. If still failing, check Node.js version (requires v18+)

If dev server doesn't start:

1. Check if port 5173 is available
2. Try `npm run dev -- --port 3000` for alternative port
3. Clear browser cache and try again

**Always run `npm run format` before committing changes to maintain code style consistency.**
