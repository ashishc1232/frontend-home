"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Eye, EyeOff, Mail, User, Phone, Lock, CheckCircle2, XCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"
import Image from "next/image"
import { toast } from "sonner"
import Navbar from "./Homepage/Navbar"

interface ValidationState {
  isValid: boolean
  message: string
}

export default function SignUpForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    password: "",
    confirmPassword: "",
  })

  const [showPassword, setShowPassword] = useState(false)
  const API_URL = process.env.NEXT_PUBLIC_API_URL;
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [touched, setTouched] = useState<Record<string, boolean>>({})

  // Validation functions
  const validateName = (name: string): ValidationState => {
    if (!name) return { isValid: false, message: "Name is required" }
    if (name.length < 2) return { isValid: false, message: "Name must be at least 2 characters" }
    if (!/^[a-zA-Z\s]*$/.test(name)) return { isValid: false, message: "Name can only contain letters" }
    if (name.length > 50) return { isValid: false, message: "Name must be less than 50 characters" }
    return { isValid: true, message: "Valid name" }
  }

  const validateEmail = (email: string): ValidationState => {
    if (!email) return { isValid: false, message: "Email is required" }
    if (email.length < 5) return { isValid: false, message: "Email is too short" }
    if (!email.includes(".")) return { isValid: false, message: "Email must contain a domain" }
    if (email.startsWith(".") || email.endsWith(".")) {
      return { isValid: false, message: "Invalid email format" }
    }
    // if (!/^[a-zA-Z0-9._-]+[a-zA-Z0-9]$/.test(email)) {
    //   return { isValid: false, message: "Email contains invalid characters" }
    // }
    return { isValid: true, message: "Valid email format" }
  }

  const validateMobile = (mobile: string): ValidationState => {
    if (!mobile) return { isValid: false, message: "Mobile number is required" }
    // Remove all non-numeric characters for validation
    const numericMobile = mobile.replace(/\D/g, "")
    if (numericMobile.length < 10) {
      return { isValid: false, message: "Mobile number must have at least 10 digits" }
    }
    if (numericMobile.length > 15) {
      return { isValid: false, message: "Mobile number is too long" }
    }
    if (!/^\d+$/.test(numericMobile)) {
      return { isValid: false, message: "Mobile number can only contain digits" }
    }
    return { isValid: true, message: "Valid mobile number" }
  }

  const validatePassword = (password: string): ValidationState => {
    if (!password) return { isValid: false, message: "Password is required" }
    if (password.length < 8) {
      return { isValid: false, message: "Password must be at least 8 characters" }
    }
    if (!/[A-Z]/.test(password)) {
      return { isValid: false, message: "Password must contain an uppercase letter" }
    }
    if (!/[a-z]/.test(password)) {
      return { isValid: false, message: "Password must contain a lowercase letter" }
    }
    if (!/[0-9]/.test(password)) {
      return { isValid: false, message: "Password must contain a number" }
    }
    if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
      return { isValid: false, message: "Password must contain a special character" }
    }
    return { isValid: true, message: "Strong password" }
  }

  const validateConfirmPassword = (confirmPassword: string): ValidationState => {
    if (!confirmPassword) return { isValid: false, message: "Please confirm your password" }
    if (confirmPassword !== formData.password) {
      return { isValid: false, message: "Passwords do not match" }
    }
    return { isValid: true, message: "Passwords match" }
  }

  // Get validation states
  const nameValidation = validateName(formData.name)
  const emailValidation = validateEmail(formData.email)
  const mobileValidation = validateMobile(formData.mobile)
  const passwordValidation = validatePassword(formData.password)
  const confirmPasswordValidation = validateConfirmPassword(formData.confirmPassword)

  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setTouched({ name: true, email: true, mobile: true, password: true, confirmPassword: true })
  
    if (
      nameValidation.isValid &&
      emailValidation.isValid &&
      mobileValidation.isValid &&
      passwordValidation.isValid &&
      confirmPasswordValidation.isValid
    ) {
      try {
        const response = await fetch(`http://localhost:5000/api/auth/register`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        })
        const data = await response.json()
  
        if (response.ok) {
          toast.success("Registration successful!")
          
          // Reset form data
          setFormData({
            name: "",
            email: "",
            mobile: "",
            password: "",
            confirmPassword: "",
          })
  
          // Reset touched state
          setTouched({})
        } else {
          toast.error(data.message || "Registration failed")
        }
      } catch (error) {
        toast.error("Something went wrong. Please try again.")
      }
    } else {
      toast.error("Please fix the validation errors")
    }
  }
  

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleBlur = (field: string) => {
    setTouched((prev) => ({ ...prev, [field]: true }))
  }

  // Helper function to show validation message
  const showValidation = (field: string, validation: ValidationState) => {
    if (!touched[field]) return null

    return (
      <motion.p
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className={cn("text-sm mt-1 flex items-center gap-1", validation.isValid ? "text-green-500" : "text-red-500")}
      >
        {validation.isValid ? <CheckCircle2 size={14} /> : <XCircle size={14} />}
        {validation.message}
      </motion.p>
    )
  }

  return (
    <div className=" w-full  bg-gradient-to-br from-yellow-100 to-white flex items-center justify-center p-4 relative overflow-hidden pt-20">
      
      <div className="fixed top-0 w-full z-50">
        <Navbar />
      </div>
      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-yellow-200 rounded-full filter blur-3xl opacity-50 -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-64 h-64 bg-yellow-300 rounded-full filter blur-3xl opacity-50 translate-x-1/2 translate-y-1/2" />

      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="w-full max-w-md relative"
      >
        <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Header Image */}
          <div className="relative h-32 bg-yellow-400 flex items-center justify-center">
            
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="relative text-center"
            >
              <h1 className="text-3xl font-bold text-white tracking-tight">Welcome!</h1>
              <p className="text-yellow-50">Create your account</p>
            </motion.div>
          </div>

          <div className="p-8 space-y-6">
            <div className="space-y-4">
              {/* Name Field */}
              <motion.div
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="space-y-2"
              >
                <Label htmlFor="name" className="text-gray-700 flex items-center gap-2">
                  <User size={18} className="text-yellow-500" />
                  Full Name
                </Label>
                <div className="relative">
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    onBlur={() => handleBlur("name")}
                    placeholder="John Doe"
                    className={cn(
                      "pl-4 h-12 transition-all duration-200",
                      touched.name && (nameValidation.isValid ? "border-green-500" : "border-red-500"),
                    )}
                  />
                </div>
                {showValidation("name", nameValidation)}
              </motion.div>

              {/* Email Field */}
              <motion.div
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="space-y-2"
              >
                <Label htmlFor="email" className="text-gray-700 flex items-center gap-2">
                  <Mail size={18} className="text-yellow-500" />
                  Email
                </Label>
                <div className="relative">
                  <Input
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    onBlur={() => handleBlur("email")}
                    placeholder="johndoe.example.com"
                    className={cn(
                      "pl-4 h-12 transition-all duration-200",
                      touched.email && (emailValidation.isValid ? "border-green-500" : "border-red-500"),
                    )}
                  />
                </div>
                {showValidation("email", emailValidation)}
              </motion.div>

              {/* Mobile Field */}
              <motion.div
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="space-y-2"
              >
                <Label htmlFor="mobile" className="text-gray-700 flex items-center gap-2">
                  <Phone size={18} className="text-yellow-500" />
                  Mobile Number
                </Label>
                <div className="relative">
                  <Input
                    id="mobile"
                    name="mobile"
                    value={formData.mobile}
                    onChange={handleChange}
                    onBlur={() => handleBlur("mobile")}
                    placeholder="+1 (555) 000-0000"
                    className={cn(
                      "pl-4 h-12 transition-all duration-200",
                      touched.mobile && (mobileValidation.isValid ? "border-green-500" : "border-red-500"),
                    )}
                  />
                </div>
                {showValidation("mobile", mobileValidation)}
              </motion.div>

              {/* Password Field */}
              <motion.div
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="space-y-2"
              >
                <Label htmlFor="password" className="text-gray-700 flex items-center gap-2">
                  <Lock size={18} className="text-yellow-500" />
                  Password
                </Label>
                <div className="relative">
                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    value={formData.password}
                    onChange={handleChange}
                    onBlur={() => handleBlur("password")}
                    className={cn(
                      "pl-4 h-12 transition-all duration-200",
                      touched.password && (passwordValidation.isValid ? "border-green-500" : "border-red-500"),
                    )}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-yellow-500 transition-colors"
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
                {showValidation("password", passwordValidation)}
              </motion.div>

              {/* Confirm Password Field */}
              <motion.div
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.7 }}
                className="space-y-2"
              >
                <Label htmlFor="confirmPassword" className="text-gray-700 flex items-center gap-2">
                  <Lock size={18} className="text-yellow-500" />
                  Confirm Password
                </Label>
                <div className="relative">
                  <Input
                    id="confirmPassword"
                    name="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    onBlur={() => handleBlur("confirmPassword")}
                    className={cn(
                      "pl-4 h-12 transition-all duration-200",
                      touched.confirmPassword &&
                        (confirmPasswordValidation.isValid ? "border-green-500" : "border-red-500"),
                    )}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-yellow-500 transition-colors"
                  >
                    {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
                {showValidation("confirmPassword", confirmPasswordValidation)}
              </motion.div>
            </div>

            <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.8 }}>
              <Button
                type="submit"
                className="w-full h-12 bg-yellow-400 hover:bg-yellow-500 text-white transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98]"
              >
                Create Account
              </Button>
            </motion.div>
            <p className="text-center text-gray-600">
                Already have an account?{" "}
                <a href="/log-in" className="text-yellow-600 hover:text-yellow-700 transition-colors">
                  Sign In
                </a>
              </p>
          </div>
        </form>
      </motion.div>
    </div>
  )
}

