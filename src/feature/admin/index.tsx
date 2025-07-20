import { LoadingOverlay } from "@mantine/core";
import { Outlet, useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";

import ApiClientWrapper from "@common/api/api-client-wrapper";
import { useSession } from "@common/api/use-session";
import Layout from "@common/components/layout";

import { AdminNavigation } from "./navigation";

const AdminPage = () => {
	const session = useSession();
	const navigate = useNavigate();
	useEffect(() => {
		if (!session.data && !session.isLoading) {
			navigate({ to: "/login" });
		}
	}, [navigate, session]);
	if (session.isLoading || !session.data) {
		return (
			<LoadingOverlay
				visible
				zIndex={1000}
				overlayProps={{ radius: "sm", blur: 2 }}
			/>
		);
	}
	return (
		<ApiClientWrapper>
			<Layout>
				<AdminNavigation />
				<Outlet />
			</Layout>
		</ApiClientWrapper>
	);
};

export default AdminPage;
