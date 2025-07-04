import type { Config } from "tailwindcss";
import tailwindcssAnimate from "tailwindcss-animate";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				sidebar: {
					DEFAULT: 'hsl(var(--sidebar-background))',
					foreground: 'hsl(var(--sidebar-foreground))',
					primary: 'hsl(var(--sidebar-primary))',
					'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
					accent: 'hsl(var(--sidebar-accent))',
					'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
					border: 'hsl(var(--sidebar-border))',
					ring: 'hsl(var(--sidebar-ring))'
				},
				'tribal-amber': {
					DEFAULT: 'hsl(var(--tribal-amber))',
					50: 'hsl(var(--tribal-amber) / 0.05)',
					100: 'hsl(var(--tribal-amber) / 0.1)',
					200: 'hsl(var(--tribal-amber) / 0.2)',
					300: 'hsl(var(--tribal-amber) / 0.3)',
					400: 'hsl(var(--tribal-amber) / 0.4)',
					500: 'hsl(var(--tribal-amber) / 0.5)',
					600: 'hsl(var(--tribal-amber) / 0.6)',
					700: 'hsl(var(--tribal-amber) / 0.7)',
					800: 'hsl(var(--tribal-amber) / 0.8)',
					900: 'hsl(var(--tribal-amber) / 0.9)'
				},
				'tribal-copper': {
					DEFAULT: 'hsl(var(--tribal-copper))',
					50: 'hsl(var(--tribal-copper) / 0.05)',
					100: 'hsl(var(--tribal-copper) / 0.1)',
					200: 'hsl(var(--tribal-copper) / 0.2)',
					300: 'hsl(var(--tribal-copper) / 0.3)',
					400: 'hsl(var(--tribal-copper) / 0.4)',
					500: 'hsl(var(--tribal-copper) / 0.5)',
					600: 'hsl(var(--tribal-copper) / 0.6)',
					700: 'hsl(var(--tribal-copper) / 0.7)',
					800: 'hsl(var(--tribal-copper) / 0.8)',
					900: 'hsl(var(--tribal-copper) / 0.9)'
				},
				'tribal-sage': {
					DEFAULT: 'hsl(var(--tribal-sage))',
					50: 'hsl(var(--tribal-sage) / 0.05)',
					100: 'hsl(var(--tribal-sage) / 0.1)',
					200: 'hsl(var(--tribal-sage) / 0.2)',
					300: 'hsl(var(--tribal-sage) / 0.3)',
					400: 'hsl(var(--tribal-sage) / 0.4)',
					500: 'hsl(var(--tribal-sage) / 0.5)',
					600: 'hsl(var(--tribal-sage) / 0.6)',
					700: 'hsl(var(--tribal-sage) / 0.7)',
					800: 'hsl(var(--tribal-sage) / 0.8)',
					900: 'hsl(var(--tribal-sage) / 0.9)'
				}
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			keyframes: {
				'accordion-down': {
					from: {
						height: '0'
					},
					to: {
						height: 'var(--radix-accordion-content-height)'
					}
				},
				'accordion-up': {
					from: {
						height: 'var(--radix-accordion-content-height)'
					},
					to: {
						height: '0'
					}
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out'
			}
		}
	},
	plugins: [tailwindcssAnimate],
} satisfies Config;
