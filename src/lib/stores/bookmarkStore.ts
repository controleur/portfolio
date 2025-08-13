import { writable } from 'svelte/store';

export interface Bookmark {
		name: string;
		url: string;
		github?: string;
		description_en: string;
		description_fr: string;
}

export const bookmarks = writable<Bookmark[]>([
		{
			name: 'Portfolio ⭐',
			url: 'https://portfolio.dev',
			github: 'https://github.com/controleur/portfolio',
			description_en: 'This is my personal portfolio built with SvelteKit, Tailwind CSS, and other modern web technologies. This project helped me to understand how Svelte and SvelteKit work, as well as to get to know Tailwind CSS. Since I am based outside of France, I also had to implement a solution for internationalization.',
			description_fr: 'Portfolio personnel construit avec SvelteKit, Tailwind CSS et d\'autres technologies web modernes. Ce projet m\'a aidé à comprendre comment Svelte et SvelteKit fonctionnent, ainsi qu\'à découvrir Tailwind CSS. Puisque je suis basé hors de France, j\'ai également dû implémenter une solution pour l\'internationalisation.'
		},
		{
			name: 'Ivory 🎹',
			url: 'https://studio.ivory-app.com',
			github: 'https://github.com/IvoryApp',
			description_en: 'Ivory is a musical app designed for pianists, allowing them to convert any piano song (YouTube, MP3, MIDI...) into sheet music. I\'ve worked on SEO optimization, communication, front-end development, and I\'m currently working on an Expo React Native Mobile App.',
			description_fr: 'Ivory est une application musicale conçue pour les pianistes, leur permettant de convertir n\'importe quelle chanson de piano (YouTube, MP3, MIDI...) en partitions. J\'ai travaillé sur l\'optimisation SEO, la communication, le développement front-end (Vue, Next.js), et je travaille actuellement sur une application mobile Expo React Native.'
		},
		{
			name: 'Nina Carducci 📸',
			url: 'https://controleur.github.io/nina-carducci/',
			github: 'https://github.com/controleur/nina-carducci',
			description_en: 'The website of photographer Nina Carducci is a training project aimed at debugging basic features, optimizing accessibility and performance, and improving SEO. This project helps to understand the challenges of SEO and implement appropriate solutions.',
			description_fr: 'Le site de la photographe Nina Carducci est un projet de formation visant à debugger des fonctionnalités basiques, optimiser l\'accessibilité et les performances, et améliorer le référencement. Ce projet permet d\'appréhender les enjeux du SEO, et d\'implémenter des solutions adaptées.'
		},
		{
			name: 'Booki 🛏️',
			url: 'https://controleur.github.io/booki/',
			github: 'https://github.com/controleur/booki',
			description_en: 'Booki is an online hotel booking service that allows users to easily and quickly reserve hotels. It offers a user-friendly interface and advanced features to enhance the user experience. The project covers mockup integration, Figma usage, and front-end development.',
			description_fr: 'Le site de réservation Booki est une implémentation d\'une maquette d\'un service en ligne permettant de réserver des hôtels facilement et rapidement. Il offre une interface conviviale et des fonctionnalités avancées pour améliorer l\'expérience utilisateur. Le projet permet d\'aborder l\'intégration de maquettes, l\'utilisation de Figma, et le développement front-end.'
		},
		{
			name: 'Sophie Bluel 🎨',
			url: 'https://sophie-bluel-five.vercel.app/',
			github: 'https://github.com/controleur/sophie-bluel',
			description_en: 'Sophie Bluel’s portfolio is a project aimed at integrating a front-end with an existing back-end, in the form of an API, and managing user authentication, uploading, edition and deletion of works.',
			description_fr: 'Le Portfolio de Sophie Bluel est un projet visant à intégrer un front-end à un backend existant, sous forme d\'API, et de gérer l\'authentification des utilisateurs, la mise en ligne de travaux, l\'édition et la suppression de ceux-ci.'
		},
		{
			name: 'Kasa 🏠',
			url: 'https://kasa-five-ebon.vercel.app/',
			github: 'https://github.com/controleur/kasa',
			description_en: 'Kasa is a real estate website that allows users to find and book accommodations easily. It features a modern design and a user-friendly interface. The project uses React, Node, and SASS, and is planned to eventually work with an API (currently, it uses JSON data).',
			description_fr: 'Kasa est un site immobilier qui permet aux utilisateurs de trouver et de réserver des logements facilement. Il dispose d\'un design moderne et d\'une interface conviviale. Le projet utilise React, Node et SASS, et est prévu pour fonctionner à terme sur une API (il utilise en l\'état actuel des données en JSON).'
		},
		{
			name: 'Mon Vieux Grimoire API 📚',
			url: 'https://mon-vieux-grimoire-backend-pi.vercel.app/api-docs',
			github: 'https://github.com/controleur/mon-vieux-grimoire-backend',
			description_en: 'Mon Vieux Grimoire is a book rating service API that allows users to upload, view, edit, and delete books. It manages user authentication and access rights for book deletion. SWAGGER documentation is provided. The API is built with Node.js and Express. The API also handles image uploads and optimization with Sharp and Multer.',
			description_fr: 'Mon Vieux Grimoire est une API d\'un service de notation de livre, permettant la mise en ligne, la consultation, l\'édition et la suppression de livres. Elle gère l\'authentification des utilisateurs et l\'accès aux droits de suppression des livres. Une documentation SWAGGER est fournie. L\'API est construite avec Node.js et Express, et gère également la mise en ligne et l\'optimisation des images avec Sharp et Multer.'
		}
]);
