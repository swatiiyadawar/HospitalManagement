export interface User {
    _id: string;
    email: string;
    name: string;
    role: 'admin' | 'doctor' | 'nurse' | 'receptionist';
    createdAt: string;
    updatedAt: string;
  }
  
  export interface Patient {
    _id: string;
    name: string;
    email: string;
    phone: string;
    address: string;
    dateOfBirth: string;
    gender: 'male' | 'female' | 'other';
    bloodGroup?: string;
    medicalHistory?: string[];
    createdAt: string;
    updatedAt: string;
  }
  
  export interface Doctor {
    _id: string;
    userId: string;
    name: string;
    email: string;
    phone: string;
    specialization: string;
    qualification: string;
    experience: number;
    consultationFee: number;
    availability: {
      day: string;
      startTime: string;
      endTime: string;
    }[];
    createdAt: string;
    updatedAt: string;
  }
  
  export interface Appointment {
    _id: string;
    patientId: string;
    doctorId: string;
    date: string;
    startTime: string;
    endTime: string;
    status: 'scheduled' | 'completed' | 'cancelled';
    notes?: string;
    createdAt: string;
    updatedAt: string;
  }
  
  export interface InventoryItem {
    _id: string;
    name: string;
    category: string;
    quantity: number;
    unit: string;
    unitPrice: number;
    supplier?: string;
    reorderLevel: number;
    expiryDate?: string;
    location?: string;
    createdAt: string;
    updatedAt: string;
  }
  