const express=require('express');
const dotenv=require('dotenv');
const cors=require('cors');
const connectDB=require('./config/db');

dotenv.config();

connectDB();

const app=express();
app.use(express.json());
app.use(cors());

app.use('/api/auth',require('./routes/authRoutes'));
app.use('/api/patients',require('./routes/patientRoutes'));
app.use('api/doctors',require('./routes/doctorRoutes'));
app.use('api/appointments',require('./routes/appointmentRoutes'));
app.use('api/inventory',require('./routes/inventoryRoutes'));

app.get('/',(req,res)=>{
    res.send('Hospital Managemnet System Api');
});

app.use((err,req,res,next)=>{
    console.error(err.stack);
    res.status(500).send({message:'Server Error', error:process.env.NODE_ENV==='development'?  err.message : {}})
})
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
});
