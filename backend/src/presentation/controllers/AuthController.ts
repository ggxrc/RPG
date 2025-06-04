// src/presentation/controllers/AuthController.ts

import { Request, Response } from "express";
import { PrismaUserRepository } from "../../infrastructure/repositories/PrismaUserRepository";
import { RegisterUserUseCase } from "../../application/use-cases/RegisterUserUseCase";
import { LoginUserUseCase } from "../../application/use-cases/LoginUserUseCase";
import { AppError } from "../../application/errors/AppError";

export class AuthController {
  static async register(req: Request, res: Response) {
    try {
      const { username, email, password } = req.body;
      const userRepo = new PrismaUserRepository();
      const registerUseCase = new RegisterUserUseCase(userRepo);

      const result = await registerUseCase.execute({
        username,
        email,
        password,
      });
      return res.status(201).json(result);
    } catch (err) {
      if (err instanceof AppError) {
        return res.status(err.statusCode).json({ message: err.message });
      }
      console.error(err);
      return res.status(500).json({ message: "Erro interno no registro" });
    }
  }

  static async login(req: Request, res: Response) {
    try {
      const { emailOrUsername, password } = req.body;
      const userRepo = new PrismaUserRepository();
      const loginUseCase = new LoginUserUseCase(userRepo);

      const result = await loginUseCase.execute({ emailOrUsername, password });
      return res.json(result); // { token, user }
    } catch (err) {
      if (err instanceof AppError) {
        return res.status(err.statusCode).json({ message: err.message });
      }
      console.error(err);
      return res.status(500).json({ message: "Erro interno no login" });
    }
  }
}
