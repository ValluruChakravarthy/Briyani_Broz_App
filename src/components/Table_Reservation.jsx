import { useEffect, useState } from 'react';
import { FormStructure } from './FormStructure';
import supabase from '../supabase';
import ConfirmBooking from './ConfirmBooking';

import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import { Form } from 'react-router-dom';

const slottime = [
  { id: 0, time: "9AM", value: "09:00:00" },
  { id: 1, time: "10AM", value: "10:00:00" },
  { id: 2, time: "11AM", value: "11:00:00" },
  { id: 3, time: "12PM", value: "12:00:00" },
  { id: 4, time: "1PM", value: "13:00:00" },
  { id: 5, time: "2PM", value: "14:00:00" },
  { id: 6, time: "3PM", value: "15:00:00" },
  { id: 7, time: "4PM", value: "16:00:00" },
  { id: 8, time: "5PM", value: "17:00:00" }
];
//Handlign this because supabase is formatted in en-CA
const formatDate = (date) => {
  if (!date) return "";
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};
const imagecard=["https://assets.cntraveller.in/photos/68931f2345b24142f6811ac5/16:9/w_2560%2Cc_limit/Bungalow%2520%25C2%25A9%2520Katrine%2520Moite_3P4A9726-HDR.jpg",
          "https://www.architectandinteriorsindia.com/cloud/2021/11/15/Story-3-1.gif",
          "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/07/6f/1f/ff/spice-art.jpg"
]

