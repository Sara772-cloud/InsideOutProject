export interface Settings {
  id: number;
  name: string;
  email: string;
  phone: string;
  username: string;
  city: string;
  street: string;
}

export interface UpdateSettingsPayload {
  fullName: string;
  email: string;
  phone: string;
  city: string;
  street: string;
}