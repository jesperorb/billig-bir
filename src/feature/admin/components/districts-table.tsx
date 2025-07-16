import {
	ActionIcon,
	Table,
	Group,
	Menu,
	Button,
	Checkbox,
	Stack,
	TextInput,
	ThemeIcon,
} from "@mantine/core";
import {
	IconChevronUp,
	IconChevronDown,
	IconColumns,
	IconSearch,
	IconCheck,
	IconX,
} from "@tabler/icons-react";
import {
	createColumnHelper,
	flexRender,
	getCoreRowModel,
	getSortedRowModel,
	getFilteredRowModel,
	useReactTable,
	type SortingState,
	type VisibilityState,
} from "@tanstack/react-table";
import { useMemo, useState, ReactNode, useEffect } from "react";

import type { District } from "@common/types/district";
import { createLocalStorageManager } from "@common/utils/local-storage";

interface DistrictsTableProps {
	data: District[] | undefined;
	actionColumn: {
		header: string;
		icon: ReactNode;
		onClick: (district: District) => void;
		ariaLabel: (district: District) => string;
	};
}

const STORAGE_KEY = "districts-table-visibility";
const columnHelper = createColumnHelper<District>();
const columnVisibilityStorage = createLocalStorageManager<VisibilityState>(
	STORAGE_KEY,
	{},
);

export const DistrictsTable = ({ data, actionColumn }: DistrictsTableProps) => {
	const [sorting, setSorting] = useState<SortingState>([
		{
			id: "name",
			desc: false,
		},
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

	const columnOptions = columns
		.map((col) => {
			const accessorKey = "accessorKey" in col ? col.accessorKey : "";
			const accessor = col.id ?? accessorKey;
			return {
				value: accessor,
				label: typeof col.header === "string" ? col.header : accessor,
			};
		})
		.filter((option) => option.value && option.value !== "actions");

	const handleColumnToggle = (columnId: string) => {
		setColumnVisibility((prev) => ({
			...prev,
			[columnId]: !prev[columnId] ? true : false,
		}));
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

	const getSortIcon = (isSorted: false | "asc" | "desc") => {
		if (isSorted === "asc") return <IconChevronUp size={14} />;
		if (isSorted === "desc") return <IconChevronDown size={14} />;
		return null;
	};

	return (
		<Stack gap="md">
			<Group justify="space-between" align="flex-end" mx="sm">
				<TextInput
					placeholder="Sök efter namn"
					leftSection={<IconSearch size={16} />}
					value={globalFilter}
					onChange={(event) => {
						setGlobalFilter(event.currentTarget.value);
					}}
					style={{ flexGrow: 1, maxWidth: 300 }}
				/>
				<Menu shadow="md" width={250}>
					<Menu.Target>
						<Button
							leftSection={<IconColumns size={16} />}
							variant="outline"
							size="sm"
						>
							Kolumner
						</Button>
					</Menu.Target>

					<Menu.Dropdown>
						<Menu.Label>Synliga kolumner</Menu.Label>
						{columnOptions.map((option) => (
							<Menu.Item key={option.value} closeMenuOnClick={false}>
								<Checkbox
									label={option.label}
									checked={columnVisibility[option.value]}
									onChange={() => {
										handleColumnToggle(option.value);
									}}
								/>
							</Menu.Item>
						))}
					</Menu.Dropdown>
				</Menu>
			</Group>
			<Table.ScrollContainer minWidth={500}>
				<Table
					stickyHeader
					striped
					highlightOnHover
					tabularNums
					withColumnBorders
				>
					<Table.Thead>
						{table.getHeaderGroups().map((headerGroup) => (
							<Table.Tr key={headerGroup.id}>
								{headerGroup.headers.map((header) => (
									<Table.Th
										key={header.id}
										style={{
											cursor: header.column.getCanSort()
												? "pointer"
												: "default",
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
													{getSortIcon(header.column.getIsSorted())}
												</span>
											)}
										</Group>
									</Table.Th>
								))}
							</Table.Tr>
						))}
					</Table.Thead>
					<Table.Tbody>
						{table.getRowModel().rows.map((row) => (
							<Table.Tr key={row.id}>
								{row.getVisibleCells().map((cell) => (
									<Table.Td key={cell.id} style={{ whiteSpace: "nowrap" }}>
										{flexRender(cell.column.columnDef.cell, cell.getContext())}
									</Table.Td>
								))}
							</Table.Tr>
						))}
					</Table.Tbody>
				</Table>
			</Table.ScrollContainer>
		</Stack>
	);
};
