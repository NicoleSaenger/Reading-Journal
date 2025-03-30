//Importando dependências
import React from 'react';
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";


//URL da API
const API_URL = "http://localhost:5000/books";


//Componente responsável pela adição de livros
function BookForm({ onBookAdded }) {

    //Estado para armazenar dados do livro
    const [book, setBook] = useState({ title: "", author: "", genre: "", readAt: "" });

    //Hook para navegação entre páginas
    const navigate = useNavigate(); 

    //Valida e atualiza o campo 'readAt'
    const handleReadAtChange = (e) => {
        const value = e.target.value;
        // Permitir apenas números e o separador '-'
        if (/^\d{0,2}(\d{2})?(-\d{0,2})?(-\d{0,4})?$/.test(value)) {
            setBook({ ...book, readAt: value });
        }
    };


    //Lida com o envio do formulário
    const handleSubmit = async (e) => {
        e.preventDefault(); //Evita recarregamento da página
        try {
            const response = await axios.post(API_URL, book); //Envia os dados do livro a API
            onBookAdded(response.data); //Atualiza lista de livros
            setBook({ title: "", author: "", genre: "", readAt: "" }); //Reseta os campos
            navigate("/list"); //Redireciona para a página de listagem
        } catch (error) {
            console.error("Erro ao adicionar livro:", error);
        }
    };


    return (
        <div className="containerBookForm">
            <div className="formBookForm">
                {/*Formulário para adição de novos livros*/}
                <h1 className="title">Cadastrar Novo Livro</h1>
                <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "10px"}}>
                    
                    {/*Adiciona título*/}
                    <label className="labelBookForm">Título:</label>
                    <input className="inputBookForm"
                        type="text"
                        placeholder="Título"
                        value={book.title}
                        onChange={(e) => setBook({ ...book, title: e.target.value })}
                        required                        
                    />
                    
                    {/*Adiciona autor*/}
                    <label className="labelBookForm">Autor:</label>
                    <input className="inputBookForm"
                        type="text"
                        placeholder="Autor"
                        value={book.author}
                        onChange={(e) => setBook({ ...book, author: e.target.value })}
                        required                        
                    />
                    
                    {/*Adiciona gênero*/}
                    <label className="labelBookForm">Gênero:</label>
                    <input className="inputBookForm"
                        type="text"
                        placeholder="Gênero"
                        value={book.genre}
                        onChange={(e) => setBook({ ...book, genre: e.target.value })}
                        required
                    />

                    {/*Adiciona data de leitura*/}
                    <label className="labelBookForm">Lido em:</label>
                    <input className="inputBookForm"
                        type="text"
                        placeholder="Lido em (DD-MM-YYYY)"
                        value={book.readAt}
                        onChange={handleReadAtChange}
                        required
                    />

                    {/*Botões para cancelar ou adicionar livro*/}
                    <div style={{ display: "flex", justifyContent: "space-between", marginTop: "15px" }}>
                        <button 
                            type="button" 
                            className="cancelButtonForm"
                            onClick={() => navigate("/")}>
                            Cancelar
                        </button>

                        <button 
                            className="addButtonForm"
                            type="submit" >
                            Adicionar Livro
                        </button>
                    </div>

                </form>
            </div>
        </div>
    );
}

export default BookForm;