"use client";

import React, {useState, useEffect, useRef, JSX} from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BookOpen, Repeat } from "lucide-react";

// --- Finalized Thematic Clues ---
interface Clue {
  title: string;
  password: string;
}

const clues: Clue[] = [
  { title: "Beneath the ticking hands of time, secrets wait in silence.", password: "time42" },
  { title: "When shadows grow longer, the truth hides in plain sight.", password: "shade9" },
  { title: "The key lies not in the stars, but in the spaces between.", password: "nova77" },
  { title: "What is broken can still point the way forward.", password: "fract5" },
  { title: "Only those who look twice will see the hidden path.", password: "echo2" },
];

interface GameState {
  currentIndex: number;
  input: string;
  error: string;
  gameState: "start" | "playing" | "won";
}

const INITIAL_STATE: GameState = {
  currentIndex: 0,
  input: "",
  error: "",
  gameState: "start",
};

// --- Main Component ---
export default function Home(): JSX.Element {
  const [state, setState] = useState<GameState>(INITIAL_STATE);
  const inputRef = useRef<HTMLInputElement | null>(null);

  // Clear error when user starts typing again
  useEffect(() => {
    if (state.error) {
      setState((prevState) => ({ ...prevState, error: "" }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.input]);

  // Auto-focus input when clue changes
  useEffect(() => {
    if (state.gameState === "playing" && inputRef.current) {
      inputRef.current.focus();
    }
  }, [state.currentIndex, state.gameState]);

  const handleStartGame = (): void => {
    setState({ ...INITIAL_STATE, gameState: "playing" });
  };

  const handleResetGame = (): void => {
    setState(INITIAL_STATE);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    const currentClue = clues[state.currentIndex];
    if (state.input.trim().toLowerCase() === currentClue.password.toLowerCase()) {
      if (state.currentIndex < clues.length - 1) {
        setState((prevState) => ({
          ...prevState,
          currentIndex: prevState.currentIndex + 1,
          input: "",
          error: "",
        }));
      } else {
        setState((prevState) => ({ ...prevState, gameState: "won" }));
      }
    } else {
      setState((prevState) => ({ ...prevState, error: "The path remains hidden." }));
    }
  };

  const progressPercentage = (state.currentIndex / clues.length) * 100;

  return (
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
