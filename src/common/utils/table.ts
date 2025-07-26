/* eslint-disable @typescript-eslint/no-unnecessary-type-parameters */
import { ColumnDef, ColumnFilter } from "@tanstack/react-table";

export const getAccessorFromColumn = <Type extends object>(
	column: ColumnDef<Type>,
): string => {
	if (column.id) {
		return column.id;
	}
	return "accessorKey" in column ? (column.accessorKey as string) : "";
};

export const getOrEmpty = (value?: string | number): string =>
	value?.toString() ?? "-";

export const getFilter =
	<Columns extends string>(id: Columns) =>
	(filter: ColumnFilter) =>
		filter.id === id;

export const getNotFilter =
	<Columns extends string>(id: Columns) =>
	(filter: ColumnFilter) =>
		filter.id !== id;

export const getStringFilterValue = (
	filter: ColumnFilter | undefined,
): string => (filter ? (filter.value as string) : "");

export const getStringArrayFilterValue = (
	filter: ColumnFilter | undefined,
): string[] => (filter ? (filter.value as string[]) : []);
