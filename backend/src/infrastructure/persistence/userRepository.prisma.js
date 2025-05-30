// Rpg/backend/src/infrastructure/persistence/userRepository.prisma.js
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export class UserRepositoryPrisma {
  async findByEmail(email) {
    return prisma.user.findUnique({ where: { email } });
  }

  async findByUsername(username) {
    // NOVO MÉTODO
    return prisma.user.findUnique({ where: { username } });
  }

  async findById(id) {
    // Adicione se não tiver
    return prisma.user.findUnique({ where: { id } });
  }

  async create(userData) {
    return prisma.user.create({ data: userData });
  }
}
