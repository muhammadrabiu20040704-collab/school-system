import Sidebar from "../components/admin/AdminSidebar";
import Navbar from "../components/Navbar";

import "../Styles/dashboard.css";

export default function DashboardLayout({ children }) {
    return (
        <div className="dashboard">

             <Sidebar />

             <div className="dashboard-content">
              
              <Navbar />

              <main className="main-contect">
                {children}
              </main>

             </div>

        </div>
    );
}