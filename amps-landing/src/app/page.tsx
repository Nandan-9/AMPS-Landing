"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

// ➡️ 1. Data is now structured into rounds, each with 3 questions.
const rounds = [
  {
    roundTitle: "Pieces",
    gradient: "from-purple-900 via-black to-black",
    questions: [
      {
        title: "Two performers on stage, not allies but rivals — each trying to outdo the other. What word describes their relationship?",
        password: "rivalry",
      },
      {
        title: "A scientist who turned lightning into his tool, often linked with electricity and invention. His name shines in this story.",
        password: ["tesla","Nikola Tesla", "nikola tesla",]
      },
      {
        title: "The audience never claps when the bird disappears, but only when it returns. What is that final, astonishing act called?",
        password: ["prestige", "the prestige"]
      },
    ],
  },
  {
    roundTitle: "Links",
    gradient: "from-blue-900 via-black to-black",
    questions: [
      {
        title: "Neither wings of steel nor four-wheeled chariots — their escape thunders on beasts of metal that balance on just two.",
        password: ["bikes", "bike"]
      },
      {
        title: "When chaos makes its move, an equal force rises to contain it. In the dance of crime and pursuit, who plays the counterbalance?",
        password: ["police", "cops"],
      },
      {
        title: "Three tales, one chase: the road is their stage, the mask their shield, the speed their language. Name the high-octane franchise.",
        password: "dhoom",
      },
    ],
  },
  {
    roundTitle: "Chains",
    gradient: "from-red-900 via-black to-black",

    questions: [
      {
        title: "A friendship turns into code, code turns into influence, and influence turns into a platform the world cannot ignore.",
        password: ["social network", "the social network"]
      },
      {
        title: "Rules are written to survive a world overrun by the undead. A motley crew follows them, moving across a dangerous land.",
        password: "zombieland",
      },
      {
        title: "One watches from the night, striking fear; the other soars in daylight, inspiring hope. Their philosophies clash in a city that never sleeps.",
        password: [
          "batmanvsuperman",
          "batman vs superman",
          "batman v superman",
          "batman v superman dawn of justice",
          "batman vs superman dawn of justice",
          "batman v superman: dawn of justice",
          "batman vs superman: dawn of justice",
          "dawn of justice",
        ]

      }
    ],
  },
  {
    roundTitle: "The whole",
    gradient: "from-red-900 via-black to-black",
    images: [
      "/The_Prestige.webp",
      "/dhoom-poster.jpg",
      "/jesse-eisenberg.webp",
    ],
    questions: [
      {
        title: "Threads of magic, echoes of sirens, and the mark of one man — follow the weave to the story that binds them all.",
        password: "now you see me",
      },
    ]
  },
];

