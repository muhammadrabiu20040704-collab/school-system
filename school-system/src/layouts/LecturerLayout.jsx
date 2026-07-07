import LecturerSidebar from "../components/lecturer/LecturerSidebar";
import Navbar from "../components/Navbar";


export default function LecturerLayout({children}){


return (

<div className="dashboard">


<LecturerSidebar/>


<div className="dashboard-content">


<Navbar/>


{children}


</div>


</div>

);

}