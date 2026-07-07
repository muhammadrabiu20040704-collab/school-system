import {Link} from "react-router-dom";

export default function StudentSidebar(){

    return(
        <div className="sidebar"> 
        <h2>Student Panal</h2>

        <ul>

            <li>
          <Link to="/student-dashboard">
            Dashboard
            </Link>
            </li>
        
           <li>
            <Link to="/my-courses">
             My Courses
            </Link>
           </li>

            <li>
                <Link to="/results">
                Results
                </Link>
            </li>

            <li>
                <Link to="/student-profile">
                Profile
                </Link>
            </li>

            <li>
                <Link to="/my-assignments">
                MyAssignments
                </Link>
            </li>
 
        </ul>

        
        </div>
        
    );
}