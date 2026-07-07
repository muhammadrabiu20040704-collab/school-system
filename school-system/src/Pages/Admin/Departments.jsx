import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import AdminLayout from "../../layouts/AdminLayout";
import "../../styles/dashboard.css";


export default function Departments() {


const [departments,setDepartments]=useState([]);

const [formData,setFormData]=useState({

name:"",
code:""

});


const [editingDept,setEditingDept]=useState(null);

const [loading,setLoading]=useState(false);



const token = localStorage.getItem("token");





// ================= GET DEPARTMENTS =================


const fetchDepartments = async()=>{


try{


const res = await axios.get(

"http://localhost:3000/api/departments",

{

headers:{

Authorization:`Bearer ${token}`

}

}

);


setDepartments(res.data);



}catch(error){

console.log(error);

}



};




useEffect(()=>{

fetchDepartments();


},[]);








// ================= INPUT CHANGE =================


const handleChange=(e)=>{


setFormData({

...formData,

[e.target.name]:e.target.value


});


};







// ================= ADD + UPDATE =================



const handleSubmit=async(e)=>{


e.preventDefault();



try{


setLoading(true);



if(editingDept){



await axios.put(


`http://localhost:3000/api/departments/${editingDept._id}`,


formData,


{

headers:{

Authorization:`Bearer ${token}`

}

}



);


alert("Department updated successfully");




}else{



await axios.post(


"http://localhost:3000/api/departments",


formData,


{

headers:{

Authorization:`Bearer ${token}`

}

}


);



alert("Department added successfully");


}






setFormData({

name:"",
code:""

});


setEditingDept(null);


fetchDepartments();





}catch(error){


alert(
error.response?.data?.message ||
"Something went wrong"
);



}finally{


setLoading(false);


}



};









// ================= EDIT =================


const handleEdit=(dept)=>{


setEditingDept(dept);


setFormData({

name:dept.name,

code:dept.code


});



};









// ================= DELETE =================



const handleDelete=async(id)=>{


const confirmDelete =
window.confirm(
"Delete this department?"
);



if(!confirmDelete)
return;



try{


await axios.delete(


`http://localhost:3000/api/departments/${id}`,


{

headers:{

Authorization:`Bearer ${token}`

}

}


);



alert("Department deleted");


fetchDepartments();



}catch(error){


alert(

error.response?.data?.message ||

"Delete failed"

);


}



};








return (


<AdminLayout>


<div className="page-content">



<h1>
Departments Management
</h1>






<form

onSubmit={handleSubmit}

className="department-form"

>



<input


type="text"


name="name"


placeholder="Department Name"


value={formData.name}


onChange={handleChange}



/>






<input


type="text"


name="code"


placeholder="Department Code"


value={formData.code}


onChange={handleChange}


/>





<button


type="submit"


className="btn btn-primary"


>



{

loading ?

"Saving..." :

editingDept ?

"Update Department"

:

"Add Department"


}



</button>






{

editingDept && (


<button


type="button"


className="btn btn-danger"


onClick={()=>{


setEditingDept(null);


setFormData({

name:"",
code:""

});


}}



>


Cancel Edit


</button>


)

}



</form>









<div className="table-card">



<table>



<thead>


<tr>


<th>
Name
</th>


<th>
Code
</th>


<th>
Actions
</th>


</tr>


</thead>





<tbody>



{

departments.map((dept)=>(



<tr key={dept._id}>


<td>

{dept.name}

</td>


<td>

{dept.code}

</td>






<td>



<Link


to={`/departments/${dept._id}/courses`}


className="btn btn-primary"


>


View Courses


</Link>






<button


className="btn btn-success"


onClick={()=>handleEdit(dept)}


>

Edit


</button>








<button


className="btn btn-danger"


onClick={()=>handleDelete(dept._id)}


>


Delete


</button>





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