"use client";

import { useEffect, useRef } from "react";
import { usePathname, useSearchParams } from "next/navigation";

function usePreviousLocation() {
  const pathname = usePathname(); // current route path
  const searchParams = useSearchParams(); // current query params

  const prevLocationRef = useRef();

  // Combine pathname + query for full location string
  const currentLocation = `${pathname}?${searchParams.toString()}`;

  useEffect(() => {
    prevLocationRef.current = currentLocation;
  }, [currentLocation]);

  return prevLocationRef.current;
}

export default usePreviousLocation;
