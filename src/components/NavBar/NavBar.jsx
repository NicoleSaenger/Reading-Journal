//Importando dependências
import React from 'react';
import { Link } from 'react-router-dom';
import { FaHome } from 'react-icons/fa';


//Barra de navegação
function NavBar() {
    return (
        <nav className='navBar'>
            <ul className='navBarList'>
                {/*Links de navegação entre telas*/}
                <li>
                    <Link to="/" className='navBarLinks'>
                        <FaHome size={20} />
                    </Link>
                </li>
                <li><Link to="/info" className='navBarLinks'>Sobre</Link></li>
                <li><Link to="/list" className='navBarLinks'>Lista de Livros</Link></li>
                <li><Link to="/add" className='navBarLinks'>Cadastrar</Link></li>
            </ul>
        </nav>
    );
}

export default NavBar;