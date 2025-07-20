import {
	ColumnDef,
	ColumnFilter,
	createColumnHelper,
	type VisibilityState,
} from "@tanstack/react-table";

import type { BeerLocation } from "@common/types/beer-location";
import type { PriceType } from "@common/types/common";
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

export const getPriceForType = (
	row: BeerLocation,
	priceType: PriceType,
): number => row[priceType] ?? row.price;

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
