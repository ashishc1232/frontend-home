"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Eye, EyeOff, Mail, Lock, LogIn, CheckCircle2, XCircle } from "lucide-react"
import type React from "react"
import { useRouter } from "next/navigation";
import Navbar from "./Homepage/Navbar"
import { useAuth } from "@/context/auth-context"



interface ValidationState {
  isValid: boolean
  message: string
}

export default function LoginForm() {
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })
 

  const [showPassword, setShowPassword] = useState(false)
  const [touched, setTouched] = useState<Record<string, boolean>>({})

  // Validation functions
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

  const validatePassword = (password: string): ValidationState => {
    if (!password) return { isValid: false, message: "Password is required" }
    if (password.length < 8) {
      return { isValid: false, message: "Password must be at least 8 characters" }
    }
    return { isValid: true, message: "Valid password" }
  }

  // Get validation states
  const emailValidation = validateEmail(formData.email)
  const passwordValidation = validatePassword(formData.password)
  
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    setTouched({ email: true, password: true });
  
    try {
        const response = await fetch(`http://localhost:5000/api/auth/login`, {
        method: "POST",
        credentials: 'include',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
  
      const data = await response.json();
  
      if (!response.ok) {
        throw new Error(data.message || "Login failed");
      }
  
      
      login(data.user);
    } catch (error) {
      alert((error as Error).message);
    }
  };
  

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
        className={`text-sm mt-1 flex items-center gap-1 ${validation.isValid ? "text-green-500" : "text-red-500"}`}
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
          {/* Header */}
          <div className="relative h-32 bg-yellow-400 flex items-center justify-center">
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="relative text-center"
            >
              <h1 className="text-3xl font-bold text-white tracking-tight">Welcome Back!</h1>
              <p className="text-yellow-50">Login to your account</p>
            </motion.div>
          </div>

          <div className="p-8 space-y-6">
            <div className="space-y-4">
              {/* Email Field */}
              <motion.div
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="space-y-2"
              >
                <label htmlFor="email" className="text-gray-700 flex items-center gap-2">
                  <Mail size={18} className="text-yellow-500" />
                  Email
                </label>
                <div className="relative">
                  <input
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    onBlur={() => handleBlur("email")}
                    placeholder="johndoe.example.com"
                    className={`w-full px-4 h-12 rounded-md border transition-all duration-200 outline-none focus:ring-2 focus:ring-yellow-400 ${
                      touched.email && (emailValidation.isValid ? "border-green-500" : "border-red-500")
                    }`}
                  />
                </div>
                {showValidation("email", emailValidation)}
              </motion.div>

              {/* Password Field */}
              <motion.div
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="space-y-2"
              >
                <label htmlFor="password" className="text-gray-700 flex items-center gap-2">
                  <Lock size={18} className="text-yellow-500" />
                  Password
                </label>
                <div className="relative">
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    value={formData.password}
                    onChange={handleChange}
                    onBlur={() => handleBlur("password")}
                    className={`w-full px-4 h-12 rounded-md border transition-all duration-200 outline-none focus:ring-2 focus:ring-yellow-400 ${
                      touched.password && (passwordValidation.isValid ? "border-green-500" : "border-red-500")
                    }`}
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

              {/* Forgot Password Link */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="text-right"
              >
                <a href="#" className="text-sm text-yellow-600 hover:text-yellow-700 transition-colors">
                  Forgot your password?
                </a>
              </motion.div>
            </div>

            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="space-y-4"
            >
              <button
                type="submit"
                className="w-full h-12 bg-yellow-400 hover:bg-yellow-500 text-white rounded-md transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2"
              >
                <LogIn size={20} />
                Login
              </button>

              <p className="text-center text-gray-600">
                Don't have an account?{" "}
                <a href="/sign-up" className="text-yellow-600 hover:text-yellow-700 transition-colors">
                  Sign up
                </a>
              </p>
            </motion.div>
          </div>
        </form>
      </motion.div>
    </div>
  )
}

