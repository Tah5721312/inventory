// "use client"; // Mark this file as a Client Component

// import React, { useState, useEffect } from "react";
// import { usePathname, useSearchParams } from "next/navigation";
// import Loading from "@/components/Loading";

// export default function GlobalLoading() {
//   const [isPageLoading, setIsPageLoading] = useState(false);
//   const pathname = usePathname(); // Get the current pathname
//   const searchParams = useSearchParams(); // Get the current search params

//   useEffect(() => {
//     // Trigger loading state when pathname or search params change
//     setIsPageLoading(true);

//     const timeout = setTimeout(() => {
//       setIsPageLoading(false); // Simulate loading completion
//     }, 500); // Adjust the timeout duration as needed

//     return () => clearTimeout(timeout); // Cleanup timeout on unmount
//   }, [pathname, searchParams]);

//   return isPageLoading ? <Loading /> : null; // Show loading animation if loading
// }

"use client";

import React, { useState, useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import Loading from "@/components/Loading";

export default function GlobalLoading() {
  const [isPageLoading, setIsPageLoading] = useState(false);
  const pathname = usePathname(); // Get the current pathname
  const searchParams = useSearchParams(); // Get the current search params

  console.log("GlobalLoading: pathname =", pathname);
  console.log("GlobalLoading: searchParams =", searchParams);

  useEffect(() => {
    // Trigger loading state when pathname or search params change
    setIsPageLoading(true);

    const timeout = setTimeout(() => {
      setIsPageLoading(false); // Simulate loading completion
    }, 500); // Adjust the timeout duration as needed

    return () => clearTimeout(timeout); // Cleanup timeout on unmount
  }, [pathname, searchParams]);

  return isPageLoading ? <Loading /> : null; // Show loading animation if loading
}
