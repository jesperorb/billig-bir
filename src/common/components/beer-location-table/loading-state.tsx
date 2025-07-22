import { Skeleton, Table } from "@mantine/core";
import type { Column } from "@tanstack/react-table";

import type { BeerLocation } from "@common/types/beer-location";

interface Props {
	columns: Column<BeerLocation>[];
	numberOfRows?: number;
}

export const LoadingState = ({ columns, numberOfRows = 3 }: Props) => {
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
