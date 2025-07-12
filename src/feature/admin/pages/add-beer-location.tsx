import {
	AppShell,
	Container,
	Title,
	Notification,
} from '@mantine/core';
import { BeerLocationForm } from '../components/beer-location.form';
import { useCreateBeerLocation } from '../queries';
import { useQueryClient } from '@tanstack/react-query';
import { beerLocationsBaseQueryKeys } from '@feature/map/queries';
import { BeerLocationFormData } from '../types';
import { useState } from 'react';
import { IconCheck } from '@tabler/icons-react';

type NotificationType = "success" | "error";

export const AddBeerLocation = () => {
	const mutation = useCreateBeerLocation();
	const queryClient = useQueryClient();
	const [showNotification, setShowNotification] = useState<NotificationType | undefined>(undefined);

	const invalidateBeerLocations = () => {
		queryClient.invalidateQueries({
			queryKey: [beerLocationsBaseQueryKeys.get]
		})
	}

	const onSubmit = async (data: BeerLocationFormData) => {
		try {
			await mutation.mutateAsync(data);
			invalidateBeerLocations();
			setShowNotification("success");
		} catch (e) {
			console.error(e);
			setShowNotification("error");
		}
		setTimeout(() => {
			setShowNotification(undefined);
		}, 2000)
	}

	return (
		<AppShell.Main>
			<Container pt="md">
				{showNotification && (
					<Notification
						title="Plats skapad"
						color={showNotification === "error" ? "red" : "green"}
						styles={{
							root: {
								position: "fixed",
								top: "2rem",
								right: "2rem",
								zIndex: 9999999,
							}
						}}
						withBorder
						withCloseButton
						onClose={() => setShowNotification(undefined)}
						icon={<IconCheck />}
					>
						Gå till "Platser" för att se den eller skapa en till plats
					</Notification>
				)}
				<Title order={2} mb="lg">Lägg till plats</Title>
				<BeerLocationForm
					onSubmit={onSubmit}
					loading={false}
				/>
			</Container>
		</AppShell.Main>
	);
};
