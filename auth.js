/* ═══════════════════════════════════════════════════════
   AUTH.JS — Task 1: Frontend-only Login / Sign Up flow
   ═══════════════════════════════════════════════════════
   IMPORTANT: This is a TEMPORARY, client-side-only stand-in
   for real authentication. There is no server, no database,
   and no password hashing here — nothing here is secure.

   What it does today:
     - Shows the auth screen first, main site after "login"
     - Validates the login/signup forms on the frontend only
     - Simulates a successful login/signup (no real account
       is created or checked)
     - Remembers the "logged in" state in the browser only,
       via sessionStorage (this tab/session) or localStorage
       (if "Remember me" is checked)
     - Provides a Logout button that just returns the user to
       this screen

   How to swap this for real auth later:
     - Replace the body of `handleLogin()` / `handleSignup()`
       with real API calls (e.g. fetch('/api/login', ...))
     - Replace `setAuthenticated(true, remember)` with logic
       that stores a real session token instead of the
       'cryptokit_auth' flag
     - Replace `handleLogout()` with a real API call that
       invalidates the server-side session, then clears the
       local flag the same way it does now
   ═══════════════════════════════════════════════════════ */

var AUTH_STORAGE_KEY = 'cryptokit_auth';

/* ──────────────────────────────────────
   Screen switching: auth screen <-> main app
────────────────────────────────────── */
function showMainApp() {
    var authScreen = document.getElementById('authScreen');
    var mainApp     = document.getElementById('mainApp');
    if (authScreen) authScreen.classList.add('auth-screen-hidden');
    if (mainApp)    mainApp.classList.remove('main-app-hidden');

    var loginBtn  = document.getElementById('navLoginBtn');
    var logoutBtn = document.getElementById('navLogoutBtn');
    if (loginBtn)  loginBtn.style.display  = 'none';
    if (logoutBtn) logoutBtn.style.display = 'inline-flex';
}

function showAuthScreen() {
    var authScreen = document.getElementById('authScreen');
    var mainApp     = document.getElementById('mainApp');
    if (mainApp)    mainApp.classList.add('main-app-hidden');
    if (authScreen) authScreen.classList.remove('auth-screen-hidden');

    var loginBtn  = document.getElementById('navLoginBtn');
    var logoutBtn = document.getElementById('navLogoutBtn');
    if (loginBtn)  loginBtn.style.display  = '';
    if (logoutBtn) logoutBtn.style.display = 'none';

    switchAuthPanel('login');
}

/* ──────────────────────────────────────
   Persist / read the temporary auth flag
────────────────────────────────────── */
function setAuthenticated(isAuthed, remember) {
    try {
        if (isAuthed) {
            if (remember) {
                localStorage.setItem(AUTH_STORAGE_KEY, 'true');
                sessionStorage.removeItem(AUTH_STORAGE_KEY);
            } else {
                sessionStorage.setItem(AUTH_STORAGE_KEY, 'true');
                localStorage.removeItem(AUTH_STORAGE_KEY);
            }
        } else {
            localStorage.removeItem(AUTH_STORAGE_KEY);
            sessionStorage.removeItem(AUTH_STORAGE_KEY);
        }
    } catch (e) {
        /* Storage may be unavailable (e.g. private mode) — the
           session will simply not persist across reloads. */
    }
}

function isAuthenticated() {
    try {
        return sessionStorage.getItem(AUTH_STORAGE_KEY) === 'true' ||
               localStorage.getItem(AUTH_STORAGE_KEY) === 'true';
    } catch (e) {
        return false;
    }
}

/* ──────────────────────────────────────
   Login <-> Sign Up panel toggle
────────────────────────────────────── */
function switchAuthPanel(which) {
    var loginPanel  = document.getElementById('loginPanel');
    var signupPanel = document.getElementById('signupPanel');
    if (!loginPanel || !signupPanel) return;

    clearFormErrors('loginForm');
    clearFormErrors('signupForm');
    hideBanner('loginBanner');
    hideBanner('signupBanner');

    if (which === 'signup') {
        loginPanel.classList.remove('active');
        signupPanel.classList.add('active');
    } else {
        signupPanel.classList.remove('active');
        loginPanel.classList.add('active');
    }
}

/* ──────────────────────────────────────
   Show / hide password
────────────────────────────────────── */
function togglePasswordVisibility(inputId, btn) {
    var input = document.getElementById(inputId);
    if (!input) return;

    var icon = btn.querySelector('i');
    if (input.type === 'password') {
        input.type = 'text';
        input.classList.add('auth-pw-as-text');
        if (icon) { icon.classList.remove('fa-eye'); icon.classList.add('fa-eye-slash'); }
        btn.setAttribute('aria-label', 'Hide password');
    } else {
        input.type = 'password';
        input.classList.remove('auth-pw-as-text');
        if (icon) { icon.classList.remove('fa-eye-slash'); icon.classList.add('fa-eye'); }
        btn.setAttribute('aria-label', 'Show password');
    }
}

/* ──────────────────────────────────────
   Validation helpers
────────────────────────────────────── */
function isValidEmail(value) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function setFieldError(inputId, errorId, message) {
    var input = document.getElementById(inputId);
    var error = document.getElementById(errorId);
    if (input) input.classList.add('auth-input-error');
    if (error) { error.textContent = message; error.classList.add('show'); }
}

