import { useEffect, useState } from 'react';

function useDebounce<T>(value: T, delay: number, cb?: (value: T) => void): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    if (value === debouncedValue) return () => {};
    const timeout = setTimeout(() => {
      setDebouncedValue(value);
      if (cb) cb(value);
    }, delay);
    return () => {
      clearTimeout(timeout);
    };
  }, [value, delay]);

  return debouncedValue;
}

export default useDebounce;
