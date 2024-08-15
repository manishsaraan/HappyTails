import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const pets = [
  {
    name: "Benjamin",
    ownerName: "John Doe",
    ownerEmail: "john.doe@example.com",
    ownerPhone: "123-456-7890",
    imageUrl: "/images/placeholder.png",
    age: 2,
    notes:
      "Doesn't like to be touched on the belly. Plays well with other dogs.",
  },
  {
    name: "Richard",
    ownerName: "Josephine Dane",
    ownerEmail: "josephine.dane@example.com",
    ownerPhone: "098-765-4321",
    imageUrl: "/images/placeholder.png",
    age: 5,
    notes: "Needs medication twice a day.",
  },
  {
    name: "Anna",
    ownerName: "Frank Doe",
    ownerEmail: "frank.doe@example.com",
    ownerPhone: "456-789-0123",
    imageUrl: "/images/placeholder.png",
    age: 4,
    notes: "Allergic to chicken.",
  },
];

async function main() {
  console.log(`Start seeding ...`);

  for (const pet of pets) {
    const result = await prisma.pet.create({
      data: {
        ...pet,
        user: {
          connect: { id: "1" }, // Assuming user with id 1 exists
        },
      },
    });
    console.log(`Created pet with id: ${result.id}`);
  }

  console.log(`Seeding finished.`);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
