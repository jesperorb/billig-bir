import { AppShell, Button, Group, Title } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconPencil, IconReload } from "@tabler/icons-react";
import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";

import { commonBaseQueryKeys, useBeerLocations } from "@common/api/queries";
import { BeerLocationTable } from "@common/components/beer-location-table";
import { BeerLocation } from "@common/types/beer-location";

import { EditBeerLocationDialog } from "../components/edit-beer-location.dialog";

const ViewBeerLocations = () => {
	const queryClient = useQueryClient();
	const { data, isLoading } = useBeerLocations();
	const [modalOpened, { open, close }] = useDisclosure(false);
	const [locationToEdit, setLocationToEdit] = useState<
		BeerLocation | undefined
	>(undefined);

	const handleEditClick = (location: BeerLocation) => {
		setLocationToEdit(location);
		open();
	};

	return (
		<AppShell.Main>
			<Group justify="space-between" p="sm">
				<Title order={2}>Platser</Title>
				<Button
					loading={isLoading}
					rightSection={<IconReload />}
					onClick={() => {
						queryClient.invalidateQueries({
							queryKey: [commonBaseQueryKeys.getBeerLocations],
						});
					}}
				>
					Ladda om
				</Button>
			</Group>
			<BeerLocationTable
				data={data ?? undefined}
				actionColumn={{
					header: "Redigera",
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

export default ViewBeerLocations;
