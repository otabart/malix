'use client'

import React, { useEffect, useState } from 'react';
import { Button } from './ui/button';
import { Coins, ShoppingCart, LogOut } from 'lucide-react';
import Link from 'next/link';

const Navbar = () => {
    const [address, setAddress] = useState('');

    useEffect(() => {
        checkIfWalletConnected();
    }, []);

    const checkIfWalletConnected = async () => {
        try {
            const { ethereum } = window;
            if (!ethereum) {
                console.log("Make sure you have Metamask installed");
                return;
            }

            const accounts = await ethereum.request({ method: 'eth_accounts' });
            if (accounts.length !== 0) {
                setAddress(accounts[0]);
            }
        } catch (error) {
            console.error("Error checking if wallet is connected:", error);
        }
    };

    const connectWallet = async () => {
        try {
          const { ethereum } = window;
          if (!ethereum) {
            alert("Please install MetaMask!");
            return;
          }
    
          const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
          setAddress(accounts[0]);
        } catch (error) {
          console.error("Error connecting to MetaMask:", error);
        }
      };
    
      const disconnectWallet = () => {
        setAddress('');
      };

    return (
      <nav className="flex justify-between items-center p-4 bg-gradient-to-b from-gray-900 to-gray-800 text-gray bg-opacity-50 backdrop-blur-md">
        <div className="text-2xl font-bold">
            <Link href="/" className='p-5 bg-0'>
                MaliX
            </Link>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline">
            <Coins className="mr-2 h-4 w-4" /> Tokenize
          </Button>
          {address ? (
            <>
              <Button variant="outline">{`${address.slice(0, 6)}...${address.slice(-4)}`}</Button>
              <Button variant="outline" onClick={disconnectWallet}>
                <LogOut className="mr-2 h-4 w-4" /> Disconnect
              </Button>
            </>
          ) : (
            <Button variant="outline" onClick={connectWallet}>Connect Wallet</Button>
          )}
          <Button variant="outline">
            <ShoppingCart className="mr-2 h-4 w-4" /> Buy
          </Button>
        </div>
      </nav>
    );
};

export default Navbar;