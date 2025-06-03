// Rpg/backend/src/server.js
import express from "express";
import dotenv from "dotenv";
import path from "path";
import { PrismaClient } from "@prisma/client";
import cors from "cors";
import {
  registerUserController /*, loginUserController */,
} from "./infrastructure/web/userController.js"; // Ajuste o caminho

// Carregar variáveis de ambiente do .env na pasta 'backend'
// process.cwd() quando você roda 'node src/server.js' a partir da pasta 'backend'
// será 'Rpg/backend/'.
dotenv.config({ path: path.resolve(process.cwd(), ".env") });

const prisma = new PrismaClient();
const app = express();

// A PORTA DEVE SER 5000 para corresponder ao seu Rpg/src/services/api.js
const PORT = process.env.PORT || 5000;

app.use(express.json()); // Middleware para habilitar o parsing de JSON no corpo das requisições

// Rota de Teste de Saúde da API
app.get("/api/health", (req, res) => {
  res.json({ status: "Backend operacional e rodando na porta " + PORT });
});

// Endpoint para CRIAR uma nova ficha (Character)
app.post("/api/characters", async (req, res) => {
  try {
    const {
      name,
      race,
      className,
      attributes,
      imageUrl,
      userId /*, health, shield*/,
    } = req.body;

    // Validação básica (você vai querer algo mais robusto aqui - ex: Zod ou Joi)
    if (!name || !race || !className || !attributes) {
      return res.status(400).json({
        message: "Campos obrigatórios faltando: nome, raça, classe, atributos.",
      });
    }

    const characterData = {
      name,
      race,
      className,
      attributes, // Deve ser um objeto JSON
      imageUrl,
      // health: parseInt(health) || 0, // Se for usar, garanta que venha como número
      // shield: parseInt(shield) || 0,  // Se for usar
    };

    if (userId) {
      // Tenta conectar ao usuário se userId for fornecido.
      // Garanta que o userId é um ObjectId válido do MongoDB se a relação estiver configurada assim.
      try {
        // Verifica se o usuário realmente existe antes de tentar conectar
        const userExists = await prisma.user.findUnique({
          where: { id: userId },
        });
        if (!userExists) {
          console.warn(
            `Tentativa de criar ficha para usuário inexistente: ${userId}. Salvando ficha sem usuário associado ou retornando erro.`
          );
          // Opção 1: Salvar sem usuário (se userId for opcional no schema Character)
          // Se você escolher essa, remova a linha abaixo de 'characterData.user ='
          // Opção 2: Retornar um erro
          return res.status(400).json({
            message: `Usuário com ID ${userId} não encontrado. Não é possível criar a ficha.`,
          });
        }
        characterData.user = { connect: { id: userId } };
      } catch (userError) {
        // Este catch pode pegar outros erros relacionados à busca do usuário
        console.error(`Erro ao verificar usuário ${userId}:`, userError);
        return res
          .status(500)
          .json({ message: "Erro ao verificar dados do usuário." });
      }
    }

    const newCharacter = await prisma.character.create({
      data: characterData,
    });
    res.status(201).json(newCharacter);
  } catch (error) {
    console.error("Erro ao criar personagem:", error);
    // Verifica se é um erro conhecido do Prisma (ex: constraint violation)
    if (error.code && error.meta) {
      // Erros do Prisma geralmente têm 'code' e 'meta'
      return res.status(400).json({
        message: "Erro de validação do Prisma ao criar personagem.",
        details: error.meta,
      });
    }
    // Erro genérico do servidor
    res
      .status(500)
      .json({ message: "Erro interno do servidor ao criar personagem." });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor backend rodando em http://localhost:${PORT}`);
});
