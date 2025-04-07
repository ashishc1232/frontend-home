// types/index.ts
export interface User {
    _id: string;
    name: string;
    email: string;
    mobile: string;
    createdAt: string;
  }
  
  export interface Seller {
    _id: string;
    sellerId: string;
    name: string;
    email: string;
    mobile: string;
    upiId?: string;
    bankDetails?: {
      accountHolderName?: string;
      accountNumber?: string;
      ifscCode?: string;
      bankName?: string;
    };
    createdAt: string;
  }
  
  export interface Product {
    _id: string;
    name: string;
    description: string;
    price: number;
    discountPrice?: number;
    stock: number;
    sold: number;
    category: string;
    subcategory: string;
    images: string[];
    sellerName: string;
    sellerId: { _id: string; name: string; email: string };
  }
  
  export interface OrderItem {
    product: Product;
    quantity: number;
    price: number;
  }
  
  export interface Order {
    _id: string;
    user: { _id: string; name: string; email: string };
    seller: { _id: string; name: string; email: string };
    items: OrderItem[];
    finalAmount: number;
    status: string;
    paymentMethod: string;
    address: string;
    createdAt: string;
  }
  
  export interface DashboardSummary {
    counts: {
      users: number;
      sellers: number;
      products: number;
      orders: number;
    };
    revenue: number;
    recentOrders: Order[];
  }