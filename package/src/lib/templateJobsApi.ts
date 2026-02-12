import { api } from './api';

export type ApplyTemplateRequest = {
  templateId: number;
  startDate: string;
  endDate: string;
  daysOfWeek: number[];
  conflict: 'skip' | 'overwrite';
};

export type ApplyTemplateResponse = {
  inserted?: number;
  insertedCount?: number;
  skipped?: number;
  conflicts?: Conflict[];
  data?: Record<string, unknown>[];
  [key: string]: unknown;
};

export async function applyTemplateToPlans(data: ApplyTemplateRequest): Promise<ApplyTemplateResponse> {
  const res = await api.post('/jobs/apply-template', {
    template_id: data.templateId,
    start_date: data.startDate,
    end_date: data.endDate,
    days_of_week: data.daysOfWeek,
    conflict: data.conflict,
  });
  return res.data as ApplyTemplateResponse;
}

// ✅ Toplu conflict kontrolü
export type ConflictCheckRequest = {
  templateId: number;
  startDate: string;
  endDate: string;
  daysOfWeek: number[];
};

export type Conflict = {
  duetime: number;
  deviceid: number;
  route_name?: string | null;
};

export async function checkTemplateConflicts(
  data: ConflictCheckRequest
): Promise<{ conflicts: Conflict[]; count: number }> {
  const res = await api.post<{ data?: { conflicts: Conflict[]; count: number }; conflicts?: Conflict[]; count?: number }>('/jobs/check-conflict', {
    template_id: data.templateId,
    start_date: data.startDate,
    end_date: data.endDate,
    days_of_week: data.daysOfWeek,
  });

  const payload = res.data?.data ?? res.data;

  return {
    conflicts: payload?.conflicts ?? [],
    count: payload?.count ?? 0,
  };
}
