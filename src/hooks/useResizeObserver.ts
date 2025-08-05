"use client";

import { useCallback, useState } from "react";

export function useResizeObserver(callback: (contentRect: DOMRectReadOnly) => void) {
  return useCallback((el: HTMLDivElement) => {
    if (el) {
      const resizeObserver = new ResizeObserver((entries) => {
        for (const entry of entries) {
          callback(entry.contentRect);
        }
      });

      resizeObserver.observe(el);

      return () => resizeObserver.disconnect();
    }
  }, [callback]);
}

export function useElementSize() {
  const [size, setSize] = useState({ width: 0, height: 0 });

  const resizeObserverRef = useResizeObserver((contentRect) => {
    setSize({ width: contentRect.width, height: contentRect.height });
  });

  return [resizeObserverRef, size] as const;
}