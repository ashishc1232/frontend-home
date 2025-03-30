"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { ShoppingCart, Heart, Truck, RotateCcw, CreditCard, MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"

interface Product {
  _id: string
  name: string
  description: string
  price: number
  discountPrice?: number
  stock: number
  unit: string
  deliveryTime: string
  category: string
  subcategory: string
  returnPolicy: string
  paymentMode: string
  sellerName: string
  contact: string
  location: string
  images: string[]
}

export default function ProductDetailPage() {
  const params = useParams()
  const productId = params.productId as string
  const [product, setProduct] = useState<Product | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const [quantity, setQuantity] = useState(1)

  useEffect(() => {
    async function fetchProduct() {
      try {
        const res = await fetch(`http://localhost:5000/api/products/${productId}`)
        if (!res.ok) {
          throw new Error("Failed to fetch product details")
        }
        const data = await res.json()
        setProduct(data.product)

        // Set the first image as the selected image by default
        if (data.product.images && data.product.images.length > 0) {
          setSelectedImage(`http://localhost:5000${data.product.images[0]}`)
        }
      } catch (err: any) {
        setError(err.message || "Something went wrong")
      } finally {
        setLoading(false)
      }
    }
    if (productId) {
      fetchProduct()
    }
  }, [productId])

  const handleQuantityChange = (change: number) => {
    const newQuantity = quantity + change
    if (newQuantity >= 1 && newQuantity <= (product?.stock || 1)) {
      setQuantity(newQuantity)
    }
  }

  const calculateDiscount = () => {
    if (product?.discountPrice && product.price) {
      const discount = ((product.discountPrice - product.price) / product.discountPrice) * 100;
      return Math.round(discount); 
    }
    return 0;
  };
  

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="w-12 h-12 border-4 border-gray-300 border-t-primary rounded-full animate-spin"></div>
      </div>
    )
  if (error) return <p className="text-center text-red-500">Error: {error}</p>
  if (!product) return <p className="text-center">No product found.</p>

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      {/* Breadcrumb */}
      <div className="mb-6">
        <nav className="flex text-sm">
          <Link href="/shop" className="text-muted-foreground hover:text-primary">
            Shop
          </Link>
          <span className="mx-2 text-muted-foreground"></span>
          {/* <Link href={`/shop/${product.category}`} className="text-muted-foreground hover:text-primary">
            {product.category}
          </Link> */}
          {/* <span className="mx-2 text-muted-foreground">/</span>
          <Link
            href={`/shop/${product.category}/${product.subcategory}`}
            className="text-muted-foreground hover:text-primary"
          >
            {product.subcategory}
          </Link> */}
        </nav>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
        {/* Product Images Section */}
        <div className="space-y-4">
          {/* Main Image */}
          <div className="relative rounded-lg overflow-hidden border bg-background h-[400px] md:h-[500px]">
            {selectedImage && (
              <Image
                src={selectedImage || "/placeholder.svg"}
                alt={product.name}
                fill
                className="object-cover"
                priority
              />
            )}
          </div>

          {/* Thumbnails */}
          <div className="flex space-x-2 overflow-x-auto pb-2">
            {product.images.map((img, index) => {
              const fullImageUrl = `http://localhost:5000${img}`
              return (
                <div
                  key={index}
                  className={`relative h-20 w-20 flex-shrink-0 cursor-pointer rounded-md border-2 transition-all ${selectedImage === fullImageUrl ? "border-primary" : "border-border hover:border-primary/50"
                    }`}
                  onClick={() => setSelectedImage(fullImageUrl)}
                >
                  <Image
                    src={fullImageUrl || "/placeholder.svg"}
                    alt={`Product view ${index + 1}`}
                    fill
                    className="object-cover rounded-sm"
                  />
                </div>
              )
            })}
          </div>
        </div>

        {/* Product Details Section */}
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">{product.name}</h1>
            <div className="flex items-center mt-2">
              <p className="text-sm text-muted-foreground">Sold by: {product.sellerName}</p>
            </div>
          </div>

          {/* Price Section */}
          <div className="space-y-2">
          <div className="flex items-center gap-2">
          <span className="text-3xl font-bold">
  ₹{product.discountPrice ? product.discountPrice.toFixed(2) : product.price.toFixed(2)}
</span>
{product.discountPrice && (
  <>
    <span className="text-xl line-through text-muted-foreground">
      ₹{product.price.toFixed(2)}
    </span>
    <Badge variant="outline" className="bg-green-100 text-green-800 border-green-200">
      {calculateDiscount()}% OFF
    </Badge>
  </>
)}

</div>

            <p className="text-sm text-muted-foreground">
              {product.stock > 10 ? (
                <span className="text-green-600 font-medium">In Stock</span>
              ) : product.stock > 0 ? (
                <span className="text-amber-600 font-medium">Only {product.stock} left</span>
              ) : (
                <span className="text-red-600 font-medium">Out of Stock</span>
              )}
            </p>
          </div>

          {/* Description */}
          <div>
            <h2 className="text-lg font-semibold mb-2">Description</h2>
            <p className="text-muted-foreground">{product.description}</p>
          </div>

          {/* Quantity Selector */}
          <div className="flex items-center space-x-4">
            <span className="text-sm font-medium">Quantity:</span>
            <div className="flex items-center">
              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8 rounded-r-none"
                onClick={() => handleQuantityChange(-1)}
                disabled={quantity <= 1}
              >
                -
              </Button>
              <div className="h-8 px-4 flex items-center justify-center border-y border-input">{quantity}</div>
              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8 rounded-l-none"
                onClick={() => handleQuantityChange(1)}
                disabled={quantity >= product.stock}
              >
                +
              </Button>
            </div>
            <span className="text-sm text-muted-foreground">
              {product.stock} {product.unit} available
            </span>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3">
            <Button className="flex-1" variant="outline">
              <ShoppingCart className="mr-2 h-4 w-4" />
              Add to Cart
            </Button>
            <Button className="flex-1">Buy Now</Button>
            <Button variant="ghost" size="icon" className="hidden sm:flex">
              <Heart className="h-5 w-5" />
            </Button>
          </div>

          <Separator />

          {/* Product Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-start space-x-2">
              <Truck className="h-5 w-5 text-muted-foreground flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="text-sm font-medium">Delivery</h3>
                <p className="text-sm text-muted-foreground">{product.deliveryTime}</p>
              </div>
            </div>
            <div className="flex items-start space-x-2">
              <RotateCcw className="h-5 w-5 text-muted-foreground flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="text-sm font-medium">Return Policy</h3>
                <p className="text-sm text-muted-foreground">{product.returnPolicy}</p>
              </div>
            </div>
            <div className="flex items-start space-x-2">
              <CreditCard className="h-5 w-5 text-muted-foreground flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="text-sm font-medium">Payment</h3>
                <p className="text-sm text-muted-foreground">{product.paymentMode}</p>
              </div>
            </div>
            <div className="flex items-start space-x-2">
              <MapPin className="h-5 w-5 text-muted-foreground flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="text-sm font-medium">Location</h3>
                <p className="text-sm text-muted-foreground">{product.location}</p>
              </div>
            </div>
          </div>

          {/* Seller Contact */}
          <div className="bg-muted/50 p-4 rounded-lg">
            <h3 className="text-sm font-medium mb-2">Have questions about this product?</h3>
            <p className="text-sm text-muted-foreground mb-3">Contact the seller directly:</p>
            <Button variant="outline" size="sm" className="w-full sm:w-auto">
              Contact: {product.contact}
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

