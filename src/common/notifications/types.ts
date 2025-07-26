export type NotificationType = "success" | "error";

export interface NotificationState {
	type: NotificationType;
	title: string;
	message: string;
}
