import { MockUserRepository } from "../repositories/MockUserRepository";
import { MockCharacterSheetRepository } from "../repositories/MockCharacterSheetRepository";

// Create singleton instances of repositories to share data across requests
export const userRepository = new MockUserRepository();
export const characterSheetRepository = new MockCharacterSheetRepository();
