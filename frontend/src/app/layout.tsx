import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
// import Navbar from "@/components/navbar";
import "@coinbase/onchainkit/styles.css";
import { cookieToInitialState } from "wagmi";
import { Providers } from "../context/providers";
import { headers } from "next/headers";
// import { getConfig } from "../config/wagmi";
import '@rainbow-me/rainbowkit/styles.css';
import dynamic from "next/dynamic";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: 'MaliX Template',
  description: 'Built with OnchainKit',
  openGraph: {
    title: 'Onchain App Template',
    description: 'Built with OnchainKit',
    images: [`${process.env.NEXT_PUBLIC_URL}/vibes/vibes-19.png`],
  },
};
const OnchainProviders = dynamic(
  () => import('src/components/OnChainProviders'),
  {
    ssr: false,
  },
);

export default function RootLayout(props: { children: React.ReactNode }) {
  // const initialState = cookieToInitialState(
  //   getConfig(),
  //   headers().get("cookie")
  // );
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {/* <Navbar /> */}
        <OnchainProviders >{props.children}</OnchainProviders>
      </body>
    </html>
  );
}
