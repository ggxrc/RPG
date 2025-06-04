export interface CreateCharacterSheetDTO {
  userId: string;
  characterName: string;
  className: string;
  race: string;
  characterImageUrl?: string;
  strength: number;
  dexterity: number;
  constitution: number;
  intelligence: number;
  wisdom: number;
  charisma: number;
}
