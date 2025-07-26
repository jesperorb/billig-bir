import { IconChevronDown, IconChevronUp } from "@tabler/icons-react";
import type { SortDirection } from "@tanstack/react-table";

interface Props {
	isSorted: SortDirection | false;
}

export const SortIcon = ({ isSorted }: Props) => {
	if (isSorted === "asc") return <IconChevronUp size={14} />;
	if (isSorted === "desc") return <IconChevronDown size={14} />;
	return null;
};
