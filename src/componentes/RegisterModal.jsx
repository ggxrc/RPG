// src/componentes/RegisterModal.jsx

// Importa React, hooks de estado e contexto
import React, { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext"; // Importa o contexto de autenticação
import { Modal } from "./Modal"; // Importa o componente Modal reutilizável

// Componente que exibe o modal de cadastro de usuário
export function RegisterModal({ isOpen, onClose }) {
  // Acessa a função de cadastro e o estado de carregamento do AuthContext
  const { register, loading } = useContext(AuthContext);

  // Estados locais para armazenar os dados digitados pelo usuário
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Função que será chamada ao enviar o formulário
  const handleSubmit = async (e) => {
    e.preventDefault(); // Previne o comportamento padrão do formulário (recarregar página)
    try {
      // Tenta registrar o usuário com os dados fornecidos
      await register({ username, email, password });
      // Se for bem-sucedido, fecha o modal
      onClose();
    } catch (error) {
      // Se ocorrer erro, exibe no console e alerta o usuário
      console.error("Erro no cadastro:", error);
      alert("Erro ao cadastrar. Verifique os dados e tente novamente.");
    }
  };

  return (
    // Componente Modal, reutilizado para exibir o formulário
    <Modal isOpen={isOpen} onClose={onClose} title="Cadastrar">
      {/* Formulário de cadastro */}
      <form onSubmit={handleSubmit}>
        {/* Campo de nome de usuário */}
        <label>Usuário:</label>
        <input
          value={username}
          onChange={(e) => setUsername(e.target.value)} // Atualiza o estado ao digitar
          required
        />

        {/* Campo de e-mail */}
        <label>E-mail:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)} // Atualiza o estado ao digitar
          required
        />

        {/* Campo de senha */}
        <label>Senha:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)} // Atualiza o estado ao digitar
          required
        />

        {/* Botão de envio */}
        <button type="submit" disabled={loading}>
          {/* Muda o texto do botão se estiver carregando */}
          {loading ? "Cadastrando..." : "Cadastrar"}
        </button>
      </form>
    </Modal>
  );
}
