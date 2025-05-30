// Rpg/backend/src/infrastructure/web/userController.js
import { CreateUserUseCase } from "../../application/user/createUser.usecase.js";
// Importe o LoginUserUseCase quando criá-lo

export async function registerUserController(req, res) {
  try {
    const { username, email, password } = req.body;
    const createUser = new CreateUserUseCase();
    const user = await createUser.execute({ username, email, password });
    // Não retorne passwordHash para o cliente
    const { passwordHash, ...userWithoutPassword } = user;
    res.status(201).json(userWithoutPassword);
  } catch (error) {
    res
      .status(400)
      .json({ message: error.message || "Erro ao registrar usuário." });
  }
}

// TODO: Implementar loginUserController
