import { createFileRoute } from '@tanstack/react-router'
import ViewBeerLocations from '@feature/admin/pages/view-beer-locations'

export const Route = createFileRoute('/admin/view-beer-locations')({
	component: ViewBeerLocations,
})
