export type LeadStatus = 'new' | 'qualified' | 'contacted' | 'won' | 'lost';

export type Lead = {
  id: string;
  name: string;
  email: string;
  company?: string | null;
  phone?: string | null;
  source: string;
  siteVisits: number;
  visitedDirectly: boolean;
  score: number;
  status: LeadStatus;
  notes?: string | null;
  createdAt: string;
};

export type LeadFormData = {
  name: string;
  email: string;
  company: string;
  phone: string;
  source: string;
  siteVisits: number;
  visitedDirectly: boolean;
  notes: string;
};

export const emptyLeadForm: LeadFormData = {
  name: '',
  email: '',
  company: '',
  phone: '',
  source: 'organic',
  siteVisits: 1,
  visitedDirectly: false,
  notes: '',
};

export const statusLabels: Record<LeadStatus, string> = {
  new: 'New',
  qualified: 'Qualified',
  contacted: 'Contacted',
  won: 'Won',
  lost: 'Lost',
};

export const sourceLabels: Record<string, string> = {
  organic: 'Organic search',
  ads: 'Paid ads',
  referral: 'Referral',
  direct: 'Direct visit',
  social: 'Social media',
};
