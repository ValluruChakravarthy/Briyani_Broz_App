import React, { useState, useEffect } from 'react';


const ingredients = [
  { img: "beet.png", alt: 'beet' },
  { img: "lettuce.png", alt: 'lettuce' },
  { img: "onion.png", alt: 'onion' },
];

// Fixed random-ish spots around the cooker (percentage-based, avoids the exact center)
const positions = [
  { top: '5%', left: '10%' },
  { top: '10%', left: '75%' },
  { top: '25%', left: '5%' },
  { top: '70%', left: '80%' },
  { top: '80%', left: '15%' },
  { top: '40%', left: '2%' },
  { top: '45%', left: '85%' },
];

function CookingLoader() {
  const [visibleItem, setVisibleItem] = useState(null);

  useEffect(() => {
    const interval = setInterval(() => {
      const randomIngredient = ingredients[Math.floor(Math.random() * ingredients.length)];
      const randomPosition = positions[Math.floor(Math.random() * positions.length)];
      setVisibleItem({ ...randomIngredient, ...randomPosition, key: Date.now() });
    }
    
    , 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative flex flex-col items-center justify-center py-20 mt-20 gap-4 
    bg=transparent z-10 md:py-1 md:mt-0">

      {/* Randomly appearing/disappearing ingredient */}
      {visibleItem && (
        <img
          key={visibleItem.key}
          src={visibleItem.img}
          alt={visibleItem.alt}
          className="absolute w-[7vw] h-[7vw] animate-fade-pop"
          style={{ top: visibleItem.top, left: visibleItem.left }}
        />
      )}

      {/* Cooker, fixed in the middle */}
      <div className="relative z-10">
        <img src="cooker.png" alt="cooker" className="w-[24vw] h-[18vw] 
        animate-bounce-slow
        mix-blend-multiply " />
      </div>

      <p className="text-black text-[3vw] z-10 font-[Helevetica] font-extrabold
      tracking-tight italic">
        Cooking up your biryani...
      </p>
    </div>
  );
}

export default CookingLoader;