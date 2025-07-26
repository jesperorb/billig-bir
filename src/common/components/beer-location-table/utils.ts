import {
	ColumnFiltersState,
	createColumnHelper,
	FilterFn,
	SortingState,
	type VisibilityState,
} from "@tanstack/react-table";

import type { BeerLocation } from "@common/types/beer-location";
import { PriceType } from "@common/types/common";
import { createLocalStorageManager } from "@common/utils/local-storage";
import { getNotFilter } from "@common/utils/table";

import {
	BEER_LOCATION_TABLE_VISIBILITY_STORAGE_KEY,
	BEER_LOCATION_DEFAULT_VISIBLE_COLUMNS,
	BEER_LOCATION_TABLE_SORTING_STORAGE_KEY,
	BEER_LOCATION_DEFAULT_SORTING,
} from "./constants";
import { ColumnKeys } from "./types";

export const columnHelper = createColumnHelper<BeerLocation>();
export const beerLocationTableColumnVisibilityStorage =
	createLocalStorageManager<VisibilityState>(
		BEER_LOCATION_TABLE_VISIBILITY_STORAGE_KEY,
		BEER_LOCATION_DEFAULT_VISIBLE_COLUMNS,
	);

export const beerLocationTableSortingStorage =
	createLocalStorageManager<SortingState>(
		BEER_LOCATION_TABLE_SORTING_STORAGE_KEY,
		[BEER_LOCATION_DEFAULT_SORTING],
	);

export const getDefaultColumnVisiblity = () => {
	const storedVisibility = beerLocationTableColumnVisibilityStorage.get();
	const storedSorting = beerLocationTableSortingStorage.get();
	const sortedByPricePerCentiliter = storedSorting.some(
		(sorting) => sorting.id === "pricePerCentiliter",
	);
	return {
		pricePerCentiliter: sortedByPricePerCentiliter,
		priceAWPerCentiliter: !sortedByPricePerCentiliter,
		...storedVisibility,
	};
};

export const getDefaultPriceType = (): PriceType =>
	beerLocationTableSortingStorage
		.get()
		.some((sort) => sort.id === "pricePerCentiliter")
		? "price"
		: "priceAW";

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
