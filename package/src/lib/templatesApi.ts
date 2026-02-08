// lib/templatesApi.ts
import {api} from './api';

export type Template = {
  id: number;
  name: string;
  description?: string;
};

export async function getTemplates(): Promise<Template[]> {
  const res = await api.get('/templates');

  // Backend genelde { data: [...] } döner
  if (Array.isArray(res.data)) {
    return res.data;
  }

  if (Array.isArray(res.data.data)) {
    return res.data.data;
  }

  return [];
}
