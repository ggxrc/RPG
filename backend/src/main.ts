// src/main.ts

import "dotenv/config"; // carrega variáveis de ambiente
import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import { authRouter } from "./presentation/routes/auth.routes";
import { characterRouter } from "./presentation/routes/character.routes";
import { AppError } from "./application/errors/AppError";

const app = express();

// Middlewares globais
app.use(cors());
app.use(express.json());

// Rotas
app.use("/api/auth", authRouter);
app.use("/api/characters", characterRouter);

// Middleware de tratamento de erros (final)
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({ message: err.message });
  }
  console.error(err);
  return res.status(500).json({ message: "Erro interno do servidor" });
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando na porta ${PORT}`);
});
