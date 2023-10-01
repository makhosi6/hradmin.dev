import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "hradmin.dev",
    start_url: ".",
    display: "standalone",
    background_color: "#0175C2",
    theme_color: "#0175C2",
    description:
      "HR Administration System which allowing users to efficiently manage employee details...",
    orientation: "portrait-primary",
    prefer_related_applications: false,
    icons: [
      {
        src: "maskable_icon_x192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "maskable_icon_x512.png",
        sizes: "512x512",
        type: "image/png",
      },
      {
        src: "maskable_icon_x192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "maskable",
      },
      {
        src: "maskable_icon_x512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
  };
}
