//Importando dependências
import React from 'react';
import { render, screen } from '@testing-library/react';
import Home from './Home';

describe('Home Component', () => {
  it('deve renderizar os textos principais corretamente', () => {
    render(<Home />);

    //Verifica se os textos foram renderizados em tela
    const titleElement = screen.getByText('Reading Journal');
    const subtitleElement = screen.getByText('Seja muito bem-vindo ao meu Reading Journal!📖🍂');
    const paragraphElement = screen.getByText(/Um espaço para amantes da literatura/i);

    //Confirma que os elementos existem no documento
    expect(titleElement).toBeInTheDocument();
    expect(subtitleElement).toBeInTheDocument();
    expect(paragraphElement).toBeInTheDocument();
  });
});
