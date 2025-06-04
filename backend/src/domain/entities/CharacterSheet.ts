export interface CharacterSheet {
  id: string;
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
  createdAt: Date;
  updatedAt: Date;
}
