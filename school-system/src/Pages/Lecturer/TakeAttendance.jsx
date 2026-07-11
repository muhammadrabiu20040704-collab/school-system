import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import LecturerLayout from "../../layouts/LecturerLayout";

const TakeAttendance = () => {

    const { courseId } = useParams();

    const token = localStorage.getItem("token");

    const [students, setStudents] = useState([]);

    const [attendance, setAttendance] = useState({});
    const [loading, setLoading] = useState(true);

    const [date, setDate] = useState(
    new Date().toISOString().split("T")[0]
);

    // ============================
    // FETCH STUDENTS
    // ============================
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

            setStudents(res.data);

        } catch (error) {

            console.log(error);

        } finally {

            setLoading(false);

        }

    };

    // ============================
    // HANDLE STATUS CHANGE
    // ============================
    const handleStatusChange = (studentId, status) => {

        setAttendance((prev) => ({

            ...prev,

            [studentId]: status

        }));

    };
    const handleSubmit = async () => {

    try {

        const attendanceData = students.map((item) => ({

            student: item.student._id,

            status: attendance[item.student._id] || "Present"

        }));

        const payload = {

            courseId,

            date,

            attendance: attendanceData

        };

        const res = await axios.post(

            "http://localhost:3000/api/attendance",

            payload,

            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }

        );

        alert(res.data.message);

    } catch (error) {

        console.log(error);

        alert(

            error.response?.data?.message ||

            "Failed to save attendance"

        );

    }

};

    useEffect(() => {

        fetchStudents();

    }, []);

    // ============================
    // LOADING
    // ============================
    if (loading) {

        return (

            <LecturerLayout>

                <div className="page-content">

                    <h2>Loading...</h2>

                </div>

            </LecturerLayout>

        );

    }

    // ============================
    // NO STUDENTS
    // ============================
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

                <h1>Take Attendance</h1>

                <div className="form-group">

    <label>Date</label>

    <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
    />

</div>

                <div className="table-card">

                    <table>

                        <thead>

                            <tr>

                                <th>Admission Number</th>

                                <th>Name</th>

                                <th>Level</th>

                                <th>Status</th>

                            </tr>

                        </thead>

                        <tbody>

                            {

                                students.map((item) => (

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

                                            <select className="btn btn-success"

                                                value={
                                                    attendance[item.student._id] || "Present"
                                                }

                                                onChange={(e) =>

                                                    handleStatusChange(

                                                        item.student._id,

                                                        e.target.value

                                                    )

                                                }

                                            >

                                                <option value="Present">

                                                    Present

                                                </option>

                                                <option value="Absent">

                                                    Absent

                                                </option>

                                                <option value="Late">

                                                    Late

                                                </option>

                                                <option value="Excused">

                                                    Excused

                                                </option>

                                            </select>

                                        </td>

                                    </tr>

                                ))

                            }

                        </tbody>

                    </table>

                </div>

                <div
                    style={{
                        marginTop: "20px",
                        display: "flex",
                        justifyContent: "flex-end"
                    }}
                >

                    <button className="btn btn-primary"
                    onClick={handleSubmit}
                    >

                        Save Attendance

                    </button>

                </div>

            </div>

        </LecturerLayout>

    );

};

export default TakeAttendance;