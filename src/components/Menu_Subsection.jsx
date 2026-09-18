import { useState,useEffect } from "react";

function Menu_Subsection({menuClass,recipie_list,additional}){
const [currentPage,setCurrentPage]=useState(0);
const meatKeywords = ["beef", "lamb", "chicken", "pork", "shrimp", "fish"]; 
const oniongarlic = ["onion", "garlic"];
  const [isMobile,setIsMobile]=useState(false);
  const per_page=isMobile?1:4;

const totalfiltered=recipie_list
    .filter(item =>
      item.mealType.some(type => type.toUpperCase() === menuClass)
    )
     .filter(item => 
    additional["search"] ? item.name.toLowerCase().includes(additional["search"].toLowerCase()) : true
    )
    .filter(item =>
      additional["veg-only"] ?!meatKeywords.some(meat=> item.ingredients.join(" ").toLowerCase().includes(meat)) : true
    )
    .filter(item =>
      additional["NOG"] ?!oniongarlic.some(og=> item.ingredients.join(" ").toLowerCase().includes(og)) : true
    )
    .filter(item =>
      additional["cuisine"] ? item.cuisine === additional["cuisine"] || item.tags.includes(additional["cuisine"]) : true
    );

const total=Math.ceil(totalfiltered.length/per_page);
const start=currentPage*per_page;
const visible_items= totalfiltered.slice(start,start+per_page)

  useEffect(() => {
    setCurrentPage(0);

          setIsMobile(window.innerWidth < 640);
        const handleResize = () => {
        setIsMobile(window.innerWidth < 640);
        };

  // 3. Attach listener
        window.addEventListener('resize', handleResize);

  }, [additional]);
  
function handleleftclick(){
          setCurrentPage(prev=>prev-1)
}
function handlerightclick(){
          setCurrentPage(prev=>prev+1)
}return(
<section className='border-t-2 bg-[#FBF8F5] text-black py-10 px-5'>
  <div className='max-w-7xl mx-auto'>
    {totalfiltered.length === 0 ? (
      <p className='text-center text-gray-600 py-6'>No recipes found for {menuClass.toLowerCase()}.</p>
    ) : (
      <>
            <div className="mb-8 text-3xl font-[helevetica]
            font-semibold flex flex-wrap md:justify-center 
            lg:grid-cols-4 gap-6">
                <h2>
                {menuClass}
                </h2>
            </div>
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 
                        lg:grid-cols-4 gap-6'> 
          {visible_items.map((res)=>(
            <div key={res.id} 
                className='flex wrap flex-col justify-center mx-auto
                rounded-3xl p-2 bg-white'>
                <img 
                src={res.image}
                className='h-60 w-60 rounded-3xl'/>
            <p>{res.name}</p>
            </div>
          ))}
        </div>
        <div className='flex flex-wrap justify-end w-full'>
          <button className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full font-serif border-2
          ${currentPage === 0?"cursor-not-allowed bg-gray-500":""}`}
          disabled={currentPage === 0}
          onClick={handleleftclick}> ←</button>
          <button className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full font-serif border-2
          ${currentPage === total-1?"cursor-not-allowed bg-gray-500":""}`}
          disabled={currentPage === total-1}
          onClick={handlerightclick}> →</button>
        </div>
      </>
    )}
  </div>
</section> 
)
}

export default Menu_Subsection