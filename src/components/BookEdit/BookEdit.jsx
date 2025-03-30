//Importando dependências
import React from 'react';
import { useState, useEffect } from "react";
import axios from "axios";


//URL da API
const API_URL = "http://localhost:5000/books";


//Componente responsável pela edição dos livros
function BookEdit({ bookId, saveEdit, cancelEdit }) {

  //Estado que armazena os dados dos livros em edição
  const [editedBook, setEditedBook] = useState(null);

  //Estado para armazenar mensagens de erro
  const [error, setError] = useState(null);

  //Acionado sempre que o bookId muda
  useEffect(() => {
    console.log("Buscando livro com ID:", bookId); 
  
    //Verifica se o bookId é válido
    if (!bookId) {
      setError("ID do livro inválido");
      return;
    }
  
    //Realiza requisição através do GET buscando dados do livro
    axios.get(`${API_URL}/${bookId}`)
      .then((response) => setEditedBook(response.data))
      .catch((error) => {
        console.error("Erro ao carregar livro:", error);
        setError("Erro ao carregar livro. Verifique se o ID é válido.");
      });
  }, [bookId]);


  //Controle do campo de data de leitura
  const handleReadAtChange = (e) => {
    const value = e.target.value;
    // Permitir apenas números e o separador '-'
    if (/^\d{0,2}(\d{2})?(-\d{0,2})?(-\d{0,4})?$/.test(value)) {
      setEditedBook({ ...editedBook, readAt: value });
    }
  };


  //Manipula o envio do formulário para salvar as alterações feitas no livro
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const updatedBook = { ...editedBook, id: bookId }; // Inclui o ID no corpo da requisição
      const response = await axios.put(API_URL, updatedBook); // Atualiza os dados via PUT    

      saveEdit(response.data); // Salva a edição no estado do componente BookList
    } catch (error) {
      console.error("Erro ao editar livro:", error);
    }
  };


  // Exibe mensagens de erro/loading caso os dados ainda não tenham sido carregados
  if (error) return <p>{error}</p>;
  if (!editedBook) return <p>Carregando livro...</p>;

  return (
    //Formulário para editar as propriedades dos livros
    <form onSubmit={handleSubmit} className="formBookEdit">
      {/*Edita título*/}
      <div>
        <label className="labelEdit" htmlFor="title">Título</label>
        <input className="inputBookEdit"
          id="title"
          type="text" 
          value={editedBook.title} 
          onChange={(e) => setEditedBook({ ...editedBook, title: e.target.value })} 
          required   
        />
      </div>

      {/*Edita autor*/}
      <div>
        <label className="labelEdit" htmlFor="author">Autor</label>
        <input className="inputBookEdit"
          id="author"
          type="text" 
          value={editedBook.author} 
          onChange={(e) => setEditedBook({ ...editedBook, author: e.target.value })} 
          required 
        />
      </div>

      {/*Edita gênero*/}
      <div>
        <label className="labelEdit" htmlFor="genre">Gênero</label>
        <input className="inputBookEdit"
          id="genre"
          type="text" 
          value={editedBook.genre} 
          onChange={(e) => setEditedBook({ ...editedBook, genre: e.target.value })} 
          required 
        />
      </div>

      {/*Edita data*/}
      <div>
        <label className="labelEdit" htmlFor="readAt" >Data de Leitura</label>
        <input className="inputBookEdit"
          id="readAt"
          type="text" 
          value={editedBook.readAt} 
          onChange={handleReadAtChange} 
          required 
          placeholder="DD-MM-YYYY" 
        />
      </div>

      {/*Botão para salvar alterações*/}
      <button className="saveButton" type="submit">Salvar</button>
      {/*Botão para cancelar a edição*/}
      <button className="cancelButton" type="button" onClick={cancelEdit}>Cancelar</button>
    </form>
  );
}

export default BookEdit;