import { Box, Grid, Text } from '@chakra-ui/react';

type SummaryCardsProps = {
  total: number;
  hot: number;
  average: number;
};

export function SummaryCards({ total, hot, average }: SummaryCardsProps) {
  const items = [
    { label: 'Total', value: total },
    { label: 'High priority', value: hot },
    { label: 'Average score', value: average },
  ];

  return (
    <Grid gap="4" gridTemplateColumns={{ base: '1fr', md: 'repeat(3, minmax(0, 1fr))' }}>
      {items.map((item) => (
        <Box key={item.label} bg="white" borderColor="gray.200" borderRadius="lg" borderWidth="1px" p="5">
          <Text color="gray.600" fontSize="sm">
            {item.label}
          </Text>
          <Text color="gray.900" fontSize="3xl" fontWeight="bold" mt="2">
            {item.value}
          </Text>
        </Box>
      ))}
    </Grid>
  );
}
