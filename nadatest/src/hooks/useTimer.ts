"use client";

import { useRef, useEffect, useCallback } from "react";
import { formatTime } from "@/lib/utils";

/**
 * Timer hook that updates via DOM ref (no re-renders on each tick).
 * Attach `displayRef` to a <span> to show the formatted time.
 * Read `secondsRef.current` for the current value.
 */
export function useTimer({
  initialSeconds,
  direction,
  onTimeUp,
}: {
  initialSeconds: number;
  direction: "up" | "down";
  onTimeUp?: () => void;
}) {
  const secondsRef = useRef(initialSeconds);
  const displayRef = useRef<HTMLSpanElement | null>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const onTimeUpRef = useRef(onTimeUp);
  onTimeUpRef.current = onTimeUp;

  const stop = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      if (direction === "down") {
        if (secondsRef.current <= 0) {
          stop();
          onTimeUpRef.current?.();
          return;
        }
        secondsRef.current -= 1;
      } else {
        secondsRef.current += 1;
      }

      if (displayRef.current) {
        displayRef.current.textContent = formatTime(secondsRef.current);
      }
    }, 1000);

    return () => stop();
  }, [direction, stop]);

  return { secondsRef, displayRef, stop };
}
