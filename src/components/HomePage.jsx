  import React, { useEffect, useState } from 'react';
  import Tophomepage from './Tophomepage';
  import CookingLoader from '../components/LoadingScreens/CookingLoader'
  import axios from 'axios';
  import { useNavigate } from 'react-router-dom';

  function HomePage(){

  const [data,setData]=useState([]);
  const [loading,isLoading]=useState(true);
  const [CurrentPage,setCurrentPage]=useState(0);
  const [isMobile,setIsMobile]=useState(false);
    const navigate=useNavigate();
  async function getdata(){
    try{
        const response = await axios("https://dummyjson.com/recipes?limit=10");
        const recipes=response.data.recipes;
        setData(recipes)
    }
    catch(error){
      console.log("Error obtained is : ",error)
    }
    finally{
      isLoading(false);
    }
  }


  useEffect(()=>{
      getdata()

      setIsMobile(window.innerWidth < 640);
        const handleResize = () => {
        setIsMobile(window.innerWidth < 640);
        };

  // 3. Attach listener
        window.addEventListener('resize', handleResize);

  },[])
  

  const totallength=data.length;
  const per_page=isMobile?1:4;
  const noofpages=Math.ceil(totallength/per_page)
  const start = CurrentPage*per_page;
  const end=start+per_page;


const handleclick=function(n){
    setCurrentPage(n);
  }
function handleLeftClick(){
            console.log(CurrentPage)
            return setCurrentPage(prev=>(prev-1))
    }
function handleRightClick(){
              console.log(CurrentPage)
            return setCurrentPage(prev=>(prev+1))
    }
function handleNavigate(){
  navigate("/Menu");
}

      return(
        <div>
          <Tophomepage/>
          <div className='bg-[#FAF8F5] py-20 sm:py-20 md:py-40 px-4 sm:px-10 flex flex-wrap justify-center
          items-center gap-4 sm:gap-5'>
          {loading?<CookingLoader/>:
            <>
             <p className='text-center p-2 md:mt-10 italic tracking-[0.35em]
                 uppercase text-xl sm:text-md md:text-3xl w-full
                ' >--- Our Items ---</p>
                <p className='text-center py-4 px-2 mt-6 font-serif tracking-[0.15em] uppercase text-md 
                  sm:text-2xl md:text-3xl w-full cursor-pointer
                 transition-colors duration-200 hover:bg-amber-400 hover:text-white' 
                 onClick={()=>handleNavigate()}>→[ Explore Full Menu ]←</p>
                  {
                    data.slice(start,end).map((res)=>(
                    <div key={res.id} 
                        className='bg-white p-2 rounded-2xl shadow-md flex flex-col items-center justify-between w-60 sm:w-56 md:w-64'
                      >
                    <img 
                      id={res.id} 
                      src={res.image} 
                      className='h-50 w-50 sm:h-48 sm:w-48 md:h-56 md:w-56 rounded-xl object-fit' 
                    />
                    <p className='text-xs sm:text-sm md:text-base text-center mt-3 font-bold text-slate-800 line-clamp-2'>
                      {res.name}
                    </p>
                  </div>
                    ))
                  }
            </>
            }

            <div className='flex flex-row wrap text-center 
            justify-center font-bold text-sm sm:text-base w-full mt-2 gap-6 sm:gap-3 p-3 
            transform transition-all'>
                <button
                  className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full font-serif 
                    flex items-center justify-center border-2
                    ${CurrentPage === 0
                      ?'bg-slate-200/40 text-slate-400 cursor-not-allowed'
                    :'bg-slate-400 text-white hover:bg-slate-800'}`}
                      disabled={CurrentPage === 0}
                    onClick={handleLeftClick}
                  >
                    ←
                    </button>
                    
            <div className="hidden sm:flex items-center gap-2">
              {[...Array(noofpages).keys()].map((k) => (
                <div
                  key={k}
                  className={
                    "w-7 h-7 sm:w-8 sm:h-8 rounded-full transition-all hover:bg-slate-400 border-[0.05vw] gap-1 " +
                    (k === CurrentPage ? "font-extrabold border-[0.1vw] w-12 sm:h-6 sm:w-16 bg-slate-400" : "")
                  }
                  onClick={() => { handleclick(k) }}
                ></div>
              ))}
            </div>
                  <button
                  className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full font-serif 
                    flex items-center justify-center border-2
                    ${CurrentPage === noofpages - 1
                      ?'bg-slate-200/40 text-slate-400 cursor-not-allowed'
                    :'bg-slate-400 text-white hover:bg-slate-800'}`}
                    disabled={CurrentPage === noofpages - 1}
                    onClick={handleRightClick}
                  >
                    →
                    </button>
            </div>
          </div>


      </div>

      )
  }

  export default HomePage;
