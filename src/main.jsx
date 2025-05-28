// Importa a biblioteca principal do React
import React from "react";
// Importa o ReactDOM para renderizar o app na página HTML
import ReactDOM from "react-dom/client";
// Importa o componente de roteamento do React Router
import { BrowserRouter } from "react-router-dom";
// Importa o componente principal da aplicação
import App from "./App";
// Importa o CSS global do projeto
import "./styles.css";
// Importa o provider de autenticação que fornece contexto global de usuário
import { AuthProvider } from "./context/AuthContext";
// Renderiza a aplicação React dentro da div com id="root" no index.html
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    {/* AuthProvider fornece o contexto de autenticação a toda a aplicação */}
    <AuthProvider>
      {/* BrowserRouter permite o uso de rotas no App */}
      <BrowserRouter>
        {/* App é o componente principal da aplicação */}
        <App />
      </BrowserRouter>
    </AuthProvider>
  </React.StrictMode>
);
