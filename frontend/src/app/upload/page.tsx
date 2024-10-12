'use client'
import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { Wallet, ShoppingCart, LogOut, Coins, FileCheck } from 'lucide-react'
import { motion } from "framer-motion"

export default function TokenizePage() {
  const [address, setAddress] = useState("0x1234...5678")
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    ipfsHash: ""
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000))
    console.log("Form submitted:", formData)
    setIsSubmitting(false)
    // Reset form after submission
    setFormData({ name: "", description: "", ipfsHash: "" })
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white">
      {/* Navbar */}
      <nav className="flex justify-between items-center p-4 bg-gray-800 bg-opacity-50 backdrop-blur-md">
        <div className="text-2xl font-bold">MaliX Project</div>
        <div className="flex space-x-2">
          <Button variant="outline"><Coins className="mr-2 h-4 w-4" /> Tokenize</Button>
          <Button variant="outline">{address}</Button>
          <Button variant="outline"><ShoppingCart className="mr-2 h-4 w-4" /> Buy</Button>
          <Button variant="outline"><LogOut className="mr-2 h-4 w-4" /> Disconnect</Button>
        </div>
      </nav>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-center mb-8">Tokenize Your Asset</h1>
        
        <Card className="max-w-md mx-auto bg-gray-800 border-gray-700">
          <CardHeader>
            <CardTitle>Asset Details</CardTitle>
            <CardDescription>Enter the details of the asset you want to tokenize</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit}>
              <div className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium mb-1">Name</label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="bg-gray-700 border-gray-600"
                  />
                </div>
                <div>
                  <label htmlFor="description" className="block text-sm font-medium mb-1">Description</label>
                  <Textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    required
                    className="bg-gray-700 border-gray-600"
                  />
                </div>
                <div>
                  <label htmlFor="ipfsHash" className="block text-sm font-medium mb-1">IPFS Hash</label>
                  <Input
                    id="ipfsHash"
                    name="ipfsHash"
                    value={formData.ipfsHash}
                    onChange={handleInputChange}
                    required
                    className="bg-gray-700 border-gray-600"
                  />
                </div>
              </div>
              <CardFooter className="flex justify-end mt-4 p-0">
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? (
                    <motion.div
                      className="flex items-center"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    >
                      <FileCheck className="mr-2 h-4 w-4 animate-bounce" />
                      Processing...
                    </motion.div>
                  ) : (
                    <>Tokenize Asset</>
                  )}
                </Button>
              </CardFooter>
            </form>
          </CardContent>
        </Card>
      </main>

      {/* Dynamic Background */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-purple-800 to-indigo-800"
          animate={{
            background: [
              "linear-gradient(to right, #4a148c, #311b92)",
              "linear-gradient(to right, #311b92, #1a237e)",
              "linear-gradient(to right, #1a237e, #0d47a1)",
              "linear-gradient(to right, #0d47a1, #4a148c)",
            ],
          }}
          transition={{ duration: 10, repeat: Infinity, repeatType: "reverse" }}
        />
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute bg-white rounded-full opacity-10"
            style={{
              width: Math.random() * 100 + 50,
              height: Math.random() * 100 + 50,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, Math.random() * 100 - 50],
              opacity: [0.1, 0.3, 0.1],
            }}
            transition={{
              duration: Math.random() * 10 + 10,
              repeat: Infinity,
              repeatType: "reverse",
            }}
          />
        ))}
      </div>
    </div>
  )
}