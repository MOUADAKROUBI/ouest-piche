import { Poppins } from "next/font/google";

export const popping = Poppins({
    weight: ["400", "500", "700"],
    subsets: ["latin", "latin-ext"],
    variable: '--font-family-p',
    display: "swap"
})