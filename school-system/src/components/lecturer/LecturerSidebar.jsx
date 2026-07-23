import {Link} from "react-router-dom";
import {
    FaTachometerAlt,
    FaBook,
    FaUserGraduate,
    FaUser,
    FaTasks
} from "react-icons/fa";

export default function LecturerSidebar(){
    return (
        <div className="sidebar">

            <h2>Lecturer Panel</h2>

            <ul>
                <li>
                    <Link to="/lecturer-dashboard">
                    <FaTachometerAlt />
                    Dashboard
                    </Link>
                </li>

               <li>
                     <Link to="/lecturer/my-courses">
                     <FaBook />
                    My Courses
                  </Link>
                </li>

                <li>
                    <Link to="/lecturer-students">
                    <FaUserGraduate />
                    Students
                    </Link>
                </li>

                <li>
                    <Link to="/profile">
                    <FaUser />
                   My Profile
                    </Link>
                </li>

                   <li>
                     <Link to="/lecturer/assignments">
                     <FaTasks />
                      Assignments
                     </Link>
                  </li>
            </ul>
        </div>
    );
}