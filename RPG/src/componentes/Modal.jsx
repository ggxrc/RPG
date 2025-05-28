import React from "react";
// Importa o arquivo de estilo específico para este componente
import "../style/Modal.css";

// Componente Modal: usado para mostrar conteúdo em uma janela sobreposta na tela
export function Modal({ isOpen, onClose, title, children }) {
  // Se o modal não estiver aberto, não renderiza nada (retorna null)
  if (!isOpen) return null;

  return (
    // Fundo escuro que cobre toda a tela (overlay)
    <div className="modal-overlay">
      {/* Caixa do modal em si */}
      <div className="modal-box">
        {/* Botão para fechar o modal */}
        <button className="modal-close" onClick={onClose}>
          X
        </button>

        {/* Se tiver título, exibe um <h2> com ele */}
        {title && <h2>{title}</h2>}

        {/* Aqui é onde vai o conteúdo passado para o modal */}
        <div>{children}</div>
      </div>
    </div>
  );
}
