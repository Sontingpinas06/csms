// ITO IF GUSTO NIYO LANG NAMAN MAY LIGHT AND DARK MODE HWAHHHAHAHAHHAHA
let currentTheme = "dark";

function initializeTheme() {
  const savedTheme = localStorage.getItem("theme") || "dark";
  setTheme(savedTheme);
}

function toggleTheme() {
  const newTheme = currentTheme === "light" ? "dark" : "light";
  setTheme(newTheme);
}

function setTheme(theme) {
  currentTheme = theme;
  document.body.className = `theme-${theme}`;
  localStorage.setItem("theme", theme);

  const themeBtn = document.querySelector(".theme-btn");
  if (themeBtn) {
    const lightIcon = themeBtn.querySelector(".theme-icon-light");
    const darkIcon = themeBtn.querySelector(".theme-icon-dark");
    if (theme === "dark") {
      if (lightIcon) lightIcon.style.display = "none";
      if (darkIcon) darkIcon.style.display = "block";
    } else {
      if (lightIcon) lightIcon.style.display = "block";
      if (darkIcon) darkIcon.style.display = "none";
    }
  }
}

// IG GUSTO NIYO MALINIS KAHIT PAPANO PWEDE KAYO MAY FUNCTION AND CALL OUT NIYO NALANG PAG DIRECT KASI NAKAKAGULO KAYA BAHALA NA KAYO 
// THEN HANAP NALANG LUCIDE MAGANDA PERO KAYO BAHALA
function getSectionIcon(sectionId) {
  switch (sectionId) {
    case "tuition-balance":
      return `
        <span class="search-icon">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
               stroke="currentColor" stroke-width="2">
            <line x1="12" y1="1" x2="12" y2="23"></line>
            <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
          </svg>
        </span>`;
    case "scholarship-application":
      return `
        <span class="search-icon">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
               stroke="currentColor" stroke-width="2">
            <path d="M22 10v6M2 10l10-5 10 5-10 5z"></path>
            <path d="M6 12v5c3 3 9 3 12 0v-5"></path>
          </svg>
        </span>`;
    case "payment-portal":
      return `
        <span class="search-icon">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
               stroke="currentColor" stroke-width="2">
            <rect x="1" y="4" width="22" height="16" rx="2" ry="2"></rect>
            <line x1="1" y1="10" x2="23" y2="10"></line>
          </svg>
        </span>`;
    case "history":
      return `
        <span class="search-icon">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
               stroke="currentColor" stroke-width="2">
            <circle cx="12" cy="12" r="10"></circle>
            <polyline points="12,6 12,12 16,14"></polyline>
          </svg>
        </span>`;
    case "account-settings":
      return `
        <span class="search-icon">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
               stroke="currentColor" stroke-width="2">
            <circle cx="12" cy="12" r="3"></circle>
            <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83
                     2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33
                     1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2
                     2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4
                     a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0
                     2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82
                     1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2
                     2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9
                     a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83
                     2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9
                     a1.65 1.65 0 0 0 1 1.51V3a2 2 0 0 1 2-2
                     2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51
                     1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0
                     2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9
                     a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2
                     2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
          </svg>
        </span>`;
    default:
      return `
        <span class="search-icon">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
               stroke="currentColor" stroke-width="2">
            <circle cx="11" cy="11" r="8"></circle>
            <path d="M21 21l-4.35-4.35"></path>
          </svg>
        </span>`;
  }
}

