import { RouterProvider, createRouter } from '@tanstack/react-router'

import { routeTree } from './routeTree.gen'
import ApiClientWrapper from '@common/api/api-client-wrapper'

import { useSession } from '@feature/auth/use-session'

const router = createRouter({
	routeTree, context: {
		session: null
	}
})

declare module '@tanstack/react-router' {
	interface Register {
		router: typeof router
	}
}

const AppWithAuth = () => {
	const session = useSession();
	return <RouterProvider router={router} context={{ session }} />
}

const App = () => {
	return (
		<ApiClientWrapper>
			<AppWithAuth />
		</ApiClientWrapper>
	);
};

export default App;
