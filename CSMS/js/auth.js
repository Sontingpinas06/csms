// Simple client-side authentication and role management
(function(){
  const STORAGE_KEY = 'csms.session';

  function getSession(){
    try { return JSON.parse(localStorage.getItem(STORAGE_KEY) || 'null'); } catch { return null; }
  }

  function setSession(user){
    localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
  }

  function clearSession(){
    localStorage.removeItem(STORAGE_KEY);
  }

  function requireAuth(allowedRoles){
    const s = getSession();
    if(!s){
      window.location.href = (window.CSMS_CONFIG?.routes?.login) || 'login.html';
      return false;
    }
    if(Array.isArray(allowedRoles) && allowedRoles.length){
      if(!allowedRoles.includes(s.role)){
        // Not authorized for this page; fallback to dashboard
        if (typeof showToast === 'function') showToast('Not authorized for this page', 'warning');
        window.location.href = (window.CSMS_CONFIG?.routes?.dashboard) || 'dashboard.html';
        return false;
      }
    }
    // Expose globally for convenience
    window.USER = s;
    return true;
  }

  function ensureAuthUI(){
    const s = getSession();
    if(!s) return;
    const nameEl = document.querySelector('.user-name');
    const roleEl = document.querySelector('.user-role');
    if(nameEl) nameEl.textContent = s.name || 'User';
    if(roleEl) roleEl.textContent = s.role || 'Member';
  }

  // Expose API
  window.getSession = getSession;
  window.setSession = setSession;
  window.clearSession = clearSession;
  window.requireAuth = requireAuth;
  window.ensureAuthUI = ensureAuthUI;
})();