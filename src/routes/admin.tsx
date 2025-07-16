import { createFileRoute, redirect } from "@tanstack/react-router";

import Admin from "@feature/admin";

export const Route = createFileRoute("/admin")({
	component: Admin,
	beforeLoad: ({ context, location }) => {
		if (!context.session) {
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
