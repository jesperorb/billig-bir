import { AppShell, Container, Group, Title } from "@mantine/core";

import { useBeerLocations, useDistricts } from "@common/api/queries";
import { BeerLocationTable } from "@common/components/beer-location-table/table";
import InformationActionsMobile from "@common/components/information-actions.mobile";
import Layout from "@common/components/layout";

const ViewBeerLocationsTable = () => {
	const { data, isLoading } = useBeerLocations();
	const { data: districts, isLoading: isLoadingDistricts } = useDistricts();

	return (
		<Layout collapseMenuOnDesktop>
			<AppShell.Main>
				<Container fluid>
					<Group justify="space-between" py="sm">
						<Title order={2}>Platser</Title>
					</Group>
					<BeerLocationTable
						data={data ?? undefined}
						districts={districts}
						isLoading={isLoading || isLoadingDistricts}
						filterPadding={0}
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
