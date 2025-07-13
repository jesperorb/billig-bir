import { ViewBeerLocationSubmissions } from '@feature/submissions/view-beer-location-submissions'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/admin/view-beer-location-submissions')({
  component: ViewBeerLocationSubmissionsPage,
})

function ViewBeerLocationSubmissionsPage() {
  return <ViewBeerLocationSubmissions />
}
