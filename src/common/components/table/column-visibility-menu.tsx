import { Button, Checkbox, Menu } from "@mantine/core";
import { IconColumns } from "@tabler/icons-react";
import type { ColumnDef, VisibilityState } from "@tanstack/react-table";

import { getAccessorFromColumn } from "@common/utils/table";

interface ColumnVisibilityMenuProps<
	Type extends object,
	ColumnKeys extends string,
> {
	columns: ColumnDef<Type>[];
	columnVisibility: VisibilityState;
	onToggleColumnVisibility: (columnId: ColumnKeys) => void;
}

export const ColumnVisibilityMenu = <
	Type extends object,
	ColumnKeys extends string,
>({
	columns,
	columnVisibility,
	onToggleColumnVisibility,
}: ColumnVisibilityMenuProps<Type, ColumnKeys>) => (
	<Menu shadow="md">
		<Menu.Target>
			<Button
				leftSection={<IconColumns size={16} />}
				variant="outline"
				size="sm"
				w="100%"
			>
				Kolumner
			</Button>
		</Menu.Target>

		<Menu.Dropdown>
			<Menu.Label>Synliga kolumner</Menu.Label>
			{columns.map((column) => {
				const value = getAccessorFromColumn(column);
				if (value === "actions") {
					return null;
				}
				return (
					<Menu.Item key={value} closeMenuOnClick={false}>
						<Checkbox
							label={typeof column.header === "string" ? column.header : value}
							checked={columnVisibility[value]}
							onChange={() => {
								onToggleColumnVisibility(value as ColumnKeys);
							}}
						/>
					</Menu.Item>
				);
			})}
		</Menu.Dropdown>
	</Menu>
);
