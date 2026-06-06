import { prisma } from '../database/prisma';
import { calculateScore } from './scoringService';

const allowedStatuses = new Set(['new', 'qualified', 'contacted', 'won', 'lost']);

export type CreateLeadPayload = {
  name?: string;
  email?: string;
  company?: string;
  phone?: string;
  source?: string;
  siteVisits?: number;
  visitedDirectly?: boolean;
  notes?: string;
};

export function validateLeadPayload(data: CreateLeadPayload) {
  const errors: string[] = [];

  if (!data.name?.trim()) errors.push('name is required');
  if (!data.email?.trim()) errors.push('email is required');
  if (data.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    errors.push('email is invalid');
  }
  if (!data.source?.trim()) errors.push('source is required');
  if (data.siteVisits !== undefined && (!Number.isInteger(data.siteVisits) || data.siteVisits < 0)) {
    errors.push('siteVisits must be a positive integer');
  }

  return errors;
}

export function validateStatus(status: string) {
  return allowedStatuses.has(status);
}

export async function createLead(data: CreateLeadPayload) {
  const siteVisits = data.siteVisits ?? 1;
  const visitedDirectly = data.visitedDirectly ?? data.source === 'direct';
  const score = calculateScore({ ...data, siteVisits, visitedDirectly });

  return prisma.lead.create({
    data: {
      name: data.name!.trim(),
      email: data.email!.trim().toLowerCase(),
      company: data.company?.trim() || null,
      phone: data.phone?.trim() || null,
      source: data.source!.trim(),
      siteVisits,
      visitedDirectly,
      notes: data.notes?.trim() || null,
      score,
      status: 'new',
    },
  });
}

export async function getLeads() {
  return prisma.lead.findMany({
    orderBy: [{ score: 'desc' }, { createdAt: 'desc' }],
  });
}

export async function updateStatus(id: string, status: string) {
  const lead = await prisma.lead.findUnique({ where: { id } });
  if (!lead) return null;

  return prisma.lead.update({
    where: { id },
    data: { status },
  });
}
