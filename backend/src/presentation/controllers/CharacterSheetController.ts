import { Request, Response, NextFunction } from "express";
import { PrismaCharacterSheetRepository } from "../../infrastructure/repositories/PrismaCharacterSheetRepository";
import { CreateCharacterSheetUseCase } from "../../application/use-cases/CreateCharacterSheetUseCase";
import { AppError } from "../../application/errors/AppError";

export class CharacterSheetController {
  public static async create(req: Request, res: Response) {
    try {
      // req.user.id foi preenchido pelo middleware ensureAuthenticated
      const userId = req.user.id;
      const {
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
      } = req.body;

      const sheetRepo = new PrismaCharacterSheetRepository();
      const createUseCase = new CreateCharacterSheetUseCase(sheetRepo);

      const sheet = await createUseCase.execute({
        userId,
        characterName,
        className,
        race,
        characterImageUrl,
        strength: Number(strength),
        dexterity: Number(dexterity),
        constitution: Number(constitution),
        intelligence: Number(intelligence),
        wisdom: Number(wisdom),
        charisma: Number(charisma),
      });

      return res.status(201).json(sheet);
    } catch (err) {
      if (err instanceof AppError) {
        return res.status(err.statusCode).json({ message: err.message });
      }
      console.error(err);
      return res.status(500).json({ message: "Erro interno" });
    }
  }

  public static async listByUser(req: Request, res: Response) {
    try {
      const userId = req.user.id;
      const sheetRepo = new PrismaCharacterSheetRepository();
      const sheets = await sheetRepo.findAllByUserId(userId);
      return res.json(sheets);
    } catch (err) {
      console.error(err);
      return res.status(500).json({ message: "Erro interno" });
    }
  }

  // Você poderá adicionar outros métodos: getOne, update, delete etc.
}
