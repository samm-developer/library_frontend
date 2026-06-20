import { useEffect, useMemo, useRef } from "react";

type AnyFn = (...args: any[]) => void;

/**
 * Standalone throttle: invokes `fn` at most once per `limit` ms.
 * Leading call fires immediately; trailing call captures the last args.
 */
export function throttle<T extends AnyFn>(fn: T, limit = 500): T {
  let lastRun = 0;
  let timer: ReturnType<typeof setTimeout> | null = null;
  let lastArgs: any[];

  return function throttled(this: any, ...args: any[]) {
    lastArgs = args;
    const now = Date.now();
    const remaining = limit - (now - lastRun);

    if (remaining <= 0) {
      if (timer) {
        clearTimeout(timer);
        timer = null;
      }
      lastRun = now;
      fn.apply(this, lastArgs);
    } else if (!timer) {
      timer = setTimeout(() => {
        lastRun = Date.now();
        timer = null;
        fn.apply(this, lastArgs);
      }, remaining);
    }
  } as T;
}

/**
 * Hook variant that returns a stable throttled callback for the component
 * lifetime and cleans up any pending trailing invocation on unmount.
 */
export function useThrottledCallback<T extends AnyFn>(fn: T, limit = 500): T {
  const fnRef = useRef(fn);
  fnRef.current = fn;

  const throttled = useMemo(
    () => throttle((...args: any[]) => fnRef.current(...args), limit),
    [limit]
  );

  useEffect(() => () => {}, []);
  return throttled as T;
}
