import { User } from "../entities/User";

export interface IUserRepository {
  create(data: Omit<User, "id" | "createdAt" | "updatedAt">): Promise<User>;
  findByEmail(email: string): Promise<User | null>;
  findByUsername(username: string): Promise<User | null>;
  findById(id: string): Promise<User | null>;
}
