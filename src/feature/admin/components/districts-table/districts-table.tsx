import {
	ActionIcon,
	Table,
	TextInput,
	Grid,
	Flex,
	Stack,
	Accordion,
} from "@mantine/core";
import { IconFilter2, IconSearch } from "@tabler/icons-react";
import {
	getCoreRowModel,
	getSortedRowModel,
	getFilteredRowModel,
	useReactTable,
	type SortingState,
	type VisibilityState,
	ColumnDef,
} from "@tanstack/react-table";
import { useMemo, useState, useEffect } from "react";

import { BooleanCell } from "@common/components/table/boolean-cell";
import { ColumnVisibilityMenu } from "@common/components/table/column-visibility-menu";
import { TableHead } from "@common/components/table/table-head";
import { TableRows } from "@common/components/table/table-rows";
import type { District } from "@common/types/district";

import {
	columnHelper,
	columnVisibilityStorage,
	DISTRICTS_DEFAULT_SORTING,
} from "./constants";
import type { DistrictsTableProps } from "./types";

export const DistrictsTable = ({
	data,
	actionColumn,
	isLoading,
}: DistrictsTableProps) => {
	const [sorting, setSorting] = useState<SortingState>([
		DISTRICTS_DEFAULT_SORTING,
	]);

	const [columnVisibility, setColumnVisibility] = useState<VisibilityState>(
		() => columnVisibilityStorage.get(),
	);
	const [globalFilter, setGlobalFilter] = useState("");

	useEffect(() => {
		columnVisibilityStorage.set(columnVisibility);
	}, [columnVisibility]);

	const columns = useMemo(
		() => [
			columnHelper.display({
				id: "actions",
				header: actionColumn.header,
				maxSize: 80,
				size: 80,
				cell: ({ row }) => (
					<ActionIcon
						onClick={() => {
							actionColumn.onClick(row.original);
						}}
						p={0}
						variant="subtle"
						size="sm"
						aria-label={actionColumn.ariaLabel(row.original)}
					>
						{actionColumn.icon}
					</ActionIcon>
				),
			}),
			columnHelper.accessor("name", {
				header: "Namn",
				enableSorting: true,
				maxSize: 150,
				size: 150,
			}),
			columnHelper.accessor("insideTolls", {
				header: "Innanför tullarna",
				enableSorting: true,
				cell: ({ getValue }) => <BooleanCell value={getValue()} />,
			}),
		],
		[actionColumn],
	);

	const updatedColumnVisibility = (
		columnId: keyof District,
		visible: boolean | "toggle",
	) => {
		setColumnVisibility((prev) => ({
			...prev,
			[columnId]: visible === "toggle" ? !prev[columnId] : visible,
		}));
	};

	const toggleColumnVisiblity = (columnId: keyof District) => {
		updatedColumnVisibility(columnId, "toggle");
	};

	const table = useReactTable({
		data: data ?? [],
		columns,
		initialState: {
			columnPinning: {
				left: ["name"],
				right: ["actions"],
			},
		},
		state: {
			sorting,
			columnVisibility,
			globalFilter,
		},
		onSortingChange: setSorting,
		onColumnVisibilityChange: setColumnVisibility,
		onGlobalFilterChange: setGlobalFilter,
		globalFilterFn: "includesString",
		getCoreRowModel: getCoreRowModel(),
		getSortedRowModel: getSortedRowModel(),
		getFilteredRowModel: getFilteredRowModel(),
	});

	return (
		<Flex direction="column" style={{ height: "100%" }}>
			<Accordion>
				<Accordion.Item value="filters">
					<Accordion.Control icon={<IconFilter2 />}>Filter</Accordion.Control>
					<Accordion.Panel>
						<Stack gap="xs" mb="xs">
							<Grid px="sm">
								<Grid.Col>
									<TextInput
										label="Sök"
										placeholder="Sök efter namn"
										leftSection={<IconSearch size={16} />}
										value={globalFilter}
										onChange={(event) => {
											setGlobalFilter(event.currentTarget.value);
										}}
									/>
								</Grid.Col>
							</Grid>
							<Flex px="sm" justify="flex-end">
								<ColumnVisibilityMenu
									columns={columns as ColumnDef<District>[]}
									columnVisibility={columnVisibility}
									onToggleColumnVisibility={toggleColumnVisiblity}
								/>
							</Flex>
						</Stack>
					</Accordion.Panel>
				</Accordion.Item>
			</Accordion>
			<Table.ScrollContainer
				minWidth={360}
				style={{
					flex: 1,
					minHeight: 0,
					overflow: "auto",
				}}
			>
				<Table
					stickyHeader
					striped
					tabularNums
					withColumnBorders
					width={table.getTotalSize()}
				>
					<TableHead headerGroups={table.getHeaderGroups()} />
					<Table.Tbody>
						<TableRows
							rows={table.getRowModel().rows}
							columns={table.getVisibleFlatColumns()}
							isLoading={isLoading}
						/>
					</Table.Tbody>
				</Table>
			</Table.ScrollContainer>
		</Flex>
	);
};
