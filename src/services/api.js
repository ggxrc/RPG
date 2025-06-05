import axios from "axios";

// Certifique-se de que 'axios' está instalado no package.json do seu FRONTEND
// Se não estiver: na pasta raiz Rpg/, rode: npm install axios

const apiClient = axios.create({
  // A URL base da sua API backend.
  baseURL: "http://localhost:5000/api", // Ajustado para porta 5000 conforme backend
  headers: {
    "Content-Type": "application/json",
  },
});

// Adicionando o interceptor para incluir o token JWT em cada requisição
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor para tratar respostas e erros globalmente
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    // Erros de autenticação (401) podem ser tratados aqui
    if (error.response && error.response.status === 401) {
      // Redirecionar para login ou limpar localStorage se token estiver expirado
      console.warn("Erro de autenticação:", error.response.data);
    }
    return Promise.reject(error);
  }
);

export default apiClient;
