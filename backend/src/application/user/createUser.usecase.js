// Rpg/backend/src/application/user/createUser.usecase.js
import { UserRepositoryPrisma } from "../../infrastructure/persistence/userRepository.prisma.js";
import bcrypt from "bcryptjs";

const userRepository = new UserRepositoryPrisma(); // Idealmente, isso seria injetado

export class CreateUserUseCase {
  async execute({ username, email, password }) {
    // Recebe a senha pura
    if (!username || !email || !password) {
      throw new Error("Nome de usuário, email e senha são obrigatórios.");
    }

    const existingUserByEmail = await userRepository.findByEmail(email);
    if (existingUserByEmail) {
      throw new Error("Este email já está cadastrado.");
    }

    const existingUserByUsername = await userRepository.findByUsername(
      username
    ); // Você precisará adicionar findByUsername ao repositório
    if (existingUserByUsername) {
      throw new Error("Este nome de usuário já está em uso.");
    }

    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    return userRepository.create({ username, email, passwordHash });
  }
}
