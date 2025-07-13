/**
 * Utility functions for type-safe localStorage operations
 */

/**
 * Safely gets a value from localStorage and parses it as JSON
 * @param key - The localStorage key
 * @param defaultValue - Default value to return if key doesn't exist or parsing fails
 * @returns The parsed value or default value
 */
export function getFromLocalStorage<T>(key: string, defaultValue: T): T {
	try {
		const item = localStorage.getItem(key);
		if (item === null) {
			return defaultValue;
		}
		return JSON.parse(item) as T;
	} catch (error) {
		console.warn(`Failed to parse localStorage item "${key}":`, error);
		return defaultValue;
	}
}

/**
 * Safely sets a value in localStorage as JSON
 * @param key - The localStorage key
 * @param value - The value to store
 */
export function setToLocalStorage<T>(key: string, value: T): void {
	try {
		localStorage.setItem(key, JSON.stringify(value));
	} catch (error) {
		console.warn(`Failed to save to localStorage key "${key}":`, error);
	}
}

/**
 * Creates a localStorage hook for a specific key with type safety
 * @param key - The localStorage key
 * @param defaultValue - Default value to use
 * @returns Object with get and set functions
 */
export function createLocalStorageManager<T>(key: string, defaultValue: T) {
	return {
		get: () => getFromLocalStorage(key, defaultValue),
		set: (value: T) => setToLocalStorage(key, value),
	};
}
