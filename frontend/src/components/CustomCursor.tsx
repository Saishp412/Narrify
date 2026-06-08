'use client';

import { useEffect, useRef, useState } from 'react';

interface CursorPosition {
  x: number;
  y: number;
}

const CustomCursor = () => {
  const [position, setPosition] = useState<CursorPosition>({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const [isLinkHovering, setIsLinkHovering] = useState(false);
  const [isButtonHovering, setIsButtonHovering] = useState(false);
  const [isTextHovering, setIsTextHovering] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  
  const cursorDotRef = useRef<HTMLDivElement>(null);
  const cursorCircleRef = useRef<HTMLDivElement>(null);
  const cursorLinkHoverRef = useRef<HTMLDivElement>(null);
  const cursorButtonHoverRef = useRef<HTMLDivElement>(null);
  const cursorTextRef = useRef<HTMLDivElement>(null);
  const animationFrameRef = useRef<number | null>(null);

  useEffect(() => {
    setIsMounted(true);
    // Remove no-js class if JavaScript is available
    document.body.classList.remove('no-js');

    const updateCursorPosition = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseDown = () => setIsActive(true);
    const handleMouseUp = () => setIsActive(false);
    const handleMouseEnter = () => {
      setIsVisible(true);
      if (cursorDotRef.current) {
        cursorDotRef.current.style.opacity = '1';
      }
      if (cursorCircleRef.current) {
        cursorCircleRef.current.style.opacity = '0.5';
      }
    };
    const handleMouseLeave = () => {
      setIsVisible(false);
      // Hide all cursor elements when leaving window
      if (cursorDotRef.current) cursorDotRef.current.style.opacity = '0';
      if (cursorCircleRef.current) cursorCircleRef.current.style.opacity = '0';
      if (cursorLinkHoverRef.current) cursorLinkHoverRef.current.style.opacity = '0';
      if (cursorButtonHoverRef.current) cursorButtonHoverRef.current.style.opacity = '0';
      if (cursorTextRef.current) cursorTextRef.current.style.opacity = '0';
    };

    const handleElementHover = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      
      // Reset all states
      setIsHovering(false);
      setIsLinkHovering(false);
      setIsButtonHovering(false);
      setIsTextHovering(false);
      
      // Check if hovering over links
      if (
        target.matches('a, [role="link"]') ||
        target.closest('a, [role="link"]')
      ) {
        setIsLinkHovering(true);
        setIsHovering(true);
      }
      
      // Check if hovering over buttons
      else if (
        target.matches('button, .btn, .glass-button, [role="button"]') ||
        target.closest('button, .btn, .glass-button, [role="button"]')
      ) {
        setIsButtonHovering(true);
        setIsHovering(true);
      }
      
      // Check if hovering over text inputs
      else if (
        target.matches('input[type="text"], input[type="email"], textarea, [contenteditable="true"]') ||
        target.closest('input[type="text"], input[type="email"], textarea, [contenteditable="true"]')
      ) {
        setIsTextHovering(true);
        setIsHovering(false);
      }
      
      // Check if hovering over other interactive elements
      else if (
        target.matches('select, input[type="checkbox"], input[type="radio"]') ||
        target.closest('select, input[type="checkbox"], input[type="radio"]')
      ) {
        setIsHovering(true);
      }
    };

    // Smooth cursor animation - single position for both elements
    const animateCursor = () => {
      // Update dot position immediately
      if (cursorDotRef.current && isVisible) {
        cursorDotRef.current.style.left = `${position.x}px`;
        cursorDotRef.current.style.top = `${position.y}px`;
        
        // Apply hover/active states to dot
        if (isHovering || isLinkHovering || isButtonHovering) {
          cursorDotRef.current.classList.add('hover');
        } else {
          cursorDotRef.current.classList.remove('hover');
        }
        
        if (isActive) {
          cursorDotRef.current.classList.add('active');
        } else {
          cursorDotRef.current.classList.remove('active');
        }
      }
      
      // Update circle position - same position as dot for visibility
      if (cursorCircleRef.current && isVisible && !isTextHovering) {
        cursorCircleRef.current.style.left = `${position.x}px`;
        cursorCircleRef.current.style.top = `${position.y}px`;
        cursorCircleRef.current.style.opacity = isTextHovering ? '0' : (isHovering ? '0.3' : '0.5');
        
        // Apply hover/active states to circle
        if (isHovering) {
          cursorCircleRef.current.classList.add('hover');
        } else {
          cursorCircleRef.current.classList.remove('hover');
        }
        
        if (isActive) {
          cursorCircleRef.current.classList.add('active');
        } else {
          cursorCircleRef.current.classList.remove('active');
        }
      } else if (cursorCircleRef.current) {
        cursorCircleRef.current.style.opacity = '0';
      }
      
      // Link hover cursor
      if (cursorLinkHoverRef.current) {
        cursorLinkHoverRef.current.style.left = `${position.x}px`;
        cursorLinkHoverRef.current.style.top = `${position.y}px`;
        cursorLinkHoverRef.current.style.opacity = isLinkHovering && isVisible ? '0.6' : '0';
        cursorLinkHoverRef.current.classList.toggle('active', isLinkHovering);
      }
      
      // Button hover cursor
      if (cursorButtonHoverRef.current) {
        cursorButtonHoverRef.current.style.left = `${position.x}px`;
        cursorButtonHoverRef.current.style.top = `${position.y}px`;
        cursorButtonHoverRef.current.style.opacity = isButtonHovering && isVisible ? '0.5' : '0';
        cursorButtonHoverRef.current.classList.toggle('active', isButtonHovering);
      }
      
      // Text cursor
      if (cursorTextRef.current) {
        cursorTextRef.current.style.left = `${position.x}px`;
        cursorTextRef.current.style.top = `${position.y}px`;
        cursorTextRef.current.style.opacity = isTextHovering && isVisible ? '0.8' : '0';
        cursorTextRef.current.classList.toggle('active', isTextHovering);
      }
      
      animationFrameRef.current = requestAnimationFrame(animateCursor);
    };

    document.addEventListener('mousemove', updateCursorPosition);
    document.addEventListener('mousemove', handleElementHover);
    document.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mouseenter', handleMouseEnter);
    document.addEventListener('mouseleave', handleMouseLeave);

    // Start animation loop
    animateCursor();

    return () => {
      document.removeEventListener('mousemove', updateCursorPosition);
      document.removeEventListener('mousemove', handleElementHover);
      document.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseenter', handleMouseEnter);
      document.removeEventListener('mouseleave', handleMouseLeave);
      
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      
      // Restore no-js class
      document.body.classList.add('no-js');
    };
  }, [position, isVisible, isHovering, isActive, isLinkHovering, isButtonHovering, isTextHovering]);

  // Don't render cursor on server or before mount
  if (!isMounted) {
    return null;
  }

  return (
    <>
      {/* Main cursor dot */}
      <div
        ref={cursorDotRef}
        className="cursor-dot"
      />
      
      {/* Main cursor circle */}
      <div
        ref={cursorCircleRef}
        className="cursor-circle"
      />
      
      {/* Link hover cursor */}
      <div
        ref={cursorLinkHoverRef}
        className="cursor-link-hover"
      />
      
      {/* Button hover cursor */}
      <div
        ref={cursorButtonHoverRef}
        className="cursor-button-hover"
      />
      
      {/* Text cursor */}
      <div
        ref={cursorTextRef}
        className="cursor-text"
      />
    </>
  );
};

export default CustomCursor;
