// "use client";

// import { useEffect } from "react";
// import { useRouter } from "next/navigation";

// export default function Splash() {
//   const router = useRouter();

//   //   useEffect(() => {
//   //     const timer = setTimeout(() => {
//   //       router.push("/home");
//   //     }, 2000);

//   //     return () => clearTimeout(timer);
//   //   }, [router]);

//   return (
//     <main className="flex h-screen items-center justify-center">
//       <h1 className="text-3xl font-bold">Welcome 🎬</h1>
//     </main>
//   );
// }

"use client";

import Logo from "@/icons/logo-white.svg";
export default function Intro() {
  return (
    <main className="flex h-screen w-full flex-col items-center justify-center bg-[url('/images/custom-bg.png')] bg-cover bg-center">
      <Logo className="mb-4 h-28 w-28" />
      <h1 className="text-3xl font-bold text-white">Welcome </h1>
    </main>
  );
}
