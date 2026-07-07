import { useEffect, useState } from "react";
import axios from "axios";
import AdminLayout from "../../layouts/AdminLayout";

import "../../styles/dashboard.css";


export default function Lecturers(){


const [lecturers,setLecturers] = useState([]);

const [departments,setDepartments] = useState([]);


const [search,setSearch] = useState("");

const [departmentFilter,setDepartmentFilter] = useState("");


const [selectedLecturer,setSelectedLecturer] = useState(null);

const [editLecturer,setEditLecturer] = useState(null);

const [createProfile,setCreateProfile] = useState(null);


const [currentPage,setCurrentPage] = useState(1);


const perPage = 10;


const token = localStorage.getItem("token");





// ===============================
// FETCH LECTURERS
// ===============================

const fetchLecturers = async()=>{


try{


const res = await axios.get(

"http://localhost:3000/api/lecturers",

{

headers:{
Authorization:`Bearer ${token}`
}

}

);


setLecturers(res.data);



}catch(error){

console.log(error);

}


};







// ===============================
// FETCH DEPARTMENTS
// ===============================


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


fetchLecturers();

fetchDepartments();


},[]);









// ===============================
// FILTER
// ===============================


const filteredLecturers = lecturers.filter((lecturer)=>{


const text = search.toLowerCase();



const searchMatch =

lecturer.name
?.toLowerCase()
.includes(text)

||

lecturer.email
?.toLowerCase()
.includes(text)

||

lecturer.profile?.staffId
?.toLowerCase()
.includes(text);




const departmentMatch =

!departmentFilter ||

lecturer.profile?.departments?.some(

(d)=>d._id === departmentFilter

);



return (

searchMatch &&
departmentMatch

);


});






// RESET PAGE


useEffect(()=>{

setCurrentPage(1);

},[search,departmentFilter]);







// PAGINATION


const lastIndex =
currentPage * perPage;


const firstIndex =
lastIndex - perPage;



const currentLecturers =

filteredLecturers.slice(

firstIndex,

lastIndex

);



const pages = Math.ceil(

filteredLecturers.length /

perPage

);


// ===============================
// DELETE LECTURER
// ===============================

const deleteLecturer = async(id)=>{


if(!window.confirm(
"Delete lecturer?"
))
return;



try{


await axios.delete(

`http://localhost:3000/api/lecturers/${id}`,

{

headers:{
Authorization:`Bearer ${token}`
}

}

);



alert("Lecturer deleted");


fetchLecturers();



}catch(error){

console.log(error);

}



};







// ===============================
// UPDATE LECTURER
// ===============================


const handleUpdateLecturer = async(e)=>{


e.preventDefault();



try{


await axios.put(


`http://localhost:3000/api/lecturers/user/${editLecturer._id}`,


{


name:editLecturer.name,

email:editLecturer.email


},


{

headers:{
Authorization:`Bearer ${token}`
}

}


);





if(editLecturer.profile?._id){


await axios.put(


`http://localhost:3000/api/lecturers/profile/${editLecturer.profile._id}`,


{


departments:editLecturer.departments,

staffId:editLecturer.staffId


},


{

headers:{
Authorization:`Bearer ${token}`
}

}


);


}




alert(
"Lecturer updated successfully"
);



setEditLecturer(null);


fetchLecturers();



}catch(error){


console.log(error);


}



};









// ===============================
// CREATE PROFILE
// ===============================


const handleCreateProfile = async(e)=>{


e.preventDefault();



try{


await axios.post(

"http://localhost:3000/api/lecturers",

{


userId:createProfile._id,

departments:createProfile.departments,

staffId:createProfile.staffId


},


{

headers:{
Authorization:`Bearer ${token}`
}

}


);



alert(
"Profile created"
);



setCreateProfile(null);


fetchLecturers();



}catch(error){

console.log(error);

}



};




