import { Group, Table } from "@mantine/core";
import { flexRender, type HeaderGroup } from "@tanstack/react-table";

import { SortIcon } from "@common/components/table/sort-icon";

import { getCommonPinningStyles } from "./utils";

interface Props<Type extends object> {
	headerGroups: HeaderGroup<Type>[];
}

export const TableHead = <Type extends object>({
	headerGroups,
}: Props<Type>) => {
	return (
		<Table.Thead>
			{headerGroups.map((headerGroup) => (
				<Table.Tr key={headerGroup.id}>
					{headerGroup.headers.map((header) => (
						<Table.Th
							key={header.id}
							style={{
								...getCommonPinningStyles(header.column),
								cursor: header.column.getCanSort() ? "pointer" : "default",
								userSelect: "none",
								whiteSpace: "nowrap",
							}}
							onClick={header.column.getToggleSortingHandler()}
						>
							<Group gap="xs" wrap="nowrap">
								{flexRender(
									header.column.columnDef.header,
									header.getContext(),
								)}
								{header.column.getCanSort() && (
									<span
										style={{
											display: "inline-flex",
											alignItems: "center",
										}}
									>
										<SortIcon isSorted={header.column.getIsSorted()} />
									</span>
								)}
							</Group>
						</Table.Th>
					))}
				</Table.Tr>
			))}
		</Table.Thead>
	);
};
