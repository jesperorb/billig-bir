import { Center, Container, Space, Stack, Text, Title } from "@mantine/core";
import { IconMap, IconTable } from "@tabler/icons-react";

import { NavButton } from "@common/components/nav-button";

const Landing = () => {
	return (
		<Container h="100vh">
			<Center h="100%">
				<Stack ta="center">
					<Title order={1}>billig.beer</Title>
					<Text size="xl">Hitta billigaste ölen i Stockholm</Text>
					<Space h="sm" />
					<NavButton to="/map" size="xl" rightSection={<IconMap />}>
						Visa karta
					</NavButton>
					<NavButton
						to="/table"
						size="xl"
						variant="outline"
						rightSection={<IconTable />}
					>
						Visa tabell
					</NavButton>
				</Stack>
			</Center>
		</Container>
	);
};

export default Landing;
