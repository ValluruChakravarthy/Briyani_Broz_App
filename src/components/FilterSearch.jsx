import { useState, useRef, useEffect } from 'react';
import { FunnelIcon } from '@heroicons/react/24/outline';

function FilterSearch({filterby,cuisine,updatefilter}){

const [open,setOpen]=useState(false);
const ref=useRef(null);

useEffect(() => {
    function handleClickOutside(e) {
      if (ref.current && !ref.current.contains(e.target)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);



return(
<div className=' flex justify-end' ref={ref}>
          <button className='border-2 px-4 py-2 rounded-full text-sm bg-slate-400
          hover:bg-amber-500' 
                    onClick={() => setOpen(!open)}>
                                      <FunnelIcon className="w-5 h-5 text-black" />
          </button> 
          {open &&
          <>
          <div className='absolute top-10 right-0 mt-2 bg-white rounded-2xl shadow-lg border 
          border-gray-200 z-10 w-72 p-4 flex flex-wrap gap-2'>
          
          <button 
          className={`px-4 py-1.5 rounded-full text-sm border transition-colors
          ${filterby["veg-only"] 
          ? "bg-green-500 text-white border-green-500" 
          : "bg-gray-100 text-gray-700 border-gray-200 hover:bg-gray-200"}`}
          onClick={() => updatefilter("veg-only", !filterby["veg-only"])}
          >
          🌱 Veg-only
          </button>
           <button 
          className={`px-4 py-1.5 rounded-full text-sm border transition-colors
          ${filterby["NOG"] 
          ? "bg-green-500 text-white border-green-500" 
          : "bg-gray-100 text-gray-700 border-gray-200 hover:bg-gray-200"}`}
          onClick={() => updatefilter("NOG", !filterby["NOG"])}
          >
          🧅No Onion & Garlic🧄
          </button>
          

          {["Indian","Italian","Brazilian"].map(res => (
          <button
          key={res}
          className={`px-4 py-1.5 rounded-full text-sm border transition-colors
          ${filterby.cuisine === res 
          ? "bg-blue-500 text-white border-blue-500" 
          : "bg-gray-100 text-gray-700 border-gray-200 hover:bg-gray-200"}`}
          onClick={() => updatefilter("cuisine", filterby.cuisine === res ? "" : res)}
          >🤷
          {res}
          </button>
          ))}
          </div>
          </>
}
</div>
)
}
export default FilterSearch;