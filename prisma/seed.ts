import prisma from "@/config/prisma";

async function main() {
  const modules = [
    {
      title: "Introduction to Programming",
      description: "Learn the basics of programming with this introductory module.",
      upVote: 10,
      downVote: 2,
    },
    {
      title: "Web Development Fundamentals",
      description: "Explore the core concepts of web development, including HTML, CSS, and JavaScript.",
      upVote: 15,
      downVote: 1,
    },
    {
      title: "Data Structures and Algorithms",
      description: "Dive deep into essential data structures and algorithms used in computer science.",
      upVote: 20,
      downVote: 3,
    },
    {
      title: "Machine Learning Basics",
      description: "Get started with machine learning concepts and techniques.",
      upVote: 18,
      downVote: 2,
    },
  ];

  const lecturers = [
    {
      name: "Dr. Andi Santoso",
      faculty: "Fakultas Teknologi Informasi",
      department: "Departemen Sistem Informasi",
      upVote: 10,
      downVote: 2,
    },
    {
      name: "Prof. Budi Susanto",
      faculty: "Fakultas Teknik",
      department: "Departemen Teknik Komputer",
      upVote: 20,
      downVote: 1,
    },
    {
      name: "Dr. Clara Rachmawati",
      faculty: "Fakultas Ilmu Komputer",
      department: "Departemen Rekayasa Perangkat Lunak",
      upVote: 15,
      downVote: 0,
    },
  ];

  for (const module of modules) {
    await prisma.modules.create({
      data: module,
    });
  }

  for (const lecturer of lecturers) {
    await prisma.lecturers.create({
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
