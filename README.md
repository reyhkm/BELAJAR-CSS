# CSS Quest - An Interactive CSS Learning Platform

Selamat datang di CSS Quest! Platform gamified ini dirancang untuk membuat pembelajaran CSS menjadi pengalaman yang menyenangkan dan visual. Selesaikan tantangan, dapatkan umpan balik instan, dan kuasai CSS dari dasar hingga mahir.

## Stack Teknologi

- **Framework**: React (dengan Vite)
- **Bahasa**: TypeScript
- **Styling**: Tailwind CSS (UI) & CSS biasa (Area Tantangan)
- **Manajemen State**: Zustand
- **Routing**: React Router DOM
- **Editor Kode**: CodeMirror
- **Animasi**: Framer Motion

## Menjalankan Proyek

1.  **Clone repository:**
    ```bash
    git clone <url-repository>
    cd css-quest-interactive-learning
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Jalankan development server:**
    ```bash
    npm run dev
    ```

    Aplikasi akan berjalan di `http://localhost:5173`.

## Arsitektur Proyek

Proyek ini memiliki arsitektur modular yang dirancang untuk kemudahan ekspansi.

-   `src/pages`: Berisi komponen halaman utama seperti `MapPage.tsx` (peta dunia) dan `ModulePage.tsx` (tampilan pembelajaran).
-   `src/components`: Komponen UI yang dapat digunakan kembali seperti `Header`, `VisualArena`, dll.
-   `src/stores`: Berisi state management global menggunakan Zustand. `progressStore.ts` adalah pusat dari semua data aplikasi.
-   `src/data/challenges`: **Ini adalah jantung dari konten pembelajaran.** Setiap file `.json` di sini mewakili satu "Dunia" atau modul pembelajaran.
-   `src/lib/validation.ts`: Berisi mesin validasi yang memeriksa apakah kode CSS pengguna cocok dengan solusi tantangan.
-   `src/types`: Definisi tipe TypeScript untuk data tantangan.

## Cara Kerja Mesin Validasi

Mesin validasi (`src/lib/validation.ts`) bersifat fleksibel dan dapat menangani berbagai jenis tantangan CSS.

Validasi dilakukan di dalam `VisualArena` (sebuah iframe) untuk mengisolasi style dan mendapatkan hasil yang akurat menggunakan `window.getComputedStyle()`.

Struktur `solution` dalam file JSON menentukan bagaimana validasi dilakukan:

1.  **`type: 'selector'`**: Digunakan untuk tantangan selektor. Logika akan memeriksa apakah selektor yang ditulis pengguna berhasil menargetkan elemen yang benar di dalam arena.
2.  **`type: 'style'`**: Digunakan untuk tantangan properti CSS. Logika akan memilih elemen target menggunakan `solution.selector` dan kemudian memeriksa setiap properti CSS yang tercantum di `solution.properties` untuk memastikan nilainya cocok.

## Cara Menambah Modul & Tantangan Baru

Menambahkan konten baru sangatlah mudah:

1.  **Buat File JSON Baru**: Buat file baru di `src/data/challenges/`, misalnya `transitions.json`.

2.  **Isi Konten Tantangan**: Ikuti struktur yang ada di file JSON lain (`selectors.json`, `box-model.json`). Pastikan setiap tantangan memiliki `id`, `title`, `instruction`, `html`, `cssStarter`, dan objek `solution` yang valid.

3.  **Daftarkan Modul Baru**: Buka `src/stores/progressStore.ts`. Di dalam fungsi `loadChallenges`, impor file JSON baru Anda dan tambahkan ke dalam objek `modulesData`.

    ```typescript
    // Di dalam progressStore.ts
    import transitionsChallenges from '@/data/challenges/transitions.json';

    // ... di dalam loadChallenges
    const modulesData = {
      // ...modul yang sudah ada
      transitions: {
        name: "The Transition & Animation Volcano",
        challenges: transitionsChallenges,
      },
    };
    ```

4.  **Selesai!** Aplikasi akan secara otomatis menampilkan dunia baru di peta dan membuatnya dapat diakses.
