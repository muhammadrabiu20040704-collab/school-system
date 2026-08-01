import { Link} from "react-router-dom";
import {
  FaTachometerAlt,
  FaBuilding,
  FaBook,
  FaUserGraduate,
  FaChalkboardTeacher,
  FaUsers,
  FaCalendarAlt,
  FaBullhorn,
  FaTasks,
  FaCog
} from "react-icons/fa";

import { MdOutlineDateRange } from "react-icons/md";


export default function Sidebar() {
    return (
        <div className="sidebar">
            <h2>Z-SYSTEM</h2>

            <ul>
                <li>
                    <Link to="/admin-dashboard">
                    <FaTachometerAlt />
                        dashboard
                    </Link>
                </li>
                
                <li>
                    <Link to="/academic-sessions">
                    <FaCalendarAlt />
                         Academic
                    </Link>
                </li>
                <li>
                     <Link to="/semesters">
                    <MdOutlineDateRange />
                         Semesters
                    </Link>
                </li>

                <li>
                    <Link to="/departments">
                    <FaBuilding />
                    Departments
                    </Link>
                </li>

                <li>
                    <Link to="/courses">
                    <FaBook />
                    Courses
                    </Link>
                </li>

                <li>
                    <Link to="/students">
                    <FaUserGraduate />
                    Students
                    </Link>
                </li>

                <li>
                    <Link to="/lecturers">
                    <FaChalkboardTeacher />
                    Lecturers
                    </Link>
                </li>
                <li>
  <Link to="/announcements">
    <FaBullhorn />
    Announced
  </Link>
</li>

<li>
  <Link to="/assignments">
    <FaTasks />
    Assignments
  </Link>
</li>

                <li>

<Link to="/admin/users">
<FaUsers />
Users

</Link>

</li>
<li>
  <Link to="/settings">
    <FaCog />
    Settings
  </Link>
</li>

                   
            </ul>

        </div>
    );
}