// src/components/CharacterSheet.jsx
import React, { useState, useEffect } from "react"; // Importa React e hooks
import "../style/characterSheet.css"; // Importa o CSS da ficha
import html2pdf from "html2pdf.js"; // Biblioteca para gerar PDF

// Componente principal da ficha
const CharacterSheet = ({ character, onSaveEdit, onEditClick }) => {
  // Controla se está no modo de edição
  const [isEditing, setIsEditing] = useState(false);

  // Armazena os dados editados (inicializa com o personagem passado como prop)
  const [edited, setEdited] = useState({
    name: "",
    race: "",
    class: "",
    Força: 0,
    Destreza: 0,
    Constituição: 0,
    Inteligência: 0,
    Sabedoria: 0,
    Carisma: 0,
    image: null,
    ...(character || {}), // Garante que dados do personagem atual sejam carregados
  });

  // Pontuação máxima permitida
  const maxPoints = 30;

  // Soma dos pontos usados nos atributos
  const totalUsed = [
    "Força",
    "Destreza",
    "Constituição",
    "Inteligência",
    "Sabedoria",
    "Carisma",
  ].reduce((sum, attr) => sum + (parseInt(edited[attr]) || 0), 0);

  // Quantidade de pontos restantes
  const remaining = maxPoints - totalUsed;

  // Se excedeu os pontos, o formulário é inválido
  const invalid = remaining < 0;

  // Sempre que a prop character muda, atualiza o estado edited
  useEffect(() => {
    setEdited((prev) => ({ ...prev, ...character }));
  }, [character]);

  // Atualiza um campo do personagem editado
  const handleChange = (field, value) => {
    setEdited((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  // Salva a edição e sai do modo de edição
  const handleSave = () => {
    if (invalid) return; // Impede salvar se inválido
    onSaveEdit(edited); // Chama callback para salvar
    setIsEditing(false); // Sai do modo de edição
  };

  // Gera o PDF da ficha usando html2pdf
  const handleGeneratePDF = () => {
    const element = document.getElementById("character-sheet");
    html2pdf()
      .from(element)
      .set({
        margin: 10,
        filename: "ficha-personagem.pdf",
        image: { type: "jpeg", quality: 0.98 },
        html2canvas: { scale: 3 },
        jsPDF: { unit: "mm", format: [240, 190], orientation: "landscape" },
      })
      .save();
  };

  // Se character não for definido, exibe mensagem
  if (!character) return <p>Personagem não encontrado.</p>;

  return (
    <>
      {/* Área visual da ficha */}
      <div className="character-sheet" id="character-sheet">
        <h2 className="sheet-title">Ficha</h2>

        {/* Cabeçalho: Nome, Raça, Classe e Imagem */}
        <div className="sheet-header">
          <div className="basic-info">
            <p>
              <strong>Nome: </strong>
              {isEditing ? (
                <input
                  value={edited.name}
                  onChange={(e) => handleChange("name", e.target.value)}
                  placeholder="Nome do personagem"
                />
              ) : (
                <span>{character.name}</span>
              )}
            </p>

            <p>
              <strong>Raça:</strong>{" "}
              {isEditing ? (
                <select
                  value={edited.race}
                  onChange={(e) => handleChange("race", e.target.value)}
                >
                  <option value="Humano">Humano</option>
                  <option value="Elfo">Elfo</option>
                  <option value="Anão">Anão</option>
                  <option value="Orc">Orc</option>
                  <option value="Tiefling">Tiefling</option>
                  <option value="Draconato">Draconato</option>
                  <option value="Animalidio">Animalidio</option>
                </select>
              ) : (
                <span>{character.race}</span>
              )}
            </p>

            <p>
              <strong>Classe:</strong>{" "}
              {isEditing ? (
                <select
                  value={edited.class}
                  onChange={(e) => handleChange("class", e.target.value)}
                >
                  <option value="Guerreiro">Guerreiro</option>
                  <option value="Mago">Mago</option>
                  <option value="Ladino">Ladino</option>
                  <option value="Clérigo">Clérigo</option>
                  <option value="Bárbaro">Bárbaro</option>
                  <option value="Bardo">Bardo</option>
                  <option value="Bruxo">Bruxo</option>
                  <option value="Druida">Druida</option>
                  <option value="Feiticeiro">Feiticeiro</option>
                  <option value="Monge">Monge</option>
                  <option value="Paladino">Paladino</option>
                  <option value="Patruleiro">Patruleiro</option>
                </select>
              ) : (
                <span>{character.class}</span>
              )}
            </p>
          </div>

          {/* Imagem do personagem (se houver) */}
          {edited.image && (
            <img
              src={edited.image}
              className="character-image"
              alt="Personagem"
            />
          )}
        </div>

        {/* Atributos e pontuação */}
        <div className="attributes-box">
          <h3>Atributos</h3>
          <div className="attributes-grid">
            {[
              "Força",
              "Destreza",
              "Constituição",
              "Inteligência",
              "Sabedoria",
              "Carisma",
            ].map((attr) => (
              <div className="attr" key={attr}>
                <strong>{attr}:</strong>{" "}
                {isEditing ? (
                  <input
                    type="number"
                    min="0"
                    max="20"
                    value={edited[attr]}
                    onChange={(e) => {
                      const newValue = parseInt(e.target.value) || 1;
                      const currentValue = edited[attr] || 1;
                      const availablePoints = remaining + currentValue;

                      const adjustedValue = Math.min(
                        Math.max(newValue, 1),
                        Math.min(availablePoints, 20)
                      );

                      handleChange(attr, adjustedValue);
                    }}
                  />
                ) : (
                  <span>{character[attr]}</span>
                )}
              </div>
            ))}
          </div>

          {/* Mostra pontuação usada/restante se estiver editando */}
          {isEditing && (
            <div className="points-info">
              <p style={{ color: invalid ? "red" : "green" }}>
                {invalid ? "⚠️ Pontos excedidos!" : "✅ Pontos válidos!"}
              </p>
              <p>
                Usados: {totalUsed} | Restantes: {remaining} |
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Botões de ação */}
      <div className="sheet-actions">
        {isEditing ? (
          <>
            <button
              onClick={handleSave}
              disabled={invalid}
              className={invalid ? "disabled-button" : ""}
            >
              Salvar Alterações
            </button>
            <button onClick={() => setIsEditing(false)}>❌ Cancelar</button>
          </>
        ) : (
          <>
            <button onClick={() => setIsEditing(true)}>Editar</button>
            <button onClick={handleGeneratePDF}>📄 Gerar PDF</button>
          </>
        )}
      </div>
    </>
  );
};

export default CharacterSheet;
