import { CharacterSheet } from "../entities/CharacterSheet";

export interface ICharacterSheetRepository {
  create(
    data: Omit<CharacterSheet, "id" | "createdAt" | "updatedAt">
  ): Promise<CharacterSheet>;
  findById(id: string): Promise<CharacterSheet | null>;
  findAllByUserId(userId: string): Promise<CharacterSheet[]>;
  update(
    id: string,
    data: Partial<
      Omit<CharacterSheet, "id" | "userId" | "createdAt" | "updatedAt">
    >
  ): Promise<CharacterSheet>;
  delete(id: string): Promise<void>;
}
