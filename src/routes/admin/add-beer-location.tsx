import { AddBeerLocation } from '@feature/admin/pages/add-beer-location'
import { createFileRoute, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/admin/add-beer-location')({
	component: AddBeerLocationPage,
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

function AddBeerLocationPage() {
	return <AddBeerLocation />
}
