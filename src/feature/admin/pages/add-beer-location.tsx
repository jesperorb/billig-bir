import {
	AppShell,
	Container,
	Title,
} from '@mantine/core';
import { LocationForm } from '../beer-location.form';

export const AddBeerLocation = () => {
	return (
		<AppShell.Main>
			<Container pt="md">
				<Title order={2} mb="lg">Lägg till plats</Title>
				<LocationForm />

			</Container>
		</AppShell.Main>
	);
};
