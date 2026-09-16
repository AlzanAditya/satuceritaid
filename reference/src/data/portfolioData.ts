import { WorkExperience, Achievement, Education, TechItem } from '../types';

export const personalInfo = {
  name: 'Alzan Aditya',
  brandName: 'Alzan Aditya',
  badge: 'Available For Freelance',
  badge_id: 'Siap Untuk Freelance',
  badge_en: 'Available For Freelance',
  role: 'Professional Website Developer & Creative Agency Founder',
  role_id: 'Pengembang Website Profesional & Founder Agensi Kreatif',
  role_en: 'Professional Website Developer & Creative Agency Founder',
  heroTitle: 'Professional Website Developer & Creative Agency Founder',
  heroSubtitle:
    "I'm a freelance web developer building digital solutions that scale with your ideas.",
  heroSubtitle_id:
    "Saya seorang freelance web developer yang membangun solusi digital berskala tinggi sesuai ide bisnis Anda.",
  heroSubtitle_en:
    "I'm a freelance web developer building digital solutions that scale with your ideas.",
  bio: "Welcome to my portfolio, the personal portfolio of Alzan Aditya, a professional website developer and freelancer. Explore my portfolio projects, achievements, awards, and technical blog insights.",
  bio_id:
    "Selamat datang di portofolio saya, portofolio pribadi Alzan Aditya, seorang pengembang website profesional dan freelancer. Jelajahi proyek portofolio, pencapaian, penghargaan, dan wawasan blog teknis saya.",
  bio_en:
    "Welcome to my portfolio, the personal portfolio of Alzan Aditya, a professional website developer and freelancer. Explore my portfolio projects, achievements, awards, and technical blog insights.",
  shortBio:
    "Welcome to my portfolio, the personal portfolio of Alzan Aditya, a professional website developer and freelancer. Explore my portfolio projects, achievements, awards, and technical blog insights.",
  shortBio_id:
    "Selamat datang di portofolio saya, portofolio pribadi Alzan Aditya, seorang pengembang website profesional dan freelancer.",
  shortBio_en:
    "Welcome to my portfolio, the personal portfolio of Alzan Aditya, a professional website developer and freelancer. Explore my portfolio projects, achievements, awards, and technical blog insights.",
  avatar: '/avatar/photo-profile.jpg',
  email: 'alzanadytia.j@gmail.com',
  whatsapp: '+6285187978443',
  instagram: 'https://instagram.com/alzanaditya',
  github: 'https://github.com/AlzanAditya',
  tiktok: 'https://tiktok.com/@alzanaditya',
  linkedin: 'https://linkedin.com/in/alzanadytiajuniar',
  location: 'Bali, Indonesia',
  stats: [
    {
      value: '1+',
      label: 'Years As IT Student',
      label_id: 'Tahun Sebagai Siswa/Mhs IT',
      label_en: 'Year As IT Student',
      accent: 'primary',
    },
    {
      value: '8+',
      label: 'Web & System projects complete',
      label_id: 'Proyek Web & Sistem Selesai',
      label_en: 'Web & System projects complete',
      accent: 'secondary',
    },
    {
      value: '5+',
      label: 'Collaborate Projects',
      label_id: 'Proyek Kolaborasi',
      label_en: 'Collaborate Projects',
      accent: 'primary',
    },
  ],
  roles: [
    'Solopreneur',
    'Freelance Web Developer',
    'Software engineer student',
    'Robotic Enthusiast',
  ],
  roles_id: [
    'Solopreneur',
    'Freelance Web Developer',
    'Mahasiswa Rekayasa Perangkat Lunak',
    'Penggiat Robotik',
  ],
  roles_en: [
    'Solopreneur',
    'Freelance Web Developer',
    'Software Engineer Student',
    'Robotic Enthusiast',
  ],
  badges: [
    'Full-Stack Web Developer',
    'System Builder',
    'Content Creator',
    'Bussines Growth',
    'Digital Marketer',
  ],
  badges_id: [
    'Full-Stack Web Developer',
    'System Builder',
    'Content Creator',
    'Pertumbuhan Bisnis',
    'Digital Marketer',
  ],
  badges_en: [
    'Full-Stack Web Developer',
    'System Builder',
    'Content Creator',
    'Business Growth',
    'Digital Marketer',
  ],
};

