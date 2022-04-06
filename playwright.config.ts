import path from "path";
import { PlaywrightTestConfig, devices } from "@playwright/test";

// Reference: https://playwright.dev/docs/test-configuration
// https://github.com/vercel/next.js/blob/canary/examples/with-playwright/playwright.config.ts

const config: PlaywrightTestConfig = {
  // Timeout per test
  timeout: 30 * 1000,

  // Test directory
  testDir: path.join(__dirname, "e2e"),

  // If a test fails, retry it additional 2 times on CI
  retries: process.env.CI ? 2 : 0,

  // Artifacts folder where screenshots, videos, and traces are stored.
  outputDir: "test-results/",

  // Run your local dev server before starting the tests:
  // https://playwright.dev/docs/test-advanced#launching-a-development-web-server-during-the-tests
  webServer: {
    command: "yarn dev",
    port: 3000,
    timeout: 120 * 1000,
    reuseExistingServer: !process.env.CI,
  },

  use: {
    // Retry a test if its failing with enabled tracing. This allows you to analyse the DOM, console logs, network traffic etc.
    // More information: https://playwright.dev/docs/trace-viewer
    trace: "retry-with-trace",

    // All available context options: https://playwright.dev/docs/api/class-browser#browser-new-context
    contextOptions: {
      ignoreHTTPSErrors: true,
    },

    baseURL: process.env.PLAYWRIGHT_TEST_BASE_URL || "http://localhost:3000",
  },

  projects: [
    {
      name: "Desktop Chrome",
      use: {
        ...devices["Desktop Chrome"],
      },
    },
  ],
};

export default config;
