import { apiRequest, setToken, clearToken, getToken } from './http';

export async function login(email, password) {
  const { token } = await apiRequest('/api/auth/login', {
    method: 'POST',
    body: { email, password },
  });
  setToken(token);
}

export function logout() {
  clearToken();
}

export function isAuthenticated() {
  return Boolean(getToken());
}
