export interface Contact {
  id: number;
  name: string;
  email: string;
  message: string;
  createdAt: string;
  updatedAt: string;
}

export interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

export type SortField = "name" | "createdAt";
export type SortOrder = "ASC" | "DESC";

export interface ContactQueryParams {
  search?: string;
  date?: string;
  sortBy?: SortField;
  order?: SortOrder;
  page?: number;
  limit?: number;
}

export interface ContactListResponse {
  data: Contact[];
  total: number;
  page: number;
  totalPages: number;
}
