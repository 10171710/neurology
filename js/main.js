/**
 * NeuroCare - Multipurpose Neurology & Headache Care Clinic Template
 * Core JavaScript Logic
 * Includes: Theme switcher (Light/Dark), RTL/LTR switcher, Nav dropdowns,
 * Mobile Drawer, Modal handling, Diary tracker, Filter systems & Toast notifications.
 */

// 1. THEME CONTROLLER (Dark / Light)
(function initTheme() {
  const savedTheme = localStorage.getItem('neurocare_theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
    document.documentElement.classList.add('dark');
  } else {
    document.documentElement.classList.remove('dark');
  }
})();

function toggleTheme() {
  const isDark = document.documentElement.classList.toggle('dark');
  localStorage.setItem('neurocare_theme', isDark ? 'dark' : 'light');
  updateThemeIcons();
}

function updateThemeIcons() {
  const isDark = document.documentElement.classList.contains('dark');
  document.querySelectorAll('.theme-icon-sun').forEach(el => {
    el.classList.toggle('hidden', !isDark);
  });
  document.querySelectorAll('.theme-icon-moon').forEach(el => {
    el.classList.toggle('hidden', isDark);
  });
}

// 2. RTL CONTROLLER (LTR / RTL)
(function initDirection() {
  const savedDir = localStorage.getItem('neurocare_dir') || 'ltr';
  document.documentElement.setAttribute('dir', savedDir);
  if (savedDir === 'rtl') {
    document.documentElement.setAttribute('lang', 'ar');
  } else {
    document.documentElement.setAttribute('lang', 'en');
  }
})();

function toggleRTL() {
  const currentDir = document.documentElement.getAttribute('dir') || 'ltr';
  const newDir = currentDir === 'rtl' ? 'ltr' : 'rtl';
  document.documentElement.setAttribute('dir', newDir);
  document.documentElement.setAttribute('lang', newDir === 'rtl' ? 'ar' : 'en');
  localStorage.setItem('neurocare_dir', newDir);
  updateRTLButtons();
}

function updateRTLButtons() {
  const isRtl = document.documentElement.getAttribute('dir') === 'rtl';
  document.querySelectorAll('.rtl-indicator').forEach(el => {
    el.textContent = isRtl ? 'RTL' : 'LTR';
  });
}

