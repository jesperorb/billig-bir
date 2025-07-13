import { AppShell, Button, Group, Title } from "@mantine/core";
import { beerLocationsBaseQueryKeys, useBeerLocations } from "@feature/map/queries";
import { IconPencil, IconReload } from "@tabler/icons-react";
import { useState } from "react";
import { BeerLocation } from "@common/types/beer-location";
import { useDisclosure } from "@mantine/hooks";
import { useQueryClient } from "@tanstack/react-query";
import { EditBeerLocationDialog } from "../components/edit-beer-location.dialog";
import { BeerLocationTable } from "@common/components/beer-location-table";

export const ViewBeerLocations = () => {
	const queryClient = useQueryClient();
	const { data, isLoading } = useBeerLocations();
	const [modalOpened, { open, close }] = useDisclosure(false);
	const [locationToEdit, setLocationToEdit] = useState<BeerLocation | undefined>(undefined);

	const handleEditClick = (location: BeerLocation) => {
		setLocationToEdit(location);
		open();
	};

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
					Ladda om
				</Button>
			</Group>
			<BeerLocationTable
				data={data || undefined}
				actionColumn={{
					header: 'Redigera',
					icon: <IconPencil />,
					onClick: handleEditClick,
					ariaLabel: (location) => `Redigera ${location.name}`,
				}}
			/>
			<EditBeerLocationDialog
				location={locationToEdit}
				isLoading={isLoading}
				open={modalOpened}
				onClose={close}
			/>
		</AppShell.Main>
	);
};
