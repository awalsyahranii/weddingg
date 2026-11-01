/**
 * ====================================================================
 * UNDANGAN PERNIKAHAN DIGITAL - HARI & DILLA
 * Single Centralized Configuration & Full Interactive Engine
 * ====================================================================
 */

// ====================================================================
// URL Google Apps Script Web App untuk Google Spreadsheet
// Tempelkan URL Web App (/exec) dari Google Apps Script di sini:
// ====================================================================
const SPREADSHEET_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbw4PAv5rssSj-6_FtYD8kTv_TLxxT5OePRyawHHMPL_oM_gtbZP60PgQD4eD6h7Hc0EiA/exec";

// Helper untuk membaca Google Spreadsheet Web App URL (mendukung variabel, query string ?sheet=, atau localStorage)
function getSpreadsheetUrl() {
    if (SPREADSHEET_SCRIPT_URL && SPREADSHEET_SCRIPT_URL.trim() !== "") {
        return SPREADSHEET_SCRIPT_URL.trim();
    }
    try {
        const params = new URLSearchParams(window.location.search);
        const queryUrl = params.get('sheet') || params.get('sheet_url');
        if (queryUrl) {
            localStorage.setItem('wedding_spreadsheet_url', queryUrl);
            return queryUrl;
        }
    } catch (e) {}
    return localStorage.getItem('wedding_spreadsheet_url') || "";
}

