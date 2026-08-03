import { apiRequest } from './http';

export function getProperties() {
  return apiRequest('/api/properties');
}

export function getProperty(id) {
  return apiRequest(`/api/properties/${id}`);
}

export function syncProperties() {
  return apiRequest('/api/properties/sync', { method: 'POST', auth: true });
}
