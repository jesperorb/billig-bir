import {
	ActionIcon,
	Table,
	Group,
	Stack,
	TextInput,
	Select,
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

import { BeerLocation } from "@common/types/beer-location";
import type { PriceType } from "@common/types/common";
import { getDistrictName } from "@common/utils/district";

import { DistrictSelect } from "../district-select/district-select";

import { BooleanCell } from "./boolean-cell";
import { ColumnVisibilityMenu } from "./column-visibility-menu";
import { AVAILABLE_SORTABLE_PRICE_TYPES, DEFAULT_SORTING } from "./constants";
import { TableHead } from "./table-head";
import { TableRows } from "./table-rows";
import { BeerLocationTableProps } from "./types";
import {
	columnHelper,
	columnVisibilityStorage,
	getFilter,
	getNotFilter,
	getOrEmpty,
	getPriceForType,
	getStringArrayFilterValue,
	getStringFilterValue,
} from "./utils";

export const BeerLocationTable = ({
	data,
	districts,
	isLoading = false,
	actionColumn,
	defaultSorting,
	filterPadding = "sm",
}: BeerLocationTableProps) => {
	const [sorting, setSorting] = useState<SortingState>([
		{ ...DEFAULT_SORTING, ...defaultSorting },
	]);

	const [columnVisibility, setColumnVisibility] = useState<VisibilityState>(
		() => columnVisibilityStorage.get(),
	);
	const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
	const [selectedPriceType, setSelectedPriceType] =
		useState<PriceType>("price");

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
			columnHelper.accessor(
				(row) =>
					getPriceForType(row, selectedPriceType) / row.centilitersStandard,
				{
					id: "pricePerCentiliter",
					header: "kr/cl",
					enableSorting: true,
					cell: ({ row }) => {
						const pricePerCl =
							getPriceForType(row.original, selectedPriceType) /
							row.original.centilitersStandard;
						return pricePerCl.toFixed(2);
					},
				},
			),
			columnHelper.accessor("priceAW", {
				header: "Pris (AW)",
				enableSorting: false,
				cell: ({ getValue }) => getOrEmpty(getValue()),
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
				filterFn: (row, _columnId, filterValue: string[]) => {
					if (!filterValue.length) return true;
					if (!row.original.districts?.length) return false;
					return row.original.districts.some((district) =>
						filterValue.includes(district.id.toString()),
					);
				},
				cell: ({ row }) =>
					getOrEmpty(row.original.districts?.map(getDistrictName).join(", ")),
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
		[actionColumn, selectedPriceType],
	);

	const toggleColumnVisiblity = (columnId: string) => {
		setColumnVisibility((prev) => ({
			...prev,
			[columnId]: !prev[columnId] ? true : false,
		}));
	};

	const selectedDistricts = getStringArrayFilterValue(
		columnFilters.find(getFilter("districts")),
	);

	const nameSearchValue = getStringFilterValue(
		columnFilters.find(getFilter("name")),
	);

	const handleDistrictsChange = (newSelectedDistricts: string[]) => {
		setColumnFilters((prev) => {
			const otherFilters = prev.filter(getNotFilter("districts"));
			if (newSelectedDistricts.length === 0) {
				return otherFilters;
			}
			return [
				...otherFilters,
				{ id: "districts", value: newSelectedDistricts },
			];
		});
	};

	const handleNameChange = (newNameValue: string) => {
		setColumnFilters((prev) => {
			const otherFilters = prev.filter(getNotFilter("name"));
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

	return (
		<Stack gap="md">
			<Group justify="space-between" align="flex-end" px={filterPadding}>
				<Group gap="md" style={{ flexGrow: 1 }}>
					<TextInput
						label="Sök"
						placeholder="Sök efter namn"
						leftSection={<IconSearch size={16} />}
						value={nameSearchValue}
						onChange={(event) => {
							handleNameChange(event.currentTarget.value);
						}}
						style={{ flexGrow: 1, minWidth: 300 }}
					/>
					{districts && districts.length > 0 && (
						<DistrictSelect
							districts={districts}
							value={selectedDistricts}
							onChange={handleDistrictsChange}
						/>
					)}
					<Select
						label="Pristyp (kr/cl)"
						data={AVAILABLE_SORTABLE_PRICE_TYPES}
						value={selectedPriceType}
						onChange={(value) => {
							if (value) {
								setSelectedPriceType(value as PriceType);
							}
						}}
						style={{ minWidth: 150 }}
					/>
				</Group>
				<ColumnVisibilityMenu
					columns={columns as ColumnDef<BeerLocation>[]}
					columnVisibility={columnVisibility}
					onToggleColumnVisibility={toggleColumnVisiblity}
				/>
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
		</Stack>
	);
};
