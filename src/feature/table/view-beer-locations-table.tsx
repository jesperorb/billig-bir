import { AppShell, Container, Group, Title } from "@mantine/core";

import { useBeerLocations, useDistricts } from "@common/api/queries";
import { BeerLocationTable } from "@common/components/beer-location-table/table";
import InformationActionsMobile from "@common/components/information-actions.mobile";
import Layout from "@common/components/layout";
import { TableWrapper } from "@common/components/table/table-wrapper";

const ViewBeerLocationsTable = () => {
	const { data, isLoading } = useBeerLocations();
	const { data: districts, isLoading: isLoadingDistricts } = useDistricts();

	return (
		<Layout collapseMenuOnDesktop>
			<AppShell.Main>
				<Container fluid>
					<TableWrapper header={<Title order={2}>Platser</Title>}>
						<BeerLocationTable
							data={data ?? undefined}
							districts={districts}
							isLoading={isLoading || isLoadingDistricts}
							filterPadding={0}
						/>
					</TableWrapper>
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
