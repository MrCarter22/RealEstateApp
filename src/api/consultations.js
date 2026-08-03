import { apiRequest } from './http';

export function submitConsultation(data) {
  return apiRequest('/api/consultations', { method: 'POST', body: data });
}

export function getConsultations() {
  return apiRequest('/api/consultations', { auth: true });
}

export function deleteConsultation(id) {
  return apiRequest(`/api/consultations/${id}`, { method: 'DELETE', auth: true });
}
