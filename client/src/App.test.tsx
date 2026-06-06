import React from 'react';
import { render, screen } from '@testing-library/react';
import { vi } from 'vitest';
import App from './App';
import { Provider } from './components/ui/provider';

beforeEach(() => {
  globalThis.fetch = vi.fn().mockResolvedValue({
    ok: true,
    json: async () => [],
  });
});

test('renders the lead classifier workspace', async () => {
  render(
    <Provider>
      <App />
    </Provider>,
  );

  expect(screen.getByRole('heading', { name: /sales lead scoring/i })).toBeInTheDocument();
  expect(screen.getByRole('button', { name: /score lead/i })).toBeInTheDocument();
  expect(await screen.findByText(/no leads added yet/i)).toBeInTheDocument();
});
