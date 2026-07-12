import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import LecturerLayout from "../../layouts/LecturerLayout";

const AttendanceDetails = () => {

    const { courseId, date } = useParams();

    const token = localStorage.getItem("token");

    const [records, setRecords] = useState([]);

    const [loading, setLoading] = useState(true);

    const [statusMap, setStatusMap] = useState({});

    const decodedDate = decodeURIComponent(date);

    const fetchAttendance = async () => {

    try {

        const res = await axios.get(

            `http://localhost:3000/api/attendance/course/${courseId}/date/${decodedDate}`,

            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }

        );

        setRecords(res.data);

        const initialStatus = {};

res.data.forEach((item) => {

    initialStatus[item._id] = item.status;

});

setStatusMap(initialStatus);

    } catch (error) {

        console.log(error);

    } finally {

        setLoading(false);

    }

};

const handleStatusChange = (attendanceId, value) => {

    setStatusMap((prev) => ({

        ...prev,

        [attendanceId]: value

    }));

};

const handleUpdate = async (attendanceId) => {

    try {

        await axios.put(

            `http://localhost:3000/api/attendance/${attendanceId}`,

            {

                status: statusMap[attendanceId]

            },

            {

                headers: {

                    Authorization: `Bearer ${token}`

                }

            }

        );

        alert("Attendance updated successfully");

    } catch (error) {

        console.log(error);

        alert("Failed to update attendance");

    }

};

useEffect(() => {

    fetchAttendance();

}, []);

if (loading) {

    return (

        <LecturerLayout>

            <div className="page-content">

                <h2>Loading...</h2>

            </div>

        </LecturerLayout>

    );

}

if (history.length === 0) {

    return (

        <LecturerLayout>

            <div className="page-content">

                <h2>No Attendance Details Available</h2>

            </div>

        </LecturerLayout>

    );

}

    return (

        <LecturerLayout>

            <div className="page-content">

                <h1>Attendance Details</h1>

                <div className="table-card">

    <table>

        <thead>

            <tr>

                <th>Admission No</th>

                <th>Name</th>

                <th>Level</th>

                <th>Department</th>

                <th>Status</th>

                <th>Action</th>

            </tr>

        </thead>

        <tbody>

            {

                records.map((item) => (

                    <tr key={item._id}>

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

                            {item.profile.department.name}

                        </td>

                        <td>

                             <select
    value={statusMap[item._id] || item.status}
    onChange={(e) =>
        handleStatusChange(
            item._id,
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

                        <td>

                            <button
                                className="btn btn-primary"
                                onClick={() => handleUpdate(item._id)}
                            >
                                Update
                            </button>

                        </td>

                    </tr>

                ))

            }

        </tbody>

    </table>

</div>

            </div>

        </LecturerLayout>

    );

};

export default AttendanceDetails;