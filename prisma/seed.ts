import prisma from "@/config/prisma";

async function main() {
  const modules = [
    {
      title: "Introduction to Programming",
      faculty: "FTEIC",
      major: "Sistem Informasi",
      course: "Pemrograman Dasar",
      description: "Learn the basics of programming with this introductory module.",
      fileUrl: "https://www.google.com",
      upVote: 10,
      downVote: 2,
    },
    {
      title: "Web Development Fundamentals",
      faculty: "FTEIC",
      major: "Sistem Informasi",
      course: "Pemrograman Web",
      description: "Explore the core concepts of web development, including HTML, CSS, and JavaScript.",
      fileUrl: "https://www.google.com",
      upVote: 15,
      downVote: 1,
    },
    {
      title: "Data Structures and Algorithms",
      faculty: "FTEIC",
      major: "Sistem Informasi",
      course: "Algoritma dan Struktur Data",
      description: "Dive deep into essential data structures and algorithms used in computer science.",
      fileUrl: "https://www.google.com",
      upVote: 20,
      downVote: 3,
    },
    {
      title: "Machine Learning Basics",
      faculty: "FTEIC",
      major: "Sistem Informasi",
      course: "Analitika Data dan Diagnostik",
      description: "Get started with machine learning concepts and techniques.",
      fileUrl: "https://www.google.com",
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
