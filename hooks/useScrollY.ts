import {useEffect} from "react";

export const useScrollY = (): number => {
  const isBrowser = typeof window;
  const handleScroll = () => {

  };
  useEffect(() => {
    window.addEventListener('scroll', handleScroll, {passive: true});

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return 10;
};
