// "use client";

// import React, { useEffect, useState } from "react";
// import { useRouter } from "next/navigation";
// import Home from "./Home";
// import Login from "./login/page";
// import { useAuth } from "./authContext";
// import Loading from "../components/Loading";

// interface PageProps {
//   params: Promise<{ [key: string]: any }>;
//   searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
// }

// const PageContent: React.FC<{ onLogin: () => void }> = ({ onLogin }) => {
//   const router = useRouter();
//   const { isLoggedIn } = useAuth(); // Use isLoggedIn from useAuth

//   useEffect(() => {
//     if (!isLoggedIn) {
//       router.push("/login");
//     }
//   }, [isLoggedIn, router]);

//   if (isLoggedIn) {
//     return <Home />;
//   }

//   return <Login onLogin={onLogin} />;
// };

// const Page: React.FC<PageProps> = ({ params, searchParams }) => {
//   const [resolvedParams, setResolvedParams] = useState<{
//     [key: string]: any;
//   } | null>(null);
//   const [resolvedSearchParams, setResolvedSearchParams] = useState<{
//     [key: string]: string | string[] | undefined;
//   } | null>(null);

//   useEffect(() => {
//     const resolveParams = async () => {
//       setResolvedParams(await params);
//       setResolvedSearchParams(await searchParams);
//     };
//     resolveParams();
//   }, [params, searchParams]);

//   const handleLogin = () => {
//     console.log("User logged in");
//   };

//   if (!resolvedParams || !resolvedSearchParams) {
//     return <Loading />;
//   }

//   return <PageContent onLogin={handleLogin} />;
// };

// export default Page;

"use client";

import React, { Suspense, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Home from "./Home";
import Login from "./login/page";
import { useAuth } from "./authContext";
import Loading from "../components/Loading";

interface PageProps {
  params: Promise<{ [key: string]: any }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

const PageContent: React.FC = () => {
  const router = useRouter();
  const { isLoggedIn } = useAuth(); // Use isLoggedIn from useAuth

  useEffect(() => {
    if (!isLoggedIn) {
      router.push("/login");
    }
  }, [isLoggedIn, router]);

  if (isLoggedIn) {
    return <Home />;
  }

  return <Login />;
};

const Page: React.FC<PageProps> = ({ params, searchParams }) => {
  const [resolvedParams, setResolvedParams] = useState<{
    [key: string]: any;
  } | null>(null);
  const [resolvedSearchParams, setResolvedSearchParams] = useState<{
    [key: string]: string | string[] | undefined;
  } | null>(null);

  useEffect(() => {
    const resolveParams = async () => {
      setResolvedParams(await params);
      setResolvedSearchParams(await searchParams);
    };
    resolveParams();
  }, [params, searchParams]);

  if (!resolvedParams || !resolvedSearchParams) {
    return <Loading />;
  }

  return (
    <Suspense fallback={<Loading />}>
      <PageContent />
    </Suspense>
  );
};

export default Page;
