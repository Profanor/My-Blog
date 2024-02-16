"use client";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import debounce from 'lodash/debounce'; 
import { useRouter } from 'next/navigation'; 

const Navbar = () => {
  const router = useRouter(); // Use useRouter hook

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false); // State variable to track mobile menu open/close
  const [windowWidth, setWindowWidth] = useState(0); // State variable to track window width
  const [activeLink, setActiveLink] = useState(''); // State variable to track active link
  
  // Function to handle smooth scroll
  const smoothScrollTo = debounce((elementId) => {
    const element = document.getElementById(elementId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, 300);

  // Function to toggle mobile menu
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  }

  // Function to close mobile menu when a link is clicked
  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  }

  // Effect to update window width
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    handleResize(); // Set initial window width
    window.addEventListener('resize', handleResize); // Add event listener for window resize
    return () => {
      window.removeEventListener('resize', handleResize); 
    };
  }, []);

  return (
    <nav className="fixed top-0 z-10 w-full bg-black bg-opacity-75 p-4 flex justify-between items-center">
      <div className="flex items-center">
        <Link href="/" className="flex gap-2 items-center" onClick={closeMobileMenu}>
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
      {/* Conditional rendering for mobile menu */}
      {windowWidth <= 768 ? (
        <div className="flex items-center">
          <button className="text-white focus:outline-none" onClick={toggleMobileMenu}>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {isMobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      ) : (
        <div className="flex gap-4">
          {/* Conditionally render About and Featured links based on the route */}
          {router.pathname !== "/posts" && (
            <>
              <div>
                <Link href="/" className={`text-white ${activeLink === 'about' ? 'text-orange-500' : ''}`} onClick={(e) => { e.preventDefault(); smoothScrollTo("about"); setActiveLink('about'); }}>
                  About
                </Link>
              </div>
              <div>
                <Link href="/" className={`text-white ${activeLink === 'featured' ? 'text-orange-500' : ''}`} onClick={(e) => { e.preventDefault(); smoothScrollTo("featured"); setActiveLink('featured'); }}>
                  Featured
                </Link>
              </div>
            </>
          )}
          <div>
            <Link href="/posts/new" className="text-white mr-10" onClick={closeMobileMenu}>Create a Post</Link>
          </div>
        </div>
      )}
      {/* Conditional rendering for mobile menu */}
      {isMobileMenuOpen && (
        <div className="absolute top-full left-0 w-full bg-black bg-opacity-75 p-4 flex flex-col items-center">
          <div>
            <Link href="/" className="text-white block my-2" onClick={(e) => { e.preventDefault(); smoothScrollTo("about"); setActiveLink('about'); }}>
              About
            </Link>
          </div>
          <div>
            <Link href="/" className="text-white block my-2" onClick={(e) => { e.preventDefault(); smoothScrollTo("featured"); setActiveLink('featured'); }}>
              Featured
            </Link>
          </div>
          <div>
            <Link href="/posts/new" className="text-white block my-2" onClick={closeMobileMenu}>Create a Post</Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