return(


<AdminLayout>


<div className="page-content">



<h1>
Lecturers Management
</h1>





{/* =====================
CARDS
===================== */}



<div className="stats-grid">



<div className="stat-card">

<h3>
Total Lecturers
</h3>


<p>
{
lecturers.length
}
</p>


</div>





<div className="stat-card">

<h3>
With Profile
</h3>


<p>

{

lecturers.filter(

(l)=>l.profile

).length

}

</p>


</div>






<div className="stat-card">

<h3>
Without Profile
</h3>


<p>

{

lecturers.filter(

(l)=>!l.profile

).length

}

</p>


</div>






<div className="stat-card">

<h3>
Departments
</h3>


<p>

{

new Set(

lecturers.flatMap(

(l)=>

l.profile?.departments?.map(

(d)=>d._id

)||[]

)

).size


}

</p>


</div>




</div>








{/* FILTER */}



<div className="filters">



<input

className="search-input"

placeholder="Search lecturer..."

value={search}

onChange={(e)=>

setSearch(e.target.value)

}


/>





<select

value={departmentFilter}

onChange={(e)=>

setDepartmentFilter(e.target.value)

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




</div>









{/* TABLE */}



<div className="table-card">



<table>



<thead>


<tr>

<th>Name</th>

<th>Email</th>

<th>Departments</th>

<th>Staff ID</th>

<th>Actions</th>


</tr>


</thead>




<tbody>



{

currentLecturers.length > 0 ?


currentLecturers.map((lecturer)=>(


<tr key={lecturer._id}>


<td>

{lecturer.name}

</td>



<td>

{lecturer.email}

</td>




<td>


{

lecturer.profile?.departments?.map(dept=>(
<span key={dept._id}>
{dept.name}<br/>
</span>
))

 ||

"No Profile"

}



</td>





<td>


{

lecturer.profile?.staffId ||

"-"

}


</td>





<td>


<button
className="btn btn-primary"
onClick={()=>
setSelectedLecturer(lecturer)
}
>
View
</button>



{
!lecturer.profile && (

<button

className="btn btn-warning"

onClick={()=>


setCreateProfile({

...lecturer,

departments:[],

staffId:""


})


}

>

Create Profile

</button>


)

}




{
lecturer.profile && (

<button
  className="btn btn-success"
  onClick={() =>
    setEditLecturer({
      ...lecturer,

      departments: Array.isArray(lecturer.profile?.departments)
        ? lecturer.profile.departments.map((d) => d._id)
        : [],

      staffId: lecturer.profile?.staffId || ""
    })
  }
>
  Edit
</button>


)

}





<button
className="btn btn-danger"
onClick={()=>
deleteLecturer(lecturer._id)
}
>
Delete
</button>


</td>




</tr>


))


:


<tr>

<td colSpan="5">

No lecturers found

</td>

</tr>


}




</tbody>



</table>



</div>



{

selectedLecturer && (


<div className="modal-overlay">


<div className="modal">


<h2>
Lecturer Details
</h2>




<p>

<strong>Name:</strong>

{selectedLecturer.name}

</p>




<p>

<strong>Email:</strong>

{selectedLecturer.email}

</p>





<p>

<strong>Departments:</strong>

{

selectedLecturer.profile?.departments?.map(

(d)=>(

<span key={d._id}>

{d.name},

</span>

)

)


}


</p>





<p>

<strong>Staff ID:</strong>

{

selectedLecturer.profile?.staffId

}

</p>






<h3>
Courses
</h3>




{

selectedLecturer.courses?.length > 0 ?


selectedLecturer.courses.map(

(course)=>(


<p key={course._id}>

{course.code} - {course.title}

</p>


)

)


:


<p>
No course assigned
</p>


}





<button

className="btn btn-danger"

onClick={()=>setSelectedLecturer(null)}

>

Close

</button>



</div>


</div>


)

}




{

editLecturer && (


<div className="modal-overlay">


<div className="modal">



<h2>
Edit Lecturer
</h2>




<form onSubmit={handleUpdateLecturer}>



<input

value={editLecturer.name || ""}


onChange={(e)=>

setEditLecturer({

...editLecturer,

name:e.target.value

})

}


/>





<input

value={editLecturer.email || ""}


onChange={(e)=>

setEditLecturer({

...editLecturer,

email:e.target.value

})

}


/>

<select
multiple
value={editLecturer.departments}
onChange={(e)=>
setEditLecturer({
...editLecturer,
departments:[
...e.target.selectedOptions
].map(option=>option.value)
})
}
>



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






<input


placeholder="Staff ID"


value={editLecturer.staffId || ""}



onChange={(e)=>

setEditLecturer({

...editLecturer,

staffId:e.target.value

})

}



/>






<button

className="btn btn-success"

type="submit"

>

Save Changes

</button>



<button

type="button"

className="btn btn-danger"


onClick={()=>setEditLecturer(null)}

>

Cancel

</button>





</form>




</div>


</div>


)

}





{

createProfile && (


<div className="modal-overlay">


<div className="modal">



<h2>
Create Profile
</h2>





<form onSubmit={handleCreateProfile}>

<div className="checkbox-group">

<h4>Select Department(s)</h4>

{

departments.map((dept)=>(

<label
key={dept._id}
className="checkbox-item"
>

<input

type="checkbox"

checked={
createProfile.departments?.includes(dept._id)
}

onChange={(e)=>{

if(e.target.checked){

setCreateProfile({

...createProfile,

departments:[

...(createProfile.departments || []),

dept._id

]

});

}else{

setCreateProfile({

...createProfile,

departments:

createProfile.departments.filter(

(id)=>id !== dept._id

)

});

}

}}

 />

<span>

{dept.name}

</span>

</label>

))

}

</div>

<input


placeholder="Staff ID"


value={createProfile.staffId || ""}



onChange={(e)=>

setCreateProfile({

...createProfile,

staffId:e.target.value

})

}


/>







<button

className="btn btn-success"

type="submit"

>

Create

</button>






<button

type="button"

className="btn btn-danger"


onClick={()=>setCreateProfile(null)}

>

Cancel

</button>





</form>



</div>


</div>


)

}





<div className="pagination">


{

[...Array(pages)].map((_,i)=>(


<button


key={i}


className={

currentPage === i+1

?

"active-page"

:

""

}


onClick={()=>setCurrentPage(i+1)}

>


{i+1}


</button>



))


}



</div>


</div>

</AdminLayout>

);
}