function initializeSearch() {
  // Initialize search functionality
  function initSearch() {
    const searchTrigger = document.querySelector(".search-trigger");
    const searchOverlay = document.getElementById("searchOverlay");
    const searchClose = document.querySelector(".search-close");
    const globalSearchInput = document.getElementById("globalSearch");
    const searchResults = document.getElementById("searchResults");
    
    if (searchTrigger && searchOverlay) {
      searchTrigger.addEventListener("click", openGlobalSearch);
    }
    
    if (searchClose) {
      searchClose.addEventListener("click", closeGlobalSearch);
    }
    
    if (globalSearchInput) {
      globalSearchInput.addEventListener("input", handleGlobalSearch);
      globalSearchInput.addEventListener("keydown", handleSearchKeydown);
    }
    
    if (searchResults) {
      searchResults.addEventListener("click", handleSuggestionClick);
    }
    
    // Initialize with default suggestions
    if (searchResults) {
      searchResults.innerHTML = `
        <div class="search-suggestion" data-section="dashboard">
          ${getSectionIcon("dashboard")}
          <span>Dashboard</span>
        </div>
        <div class="search-suggestion" data-section="curriculum-builder">
          ${getSectionIcon("curriculum-builder")}
          <span>Curriculum Builder</span>
        </div>
        <div class="search-suggestion" data-section="subject-mapping">
          ${getSectionIcon("subject-mapping")}
          <span>Subject Mapping</span>
        </div>
        <div class="search-suggestion" data-section="electives">
          ${getSectionIcon("electives")}
          <span>Electives Manager</span>
        </div>
        <div class="search-suggestion" data-section="help">
          ${getSectionIcon("help")}
          <span>Help & Guide</span>
        </div>
      `;
      applySuggestionA11y();
    }
  }

  if (searchTrigger) searchTrigger.addEventListener("click", openGlobalSearch);
  if (searchClose) searchClose.addEventListener("click", closeGlobalSearch);

  // Debounced input handler for improved responsiveness
  const debouncedHandle = debounce(handleGlobalSearch, 200);
  if (globalSearchInput) globalSearchInput.addEventListener("input", debouncedHandle);

  // Close on ESC and click outside
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && searchOverlay && searchOverlay.classList.contains("show")) {
      closeGlobalSearch();
    }
  });
  if (searchOverlay) {
    searchOverlay.addEventListener("click", (e) => {
      if (e.target === searchOverlay) closeGlobalSearch();
    });
  }

  // Global shortcuts (ignore when focused in inputs)
  document.addEventListener('keydown', (e) => {
    const tag = (e.target && e.target.tagName) || '';
    const inField = ['INPUT', 'TEXTAREA', 'SELECT'].includes(tag);
    if ((e.ctrlKey || e.metaKey) && !inField) {
      const k = e.key.toLowerCase();
      if (k === 'k') { e.preventDefault(); openGlobalSearch(); }
      if (k === 't') { e.preventDefault(); toggleTheme(); }
      if (k === 'l') { e.preventDefault(); logout(); }
      if (k === 'h') { e.preventDefault(); openHelp(); }
    }
  });

  // Keyboard navigation when overlay is open
  document.addEventListener("keydown", (e) => {
    const overlay = document.getElementById("searchOverlay");
    if (!overlay || !overlay.classList.contains("show")) return;
    const items = Array.from(document.querySelectorAll(".search-suggestion"));
    if (e.key === "ArrowDown") { e.preventDefault(); moveSearchSelection(1, items); }
    else if (e.key === "ArrowUp") { e.preventDefault(); moveSearchSelection(-1, items); }
    else if (e.key === "Enter") {
      e.preventDefault();
      const selected = items[searchSelectionIndex] || items[0];
      if (selected && selected.dataset.section) showSection(selected.dataset.section);
    }
  });

  // Activate a suggestion on click
  if (searchResults) {
    searchResults.addEventListener("click", (e) => {
      const item = e.target.closest(".search-suggestion");
      if (item && item.dataset.section) showSection(item.dataset.section);
    });
  }

  enhanceAccessibility();
}

function openGlobalSearch() {
  const searchOverlay = document.getElementById("searchOverlay");
  const globalSearchInput = document.getElementById("globalSearch");
  const searchResults = document.getElementById("searchResults");

  if (searchOverlay) searchOverlay.classList.add("show");
  if (globalSearchInput) {
    globalSearchInput.value = "";
    globalSearchInput.focus();
  }

  if (searchResults) {
    searchResults.innerHTML = `
      <div class="search-suggestion" data-section="dashboard">
        ${getSectionIcon("history")}
        <span>Dashboard</span>
      </div>
      <div class="search-suggestion" data-section="curriculum-builder">
        ${getSectionIcon("account-settings")}
        <span>Curriculum Builder</span>
      </div>
      <div class="search-suggestion" data-section="subject-mapping">
        ${getSectionIcon("history")}
        <span>Subject Mapping</span>
      </div>
      <div class="search-suggestion" data-section="electives-manager">
        ${getSectionIcon("account-settings")}
        <span>Electives Manager</span>
      </div>
      <div class="search-suggestion" data-section="academic-standards">
        ${getSectionIcon("account-settings")}
        <span>Academic Standards</span>
      </div>
      <div class="search-suggestion" data-section="cde-pdap-validator">
        ${getSectionIcon("payment-portal")}
        <span>CDE/PDAP Validator</span>
      </div>
      <div class="search-suggestion" data-section="curriculum-export">
        ${getSectionIcon("payment-portal")}
        <span>Curriculum Export</span>
      </div>
      <div class="search-suggestion" data-section="help">
        ${getSectionIcon("account-settings")}
        <span>Help & Guide</span>
      </div>
    `;
    applySuggestionA11y();
    resetSearchSelection();
  }
}

