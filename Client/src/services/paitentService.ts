import api from '../api';
import { Patient } from '../types';

export const patientService = {
  getAll: async (): Promise<Patient[]> => {
    const response = await api.get('/api/patients');
    return response.data;
  },

  getById: async (id: string): Promise<Patient> => {
    const response = await api.get(`/api/patients/${id}`);
    return response.data;
  },

  create: async (patient: Omit<Patient, '_id'>): Promise<Patient> => {
    const response = await api.post('/api/patients', patient);
    return response.data;
  },

  update: async (id: string, patient: Partial<Patient>): Promise<Patient> => {
    const response = await api.put(`/api/patients/${id}`, patient);
    return response.data;
  },

  delete: async (id: string): Promise<void> => {
    await api.delete(`/api/patients/${id}`);
  }
};
