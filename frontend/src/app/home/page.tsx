'use client'
import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Wallet, ShoppingCart, LogOut, Coins } from 'lucide-react'
import Link from 'next/link';


// Mock data for marketplace items
const marketplaceItems = [
  { id: 1, title: "Digital Art Piece #1", price: "0.5 ETH", image: "https://picsum.photos/seed/1/300/300" },
  { id: 2, title: "Traditional Recipe NFT", price: "0.3 ETH", image: "https://picsum.photos/seed/2/300/300" },
  { id: 3, title: "Tech Patent Token", price: "1.2 ETH", image: "https://picsum.photos/seed/3/300/300" },
  { id: 4, title: "Cultural Artifact NFT", price: "0.8 ETH", image: "https://picsum.photos/seed/4/300/300" },
  { id: 5, title: "Innovative Algorithm Token", price: "2.0 ETH", image: "https://picsum.photos/seed/5/300/300" },
  { id: 6, title: "Ancient Wisdom NFT", price: "0.6 ETH", image: "https://picsum.photos/seed/6/300/300" },
]

export default function HomePage() {
  // const [address, setAddress] = useState("0x1234...5678")
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white">
      {/* Hero Section */}
      <section className="text-center py-20">
        <h1 className="text-6xl font-bold mb-4 animate-fade-in-down"></h1>
        <p className="text-xl mb-8 animate-fade-in-up">Empowering creators and innovators in the decentralized world</p>
        <div className="flex justify-center space-x-4">
          <Link href="/upload">
            <Button size="lg" className="animate-pulse">Tokenize IP</Button>
          </Link>
          <Link href="/token_gallery">
            <Button size="lg" variant="outline" className='bg-gradient-to-b from-gray-900 to-gray-800 text-white'>Marketplace</Button>
          </Link>
        </div>
      </section>

      {/* Statement Section */}
      <section className="text-center py-10 bg-gray-800 bg-opacity-50">
        <h2 className="text-3xl font-semibold">Technology • Traditional Knowledge • Art</h2>
      </section>

      {/* Marketplace Grid */}
      <section className="py-16 px-4">
        <h2 className="text-3xl font-semibold mb-8 text-center">Featured Items</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {marketplaceItems.map((item) => (
            <Card key={item.id} className="bg-gray-800 border-gray-700 overflow-hidden transition-transform duration-300 hover:scale-105">
              <CardContent className="p-0">
                <img src={item.image} alt={item.title} className="w-full h-64 object-cover" />
              </CardContent>
              <CardFooter className="flex justify-between items-center">
                <h3 className="text-lg font-semibold">{item.title}</h3>
                <p className="text-green-400 font-bold">{item.price}</p>
              </CardFooter>
            </Card>
          ))}
        </div>
      </section>
      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-12 px-4">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <h3 className="text-xl font-semibold">MaliX Project</h3>
            <p className="text-sm">Empowering innovation through decentralized technology.</p>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-white transition-colors">About Us</a></li>
              <li><a href="#" className="hover:text-white transition-colors">How It Works</a></li>
              <li><a href="#" className="hover:text-white transition-colors">FAQs</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Legal</h4>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Cookie Policy</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Stay Connected</h4>
            <div className="flex space-x-4 mb-4">
              {/* <a href="#" className="hover:text-white transition-colors"><Twitter /></a> */}
              {/* <a href="#" className="hover:text-white transition-colors"><GitHub /></a> */}
              {/* <a href="#" className="hover:text-white transition-colors"><Discord /></a> */}
            </div>
            <form className="flex">
              <Input type="email" placeholder="Your email" className="rounded-r-none" />
              <Button type="submit" className="rounded-l-none">Subscribe</Button>
            </form>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-800 text-center text-sm">
          © {new Date().getFullYear()} MaliX Project. All rights reserved.
        </div>
      </footer>
    </div>
  )
}