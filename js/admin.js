/**
 * Admin Management Dashboard Controller for Hrishi Tours & Travels
 * Handles CRUD for Packages, Lead Status Tracking, Cab Rates, Banners, and CSV Exports
 */

let editingPackageId = null;

// Primary Admin Dashboard Render
function renderAdminDashboard() {
  const data = app.data;
  renderKPIs(data);
  renderAdminEnquiriesTable(data.initialEnquiries);
  renderAdminPackagesTable(data.packages);
  renderAdminCabFleet(data.cabs);
  renderAdminBannerSettings(data.banner);
}

// 1. Calculate & Render Real-Time KPIs
function renderKPIs(data) {
  const totalEnquiries = data.initialEnquiries.length;
  const newEnquiries = data.initialEnquiries.filter(e => e.status === 'New').length;
  const confirmedEnquiries = data.initialEnquiries.filter(e => e.status === 'Confirmed').length;
  const activePackages = data.packages.length;
  const totalCabs = data.cabs.length;

  // Estimated pipeline revenue
  const estRevenue = data.initialEnquiries
    .filter(e => e.status !== 'Cancelled')
    .reduce((acc, curr) => acc + (curr.adults * 9500), 0);

  document.getElementById('kpi-total-enquiries').textContent = totalEnquiries;
  document.getElementById('kpi-new-leads').textContent = `${newEnquiries} New`;
  document.getElementById('kpi-active-packages').textContent = activePackages;
  document.getElementById('kpi-fleet-count').textContent = `${totalCabs} Vehicles`;
  document.getElementById('kpi-est-revenue').textContent = `₹${(estRevenue / 100000).toFixed(1)} Lakh`;
  
  const badgeEl = document.getElementById('admin-badge-new-leads');
  if (badgeEl) {
    badgeEl.textContent = `${newEnquiries} New`;
    badgeEl.style.display = newEnquiries > 0 ? 'inline-block' : 'none';
  }
}

