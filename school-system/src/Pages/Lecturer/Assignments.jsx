import { useEffect, useState } from "react";
import axios from "axios";
import LecturerLayout from "../../layouts/LecturerLayout";

import "../../styles/dashboard.css";


export default function Assignments(){


const token = localStorage.getItem("token");



const [assignments,setAssignments] = useState([]);

const [courses,setCourses] = useState([]);

const [showForm,setShowForm] = useState(false);



const [formData,setFormData] = useState({

title:"",
description:"",
courseId:"",
department:"",
level:"",
semester:"",
deadline:""

});





// GET ASSIGNMENTS

const fetchAssignments = async()=>{


try{


const res = await axios.get(

"http://localhost:3000/api/assignments",

{

headers:{
Authorization:`Bearer ${token}`
}

}

);


setAssignments(res.data);



}catch(error){

console.log(error);

}


};






// GET COURSES

const fetchCourses = async()=>{


try{


const res = await axios.get(

"http://localhost:3000/api/courses",

{

headers:{
Authorization:`Bearer ${token}`
}

}

);



setCourses(res.data);



}catch(error){

console.log(error);

}


};







useEffect(()=>{


fetchAssignments();

fetchCourses();


},[]);








const handleSubmit = async(e)=>{


e.preventDefault();



try{


await axios.post(


"http://localhost:3000/api/assignments",


formData,


{

headers:{
Authorization:`Bearer ${token}`
}

}


);



alert(
"Assignment created successfully"
);



setFormData({

title:"",
description:"",
courseId:"",
department:"",
level:"",
semester:"",
deadline:""

});



setShowForm(false);


fetchAssignments();



}catch(error){


console.log(error);


alert(
error.response?.data?.message ||
"Error creating assignment"
);


}



};







return(


<LecturerLayout>


<div className="page-content">



<h1>

My Assignments

</h1>





<div className="stats-grid">



<div className="stat-card">


<h3>

Total Assignments

</h3>


<p>

{assignments.length}

</p>


</div>




<div className="stat-card">


<h3>

My Courses

</h3>


<p>

{courses.length}

</p>


</div>




</div>







<button

className="btn btn-primary"

onClick={()=>setShowForm(true)}

>

Create Assignment

</button>









<div className="table-card">


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
Department
</th>


<th>
Level
</th>


<th>
Semester
</th>


<th>
Deadline
</th>


</tr>


</thead>




<tbody>



{


assignments.length > 0 ?



assignments.map((item)=>(


<tr key={item._id}>


<td>

{item.title}

</td>



<td>

{item.course?.title}

</td>



<td>

{item.department?.name}

</td>



<td>

{item.level}

</td>



<td>

{item.semester}

</td>



<td>

{
item.deadline
?
new Date(item.deadline)
.toLocaleDateString()
:
"-"
}

</td>



</tr>


))



:



<tr>


<td colSpan="6">

No Assignment Found

</td>


</tr>



}





</tbody>




</table>



</div>









{

showForm && (


<div className="modal-overlay">


<div className="modal">



<h2>

Create Assignment

</h2>





<form
onSubmit={handleSubmit}
className="department-form"
>




<input

placeholder="Title"

value={formData.title}


onChange={(e)=>

setFormData({

...formData,

title:e.target.value

})

}

/>





<textarea

placeholder="Description"

value={formData.description}


onChange={(e)=>

setFormData({

...formData,

description:e.target.value

})

}

/>





<select


value={formData.courseId}


onChange={(e)=>{


const course =
courses.find(
c=>c._id===e.target.value
);



setFormData({

...formData,

courseId:e.target.value,

department:
course.department?._id || ""

})


}}



>


<option>

Select Course

</option>



{

courses.map((course)=>(


<option

key={course._id}

value={course._id}

>


{course.title}


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


<option value="">

Select Level

</option>


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


<option value="">

Select Semester

</option>


<option>
First
</option>


<option>
Second
</option>



</select>






<input

type="date"

value={formData.deadline}


onChange={(e)=>

setFormData({

...formData,

deadline:e.target.value

})

}


/>







<button

className="btn btn-success"

type="submit"

>

Save Assignment

</button>







<button

type="button"

className="btn btn-danger"


onClick={()=>setShowForm(false)}

>

Cancel

</button>






</form>





</div>


</div>


)



}





</div>



</LecturerLayout>


);


}