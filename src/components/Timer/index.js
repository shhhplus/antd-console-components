import { useEffect, useRef } from 'react';
import createTimer from '@shhhplus/timer.js';

export default ({ onElapsed, interval }) => {
  const onElapsedRef = useRef(onElapsed);

  useEffect(() => {
    onElapsedRef.current = onElapsed;
  }, [onElapsed]);

  useEffect(() => {
    if (!interval) {
      return;
    }

    const timer = createTimer({
      onElapsed: () => {
        if (onElapsedRef.current) {
          return onElapsedRef.current();
        }
      },
      interval,
    });
    timer.start();

    return () => {
      timer.stop();
    };
  }, [interval]);

  return null;
};
