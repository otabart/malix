'use client'
import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Wallet, ShoppingCart, LogOut, Coins, Search, Filter, Sparkles } from 'lucide-react'
import { motion, AnimatePresence } from "framer-motion"
import { i } from 'framer-motion/client'

// Mock data for tokens
const mockTokens = [
  { id: 1, name: "Cosmic Harmony", creator: "Stella Nova", price: "1.5 ETH", image: "https://picsum.photos/seed/1/300/300", category: "Art" },
  { id: 2, name: "Quantum Algorithm", creator: "Dr. Qubit", price: "2.0 ETH", image: "https://picsum.photos/seed/2/300/300", category: "Tech" },
  { id: 3, name: "Ancient Wisdom Scroll", creator: "Sage Elder", price: "0.8 ETH", image: "https://picsum.photos/seed/3/300/300", category: "Knowledge" },
  { id: 4, name: "Nanobot Swarm", creator: "MicroMind", price: "3.2 ETH", image: "https://picsum.photos/seed/4/300/300", category: "Tech" },
  { id: 5, name: "Ethereal Dreamscape", creator: "Luna Whisper", price: "1.7 ETH", image: "https://picsum.photos/seed/5/300/300", category: "Art" },
  { id: 6, name: "Blockchain Codex", creator: "Crypto Sage", price: "2.5 ETH", image: "https://picsum.photos/seed/6/300/300", category: "Knowledge" },
  { id: 7, name: "Galactic Oasis", creator: "Cosmo Gardner", price: "1.9 ETH", image: "https://picsum.photos/seed/7/300/300", category: "Art" },
  { id: 8, name: "Neural Network Nexus", creator: "AI Architect", price: "2.8 ETH", image: "https://picsum.photos/seed/8/300/300", category: "Tech" },
  { id: 9, name: "Ancestral Memories", creator: "Heritage Keeper", price: "1.2 ETH", image: "https://picsum.photos/seed/9/300/300", category: "Knowledge" },
]

export default function TokenGallery() {
  const [address, setAddress] = useState("0x1234...5678")
  const [tokens, setTokens] = useState(mockTokens)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [hoveredToken, setHoveredToken] = useState<number|null>(null)

  const categories = ["All", "Art", "Tech", "Knowledge"]

  useEffect(() => {
    const filtered = mockTokens.filter(token => 
      token.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (selectedCategory === "All" || token.category === selectedCategory)
    )
    setTokens(filtered)
  }, [searchTerm, selectedCategory])

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
        <h1 className="text-4xl font-bold text-center mb-8">Token Gallery</h1>
        
        {/* Search and Filter */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-8">
          <div className="relative w-full md:w-1/3 mb-4 md:mb-0">
            <input
              type="text"
              placeholder="Search tokens..."
              className="w-full p-2 pl-10 rounded-full bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
          </div>
          <div className="flex items-center space-x-2">
            <Filter className="h-5 w-5 text-gray-400" />
            {categories.map(category => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                onClick={() => setSelectedCategory(category)}
                className="rounded-full"
              >
                {category}
              </Button>
            ))}
          </div>
        </div>

        {/* Token Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence>
            {tokens.map((token) => (
              <motion.div
                key={token.id}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.5 }}
                whileHover={{ scale: 1.05 }}
                onHoverStart={() => setHoveredToken(token.id)}
                onHoverEnd={() => setHoveredToken(null)}
              >
                <Card className="bg-gray-800 border-gray-700 overflow-hidden relative">
                  <CardContent className="p-0">
                    <img src={token.image} alt={token.name} className="w-full h-64 object-cover" />
                    {hoveredToken === token.id && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center"
                      >
                        <Button className="bg-white text-black hover:bg-gray-200">View Details</Button>
                      </motion.div>
                    )}
                  </CardContent>
                  <CardFooter className="flex flex-col items-start p-4">
                    <h3 className="text-xl font-semibold mb-1">{token.name}</h3>
                    <p className="text-sm text-gray-400 mb-2">by {token.creator}</p>
                    <div className="flex justify-between items-center w-full">
                      <span className="text-green-400 font-bold">{token.price}</span>
                      <Button size="sm" className="bg-blue-500 hover:bg-blue-600">
                        <ShoppingCart className="mr-2 h-4 w-4" /> Buy Now
                      </Button>
                    </div>
                  </CardFooter>
                  <div className="absolute top-2 right-2 bg-gray-900 text-xs font-bold px-2 py-1 rounded-full">
                    {token.category}
                  </div>
                </Card>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {tokens.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center mt-12"
          >
            <Sparkles className="h-16 w-16 text-gray-500 mx-auto mb-4" />
            <h2 className="text-2xl font-semibold mb-2">No tokens found</h2>
            <p className="text-gray-400">Try adjusting your search or filter to find more tokens.</p>
          </motion.div>
        )}
      </main>

      {/* Dynamic Background */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-30"
            style={{
              width: Math.random() * 300 + 100,
              height: Math.random() * 300 + 100,
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