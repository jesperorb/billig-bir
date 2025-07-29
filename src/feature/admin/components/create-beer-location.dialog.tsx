import { Drawer } from "@mantine/core";
import { useQueryClient } from "@tanstack/react-query";

import { commonBaseQueryKeys, useDistricts } from "@common/api/queries";
import { BeerLocationForm } from "@common/components/beer-location.form";
import { useNotification } from "@common/notifications/use-notification";
import { BeerLocationFormData } from "@common/types/beer-location-form-data";

import { useCreateBeerLocation } from "../queries";

interface Props {
	open: boolean;
	onClose: () => void;
}

const CreateBeerLocationDialog = ({ open, onClose }: Props) => {
	const mutation = useCreateBeerLocation();
	const queryClient = useQueryClient();
	const { data: districts } = useDistricts();
	const showNotification = useNotification();

	const invalidateBeerLocations = () => {
		queryClient.invalidateQueries({
			queryKey: [commonBaseQueryKeys.getBeerLocations],
		});
	};

	const onSubmit = async (data: BeerLocationFormData) => {
		try {
			await mutation.mutateAsync(data);
			invalidateBeerLocations();
			showNotification(
				"success",
				"Plats skapad",
				'Gå till "Platser" för att se den eller skapa en till plats',
			);
		} catch (e) {
			console.error(e);
			showNotification(
				"error",
				"Något gick fel",
				"Försök igen eller kontakta en katt om problemet kvarstår",
			);
		}
	};

	return (
		<Drawer opened={open} onClose={onClose} title="Lägg till plats" size="xl">
			<BeerLocationForm
				onSubmit={onSubmit}
				loading={mutation.isPending}
				districts={districts ?? undefined}
			/>
		</Drawer>
	);
};

export default CreateBeerLocationDialog;
