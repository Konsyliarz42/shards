import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    projects: [
      {
        test: {
          environment: "jsdom",
          include: ["tests/**/*.test.ts"],
        },
      },
      {
        test: {
          include: ["tests/**/*.test.tsx"],
          browser: {
            provider: "playwright",
            enabled: true,
            instances: [{ browser: "firefox" }],
          },
        },
      },
    ],
  },
});
