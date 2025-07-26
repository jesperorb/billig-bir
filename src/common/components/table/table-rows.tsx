import { Table } from "@mantine/core";
import { flexRender, type Column, type Row } from "@tanstack/react-table";

import { EmptyState } from "@common/components/table/empty-state";
import { LoadingState } from "@common/components/table/loading-state";

import { getCommonPinningStyles } from "./utils";

interface Props<Type extends object> {
	isLoading?: boolean;
	rows: Row<Type>[];
	columns: Column<Type>[];
}

export const TableRows = <Type extends object>({
	rows,
	columns,
	isLoading,
}: Props<Type>) => {
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
						<Table.Td
							key={cell.id}
							style={{
								...getCommonPinningStyles(cell.column),
								whiteSpace: "nowrap",
							}}
						>
							{flexRender(cell.column.columnDef.cell, cell.getContext())}
						</Table.Td>
					))}
				</Table.Tr>
			))}
		</>
	);
};
