import { ActionIcon, AppShell, Button, Divider, Group, Table, ThemeIcon, Title } from "@mantine/core";
import { beerLocationsBaseQueryKeys, useBeerLocations } from "@feature/map/queries";
import { IconCheck, IconPencil, IconReload, IconX } from "@tabler/icons-react";
import { useState } from "react";
import { BeerLocation } from "@common/types/beerLocation";
import { useDisclosure } from "@mantine/hooks";
import { useQueryClient } from "@tanstack/react-query";
import { EditBeerLocationDialog } from "../components/edit-beer-location.dialog";

export const ViewBeerLocations = () => {
	const queryClient = useQueryClient();
	const { data, isLoading } = useBeerLocations();
	const [modalOpened, { open, close }] = useDisclosure(false);
	const [locationToEdit, setLocationToEdit] = useState<BeerLocation | undefined>(undefined);

	return (
		<AppShell.Main>
			<Group justify="space-between" p="sm">
				<Title order={2} p="md">
					Platser
				</Title>
				<Button
					loading={isLoading}
					rightSection={<IconReload />}
					onClick={() => {
						queryClient.invalidateQueries({
							queryKey: [beerLocationsBaseQueryKeys.get]
						})
					}}
				>
					Reload
				</Button>
			</Group>
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
							<Table.Th>Ölmärke</Table.Th>
							<Table.Th>Pris</Table.Th>
							<Table.Th>cl</Table.Th>
							<Table.Th>Pris (AW)</Table.Th>
							<Table.Th>cl (AW)</Table.Th>
							<Table.Th>Pris (kanna)</Table.Th>
							<Table.Th>cl (kanna)</Table.Th>
							<Table.Th>Uteservering</Table.Th>
							<Table.Th>Eftermiddagssol</Table.Th>
							<Table.Th>AW-tider</Table.Th>
							<Table.Th>Latitude</Table.Th>
							<Table.Th>Longitude</Table.Th>
							<Table.Th>Redigera</Table.Th>
						</Table.Tr>
					</Table.Thead>
					<Table.Tbody>
						{data?.map((location, index) => (
							<Table.Tr key={index}>
								<Table.Td>{location.name}</Table.Td>
								<Table.Td>{location.beerBrand}</Table.Td>
								<Table.Td>{location.price}</Table.Td>
								<Table.Td>{location.centilitersStandard}</Table.Td>
								<Table.Td>{location.priceAW ? location.priceAW : "-"}</Table.Td>
								<Table.Td>{location.centilitersStandard}</Table.Td>
								<Table.Td>{location.pricePitcher ? location.pricePitcher : "-"}</Table.Td>
								<Table.Td>{location.centilitersPitcher ? location.centilitersPitcher : "-"}</Table.Td>
								<Table.Td>
									{location.outdoorSeating
										? <ThemeIcon size="xs"><IconCheck /></ThemeIcon>
										: <ThemeIcon color="red" size="xs"><IconX /></ThemeIcon>
									}
								</Table.Td>
								<Table.Td>{
									location.afternoonSun
									? <ThemeIcon size="xs"><IconCheck /></ThemeIcon>
									: <ThemeIcon color="red" size="xs"><IconX /></ThemeIcon>
								}
								</Table.Td>
								<Table.Td>{
									location.awTimes?.length
									?<ThemeIcon size="xs"><IconCheck /></ThemeIcon>
									: <ThemeIcon color="red" size="xs"><IconX /></ThemeIcon>
								}
								</Table.Td>
								<Table.Td>{location.latitude}</Table.Td>
								<Table.Td>{location.longitude}</Table.Td>
								<Table.Td>
									<ActionIcon
										onClick={() => {
											setLocationToEdit(location);
											open();
										}}
										p={0}
										variant="subtle"
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
			<EditBeerLocationDialog
				location={locationToEdit}
				isLoading={isLoading}
				open={modalOpened}
				onClose={close}
			/>
		</AppShell.Main>
	);
};
