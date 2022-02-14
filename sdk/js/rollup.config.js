import typescript from '@rollup/plugin-typescript';
import { terser } from "rollup-plugin-terser";
import cleanup from "rollup-plugin-cleanup";

const banner = `/*
 * Stream Director SDK
 * Copyright minefled 2022
 */
`;

export default [
    {
        input: "src/index.ts",
        output: [
            {
                file: "dist/stream-director-sdk.js",
                format: "iife",
                name: "streamDirector",
                banner     
            },
            // Minified
            {
                file: "dist/stream-director-sdk.min.js",
                format: "iife",
                name: "streamDirector",
                banner,
                plugins: [terser({ format: { comments: true } })]
            }
        ],

        plugins: [
            typescript({ tsconfig: "./tsconfig.json" }),
            cleanup({ comments: "none" })
        ]
    }
];