//Importando dependências
import aboutImage from "../assets/infoImage.png"; 


//Função que traz a informações da página de 'sobre'
function Info() {
    return (
        <div style={{ 
            display: "flex", 
            alignItems: "center", 
            justifyContent: "flex-start",
            padding: "40px",  
            marginTop: "5px",
            minHeight: "100vh",
            marginLeft: "100px"
        }}>
            {/*Área do Texto*/}
            <div style={{ 
                width: "50%", 
                maxWidth: "700px",
                textAlign: "left", 
                padding: "20px" 
            }}>
                {/*Tírulos e textos*/}
                <h1 className="title">Sobre o Projeto</h1>
                <p className="text">
                    A criação desta página nasceu da proposta universitária para a disciplina de Desenvolvimento de Sistemas Frontend, com o desafio de desenvolver um CRUD para um Reading Journal.
                </p>
                <br/>
                <p className="text">
                    Aqui, você poderá registrar, editar e acompanhar suas leituras de forma simples e prática!
                </p>
                <br/>
                <p className="text">
                    Este é um espaço especial para armazenar e relembrar todos os livros incríveis que marcaram sua trajetória! 📖✨
                </p>
            </div>

            {/*Área da Imagem*/}
            <div style={{ 
                width: "40%", 
                minHeight: "100vh", 
                backgroundImage: `url(${aboutImage})`, 
                backgroundSize: "contain", 
                backgroundPosition: "right center", 
                backgroundRepeat: "no-repeat" 
            }}></div>
        </div>
    );
}

export default Info;