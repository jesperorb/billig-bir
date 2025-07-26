import { Skeleton, Table } from "@mantine/core";
import type { Column } from "@tanstack/react-table";

interface Props<Type extends object> {
	columns: Column<Type>[];
	numberOfRows?: number;
}

export const LoadingState = <Type extends object>({
	columns,
	numberOfRows = 3,
}: Props<Type>) => {
	return Array.from({ length: numberOfRows }).map((_, index) => (
		<Table.Tr key={`skeleton-row-${index.toString()}`}>
			{columns.map((column) => (
				<Table.Td key={column.id}>
					<Skeleton height={20} radius="sm" />
				</Table.Td>
			))}
		</Table.Tr>
	));
};
