// testDb.js
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  console.log("Tentando criar um usuário...");
  try {
    const newUser = await prisma.user.create({
      data: {
        username: "testuser",
        email: "test@example.com",
        passwordHash: "somehash", // Em um app real, isso seria um hash seguro
      },
    });
    console.log("Usuário criado:", newUser);

    // Você também pode tentar criar um personagem, se quiser
    // const newCharacter = await prisma.character.create({
    //   data: {
    //     name: 'Gandalf',
    //     race: 'Maia',
    //     className: 'Wizard',
    //     attributes: { strength: 10, dexterity: 10, constitution: 10, intelligence: 18, wisdom: 18, charisma: 15 },
    //     health: 100,
    //     shield: 50,
    //     // Se quiser associar ao usuário criado acima:
    //     // userId: newUser.id
    //   }
    // });
    // console.log('Personagem criado:', newCharacter);
  } catch (e) {
    console.error("Erro ao criar:", e);
  } finally {
    await prisma.$disconnect();
  }
}

main();
