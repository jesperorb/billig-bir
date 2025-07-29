import { Button, createTheme } from "@mantine/core";

export const theme = createTheme({
	primaryColor: "teal",
	primaryShade: 9,
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
});
