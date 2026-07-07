import StudentSidebar from "../components/student/StudentSidebar";
import Navbar from "../components/Navbar";


export default function StudentLayout({children}){


return (

<div className="dashboard">


<StudentSidebar/>


<div className="dashboard-content">


<Navbar/>


{children}


</div>


</div>

);

}