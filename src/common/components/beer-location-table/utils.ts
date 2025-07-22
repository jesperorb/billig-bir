import {
	ColumnDef,
	ColumnFilter,
	ColumnFiltersState,
	createColumnHelper,
	FilterFn,
	type VisibilityState,
} from "@tanstack/react-table";

import type { BeerLocation } from "@common/types/beer-location";
import { createLocalStorageManager } from "@common/utils/local-storage";

import {
	BEER_LOCATION_TABLE_VISIBILITY_STORAGE_KEY,
	DEFAULT_VISIBLE_COLUMNS,
} from "./constants";
import { ColumnKeys } from "./types";

export const columnHelper = createColumnHelper<BeerLocation>();
export const columnVisibilityStorage =
	createLocalStorageManager<VisibilityState>(
		BEER_LOCATION_TABLE_VISIBILITY_STORAGE_KEY,
		DEFAULT_VISIBLE_COLUMNS,
	);

export const getAccessorFromColumn = (
	column: ColumnDef<BeerLocation>,
): string => {
	if (column.id) {
		return column.id;
	}
	return "accessorKey" in column ? column.accessorKey : "";
};

export const getOrEmpty = (value?: string | number): string =>
	value?.toString() ?? "-";

export const getFilter = (id: ColumnKeys) => (filter: ColumnFilter) =>
	filter.id === id;

export const getNotFilter = (id: ColumnKeys) => (filter: ColumnFilter) =>
	filter.id !== id;

export const getStringFilterValue = (
	filter: ColumnFilter | undefined,
): string => (filter ? (filter.value as string) : "");

export const getStringArrayFilterValue = (
	filter: ColumnFilter | undefined,
): string[] => (filter ? (filter.value as string[]) : []);

export const districtsFilterFn: FilterFn<BeerLocation> = (
	row,
	_columnId,
	filterValue: string[],
) => {
	if (!filterValue.length) return true;
	if (!row.original.districts?.length) return false;
	return row.original.districts.some((district) =>
		filterValue.includes(district.id.toString()),
	);
};

const filterEmptyCheck = (value: string[] | string): boolean =>
	Array.isArray(value) ? value.length === 0 : value.trim() === "";

export const updateFilterValue =
	(id: ColumnKeys, value: string | string[]) =>
	(previousValue: ColumnFiltersState) => {
		const otherFilters = previousValue.filter(getNotFilter(id));
		if (filterEmptyCheck(value)) {
			return otherFilters;
		}
		return [...otherFilters, { id, value }];
	};
