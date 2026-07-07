import express from "express";


import {

getLecturers,
createLecturerProfile,
updateLecturer,
updateLecturerProfile,
deleteLecturer,
getLecturerDetails

} from "../controllers/lecturerController.js";

import {
     getMyCourses 
    } from "../controllers/lecturerCourseController.js";

import {

protect,
authorizeRoles,
adminOnly

} from "../middleware/authMiddleware.js";



const router = express.Router();




// ALL LECTURERS

router.get(

"/",

protect,

adminOnly,

getLecturers

);





// CREATE PROFILE

router.post(

"/",

protect,

adminOnly,

createLecturerProfile

);






// UPDATE USER INFO

router.put(

"/user/:id",

protect,

adminOnly,

updateLecturer

);







// UPDATE PROFILE INFO

router.put(

"/profile/:id",

protect,

adminOnly,

updateLecturerProfile

);







// DETAILS

router.get(

"/details/:id",

protect,

getLecturerDetails

);







// DELETE

router.delete(

"/:id",

protect,

adminOnly,

deleteLecturer

);


// GET LECTURER COURSES
router.get(

"/my-courses",

protect,

authorizeRoles("lecturer"),

getMyCourses

);


export default router;