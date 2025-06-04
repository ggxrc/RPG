// src/application/use-cases/CreateCharacterSheetUseCase.ts

import { ICharacterSheetRepository } from "../../domain/repositories/ICharacterSheetRepository";
import { CreateCharacterSheetDTO } from "../dtos/CreateCharacterSheetDTO";
import { AppError } from "../errors/AppError";
import { ValidateAttributesSum } from "../../shared/utils/ValidateAttributesSum";

export class CreateCharacterSheetUseCase {
  constructor(private sheetRepository: ICharacterSheetRepository) {}

  async execute(data: CreateCharacterSheetDTO) {
    const {
      userId,
      characterName,
      className,
      race,
      characterImageUrl,
      strength,
      dexterity,
      constitution,
      intelligence,
      wisdom,
      charisma,
    } = data;

    // 1) Validar soma de atributos = 30
    const total =
      strength + dexterity + constitution + intelligence + wisdom + charisma;
    if (!ValidateAttributesSum.isValid(total)) {
      throw new AppError("A soma dos atributos deve ser igual a 30", 400);
    }

    // 2) Criar ficha no repositório
    const sheet = await this.sheetRepository.create({
      userId,
      characterName,
      className,
      race,
      characterImageUrl,
      strength,
      dexterity,
      constitution,
      intelligence,
      wisdom,
      charisma,
    });

    return sheet;
  }
}
