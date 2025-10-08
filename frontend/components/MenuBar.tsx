'use client';

import Link from 'next/link';
import React from 'react';
import { Button } from './ui/button';
import { useState } from "react";
import { Menu } from "lucide-react"; // ícono de hamburguesa
import { useUser } from './context/AuthContext';

export default function MenuBar() {

    const [menuOpen, setMenuOpen] = useState(false);
    const {user, setUser} = useUser();
    
    return(
        <>
            <header className="px-6 py-4 max-w-7xl mx-auto">
              {/* NAVIGATION */}
              <div className="flex items-center justify-between">
                <nav className="flex-1 flex justify-center gap-6 sm:justify-start">
                  <Link href="/" className="text-lg font-medium text-gray-900 hover:text-gray-600">
                    Home
                  </Link>
                  <Link href="/about" className="text-lg font-medium text-gray-900 hover:text-gray-600">
                    About
                  </Link>
                  <Link href="/contact" className="text-lg font-medium text-gray-900 hover:text-gray-600">
                    Contact
                  </Link>
                </nav>
  
                {/* DESKTOP LINKS */}
                <div className="hidden md:flex items-center space-x-4">
                  {user?
                  <Link href="/dashboard" className="text-lg font-medium text-gray-900 hover:text-gray-600">
                    Dashboard
                  </Link>:
                  <Link href="/signin" className="text-lg font-medium text-gray-900 hover:text-gray-600">
                    Sign in
                  </Link>
                  }
                  <Link href="/get-started" className="text-lg font-medium text-gray-900 hover:text-gray-600">
                    Get started
                  </Link>
                  <Button className="bg-gray-900 hover:bg-gray-800 text-white px-6 py-2 rounded-full">
                    Blogs
                  </Button>
                </div>
  
                {/* MOBILE MENU ICON */}
                <button
                  onClick={() => setMenuOpen(!menuOpen)}
                  className="md:hidden text-gray-900"
                >
                  <Menu className="w-6 h-6" />
                </button>
              </div>
  
              {/* MOBILE MENU DROPDOWN */}
              {menuOpen && (
                <div className="mt-4 flex flex-col items-center space-y-4 md:hidden">
                  {user?
                  <Link href="/dashboard" className="text-lg font-medium text-gray-900 hover:text-gray-600">
                    Dashboard
                  </Link>:
                  <Link href="/signin" className="text-lg font-medium text-gray-900 hover:text-gray-600">
                    Sign in
                  </Link>
                  }
                  <Link href="/get-started" className="text-lg font-medium text-gray-900 hover:text-gray-600">
                    Get started
                  </Link>
                  <Button className="bg-gray-900 hover:bg-gray-800 text-white px-6 py-2 rounded-full">
                    Blogs
                  </Button>
                </div>
              )}
            </header>
        </>
    )
}
