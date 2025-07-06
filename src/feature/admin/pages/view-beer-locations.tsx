import { ActionIcon, AppShell, Divider, Loader, Modal, Table, Title } from "@mantine/core";
import { useBeerLocations } from "@feature/map/queries";
import { IconPencil } from "@tabler/icons-react";
import { useState } from "react";
import { BeerLocation } from "@common/types/beerLocation";
import { useDisclosure } from "@mantine/hooks";
import { BeerLocationForm } from "../beer-location.form";
import { useUpdateBeerLocation } from "../queries";

export const ViewBeerLocations = () => {
	const { data, isLoading } = useBeerLocations();
	const [modalOpened, { open, close }] = useDisclosure(false);
	const [locationToEdit, setLocationToEdit] = useState<BeerLocation | undefined>(undefined);
	const mutation = useUpdateBeerLocation();

	if (isLoading) {
		return <Loader />
	}

	return (
		<AppShell.Main>
			<Title order={2} p="md">
				Platser
			</Title>
			<Divider />
			<Table.ScrollContainer minWidth={500}>
				<Table
					stickyHeader
					striped
					highlightOnHover
					tabularNums
					withColumnBorders
				>
					<Table.Thead>
						<Table.Tr>
							<Table.Th>Namn</Table.Th>
							<Table.Th>Latitude</Table.Th>
							<Table.Th>Longitude</Table.Th>
							<Table.Th>Ölmärke</Table.Th>
							<Table.Th>Pris</Table.Th>
							<Table.Th>cl</Table.Th>
							<Table.Th>Pris (AW)</Table.Th>
							<Table.Th>cl (AW)</Table.Th>
							<Table.Th>Pris (kanna)</Table.Th>
							<Table.Th>cl (kanna)</Table.Th>
							<Table.Th>Uteservering</Table.Th>
							<Table.Th>Eftermiddagssol</Table.Th>
							<Table.Th>Redigera</Table.Th>
						</Table.Tr>
					</Table.Thead>
					<Table.Tbody>
						{data?.map((location, index) => (
							<Table.Tr key={index}>
								<Table.Td>{location.name}</Table.Td>
								<Table.Td>{location.latitude}</Table.Td>
								<Table.Td>{location.longitude}</Table.Td>
								<Table.Td>{location.beerBrand}</Table.Td>
								<Table.Td>{location.price}</Table.Td>
								<Table.Td>{location.centilitersStandard}</Table.Td>
								<Table.Td>{location.priceAW ? location.priceAW : "-"}</Table.Td>
								<Table.Td>{location.centilitersStandard}</Table.Td>
								<Table.Td>{location.pricePitcher ? location.pricePitcher : "-"}</Table.Td>
								<Table.Td>{location.centilitersPitcher ? location.centilitersPitcher : "-"}</Table.Td>
								<Table.Td>{location.outdoorSeating ? "Ja" : "Nej"}</Table.Td>
								<Table.Td>{location.afternoonSun ? "Ja" : "Nej"}</Table.Td>
								<Table.Td>
									<ActionIcon
										onClick={() => {
											setLocationToEdit(location);
											open();
										}}
										p={0}
										variant="outline"
										size="sm"
										aria-label={`Redigera ${location.name}`}
									>
										<IconPencil />
									</ActionIcon>
								</Table.Td>
							</Table.Tr>
						))}
					</Table.Tbody>
				</Table>
			</Table.ScrollContainer>
			<Modal opened={modalOpened} onClose={close} title={`Redigera ${locationToEdit?.name ?? ""}`} size="auto">
				{locationToEdit &&
					<BeerLocationForm
						showClearButton={false}
						defaultValues={{
							...locationToEdit,
						}}
						onSubmit={async (data) => {
							mutation.mutate(data)
						}}
					/>
				}
			</Modal>
		</AppShell.Main>
	);
};
