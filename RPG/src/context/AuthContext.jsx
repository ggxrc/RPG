// src/context/AuthContext.jsx
import React, { createContext, useState, useEffect } from "react";

// Criamos um contexto chamado AuthContext, que será usado para compartilhar
// os dados de autenticação entre os componentes do aplicativo.
export const AuthContext = createContext();

// Este componente é um "provider" que envolve o aplicativo e fornece os dados do contexto
export function AuthProvider({ children }) {
  // user: guarda as informações do usuário logado
  // loading: usado para mostrar carregamento durante login/cadastro
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  // useEffect é executado uma vez quando o componente carrega
  // Aqui, ele verifica se já existe um usuário salvo no localStorage
  useEffect(() => {
    const token = localStorage.getItem("token"); // busca o token salvo
    const storedUser = localStorage.getItem("user"); // busca o usuário salvo
    if (token && storedUser) {
      // Se existir token e usuário, define o usuário no estado
      setUser(JSON.parse(storedUser)); // transforma a string em objeto novamente
    }
  }, []);

  // Função para registrar um novo usuário (simulada por enquanto)
  const register = async ({ username, email, password }) => {
    try {
      setLoading(true); // ativa o carregamento

      // Aqui estamos simulando um registro (sem servidor)
      const fakeUser = { username, email }; // cria um objeto com os dados do usuário
      localStorage.setItem("token", "fake-token"); // salva um token fictício
      localStorage.setItem("user", JSON.stringify(fakeUser)); // salva o usuário como string
      setUser(fakeUser); // define o usuário no estado
    } catch (err) {
      // Se der erro, mostra no console
      console.error("Erro no cadastro:", err.message);
      throw err;
    } finally {
      setLoading(false); // desativa o carregamento
    }
  };

  // Função para fazer login do usuário (também simulada)
  const login = async ({ email, password }) => {
    try {
      setLoading(true); // ativa o carregamento

      // Aqui estamos simulando um login
      const fakeUser = { username: "UsuárioTeste", email }; // define um usuário fictício
      localStorage.setItem("token", "fake-token"); // salva token no navegador
      localStorage.setItem("user", JSON.stringify(fakeUser)); // salva usuário
      setUser(fakeUser); // atualiza o estado com o usuário logado
    } catch (err) {
      console.error("Erro no login:", err.message);
      throw err;
    } finally {
      setLoading(false); // desativa o carregamento
    }
  };

  // Função para sair (logout)
  const logout = () => {
    localStorage.removeItem("token"); // remove token do navegador
    localStorage.removeItem("user"); // remove usuário salvo
    setUser(null); // limpa o estado
  };

  // Retornamos o contexto com as informações e funções disponíveis
  return (
    <AuthContext.Provider value={{ user, loading, register, login, logout }}>
      {children} {/* Renderiza todos os componentes filhos do app */}
    </AuthContext.Provider>
  );
}
