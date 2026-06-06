import { type Request, type Response } from 'express';
import * as leadService from '../services/leadService';

export async function createLead(request: Request, response: Response) {
  try {
    const errors = leadService.validateLeadPayload(request.body);
    if (errors.length > 0) {
      return response.status(400).json({ errors });
    }

    const lead = await leadService.createLead(request.body);
    return response.status(201).json(lead);
  } catch (error) {
    console.error('Failed to create lead', error);
    return response.status(500).json({ error: 'Failed to create lead' });
  }
}

export async function getLeads(request: Request, response: Response) {
  try {
    const leads = await leadService.getLeads();
    return response.json(leads);
  } catch (error) {
    console.error('Failed to list leads', error);
    return response.status(500).json({ error: 'Failed to list leads' });
  }
}

export async function updateLeadStatus(request: Request, response: Response) {
  const { id } = request.params;
  if (!id || Array.isArray(id)) {
    return response.status(400).json({ error: 'Invalid lead ID' });
  }

  const { status } = request.body;
  if (!status || !leadService.validateStatus(status)) {
    return response.status(400).json({ error: 'Invalid lead status' });
  }

  try {
    const updated = await leadService.updateStatus(id, status);
    if (!updated) {
      return response.status(404).json({ error: 'Lead not found' });
    }

    return response.json(updated);
  } catch (error) {
    console.error('Failed to update lead status', error);
    return response.status(500).json({ error: 'Failed to update lead status' });
  }
}
