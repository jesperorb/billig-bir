import { createFileRoute } from '@tanstack/react-router'
import ViewDistricts from '@feature/admin/pages/view-districts'

export const Route = createFileRoute('/admin/view-districts')({
  component: ViewDistricts,
})
