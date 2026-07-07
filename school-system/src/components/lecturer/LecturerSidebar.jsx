import {Link} from "react-router-dom";

export default function LecturerSidebar(){
    return (
        <div className="sidebar">

            <h2>Lecturer Panel</h2>

            <ul>
                <li>
                    <Link to="/lecturer-dashboard">
                    Dashboard
                    </Link>
                </li>

               <li>
                     <Link to="/lecturer/my-courses">
                    My Courses
                  </Link>
                </li>

                <li>
                    <Link to="/lecturer-students">
                    Students
                    </Link>
                </li>

                <li>
                    <Link to="/profile">
                   My Profile
                    </Link>
                </li>

                   <li>
                     <Link to="/lecturer/assignments">
                      Assignments
                     </Link>
                  </li>
            </ul>
        </div>
    );
}