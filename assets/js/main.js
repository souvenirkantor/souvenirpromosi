/**
* Template Name: Rival
* Template URL: https://bootstrapmade.com/rival-bootstrap-website-template/
* Updated: Apr 23 2026 with Bootstrap v5.3.8
* Author: BootstrapMade.com
* License: https://bootstrapmade.com/license/
*/

(function() {
  "use strict";

  /**
   * Apply .scrolled class to the body as the page is scrolled down
   */
  function toggleScrolled() {
    const selectBody = document.querySelector('body');
    const selectHeader = document.querySelector('#header');
    if (!selectHeader.classList.contains('scroll-up-sticky') && !selectHeader.classList.contains('sticky-top') && !selectHeader.classList.contains('fixed-top')) return;
    window.scrollY > 100 ? selectBody.classList.add('scrolled') : selectBody.classList.remove('scrolled');
  }

  document.addEventListener('scroll', toggleScrolled);
  window.addEventListener('load', toggleScrolled);

  /**
   * Mobile nav toggle
   */
  const mobileNavToggleBtn = document.querySelector('.mobile-nav-toggle');

  function mobileNavToogle() {
    document.querySelector('body').classList.toggle('mobile-nav-active');
    mobileNavToggleBtn.classList.toggle('bi-list');
    mobileNavToggleBtn.classList.toggle('bi-x');
  }
  if (mobileNavToggleBtn) {
    mobileNavToggleBtn.addEventListener('click', mobileNavToogle);
  }

  /**
   * Hide mobile nav on same-page/hash links
   */
  document.querySelectorAll('#navmenu a').forEach(navmenu => {
    navmenu.addEventListener('click', () => {
      if (document.querySelector('.mobile-nav-active') && !navmenu.classList.contains('toggle-dropdown')) {
        mobileNavToogle();
      }
    });

  });

  /**
   * Toggle mobile nav dropdowns
   */
  document.querySelectorAll('.navmenu .toggle-dropdown').forEach(navmenu => {
    navmenu.addEventListener('click', function(e) {
      e.preventDefault();
      this.parentNode.classList.toggle('active');
      this.parentNode.nextElementSibling.classList.toggle('dropdown-active');
      e.stopImmediatePropagation();
    });
  });

  /**
   * Preloader
   */
  const preloader = document.querySelector('#preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      preloader.remove();
    });
  }

  /**
   * Scroll top button
   */
  let scrollTop = document.querySelector('.scroll-top');

  function toggleScrollTop() {
    if (scrollTop) {
      window.scrollY > 100 ? scrollTop.classList.add('active') : scrollTop.classList.remove('active');
    }
  }
  scrollTop.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  window.addEventListener('load', toggleScrollTop);
  document.addEventListener('scroll', toggleScrollTop);

  /**
   * Animation on scroll function and init
   */
  function aosInit() {
    AOS.init({
      duration: 600,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    });
  }
  window.addEventListener('load', aosInit);

  /**
   * Initiate Pure Counter
   */
  new PureCounter();

  /**
   * Initiate glightbox
   */
  const glightbox = GLightbox({
    selector: '.glightbox'
  });

  /**
   * Init isotope layout and filters
   */
  document.querySelectorAll('.isotope-layout').forEach(function(isotopeItem) {
    let layout = isotopeItem.getAttribute('data-layout') ?? 'masonry';
    let filter = isotopeItem.getAttribute('data-default-filter') ?? '*';
    let sort = isotopeItem.getAttribute('data-sort') ?? 'original-order';

    let initIsotope;
    imagesLoaded(isotopeItem.querySelector('.isotope-container'), function() {
      initIsotope = new Isotope(isotopeItem.querySelector('.isotope-container'), {
        itemSelector: '.isotope-item',
        layoutMode: layout,
        filter: filter,
        sortBy: sort
      });

      // ==========================================
      // KODE TAMBAHAN 1: Jalankan filter otomatis jika ada hash di URL saat load halaman
      // ==========================================
      if (window.location.hash) {
        const hashFilter = decodeURIComponent(window.location.hash.substring(1));
        const targetTab = isotopeItem.querySelector(`.isotope-filters li[data-filter="${hashFilter}"]`);
        if (targetTab) {
          setTimeout(() => {
            targetTab.click();
            const portfolioSection = document.getElementById('portfolio');
            if (portfolioSection) {
              portfolioSection.scrollIntoView({ behavior: 'smooth' });
            }
          }, 200);
        }
      }
    });

    isotopeItem.querySelectorAll('.isotope-filters li').forEach(function(filters) {
      filters.addEventListener('click', function() {
        isotopeItem.querySelector('.isotope-filters .filter-active').classList.remove('filter-active');
        this.classList.add('filter-active');
        initIsotope.arrange({
          filter: this.getAttribute('data-filter')
        });
        if (typeof aosInit === 'function') {
          aosInit();
        }
      }, false);
    });

    // ==========================================
    // KODE TAMBAHAN 2: Deteksi klik menu footer jika berada di halaman yang SAMA
    // ==========================================
    document.querySelectorAll('.footer-filter-link').forEach(link => {
      link.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (window.location.pathname.includes('portfolio.html') || href.startsWith('portfolio.html')) {
          const targetHash = href.substring(href.indexOf('#'));
          window.location.hash = targetHash;
          
          const filterValue = decodeURIComponent(targetHash.substring(1));
          const targetTab = isotopeItem.querySelector(`.isotope-filters li[data-filter="${filterValue}"]`);
          if (targetTab) {
            targetTab.click();
            const portfolioSection = document.getElementById('portfolio');
            if (portfolioSection) {
              portfolioSection.scrollIntoView({ behavior: 'smooth' });
            }
          }
        }
      });
    });

  });

  /**
   * Init swiper sliders
   */
  function initSwiper() {
    document.querySelectorAll(".init-swiper").forEach(function(swiperElement) {
      let config = JSON.parse(
        swiperElement.querySelector(".swiper-config").innerHTML.trim()
      );

      if (swiperElement.classList.contains("swiper-tab")) {
        initSwiperWithCustomPagination(swiperElement, config);
      } else {
        new Swiper(swiperElement, config);
      }
    });
  }

  window.addEventListener("load", initSwiper);

  /**
   * Correct scrolling position upon page load for URLs containing hash links.
   */
  window.addEventListener('load', function(e) {
    if (window.location.hash) {
      if (document.querySelector(window.location.hash)) {
        setTimeout(() => {
          let section = document.querySelector(window.location.hash);
          let scrollMarginTop = getComputedStyle(section).scrollMarginTop;
          window.scrollTo({
            top: section.offsetTop - parseInt(scrollMarginTop),
            behavior: 'smooth'
          });
        }, 100);
      }
    }
  });

  /**
   * Navmenu Scrollspy
   */
  let navmenulinks = document.querySelectorAll('.navmenu a');

  function navmenuScrollspy() {
    navmenulinks.forEach(navmenulink => {
      if (!navmenulink.hash) return;
      let section = document.querySelector(navmenulink.hash);
      if (!section) return;
      let position = window.scrollY + 200;
      if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
        document.querySelectorAll('.navmenu a.active').forEach(link => link.classList.remove('active'));
        navmenulink.classList.add('active');
      } else {
        navmenulink.classList.remove('active');
      }
    })
  }
  window.addEventListener('load', navmenuScrollspy);
  document.addEventListener('scroll', navmenuScrollspy);

})();