const weddingData = {
    couple: {
        groom: {
            fullName: "Hari Irawal Muhammad, S.Kom",
            shortName: "Hari",
            title: "Mempelai Pria",
            parents: "Anak Ketiga dari Bapak Munir Husein Muhammad, S.Kom & Ibu Sitti Nurbaya",
            photo: "assets/foto/foto2.JPG",
            instagram: "https://www.instagram.com/hari_irawalmuh/",
            instagramUser: "@hari_irawalmuh"
        },
        bride: {
            fullName: "Nurpadilla",
            shortName: "Dilla",
            title: "Mempelai Wanita",
            parents: "Anak Kedua dari Bapak Alm. Ansari Ibrahim & Ibu Kasmawati",
            photo: "assets/foto/foto3.JPG",
            instagram: "https://www.instagram.com/nurpadilla_10/",
            instagramUser: "@nurpadilla_10"
        },
        combinedName: "Hari & Dilla",
        dateRange: "7 - 8 November 2026",
        mainDate: "Sabtu, 7 November 2026"
    },
    
    // Target Waktu Hitung Mundur: 7 November 2026, 10:00 WITA (UTC+8)
    countdown: {
        year: 2026,
        month: 10, // Bulan ke-10 (November, 0-indexed)
        day: 7,
        hour: 10,
        minute: 0,
        second: 0,
        targetTimestamp: new Date(2026, 10, 7, 10, 0, 0).getTime()
    },

    quote: {
        bismillah: "بِسْمِ اللّٰهِ الرَّحْمٰنِ الرَّحِيْمِ",
        arabic: "وَاَنْكِحُوا الْاَيَامٰى مِنْكُمْ وَالصّٰلِحِيْنَ مِنْ عِبَادِكُمْ وَاِمَاۤىِٕكُمْۗ اِنْ يَّكُوْنُوْا فُقَرَاۤءَ يُغْنِهِمُ اللّٰهُ مِنْ فَضْلِهٖۗ وَاللّٰهُ وَاسِعٌ عَلِيْمٌ",
        text: '"Dan nikahkanlah orang-orang yang masih membujang di antara kamu, dan juga orang-orang yang layak (menikah) dari hamba-hamba sahayamu yang laki-laki dan perempuan. Jika mereka miskin, Allah akan memberi kemampuan kepada mereka dengan karunia-Nya. Dan Allah Maha Luas (pemberian-Nya), Maha Mengetahui."',
        source: "QS. An-Nur : 32"
    },

    events: {
        akad: {
            title: "Akad Nikah",
            date: "Sabtu, 7 November 2026",
            time: "Pukul 10:00 WITA",
            locationName: "Kediaman Mempelai Wanita",
            locationAddress: "Kaluku Bodoa, Kec. Tallo, Kota Makassar, Sulawesi Selatan (90163)",
            mapsQuery: "https://maps.app.goo.gl/sq3sRdZH3FFj4Lhc7"
        },
        resepsi: {
            title: "Resepsi Pernikahan",
            date: "Minggu, 8 November 2026",
            time: "Pukul 11:00 - 14:30 WITA",
            locationName: "Gedung Serbaguna Aisyiyah",
            locationAddress: "Jl. Jend. M. Jusuf / Jl. Gn. Bulusaraung No. 93, Kel. Pattunuang, Kec. Wajo, Kota Makassar, Sulawesi Selatan (90156)",
            mapsQuery: "https://maps.app.goo.gl/tcAZAQ18Gau8zuqt7"
        }
    },

    bankAccounts: [
        {
            bank: "MANDIRI",
            bankClass: "mandiri",
            accountNumber: "1740003066495",
            accountHolder: "HARI IRAWAL MUHAMMAD",
            elementId: "rek-mandiri"
        }
    ],

    physicalGift: {
        recipient: "Hari Irawal Muhammad / Nurpadilla",
        phone: "081524098247",
        address: "Gedung Serbaguna Aisyiyah, Jl. Jend. M. Jusuf / Jl. Gn. Bulusaraung No. 93, Kel. Pattunuang, Kec. Wajo, Kota Makassar, Sulawesi Selatan (90156)",
        waText: "Halo Hari & Dilla, saya ingin konfirmasi pengiriman kado pernikahan..."
    },

    gallery: [
        { src: "assets/foto/foto4.JPG", caption: "The Sacred Vow - Hari & Dilla" },
        { src: "assets/foto/foto1.JPG", caption: "Golden Hour Promise - Di Bawah Langit Senja" },
        { src: "assets/foto/foto2.JPG", caption: "Eternal Blossom - Mahligai Kasih" },
        { src: "assets/foto/foto3.JPG", caption: "Tahta Kasih - Bersanding Bersama" },
        { src: "assets/foto/foto7.JPG", caption: "The Groom - Hari Irawal Muhammad, S.Kom" },
        { src: "assets/foto/foto6.JPG", caption: "The Bride - Nurpadilla" },
        { src: "assets/foto/foto5.JPG", caption: "Tatapan Kasih - Janji Suci" },
        { src: "assets/foto/foto8.JPG", caption: "Jejak Tradisi - Aksara Lontara" },
        { src: "assets/foto/foto9.JPG", caption: "Harmoni Jiwa - Kasih Selaras" },
        { src: "assets/foto/foto10.JPG", caption: "Cita & Kasih - Senyuman Abadi" },
        { src: "assets/foto/foto11.JPG", caption: "Pelukan Takdir - Langkah Bersama" },
        { src: "assets/foto/foto12.JPG", caption: "Duduk Bersimpuh Adat - Mappasikarawa" },
        { src: "assets/foto/foto13.JPG", caption: "Together to Jannah - Menuju Keabadian" }
    ],

    defaultWishes: [
        {
            id: 1,
            name: "Aditya Pratama & Keluarga",
            attendance: "Hadir",
            guestCount: "2 Orang",
            message: "Barakallahu lakum wa baraka alaikum wa jama'a bainakuma fii khair. Selamat menempuh hidup baru Hari & Dilla! Semoga selalu dipenuhi keberkahan, sakinah, mawaddah, warahmah.",
            time: "Baru saja",
            avatarBg: "#4a0e17"
        },
        {
            id: 2,
            name: "Siti Nurhaliza",
            attendance: "Hadir",
            guestCount: "1 Orang",
            message: "MasyaAllah selamat yaa Dilla & Hari! Ikut bahagia banget liat kalian akhirnya melangkah ke pelaminan. Lancar sampai hari H!",
            time: "2 jam yang lalu",
            avatarBg: "#961c36"
        },
        {
            id: 3,
            name: "Dimas Anggara",
            attendance: "Tidak Hadir",
            guestCount: "1 Orang",
            message: "Selamat berbahagia Hari & Dilla! Mohon maaf belum bisa hadir langsung karena dinas luar kota. Doa terbaik untuk kalian berdua!",
            time: "1 hari yang lalu",
            avatarBg: "#7d182e"
        }
    ]
};

