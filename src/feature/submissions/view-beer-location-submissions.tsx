import { AppShell, Button, Group, Title } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconReload, IconEye } from "@tabler/icons-react";
import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";

import { BeerLocationTable } from "@common/components/beer-location-table";
import { BeerLocation } from "@common/types/beer-location";

import {
	useBeerLocationSubmissions,
	createBeerLocationSubmissionQueryKeys,
} from "./queries";
import { ViewBeerLocationSubmissionDialog } from "./view-beer-location-submission.dialog";

const ViewBeerLocationSubmissions = () => {
	const queryClient = useQueryClient();
	const { data, isLoading } = useBeerLocationSubmissions();
	const [modalOpened, { open, close }] = useDisclosure(false);
	const [submissionToView, setSubmissionToView] = useState<
		BeerLocation | undefined
	>(undefined);

	const handleViewClick = (submission: BeerLocation) => {
		setSubmissionToView(submission);
		open();
	};

	return (
		<AppShell.Main>
			<Group justify="space-between" p="sm">
				<Title order={2}>Platsförslag</Title>
				<Button
					loading={isLoading}
					rightSection={<IconReload />}
					onClick={() => {
						queryClient.invalidateQueries({
							queryKey:
								createBeerLocationSubmissionQueryKeys.getBeerLocationSubmissions,
						});
					}}
				>
					Ladda om
				</Button>
			</Group>
			<BeerLocationTable
				data={data ?? undefined}
				isLoading={isLoading}
				actionColumn={{
					header: "Visa",
					icon: <IconEye />,
					onClick: handleViewClick,
					ariaLabel: (submission) => `Visa ${submission.name}`,
				}}
			/>
			<ViewBeerLocationSubmissionDialog
				submission={submissionToView}
				open={modalOpened}
				onClose={close}
			/>
		</AppShell.Main>
	);
};

export default ViewBeerLocationSubmissions;
