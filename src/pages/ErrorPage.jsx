import React, { useState, useEffect } from 'react';
import { NavLink } from "react-router-dom";
import { motion, useAnimation } from 'framer-motion';
import { AlertOctagon, ChevronRight, Home, MessageCircle } from 'lucide-react';

function ErrorPage() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const backgroundControls = useAnimation();

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    backgroundControls.start({
      background: `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(255, 100, 100, 0.2), rgba(100, 100, 255, 0.2) 70%, rgba(255, 255, 255, 0.1) 100%)`,
    });
  }, [mousePosition, backgroundControls]);

  return (
    <div className="relative min-h-screen flex items-center justify-center p-4 bg-gray-800 overflow-hidden">
      <motion.div
        className="absolute inset-0 z-0"
        animate={backgroundControls}
        transition={{ duration: 2, ease: "easeInOut" }}
      />
      <div className="absolute inset-0 z-10 opacity-50">
        {[...Array(150)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full"
            initial={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
              scale: Math.random() * 0.8 + 0.5,
              backgroundColor: `hsla(${Math.random() * 360}, 100%, 80%, 0.8)`,
            }}
            animate={{
              y: [null, Math.random() * window.innerHeight],
            }}
            transition={{
              duration: Math.random() * 10 + 5,
              repeat: Infinity,
              repeatType: "reverse",
            }}
            style={{
              width: `${Math.random() * 10 + 5}px`,
              height: `${Math.random() * 10 + 5}px`,
            }}
          />
        ))}
      </div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        className="relative z-20 bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 p-8 max-w-lg w-full text-center rounded-lg shadow-2xl border border-white border-opacity-30"
      >
        <motion.div
          animate={{ 
            rotate: [0, 360],
            scale: [1, 1.3, 1],
          }}
          transition={{ 
            duration: 2,
            repeat: Infinity,
            repeatType: "loop",
          }}
          className="mb-8"
        >
          <AlertOctagon className="w-32 h-32 text-yellow-300 mx-auto" />
        </motion.div>

        <div className="absolute inset-0 flex flex-col items-center justify-center text-center z-30">
          <motion.h2 
            className="text-9xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-red-600 mb-4"
            animate={{ 
              textShadow: ["0 0 30px rgba(255, 99, 71, 0.7)", "0 0 60px rgba(255, 99, 71, 1)", "0 0 30px rgba(255, 99, 71, 0.7)"]
            }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            404
          </motion.h2>
          
          <h4 className="text-4xl font-extrabold text-white mb-4">
            Oops! Page Not Found
          </h4>
          
          <p className="text-gray-200 mb-8 text-lg">
            It seems we’ve hit a dead end. The page you're looking for doesn’t exist.
          </p>

          <div className="space-y-4">
            <NavLink 
              to="/" 
              className="group flex items-center justify-center w-full bg-gradient-to-r from-green-400 to-blue-500 hover:from-green-500 hover:to-blue-600 text-white font-bold py-3 px-6 rounded-full transition duration-300"
            >
              <Home className="mr-2" />
              Go Home
              <motion.div
                className="ml-2"
                animate={{ x: [0, 10, 0] }}
                transition={{ duration: 1, repeat: Infinity }}
              >
                <ChevronRight />
              </motion.div>
            </NavLink>
            <NavLink 
              to="/contact" 
              className="group flex items-center justify-center w-full bg-gradient-to-r from-pink-400 to-red-500 hover:from-pink-500 hover:to-red-600 text-white font-bold py-3 px-6 rounded-full transition duration-300"
            >
              <MessageCircle className="mr-2" />
              Contact Us
              <motion.div
                className="ml-2"
                animate={{ x: [0, 10, 0] }}
                transition={{ duration: 1, repeat: Infinity }}
              >
                <ChevronRight />
              </motion.div>
            </NavLink>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default ErrorPage;