// ====================================================================
// 2. PARSING PARAMETER NAMA TAMU DARI URL (?to=... atau ?nama=...)
// Mendukung tanda '&', spasi '+', dan nama panjang tanpa batas kata
// ====================================================================
function initGuestName() {
    const search = window.location.search || '';
    const href = window.location.href || '';
    const guestNameEl = document.getElementById('guestName');
    const rsvpNameInput = document.getElementById('wishes-name');

    let raw = '';

    // 1. Ekstrak string nama secara utuh (termasuk karakter '&' yang biasanya terpotong oleh URLSearchParams)
    const match = (search || href).match(/[?&](?:to|nama|u|tamu|undangan)=([^#]*)/i);
    if (match && match[1]) {
        raw = match[1];
        // Pisahkan jika ada parameter sistem lain seperti &sheet= atau &open=
        const splitByKnown = raw.split(/&(?:sheet|sheet_url|open)=/i);
        raw = splitByKnown[0];
    } else {
        try {
            const urlParams = new URLSearchParams(search);
            raw = urlParams.get('to') || urlParams.get('nama') || urlParams.get('u') || urlParams.get('tamu') || '';
        } catch (e) {}
    }

    let formattedName = "Tamu Undangan";

    if (raw && raw.trim() !== "") {
        // Amankan '%2B' (literal tanda tambah) agar tidak tertukar dengan spasi
        let processed = raw.replace(/%2B/gi, '___PLUS_CHAR___');

        // Decode URL encoding secara aman
        try {
            processed = decodeURIComponent(processed);
        } catch (e) {
            try {
                processed = decodeURIComponent(processed.replace(/%(?![0-9a-fA-F]{2})/g, '%25'));
            } catch (e2) {
                // Biarkan apa adanya jika decode gagal
            }
        }

        // Tangani variasi penulisan '&' di URL (misal: '+&+' atau ' & ')
        processed = processed.replace(/\+\s*&\s*\+/g, ' & ');
        processed = processed.replace(/\s*&\s*/g, ' & ');

        // Ubah semua tanda '+' pemisah kata menjadi spasi
        processed = processed.replace(/\+/g, ' ');

        // Kembalikan literal '+' jika ada yang menggunakan %2B
        processed = processed.replace(/___PLUS_CHAR___/g, '+');

        // Bersihkan spasi berlebih
        formattedName = processed.replace(/\s+/g, ' ').trim();
    }

    if (guestNameEl) {
        guestNameEl.textContent = formattedName;
    }

    // Auto-fill nama di form RSVP jika ada nama tamu di URL
    if (rsvpNameInput && raw && formattedName !== "Tamu Undangan") {
        rsvpNameInput.value = formattedName;
    }
}

// ====================================================================
// 3. TOAST NOTIFICATION UTILITY
// ====================================================================
let toastTimeout = null;
function showToast(message) {
    const toast = document.getElementById('toast');
    if (!toast) return;

    toast.textContent = message;
    toast.classList.add('show');

    if (toastTimeout) clearTimeout(toastTimeout);
    toastTimeout = setTimeout(() => {
        toast.classList.remove('show');
    }, 2500);
}

// ====================================================================
// 4. LOGIKA BUKA UNDANGAN, CONFETTI, DAUN, & AUDIO
// ====================================================================
const btnOpen = document.getElementById('btn-open-invite');
const coverPage = document.getElementById('cover-page');
const bodyRoot = document.getElementById('body-root');
const musicBtn = document.getElementById('musicBtn');
const bgMusic = document.getElementById('bg-music');
const musicIcon = document.getElementById('music-icon');
const floatingMenu = document.getElementById('floatingMenu');

let isMusicPlaying = false;
let hasUserManuallyPaused = false;

// Fungsi terpercaya untuk memutar lagu latar Payung Teduh - Akad
function forcePlayAudio() {
    if (!bgMusic) return;

    bgMusic.volume = 1.0;
    const playPromise = bgMusic.play();

    if (playPromise !== undefined) {
        playPromise.then(() => {
            isMusicPlaying = true;
            if (musicIcon) musicIcon.className = 'fa-solid fa-volume-high';
            if (musicBtn) musicBtn.classList.remove('paused');
        }).catch(err => {
            console.warn("Autoplay ditahan oleh kebijakan browser (perlu sentuhan/klik pengguna):", err);
            isMusicPlaying = false;
            if (musicIcon) musicIcon.className = 'fa-solid fa-volume-xmark';
            if (musicBtn) musicBtn.classList.add('paused');
        });
    }
}

if (btnOpen) {
    btnOpen.addEventListener('click', function () {
        // 1. Efek partikel pembuka (confetti)
        createConfetti();

        // 2. Mulai efek daun berguguran
        startFallingLeaves();

        // 3. Animasi cover menghilang ke atas
        if (coverPage) {
            coverPage.classList.add('cover-hidden');
        }

        // 4. Aktifkan scroll pada halaman
        if (bodyRoot) {
            bodyRoot.classList.add('scroll-enabled');
        }

        // 5. Munculkan Floating Navigation & Floating Music Button
        if (floatingMenu) floatingMenu.style.display = 'block';
        if (musicBtn) musicBtn.style.display = 'flex';

        // 6. Putar lagu Payung Teduh - Akad langsung saat tombol diklik
        hasUserManuallyPaused = false;
        forcePlayAudio();

        // 7. Bersihkan cover dari alur setelah transisi selesai
        setTimeout(() => {
            if (coverPage) coverPage.style.display = 'none';
        }, 1000);
    });
}

// ====================================================================
// 5. FLOATING MUSIC BUTTON (PLAY / PAUSE) & FALLBACK INTERAKSI
// ====================================================================
if (musicBtn) {
    musicBtn.addEventListener('click', function (e) {
        e.stopPropagation();
        if (bgMusic && !bgMusic.paused) {
            bgMusic.pause();
            isMusicPlaying = false;
            hasUserManuallyPaused = true;
            if (musicIcon) musicIcon.className = 'fa-solid fa-volume-xmark';
            musicBtn.classList.add('paused');
        } else if (bgMusic) {
            hasUserManuallyPaused = false;
            forcePlayAudio();
        }
    });
}

// Jika lagu sempat dicegah autoplay oleh browser, putar saat pengguna pertama kali berinteraksi setelah cover dibuka
function handleFirstUserInteraction() {
    if (hasUserManuallyPaused) return;
    if (coverPage && !coverPage.classList.contains('cover-hidden')) return;
    if (bgMusic && bgMusic.paused) {
        forcePlayAudio();
    }
}

window.addEventListener('scroll', handleFirstUserInteraction, { passive: true });
window.addEventListener('touchstart', handleFirstUserInteraction, { passive: true });
window.addEventListener('click', handleFirstUserInteraction, { passive: true });

// ====================================================================
// 6. CONFETTI BLAST EFFECT
// ====================================================================
function createConfetti() {
    const particleCount = 70;
    const colors = ['white', 'red', 'dark-red', 'gold'];
    const shapes = ['', 'circle'];

    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'plastic-particle';

        const randomColor = colors[Math.floor(Math.random() * colors.length)];
        const randomShape = shapes[Math.floor(Math.random() * shapes.length)];
        
        particle.classList.add(randomColor);
        if (randomShape) particle.classList.add(randomShape);

        const tx = (Math.random() - 0.5) * window.innerWidth * 1.6 + 'px';
        const ty = (Math.random() - 0.5) * window.innerHeight * 1.4 + (window.innerHeight * 0.1) + 'px';
        const rot = Math.random() * 1080 + 'deg';

        particle.style.setProperty('--tx', tx);
        particle.style.setProperty('--ty', ty);
        particle.style.setProperty('--rot', rot);
        particle.style.animationDuration = (1.4 + Math.random() * 1.4) + 's';

        document.body.appendChild(particle);

        setTimeout(() => {
            particle.remove();
        }, 3000);
    }
}

// ====================================================================
// 7. ANIMASI DAUN BERGUGURAN (FALLING LEAVES & PETALS)
// ====================================================================
const leafImages = [
    'assets/images/daun-1.png',
    'assets/images/daun-2.png'
];

let leavesInterval = null;

function createLeaf(isInitial = false) {
    const container = document.getElementById('leaves-container');
    if (!container) return;

    const leafWrapper = document.createElement('div');
    leafWrapper.className = 'leaf-wrapper';

    const leafImg = document.createElement('div');
    leafImg.className = 'leaf-img';

    const randomImg = leafImages[Math.floor(Math.random() * leafImages.length)];
    leafImg.style.backgroundImage = `url("${randomImg}")`;

    // Ukuran acak antara 20px - 38px
    const size = Math.floor(Math.random() * 18) + 20;
    leafImg.style.width = `${size}px`;
    leafImg.style.height = `${Math.floor(size * 1.2)}px`;

    // Posisi horizontal acak 2% - 96%
    const startX = Math.random() * 94 + 2;
    leafWrapper.style.left = `${startX}vw`;

    // Durasi animasi
    const fallDuration = 9 + Math.random() * 6;
    const swayDuration = 2.5 + Math.random() * 2;
    const rotateDuration = 3.5 + Math.random() * 3.5;
    const rotateAnim = Math.random() > 0.5 ? 'leafRotate1' : 'leafRotate2';

    leafImg.style.animation = `leafSway ${swayDuration}s ease-in-out infinite alternate, ${rotateAnim} ${rotateDuration}s ease-in-out infinite`;

    if (isInitial) {
        const startY = Math.random() * 70; // dalam vh
        leafWrapper.style.top = `${startY}vh`;
        const remainingDuration = Math.max(3, fallDuration * (1 - startY / 100));
        leafWrapper.style.animation = `leafFallInitial ${remainingDuration}s linear forwards`;
        
        setTimeout(() => {
            leafWrapper.remove();
        }, remainingDuration * 1000 + 500);
    } else {
        leafWrapper.style.animation = `leafFall ${fallDuration}s linear forwards`;
        
        setTimeout(() => {
            leafWrapper.remove();
        }, fallDuration * 1000 + 500);
    }

    leafWrapper.appendChild(leafImg);
    container.appendChild(leafWrapper);
}

function startFallingLeaves() {
    if (leavesInterval) return;

    // Daun awal di layar
    for (let i = 0; i < 6; i++) {
        createLeaf(true);
    }

    // Daun berulang berkala
    leavesInterval = setInterval(() => {
        if (!document.hidden) {
            createLeaf(false);
        }
    }, 1300);
}

// ====================================================================
// 8. REALTIME COUNTDOWN TIMER
// ====================================================================
function initCountdown() {
    const target = weddingData.countdown.targetTimestamp;
    const hariEl = document.getElementById("hari");
    const jamEl = document.getElementById("jam");
    const menitEl = document.getElementById("menit");
    const detikEl = document.getElementById("detik");
    const statusEl = document.getElementById("countdown-status");

    function updateTimer() {
        const now = new Date().getTime();
        const distance = target - now;

        if (distance <= 0) {
            if (hariEl) hariEl.textContent = "00";
            if (jamEl) jamEl.textContent = "00";
            if (menitEl) menitEl.textContent = "00";
            if (detikEl) detikEl.textContent = "00";
            if (statusEl) statusEl.textContent = "🎉 Acara telah dimulai. Selamat Menjalani Hari Bahagia!";
            return;
        }

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        if (hariEl) hariEl.textContent = days < 10 ? "0" + days : days;
        if (jamEl) jamEl.textContent = hours < 10 ? "0" + hours : hours;
        if (menitEl) menitEl.textContent = minutes < 10 ? "0" + minutes : minutes;
        if (detikEl) detikEl.textContent = seconds < 10 ? "0" + seconds : seconds;
    }

    updateTimer();
    setInterval(updateTimer, 1000);
}

// ====================================================================
// 9. ANIMASI FADE-IN SAAT SCROLL (INTERSECTION OBSERVER)
// ====================================================================
function initScrollAnimations() {
    const faders = document.querySelectorAll('.fade-in');
    if (!faders.length) return;

    const appearOptions = {
        threshold: 0.12,
        rootMargin: "0px 0px -40px 0px"
    };

    const appearOnScroll = new IntersectionObserver(function (entries, observer) {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            entry.target.classList.add("appear");
            observer.unobserve(entry.target);
        });
    }, appearOptions);

    faders.forEach(fader => {
        appearOnScroll.observe(fader);
    });
}

