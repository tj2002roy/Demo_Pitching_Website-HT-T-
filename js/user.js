/**
 * User Facing Portal Controller for Hrishi Tours & Travels
 * Handles dynamic content rendering, search & filters, itinerary modals, cab calculator, and inquiry booking
 */

let activePackageFilter = 'all';

// Initialize User Portal
function renderUserPortal() {
  const data = app.data;
  renderAnnouncementBanner(data.banner);
  renderDestinations(data.destinations);
  renderPackages(data.packages);
  renderCabs(data.cabs);
  renderFareCalculatorRoutes(data.cabRoutes);
  renderTestimonials(data.testimonials);
  renderFaqs(data.faqs);
}

// 1. Top Announcement Banner
function renderAnnouncementBanner(banner) {
  const bannerEl = document.getElementById('top-announcement-bar');
  if (!bannerEl) return;
  if (!banner || !banner.enabled) {
    bannerEl.style.display = 'none';
  } else {
    bannerEl.style.display = 'flex';
    document.getElementById('banner-text-content').innerHTML = banner.text;
  }
}

// 2. Featured Destinations Grid
function renderDestinations(destinations) {
  const grid = document.getElementById('destinations-grid');
  if (!grid) return;

  grid.innerHTML = destinations.map(dest => `
    <div class="destination-card" onclick="filterPackagesByDestination('${dest.id}')">
      <img src="${dest.image}" alt="${dest.name}" loading="lazy" onerror="this.onerror=null; this.src='meghalaya.jpg';" />
      <div class="dest-badge">${dest.duration}</div>
      <div class="destination-overlay">
        <h3 class="dest-title">${dest.name}</h3>
        <p class="dest-tagline">${dest.tagline}</p>
        <div class="dest-meta">
          <span>⭐ Top Rated</span>
          <span>•</span>
          <span>${dest.highlights[0]}</span>
        </div>
      </div>
    </div>
  `).join('');
}

// 3. Tour Packages Showcase & Filtering
function renderPackages(packages, filter = activePackageFilter, searchKeyword = '') {
  const grid = document.getElementById('packages-grid');
  if (!grid) return;

  let filtered = packages;
  if (filter !== 'all') {
    filtered = filtered.filter(p => p.destination === filter || p.category.toLowerCase() === filter.toLowerCase());
  }

  if (searchKeyword.trim() !== '') {
    const kw = searchKeyword.toLowerCase();
    filtered = filtered.filter(p => 
      p.title.toLowerCase().includes(kw) || 
      p.destination.toLowerCase().includes(kw) ||
      p.duration.toLowerCase().includes(kw)
    );
  }

  if (filtered.length === 0) {
    grid.innerHTML = `
      <div style="grid-column: 1 / -1; text-align: center; padding: 4rem 1rem; background: var(--white); border-radius: var(--radius-lg);">
        <h3>No tour packages found</h3>
        <p style="color: var(--dark-600); margin: 0.5rem 0 1.5rem;">We can customize a special itinerary for this destination!</p>
        <button class="btn btn-primary" onclick="scrollToContact()">Request Custom Quotation</button>
      </div>
    `;
    return;
  }

  grid.innerHTML = filtered.map(pkg => `
    <div class="package-card">
      <div class="pkg-img-wrapper">
        <img src="${pkg.image}" alt="${pkg.title}" loading="lazy" onerror="this.onerror=null; this.src='meghalaya.jpg';" />
        <span class="pkg-category-tag">${pkg.category}</span>
        <span class="pkg-duration-badge">⏱️ ${pkg.duration}</span>
      </div>
      <div class="pkg-content">
        <div class="pkg-rating-row">
          <div class="pkg-rating">
            <span>⭐</span>
            <span>${pkg.rating}</span>
            <span class="pkg-reviews">(${pkg.reviewsCount} reviews)</span>
          </div>
          <span class="pkg-pickup">📍 ${pkg.pickupDrop}</span>
        </div>
        <h3 class="pkg-title">${pkg.title}</h3>
        <ul class="pkg-inclusions-preview">
          ${pkg.inclusions.slice(0, 3).map(inc => `
            <li>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><polyline points="20 6 9 17 4 12"></polyline></svg>
              <span>${inc}</span>
            </li>
          `).join('')}
        </ul>
        <div class="pkg-footer">
          <div class="pkg-price-block">
            <span class="pkg-price-label">Starting From</span>
            <div style="display: flex; align-items: baseline;">
              <span class="pkg-price">₹${pkg.price.toLocaleString('en-IN')}</span>
              <span class="pkg-original-price">₹${pkg.originalPrice.toLocaleString('en-IN')}</span>
            </div>
          </div>
          <div style="display: flex; gap: 0.5rem;">
            <button class="btn btn-outline" style="padding: 0.55rem 0.95rem; font-size: 0.85rem;" onclick="viewPackageItinerary('${pkg.id}')">Itinerary</button>
            <button class="btn btn-whatsapp" style="padding: 0.55rem 0.95rem; font-size: 0.85rem;" onclick="bookPackageWhatsApp('${pkg.id}')">Book</button>
          </div>
        </div>
      </div>
    </div>
  `).join('');
}

