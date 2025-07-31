import { AppShell, Box, Group, Title } from "@mantine/core";

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
				<TableWrapper
					header={
						<Box px="lg">
							<Title order={2}>Platser</Title>
						</Box>
					}
				>
					<BeerLocationTable
						data={data ?? undefined}
						districts={districts}
						isLoading={isLoading || isLoadingDistricts}
					/>
				</TableWrapper>
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
