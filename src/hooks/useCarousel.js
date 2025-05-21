import { useEffect, useState } from "react";

export default function useCarousel(length, delay = 6000) {
  const [index, setIndex] = useState(0);
  useEffect(() => {
    if (!length) return;
    const id = setInterval(() => setIndex((i) => (i + 1) % length), delay);
    return () => clearInterval(id);
  }, [length, delay]);
  return [index, setIndex];
}