// 4. View Package Itinerary in Detailed Modal
function viewPackageItinerary(pkgId) {
  const pkg = app.data.packages.find(p => p.id === pkgId);
  if (!pkg) return;

  const modalImg = document.getElementById('itinerary-modal-img');
  const modalTitle = document.getElementById('itinerary-modal-title');
  const modalDuration = document.getElementById('itinerary-modal-duration');
  const modalPrice = document.getElementById('itinerary-modal-price');
  const modalTimeline = document.getElementById('itinerary-modal-timeline');
  const modalInclusions = document.getElementById('itinerary-modal-inclusions');
  const modalExclusions = document.getElementById('itinerary-modal-exclusions');
  const modalBookBtn = document.getElementById('itinerary-modal-book-btn');

  modalImg.src = pkg.image;
  modalImg.onerror = function() { this.src = 'meghalaya.jpg'; };
  modalTitle.textContent = pkg.title;
  modalDuration.textContent = `⏱️ ${pkg.duration} | 📍 Pickup: ${pkg.pickupDrop}`;
  modalPrice.textContent = `₹${pkg.price.toLocaleString('en-IN')} / person`;

  modalTimeline.innerHTML = pkg.itinerary.map(day => `
    <div class="day-item">
      <div class="day-tag">Day ${day.day}</div>
      <div class="day-item-title">${day.title}</div>
      <div class="day-item-desc">${day.desc}</div>
    </div>
  `).join('');

  modalInclusions.innerHTML = pkg.inclusions.map(inc => `
    <li style="display: flex; align-items: center; gap: 0.4rem; color: var(--dark-700); font-size: 0.88rem; margin-bottom: 0.35rem;">
      <span style="color: var(--success); font-weight: bold;">✓</span> ${inc}
    </li>
  `).join('');

  modalExclusions.innerHTML = pkg.exclusions.map(exc => `
    <li style="display: flex; align-items: center; gap: 0.4rem; color: var(--dark-600); font-size: 0.88rem; margin-bottom: 0.35rem;">
      <span style="color: var(--danger); font-weight: bold;">✕</span> ${exc}
    </li>
  `).join('');

  modalBookBtn.onclick = () => {
    closeModal('itinerary-modal');
    bookPackageWhatsApp(pkg.id);
  };

  openModal('itinerary-modal');
}

// 5. WhatsApp Direct Booking / Inquiry Generator
function bookPackageWhatsApp(pkgId) {
  const pkg = app.data.packages.find(p => p.id === pkgId);
  if (!pkg) return;

  const phone = app.data.company.whatsapp;
  const message = `Hello Hrishi Tours & Travels! 👋%0A%0AI am interested in booking the *${encodeURIComponent(pkg.title)}* (${pkg.duration}).%0A%0A*Price:* ₹${pkg.price}/person%0A*Pickup:* ${pkg.pickupDrop}%0A%0APlease share available dates and customized itinerary details.`;
  const url = `https://wa.me/${phone}?text=${message}`;
  window.open(url, '_blank');
}

// 6. Cab Fleet Render
function renderCabs(cabs) {
  const grid = document.getElementById('cabs-grid');
  if (!grid) return;

  grid.innerHTML = cabs.map(cab => `
    <div class="cab-card">
      <div class="cab-card-img">
        <img src="${cab.image}" alt="${cab.name}" loading="lazy" />
      </div>
      <h4 class="cab-card-name">${cab.name}</h4>
      <div class="cab-card-type">${cab.type}</div>
      <ul class="cab-specs">
        <li>👥 <strong>Capacity:</strong> ${cab.capacity}</li>
        <li>🧳 <strong>Luggage:</strong> ${cab.luggage}</li>
        <li>⭐ <strong>Ideal for:</strong> ${cab.recommendedFor}</li>
      </ul>
      <div class="cab-rate-box">
        <span style="font-size: 0.75rem; color: var(--dark-600); font-weight: 600;">Standard Rate</span>
        <span class="cab-rate">₹${cab.ratePerDay.toLocaleString('en-IN')}<span style="font-size: 0.75rem; color: var(--dark-400); font-weight: normal;"> / day</span></span>
      </div>
    </div>
  `).join('');
}

