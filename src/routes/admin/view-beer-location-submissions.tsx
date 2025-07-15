import { createFileRoute } from '@tanstack/react-router'
import ViewBeerLocationSubmissions from '@feature/submissions/view-beer-location-submissions'

export const Route = createFileRoute('/admin/view-beer-location-submissions')({
  component: ViewBeerLocationSubmissions,
})
