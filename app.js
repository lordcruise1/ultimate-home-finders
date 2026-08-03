/* ==========================================================================
   ULTIMATE HOME FINDERS — MAIN APPLICATION LOGIC
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  // Initialize Lucide SVG Icons
  if (window.lucide) {
    lucide.createIcons();
  }

  // Set Current Year in Footer
  const yearEls = document.querySelectorAll('#current-year');
  yearEls.forEach(el => el.textContent = new Date().getFullYear());

  // Header Scroll Shadow Effect
  const header = document.getElementById('site-header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 20) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
    updateActiveNav();
  });

  // Mobile Drawer Toggle Logic
  const mobileToggle = document.getElementById('mobile-toggle');
  const drawerClose = document.getElementById('drawer-close');
  const mobileDrawer = document.getElementById('mobile-drawer');

  if (mobileToggle && mobileDrawer) {
    mobileToggle.addEventListener('click', () => {
      mobileDrawer.classList.add('open');
    });
  }

  if (drawerClose && mobileDrawer) {
    drawerClose.addEventListener('click', () => {
      mobileDrawer.classList.remove('open');
    });
  }

  // Close mobile drawer when link is clicked
  const mobileLinks = document.querySelectorAll('.mobile-nav-link');
  mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
      mobileDrawer.classList.remove('open');
    });
  });

  // Hero Listings Button Action
  const heroListingsBtn = document.getElementById('hero-listings-btn');
  if (heroListingsBtn) {
    heroListingsBtn.addEventListener('click', () => {
      const listingsSection = document.getElementById('listings');
      if (listingsSection) {
        listingsSection.scrollIntoView({ behavior: 'smooth' });
      }
    });
  }

  // Initialize Testimonial Auto-Play
  startTestimonialTimer();
});

/* Active Nav Highlighting on Scroll */
function updateActiveNav() {
  const sections = document.querySelectorAll('section[id]');
  const scrollY = window.pageYOffset;

  sections.forEach(current => {
    const sectionHeight = current.offsetHeight;
    const sectionTop = current.offsetTop - 120;
    const sectionId = current.getAttribute('id');
    const navLink = document.querySelector(`.desktop-nav a[href*=${sectionId}]`);

    if (navLink) {
      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        navLink.classList.add('active');
      } else {
        navLink.classList.remove('active');
      }
    }
  });
}

/* Service Detail Data Store */
const servicesData = {
  management: {
    title: "Property Management",
    icon: "building-2",
    description: `
      <p>For clients who own residential or commercial property in Port Harcourt, Lagos, Abuja, or Owerri but cannot personally oversee daily management, Ultimate Home Finders acts as your full-service custodian.</p>
      <h4>What We Handle:</h4>
      <ul>
        <li>Strict tenant vetting and background verification before lease signing.</li>
        <li>Timely rent collection and direct remittance to property owners.</li>
        <li>Routine inspections and preventive maintenance supervision.</li>
        <li>Conflict resolution and lease agreement renewals.</li>
      </ul>
      <p>Whether you live in another state, reside in the diaspora, or simply prefer hands-off ownership, we guarantee peace of mind and asset longevity.</p>
    `
  },
  sales: {
    title: "Sales & Letting Agency",
    icon: "key-round",
    description: `
      <p>We represent sellers and landlords across Port Harcourt, Lagos, Abuja, and Owerri — connecting premium properties with verified buyers and high-calibre tenants.</p>
      <h4>Our Sales & Letting Approach:</h4>
      <ul>
        <li>Professional property valuation based on local city market data.</li>
        <li>Strategic multi-channel marketing across top property portals and buyer networks.</li>
        <li>Screening inquiries to eliminate time-wasters and focus on serious offers.</li>
        <li>Complete negotiation support to secure optimum sales prices or rental yields.</li>
      </ul>
    `
  },
  buying: {
    title: "Buying Agency & Property Search",
    icon: "search-check",
    description: `
      <p>Searching for property in Port Harcourt, Lagos, Abuja, or Owerri can be daunting and risk-prone. We act exclusively as your direct representative to locate and secure your ideal property.</p>
      <h4>Our Client Representation:</h4>
      <ul>
        <li>Personalized property sourcing matching your budget, location, and specifications.</li>
        <li>Physical site inspections, neighborhood safety assessments, and drainage evaluation.</li>
        <li>Title verification at Ministry of Urban Development and state Land Registries.</li>
        <li>Price negotiation to protect your purchasing budget.</li>
      </ul>
    `
  },
  investment: {
    title: "Real Estate Investment Advisory",
    icon: "trending-up",
    description: `
      <p>Put idle capital to work with maximum security and strong returns. We combine 26 years of historical market data with current urban expansion trends across Port Harcourt, Lagos, Abuja, and Owerri.</p>
      <h4>Advisory Process:</h4>
      <ul>
        <li>Identification of high-yield residential plots, commercial nodes, and redevelopment sites.</li>
        <li>Return-on-Investment (ROI) ranking based on projected capital appreciation and rental yield.</li>
        <li>Full transaction execution — from contract drafting to deed registration.</li>
      </ul>
    `
  },
  development: {
    title: "Small-Scale Estate Development",
    icon: "hammer",
    description: `
      <p>Ultimate Home Finders undertakes select, highly manageable small-scale development projects that emphasize structural integrity, smart architectural layouts, and enduring value.</p>
      <h4>Development Capabilities:</h4>
      <ul>
        <li>Selective residential duplex and block apartment developments.</li>
        <li>Supervision by Engr. Christopher Okoro (CEO & Principal Engineer).</li>
        <li>Strict adherence to building codes, environmental standards, and quality materials.</li>
      </ul>
    `
  },
  rentals: {
    title: "Rentals Agency",
    icon: "home",
    description: `
      <p>We assist families, corporate executives, and individuals in finding quality rental accommodations across Port Harcourt, Lagos, Abuja, and Owerri.</p>
      <h4>Rental Services:</h4>
      <ul>
        <li>Curated inventory of verified apartments, terrace houses, and executive duplexes.</li>
        <li>Clear tenancy terms with transparent agreement structures.</li>
        <li>Fast-track move-in coordination.</li>
      </ul>
    `
  }
};

