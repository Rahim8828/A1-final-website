import { useState, useEffect } from 'react';

export function useLocalStorage<T>(key: string, initialValue: T) {
  // Get from local storage then parse stored json or return initialValue
  const [storedValue, setStoredValue] = useState<T>(() => {
    if (typeof window === 'undefined') {
      return initialValue;
    }
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      // Clear corrupted data silently
      try {
        window.localStorage.removeItem(key);
      } catch (clearError) {
        // Failed to clear, continue silently
      }
      return initialValue;
    }
  });

  // Return a wrapped version of useState's setter function that persists the new value to localStorage
  const setValue = (value: T | ((val: T) => T)) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      
      if (typeof window !== 'undefined') {
        try {
          window.localStorage.setItem(key, JSON.stringify(valueToStore));
        } catch (storageError: any) {
          // Handle quota exceeded error
          if (storageError.name === 'QuotaExceededError' || storageError.code === 22) {
            // Try to clear some space
            try {
              window.localStorage.clear();
              window.localStorage.setItem(key, JSON.stringify(valueToStore));
            } catch (retryError) {
              // Show user-friendly error
              alert('Cart storage is full. Please clear your browser data or use a different browser.');
            }
          } else {
            throw storageError;
          }
        }
      }
    } catch (error) {
      // Error handled silently
    }
  };

  return [storedValue, setValue] as const;
}
