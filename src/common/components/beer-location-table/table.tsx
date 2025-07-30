import {
	ActionIcon,
	Table,
	TextInput,
	Select,
	Grid,
	Flex,
	Stack,
} from "@mantine/core";
import { IconSearch } from "@tabler/icons-react";
import {
	getCoreRowModel,
	getSortedRowModel,
	getFilteredRowModel,
	useReactTable,
	type SortingState,
	type VisibilityState,
	type ColumnFiltersState,
	ColumnDef,
} from "@tanstack/react-table";
import { useMemo, useState, useEffect } from "react";

import { DistrictSelect } from "@common/components/district-select/district-select";
import { BooleanCell } from "@common/components/table/boolean-cell";
import { ColumnVisibilityMenu } from "@common/components/table/column-visibility-menu";
import { TableHead } from "@common/components/table/table-head";
import { TableRows } from "@common/components/table/table-rows";
import { BeerLocation } from "@common/types/beer-location";
import type { PriceType } from "@common/types/common";
import { getPricePerCl } from "@common/utils/beer-location";
import { getJoinedDistrictsNames } from "@common/utils/district";
import {
	getFilter,
	getOrEmpty,
	getStringArrayFilterValue,
	getStringFilterValue,
} from "@common/utils/table";

import { AVAILABLE_SORTABLE_PRICE_TYPES } from "./constants";
import { BeerLocationTableProps, ColumnKeys } from "./types";
import {
	columnHelper,
	beerLocationTableColumnVisibilityStorage,
	districtsFilterFn,
	updateFilterValue,
	beerLocationTableSortingStorage,
	getDefaultColumnVisiblity,
	getDefaultPriceType,
} from "./utils";

