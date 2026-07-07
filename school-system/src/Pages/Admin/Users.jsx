import {useEffect,useState} from "react";
import axios from "axios";
import AdminLayout from "../../layouts/AdminLayout";

import "../../styles/dashboard.css";


export default function Users(){


const [users,setUsers]=useState([]);

const [search,setSearch]=useState("");

const token=localStorage.getItem("token");



const fetchUsers=async()=>{


try{


const res=await axios.get(

"http://localhost:3000/api/users",

{

headers:{
Authorization:`Bearer ${token}`
}

}

);


setUsers(res.data);



}catch(error){

console.log(error);

}


};





useEffect(()=>{

fetchUsers();

},[]);







const changeRole=async(id,action)=>{


try{


await axios.put(

`http://localhost:3000/api/users/${action}/${id}`,

{},

{

headers:{
Authorization:`Bearer ${token}`
}

}

);


fetchUsers();



}catch(error){

console.log(error);

}



};






const filtered=users.filter((user)=>{


return (

user.name
.toLowerCase()
.includes(search.toLowerCase())


||

user.email
.toLowerCase()
.includes(search.toLowerCase())

);


});





return (

<AdminLayout>


<div className="page-content">


<h1>

Users Management

</h1>



<input

className="search-input"

placeholder="Search users..."

value={search}

onChange={(e)=>
setSearch(e.target.value)
}

/>






<div className="table-card">


<table>


<thead>


<tr>

<th>Name</th>

<th>Email</th>

<th>Role</th>

<th>Actions</th>


</tr>


</thead>



<tbody>


{

filtered.map((user)=>(


<tr key={user._id}>


<td>

{user.name}

</td>



<td>

{user.email}

</td>




<td>

{user.role}

</td>





<td>




{

user.role !== "lecturer" &&


<button

className="btn btn-success"

onClick={()=>changeRole(
user._id,
"make-lecturer"
)}

>

Make Lecturer

</button>


}







{

user.role !== "admin" &&


<button

className="btn btn-primary"

onClick={()=>changeRole(
user._id,
"make-admin"
)}

>

Make Admin

</button>


}








{

user.role==="lecturer" &&


<button

className="btn btn-warning"

onClick={()=>changeRole(
user._id,
"remove-lecturer"
)}

>

Remove Lecturer

</button>


}





{

user.role==="admin" &&


<button

className="btn btn-danger"

onClick={()=>changeRole(
user._id,
"remove-admin"
)}

>

Remove Admin

</button>


}




</td>



</tr>



))


}



</tbody>



</table>



</div>





</div>


</AdminLayout>


);



}