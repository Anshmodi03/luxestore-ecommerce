import api from './api';

// Profile
export async function getProfile() {
  const { data } = await api.get('/auth/me');
  return data.data;
}

export async function updateProfile(updates: { firstName?: string; lastName?: string; phone?: string }) {
  const { data } = await api.put('/auth/me', updates);
  return data.data;
}

// Addresses
export async function getAddresses() {
  const { data } = await api.get('/users/me/addresses');
  return data.data;
}

export async function createAddress(address: {
  label?: string;
  firstName: string;
  lastName: string;
  street: string;
  city: string;
  state: string;
  postalCode: string;
  country?: string;
  isDefault?: boolean;
}) {
  const { data } = await api.post('/users/me/addresses', address);
  return data.data;
}

export async function updateAddress(id: string, address: Record<string, any>) {
  const { data } = await api.put(`/users/me/addresses/${id}`, address);
  return data.data;
}

export async function deleteAddress(id: string) {
  const { data } = await api.delete(`/users/me/addresses/${id}`);
  return data;
}

export async function setDefaultAddress(id: string) {
  const { data } = await api.put(`/users/me/addresses/${id}/default`);
  return data.data;
}
