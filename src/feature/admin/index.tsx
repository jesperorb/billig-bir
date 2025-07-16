import { Outlet } from "@tanstack/react-router";

import { AdminNavigation } from "./navigation";

const AdminPage = () => {
	return (
		<>
			<AdminNavigation />
			<Outlet />
		</>
	);
};

export default AdminPage;
