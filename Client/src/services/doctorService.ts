import api from './api';
import { Doctor } from '../types';

export const doctorService = {
  getAll: async (): Promise<Doctor[]> => {
    const response = await api.get('/api/doctors');
    return response.data;
  },
  
  getById: async (id: string): Promise<Doctor> => {
    const response = await api.get(`/api/doctors/${id}`);
    return response.data;
  },
  
  create: async (doctor: Omit<Doctor, '_id'>): Promise<Doctor> => {
    const response = await api.post('/api/doctors', doctor);
    return response.data;
  },
  
  update: async (id: string, doctor: Partial<Doctor>): Promise<Doctor> => {
    const response = await api.put(`/api/doctors/${id}`, doctor);
    return response.data;
  },
  
  delete: async (id: string): Promise<void> => {
    await api.delete(`/api/doctors/${id}`);
  }
};