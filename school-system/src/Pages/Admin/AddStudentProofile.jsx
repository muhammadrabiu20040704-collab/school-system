import {useEffect,useState} from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";

import AdminLayout from "../../layouts/AdminLayout";


export default function AddStudentProfile(){


const [users,setUsers]=useState([]);

const [departments,setDepartments]=useState([]);

const [search,setSearch]=useState("");

const [selectedUser,setSelectedUser]=useState(null);


const navigate=useNavigate();


const token=localStorage.getItem("token");



const [formData,setFormData]=useState({

userId:"",
admissionNumber:"",
department:"",
level:"ND1",
semester:"First"

});





useEffect(()=>{


fetchUsers();

fetchDepartments();


},[]);







const fetchUsers=async()=>{


const res=await axios.get(

"http://localhost:3000/api/users",

{

headers:{
Authorization:`Bearer ${token}`
}

}

);


setUsers(

res.data.filter(
user=>user.role==="student"
)

);



};






const fetchDepartments=async()=>{


const res=await axios.get(

"http://localhost:3000/api/departments",

{

headers:{
Authorization:`Bearer ${token}`
}

}

);


setDepartments(res.data);



};






const handleSubmit=async(e)=>{


e.preventDefault();



try{


await axios.post(

"http://localhost:3000/api/student-profiles",

formData,

{

headers:{
Authorization:`Bearer ${token}`
}

}

);



alert("Student profile created");


navigate("/students");



}catch(error){


console.log(error);


alert(
error.response?.data?.message
);


}


};

const filteredUsers = users.filter(user=>

user.name
.toLowerCase()
.includes(search.toLowerCase())

||

user.email
.toLowerCase()
.includes(search.toLowerCase())

);



return(


<AdminLayout>


<div className="page-content">


<h1>
Create Student Profile
</h1>




<div className="table-card">


<form onSubmit={handleSubmit}>


<input

type="text"

placeholder="Search student..."

value={search}

onChange={(e)=>setSearch(e.target.value)}

/>



<div className="student-results">


{
filteredUsers.map(user=>(


<div

key={user._id}

onClick={()=>{

setSelectedUser(user);

setFormData({

...formData,

userId:user._id

});


}}

className="student-item"


>


{user.name}

<br/>

{user.email}


</div>


))
}


</div>

{
selectedUser && (

<div>

Selected:

<b>
{selectedUser.name}
</b>

</div>

)
}

<input

placeholder="Admission Number"

value={formData.admissionNumber}

onChange={(e)=>

setFormData({

...formData,

admissionNumber:e.target.value

})

}


/>









<select

value={formData.department}

onChange={(e)=>

setFormData({

...formData,

department:e.target.value

})

}

>


<option value="">
Select Department
</option>


{

departments.map(dept=>(


<option

key={dept._id}

value={dept._id}

>

{dept.name}

</option>


))


}



</select>







<select

value={formData.level}

onChange={(e)=>

setFormData({

...formData,

level:e.target.value

})

}

>


<option>
ND1
</option>


<option>
ND2
</option>


<option>
HND1
</option>


<option>
HND2
</option>



</select>







<select

value={formData.semester}

onChange={(e)=>

setFormData({

...formData,

semester:e.target.value

})

}

>


<option>
First
</option>


<option>
Second
</option>


</select>







<button className="btn btn-primary">

Save Profile

</button>



</form>



</div>


</div>


</AdminLayout>


);


}