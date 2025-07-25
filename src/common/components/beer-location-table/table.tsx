import {
	ActionIcon,
	Table,
	Group,
	TextInput,
	Select,
	Space,
	Box,
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
		<>
			<Group justify="space-between" align="flex-end" px={filterPadding}>
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
				{districts && districts.length > 0 && (
					<DistrictSelect
						districts={districts}
						value={getStringArrayFilterValue(
							columnFilters.find(getFilter<ColumnKeys>("districts")),
						)}
						onChange={handleDistrictsChange}
					/>
				)}
				<Select
					label="Pristyp (kr/cl)"
					data={AVAILABLE_SORTABLE_PRICE_TYPES}
					value={selectedPriceType}
					onChange={togglePricePerClColumn}
					style={{ flexGrow: 1, minWidth: 200 }}
				/>
				<Box mt="xs" maw={{ sm: 300 }} style={{ flexGrow: 1, minWidth: 200 }}>
					<ColumnVisibilityMenu
						columns={columns as ColumnDef<BeerLocation>[]}
						columnVisibility={columnVisibility}
						onToggleColumnVisibility={toggleColumnVisiblity}
					/>
				</Box>
			</Group>
			<Space h="lg" />
			<Table.ScrollContainer minWidth={500}>
				<Table
					stickyHeader
					striped
					highlightOnHover
					tabularNums
					withColumnBorders
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
