import { Box, Grid, Text } from '@chakra-ui/react';
import { useEffect, useMemo, useState } from 'react';
import { AppShell } from './components/AppShell';
import { LeadForm } from './components/LeadForm';
import { LeadTable } from './components/LeadTable';
import { SummaryCards } from './components/SummaryCards';
import { createLead, listLeads, updateLeadStatus } from './services/leadsApi';
import { emptyLeadForm, Lead, LeadFormData, LeadStatus } from './types/lead';

function App() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [form, setForm] = useState<LeadFormData>(emptyLeadForm);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  async function loadLeads() {
    setLoading(true);
    setError('');

    try {
      setLeads(await listLeads());
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unexpected error.');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadLeads();
  }, []);

  const summary = useMemo(() => {
    const total = leads.length;
    const hot = leads.filter((lead) => lead.score >= 80).length;
    const average = total ? Math.round(leads.reduce((sum, lead) => sum + lead.score, 0) / total) : 0;

    return { total, hot, average };
  }, [leads]);

  async function handleCreateLead() {
    setSaving(true);
    setError('');

    try {
      const lead = await createLead(form);
      setLeads((current) => [lead, ...current].sort((a, b) => b.score - a.score));
      setForm(emptyLeadForm);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unexpected error.');
    } finally {
      setSaving(false);
    }
  }

  async function handleStatusChange(id: string, status: LeadStatus) {
    setError('');

    try {
      const updatedLead = await updateLeadStatus(id, status);
      setLeads((current) => current.map((lead) => (lead.id === id ? updatedLead : lead)));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unexpected error.');
    }
  }

  return (
    <AppShell onRefresh={loadLeads}>
      <SummaryCards {...summary} />

      {error && (
        <Box bg="red.50" borderColor="red.200" borderRadius="lg" borderWidth="1px" color="red.700" mt="4" p="4">
          <Text fontWeight="medium">{error}</Text>
        </Box>
      )}

      <Grid alignItems="start" gap="5" gridTemplateColumns={{ base: '1fr', lg: '380px minmax(0, 1fr)' }} mt="5">
        <LeadForm form={form} saving={saving} onChange={setForm} onSubmit={handleCreateLead} />
        <LeadTable leads={leads} loading={loading} onStatusChange={handleStatusChange} />
      </Grid>
    </AppShell>
  );
}

export default App;
