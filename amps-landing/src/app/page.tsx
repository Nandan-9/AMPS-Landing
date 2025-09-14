"use client";

import { useState } from "react";
import { motion } from "framer-motion";

const clues = [
  { title: "Beneath the ticking hands of time, secrets wait in silence.", password: "time42" },
  { title: "When shadows grow longer, the truth hides in plain sight.", password: "shade9" },
  { title: "The key lies not in the stars, but in the spaces between.", password: "nova77" },
  { title: "What is broken can still point the way forward.", password: "fract5" },
  { title: "Only those who look twice will see the hidden path.", password: "echo21" },
];

export default function Home() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [input, setInput] = useState("");
  const [error, setError] = useState("");
  const [won, setWon] = useState(false);

  const checkPassword = () => {
    if (input.trim() === clues[currentIndex].password) {
      setError("");
      if (currentIndex < clues.length - 1) {
        setCurrentIndex(currentIndex + 1);
        setInput("");
      } else {
        setWon(true); // final screen
      }
    } else {
      setError("Wrong password, try again.");
    }
  };

  if (won) {
    return (
        <motion.main
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="flex items-center justify-center h-screen bg-black text-white"
        >
          <motion.h1
              initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
              className="text-3xl md:text-5xl font-semibold text-center"
          >
            You Won the Game
          </motion.h1>
        </motion.main>
    );
  }

  return (
      <main className="flex flex-col items-center justify-center h-screen bg-black text-white space-y-6 px-4">
          <h2 className="text-xl font-medium mb-4">{clues[currentIndex].title}</h2>

          <input
              type="password"
              placeholder="Enter password"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="w-1/5 px-4 py-2 rounded-md bg-gray-800 border border-gray-700 focus:outline-none focus:border-blue-500 text-white"
          />

          <button
              onClick={checkPassword}
              className="mt-4 px-6 py-2 rounded-md bg-blue-600 hover:bg-blue-700 transition"
          >
            Submit
          </button>

          {error && <p className="mt-3 text-red-400 text-sm">{error}</p>}
      </main>
  );
}
