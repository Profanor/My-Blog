"use client"
import { useState, useEffect } from 'react';

const ScrollToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const isBottom = window.innerHeight + window.scrollY >= document.body.offsetHeight;
      setIsVisible(isBottom);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const buttonStyle = {
    position: 'fixed',
    bottom: '50px',
    right: '15px',
    backgroundColor: 'transparent',
    color: '#fff',
    border: '2px solid white',
    cursor: 'pointer',
    display: isVisible ? 'block' : 'none',
    width: '50px',
    height: '50px',
    textAlign: 'center',
    fontSize: '24px',
    transform: 'rotate(90deg)', 
  };

  return (
    <button 
      style={buttonStyle}
      onClick={scrollToTop}
    >
      <span style={{ position: 'relative', bottom: '3px' }}>&lt;</span>
    </button>
  );
};

export default ScrollToTopButton;
