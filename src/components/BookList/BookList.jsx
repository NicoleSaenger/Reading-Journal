//Importando dependências
import React from 'react';
import { useEffect, useState } from 'react';
import axios from 'axios';
import BookEdit from '../BookEdit/BookEdit';
import { useNavigate } from 'react-router-dom';


//URL da API
const API_URL = 'http://localhost:5000/books';


//Componente responsável pela listagem de livros
function BookList() {

    //Estado armazena livros
    const [books, setBooks] = useState([]);

    //Estado para controle de livro em edição
    const [editingBookId, setEditingBookId] = useState(null);

    //Estado para controle de carregamento de dados
    const [loading, setLoading] = useState(true);

    //Estado para controle de erros
    const [error, setError] = useState(false);

    //Hook para navegação entre páginas
    const navigate = useNavigate();



    //Busca os livros da API ao carregar a página
    useEffect(() => {

        //Requisição GET para busca de livros na API
        axios.get(API_URL)
            .then(response => setBooks(response.data))
            .catch(error => {
                console.error('Erro ao buscar livros:', error);
                setError(true);
            })
            .finally(() => setLoading(false));
    }, []);


    //Redireciona para a página de cadastro
    const handleNewBook = () => {
        navigate('/add');
    };


    //Função para deletar livro a partir do ID
    const deleteBook = async (id) => {
        try {
            //Requisição delete na API
            await axios.delete(`${API_URL}/${id}`);
            //Atualiza a lista de livros
            setBooks(prevBooks => prevBooks.filter(book => book.id !== id));
        } catch (error) {
            console.error('Erro ao deletar livro:', error);
        }
    };


    //Função para salvar a edição de um livro
    const editBook = async (updatedBook) => {
        try {
            //Requisição PUT para atualizar o livro
            const response = await axios.put(API_URL, updatedBook);
            //Atualiza a lista de livros com os novos dados
            setBooks((prevBooks) => 
                prevBooks.map((book) => (book.id === updatedBook.id ? response.data : book))
          );
          //Reseta o estado de edição
          setEditingBookId(null);
        } catch (error) {
          console.error("Erro ao editar livro:", error);
        }
      };



    return (
        <div style={{ textAlign: 'center', padding: '20px', marginTop: '60px' }}>
            <h1 className="title">Listagem de Livros</h1>

            {/*Exibe a mensagem de carregamento ou erro*/}
            {loading ? (
                <p>Carregando livros...</p>
            ) : error || books.length === 0 ? (
                <p>Nenhum livro cadastrado.</p>
            ) : (
                <div className='cardsPosition'>
                    {/*Exibe os livros em cards*/}
                    {books.map((book) => (
                        <div key={book.id} className='cardsStyle'>
                            {/*Se o livro estiver sendo editado, exibe o componente BookEdit*/}
                            {editingBookId === book.id ? (
                                <div style={{ padding: '10px' }}> 
                                <BookEdit 
                                    bookId={book.id} 
                                    saveEdit={editBook} 
                                    cancelEdit={() => setEditingBookId(null)} 
                                />
                               </div>
                            ) : (
                                <>
                                    {/*Exibe as informações do livro*/}
                                    <h3>{book.title}</h3>
                                    <p><strong>Autor:</strong> {book.author}</p>
                                    <p><strong>Gênero:</strong> {book.genre}</p>
                                    <p><strong>Data:</strong> {book.readAt}</p>

                                    {/*Botões para editar ou excluir livro*/}
                                    <button className='editButton' onClick={() => setEditingBookId(book.id)}>Editar</button>
                                    <button className='deleteButton' onClick={() => deleteBook(book.id)}>Excluir</button>
                                </>
                            )}
                        </div>
                    ))}
                </div>
            )}

            {/*Botão para adicionar novo livro, levando para a página /add*/}
            <button className='addNewBookButton' onClick={handleNewBook}>
                Cadastrar Novo Livro
            </button>

        </div>
    );
}

export default BookList;