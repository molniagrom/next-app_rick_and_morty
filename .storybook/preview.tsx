import type {Preview} from "@storybook/nextjs";
import React from "react";
import {RickAndMortyProvider} from "@/app/store/RickAndMortyStore";
import "../app/globals.css";

const preview: Preview = {
    decorators: [
        (Story) => (
            <RickAndMortyProvider>
                <div style={{padding: "1rem"}}>
                    <Story/>
                </div>
            </RickAndMortyProvider>
        ),
    ],
    parameters: {
        nextjs: {
            appDirectory: true,
        },
        actions: {argTypesRegex: "^on[A-Z].*"},
        controls: {
            matchers: {
                color: /(background|color)$/i,
                date: /Date$/i,
            },
        },
        a11y: {
            test: "todo",
        },
    },
};

export default preview;
