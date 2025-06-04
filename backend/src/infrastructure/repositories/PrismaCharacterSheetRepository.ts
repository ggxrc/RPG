// src/infrastructure/repositories/PrismaCharacterSheetRepository.ts

import { ICharacterSheetRepository } from "../../domain/repositories/ICharacterSheetRepository";
import { CharacterSheet } from "../../domain/entities/CharacterSheet";
import { prisma } from "../database/prismaClient";

export class PrismaCharacterSheetRepository
  implements ICharacterSheetRepository
{
  async create(
    data: Omit<CharacterSheet, "id" | "createdAt" | "updatedAt">
  ): Promise<CharacterSheet> {
    const sheet = await prisma.characterSheet.create({
      data: {
        userId: data.userId,
        characterName: data.characterName,
        className: data.className,
        race: data.race,
        characterImageUrl: data.characterImageUrl,
        strength: data.strength,
        dexterity: data.dexterity,
        constitution: data.constitution,
        intelligence: data.intelligence,
        wisdom: data.wisdom,
        charisma: data.charisma,
      },
    });
    return {
      id: sheet.id,
      userId: sheet.userId,
      characterName: sheet.characterName,
      className: sheet.className,
      race: sheet.race,
      characterImageUrl: sheet.characterImageUrl ?? undefined,
      strength: sheet.strength,
      dexterity: sheet.dexterity,
      constitution: sheet.constitution,
      intelligence: sheet.intelligence,
      wisdom: sheet.wisdom,
      charisma: sheet.charisma,
      createdAt: sheet.createdAt,
      updatedAt: sheet.updatedAt,
    };
  }

  async findById(id: string): Promise<CharacterSheet | null> {
    const sheet = await prisma.characterSheet.findUnique({ where: { id } });
    if (!sheet) return null;
    return {
      id: sheet.id,
      userId: sheet.userId,
      characterName: sheet.characterName,
      className: sheet.className,
      race: sheet.race,
      characterImageUrl: sheet.characterImageUrl ?? undefined,
      strength: sheet.strength,
      dexterity: sheet.dexterity,
      constitution: sheet.constitution,
      intelligence: sheet.intelligence,
      wisdom: sheet.wisdom,
      charisma: sheet.charisma,
      createdAt: sheet.createdAt,
      updatedAt: sheet.updatedAt,
    };
  }

  async findAllByUserId(userId: string): Promise<CharacterSheet[]> {
    const sheets = await prisma.characterSheet.findMany({ where: { userId } });
    return sheets.map((sheet) => ({
      id: sheet.id,
      userId: sheet.userId,
      characterName: sheet.characterName,
      className: sheet.className,
      race: sheet.race,
      characterImageUrl: sheet.characterImageUrl ?? undefined,
      strength: sheet.strength,
      dexterity: sheet.dexterity,
      constitution: sheet.constitution,
      intelligence: sheet.intelligence,
      wisdom: sheet.wisdom,
      charisma: sheet.charisma,
      createdAt: sheet.createdAt,
      updatedAt: sheet.updatedAt,
    }));
  }

  async update(
    id: string,
    data: Partial<
      Omit<CharacterSheet, "id" | "userId" | "createdAt" | "updatedAt">
    >
  ): Promise<CharacterSheet> {
    const sheet = await prisma.characterSheet.update({
      where: { id },
      data: {
        characterName: data.characterName,
        className: data.className,
        race: data.race,
        characterImageUrl: data.characterImageUrl,
        strength: data.strength,
        dexterity: data.dexterity,
        constitution: data.constitution,
        intelligence: data.intelligence,
        wisdom: data.wisdom,
        charisma: data.charisma,
      },
    });
    return {
      id: sheet.id,
      userId: sheet.userId,
      characterName: sheet.characterName,
      className: sheet.className,
      race: sheet.race,
      characterImageUrl: sheet.characterImageUrl ?? undefined,
      strength: sheet.strength,
      dexterity: sheet.dexterity,
      constitution: sheet.constitution,
      intelligence: sheet.intelligence,
      wisdom: sheet.wisdom,
      charisma: sheet.charisma,
      createdAt: sheet.createdAt,
      updatedAt: sheet.updatedAt,
    };
  }

  async delete(id: string): Promise<void> {
    await prisma.characterSheet.delete({ where: { id } });
  }
}
