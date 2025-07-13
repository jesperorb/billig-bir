import { createContext, useContext } from "react";

export const IsMenuOpenContext = createContext<boolean>(
	false
);

export const ToggleIsMenuOpenContext = createContext<() => void>(
	() => {
		// noop
	}
);


export const useIsMenuOpen = () => useContext(IsMenuOpenContext);
export const useToggleIsMenuOpen = () => useContext(ToggleIsMenuOpenContext);
