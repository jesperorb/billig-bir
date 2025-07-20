import {
	ActionIcon,
	Table,
	ThemeIcon,
	Group,
	Menu,
	Button,
	Checkbox,
	Stack,
	TextInput,
	MultiSelect,
	Skeleton,
	Text,
	Center,
	type StyleProp,
	type MantineSpacing,
} from "@mantine/core";
import {
	IconCheck,
	IconX,
	IconChevronUp,
	IconChevronDown,
	IconColumns,
	IconSearch,
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
	type ColumnFiltersState,
} from "@tanstack/react-table";
import { useMemo, useState, ReactNode, useEffect } from "react";

import type { BeerLocation } from "@common/types/beer-location";
import type { District } from "@common/types/district";
import { createLocalStorageManager } from "@common/utils/local-storage";

interface BeerLocationTableProps {
	data: BeerLocation[] | undefined;
	districts?: District[];
	isLoading?: boolean;
	actionColumn?: {
		header: string;
		icon: ReactNode;
		onClick: (location: BeerLocation) => void;
		ariaLabel: (location: BeerLocation) => string;
	};
	defaultSorting?: {
		id: string;
		desc?: boolean;
	};
	filterPadding?: StyleProp<MantineSpacing>;
}

const DEFAULT_VISIBLE_COLUMNS: Record<keyof BeerLocation, boolean> = {
	id: false,
	name: true,
	latitude: false,
	longitude: false,
	price: true,
	pricePitcher: true,
	priceAW: true,
	awTimes: true,
	outdoorSeating: true,
	afternoonSun: true,
	beerBrand: true,
	centilitersStandard: true,
	centilitersPitcher: true,
	urlMaps: true,
	urlWebsite: true,
	updatedAt: false,
	districts: true,
};

const STORAGE_KEY = "beer-location-table-visibility";
const columnHelper = createColumnHelper<BeerLocation>();
const columnVisibilityStorage = createLocalStorageManager<VisibilityState>(
	STORAGE_KEY,
	DEFAULT_VISIBLE_COLUMNS,
);

