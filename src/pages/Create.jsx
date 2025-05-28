// Importa o React e o hook useState para controle de estado
import React, { useState } from "react";
// Importa Link do React Router para navegar de volta à Home
import { Link } from "react-router-dom";
// Importa o componente do formulário de criação de personagem
import CharacterForm from "../componentes/CharacterForm.jsx";
// Importa o componente que exibe a ficha do personagem criada
import CharacterSheet from "../componentes/CharacterSheet.jsx";
// Importa o CSS específico dessa página
import "../style/create.css";

// Componente funcional da página Create
const Create = () => {
  // Estado para armazenar o personagem criado ou editado
  const [character, setCharacter] = useState(null);

  // Função chamada quando o formulário de criação envia um novo personagem
  const handleCharacterSubmit = (newCharacter) => {
    setCharacter(newCharacter); // Atualiza o estado com a ficha criada
  };

  // Função chamada ao salvar uma edição da ficha
  const handleSaveEdit = (updatedCharacter) => {
    setCharacter(updatedCharacter); // Atualiza o estado com a ficha editada
  };

  // Função chamada ao clicar em "Editar" na ficha, volta para o formulário
  const handleEditClick = () => {
    setCharacter(null); // Zera o estado para reexibir o formulário
  };

  return (
    // Container principal da página de criação
    <div className="create-page">
      {/* Container que alterna entre o formulário e a ficha */}
      <div className="create-container">
        {character ? (
          // Se já existe um personagem criado, mostra a ficha
          <CharacterSheet
            character={character}
            onSaveEdit={handleSaveEdit}
            onEditClick={handleEditClick}
          />
        ) : (
          // Caso contrário, mostra o formulário de criação
          <CharacterForm onCharacterSubmit={handleCharacterSubmit} />
        )}
      </div>
    </div>
  );
};

// Exporta o componente para uso em outras partes da aplicação
export default Create;
