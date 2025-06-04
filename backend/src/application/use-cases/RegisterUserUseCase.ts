import { IUserRepository } from "../../domain/repositories/IUserRepository";
import { CreateUserDTO } from "../dtos/CreateUserDTO";
import { AppError } from "../errors/AppError";
import { PasswordHasher } from "../../shared/utils/PasswordHasher";

export class RegisterUserUseCase {
  constructor(private userRepository: IUserRepository) {}

  async execute(data: CreateUserDTO) {
    const { username, email, password } = data;

    // 1) Verificar se email ou username já existem
    const existingByEmail = await this.userRepository.findByEmail(email);
    if (existingByEmail) {
      throw new AppError("Email já cadastrado", 409);
    }

    const existingByUsername = await this.userRepository.findByUsername(
      username
    );
    if (existingByUsername) {
      throw new AppError("Username já está em uso", 409);
    }

    // 2) Hashear a senha
    const passwordHash = await PasswordHasher.hash(password);

    // 3) Criar usuário no repositório
    const user = await this.userRepository.create({
      username,
      email,
      passwordHash,
    });

    return {
      id: user.id,
      username: user.username,
      email: user.email,
      createdAt: user.createdAt,
    };
  }
}
