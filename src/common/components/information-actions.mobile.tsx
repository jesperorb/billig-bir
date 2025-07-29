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

interface Props {
	showAdministerButton?: boolean;
}

const InformationActionsMobile = ({ showAdministerButton = true }: Props) => {
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
				onClick={() => {
					beerSubmissionDialogActions.open();
				}}
			>
				Föreslå ny plats
			</Button>
			{showAdministerButton && (
				<NavButton fullWidth to="/admin" leftSection={<IconSettings />}>
					Administrera
				</NavButton>
			)}
			<Button
				fullWidth
				component="a"
				href="https://github.com/jesperorb/billig-bir"
				leftSection={<IconBrandGithub />}
				rightSection={<IconExternalLink />}
				onClick={close}
			>
				GitHub
			</Button>
		</Stack>
	);
};

export default InformationActionsMobile;
