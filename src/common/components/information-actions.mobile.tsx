import { Button, Stack, LoadingOverlay } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import {
	IconBeer,
	IconBrandGithub,
	IconExternalLink,
	IconSettings,
} from "@tabler/icons-react";
import { useNavigate } from "@tanstack/react-router";
import { lazy, Suspense } from "react";

const BeerLocationSubmissionDialog = lazy(
	() => import("@feature/submissions/create-beer-location-submission.dialog"),
);

const InformationActionsMobile = () => {
	const [beerSubmissionDialogOpen, beerSubmissionDialogActions] =
		useDisclosure(false);
	const navigate = useNavigate();

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
			<Button
				fullWidth
				onClick={() => {
					navigate({ to: "/admin/view-beer-locations" });
					close();
				}}
				leftSection={<IconSettings />}
			>
				Administrera
			</Button>
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
