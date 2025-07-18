import { createFileRoute, redirect } from "@tanstack/react-router";

import ApiClientWrapper from "@common/api/api-client-wrapper";
import Login from "@feature/auth";

export const Route = createFileRoute("/login")({
	component: () => (
		<ApiClientWrapper>
			<Login />
		</ApiClientWrapper>
	),
	beforeLoad: async ({ location }) => {
		const { getSupabaseClient } = await import("@common/api/api-client");
		const session = (await getSupabaseClient().auth.getSession()).data.session;
		if (!session) {
			// eslint-disable-next-line @typescript-eslint/only-throw-error
			throw redirect({
				to: "/login",
				search: {
					redirect: location.href,
				},
			});
		}
	},
});
