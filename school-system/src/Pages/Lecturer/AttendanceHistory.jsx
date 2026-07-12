import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import LecturerLayout from "../../layouts/LecturerLayout";

const AttendanceHistory = () => {

    const { courseId } = useParams();

    const token = localStorage.getItem("token");

    const [history, setHistory] = useState([]);

    const [loading, setLoading] = useState(true);

    const fetchHistory = async () => {

    try {

        const res = await axios.get(

            `http://localhost:3000/api/attendance/course/${courseId}`,

            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }

        );

        setHistory(res.data);

        console.log("History Response:", res.data);

    } catch (error) {

        console.log(error);

    } finally {

        setLoading(false);

    }

};

useEffect(() => {

    fetchHistory();

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

                <h2>No Attendance History</h2>

            </div>

        </LecturerLayout>

    );

}

    return (

        <LecturerLayout>

            <div className="page-content">

                <h1>Attendance History</h1>

               <div className="table-card">

    <table>

        <thead>

            <tr>

                <th>Date</th>

                <th>Total</th>

                <th>Present</th>

                <th>Absent</th>

                <th>Late</th>

                <th>Excused</th>

                <th>Action</th>

            </tr>

        </thead>

        <tbody>

            {

                history.map((item) => (

                    <tr key={item._id}>

                        <td>

                            {new Date(item._id).toLocaleDateString()}

                        </td>

                        <td>

                            {item.totalStudents}

                        </td>

                        <td>

                            {item.present}

                        </td>

                        <td>

                            {item.absent}

                        </td>

                        <td>

                            {item.late}

                        </td>

                        <td>

                            {item.excused}

                        </td>

                        <td>

                            <Link  
    to={`/lecturer/attendance/details/${courseId}/${item._id}`}
    className="btn btn-primary"
>
    View
</Link>

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

export default AttendanceHistory;