document.addEventListener("DOMContentLoaded", () => {
    // Memilih semua kartu blog
    const blogCards = document.querySelectorAll('.blog-card');
    
    // Konfigurasi IntersectionObserver untuk efek transisi
    const blogObserverOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };

    const blogObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Munculkan kartu dengan efek naik ke atas
                entry.target.style.opacity = "1";
                entry.target.style.transform = "translateY(0)";
                // Hentikan pantauan setelah kartu muncul
                observer.unobserve(entry.target);
            }
        });
    }, blogObserverOptions);

    // Tetapkan state awal kartu sebelum discroll
    blogCards.forEach((card, index) => {
        card.style.opacity = "0";
        card.style.transform = "translateY(40px)";
        // Delay disesuaikan agar muncul bergantian secara estetik
        card.style.transition = `opacity 0.6s ease-out ${index * 0.15}s, transform 0.6s ease-out ${index * 0.15}s`;
        
        // Mulai memantau kartu
        blogObserver.observe(card);
    });
});

function sendToWhatsApp() {
  // Ambil data nilai dari input form tanpa merusak UI HTML
  const name = document.getElementById('inputName').value.trim();
  const email = document.getElementById('inputEmail').value.trim();
  const subject = document.getElementById('inputSubject').value.trim();
  const message = document.getElementById('inputMessage').value.trim();

  // Validasi kolom wajib diisi
  if (!name || !email || !subject || !message) {
    alert("Harap lengkapi seluruh kolom formulir terlebih dahulu!");
    return;
  }

  // Nomor WhatsApp admin tujuan (Silakan sesuaikan jika perlu)
  const nomorWA = "6288989643555"; 

  // Format pengiriman pesan teks WhatsApp
  const teksPesan = `Halo CorporateGifts.id, saya ingin mengirim formulir penawaran.%0A%0A` +
                    `*Nama:* ${encodeURIComponent(name)}%0A` +
                    `*Email:* ${encodeURIComponent(email)}%0A` +
                    `*Subjek:* ${encodeURIComponent(subject)}%0A` +
                    `*Pesan:*%0A${encodeURIComponent(message)}`;

  const urlWhatsApp = `https://wa.me/${nomorWA}?text=${teksPesan}`;

  // Buka URL tautan WhatsApp di tab baru secara aman
  window.open(urlWhatsApp, '_blank');
}

