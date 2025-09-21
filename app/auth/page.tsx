"use client"

import { useState } from "react"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ChefHat } from "lucide-react"

export default function AuthPage() {
  const searchParams = useSearchParams()
  const defaultTab = searchParams.get("signup") ? "signup" : "login"
  const [activeTab, setActiveTab] = useState(defaultTab)

  return (
    <div className="flex flex-col min-h-screen bg-orange-50">
      <div className="container flex flex-col items-center justify-center flex-1 px-4 py-12 md:px-6">
        <Link href="/" className="flex items-center gap-2 mb-8">
          <ChefHat className="w-8 h-8 text-orange-500" />
          <span className="text-2xl font-bold">Food Recipe app</span>
        </Link>
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full max-w-md">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="login">Login</TabsTrigger>
            <TabsTrigger value="signup">Sign Up</TabsTrigger>
          </TabsList>
          <TabsContent value="login">
            <Card>
              <CardHeader>
                <CardTitle>Login to your account</CardTitle>
                <CardDescription>Enter your email and password to access your recipes</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" placeholder="your@email.com" />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="password">Password</Label>
                    <Link href="/auth/forgot-password" className="text-sm text-orange-500 hover:underline">
                      Forgot password?
                    </Link>
                  </div>
                  <Input id="password" type="password" />
                </div>
              </CardContent>
              <CardFooter>
                <Link href="/recipes" className="w-full">
                  <Button className="w-full bg-orange-500 hover:bg-orange-600">Login</Button>
                </Link>
              </CardFooter>
            </Card>
          </TabsContent>
          <TabsContent value="signup">
            <Card>
              <CardHeader>
                <CardTitle>Create an account</CardTitle>
                <CardDescription>Join our community of food enthusiasts</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Name</Label>
                  <Input id="name" placeholder="Your name" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email-signup">Email</Label>
                  <Input id="email-signup" type="email" placeholder="your@email.com" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password-signup">Password</Label>
                  <Input id="password-signup" type="password" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirm-password">Confirm Password</Label>
                  <Input id="confirm-password" type="password" />
                </div>
              </CardContent>
              <CardFooter>
                <Link href="/recipes" className="w-full">
                  <Button className="w-full bg-orange-500 hover:bg-orange-600">Sign Up</Button>
                </Link>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