// ====================================================================
// 10. SCROLLSPY UNTUK FLOATING MENU
// ====================================================================
function initScrollSpy() {
    const sections = document.querySelectorAll('section[id], div[id="home"]');
    const navLinks = document.querySelectorAll('.floating-menu .nav-link');

    if (!sections.length || !navLinks.length) return;

    window.addEventListener('scroll', () => {
        let current = '';
        const scrollPosition = window.pageYOffset + 200;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    }, { passive: true });
}

// ====================================================================
// 11. LIGHTBOX MODAL GALERI FOTO
// ====================================================================
let currentGalleryIndex = 0;

function initGalleryLightbox() {
    const galleryItems = document.querySelectorAll('.gallery-item');
    const modal = document.getElementById('lightbox-modal');
    const modalImg = document.getElementById('lightbox-img');
    const modalCaption = document.getElementById('lightbox-caption');
    const backdrop = document.getElementById('lightbox-backdrop');
    const closeBtn = document.getElementById('lightbox-close');
    const prevBtn = document.getElementById('lightbox-prev');
    const nextBtn = document.getElementById('lightbox-next');

    if (!modal || !modalImg) return;

    function openLightbox(index) {
        currentGalleryIndex = (index + weddingData.gallery.length) % weddingData.gallery.length;
        const item = weddingData.gallery[currentGalleryIndex];
        modalImg.src = item.src;
        if (modalCaption) modalCaption.textContent = item.caption;
        modal.classList.add('active');
        modal.setAttribute('aria-hidden', 'false');
    }

    function closeLightbox() {
        modal.classList.remove('active');
        modal.setAttribute('aria-hidden', 'true');
    }

    function showNext() {
        openLightbox(currentGalleryIndex + 1);
    }

    function showPrev() {
        openLightbox(currentGalleryIndex - 1);
    }

    galleryItems.forEach(item => {
        item.addEventListener('click', function () {
            const idx = parseInt(this.getAttribute('data-index'), 10) || 0;
            openLightbox(idx);
        });
    });

    if (closeBtn) closeBtn.addEventListener('click', closeLightbox);
    if (backdrop) backdrop.addEventListener('click', closeLightbox);
    if (nextBtn) nextBtn.addEventListener('click', showNext);
    if (prevBtn) prevBtn.addEventListener('click', showPrev);

    // Keyboard support
    document.addEventListener('keydown', function (e) {
        if (!modal.classList.contains('active')) return;
        if (e.key === 'Escape') closeLightbox();
        if (e.key === 'ArrowRight') showNext();
        if (e.key === 'ArrowLeft') showPrev();
    });
}

