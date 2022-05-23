import typescript from "rollup-plugin-typescript";
import babel from "@rollup/plugin-babel";
import { terser } from "rollup-plugin-terser";
import dts from 'rollup-plugin-dts'
import resolve from '@rollup/plugin-node-resolve'
export default [
  {
    input: "./index.ts",
    output: {
      file: "dist/build.esm.js",
      format: "esm",
    },
    plugins: [
      typescript(),
      babel({
        exclude: /node_modules/,
        presets: [
          [
            "@babel/preset-env",
            {
              module: true,
            },
          ],
        ],
      }),
      terser(),
    ],
  },
  {
    input: "./index.ts",
    output: {
      file: "dist/build.cjs.js",
      format: "cjs",
    },
    plugins: [
      typescript(),
      babel({
        exclude: /node_modules/,
        presets: [
          [
            "@babel/preset-env",
            {
              module: true,
            },
          ],
        ],
      }),
      terser(),
    ],
  },
  { // 生成 .d.ts 类型声明文件
    input: "./index.ts",
    output: {
      file: 'dist/index.d.ts',
      format: 'es',
    },
    plugins: [dts()],
  }
];
