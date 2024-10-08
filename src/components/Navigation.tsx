import { useState } from 'react';
import { MetaMaskInpageProvider } from '@metamask/providers';
import { Link } from 'react-router-dom';

declare global {
  interface Window {
    ethereum?: MetaMaskInpageProvider;
  }
}

export default function Navigation () {
  const [walletAddress, setWalletAddress] = useState<string | null>(null);

  const connectWallet = async () => {
    if (window.ethereum) {
        try {
            const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' }) as string[];
            if (accounts && accounts.length > 0) {
                setWalletAddress(accounts[0]);  // Set the first account as the wallet address
            } else {
                console.error("No accounts found");
            }
        } catch (error) {
            console.error("User rejected wallet connection", error);
        }
    } else {
        alert('MetaMask is not installed! Please install MetaMask.');
    }
};

  const disconnectWallet = () => {
      setWalletAddress(null);
  };

  const shortenAddress = (address: string) => {
      return address.slice(0, 6) + '...' + address.slice(-4);
  };

  return (
    <div style={{ padding: '30px 0', display: 'flex', justifyContent: 'center' }}>
      <nav style={{  display: 'flex', gap: '20px', border: 'solid, 1px, gray', padding: '10px', borderRadius: '5px' }}>
        <button style={{ backgroundColor: '#7878ec', borderRadius: '10px', padding: '10px 20px', border: 'none', color: 'white', fontWeight: 'bold' }}>
           About
        </button>
        <button style={{ backgroundColor: 'white', padding: '10px 20px', border: 'none', fontWeight: 'bold' }}>Log In</button>
        <button style={{ backgroundColor: 'white', padding: '10px 20px', border: 'none', fontWeight: 'bold' }}>Sign Up</button>
        <button style={{ backgroundColor: 'white', padding: '10px 20px', border: 'none', fontWeight: 'bold' }}>Buy</button>
        <Link style={{ padding: '10px 20px', border: 'none', fontWeight: 'bold', textDecoration: "none", color: "black" }} to="/tokenize">Tokenize</Link>
        {!walletAddress ? (
                    <button
                        style={{ backgroundColor: 'black', borderRadius: '10px', padding: '10px 20px', border: 'none', color: 'white', fontWeight: 'bold', cursor: 'pointer' }}
                        onClick={connectWallet}
                    >
                        Connect Wallet
                    </button>
                ) : (
                    <>
                        <button style={{ backgroundColor: 'black', borderRadius: '10px', padding: '10px 20px', border: 'none', color: 'white', fontWeight: 'bold' }}>
                            {shortenAddress(walletAddress)}
                        </button>
                        <button
                            style={{ backgroundColor: 'red', borderRadius: '10px', padding: '10px 20px', border: 'none', color: 'white', fontWeight: 'bold', cursor: 'pointer' }}
                            onClick={disconnectWallet}
                        >
                            Disconnect
                        </button>
                    </>
                )}
      </nav>
    </div>
  );
}