// ====================================================================
// 12. LOGIKA TOGGLE AMPLOP DIGITAL
// ====================================================================
const btnRevealGift = document.getElementById('btn-reveal-gift');
const giftCards = document.getElementById('gift-cards');

if (btnRevealGift && giftCards) {
    btnRevealGift.addEventListener('click', function () {
        if (giftCards.style.display === 'none' || giftCards.style.display === '') {
            giftCards.style.display = 'flex';
            btnRevealGift.innerHTML = '<i class="fa-solid fa-eye-slash"></i> Tutup Rekening &amp; Kado';
        } else {
            giftCards.style.display = 'none';
            btnRevealGift.innerHTML = '<i class="fa-solid fa-wallet"></i> Buka Rekening &amp; Kado';
        }
    });
}

// ====================================================================
// 13. FUNGSI COPY NOMOR REKENING & ALAMAT
// ====================================================================
window.copyText = function (elementId, btnElement) {
    const el = document.getElementById(elementId);
    if (!el) return;
    const textToCopy = el.innerText.trim();

    copyToClipboard(textToCopy, () => {
        const originalHtml = btnElement.innerHTML;
        btnElement.innerHTML = '<i class="fa-solid fa-check"></i> Tersalin!';
        btnElement.style.borderColor = '#28a745';
        btnElement.style.color = '#28a745';
        showToast("Nomor rekening berhasil disalin!");

        setTimeout(() => {
            btnElement.innerHTML = originalHtml;
            btnElement.style.borderColor = '';
            btnElement.style.color = '';
        }, 2000);
    });
};

