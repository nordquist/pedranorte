import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Pedra Norte · Construção e remodelação",
    short_name: "Pedra Norte",
    description: "Remodelação e acabamentos em Portugal. Da pedra à casa.",
    start_url: "/pt",
    display: "browser",
    background_color: "#1b1c1d",
    theme_color: "#1b1c1d",
    icons: [
      { src: "/favicon.ico", sizes: "64x64", type: "image/x-icon" },
      { src: "/images/simple-mountain-center.png", sizes: "1000x1000", type: "image/png", purpose: "any" },
    ],
  };
}
