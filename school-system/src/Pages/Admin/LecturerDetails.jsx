import {useEffect,useState} from "react";
import {useParams} from "react-router-dom";
import axios from "axios";
import AdminLayout from "../../layouts/AdminLayout";


export default function LecturerDetails(){


const {id}=useParams();


const [data,setData]=useState(null);

const [courses,setCourses] = useState([]);

const [selectedCourse,setSelectedCourse] = useState("");



const token =
localStorage.getItem("token");

const fetchCourses = async()=>{


const res = await axios.get(

"http://localhost:3000/api/courses",

{

headers:{

Authorization:`Bearer ${token}`

}

}

);


setCourses(res.data);


};

const assignCourse = async()=>{


try{


await axios.put(


`http://localhost:3000/api/courses/assign/${selectedCourse}`,

{

lecturerId:id

},

{

headers:{

Authorization:`Bearer ${token}`

}

}

);



alert("Course assigned");

fetchDetails();


}catch(error){

console.log(error);

}



};

const removeCourse = async(courseId)=>{


await axios.put(

`http://localhost:3000/api/courses/remove-lecturer/${courseId}`,

{},

{

headers:{

Authorization:`Bearer ${token}`

}

}

);



fetchDetails();


};

const fetchDetails=async()=>{


const res =
await axios.get(

`http://localhost:3000/api/lecturers/details/${id}`,

{

headers:{

Authorization:`Bearer ${token}`

}

}

);


setData(res.data);


};



useEffect(()=>{

fetchDetails();

fetchCourses();

},[]);





if(!data)

return <h2>Loading...</h2>;





return(

<AdminLayout>


<div className="page-content">


<h1>
Lecturer Details
</h1>



<div className="table-card">


<h2>
{data.lecturer.name}
</h2>



<p>
Email:
{data.lecturer.email}
</p>



<p>

Staff ID:

{data.profile?.staffId}

</p>



<p>

Department:

{data.profile?.department?.name}

</p>



<h2>
Assigned Courses
</h2>

<h2>
Assign Course
</h2>


<select

value={selectedCourse}

onChange={(e)=>

setSelectedCourse(e.target.value)

}

>


<option>

Select Course

</option>


{

courses

.filter(c=>!c.lecturer)

.map(course=>(


<option

key={course._id}

value={course._id}

>

{course.title}

</option>


))


}


</select>



<button

className="btn btn-success"

onClick={assignCourse}

>

Assign

</button>

<tbody>


{

data.courses.map(course=>(


<tr key={course._id}>


<td>

{course.title}

</td>



<td>

{course.code}

</td>



<td>


<button

className="btn btn-danger"

onClick={()=>removeCourse(course._id)}

>

Remove

</button>


</td>


</tr>


))


}


</tbody>



</div>


</div>


</AdminLayout>


);


}