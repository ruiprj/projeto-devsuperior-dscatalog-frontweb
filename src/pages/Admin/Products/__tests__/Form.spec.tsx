import { render, screen, waitFor } from '@testing-library/react';
import Form from '../Form';
import history from 'util/history';
import { Router, useParams } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import { server } from './fixtures';
import selectEvent from 'react-select-event';
import { ToastContainer } from 'react-toastify';

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

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

  test('should show toasty and redirect when submit form correctly', async () => {
    render(
      // o Router no teste é obrigatório pois existe um Switch dentro do Form -> o Switch deve estar dentro de um Router durante um teste
      <Router history={history}>
        <ToastContainer />
        <Form />
      </Router>
    );

    const nameInput = screen.getByTestId("name");
    const priceInput = screen.getByTestId("price");
    const imgUrlInput = screen.getByTestId("imgUrl");
    const descriptionInput = screen.getByTestId("description");
    const categoriesInput = screen.getByLabelText("Categorias");

    const submitButton = screen.getByRole('button', { name: /salvar/i }); // '/text/i' ignora maiúsculas/minúsculas

    await selectEvent.select(categoriesInput, ['Eletrônicos', 'Computadores']);
    userEvent.type(nameInput, 'Computador');
    userEvent.type(priceInput, '5000.12');
    userEvent.type(imgUrlInput, 'https://raw.githubusercontent.com/devsuperior/dscatalog-resources/master/backend/img/1-big.jpg');
    userEvent.type(descriptionInput, 'Computador legalzão');

    userEvent.click(submitButton);

    await waitFor(() => {
      const toastElement = screen.getByText('Produto cadastrado com sucesso!');
      expect(toastElement).toBeInTheDocument();
    });

    expect(history.location.pathname).toEqual('/admin/products');
  });

  test('should show 5 validation messages when just clicking submit', async () => {
    render(
      <Router history={history}>
        <Form />
      </Router>
    );

    const submitButton = screen.getByRole('button', { name: /salvar/i }); // '/text/i' ignora maiúsculas/minúsculas

    userEvent.click(submitButton);

    await waitFor(() => {
      const messages = screen.getAllByText('Campo obrigatório');
      expect(messages).toHaveLength(5);
    });
  });

  test('should clear validation messages when filling out the form', async () => {
    render(
      <Router history={history}>
        <Form />
      </Router>
    );

    const submitButton = screen.getByRole('button', { name: /salvar/i }); // '/text/i' ignora maiúsculas/minúsculas

    userEvent.click(submitButton);

    await waitFor(() => {
      const messages = screen.getAllByText('Campo obrigatório');
      expect(messages).toHaveLength(5);
    });



    const nameInput = screen.getByTestId("name");
    const priceInput = screen.getByTestId("price");
    const imgUrlInput = screen.getByTestId("imgUrl");
    const descriptionInput = screen.getByTestId("description");
    const categoriesInput = screen.getByLabelText("Categorias");

    await selectEvent.select(categoriesInput, ['Eletrônicos', 'Computadores']);
    userEvent.type(nameInput, 'Computador');
    userEvent.type(priceInput, '5000.12');
    userEvent.type(imgUrlInput, 'https://raw.githubusercontent.com/devsuperior/dscatalog-resources/master/backend/img/1-big.jpg');
    userEvent.type(descriptionInput, 'Computador legalzão');

    await waitFor(() => {
      const messages = screen.queryAllByText('Campo obrigatório');
      expect(messages).toHaveLength(0);
    });
  });
});