function closeGlobalSearch() {
  const searchOverlay = document.getElementById("searchOverlay");
  const globalSearchInput = document.getElementById("globalSearch");
  if (searchOverlay) searchOverlay.classList.remove("show");
  if (globalSearchInput) globalSearchInput.value = "";
}

function handleGlobalSearch(e) {
  const query = e.target.value.toLowerCase();
  const searchResults = document.getElementById("searchResults");
  if (!searchResults) return;

  if (query.length === 0) {
    // Default suggestions
    searchResults.innerHTML = `
      <div class="search-suggestion" data-section="dashboard">
        ${getSectionIcon("dashboard")}
        <span>Dashboard</span>
      </div>
      <div class="search-suggestion" data-section="curriculum-builder">
        ${getSectionIcon("curriculum-builder")}
        <span>Curriculum Builder</span>
      </div>
      <div class="search-suggestion" data-section="subject-mapping">
        ${getSectionIcon("subject-mapping")}
        <span>Subject Mapping</span>
      </div>
      <div class="search-suggestion" data-section="electives">
        ${getSectionIcon("electives")}
        <span>Electives Manager</span>
      </div>
      <div class="search-suggestion" data-section="help">
        ${getSectionIcon("help")}
        <span>Help & Guide</span>
      </div>
    `;
  } else {
    // Filter suggestions based on search query
    const allSections = [
      { id: "dashboard", name: "Dashboard", icon: "dashboard" },
      { id: "curriculum-builder", name: "Curriculum Builder", icon: "curriculum-builder" },
      { id: "subject-mapping", name: "Subject Mapping", icon: "subject-mapping" },
      { id: "pre-requisite", name: "Pre-requisites", icon: "pre-requisite" },
      { id: "grade-weighting", name: "Grade Weighting", icon: "grade-weighting" },
      { id: "electives", name: "Electives Manager", icon: "electives" },
      { id: "academic-standards", name: "Academic Standards", icon: "academic-standards" },
      { id: "cde-pdap-validator", name: "CDE PDAP Validator", icon: "cde-pdap-validator" },
      { id: "help", name: "Help & Guide", icon: "help" }
    ];
    
    const filteredSections = allSections.filter(section => 
      section.name.toLowerCase().includes(query)
    );
    
    if (filteredSections.length > 0) {
      searchResults.innerHTML = filteredSections.map(section => `
        <div class="search-suggestion" data-section="${section.id}">
          ${getSectionIcon(section.icon)}
          <span>${section.name}</span>
        </div>
      `).join('');
    } else {
      searchResults.innerHTML = `
        <div class="search-no-results">
          <p>No results found for "${e.target.value}"</p>
          <p>Try searching for module names or features</p>
        </div>
      `;
    }
  }
  
  applySuggestionA11y();
  resetSearchSelection();
}

function performSearch(query) {
  const pool = [
    { title: "Dashboard", section: "dashboard" },
    { title: "Curriculum Builder", section: "curriculum-builder" },
    { title: "Subject Mapping", section: "subject-mapping" },
    { title: "Pre-requisite Configuration", section: "pre-requisite" },
    { title: "Electives Manager", section: "electives-manager" },
    { title: "Academic Standards", section: "academic-standards" },
    { title: "Subject Offering History", section: "subject-offering-history" },
    { title: "Subject Equivalency Tool", section: "subject-eq-tool" },
    { title: "Grade Weighting", section: "grade-weighting" },
    { title: "CDE/PDAP Validator", section: "cde-pdap-validator" },
    { title: "Curriculum Export", section: "curriculum-export" },
    { title: "Help & Guide", section: "help" },
  ];
  return pool.filter((r) => r.title.toLowerCase().includes(query));
}