// 3. MOBILE MENU & DROPDOWNS
document.addEventListener('DOMContentLoaded', () => {
  updateThemeIcons();
  updateRTLButtons();
  initCounters();

  // Consultation and appointment request navigation / pre-fill handler
  const contactFormSection = document.getElementById('appointment-request');
  if (contactFormSection) {
    const urlParams = new URLSearchParams(window.location.search);
    const doctorParam = urlParams.get('doctor');
    const serviceParam = urlParams.get('service');
    const msgField = document.getElementById('contactMessageText');
    const topicSelect = document.getElementById('contactTopicSelect');

    if (doctorParam && msgField && !msgField.value) {
      msgField.value = `Hello, I would like to book a consultation with ${doctorParam}.`;
      if (topicSelect) {
        const lowerDoc = doctorParam.toLowerCase();
        if (lowerDoc.includes('concussion') || lowerDoc.includes('rostov')) {
          topicSelect.value = 'Concussion & TBI Rehabilitation';
        } else if (lowerDoc.includes('eeg') || lowerDoc.includes('hayes') || lowerDoc.includes('emg')) {
          topicSelect.value = 'Video EEG / EMG Diagnostic Test';
        } else if (lowerDoc.includes('botox') || lowerDoc.includes('chawla') || lowerDoc.includes('migraine')) {
          topicSelect.value = 'Chronic Migraine & CGRP Infusion';
        } else {
          topicSelect.value = 'New Patient Neurology Appointment';
        }
      }
    } else if (serviceParam && msgField && !msgField.value) {
      msgField.value = `Hello, I would like to book a consultation regarding ${serviceParam}.`;
    }

    const scrollToForm = () => {
      contactFormSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
      contactFormSection.classList.add('ring-4', 'ring-teal-500/50', 'ring-offset-2', 'dark:ring-offset-slate-900');
      setTimeout(() => {
        contactFormSection.classList.remove('ring-4', 'ring-teal-500/50', 'ring-offset-2', 'dark:ring-offset-slate-900');
      }, 3000);
    };

    const targetHashes = ['#appointment-request', '#book-consultation', '#book-appointment', '#fast-intake-response'];
    if (targetHashes.includes(window.location.hash)) {
      setTimeout(scrollToForm, 250);
    }

    window.addEventListener('hashchange', () => {
      if (targetHashes.includes(window.location.hash)) {
        scrollToForm();
      }
    });
  }

  // Doctor directory first section navigation / smooth-scroll handler
  const doctorDirectorySection = document.getElementById('doctors-directory');
  if (doctorDirectorySection) {
    const docHashes = ['#doctors-directory', '#specialists', '#consult-specialist', '#first-section'];
    const scrollToDirectory = () => {
      doctorDirectorySection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    };
    if (docHashes.includes(window.location.hash)) {
      setTimeout(scrollToDirectory, 250);
    }
    window.addEventListener('hashchange', () => {
      if (docHashes.includes(window.location.hash)) {
        scrollToDirectory();
      }
    });
  }

  // Blog article body (first section) smooth-scroll handler
  const articleBodySection = document.getElementById('article-body');
  if (articleBodySection) {
    const articleHashes = ['#article-body', '#first-section', '#clinical-study'];
    const scrollToArticleBody = () => {
      articleBodySection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    };
    if (articleHashes.includes(window.location.hash)) {
      setTimeout(scrollToArticleBody, 250);
    }
    window.addEventListener('hashchange', () => {
      if (articleHashes.includes(window.location.hash)) {
        scrollToArticleBody();
      }
    });
  }

  // Mobile menu toggle
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const mobileMenu = document.getElementById('mobileMenu');
  const mobileMenuClose = document.getElementById('mobileMenuClose');

  if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener('click', () => {
      mobileMenu.classList.remove('hidden');
      document.body.classList.add('overflow-hidden');
    });
  }

  if (mobileMenuClose && mobileMenu) {
    mobileMenuClose.addEventListener('click', () => {
      mobileMenu.classList.add('hidden');
      document.body.classList.remove('overflow-hidden');
    });
  }

  // Mobile dropdown toggle for Home 1 & Home 2
  const mobileHomeDropdownBtn = document.getElementById('mobileHomeDropdownBtn');
  const mobileHomeDropdownMenu = document.getElementById('mobileHomeDropdownMenu');
  if (mobileHomeDropdownBtn && mobileHomeDropdownMenu) {
    mobileHomeDropdownBtn.addEventListener('click', (e) => {
      e.preventDefault();
      mobileHomeDropdownMenu.classList.toggle('hidden');
    });
  }

  // Back to top floating button (matching RheumaCare)
  const backTopBtn = document.getElementById('back-top');
  if (backTopBtn) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 300) {
        backTopBtn.classList.add('is-on');
      } else {
        backTopBtn.classList.remove('is-on');
      }
    });
    backTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // Desktop Dropdown
  const desktopHomeDropdown = document.getElementById('desktopHomeDropdown');
  const desktopHomeMenu = document.getElementById('desktopHomeMenu');
  if (desktopHomeDropdown && desktopHomeMenu) {
    let timeout;
    desktopHomeDropdown.addEventListener('mouseenter', () => {
      clearTimeout(timeout);
      desktopHomeMenu.classList.remove('hidden');
      desktopHomeMenu.classList.add('opacity-100', 'translate-y-0');
    });
    desktopHomeDropdown.addEventListener('mouseleave', () => {
      timeout = setTimeout(() => {
        desktopHomeMenu.classList.add('hidden');
      }, 150);
    });
  }

  // 4. ACCORDION (FAQ)
  document.querySelectorAll('.accordion-header').forEach(header => {
    header.addEventListener('click', () => {
      const body = header.nextElementSibling;
      const icon = header.querySelector('.accordion-icon');
      const isOpen = !body.classList.contains('hidden');

      // Close all siblings
      const parent = header.closest('.accordion-container');
      if (parent) {
        parent.querySelectorAll('.accordion-body').forEach(b => b.classList.add('hidden'));
        parent.querySelectorAll('.accordion-icon').forEach(i => i.classList.remove('rotate-180'));
      }

      if (!isOpen) {
        body.classList.remove('hidden');
        if (icon) icon.classList.add('rotate-180');
      }
    });
  });

  // 5. APPOINTMENT MODAL HANDLERS
  window.openBookingModal = function(doctorName = '') {
    const modal = document.getElementById('bookingModal');
    if (modal) {
      if (doctorName) {
        const selectDoc = document.getElementById('modalDoctorSelect');
        if (selectDoc) {
          for (let option of selectDoc.options) {
            if (option.text.toLowerCase().includes(doctorName.toLowerCase())) {
              option.selected = true;
              break;
            }
          }
        }
      }
      modal.classList.remove('hidden');
      modal.classList.add('flex');
    }
  };

  window.openModal = function(doctorName = '') {
    if (typeof window.openBookingModal === 'function') {
      window.openBookingModal(doctorName);
    }
  };

  window.closeBookingModal = function() {
    const modal = document.getElementById('bookingModal');
    if (modal) {
      modal.classList.add('hidden');
      modal.classList.remove('flex');
    }
  };

  // 5b. LEGAL / POLICY POPUP MODAL (Privacy, Terms, Accessibility)
  const legalContent = {
    privacy: {
      icon: 'shield-check',
      title: 'Privacy Policy',
      subtitle: 'How NeuroCare collects, uses and protects your health information.',
      body: `
        <p class="text-xs text-slate-500 dark:text-slate-400">Last updated: January 2026</p>
        <div>
          <h4 class="font-bold text-slate-900 dark:text-white mb-1">1. Information We Collect</h4>
          <p class="text-slate-600 dark:text-slate-400 leading-relaxed">We only collect the details you voluntarily provide when booking an appointment or contacting the clinic, such as your name, email address, phone number and a short description of your symptoms. This information is used solely to coordinate your neurological care.</p>
        </div>
        <div>
          <h4 class="font-bold text-slate-900 dark:text-white mb-1">2. How We Use Your Information</h4>
          <p class="text-slate-600 dark:text-slate-400 leading-relaxed">Your data is used to schedule visits, confirm appointments, share treatment plans and respond to your enquiries. We never sell or rent your personal or clinical information to third parties.</p>
        </div>
        <div>
          <h4 class="font-bold text-slate-900 dark:text-white mb-1">3. Data Protection &amp; Security</h4>
          <p class="text-slate-600 dark:text-slate-400 leading-relaxed">All records are protected with 256-bit SSL encryption and handled in line with HIPAA and applicable privacy regulations. Access is restricted to authorised clinical staff only.</p>
        </div>
        <div>
          <h4 class="font-bold text-slate-900 dark:text-white mb-1">4. Your Rights</h4>
          <p class="text-slate-600 dark:text-slate-400 leading-relaxed">You may request access to, correction of, or deletion of your personal information at any time. To exercise these rights, contact our privacy desk at privacy@neurocare.example.</p>
        </div>
      `
    },
    terms: {
      icon: 'file-text',
      title: 'Terms of Service',
      subtitle: 'The terms that govern your use of the NeuroCare website and services.',
      body: `
        <p class="text-xs text-slate-500 dark:text-slate-400">Last updated: January 2026</p>
        <div>
          <h4 class="font-bold text-slate-900 dark:text-white mb-1">1. Acceptance of Terms</h4>
          <p class="text-slate-600 dark:text-slate-400 leading-relaxed">By accessing this website or booking a service with NeuroCare, you agree to be bound by these Terms of Service and all applicable laws and regulations.</p>
        </div>
        <div>
          <h4 class="font-bold text-slate-900 dark:text-white mb-1">2. Medical Disclaimer</h4>
          <p class="text-slate-600 dark:text-slate-400 leading-relaxed">The content on this website is for general information only and is not a substitute for professional medical advice, diagnosis or treatment. Always seek the guidance of a qualified neurologist regarding any medical condition.</p>
        </div>
        <div>
          <h4 class="font-bold text-slate-900 dark:text-white mb-1">3. Appointments &amp; Cancellations</h4>
          <p class="text-slate-600 dark:text-slate-400 leading-relaxed">Appointment requests are confirmed by our clinical coordinator. Please provide at least 24 hours notice for cancellations or rescheduling so other patients can be accommodated.</p>
        </div>
        <div>
          <h4 class="font-bold text-slate-900 dark:text-white mb-1">4. Intellectual Property</h4>
          <p class="text-slate-600 dark:text-slate-400 leading-relaxed">All text, graphics, logos and content on this site are the property of NeuroCare and may not be reproduced without prior written permission.</p>
        </div>
        <div>
          <h4 class="font-bold text-slate-900 dark:text-white mb-1">5. Limitation of Liability</h4>
          <p class="text-slate-600 dark:text-slate-400 leading-relaxed">NeuroCare is not liable for any indirect or incidental damages arising from the use of this website. Your use of the site is at your own discretion.</p>
        </div>
      `
    },
    accessibility: {
      icon: 'accessibility',
      title: 'Accessibility',
      subtitle: 'Our commitment to digital accessibility for every patient.',
      body: `
        <p class="text-xs text-slate-500 dark:text-slate-400">Last updated: January 2026</p>
        <div>
          <h4 class="font-bold text-slate-900 dark:text-white mb-1">1. Our Commitment</h4>
          <p class="text-slate-600 dark:text-slate-400 leading-relaxed">NeuroCare is committed to ensuring digital accessibility for all people, including those with disabilities, and aims to conform to the WCAG 2.1 Level AA guidelines.</p>
        </div>
        <div>
          <h4 class="font-bold text-slate-900 dark:text-white mb-1">2. Measures We Take</h4>
          <p class="text-slate-600 dark:text-slate-400 leading-relaxed">We provide high-contrast text, keyboard-navigable menus, descriptive alternative text for images, clear focus indicators and resizable text throughout the website.</p>
        </div>
        <div>
          <h4 class="font-bold text-slate-900 dark:text-white mb-1">3. Feedback &amp; Assistance</h4>
          <p class="text-slate-600 dark:text-slate-400 leading-relaxed">If you encounter any accessibility barrier, or need information in an alternative format, please contact us at access@neurocare.example or call +1 (800) 555-6376.</p>
        </div>
        <div>
          <h4 class="font-bold text-slate-900 dark:text-white mb-1">4. Ongoing Efforts</h4>
          <p class="text-slate-600 dark:text-slate-400 leading-relaxed">Accessibility is an ongoing effort. We regularly review our website and welcome your suggestions to help us improve the experience for everyone.</p>
        </div>
      `
    }
  };

  window.openLegalModal = function(key) {
    const data = legalContent[key];
    if (!data) return;

    let modal = document.getElementById('legalModal');
    if (!modal) {
      modal = document.createElement('div');
      modal.id = 'legalModal';
      modal.className = 'hidden fixed inset-0 z-50 modal-backdrop items-center justify-center p-4';
      modal.innerHTML = `
        <div class="bg-white dark:bg-slate-900 rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-slate-200 dark:border-slate-800 relative max-h-[90vh] overflow-y-auto">
          <button onclick="closeLegalModal()" aria-label="Close" class="absolute top-5 right-5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200">
            <i data-lucide="x" class="w-6 h-6"></i>
          </button>
          <div class="flex items-center gap-3 mb-6">
            <div class="w-10 h-10 rounded-xl bg-teal-600 text-white flex items-center justify-center flex-shrink-0">
              <span id="legalModalIconWrap"><i data-lucide="shield-check" class="w-5 h-5"></i></span>
            </div>
            <div>
              <h3 id="legalModalTitle" class="text-xl font-bold text-slate-900 dark:text-white"></h3>
              <p id="legalModalSubtitle" class="text-xs text-slate-500 dark:text-slate-400"></p>
            </div>
          </div>
          <div id="legalModalBody" class="space-y-5 text-sm"></div>
        </div>`;
      document.body.appendChild(modal);
      modal.addEventListener('click', (e) => { if (e.target === modal) window.closeLegalModal(); });
      document.addEventListener('keydown', (e) => { if (e.key === 'Escape') window.closeLegalModal(); });
    }

    document.getElementById('legalModalTitle').textContent = data.title;
    document.getElementById('legalModalSubtitle').textContent = data.subtitle;
    document.getElementById('legalModalBody').innerHTML = data.body;
    const iconWrap = document.getElementById('legalModalIconWrap');
    if (iconWrap) iconWrap.innerHTML = '<i data-lucide="' + data.icon + '" class="w-5 h-5"></i>';
    if (window.lucide) lucide.createIcons();

    modal.classList.remove('hidden');
    modal.classList.add('flex');
    document.body.style.overflow = 'hidden';
  };

  window.closeLegalModal = function() {
    const modal = document.getElementById('legalModal');
    if (modal) {
      modal.classList.add('hidden');
      modal.classList.remove('flex');
      document.body.style.overflow = '';
    }
  };

  // Delegate clicks on the footer policy links to the popup
  document.addEventListener('click', (e) => {
    const trigger = e.target.closest('[data-legal]');
    if (trigger) {
      e.preventDefault();
      window.openLegalModal(trigger.getAttribute('data-legal'));
    }
  });

  // Strict phone number input restriction (max 10 numeric digits)
  document.querySelectorAll('input[type="tel"]').forEach(input => {
    input.addEventListener('input', () => {
      input.value = input.value.replace(/\D/g, '').slice(0, 10);
    });
  });

  const bookingForm = document.getElementById('appointmentBookingForm');
  if (bookingForm) {
    bookingForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const nameInput = bookingForm.querySelector('input[name="fullName"]') || bookingForm.querySelector('input[type="text"]');
      const phoneInput = bookingForm.querySelector('input[name="phone"]') || bookingForm.querySelector('input[type="tel"]');
      const symptomsInput = bookingForm.querySelector('textarea');

      if (nameInput && nameInput.value.trim().length < 2) {
        showToast('Patient Full Name must be at least 2 characters long.', 'error');
        nameInput.focus();
        return;
      }

      if (phoneInput) {
        const cleanPhone = phoneInput.value.replace(/\D/g, '');
        if (cleanPhone.length !== 10) {
          showToast('Phone Number is mandatory and must contain exactly 10 digits.', 'error');
          phoneInput.focus();
          return;
        }
      }

      if (symptomsInput && symptomsInput.value.trim().length < 2) {
        showToast('Brief Description of Symptoms / Triggers must be at least 2 characters.', 'error');
        symptomsInput.focus();
        return;
      }

      closeBookingModal();
      showToast('Appointment request sent! Our clinical coordinator will confirm within 2 hours.', 'success');
      bookingForm.reset();
    });
  }

  // Hero Quick Booking Form Validation
  const heroQuickForm = document.getElementById('heroQuickBookingForm');
  if (heroQuickForm) {
    heroQuickForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const nameInput = heroQuickForm.querySelector('input[name="fullName"]') || heroQuickForm.querySelector('input[type="text"]');
      const phoneInput = heroQuickForm.querySelector('input[name="phone"]') || heroQuickForm.querySelector('input[type="tel"]');

      if (nameInput && nameInput.value.trim().length < 2) {
        showToast('Full Name must be at least 2 characters long.', 'error');
        nameInput.focus();
        return;
      }

      if (phoneInput) {
        const cleanPhone = phoneInput.value.replace(/\D/g, '');
        if (cleanPhone.length !== 10) {
          showToast('Phone Number is mandatory and must contain exactly 10 digits.', 'error');
          phoneInput.focus();
          return;
        }
      }

      showToast('Appointment booking initiated! Opening reservation details...', 'success');
      if (typeof openBookingModal === 'function') {
        openBookingModal();
      }
    });
  }

  // 6. FILTERING (Doctors / Blog)
  const filterBtns = document.querySelectorAll('.filter-btn');
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const category = btn.getAttribute('data-filter');
      filterBtns.forEach(b => {
        b.classList.remove('bg-teal-700', 'bg-teal-600', 'dark:bg-teal-500', 'text-white', 'hover:bg-teal-800', 'hover:bg-teal-50', 'dark:hover:bg-slate-700');
        b.classList.add('bg-slate-100', 'text-slate-600', 'dark:bg-slate-800', 'dark:text-slate-300', 'hover:bg-teal-50', 'dark:hover:bg-slate-700');
      });
      btn.classList.add('bg-teal-700', 'text-white', 'hover:bg-teal-800');
      btn.classList.remove('bg-slate-100', 'text-slate-600', 'dark:bg-slate-800', 'dark:text-slate-300', 'hover:bg-teal-50', 'dark:hover:bg-slate-700');

      document.querySelectorAll('.filter-item').forEach(item => {
        const itemCat = item.getAttribute('data-category');
        if (category === 'all' || itemCat.includes(category)) {
          item.classList.remove('hidden');
        } else {
          item.classList.add('hidden');
        }
      });
    });
  });

  // Search input for doctors / blog
  const searchInput = document.getElementById('searchDirectoryInput');
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      const q = e.target.value.toLowerCase().trim();
      document.querySelectorAll('.filter-item').forEach(item => {
        const text = item.textContent.toLowerCase();
        if (text.includes(q)) {
          item.classList.remove('hidden');
        } else {
          item.classList.add('hidden');
        }
      });
    });
  }

  // Topic jump helper (blog "Browse by Topic" cards)
  window.filterBlog = function (topic) {
    const btn = document.querySelector('.filter-btn[data-filter="' + topic + '"]');
    if (btn) btn.click();
    const target = document.getElementById('blog-posts');
    if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  // 7. HEADACHE DIARY LOGIC (Interactive in Dashboard / Tools)
  const diaryForm = document.getElementById('headacheDiaryForm');
  if (diaryForm) {
    diaryForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const date = document.getElementById('diaryDate')?.value || new Date().toISOString().split('T')[0];
      const intensity = document.getElementById('diaryIntensity')?.value || '5';
      const type = document.getElementById('diaryType')?.value || 'Migraine';
      const trigger = document.getElementById('diaryTrigger')?.value || 'Stress/Lack of sleep';
      const duration = document.getElementById('diaryDuration')?.value || '4';

      const entry = { date, intensity, type, trigger, duration, id: Date.now() };
      let logs = JSON.parse(localStorage.getItem('neurocare_diary_logs') || '[]');
      logs.unshift(entry);
      localStorage.setItem('neurocare_diary_logs', JSON.stringify(logs));

      renderDiaryEntries();
      showToast('Headache log entry saved successfully to your patient file.', 'success');
      diaryForm.reset();
    });

    renderDiaryEntries();
  }
});

