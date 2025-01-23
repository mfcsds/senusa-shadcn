import type { Config } from "tailwindcss";

const { fontFamily } = require('tailwindcss/defaultTheme');
const config = {
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
  		fontFamily: {
  			nostalgic: [
  				'NostalgicWhispers',
                    ...fontFamily.sans
                ]
  		},
  		colors: {
  			teal: {
				'500': '#B1ECEB', // color hover primary
  				'600': '#72C1C4',  // color secondary 
  				'700': '#15999D', // color primary
  			},
  			gray: {
  				'50': '#F9F9F9', // background
  				'100': '#E0E0E0', // border
  			},
			status: {
				'100': '#B1ECEB', // color green
				'200': '#B1ECEB', // color yellow
				'300': '#F07A7A', // color red
			},
			red: {
				'300': '#F07A7A', // color red
				'400': '#FF6B6B', // hover color red
			},
			blue: {
				'100': '#5F9AB8', // color blue
				'200': '#457B9D', // hover color blue
			},
			yellow: {
				'100': '#FFF4D3', // background color yellow
				'200': '#FFE18A', // color blue
			},
			'text-primary': 'hsl(var( --text-primary))',
			'text-secondary': 'hsl(var( --text-secondary))',
			'text-action': 'hsl(var( --text-action))',
			'text-secret': 'hsl(var( --text-secret))',
			'blue-primary': 'hsl(var(--blue-primary))',
			'blue-secondary': 'hsl(var(--blue-secondary))',
			'red-primary': 'hsl(var(--red-primary))',
			'red-secondary': 'hsl(var(--red-secondary))',
			'yellow-primary': 'hsl(var(--yellow-primary))',
			'yellow-secondary': 'hsl(var(--yellow-secondary))',
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
  			}
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			sm: 'calc(var(--radius) - 5px)',
			md: 'calc(var(--radius) - 10px)',
  		},
  		keyframes: {
			bounceIcon: {
				"0%, 100%": { transform: "translateY(-10px)" },
				"50%": { transform: "translateY(0)" },
			  },
			  moveIcon: {
				"0%": { transform: "translateX(-50px)" },
				"50%": { transform: "translateX(50px)" },
				"100%": { transform: "translateX(-50px)" },
			  },
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
  			'accordion-up': 'accordion-up 0.2s ease-out',
			"bounce-icon": "bounceIcon 1s infinite",
        	icon: "moveIcon 3s infinite linear",
  		}
  	}
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;

export default config;