export const BeerLocationTable = ({
	data,
	districts,
	isLoading = false,
	actionColumn,
	defaultSorting,
	filterPadding = "sm",
}: BeerLocationTableProps) => {
	const [sorting, setSorting] = useState<SortingState>([
		defaultSorting
			? {
					id: defaultSorting.id,
					desc: defaultSorting.desc ?? false,
				}
			: {
					id: "name",
					desc: false,
				},
	]);

	const [columnVisibility, setColumnVisibility] = useState<VisibilityState>(
		() => columnVisibilityStorage.get(),
	);
	const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

	useEffect(() => {
		columnVisibilityStorage.set(columnVisibility);
	}, [columnVisibility]);

	const columns = useMemo(
		() => [
			...(actionColumn
				? [
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
					]
				: []),
			columnHelper.accessor("name", {
				header: "Namn",
				enableSorting: true,
				enableColumnFilter: true,
				filterFn: "includesString",
			}),
			columnHelper.accessor("price", {
				header: "Pris",
				enableSorting: true,
			}),
			columnHelper.accessor("centilitersStandard", {
				header: "cl",
				enableSorting: false,
			}),
			columnHelper.accessor("priceAW", {
				header: "Pris (AW)",
				enableSorting: false,
				cell: ({ getValue }) => getValue() ?? "-",
			}),
			columnHelper.accessor("pricePitcher", {
				header: "Pris (kanna)",
				enableSorting: false,
				cell: ({ getValue }) => getValue() ?? "-",
			}),
			columnHelper.accessor("centilitersPitcher", {
				header: "cl (kanna)",
				enableSorting: false,
				cell: ({ getValue }) => getValue() ?? "-",
			}),
			columnHelper.accessor("beerBrand", {
				header: "Ölmärke",
				enableSorting: false,
			}),
			columnHelper.accessor("outdoorSeating", {
				header: "Uteservering",
				enableSorting: false,
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
			columnHelper.accessor("afternoonSun", {
				header: "Eftermiddagssol",
				enableSorting: false,
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
			columnHelper.display({
				id: "awTimes",
				header: "AW-tider",
				cell: ({ row }) =>
					row.original.awTimes?.length ? (
						<ThemeIcon size="xs">
							<IconCheck />
						</ThemeIcon>
					) : (
						<ThemeIcon color="red" size="xs">
							<IconX />
						</ThemeIcon>
					),
			}),
			columnHelper.display({
				id: "districts",
				header: "Stadsdel",
				filterFn: (row, _columnId, filterValue: string[]) => {
					if (!filterValue.length) return true;
					if (!row.original.districts?.length) return false;
					return row.original.districts.some((district) =>
						filterValue.includes(district.id.toString()),
					);
				},
				cell: ({ row }) =>
					row.original.districts?.map((district) => district.name).join(", ") ??
					"-",
			}),
			columnHelper.accessor("latitude", {
				header: "Latitude",
				enableSorting: false,
			}),
			columnHelper.accessor("longitude", {
				header: "Longitude",
				enableSorting: false,
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

	// Get current filter values
	const districtsFilter = columnFilters.find(
		(filter) => filter.id === "districts",
	);
	const selectedDistricts = districtsFilter
		? (districtsFilter.value as string[])
		: [];

	const nameFilter = columnFilters.find((filter) => filter.id === "name");
	const nameSearchValue = nameFilter ? (nameFilter.value as string) : "";

	// Handle districts filter change
	const handleDistrictsChange = (newSelectedDistricts: string[]) => {
		setColumnFilters((prev) => {
			const otherFilters = prev.filter((filter) => filter.id !== "districts");
			if (newSelectedDistricts.length === 0) {
				return otherFilters;
			}
			return [
				...otherFilters,
				{ id: "districts", value: newSelectedDistricts },
			];
		});
	};

	// Handle name filter change
	const handleNameChange = (newNameValue: string) => {
		setColumnFilters((prev) => {
			const otherFilters = prev.filter((filter) => filter.id !== "name");
			if (newNameValue.trim() === "") {
				return otherFilters;
			}
			return [...otherFilters, { id: "name", value: newNameValue }];
		});
	};

	const table = useReactTable({
		data: data ?? [],
		columns,
		state: {
			sorting,
			columnVisibility,
			columnFilters,
		},
		onSortingChange: setSorting,
		onColumnVisibilityChange: setColumnVisibility,
		onColumnFiltersChange: setColumnFilters,
		getCoreRowModel: getCoreRowModel(),
		getSortedRowModel: getSortedRowModel(),
		getFilteredRowModel: getFilteredRowModel(),
	});

	const getSortIcon = (isSorted: false | "asc" | "desc") => {
		if (isSorted === "asc") return <IconChevronUp size={14} />;
		if (isSorted === "desc") return <IconChevronDown size={14} />;
		return null;
	};

	// Render skeleton rows for loading state
	const renderSkeletonRows = () => {
		const visibleColumns = table.getVisibleFlatColumns();
		return Array.from({ length: 3 }).map((_, index) => (
			<Table.Tr key={`skeleton-row-${index.toString()}`}>
				{visibleColumns.map((column) => (
					<Table.Td key={column.id}>
						<Skeleton height={20} radius="sm" />
					</Table.Td>
				))}
			</Table.Tr>
		));
	};

	// Render empty state
	const renderEmptyState = () => {
		const visibleColumns = table.getVisibleFlatColumns();
		return (
			<Table.Tr>
				<Table.Td colSpan={visibleColumns.length}>
					<Center py="xl">
						<Text c="dimmed">Inga platser hittades</Text>
					</Center>
				</Table.Td>
			</Table.Tr>
		);
	};

	return (
		<Stack gap="md">
			<Group justify="space-between" align="flex-end" px={filterPadding}>
				<Group gap="md" style={{ flexGrow: 1 }}>
					<TextInput
						placeholder="Sök efter namn"
						leftSection={<IconSearch size={16} />}
						value={nameSearchValue}
						onChange={(event) => {
							handleNameChange(event.currentTarget.value);
						}}
						style={{ flexGrow: 1, minWidth: 300 }}
					/>
					{districts && districts.length > 0 && (
						<MultiSelect
							placeholder="Filtrera på stadsdelar"
							data={[
								{
									group: "Innanför tullarna",
									items: districts
										.filter((district) => district.insideTolls)
										.map((district) => ({
											value: district.id.toString(),
											label: district.name,
										})),
								},
								{
									group: "Utanför tullarna",
									items: districts
										.filter((district) => !district.insideTolls)
										.map((district) => ({
											value: district.id.toString(),
											label: district.name,
										})),
								},
							]}
							value={selectedDistricts}
							onChange={handleDistrictsChange}
							searchable
							clearable
							style={{ flexGrow: 1, minWidth: 300 }}
						/>
					)}
				</Group>
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
			<Table.ScrollContainer
				minWidth={500}
				style={{ border: "1px solid var(--mantine-color-gray-3)" }}
			>
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
						{isLoading
							? renderSkeletonRows()
							: table.getRowModel().rows.length === 0
								? renderEmptyState()
								: table.getRowModel().rows.map((row) => (
										<Table.Tr key={row.id}>
											{row.getVisibleCells().map((cell) => (
												<Table.Td
													key={cell.id}
													style={{ whiteSpace: "nowrap" }}
												>
													{flexRender(
														cell.column.columnDef.cell,
														cell.getContext(),
													)}
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