// 2. Admin Enquiries & Lead Tracking
function renderAdminEnquiriesTable(enquiries, filterStatus = 'all') {
  const tbody = document.getElementById('admin-enquiries-tbody');
  if (!tbody) return;

  let filtered = enquiries;
  if (filterStatus !== 'all') {
    filtered = filtered.filter(e => e.status.toLowerCase() === filterStatus.toLowerCase());
  }

  if (filtered.length === 0) {
    tbody.innerHTML = `<tr><td colspan="7" style="text-align: center; padding: 2rem; color: #64748b;">No inquiries found matching this filter.</td></tr>`;
    return;
  }

  tbody.innerHTML = filtered.map(enq => {
    const statusClass = enq.status.toLowerCase();
    const formattedDate = new Date(enq.timestamp).toLocaleDateString('en-IN', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' });
    
    return `
      <tr>
        <td><strong>${enq.id}</strong></td>
        <td>
          <div style="font-weight: 700; color: #0f172a;">${enq.customerName}</div>
          <div style="font-size: 0.78rem; color: #64748b;">${enq.phone}</div>
        </td>
        <td>
          <div style="font-weight: 600;">${enq.destination}</div>
          <div style="font-size: 0.78rem; color: #0d9488;">🗓️ ${enq.travelDate} (${enq.adults} Adults)</div>
        </td>
        <td>
          <select onchange="updateEnquiryStatus('${enq.id}', this.value)" style="padding: 0.35rem 0.65rem; border-radius: 6px; font-weight: 700; font-size: 0.8rem; border: 1px solid #cbd5e1;">
            <option value="New" ${enq.status === 'New' ? 'selected' : ''}>🔵 New</option>
            <option value="Contacted" ${enq.status === 'Contacted' ? 'selected' : ''}>🟡 Contacted</option>
            <option value="Confirmed" ${enq.status === 'Confirmed' ? 'selected' : ''}>🟢 Confirmed</option>
            <option value="Cancelled" ${enq.status === 'Cancelled' ? 'selected' : ''}>🔴 Cancelled</option>
          </select>
        </td>
        <td>
          <div style="max-width: 220px; font-size: 0.82rem; color: #475569; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;" title="${enq.notes}">
            ${enq.notes || 'No specific notes'}
          </div>
        </td>
        <td style="font-size: 0.8rem; color: #64748b;">${formattedDate}</td>
        <td>
          <div class="table-actions">
            <button class="btn-icon-action whatsapp" title="Chat on WhatsApp" onclick="replyCustomerWhatsApp('${enq.phone}', '${enq.customerName}', '${enq.destination}')">
              💬
            </button>
            <button class="btn-icon-action delete" title="Delete Inquiry" onclick="deleteEnquiry('${enq.id}')">
              🗑️
            </button>
          </div>
        </td>
      </tr>
    `;
  }).join('');
}

function updateEnquiryStatus(enquiryId, newStatus) {
  const updatedData = { ...app.data };
  const target = updatedData.initialEnquiries.find(e => e.id === enquiryId);
  if (target) {
    target.status = newStatus;
    app.saveData(updatedData);
    showToast(`Lead ${enquiryId} status updated to ${newStatus}`, 'success');
    renderKPIs(app.data);
  }
}

function replyCustomerWhatsApp(phone, name, destination) {
  const cleanPhone = phone.replace(/[^0-9]/g, '');
  const waNumber = cleanPhone.length === 10 ? `91${cleanPhone}` : cleanPhone;
  const msg = `Hello ${name}! 👋%0A%0AThank you for reaching out to *Hrishi Tours & Travels* regarding your upcoming trip to *${destination}*.%0A%0AWe have prepared customized homestay & cab options for you. Could you let us know your preferred travel dates?`;
  window.open(`https://wa.me/${waNumber}?text=${msg}`, '_blank');
}

function deleteEnquiry(enquiryId) {
  if (confirm(`Are you sure you want to delete inquiry ${enquiryId}?`)) {
    const updatedData = { ...app.data };
    updatedData.initialEnquiries = updatedData.initialEnquiries.filter(e => e.id !== enquiryId);
    app.saveData(updatedData);
    showToast('Inquiry removed successfully', 'info');
    renderKPIs(app.data);
    renderAdminEnquiriesTable(app.data.initialEnquiries);
  }
}

// 3. Admin Tour Packages CRUD
function renderAdminPackagesTable(packages) {
  const tbody = document.getElementById('admin-packages-tbody');
  if (!tbody) return;

  tbody.innerHTML = packages.map(pkg => `
    <tr>
      <td>
        <img src="${pkg.image}" style="width: 50px; height: 50px; border-radius: 8px; object-fit: cover;" alt="${pkg.title}" />
      </td>
      <td>
        <div style="font-weight: 700; color: #0f172a;">${pkg.title}</div>
        <div style="font-size: 0.78rem; color: #0d9488;">⏱️ ${pkg.duration} | 📍 ${pkg.destination}</div>
      </td>
      <td>
        <div style="font-weight: 700; color: #064e3b;">₹${pkg.price.toLocaleString('en-IN')}</div>
        <div style="font-size: 0.75rem; color: #94a3b8; text-decoration: line-through;">₹${pkg.originalPrice.toLocaleString('en-IN')}</div>
      </td>
      <td>
        <span class="status-pill ${pkg.featured ? 'confirmed' : 'contacted'}">
          ${pkg.featured ? '⭐ Featured' : 'Standard'}
        </span>
      </td>
      <td>
        <div class="table-actions">
          <button class="btn-icon-action" title="Edit Package" onclick="openEditPackageModal('${pkg.id}')">✏️</button>
          <button class="btn-icon-action delete" title="Delete Package" onclick="deletePackage('${pkg.id}')">🗑️</button>
        </div>
      </td>
    </tr>
  `).join('');
}

function openAddPackageModal() {
  editingPackageId = null;
  document.getElementById('pkg-modal-heading').textContent = 'Add New Tour Package';
  const form = document.getElementById('admin-package-form');
  form.reset();
  openModal('admin-package-modal');
}

function openEditPackageModal(pkgId) {
  const pkg = app.data.packages.find(p => p.id === pkgId);
  if (!pkg) return;

  editingPackageId = pkgId;
  document.getElementById('pkg-modal-heading').textContent = 'Edit Tour Package';
  
  const form = document.getElementById('admin-package-form');
  form.pkgTitle.value = pkg.title;
  form.pkgDestination.value = pkg.destination;
  form.pkgDuration.value = pkg.duration;
  form.pkgPickup.value = pkg.pickupDrop;
  form.pkgPrice.value = pkg.price;
  form.pkgOriginalPrice.value = pkg.originalPrice;
  form.pkgCategory.value = pkg.category;
  form.pkgImage.value = pkg.image;
  form.pkgFeatured.checked = pkg.featured;
  form.pkgInclusions.value = pkg.inclusions.join('\n');
  form.pkgExclusions.value = pkg.exclusions.join('\n');

  openModal('admin-package-modal');
}

function handleSavePackageForm(e) {
  e.preventDefault();
  const form = e.target;

  const title = form.pkgTitle.value.trim();
  const destination = form.pkgDestination.value;
  const duration = form.pkgDuration.value.trim();
  const pickupDrop = form.pkgPickup.value.trim();
  const price = parseInt(form.pkgPrice.value) || 9999;
  const originalPrice = parseInt(form.pkgOriginalPrice.value) || Math.round(price * 1.2);
  const category = form.pkgCategory.value;
  const image = form.pkgImage.value.trim() || 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=800&q=80';
  const featured = form.pkgFeatured.checked;
  const inclusions = form.pkgInclusions.value.split('\n').map(s => s.trim()).filter(Boolean);
  const exclusions = form.pkgExclusions.value.split('\n').map(s => s.trim()).filter(Boolean);

  const updatedData = { ...app.data };

  if (editingPackageId) {
    // Update existing
    const idx = updatedData.packages.findIndex(p => p.id === editingPackageId);
    if (idx !== -1) {
      updatedData.packages[idx] = {
        ...updatedData.packages[idx],
        title, destination, duration, pickupDrop, price, originalPrice, category, image, featured,
        inclusions: inclusions.length ? inclusions : updatedData.packages[idx].inclusions,
        exclusions: exclusions.length ? exclusions : updatedData.packages[idx].exclusions
      };
      showToast('Tour package updated successfully!', 'success');
    }
  } else {
    // Add new
    const newPkg = {
      id: `pkg-${Date.now()}`,
      title, destination, duration, pickupDrop, price, originalPrice, category, image, featured,
      rating: 5.0,
      reviewsCount: 1,
      inclusions: inclusions.length ? inclusions : ["Private Cab & Driver", "Standard Homestay/Hotel", "Breakfast & Dinner"],
      exclusions: exclusions.length ? exclusions : ["Personal expenses", "Permit entry tickets"],
      itinerary: [
        { day: 1, title: "Arrival & Transfer", desc: "Pickup and scenic transfer to hotel." },
        { day: 2, title: "Sightseeing Tour", desc: "Explore prominent attractions and viewpoints." },
        { day: 3, title: "Departure", desc: "Return drop with wonderful memories." }
      ]
    };
    updatedData.packages.unshift(newPkg);
    showToast('New tour package published!', 'success');
  }

  app.saveData(updatedData);
  closeModal('admin-package-modal');
  renderAdminPackagesTable(app.data.packages);
  renderKPIs(app.data);
}

function deletePackage(pkgId) {
  if (confirm('Are you sure you want to delete this tour package?')) {
    const updatedData = { ...app.data };
    updatedData.packages = updatedData.packages.filter(p => p.id !== pkgId);
    app.saveData(updatedData);
    showToast('Package removed from website', 'info');
    renderAdminPackagesTable(app.data.packages);
    renderKPIs(app.data);
  }
}

// 4. Admin Cab Fleet & Rates
function renderAdminCabFleet(cabs) {
  const container = document.getElementById('admin-cabs-grid');
  if (!container) return;

  container.innerHTML = cabs.map(cab => `
    <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 12px; padding: 1.25rem;">
      <div style="display: flex; gap: 1rem; align-items: center; margin-bottom: 0.75rem;">
        <img src="${cab.image}" style="width: 60px; height: 60px; border-radius: 8px; object-fit: cover;" />
        <div>
          <h4 style="font-size: 1rem; margin-bottom: 0.2rem;">${cab.name}</h4>
          <span style="font-size: 0.75rem; color: #0d9488; font-weight: 600;">${cab.type}</span>
        </div>
      </div>
      <div class="admin-form-group" style="margin-top: 0.75rem;">
        <label style="font-size: 0.75rem;">Daily Rental Rate (₹)</label>
        <input type="number" value="${cab.ratePerDay}" onchange="updateCabRate('${cab.id}', this.value)" style="padding: 0.5rem; font-weight: 700;" />
      </div>
    </div>
  `).join('');
}

function updateCabRate(cabId, newRate) {
  const updatedData = { ...app.data };
  const cab = updatedData.cabs.find(c => c.id === cabId);
  if (cab) {
    cab.ratePerDay = parseInt(newRate) || cab.ratePerDay;
    app.saveData(updatedData);
    showToast(`${cab.name} daily rate updated to ₹${cab.ratePerDay}`, 'success');
  }
}

// 5. Admin Banner & Announcement Settings
function renderAdminBannerSettings(banner) {
  const textInput = document.getElementById('admin-banner-text');
  const toggleInput = document.getElementById('admin-banner-toggle');
  if (textInput && toggleInput) {
    textInput.value = banner.text;
    toggleInput.checked = banner.enabled;
  }
}

function saveBannerSettings() {
  const text = document.getElementById('admin-banner-text').value;
  const enabled = document.getElementById('admin-banner-toggle').checked;

  const updatedData = { ...app.data };
  updatedData.banner = {
    ...updatedData.banner,
    text,
    enabled
  };

  app.saveData(updatedData);
  showToast('Promotional announcement bar updated on live site!', 'success');
}

// 6. CSV Export & Backup Download
function exportLeadsToCSV() {
  const enquiries = app.data.initialEnquiries;
  if (!enquiries.length) {
    showToast('No inquiries to export', 'warning');
    return;
  }

  const headers = ['Enquiry ID', 'Customer Name', 'Phone', 'Email', 'Destination', 'Travel Date', 'Adults', 'Preferred Cab', 'Status', 'Notes', 'Created At'];
  const rows = enquiries.map(e => [
    e.id,
    `"${e.customerName}"`,
    `"${e.phone}"`,
    `"${e.email}"`,
    `"${e.destination}"`,
    e.travelDate,
    e.adults,
    `"${e.cabRequired}"`,
    e.status,
    `"${(e.notes || '').replace(/"/g, '""')}"`,
    e.timestamp
  ]);

  const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
  const encodedUri = encodeURI(csvContent);
  const link = document.createElement('a');
  link.setAttribute('href', encodedUri);
  link.setAttribute('download', `Hrishi_Tours_Leads_${new Date().toISOString().slice(0,10)}.csv`);
  document.body.appendChild(link);
  link.click();
  link.remove();
  showToast('Inquiries exported as CSV successfully', 'success');
}

function exportFullBackupJSON() {
  const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(app.data, null, 2));
  const link = document.createElement('a');
  link.setAttribute('href', dataStr);
  link.setAttribute('download', `Hrishi_Tours_Backup_${new Date().toISOString().slice(0,10)}.json`);
  document.body.appendChild(link);
  link.click();
  link.remove();
  showToast('Full system backup downloaded', 'success');
}

