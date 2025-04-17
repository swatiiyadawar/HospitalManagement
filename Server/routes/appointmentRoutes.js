const express=require("express");
const {getAppointments,getAppointment,createAppointment,updateAppointment,deleteAppointment} =require('../controllers/appointmentController');
const {protect} =require('../middleware/authMiddleware');
const { authorize } = require('../middleware/roleMiddleware');


const router=express.Router();

router.route('/')
.get(protect,getAppointment).
put(protect,updateAppointment).
delete(protect,authorize('admin'), deleteAppointment);

module.exports = router;