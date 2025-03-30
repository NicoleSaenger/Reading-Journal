//Importando dependências
import bookImage from "../assets/booksHome.png"


//Função que carrega página inicial
function Home() {
    return (
        <div style={{ 
            display: "flex", 
            alignItems: "center", 
            justifyContent: "flex-start",
            padding: "40px",  
            marginTop: "5px",
            minHeight: "100vh"
        }}>
            {/*Área da Imagem */}
            <div style={{ 
                 width: "40%", 
                 minHeight: "100vh",
                 backgroundImage: `url(${bookImage})`, 
                 backgroundSize: "contain", 
                 backgroundPosition: "left center", 
                 backgroundRepeat: "no-repeat" 
            }}></div>

            {/*Área do Texto*/}
            <div style={{ 
                width: "40%", 
                textAlign: "left", 
                padding: "20px" 
            }}>
                {/*Títulos e textos*/}
                <h1 className="title">Reading Journal</h1>
                <h2 className="text">Seja muito bem-vindo ao meu Reading Journal!📖🍂</h2>
                <p className="text">
                    Um espaço para amantes da literatura, que apreciam a calmaria de uma tarde de leitura acompanhada de uma boa xícara de chá🍵💛
                </p>
            </div>
        </div>
    );
}

export default Home;