function sendToWhatsAppService() {
  // Ambil data khusus dari form halaman service detail
  const name = document.getElementById('inputNameService').value.trim();
  const email = document.getElementById('inputEmailService').value.trim();
  const phone = document.getElementById('inputPhoneService').value.trim();
  const subject = document.getElementById('inputSubjectService').value.trim();
  const message = document.getElementById('inputMessageService').value.trim();

  // Validasi khusus untuk memastikan input wajib sudah diisi
  if (!name || !email || !message) {
    alert("Harap lengkapi kolom nama, email, dan detail kebutuhan terlebih dahulu!");
    return;
  }

  // Nomor WhatsApp tujuan
  const nomorWA = "6288989643555"; 

  // Format pesan yang mencakup kolom telepon tambahan
  const teksPesan = `Halo CorporateGifts.id, saya ingin mendapatkan penawaran desain.%0A%0A` +
                    `*Nama:* ${encodeURIComponent(name)}%0A` +
                    `*Email:* ${encodeURIComponent(email)}%0A` +
                    `*Nomor Telepon:* ${encodeURIComponent(phone)}%0A` +
                    `*Subjek:* ${encodeURIComponent(subject)}%0A` +
                    `*Kebutuhan Desain:*%0A${encodeURIComponent(message)}`;

  // Buka tab WhatsApp
  const urlWhatsApp = `https://wa.me/${nomorWA}?text=${teksPesan}`;
  window.open(urlWhatsApp, '_blank');
}

function sendToWhatsAppBox() {
  // Ambil data nilai dari input form box
  const name = document.getElementById('inputNameBox').value.trim();
  const email = document.getElementById('inputEmailBox').value.trim();
  const phone = document.getElementById('inputPhoneBox').value.trim();
  const subject = document.getElementById('inputSubjectBox').value.trim();
  const message = document.getElementById('inputMessageBox').value.trim();

  // Validasi kolom wajib agar tidak kosong
  if (!name || !email || !message) {
    alert("Harap lengkapi nama lengkap, email, dan detail kebutuhan kemasan terlebih dahulu!");
    return;
  }

  // Nomor WhatsApp admin tujuan 
  const nomorWA = "6288989643555"; 

  // Format pengiriman pesan teks untuk WhatsApp
  const teksPesan = `Halo CorporateGifts.id, saya ingin menanyakan penawaran Desain Kotak Eksklusif.%0A%0A` +
                    `*Nama:* ${encodeURIComponent(name)}%0A` +
                    `*Email:* ${encodeURIComponent(email)}%0A` +
                    `*Nomor Telepon:* ${encodeURIComponent(phone)}%0A` +
                    `*Subjek:* ${encodeURIComponent(subject)}%0A` +
                    `*Detail Produk & Kemasan:*%0A${encodeURIComponent(message)}`;

  // Susun URL dan buka di tab baru
  const urlWhatsApp = `https://wa.me/${nomorWA}?text=${teksPesan}`;
  window.open(urlWhatsApp, '_blank');
}

function sendToWhatsAppWelcome() {
  // Mengambil nilai berdasarkan ID input form welcoming kit
  const name = document.getElementById('inputNameWelcome').value.trim();
  const email = document.getElementById('inputEmailWelcome').value.trim();
  const phone = document.getElementById('inputPhoneWelcome').value.trim();
  const subject = document.getElementById('inputSubjectWelcome').value.trim();
  const message = document.getElementById('inputMessageWelcome').value.trim();

  // Validasi input form yang bersifat wajib diisi
  if (!name || !email || !message) {
    alert("Harap lengkapi kolom nama, email, dan detail kustomisasi kit terlebih dahulu!");
    return;
  }

  // Nomor WhatsApp admin tujuan
  const nomorWA = "6288989643555"; 

  // Format penyusunan pesan teks WhatsApp
  const teksPesan = `Halo CorporateGifts.id, saya ingin menanyakan estimasi harga Welcoming Kit Korporat.%0A%0A` +
                    `*Nama:* ${encodeURIComponent(name)}%0A` +
                    `*Email:* ${encodeURIComponent(email)}%0A` +
                    `*Nomor Telepon:* ${encodeURIComponent(phone)}%0A` +
                    `*Subjek:* ${encodeURIComponent(subject)}%0A` +
                    `*Detail Permintaan Kit:*%0A${encodeURIComponent(message)}`;

  // Membuka API WhatsApp pada halaman tab browser baru
  const urlWhatsApp = `https://wa.me/${nomorWA}?text=${teksPesan}`;
  window.open(urlWhatsApp, '_blank');
}

