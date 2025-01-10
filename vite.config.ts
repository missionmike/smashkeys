import { defineConfig, loadEnv } from "vite";

import react from "@vitejs/plugin-react";

export default defineConfig(({ mode }) => {
  // Load environment variables based on the current mode
  const env = loadEnv(mode, process.cwd(), "");

  return {
    plugins: [
      react(),
      {
        name: "html-transform",
        transformIndexHtml(html) {
          return html.replace(/{{ gtmId }}/g, env.VITE_GTM_ID || "");
        },
      },
    ],
  };
});
