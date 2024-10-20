/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'

import { useState } from 'react'
import { useRouter } from 'next/router'
import Image from 'next/image'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Coins, Clock, User, Tag } from 'lucide-react'
import Link from 'next/link'

// Mock data for a single item
const item = {
  id: 1,
  title: "Digital Art Masterpiece",
  description: "A stunning piece of digital art that combines traditional techniques with cutting-edge technology. This unique NFT represents the convergence of art and blockchain, offering collectors a rare opportunity to own a piece of digital history.",
  price: "2.5 ETH",
  creator: "0x742d35Cc6634C0532925a3b844Bc454e4438f44e",
  createdAt: "2023-05-15T10:30:00Z",
  image: "https://picsum.photos/seed/1/300/300",
  tags: ["Digital Art", "NFT", "Blockchain"]
}

export default function ItemDetailView() {
  const [isLoading, setIsLoading] = useState(false)

  const handleUpdate = () => {
    setIsLoading(true)
    
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white p-8">
      <Card className="max-w-4xl mx-auto bg-gray-800 border-gray-700">
        <CardHeader>
          <CardTitle className="text-3xl font-bold">{item.title}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-8">
            <div className="md:w-1/2">
              <Image
                src={item.image}
                alt={item.title}
                width={400}
                height={400}
                className="rounded-lg object-cover w-full h-auto"
              />
            </div>
            <div className="md:w-1/2 space-y-4">
              <p className="text-gray-300">{item.description}</p>
              <div className="flex items-center gap-2">
                <Coins className="text-yellow-500" />
                <span className="font-bold text-2xl">{item.price}</span>
              </div>
              <div className="flex items-center gap-2">
                <User className="text-blue-400" />
                <span className="text-sm text-gray-400">Created by: {item.creator}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="text-green-400" />
                <span className="text-sm text-gray-400">Created on: {new Date(item.createdAt).toLocaleDateString()}</span>
              </div>
              <div className="flex flex-wrap gap-2">
                <Tag className="text-purple-400" />
                {item.tags.map((tag, index) => (
                  <Badge key={index} variant="secondary">{tag}</Badge>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-end">
          <Link href={`/update_token/`}>
            <Button onClick={handleUpdate} disabled={isLoading}>
              {isLoading ? "Navigating..." : "Update Item"}
            </Button>
          </Link>
        </CardFooter>
      </Card>
    </div>
  )
}