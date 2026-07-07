import { useEffect, useState } from "react";
import axios from "axios";

import StudentLayout from "../../layouts/StudentLayout";

import "../../styles/dashboard.css";


export default function StudentDashboard(){


const [assignments,setAssignments] = useState([]);

const [loading,setLoading] = useState(true);


const token = localStorage.getItem("token");





const fetchAssignments = async()=>{


try{


const res = await axios.get(

"http://localhost:3000/api/assignments/my",

{

headers:{

Authorization:`Bearer ${token}`

}

}

);



setAssignments(res.data);



}catch(error){


console.log(error);


}finally{


setLoading(false);


}


};







useEffect(()=>{


fetchAssignments();


},[]);







if(loading){

return(

<h2>

Loading...

</h2>

)

}








return(


<StudentLayout>


<div className="page-content">



<h1>

Student Dashboard

</h1>







<div className="stats-grid">



<div className="stat-card">


<h3>

My Assignments

</h3>


<p>

{assignments.length}

</p>


</div>



<div className="stat-card">


<h3>

Pending

</h3>


<p>

{assignments.length}

</p>


</div>



</div>









<div className="table-card">


<h2>

Assignments

</h2>




<table>


<thead>


<tr>


<th>

Title

</th>


<th>

Course

</th>


<th>

Lecturer

</th>


<th>

Deadline

</th>


<th>

Action

</th>


</tr>


</thead>







<tbody>



{


assignments.length > 0 ?



assignments.map((assignment)=>(



<tr key={assignment._id}>



<td>

{assignment.title}

</td>




<td>

{

assignment.course?.title

}

</td>





<td>

{

assignment.lecturer?.name

}

</td>





<td>

{

assignment.deadline ?

new Date(
assignment.deadline
)
.toLocaleDateString()

:

"-"

}

</td>





<td>


<button

className="btn btn-primary"

>

View

</button>



</td>



</tr>


))



:



<tr>


<td colSpan="5">


No Assignment Available


</td>


</tr>



}





</tbody>





</table>





</div>






</div>



</StudentLayout>



);


}