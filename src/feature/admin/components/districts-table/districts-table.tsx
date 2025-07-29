import {
	ActionIcon,
	Table,
	TextInput,
	ThemeIcon,
	Space,
	Grid,
	Flex,
} from "@mantine/core";
import { IconSearch, IconCheck, IconX } from "@tabler/icons-react";
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
			}),
			columnHelper.accessor("insideTolls", {
				header: "Innanför tullarna",
				enableSorting: true,
				cell: ({ getValue }) =>
					getValue() ? (
						<ThemeIcon size="xs">
							<IconCheck />
						</ThemeIcon>
					) : (
						<ThemeIcon color="red" size="xs">
							<IconX />
						</ThemeIcon>
					),
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
		<>
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
			<Space h="sm" />
			<Flex px="sm" justify="flex-end">
				<ColumnVisibilityMenu
					columns={columns as ColumnDef<District>[]}
					columnVisibility={columnVisibility}
					onToggleColumnVisibility={toggleColumnVisiblity}
				/>
			</Flex>
			<Space h="lg" />
			<Table.ScrollContainer minWidth={390}>
				<Table
					stickyHeader
					striped
					highlightOnHover
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
			<Space h="xl" />
		</>
	);
};