window.copyAddress = function (btnElement) {
    const textToCopy = weddingData.physicalGift.address;

    copyToClipboard(textToCopy, () => {
        const originalHtml = btnElement.innerHTML;
        btnElement.innerHTML = '<i class="fa-solid fa-check"></i> Alamat Tersalin!';
        showToast("Alamat pengiriman berhasil disalin!");

        setTimeout(() => {
            btnElement.innerHTML = originalHtml;
        }, 2000);
    });
};

function copyToClipboard(text, onSuccess) {
    if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard.writeText(text).then(onSuccess).catch(() => fallbackCopy(text, onSuccess));
    } else {
        fallbackCopy(text, onSuccess);
    }
}

function fallbackCopy(text, onSuccess) {
    const textArea = document.createElement("textarea");
    textArea.value = text;
    textArea.style.position = "fixed";
    textArea.style.left = "-999999px";
    textArea.style.top = "-999999px";
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    try {
        document.execCommand('copy');
        if (onSuccess) onSuccess();
    } catch (err) {
        alert("Gagal menyalin otomatis: Silakan salin manual.");
    }
    textArea.remove();
}

// ====================================================================
// 14. BUKU UCAPAN & RSVP (GOOGLE SPREADSHEET & LOCALSTORAGE ENGINE)
// ====================================================================
const WISHES_STORAGE_KEY = 'wedding_wishes_hari_dilla_v1';

