'use client'

import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { FileCheck, Upload } from 'lucide-react'
import { motion } from "framer-motion"
import { pinata } from "@/utils/config"
import Navbar from '@/components/navbar'

export default function TokenizePage() {
  const [address, setAddress] = useState("0x1234...5678")
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    ipfsHash: ""
  })
  const [file, setFile] = useState<File>()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }))
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFile(e.target?.files?.[0])
  }

  const uploadFile = async () => {
    if (!file) {
      alert("No file selected")
      return
    }
    try {
      setIsSubmitting(true)
      const keyRequest = await fetch("/api/key")
      const keyData = await keyRequest.json()
      const upload = await pinata.upload.file(file).key(keyData.JWT)
      console.log(upload)
      setFormData(prevData => ({
        ...prevData,
        ipfsHash: upload.IpfsHash
      }))
      setIsSubmitting(false)
    } catch (e) {
      console.error(e)
      setIsSubmitting(false)
      alert("Trouble uploading file")
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.ipfsHash) {
      alert("Please upload a file first")
      return
    }
    setIsSubmitting(true)
    // Simulate API call for tokenization
    await new Promise(resolve => setTimeout(resolve, 2000))
    console.log("Asset tokenized:", formData)
    setIsSubmitting(false)
    // Reset form after submission
    setFormData({ name: "", description: "", ipfsHash: "" })
    setFile(undefined)
  }

  const [domLoaded, setDomLoaded] = useState(false);

  useEffect(() => {
    setDomLoaded(true);
  }, []);

  if (!domLoaded) {
    return null // or a loading spinner
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white">
      <Navbar />
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
                  <label htmlFor="file" className="block text-sm font-medium mb-1">File</label>
                  <Input
                    id="file"
                    type="file"
                    onChange={handleFileChange}
                    className="bg-gray-700 border-gray-600"
                  />
                </div>
                <Button type="button" onClick={uploadFile} disabled={!file || isSubmitting}>
                  {isSubmitting ? (
                    <motion.div
                      className="flex items-center"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    >
                      <Upload className="mr-2 h-4 w-4 animate-bounce" />
                      Uploading...
                    </motion.div>
                  ) : (
                    <>Upload to IPFS</>
                  )}
                </Button>
                {formData.ipfsHash && (
                  <div>
                    <label className="block text-sm font-medium mb-1">IPFS Hash</label>
                    <Input
                      value={formData.ipfsHash}
                      readOnly
                      className="bg-gray-700 border-gray-600"
                    />
                  </div>
                )}
              </div>
              <CardFooter className="flex justify-end mt-4 p-0">
                <Button type="submit" disabled={isSubmitting || !formData.ipfsHash}>
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