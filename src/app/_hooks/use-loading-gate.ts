"use client";
import { useEffect, useRef, useState } from "react";

export function useLoadingGate(
  loading: boolean,
  { showAfterMs = 150, minVisibleMs = 350 } = {},
) {
  const [visible, setVisible] = useState(false);
  const showTimer = useRef<number | null>(null);
  const hideTimer = useRef<number | null>(null);
  const visibleSince = useRef<number | null>(null);

  useEffect(() => {
    const clear = (t: number | null) =>
      t ? (window.clearTimeout(t), null) : null;

    if (loading) {
      hideTimer.current = clear(hideTimer.current);
      if (!visible) {
        showTimer.current = window.setTimeout(() => {
          setVisible(true);
          visibleSince.current = Date.now();
        }, showAfterMs);
      }
    } else {
      showTimer.current = clear(showTimer.current);
      if (visible) {
        const elapsed = visibleSince.current
          ? Date.now() - visibleSince.current
          : 0;
        const remain = Math.max(minVisibleMs - elapsed, 0);
        hideTimer.current = window.setTimeout(() => {
          setVisible(false);
          visibleSince.current = null;
        }, remain);
      }
    }

    return () => {
      showTimer.current = clear(showTimer.current);
      hideTimer.current = clear(hideTimer.current);
    };
  }, [loading, showAfterMs, minVisibleMs, visible]);

  return visible;
}
