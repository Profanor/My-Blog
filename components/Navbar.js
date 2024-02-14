"use client";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import debounce from 'lodash/debounce'; 

const Navbar = () => {
  // Function to handle smooth scroll
  const smoothScrollTo = debounce((elementId) => {
    const element = document.getElementById(elementId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, 300); // Adjust the delay time according to your preference

  return (
    <nav className="fixed top-0 z-10 w-full bg-black bg-opacity-75 p-4 flex justify-between items-center">
      <div className="flex items-center">
        <Link href="/" className="flex gap-2 items-center">
          <div className="ml-10">
            <Image 
              src="/images/logo2.png"
              alt="anime logo"
              width={30}
              height={30}
              className="object-contain rounded-full"
            />
          </div>
          <p className="logo-text text-white">Apex Blog</p>
        </Link>
      </div>
      <div className="flex gap-4">
        <div>
          <Link href="/" className="text-white" onClick={(e) => { e.preventDefault(); smoothScrollTo("about"); }}>About</Link>
        </div>
        <div>
          <Link href="/" className="text-white" onClick={(e) => { e.preventDefault(); smoothScrollTo("featured"); }}>Featured</Link>
        </div>
        <div>
          <Link href="/posts/new" className="text-white mr-10">Create a Post</Link>
        </div>
      </div>
    </nav>
  )
}

export default Navbar;