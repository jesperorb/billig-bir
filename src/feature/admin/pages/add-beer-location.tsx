import {
	AppShell,
	Container,
	Title,
} from '@mantine/core';
import { BeerLocationForm } from '../beer-location.form';
import { useCreateBeerLocation } from '../queries';

export const AddBeerLocation = () => {
	const mutation = useCreateBeerLocation();
	return (
		<AppShell.Main>
			<Container pt="md">
				<Title order={2} mb="lg">Lägg till plats</Title>
				<BeerLocationForm
					onSubmit={async (data) => {
						mutation.mutate(data)
					}}
				/>
			</Container>
		</AppShell.Main>
	);
};
