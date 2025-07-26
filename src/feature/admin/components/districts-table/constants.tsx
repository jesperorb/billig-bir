import {
	ColumnSort,
	createColumnHelper,
	VisibilityState,
} from "@tanstack/react-table";

import { District } from "@common/types/district";
import { createLocalStorageManager } from "@common/utils/local-storage";

export const DISTRICTS_DEFAULT_VISIBLE_COLUMNS: Record<
	keyof District,
	boolean
> = {
	id: false,
	name: true,
	insideTolls: true,
};

export const DISTRICTS_DEFAULT_SORTING: ColumnSort = {
	id: "name",
	desc: true,
};

export const DISTRICTS_TABLE_STORAGE_KEY = "districts-table-visibility";
export const columnHelper = createColumnHelper<District>();
export const columnVisibilityStorage =
	createLocalStorageManager<VisibilityState>(
		DISTRICTS_TABLE_STORAGE_KEY,
		DISTRICTS_DEFAULT_VISIBLE_COLUMNS,
	);
