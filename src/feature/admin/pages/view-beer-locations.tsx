import { AppShell } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconEye } from "@tabler/icons-react";
import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";

import {
	commonBaseQueryKeys,
	useBeerLocations,
	useDistricts,
} from "@common/api/queries";
import { BeerLocationTable } from "@common/components/beer-location-table/table";
import { TableWrapper } from "@common/components/table/table-wrapper";
import { BeerLocation } from "@common/types/beer-location";

import CreateBeerLocationDialog from "../components/create-beer-location.dialog";
import { EditBeerLocationDialog } from "../components/edit-beer-location.dialog";
import { PageHeader } from "../components/page-header";

const ViewBeerLocations = () => {
	const queryClient = useQueryClient();
	const { data, isLoading } = useBeerLocations();
	const { data: districts, isLoading: isLoadingDistricts } = useDistricts();
	const [editModalOpen, editModalActions] = useDisclosure(false);
	const [createModalOpen, createModalActions] = useDisclosure(false);
	const [locationToEdit, setLocationToEdit] = useState<
		BeerLocation | undefined
	>(undefined);

	const handleEditClick = (location: BeerLocation) => {
		setLocationToEdit(location);
		editModalActions.open();
	};

	const invalidate = () => {
		queryClient.invalidateQueries({
			queryKey: [commonBaseQueryKeys.getBeerLocations],
		});
	};

	return (
		<AppShell.Main>
			<TableWrapper
				header={
					<PageHeader
						title="Platser"
						onAdd={createModalActions.open}
						onReload={invalidate}
					/>
				}
			>
				<BeerLocationTable
					data={data ?? undefined}
					districts={districts}
					isLoading={isLoading}
					actionColumn={{
						header: "Visa",
						icon: <IconEye />,
						onClick: handleEditClick,
						ariaLabel: (location) => `Redigera ${location.name}`,
					}}
				/>
			</TableWrapper>
			<CreateBeerLocationDialog
				open={createModalOpen}
				onClose={createModalActions.open}
			/>
			<EditBeerLocationDialog
				isLoading={isLoading || isLoadingDistricts}
				location={locationToEdit}
				open={editModalOpen}
				onClose={editModalActions.close}
			/>
		</AppShell.Main>
	);
};

export default ViewBeerLocations;
