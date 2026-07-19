import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import AdminLayout from "../../layouts/AdminLayout";
import "../../styles/dashboard.css";


export default function Students() {


const [students,setStudents] = useState([]);

const [departments,setDepartments] = useState([]);

const [search,setSearch] = useState("");

const [department,setDepartment] = useState("");

const [level,setLevel] = useState("");

const [selectedStudent,setSelectedStudent] = useState(null);

const [editingStudent, setEditingStudent] = useState(null);

const [formData, setFormData] = useState({
  admissionNumber:"",
  department:"",
  level:"",
  semester:""
});



const token = localStorage.getItem("token");



// GET STUDENTS

const fetchStudents = async()=>{


try{


const res = await axios.get(

"http://localhost:3000/api/student-profiles",

{

headers:{

Authorization:`Bearer ${token}`

}

}

);


setStudents(res.data);



}catch(error){

console.log(error);

}


};




// GET DEPARTMENTS

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


fetchStudents();

fetchDepartments();


},[]);





// SEARCH + FILTER


const filteredStudents =
students.filter((student)=>{


const text =
search.toLowerCase();



const matchSearch =

student.user?.name
?.toLowerCase()
.includes(text)


||

student.user?.email
?.toLowerCase()
.includes(text)


||

student.admissionNumber
?.toLowerCase()
.includes(text);




const matchDepartment =

!department ||

student.department?._id === department;




const matchLevel =

!level ||

student.level === level;



return (

matchSearch &&
matchDepartment &&
matchLevel

);



});






// DELETE STUDENT PROFILE


const deleteStudent = async(id)=>{


if(!window.confirm(
"Delete student?"
))
return;



try{


await axios.delete(

`http://localhost:3000/api/student-profiles/${id}`,

{

headers:{

Authorization:`Bearer ${token}`

}

}

);


fetchStudents();



}catch(error){

console.log(error);

}



};

const handleEdit = (student)=>{

setEditingStudent(student);

setFormData({

admissionNumber:
student.admissionNumber,

department:
student.department?._id,

level:
student.level,

semester:
student.semester

});


};

const handleUpdate = async(e)=>{

e.preventDefault();


try{

const token =
localStorage.getItem("token");


await axios.put(

`http://localhost:3000/api/student-profiles/${editingStudent._id}`,

formData,

{
headers:{
Authorization:`Bearer ${token}`
}
}

);


alert("Student updated");


setEditingStudent(null);


fetchStudents();


}catch(error){

console.log(error);

}

};



return (


<AdminLayout>


<div className="page-content">


<h1>
Students
</h1>




<Link

to="/students/add"

className="page-content a"

>

+ Add Student

</Link>





<div className="stats-grid">


<div className="stat-card">

<h3>

Total Students

</h3>


<p>

{students.length}

</p>


</div>



<div className="stat-card">

<h3>

ND Students

</h3>


<p>

{

students.filter(
s=>
s.level==="ND1" ||
s.level==="ND2"
).length

}

</p>


</div>




<div className="stat-card">

<h3>

HND Students

</h3>


<p>

{

students.filter(
s=>
s.level==="HND1" ||
s.level==="HND2"
).length

}

</p>


</div>



</div>






<div className="filters">


<input

type="text"

placeholder="Search student..."

value={search}

onChange={(e)=>
setSearch(e.target.value)
}

/>






<select

value={department}

onChange={(e)=>
setDepartment(e.target.value)
}

>


<option value="">

All Departments

</option>


{

departments.map((dept)=>(


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

value={level}

onChange={(e)=>
setLevel(e.target.value)
}

>


<option value="">

All Levels

</option>


<option value="ND1">
ND1
</option>


<option value="ND2">
ND2
</option>


<option value="HND1">
HND1
</option>


<option value="HND2">
HND2
</option>


</select>


</div>







<div className="table-card">



<table>


<thead>


<tr>

<th>Name</th>

<th>Email</th>

<th>Admission</th>

<th>Department</th>

<th>Level</th>

<th>Actions</th>


</tr>


</thead>




<tbody>


{

filteredStudents.map((student)=>(


<tr key={student._id}>


<td>

{student.user?.name}

</td>



<td>

{student.user?.email}

</td>




<td>

{student.admissionNumber}

</td>




<td>

{student.department?.name}

</td>




<td>

{student.level}

</td>




<td>


<button

className="btn btn-success"

onClick={()=>setSelectedStudent(student)}

>

View

</button>




<button

className="btn btn-danger"

onClick={()=>deleteStudent(student._id)}

>

Delete

</button>


<button

className="btn btn-accent"

onClick={()=>handleEdit(student)}

>

Edit

</button>


</td>



</tr>



))


}



</tbody>



</table>


</div>
{
editingStudent && (

<div className="modal-overlay">

<div className="modal">


<h2>
Edit Student Profile
</h2>


<form onSubmit={handleUpdate}>


<input

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
departments.map((dept)=>(

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



<button

className="btn btn-primary"

type="submit"

>

Save Changes

</button>



<button

type="button"

className="btn btn-danger"

onClick={()=>setEditingStudent(null)}

>

Cancel

</button>


</form>


</div>

</div>

)
}







{

selectedStudent &&

<div className="modal-overlay">


<div className="modal">


<h2>
Student Profile
</h2>



<p>

Name:

{selectedStudent.user?.name}

</p>



<p>

Email:

{selectedStudent.user?.email}

</p>




<p>

Admission:

{selectedStudent.admissionNumber}

</p>




<p>

Department:

{selectedStudent.department?.name}

</p>




<p>

Level:

{selectedStudent.level}

</p>



<button

className="btn btn-primary"

onClick={()=>setSelectedStudent(null)}

>

Close

</button>



</div>


</div>


}





</div>


</AdminLayout>


);


}