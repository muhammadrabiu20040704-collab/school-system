import {Link} from "react-router-dom";
import {
    FaTachometerAlt,
    FaBook,
    FaChartBar,
    FaUser,
    FaTasks
} from "react-icons/fa";

export default function StudentSidebar(){

    return(
        <div className="sidebar"> 
        <h2>Student Panal</h2>

        <ul>

            <li>
          <Link to="/student-dashboard">
          <FaTachometerAlt />
            Dashboard
            </Link>
            </li>
        
           <li>
            <Link to="/my-courses">
            <FaBook />
             My Courses
            </Link>
           </li>

            <li>
                <Link to="/results">
                <FaChartBar />
                Results
                </Link>
            </li>

            <li>
                <Link to="/student-profile">
                <FaUser />
                Profile
                </Link>
            </li>

            <li>
                <Link to="/my-assignments">
                <FaTasks />
                MyAssignments
                </Link>
            </li>
 
        </ul>

        
        </div>
        
    );
}