function clearFieldError(inputId, errorId) {
    var input = document.getElementById(inputId);
    var error = document.getElementById(errorId);
    if (input) input.classList.remove('auth-input-error');
    if (error) { error.textContent = ''; error.classList.remove('show'); }
}

function clearFormErrors(formId) {
    var form = document.getElementById(formId);
    if (!form) return;
    var errs = form.querySelectorAll('.auth-error');
    for (var i = 0; i < errs.length; i++) {
        errs[i].textContent = '';
        errs[i].classList.remove('show');
    }
    var inputs = form.querySelectorAll('.auth-input');
    for (var j = 0; j < inputs.length; j++) {
        inputs[j].classList.remove('auth-input-error');
    }
}

function showBanner(id, type, message) {
    var el = document.getElementById(id);
    if (!el) return;
    el.textContent = message;
    el.className = 'auth-banner show ' + type;
}

function hideBanner(id) {
    var el = document.getElementById(id);
    if (!el) return;
    el.textContent = '';
    el.className = 'auth-banner';
}

/* ──────────────────────────────────────
   Login form
────────────────────────────────────── */
function handleLogin(event) {
    event.preventDefault();
    clearFormErrors('loginForm');
    hideBanner('loginBanner');

    var email    = document.getElementById('loginEmail').value.trim();
    var password = document.getElementById('loginPassword').value;
    var remember = document.getElementById('rememberMe').checked;
    var valid    = true;

    if (!email) {
        setFieldError('loginEmail', 'loginEmailError', 'Email is required.');
        valid = false;
    } else if (!isValidEmail(email)) {
        setFieldError('loginEmail', 'loginEmailError', 'Enter a valid email address.');
        valid = false;
    }

    if (!password) {
        setFieldError('loginPassword', 'loginPasswordError', 'Password is required.');
        valid = false;
    }

    if (!valid) {
        showBanner('loginBanner', 'error', 'Please fix the highlighted fields.');
        return false;
    }

    /* ── TEMPORARY: no real authentication yet ──
       Any valid-looking email/password combination "succeeds".
       Replace this block with a real API call later. */
    showBanner('loginBanner', 'success', 'Login successful — loading CryptoKit…');
    setAuthenticated(true, remember);

    setTimeout(function () {
        showMainApp();
    }, 500);

    return false;
}

/* ──────────────────────────────────────
   Sign Up form
────────────────────────────────────── */
function handleSignup(event) {
    event.preventDefault();
    clearFormErrors('signupForm');
    hideBanner('signupBanner');

    var name            = document.getElementById('signupName').value.trim();
    var email           = document.getElementById('signupEmail').value.trim();
    var password        = document.getElementById('signupPassword').value;
    var confirmPassword = document.getElementById('signupConfirmPassword').value;
    var valid           = true;

    if (!name) {
        setFieldError('signupName', 'signupNameError', 'Name is required.');
        valid = false;
    }

    if (!email) {
        setFieldError('signupEmail', 'signupEmailError', 'Email is required.');
        valid = false;
    } else if (!isValidEmail(email)) {
        setFieldError('signupEmail', 'signupEmailError', 'Enter a valid email address.');
        valid = false;
    }

    if (!password) {
        setFieldError('signupPassword', 'signupPasswordError', 'Password is required.');
        valid = false;
    }

    if (!confirmPassword) {
        setFieldError('signupConfirmPassword', 'signupConfirmPasswordError', 'Please confirm your password.');
        valid = false;
    } else if (password && confirmPassword !== password) {
        setFieldError('signupConfirmPassword', 'signupConfirmPasswordError', 'Passwords do not match.');
        valid = false;
    }

    if (!valid) {
        showBanner('signupBanner', 'error', 'Please fix the highlighted fields.');
        return false;
    }

    /* ── TEMPORARY: no real account is created yet ──
       Replace this block with a real API call later. */
    showBanner('signupBanner', 'success', 'Account created — logging you in…');
    setAuthenticated(true, false);

    setTimeout(function () {
        showMainApp();
    }, 600);

    return false;
}

/* ──────────────────────────────────────
   Forgot password (no backend yet)
────────────────────────────────────── */
function handleForgotPassword() {
    showBanner('loginBanner', 'info', 'Password reset isn\'t available in this preview yet.');
}

/* ──────────────────────────────────────
   Logout
────────────────────────────────────── */
function handleLogout() {
    setAuthenticated(false, false);
    showAuthScreen();

    var loginForm  = document.getElementById('loginForm');
    var signupForm = document.getElementById('signupForm');
    if (loginForm)  loginForm.reset();
    if (signupForm) signupForm.reset();
}

/* ──────────────────────────────────────
   On load: sync nav buttons with auth state
   (the inline script in index.html already
   picked the correct starting screen to avoid
   a flash — this just syncs the nav buttons)
────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', function () {
    if (isAuthenticated()) {
        var loginBtn  = document.getElementById('navLoginBtn');
        var logoutBtn = document.getElementById('navLogoutBtn');
        if (loginBtn)  loginBtn.style.display  = 'none';
        if (logoutBtn) logoutBtn.style.display = 'inline-flex';
    }
});
