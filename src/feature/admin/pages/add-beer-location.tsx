import { AppShell, Container, Title } from "@mantine/core";
import { useQueryClient } from "@tanstack/react-query";

import { commonBaseQueryKeys, useDistricts } from "@common/api/queries";
import { BeerLocationForm } from "@common/components/beer-location.form";
import { useNotification } from "@common/notifications/use-notification";
import { BeerLocationFormData } from "@common/types/beer-location-form-data";

import { useCreateBeerLocation } from "../queries";

const AddBeerLocation = () => {
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
		<AppShell.Main>
			<Container pt="md">
				<Title order={2} mb="lg">
					Lägg till plats
				</Title>
				<BeerLocationForm
					onSubmit={onSubmit}
					loading={mutation.isPending}
					districts={districts ?? undefined}
				/>
			</Container>
		</AppShell.Main>
	);
};

export default AddBeerLocation;
