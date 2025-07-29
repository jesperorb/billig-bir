import { AppShell } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconEye } from "@tabler/icons-react";
import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";

import { useDistricts } from "@common/api/queries";
import { BeerLocationTable } from "@common/components/beer-location-table/table";
import { BeerLocation } from "@common/types/beer-location";
import {
	useBeerLocationSubmissions,
	createBeerLocationSubmissionQueryKeys,
} from "@feature//submissions/queries";
import CreateBeerLocationSubmissionDialog from "@feature/submissions/create-beer-location-submission.dialog";
import { ViewBeerLocationSubmissionDialog } from "@feature/submissions/view-beer-location-submission.dialog";

import { PageHeader } from "../components/page-header";

const ViewBeerLocationSubmissions = () => {
	const queryClient = useQueryClient();
	const { data, isLoading } = useBeerLocationSubmissions();
	const { data: districts, isLoading: isLoadingDistricts } = useDistricts();
	const [editModalOpen, editModalActions] = useDisclosure(false);
	const [createModalOpen, createModalActions] = useDisclosure(false);

	const [submissionToView, setSubmissionToView] = useState<
		BeerLocation | undefined
	>(undefined);

	const handleViewClick = (submission: BeerLocation) => {
		setSubmissionToView(submission);
		editModalActions.open();
	};

	const invalidate = async () => {
		await queryClient.invalidateQueries({
			queryKey:
				createBeerLocationSubmissionQueryKeys.getBeerLocationSubmissions,
		});
	};

	return (
		<AppShell.Main>
			<PageHeader
				title="Platsförslag"
				onReload={invalidate}
				onAdd={createModalActions.open}
				isLoading={isLoading || isLoadingDistricts}
			/>
			<BeerLocationTable
				data={data ?? undefined}
				isLoading={isLoading || isLoadingDistricts}
				districts={districts}
				actionColumn={{
					header: "Visa",
					icon: <IconEye />,
					onClick: handleViewClick,
					ariaLabel: (submission) => `Visa ${submission.name}`,
				}}
			/>
			<ViewBeerLocationSubmissionDialog
				submission={submissionToView}
				open={editModalOpen}
				onClose={close}
			/>
			<CreateBeerLocationSubmissionDialog
				onClose={createModalActions.close}
				open={createModalOpen}
			/>
		</AppShell.Main>
	);
};

export default ViewBeerLocationSubmissions;
