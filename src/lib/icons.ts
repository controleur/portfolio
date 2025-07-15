// System tray icons
export const ICONS = {
	sound: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 16 16" fill="none">
<path d="M12.0645 3L11.3066 3.48047C12.4232 4.82845 13.017 6.39637 13.0176 7.99805C13.0133 9.59834 12.4168 11.1641 11.2988 12.5098L12.0684 13C13.327 11.5139 13.9984 9.7755 14 7.99805C13.9962 6.22162 13.3236 4.48464 12.0645 3ZM10.7676 4.46094L10 4.94727C10.699 5.87439 11.0689 6.92827 11.0723 8.00195C11.07 9.07616 10.7007 10.1307 10.002 11.0586L10.7695 11.5449C11.6072 10.4769 12.0517 9.25168 12.0547 8.00195C12.0506 6.75275 11.6055 5.52821 10.7676 4.46094Z" fill="currentColor"/>
<path d="M8 2L4 6V10L8 14H9V2H8ZM2 6V10H3V6H2Z" fill="currentColor"/>
</svg>
`,
	soundMuted: `<svg width="20" height="20" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M4 6.01562V10L8 14H9V11.0156L4 6.01562Z" fill="currentColor"/>
<path d="M2 6V10H3V6H2Z" fill="currentColor"/>
<path d="M8 2L6.00977 3.99023L9 6.97266V2H8Z" fill="currentColor"/>
<path d="M2 2.70711L2.70711 2L14 13.267L13.2929 14L2 2.70711Z" fill="currentColor"/>
<path opacity="0.35" d="M10.2715 12.3926C10.1128 12.4949 9.9485 12.5881 9.7793 12.6719L9.94531 13.6699C10.313 13.5209 10.665 13.3357 10.9961 13.1172L10.2715 12.3926Z" fill="currentColor"/>
<path opacity="0.35" d="M10.1289 4.61523L9.79883 5.60352C10.1712 5.88248 10.4735 6.24421 10.682 6.66013C10.8904 7.07605 10.9993 7.53476 11 8C10.9732 8.24294 10.9168 8.48169 10.832 8.71094L11.6543 9.5332C11.8698 9.05003 11.9873 8.5289 12 8C11.9997 7.32364 11.8279 6.65839 11.5007 6.06645C11.1735 5.47451 10.7015 4.97521 10.1289 4.61523Z" fill="currentColor"/>
<path opacity="0.35" d="M9.94531 2.33203L9.77734 3.33203C10.7241 3.69209 11.5392 4.33122 12.1147 5.1648C12.6902 5.99837 12.9989 6.98707 13 8C12.981 8.79468 12.7727 9.57337 12.3926 10.2715L13.123 11.002C13.6756 10.0964 13.9782 9.06058 14 8C13.9983 6.7507 13.6068 5.53307 12.8799 4.517C12.153 3.50092 11.1271 2.73708 9.94531 2.33203Z" fill="currentColor"/>
</svg>
`,

	wifi: `<svg width="20" height="20" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M8 2C5.12172 2 2.44716 2.81672 0.167969 4.21094L0.798828 4.99805C2.90225 3.73691 5.35909 3 8 3C10.6409 3 13.0978 3.7369 15.2012 4.99805L15.832 4.21094C13.5528 2.81672 10.8783 2 8 2ZM8 5C5.8436 5 3.84257 5.62358 2.14844 6.6875L2.7793 7.47266C4.29843 6.54375 6.08179 6 8 6C9.91821 6 11.7016 6.54375 13.2207 7.47266L13.8516 6.6875C12.1574 5.6236 10.1564 5 8 5ZM8 8C6.56618 8 5.23669 8.42837 4.12891 9.16211L4.75977 9.94922C5.69365 9.35022 6.80349 9 8 9C9.19651 9 10.3064 9.35022 11.2402 9.94922L11.8711 9.16211C10.7633 8.42838 9.43383 8 8 8ZM8 11C7.60218 11 7.22064 11.158 6.93934 11.4393C6.65804 11.7206 6.5 12.1022 6.5 12.5C6.5 12.8978 6.65804 13.2794 6.93934 13.5607C7.22064 13.842 7.60218 14 8 14C8.39782 14 8.77936 13.842 9.06066 13.5607C9.34196 13.2794 9.5 12.8978 9.5 12.5C9.5 12.1022 9.34196 11.7206 9.06066 11.4393C8.77936 11.158 8.39782 11 8 11Z" fill="currentColor"/>
</svg>
`,
	wifiDisconnected: `<svg width="20" height="20" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M8 2C5.12172 2 2.44716 2.81672 0.167969 4.21094L0.798828 4.99805C2.90225 3.73691 5.35909 3 8 3C10.6409 3 13.0978 3.7369 15.2012 4.99805L15.832 4.21094C13.5528 2.81672 10.8783 2 8 2ZM8 5C5.8436 5 3.84257 5.62358 2.14844 6.6875L2.7793 7.47266C4.29843 6.54375 6.08179 6 8 6C9.91821 6 11.7016 6.54375 13.2207 7.47266L13.8516 6.6875C12.1574 5.6236 10.1564 5 8 5ZM8 8C6.56618 8 5.23669 8.42837 4.12891 9.16211L4.75977 9.94922C5.69365 9.35021 6.80349 9 8 9C8.60701 9 9.19145 9.09079 9.74219 9.25781L10.5156 8.48438C9.73338 8.18306 8.89099 8 8 8ZM8 11C7.60218 11 7.22064 11.158 6.93934 11.4393C6.65804 11.7206 6.5 12.1022 6.5 12.5C6.5 12.8978 6.65804 13.2794 6.93934 13.5607C7.22064 13.842 7.60218 14 8 14C8.39782 14 8.77936 13.842 9.06066 13.5607C9.34196 13.2794 9.5 12.8978 9.5 12.5C9.5 12.1022 9.34196 11.7206 9.06066 11.4393C8.77936 11.158 8.39782 11 8 11Z" fill="currentColor" fill-opacity="0.5"/>
<path d="M10.707 9L10 9.70703L11.793 11.5L10 13.293L10.707 14L12.5 12.207L14.293 14L15 13.293L13.207 11.5L15 9.70703L14.293 9L12.5 10.793L10.707 9Z" fill="currentColor"/>
</svg>`,

	more: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
		<path d="M6 15L12 9L18 15L6 15Z" fill="currentColor"/>
	</svg>`,
	lightMode: `<svg width="20" height="20" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0_4015_625)">
<path d="M4 24H10" stroke="currentColor" stroke-width="2"/>
<path d="M7.8197 12.2444L12.6738 15.7711" stroke="currentColor" stroke-width="2"/>
<path d="M17.8197 4.97876L19.6738 10.6851" stroke="currentColor" stroke-width="2"/>
<path d="M30.1803 4.97876L28.3262 10.6851" stroke="currentColor" stroke-width="2"/>
<path d="M40.1803 12.2444L35.3262 15.7711" stroke="currentColor" stroke-width="2"/>
<path d="M44 24H38" stroke="currentColor" stroke-width="2"/>
<path d="M7.8197 35.7556L12.6738 32.2289" stroke="currentColor" stroke-width="2"/>
<path d="M17.8197 43.0212L19.6738 37.3149" stroke="currentColor" stroke-width="2"/>
<path d="M30.1803 43.0212L28.3262 37.3149" stroke="currentColor" stroke-width="2"/>
<path d="M40.1803 35.7556L35.3262 32.2289" stroke="currentColor" stroke-width="2"/>
<path d="M24 35C30.0751 35 35 30.0751 35 24C35 17.9249 30.0751 13 24 13C17.9249 13 13 17.9249 13 24C13 30.0751 17.9249 35 24 35Z" stroke="currentColor" stroke-width="2"/>
</g>
<defs>
<clipPath id="clip0_4015_625">
<rect width="48" height="48" fill="white"/>
</clipPath>
</defs>
</svg>`,
	darkMode: `<svg width="20" height="20" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0_4015_616)">
<path d="M36 33C34.4242 33.9193 32.6827 34.5191 30.875 34.7653C29.0673 35.0116 27.2288 34.8993 25.4645 34.435C21.9013 33.4973 18.8566 31.1826 17 28C15.1435 24.8174 14.6273 21.0277 15.565 17.4645C16.5027 13.9013 18.8174 10.8565 22 9C19.5654 9.34653 17.2534 10.2863 15.2674 11.7366C13.2815 13.1869 11.6825 15.1032 10.6114 17.3168C9.54031 19.5304 9.02985 21.9734 9.125 24.4307C9.22016 26.888 9.918 29.2842 11.1571 31.4084C12.3962 33.5325 14.1385 35.3195 16.2307 36.6119C18.3228 37.9042 20.7006 38.6624 23.1547 38.8196C25.6088 38.9769 28.064 38.5283 30.3039 37.5135C32.5439 36.4986 34.5 34.9487 36 33Z" stroke="currentColor" stroke-width="2"/>
</g>
<defs>
<clipPath id="clip0_4015_616">
<rect width="48" height="48" fill="white"/>
</clipPath>
</defs>
</svg>
`,
	plasmaColor: `<svg width="78" height="79" viewBox="0 0 78 79" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M51.9999 0L42.9999 9L60 26L42.9999 43L51.9999 52L78 26L51.9999 0Z" fill="black"/>
<path d="M23.9999 6.00002C23.9999 3.23859 21.7613 1 18.9999 1C16.2385 1 13.9999 3.23859 13.9999 6.00002C13.9999 8.76144 16.2385 11 18.9999 11C21.7613 11 23.9999 8.76144 23.9999 6.00002Z" fill="#FA8865"/>
<path d="M6.99991 30H6.99987C3.13388 30 -0.00012207 33.134 -0.00012207 36.9999V37C-0.00012207 40.866 3.13388 44 6.99987 44H6.99991C10.8659 44 13.9999 40.866 13.9999 37V36.9999C13.9999 33.134 10.8659 30 6.99991 30Z" fill="#63C605"/>
<path d="M39.9999 69C39.9999 63.4772 35.5228 59 29.9999 59C24.4771 59 19.9999 63.4772 19.9999 69C19.9999 74.5229 24.4771 79 29.9999 79C35.5228 79 39.9999 74.5229 39.9999 69Z" fill="#1B89F3"/>
<path opacity="0.9" fill-rule="evenodd" clip-rule="evenodd" d="M49.5 36.5L58.5 45.5001L69 35L60 26L49.5 36.5Z" fill="url(#paint0_linear_1_27928)"/>
<defs>
<linearGradient id="paint0_linear_1_27928" x1="73.5" y1="21.4999" x2="58.5" y2="36.5" gradientUnits="userSpaceOnUse">
<stop/>
<stop offset="1" stop-opacity="0"/>
</linearGradient>
</defs>
</svg>
`,
	startMenu: `<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32">
		<g transform="translate(-46,-1) translate(-22,0)" id="start-here-kde">
			<rect
				style="fill:none;fill-rule:evenodd;stroke:none;stroke-width:1px;stroke-linecap:butt;stroke-linejoin:miter;stroke-opacity:1"
				id="rect3343"
				width="32"
				height="32"
				x="68"
				y="1"
			/>
			<path
				id="path20"
				style="fill:currentColor"
				transform="translate(46,1)"
				d="M 32 4 A 1.5 1.5 0 0 0 30.5 5.5 A 1.5 1.5 0 0 0 32 7 A 1.5 1.5 0 0 0 33.5 5.5 A 1.5 1.5 0 0 0 32 4 z M 42.5 4 L 39.5 7 L 44 11.5 L 39.5 16 L 42.5 19 L 50 11.5 L 42.5 4 z M 28.5 13 A 2.5 2.5 0 0 0 26 15.5 A 2.5 2.5 0 0 0 28.5 18 A 2.5 2.5 0 0 0 31 15.5 A 2.5 2.5 0 0 0 28.5 13 z M 35 22 A 3 3 0 0 0 32 25 A 3 3 0 0 0 35 28 A 3 3 0 0 0 38 25 A 3 3 0 0 0 35 22 z "
				class="ColorScheme-Text"
			/>
		</g>
	</svg>`,
	fileManager: `<svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0_2004_357)">
<path d="M1 17H31V4L16 3.99988L14 2H1V17Z" fill="black"/>
<path opacity="0.35" d="M1 17H31V4L16 3.99988L14 2H1V17Z" fill="url(#paint0_linear_2004_357)"/>
<path d="M29.3333 7H2.66667C2.29848 7 2 7.29855 2 7.66675V14.3334C2 14.7016 2.29848 15 2.66667 15H29.3333C29.7015 15 30 14.7016 30 14.3334V7.66675C30 7.29855 29.7015 7 29.3333 7Z" fill="url(#paint1_linear_2004_357)"/>
<path d="M13 11L11 12H1V13L1.02232 28.9921C1.01116 29.5193 1.50432 30.0212 1.99066 30.0208L30 30C30.5414 29.9998 31 29.5369 31 29V11H13Z" fill="black"/>
<path opacity="0.099" fill-rule="evenodd" clip-rule="evenodd" d="M1 13H12L13 11H31V29H17L1 13Z" fill="url(#paint2_linear_2004_357)"/>
<path opacity="0.85" d="M2.66602 7C2.29668 7 2 7.29672 2 7.66602V8.66602C2 8.29672 2.29668 8 2.66602 8H29.334C29.7033 8 30 8.29672 30 8.66602V7.66602C30 7.29672 29.7033 7 29.334 7H2.66602Z" fill="url(#paint3_linear_2004_357)"/>
<path opacity="0.3" d="M13 10.9998L11 11.9998H1V12.9998L1.02232 28.9918C1.01116 29.519 1.50432 30.0209 1.99065 30.0205L30 29.9995C30.5414 29.9993 31 29.5364 31 28.9995V10.9995L13 10.9998Z" fill="url(#paint4_linear_2004_357)"/>
<path opacity="0.2" d="M13 10.9998L11 11.9998H1V12.9998L1.02232 28.9918C1.01116 29.519 1.50432 30.0209 1.99065 30.0205L30 29.9995C30.5414 29.9993 31 29.5364 31 28.9995V10.9995L13 10.9998Z" fill="url(#paint5_linear_2004_357)"/>
<path opacity="0.3" fill-rule="evenodd" clip-rule="evenodd" d="M1 11.999V12.999H12L13 10.999L11 11.999H1Z" fill="white"/>
<path opacity="0.3" fill-rule="evenodd" clip-rule="evenodd" d="M14 1.99902L15 4.99908H17H31V3.99908H17L16 3.99896L14 1.99902Z" fill="white"/>
<path opacity="0.3" d="M1.02151 28.9913C1.01035 29.5185 1.50393 30.0211 1.99026 30.0206L30 29.9991C30.5414 29.9989 31 28.9991 31 28.9991V27.9991C31 28.536 30.5414 28.9989 30 28.9991L1.99026 29.0206C1.50393 29.0211 1.01035 28.5185 1.02151 27.9913C0.991968 11.4094 0.994037 13.6567 1.02151 28.9913Z" fill="black"/>
</g>
<defs>
<linearGradient id="paint0_linear_2004_357" x1="23.2508" y1="3.31356" x2="50.1802" y2="49.9566" gradientUnits="userSpaceOnUse">
<stop/>
<stop offset="1" stop-opacity="0"/>
</linearGradient>
<linearGradient id="paint1_linear_2004_357" x1="6.83592" y1="8.07863" x2="20.6809" y2="14.0781" gradientUnits="userSpaceOnUse">
<stop stop-color="#F5F5F5"/>
<stop offset="1" stop-color="#F9F9F9"/>
</linearGradient>
<linearGradient id="paint2_linear_2004_357" x1="11.8842" y1="9.76001" x2="22.2045" y2="21.8567" gradientUnits="userSpaceOnUse">
<stop/>
<stop offset="1" stop-opacity="0"/>
</linearGradient>
<linearGradient id="paint3_linear_2004_357" x1="2.06693" y1="2354.64" x2="26.0648" y2="2354.64" gradientUnits="userSpaceOnUse">
<stop stop-color="white"/>
<stop offset="1" stop-color="white" stop-opacity="0.487603"/>
</linearGradient>
<linearGradient id="paint4_linear_2004_357" x1="31.0269" y1="30.6338" x2="8.38683" y2="11.1506" gradientUnits="userSpaceOnUse">
<stop/>
<stop offset="1" stop-color="#147CDC" stop-opacity="0"/>
</linearGradient>
<linearGradient id="paint5_linear_2004_357" x1="5.09438" y1="3.56753" x2="27.7046" y2="26.095" gradientUnits="userSpaceOnUse">
<stop stop-color="white"/>
<stop offset="1" stop-color="white" stop-opacity="0"/>
</linearGradient>
<clipPath id="clip0_2004_357">
<rect width="32" height="32" fill="white"/>
</clipPath>
</defs>
</svg>

`,
	browser: `<svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M24 44C35.0457 44 44 35.0457 44 24C44 12.9543 35.0457 4 24 4C12.9543 4 4 12.9543 4 24C4 35.0457 12.9543 44 24 44Z" fill="url(#paint0_linear_2004_152)"/>
<path opacity="0.2" d="M24 4C19.0419 3.99994 14.2605 5.84154 10.5834 9.16752C6.90635 12.4935 4.59579 17.0667 4.09998 22H6.99998L9.99998 25L12 26L22.969 43.95C23.3122 43.9755 23.6559 43.9922 24 44C29.3043 44 34.3914 41.8929 38.1421 38.1421C41.8928 34.3914 44 29.3043 44 24C44 21.3736 43.4827 18.7728 42.4776 16.3463C41.4725 13.9198 39.9993 11.715 38.1421 9.85786C36.2849 8.00069 34.0802 6.5275 31.6536 5.52241C29.2271 4.51732 26.6264 4 24 4Z" fill="url(#paint1_linear_2004_152)"/>
<path opacity="0.2" fill-rule="evenodd" clip-rule="evenodd" d="M42.586 16.6328L36 25.9998L42.215 32.2148C43.3853 29.6339 43.9937 26.8337 44 23.9998C43.9996 21.5211 43.5384 19.064 42.64 16.7538C42.6221 16.7134 42.6041 16.6731 42.586 16.6328Z" fill="url(#paint2_linear_2004_152)"/>
<path d="M24 4C23.3646 4.00643 22.7299 4.04314 22.098 4.11C22.0133 4.11946 21.9286 4.12946 21.844 4.14C20.7554 4.2638 19.6788 4.47685 18.625 4.777V4.737C14.8612 5.79179 11.4889 7.92641 8.92503 10.877H8.93503C7.40439 12.6349 6.19282 14.6469 5.35503 16.822L7.00003 16H11V17L12 18V16L13 15L14 14H15V13L16 12L18 11L19 10L21 9V10L23 9H22V8L21 7H25L24 8L27 9L26 7V5L25.053 4.053C24.7026 4.02608 24.3514 4.00841 24 4ZM39 10.81V13H40.691C40.1786 12.2318 39.6136 11.5001 39 10.81ZM11.062 10.877H11.123L11 11L11.062 10.877ZM41.086 13.639L40 14L38 15V16L36 18L35 20V24L36 26L38 27L39 28L43.717 27.215C43.7177 27.2077 43.7184 27.2003 43.719 27.193C43.8144 26.6124 43.8842 26.0278 43.928 25.441C43.9694 24.9617 43.9934 24.481 44 24C43.9953 23.419 43.9653 22.8384 43.91 22.26C43.8832 21.9897 43.8509 21.72 43.813 21.451C43.7626 21.0378 43.6992 20.6263 43.623 20.217C43.5811 20.017 43.5361 19.8176 43.488 19.619C43.3858 19.1502 43.2667 18.6852 43.131 18.225C43.0843 18.0805 43.036 17.9364 42.986 17.793C42.8257 17.2951 42.6459 16.8038 42.447 16.32C42.3987 16.2096 42.3494 16.0996 42.299 15.99C42.074 15.4714 41.8271 14.9626 41.559 14.465C41.4079 14.186 41.2502 13.9105 41.086 13.639ZM7.00003 20L6.00003 21H5.00003L4.35003 20.35C4.35003 20.3517 4.35003 20.3533 4.35003 20.355C4.22853 21.0092 4.13976 21.669 4.08403 22.332C4.08336 22.342 4.08269 22.352 4.08203 22.362L6.00003 23L8.00003 24L9.00003 25L10 26H12V28L11 29L10 31V32L11 33L12 34L13 36L14 37L16 38V42.32C16.002 42.3207 16.004 42.3213 16.006 42.322C16.5616 42.5626 17.1279 42.7778 17.703 42.967C17.7669 42.99 17.8309 43.0127 17.895 43.035C18.3938 43.1907 18.8986 43.3268 19.408 43.443C19.5579 43.4834 19.7083 43.5221 19.859 43.559C20.2965 43.6457 20.7367 43.7177 21.179 43.775C21.4051 43.8136 21.6318 43.8482 21.859 43.879C22.2416 43.914 22.6251 43.938 23.009 43.951C23.3389 43.9755 23.6693 43.9919 24 44C24.3396 43.9963 24.6791 43.984 25.018 43.963L26 42V41L28 40L29 39L30 35L31 34V32L29 31H28L26 30H25L24 28L23 27H21L19 25H17L14 24L13 26L11 25H10V23L8.00003 22L9.00003 20H7.00003Z" fill="url(#paint3_linear_2004_152)"/>
<path opacity="0.2" d="M4.051 23.5C4.047 23.67 4 23.829 4 24C4 35.08 12.92 44 24 44C35.08 44 44 35.08 44 24C44 23.829 43.953 23.67 43.949 23.5C43.919 24.706 43.828 25.898 43.595 27.041C42.8151 30.8736 40.9225 34.3913 38.154 37.154C36.332 38.9775 34.1739 40.4306 31.799 41.433C30.588 41.944 29.3291 42.3333 28.041 42.595C26.7113 42.865 25.3578 43.0003 24.001 42.999C22.616 42.999 21.264 42.86 19.961 42.595C16.1284 41.8151 12.6107 39.9225 9.848 37.154C8.02449 35.332 6.57137 33.1739 5.569 30.799C5.05799 29.588 4.66874 28.3291 4.407 27.041C4.174 25.898 4.084 24.706 4.053 23.5" fill="black"/>
<defs>
<linearGradient id="paint0_linear_2004_152" x1="4" y1="44" x2="4" y2="4" gradientUnits="userSpaceOnUse">
<stop stop-color="#197CF1"/>
<stop offset="1" stop-color="#20BCFA"/>
</linearGradient>
<linearGradient id="paint1_linear_2004_152" x1="8.99998" y1="9" x2="38" y2="38" gradientUnits="userSpaceOnUse">
<stop stop-color="#292C2F"/>
<stop offset="1" stop-opacity="0"/>
</linearGradient>
<linearGradient id="paint2_linear_2004_152" x1="34" y1="19.0078" x2="44" y2="29.0078" gradientUnits="userSpaceOnUse">
<stop stop-color="#292C2F"/>
<stop offset="1" stop-opacity="0"/>
</linearGradient>
<linearGradient id="paint3_linear_2004_152" x1="4.00003" y1="44" x2="4.00003" y2="4" gradientUnits="userSpaceOnUse">
<stop stop-color="#54D883"/>
<stop offset="1" stop-color="#ABF9C7"/>
</linearGradient>
</defs>
</svg>

`,
	terminal: `<svg width="52" height="52" viewBox="0 0 52 52" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M51 0.0078125H0.992214C0.444229 0.0078125 0 0.45202 0 1V51.0078C0 51.5558 0.444229 52 0.992214 52H51C51.548 52 51.9922 51.5558 51.9922 51.0078V1C51.9922 0.45202 51.548 0.0078125 51 0.0078125Z" fill="url(#paint0_linear_1_18055)"/>
<path d="M21.335 13.0059L19.4971 14.8439L30.6572 26.004L19.4971 37.1641L21.335 39.002L34.333 26.004L32.4951 24.1661L21.335 13.0059Z" fill="url(#paint1_linear_1_18055)"/>
<path opacity="0.4" fill-rule="evenodd" clip-rule="evenodd" d="M21.3428 39.002L33.8027 51.4619H52V43.6631L34.3408 26.0039L21.3428 39.002Z" fill="url(#paint2_linear_1_18055)"/>
<path opacity="0.3" d="M0.992188 0.0078125C0.442501 0.0078125 0 0.450319 0 1V2C0 1.45032 0.442501 1.00781 0.992188 1.00781H51C51.5497 1.00781 51.9922 1.45032 51.9922 2V1C51.9922 0.450319 51.5497 0.0078125 51 0.0078125H0.992188Z" fill="white"/>
<path opacity="0.3" d="M0.992188 52C0.442501 52 0 51.5575 0 51.0078V50.0078C0 50.5575 0.442501 51 0.992188 51H51C51.5497 51 51.9922 50.5575 51.9922 50.0078V51.0078C51.9922 51.5575 51.5497 52 51 52H0.992188Z" fill="black"/>
<defs>
<linearGradient id="paint0_linear_1_18055" x1="52.3123" y1="56.9829" x2="0.383116" y2="-5.34874" gradientUnits="userSpaceOnUse">
<stop stop-color="#2A2C2F"/>
<stop offset="1" stop-color="#536161"/>
</linearGradient>
<linearGradient id="paint1_linear_1_18055" x1="42" y1="54.0001" x2="17.9999" y2="10.0001" gradientUnits="userSpaceOnUse">
<stop stop-color="#BFC9C9"/>
<stop offset="1" stop-color="#FBFBFB"/>
</linearGradient>
<linearGradient id="paint2_linear_1_18055" x1="23.3066" y1="30.1821" x2="40.8185" y2="46.8338" gradientUnits="userSpaceOnUse">
<stop stop-color="#292C2F"/>
<stop offset="1" stop-opacity="0"/>
</linearGradient>
</defs>
</svg>`,
	editor: `<svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M37.9986 0.00634766H1.99989C0.895314 0.00634766 -0.00012207 0.901802 -0.00012207 2.00638V38.0051C-0.00012207 39.1097 0.895314 40.0051 1.99989 40.0051H37.9986C39.1032 40.0051 39.9986 39.1097 39.9986 38.0051V2.00638C39.9986 0.901802 39.1032 0.00634766 37.9986 0.00634766Z" fill="url(#paint0_linear_1_13051)"/>
<path opacity="0.4" d="M-0.00012207 37.0078V38.0078C-0.00012207 39.1158 0.891885 40.0079 1.99989 40.0079H37.9999C39.1079 40.0079 39.9999 39.1158 39.9999 38.0078V37.0078C39.9999 38.1158 39.1079 39.0078 37.9999 39.0078H1.99989C0.891885 39.0078 -0.00012207 38.1158 -0.00012207 37.0078Z" fill="black"/>
<path d="M25.7203 30.9986L31.0003 28.7525V11.2294L25.7203 8.99854V30.9986Z" fill="url(#paint1_linear_1_13051)"/>
<path opacity="0.4" d="M25.7203 15.3134V31.0091L33.6248 39.0092H40.0001V18.5475L31 11.2402L25.7203 15.3134Z" fill="url(#paint2_linear_1_13051)"/>
<path d="M9.00012 14.3686L25.7204 30.9932L31.0004 28.747L11.2009 13.4702L9.00012 14.3686Z" fill="url(#paint3_linear_1_13051)"/>
<path opacity="0.35" d="M9.00012 25.5939L23.3918 39.9856H34.6083L25.72 30.9858L31 28.7395L25.72 24.6657V8.98584L9.00012 25.5939Z" fill="url(#paint4_linear_1_13051)"/>
<path d="M11.2006 26.5008L9 25.6025L25.7203 8.99414L31.0003 11.225L11.2006 26.5008Z" fill="url(#paint5_linear_1_13051)"/>
<defs>
<linearGradient id="paint0_linear_1_13051" x1="-0.000120757" y1="0.00256758" x2="37.852" y2="41.9412" gradientUnits="userSpaceOnUse">
<stop stop-color="#535A61"/>
<stop offset="1" stop-color="#333C45"/>
</linearGradient>
<linearGradient id="paint1_linear_1_13051" x1="30.9979" y1="20.0037" x2="25.7204" y2="20.0037" gradientUnits="userSpaceOnUse">
<stop stop-color="#1881CE"/>
<stop offset="1" stop-color="#2980B9" stop-opacity="0.86667"/>
</linearGradient>
<linearGradient id="paint2_linear_1_13051" x1="25.7203" y1="11.2693" x2="40.0013" y2="25.5182" gradientUnits="userSpaceOnUse">
<stop stop-color="#232629"/>
<stop offset="1" stop-opacity="0"/>
</linearGradient>
<linearGradient id="paint3_linear_1_13051" x1="9.00064" y1="14.3705" x2="31.2663" y2="28.3254" gradientUnits="userSpaceOnUse">
<stop stop-color="#349CD2"/>
<stop offset="0.76001" stop-color="#1E92FF"/>
<stop offset="1" stop-color="#0E71B1"/>
</linearGradient>
<linearGradient id="paint4_linear_1_13051" x1="9.06248" y1="9.07734" x2="31.2056" y2="31.1876" gradientUnits="userSpaceOnUse">
<stop stop-color="#232629"/>
<stop offset="1" stop-opacity="0"/>
</linearGradient>
<linearGradient id="paint5_linear_1_13051" x1="13.2163" y1="21.4227" x2="31.1744" y2="11.5549" gradientUnits="userSpaceOnUse">
<stop stop-color="#1D99F3"/>
<stop offset="1" stop-color="#3DAEE9"/>
</linearGradient>
</defs>
</svg>

`,
windowClose: `<svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M5 5L13 13M5 13L13 5" stroke="currentColor"/>
</svg>

`,
max: `<svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M14 11L9 6L4 11" stroke="currentColor"/>
</svg>

`,
min: `<svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M4 7L9 12L14 7" stroke="currentColor"/>
</svg>

`,
refresh: `
<svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" width="18" height="18" viewBox="0 0 16 16">
    <path d="M7 12v-2l-4 3 4 3v-2h2.997A6.006 6.006 0 0 0 16 8h-2a4 4 0 0 1-3.996 4H7zM9 2H6.003A6.006 6.006 0 0 0 0 8h2a4 4 0 0 1 3.996-4H9v2l4-3-4-3v2z" fill-rule="evenodd"/>
</svg>`
} as const;
