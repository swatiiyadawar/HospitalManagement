const Appointment = require('../models/Appointment');
const Doctor = require('../models/Doctor');
const Patient = require('../models/Patient');

// @desc    Get all appointments
// @route   GET /api/appointments
// @access  Private
exports.getAppointments = async (req, res) => {
  try {
    // Build query
    let query;

    // If doctor is requesting, only show their appointments
    if (req.user.role === 'doctor') {
      const doctor = await Doctor.findOne({ user: req.user.id });
      
      if (doctor) {
        query = Appointment.find({ doctor: doctor._id });
      } else {
        return res.status(404).json({
          success: false,
          message: 'Doctor profile not found'
        });
      }
    } else {
      // For admin and staff, show all appointments
      query = Appointment.find();
    }

    // Populate with patient and doctor details
    query = query.populate({
      path: 'patient',
      select: 'name age gender contactNumber'
    }).populate({
      path: 'doctor',
      select: 'specialization',
      populate: {
        path: 'user',
        select: 'name'
      }
    });

    // Add date filtering if provided
    if (req.query.date) {
      const startDate = new Date(req.query.date);
      startDate.setHours(0, 0, 0, 0);
      
      const endDate = new Date(req.query.date);
      endDate.setHours(23, 59, 59, 999);
      
      query = query.find({
        date: {
          $gte: startDate,
          $lte: endDate
        }
      });
    }

    // Add status filtering if provided
    if (req.query.status) {
      query = query.find({ status: req.query.status });
    }

    // Execute query
    const appointments = await query.sort({ date: 1, time: 1 });

    res.status(200).json({
      success: true,
      count: appointments.length,
      data: appointments
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

// @desc    Get single appointment
// @route   GET /api/appointments/:id
// @access  Private
exports.getAppointment = async (req, res) => {
  try {
    const appointment = await Appointment.findById(req.params.id)
      .populate({
        path: 'patient',
        select: 'name age gender contactNumber'
      })
      .populate({
        path: 'doctor',
        select: 'specialization consultationFee',
        populate: {
          path: 'user',
          select: 'name'
        }
      });

    if (!appointment) {
      return res.status(404).json({
        success: false,
        message: 'Appointment not found'
      });
    }

    // Check if user is authorized to view this appointment
    if (req.user.role === 'doctor') {
      const doctor = await Doctor.findOne({ user: req.user.id });
      
      if (!doctor || appointment.doctor._id.toString() !== doctor._id.toString()) {
        return res.status(403).json({
          success: false,
          message: 'Not authorized to access this appointment'
        });
      }
    }

    res.status(200).json({
      success: true,
      data: appointment
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

// @desc    Create new appointment
// @route   POST /api/appointments
// @access  Private
exports.createAppointment = async (req, res) => {
  try {
    // Add user to req.body
    req.body.createdBy = req.user.id;

    // Check if patient exists
    const patient = await Patient.findById(req.body.patient);
    if (!patient) {
      return res.status(404).json({
        success: false,
        message: 'Patient not found'
      });
    }

    // Check if doctor exists
    const doctor = await Doctor.findById(req.body.doctor);
    if (!doctor) {
      return res.status(404).json({
        success: false,
        message: 'Doctor not found'
      });
    }

    // Check if requested time slot is available
    const appointmentDate = new Date(req.body.date);
    const dayOfWeek = appointmentDate.toLocaleString('en-us', { weekday: 'long' });
    
    // Find doctor's availability for the requested day
    const availableSlot = doctor.availableSlots.find(
      slot => slot.day === dayOfWeek
    );

    if (!availableSlot) {
      return res.status(400).json({
        success: false,
        message: `Doctor is not available on ${dayOfWeek}`
      });
    }

    // Check if the requested time is within doctor's available hours
    const requestedTime = req.body.time;
    if (requestedTime < availableSlot.startTime || requestedTime > availableSlot.endTime) {
      return res.status(400).json({
        success: false,
        message: `Doctor is only available from ${availableSlot.startTime} to ${availableSlot.endTime} on ${dayOfWeek}`
      });
    }

    // Check if there's already an appointment at that time
    const existingAppointment = await Appointment.findOne({
      doctor: req.body.doctor,
      date: appointmentDate,
      time: requestedTime,
      status: { $ne: 'cancelled' }
    });

    if (existingAppointment) {
      return res.status(400).json({
        success: false,
        message: 'This time slot is already booked'
      });
    }

    // Create appointment
    const appointment = await Appointment.create(req.body);

    res.status(201).json({
      success: true,
      data: appointment
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

// @desc    Update appointment
// @route   PUT /api/appointments/:id
// @access  Private
exports.updateAppointment = async (req, res) => {
  try {
    let appointment = await Appointment.findById(req.params.id);

    if (!appointment) {
      return res.status(404).json({
        success: false,
        message: 'Appointment not found'
      });
    }

    // Check authorization
    if (req.user.role === 'doctor') {
      const doctor = await Doctor.findOne({ user: req.user.id });
      
      if (!doctor || appointment.doctor.toString() !== doctor._id.toString()) {
        return res.status(403).json({
          success: false,
          message: 'Not authorized to update this appointment'
        });
      }
    }

    // If changing appointment time, check availability
    if (req.body.date || req.body.time) {
      const appointmentDate = new Date(req.body.date || appointment.date);
      const dayOfWeek = appointmentDate.toLocaleString('en-us', { weekday: 'long' });
      const requestedTime = req.body.time || appointment.time;
      
      // Get doctor info
      const doctorId = req.body.doctor || appointment.doctor;
      const doctor = await Doctor.findById(doctorId);
      
      // Find doctor's availability for the requested day
      const availableSlot = doctor.availableSlots.find(
        slot => slot.day === dayOfWeek
      );

      if (!availableSlot) {
        return res.status(400).json({
          success: false,
          message: `Doctor is not available on ${dayOfWeek}`
        });
      }

      // Check if the requested time is within doctor's available hours
      if (requestedTime < availableSlot.startTime || requestedTime > availableSlot.endTime) {
        return res.status(400).json({
          success: false,
          message: `Doctor is only available from ${availableSlot.startTime} to ${availableSlot.endTime} on ${dayOfWeek}`
        });
      }

      // Check if there's already an appointment at that time (excluding current one)
      const existingAppointment = await Appointment.findOne({
        _id: { $ne: req.params.id },
        doctor: doctorId,
        date: appointmentDate,
        time: requestedTime,
        status: { $ne: 'cancelled' }
      });

      if (existingAppointment) {
        return res.status(400).json({
          success: false,
          message: 'This time slot is already booked'
        });
      }
    }

    // Update appointment
    appointment = await Appointment.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    res.status(200).json({
      success: true,
      data: appointment
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

// @desc    Delete appointment
// @route   DELETE /api/appointments/:id
// @access  Private
exports.deleteAppointment = async (req, res) => {
  try {
    const appointment = await Appointment.findById(req.params.id);

    if (!appointment) {
      return res.status(404).json({
        success: false,
        message: 'Appointment not found'
      });
    }

    // Check if user is authorized to delete this appointment
    if (req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to delete appointments'
      });
    }

    await appointment.remove();

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