function sendToWhatsAppSeminar() {
  // Ambil nilai data berdasarkan ID input khusus form seminar kit
  const name = document.getElementById('inputNameSeminar').value.trim();
  const email = document.getElementById('inputEmailSeminar').value.trim();
  const phone = document.getElementById('inputPhoneSeminar').value.trim();
  const subject = document.getElementById('inputSubjectSeminar').value.trim();
  const message = document.getElementById('inputMessageSeminar').value.trim();

  // Validasi kolom wajib agar tidak boleh kosong
  if (!name || !email || !message) {
    alert("Harap lengkapi nama lengkap/instansi, email, dan detail kebutuhan seminar kit terlebih dahulu!");
    return;
  }

  // Nomor WhatsApp admin tujuan
  const nomorWA = "6288989643555"; 

  // Susun struktur teks pesan WhatsApp yang rapi
  const teksPesan = `Halo CorporateGifts.id, saya ingin mengajukan penawaran Seminar Kit.%0A%0A` +
                    `*Nama / Instansi:* ${encodeURIComponent(name)}%0A` +
                    `*Email:* ${encodeURIComponent(email)}%0A` +
                    `*Nomor Telepon:* ${encodeURIComponent(phone)}%0A` +
                    `*Subjek:* ${encodeURIComponent(subject)}%0A` +
                    `*Detail Permintaan:*%0A${encodeURIComponent(message)}`;

  const urlWhatsApp = `https://wa.me/${nomorWA}?text=${teksPesan}`;
  
  // Alihkan pengguna langsung ke tab WhatsApp baru
  window.open(urlWhatsApp, '_blank');
}

function sendToWhatsAppMerch() {
  // Ambil nilai dari input berdasarkan ID khusus form merchandise
  const name = document.getElementById('inputNameMerch').value.trim();
  const email = document.getElementById('inputEmailMerch').value.trim();
  const phone = document.getElementById('inputPhoneMerch').value.trim();
  const subject = document.getElementById('inputSubjectMerch').value.trim();
  const message = document.getElementById('inputMessageMerch').value.trim();

  // Validasi dasar, pastikan kolom wajib tidak kosong
  if (!name || !email || !message) {
    alert("Harap lengkapi nama lengkap/instansi, email, dan detail merchandise yang Anda minati terlebih dahulu!");
    return;
  }

  // Nomor WhatsApp admin tujuan
  const nomorWA = "6288989643555"; 

  // Susun struktur teks pesan untuk dialihkan ke WhatsApp
  const teksPesan = `Halo CorporateGifts.id, saya ingin mengajukan penawaran Merchandise Acara.%0A%0A` +
                    `*Nama / Instansi:* ${encodeURIComponent(name)}%0A` +
                    `*Email:* ${encodeURIComponent(email)}%0A` +
                    `*Nomor Telepon:* ${encodeURIComponent(phone)}%0A` +
                    `*Subjek:* ${encodeURIComponent(subject)}%0A` +
                    `*Detail Permintaan Merchandise:*%0A${encodeURIComponent(message)}`;

  // Buka link format API WhatsApp
  const urlWhatsApp = `https://wa.me/${nomorWA}?text=${teksPesan}`;
  window.open(urlWhatsApp, '_blank');
}

function sendToWhatsAppPremium() {
  // Ambil nilai data berdasarkan ID input khusus form premium gift
  const name = document.getElementById('inputNamePremium').value.trim();
  const email = document.getElementById('inputEmailPremium').value.trim();
  const phone = document.getElementById('inputPhonePremium').value.trim();
  const subject = document.getElementById('inputSubjectPremium').value.trim();
  const message = document.getElementById('inputMessagePremium').value.trim();

  // Validasi kolom wajib agar tidak boleh kosong
  if (!name || !email || !message) {
    alert("Harap lengkapi nama lengkap/instansi, email, dan detail kebutuhan souvenir eksklusif Anda terlebih dahulu!");
    return;
  }

  // Nomor WhatsApp admin tujuan
  const nomorWA = "6288989643555"; 

  // Susun struktur teks pesan WhatsApp yang rapi
  const teksPesan = `Halo CorporateGifts.id, saya ingin mengajukan penawaran Premium Corporate Gift.%0A%0A` +
                    `*Nama / Instansi:* ${encodeURIComponent(name)}%0A` +
                    `*Email:* ${encodeURIComponent(email)}%0A` +
                    `*Nomor Telepon:* ${encodeURIComponent(phone)}%0A` +
                    `*Subjek:* ${encodeURIComponent(subject)}%0A` +
                    `*Detail Permintaan:*%0A${encodeURIComponent(message)}`;

  const urlWhatsApp = `https://wa.me/${nomorWA}?text=${teksPesan}`;
  
  // Alihkan pengguna langsung ke tab WhatsApp baru
  window.open(urlWhatsApp, '_blank');
}