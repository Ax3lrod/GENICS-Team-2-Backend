import prisma from "@/config/prisma";

async function main() {
  const modules = [
    {
      title: "Introduction to Programming",
      description: "Learn the basics of programming with this introductory module.",
      upvoteCount: 10,
      downvoteCount: 2,
    },
    {
      title: "Web Development Fundamentals",
      description: "Explore the core concepts of web development, including HTML, CSS, and JavaScript.",
      upvoteCount: 15,
      downvoteCount: 1,
    },
    {
      title: "Data Structures and Algorithms",
      description: "Dive deep into essential data structures and algorithms used in computer science.",
      upvoteCount: 20,
      downvoteCount: 3,
    },
    {
      title: "Machine Learning Basics",
      description: "Get started with machine learning concepts and techniques.",
      upvoteCount: 18,
      downvoteCount: 2,
    },
  ];

  const lecturers = [
    {
      name: "Dr. Andi Santoso",
      faculty: "Fakultas Teknologi Informasi",
      department: "Departemen Sistem Informasi",
      upvotes: 10,
      downvotes: 2,
    },
    {
      name: "Prof. Budi Susanto",
      faculty: "Fakultas Teknik",
      department: "Departemen Teknik Komputer",
      upvotes: 20,
      downvotes: 1,
    },
    {
      name: "Dr. Clara Rachmawati",
      faculty: "Fakultas Ilmu Komputer",
      department: "Departemen Rekayasa Perangkat Lunak",
      upvotes: 15,
      downvotes: 0,
    },
  ];

  for (const module of modules) {
    await prisma.module.create({
      data: module,
    });
  }

  for (const lecturer of lecturers) {
    await prisma.lecturer.create({
      data: lecturer,
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
