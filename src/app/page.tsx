"use client";

import { useRef, useEffect, useState } from "react";
import { motion, AnimatePresence, useMotionValue, useTransform, animate } from "framer-motion";
import { Card } from "@/components/ui/Card";
import { Button, cn } from "@/components/ui/Button";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { ArrowRight, ArrowLeft, ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";

// Frame Animation Component for Paw
function PawAnimation() {
  const [frame, setFrame] = useState(0);
  // Cycle: Open -> Semi -> Closed -> Extra(Closed?) -> Closed -> Semi. 
  // Assuming v2-1 is Open and v2-4 is Closed (or vice versa). 
  // To be safe and smooth: 1 -> 2 -> 3 -> 4 -> 3 -> 2
  const frames = [
    "/paw-v2-1.png",
    "/paw-v2-2.png",
    "/paw-v2-3.png",
    "/paw-v2-4.png",
    "/paw-v2-3.png",
    "/paw-v2-2.png"
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setFrame((prev) => (prev + 1) % frames.length);
    }, 200); // Change frame every 200ms
    return () => clearInterval(timer);
  }, [frames.length]);

  return (
    <Image
      src={frames[frame]}
      alt="Paw"
      width={173.45}
      height={173.45}
      className="w-full h-full object-contain"
      priority
    />
  );
}

function Counter({ from, to }: { from: number; to: number }) {
  const count = useMotionValue(from);
  const rounded = useTransform(count, (latest) => Math.round(latest));

  useEffect(() => {
    const controls = animate(count, to, { duration: 2, ease: "easeOut" });
    return controls.stop;
  }, [count, to]);

  return <motion.span>{rounded}</motion.span>;
}

// Quiz Data
const questions = [
  {
    id: 1,
    question: "What sound does a cat make?",
    options: ["Bhau-Bhau", "Meow-Meow", "Oink-Oink"],
    correctAnswer: "Meow-Meow",
  },
  {
    id: 2,
    question: "What would you probably find in your fridge?",
    options: ["Shoes", "Ice Cream", "Books"],
    correctAnswer: "Ice Cream",
  },
  {
    id: 3,
    question: "What color are bananas?",
    options: ["Blue", "Yellow", "Red"],
    correctAnswer: "Yellow",
  },
  {
    id: 4,
    question: "How many stars are in the sky?",
    options: ["Two", "Infinite", "One Hundred"],
    correctAnswer: "Infinite",
  },
];

