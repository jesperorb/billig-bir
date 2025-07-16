import { createContext, use } from "react";

export const IsMenuOpenContext = createContext<boolean>(false);

export const ToggleIsMenuOpenContext = createContext<() => void>(() => {
	// noop
});

export const useIsMenuOpen = () => use(IsMenuOpenContext);
export const useToggleIsMenuOpen = () => use(ToggleIsMenuOpenContext);
