import { useEffect, useState } from "react";
import axios from "axios";
import AdminLayout from "../../layouts/AdminLayout";
import ConfirmModal from "../../components/ConfirmModal";
import "../../styles/dashboard.css";

export default function Semesters() {

const [semesters, setSemesters] = useState([]);

const [academicSessions, setAcademicSessions] = useState([]);

const [semester, setSemester] = useState("");

const [selectedSession, setSelectedSession] = useState("");

const [search, setSearch] = useState("");

const [showModal, setShowModal] = useState(false);

const [editingSemester, setEditingSemester] = useState(null);

const [loading, setLoading] = useState(false);

const [sessionFilter, setSessionFilter] = useState("");

const [showConfirm, setShowConfirm] = useState(false);

const [confirmType, setConfirmType] = useState("");

const [selectedSemester, setSelectedSemester] = useState(null);

const token = localStorage.getItem("token");

const fetchSemesters = async () => {
    try {

        const res = await axios.get(
            "http://localhost:3000/api/semesters",
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );

        setSemesters(res.data);

    } catch (error) {

        console.log(error);

    }
};

const fetchAcademicSessions = async () => {
    try {

        const res = await axios.get(
            "http://localhost:3000/api/academic-sessions",
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );

        setAcademicSessions(res.data);

    } catch (error) {

        console.log(error);

    }
};

const updateSemester = async () => {
    if (!editingSemester || !selectedSession || !semester.trim()) {
        return;
    }

    setLoading(true);

    try {
            await axios.put(
                `http://localhost:3000/api/semesters/${editingSemester._id}`,
                {
                    name: semester,
                    academicSession: selectedSession,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            await fetchSemesters();
            setShowModal(false);
            setSemester("");
            setSelectedSession("");
            setEditingSemester(null);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };
const filteredSemesters = semesters.filter((semester) => {

    const matchesSearch =
        semester.name
            ?.toLowerCase()
            .includes(search.toLowerCase());

    const matchesSession =
        !sessionFilter ||
        semester.academicSession?._id === sessionFilter;

    return matchesSearch && matchesSession;

});

const createSemester = async () => {

    try {

       if (!semester.trim() || !selectedSession) {
    return alert("Please fill all fields");
}

        setLoading(true);

        await axios.post(
            "http://localhost:3000/api/semesters",
            {
                name: semester,
                academicSession: selectedSession
            },
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );

        fetchSemesters();

        setSemester("");

        setSelectedSession("");

        setShowModal(false);

    } catch (error) {

        console.log(error);

        alert(
            error.response?.data?.message ||
            "Failed to create semester"
        );

    } finally {

        setLoading(false);

    }

};

const activateSemester = async (id) => {
    try {

        await axios.put(
            `http://localhost:3000/api/semesters/${id}/activate`,
            {},
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );

        await fetchSemesters();

    } catch (error) {

        console.log(error);

        alert(
            error.response?.data?.message ||
            "Failed to activate semester"
        );

    }
};

const archiveSemester = async (id) => {
    try {

        await axios.put(
            `http://localhost:3000/api/semesters/${id}/archive`,
            {},
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );

        await fetchSemesters();

    } catch (error) {

        console.log(error);

        alert(
            error.response?.data?.message ||
            "Failed to archive semester"
        );

    }
};

useEffect(() => {
    const loadInitialData = async () => {
        await Promise.all([fetchSemesters(), fetchAcademicSessions()]);
    };

    loadInitialData();
}, []);




    return (
      <AdminLayout>
        <div>

            <h2>Semester Management</h2>

        
        <div className="search-filter-container">

        <input
    type="text"
    placeholder="Search semester..."
    value={search}
    onChange={(e) => setSearch(e.target.value)}
/>

<select
    value={sessionFilter}
    onChange={(e) => setSessionFilter(e.target.value)}
>

    <option value="">
        All Sessions
    </option>

    {academicSessions.map((session) => (

        <option
            key={session._id}
            value={session._id}
        >
            {session.session}
        </option>

    ))}

</select>

<button
    className="btn btn-primary"
    onClick={() => {
        setEditingSemester(null);
        setSemester("");
        setSelectedSession("");
        setShowModal(true);
    }}
>
    + Create Semester
</button>
</div>

<div className="table-card">
    <table>

    <thead>

        <tr>

            <th>#</th>

            <th>Semester</th>

            <th>Academic Session</th>

            <th>Status</th>

            <th>Actions</th>

        </tr>

    </thead>

    <tbody>

        {filteredSemesters.map((semester, index) => (

            <tr key={semester._id}>

                <td>{index + 1}</td>

                <td>{semester.name}</td>

                <td>
                    {semester.academicSession?.session}
                </td>

                <td>

                    {semester.isActive
                        ? "Active"
                        : "Inactive"}

                </td>

                <td>

                    <button
    className="btn btn-primary"
    onClick={() => {
        setEditingSemester(semester);
        setSemester(semester.name);
        setSelectedSession(semester.academicSession?._id || "");
        setShowModal(true);
    }}
>
    Edit
</button>

                  <button
    className="btn btn-success"
    disabled={semester.isActive}
    onClick={() => {
        setSelectedSemester(semester);
        setConfirmType("activate");
        setShowConfirm(true);
    }}
>
    {semester.isActive ? "Active" : "Activate"}
</button>
                  <button
    className="btn btn-danger"
    disabled={semester.isActive}
    onClick={() => {
        setSelectedSemester(semester);
        setConfirmType("archive");
        setShowConfirm(true);
    }}
>
    Archive
</button>

                </td>

            </tr>

        ))}

    </tbody>

</table>
</div>
{showModal && (

<div className="modal-overlay">

    <div className="modal">

        <h2>

            {editingSemester
                ? "Edit Semester"
                : "Create Semester"}

        </h2>

        <select
            value={selectedSession}
            onChange={(e) =>
                setSelectedSession(e.target.value)
            }
        >

            <option value="">
                Select Academic Session
            </option>

            {academicSessions.map((session) => (

                <option
                    key={session._id}
                    value={session._id}
                >
                    {session.session}
                </option>

            ))}

        </select>

        <input
            type="text"
            placeholder="First Semester"
            value={semester}
            onChange={(e) =>
                setSemester(e.target.value)
            }
        />

        <div className="modal-actions">

            <button
                className="btn btn-secondary"
                onClick={() => {
    setShowModal(false);
    setSemester("");
    setSelectedSession("");
    setEditingSemester(null);
}}
            >
                Cancel
            </button>

            <button
                className="btn btn-primary"
                disabled={loading}
                onClick={
                    editingSemester
                        ? updateSemester
                        : createSemester
                }
            >

                {loading
                    ? editingSemester
                        ? "Updating..."
                        : "Saving..."
                    : editingSemester
                        ? "Update"
                        : "Save"}

            </button>

        </div>

    </div>
    {showConfirm && (
    <ConfirmModal
        message={
            confirmType === "activate"
                ? "Are you sure you want to activate this semester?"
                : "Are you sure you want to archive this semester?"
        }

        loading={loading}

        onCancel={() => {
            setShowConfirm(false);
            setSelectedSemester(null);
            setConfirmType("");
        }}

        onConfirm={async () => {

            if (confirmType === "activate") {

                await activateSemester(selectedSemester._id);

            } else if (confirmType === "archive") {

                await archiveSemester(selectedSemester._id);

            }

            setShowConfirm(false);
            setSelectedSemester(null);
            setConfirmType("");

        }}
    />
)}

</div>

)}
</div>
        </AdminLayout>
    );

}