export default function Home() {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [isFinished, setIsFinished] = useState(false);

  // Calculate score
  const score = Object.keys(answers).reduce((acc, key) => {
    const questionIndex = parseInt(key);
    if (answers[questionIndex] === questions[questionIndex].correctAnswer) {
      return acc + 1;
    }
    return acc;
  }, 0);

  const percentage = Math.round((score / questions.length) * 100);

  const handleOptionSelect = (option: string) => {
    setAnswers((prev) => ({ ...prev, [currentStep]: option }));
  };

  const handleNext = () => {
    if (currentStep < questions.length - 1) {
      setCurrentStep((prev) => prev + 1);
    } else {
      setIsFinished(true);
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const handleRestart = () => {
    setCurrentStep(0);
    setAnswers({});
    setIsFinished(false);
  };

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center p-4 md:p-8 overflow-hidden font-manrope" style={{ background: 'linear-gradient(107.96deg, #BECFEE 0%, #71C6E2 50%, #D9F4FA 75%, #BECFEE 100%)' }}>

      {/* Background Elements (Optional: keeping the blur blobs from snippet logic if implied, but user snippet barely had them. The user snippet used a clean gradient. I'll stick to the clean gradient from the snippet.) */}

      {/* Main Content Card */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="relative w-full max-w-[1400px] rounded-[50px] border border-white p-[19px]"
        style={{
          background: 'linear-gradient(112.86deg, rgba(255, 255, 255, 0.4) -6.68%, rgba(255, 255, 255, 0.12) 45.63%, rgba(255, 255, 255, 0.4) 103.45%)',
          boxShadow: '0px 43.6262px 69.1583px rgba(0, 0, 0, 0.63)',
          backdropFilter: 'blur(6.97305px)'
        }}
      >
        {/* Inner White Card */}
        <div className="bg-[#F4FDFF] rounded-[42px] overflow-hidden p-6 md:p-8 relative min-h-[500px] flex flex-col">

          {!isFinished ? (
            <>
              {/* Title */}
              <h1 className="text-4xl md:text-[70px] leading-tight font-serif italic tracking-[-4px] text-center mb-2 font-display" style={{
                background: 'linear-gradient(90deg, #15313D 0%, #3CABDA 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text'
              }}>
                Test Your Knowledge
              </h1>

              {/* Subtitle */}
              <div className="bg-white rounded-lg px-8 py-1.5 mx-auto mb-4">
                <p className="text-center text-[18px] text-[#15313D] font-manrope font-medium">Answer all questions to see your results</p>
              </div>

              {/* Progress Indicator */}
              <div className="w-full max-w-[1000px] mx-auto mb-4">
                <ProgressBar currentStep={currentStep} totalSteps={questions.length} />
              </div>

              {/* Question Box */}
              <motion.div
                key={currentStep}
                initial={{ x: 20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: -20, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="w-full max-w-[1000px] mx-auto mb-4 bg-gradient-to-r from-[#C6E9F7] to-[#E5F8FF] border border-[#96E5FF] rounded-[10px] px-6 py-4 shadow-sm"
              >
                <p className="text-lg md:text-xl font-semibold text-[#2C3E50] text-center">
                  {currentStep + 1}. {questions[currentStep].question}
                </p>
              </motion.div>

              {/* Answer Options */}
              <div className="w-full max-w-[1000px] mx-auto flex flex-col gap-2.5 mb-4">
                {questions[currentStep].options.map((option, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleOptionSelect(option)}
                    className={cn(
                      "w-full rounded-[10px] px-6 py-[22px] border transition-all text-center relative overflow-hidden",
                      answers[currentStep] === option
                        ? "bg-gradient-to-r from-[#C6E9F7] to-[#E5F8FF] border-[#96E5FF]"
                        : "border-[rgba(150,229,255,0.5)]"
                    )}
                    style={{
                      background: answers[currentStep] !== option ? 'linear-gradient(89.72deg, rgba(198, 233, 247, 0.1) 0.09%, rgba(229, 248, 255, 0.1) 99.91%)' : undefined
                    }}
                  >
                    <span className={cn(
                      "text-[22px] font-semibold font-inter",
                      "text-[#15313D]"
                    )} style={{ letterSpacing: '-0.3125px' }}>
                      {option}
                    </span>
                  </button>
                ))}
              </div>

              {/* Navigation Buttons */}
              <div className="flex justify-end items-center gap-2.5 w-full max-w-[1000px] mx-auto mt-auto">
                {/* Previous */}
                <button
                  onClick={handlePrev}
                  disabled={currentStep === 0}
                  className="w-[53px] h-[50px] rounded-[10px] border flex items-center justify-center disabled:cursor-not-allowed transition-colors"
                  style={{
                    background: 'linear-gradient(89.72deg, #C6E9F7 0.09%, #E5F8FF 99.91%)',
                    opacity: currentStep === 0 ? 0.3 : 1,
                    border: '1px solid rgba(150, 229, 255, 0.05)'
                  }}
                >
                  <ChevronLeft className="w-6 h-6 text-[#15313D]" />
                </button>

                {/* Next */}
                <button
                  onClick={handleNext}
                  disabled={!answers[currentStep]}
                  className="w-[53px] h-[50px] rounded-[10px] border flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  style={{
                    background: 'linear-gradient(89.72deg, #C6E9F7 0.09%, #E5F8FF 99.91%)',
                    border: '1px solid rgba(150, 229, 255, 0.05)'
                  }}
                >
                  <ChevronRight className="w-6 h-6 text-[#15313D]" />
                </button>
              </div>
            </>
          ) : (
            // Results View - Clean Design
            <div className="flex flex-col items-center justify-center flex-grow space-y-6 py-8">
              {/* Keep Learning Badge */}
              <div className="bg-white/50 backdrop-blur-sm px-6 py-2 rounded-full">
                <h2 className="text-base font-medium text-[#15313D]">Keep Learning!</h2>
              </div>

              {/* Your Final score is */}
              <h1 className="text-4xl md:text-5xl font-serif italic text-[#2C5F7C] text-center mb-2">
                Your Final score is
              </h1>

              {/* Score Display */}
              <div className="flex items-start justify-center mb-4">
                <span className="text-8xl md:text-9xl font-serif font-bold text-[#2C5F7C]">
                  <Counter from={0} to={percentage} />
                </span>
                <span className="text-5xl md:text-6xl font-serif font-bold text-[#2C5F7C] mt-4 ml-1">%</span>
              </div>

              {/* Start Again Button */}
              <button
                onClick={handleRestart}
                className="mt-6 bg-[#D1ECF7] hover:bg-[#C0E3F2] text-[#15313D] font-semibold px-10 py-3 rounded-lg transition-colors"
              >
                Start Again
              </button>
            </div>
          )}
        </div>

        {/* Cat Paw Illustration - Only on First Question - Inside white card at bottom left */}
        {!isFinished && currentStep === 0 && (
          <div className="absolute pointer-events-none" style={{ left: '50px', bottom: '17px', width: '110px', height: '110px', zIndex: 30 }}>
            {/* Paw Animation */}
            <div className="w-full h-full">
              <PawAnimation />
            </div>
          </div>
        )}

        {/* Speech Bubble - Only on First Question - Inside white card */}
        {!isFinished && currentStep === 0 && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.5, type: "spring" }}
            className="absolute pointer-events-none"
            style={{
              left: '-30px',
              bottom: '140px',
              width: '150px',
              height: '70px',
              transform: 'rotate(-8deg)',
              zIndex: 30
            }}
          >
            <div className="relative w-full h-full flex items-center justify-center">
              <div className="absolute inset-0 bg-white border-2 border-[#6BC3E5] rounded-2xl shadow-md" />
              <p className="relative text-[#15313D] whitespace-nowrap font-bold" style={{
                fontFamily: 'Caveat Brush',
                fontSize: '28px',
                lineHeight: '20px',
                letterSpacing: '-0.818182px',
                textAlign: 'center',
                transform: 'rotate(-2.56deg)'
              }}>Best of Luck !</p>
            </div>
            {/* Speech Bubble Tail */}
            <div className="absolute" style={{ bottom: '-8px', left: '24px' }}>
              <div className="w-0 h-0 border-l-[12px] border-l-transparent border-r-[12px] border-r-transparent border-t-[12px] border-t-[#6BC3E5]" />
              <div className="absolute -top-[10px] left-[2px] w-0 h-0 border-l-[10px] border-l-transparent border-r-[10px] border-r-transparent border-t-[10px] border-white" />
            </div>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}
