const mongoose=require('mongoose');

const UserSchema=new mongoose.Schema({
    name:{
        type:String,
        required:[true,'Please add a name'],
    },
    email:{
        type:String,
        required:[true,'Please add an Email'],
        unique:[true],
        match:[
           /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
             'Please add a valid email',
        ],  
    },
    password:{
        type:String,
        required:[true,'Please add a password'],
        minlength:6,
        select:false,
    },
    role:{
        type:String,
        enum:['admin','doctor','nurse','receptionist'],
        default:'receptionist',
    },
    createdAt:{
        type:Date,
        default:Date.now,
    },
    firebaseUid: {
        type: String,
        required: true, // store the Firebase UID to link this record with Firebase user
        unique: true,
      },

});

module.exports = mongoose.model('User', UserSchema);
