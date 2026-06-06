import { Lead, LeadFormData, LeadStatus } from '../types/lead';

const API_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:3333';
const REQUEST_TIMEOUT_MS = 6000;

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const controller = new AbortController();
  const timeout = window.setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);

  try {
    const response = await fetch(`${API_URL}${path}`, {
      ...init,
      headers: {
        'Content-Type': 'application/json',
        ...init?.headers,
      },
      signal: controller.signal,
    });

    const data = await response.json().catch(() => null);

    if (!response.ok) {
      const message = data?.errors?.join(', ') ?? data?.error ?? 'Unable to complete the operation.';
      throw new Error(message);
    }

    return data as T;
  } catch (error) {
    if (error instanceof DOMException && error.name === 'AbortError') {
      throw new Error('The API connection timed out.');
    }

    if (error instanceof TypeError) {
      throw new Error('Failed to connect to the API. Make sure the server is running on port 3333.');
    }

    throw error;
  } finally {
    window.clearTimeout(timeout);
  }
}

export function listLeads() {
  return request<Lead[]>('/leads');
}

export function createLead(form: LeadFormData) {
  return request<Lead>('/leads', {
    method: 'POST',
    body: JSON.stringify({
      ...form,
      visitedDirectly: form.visitedDirectly || form.source === 'direct',
    }),
  });
}

export function updateLeadStatus(id: string, status: LeadStatus) {
  return request<Lead>(`/leads/${id}/status`, {
    method: 'PATCH',
    body: JSON.stringify({ status }),
  });
}