let currentModalServiceKey = '';

function openServiceModal(serviceKey) {
  const service = servicesData[serviceKey];
  if (!service) return;

  currentModalServiceKey = serviceKey;
  const modal = document.getElementById('service-modal');
  const titleEl = document.getElementById('modal-service-title');
  const iconEl = document.getElementById('modal-service-icon');
  const contentEl = document.getElementById('modal-service-content');

  if (titleEl) titleEl.textContent = service.title;
  if (iconEl) iconEl.innerHTML = `<i data-lucide="${service.icon}"></i>`;
  if (contentEl) contentEl.innerHTML = service.description;

  if (window.lucide) lucide.createIcons();

  if (modal) {
    modal.classList.add('open');
    modal.setAttribute('aria-hidden', 'false');
  }
}

function closeServiceModal() {
  const modal = document.getElementById('service-modal');
  if (modal) {
    modal.classList.remove('open');
    modal.setAttribute('aria-hidden', 'true');
  }
}

function modalInquireAction() {
  closeServiceModal();
  if (currentModalServiceKey) {
    const serviceMap = {
      management: 'Property Management',
      sales: 'Buy or Sell Property',
      buying: 'Property Search',
      investment: 'Investment Advisory',
      development: 'Estate Development',
      rentals: 'Rent a Property'
    };
    selectInquiryType(serviceMap[currentModalServiceKey] || 'Other');
  } else {
    scrollToContact();
  }
}

/* Select Inquiry Dropdown & Scroll to Contact */
function selectInquiryType(typeName) {
  const contactSection = document.getElementById('contact');
  const selectEl = document.getElementById('inquiryType');

  if (selectEl) {
    for (let i = 0; i < selectEl.options.length; i++) {
      if (selectEl.options[i].value.toLowerCase().includes(typeName.toLowerCase())) {
        selectEl.selectedIndex = i;
        break;
      }
    }
  }

  if (contactSection) {
    contactSection.scrollIntoView({ behavior: 'smooth' });
  }
}

function scrollToContact() {
  const contactSection = document.getElementById('contact');
  if (contactSection) {
    contactSection.scrollIntoView({ behavior: 'smooth' });
  }
}

/* Form Submission Handler */
function handleFormSubmit(event) {
  event.preventDefault();

  const name = document.getElementById('fullName').value.trim();
  const phone = document.getElementById('phone').value.trim();
  const email = document.getElementById('email').value.trim();
  const type = document.getElementById('inquiryType').value;
  const message = document.getElementById('message').value.trim();

  if (!name || !phone || !email || !type || !message) {
    showToast("Please fill in all required fields.", "error");
    return;
  }

  const submitBtn = document.getElementById('form-submit-btn');
  const originalText = submitBtn.innerHTML;
  submitBtn.disabled = true;
  submitBtn.innerHTML = `<i data-lucide="loader" class="spin"></i> Sending Inquiry...`;
  if (window.lucide) lucide.createIcons();

  // Simulate network request
  setTimeout(() => {
    submitBtn.disabled = false;
    submitBtn.innerHTML = originalText;
    if (window.lucide) lucide.createIcons();

    // Reset Form
    document.getElementById('contact-form').reset();

    // Show Success Toast
    showToast(`Thank you, ${name}! Your ${type} inquiry has been received. Engr. Okoro's team will contact you shortly.`, "success");
  }, 1200);
}

