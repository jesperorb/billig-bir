import { createFileRoute } from "@tanstack/react-router";

import ApiClientWrapper from "@common/api/api-client-wrapper";
import Layout from "@common/components/layout";
import Login from "@feature/auth";

export const Route = createFileRoute("/login")({
	component: () => (
		<ApiClientWrapper>
			<Layout>
				<Login />
			</Layout>
		</ApiClientWrapper>
	),
});
