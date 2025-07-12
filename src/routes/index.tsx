import Map from '@feature/map'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
  component: Index,
})

function Index() {
  return <Map toggleMenu={() => {}} />
}
