import { ActionIcon, Table, ThemeIcon, Group } from "@mantine/core";
import { IconCheck, IconX, IconChevronUp, IconChevronDown } from "@tabler/icons-react";
import { useMemo, useState, ReactNode } from "react";
import type { BeerLocation } from "@common/types/beer-location";
import {
	createColumnHelper,
	flexRender,
	getCoreRowModel,
	getSortedRowModel,
	useReactTable,
	type SortingState,
} from '@tanstack/react-table';

interface BeerLocationTableProps {
	data: BeerLocation[] | undefined;
	actionColumn: {
		header: string;
		icon: ReactNode;
		onClick: (location: BeerLocation) => void;
		ariaLabel: (location: BeerLocation) => string;
	};
}

const columnHelper = createColumnHelper<BeerLocation>();

export const BeerLocationTable = ({ data, actionColumn }: BeerLocationTableProps) => {
	const [sorting, setSorting] = useState<SortingState>([
		{
			id: 'name',
			desc: false, // false = ascending (A-Z)
		}
	]);

	const columns = useMemo(
		() => [
			columnHelper.accessor('name', {
				header: 'Namn',
				enableSorting: true,
			}),
			columnHelper.accessor('beerBrand', {
				header: 'Ölmärke',
				enableSorting: false,
			}),
			columnHelper.accessor('price', {
				header: 'Pris',
				enableSorting: true,
			}),
			columnHelper.accessor('centilitersStandard', {
				header: 'cl',
				enableSorting: false,
			}),
			columnHelper.accessor('priceAW', {
				header: 'Pris (AW)',
				enableSorting: false,
				cell: ({ getValue }) => getValue() || '-',
			}),
			columnHelper.display({
				id: 'centilitersAW',
				header: 'cl (AW)',
				cell: ({ getValue }) => getValue() || '-',
			}),
			columnHelper.accessor('pricePitcher', {
				header: 'Pris (kanna)',
				enableSorting: false,
				cell: ({ getValue }) => getValue() || '-',
			}),
			columnHelper.accessor('centilitersPitcher', {
				header: 'cl (kanna)',
				enableSorting: false,
				cell: ({ getValue }) => getValue() || '-',
			}),
			columnHelper.accessor('outdoorSeating', {
				header: 'Uteservering',
				enableSorting: false,
				cell: ({ getValue }) => (
					getValue()
						? <ThemeIcon size="xs"><IconCheck /></ThemeIcon>
						: <ThemeIcon color="red" size="xs"><IconX /></ThemeIcon>
				),
			}),
			columnHelper.accessor('afternoonSun', {
				header: 'Eftermiddagssol',
				enableSorting: false,
				cell: ({ getValue }) => (
					getValue()
						? <ThemeIcon size="xs"><IconCheck /></ThemeIcon>
						: <ThemeIcon color="red" size="xs"><IconX /></ThemeIcon>
				),
			}),
			columnHelper.display({
				id: 'awTimes',
				header: 'AW-tider',
				cell: ({ row }) => (
					row.original.awTimes?.length
						? <ThemeIcon size="xs"><IconCheck /></ThemeIcon>
						: <ThemeIcon color="red" size="xs"><IconX /></ThemeIcon>
				),
			}),
			columnHelper.accessor('latitude', {
				header: 'Latitude',
				enableSorting: false,
			}),
			columnHelper.accessor('longitude', {
				header: 'Longitude',
				enableSorting: false,
			}),
			columnHelper.display({
				id: 'actions',
				header: actionColumn.header,
				cell: ({ row }) => (
					<ActionIcon
						onClick={() => actionColumn.onClick(row.original)}
						p={0}
						variant="subtle"
						size="sm"
						aria-label={actionColumn.ariaLabel(row.original)}
					>
						{actionColumn.icon}
					</ActionIcon>
				),
			}),
		],
		[actionColumn]
	);

	const table = useReactTable({
		data: data ?? [],
		columns,
		state: {
			sorting,
		},
		onSortingChange: setSorting,
		getCoreRowModel: getCoreRowModel(),
		getSortedRowModel: getSortedRowModel(),
	});

	const getSortIcon = (isSorted: false | 'asc' | 'desc') => {
		if (isSorted === 'asc') return <IconChevronUp size={14} />;
		if (isSorted === 'desc') return <IconChevronDown size={14} />;
		return null;
	};

	return (
		<Table.ScrollContainer minWidth={500}>
			<Table
				stickyHeader
				striped
				highlightOnHover
				tabularNums
				withColumnBorders
			>
				<Table.Thead>
					{table.getHeaderGroups().map(headerGroup => (
						<Table.Tr key={headerGroup.id}>
							{headerGroup.headers.map(header => (
								<Table.Th
									key={header.id}
									style={{
										cursor: header.column.getCanSort() ? 'pointer' : 'default',
										userSelect: 'none',
									}}
									onClick={header.column.getToggleSortingHandler()}
								>
									<Group gap="xs" wrap="nowrap">
										{flexRender(header.column.columnDef.header, header.getContext())}
										{header.column.getCanSort() && (
											<span style={{ display: 'inline-flex', alignItems: 'center' }}>
												{getSortIcon(header.column.getIsSorted())}
											</span>
										)}
									</Group>
								</Table.Th>
							))}
						</Table.Tr>
					))}
				</Table.Thead>
				<Table.Tbody>
					{table.getRowModel().rows.map(row => (
						<Table.Tr key={row.id}>
							{row.getVisibleCells().map(cell => (
								<Table.Td key={cell.id}>
									{flexRender(cell.column.columnDef.cell, cell.getContext())}
								</Table.Td>
							))}
						</Table.Tr>
					))}
				</Table.Tbody>
			</Table>
		</Table.ScrollContainer>
	);
};
