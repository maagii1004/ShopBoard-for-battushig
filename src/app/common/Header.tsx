"use client";
import { FaShopware } from "react-icons/fa";
import { ShoppingCart } from 'lucide-react';
import { Facebook } from 'lucide-react';
import { Twitter } from 'lucide-react';
import { Instagram } from 'lucide-react';
import Link from "next/link";
import {
  ClerkProvider,
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from '@clerk/nextjs';
import { useEffect, useState } from 'react';

export default function Header() {
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem('cart') || '[]');
    setCartCount(savedCart.length);
  }, []);

  return (
    <ClerkProvider>
      <header className="pt-4 bg-gradient-to-r from-purple-600 via-purple-500 to-pink-500 text-white p-4 shadow-2xl">
        <section className="flex justify-between items-center px-[15%]">
          <div className="flex gap-7 ">
            <Facebook />
            <Twitter />
            <Instagram />
          </div>
          <div className="flex items-center">
            <FaShopware className="size-12 mr-3" />
            <div className="font-mono flex-col justify-center px-0">
              <p className="font-bold text-3xl">ShopBoard</p>
              <p>Shop smart, live better</p>
            </div>
          </div>
          <div className="flex gap-7">
            <SignedOut>
              <SignInButton />
              <SignUpButton />
            </SignedOut>
            <SignedIn>
              <UserButton />
            </SignedIn>
            <Link href={"/myCart"} className="flex items-center">
            <div className="relative">
              <ShoppingCart />
              {cartCount > 0 && (
                <span className="absolute top-0 right-0 bg-red-600 text-white text-xs font-semibold rounded-full w-5 h-5 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </div>
            </Link>
            
          </div>
        </section>
        <div className="border-gray-400 border-[0.1px] mt-4 mx-[15%]"></div>
        <nav className="">
          <li className="flex justify-center gap-28 pt-1 h-14 items-center">
            <Link href="/">
              <ul className="hover:cursor-pointer hover:shadow-2xl hover:opacity-90">Home</ul>
            </Link>
            <Link href="/product">
              <ul className="hover:cursor-pointer">Market</ul>
            </Link>
            <Link href="/aboutus">
              <ul className="hover:cursor-pointer">About Us</ul>
            </Link>
          </li>
        </nav>
      </header>
    </ClerkProvider>
  );
}
