import { Badge, BadgeProps, ThemeIcon } from "@mantine/core";
import { IconCheck, IconX } from "@tabler/icons-react";

interface BooleanBadgeProps extends Pick<BadgeProps, "variant"> {
	value: boolean;
	label: string;
	trueColor?: string;
	falseColor?: string;
}

export const BooleanBadge = ({
	value,
	label,
	trueColor = "hops.7",
	falseColor = "wine.6",
	variant = "filled",
}: BooleanBadgeProps) => {
	return (
		<Badge
			color={value ? trueColor : falseColor}
			variant={variant}
			leftSection={
				<ThemeIcon
					size="xs"
					variant="transparent"
					color={value ? "hops.2" : "wine.2"}
				>
					{value ? <IconCheck size={12} /> : <IconX size={12} />}
				</ThemeIcon>
			}
		>
			{label}
		</Badge>
	);
};
