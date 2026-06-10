import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import confetti from "canvas-confetti";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Muddu, will you be mine? 💫" },
      { name: "description", content: "A little universe made just for you, Muddu." },
      { property: "og:title", content: "Muddu, will you be mine? 💫" },
      { property: "og:description", content: "A little universe made just for you, Muddu." },
    ],
  }),
  component: Index,
});

function Index() {
  const [stage, setStage] = useState<"intro" | "question" | "yes">("intro");
  const [noPos, setNoPos] = useState({ x: 0, y: 0 });
  const noBtnRef = useRef<HTMLButtonElement>(null);

  const stars = useMemo(
    () =>
      Array.from({ length: 90 }, () => ({
        left: Math.random() * 100,
        top: Math.random() * 100,
        size: Math.random() * 2 + 1,
        delay: Math.random() * 4,
        duration: 2 + Math.random() * 3,
      })),
    [],
  );

  const hearts = useMemo(
    () =>
      Array.from({ length: 14 }, (_, i) => ({
        left: Math.random() * 100,
        delay: (i * 1.3) % 12,
        duration: 10 + Math.random() * 8,
        size: 12 + Math.random() * 18,
      })),
    [],
  );

  const fireConfetti = () => {
    const colors = ["#ff8ec7", "#ffb3d9", "#ffd1e8", "#c9a4ff", "#fff1a8"];
    const burst = (x: number) =>
      confetti({
        particleCount: 80,
        spread: 80,
        startVelocity: 45,
        origin: { x, y: 0.6 },
        colors,
        shapes: ["circle"],
      });
    burst(0.2);
    burst(0.8);
    setTimeout(() => burst(0.5), 250);
    setTimeout(
      () =>
        confetti({
          particleCount: 150,
          spread: 160,
          origin: { y: 0.5 },
          colors,
          scalar: 1.2,
        }),
      500,
    );
  };

  const handleYes = () => {
    setStage("yes");
    fireConfetti();
    const interval = setInterval(fireConfetti, 1800);
    setTimeout(() => clearInterval(interval), 9000);
  };

  const dodgeNo = () => {
    const x = (Math.random() - 0.5) * 400;
    const y = (Math.random() - 0.5) * 200;
    setNoPos({ x, y });
  };

  return (
    <main className="relative min-h-screen overflow-hidden cosmic-bg">
      {/* Stars */}
      <div className="pointer-events-none absolute inset-0">
        {stars.map((s, i) => (
          <span
            key={i}
            className="absolute rounded-full bg-white"
            style={{
              left: `${s.left}%`,
              top: `${s.top}%`,
              width: s.size,
              height: s.size,
              animation: `twinkle ${s.duration}s ease-in-out ${s.delay}s infinite`,
              boxShadow: "0 0 6px rgba(255,255,255,0.8)",
            }}
          />
        ))}
      </div>

      {/* Floating hearts */}
      <div className="pointer-events-none absolute inset-0">
        {hearts.map((h, i) => (
          <span
            key={i}
            className="absolute"
            style={{
              left: `${h.left}%`,
              bottom: "-40px",
              fontSize: h.size,
              animation: `float-up ${h.duration}s linear ${h.delay}s infinite`,
            }}
          >
            💖
          </span>
        ))}
      </div>

      {/* Moon glow */}
      <div
        className="pointer-events-none absolute -top-32 -right-32 h-96 w-96 rounded-full opacity-60 blur-3xl"
        style={{ background: "radial-gradient(circle, oklch(0.85 0.12 60), transparent 70%)" }}
      />

      <section className="relative z-10 flex min-h-screen flex-col items-center justify-center px-6 py-16 text-center">
        <AnimatePresence mode="wait">
          {stage === "intro" && (
            <motion.div
              key="intro"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 1 }}
              className="max-w-2xl"
            >
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6, duration: 1.5 }}
                className="font-script text-3xl md:text-4xl text-shimmer mb-6"
              >
                For my dearest
              </motion.p>
              <motion.h1
                initial={{ scale: 0.6, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 1, duration: 1.4, type: "spring" }}
                className="font-script text-7xl md:text-9xl text-shimmer leading-none"
                style={{ filter: "drop-shadow(0 0 30px oklch(0.75 0.18 350 / 0.6))" }}
              >
                Muddu
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 2.2, duration: 1.2 }}
                className="font-display mt-10 text-lg md:text-xl text-muted-foreground italic"
              >
                In a universe full of stars, I found my favorite one.
              </motion.p>
              <motion.button
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 3, duration: 1 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setStage("question")}
                className="font-display mt-12 rounded-full bg-primary px-10 py-4 text-lg font-medium text-primary-foreground tracking-wide"
                style={{ animation: "pulse-glow 2.5s ease-in-out infinite" }}
              >
                Open my heart ✨
              </motion.button>
            </motion.div>
          )}

          {stage === "question" && (
            <motion.div
              key="question"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 1 }}
              className="max-w-2xl"
            >
              <motion.div
                animate={{ rotate: [0, -5, 5, -5, 0] }}
                transition={{ duration: 4, repeat: Infinity }}
                className="mb-8 text-8xl"
                style={{ animation: "heart-beat 1.6s ease-in-out infinite" }}
              >
                💍
              </motion.div>
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 1 }}
                className="font-script text-5xl md:text-7xl text-shimmer leading-tight"
              >
                Will you love me<br />as I love you?
              </motion.h2>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.2, duration: 1 }}
                className="font-display mt-8 text-xl md:text-2xl text-foreground/90 italic"
              >
                Forever, completely, endlessly — every star agrees.
              </motion.p>

              <div className="relative mt-14 flex items-center justify-center gap-6">
                <motion.button
                  whileHover={{ scale: 1.15 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleYes}
                  className="font-display rounded-full bg-primary px-12 py-5 text-2xl font-semibold text-primary-foreground"
                  style={{ animation: "pulse-glow 2s ease-in-out infinite" }}
                >
                  Yes 💖
                </motion.button>
                <motion.button
                  ref={noBtnRef}
                  onMouseEnter={dodgeNo}
                  onTouchStart={dodgeNo}
                  onClick={dodgeNo}
                  animate={{ x: noPos.x, y: noPos.y }}
                  transition={{ type: "spring", stiffness: 300, damping: 18 }}
                  className="font-display rounded-full border border-border bg-card/10 px-8 py-4 text-lg text-foreground/70 backdrop-blur"
                >
                  No
                </motion.button>
              </div>
              <p className="font-display mt-6 text-xs uppercase tracking-[0.3em] text-muted-foreground/60">
                (the "no" button is a little shy)
              </p>
            </motion.div>
          )}

          {stage === "yes" && (
            <motion.div
              key="yes"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.2, type: "spring" }}
              className="max-w-3xl"
            >
              <motion.div
                animate={{ scale: [1, 1.2, 1], rotate: [0, 10, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="text-9xl mb-6"
              >
                💖
              </motion.div>
              <h2 className="font-script text-6xl md:text-8xl text-shimmer leading-tight">
                Forever yours,<br />Muddu
              </h2>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1, duration: 1 }}
                className="font-display mt-10 text-xl md:text-2xl text-foreground/90 italic max-w-xl mx-auto"
              >
                You just made me the happiest person in every galaxy.
                Thank you for choosing this little universe with me. 🌌
              </motion.p>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2, duration: 1 }}
                className="font-script text-4xl text-shimmer mt-12"
              >
                ~ always &amp; always ~
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </section>
    </main>
  );
}
