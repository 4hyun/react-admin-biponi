import { Open_Sans } from "next/font/google";

const fontSize = 14;
export const openSans = Open_Sans({ subsets: ["latin"] });

export const typography = {
  fontSize,
  htmlFontSize: 16,
  fontFamily: openSans.style.fontFamily,
  body1: { fontSize },
  body2: { fontSize },
};
