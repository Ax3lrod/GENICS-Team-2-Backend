import prisma from "@/config/prisma";

async function main() {
  const modules = [
    {
      title: "Introduction to Programming",
      faculty: "FTEIC",
      department: "Sistem Informasi",
      course: "Pemrograman Dasar",
      description: "Learn the basics of programming with this introductory module.",
      filePath: "https://www.google.com",
      upVote: 10,
      downVote: 2,
    },
    {
      title: "Web Development Fundamentals",
      faculty: "FTEIC",
      department: "Sistem Informasi",
      course: "Pemrograman Web",
      description: "Explore the core concepts of web development, including HTML, CSS, and JavaScript.",
      filePath: "https://www.google.com",
      upVote: 15,
      downVote: 1,
    },
    {
      title: "Data Structures and Algorithms",
      faculty: "FTEIC",
      department: "Sistem Informasi",
      course: "Algoritma dan Struktur Data",
      description: "Dive deep into essential data structures and algorithms used in computer science.",
      filePath: "https://www.google.com",
      upVote: 20,
      downVote: 3,
    },
    {
      title: "Machine Learning Basics",
      faculty: "FTEIC",
      department: "Sistem Informasi",
      course: "Analitika Data dan Diagnostik",
      description: "Get started with machine learning concepts and techniques.",
      filePath: "https://www.google.com",
      upVote: 18,
      downVote: 2,
    },
  ];

  const lecturers = [
    {
      name: "Dr. Susi Juniastuti, S.T., M.Eng.",
      faculty: "FTEIC",
      department: "Teknik Komputer",
      upVote: 0,
      downVote: 0,
      rating: 0.0,
    },
    {
      name: "Ir. Hany Boedinoegroho, M.T.",
      faculty: "FTEIC",
      department: "Teknik Komputer",
      upVote: 0,
      downVote: 0,
      rating: 0.0,
    },
    {
      name: "Anisah Herdiyanti Prabowo, S.Kom., M.Sc.",
      faculty: "FTEIC",
      department: "Sistem Informasi",
      upVote: 0,
      downVote: 0,
      rating: 0.0,
    },
    {
      name: "Irmasari Hafidz, S.Kom., M.Sc.",
      faculty: "FTEIC",
      department: "Sistem Informasi",
      upVote: 0,
      downVote: 0,
      rating: 0.0,
    },
    {
      name: "Radityo Prasetianto Wibowo, S.Kom, M.Kom.",
      faculty: "FTEIC",
      department: "Sistem Informasi",
      upVote: 0,
      downVote: 0,
      rating: 0.0,
    },
    {
      name: "Renny Pradina Kusumawardani, S.T., M.T.",
      faculty: "FTEIC",
      department: "Sistem Informasi",
      upVote: 0,
      downVote: 0,
      rating: 0.0,
    },
    {
      name: "Raras Tyasnurita, S.Kom., M.BA",
      faculty: "FTEIC",
      department: "Sistem Informasi",
      upVote: 0,
      downVote: 0,
      rating: 0.0,
    },
    {
      name: "Sri Rahayu, S.T., M.Kom.",
      faculty: "FTEIC",
      department: "Teknik Elektro",
      upVote: 0,
      downVote: 0,
      rating: 0.0,
    },
    {
      name: "Dr. Devy Kuswidiastuti, S.T., M.Sc.",
      faculty: "FTEIC",
      department: "Teknik Elektro",
      upVote: 0,
      downVote: 0,
      rating: 0.0,
    },
    {
      name: "Kelly Rossa Sungkono, S.Kom., M.Kom.",
      faculty: "FTEIC",
      department: "Teknik Informatika",
      upVote: 0,
      downVote: 0,
      rating: 0.0,
    },
    {
      name: "Christyowidiasmoro, ST., MT.",
      faculty: "FTEIC",
      department: "Teknik Komputer",
      upVote: 0,
      downVote: 0,
      rating: 0.0,
    },
    {
      name: "Ridho Rahman Hariadi, S.Kom, M.Sc.",
      faculty: "FTEIC",
      department: "Teknologi Informasi",
      upVote: 0,
      downVote: 0,
      rating: 0.0,
    },
    {
      name: "Hatma Suryotrisongko, S.Kom., M.Eng., Ph.D.",
      faculty: "FTEIC",
      department: "Teknologi Informasi",
      upVote: 0,
      downVote: 0,
      rating: 0.0,
    },
    {
      name: "Mohamad Abdul Hady, S.T., M.T.",
      faculty: "FTEIC",
      department: "Teknik Elektro",
      upVote: 0,
      downVote: 0,
      rating: 0.0,
    },
    {
      name: "Ika Nurkasanah, S.Kom., M.Sc.",
      faculty: "FTEIC",
      department: "Sistem Informasi",
      upVote: 0,
      downVote: 0,
      rating: 0.0,
    },
    {
      name: "Eko Agus Suprayitno, S.Si., M.T.",
      faculty: "FTEIC",
      department: "Teknik Biomedik",
      upVote: 0,
      downVote: 0,
      rating: 0.0,
    },
    {
      name: "Siska Arifiani, S.Kom., M.Kom.",
      faculty: "FTEIC",
      department: "Teknik Informatika",
      upVote: 0,
      downVote: 0,
      rating: 0.0,
    },
    {
      name: "Dion Hayu Fandiantoro, S.T., M.Eng.",
      faculty: "FTEIC",
      department: "Teknik Komputer",
      upVote: 0,
      downVote: 0,
      rating: 0.0,
    },
    {
      name: "Annisaa Sri Indrawanti, S.Kom., M.Kom.",
      faculty: "FTEIC",
      department: "Teknologi Informasi",
      upVote: 0,
      downVote: 0,
      rating: 0.0,
    },
    {
      name: "Bekti Cahyo Hidayanto, S.Si., M.Kom.",
      faculty: "FTEIC",
      department: "Sistem Informasi",
      upVote: 0,
      downVote: 0,
      rating: 0.0,
    },
    {
      name: "Muhammad Hilman Fatoni, S.T., M.T.",
      faculty: "FTEIC",
      department: "Teknik Biomedik",
      upVote: 0,
      downVote: 0,
      rating: 0.0,
    },
    {
      name: "Atar Fuady Babgei, S.T., M.Sc.",
      faculty: "FTEIC",
      department: "Teknik Komputer",
      upVote: 0,
      downVote: 0,
      rating: 0.0,
    },
    {
      name: "Norma Hermawan, S.T., M.T., Ph.D.",
      faculty: "FTEIC",
      department: "Teknik Biomedik",
      upVote: 0,
      downVote: 0,
      rating: 0.0,
    },
    {
      name: "Muhammad Yazid, B.Eng., M.Eng.",
      faculty: "FTEIC",
      department: "Teknik Biomedik",
      upVote: 0,
      downVote: 0,
      rating: 0.0,
    },
    {
      name: "Nada Fitrieyatul Hikmah, S.T., M.T.",
      faculty: "FTEIC",
      department: "Teknik Biomedik",
      upVote: 0,
      downVote: 0,
      rating: 0.0,
    },
    {
      name: "Dr.techn. Prasetiyono Hari Mukti, S.T., M.T.",
      faculty: "FTEIC",
      department: "Teknik Elektro",
      upVote: 0,
      downVote: 0,
      rating: 0.0,
    },
    {
      name: "Dr. Suwito, S.T., M.T.",
      faculty: "FTEIC",
      department: "Teknik Elektro",
      upVote: 0,
      downVote: 0,
      rating: 0.0,
    },
    {
      name: "Abdul Munif, S.Kom., M.Sc.Eng.",
      faculty: "FTEIC",
      department: "Teknik Informatika",
      upVote: 0,
      downVote: 0,
      rating: 0.0,
    },
    {
      name: "Ratih Nur Esti Anggraini, S.Kom., M.Sc., Ph.D.",
      faculty: "FTEIC",
      department: "Teknik Informatika",
      upVote: 0,
      downVote: 0,
      rating: 0.0,
    },
    {
      name: "Nurlita Gamayanti, S.T., M.T.",
      faculty: "FTEIC",
      department: "Teknik Elektro",
      upVote: 0,
      downVote: 0,
      rating: 0.0,
    },
    {
      name: "Andre Parvian Aristio, S.Kom., M.Sc.",
      faculty: "FTEIC",
      department: "Sistem Informasi",
      upVote: 0,
      downVote: 0,
      rating: 0.0,
    },
    {
      name: "Amalia Utamima, S.Kom., M.BA., Ph.D.",
      faculty: "FTEIC",
      department: "Sistem Informasi",
      upVote: 0,
      downVote: 0,
      rating: 0.0,
    },
    {
      name: "Nisfu Asrul Sani, S.Kom., M.Sc.",
      faculty: "FTEIC",
      department: "Sistem Informasi",
      upVote: 0,
      downVote: 0,
      rating: 0.0,
    },
    {
      name: "Dr. Wahyu Suadi, S.Kom., M.Kom.",
      faculty: "FTEIC",
      department: "Teknik Informatika",
      upVote: 0,
      downVote: 0,
      rating: 0.0,
    },
    {
      name: "Rizky Januar Akbar, S.Kom., M.Eng.",
      faculty: "FTEIC",
      department: "Teknik Informatika",
      upVote: 0,
      downVote: 0,
      rating: 0.0,
    },
    {
      name: "Baskoro Adi Pratomo, S.Kom., M.Kom., Ph.D.",
      faculty: "FTEIC",
      department: "Teknik Informatika",
      upVote: 0,
      downVote: 0,
      rating: 0.0,
    },
    {
      name: "Reny Nadlifatin, S.Kom., M.B.A., Ph.D.",
      faculty: "FTEIC",
      department: "Sistem Informasi",
      upVote: 0,
      downVote: 0,
      rating: 0.0,
    },
    {
      name: "Retno Aulia Vinarti, S.Kom., M.Kom., Ph.D.",
      faculty: "FTEIC",
      department: "Sistem Informasi",
      upVote: 0,
      downVote: 0,
      rating: 0.0,
    },
    {
      name: "Faizal Johan Atletiko, S.Kom., M.T.",
      faculty: "FTEIC",
      department: "Sistem Informasi",
      upVote: 0,
      downVote: 0,
      rating: 0.0,
    },
    {
      name: "Edwin Riksakomara, S.Kom., M.T.",
      faculty: "FTEIC",
      department: "Sistem Informasi",
      upVote: 0,
      downVote: 0,
      rating: 0.0,
    },
    {
      name: "Faizal Mahananto, S.Kom., M.Eng., Ph.D.",
      faculty: "FTEIC",
      department: "Sistem Informasi",
      upVote: 0,
      downVote: 0,
      rating: 0.0,
    },
    {
      name: "Rully Agus Hendrawan, S.Kom., M.Eng",
      faculty: "FTEIC",
      department: "Sistem Informasi",
      upVote: 0,
      downVote: 0,
      rating: 0.0,
    },
    {
      name: "Eko Wahyu Tyas Darmaningrat, S.Kom., M.BA.",
      faculty: "FTEIC",
      department: "Sistem Informasi",
      upVote: 0,
      downVote: 0,
      rating: 0.0,
    },
    {
      name: "Ir. Gatot Kusrahardjo, M.T.",
      faculty: "FTEIC",
      department: "Teknik Elektro",
      upVote: 0,
      downVote: 0,
      rating: 0.0,
    },
    {
      name: "Dr. Ir. Endroyono, DEA.",
      faculty: "FTEIC",
      department: "Teknik Elektro",
      upVote: 0,
      downVote: 0,
      rating: 0.0,
    },
    {
      name: "Ir. Tasripan, MT.",
      faculty: "FTEIC",
      department: "Teknik Elektro",
      upVote: 0,
      downVote: 0,
      rating: 0.0,
    },
    {
      name: "Yusuf Bilfaqih, S.T., M.T.",
      faculty: "FTEIC",
      department: "Teknik Elektro",
      upVote: 0,
      downVote: 0,
      rating: 0.0,
    },
    {
      name: "Dr. Mochammad Sahal, S.T., M.Sc.",
      faculty: "FTEIC",
      department: "Teknik Elektro",
      upVote: 0,
      downVote: 0,
      rating: 0.0,
    },
    {
      name: "Zulkifli Hidayat, S.T., M.Sc.",
      faculty: "FTEIC",
      department: "Teknik Elektro",
      upVote: 0,
      downVote: 0,
      rating: 0.0,
    },
    {
      name: "Dr. Ir. Puji Handayani, MT.",
      faculty: "FTEIC",
      department: "Teknik Elektro",
      upVote: 0,
      downVote: 0,
      rating: 0.0,
    },
    {
      name: "Dr. Dimas Fajar Uman Putra, S.T., M.T.",
      faculty: "FTEIC",
      department: "Teknik Elektro",
      upVote: 0,
      downVote: 0,
      rating: 0.0,
    },
    {
      name: "Dr. Daniar Fahmi, S.T., M.T.",
      faculty: "FTEIC",
      department: "Teknik Elektro",
      upVote: 0,
      downVote: 0,
      rating: 0.0,
    },
    {
      name: "Muhammad Attamimi, B.Eng., M.Eng., Ph.D.",
      faculty: "FTEIC",
      department: "Teknik Elektro",
      upVote: 0,
      downVote: 0,
      rating: 0.0,
    },
    {
      name: "Fajar Budiman, S.T., M.Sc.",
      faculty: "FTEIC",
      department: "Teknik Elektro",
      upVote: 0,
      downVote: 0,
      rating: 0.0,
    },
    {
      name: "Eka Iskandar, S.T., M.T.",
      faculty: "FTEIC",
      department: "Teknik Elektro",
      upVote: 0,
      downVote: 0,
      rating: 0.0,
    },
    {
      name: "Dr. Rudy Dikairono, ST., M.T.",
      faculty: "FTEIC",
      department: "Teknik Elektro",
      upVote: 0,
      downVote: 0,
      rating: 0.0,
    },
    {
      name: "Astria Nur Irfansyah, S.T., M.Eng., Ph.D.",
      faculty: "FTEIC",
      department: "Teknik Elektro",
      upVote: 0,
      downVote: 0,
      rating: 0.0,
    },
    {
      name: "Dimas Anton Asfani, S.T., M.T., Ph.D.",
      faculty: "FTEIC",
      department: "Teknik Elektro",
      upVote: 0,
      downVote: 0,
      rating: 0.0,
    },
    {
      name: "Feby Agung Pamuji, ST., M.T., Ph.D.",
      faculty: "FTEIC",
      department: "Teknik Elektro",
      upVote: 0,
      downVote: 0,
      rating: 0.0,
    },
    {
      name: "Dr.Eng. Darlis Herumurti, S.Kom., M.Kom.",
      faculty: "FTEIC",
      department: "Teknik Informatika",
      upVote: 0,
      downVote: 0,
      rating: 0.0,
    },
    {
      name: "Imam Kuswardayan, S.Kom., M.T.",
      faculty: "FTEIC",
      department: "Teknik Informatika",
      upVote: 0,
      downVote: 0,
      rating: 0.0,
    },
    {
      name: "Misbakhul Munir Irfan Subakti, S.Kom., M.Sc.Eng., M.Phil.",
      faculty: "FTEIC",
      department: "Teknik Informatika",
      upVote: 0,
      downVote: 0,
      rating: 0.0,
    },
    {
      name: "Fajar Baskoro, S.Kom., M.T.",
      faculty: "FTEIC",
      department: "Teknik Informatika",
      upVote: 0,
      downVote: 0,
      rating: 0.0,
    },
    {
      name: "Dini Adni Navastara, S.Kom., M.Sc.",
      faculty: "FTEIC",
      department: "Teknik Informatika",
      upVote: 0,
      downVote: 0,
      rating: 0.0,
    },
    {
      name: "Hadziq Fabroyir, S.Kom., Ph.D.",
      faculty: "FTEIC",
      department: "Teknik Informatika",
      upVote: 0,
      downVote: 0,
      rating: 0.0,
    },
    {
      name: "Wijayanti Nurul Khotimah, S.Kom., M.Sc.",
      faculty: "FTEIC",
      department: "Teknik Informatika",
      upVote: 0,
      downVote: 0,
      rating: 0.0,
    },
    {
      name: "Bagus Jati Santoso, S.Kom., Ph.D.",
      faculty: "FTEIC",
      department: "Teknik Informatika",
      upVote: 0,
      downVote: 0,
      rating: 0.0,
    },
    {
      name: "Arya Yudhi Wijaya, S.Kom, M.Kom.",
      faculty: "FTEIC",
      department: "Teknik Informatika",
      upVote: 0,
      downVote: 0,
      rating: 0.0,
    },
    {
      name: "Nurul Fajrin Ariyani, S.Kom., M.Sc.",
      faculty: "FTEIC",
      department: "Teknik Informatika",
      upVote: 0,
      downVote: 0,
      rating: 0.0,
    },
    {
      name: "Adhatus Solichah Ahmadiyah, S.Kom., M.Sc.",
      faculty: "FTEIC",
      department: "Teknik Informatika",
      upVote: 0,
      downVote: 0,
      rating: 0.0,
    },
    {
      name: "Ahmad Zaini, S.T., M.T.",
      faculty: "FTEIC",
      department: "Teknik Komputer",
      upVote: 0,
      downVote: 0,
      rating: 0.0,
    },
    {
      name: "Dr. Arief Kurniawan, S.T., M.T.",
      faculty: "FTEIC",
      department: "Teknik Komputer",
      upVote: 0,
      downVote: 0,
      rating: 0.0,
    },
    {
      name: "Dr. Eko Mulyanto Yuniarno, S.T., M.T.",
      faculty: "FTEIC",
      department: "Teknik Komputer",
      upVote: 0,
      downVote: 0,
      rating: 0.0,
    },
    {
      name: "Eko Pramunanto, S.T., M.T.",
      faculty: "FTEIC",
      department: "Teknik Komputer",
      upVote: 0,
      downVote: 0,
      rating: 0.0,
    },
    {
      name: "Muhtadin, S.T., M.T.",
      faculty: "FTEIC",
      department: "Teknik Komputer",
      upVote: 0,
      downVote: 0,
      rating: 0.0,
    },
    {
      name: "Izzat Aulia Akbar, S.Kom., M.Eng., Ph.D.",
      faculty: "FTEIC",
      department: "Sistem Informasi",
      upVote: 0,
      downVote: 0,
      rating: 0.0,
    },
    {
      name: "Dr. Rarasmaya Indraswari, S.Kom.",
      faculty: "FTEIC",
      department: "Sistem Informasi",
      upVote: 0,
      downVote: 0,
      rating: 0.0,
    },
    {
      name: "Shintami Chusnul Hidayati, S.Kom., M.Sc., Ph.D.",
      faculty: "FTEIC",
      department: "Teknik Informatika",
      upVote: 0,
      downVote: 0,
      rating: 0.0,
    },
    {
      name: "Agus Budi Raharjo, S.Kom., M.Kom., Ph.D.",
      faculty: "FTEIC",
      department: "Teknik Informatika",
      upVote: 0,
      downVote: 0,
      rating: 0.0,
    },
    {
      name: "Dr. Rizka Wakhidatus Sholikah, S.Kom.",
      faculty: "FTEIC",
      department: "Teknologi Informasi",
      upVote: 0,
      downVote: 0,
      rating: 0.0,
    },
    {
      name: "Tony Dwi Susanto, S.T., M.T., Ph.D.",
      faculty: "FTEIC",
      department: "Sistem Informasi",
      upVote: 0,
      downVote: 0,
      rating: 0.0,
    },
    {
      name: "Dr. Mudjahidin, S.T., M.T.",
      faculty: "FTEIC",
      department: "Sistem Informasi",
      upVote: 0,
      downVote: 0,
      rating: 0.0,
    },
    {
      name: "Dr. Bambang Setiawan, S.Kom., M.T.",
      faculty: "FTEIC",
      department: "Sistem Informasi",
      upVote: 0,
      downVote: 0,
      rating: 0.0,
    },
    {
      name: "Ir. Achmad Holil Noor Ali, M.Kom.",
      faculty: "FTEIC",
      department: "Sistem Informasi",
      upVote: 0,
      downVote: 0,
      rating: 0.0,
    },
    {
      name: "Hanim Maria Astuti, S.Kom., M.Sc.",
      faculty: "FTEIC",
      department: "Sistem Informasi",
      upVote: 0,
      downVote: 0,
      rating: 0.0,
    },
    {
      name: "Ahmad Muklason, S.Kom., M.Sc., Ph.D.",
      faculty: "FTEIC",
      department: "Sistem Informasi",
      upVote: 0,
      downVote: 0,
      rating: 0.0,
    },
    {
      name: "Feby Artwodini Muqtadiroh, S.Kom., M.T.",
      faculty: "FTEIC",
      department: "Sistem Informasi",
      upVote: 0,
      downVote: 0,
      rating: 0.0,
    },
    {
      name: "Arif Wibisono, S.Kom., M.Sc., Ph.D.",
      faculty: "FTEIC",
      department: "Sistem Informasi",
      upVote: 0,
      downVote: 0,
      rating: 0.0,
    },
    {
      name: "Ir. Josaphat Pramudijanto, M.Eng.",
      faculty: "FTEIC",
      department: "Teknik Biomedik",
      upVote: 0,
      downVote: 0,
      rating: 0.0,
    },
    {
      name: "Dr. Ir. Totok Mujiono, M.Ikom.",
      faculty: "FTEIC",
      department: "Teknik Elektro",
      upVote: 0,
      downVote: 0,
      rating: 0.0,
    },
    {
      name: "Dr. Ir. Ni Ketut Aryani, M.T.",
      faculty: "FTEIC",
      department: "Teknik Elektro",
      upVote: 0,
      downVote: 0,
      rating: 0.0,
    },
    {
      name: "Dr. Ir. Hendra Kusuma, M.Eng.Sc.",
      faculty: "FTEIC",
      department: "Teknik Elektro",
      upVote: 0,
      downVote: 0,
      rating: 0.0,
    },
    {
      name: "Ir. Sjamsjul Anam, M.T.",
      faculty: "FTEIC",
      department: "Teknik Elektro",
      upVote: 0,
      downVote: 0,
      rating: 0.0,
    },
    {
      name: "Dr. Ir. Wirawan, DEA.",
      faculty: "FTEIC",
      department: "Teknik Elektro",
      upVote: 0,
      downVote: 0,
      rating: 0.0,
    },
    {
      name: "Ir. Harris Pirngadi, MT.",
      faculty: "FTEIC",
      department: "Teknik Elektro",
      upVote: 0,
      downVote: 0,
      rating: 0.0,
    },
    {
      name: "Ir. Ali Fatoni, MT.",
      faculty: "FTEIC",
      department: "Teknik Elektro",
      upVote: 0,
      downVote: 0,
      rating: 0.0,
    },
    {
      name: "Dedet Candra Riawan, S.T., M.Eng., Ph.D.",
      faculty: "FTEIC",
      department: "Teknik Elektro",
      upVote: 0,
      downVote: 0,
      rating: 0.0,
    },
    {
      name: "Vita Lystianingrum Budiharto Putri, S.T., M.Sc., Ph.D.",
      faculty: "FTEIC",
      department: "Teknik Elektro",
      upVote: 0,
      downVote: 0,
      rating: 0.0,
    },
    {
      name: "Royyana Muslim Ijtihadie, S.Kom., M.Kom., Ph.D.",
      faculty: "FTEIC",
      department: "Teknik Informatika",
      upVote: 0,
      downVote: 0,
      rating: 0.0,
    },
    {
      name: "Victor Hariadi, S.Si., M.Kom",
      faculty: "FTEIC",
      department: "Teknik Informatika",
      upVote: 0,
      downVote: 0,
      rating: 0.0,
    },
    {
      name: "Dr.Eng. Radityo Anggoro, S.Kom., M.Sc.",
      faculty: "FTEIC",
      department: "Teknik Informatika",
      upVote: 0,
      downVote: 0,
      rating: 0.0,
    },
    {
      name: "Dr. Supeno Mardi Susiki Nugroho, S.T., M.T.",
      faculty: "FTEIC",
      department: "Teknik Komputer",
      upVote: 0,
      downVote: 0,
      rating: 0.0,
    },
    {
      name: "Reza Fuad Rachmadi, S.T., M.T., Ph.D.",
      faculty: "FTEIC",
      department: "Teknik Komputer",
      upVote: 0,
      downVote: 0,
      rating: 0.0,
    },
    {
      name: "Dr.Techn. Ir. Raden Venantius Hari Ginardi, M.Sc.",
      faculty: "FTEIC",
      department: "Teknologi Informasi",
      upVote: 0,
      downVote: 0,
      rating: 0.0,
    },
    {
      name: "Henning Titi Ciptaningtyas, S.Kom., M.Kom.",
      faculty: "Teknologi Informasi",
      department: "Teknologi Informasi",
      upVote: 0,
      downVote: 0,
      rating: 0.0,
    },
    {
      name: "Ir. Suhadi Lili, M.T.I.",
      faculty: "FTEIC",
      department: "Teknik Informatika",
      upVote: 0,
      downVote: 0,
      rating: 0.0,
    },
    {
      name: "Dr. I Gusti Ngurah Satriyadi Hernanda, S.T., MT.",
      faculty: "FTEIC",
      department: "Teknik Elektro",
      upVote: 0,
      downVote: 0,
      rating: 0.0,
    },
    {
      name: "Dr. Dwi Sunaryono, S.Kom., M.Kom.",
      faculty: "FTEIC",
      department: "Teknik Informatika",
      upVote: 0,
      downVote: 0,
      rating: 0.0,
    },
    {
      name: "Dr. Rachmad Setiawan, S.T., M.T.",
      faculty: "FTEIC",
      department: "Teknik Biomedik",
      upVote: 0,
      downVote: 0,
      rating: 0.0,
    },
    {
      name: "Dr. Ir. Djoko Purwanto, M.Eng.",
      faculty: "FTEIC",
      department: "Teknik Elektro",
      upVote: 0,
      downVote: 0,
      rating: 0.0,
    },
    {
      name: "Dr. Diah Puspito Wulandari, S.T., M.Sc.",
      faculty: "FTEIC",
      department: "Teknik Komputer",
      upVote: 0,
      downVote: 0,
      rating: 0.0,
    },
    {
      name: "Hudan Studiawan, S.Kom., M.Kom., Ph.D.",
      faculty: "FTEIC",
      department: "Teknik Informatika",
      upVote: 0,
      downVote: 0,
      rating: 0.0,
    },
    {
      name: "Dr. Apol Pribadi Subriadi, S.T., M.T.",
      faculty: "FTEIC",
      department: "Sistem Informasi",
      upVote: 0,
      downVote: 0,
      rating: 0.0,
    },
    {
      name: "Dr. Ir. Achmad Affandi, DEA",
      faculty: "FTEIC",
      department: "Teknik Elektro",
      upVote: 0,
      downVote: 0,
      rating: 0.0,
    },
    {
      name: "Dr.Eng. Ardyono Priyadi, S.T., M.Eng.",
      faculty: "FTEIC",
      department: "Teknik Elektro",
      upVote: 0,
      downVote: 0,
      rating: 0.0,
    },
    {
      name: "Ronny Mardiyanto, S.T., M.T., Ph.D.",
      faculty: "FTEIC",
      department: "Teknik Elektro",
      upVote: 0,
      downVote: 0,
      rating: 0.0,
    },
    {
      name: "Dr. Surya Sumpeno, S.T., M.Sc.",
      faculty: "FTEIC",
      department: "Teknik Komputer",
      upVote: 0,
      downVote: 0,
      rating: 0.0,
    },
    {
      name: "Dr.Eng. Rony Seto Wibowo, S.T., M.T.",
      faculty: "FTEIC",
      department: "Teknik Elektro",
      upVote: 0,
      downVote: 0,
      rating: 0.0,
    },
    {
      name: "Dr. Bilqis Amaliah, S.Kom., M.Kom.",
      faculty: "FTEIC",
      department: "Teknik Informatika",
      upVote: 0,
      downVote: 0,
      rating: 0.0,
    },
    {
      name: "Mochamad Hariadi, S.T., M.Sc., Ph.D.",
      faculty: "FTEIC",
      department: "Teknik Komputer",
      upVote: 0,
      downVote: 0,
      rating: 0.0,
    },
    {
      name: "Dr. Wiwik Anggraeni, S.Si., M.Kom.",
      faculty: "FTEIC",
      department: "Sistem Informasi",
      upVote: 0,
      downVote: 0,
      rating: 0.0,
    },
    {
      name: "Dr.Eng. Febriliyan Samopa, S.Kom., M.Kom.",
      faculty: "FTEIC",
      department: "Sistem Informasi",
      upVote: 0,
      downVote: 0,
      rating: 0.0,
    },
    {
      name: "Sholiq, S.T., M.Kom.",
      faculty: "FTEIC",
      department: "Sistem Informasi",
      upVote: 0,
      downVote: 0,
      rating: 0.0,
    },
    {
      name: "Eko Setijadi, S.T., M.T., Ph.D.",
      faculty: "FTEIC",
      department: "Teknik Elektro",
      upVote: 0,
      downVote: 0,
      rating: 0.0,
    },
    {
      name: "Dr. Muhammad Rivai, S.T, M.T.",
      faculty: "FTEIC",
      department: "Teknik Elektro",
      upVote: 0,
      downVote: 0,
      rating: 0.0,
    },
    {
      name: "Dr. Ir. Suwadi, M.T.",
      faculty: "FTEIC",
      department: "Teknik Elektro",
      upVote: 0,
      downVote: 0,
      rating: 0.0,
    },
    {
      name: "Dr. Ir. Margo Pujiantara, M.T.",
      faculty: "FTEIC",
      department: "Teknik Elektro",
      upVote: 0,
      downVote: 0,
      rating: 0.0,
    },
    {
      name: "Sarwosri, S.Kom., M.T.",
      faculty: "FTEIC",
      department: "Teknik Informatika",
      upVote: 0,
      downVote: 0,
      rating: 0.0,
    },
    {
      name: "Dr. Ir. Siti Rochimah, MT",
      faculty: "FTEIC",
      department: "Teknik Informatika",
      upVote: 0,
      downVote: 0,
      rating: 0.0,
    },
    {
      name: "Dr. Umi Laili Yuhana, S.Kom., M.Sc.",
      faculty: "FTEIC",
      department: "Teknik Informatika",
      upVote: 0,
      downVote: 0,
      rating: 0.0,
    },
    {
      name: "Ary Mazharuddin Shiddiqi, S.Kom., M.Comp.Sc., Ph.D.",
      faculty: "FTEIC",
      department: "Teknik Informatika",
      upVote: 0,
      downVote: 0,
      rating: 0.0,
    },
    {
      name: "Dr. Anny Yuniarti, S.Kom., M.Comp.Sc.",
      faculty: "FTEIC",
      department: "Teknik Informatika",
      upVote: 0,
      downVote: 0,
      rating: 0.0,
    },
    {
      name: "Dr. Adhi Dharma Wibawa, S.T., M.T.",
      faculty: "FTEIC",
      department: "Teknik Biomedik",
      upVote: 0,
      downVote: 0,
      rating: 0.0,
    },
    {
      name: "Dr. Ahmad Saikhu, S.Si., M.T.",
      faculty: "FTEIC",
      department: "S2 Teknik Informatika",
      upVote: 0,
      downVote: 0,
      rating: 0.0,
    },
    {
      name: "Dr. Ir. Aris Tjahyanto, M.Kom.",
      faculty: "FTEIC",
      department: "Sistem Informasi",
      upVote: 0,
      downVote: 0,
      rating: 0.0,
    },
    {
      name: "Dr. Achmad Arifin, S.T., M.Eng.",
      faculty: "FTEIC",
      department: "Teknik Biomedik",
      upVote: 0,
      downVote: 0,
      rating: 0.0,
    },
    {
      name: "Dr. Ir. Achmad Mauludiyanto, M.T.",
      faculty: "FTEIC",
      department: "Teknik Elektro",
      upVote: 0,
      downVote: 0,
      rating: 0.0,
    },
    {
      name: "Rully Sulaiman, S.Kom., M.Kom.",
      faculty: "FTEIC",
      department: "Teknik Informatika",
      upVote: 0,
      downVote: 0,
      rating: 0.0,
    },
    {
      name: "Dr. Yudhi Purwananto, S.Kom., M.Kom.",
      faculty: "FTEIC",
      department: "Teknik Informatika",
      upVote: 0,
      downVote: 0,
      rating: 0.0,
    },
    {
      name: "Ir. Khakim Ghozali, M.MT.",
      faculty: "FTEIC",
      department: "Teknologi Informasi",
      upVote: 0,
      downVote: 0,
      rating: 0.0,
    },
    {
      name: "Dr. Ir. Ari Santoso, DEA.",
      faculty: "FTEIC",
      department: "Teknik Elektro",
      upVote: 0,
      downVote: 0,
      rating: 0.0,
    },
    {
      name: "Ir. Muchammad Husni, M.Kom.",
      faculty: "FTEIC",
      department: "Teknologi Informasi",
      upVote: 0,
      downVote: 0,
      rating: 0.0,
    },
    {
      name: "Irzal Ahmad Sabilla, S.Kom., M.Kom.",
      faculty: "FTEIC",
      department: "Teknologi Informasi",
      upVote: 0,
      downVote: 0,
      rating: 0.0,
    },
    {
      name: "Fuad Dary Rosyadi, S.Kom., M.Kom.",
      faculty: "FTEIC",
      department: "Teknologi Informasi",
      upVote: 0,
      downVote: 0,
      rating: 0.0,
    },
    {
      name: "Hafara Firdausi, S.Kom., M.Kom.",
      faculty: "FTEIC",
      department: "Teknologi Informasi",
      upVote: 0,
      downVote: 0,
      rating: 0.0,
    },
    {
      name: "Rizal Risnanda Hutama, S.Kom., M.Kom.",
      faculty: "FTEIC",
      department: "Sistem Informasi",
      upVote: 0,
      downVote: 0,
      rating: 0.0,
    },
    {
      name: "Yogantara Setya Dharmawan, S.Kom., MBusProcessMgt.",
      faculty: "FTEIC",
      department: "Sistem Informasi",
      upVote: 0,
      downVote: 0,
      rating: 0.0,
    },
    {
      name: "Yuri Pamungkas, S.Tr.T., M.T.",
      faculty: "FTEIC",
      department: "Teknik Biomedik",
      upVote: 0,
      downVote: 0,
      rating: 0.0,
    },
    {
      name: "dr. Putri Alief Siswanto, M.T.",
      faculty: "FTEIC",
      department: "Teknik Biomedik",
      upVote: 0,
      downVote: 0,
      rating: 0.0,
    },
    {
      name: "Dr. Shoffi Izza Sabilla, S.Kom.",
      faculty: "FTEIC",
      department: "Teknik Biomedik",
      upVote: 0,
      downVote: 0,
      rating: 0.0,
    },
    {
      name: "Rezki El Arif, S.T., M.T., Ph.D.",
      faculty: "FTEIC",
      department: "Teknik Biomedik",
      upVote: 0,
      downVote: 0,
      rating: 0.0,
    },
    {
      name: "Prof. Nur Aini Rakhmawati, S.Kom., M.Sc.Eng., Ph.D.",
      faculty: "FTEIC",
      department: "Sistem Informasi",
      upVote: 0,
      downVote: 0,
      rating: 0.0,
    },

    {
      name: "Prof. Dr. Ir. Titiek Suryani, M.T.",
      faculty: "FTEIC",
      department: "Teknik Elektro",
      upVote: 0,
      downVote: 0,
      rating: 0.0,
    },

    {
      name: "Prof. Heri Suryoatmojo, S.T., M.T., Ph.D.",
      faculty: "FTEIC",
      department: "Teknik Elektro",
      upVote: 0,
      downVote: 0,
      rating: 0.0,
    },

    {
      name: "Prof. Dr. I Ketut Eddy Purnama, S.T., M.T.",
      faculty: "FTEIC",
      department: "Teknik Komputer",
      upVote: 0,
      downVote: 0,
      rating: 0.0,
    },

    {
      name: "Prof. Dr. Diana Purwitasari, S.Kom., M.Sc.",
      faculty: "FTEIC",
      department: "Teknik Informatika",
      upVote: 0,
      downVote: 0,
      rating: 0.0,
    },

    {
      name: "Prof. Mahendrawathi ER., S.T., M.Sc., Ph.D.",
      faculty: "FTEIC",
      department: "Sistem Informasi",
      upVote: 0,
      downVote: 0,
      rating: 0.0,
    },

    {
      name: "Prof. Dr. Trihastuti Agustinah, S.T., M.T.",
      faculty: "FTEIC",
      department: "Teknik Elektro",
      upVote: 0,
      downVote: 0,
      rating: 0.0,
    },

    {
      name: "Prof. Daniel Oranova Siahaan, S.Kom., M.Sc., PD.Eng.",
      faculty: "FTEIC",
      department: "Teknik Informatika",
      upVote: 0,
      downVote: 0,
      rating: 0.0,
    },

    {
      name: "Prof. Dr. Eng. Nanik Suciati, S.Kom., M.Kom.",
      faculty: "FTEIC",
      department: "Teknik Informatika",
      upVote: 0,
      downVote: 0,
      rating: 0.0,
    },

    {
      name: "Prof. Dr. I Made Yulistya Negara, S.T., M.Sc.",
      faculty: "FTEIC",
      department: "Teknik Elektro",
      upVote: 0,
      downVote: 0,
      rating: 0.0,
    },

    {
      name: "Prof. Dr. Tri Arief Sardjono, S.T, M.T.",
      faculty: "FTEIC",
      department: "Teknik Biomedik",
      upVote: 0,
      downVote: 0,
      rating: 0.0,
    },

    {
      name: "Prof. Dr.Eng. Chastine Fatichah, S.Kom., M.Kom.",
      faculty: "FTEIC",
      department: "Teknik Informatika",
      upVote: 0,
      downVote: 0,
      rating: 0.0,
    },

    {
      name: "Prof. Tohari Ahmad, S.Kom., MIT., Ph.D.",
      faculty: "FTEIC",
      department: "Teknik Informatika",
      upVote: 0,
      downVote: 0,
      rating: 0.0,
    },

    {
      name: "Prof. Dr. Agus Zainal Arifin, S.Kom., M.Kom.",
      faculty: "FTEIC",
      department: "Teknik Informatika",
      upVote: 0,
      downVote: 0,
      rating: 0.0,
    },

    {
      name: "Prof.Dr.Ir. Joko Lianto Buliali M.Sc.",
      faculty: "FTEIC",
      department: "Teknik Informatika",
      upVote: 0,
      downVote: 0,
      rating: 0.0,
    },

    {
      name: "Prof. Dr. Ir. Soedibyo, M.MT.",
      faculty: "FTEIC",
      department: "Teknik Elektro",
      upVote: 0,
      downVote: 0,
      rating: 0.0,
    },

    {
      name: "Prof. Ir. Supeno Djanali, M.Sc., Ph.D.",
      faculty: "FTEIC",
      department: "Teknik Informatika",
      upVote: 0,
      downVote: 0,
      rating: 0.0,
    },

    {
      name: "Prof. Erma Suryani, S.T., M.T., Ph.D.",
      faculty: "FTEIC",
      department: "Sistem Informasi",
      upVote: 0,
      downVote: 0,
      rating: 0.0,
    },

    {
      name: "Prof. Ir. Ontoseno Penangsang, M.Sc., Ph.D",
      faculty: "FTEIC",
      department: "Teknik Elektro",
      upVote: 0,
      downVote: 0,
      rating: 0.0,
    },

    {
      name: "Prof.Dr.Ir. Achmad Jazidie, M.Eng",
      faculty: "FTEIC",
      department: "Teknik Elektro",
      upVote: 0,
      downVote: 0,
      rating: 0.0,
    },

    {
      name: "Prof.Dr.Ir Adi Soeprijanto, M.T.",
      faculty: "FTEIC",
      department: "Teknik Elektro",
      upVote: 0,
      downVote: 0,
      rating: 0.0,
    },

    {
      name: "Prof. Dr. Ir. Imam Robandi, M.T.",
      faculty: "FTEIC",
      department: "Teknik Elektro",
      upVote: 0,
      downVote: 0,
      rating: 0.0,
    },

    {
      name: "Prof. Ir. Gamantyo Hendrantoro, M.Eng., Ph.D.",
      faculty: "FTEIC",
      department: "Teknik Elektro",
      upVote: 0,
      downVote: 0,
      rating: 0.0,
    },

    {
      name: "Prof. Dr. Ir. Yoyon Kusnendar Suprapto, M.Sc.",
      faculty: "FTEIC",
      department: "Teknik Komputer",
      upVote: 0,
      downVote: 0,
      rating: 0.0,
    },

    {
      name: "Prof. Dr. Ir. Mauridhi Hery Purnomo, M.Eng.",
      faculty: "FTEIC",
      department: "Teknik Komputer",
      upVote: 0,
      downVote: 0,
      rating: 0.0,
    },

    {
      name: "Prof.Ir. Handayani Tjandrasa, M.Sc Ph.D",
      faculty: "FTEIC",
      department: "Teknik Informatika",
      upVote: 0,
      downVote: 0,
      rating: 0.0,
    },

    {
      name: "Prof. Drs.Ec. Ir. Riyanarto Sarno, M.Sc., Ph.D.",
      faculty: "FTEIC",
      department: "Teknik Informatika",
      upVote: 0,
      downVote: 0,
      rating: 0.0,
    },

    {
      name: "Prof. Ir. Arif Djunaidy, M.Sc., Ph.D.",
      faculty: "FTEIC",
      department: "Sistem Informasi",
      upVote: 0,
      downVote: 0,
      rating: 0.0,
    },
    {
      name: "Prof. Dr. Ir. Mohammad Nuh, DEA",
      faculty: "FTEIC",
      department: "Teknik Biomedik",
      upVote: 0,
      downVote: 0,
      rating: 0.0,
    },
    {
      name: "Prof. Ir. Abdullah Alkaf, M.Sc., Ph.D.",
      faculty: "FTEIC",
      department: "Teknik Elektro",
      upVote: 0,
      downVote: 0,
      rating: 0.0,
    },
    {
      name: "Prof. Dr. Ir. Mochamad Ashari, M.Eng.",
      faculty: "FTEIC",
      department: "Teknik Elektro",
      upVote: 0,
      downVote: 0,
      rating: 0.0,
    },
    {
      name: "Fauzan Arrofiqi, S.T., M.T.",
      faculty: "FTEIC",
      department: "Teknik Biomedik",
      upVote: 0,
      downVote: 0,
      rating: 0.0,
    },
    {
      name: "Dr. Ir. Endang Widjiati, M.Eng.Sc.",
      faculty: "FTEIC",
      department: "Teknik Elektro",
      upVote: 0,
      downVote: 0,
      rating: 0.0,
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
