import { createFileRoute, redirect } from '@tanstack/react-router'

import AdminPage from '@feature/admin'

export const Route = createFileRoute('/admin')({
	component: Admin,
	beforeLoad: ({ context, location }) => {
		if (!context.session) {
			throw redirect({
				to: '/login',
				search: {
					redirect: location.href,
				},
			})
		}
	},
})

function Admin() {
	return <AdminPage />
}
