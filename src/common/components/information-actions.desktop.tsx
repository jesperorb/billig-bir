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
import { lazy, Suspense } from "react";

import { NavButton } from "./nav-button";

const BeerLocationSubmissionDialog = lazy(
	() => import("@feature/submissions/create-beer-location-submission.dialog"),
);

const InformationActionsDesktop = () => {
	const [modalOpened, { open, close }] = useDisclosure(false);
	const [beerSubmissionDialogOpen, beerSubmissionDialogActions] =
		useDisclosure(false);

	return (
		<>
			<ActionIcon variant="light" size="xl" aria-label="Mer" onClick={open}>
				<IconQuestionMark />
			</ActionIcon>
			<Modal opened={modalOpened} onClose={close} title="Mer">
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
						component="a"
						variant="light"
						href="https://github.com/jesperorb/billig-bir"
						leftSection={<IconBrandGithub />}
						rightSection={<IconExternalLink />}
						onClick={close}
					>
						GitHub
					</Button>
					<NavButton variant="light" to="/admin" leftSection={<IconSettings />}>
						Administrera
					</NavButton>
				</Stack>
			</Modal>
		</>
	);
};

export default InformationActionsDesktop;
