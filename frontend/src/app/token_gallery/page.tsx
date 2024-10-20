"use client";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { ShoppingCart, Search, Filter, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Navbar from "@/components/navbar";
import { useAccount, useReadContract } from "wagmi";
// import { parseEther, formatEther } from "viem";

// Import the ABI
import { ABI } from "@/contracts/IPRegistrationNFT";

// Replace with your contract address
const CONTRACT_ADDRESS = "0xc00d46Ef2581717EA065A1290201106B85Ce20Ca";

interface IPMetadata {
  title: string;
  description: string;
  creationDate: bigint;
  ipfsHash: string;
}

interface TokenData {
  id: number;
  name: string;
  description: string;
  creator: string;
  price: string;
  image: string;
  category: string;
  creationDate: number;
}

export default function TokenGallery() {
  const { address } = useAccount();
  const [tokens, setTokens] = useState<TokenData[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [hoveredToken, setHoveredToken] = useState<number | null>(null);

  const categories = ["All", "Art", "Tech", "Knowledge"];

  // Fetch total supply of tokens
  const { data: totalSupply } = useReadContract({
    abi: ABI,
    address: CONTRACT_ADDRESS as `0x${string}`,
    functionName: "totalSupply",
  });

  // Fetch the latest token details
  const { data: latestTokenDetails } = useReadContract({
    abi: ABI,
    address: CONTRACT_ADDRESS as `0x${string}`,
    functionName: "getIPMetadata",
    args: totalSupply
      ? [BigInt(totalSupply.toString()) - BigInt(1)]
      : undefined,
    enabled: !!totalSupply,
  });

  useEffect(() => {
    if (latestTokenDetails && totalSupply) {
      const typedTokenDetails = latestTokenDetails as IPMetadata;
      const newToken: TokenData = {
        id: Number(totalSupply.toString()) - 1,
        name: typedTokenDetails.title,
        description: typedTokenDetails.description,
        creator: address || "Unknown",
        price: "0.01 ETH", // You might want to fetch the actual price if available
        image: `https://ipfs.io/ipfs/${typedTokenDetails.ipfsHash}`,
        category: "Art", // You might want to add category to your smart contract
        creationDate: Number(typedTokenDetails.creationDate),
      };
      setTokens((prevTokens) => [...prevTokens, newToken]);
    }
  }, [latestTokenDetails, totalSupply, address]);

  const filteredTokens = tokens.filter(
    (token) =>
      token.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (selectedCategory === "All" || token.category === selectedCategory)
  );

  const [domLoaded, setDomLoaded] = useState(false);

  useEffect(() => {
    setDomLoaded(true);
  }, []);

  if (!domLoaded) {
    return null; // or a loading spinner
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-gray">
      <Navbar />
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
            {categories.map((category) => (
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
            {filteredTokens.map((token) => (
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
                    <Image
                      src={token.image}
                      alt={token.name}
                      width={300}
                      height={300}
                      layout="responsive"
                      objectFit="cover"
                    />
                    {hoveredToken === token.id && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center"
                      >
                        <Link href={`/token/${token.id}`}>
                          <Button className="bg-white text-black hover:bg-gray-200">
                            View Details
                          </Button>
                        </Link>
                      </motion.div>
                    )}
                  </CardContent>
                  <CardFooter className="flex flex-col items-start p-4">
                    <h3 className="text-xl font-semibold mb-1">{token.name}</h3>
                    <p className="text-sm text-gray-400 mb-2">
                      by {token.creator}
                    </p>
                    <p className="text-xs text-gray-500 mb-2">
                      Created:{" "}
                      {new Date(token.creationDate * 1000).toLocaleDateString()}
                    </p>
                    <div className="flex justify-between items-center w-full">
                      <span className="text-green-400 font-bold">
                        {token.price}
                      </span>
                      <Button
                        size="sm"
                        className="bg-blue-500 hover:bg-blue-600"
                      >
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

        {filteredTokens.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center mt-12"
          >
            <Sparkles className="h-16 w-16 text-gray-500 mx-auto mb-4" />
            <h2 className="text-2xl font-semibold mb-2">No tokens found</h2>
            <p className="text-gray-400">
              Try adjusting your search or filter to find more tokens.
            </p>
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
  );
}
