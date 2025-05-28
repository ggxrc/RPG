// Importa React e os hooks useEffect e useState para controlar estado e efeitos colaterais
import React, { useEffect, useState } from "react";
// Importa o módulo de comunicação com a API
import api from "../services/api";
// Importa os ícones da biblioteca lucide-react
import { Pencil, FileDown, Trash2 } from "lucide-react";
// Importa o CSS específico dessa página
import "../style/Sheets.css";
// Componente principal responsável por exibir as fichas salvas
export default function Sheets() {
  // Estado local que guarda a lista de fichas
  const [fichas, setFichas] = useState([]);

  // useEffect é executado uma vez quando o componente é montado (array de dependências vazio)
  useEffect(() => {
    // Faz uma requisição GET para a API buscando as fichas
    api.get("/sheets").then(({ data }) => {
      // Atualiza o estado com as fichas retornadas da API
      setFichas(data.sheets);
    });
  }, []);

  // Função que exclui uma ficha com base no ID
  const handleDelete = async (id) => {
    // Faz uma requisição DELETE para remover a ficha do banco
    await api.delete(`/sheets/${id}`);

    // Atualiza o estado local removendo a ficha excluída da lista
    setFichas((prev) => prev.filter((f) => f._id !== id));
  };

  // Renderização do componente
  return (
    <div className="sheets-container">
      {/* Título da página */}
      <h1 className="sheets-title">Minhas Fichas</h1>

      {/* Grid onde as fichas serão exibidas como cards */}
      <div className="sheets-grid">
        {fichas.map((ficha) => (
          // Card individual da ficha
          <div key={ficha._id} className="sheet-card">
            {/* Informações principais da ficha */}
            <div className="sheet-info">
              <p>{ficha.name}</p> {/* Exibe o nome do personagem */}
            </div>

            {/* Botões de ação: editar, baixar e deletar */}
            <div className="sheet-actions">
              <button title="Editar">
                {/* Ícone de lápis para edição */}
                <Pencil size={32} strokeWidth={1.25} color="#fff" />
              </button>

              <button title="Download">
                {/* Ícone de seta para download */}
                <FileDown size={32} strokeWidth={1.25} color="#fff" />
              </button>

              <button title="Deletar" onClick={() => handleDelete(ficha._id)}>
                {/* Ícone de lixeira para deletar */}
                <Trash2 size={32} strokeWidth={1.25} color="#fff" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
