import React, { startTransition, useEffect, useState } from 'react';

function Tophomepage(){
const greetings=[
  "Not just South Asian, but Rustic...",
  "Not just Biryani, covers the whole India",
  "All your delicacies located at one spot",
  "Michelin 5 star rated from 2025 onwards..",
  "Food that you can't cook from YOUTUBE!!"
]

  const [greeting,setGreeting]=useState(0);
  const [panned,setHasPanned] =useState(false);

useEffect(() => {
    const k = setInterval(() => {
      setGreeting(prev => (prev + 1) % greetings.length);
    }, 2000);

    return () => clearInterval(k);
 }, []);



return (
  <>
      <section className='w-full py-20 px-4 md:p-50 top-18 grid grid-cols-1 
      bg-slate-200 justify-center items-center relative overflow-hidden'>

          {/* Left Star: Raised higher on desktop using md:top-8 */}
          <img src="star.png" className='w-12 h-12 absolute top-4 left-0 
          mix-blend-darken hue-rotate-45 animate-[spin_8s_linear_infinite] 
          md:w-96 md:h-96 md:top-8 md:left-[-9vw] md:opacity-100'/>

                <div className="relative mx-auto px-6 py-6 md:px-8 md:py-5 bg-linear-to-r 
                from-amber-900/15 to-amber-900/40 rounded-2xl shadow-xl 
                backdrop-blur-md text-center duration-500 hover:scale-[1.02] w-full max-w-lg">
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 
                bg-amber-600 text-white text-[10px] font-bold px-3 py-0.5 rounded-full 
                uppercase tracking-widest shadow-sm">
                Our Specality
                </span>
                <p className="text-base sm:text-xl md:text-2xl font-bold text-slate-800 
                tracking-tight italic w-full">
                {greetings[greeting]}
                </p>
                </div>

          {/* Right Star: Raised higher on desktop using md:top-8 */}
          <img src="star.png" className='w-10 h-10 absolute bottom-4 right-0 
          mix-blend-darken hue-rotate-45 animate-[spin_8s_linear_infinite] 
          md:w-96 md:h-96 md:top-8 md:right-[-9vw] md:opacity-100'/>
      </section>
  </>
  );
};

export default Tophomepage;