function renderDiaryEntries() {
  const container = document.getElementById('diaryEntriesList');
  if (!container) return;

  const logs = JSON.parse(localStorage.getItem('neurocare_diary_logs') || '[]');
  
  // Default sample logs if empty
  const displayLogs = logs.length > 0 ? logs : [
    { id: 1, date: '2026-10-12', intensity: '7', type: 'Chronic Migraine with Aura', trigger: 'Bright Sunlight, Weather Drop', duration: '6 hrs' },
    { id: 2, date: '2026-10-08', intensity: '4', type: 'Tension-Type Headache', trigger: 'Screen Strain, Posture', duration: '2.5 hrs' },
    { id: 3, date: '2026-09-29', intensity: '8', type: 'Cluster Headache Attack', trigger: 'Nocturnal Cycle', duration: '90 mins' }
  ];

  container.innerHTML = displayLogs.map(log => `
    <div class="flex items-center justify-between p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm hover:border-teal-500/50 transition-all">
      <div class="flex items-center gap-3">
        <div class="w-10 h-10 rounded-lg flex items-center justify-center font-bold text-white ${
          parseInt(log.intensity) >= 7 ? 'bg-rose-500' : parseInt(log.intensity) >= 4 ? 'bg-amber-500' : 'bg-emerald-500'
        }">
          ${log.intensity}
        </div>
        <div>
          <h4 class="font-bold text-slate-800 dark:text-white text-sm">${log.type}</h4>
          <p class="text-xs text-slate-500 dark:text-slate-400">Triggers: ${log.trigger} • Duration: ${log.duration}</p>
        </div>
      </div>
      <div class="text-right">
        <span class="text-xs font-semibold px-2 py-1 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">${log.date}</span>
      </div>
    </div>
  `).join('');
}

