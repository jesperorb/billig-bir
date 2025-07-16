import { AppShell, Container, Title, Notification } from "@mantine/core";
import { IconCheck } from "@tabler/icons-react";
import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";

import { commonBaseQueryKeys, useDistricts } from "@common/api/queries";
import { BeerLocationForm } from "@common/components/beer-location.form";
import { BeerLocationFormData } from "@common/types/beer-location-form-data";

import { useCreateBeerLocation } from "../queries";

type NotificationType = "success" | "error";

const AddBeerLocation = () => {
	const mutation = useCreateBeerLocation();
	const queryClient = useQueryClient();
	const { data: districts } = useDistricts();
	const [showNotification, setShowNotification] = useState<
		NotificationType | undefined
	>(undefined);

	const invalidateBeerLocations = () => {
		queryClient.invalidateQueries({
			queryKey: [commonBaseQueryKeys.getBeerLocations],
		});
	};

	const onSubmit = async (data: BeerLocationFormData) => {
		try {
			await mutation.mutateAsync(data);
			invalidateBeerLocations();
			setShowNotification("success");
		} catch (e) {
			console.error(e);
			setShowNotification("error");
		}
		setTimeout(() => {
			setShowNotification(undefined);
		}, 2000);
	};

	return (
		<AppShell.Main>
			<Container pt="md">
				{showNotification && (
					<Notification
						title="Plats skapad"
						color={showNotification === "error" ? "red" : "green"}
						styles={{
							root: {
								position: "fixed",
								top: "2rem",
								right: "2rem",
								zIndex: 9999999,
							},
						}}
						withBorder
						withCloseButton
						onClose={() => {
							setShowNotification(undefined);
						}}
						icon={<IconCheck />}
					>
						Gå till "Platser" för att se den eller skapa en till plats
					</Notification>
				)}
				<Title order={2} mb="lg">
					Lägg till plats
				</Title>
				<BeerLocationForm
					onSubmit={onSubmit}
					loading={false}
					districts={districts ?? undefined}
				/>
			</Container>
		</AppShell.Main>
	);
};

export default AddBeerLocation;
