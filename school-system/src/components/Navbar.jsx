import { useEffect, useState } from "react";


export default function Navbar() {


const [user,setUser] = useState(null);



useEffect(()=>{


const savedUser = localStorage.getItem("user");


if(savedUser){

setUser(
JSON.parse(savedUser)
);

}



},[]);





const logout = ()=>{


localStorage.removeItem("token");

localStorage.removeItem("user");


window.location.href="/login";


};




return (


<div className="navbar">


<h2>

Welcome {user?.name || "User"}

</h2>



<button

onClick={logout}

className="btn btn-warning"

>

Logout

</button>



</div>


);


}