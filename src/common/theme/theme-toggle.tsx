import {
	ActionIcon,
	useMantineColorScheme,
	useComputedColorScheme,
} from "@mantine/core";
import { IconSun, IconMoon } from "@tabler/icons-react";

export const ThemeToggle = () => {
	const { setColorScheme } = useMantineColorScheme();
	const colorScheme = useComputedColorScheme("light");

	return (
		<ActionIcon
			onClick={() => {
				setColorScheme(colorScheme === "light" ? "dark" : "light");
			}}
			variant="default"
			size="xl"
			aria-label={
				colorScheme === "light" ? "Byt till mörkt läge" : "Byt till ljust läge"
			}
		>
			{colorScheme === "light" ? (
				<IconSun stroke={1.5} />
			) : (
				<IconMoon stroke={1.5} />
			)}
		</ActionIcon>
	);
};