function displaySearchResults(results) {
  const searchResults = document.getElementById("searchResults");
  if (!searchResults) return;

  if (results.length === 0) {
    searchResults.innerHTML = '<div class="search-suggestion">No results found</div>';
    applySuggestionA11y();
    resetSearchSelection();
    return;
  }

  searchResults.innerHTML = results
    .map(
      (r) => `
        <div class="search-suggestion" data-section="${r.section}">
          ${getSectionIcon(r.section)}
          <span>${r.title}</span>
        </div>
      `
    )
    .join("");
  applySuggestionA11y();
  resetSearchSelection();
}

function showSection(sectionId) {
  closeGlobalSearch();
  if (sectionId === 'help') { openHelp(); return; }
  const routes = {
  dashboard: "dashboard.html",
    "curriculum-builder": "curriculum-builder.html",
    "subject-mapping": "subject-mapping.html",
    "pre-requisite": "pre-requisite.html",
    "electives-manager": "electivesmanager.html",
    "academic-standards": "academic-standards.html",
    "subject-offering-history": "subject-offering-history.html",
    "subject-eq-tool": "subject-eq-tool.html",
    "grade-weighting": "grade-weighting.html",
    "cde-pdap-validator": "cde-pdap-validator.html",
    "curriculum-export": "curriculum-export.html",
  };
  const target = routes[sectionId] || "index.html";
  window.location.href = target;
}

// Help overlay
function openHelp() {
  let overlay = document.getElementById('helpOverlay');
  if (!overlay) {
    // Get current page to show relevant help
    const currentPage = window.location.pathname.split('/').pop() || 'dashboard.html';
    
    // Determine which help template to use
    let helpContent;
    if (currentPage.includes('electives')) {
      helpContent = helpTemplates.electives;
    } else if (currentPage.includes('curriculum')) {
      helpContent = helpTemplates.curriculum;
    } else if (currentPage.includes('subject-mapping')) {
      helpContent = helpTemplates.subjectMapping;
    } else if (currentPage.includes('academic-standards')) {
      helpContent = helpTemplates.academicStandards;
    } else if (currentPage.includes('cde-pdap')) {
      helpContent = helpTemplates.cdePdap;
    } else if (currentPage.includes('grade-weighting')) {
      helpContent = helpTemplates.gradeWeighting;
    } else if (currentPage.includes('pre-requisite')) {
      helpContent = helpTemplates.prerequisites;
    } else {
      // Dashboard or default
      helpContent = helpTemplates.dashboard;
    }
    
    // Create help overlay
    overlay = document.createElement('div');
    overlay.id = 'helpOverlay';
    overlay.className = 'search-overlay';
    
    // Generate sections HTML
    let sectionsHTML = '';
    helpContent.sections.forEach(section => {
      sectionsHTML += `
        <div class="help-section">
          <h3>${section.heading}</h3>
          <p>${section.content}</p>
        </div>
      `;
    });
    
    // Common help items
    let commonHelpItems = `
      <div class="search-suggestion"><span>1. Use the sidebar to navigate major sections.</span></div>
      <div class="search-suggestion"><span>2. Press Ctrl/Cmd + K to open Global Search.</span></div>
      <div class="search-suggestion"><span>3. Press Ctrl/Cmd + T to toggle Light/Dark theme.</span></div>
      <div class="search-suggestion"><span>4. Press Ctrl/Cmd + L to logout safely.</span></div>
    `;
    
    overlay.innerHTML = `
      <div class="search-container">
        <div class="search-header">
          <div style="font-weight:600">${helpContent.title}</div>
          <button class="search-close" onclick="closeHelp()">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>
        <div class="search-results" style="max-height: 60vh; overflow:auto;">
          <div class="help-content">
            ${sectionsHTML}
          </div>
          <div class="help-shortcuts">
            <h3>Keyboard Shortcuts</h3>
            ${commonHelpItems}
          </div>
        </div>
      </div>
    `;
    document.body.appendChild(overlay);
  }
  
  // Add close help function if it doesn't exist
  if (typeof closeHelp !== 'function') {
    window.closeHelp = function() {
      const helpOverlay = document.getElementById('helpOverlay');
      if (helpOverlay) {
        helpOverlay.classList.remove('show');
        setTimeout(() => {
          helpOverlay.remove();
        }, 300);
      }
    };
  }
  
  // Show the overlay with animation
  setTimeout(() => {
    overlay.classList.add('show');
  }, 10);
}

