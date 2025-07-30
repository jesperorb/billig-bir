import { Button, Stack, LoadingOverlay } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import {
	IconBeer,
	IconBrandGithub,
	IconExternalLink,
	IconSettings,
} from "@tabler/icons-react";
import { lazy, Suspense } from "react";

import { NavButton } from "./nav-button";

const BeerLocationSubmissionDialog = lazy(
	() => import("@feature/submissions/create-beer-location-submission.dialog"),
);

const InformationActionsMobile = () => {
	const [beerSubmissionDialogOpen, beerSubmissionDialogActions] =
		useDisclosure(false);

	return (
		<Stack gap="md" w="100%">
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
				fullWidth
				leftSection={<IconBeer size={16} />}
				variant="light"
				onClick={() => {
					beerSubmissionDialogActions.open();
				}}
			>
				Föreslå ny plats
			</Button>
			<Button
				fullWidth
				component="a"
				variant="light"
				href="https://github.com/jesperorb/billig-bir"
				leftSection={<IconBrandGithub />}
				rightSection={<IconExternalLink />}
				onClick={close}
			>
				GitHub
			</Button>
			<NavButton
				fullWidth
				to="/admin"
				variant="light"
				leftSection={<IconSettings />}
			>
				Administrera
			</NavButton>
		</Stack>
	);
};

export default InformationActionsMobile;