// 8. COUNT-UP STAT COUNTERS (gradually increasing numbers) + REVEAL
function initCounters() {
  const counters = document.querySelectorAll('[data-counter]');
  const reveals = document.querySelectorAll('[data-reveal]');
  if (!counters.length && !reveals.length) return;

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Gradual reveal for non-numeric stats (e.g. "Free")
  if (reveals.length) {
    if (reduceMotion) {
      reveals.forEach(el => el.classList.add('is-revealed'));
    } else {
      const revealObserver = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-revealed');
            obs.unobserve(entry.target);
          }
        });
      }, { threshold: 0.4 });
      reveals.forEach(el => revealObserver.observe(el));
    }
  }

  if (!counters.length) return;

  const format = (value, decimals, prefix, suffix, separator) => {
    let numStr = value.toFixed(decimals);
    if (separator) {
      numStr = Number(numStr).toLocaleString('en-US', {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals
      });
    }
    return prefix + numStr + suffix;
  };

  const animate = (el) => {
    const target = parseFloat(el.getAttribute('data-target')) || 0;
    const decimals = parseInt(el.getAttribute('data-decimals') || '0', 10);
    const suffix = el.getAttribute('data-suffix') || '';
    const prefix = el.getAttribute('data-prefix') || '';
    const separator = el.getAttribute('data-separator') === 'true';
    const duration = parseInt(el.getAttribute('data-duration') || '2000', 10);
    const finalText = format(target, decimals, prefix, suffix, separator);

    if (reduceMotion) {
      el.textContent = finalText;
      return;
    }

    let start = null;
    const step = (timestamp) => {
      if (start === null) start = timestamp;
      const progress = Math.min((timestamp - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = format(target * eased, decimals, prefix, suffix, separator);
      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        el.textContent = finalText;
      }
    };
    requestAnimationFrame(step);
  };

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animate(entry.target);
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.4 });

  counters.forEach(counter => observer.observe(counter));
}

