import { useEffect, useState } from "react";
import axios from "axios";
import AdminLayout from "../../layouts/AdminLayout";
import "../../styles/dashboard.css";

export default function AcademicSessions() {
const [sessions, setSessions] = useState([]);

const [session, setSession] = useState("");

const [editingSession, setEditingSession] = useState("null");

const [showEditModal, setShowEditModal] = useState(false);

const [editSession, setEditSession] = useState("");

const [showModal, setShowModal] = useState(false);

const [loading, setLoading] = useState(false);

const fetchAcademicSessions = async () => {

  try {

    const token = localStorage.getItem("token");

    const res = await axios.get(
      "http://localhost:3000/api/academic-sessions",
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );

    setSessions(res.data);

  } catch (error) {
    console.log(error);
  }

};

const activateSession = async (id) => {

  try {

    const token = localStorage.getItem("token");

    await axios.put(
      `http://localhost:3000/api/academic-sessions/${id}/activate`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );

    fetchAcademicSessions();

  } catch (error) {
    console.log(error);
  }

};

const createAcademicSession = async () => {
  setLoading(true);

  try {

    if (!session.trim()) {
      alert("Academic Session is required");
      return;
    }

    const token = localStorage.getItem("token");

    await axios.post(
      "http://localhost:3000/api/academic-sessions",
      {
        session
      },
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );

    setShowModal(false);

    setSession("");

    fetchAcademicSessions();

  } catch (error) {

    console.log(error);

  }finally{

setLoading(false);



  }

};

const updateAcademicSession = async () => {

  try {

    if (!editSession.trim()) {
      alert("Academic Session is required");
      return;
    }

    setLoading(true);

    const token = localStorage.getItem("token");

    await axios.put(
      `http://localhost:3000/api/academic-sessions/${editingSession._id}`,
      {
        session: editSession
      },
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );

    setShowEditModal(false);

    setEditingSession(null);

    setEditSession("");

    fetchAcademicSessions();

  } catch (error) {

    console.log(error);

  } finally {

    setLoading(false);

  }

};

const archiveAcademicSession = async (id) => {

  try {

    const token = localStorage.getItem("token");

    await axios.put(
      `http://localhost:3000/api/academic-sessions/${id}/archive`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );

    fetchAcademicSessions();

  } catch (error) {
    console.log(error);
  }

};

useEffect(() => {
  const loadAcademicSessions = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get(
        "http://localhost:3000/api/academic-sessions",
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      setSessions(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  loadAcademicSessions();
}, []);

  return (
    <AdminLayout>

      <div className="dashboard-Content">

        <h1>
          Academic Sessions
        </h1>

        <button
  className="btn btn-primary"
  onClick={() => setShowModal(true)}
>
  + New Session
</button>

        <div className="dashboard-Content">
          <div className="table-card">

  <table>

    <thead>
      <tr>
        <th>Session</th>
        <th>Status</th>
        <th>Actions</th>
      </tr>
    </thead>

    <tbody>

      {sessions.map((session) => (

        <tr key={session._id}>

          <td>{session.session}</td>

          <td>

            {session.isArchived ? (

              <span className="badge archived">
                Archived
              </span>

            ) : session.isActive ? (

              <span className="badge active">
                Active
              </span>

            ) : (

              <span className="badge inactive">
                Inactive
              </span>

            )}

          </td>

          <td>

            {session.isArchived ? (

              <button
                className="btn btn-secondary"
              >
                View
              </button>

            ) : (

              <>

                {!session.isActive && (

                 <button
  className="btn btn-success"
  onClick={() => activateSession(session._id)}
>
  Activate
</button>

                )}

               <button
className="btn btn-danger"
onClick={() => archiveAcademicSession(session._id)}
>

Archive

</button>
               <button
className="btn btn-primary"
onClick={() => {
  setEditingSession(session);
  setEditSession(session.session);
  setShowEditModal(true);
}}

>

Edit

</button>

              </>

            )}

          </td>

        </tr>

      ))}

    </tbody>

  </table>

</div>

{
showModal && (

<div className="modal-overlay">

<div className="modal">

<h2>

Create Academic Session

</h2>

<input
  type="text"
  placeholder="2026/2027"
  value={session}
  onChange={(e)=>setSession(e.target.value)}
/>

<div className="modal-actions">

<button
className="btn btn-secondary"
disabled={loading}
onClick={()=>setShowModal(false)}
>

Cancel

</button>

<button
className="btn btn-primary"
disabled={loading}
onClick={createAcademicSession}
>

{loading ? "Saving..." : "Save"}

</button>

</div>

</div>

</div>

)
}

{
showEditModal && (

<div className="modal-overlay">

<div className="modal">

<h2>

Edit Academic Session

</h2>

<input
  type="text"
  placeholder="2026/2027"
  value={editSession}
  onChange={(e)=>setEditSession(e.target.value)}
/>

<div className="modal-actions">

<button
className="btn btn-secondary"
disabled={loading}
onClick={()=>setShowEditModal(false)}
>

Cancel

</button>

<button
className="btn btn-primary"
disabled={loading}
onClick={updateAcademicSession}
>

{loading ? "Updating..." : "Update"}

</button>

</div>

</div>

</div>

)
}

        </div>

      </div>

    </AdminLayout>
  );

}