export const workExperiences: WorkExperience[] = [
  {
    id: 'exp-1',
    period: '2025 - Present',
    period_id: '2025 - Sekarang',
    period_en: '2025 - Present',
    role: 'Founder',
    role_id: 'Founder',
    role_en: 'Founder',
    company: 'Zanxa Studio',
    description:
      'Founded and managing Zanxa Studio, an independent creative digital & web development agency. I lead the development of modern web applications, digital systems, and impactful brand presence for clients and growing businesses.',
    description_id:
      'Mendirikan dan mengelola Zanxa Studio sebagai agensi kreatif digital dan pengembangan website independen. Memimpin perancangan sistem web modern, identitas digital, serta membantu UMKM dan bisnis klien dalam membangun kehadiran digital yang terukur dan profesional.',
    description_en:
      'Founded and managing Zanxa Studio, an independent creative digital & web development agency. I lead the development of modern web applications, digital systems, and impactful brand presence for clients and growing businesses.',
    skills: ['Founder', 'Web Development', 'Digital Strategy', 'Full-Stack', 'Client Management'],
  },
  {
    id: 'exp-2',
    period: '2025 - 2026',
    period_id: '2025 - 2026',
    period_en: '2025 - 2026',
    role: 'Media & Instagram Specialist',
    role_id: 'Media & Instagram Specialist',
    role_en: 'Media & Instagram Specialist',
    company: 'Tasnim Property',
    description:
      'Leveraging my background in Visual Communication Design (DKV), I joined PT Tasnim Property as a Media & Instagram Specialist. Responsible for producing visual media, creative social strategies, and managing promotional campaigns for residential property developments as well as recreational & educational tourism venues.',
    description_id:
      'Berbekal latar belakang pendidikan di bidang Desain Komunikasi Visual (DKV), saya bergabung sebagai Media & Instagram Specialist di PT Tasnim Property. Bertanggung jawab dalam merancang strategi konten kreatif, produksi aset visual, dan pengelolaan media sosial untuk kawasan perumahan properti serta destinasi wisata hiburan dan edukasi.',
    description_en:
      'Leveraging my background in Visual Communication Design (DKV), I joined PT Tasnim Property as a Media & Instagram Specialist. Responsible for producing visual media, creative social strategies, and managing promotional campaigns for residential property developments as well as recreational & educational tourism venues.',
    skills: ['DKV / Visual Design', 'Instagram Marketing', 'Content Production', 'Property Branding', 'Media Campaign'],
  },
];

export const achievementsData: Achievement[] = [
  {
    id: 'ach-1',
    year: '2026',
    title: 'Junior Coder Certificate',
    title_id: 'Sertifikasi Junior Coder',
    title_en: 'Junior Coder Certificate',
    issuer: 'LSP TIK Triatma Kompetensi',
    category: 'Certification',
    category_id: 'Sertifikasi',
    category_en: 'Certification',
  },
  {
    id: 'ach-2',
    year: '2025',
    title: '1st Web Development Competition',
    title_id: 'Juara 1 Lomba Web Development',
    title_en: '1st Web Development Competition',
    issuer: 'Konkiti Competition Vol. II',
    category: '1st Winner',
    category_id: 'Juara 1',
    category_en: '1st Winner',
  },
  {
    id: 'ach-3',
    year: '2024',
    title: '1st Web Development Competition',
    title_id: 'Juara 1 Lomba Web Development',
    title_en: '1st Web Development Competition',
    issuer: 'Tech Festival | Timedoor Indonesia',
    category: '1st Winner',
    category_id: 'Juara 1',
    category_en: '1st Winner',
  },
];

export const educationData: Education[] = [
  {
    id: 'edu-1',
    period: '2026 - Now',
    period_id: '2026 - Sekarang',
    period_en: '2026 - Present',
    institution: 'Universitas Islam Bogor',
    degree: 'Bachelor Degree (S1)',
    degree_id: 'Sarjana (S1)',
    degree_en: 'Bachelor Degree (S1)',
    major: 'Bisnis Digital',
    major_id: 'Bisnis Digital',
    major_en: 'Digital Business',
  },
  {
    id: 'edu-2',
    period: '2022 - 2025',
    period_id: '2022 - 2025',
    period_en: '2022 - 2025',
    institution: 'SMKN 1 Leuwiliang',
    degree: 'Vocational High School',
    degree_id: 'SMK (Sekolah Menengah Kejuruan)',
    degree_en: 'Vocational High School',
    major: 'Desain Komunikasi Visual (DKV)',
    major_id: 'Desain Komunikasi Visual (DKV)',
    major_en: 'Visual Communication Design (DKV)',
  },
];

