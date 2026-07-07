import { Link} from "react-router-dom";

export default function Sidebar() {
    return (
        <div className="sidebar">
            <h2>School System</h2>

            <ul>
                <li>
                    <Link to="/admin-dashboard">
                        dashboard
                    </Link>
                </li>

                <li>
                    <Link to="/departments">
                    Departments
                    </Link>
                </li>

                <li>
                    <Link to="/courses">
                    Courses
                    </Link>
                </li>

                <li>
                    <Link to="/students">
                    Students
                    </Link>
                </li>

                <li>
                    <Link to="/lecturers">
                    Lecturers
                    </Link>
                </li>
                   
            </ul>

        </div>
    );
}