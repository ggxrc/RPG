// Importa o componente Link do React Router para navegação entre páginas
import { Link } from "react-router-dom";

// Importa o CSS específico da página inicial (home)
import "../style/home.css"; // Certifique-se de que esse caminho está correto

// Componente funcional Home
function Home() {
  return (
    // Container principal da página inicial
    <div className="home-page">
      {/* Título principal da página */}
      <h1 className="home-title">Criador de Ficha de RPG</h1>

      {/* Subtítulo descritivo */}
      <p className="home-subtitle">
        Monte sua ficha de forma rápida e divertida!
      </p>

      {/* Botão que redireciona para a rota /create */}
      <Link to="/create" className="create-button-link">
        <img
          src="/imagens/botaomadeira.png" // Imagem do botão
          alt="Criar Personagem"
          className="create-button-img" // Estilo aplicado à imagem
        />
      </Link>
    </div>
  );
}

// Exporta o componente para ser usado em outras partes da aplicação
export default Home;
