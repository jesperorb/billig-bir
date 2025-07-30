import { Button, createTheme } from "@mantine/core";

export const theme = createTheme({
	primaryColor: "gold",
	primaryShade: { light: 7, dark: 7 },
	colors: {
		amber: [
			"#fef7ed", // lightest cream
			"#fde68a", // light golden
			"#fbbf24", // soft gold
			"#f59e0b", // warm amber
			"#d97706", // medium amber
			"#b45309", // deeper amber
			"#92400e", // rich amber
			"#78350f", // dark amber
			"#451a03", // deepest amber
			"#1c0701", // darkest amber
		],
		wine: [
			"#fdf2f8", // light blush
			"#fce7f3", // soft pink
			"#f9a8d4", // pastel rose
			"#ec4899", // medium rose
			"#be185d", // deeper rose
			"#9d174d", // wine red
			"#831843", // deeper wine
			"#701a37", // dark wine
			"#5c152c", // darker wine
			"#4a1225", // darkest wine
		],
		hops: [
			"#f0fdf4", // light mint
			"#dcfce7", // soft green
			"#bbf7d0", // pastel green
			"#86efac", // light green
			"#4ade80", // medium green
			"#22c55e", // vibrant green
			"#16a34a", // deep green
			"#15803d", // forest green
			"#14532d", // dark forest
			"#052e16", // darkest forest
		],
		gold: [
			"#fffef9", // cream white
			"#fefce8", // light cream
			"#fef3c7", // soft cream
			"#fde047", // light foam
			"#facc15", // warm foam
			"#eab308", // golden foam
			"#ca8a04", // deep foam
			"#a16207", // rich foam
			"#713f12", // dark foam
			"#422006", // darkest foam
		],
	},
	white: "#f8f7f6",
	components: {
		Button: Button.extend({
			defaultProps: {
				size: "md",
			},
		}),
	},
	fontSizes: {
		sm: "1rem",
	},
	radius: {
		default: "0.5rem",
	},
});