/* Testimonial Slider Controls */
let currentTestimonialIndex = 0;
let testimonialInterval;

function setTestimonial(index) {
  const cards = document.querySelectorAll('.testimonial-card');
  const dots = document.querySelectorAll('.slider-dot');

  cards.forEach((card, i) => {
    if (i === index) {
      card.classList.add('active');
    } else {
      card.classList.remove('active');
    }
  });

  dots.forEach((dot, i) => {
    if (i === index) {
      dot.classList.add('active');
    } else {
      dot.classList.remove('active');
    }
  });

  currentTestimonialIndex = index;
}

function startTestimonialTimer() {
  testimonialInterval = setInterval(() => {
    const cards = document.querySelectorAll('.testimonial-card');
    if (cards.length > 0) {
      currentTestimonialIndex = (currentTestimonialIndex + 1) % cards.length;
      setTestimonial(currentTestimonialIndex);
    }
  }, 5000);
}

/* Legal Modals (Privacy & Terms) */
const legalData = {
  privacy: {
    title: "Privacy Policy",
    content: `
      <p><strong>Effective Date:</strong> August 2026</p>
      <p>At Ultimate Home Finders, we respect your privacy and are committed to protecting the personal information you share with us through our website and service channels.</p>
      <h4>Information We Collect:</h4>
      <ul>
        <li>Contact details: Name, phone number (+234 803 340 8144), email address (homefiders@ymail.com) provided when submitting inquiries.</li>
        <li>Property preferences: Locations across Port Harcourt, Lagos, Abuja, Owerri, budget parameters, and service requirements.</li>
      </ul>
      <h4>How We Use Your Information:</h4>
      <ul>
        <li>To respond to your inquiries regarding property management, sales, rentals, or advisory.</li>
        <li>To schedule property viewings and client consultations.</li>
        <li>We <strong>never sell, lease, or distribute</strong> your personal data to third-party marketers.</li>
      </ul>
      <p>If you have any questions regarding your data privacy, contact us at <strong>homefiders@ymail.com</strong> or visit our head office at Elekahia Housing Estate, Port Harcourt.</p>
    `
  },
  terms: {
    title: "Terms of Use",
    content: `
      <p><strong>Effective Date:</strong> August 2026</p>
      <p>Welcome to the official website of Ultimate Home Finders. By accessing or using this website, you agree to comply with the following terms:</p>
      <h4>Service Information:</h4>
      <ul>
        <li>This website provides informational overviews of Ultimate Home Finders' service lines across Port Harcourt, Lagos, Abuja, and Owerri, and routes visitors to active property listings on third-party portals (Nigeria Property Centre & PropertyPro.ng).</li>
        <li>Submitting an inquiry through this site does not constitute a binding legal contract until a formal client agency agreement or management contract is executed.</li>
      </ul>
      <h4>Intellectual Property:</h4>
      <ul>
        <li>All brand assets, text copy, logos, and visuals on this site are property of Ultimate Home Finders (Est. 1999). Unauthorized reproduction is prohibited.</li>
      </ul>
    `
  }
};

function openLegalModal(type) {
  const doc = legalData[type];
  if (!doc) return;

  const modal = document.getElementById('legal-modal');
  const titleEl = document.getElementById('modal-legal-title');
  const contentEl = document.getElementById('modal-legal-content');

  if (titleEl) titleEl.textContent = doc.title;
  if (contentEl) contentEl.innerHTML = doc.content;

  if (modal) {
    modal.classList.add('open');
    modal.setAttribute('aria-hidden', 'false');
  }
}

function closeLegalModal() {
  const modal = document.getElementById('legal-modal');
  if (modal) {
    modal.classList.remove('open');
    modal.setAttribute('aria-hidden', 'true');
  }
}

/* Toast System */
function showToast(message, type = "success") {
  const container = document.getElementById('toast-container');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  toast.innerHTML = `<i data-lucide="${type === 'success' ? 'check-circle' : 'alert-circle'}"></i> <span>${message}</span>`;

  container.appendChild(toast);
  if (window.lucide) lucide.createIcons();

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateX(-20px)';
    toast.style.transition = 'all 0.3s ease-out';
    setTimeout(() => toast.remove(), 300);
  }, 4000);
}
