//Importando dependências 
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';

//Importando páginas e componentes
import NavBar from './components/NavBar/NavBar';
import BookForm from './components/BookForm/BookForm';
import BookList from './components/BookList/BookList';
import Home from './pages/Home';
import Info from './pages/Info';

//Importando estilização
import "./App.css"; 


//URL da API
const API_URL = 'http://localhost:5000/books';


//Função principal para carregamento da aplicação
function App() {

    //Estado para armazenar livros
    const [books, setBooks] = useState([]);

    //Carrega os livros ao carregar o App
    useEffect(() => {
        //Chama função que busca os livros
        fetchBooks();
    }, []);

    //Função que busca os livros da API
    const fetchBooks = async () => {
        try {
            //Requisição GET para buscar livros da API
            const response = await axios.get(API_URL);
            //Armazena livros recebidos da API
            setBooks(response.data);
        } catch (error) {
            console.error('Erro ao buscar livros:', error);
        }
    };

    return (
        //Componente Router que possibilita a navegação entre as páginas
        <Router>
            <NavBar />
            <div>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/info" element={<Info />} />
                    <Route path="/add" element={<BookForm onBookAdded={fetchBooks} />} />
                    <Route path="/list" element={<BookList books={books} fetchBooks={fetchBooks} />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;