function closeHelp() {
  const overlay = document.getElementById('helpOverlay');
  if (overlay) overlay.classList.remove('show');
}

// Sidebar toggle + persisted state
function toggleSidebar() {
  const sidebar = document.querySelector(".sidebar");
  const main = document.querySelector(".main-content");
  if (!sidebar || !main) return;
  const collapsed = sidebar.classList.toggle("collapsed");
  main.classList.toggle("collapsed", collapsed);
  localStorage.setItem("sidebarCollapsed", collapsed ? "1" : "0");
  showToast(collapsed ? "Sidebar collapsed" : "Sidebar expanded", "info");
}

function initializeSidebarToggle() {
  const collapsed = localStorage.getItem("sidebarCollapsed") === "1";
  const sidebar = document.querySelector(".sidebar");
  const main = document.querySelector(".main-content");
  if (sidebar && main && collapsed) {
    sidebar.classList.add("collapsed");
    main.classList.add("collapsed");
  }
  initializeSidebarAutoCollapse();
}

function initializeSidebarAutoCollapse() {
  const sidebar = document.querySelector(".sidebar");
  const main = document.querySelector(".main-content");
  const applyAuto = () => {
    if (!sidebar || !main) return;
    const small = window.innerWidth < 992;
    const auto = sidebar.dataset.auto === "1";
    if (small && !sidebar.classList.contains("collapsed")) {
      sidebar.classList.add("collapsed");
      main.classList.add("collapsed");
      sidebar.dataset.auto = "1";
    } else if (!small && auto) {
      sidebar.classList.remove("collapsed");
      main.classList.remove("collapsed");
      delete sidebar.dataset.auto;
    }
  };
  applyAuto();
  window.addEventListener("resize", debounce(applyAuto, 150));
}

// Active nav highlighting
function highlightActiveNav() {
  const path = location.pathname.split("/").pop();
  document.querySelectorAll(".nav-link").forEach((link) => {
    const href = link.getAttribute("href");
    link.classList.toggle("active", href === path);
  });
}

// Toast notifications
function ensureToastContainer() {
  let container = document.getElementById("toastContainer");
  if (!container) {
    container = document.createElement("div");
    container.id = "toastContainer";
    container.className = "toast-container";
    document.body.appendChild(container);
  }
  return container;
}

function showToast(message, type = "info", duration = 2500) {
  const container = ensureToastContainer();
  const toast = document.createElement("div");
  toast.className = `toast toast--${type}`;
  toast.textContent = message;
  container.appendChild(toast);
  requestAnimationFrame(() => toast.classList.add("show"));
  setTimeout(() => {
    toast.classList.remove("show");
    setTimeout(() => toast.remove(), 300);
  }, duration);
}

// Shared confirm dialog
function confirmAction(message, onConfirm) {
  const overlay = document.createElement("div");
  overlay.className = "confirm-overlay";
  overlay.innerHTML = `
    <div class="confirm-dialog">
      <div class="confirm-message">${message}</div>
      <div class="confirm-actions">
        <button class="btn btn-secondary" data-action="cancel">Cancel</button>
        <button class="btn btn-primary" data-action="confirm">Confirm</button>
      </div>
    </div>
  `;
  document.body.appendChild(overlay);
  overlay.addEventListener("click", (e) => {
    const action = e.target.getAttribute("data-action");
    if (action === "confirm") {
      if (onConfirm) onConfirm();
      showToast("Action confirmed", "success");
      overlay.remove();
    } else if (action === "cancel" || e.target === overlay) {
      showToast("Cancelled", "warning");
      overlay.remove();
    }
  });
}

/* IF MAY LOG OUT NA KAYO PWEDE NA */
function logout() {
  showToast("Logging out…", "info");
  setTimeout(() => {
    try { if (typeof clearSession === 'function') clearSession(); } catch {}
    window.location.href = (window.CSMS_CONFIG?.routes?.login) || "index.html";
  }, 600);
}

/* Boot */
document.addEventListener("DOMContentLoaded", () => {
  initializeTheme();
  initializeSearch();
  initializeSidebarToggle();
  highlightActiveNav();
  setTheme(localStorage.getItem("theme") || "dark");
});

