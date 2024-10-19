import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const modules = [
    {
      title: "Introduction to Programming",
      description: "Learn the basics of programming with this introductory module.",
      upvotes: 10,
      downvotes: 2,
    },
    {
      title: "Web Development Fundamentals",
      description: "Explore the core concepts of web development, including HTML, CSS, and JavaScript.",
      upvotes: 15,
      downvotes: 1,
    },
    {
      title: "Data Structures and Algorithms",
      description: "Dive deep into essential data structures and algorithms used in computer science.",
      upvotes: 20,
      downvotes: 3,
    },
    {
      title: "Machine Learning Basics",
      description: "Get started with machine learning concepts and techniques.",
      upvotes: 18,
      downvotes: 2,
    },
  ];

  for (const module of modules) {
    await prisma.module.create({
      data: module,
    });
  }

  console.log("Seed data inserted successfully.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
