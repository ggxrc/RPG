import "dotenv/config";
import express, {
  Request,
  Response,
  NextFunction,
  ErrorRequestHandler,
} from "express";
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

// Handler de erros (note que não usamos 'return' aqui, apenas chamamos res.status... )
const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  if (err instanceof AppError) {
    res.status(err.statusCode).json({ message: err.message });
  } else {
    console.error(err);
    res.status(500).json({ message: "Erro interno do servidor" });
  }
};

app.use(errorHandler);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando na porta ${PORT}`);
});
