import * as React from 'react';

const PREFIX = 'RUHacks-';

const useLocalStorage = <T>(key: string, initialValue: T): [T, typeof setValue] => {
  const prefixedKey = PREFIX + key;
  const [storedValue, setStoredValue] = React.useState(() => {
    try {
      const item = localStorage.getItem(prefixedKey);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.log(error);
      return initialValue;
    }
  });

  const setValue = (value: T): void => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      localStorage.setItem(prefixedKey, JSON.stringify(valueToStore));
    } catch (error) {
      console.log(error);
    }
  };

  return [storedValue, setValue];
};

export default useLocalStorage;