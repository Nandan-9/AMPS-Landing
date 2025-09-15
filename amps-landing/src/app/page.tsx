"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

const clues = [
  {
    title:
      "My body in the Louvre, a canvas for a star and a famous pose. The numbers left behind follow a divine sequence.",
    password: "fibonacci",
  },
  {
    title:
      "A dying message, an anagram of fire and sainthood. Unscramble it to reveal the artist's most enigmatic masterpiece.",
    password: "monalisa",
  },
  {
    title:
      "I am a portable vault, a cylinder of marble and letters. To open me, you need a five-letter keystone of ancient wisdom.",
    password: "sofia",
  },
  {
    title:
      "The legend speaks of a cup, but the Priory protects a royal bloodline. The true Grail is not an object, but a woman scorned by history.",
    password: "magdalene",
  },
  {
    title:
      "The final truth lies beneath the glass pyramid, where blade and chalice unite. Solve this to name the entire chronicle.",
    password: "davincicode",
  },
];

export default function Home() {
  const [showSplash, setShowSplash] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [input, setInput] = useState("");
  const [error, setError] = useState("");
  const [won, setWon] = useState(false);

  // Hide splash after 2.5 seconds
  useEffect(() => {
    const timer = setTimeout(() => setShowSplash(false), 2500);
    return () => clearTimeout(timer);
  }, []);

  const checkPassword = (e?: React.FormEvent) => {
    if (e) e.preventDefault();

    if (input.trim().toLowerCase() === clues[currentIndex].password) {
      setError("");
      if (currentIndex < clues.length - 1) {
        setCurrentIndex(currentIndex + 1); // ✅ always move forward only
        setInput("");
      } else {
        setWon(true);
      }
    } else {
      setError("❌ Incorrect password. The secret remains hidden...");
    }
  };

  // 🎬 Splash Screen (only first time)
  if (showSplash) {
    return (
      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 1.2 }}
        className="flex items-center justify-center h-screen bg-black"
      >
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          <Image
            src="/logo.png"
            alt="Logo"
            width={150}
            height={150}
            className="drop-shadow-lg"
          />
        </motion.div>
      </motion.main>
    );
  }

  // 🎉 Winning Screen
  if (won) {
    return (
      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        className="flex flex-col items-center justify-center h-screen bg-black text-white space-y-6 text-center px-4"
      >
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <Image src="/logo.png" alt="Secret Logo" width={120} height={120} />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 1.5 }}
          className="text-3xl md:text-5xl font-semibold"
        >
          Congratulations!
          <br />
          You've Cracked the Code.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5, delay: 0.5 }}
          className="text-lg md:text-xl text-gray-300"
        >
          The movie is{" "}
          <span className="font-bold text-blue-400">The Da Vinci Code</span>.
        </motion.p>
      </motion.main>
    );
  }

  // 🔐 Game Screen
  return (
    <main className="flex flex-col items-center justify-center h-screen bg-black text-white space-y-6 px-4">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1 }}
        className="absolute top-8"
      >
        <Image src="/logo.png" alt="Logo" width={100} height={100} />
      </motion.div>

      <AnimatePresence mode="wait">
        <motion.h2
          key={currentIndex}
          initial={{ opacity: 0, y: 30, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -30, scale: 0.9 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-xl md:text-2xl font-semibold mb-6 text-center max-w-lg tracking-wide"
        >
          {clues[currentIndex].title}
        </motion.h2>
      </AnimatePresence>

      <form onSubmit={checkPassword} className="flex flex-col items-center">
        <motion.input
          type="text"
          placeholder="Enter the password..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="w-64 px-4 py-2 rounded-md bg-gray-800/70 border border-gray-700 focus:outline-none focus:border-blue-500 text-white text-center backdrop-blur-md shadow-lg"
          animate={error ? { x: [-10, 10, -10, 0] } : {}}
          transition={{ duration: 0.4 }}
        />

        <motion.button
          type="submit"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="mt-5 px-8 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 transition text-lg font-medium shadow-lg tracking-wide"
        >
          Submit
        </motion.button>
      </form>

      {error && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mt-4 text-red-400 text-sm"
        >
          {error}
        </motion.p>
      )}
    </main>
  );
}
