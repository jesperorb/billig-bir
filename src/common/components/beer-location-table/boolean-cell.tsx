import { ThemeIcon } from "@mantine/core";
import { IconCheck, IconX } from "@tabler/icons-react";

interface BooleanCellProps {
	value: boolean;
	size?: string;
}

export const BooleanCell = ({ value, size = "xs" }: BooleanCellProps) => {
	return value ? (
		<ThemeIcon size={size}>
			<IconCheck />
		</ThemeIcon>
	) : (
		<ThemeIcon color="red" size={size}>
			<IconX />
		</ThemeIcon>
	);
};
