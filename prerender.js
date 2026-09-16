import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const routesToPrerender = [
  { path: '/', title: 'Satu Cerita – Platform Undangan Digital Website #1 Indonesia', desc: 'Buat undangan online digital website custom dengan Satu Cerita. Selesai dalam hitungan menit.' },
  { path: '/pricing', title: 'Harga & Paket – Satu Cerita', desc: 'Paket harga undangan digital Satu Cerita. Mulai dari gratis hingga premium.' },
  { path: '/harga', title: 'Harga & Paket – Satu Cerita', desc: 'Paket harga undangan digital Satu Cerita. Mulai dari gratis hingga premium.' },
  { path: '/themes', title: 'Tema Undangan Digital – Satu Cerita', desc: 'Koleksi 500+ tema undangan digital yang bisa di-custom sesuai keinginan.' },
  { path: '/tema', title: 'Tema Undangan Digital – Satu Cerita', desc: 'Koleksi 500+ tema undangan digital yang bisa di-custom sesuai keinginan.' },
  { path: '/how-to-create', title: 'Cara Membuat Undangan Digital – Satu Cerita', desc: 'Panduan lengkap cara membuat undangan website digital interaktif.' },
  { path: '/website', title: 'Undangan Website Digital – Satu Cerita', desc: 'Undangan website digital interaktif & elegan.' },
  { path: '/about', title: 'Tentang Kami – Satu Cerita', desc: 'Platform undangan digital terdepan di Indonesia.' },
  { path: '/faq', title: 'FAQ – Satu Cerita', desc: 'Pertanyaan umum seputar pembuatan undangan digital.' },
  { path: '/blog', title: 'Blog & Tips Undangan – Satu Cerita', desc: 'Artikel, tips, dan inspirasi pernikahan & acara.' },
  { path: '/video', title: 'Undangan Video 3D – Satu Cerita', desc: 'Undangan video animasi 3D sinematik.' },
  { path: '/cetak', title: 'Undangan Cetak Premium – Satu Cerita', desc: 'Undangan cetak kertas fisik berkualitas tinggi.' },
];

const distDir = path.resolve(__dirname, 'dist');
const templatePath = path.join(distDir, 'index.html');

if (!fs.existsSync(templatePath)) {
  console.log('Build output not found. Please run vite build first.');
  process.exit(1);
}

const templateHtml = fs.readFileSync(templatePath, 'utf-8');

routesToPrerender.forEach((route) => {
  let routeHtml = templateHtml;
  
  // Inject title and description
  routeHtml = routeHtml.replace(/<title>.*?<\/title>/, `<title>${route.title}</title>`);
  routeHtml = routeHtml.replace(/<meta name="description" content=".*?"\s*\/?>/, `<meta name="description" content="${route.desc}">`);

  if (route.path === '/') {
    fs.writeFileSync(templatePath, routeHtml);
    console.log(`Prerendered: / (index.html)`);
  } else {
    const routeDir = path.join(distDir, route.path.slice(1));
    if (!fs.existsSync(routeDir)) {
      fs.mkdirSync(routeDir, { recursive: true });
    }
    fs.writeFileSync(path.join(routeDir, 'index.html'), routeHtml);
    console.log(`Prerendered: ${route.path}/index.html`);
  }
});

console.log('SSG Prerendering Completed Successfully!');