// 7. Interactive Cab Fare Estimator
function renderFareCalculatorRoutes(routes) {
  const routeSelect = document.getElementById('calc-route-select');
  if (!routeSelect) return;

  routeSelect.innerHTML = routes.map((r, idx) => `
    <option value="${idx}">${r.from} ➔ ${r.to}</option>
  `).join('');

  calculateEstimatedFare();
}

function calculateEstimatedFare() {
  const routeIdx = document.getElementById('calc-route-select').value;
  const vehicleType = document.getElementById('calc-vehicle-type').value;
  const route = app.data.cabRoutes[routeIdx];
  const fareDisplay = document.getElementById('calc-fare-amount');
  const noteDisplay = document.getElementById('calc-fare-note');

  if (!route) return;

  let fare = 0;
  if (vehicleType === 'sedan') {
    fare = route.sedanRate || Math.round(route.suvRate * 0.75);
  } else if (vehicleType === 'suv') {
    fare = route.suvRate;
  } else if (vehicleType === 'tempo') {
    fare = Math.round(route.suvRate * 1.65);
  }

  fareDisplay.textContent = `₹${fare.toLocaleString('en-IN')}`;
  noteDisplay.textContent = `Approx. distance: ${route.distance}. Includes fuel, toll & mountain driver allowance.`;
}

function bookEstimatedCabWhatsApp() {
  const routeIdx = document.getElementById('calc-route-select').value;
  const vehicleType = document.getElementById('calc-vehicle-type').value;
  const travelDate = document.getElementById('calc-date-input').value || 'Flexible';
  const route = app.data.cabRoutes[routeIdx];
  const fare = document.getElementById('calc-fare-amount').textContent;

  const phone = app.data.company.whatsapp;
  const message = `Hello Hrishi Tours! 🚖%0A%0AI want to book a mountain cab:%0A*Route:* ${route.from} to ${route.to}%0A*Vehicle Type:* ${vehicleType.toUpperCase()}%0A*Estimated Fare:* ${fare}%0A*Date:* ${travelDate}%0A%0APlease confirm cab availability and driver details.`;
  window.open(`https://wa.me/${phone}?text=${message}`, '_blank');
}

// 8. Testimonials
function renderTestimonials(testimonials) {
  const grid = document.getElementById('testimonials-grid');
  if (!grid) return;

  grid.innerHTML = testimonials.map(t => `
    <div class="testimonial-card">
      <div class="testimonial-header">
        <img class="test-avatar" src="${t.avatar}" alt="${t.name}" />
        <div class="test-author-info">
          <h4>${t.name}</h4>
          <p>${t.location} • ${t.date}</p>
        </div>
        <div class="test-rating">
          ${'⭐'.repeat(t.rating)}
        </div>
      </div>
      <p class="test-quote">"${t.review}"</p>
      <div class="test-tour-badge">🏔️ ${t.tour}</div>
    </div>
  `).join('');
}

// 9. FAQ Accordions
function renderFaqs(faqs) {
  const wrapper = document.getElementById('faqs-wrapper');
  if (!wrapper) return;

  wrapper.innerHTML = faqs.map((faq, idx) => `
    <div class="faq-item ${idx === 0 ? 'active' : ''}" onclick="toggleFaq(this)">
      <div class="faq-question">
        <span>${faq.q}</span>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="6 9 12 15 18 9"></polyline></svg>
      </div>
      <div class="faq-answer">
        <p>${faq.a}</p>
      </div>
    </div>
  `).join('');
}

function toggleFaq(el) {
  const isActive = el.classList.contains('active');
  document.querySelectorAll('.faq-item').forEach(item => item.classList.remove('active'));
  if (!isActive) {
    el.classList.add('active');
  }
}

// 10. Filter Helpers
function filterPackagesByDestination(destId) {
  activePackageFilter = destId;
  updateFilterPillsUI(destId);
  renderPackages(app.data.packages, destId);
  const pkgSection = document.getElementById('packages');
  if (pkgSection) {
    pkgSection.scrollIntoView({ behavior: 'smooth' });
  }
}

function updateFilterPillsUI(filterKey) {
  document.querySelectorAll('.filter-pill').forEach(pill => {
    if (pill.getAttribute('data-filter') === filterKey) {
      pill.classList.add('active');
    } else {
      pill.classList.remove('active');
    }
  });
}

