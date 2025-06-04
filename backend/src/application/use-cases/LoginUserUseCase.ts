import { IUserRepository } from "../../domain/repositories/IUserRepository";
import { LoginUserDTO } from "../dtos/LoginUserDTO";
import { AppError } from "../errors/AppError";
import { PasswordHasher } from "../../shared/utils/PasswordHasher";
import { JwtProvider } from "../../shared/utils/JwtProvider";

export class LoginUserUseCase {
  constructor(private userRepository: IUserRepository) {}

  async execute(data: LoginUserDTO) {
    const { emailOrUsername, password } = data;

    // 1) Buscar usuário por email ou username
    let user = await this.userRepository.findByEmail(emailOrUsername);
    if (!user) {
      user = await this.userRepository.findByUsername(emailOrUsername);
    }
    if (!user) {
      throw new AppError("Credenciais inválidas", 401);
    }

    // 2) Verificar senha
    const passwordMatches = await PasswordHasher.compare(
      password,
      user.passwordHash
    );
    if (!passwordMatches) {
      throw new AppError("Credenciais inválidas", 401);
    }

    // 3) Gerar token JWT
    const token = JwtProvider.sign({ userId: user.id });

    return {
      token,
      user: { id: user.id, username: user.username, email: user.email },
    };
  }
}
