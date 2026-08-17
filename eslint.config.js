import { defineConfig } from "eslint/config";
// For more info, see https://github.com/storybookjs/eslint-plugin-storybook#configuration-flat-config-format
import storybook from "eslint-plugin-storybook";

import { config as baseESLintConfig } from "@akqa-denmark/eslint/nextjs";

const config = defineConfig([
    ...baseESLintConfig,
    ...storybook.configs["flat/recommended"],
]);

export default config;
