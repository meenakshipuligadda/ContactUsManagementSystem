import api from "./api";
import type {
  Contact,
  ContactFormData,
  ContactQueryParams,
  ContactListResponse,
} from "../types/contact";

// Service layer: components call these functions instead of touching axios
// directly. Keeps API details (URLs, query strings) out of the UI code and
// makes it easy to swap/mock the backend later.

export const getContacts = async (
  params: ContactQueryParams
): Promise<ContactListResponse> => {
  const response = await api.get<ContactListResponse>("/contacts", { params });
  return response.data;
};

export const getContactById = async (id: number): Promise<Contact> => {
  const response = await api.get<Contact>(`/contacts/${id}`);
  return response.data;
};

export const createContact = async (
  payload: ContactFormData
): Promise<Contact> => {
  const response = await api.post<Contact>("/contacts", payload);
  return response.data;
};

export const updateContact = async (
  id: number,
  payload: ContactFormData
): Promise<Contact> => {
  const response = await api.put<{ message: string; data: Contact }>(
    `/contacts/${id}`,
    payload
  );
  return response.data.data;
};

export const deleteContact = async (id: number): Promise<void> => {
  await api.delete(`/contacts/${id}`);
};