// 9. GLOBAL TOAST NOTIFICATION
function showToast(message, type = 'info') {
  let toastContainer = document.getElementById('toastContainer');
  if (!toastContainer) {
    toastContainer = document.createElement('div');
    toastContainer.id = 'toastContainer';
    toastContainer.className = 'fixed bottom-5 right-5 z-50 flex flex-col gap-2 max-w-sm';
    document.body.appendChild(toastContainer);
  }

  const toast = document.createElement('div');
  const bg = type === 'success' ? 'bg-teal-700 text-white' : 'bg-slate-900 text-white dark:bg-slate-800';
  toast.className = `${bg} px-4 py-3 rounded-xl shadow-xl flex items-center gap-3 text-sm transform transition-all duration-300 translate-y-3 opacity-0`;
  toast.innerHTML = `
    <svg class="w-5 h-5 flex-shrink-0 text-teal-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
    <span>${message}</span>
  `;

  toastContainer.appendChild(toast);
  setTimeout(() => {
    toast.classList.remove('translate-y-3', 'opacity-0');
  }, 10);

  setTimeout(() => {
    toast.classList.add('opacity-0', 'translate-y-2');
    setTimeout(() => toast.remove(), 300);
  }, 3500);
}

// 10. GLOBAL EMAIL VALIDATION
// HTML5 type="email" accepts addresses such as "sia@g" (domain without a
// TLD). Enforce a stricter rule site-wide so incomplete addresses are
// rejected across every form (contact, newsletter, booking, etc.).
var EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[a-zA-Z]{2,}$/;

function isValidEmail(value) {
  return EMAIL_REGEX.test((value || '').trim());
}

document.addEventListener('submit', function (e) {
  var form = e.target;
  if (!form || form.tagName !== 'FORM') return;

  var emailInputs = form.querySelectorAll('input[type="email"]');
  for (var i = 0; i < emailInputs.length; i++) {
    var input = emailInputs[i];
    var value = input.value.trim();
    if (value === '' && !input.required) continue;
    if (!isValidEmail(value)) {
      e.preventDefault();
      e.stopPropagation();
      input.setCustomValidity('Please enter a valid email address (e.g. name@example.com).');
      input.reportValidity();
      input.focus();
      if (typeof showToast === 'function') {
        showToast('Please enter a valid email address (e.g. name@example.com).', 'info');
      }
      return;
    }
  }
}, true);

document.addEventListener('input', function (e) {
  if (e.target && e.target.type === 'email' && typeof e.target.setCustomValidity === 'function') {
    e.target.setCustomValidity('');
  }
}, true);
