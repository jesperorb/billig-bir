import { AppShell, Container, Group, Title } from "@mantine/core";

import { useBeerLocations } from "@common/api/queries";
import { BeerLocationTable } from "@common/components/beer-location-table";
import InformationActionsMobile from "@common/components/information-actions.mobile";
import Layout from "@common/components/layout";

const ViewBeerLocationsTable = () => {
	const { data } = useBeerLocations();

	return (
		<Layout collapseMenuOnDesktop>
			<AppShell.Main>
				<Container>
					<Group justify="space-between" p="sm">
						<Title order={2}>Platser</Title>
					</Group>
					<BeerLocationTable
						data={data ?? undefined}
						defaultSorting={{ id: "price", desc: false }}
					/>
				</Container>
			</AppShell.Main>
			<AppShell.Navbar>
				<Group hiddenFrom="sm" w="100%" px="md" pt="xl">
					<InformationActionsMobile />
				</Group>
			</AppShell.Navbar>
		</Layout>
	);
};

export default ViewBeerLocationsTable;
