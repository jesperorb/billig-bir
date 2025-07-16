import eslint from "@eslint/js";
import globals from "globals";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import tseslint from "typescript-eslint";
import importPlugin from "eslint-plugin-import";
import reactX from "eslint-plugin-react-x";
import reactDom from "eslint-plugin-react-dom";
import eslintPluginPrettierRecommended from "eslint-plugin-prettier/recommended";

export default tseslint.config(
	{ ignores: ["dist"] },
	{
		extends: [
			eslint.configs.recommended,
			...tseslint.configs.recommendedTypeChecked,
			...tseslint.configs.strictTypeChecked,
			...tseslint.configs.stylisticTypeChecked,
			importPlugin.flatConfigs.recommended,
			importPlugin.flatConfigs.typescript,
		],
		files: ["**/*.{ts,tsx}"],
		languageOptions: {
			ecmaVersion: 2020,
			globals: globals.browser,
			parserOptions: {
				projectService: true,
				tsconfigRootDir: import.meta.dirname,
			},
		},
		plugins: {
			"react-hooks": reactHooks,
			"react-refresh": reactRefresh,
			"react-x": reactX,
			"react-dom": reactDom,
		},
		settings: {
			"import/extensions": [".ts", ".tsx"],
			"import/external-module-folders": ["node_modules"],
			"import/parsers": {
				"@typescript-eslint/parser": [".ts", ".tsx"],
			},
			"import/resolver": {
				typescript: {
					alwaysTryTypes: true,
					project: "./tsconfig.json",
				},
				node: {
					extensions: [".js", ".jsx", ".ts", ".tsx"],
				},
			},
		},
		rules: {
			...reactHooks.configs.recommended.rules,
			...reactX.configs["recommended-typescript"].rules,
			...reactDom.configs.recommended.rules,
			"react-refresh/only-export-components": [
				"warn",
				{ allowConstantExport: true },
			],
			"@typescript-eslint/no-redundant-type-constituents": "off",
			"@typescript-eslint/no-floating-promises": "off",
			"@typescript-eslint/no-misused-promises": [
				2,
				{
					checksVoidReturn: {
						attributes: false,
					},
				},
			],
			indent: ["error", "tab"],
			"prettier/prettier": [2, { useTabs: true }],
			"import/order": [
				"warn",
				{
					alphabetize: {
						order: "asc",
					},
					"newlines-between": "always",
					groups: ["external", "internal", "parent", "sibling", "index"],
					pathGroups: [
						{
							pattern: "@feature*",
							group: "external",
							position: "after",
						},
						{
							pattern: "@common*",
							group: "internal",
							position: "before",
						},
					],
					pathGroupsExcludedImportTypes: ["builtin"],
				},
			],
		},
	},
	eslintPluginPrettierRecommended,
);
