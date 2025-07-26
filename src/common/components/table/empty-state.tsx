import { Center, Table, Text } from "@mantine/core";

interface Props {
	numberOfColumns: number;
}

export const EmptyState = ({ numberOfColumns }: Props) => {
	return (
		<Table.Tr>
			<Table.Td colSpan={numberOfColumns}>
				<Center py="xl">
					<Text c="dimmed">Inga platser hittades</Text>
				</Center>
			</Table.Td>
		</Table.Tr>
	);
};
