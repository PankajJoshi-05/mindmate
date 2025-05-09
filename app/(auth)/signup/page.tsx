"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Eye, EyeOff, UserPlus, Mail, Phone, User, Lock } from "lucide-react"

export default function SignupPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    email: "",
    phoneNumber: "",
    username: "",
    gender: "male",
    password: "",
  })
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [currentStep, setCurrentStep] = useState(1)
  const totalSteps = 2

  useEffect(() => {
    setMounted(true)
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1)
      return
    }

    setIsLoading(true)

    // Simulate button loading state
    setTimeout(() => {
      setIsLoading(false)
      router.push("/login")
    }, 1500)
  }

  const goBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  if (!mounted) return null

  return (
    <div className="flex items-center justify-center min-h-screen p-4 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden -z-10">
        <div className="absolute -top-[30%] -right-[20%] w-[70%] h-[70%] rounded-full bg-green-200 dark:bg-green-900/20 blur-3xl opacity-30"></div>
        <div className="absolute -bottom-[40%] -left-[20%] w-[80%] h-[80%] rounded-full bg-blue-200 dark:bg-blue-900/20 blur-3xl opacity-30"></div>
      </div>

      <Card className="w-full max-w-md animate-slide-up glass-effect dark:bg-gray-900/60 border-opacity-40 shadow-xl">
        <CardHeader className="space-y-1">
          <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4 animate-bounce-slow">
            <UserPlus size={32} className="text-primary" />
          </div>
          <CardTitle className="text-2xl font-bold text-center animate-slide-up">Create Account</CardTitle>
          <CardDescription className="text-center animate-slide-up delay-100">
            Sign up to get started with our platform
          </CardDescription>

          {/* Progress indicator */}
          <div className="flex justify-center items-center gap-2 mt-4 animate-slide-up delay-200">
            {Array.from({ length: totalSteps }).map((_, index) => (
              <div
                key={index}
                className={`h-2 rounded-full transition-all duration-300 ${
                  index + 1 <= currentStep ? "bg-primary w-8" : "bg-gray-300 dark:bg-gray-700 w-4"
                }`}
              ></div>
            ))}
          </div>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {currentStep === 1 && (
              <>
                <div className="space-y-2 animate-slide-in-left">
                  <Label htmlFor="email" className="flex items-center gap-2">
                    <Mail size={16} className="text-muted-foreground" />
                    Email
                  </Label>
                  <div className="relative group">
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="name@example.com"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="pl-3 transition-all border-gray-300 dark:border-gray-700 focus:ring-2 focus:ring-primary/50 hover:border-primary/50"
                    />
                    <div className="absolute bottom-0 left-0 h-0.5 w-0 bg-primary transition-all duration-300 group-hover:w-full"></div>
                  </div>
                </div>
                <div className="space-y-2 animate-slide-in-left delay-100">
                  <Label htmlFor="phoneNumber" className="flex items-center gap-2">
                    <Phone size={16} className="text-muted-foreground" />
                    Phone Number
                  </Label>
                  <div className="relative group">
                    <Input
                      id="phoneNumber"
                      name="phoneNumber"
                      type="tel"
                      placeholder="+1234567890"
                      value={formData.phoneNumber}
                      onChange={handleChange}
                      required
                      className="pl-3 transition-all border-gray-300 dark:border-gray-700 focus:ring-2 focus:ring-primary/50 hover:border-primary/50"
                    />
                    <div className="absolute bottom-0 left-0 h-0.5 w-0 bg-primary transition-all duration-300 group-hover:w-full"></div>
                  </div>
                </div>
                <div className="space-y-2 animate-slide-in-left delay-200">
                  <Label htmlFor="username" className="flex items-center gap-2">
                    <User size={16} className="text-muted-foreground" />
                    Username
                  </Label>
                  <div className="relative group">
                    <Input
                      id="username"
                      name="username"
                      type="text"
                      placeholder="johndoe"
                      value={formData.username}
                      onChange={handleChange}
                      required
                      className="pl-3 transition-all border-gray-300 dark:border-gray-700 focus:ring-2 focus:ring-primary/50 hover:border-primary/50"
                    />
                    <div className="absolute bottom-0 left-0 h-0.5 w-0 bg-primary transition-all duration-300 group-hover:w-full"></div>
                  </div>
                </div>
              </>
            )}

            {currentStep === 2 && (
              <>
                <div className="space-y-2 animate-slide-in-right">
                  <Label className="flex items-center gap-2">
                    <User size={16} className="text-muted-foreground" />
                    Gender
                  </Label>
                  <RadioGroup
                    defaultValue="male"
                    value={formData.gender}
                    onValueChange={(value) => setFormData((prev) => ({ ...prev, gender: value }))}
                    className="flex space-x-4"
                  >
                    <div className="flex items-center space-x-2 relative group">
                      <RadioGroupItem value="male" id="male" className="border-gray-300 dark:border-gray-700" />
                      <Label htmlFor="male" className="cursor-pointer transition-colors group-hover:text-primary">
                        Male
                      </Label>
                      <div className="absolute bottom-0 left-0 h-0.5 w-0 bg-primary transition-all duration-300 group-hover:w-full"></div>
                    </div>
                    <div className="flex items-center space-x-2 relative group">
                      <RadioGroupItem value="female" id="female" className="border-gray-300 dark:border-gray-700" />
                      <Label htmlFor="female" className="cursor-pointer transition-colors group-hover:text-primary">
                        Female
                      </Label>
                      <div className="absolute bottom-0 left-0 h-0.5 w-0 bg-primary transition-all duration-300 group-hover:w-full"></div>
                    </div>
                  </RadioGroup>
                </div>
                <div className="space-y-2 animate-slide-in-right delay-100">
                  <Label htmlFor="password" className="flex items-center gap-2">
                    <Lock size={16} className="text-muted-foreground" />
                    Password
                  </Label>
                  <div className="relative group">
                    <Input
                      id="password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••"
                      value={formData.password}
                      onChange={handleChange}
                      required
                      className="pl-3 transition-all border-gray-300 dark:border-gray-700 focus:ring-2 focus:ring-primary/50 hover:border-primary/50"
                    />
                    <button
                      type="button"
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 transition-colors"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                    <div className="absolute bottom-0 left-0 h-0.5 w-0 bg-primary transition-all duration-300 group-hover:w-full"></div>
                  </div>
                </div>
              </>
            )}

            <div className="flex gap-3 animate-slide-up delay-300">
              {currentStep > 1 && (
                <Button
                  type="button"
                  variant="outline"
                  className="flex-1 transition-all duration-300 hover:shadow-md"
                  onClick={goBack}
                >
                  Back
                </Button>
              )}
              <Button
                type="submit"
                className="flex-1 relative overflow-hidden group transition-all duration-300 hover:shadow-lg"
                disabled={isLoading}
              >
                <span
                  className={`flex items-center justify-center gap-2 transition-all ${isLoading ? "opacity-0" : "opacity-100"}`}
                >
                  {currentStep < totalSteps ? "Next" : "Sign up"}
                </span>
                {isLoading && (
                  <span className="absolute inset-0 flex items-center justify-center">
                    <svg
                      className="animate-spin h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                  </span>
                )}
                <span className="absolute inset-0 scale-0 rounded-full bg-white/10 group-hover:scale-100 transition-all duration-500"></span>
              </Button>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col space-y-2 animate-slide-up delay-400">
          <div className="text-sm text-center text-gray-500 dark:text-gray-400">
            Already have an account?{" "}
            <Link
              href="/login"
              className="text-primary hover:text-primary/80 hover:underline transition-colors font-medium"
            >
              Login
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}
