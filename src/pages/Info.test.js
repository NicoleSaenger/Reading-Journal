//Importando dependências
import { render, screen } from '@testing-library/react';
import Info from './Info';

//Verifica se o título foi renderizado
describe('Info Component', () => {
  it('deve renderizar o título "Sobre o Projeto"', () => {
    render(<Info />);
    const titleElement = screen.getByText(/Sobre o Projeto/i);
    expect(titleElement).toBeInTheDocument();
  });

  //Verifica se o texto foi renderizado
  it('deve renderizar a descrição do projeto', () => {
    render(<Info />);
    const paragraphElement = screen.getByText(/A criação desta página nasceu da proposta universitária/i);
    expect(paragraphElement).toBeInTheDocument();
  });

});
