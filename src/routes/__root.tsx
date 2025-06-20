import { createRootRoute, Outlet } from '@tanstack/react-router'

import AppWrapper from '@common/components/app-wrapper'
import Layout from '@common/components/Layout'

export const Route = createRootRoute({
  component: () => (
    <AppWrapper>
      <Layout>
      	<Outlet />
			</Layout>
    </AppWrapper>
  ),
})
