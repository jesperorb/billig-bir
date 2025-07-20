import { Table } from "@mantine/core";
import { flexRender, type Column, type Row } from "@tanstack/react-table";

import type { BeerLocation } from "@common/types/beer-location";

import { EmptyState } from "./empty-state";
import { LoadingState } from "./loading-state";

interface Props {
	isLoading?: boolean;
	rows: Row<BeerLocation>[];
	columns: Column<BeerLocation>[];
}

export const TableRows = ({ rows, columns, isLoading }: Props) => {
	if (isLoading) {
		return <LoadingState columns={columns} />;
	}
	if (rows.length === 0) {
		return <EmptyState numberOfColumns={columns.length} />;
	}
	return (
		<>
			{rows.map((row) => (
				<Table.Tr key={row.id}>
					{row.getVisibleCells().map((cell) => (
						<Table.Td key={cell.id} style={{ whiteSpace: "nowrap" }}>
							{flexRender(cell.column.columnDef.cell, cell.getContext())}
						</Table.Td>
					))}
				</Table.Tr>
			))}
		</>
	);
};
