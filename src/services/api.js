import axios from "axios";

// Certifique-se de que 'axios' está instalado no package.json do seu FRONTEND
// Se não estiver: na pasta raiz Rpg/, rode: npm install axios

const apiClient = axios.create({
  // A URL base da sua API backend.
  // Quando seu backend estiver rodando (provavelmente na porta 3001),
  // todos os endpoints começarão com isso.
  baseURL: "http://localhost:5000/api", // Ajuste a porta se necessário
  headers: {
    "Content-Type": "application/json",
  },
});

/*
  Quando você implementar a autenticação OAuth e tiver tokens JWT:
  Você adicionará um interceptor aqui para incluir o token em cada requisição.

  apiClient.interceptors.request.use(config => {
    const token = localStorage.getItem('seu_jwt_token'); // Ou de onde você obtiver o token
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  }, error => {
    return Promise.reject(error);
  });
*/

export default apiClient;
