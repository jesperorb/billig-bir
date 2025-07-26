import { Button, createTheme } from "@mantine/core";

export const theme = createTheme({
	primaryColor: "teal",
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
