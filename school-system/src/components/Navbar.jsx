export default function Navbar() {

  const user = JSON.parse(localStorage.getItem("user"));

  return ( 
    <div className="navbar">

      <h2>
        Welcome {user?.name}
      </h2>

      <button>
        Logout
      </button>

    </div>
  );
}