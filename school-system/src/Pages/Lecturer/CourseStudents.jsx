import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

import LecturerLayout from "../../layouts/LecturerLayout";

export default function CourseStudents() {

    const { courseId } = useParams();

    const token = localStorage.getItem("token");

    const [students, setStudents] = useState([]);

    const [loading, setLoading] = useState(true);

    const [search, setSearch] = useState("");


    const fetchStudents = async () => {

    try {

        const res = await axios.get(
    `http://localhost:3000/api/lecturer-students/course/${courseId}/students`,
    {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
);

console.log(res.data);

setStudents(res.data);


    } catch (error) {

        console.log(error);

    } finally {

        setLoading(false);

    }

};
useEffect(() => {

    fetchStudents();

}, []);

const filteredStudents = students.filter((item) => {

    const keyword = search.toLowerCase();

    return (

        item.student?.name
            ?.toLowerCase()
            .includes(keyword)

        ||

        item.student?.email
            ?.toLowerCase()
            .includes(keyword)

        ||

        item.profile?.level
            ?.toLowerCase()
            .includes(keyword)

    );

});



if (loading) {

    return (

        <LecturerLayout>

            <div className="page-content">

                <h2>Loading...</h2>

            </div>

        </LecturerLayout>

    );

}

if (students.length === 0) {

    return (

        <LecturerLayout>

            <div className="page-content">

                <h2>No Students Found</h2>

            </div>

        </LecturerLayout>

    );

}

return (
    <LecturerLayout>
        <div className="page-content">
            <h1>Course Students</h1>


<div className="stats-grid">

    <div className="stat-card">

        <h3>Total Students</h3>

        <p>

            {filteredStudents.length}

        </p>

    </div>

</div>
       <div className="search-box">

    <input

        type="text"

        placeholder="Search student..."

        value={search}

        onChange={(e)=>setSearch(e.target.value)}

    />
    
<Link to={`/lecturer/attendance/${courseId}`}
    className="take attendance-btn"
>
    Take Attendance
</Link>
</div>

<div className="table-card">

    <table>

        <thead>

            <tr>

                <th>AdmissionNumber</th>

                <th>Name</th>

                <th>Level</th>

                <th>Semester</th>

                <th>Department</th>

            </tr>

        </thead>

        <tbody>

            {

                filteredStudents.length > 0 ?

                filteredStudents.map((item)=>(

                    <tr key={item.profile._id}>

                        <td>

                            {item.profile.admissionNumber} 

                        </td>

                        <td>

                            {item.student.name}

                        </td>

                        <td>

                            {item.profile.level}

                        </td>

                        <td>

                            {item.profile.semester}

                        </td>

                        <td>

                            {item.profile.department.name}

                        </td>

                    </tr>

                ))

                :

                <tr>

                    <td colSpan="5">

                        No Students Found

                    </td>

                </tr>

            }

        </tbody>

    </table>

</div>
        </div>
    </LecturerLayout>

);

}