import {api} from './api';

export type ApplyTemplateRequest = {
  templateId: number;
  startDate: string;
  endDate: string;
  daysOfWeek: number[];
  conflict: 'skip' | 'overwrite';   // ✅ duplicate yerine conflict
};

export async function applyTemplateToPlans(data: ApplyTemplateRequest) {
  const res = await api.post('/jobs/apply-template', {
    template_id: data.templateId,
    start_date: data.startDate,
    end_date: data.endDate,
    days_of_week: data.daysOfWeek,
    conflict: data.conflict,        // ✅ conflict gönderiliyor
  });
  return res.data;
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
  first_stop?: string | null;
  last_stop?: string | null;
};

export async function checkTemplateConflicts(
  data: ConflictCheckRequest
): Promise<{ conflicts: Conflict[]; count: number }> {
  const res = await api.post('/jobs/check-conflict', {
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
