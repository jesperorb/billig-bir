import { createLink, type LinkComponent } from '@tanstack/react-router'
import { NavLink as MantineNavLink, type NavLinkProps } from '@mantine/core'
import { forwardRef } from 'react'

interface MantineAnchorProps extends Omit<NavLinkProps, 'href'> {
	// Add any additional props you want to pass to the anchor
}

const MantineNavLinkComponent = forwardRef<
	HTMLAnchorElement,
	MantineAnchorProps
>((props, ref) => {
	return <MantineNavLink ref={ref} {...props} />
})

const CreatedLinkComponent = createLink(MantineNavLinkComponent)

export const NavLink: LinkComponent<typeof MantineNavLinkComponent> = (
	props,
) => {
	return <CreatedLinkComponent preload="intent" {...props} />
}
