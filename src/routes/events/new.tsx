import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/events/new')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/events/new"!</div>
}
