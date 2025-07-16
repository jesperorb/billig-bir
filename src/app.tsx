import { RouterProvider, createRouter } from "@tanstack/react-router";

import ApiClientWrapper from "@common/api/api-client-wrapper";
import { useSession } from "@common/api/use-session";

import { routeTree } from "./routeTree.gen";

const router = createRouter({
	routeTree,
	context: {
		session: null,
	},
});

declare module "@tanstack/react-router" {
	interface Register {
		router: typeof router;
	}
}

const AppWithAuth = () => {
	const session = useSession();
	return <RouterProvider router={router} context={{ session }} />;
};

const App = () => {
	return (
		<ApiClientWrapper>
			<AppWithAuth />
		</ApiClientWrapper>
	);
};

export default App;
