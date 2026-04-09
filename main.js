import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Sphere, MeshDistortMaterial, Float } from '@react-three/drei';
import { motion } from 'framer-motion';

// 3D Visual Component
const FuturisticGlobe = () => {
    return (
        <Float speed={2} rotationIntensity={1.5} floatIntensity={2}>
            <Sphere args={[1, 100, 200]} scale={2.5}>
                <MeshDistortMaterial
                    color="#10b981" // Emerald/Neon Green for India focus
                    attach="material"
                    distort={0.3}
                    speed={1.5}
                    roughness={0.2}
                    metalness={0.8}
                />
            </Sphere>
        </Float>
    );
};

export default function HeroSection() {
    return (
        <div className="relative h-screen w-full bg-[#030712] overflow-hidden">
            {/* Background Particles/Glow */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-emerald-900/20 via-transparent to-transparent" />

            {/* 3D Canvas Layer */}
            <div className="absolute inset-0 z-0">
                <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
                    <ambientLight intensity={0.5} />
                    <pointLight position={[10, 10, 10]} intensity={1} color="#10b981" />
                    <Suspense fallback={null}>
                        <FuturisticGlobe />
                    </Suspense>
                    <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.5} />
                </Canvas>
            </div>

            {/* Glassmorphic UI Overlay */}
            <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-6">
                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-6xl md:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-b from-white to-gray-500 tracking-tighter"
                >
                    EXPLORE INDIA <br /> <span className="text-emerald-500 shadow-neon">LIKE NEVER BEFORE</span>
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5, duration: 1 }}
                    className="mt-6 text-gray-400 text-lg max-w-2xl font-light tracking-widest uppercase"
                >
                    AI-Powered Immersive Travel Experiences
                </motion.p>

                <motion.button
                    whileHover={{ scale: 1.05, boxShadow: "0px 0px 20px #10b981" }}
                    whileTap={{ scale: 0.95 }}
                    className="mt-10 px-8 py-4 bg-emerald-600 text-white font-bold rounded-full backdrop-blur-md bg-opacity-80 border border-emerald-400/30 transition-all"
                >
                    PLAN MY TRIP WITH AI
                </motion.button>
            </div>

            {/* Futuristic Floating Chat Button */}
            <div className="absolute bottom-10 right-10 z-20">
                <div className="w-16 h-16 bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl flex items-center justify-center cursor-pointer hover:bg-emerald-500/20 transition-all">
                    <span className="text-2xl animate-pulse">🤖</span>
                </div>
            </div>
        </div>
    );
}