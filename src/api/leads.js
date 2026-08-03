import { apiRequest } from './http';

export function submitLead(data) {
  return apiRequest('/api/leads', { method: 'POST', body: data });
}

export function getLeads() {
  return apiRequest('/api/leads', { auth: true });
}

export function deleteLead(id) {
  return apiRequest(`/api/leads/${id}`, { method: 'DELETE', auth: true });
}
