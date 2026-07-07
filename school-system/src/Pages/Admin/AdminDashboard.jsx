import DashboardLayout from "../../layouts/DashboardLayout";

export default function AdminDashboard() {
  return (
    <DashboardLayout>

      <div className="page-content">
        <h1>Admin Dashboard</h1>

        <div className="stats-grid">

          <div className="stat-card">
            <h3>Departments</h3>
            <p>10</p>
          </div>
          <div className="stat-card">
            <h3>Total Students</h3>
            <p>1,256</p>
          </div>
          <div className="stat-card">
            <h3>Total Lecturer</h3>
            <p>20</p>
          </div>
          <div className="stat-card">
            <h3>Total Courses</h3>
            <p>50</p>
          </div>
        </div>
      </div>

    </DashboardLayout>
  );
}