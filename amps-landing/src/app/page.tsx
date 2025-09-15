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
<<<<<<< HEAD
      <main className="relative flex items-center justify-center h-screen bg-stone-900 text-stone-300 font-serif overflow-hidden">
        {/* Background */}
        <motion.div
            className="absolute inset-0 z-0 opacity-40"
            style={{
              backgroundImage: "url('/parchment-bg.jpg')",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
            animate={{
              scale: [1, 1.02, 1],
              transition: { duration: 40, repeat: Infinity, ease: "easeInOut" },
            }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/70 z-0" />

        <AnimatePresence mode="wait">
          {state.gameState === "start" && <StartScreen onStart={handleStartGame} />}
          {state.gameState === "playing" && (
              <motion.div
                  key="playing"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                  className="z-10 w-full max-w-2xl px-4"
              >
                <header className="flex justify-center items-center mb-4 px-4">
                  <div className="text-center text-sm font-light tracking-widest border-b border-t border-amber-800/50 py-2">
                    CLUE {state.currentIndex + 1} OF {clues.length}
                  </div>
                </header>

                <div className="w-full bg-black/30 rounded-full h-1 mb-8">
                  <motion.div
                      className="bg-gradient-to-r from-amber-600 to-yellow-400 h-1 rounded-full"
                      animate={{ width: `${progressPercentage}%` }}
                      transition={{ duration: 0.8, ease: "easeOut" }}
                  />
                </div>

                <div className="w-full p-8 bg-stone-900/50 backdrop-blur-sm border border-stone-700/60 rounded-sm shadow-2xl shadow-black/50">
                  <AnimatePresence mode="wait">
                    <motion.h2
                        key={state.currentIndex}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.5, ease: "circOut" }}
                        className="text-lg md:text-xl text-center text-stone-200 mb-8 leading-relaxed italic"
                    >
                      “{clues[state.currentIndex].title}”
                    </motion.h2>
                  </AnimatePresence>

                  <form onSubmit={handleSubmit} className="flex flex-col items-center">
                    <motion.input
                        ref={inputRef}
                        type="text"
                        autoComplete="off"
                        placeholder="Enter the Solution..."
                        value={state.input}
                        onChange={(e) =>
                            setState((prevState) => ({ ...prevState, input: e.target.value }))
                        }
                        className="w-full max-w-xs px-4 py-3 rounded-sm bg-black/30 border border-stone-600 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 text-white text-center tracking-wider transition-all"
                        animate={state.error ? { x: [-8, 8, -6, 6, -4, 0] } : {}}
                        transition={{ duration: 0.4, ease: "easeInOut" }}
                    />
                    <motion.button
                        type="submit"
                        whileHover={{ scale: 1.05, filter: "brightness(1.1)" }}
                        whileTap={{ scale: 0.95 }}
                        className="mt-6 px-10 py-3 rounded-sm bg-amber-700 hover:bg-amber-600 text-stone-900 font-bold tracking-wider transition-colors shadow-lg"
                    >
                      Decipher
                    </motion.button>
                    <AnimatePresence>
                      {state.error && (
                          <motion.p
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0 }}
                              className="mt-4 text-red-400 text-sm font-semibold tracking-wider"
                          >
                            {state.error}
                          </motion.p>
                      )}
                    </AnimatePresence>
                  </form>
                </div>
              </motion.div>
          )}
          {state.gameState === "won" && <FinalRevealScreen onReset={handleResetGame} />}
        </AnimatePresence>
      </main>
=======
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
>>>>>>> 7d97204
  );
}

// --- Start Screen Component ---
interface StartScreenProps {
  onStart: () => void;
}

const StartScreen: React.FC<StartScreenProps> = ({ onStart }) => (
    <motion.div
        key="start"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.7 }}
        className="z-10 flex flex-col items-center text-center p-8"
    >
      <BookOpen className="text-amber-300 mb-4" size={48} />
      <h1
          className="text-4xl md:text-6xl font-bold mb-4 text-amber-400"
          style={{ fontFamily: "'Cinzel', serif" }}
      >
        The Da Vinci Clue
      </h1>
      <p className="max-w-md mb-8 text-stone-300 text-lg">
        A trail of cryptic symbols has been left for you. Decode the clues, solve the mystery,
        and find the truth before it is lost to the ages.
      </p>
      <motion.button
          onClick={onStart}
          whileHover={{ scale: 1.05, boxShadow: "0px 0px 15px rgba(252, 211, 77, 0.4)" }}
          whileTap={{ scale: 0.95 }}
          className="px-12 py-4 rounded-sm bg-amber-700 hover:bg-amber-600 text-stone-900 font-bold text-lg tracking-widest transition-colors shadow-lg"
      >
        Begin the Quest
      </motion.button>
    </motion.div>
);

// --- Final Reveal Screen ---
interface FinalRevealScreenProps {
  onReset: () => void;
}

// --- The Cinematic Final Reveal Screen ---
const finalScreenVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.8, // Time between each child animation
      delayChildren: 0.5,   // Wait before starting the first child
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 1, ease: "easeInOut" } },
};

const FinalRevealScreen = ({ onReset }: { onReset: () => void }) => (
    <motion.div
        key="won"
        variants={finalScreenVariants}   // ✅ fixed spelling
        initial="hidden"
        animate="visible"
        className="z-10 flex flex-col items-center text-center p-8 md:p-12"
    >
      <motion.div variants={itemVariants}>
        {/* The Chalice and Blade Symbol */}
        <svg
            width="100"
            height="120"
            viewBox="0 0 100 120"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
          <motion.path
              d="M50 110L5 10L95 10L50 110Z"
              stroke="#FBBF24"
              strokeWidth="3"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 2, ease: "easeInOut" }}
          />
          <motion.path
              d="M50 10L5 110L95 110L50 10Z"
              stroke="#FBBF24"
              strokeWidth="3"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 2, ease: "easeInOut", delay: 0.5 }}
          />
        </svg>
      </motion.div>

      <motion.h1
          variants={itemVariants}
          className="mt-8 text-3xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-amber-500"
          style={{ fontFamily: "'Cinzel', serif" }}
      >
        Veritas Invenitur
      </motion.h1>

      <motion.p
          variants={itemVariants}
          className="mt-6 max-w-xl text-lg text-stone-300"
      >
        Beneath the silent stars and watchful eyes of history, the path concludes.
        You have followed the echoes of the Priory and proven worthy. The legacy
        is now yours to protect.
      </motion.p>

      <motion.div variants={itemVariants}>
        <motion.button
            onClick={onReset}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="mt-12 flex items-center space-x-2 px-8 py-3 rounded-sm bg-stone-700/80 hover:bg-stone-600/80 text-white font-semibold transition-colors"
        >
          <Repeat size={18} />
          <span>Begin Anew</span>
        </motion.button>
      </motion.div>
    </motion.div>
);
