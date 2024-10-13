'use client'
import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Wallet, ShoppingCart, LogOut, Coins, RefreshCw, Check } from 'lucide-react'
import { motion, AnimatePresence } from "framer-motion"
import Link from 'next/link'

// Mock data for a token
const mockToken = {
  id: 1,
  name: "Cosmic Harmony",
  description: "A mesmerizing digital artwork that captures the essence of universal balance.",
  price: "1.5",
  category: "Art",
  image: "https://picsum.photos/seed/1/300/300"
}

export default function UpdateTokenPage() {
  const [address, setAddress] = useState("0x1234...5678")
  const [token, setToken] = useState(mockToken)
  const [isUpdating, setIsUpdating] = useState(false)
  const [updateSuccess, setUpdateSuccess] = useState(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setToken(prevToken => ({
      ...prevToken,
      [name]: value
    }))
  }

  const handleCategoryChange = (value: string) => {
    setToken(prevToken => ({
      ...prevToken,
      category: value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsUpdating(true)
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000))
    console.log("Token updated:", token)
    setIsUpdating(false)
    setUpdateSuccess(true)
    setTimeout(() => setUpdateSuccess(false), 3000)
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white">
      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-center mb-8">Update Token</h1>
        
        <div className="max-w-2xl mx-auto">
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle>Edit Token Details</CardTitle>
              <CardDescription>Update the information for your token</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="flex items-center space-x-4">
                  <div className="w-1/3">
                    <img src={token.image} alt={token.name} className="w-full h-auto rounded-lg" />
                  </div>
                  <div className="w-2/3 space-y-4">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium mb-1">Name</label>
                      <Input
                        id="name"
                        name="name"
                        value={token.name}
                        onChange={handleInputChange}
                        required
                        className="bg-gray-700 border-gray-600"
                      />
                    </div>
                    <div>
                      <label htmlFor="price" className="block text-sm font-medium mb-1">Price (ETH)</label>
                      <Input
                        id="price"
                        name="price"
                        type="number"
                        step="0.01"
                        value={token.price}
                        onChange={handleInputChange}
                        required
                        className="bg-gray-700 border-gray-600"
                      />
                    </div>
                  </div>
                </div>
                <div>
                  <label htmlFor="description" className="block text-sm font-medium mb-1">Description</label>
                  <Textarea
                    id="description"
                    name="description"
                    value={token.description}
                    onChange={handleInputChange}
                    required
                    className="bg-gray-700 border-gray-600 h-32"
                  />
                </div>
                <div>
                  <label htmlFor="category" className="block text-sm font-medium mb-1">Category</label>
                  <Select onValueChange={handleCategoryChange} defaultValue={token.category}>
                    <SelectTrigger className="bg-gray-700 border-gray-600">
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Art">Art</SelectItem>
                      <SelectItem value="Tech">Tech</SelectItem>
                      <SelectItem value="Knowledge">Knowledge</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <CardFooter className="flex justify-end p-0">
                  <Link href="/" className='mr-2'>
                    <Button>Home</Button>
                  </Link>
                  <Button type="submit" disabled={isUpdating} className="relative">
                    {isUpdating ? (
                      <motion.div
                        className="flex items-center"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                      >
                        <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                        Updating...
                      </motion.div>
                    ) : (
                      <>Update Token</>
                    )}
                    <AnimatePresence>
                      {updateSuccess && (
                        <motion.div
                          className="absolute inset-0 flex items-center justify-center bg-green-500 rounded-md"
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.8 }}
                          transition={{ duration: 0.3 }}
                        >
                          <Check className="mr-2 h-4 w-4" /> Updated!
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </Button>
                </CardFooter>
              </form>
            </CardContent>
          </Card>
        </div>
      </main>

      {/* Dynamic Background */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        {[...Array(10)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20"
            style={{
              width: Math.random() * 400 + 200,
              height: Math.random() * 400 + 200,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
            }}
            animate={{
              x: [0, Math.random() * 100 - 50],
              y: [0, Math.random() * 100 - 50],
              scale: [1, Math.random() + 0.5],
            }}
            transition={{
              duration: Math.random() * 20 + 10,
              repeat: Infinity,
              repeatType: "reverse",
            }}
          />
        ))}
      </div>
    </div>
  )
}