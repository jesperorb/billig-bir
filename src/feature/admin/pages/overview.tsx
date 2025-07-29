import { AppShell, Stack } from "@mantine/core";
import { IconBeer, IconBulb, IconBuildings } from "@tabler/icons-react";

import { NavButton } from "@common/components/nav-button";

const AdminOverview = () => {
	return (
		<AppShell.Main>
			<Stack gap="md" mt="xl" p="sm">
				<NavButton
					fullWidth
					to="/admin/view-beer-locations"
					leftSection={<IconBeer />}
				>
					Platser
				</NavButton>
				<NavButton
					fullWidth
					to="/admin/view-beer-location-submissions"
					leftSection={<IconBulb />}
				>
					Platsförslag
				</NavButton>
				<NavButton
					fullWidth
					to="/admin/view-districts"
					leftSection={<IconBuildings />}
				>
					Stadsdelar
				</NavButton>
			</Stack>
		</AppShell.Main>
	);
};

export default AdminOverview;
