import { Blog } from "../types";

export const blogsData: Blog[] = [
  {
    id: "bagaimana-aku-membuat-website-cuma-modal-hp",
    slug: "bagaimana-aku-membuat-website-cuma-modal-hp",
    title: "Bagaimana aku membuat website modal hp saja",
    title_id: "Bagaimana aku membuat website modal hp saja",
    title_en: "How I Built Websites Using Only a Smartphone",
    category: "Experience",
    category_id: "Experience",
    category_en: "Experience",
    excerpt:
      "Banyak yang mengira bikin website modern harus selalu punya laptop mahal. Di artikel ini, aku ceritakan alur kerjaku membuat dan deploy website lengkap hanya bermodal smartphone, Google AI Studio, Termux, dan Cloudflare.",
    excerpt_id:
      "Banyak yang mengira bikin website modern harus selalu punya laptop mahal. Di artikel ini, aku ceritakan alur kerjaku membuat dan deploy website lengkap hanya bermodal smartphone, Google AI Studio, Termux, dan Cloudflare.",
    excerpt_en:
      "Many assume that building modern websites always requires an expensive laptop. In this article, I share my complete workflow creating and deploying websites using only a smartphone, Google AI Studio, Termux, and Cloudflare.",
    coverImage:
      "/blogs/bagaimana-aku-membuat-website-cuma-modal-hp/cover.jpeg",
    publishDate: "14 Sep 2026",
    readTime: "5 min read",
    tags: [
      "Experience",
      "Mobile Coding",
      "Google AI Studio",
      "Termux",
      "Cloudflare",
    ],
    tags_id: [
      "Experience",
      "Mobile Coding",
      "Google AI Studio",
      "Termux",
      "Cloudflare",
    ],
    tags_en: [
      "Experience",
      "Mobile Coding",
      "Google AI Studio",
      "Termux",
      "Cloudflare",
    ],
    author: {
      name: "Alzan Aditya",
      role: "Web Developer",
      role_id: "Pengembang Web",
      role_en: "Web Developer",
      avatar: "/avatar/photo-profile.jpg",
    },
    content: `Banyak yang mengira untuk bisa membuat website modern berstandar industri, kita harus selalu standby di depan laptop atau PC dengan spesifikasi tinggi. Pandangan itu tidak salah, tapi juga tidak sepenuhnya benar di era sekarang.

Ada kalanya aku sedang di luar rumah, dalam perjalanan, atau memang perangkat utama yang paling cepat dijangkau hanyalah **smartphone** di genggaman tangan. Daripada HP cuma dipakai scrolling media sosial tanpa tujuan, aku mulai bereksperimen: *bisa nggak sih sebuah website yang responsif, cepat, dan siap rilis diproduksi hanya bermodal HP?*

Ternyata jawabannya: **bisa banget**. Dengan kombinasi alat yang tepat, keterbatasan layar kecil dan keyboard sentuh bisa teratasi dengan sangat mulus. Berikut adalah alur kerja (workflow) nyata yang aku pakai.

### 1. Merancang dan Menulis Kode dengan Google AI Studio

Tantangan nomor satu saat ngoding di smartphone adalah mengetik ratusan baris kode secara manual di layar sentuh. Jarang ada orang yang tahan mengetik tag HTML, CSS utility, dan TypeScript function satu per satu dengan jempol.

Di sinilah **Google AI Studio** menjadi game changer.

Google AI Studio aku manfaatkan langsung dari browser mobile sebagai partner coding cerdas. Bukan sekadar chatbot biasa, melainkan lingkungan penalaran (reasoning) yang kuat dengan model Gemini. 

Alur yang aku lakukan:
- **Merancang Konsep & Arsitektur**: Aku jelaskan struktur komponen yang diinginkan, hierarki state, dan styling Tailwind CSS yang bersih.
- **Generasi Komponen Presisi**: Google AI Studio menghasilkan potongan komponen React, logic helper, dan struktur type safety secara cepat dan rapi.
- **Refactoring & Debugging Instan**: Ketika ada error pada build atau logika yang kurang pas, aku cukup menyalin log kesalahan dan membiarkan AI menganalisis solusinya secara terstruktur.

Dengan cara ini, 80% beban mengetik manual terpangkas. Peran kita beralih menjadi **arsitek sistem** yang mengarahkan logika, estetika, dan kualitas fungsional aplikasi.

### 2. Mengoperasikan Git dan Repository Lewat Termux

Setelah kodenya siap, bagaimana cara kita menyimpan perubahan ke repository GitHub dari HP?

Jawabannya adalah **Termux**. Bagi yang belum tahu, Termux adalah emulator terminal Linux untuk sistem operasi Android yang bekerja langsung tanpa perlu root perangkat.

Di dalam Termux, aku bisa menjalankan perintah Git lengkap seperti di terminal komputer:
- Menyimpan kredensial dan **SSH Key** yang terhubung aman ke akun GitHub.
- Mengkloning repository proyek ke direktori lokal HP.
- Mengelola cabang (branch), meninjau perubahan dengan **git status** dan **git diff**.
- Melakukan staging dan commit: \`git add .\` dilanjutkan dengan \`git commit -m "update fitur"\`.
- Mendorong kode langsung ke repository utama: **git push origin main**.

Termux membuat pengoperasian Git di HP terasa sangat ringan, cepat, dan sepenuhnya profesional.

### 3. Deploy Otomatis dan Cepat Menggunakan Cloudflare

Bagian paling memuaskan dari seluruh alur ini adalah proses deployment. Kita tidak perlu pusing menyewa VPS mahal atau mengatur konfigurasi server yang rumit dari layar HP.

Aku menghubungkan repository GitHub langsung ke **Cloudflare Pages**.

Setiap kali aku menjalankan perintah **git push** dari Termux, Cloudflare secara otomatis:
- Mendeteksi commit terbaru di repository.
- Menjalankan proses build sistem (Vite / React build) di edge infrastructure mereka.
- Mendistribusikan website ke ratusan data center Cloudflare di seluruh dunia dalam hitungan detik.

Hasilnya, website langsung tayang secara global dengan performa super cepat, sertifikat SSL gratis, dan perlindungan keamanan bawaan. Bahkan fitur **preview deployment** memungkinkan aku mengecek hasil perubahan di branch lain sebelum digabungkan ke produksi.

### 4. Tips Nyaman Ngoding di Smartphone

Biar prosesnya tetap nyaman dan tidak membuat mata atau jemari lelah, ini beberapa tips praktis yang aku terapkan:
- **Gunakan Keyboard yang Ramah Koding**: Pasang aplikasi keyboard seperti **Hacker's Keyboard** yang menyediakan tombol Tab, Ctrl, Esc, dan tanda kurung kurawal yang mudah dijangkau.
- **Gunakan Keyboard Bluetooth**: Jika sedang duduk di kafe atau meja kerja santai, sambungkan keyboard mini nirkabel. Ini langsung mengubah HP menjadi mini workstation.
- **Bagi Layar (Split Screen)**: Manfaatkan fitur split-screen Android untuk membuka Termux di bagian bawah dan browser Google AI Studio di bagian atas secara bersamaan.

### Kesimpulan

Ketiadaan laptop atau PC bukanlah penghalang untuk mulai berkarya dan membangun solusi digital. Kombinasi antara kecerdasan **Google AI Studio**, ketangguhan terminal **Termux**, dan kemudahan deployment di **Cloudflare** membuktikan bahwa sebuah smartphone biasa sudah cukup untuk meluncurkan karya ke panggung dunia.

Yang terpenting bukan seberapa mewah perangkatmu, melainkan **konsistensi, rasa ingin tahu, dan kemauan untuk mencari solusi** dengan apa yang kamu miliki saat ini.`,
    content_id: `Banyak yang mengira untuk bisa membuat website modern berstandar industri, kita harus selalu standby di depan laptop atau PC dengan spesifikasi tinggi. Pandangan itu tidak salah, tapi juga tidak sepenuhnya benar di era sekarang.

Ada kalanya aku sedang di luar rumah, dalam perjalanan, atau memang perangkat utama yang paling cepat dijangkau hanyalah **smartphone** di genggaman tangan. Daripada HP cuma dipakai scrolling media sosial tanpa tujuan, aku mulai bereksperimen: *bisa nggak sih sebuah website yang responsif, cepat, dan siap rilis diproduksi hanya bermodal HP?*

Ternyata jawabannya: **bisa banget**. Dengan kombinasi alat yang tepat, keterbatasan layar kecil dan keyboard sentuh bisa teratasi dengan sangat mulus. Berikut adalah alur kerja (workflow) nyata yang aku pakai.

### 1. Merancang dan Menulis Kode dengan Google AI Studio

Tantangan nomor satu saat ngoding di smartphone adalah mengetik ratusan baris kode secara manual di layar sentuh. Jarang ada orang yang tahan mengetik tag HTML, CSS utility, dan TypeScript function satu per satu dengan jempol.

Di sinilah **Google AI Studio** menjadi game changer.

Google AI Studio aku manfaatkan langsung dari browser mobile sebagai partner coding cerdas. Bukan sekadar chatbot biasa, melainkan lingkungan penalaran (reasoning) yang kuat dengan model Gemini. 

Alur yang aku lakukan:
- **Merancang Konsep & Arsitektur**: Aku jelaskan struktur komponen yang diinginkan, hierarki state, dan styling Tailwind CSS yang bersih.
- **Generasi Komponen Presisi**: Google AI Studio menghasilkan potongan komponen React, logic helper, dan struktur type safety secara cepat dan rapi.
- **Refactoring & Debugging Instan**: Ketika ada error pada build atau logika yang kurang pas, aku cukup menyalin log kesalahan dan membiarkan AI menganalisis solusinya secara terstruktur.

Dengan cara ini, 80% beban mengetik manual terpangkas. Peran kita beralih menjadi **arsitek sistem** yang mengarahkan logika, estetika, dan kualitas fungsional aplikasi.

### 2. Mengoperasikan Git dan Repository Lewat Termux

Setelah kodenya siap, bagaimana cara kita menyimpan perubahan ke repository GitHub dari HP?

Jawabannya adalah **Termux**. Bagi yang belum tahu, Termux adalah emulator terminal Linux untuk sistem operasi Android yang bekerja langsung tanpa perlu root perangkat.

Di dalam Termux, aku bisa menjalankan perintah Git lengkap seperti di terminal komputer:
- Menyimpan kredensial dan **SSH Key** yang terhubung aman ke akun GitHub.
- Mengkloning repository proyek ke direktori lokal HP.
- Mengelola cabang (branch), meninjau perubahan dengan **git status** dan **git diff**.
- Melakukan staging dan commit: \`git add .\` dilanjutkan dengan \`git commit -m "update fitur"\`.
- Mendorong kode langsung ke repository utama: **git push origin main**.

Termux membuat pengoperasian Git di HP terasa sangat ringan, cepat, dan sepenuhnya profesional.

### 3. Deploy Otomatis dan Cepat Menggunakan Cloudflare

Bagian paling memuaskan dari seluruh alur ini adalah proses deployment. Kita tidak perlu pusing menyewa VPS mahal atau mengatur konfigurasi server yang rumit dari layar HP.

Aku menghubungkan repository GitHub langsung ke **Cloudflare Pages**.

Setiap kali aku menjalankan perintah **git push** dari Termux, Cloudflare secara otomatis:
- Mendeteksi commit terbaru di repository.
- Menjalankan proses build sistem (Vite / React build) di edge infrastructure mereka.
- Mendistribusikan website ke ratusan data center Cloudflare di seluruh dunia dalam hitungan detik.

Hasilnya, website langsung tayang secara global dengan performa super cepat, sertifikat SSL gratis, dan perlindungan keamanan bawaan. Bahkan fitur **preview deployment** memungkinkan aku mengecek hasil perubahan di branch lain sebelum digabungkan ke produksi.

### 4. Tips Nyaman Ngoding di Smartphone

Biar prosesnya tetap nyaman dan tidak membuat mata atau jemari lelah, ini beberapa tips praktis yang aku terapkan:
- **Gunakan Keyboard yang Ramah Koding**: Pasang aplikasi keyboard seperti **Hacker's Keyboard** yang menyediakan tombol Tab, Ctrl, Esc, dan tanda kurung kurawal yang mudah dijangkau.
- **Gunakan Keyboard Bluetooth**: Jika sedang duduk di kafe atau meja kerja santai, sambungkan keyboard mini nirkabel. Ini langsung mengubah HP menjadi mini workstation.
- **Bagi Layar (Split Screen)**: Manfaatkan fitur split-screen Android untuk membuka Termux di bagian bawah dan browser Google AI Studio di bagian atas secara bersamaan.

### Kesimpulan

Ketiadaan laptop atau PC bukanlah penghalang untuk mulai berkarya dan membangun solusi digital. Kombinasi antara kecerdasan **Google AI Studio**, ketangguhan terminal **Termux**, dan kemudahan deployment di **Cloudflare** membuktikan bahwa sebuah smartphone biasa sudah cukup untuk meluncurkan karya ke panggung dunia.

Yang terpenting bukan seberapa mewah perangkatmu, melainkan **konsistensi, rasa ingin tahu, dan kemauan untuk mencari solusi** dengan apa yang kamu miliki saat ini.`,
    content_en: `Many believe that building modern, industry-standard web applications requires constantly sitting in front of a high-end laptop or PC. While a workstation is ideal, that mindset is no longer a strict prerequisite today.

There are times when you are traveling, commuting, or simply only have your **smartphone** within arm's reach. Rather than using my phone solely for mindless social media scrolling, I decided to experiment: *Can a fast, responsive, production-ready website be built and deployed entirely from a mobile phone?*

The answer is a resounding **yes**. With the right workflow and modern tools, the constraints of small touchscreens and virtual keyboards vanish. Here is the real-world workflow I rely on.

### 1. Designing & Writing Code with Google AI Studio

The biggest hurdle when developing software on a mobile phone is manual typing. Typing hundreds of lines of HTML tags, Tailwind classes, and TypeScript functions on a touch keyboard is both inefficient and exhausting.

This is where **Google AI Studio** becomes an indispensable game changer.

I access Google AI Studio directly through my mobile browser as an intelligent engineering collaborator. Powered by cutting-edge Gemini reasoning models, it is far more than a standard chatbot:
- **Architectural Brainstorming**: I define component hierarchies, responsive layout goals, and clean color schemes.
- **Precise Component Generation**: Google AI Studio creates modular React components, typed utility functions, and responsive layouts cleanly.
- **Rapid Debugging**: Whenever a compilation or runtime error occurs, I simply paste the error log, and the model diagnoses and resolves the root cause within seconds.

This eliminates 80% of tedious manual keystrokes, allowing me to act as the **system architect** directing code quality, visual aesthetics, and application logic.

### 2. Version Control & Git Operations with Termux

Once the codebase is drafted and refined, how do you manage version control and sync changes with GitHub directly from Android?

The solution is **Termux**. Termux is a powerful Linux environment and terminal emulator for Android that runs out of the box without requiring root access.

Inside Termux, I perform the exact same Git operations I would run on a desktop terminal:
- Configuring secure **SSH keys** connected to my GitHub account.
- Cloning project repositories straight to mobile storage.
- Inspecting working directories with **git status** and **git diff**.
- Staging and committing changes with \`git add .\` and \`git commit -m "feat: new component"\`.
- Pushing updates directly upstream using **git push origin main**.

Termux turns a mobile phone into a lightweight, capable terminal for professional version control.

### 3. Automated Global Deployment with Cloudflare

The final and most gratifying stage of this pipeline is deployment. There is no need to manually manage complex servers or expensive cloud VPS setups from a phone.

By connecting the GitHub repository to **Cloudflare Pages**, the entire CI/CD process is automated:
- Cloudflare immediately detects any new commit pushed from Termux.
- It triggers a fast automated production build on Cloudflare's edge infrastructure.
- The compiled assets are deployed across hundreds of edge data centers worldwide within seconds.

The result is blazing fast page speeds, zero server maintenance, automated SSL certificates, and instant preview links for every branch test.

### 4. Practical Mobile Development Tips

To keep mobile coding comfortable and productive:
- **Coding Keyboards**: Install keyboards like **Hacker's Keyboard**, which feature dedicated arrow keys, Tab, Esc, and easy-access programming symbols.
- **Bluetooth Keyboard**: When working from a desk or coffee shop, pairing a small Bluetooth keyboard transforms your phone into a compact workstation.
- **Split-Screen Multitasking**: Use Android's native split-screen to run Termux alongside Google AI Studio in Chrome simultaneously.

### Conclusion

Not having a laptop or high-end PC is no longer an excuse to stop learning, building, and launching digital products. The combination of **Google AI Studio** for intelligent architecture, **Termux** for robust Git operations, and **Cloudflare** for edge deployment proves that a smartphone is all you need to bring your ideas to life.

What matters most is not the luxury of your hardware, but your **curiosity, consistency, and resourcefulness**.`,
  },
];
