import { useEffect } from 'react';
import createTimer from '@shhhplus/timer.js';

export default ({ onElapsed, interval }) => {
  useEffect(() => {
    if (!onElapsed || !interval) {
      return;
    }

    const timer = createTimer({
      onElapsed,
      interval,
    });
    timer.start();

    return () => {
      timer.stop();
    };
  }, [onElapsed, interval]);

  return null;
};