export const techStackData: TechItem[] = [
  { name: 'Next.js', category: 'Frontend', level: 'Advanced' },
  { name: 'React', category: 'Frontend', level: 'Advanced' },
  { name: 'TypeScript', category: 'Frontend', level: 'Advanced' },
  { name: 'Tailwind CSS', category: 'Frontend', level: 'Expert' },
  { name: 'Vite', category: 'Frontend', level: 'Advanced' },
  { name: 'Motion / Framer', category: 'Frontend', level: 'Intermediate' },
  { name: 'Laravel 11/12', category: 'Backend', level: 'Expert' },
  { name: 'Filament PHP v3', category: 'Backend', level: 'Advanced' },
  { name: 'PHP', category: 'Backend', level: 'Advanced' },
  { name: 'REST APIs', category: 'Backend', level: 'Advanced' },
  { name: 'MySQL', category: 'Database & CMS', level: 'Advanced' },
  { name: 'PostgreSQL', category: 'Database & CMS', level: 'Intermediate' },
  { name: 'WordPress', category: 'Database & CMS', level: 'Expert' },
  { name: 'Postman', category: 'Tools & Marketing', level: 'Advanced' },
  { name: 'Notion', category: 'Tools & Marketing', level: 'Advanced' },
  { name: 'Figma', category: 'Tools & Marketing', level: 'Intermediate' },
  { name: 'Meta Ads', category: 'Tools & Marketing', level: 'Advanced' },
  { name: 'GitHub & Git', category: 'Tools & Marketing', level: 'Advanced' },
];

export const servicesData = [
  {
    id: 'srv-1',
    title: 'Custom Website Development',
    title_id: 'Pengembangan Website Kustom',
    title_en: 'Custom Website Development',
    description:
      'High-converting landing pages, interactive company profiles, and bespoke digital platforms crafted with modern frameworks like Next.js, React, and Tailwind CSS.',
    description_id:
      'Landing page berkonversi tinggi, company profile interaktif, dan platform digital kustom yang dibangun dengan framework modern seperti Next.js, React, dan Tailwind CSS.',
    description_en:
      'High-converting landing pages, interactive company profiles, and bespoke digital platforms crafted with modern frameworks like Next.js, React, and Tailwind CSS.',
    badge: 'Frontend & UI',
  },
  {
    id: 'srv-2',
    title: 'System & ERP Solutions',
    title_id: 'Solusi Sistem & ERP',
    title_en: 'System & ERP Solutions',
    description:
      'Robust internal business management, ticketing booking engines, point-of-sale (POS), and smart database applications built on Laravel and Filament.',
    description_id:
      'Manajemen bisnis internal yang tangguh, sistem tiket & pemesanan, kasir (POS), dan aplikasi basis data cerdas berbasis Laravel dan Filament.',
    description_en:
      'Robust internal business management, ticketing booking engines, point-of-sale (POS), and smart database applications built on Laravel and Filament.',
    badge: 'Backend & Systems',
  },
  {
    id: 'srv-3',
    title: 'WordPress & CMS Mastery',
    title_id: 'Keahlian WordPress & CMS',
    title_en: 'WordPress & CMS Mastery',
    description:
      'Tailor-made WordPress themes, custom WooCommerce stores, and headless architectures with seamless content management for business owners.',
    description_id:
      'Tema WordPress kustom, toko online WooCommerce khusus, dan arsitektur headless dengan manajemen konten yang mudah dan praktis bagi pemilik bisnis.',
    description_en:
      'Tailor-made WordPress themes, custom WooCommerce stores, and headless architectures with seamless content management for business owners.',
    badge: 'CMS & E-Commerce',
  },
  {
    id: 'srv-4',
    title: 'Farming Leads & Meta Ads Strategy',
    title_id: 'Strategi Farming Leads & Meta Ads',
    title_en: 'Farming Leads & Meta Ads Strategy',
    description:
      'Targeted digital marketing funnels and Meta advertising setups specifically structured for solopreneurs and freelancers to generate steady client inquiries.',
    description_id:
      'Funnel pemasaran digital tertarget dan pengaturan iklan Meta Ads yang terstruktur khusus bagi solopreneur dan freelancer untuk mendatangkan prospek klien secara stabil.',
    description_en:
      'Targeted digital marketing funnels and Meta advertising setups specifically structured for solopreneurs and freelancers to generate steady client inquiries.',
    badge: 'Growth & Marketing',
  },
];

