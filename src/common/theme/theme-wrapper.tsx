import { MantineProvider } from "@mantine/core";
import { PropsWithChildren } from "react";

import { theme } from "@common/theme";

import "@mantine/core/styles.css";

const ThemeWrapper = ({ children }: PropsWithChildren) => {
	return (
		<>
			<MantineProvider theme={theme} defaultColorScheme="light">
				{children}
			</MantineProvider>
		</>
	);
};

export default ThemeWrapper;
