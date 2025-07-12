import { createLink, type LinkComponent } from '@tanstack/react-router'
import { Anchor as MantineAnchor, type AnchorProps } from '@mantine/core'
import { forwardRef } from 'react'

interface MantineAnchorProps extends Omit<AnchorProps, 'href'> {
  // Add any additional props you want to pass to the anchor
}

const MantineLinkComponent = forwardRef<
  HTMLAnchorElement,
  MantineAnchorProps
>((props, ref) => {
  return <MantineAnchor ref={ref} {...props} />
})

const CreatedLinkComponent = createLink(MantineLinkComponent)

export const Anchor: LinkComponent<typeof MantineLinkComponent> = (
  props,
) => {
  return <CreatedLinkComponent preload="intent" {...props} />
}
