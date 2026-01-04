import globals from "globals";
import { defineConfig, globalIgnores } from "eslint/config";
import stylistic from "@stylistic/eslint-plugin";

export default defineConfig([
  {
    files: ["**/*.{js,mjs}"],
    languageOptions: {
      sourceType: "module",
      globals: globals.node
    },
    plugins: {
      "@stylistic": stylistic
    },
    rules: {
      semi: "error",
      "no-var": "error",
      "@stylistic/quotes": ["error", "double"],
      "@stylistic/array-bracket-spacing": ["error", "always"],
      "operator-linebreak": ["error", "before"],
      "eslint eqeqeq": ["error", "smart"]
    }
  },

  globalIgnores(["eslint.config.js"])
]);
