import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const routesToPrerender = [
  { path: '/', title: 'One Moment – Platform Undangan Digital Website #1 Indonesia', desc: 'Buat undangan online digital website custom dengan One Moment. Selesai dalam hitungan menit.' },
  { path: '/pricing', title: 'Harga & Paket – One Moment', desc: 'Paket harga undangan digital One Moment. Mulai dari gratis hingga premium.' },
  { path: '/harga', title: 'Harga & Paket – One Moment', desc: 'Paket harga undangan digital One Moment. Mulai dari gratis hingga premium.' },
  { path: '/themes', title: 'Tema Undangan Digital – One Moment', desc: 'Koleksi 500+ tema undangan digital yang bisa di-custom sesuai keinginan.' },
  { path: '/tema', title: 'Tema Undangan Digital – One Moment', desc: 'Koleksi 500+ tema undangan digital yang bisa di-custom sesuai keinginan.' },
  { path: '/how-to-create', title: 'Cara Membuat Undangan Digital – One Moment', desc: 'Panduan lengkap cara membuat undangan website digital interaktif.' },
  { path: '/website', title: 'Undangan Website Digital – One Moment', desc: 'Undangan website digital interaktif & elegan.' },
  { path: '/about', title: 'Tentang Kami – One Moment', desc: 'Platform undangan digital terdepan di Indonesia.' },
  { path: '/faq', title: 'FAQ – One Moment', desc: 'Pertanyaan umum seputar pembuatan undangan digital.' },
  { path: '/blog', title: 'Blog & Tips Undangan – One Moment', desc: 'Artikel, tips, dan inspirasi pernikahan & acara.' },
  { path: '/video', title: 'Undangan Video 3D – One Moment', desc: 'Undangan video animasi 3D sinematik.' },
  { path: '/cetak', title: 'Undangan Cetak Premium – One Moment', desc: 'Undangan cetak kertas fisik berkualitas tinggi.' },
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