function TableReservation() {
const [currentImage,setCurrentImage]=useState(0);
const [slotSelected,setSlotSelected]=useState(null);
const [selectedDate,setSelectedDate]=useState(null);
const [bookedSlots, setBookedSlots] = useState([]);
const [mybookedSlots,setmybookedSlots]= useState([]);
const [showConfirmed,setShowConfirmed] =useState(false);
const [confirmedMessage,setConfirmedMessage] = useState("");

useEffect(()=>{
          const timing=setInterval(()=>{
          setCurrentImage((prev)=> (prev + 1) % (imagecard.length)) 
          },4000)
          return()=>clearInterval(timing)

},[])

async function getslots(date){

  
    if(!date) return;
     const dateString =  formatDate(date);
    console.log("Fetching slots for:", dateString);
     try{
      const { data, error } = await supabase
      .from('public_slots')
      .select("DateChosen,TimeSlotChosen")  
      .eq("DateChosen", dateString) 

      if (error) {
      console.log(error);
      return;
    }

//Defining curretn suer because first these will be filled green
  const {data:{user}} =await supabase.auth.getUser();

  //Setting all booked slots to disable
      setBookedSlots(data.map((booking)=>booking.TimeSlotChosen))
    
  //Get your booking slot here

      const { data: myBookings, error: myError } = await supabase
      .from("Chakri_Restaurant_DB")
      .select("TimeSlotChosen")
      .eq("DateChosen", dateString)
      .eq("Email", user.email);

    if (myError) {
      console.log(myError);
      return;
    }

    setmybookedSlots(
      myBookings.map((booking) => booking.TimeSlotChosen)
    );
     }catch(error){
      console.log(error)
     }

}


async function handleSubmit(e) {
  
  e.preventDefault();   
  if (!selectedDate) {alert("Please select a date");return;}
  if (!slotSelected) {alert("Please select a Time Slot");return;}

    // Read the form data
    const formData = new FormData(e.currentTarget);

    /*Used to do this to get data and check it appended date and time with formd data
    formData.append("selectedDate",selectedDate);
    formData.append("selectedSlot",slotSelected);

    const data = Object.fromEntries(formData.entries());
    console.log(`You booked data${JSON.stringify(data)}`);*/

    const booking = {
    DateChosen:formatDate(selectedDate),
    TimeSlotChosen: slotSelected,
    CustomerName: formData.get("CustomerName"),
    Noofpeople: Number(formData.get("Noofpeople")),
    PhoneNumber: formData.get("PhoneNumber"),
    Email: formData.get("Email")
    };

//Send to SUpabase DB
try {
      const { error } = await supabase
        .from("Chakri_Restaurant_DB")
        .insert([booking]);

      if (error) {
        alert(`Booking failed: ${error.message}`);
        return;
      }
//Clear targets,getslots,setconfirmation message
      setConfirmedMessage(`Table booked for ${booking.DateChosen} at ${booking.TimeSlotChosen}!`);
      setShowConfirmed(true);
      getslots(selectedDate);
      setSlotSelected(null);
    } catch (error) {
      alert(`Unexpected error: ${error.message}`);
    }
}

  return (
    <div>
      {showConfirmed && (
      <ConfirmBooking 
        message={confirmedMessage} 
        onClose={() => setShowConfirmed(prev=>!prev)} 
      />
    )}
      {/*SLide photo secitons */}
          <section className="relative top-18">
          <img className='w-full h-[52vw] overflow-clip' src={imagecard[currentImage]}/>
          <div className="absolute inset-0 flex items-center justify-center">
          <div className="bg-white/20 backdrop-blur-lg border border-white/30
       rounded-2xl w-full max-w-[70vw] text-center p-6 sm:p-[4vw]">
          <h2 className="text-md sm:text-[1.7vw] md:text-[2.4vw] font-bold text-white mb-3">
          Experience the True Indian Cuisine
          </h2>
          <p className="text-black text-sm sm:text-[1.4vw]">
          Good food tastes better when shared. Book your table now for an authentic Indian feast
          </p>
          </div>
      
       </div>
      </section>

{/*LEFT CALENDAR APRT*/}
<section className='max-w-7xl mx-auto py-40 px-8 grid grid-cols-1 md:grid-cols-2 gap-10'>
      <div className='flex flex-col gap-6 items-center border-2 p-6 md:rounded-[20%]'>
<label className="font-extrabold text-slate-800 ">Select Date</label>

            <DayPicker
            key={selectedDate}
              mode="single"
              disabled={{ before: new Date() }}
              selected={selectedDate}
              onSelect={(date)=>{
                setSelectedDate(date);
                setSlotSelected(null);
                getslots(date);
              }}
              classNames={{
              chevron: "fill-amber-500",
              selected: "bg-amber-500 text-white rounded-full",
              today: "font-bold text-amber-600",
              }}
            />
      <div>

        {/* Booking legend */}
  <div className="flex gap-5 mb-4 text-sm">

    <div className="flex items-center gap-2">
      <span className="w-4 h-4 rounded bg-green-800"></span>
      <span>Your booking</span>
    </div>

    <div className="flex items-center gap-2">
      <span className="w-4 h-4 rounded bg-red-500"></span>
      <span>Someone booked</span>
    </div>

  </div>

          <form className='gap-4 grid grid-cols-3 text-md'>
              {selectedDate?slottime.map((res)=>{
                const isbooked = bookedSlots.includes(res.value);
                return(
                  <button
                    key={res.id}
                    onClick={()=>setSlotSelected(res.value)}
                    className={`px-4 py-1 rounded-lg ${
                  mybookedSlots.includes(res.value)
                    ? "bg-green-800 text-white cursor-not-allowed"
                    : bookedSlots.includes(res.value)
                    ? "bg-red-500 text-white cursor-not-allowed opacity-20"
                    : slotSelected === res.value
                    ? "bg-amber-500 text-white"
                    : "border border-slate-300 hover:border-amber-500"
                }`}
                    disabled={isbooked}
                    type="button"
                  >
                    {res.time}
                  </button>
                )}):<div className=' left-[30%] mb-auto font-bold md:left-[21vw] grid md:w-7xl absolute md:text-lg'>
                  Please select the Day</div>}
          </form>
            </div>
      </div>

      <form className='flex flex-col gap-4 p-6' onSubmit={handleSubmit}>
        <p className='text-center mx-auto font-extrabold text-slate-800 '>Reserve your slot</p>
             <div className='flex flex-col gap-10 m-6'>
              {FormStructure.map((obj)=>{
                return(
                  //Did this way to show that in industry there are so many vars to handle
                  <input 
                    key={obj.name}
                    name={obj.name} 
                    className={obj.className} 
                    type={obj.type} 
                    placeholder={obj.placeholder} 
                  />
                )
              })
              }   
              <button
              className='submit text-black text-lg 
              font-bold border-slate-950 border-[0.01vw] text-center
               hover:bg-slate-700 py-2 px-1 rounded-lg hover:text-white'
               >Submit</button>          
              </div>
        </form>
    </section>
    </div>
  );
}



export default TableReservation;