export const BeerLocationTable = ({
	data,
	districts,
	isLoading = false,
	actionColumn,
	filterPadding = "sm",
}: BeerLocationTableProps) => {
	const [sorting, setSorting] = useState<SortingState>(() =>
		beerLocationTableSortingStorage.get(),
	);

	const [columnVisibility, setColumnVisibility] = useState<VisibilityState>(
		() => getDefaultColumnVisiblity(),
	);
	const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
	const [selectedPriceType, setSelectedPriceType] = useState<PriceType>(() =>
		getDefaultPriceType(),
	);

	useEffect(() => {
		beerLocationTableColumnVisibilityStorage.set(columnVisibility);
	}, [columnVisibility]);

	useEffect(() => {
		beerLocationTableSortingStorage.set(sorting);
	}, [sorting]);

	const columns = useMemo(
		() => [
			...(actionColumn
				? [
						columnHelper.display({
							id: "actions",
							header: actionColumn.header,
							maxSize: 60,
							size: 60,
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
				minSize: 180,
			}),
			columnHelper.accessor("price", {
				header: "Pris",
				enableSorting: true,
			}),
			columnHelper.accessor("priceAW", {
				header: "Pris (AW)",
				enableSorting: false,
				cell: ({ getValue }) => getOrEmpty(getValue()),
			}),
			columnHelper.accessor("centilitersStandard", {
				header: "cl",
				enableSorting: false,
			}),
			columnHelper.accessor(getPricePerCl("price"), {
				id: "pricePerCentiliter",
				header: "kr/cl",
				enableSorting: true,
				cell: ({ row }) => getPricePerCl("price")(row.original),
			}),
			columnHelper.accessor(getPricePerCl("priceAW"), {
				id: "priceAWPerCentiliter",
				header: "kr/cl (AW)",
				enableSorting: true,
				cell: ({ row }) => getPricePerCl("priceAW")(row.original),
			}),
			columnHelper.accessor("pricePitcher", {
				header: "Pris (kanna)",
				enableSorting: false,
				cell: ({ getValue }) => getOrEmpty(getValue()),
			}),
			columnHelper.accessor("centilitersPitcher", {
				header: "cl (kanna)",
				enableSorting: false,
				cell: ({ getValue }) => getOrEmpty(getValue()),
			}),
			columnHelper.accessor("beerBrand", {
				header: "Ölmärke",
				enableSorting: false,
			}),
			columnHelper.accessor("outdoorSeating", {
				header: "Uteservering",
				enableSorting: false,
				cell: ({ getValue }) => <BooleanCell value={getValue()} />,
			}),
			columnHelper.accessor("afternoonSun", {
				header: "Eftermiddagssol",
				enableSorting: false,
				cell: ({ getValue }) => <BooleanCell value={getValue()} />,
			}),
			columnHelper.display({
				id: "awTimes",
				header: "AW-tider",
				cell: ({ row }) => (
					<BooleanCell value={Boolean(row.original.awTimes?.length)} />
				),
			}),
			columnHelper.display({
				id: "districts",
				header: "Stadsdel",
				filterFn: districtsFilterFn,
				cell: ({ row }) =>
					getOrEmpty(getJoinedDistrictsNames(row.original.districts)),
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

	const table = useReactTable({
		data: data ?? [],
		columns,
		initialState: {
			columnPinning: {
				left: ["name"],
				right: actionColumn ? ["actions"] : undefined,
			},
		},
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

	const handleDistrictsChange = (newSelectedDistricts: string[]) => {
		setColumnFilters(updateFilterValue("districts", newSelectedDistricts));
	};

	const updatedColumnVisibility = (
		columnId: ColumnKeys,
		visible: boolean | "toggle",
	) => {
		setColumnVisibility((prev) => ({
			...prev,
			[columnId]: visible === "toggle" ? !prev[columnId] : visible,
		}));
	};

	const toggleColumnVisiblity = (columnId: ColumnKeys) => {
		updatedColumnVisibility(columnId, "toggle");
	};

	const togglePricePerClColumn = (value: string | null) => {
		if (!value) return;
		const valueAs = value as PriceType;
		setSelectedPriceType(valueAs);
		if (valueAs === "price") {
			updatedColumnVisibility("pricePerCentiliter", true);
			updatedColumnVisibility("priceAWPerCentiliter", false);
			updatedColumnVisibility("price", true);
			table.setSorting([{ id: "pricePerCentiliter", desc: false }]);
		} else {
			updatedColumnVisibility("priceAWPerCentiliter", true);
			updatedColumnVisibility("pricePerCentiliter", false);
			updatedColumnVisibility("priceAW", true);
			table.setSorting([{ id: "priceAWPerCentiliter", desc: false }]);
		}
	};

	return (
		<Flex direction="column" style={{ height: "100%" }}>
			<Stack gap="xs" mb="xs">
				<Grid
					type="container"
					px={filterPadding}
					breakpoints={{
						xs: "15em",
						sm: "26em",
						md: "40em",
						lg: "40em",
						xl: "55em",
					}}
				>
					<Grid.Col span={{ base: 12, sm: 6, md: 4 }}>
						<TextInput
							label="Sök"
							placeholder="Sök efter namn"
							leftSection={<IconSearch size={16} />}
							value={getStringFilterValue(
								columnFilters.find(getFilter<ColumnKeys>("name")),
							)}
							onChange={(event) => {
								setColumnFilters(updateFilterValue("name", event.target.value));
							}}
							style={{ flexGrow: 1, minWidth: 200 }}
						/>
					</Grid.Col>
					<Grid.Col span={{ base: 12, sm: 6, md: 4 }}>
						<DistrictSelect
							districts={districts ?? []}
							value={getStringArrayFilterValue(
								columnFilters.find(getFilter<ColumnKeys>("districts")),
							)}
							onChange={handleDistrictsChange}
						/>
					</Grid.Col>
					<Grid.Col span={{ base: 12, sm: 6, md: 4 }}>
						<Select
							label="Pristyp (kr/cl)"
							data={AVAILABLE_SORTABLE_PRICE_TYPES}
							value={selectedPriceType}
							onChange={togglePricePerClColumn}
							style={{ flexGrow: 1, minWidth: 200 }}
						/>
					</Grid.Col>
				</Grid>
				<Flex px="sm" justify="flex-end">
					<ColumnVisibilityMenu
						columns={columns as ColumnDef<BeerLocation>[]}
						columnVisibility={columnVisibility}
						onToggleColumnVisibility={toggleColumnVisiblity}
					/>
				</Flex>
			</Stack>
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
					w={table.getTotalSize()}
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
