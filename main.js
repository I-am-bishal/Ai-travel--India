import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Sphere, MeshDistortMaterial, Float, Stars } from "@react-three/drei";
import { motion } from "framer-motion";

/* ================= 3D GLOBE ================= */
const Globe = () => (
  <Float speed={2} rotationIntensity={1.5}>
    <Sphere args={[1, 100, 200]} scale={2.5}>
      <MeshDistortMaterial color="#10b981" distort={0.35} speed={1.5} />
    </Sphere>
  </Float>
);

/* ================= HERO ================= */
const Hero = () => (
  <section className="relative h-screen bg-[#020617] overflow-hidden">

    <Stars radius={100} depth={50} count={4000} factor={4} fade />

    <div className="absolute inset-0">
      <Canvas camera={{ position: [0, 0, 5] }}>
        <ambientLight intensity={0.6} />
        <pointLight position={[10, 10, 10]} color="#10b981" />
        <Suspense fallback={null}>
          <Globe />
        </Suspense>
        <OrbitControls autoRotate enableZoom={false} />
      </Canvas>
    </div>

    <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-6">
      <motion.h1
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-6xl md:text-8xl font-black text-white"
      >
        EXPLORE INDIA
      </motion.h1>

      <p className="mt-6 text-gray-400">AI-Powered Travel Experience</p>

      <button className="mt-10 px-10 py-4 bg-emerald-500 rounded-full font-bold">
        PLAN MY TRIP ✨
      </button>
    </div>
  </section>
);

/* ================= DESTINATIONS ================= */
const destinations = ["Goa", "Manali", "Jaipur", "Kerala", "Ladakh"];

const Destinations = () => (
  <section className="py-20 bg-[#020617] text-white">
    <h2 className="text-4xl text-center mb-10">Popular Destinations</h2>

    <div className="grid md:grid-cols-3 gap-6 px-10">
      {destinations.map((place, i) => (
        <motion.div
          key={i}
          whileHover={{ scale: 1.05 }}
          className="p-10 bg-white/5 backdrop-blur rounded-xl border border-white/10"
        >
          {place}
        </motion.div>
      ))}
    </div>
  </section>
);

/* ================= AI BUILDER ================= */
const AIPlanner = () => (
  <section className="py-20 bg-[#020617] text-center text-white">
    <h2 className="text-4xl mb-6">AI Trip Planner</h2>

    <div className="flex flex-col items-center gap-4">
      <input placeholder="Budget" className="p-3 rounded bg-black/50" />
      <input placeholder="Days" className="p-3 rounded bg-black/50" />

      <button className="px-6 py-3 bg-emerald-500 rounded-full">
        Generate Plan
      </button>
    </div>
  </section>
);

/* ================= EXPERIENCE ================= */
const Experience = () => (
  <section className="py-20 bg-[#020617] text-white">
    <h2 className="text-4xl text-center mb-10">Experiences</h2>

    <div className="grid md:grid-cols-4 gap-6 px-10">
      {["Beaches", "Mountains", "Heritage", "Spiritual"].map((item, i) => (
        <motion.div
          key={i}
          whileHover={{ scale: 1.05 }}
          className="p-8 bg-white/5 rounded-xl"
        >
          {item}
        </motion.div>
      ))}
    </div>
  </section>
);

/* ================= TESTIMONIALS ================= */
const Testimonials = () => (
  <section className="py-20 bg-[#020617] text-white text-center">
    <h2 className="text-4xl mb-10">What Users Say</h2>

    <motion.div
      animate={{ x: [0, -100, 0] }}
      transition={{ repeat: Infinity, duration: 6 }}
      className="max-w-xl mx-auto"
    >
      "Best AI travel experience ever!"
    </motion.div>
  </section>
);

/* ================= CTA ================= */
const CTA = () => (
  <section className="py-20 text-center bg-[#020617] text-white">
    <h2 className="text-4xl mb-6">Start Your Journey</h2>

    <button className="px-10 py-4 bg-emerald-500 rounded-full font-bold">
      Get Started 🚀
    </button>
  </section>
);

/* ================= MAIN PAGE ================= */
export default function LandingPage() {
  return (
    <div className="bg-[#020617]">
      <Hero />
      <Destinations />
      <AIPlanner />
      <Experience />
      <Testimonials />
      <CTA />
    </div>
  );
}