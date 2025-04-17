const Patient=require('../models/Patient');

//get all patients
//get api.patients

exports.getPatients=async(req,res)=>{
    try{
        const patients=await Patient.find();

        res.status(200).json({
            success:true,
            coount:patients.length,
            data:patients
        });
    }catch(error){
        res.status(500).json({
                success:false,
                message:'Server error',
                error:error.message
            });
    }
};

//get single patient
//api/patients/:id

exports.getPatient=async(req,res)=>{
    try{
       const patient=await Patient.findById(req.params.id); 

       if(!patient){
        return res.status(404).json({
            success:false,
            message:'Patient not found'
        });
       }
        res.status(200)({
            success:true,
            data:patient
        });
    }catch(error){
        res.status(500).json({
            success:false,
            message:'Sever error',
            error:error.message
        });
    }
};

//create new patient 
exports.createPatient=async(req,res)=>{
    try{
        req.body.createdBy=req.user.id;

        const patient= await Patient.create(req.body);

        res.status(201).json({
            success:true,
            data:patient
        });
    }catch(error){
        if(error.name==='ValidationError'){
            const messages=Object.values(error.erros).map(val=>val.message);
            return res.status(400).json({
                success: false,
                message: messages.join(', ')
              });
        }

        res.satus(500).json({
            success:false,
            message:'Sever error',
            error:error.message
        });
    }
};

//update patient
//put /api/patinet/:id

exports.updatePatient=async(req, res)=>{
    try{
        let patient=await Patient.findById(req.params.id);

        if(!patient){
            return res.status(404).json({
                success:false,
                message:'Patient not Found'
            });
        }

        patient=await Patient.findByIdAndUpdate(req.params.id,req.body,{
            new:true,
            runValidators:true
        })

        res.status(200).json({
            success:true,
            data:patient
        });
    }catch(error){
        if(error.name=='ValidationError'){
            const messages=Object.values(error.errors).map(val=>val.message);

            return res.status(400).json({
                success:false,
                message:messages.join()
            });      
        }
        res.status(500).json({
            success: false,
            message: 'Server error',
            error: error.message
          });
    }
} 

//@desc     delete patient
// @route   DELETE /api/patients/:id
exports.deletePatient = async (req, res) => {
    try {
      const patient = await Patient.findById(req.params.id);
  
      if (!patient) {
        return res.status(404).json({
          success: false,
          message: 'Patient not found'
        });
      }
  
      await patient.remove();
  
      res.status(200).json({
        success: true,
        data: {}
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Server error',
        error: error.message
      });
    }
  };