// Debounce utility
function debounce(fn, delay = 200) {
  let t;
  return (...args) => {
    clearTimeout(t);
    t = setTimeout(() => fn.apply(null, args), delay);
  };
}

// Keyboard selection helpers
let searchSelectionIndex = -1;
function resetSearchSelection() {
  searchSelectionIndex = -1;
  updateSearchSelection();
}
function moveSearchSelection(delta, items) {
  if (!items || !items.length) return;
  searchSelectionIndex = Math.max(0, Math.min(items.length - 1, searchSelectionIndex + delta));
  updateSearchSelection(items);
}
function updateSearchSelection(items = Array.from(document.querySelectorAll(".search-suggestion"))) {
  items.forEach((el, i) => {
    el.classList.toggle("selected", i === searchSelectionIndex);
  });
}

// Accessibility helpers for search overlay
function enhanceAccessibility() {
  const overlay = document.getElementById("searchOverlay");
  const input = document.getElementById("globalSearch");
  const results = document.getElementById("searchResults");
  if (overlay) {
    overlay.setAttribute("role", "dialog");
    overlay.setAttribute("aria-modal", "true");
  }
  if (input) {
    input.setAttribute("aria-label", "Global search");
    input.setAttribute("autocomplete", "off");
  }
  if (results) {
    results.setAttribute("role", "listbox");
    applySuggestionA11y();
  }
}
function applySuggestionA11y() {
  document.querySelectorAll(".search-suggestion").forEach((el) => {
    el.setAttribute("role", "option");
    const label = el.querySelector("span")?.textContent || "Result";
    el.setAttribute("aria-label", label);
  });
}

// Reusable download helper
function downloadFile(filename, blob) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

function exportJSON(selected) {
  const obj = {};
  selected.forEach(key => (obj[key] = mockData[key]));
  const blob = new Blob([JSON.stringify(obj, null, 2)], { type: 'application/json' });
  downloadFile('curriculum_export.json', blob);
}

function exportCSV(selected) {
  const parts = selected.map(key => {
    const data = mockData[key];
    const csv = toCSV(data);
    return `# ${key}\n${csv}`;
  }).join('\n\n');
  // Add BOM for better Excel compatibility
  const blob = new Blob(['\uFEFF' + parts], { type: 'text/plain;charset=utf-8' });
  downloadFile('curriculum_export.txt', blob);
}

function exportExcel(selected) {
  const content = selected.map(key => toCSV(mockData[key] || [])).join('\n\n');
  const blob = new Blob(['\uFEFF' + content], { type: 'application/vnd.ms-excel' });
  downloadFile('curriculum_export.xls', blob);
}

function exportWord(selected) {
  const sections = selected.map(key => {
    const csv = toCSV(mockData[key] || []);
    return `<h2>${key}</h2><pre>${csv}</pre>`;
  }).join('<hr/>');
  const html = `<!DOCTYPE html><html><body>${sections}</body></html>`;
  const blob = new Blob([html], { type: 'application/msword' });
  downloadFile('curriculum_export.doc', blob);
}

function getSectionIcon(section) {
  const icons = {
    "dashboard": `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="7" height="7"></rect><rect x="14" y="3" width="7" height="7"></rect><rect x="14" y="14" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect></svg>`,
    
    "curriculum-builder": `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path></svg>`,
    
    "subject-mapping": `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>`,
    
    "pre-requisite": `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="4 7 4 4 20 4 20 7"></polyline><line x1="9" y1="20" x2="15" y2="20"></line><line x1="12" y1="4" x2="12" y2="20"></line></svg>`,
    
    "grade-weighting": `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="20" x2="12" y2="10"></line><line x1="18" y1="20" x2="18" y2="4"></line><line x1="6" y1="20" x2="6" y2="16"></line></svg>`,
    
    "electives": `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path></svg>`,
    
    "academic-standards": `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>`,
    
    "cde-pdap-validator": `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>`,
    
    "help": `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>`
  };
  
  return icons[section] || `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle></svg>`;
}

// Handle search suggestion click
function handleSuggestionClick(e) {
  const suggestion = e.target.closest(".search-suggestion");
  if (!suggestion) return;
  
  const section = suggestion.dataset.section;
  closeGlobalSearch();
  
  if (section === "help") {
    // Open help overlay
    openHelp();
    return;
  }
  
  // Handle other sections as before
  navigateToSection(section);
}