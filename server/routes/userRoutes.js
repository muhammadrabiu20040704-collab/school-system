import express from "express";

import {

getAllUsers,
makeAdmin,
removeAdmin,
makeLecturer,
removeLecturer,
createStudent,
getRoleUsers

} from "../controllers/userController.js";


import {
protect,
adminOnly
} from "../middleware/authMiddleware.js";


const router = express.Router();



// all users

router.get(
"/",
protect,
adminOnly,
getAllUsers
);




// promote

router.put(
"/make-admin/:id",
protect,
adminOnly,
makeAdmin
);



router.put(
"/make-lecturer/:id",
protect,
adminOnly,
makeLecturer
);



// remove

router.put(
"/remove-admin/:id",
protect,
adminOnly,
removeAdmin
);



router.put(
"/remove-lecturer/:id",
protect,
adminOnly,
removeLecturer
);

router.post(
    "/create-student",
    protect,
    adminOnly,
    createStudent
);


router.get(
"/role-users",
protect,
adminOnly,
getRoleUsers
);
export default router;