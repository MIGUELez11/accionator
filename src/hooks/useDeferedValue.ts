'use client';

import { useEffect, useState } from 'react';

export function useDeferedValue<T>(value: T, delay: number) {
  const [deferedValue, setDeferedValue] = useState<T>(value);

  useEffect(() => {
    const timeout = setTimeout(() => setDeferedValue(value), delay);
    return () => clearTimeout(timeout);
  }, [value, delay]);

  return deferedValue;
}
