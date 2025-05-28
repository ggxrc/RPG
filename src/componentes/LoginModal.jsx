// src/componentes/LoginModal.jsx

// Importa hooks do React e o contexto de autenticação
import React, { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext"; // Importa o contexto
import { Modal } from "./Modal"; // Importa o componente Modal já criado

// Componente que exibe um modal de login
export function LoginModal({ isOpen, onClose }) {
  // Pegamos a função de login e o loading (estado de carregamento) do contexto
  const { login, loading } = useContext(AuthContext);

  // Estados locais para armazenar o email e a senha digitados pelo usuário
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Função que lida com o envio do formulário
  const handleSubmit = async (e) => {
    e.preventDefault(); // Evita o recarregamento da página ao enviar o form

    try {
      // Tenta fazer login com os dados informados
      await login({ email, password });
      // Se o login for bem-sucedido, fecha o modal
      onClose();
    } catch (error) {
      // Se der erro, mostra no console e alerta o usuário
      console.error("Erro no login:", error);
      alert("E-mail ou senha inválidos. Tente novamente.");
    }
  };

  return (
    // Usa o componente Modal para renderizar a interface de login
    <Modal isOpen={isOpen} onClose={onClose}>
      <h2>Entrar</h2>

      {/* Formulário de login */}
      <form onSubmit={handleSubmit}>
        {/* Campo de e-mail */}
        <label>E-mail:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)} // Atualiza o estado conforme digita
          required // Campo obrigatório
        />

        {/* Campo de senha */}
        <label>Senha:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)} // Atualiza a senha
          required
        />

        {/* Botão de envio */}
        <button type="submit" disabled={loading}>
          {/* Texto muda dependendo do estado de carregamento */}
          {loading ? "Entrando..." : "Entrar"}
        </button>
      </form>
    </Modal>
  );
}
