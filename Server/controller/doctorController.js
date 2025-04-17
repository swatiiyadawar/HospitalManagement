const Doctor=require('..models/Doctor');
const User=require('../models/User');

// @desc    Get all doctors
// @route   GET /api/doctors
// @access  Private
exports.getDoctors=async(req,res)=>{

    try{
        const doctors= await Doctor.find().populate('user','name email');
        
        res.status(200).json({
            success:true,
            count:doctors.length,
            data:doctors
        });
    }catch(error){
        res.status(500).json({
            success:false,
            message:'Server error',
            error:error.message
        });
    }
};
// @desc    Get single doctor
// @route   GET /api/doctors/:id
// @access  Private

exports.getDoctors=async(req,res)=>{
    try{
        const doctor=await Doctor.findById(req.params.id).populate('user','name email');

        if(!doctor){
            return res.status(404).json({
                success:false,
                message:'Dcotor not found'
            });
        }

        res.status(200).json({
            success:true,
            data:doctor
        });
    }catch(error){
        res.status(500).json({
            success:false,
            message:'Server error',
            error:error.message
        });
    }
};

// @desc    Create new doctor
// @route   POST /api/doctors
// @access  Private (Admin only)
exports.createDoctor=async(req,res)=>{
    try{
        const {userId, specialization, qualification, experience, contactNumber, consultationFee,availableSlots }=req.body;

        //check if user exists and is a doctor
        const user= await User.findById(userId);

        if(!user) {
            return res.status(404).json({
                success:false,
                message:'User not found'
            });
        }

        //update user role to doctor if not already
        

    if (user.role !== 'doctor') {
        await User.findByIdAndUpdate(userId, { role: 'doctor' });
      }
  
      // Check if doctor profile already exists
      const doctorExists = await Doctor.findOne({ user: userId });
  
      if (doctorExists) {
        return res.status(400).json({
          success: false,
          message: 'Doctor profile already exists for this user'
        });
      }
  
      // Create doctor profile
      const doctor = await Doctor.create({
        user: userId,
        specialization,
        qualification,
        experience,
        contactNumber,
        consultationFee,
        availableSlots
      });
  
      res.status(201).json({
        success: true,
        data: doctor
      });
    } catch (error) {
      if (error.name === 'ValidationError') {
        const messages = Object.values(error.errors).map(val => val.message);
        
        return res.status(400).json({
          success: false,
          message: messages.join(', ')
        });
      }
      
      res.status(500).json({
        success: false,
        message: 'Server error',
        error: error.message
      });
    }
  };

  //@desc    Update doctor
// @route   PUT /api/doctors/:id
// @access  Private (Admin or the doctor themselves)

  exports.updateDoctor=async(req,res)=>{
    try{
        let doctor=await Doctor.findById(req.params.id);

        if(!doctor){
            return res.status(404).json({
                success:false,
                message:'Doctor not found'
            });
        }

        //check if user is authorized to update
        //only admins
        if(req.user.role!=='admin' && doctor.user.toString()!=req.user.id ){
            return res.status(403).json({
                success:false,
                message:'Not authorized to update this doctor'
            });
        }

        doctor=await Doctor.findByIdAndUpdate(req.params.id,req.body,{
            new:true,
            runValidators:true
        } );

        res.status(200).json({
            success:true,
            data:doctor
        });
    }catch(error){
        if(error.name==='ValidationError'){
            const messages=Object.values(error.errors).map(val=>val.message);

            return res.status(400).json({
                success:false,
                message:message.join(',')
            });
        }
        res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
  res.status(500).json({
    success: false,
    message: 'Server error',
    error: error.message
  });
}
    
 // @desc    Delete doctor
// @route   DELETE /api/doctors/:id
// @access  Private (Admin only)

exports.deleteDoctor=async(req,res)=>{
    try{
        const doctor=await Doctor.findById(req.params.id);

        if(!doctor){
            return res.status(404).json({
                success:false,
                message:'Dcotor not found'
            });
        }
        await doctor.remove();

        res.status(200).json({
            success:true,
            data:{}
        });
    }catch(error){
        res.status(500).json({
            success:false,
            message:'Server error',
            error:error.message
        });
    }
};