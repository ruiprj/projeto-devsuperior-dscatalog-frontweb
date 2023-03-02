import { render, screen } from '@testing-library/react';
import Form from '../Form';
import history from 'util/history';
import { Router, useParams } from 'react-router-dom';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: jest.fn(),
}));

describe('Product form create tests', () => {

  beforeEach(() => {
    (useParams as jest.Mock).mockReturnValue({
        productId: 'create'
    })
  });

  test('should render Form', () => {
    render(
      // o Router no teste é obrigatório pois existe um Switch dentro do Form -> o Switch deve estar dentro de um Router durante um teste
      <Router history={history}>
        <Form />
      </Router>
    );

    const nameInput = screen.getByTestId("name");
    const priceInput = screen.getByTestId("price");
    const imgUrlInput = screen.getByTestId("imgUrl");
    const descriptionInput = screen.getByTestId("description");
  });
});
