import { createContext } from "react";

import { NotificationType } from "./types";

export type NotificationContextValue = (
	type: NotificationType,
	title: string,
	message: string,
	duration?: number,
) => void;

export const NotificationContext = createContext<
	NotificationContextValue | undefined
>(undefined);
