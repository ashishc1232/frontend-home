// app/shop/layout.tsx
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function ShopLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      const res = await fetch("http://localhost:5000/api/auth/check-auth", {
        credentials: "include",
      });

      if (res.ok) {
        setAuthorized(true);
      } else {
        router.push("/log-in");
      }
    };

    checkAuth();
  }, []);

  if (!authorized) return <p>Checking access...</p>;

  return <>{children}</>;
}
