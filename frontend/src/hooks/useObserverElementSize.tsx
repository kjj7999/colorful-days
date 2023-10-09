import { useState, useRef, useEffect } from 'react';

export const useObserveElementSize = <T extends HTMLElement>() => {
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);
  const ref = useRef<T>(null);

  useEffect(() => {
    const observer = new ResizeObserver((entries) => {
      setWidth(entries[0].contentRect.width);
      setHeight(entries[0].contentRect.height);
    });

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      ref.current && observer.unobserve(ref.current);
    };
  }, []);

  return {
    width,
    height,
    ref,
  };
};
