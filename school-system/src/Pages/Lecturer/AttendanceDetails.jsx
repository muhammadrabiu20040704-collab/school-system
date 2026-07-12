import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import axios from "axios";
import LecturerLayout from "../../layouts/LecturerLayout";

const AttendanceDetails = () => {

    const { courseId, date } = useParams();

    const token = localStorage.getItem("token");

    const [records, setRecords] = useState([]);

    const [loading, setLoading] = useState(true);

    const [statusMap, setStatusMap] = useState({});
    
    const [course, setCourse] = useState(null);

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

const fetchCourse = async () => {

    try {

        const res = await axios.get(

            `http://localhost:3000/api/courses/${courseId}`,

            {

                headers: {

                    Authorization: `Bearer ${token}`

                }

            }

        );

        setCourse(res.data);

    } catch (error) {

        console.log(error);

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

const exportToExcel = () => {

    const excelData = records.map((item) => ({

        "Admission No": item.profile.admissionNumber,

        "Student Name": item.student.name,

        "Level": item.profile.level,

        "Department": item.profile.department.name,

        "Status": item.status

    }));

    const worksheet = XLSX.utils.json_to_sheet(excelData);

    const workbook = XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(
        workbook,
        worksheet,
        "Attendance"
    );

    const excelBuffer = XLSX.write(workbook, {
        bookType: "xlsx",
        type: "array"
    });

    const file = new Blob(
        [excelBuffer],
        {
            type:
                "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8"
        }
    );

    const attendanceDate = new Date(records[0].date);

const formattedDate =
`${attendanceDate.getDate()}-${
attendanceDate.getMonth()+1
}-${attendanceDate.getFullYear()}`;

    saveAs(

    file,

    `${course.code}_Attendance_${formattedDate}.xlsx`

);

};

useEffect(() => {

    fetchAttendance();
    fetchCourse();

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

                    <div className="page-header">

    <h2>Attendance Details</h2>

    <button
        className="btn btn-success"
        onClick={exportToExcel}
    >
        Export Excel
    </button>

</div>

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