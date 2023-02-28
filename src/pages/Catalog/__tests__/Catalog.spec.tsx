import { render, screen, waitFor } from '@testing-library/react';
import Catalog from '..';
import history from 'util/history';
import { Router } from 'react-router-dom';
import { server } from './fixtures';

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

test('should render Catalog with products', async () => {
  render(
    // o Router no teste é obrigatório pois existe um Link dentro do Catalog -> o Link deve estar dentro de um Router durante um teste
    <Router history={history}>
      <Catalog />
    </Router>
  );

  // screen.debug();

  expect(screen.getByText('Catálogo de produtos')).toBeInTheDocument();

  await waitFor(() => {
    expect(screen.getByText('Smart TV')).toBeInTheDocument();
  });

  // screen.debug();
});
