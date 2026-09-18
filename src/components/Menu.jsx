import React,{useState,useEffect} from 'react';
import CookingLoader from '../components/LoadingScreens/CookingLoader'
import axios from 'axios';
import Menu_Subsection from './Menu_Subsection';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import FilterSearch from './FilterSearch';

function Menu(){
  const [recipes,setRecipes]=useState([]);
  const [cuisine,setCuisine]=useState([]);
  const [loading,isLoading] = useState(true);
  const [filterby,setfilterby]=useState({
    "search":"",
    "cuisine":"",
    "veg-only":false
  })

  async function getdata(){
    try{
        const response = await axios("https://dummyjson.com/recipes?limit=150");
        setRecipes(response.data.recipes)
        setCuisine(response.data.cuisine)
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
  },[])

  function updatefilter(id,value){
    setfilterby((prev)=>({...prev,[id]:value}))
  }

  return loading?<CookingLoader/>:(
    <div>
      <div className='bg-[#2B1B17] px-5 pt-20 pb-6'>
        <h1 className='flex justify-center font-bold 
        font-[helevetica] italic tracking-wide text-[20px] md:text-[60px] text-white'>
          - - - Our Menu - - - 
        </h1>
      </div>

      <section className='bg-transparent h-25'>
        <div className='relative w-full max-w-[80vw] md:max-w-4xl mx-auto mt-10'>
          <MagnifyingGlassIcon className="absolute left-4 w-6 h-6 top-3 
          text-gray-600 pointer-events-none" />
          <input 
            type="text"
            placeholder="Search recipes..."
            className='w-full bg-transparent py-3 pl-12 pr-5
            rounded-2xl hover:bg-gray-100 border-[0.02vw] outline-none text-black'
            onChange={(e)=>updatefilter("search", e.target.value)}
          />
                  {/*Filter Buttons*/}
          <div className='absolute right-3 h-50 top-1'>
              <FilterSearch 
                filterby={filterby}
                updatefilter={updatefilter}
                cuisine={["Indian", "Italian", "Brazilian","NOG"]}
              />
            </div>

        </div>

      </section>

      <Menu_Subsection menuClass="BREAKFAST" recipie_list={recipes} additional={filterby}/>
      <Menu_Subsection menuClass="LUNCH" recipie_list={recipes} additional={filterby}/>    
      <Menu_Subsection menuClass="DINNER" recipie_list={recipes} additional={filterby}/> 
      <Menu_Subsection menuClass="DESSERT" recipie_list={recipes} additional={filterby}/>   
      <Menu_Subsection menuClass="BEVERAGE" recipie_list={recipes} additional={filterby}/> 
    </div>
  )
}
export default Menu;