// app/admin/layout.tsx
"use client";

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [authenticated, setAuthenticated] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  
  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    
    if (!token && pathname !== '/admin/login') {
      router.push('/admin/login');
      return;
    }
    
    if (token) {
      setAuthenticated(true);
    }
  }, [pathname, router]);

  if (pathname === '/admin/login') {
    return <>{children}</>;
  }

  if (!authenticated) {
    return <div className="p-8 text-center">Checking authentication...</div>;
  }

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    router.push('/admin/login');
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-md">
        <div className="p-4 border-b">
          <h1 className="text-xl font-bold">Admin Panel</h1>
        </div>
        
        <nav className="p-4">
          <NavLink href="/admin" active={pathname === '/admin'}>
            Dashboard
          </NavLink>
          <NavLink href="/admin/users" active={pathname === '/admin/users'}>
            Users
          </NavLink>
          <NavLink href="/admin/sellers" active={pathname === '/admin/sellers'}>
            Sellers
          </NavLink>
          <NavLink href="/admin/products" active={pathname === '/admin/products'}>
            Products
          </NavLink>
          <NavLink href="/admin/orders" active={pathname === '/admin/orders'}>
            Orders
          </NavLink>
          
          <div className="mt-6">
            <button 
              onClick={handleLogout}
              className="w-full text-left px-4 py-2 text-red-600 hover:bg-red-50 rounded"
            >
              Logout
            </button>
          </div>
        </nav>
      </div>
      
      {/* Main content */}
      <div className="flex-1 overflow-y-auto">
        {children}
      </div>
    </div>
  );
}

function NavLink({ 
  href, 
  active, 
  children 
}: { 
  href: string; 
  active: boolean;
  children: React.ReactNode;
}) {
  return (
    <Link href={href}>
      <div className={`mb-2 px-4 py-2 rounded ${
        active ? 'bg-blue-50 text-blue-600' : 'hover:bg-gray-50'
      }`}>
        {children}
      </div>
    </Link>
  );
}