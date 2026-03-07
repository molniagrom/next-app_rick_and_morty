import path from "path";
import type {StorybookConfig} from "@storybook/nextjs";

const config: StorybookConfig = {
    stories: [
        "../components/**/*.stories.tsx",
        "../app/**/components/**/*.stories.tsx",
    ],
    addons: [
        "@storybook/addon-links",
        "@storybook/addon-a11y",
        "@storybook/addon-docs",
    ],
    framework: "@storybook/nextjs",
    staticDirs: ["../public"],
    webpackFinal: async (webpackConfig) => {
        webpackConfig.resolve = webpackConfig.resolve ?? {};
        webpackConfig.resolve.alias = {
            ...(webpackConfig.resolve.alias ?? {}),
            "@": path.resolve(process.cwd()),
        };

        return webpackConfig;
    },
};

export default config;
