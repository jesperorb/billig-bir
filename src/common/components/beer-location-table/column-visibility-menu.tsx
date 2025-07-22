import { Button, Checkbox, Menu } from "@mantine/core";
import { IconColumns } from "@tabler/icons-react";
import type { ColumnDef, VisibilityState } from "@tanstack/react-table";

import type { BeerLocation } from "@common/types/beer-location";

import type { ColumnKeys } from "./types";
import { getAccessorFromColumn } from "./utils";

interface ColumnVisibilityMenuProps {
	columns: ColumnDef<BeerLocation>[];
	columnVisibility: VisibilityState;
	onToggleColumnVisibility: (columnId: ColumnKeys) => void;
}

export const ColumnVisibilityMenu = ({
	columns,
	columnVisibility,
	onToggleColumnVisibility,
}: ColumnVisibilityMenuProps) => (
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
