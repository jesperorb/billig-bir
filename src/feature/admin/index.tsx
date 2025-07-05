import { AppShell, Container, Space } from "@mantine/core";
import { AddLocation } from "./add-location";

const AdminPage = () => {
	return (
		<>
			<AppShell.Navbar>
				
			</AppShell.Navbar>
			<AppShell.Main>
				<Container>
					<Space h="xl" />
					<AddLocation />
				</Container>
			</AppShell.Main>
		</>
	)
}

export default AdminPage;
