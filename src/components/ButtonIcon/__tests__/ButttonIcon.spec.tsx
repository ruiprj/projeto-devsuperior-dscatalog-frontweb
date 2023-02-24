import { render, screen } from "@testing-library/react";
import ButttonIcon from "..";


test('ButttonIcon should render button with given test', () => {

    // ARRANGE
    const text = "Fazer login";

    // ACT (renderizar o componente)
    render(
        <ButttonIcon text={text} />
    );

    // screen.debug();

    // ASSERT (usar as queries do Testing Library)
    expect(screen.getByText(text)).toBeInTheDocument();

});
