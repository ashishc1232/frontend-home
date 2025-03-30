// lib/mockData.ts
export interface product {
    id: string
    name: string
    slug: string
    price: number
    image: string
    description: string
    category: string
    subcategory: string
  }
  
  export const mockProducts: product[] = [
    {
      id: "1",
      name: "Casual Summer Dress",
      slug: "casual-summer-dress",
      price: 49.99,
      image: "https://images.unsplash.com/photo-1581044777550-4cfa60707c03",
      description: "A comfortable and stylish summer dress.",
      category: "Dresses",
      subcategory: "Casual-Dresses",
    },
    // Add more mock products...
  ]