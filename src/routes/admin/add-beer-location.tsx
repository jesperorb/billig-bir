import { createFileRoute, redirect } from '@tanstack/react-router'
import AddBeerLocation from '@feature/admin/pages/add-beer-location'

export const Route = createFileRoute('/admin/add-beer-location')({
	component: AddBeerLocation,
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
