import {
	Modal,
	ActionIcon,
	Button,
	Stack,
	LoadingOverlay,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import {
	IconBeer,
	IconBrandGithub,
	IconExternalLink,
	IconQuestionMark,
	IconSettings,
} from "@tabler/icons-react";
import { useNavigate } from "@tanstack/react-router";
import { lazy, Suspense } from "react";

const BeerLocationSubmissionDialog = lazy(
	() => import("@feature/submissions/create-beer-location-submission.dialog"),
);

const InformationDialog = () => {
	const [modalOpened, { open, close }] = useDisclosure(false);
	const [beerSubmissionDialogOpen, beerSubmissionDialogActions] =
		useDisclosure(false);
	const navigate = useNavigate();

	return (
		<>
			<ActionIcon
				variant="filled"
				size="xl"
				aria-label="Information"
				onClick={open}
			>
				<IconQuestionMark />
			</ActionIcon>
			<Modal opened={modalOpened} onClose={close} title="Information">
				<Stack gap="md">
					<Suspense
						fallback={
							<LoadingOverlay
								visible
								zIndex={1000}
								overlayProps={{ radius: "sm", blur: 2 }}
							/>
						}
					>
						{beerSubmissionDialogOpen && (
							<BeerLocationSubmissionDialog
								onClose={beerSubmissionDialogActions.close}
							/>
						)}
					</Suspense>
					<Button
						leftSection={<IconBeer size={16} />}
						onClick={() => {
							beerSubmissionDialogActions.open();
						}}
					>
						Föreslå ny plats
					</Button>
					<Button
						onClick={() => {
							navigate({ to: "/admin/view-beer-locations" });
							close();
						}}
						leftSection={<IconSettings />}
					>
						Administrera
					</Button>
					<Button
						component="a"
						href="https://github.com/jesperorb/billig-bir"
						leftSection={<IconBrandGithub />}
						rightSection={<IconExternalLink />}
						onClick={close}
					>
						GitHub
					</Button>
				</Stack>
			</Modal>
		</>
	);
};

export default InformationDialog;