// Admin Tab Navigation Switcher
function switchAdminTab(tabName) {
  app.currentAdminTab = tabName;
  document.querySelectorAll('.admin-nav-item').forEach(item => {
    if (item.getAttribute('data-tab') === tabName) {
      item.classList.add('active');
    } else {
      item.classList.remove('active');
    }
  });

  document.querySelectorAll('.admin-tab-content').forEach(section => {
    if (section.id === `admin-tab-${tabName}`) {
      section.style.display = 'block';
    } else {
      section.style.display = 'none';
    }
  });
}

// Admin DOM Bootstrap
document.addEventListener('DOMContentLoaded', () => {
  // Tab switcher
  document.querySelectorAll('.admin-nav-item').forEach(item => {
    item.addEventListener('click', () => {
      const tab = item.getAttribute('data-tab');
      if (tab) switchAdminTab(tab);
    });
  });

  // Package modal form submit
  const pkgForm = document.getElementById('admin-package-form');
  if (pkgForm) {
    pkgForm.addEventListener('submit', handleSavePackageForm);
  }

  // Enquiries filter dropdown inside admin
  const enqFilter = document.getElementById('admin-enquiry-status-filter');
  if (enqFilter) {
    enqFilter.addEventListener('change', (e) => {
      renderAdminEnquiriesTable(app.data.initialEnquiries, e.target.value);
    });
  }
});
