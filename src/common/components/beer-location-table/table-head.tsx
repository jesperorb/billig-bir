import { Group, Table } from "@mantine/core";
import { flexRender, type HeaderGroup } from "@tanstack/react-table";

import type { BeerLocation } from "@common/types/beer-location";

import { SortIcon } from "./sort-icon";

interface Props {
	headerGroups: HeaderGroup<BeerLocation>[];
}

export const TableHead = ({ headerGroups }: Props) => {
	return (
		<Table.Thead>
			{headerGroups.map((headerGroup) => (
				<Table.Tr key={headerGroup.id}>
					{headerGroup.headers.map((header) => (
						<Table.Th
							key={header.id}
							style={{
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
