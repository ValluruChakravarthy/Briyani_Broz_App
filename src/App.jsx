import { useState } from 'react'
import Loginpage from './components/LoginFeature/Loginpage';
import Navbar from './components/Navbar'
import HomePage from './components/HomePage'
import Sidebar from './components/Sidebar';
import Menu from './components/Menu';
import TableReservations from './components/Table_Reservation';
import Signup from './components/LoginFeature/Signup';
import Signin from './components/LoginFeature/Signin';
import ProtectedRoute from './components/LoginFeature/ProtectedRoute';
import Profile from './components/Profile';
import LandingPage from './components/LandingPage';
import {BrowserRouter,Routes,Route} from 'react-router-dom';
import Footer from './components/Footer';

function App() {
  const [sidebar,setSidebar]=useState(false);
return(
<BrowserRouter>

      <div className='flex flex-col min-h-screen'>
        {/*I kept the aboe coz all these pan vertically and footer is always last
        Whatever the change footer sits last due to this*/}
        <div>
        <Navbar onClickMenu={()=>(setSidebar(prev=>!prev))}/>
        {sidebar&&<Sidebar onClickClose={()=>(setSidebar(false))}/>}
      </div>

        <Routes>
            <Route element={<ProtectedRoute/>}>
            <Route path="/Home" element={<HomePage />} />
            <Route path="/Menu" element={<Menu />} />
            <Route path="/Reservations" element={<TableReservations />} />
            <Route path="/Profile" element={<Profile />} />
            </Route>
             <Route path="/" element={<LandingPage/>}/>
       /*Keeping outlets for Login beacuse it has signup,register,forgotpass etc
      <Route path="/Login" element={<Loginpage />}>
        <Route index element={<Signin />} />
        <Route path="Signup" element={<Signup />} />
      </Route>

        </Routes>
  <Footer/>
  </div>
</BrowserRouter>
)
}

export default App
