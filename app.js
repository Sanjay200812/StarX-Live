/**
 * StarX Live - Core Application Logic
 * Features: Navbar Scroll, 10-Day Tour Countdown to Hyderabad, Member Bios Modal, Tour Schedule Filter, Gallery Lightbox, Booking Form
 */

document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initCountdown();
  initMembersModal();
  initTourFilter();
  initContactForm();
  initGalleryLightbox();
});

/* ==========================================================================
   1. NAVIGATION & SCROLL
   ========================================================================== */
function initNavbar() {
  const navbar = document.querySelector('.navbar');
  const mobileToggle = document.querySelector('.mobile-toggle');
  const navLinks = document.querySelector('.nav-links');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  if (mobileToggle) {
    mobileToggle.addEventListener('click', () => {
      navLinks.classList.toggle('active');
    });
  }

  // Smooth scroll active highlighting
  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      if (navLinks.classList.contains('active')) {
        navLinks.classList.remove('active');
      }
      document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
      link.classList.add('active');
    });
  });
}

/* ==========================================================================
   2. TOUR COUNTDOWN TIMER (Set to 10 Days)
   ========================================================================== */
function initCountdown() {
  // Set target date to exactly 10 days from now
  const targetDate = new Date().getTime() + (10 * 24 * 60 * 60 * 1000) + (14 * 60 * 60 * 1000);

  const daysEl = document.getElementById('days');
  const hoursEl = document.getElementById('hours');
  const minutesEl = document.getElementById('minutes');
  const secondsEl = document.getElementById('seconds');

  if (!daysEl) return;

  function updateTimer() {
    const now = new Date().getTime();
    const distance = targetDate - now;

    if (distance < 0) return;

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    daysEl.textContent = String(days).padStart(2, '0');
    hoursEl.textContent = String(hours).padStart(2, '0');
    minutesEl.textContent = String(minutes).padStart(2, '0');
    secondsEl.textContent = String(seconds).padStart(2, '0');
  }

  updateTimer();
  setInterval(updateTimer, 1000);
}

/* ==========================================================================
   3. BAND MEMBERS MODAL
   ========================================================================== */
const memberBiosData = {
  vocalist: {
    name: 'Xander "Viper" Vance',
    role: 'Lead Vocals & Rhythm Guitar',
    gear: 'Custom Gibson Les Paul Custom, Shure Axient Wireless System',
    bio: 'Founding member of StarX Live. Known for his multi-octave vocal range and electrifying stage presence that commands stadium audiences worldwide.',
    hometown: 'Los Angeles, CA'
  },
  guitarist: {
    name: 'Nova "Riff" Sterling',
    role: 'Lead Guitar & Backing Vocals',
    gear: 'Fender Custom Shop Stratocaster, Marshall JCM800 Stack, Eventide FX',
    bio: 'Prodigy guitarist celebrated for blistering solos and melodic hooks. Nova crafts the signature sonic identity of StarX Live.',
    hometown: 'London, UK'
  },
  bassist: {
    name: 'Axel "Thunder" Stone',
    role: 'Bass Guitar & Synthesizers',
    gear: 'Music Man StingRay 5-String, Moog Subsequent 37, Ampeg SVT Classic',
    bio: 'Architect of the crushing basslines and cyber synth textures that give StarX Live their unmistakable futuristic rock wall of sound.',
    hometown: 'Berlin, Germany'
  },
  drummer: {
    name: 'Rocco "Beat" Ramirez',
    role: 'Drums & Percussion',
    gear: 'Tama Starclassic Walnut/Birch, Zildjian K Custom Cymbals, Roland SPD-SX',
    bio: 'The unstoppable rhythm engine. Rocco combines explosive hard rock drumming with complex polyrhythms and electronic percussion triggers.',
    hometown: 'Austin, TX'
  }
};

function initMembersModal() {
  const modal = document.getElementById('memberModal');
  if (!modal) return;

  document.querySelectorAll('.member-card').forEach(card => {
    card.addEventListener('click', () => {
      const key = card.dataset.member;
      const data = memberBiosData[key];
      if (!data) return;

      document.getElementById('modalMemberRole').textContent = data.role;
      document.getElementById('modalMemberName').textContent = data.name;
      document.getElementById('modalMemberBio').textContent = data.bio;
      document.getElementById('modalMemberGear').textContent = data.gear;
      document.getElementById('modalMemberHometown').textContent = data.hometown;

      openModal('memberModal');
    });
  });
}

/* ==========================================================================
   4. TOUR SCHEDULE FILTER
   ========================================================================== */
function initTourFilter() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const tourCards = document.querySelectorAll('.tour-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const category = btn.dataset.filter;

      tourCards.forEach(card => {
        if (category === 'all' || card.dataset.region === category) {
          card.style.display = 'grid';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

/* ==========================================================================
   5. GALLERY LIGHTBOX
   ========================================================================== */
function initGalleryLightbox() {
  const galleryItems = document.querySelectorAll('.gallery-item');
  galleryItems.forEach(item => {
    item.addEventListener('click', () => {
      const img = item.querySelector('img');
      const caption = item.querySelector('.gallery-caption').textContent;

      document.getElementById('lightboxImg').src = img.src;
      document.getElementById('lightboxCaption').textContent = caption;
      openModal('lightboxModal');
    });
  });
}

/* ==========================================================================
   6. CONTACT & BOOKING FORM
   ========================================================================== */
function initContactForm() {
  const bookingForm = document.getElementById('bookingForm');

  if (bookingForm) {
    bookingForm.addEventListener('submit', (e) => {
      e.preventDefault();
      bookingForm.reset();
      showToast('Booking inquiry submitted! Our management team will contact you within 24 hours.');
    });
  }
}

/* ==========================================================================
   7. MODAL & TOAST HELPERS
   ========================================================================== */
window.openModal = function(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) modal.classList.add('active');
};

window.closeModal = function(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) modal.classList.remove('active');
};

document.querySelectorAll('.modal-overlay').forEach(modal => {
  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.classList.remove('active');
    }
  });
});

function showToast(message) {
  let container = document.getElementById('toastContainer');
  if (!container) {
    container = document.createElement('div');
    container.id = 'toastContainer';
    container.className = 'toast-container';
    document.body.appendChild(container);
  }

  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerHTML = `<i class="fas fa-bolt" style="color:var(--cyan-neon);"></i> <span>${message}</span>`;
  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateX(100%)';
    setTimeout(() => toast.remove(), 300);
  }, 4000);
}
