import React, { useEffect, useState } from "react";
import supabase from "../supabase";

function Profile() {
  const [user, setUser] = useState(null);
  const [bookings, setBookings] = useState([]);
const formatDate = (date) => { 
  if (!date) return ""; 
  const year = date.getFullYear(); 
  const month = String(date.getMonth() + 1).padStart(2, "0"); 
  const day = String(date.getDate()).padStart(2, "0"); 
  return `${year}-${month}-${day}`; 
};
  useEffect(() => {
    getBookings();
  }, []);

  async function getBookings() {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) return;
    setUser(user);
    const { data, error } = await supabase
      .from("Chakri_Restaurant_DB")
      .select("*")
      .eq("user_id",user.id);

    if (error) {
      console.log(error);
      return;
    }

    setBookings(data);
  }

  const today = formatDate(new Date());

  const upcoming = bookings.filter(
    (booking) => booking.DateChosen >= today
    
  );



  return (
    <div className="w-screen pt-20 p-6 bg-[#fafaf9]">
      
<div className="max-w-screen mx-auto">


<div className="text-xl font-bold text-center mb-10 md:text-3xl">
  <h1 className="text-md font-bold text-[#3D1E16] md:text-3xl">
    {user?.user_metadata?.full_name}
  </h1>

  <p className="text-slate-600 mt-2">
    {user?.email}
  </p>

  <p className="text-slate-600">
    {user?.user_metadata?.phone}
  </p>
</div>
      <h2 className=" text-2xl font-bold mb-5">
        Upcoming Bookings
      </h2>

      <div className="flex flex-wrap gap-5">

        {upcoming.map((booking, index) => (
          <div
            key={index}
            className="border rounded-xl p-5 w-full md:w-80 bg-slate-700/10"
          >
            <h3 className="text-xl font-bold text-[#3D1E16]">
              {booking.CustomerName}
            </h3>

           <div className="mt-4 space-y-2 text-slate-700">
            <p>Date: {booking.DateChosen}</p>
            <p>Time: {booking.TimeSlotChosen}</p>
            <p>People: {booking.Noofpeople}</p>
            <p>Email: {booking.Email}</p>
            <p>Phone: {booking.PhoneNumber}</p>
            </div>
          </div>
        ))}

      </div>

      {upcoming.length === 0 && (
        <p>No upcoming bookings.</p>
      )}
<h2 className="text-2xl font-bold mt-10 mb-5"> Previous Bookings </h2>


<div className="flex flex-wrap gap-5">
{bookings
  .filter((booking) => booking.DateChosen < today)
  .map((booking, index) => (
    <div
      className="border rounded-xl p-5 w-full md:w-80 shadow"
      key={index}
    >
      <div>
        <p>{booking.CustomerName}</p>
        <p>{booking.Email}</p>
      </div>

      <div>
        <p>{booking.DateChosen}</p>
        <p>{booking.TimeSlotChosen}</p>
      </div>
    </div>
  ))}

      </div>
</div>
    </div>
  );
}

export default Profile;

