import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "hero-1": "url('https://assets-global.website-files.com/60d4499d6dd4a589a869c2a8/60d5de0d37ab24105b51c7e1_hero2.jpg')",
        "hero-2": "url('https://assets-global.website-files.com/60d4499d6dd4a589a869c2a8/60d5de0c8adb092afbe639c1_hero1.jpg')",
        "hero-3": "url('https://assets-global.website-files.com/60d4499d6dd4a589a869c2a8/60d5de0c6fd9b7648350e477_hero3.jpg')",
      },
      screens: {
        xs: { max: "479px" },
        sm: { max: "767px" },
        md: { max: "991px" },
        lg: { max: "1199px" },
        xl: { max: "1599px" },
      }
    },
  },
  plugins: [],
};
export default config;
