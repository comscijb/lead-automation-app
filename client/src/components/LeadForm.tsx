import { Box, Button, Checkbox, Grid, Heading, Input, NativeSelect, Stack, Text, Textarea } from '@chakra-ui/react';
import { FormEvent, ReactNode } from 'react';
import { LeadFormData, sourceLabels } from '../types/lead';

type LeadFormProps = {
  form: LeadFormData;
  saving: boolean;
  onChange: (form: LeadFormData) => void;
  onSubmit: () => void;
};

function FieldLabel({ children }: { children: ReactNode }) {
  return (
    <Text color="gray.600" fontSize="sm" fontWeight="semibold">
      {children}
    </Text>
  );
}

function formatUsPhone(value: string) {
  const digits = value.replace(/\D/g, '').slice(0, 10);

  if (digits.length <= 3) return digits;
  if (digits.length <= 6) return `(${digits.slice(0, 3)}) ${digits.slice(3)}`;
  return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`;
}

export function LeadForm({ form, saving, onChange, onSubmit }: LeadFormProps) {
  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    onSubmit();
  }

  return (
    <Box
      as="form"
      bg="white"
      borderColor="gray.200"
      borderRadius="lg"
      borderWidth="1px"
      boxShadow="0 20px 50px rgba(23, 33, 29, 0.08)"
      onSubmit={handleSubmit}
      p="5"
    >
      <Stack gap="4">
        <Heading color="gray.900" fontSize="lg">
          New lead
        </Heading>

        <Box>
          <FieldLabel>Name</FieldLabel>
          <Input
            mt="2"
            placeholder="Alex Morgan"
            required
            value={form.name}
            onChange={(event) => onChange({ ...form, name: event.currentTarget.value })}
          />
        </Box>

        <Box>
          <FieldLabel>Email</FieldLabel>
          <Input
            mt="2"
            placeholder="alex@company.com"
            required
            type="email"
            value={form.email}
            onChange={(event) => onChange({ ...form, email: event.currentTarget.value })}
          />
        </Box>

        <Grid gap="3" gridTemplateColumns={{ base: '1fr', sm: 'repeat(2, minmax(0, 1fr))' }}>
          <Box>
            <FieldLabel>Company</FieldLabel>
            <Input
              mt="2"
              placeholder="Acme"
              value={form.company}
              onChange={(event) => onChange({ ...form, company: event.currentTarget.value })}
            />
          </Box>
          <Box>
            <FieldLabel>Phone</FieldLabel>
            <Input
              mt="2"
              placeholder="(555) 123-4567"
              type="tel"
              value={form.phone}
              onChange={(event) => onChange({ ...form, phone: formatUsPhone(event.currentTarget.value) })}
            />
          </Box>
        </Grid>

        <Grid gap="3" gridTemplateColumns={{ base: '1fr', sm: 'repeat(2, minmax(0, 1fr))' }}>
          <Box>
            <FieldLabel>Source</FieldLabel>
            <NativeSelect.Root mt="2">
              <NativeSelect.Field
                value={form.source}
                onChange={(event) => {
                  const source = event.currentTarget.value;
                  onChange({
                    ...form,
                    source,
                    visitedDirectly: source === 'direct' ? true : form.visitedDirectly,
                  });
                }}
              >
                {Object.entries(sourceLabels).map(([value, label]) => (
                  <option key={value} value={value}>
                    {label}
                  </option>
                ))}
              </NativeSelect.Field>
              <NativeSelect.Indicator />
            </NativeSelect.Root>
          </Box>
          <Box>
            <FieldLabel>Visits</FieldLabel>
            <Input
              min={0}
              mt="2"
              type="number"
              value={form.siteVisits}
              onChange={(event) => onChange({ ...form, siteVisits: Number(event.currentTarget.value) })}
            />
          </Box>
        </Grid>

        <Checkbox.Root
          checked={form.visitedDirectly}
          colorPalette="teal"
          onCheckedChange={(event) => onChange({ ...form, visitedDirectly: Boolean(event.checked) })}
        >
          <Checkbox.HiddenInput />
          <Checkbox.Control />
          <Checkbox.Label>Visited by typing the URL directly</Checkbox.Label>
        </Checkbox.Root>

        <Box>
          <FieldLabel>Notes</FieldLabel>
          <Textarea
            minH="24"
            mt="2"
            placeholder="Business context, need, or next step"
            resize="vertical"
            value={form.notes}
            onChange={(event) => onChange({ ...form, notes: event.currentTarget.value })}
          />
        </Box>

        <Button colorPalette="teal" disabled={saving} loading={saving} size="lg" type="submit">
          Score lead
        </Button>
      </Stack>
    </Box>
  );
}
