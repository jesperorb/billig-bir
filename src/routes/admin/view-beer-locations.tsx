import { ViewBeerLocations } from '@feature/admin/pages/view-beer-locations'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/admin/view-beer-locations')({
  component: ViewBeerLocationsPage,
})

function ViewBeerLocationsPage() {
  return <ViewBeerLocations />
}