function scrollToContact() {
  const contactSection = document.getElementById('contact');
  if (contactSection) {
    contactSection.scrollIntoView({ behavior: 'smooth' });
  }
}

// 11. Custom Trip Planning Form Submission
function handleCustomTripFormSubmit(e) {
  e.preventDefault();
  const form = e.target;

  const name = form.customerName.value.trim();
  const phone = form.phone.value.trim();
  const email = form.email.value.trim();
  const destination = form.destination.value;
  const travelDate = form.travelDate.value;
  const adults = parseInt(form.adults.value) || 2;
  const cabRequired = form.cabRequired.value;
  const notes = form.notes.value.trim();

  if (!name || !phone) {
    showToast('Please provide your name and contact phone number', 'error');
    return;
  }

  // Create new enquiry entry
  const newEnquiry = {
    id: `ENQ-${Math.floor(1000 + Math.random() * 9000)}`,
    customerName: name,
    phone: phone,
    email: email || 'Not specified',
    destination: destination,
    travelDate: travelDate || 'Flexible',
    adults: adults,
    children: 0,
    cabRequired: cabRequired,
    notes: notes || 'Direct customized package query from website.',
    status: 'New',
    timestamp: new Date().toISOString()
  };

  // Persist into state
  const updatedData = { ...app.data };
  updatedData.initialEnquiries.unshift(newEnquiry);
  app.saveData(updatedData);

  showToast('🎉 Trip inquiry submitted successfully! Opening WhatsApp...', 'success');
  form.reset();

  // Send to WhatsApp
  const waPhone = app.data.company.whatsapp;
  const waMsg = `Hello Hrishi Tours & Travels! 🏔️%0A%0AI would like a customized quotation for my trip:%0A*Lead ID:* ${newEnquiry.id}%0A*Name:* ${name}%0A*Phone:* ${phone}%0A*Destination:* ${destination}%0A*Travel Date:* ${travelDate}%0A*Guests:* ${adults} Adults%0A*Preferred Cab:* ${cabRequired}%0A*Notes:* ${encodeURIComponent(notes || 'None')}%0A%0APlease share best rates!`;
  
  setTimeout(() => {
    window.open(`https://wa.me/${waPhone}?text=${waMsg}`, '_blank');
  }, 1000);
}

// User Portal DOM Events Setup
document.addEventListener('DOMContentLoaded', () => {
  renderUserPortal();

  // Listen for data updates from admin
  window.addEventListener('dataUpdated', () => {
    renderUserPortal();
  });

  // Filter pills click
  document.querySelectorAll('.filter-pill').forEach(pill => {
    pill.addEventListener('click', () => {
      const filter = pill.getAttribute('data-filter');
      activePackageFilter = filter;
      updateFilterPillsUI(filter);
      renderPackages(app.data.packages, filter);
    });
  });

  // Hero Quick Search Form
  const searchForm = document.getElementById('hero-search-form');
  if (searchForm) {
    searchForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const dest = document.getElementById('search-dest-select').value;
      activePackageFilter = dest;
      updateFilterPillsUI(dest);
      renderPackages(app.data.packages, dest);
      const pkgSection = document.getElementById('packages');
      if (pkgSection) {
        pkgSection.scrollIntoView({ behavior: 'smooth' });
      }
    });
  }

  // Cab Calculator Input Changes
  const calcRoute = document.getElementById('calc-route-select');
  const calcVeh = document.getElementById('calc-vehicle-type');
  if (calcRoute && calcVeh) {
    calcRoute.addEventListener('change', calculateEstimatedFare);
    calcVeh.addEventListener('change', calculateEstimatedFare);
  }

  // Inquiry form submit
  const tripForm = document.getElementById('custom-trip-form');
  if (tripForm) {
    tripForm.addEventListener('submit', handleCustomTripFormSubmit);
  }

  // Navbar scroll background effect
  window.addEventListener('scroll', () => {
    const header = document.querySelector('.main-header');
    if (header) {
      if (window.scrollY > 50) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    }
  });

  // Mobile Navigation Menu Toggle & Auto-Close
  const mobileToggle = document.getElementById('mobile-nav-toggle');
  const navLinks = document.querySelector('.nav-links');
  if (mobileToggle && navLinks) {
    mobileToggle.addEventListener('click', () => {
      navLinks.classList.toggle('active');
      mobileToggle.innerHTML = navLinks.classList.contains('active') ? '<span>✕</span>' : '<span>☰</span>';
    });
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        if (mobileToggle) mobileToggle.innerHTML = '<span>☰</span>';
      });
    });
  }
});
