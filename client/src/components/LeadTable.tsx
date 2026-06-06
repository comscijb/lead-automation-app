import { Badge, Box, Heading, NativeSelect, Stack, Text } from '@chakra-ui/react';
import { Lead, LeadStatus, sourceLabels, statusLabels } from '../types/lead';
import { classifyLead } from '../utils/leadScore';

type LeadTableProps = {
  leads: Lead[];
  loading: boolean;
  onStatusChange: (id: string, status: LeadStatus) => void;
};

function scoreColor(score: number) {
  if (score >= 80) return 'teal';
  if (score >= 45) return 'blue';
  return 'gray';
}

export function LeadTable({ leads, loading, onStatusChange }: LeadTableProps) {
  return (
    <Box
      bg="white"
      borderColor="gray.200"
      borderRadius="lg"
      borderWidth="1px"
      boxShadow="0 20px 50px rgba(23, 33, 29, 0.08)"
      overflow="hidden"
    >
      <Box alignItems="center" display="flex" justifyContent="space-between" p="5">
        <Heading color="gray.900" fontSize="lg">
          Pipeline
        </Heading>
        <Text color="gray.600" fontSize="sm">
          {loading ? 'Loading...' : `${leads.length} leads`}
        </Text>
      </Box>

      <Box overflowX="auto">
        <table style={{ borderCollapse: 'collapse', minWidth: '720px', width: '100%' }}>
          <thead>
            <tr>
              {['Lead', 'Source', 'Score', 'Status'].map((heading) => (
                <Box
                  key={heading}
                  as="th"
                  bg="gray.50"
                  borderTopColor="gray.200"
                  borderTopWidth="1px"
                  color="gray.500"
                  fontSize="xs"
                  letterSpacing="0.04em"
                  p="4"
                  textAlign="left"
                  textTransform="uppercase"
                >
                  {heading}
                </Box>
              ))}
            </tr>
          </thead>
          <tbody>
            {!loading && leads.length === 0 && (
              <tr>
                <td colSpan={4} style={{ borderTop: '1px solid var(--chakra-colors-gray-200)', padding: '48px' }}>
                  <Text color="gray.500" textAlign="center">
                    No leads added yet.
                  </Text>
                </td>
              </tr>
            )}

            {leads.map((lead) => (
              <tr key={lead.id}>
                <Box as="td" borderTopColor="gray.200" borderTopWidth="1px" p="4">
                  <Stack gap="1">
                    <Text color="gray.900" fontWeight="bold">
                      {lead.name}
                    </Text>
                    <Text color="gray.500" fontSize="sm">
                      {lead.company || lead.email}
                    </Text>
                  </Stack>
                </Box>
                <Box as="td" borderTopColor="gray.200" borderTopWidth="1px" p="4">
                  <Stack gap="1">
                    <Text color="gray.800">{sourceLabels[lead.source] ?? lead.source}</Text>
                    <Text color="gray.500" fontSize="sm">
                      {lead.siteVisits} {lead.siteVisits === 1 ? 'visit' : 'visits'}
                    </Text>
                  </Stack>
                </Box>
                <Box as="td" borderTopColor="gray.200" borderTopWidth="1px" p="4">
                  <Stack alignItems="start" gap="1">
                    <Badge colorPalette={scoreColor(lead.score)} size="lg">
                      {lead.score}
                    </Badge>
                    <Text color="gray.500" fontSize="sm">
                      {classifyLead(lead.score)}
                    </Text>
                  </Stack>
                </Box>
                <Box as="td" borderTopColor="gray.200" borderTopWidth="1px" p="4">
                  <NativeSelect.Root minW="150px">
                    <NativeSelect.Field
                      value={lead.status}
                      onChange={(event) => onStatusChange(lead.id, event.currentTarget.value as LeadStatus)}
                    >
                      {Object.entries(statusLabels).map(([value, label]) => (
                        <option key={value} value={value}>
                          {label}
                        </option>
                      ))}
                    </NativeSelect.Field>
                    <NativeSelect.Indicator />
                  </NativeSelect.Root>
                </Box>
              </tr>
            ))}
          </tbody>
        </table>
      </Box>
    </Box>
  );
}
