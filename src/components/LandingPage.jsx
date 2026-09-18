
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

// ========================================
// Vegetables that flow across the screen
// ========================================

function FlowingVeggie({ image, direction, top }) {
  return (
    <img
      src={image}
      alt="floating vegetable"
      className={`absolute w-[6vw] min-w-12 pointer-events-none ${
        direction === "right"
          ? "veggie-flow-right"
          : "veggie-flow-left"
      }`}
      style={{ top }}
    />
  );
}

// ========================================
// Random shooting vegetable
// ========================================

function ShootingVeggie({ image, delay }) {
  const [shoot, setShoot] = useState(null);

  useEffect(() => {
    const createShot = () => {

      // Random starting position
      const startX = Math.random() * 80 + 10;
      const startY = Math.random() * 60 + 20;

      // Random direction
      const angle = Math.random() * 360;

      // Random distance
      const distance = 70 + Math.random() * 80;

      // Convert angle to X/Y movement
      const radians = (angle * Math.PI) / 180;

      const moveX = Math.cos(radians) * distance;
      const moveY = Math.sin(radians) * distance;

      // Random speed
      const duration = 2.5 + Math.random() * 2;

      setShoot({
        left: `${startX}%`,
        top: `${startY}%`,
        x: `${moveX}vw`,
        y: `${moveY}vh`,
        duration: `${duration}s`,
        rotate: `${360 + Math.random() * 720}deg`,
      });
    };

    const timer = setTimeout(() => {
      createShot();

      const interval = setInterval(() => {
        createShot();
      }, 4500);

      return () => clearInterval(interval);
    }, delay);

    return () => clearTimeout(timer);
  }, [delay]);

  if (!shoot) return null;

  return (
    <img
      src={image}
      alt="shooting vegetable"
      className="veggie-shoot w-[6vw] min-w-12"
      style={{
        left: shoot.left,
        top: shoot.top,
        "--shoot-x": shoot.x,
        "--shoot-y": shoot.y,
        "--shoot-duration": shoot.duration,
        "--shoot-rotate": shoot.rotate,
      }}
    />
  );
}

// ========================================
// Landing Page
// ========================================

function LandingPage() {
  return (
    <div className="relative min-h-[calc(100vh-80px)] overflow-hidden bg-[#FAF8F5]">

      {/* ========================================
          Vegetables flowing across screen
          ======================================== */}

      <FlowingVeggie
        image="/lettuce.png"
        direction="right"
        top="15%"
      />

      <FlowingVeggie
        image="/onion.png"
        direction="left"
        top="70%"
      />

      <FlowingVeggie
        image="/beet.png"
        direction="right"
        top="40%"
      />

      <FlowingVeggie
        image="/lettuce.png"
        direction="left"
        top="85%"
      />

      {/* ========================================
          Random shooting vegetables
          ======================================== */}

      <ShootingVeggie
        image="/beet.png"
        delay={1000}
      />

      <ShootingVeggie
        image="/onion.png"
        delay={2500}
      />

      <ShootingVeggie
        image="/lettuce.png"
        delay={4000}
      />

      {/* ========================================
          Main content
          ======================================== */}

      <div
        className="relative z-10 min-h-[calc(100vh-80px)]
        flex flex-col items-center justify-center text-center px-6"
      >

        {/* Cooker */}
        <img
          src="/cooker.png"
          alt="cooker"
          className="w-[30vw] max-w-40
          animate-bounce-slow mix-blend-multiply"
        />

        {/* Brand */}
        <h1
          className="mt-4 text-[8vw] md:text-[5vw]
          font-extrabold tracking-tight italic text-black"
        >
          BIRYANI....
        </h1>

        <h2
          className="text-[6vw] md:text-[3.5vw]
          font-extrabold tracking-tight italic text-amber-600"
        >
          Broz...
        </h2>

        <p className="mt-4 max-w-xl text-lg md:text-xl text-gray-700">
          Not only Biryani..
          <br />
          But all the delicacies..
        </p>

        {/* Buttons */}
        <div className="flex gap-4 mt-8">

          <Link
            to="/Login"
            className="px-7 py-3 rounded-xl
            bg-black text-white font-semibold
            hover:bg-amber-500 transition-colors"
          >
            Sign In
          </Link>

          <Link
            to="/Login/Signup"
            className="px-7 py-3 rounded-xl
            border-2 border-black font-semibold
            hover:bg-black hover:text-white transition-colors"
          >
            Create Account
          </Link>

        </div>
      </div>
    </div>
  );
}

export default LandingPage;