function getStoredWishes() {
    const data = localStorage.getItem(WISHES_STORAGE_KEY);
    if (!data) {
        localStorage.setItem(WISHES_STORAGE_KEY, JSON.stringify(weddingData.defaultWishes));
        return weddingData.defaultWishes;
    }
    try {
        const parsed = JSON.parse(data);
        return Array.isArray(parsed) && parsed.length > 0 ? parsed : weddingData.defaultWishes;
    } catch (e) {
        return weddingData.defaultWishes;
    }
}

function getInitials(name) {
    if (!name) return "U";
    const parts = name.trim().split(" ");
    if (parts.length === 1) return parts[0].substring(0, 2).toUpperCase();
    return (parts[0][0] + parts[1][0]).toUpperCase();
}

function getAttendanceBadge(attendance) {
    if (attendance === "Hadir") {
        return '<span class="badge-attend hadir"><i class="fa-solid fa-circle-check"></i> Hadir</span>';
    } else if (attendance === "Ragu-ragu") {
        return '<span class="badge-attend ragu"><i class="fa-solid fa-circle-question"></i> Ragu-ragu</span>';
    } else {
        return '<span class="badge-attend absen"><i class="fa-solid fa-circle-xmark"></i> Tidak Hadir</span>';
    }
}

function escapeHtml(text) {
    if (!text) return '';
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

function renderWishes(wishesArray = null) {
    const wishesListEl = document.getElementById('wishes-list');
    const totalCountEl = document.getElementById('wishes-total-count');
    if (!wishesListEl) return;

    const wishes = wishesArray || getStoredWishes();
    if (totalCountEl) totalCountEl.textContent = wishes.length;

    if (wishes.length === 0) {
        wishesListEl.innerHTML = '<p style="text-align: center; color: #889bb0; font-size: 0.85rem; padding: 20px;">Belum ada ucapan. Jadilah yang pertama mengirimkan do\'a restu!</p>';
        return;
    }

    wishesListEl.innerHTML = wishes.map(wish => {
        const initials = getInitials(wish.name);
        const badge = getAttendanceBadge(wish.attendance);
        const bg = wish.avatarBg || '#384e73';
        return `
            <div class="wish-card">
                <div class="wish-avatar" style="background-color: ${bg};">${initials}</div>
                <div class="wish-body">
                    <div class="wish-top">
                        <span class="wish-name">${escapeHtml(wish.name)}</span>
                        ${badge}
                    </div>
                    <div class="wish-time"><i class="fa-regular fa-clock"></i> ${escapeHtml(wish.time || 'Baru saja')} • ${escapeHtml(wish.guestCount || '1 Orang')}</div>
                    <p class="wish-message">${escapeHtml(wish.message)}</p>
                </div>
            </div>
        `;
    }).join('');
}

// Mengambil Data Ucapan Langsung dari Google Spreadsheet secara Realtime
async function fetchWishesFromSpreadsheet() {
    const url = getSpreadsheetUrl();
    if (!url || url.trim() === "") {
        renderWishes();
        return;
    }

    try {
        const response = await fetch(url);
        const json = await response.json();

        if (json.result === "success" && Array.isArray(json.data) && json.data.length > 0) {
            localStorage.setItem(WISHES_STORAGE_KEY, JSON.stringify(json.data));
            renderWishes(json.data);
            console.log(`Berhasil memuat ${json.data.length} ucapan dari Google Spreadsheet.`);
        } else {
            renderWishes();
        }
    } catch (err) {
        console.log("Fetch dari Google Sheets dialihkan ke data lokal:", err);
        renderWishes();
    }
}

// Mengirim Data Ucapan ke Google Spreadsheet via Google Apps Script
function sendWishToSpreadsheet(wishData) {
    const url = getSpreadsheetUrl();
    if (!url || url.trim() === "") {
        console.log("Catatan: Google Spreadsheet URL belum diisi. Ucapan tersimpan di penyimpanan browser.");
        return;
    }

    // Menggunakan FormData / URLSearchParams dengan mode no-cors untuk kompatibilitas penuh Google Apps Script
    const formData = new URLSearchParams();
    formData.append("nama", wishData.name);
    formData.append("kehadiran", wishData.attendance);
    formData.append("jumlah_tamu", wishData.guestCount);
    formData.append("ucapan", wishData.message);

    fetch(url, {
        method: "POST",
        mode: "no-cors",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        body: formData.toString()
    }).then(() => {
        console.log("Data RSVP & Ucapan berhasil dikirim ke Google Spreadsheet!");
    }).catch(err => {
        console.warn("POST gagal, mencoba fallback via GET:", err);
        const getUrl = `${url}?action=add&nama=${encodeURIComponent(wishData.name)}&kehadiran=${encodeURIComponent(wishData.attendance)}&jumlah_tamu=${encodeURIComponent(wishData.guestCount)}&ucapan=${encodeURIComponent(wishData.message)}`;
        fetch(getUrl, { mode: "no-cors" }).catch(e => console.error("Fallback GET gagal:", e));
    });
}

function initWishesForm() {
    const form = document.getElementById('wishes-form');
    const nameInput = document.getElementById('wishes-name');
    const attendanceInput = document.getElementById('wishes-attendance');
    const guestCountInput = document.getElementById('wishes-guest-count');
    const messageInput = document.getElementById('wishes-message');
    const submitBtn = document.getElementById('btn-submit-wish');

    if (!form) return;

    form.addEventListener('submit', function (e) {
        e.preventDefault();

        const name = nameInput.value.trim();
        const attendance = attendanceInput.value;
        const guestCount = guestCountInput ? guestCountInput.value : '1 Orang';
        const message = messageInput.value.trim();

        if (!name || !message) return;

        const avatarColors = ['#4a0e17', '#6b1426', '#961c36', '#7d182e', '#851b32'];
        const randomColor = avatarColors[Math.floor(Math.random() * avatarColors.length)];

        const now = new Date();
        const timeString = now.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' });

        const newWish = {
            id: Date.now(),
            name: name,
            attendance: attendance,
            guestCount: guestCount,
            message: message,
            time: `Hari ini, ${timeString} WITA`,
            avatarBg: randomColor
        };

        // 1. Simpan ke local storage & update UI secara instan (Zero Lag)
        const currentWishes = getStoredWishes();
        currentWishes.unshift(newWish);
        localStorage.setItem(WISHES_STORAGE_KEY, JSON.stringify(currentWishes));
        renderWishes(currentWishes);
        messageInput.value = '';

        // 2. Kirim secara background ke Google Spreadsheet
        sendWishToSpreadsheet(newWish);

        // 3. Tampilkan feedback sukses
        if (submitBtn) {
            submitBtn.disabled = true;
            submitBtn.innerHTML = '<i class="fa-solid fa-check"></i> Ucapan Terkirim!';
            submitBtn.style.background = '#28a745';
            showToast("Terima kasih! Ucapan & RSVP Anda telah tersimpan.");

            setTimeout(() => {
                submitBtn.disabled = false;
                submitBtn.innerHTML = '<i class="fa-solid fa-paper-plane"></i> Kirim Ucapan &amp; RSVP';
                submitBtn.style.background = '';
            }, 2500);
        }
    });
}

// ====================================================================
// 15. INISIALISASI SAAT HALAMAN DIMUAT (DOM READY)
// ====================================================================
document.addEventListener("DOMContentLoaded", function () {
    // 1. Parameter nama tamu
    initGuestName();

    // 2. Countdown realtime
    initCountdown();

    // 3. Scroll animations (IntersectionObserver)
    initScrollAnimations();

    // 4. Scrollspy navigation
    initScrollSpy();

    // 5. Galeri Foto & Lightbox Modal
    initGalleryLightbox();

    // 6. Buku Tamu / Ucapan (Load dari Google Sheets jika tersedia)
    fetchWishesFromSpreadsheet();
    initWishesForm();
});
