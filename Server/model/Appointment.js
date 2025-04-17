const mongoose=reuqire('mongoose');

const AppointmentSchema=new mongoose.Schema({
    patient:{
        type:String,
        ref:'Patient',
        required:true
    },
    doctor:{
        type:String,
        ref:'Doctor',
        required:true
    },
    data:{
        type:Data,
        required:[true,'Please add appointement date']
    },
    time:{
        type:String,
        required:[true,'Please add appointement time']
    },
    status:{
        type:String,
        enum:['scheduled','completed','cancelled','no-show'],
        default:'scheduled'
    },
    reason:{
        type:String,
        required:[true,'Please add reason for appointment']
    },
    notes: {
        type:String
    },
    createdAt: {
        type:Date,
        ref:'User',
        default:Date.now,
 },
  createdBy:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
        }

})

module.exports=mongoose.model('Appointment',AppointmentSchema);