//Importando dependências
import React from 'react';
import { render, screen } from '@testing-library/react';
import NavBar from './NavBar';
import '@testing-library/jest-dom';

// Mock do react-router-dom 
jest.mock('react-router-dom', () => ({
    Link: ({ children }) => <div>{children}</div>
}));

test('Renderiza os links da barra de navegação', () => {
    render(<NavBar />);

    //Verifica se os links foram renderizados
    expect(screen.getByText('Sobre')).toBeInTheDocument();
    expect(screen.getByText('Lista de Livros')).toBeInTheDocument();
    expect(screen.getByText('Cadastrar')).toBeInTheDocument();
});
