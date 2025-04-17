const mongoose=require('mongoose');

const DoctorSchema=new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true,
    },
    specialization:{
        type:String,
        reuqired:[true,'Please add Specialzation']
    },
    qualification:{
        type:String,
        required:[true,'Please add qualification']
    },
    experience:{
        type:Number,
        reuqired:[true,'PLease add years of experience']
    },
    contactNumber: {
        type: String,
        required: [true, 'Please add contact number']
      },
      consultationFee: {
        type: Number,
        required: [true, 'Please add consultation fee']
      },
      availableSlots: [{
        day: {
          type: String,
          enum: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
        },
        startTime: String,
        endTime: String
      }],
      createdAt: {
        type: Date,
        default: Date.now
      }
    });
    