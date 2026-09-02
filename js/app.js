/**
 * Application Core & State Router for Hrishi Tours & Travels
 * Coordinates LocalStorage persistence, User <-> Admin view transitions, and Toasts
 */

const STORAGE_KEY = 'hrishi_tours_data_v3';
const AUTH_KEY = 'hrishi_admin_auth';

class AppState {
  constructor() {
    this.data = this.loadData();
    this.currentView = 'user'; // 'user' or 'admin'
    this.currentAdminTab = 'overview';
  }

  loadData() {
    try {
      const saved = localStorage.getItem(STORAGE_KEY) || 
                    localStorage.getItem('hrishi_tours_data_v2') || 
                    localStorage.getItem('hrishi_tours_data_v1');
      if (saved) {
        const parsed = JSON.parse(saved);
        // Guarantee Meghalaya uses local verified asset
        if (parsed.destinations) {
          parsed.destinations.forEach(d => {
            if (d.id === 'meghalaya') {
              d.image = 'meghalaya.jpg';
            }
          });
        }
        if (parsed.packages) {
          parsed.packages.forEach(p => {
            if (p.destination === 'meghalaya' || p.id === 'pkg-meghalaya-wonders-5n6d') {
              p.image = 'meghalaya.jpg';
            }
          });
        }
        this.saveData(parsed);
        return parsed;
      }
    } catch (e) {
      console.warn('Could not load local storage data, using defaults.', e);
    }
    this.saveData(DEFAULT_DATA);
    return JSON.parse(JSON.stringify(DEFAULT_DATA));
  }

  saveData(customData = null) {
    if (customData) {
      this.data = customData;
    }
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this.data));
    } catch (e) {
      console.error('Failed to save to localStorage', e);
    }
    // Dispatch custom event to notify components
    window.dispatchEvent(new CustomEvent('dataUpdated', { detail: this.data }));
  }

  resetToDefaults() {
    this.data = JSON.parse(JSON.stringify(DEFAULT_DATA));
    this.saveData();
    showToast('Data reset to default values successfully', 'success');
  }

  isAuthenticated() {
    return localStorage.getItem(AUTH_KEY) === 'true';
  }

  setAuthenticated(status) {
    if (status) {
      localStorage.setItem(AUTH_KEY, 'true');
    } else {
      localStorage.removeItem(AUTH_KEY);
    }
  }
}

// Global App State Instance
const app = new AppState();

// Toast Notification Engine
function showToast(message, type = 'info') {
  const container = document.getElementById('toast-container');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  
  let icon = 'ℹ️';
  if (type === 'success') icon = '✅';
  if (type === 'error') icon = '⚠️';
  if (type === 'warning') icon = '🔔';

  toast.innerHTML = `<span>${icon}</span> <span>${message}</span>`;
  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateX(100%)';
    toast.style.transition = 'all 0.3s ease';
    setTimeout(() => toast.remove(), 300);
  }, 4000);
}

// Modal Controllers
function openModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }
}

function closeModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }
}

// Global View Switching: User Site <-> Admin Site
function switchView(viewName) {
  const userViewEl = document.getElementById('user-view');
  const adminViewEl = document.getElementById('admin-view');

  if (viewName === 'admin') {
    if (!app.isAuthenticated()) {
      openModal('admin-login-modal');
      return;
    }
    userViewEl.style.display = 'none';
    adminViewEl.style.display = 'block';
    app.currentView = 'admin';
    window.scrollTo({ top: 0, behavior: 'smooth' });
    if (window.renderAdminDashboard) {
      window.renderAdminDashboard();
    }
    showToast('Switched to Admin Management Dashboard', 'info');
  } else {
    adminViewEl.style.display = 'none';
    userViewEl.style.display = 'block';
    app.currentView = 'user';
    window.scrollTo({ top: 0, behavior: 'smooth' });
    if (window.renderUserPortal) {
      window.renderUserPortal();
    }
  }
}

// Document Ready Bootstrap
document.addEventListener('DOMContentLoaded', () => {
  // Check modal close buttons
  document.querySelectorAll('.modal-close-btn, .close-modal-trigger').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const modal = e.target.closest('.modal-overlay');
      if (modal) {
        closeModal(modal.id);
      }
    });
  });

  // Close modal when clicking outside card
  document.querySelectorAll('.modal-overlay').forEach(modal => {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        closeModal(modal.id);
      }
    });
  });

  // Admin login submission handler
  const loginForm = document.getElementById('admin-login-form');
  if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const pass = document.getElementById('admin-password-input').value;
      if (pass === 'admin123' || pass === 'admin' || pass === 'hrishi2026') {
        app.setAuthenticated(true);
        closeModal('admin-login-modal');
        showToast('Login Successful! Welcome to Admin Panel', 'success');
        switchView('admin');
      } else {
        showToast('Invalid password! (Demo passcode: admin123)', 'error');
      }
    });
  }

  // Admin quick demo login button
  const demoLoginBtn = document.getElementById('btn-demo-login');
  if (demoLoginBtn) {
    demoLoginBtn.addEventListener('click', () => {
      app.setAuthenticated(true);
      closeModal('admin-login-modal');
      showToast('Quick Demo Access Granted!', 'success');
      switchView('admin');
    });
  }

  // Admin logout handler
  const logoutBtn = document.getElementById('btn-admin-logout');
  if (logoutBtn) {
    logoutBtn.addEventListener('click', () => {
      app.setAuthenticated(false);
      showToast('Logged out of Admin Panel', 'info');
      switchView('user');
    });
  }

  // Stealth keyboard shortcut for admin management: Ctrl + Shift + A
  window.addEventListener('keydown', (e) => {
    if (e.ctrlKey && e.shiftKey && (e.key === 'A' || e.key === 'a')) {
      e.preventDefault();
      switchView('admin');
    }
  });
});
