import { Box, Button, Container, Flex, Heading, Text } from '@chakra-ui/react';
import { ReactNode } from 'react';

type AppShellProps = {
  children: ReactNode;
  onRefresh: () => void;
};

export function AppShell({ children, onRefresh }: AppShellProps) {
  return (
    <Box as="main" bg="gray.50" minH="100vh" px={{ base: '5', lg: '8' }} py={{ base: '6', lg: '8' }}>
      <Container maxW="1180px" p="0">
        <Flex
          alignItems={{ base: 'stretch', md: 'center' }}
          direction={{ base: 'column', md: 'row' }}
          gap="5"
          justifyContent="space-between"
          mb="6"
        >
          <Box>
            <Text color="teal.700" fontSize="xs" fontWeight="bold" letterSpacing="0.08em" textTransform="uppercase">
              Lead automation
            </Text>
            <Heading color="gray.900" fontSize={{ base: '4xl', lg: '5xl' }} lineHeight="1" mt="2">
              Sales lead scoring
            </Heading>
          </Box>
          <Button bg="white" borderColor="gray.200" borderWidth="1px" color="gray.800" onClick={onRefresh}>
            Refresh
          </Button>
        </Flex>

        {children}
      </Container>
    </Box>
  );
}
