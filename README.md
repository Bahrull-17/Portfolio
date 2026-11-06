# Portfolio — Bahrul Ulum

```
Portfolio/
├── index.html                  # Satu halaman, dibagi per section (INTRO, NAVBAR, HOME, ABOUT, PROJECT, SERVICES, CONTACT, FOOTER)
└── assets/
    ├── css/
    │   ├── base.css            # Gaya global (body, scroll, autofill)
    │   └── animations.css      # Keyframes intro + sistem scroll-reveal
    ├── js/
    │   ├── intro.js            # Layar intro, lalu memicu event "portfolio:ready"
    │   ├── navigation.js       # Menu mobile + highlight menu aktif
    │   ├── scroll-reveal.js    # Animasi saat di-scroll
    │   └── contact-form.js     # Form Formspree + notifikasi
    ├── images/                 # Foto & screenshot project (unused/ = belum dipakai di halaman)
    └── docs/cv-bahrul-ulum.pdf
```

## Menambah animasi scroll
Cukup tambahkan atribut pada elemen apa pun:

```html
<div data-reveal="up">…</div>      <!-- up | down | left | right | zoom | fade -->
<div data-reveal="up" data-reveal-delay="0.3">…</div>   <!-- jeda manual (detik) -->
```
Elemen yang muncul bersamaan otomatis diberi jeda bertahap. `left`/`right` otomatis menjadi `up` di layar < 1024px.

## Menambah project baru
Salin satu blok card di section `PROJECT` (yang punya `data-reveal="up"`), lalu ganti gambar, judul, tech, dan link.
