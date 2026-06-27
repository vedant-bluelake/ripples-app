/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{ts,tsx}", "./src/**/*.{ts,tsx}"],
  presets: [require("nativewind/preset")],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        card: "var(--card)",
        secondary: "var(--secondary)",
        muted: "var(--muted)",
        "muted-foreground": "var(--muted-foreground)",
        border: "var(--border)",
        primary: "var(--primary)",
        "primary-foreground": "var(--primary-foreground)",
        accent: "var(--accent)",
        "accent-foreground": "var(--accent-foreground)",
        gold: "var(--gold)",
        "gold-light": "var(--gold-light)",
        "gold-dark": "var(--gold-dark)",
        navy: "var(--navy)",
        "navy-light": "var(--navy-light)",
        success: "var(--success)",
        loss: "var(--loss)",
      },
      fontFamily: {
        sans: ["Poppins_400Regular", "Poppins"],
        display: ["PlayfairDisplay_600SemiBold", "Playfair Display"],
      },
    },
  },
  plugins: [],
};
