import { writable } from 'svelte/store';

export interface Bookmark {
  name: string;
  url: string;
  github?: string;
  description?: string;
}

export const bookmarks = writable<Bookmark[]>([
  { name: 'Portfolio ⭐', url: 'https://portfolio.dev', github: 'https://github.com/controleur/portfolio', description: 'Portfolio personnel SvelteKit.' },
  { name: 'Ivory 🎹', url: 'https://studio.ivory-app.com', github: 'https://github.com/controleur/ivory', description: 'Studio musical Ivory.' },
  { name: 'Nina Carducci 📸', url: 'https://controleur.github.io/nina-carducci/', github: 'https://github.com/controleur/nina-carducci', description: 'Site photographe Nina Carducci.' },
  { name: 'Booki 🛏️', url: 'https://controleur.github.io/booki/', github: 'https://github.com/controleur/booki', description: 'Site de réservation Booki.' },
  { name: 'Sophie Bluel 🎨', url: 'https://sophie-bluel-five.vercel.app/', github: 'https://github.com/controleur/sophie-bluel', description: 'Portfolio Sophie Bluel.' },
  { name: 'Kasa 🏠', url: 'https://kasa-five-ebon.vercel.app/', github: 'https://github.com/controleur/kasa', description: 'Site immobilier Kasa.' },
  { name: 'Mon Vieux Grimoire API 📚', url: 'https://mon-vieux-grimoire-backend-pi.vercel.app/api-docs', github: 'https://github.com/controleur/mon-vieux-grimoire', description: 'API docs Mon Vieux Grimoire.' }
]);
