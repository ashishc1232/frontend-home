"use client";
import { createContext, useContext, useEffect, useState } from "react";

type Seller = { name: string; email: string } | null;

type SellerAuthContextType = {
  seller: Seller;
  setSeller: (seller: Seller) => void;
  logoutSeller: () => Promise<void>;
  loading: boolean;
};

const SellerAuthContext = createContext<SellerAuthContextType | undefined>(undefined);

export function SellerAuthProvider({ children }: { children: React.ReactNode }) {
  const [seller, setSeller] = useState<Seller>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/seller/check-auth", {
          credentials: "include", // Ensure cookies are sent
        });

        if (!res.ok) throw new Error("Not authenticated");

        const data = await res.json();
        setSeller(data.seller);  // Ensure setting correct seller data
      } catch (error) {
        setSeller(null);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  const logoutSeller = async () => {
    await fetch("http://localhost:5000/api/seller/logout", {
      method: "POST",
      credentials: "include",
    });
    setSeller(null);
  };

  return (
    <SellerAuthContext.Provider value={{ seller, setSeller, logoutSeller, loading }}>
      {children}
    </SellerAuthContext.Provider>
  );
}

export function useSellerAuth() {
  const context = useContext(SellerAuthContext);
  if (!context) {
    throw new Error("useSellerAuth must be used within a SellerAuthProvider");
  }
  return context;
}
