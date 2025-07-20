import { createFileRoute } from "@tanstack/react-router";

import ApiClientWrapper from "@common/api/api-client-wrapper";
import Login from "@feature/auth";

export const Route = createFileRoute("/login")({
	component: () => (
		<ApiClientWrapper>
			<Login />
		</ApiClientWrapper>
	),
});
