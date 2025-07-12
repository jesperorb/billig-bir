import { createRootRouteWithContext, Outlet } from '@tanstack/react-router'
import { type Session } from '@supabase/supabase-js'

import AppWrapper from '@common/components/app-wrapper'
import Layout from '@common/components/layout'

interface RouterContext {
	session: Session | null
}

export const Route = createRootRouteWithContext<RouterContext>()({
	component: () => (
		<AppWrapper>
			<Layout>
				<Outlet />
			</Layout>
		</AppWrapper>
	),
})
