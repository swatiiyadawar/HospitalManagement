import api from './api';
import { Appointment } from '../types';

export const appointmentService = {
  getAll: async (): Promise<Appointment[]> => {
    const response = await api.get('/api/appointments');
    return response.data;
  },
  
  getById: async (id: string): Promise<Appointment> => {
    const response = await api.get(`/api/appointments/${id}`);
    return response.data;
  },
  
  create: async (appointment: Omit<Appointment, '_id'>): Promise<Appointment> => {
    const response = await api.post('/api/appointments', appointment);
    return response.data;
  },
  
  update: async (id: string, appointment: Partial<Appointment>): Promise<Appointment> => {
    const response = await api.put(`/api/appointments/${id}`, appointment);
    return response.data;
  },
  
  delete: async (id: string): Promise<void> => {
    await api.delete(`/api/appointments/${id}`);
  }
};