export default function Home() {
  const [roundIndex, setRoundIndex] = useState(0);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [input, setInput] = useState("");
  const [error, setError] = useState("");
  const [won, setWon] = useState(false);
  const [showRoundTransition, setShowRoundTransition] = useState(false);
  const startNextRound = () => {
    setRoundIndex(roundIndex + 1);
    setQuestionIndex(0);
    setInput("");
    setError("");
    setShowRoundTransition(false);
  }

  const currentRound = rounds[roundIndex];
  const currentQuestion = currentRound.questions[questionIndex];
  const totalQuestions = rounds.reduce((sum, r) => sum + r.questions.length, 0);
  const answered = rounds
    .slice(0, roundIndex)
    .reduce((sum, r) => sum + r.questions.length, 0) + questionIndex;

  const progress = ((answered + (won ? 1 : 0)) / totalQuestions) * 100;

  const checkPassword = (e?: React.FormEvent) => {
    if (e) e.preventDefault();

    const normalizedInput = input.trim().toLowerCase();

    // Handle both string and array cases
    const validAnswers = Array.isArray(currentQuestion.password)
      ? currentQuestion.password
      : [currentQuestion.password];

    const isCorrect = validAnswers.some(
      (ans) => typeof ans === "string" && normalizedInput === ans.toLowerCase()
    );

    if (isCorrect) {
      setError("");
      const isLastQuestionInRound = questionIndex === currentRound.questions.length - 1;
      const isLastRoundInGame = roundIndex === rounds.length - 1;

      if (isLastQuestionInRound && isLastRoundInGame) {
        setWon(true);
      } else if (isLastQuestionInRound) {
        setShowRoundTransition(true);
      } else {
        setQuestionIndex(questionIndex + 1);
        setInput("");
      }
    } else {
      setError("❌ Wrong answer, try again...");
    }
  };

  if (won) {
    return (
      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2 }}
        className="flex flex-col items-center justify-center h-screen bg-gradient-to-br from-green-900 via-black to-black text-white space-y-6 text-center px-4"
      >
        <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}>
          <Image src="/logo.png" alt="Logo" width={120} height={120} />
        </motion.div>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5 }}
          className="text-2xl md:text-4xl font-bold drop-shadow-lg"
        >
          Congratulations! The Illusion is over, the final reveal is here- and you stand as the true master of <i>Da Vinci Clues</i>!
        </motion.h1>
        <p className="text-lg md:text-xl text-gray-300">You’ve solved all the mysteries.</p>
      </motion.main>
    );
  }

  if (showRoundTransition) {
    return (
      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex flex-col items-center justify-center h-screen bg-black text-white space-y-8"
      >
        <motion.h1
          initial={{ y: -30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="text-4xl font-extrabold"
        >
          ✅ {currentRound.roundTitle} Complete!
        </motion.h1>
        <motion.button
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.3 }}
          onClick={startNextRound}
          className="px-8 py-3 rounded-lg bg-gradient-to-r from-blue-600 to-purple-700 hover:from-blue-700 hover:to-purple-800 transition text-lg font-medium shadow-lg"
        >
          Start {rounds[roundIndex + 1]?.roundTitle}
        </motion.button>
      </motion.main>
    );
  }

  return (
    <main
      className={`flex flex-col items-center justify-center h-screen text-white px-4 relative overflow-hidden bg-gradient-to-br ${currentRound.gradient}`}
    >
      {/* Progress Bar */}
      <motion.div
        className="absolute top-0 left-0 h-2 bg-blue-500"
        initial={{ width: 0 }}
        animate={{ width: `${progress}%` }}
        transition={{ duration: 0.6 }}
      />

      {/* Logo + Round */}
      <motion.div
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1 }}
        className="absolute top-8 text-center"
      >
        <Image src="/logo.png" alt="Logo" width={80} height={80} className="drop-shadow-lg" />
        <h3 className="text-xl font-semibold mt-2">{currentRound.roundTitle}</h3>
      </motion.div>
      {/* Round-specific images (used in The Whole round) */}
      {currentRound.images && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="flex flex-wrap justify-center gap-4 mb-6"
        >
          {currentRound.images.map((img, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.3 }} // sequential reveal ✨
            >
              <Image
                src={img}
                alt={`Clue ${i + 1}`}
                width={220}
                height={300}
                className="rounded-lg shadow-lg"
              />
            </motion.div>
          ))}
        </motion.div>
      )}

      {/* Question */}
      <AnimatePresence mode="wait">
        <motion.h2
          key={`${roundIndex}-${questionIndex}`}
          initial={{ opacity: 0, y: 40, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -40, scale: 0.95 }}
          transition={{ duration: 0.8 }}
          className="text-xl md:text-2xl font-semibold mb-6 text-center max-w-lg tracking-wide drop-shadow-lg"
        >
          {currentQuestion.title}
        </motion.h2>
      </AnimatePresence>

      <form onSubmit={checkPassword} className="flex flex-col items-center space-y-4">
        <motion.input
          type="text"
          placeholder="Enter the password..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="w-72 px-4 py-2 rounded-md bg-gray-900/60 border border-gray-600 focus:outline-none focus:border-blue-400 text-white text-center backdrop-blur-md shadow-lg"
          animate={error ? { x: [-8, 8, -8, 0] } : {}}
          transition={{ duration: 0.4 }}
        />
        <motion.button
          type="submit"
          whileHover={{ scale: 1.07 }}
          whileTap={{ scale: 0.95 }}
          className="px-8 py-2 rounded-lg bg-gradient-to-r from-blue-600 to-purple-700 hover:from-blue-700 hover:to-purple-800 transition text-lg font-medium shadow-lg"
        >
          Submit
        </motion.button>
      </form>

      {/* Error */}
      {error && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mt-4 text-red-400 text-sm italic"
        >
          {error}
        </motion.p>
      )}
    </main>
  );
}