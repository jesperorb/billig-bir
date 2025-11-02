import { createIsomorphicFn } from "@tanstack/react-start";

import { getFromLocalStorage, setToLocalStorage } from "./local-storage";

export const getFromLocalStorageClient =
	createIsomorphicFn().client(getFromLocalStorage);

export const setToLocalStorageClient =
	createIsomorphicFn().client(setToLocalStorage);

export const createLocalStorageManagerClient = <T>(
	key: string,
	defaultValue: T,
) => {
	return createIsomorphicFn()
		.client(() => {
			return {
				get: (): T => getFromLocalStorageClient(key, defaultValue) as T,
				set: (value: T) => {
					setToLocalStorageClient(key, value);
				},
			};
		})
		.server(() => {
			return {
				get: (): T => defaultValue,
				set: (value: T) => {
					console.log(value);
				},
			};
		})();
};
