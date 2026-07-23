import { Link} from "react-router-dom";
import {
    FaTachometerAlt,
    FaBuilding,
    FaBook,
    FaUserGraduate,
    FaChalkboardTeacher,
    FaUsers
} from "react-icons/fa"

export default function Sidebar() {
    return (
        <div className="sidebar">
            <h2>School System</h2>

            <ul>
                <li>
                    <Link to="/admin-dashboard">
                    <FaTachometerAlt />
                        dashboard
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

<Link to="/admin/users">
<FaUsers />
Users

</Link>

</li>

                   
            </ul>

        </div>
    );
}