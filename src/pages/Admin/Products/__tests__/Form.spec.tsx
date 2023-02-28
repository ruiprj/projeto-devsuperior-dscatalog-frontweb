import { render, screen } from '@testing-library/react';
import Form from '../Form';
import history from 'util/history';
import { Router } from 'react-router-dom';

test('should render Form', () => {
  render(
    // o Router no teste é obrigatório pois existe um Switch dentro do Form -> o Switch deve estar dentro de um Router durante um teste
    <Router history={history}>
      <Form />
    </Router>
  );

  screen.debug();
});
