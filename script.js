/* =====================================================
   ISI DATA KONTAK ANDA DI SINI (cukup bagian ini saja)
   - email    : alamat email, contoh "namaanda@gmail.com"
   - whatsapp : nomor format 62, tanpa +, spasi, atau 0 di depan
                contoh "6281234567890"
   - github   : username GitHub saja, contoh "usernameanda"
   Biarkan "" (kosong) jika belum ingin ditampilkan.
   ===================================================== */
const KONTAK = {
  email: "qarydzakia@gmail.com",
  whatsapp: "+62 881-8491-533",
  github: "Qarstar"
};

const $ = (selector, parent = document) => parent.querySelector(selector);
const $$ = (selector, parent = document) => [...parent.querySelectorAll(selector)];

/* 1. Mengisi tautan kontak dari data di atas */
function isiKontak() {
  const format = {
    email:    { href: v => "mailto:" + v,                          teks: v => v },
    whatsapp: { href: v => "https://wa.me/" + v.replace(/\D/g, ""), teks: v => "+" + v.replace(/\D/g, "") },
    github:   { href: v => "https://github.com/" + v,              teks: v => "github.com/" + v }
  };
  Object.keys(format).forEach(kunci => {
    const el = $("#kontak-" + kunci);
    const nilai = (KONTAK[kunci] || "").trim();
    if (!el || !nilai) return;
    el.href = format[kunci].href(nilai);
    $("b", el).textContent = format[kunci].teks(nilai);
    if (kunci !== "email") {
      el.target = "_blank";
      el.rel = "noopener noreferrer";
    }
  });
}

/* 2. Menu untuk layar HP */
function aturMenu() {
  const menu = $("#menu");
  const burger = $("#burger");
  const tutup = () => {
    menu.classList.remove("open");
    burger.setAttribute("aria-expanded", "false");
    burger.textContent = "☰";
  };
  burger.addEventListener("click", () => {
    const buka = menu.classList.toggle("open");
    burger.setAttribute("aria-expanded", String(buka));
    burger.textContent = buka ? "✕" : "☰";
  });
  $$("#menu a").forEach(a => a.addEventListener("click", tutup));
  document.addEventListener("keydown", e => { if (e.key === "Escape") tutup(); });
}

/* 3. Menandai menu sesuai bagian yang sedang dilihat */
function tandaiMenuAktif() {
  const tautan = $$("#menu a");
  const pengamat = new IntersectionObserver(daftar => {
    daftar.forEach(item => {
      if (!item.isIntersecting) return;
      tautan.forEach(a => a.classList.toggle("active", a.getAttribute("href") === "#" + item.target.id));
    });
  }, { rootMargin: "-45% 0px -50% 0px" });
  tautan.forEach(a => {
    const bagian = $(a.getAttribute("href"));
    if (bagian) pengamat.observe(bagian);
  });
}

/* 4. Tahun otomatis di footer */
function isiTahun() {
  const el = $("#tahun");
  if (el) el.textContent = new Date().getFullYear();
}

isiKontak();
aturMenu();
tandaiMenuAktif();
isiTahun();
