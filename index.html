<!DOCTYPE html>
<html lang="en" data-theme="normal">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0">
    <title>CryptoKit - Your Complete Cryptography Toolkit</title>

    <!-- Google Fonts -->
    <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500;700&family=Inter:wght@300;400;500;600&family=Share+Tech+Mono&display=swap" rel="stylesheet">

    <!-- Font Awesome Icons -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css">

    <!-- Custom CSS -->
    <link rel="stylesheet" href="style.css">

    <!-- Auth Screen CSS (Login/Signup) -->
    <link rel="stylesheet" href="auth.css">

    <style>
        /* ═══════════════════════════════════
           Fade-up Animations
        ═══════════════════════════════════ */
        .fade-up {
            opacity: 1 !important;
            transform: translateY(0) !important;
            transition: opacity 0.6s ease, transform 0.6s ease;
        }
        .fade-up.hidden {
            opacity: 0 !important;
            transform: translateY(30px) !important;
        }
        .js-loaded .fade-up:not(.visible) {
            opacity: 0;
            transform: translateY(30px);
        }
        .js-loaded .fade-up.visible {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }

        /* ═══════════════════════════════════════════════════
           MOBILE MENU — HIDDEN ON DESKTOP, SHOWN ON MOBILE
        ═══════════════════════════════════════════════════ */
        .mobile-menu-overlay {
            display: none;
            position: fixed;
            top: 0; left: 0; right: 0; bottom: 0;
            background: rgba(0, 0, 0, 0.6);
            backdrop-filter: blur(4px);
            -webkit-backdrop-filter: blur(4px);
            z-index: 9997;
            opacity: 0;
            transition: opacity 0.35s ease;
            pointer-events: none;
        }
        .mobile-menu-overlay.active {
            display: block;
            opacity: 1;
            pointer-events: auto;
        }

        .mobile-menu {
            position: fixed;
            top: 0;
            right: -100%;
            width: 85%;
            max-width: 360px;
            height: 100vh;
            height: 100dvh;
            background: var(--bg-primary, #0a0a1a);
            backdrop-filter: blur(20px);
            -webkit-backdrop-filter: blur(20px);
            z-index: 9998;
            overflow-y: auto;
            overflow-x: hidden;
            transition: right 0.4s cubic-bezier(0.4, 0, 0.2, 1);
            padding: 0;
            margin: 0;
            box-shadow: -10px 0 40px rgba(0, 0, 0, 0.5);
            border-left: 1px solid rgba(255, 255, 255, 0.08);
            -webkit-overflow-scrolling: touch;
            display: none;
            flex-direction: column;
            visibility: hidden;
        }

        /* On mobile screens, make the menu structurally present but off-screen */
        @media (max-width: 1100px) {
            .mobile-menu {
                display: flex;
                visibility: hidden;
                right: -100%;
            }
            .mobile-menu.active {
                right: 0;
                visibility: visible;
            }
        }

        /* On desktop, never show */
        @media (min-width: 1101px) {
            .mobile-menu {
                display: none !important;
                visibility: hidden !important;
            }
            .mobile-menu-overlay {
                display: none !important;
            }
        }

        [data-theme="normal"] .mobile-menu {
            background: #ffffff !important;
            border-left: 1px solid rgba(0, 0, 0, 0.08);
            box-shadow: -10px 0 40px rgba(0, 0, 0, 0.15);
        }
        [data-theme="hacker"] .mobile-menu {
            background: #050510 !important;
            border-left: 1px solid rgba(0, 255, 65, 0.2);
        }

        /* Mobile Menu Header */
        .mobile-menu-header {
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 20px 20px 16px 20px;
            border-bottom: 1px solid rgba(255,255,255,0.08);
            flex-shrink: 0;
            position: sticky;
            top: 0;
            background: inherit;
            z-index: 10;
        }
        [data-theme="normal"] .mobile-menu-header { border-bottom-color: rgba(0,0,0,0.08); background: #fff; }
        .mobile-menu-brand {
            display: flex;
            align-items: center;
            gap: 10px;
            text-decoration: none;
            color: inherit;
        }
        .mobile-menu-brand svg { color: var(--accent, #7c3aed); }
        .mobile-menu-brand-text {
            font-family: 'Space Grotesk', sans-serif;
            font-size: 18px;
            font-weight: 700;
            color: var(--text-primary, #fff);
        }
        [data-theme="normal"] .mobile-menu-brand-text { color: #111827; }
        .mobile-menu-close {
            width: 38px;
            height: 38px;
            border-radius: 10px;
            background: rgba(255,255,255,0.06);
            border: 1px solid rgba(255,255,255,0.1);
            color: var(--text-primary, #fff);
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 16px;
            transition: all 0.2s;
        }
        [data-theme="normal"] .mobile-menu-close {
            background: #f3f4f6;
            border-color: #e5e7eb;
            color: #111827;
        }
        .mobile-menu-close:hover {
            background: rgba(239, 68, 68, 0.15);
            border-color: #ef4444;
            color: #ef4444;
            transform: rotate(90deg);
        }

        /* Mobile Menu Links Container */
        .mobile-menu-body {
            flex: 1;
            overflow-y: auto;
            padding: 12px 0 20px 0;
            -webkit-overflow-scrolling: touch;
        }

        /* Reset default links */
        .mobile-menu .mobile-menu-body a,
        .mobile-menu a#mobilePremiumLink,
        .mobile-menu a#mobileAuthBtn {
            display: flex !important;
            align-items: center !important;
            gap: 12px !important;
            padding: 15px 20px !important;
            color: var(--text-primary, #fff) !important;
            text-decoration: none !important;
            font-family: 'Space Grotesk', sans-serif !important;
            font-size: 15px !important;
            font-weight: 500 !important;
            border-bottom: 1px solid rgba(255,255,255,0.04) !important;
            transition: all 0.2s ease !important;
            position: relative;
            background: transparent !important;
        }
        [data-theme="normal"] .mobile-menu .mobile-menu-body a,
        [data-theme="normal"] .mobile-menu a#mobilePremiumLink,
        [data-theme="normal"] .mobile-menu a#mobileAuthBtn {
            color: #111827 !important;
            border-bottom-color: rgba(0,0,0,0.05) !important;
        }
        .mobile-menu .mobile-menu-body a:hover,
        .mobile-menu .mobile-menu-body a:active {
            background: rgba(124, 58, 237, 0.08) !important;
            padding-left: 26px !important;
            color: var(--accent, #7c3aed) !important;
        }
        [data-theme="normal"] .mobile-menu .mobile-menu-body a:hover,
        [data-theme="normal"] .mobile-menu .mobile-menu-body a:active {
            background: rgba(99, 102, 241, 0.06) !important;
        }

        /* Mobile Menu Section Divider */
        .mobile-menu-divider {
            padding: 14px 20px 8px 20px;
            font-size: 11px;
            text-transform: uppercase;
            letter-spacing: 1.5px;
            font-weight: 700;
            color: var(--text-secondary, #a0aec0);
            opacity: 0.6;
            font-family: 'Space Grotesk', sans-serif;
        }
        [data-theme="normal"] .mobile-menu-divider { color: #6b7280; }

        /* Premium Link Special Styling */
        .mobile-menu a#mobilePremiumLink {
            margin: 8px 16px 12px 16px !important;
            padding: 14px 18px !important;
            border-radius: 12px !important;
            background: linear-gradient(135deg, rgba(251,191,36,0.15), rgba(245,158,11,0.08)) !important;
            border: 1px solid rgba(251,191,36,0.3) !important;
            color: #d97706 !important;
            font-weight: 700 !important;
        }
        [data-theme="hacker"] .mobile-menu a#mobilePremiumLink {
            color: #fbbf24 !important;
            background: linear-gradient(135deg, rgba(251,191,36,0.1), rgba(245,158,11,0.05)) !important;
        }
        .mobile-menu a#mobilePremiumLink:hover {
            padding-left: 18px !important;
            background: linear-gradient(135deg, rgba(251,191,36,0.22), rgba(245,158,11,0.12)) !important;
            transform: scale(1.02);
        }

        /* Login Button Special Styling */
        .mobile-menu a#mobileAuthBtn {
            margin: 12px 16px 8px 16px !important;
            padding: 14px 18px !important;
            border-radius: 12px !important;
            background: linear-gradient(135deg, #6366f1, #7c3aed) !important;
            color: #fff !important;
            font-weight: 600 !important;
            border: none !important;
            justify-content: center !important;
            text-align: center;
            box-shadow: 0 4px 14px rgba(99, 102, 241, 0.35);
        }
        .mobile-menu a#mobileAuthBtn:hover {
            padding-left: 18px !important;
            background: linear-gradient(135deg, #4f46e5, #6d28d9) !important;
            color: #fff !important;
            transform: translateY(-1px);
            box-shadow: 0 6px 20px rgba(99, 102, 241, 0.5);
        }
        /* Logged-in state = red logout button */
        .mobile-menu a#mobileAuthBtn.is-logout {
            background: linear-gradient(135deg, #ef4444, #dc2626) !important;
            box-shadow: 0 4px 14px rgba(239, 68, 68, 0.35) !important;
        }
        .mobile-menu a#mobileAuthBtn.is-logout:hover {
            background: linear-gradient(135deg, #dc2626, #b91c1c) !important;
            box-shadow: 0 6px 20px rgba(239, 68, 68, 0.5) !important;
        }

        /* Theme Toggle in Mobile */
        .mobile-menu a#mobileThemeToggleLink {
            background: rgba(255,255,255,0.02) !important;
        }
        [data-theme="normal"] .mobile-menu a#mobileThemeToggleLink {
            background: rgba(0,0,0,0.02) !important;
        }

        /* ── Mobile Theme Submenu ── */
        .mobile-theme-submenu {
            display: none;
            flex-direction: column;
            background: rgba(124, 58, 237, 0.05);
            border-left: 3px solid var(--accent, #7c3aed);
            margin: 0;
            padding: 0;
            overflow: hidden;
            transition: all 0.3s ease;
        }
        [data-theme="normal"] .mobile-theme-submenu { background: rgba(99,102,241,0.04); }
        .mobile-theme-submenu.open { display: flex; }
        .mobile-theme-submenu a {
            padding: 14px 20px 14px 32px !important;
            font-size: 14px !important;
            border-bottom: 1px solid rgba(255,255,255,0.04) !important;
            opacity: 0.9;
            display: flex !important;
            align-items: center;
            justify-content: space-between !important;
            gap: 10px;
            color: var(--text-primary, #fff);
            text-decoration: none;
            font-family: 'Space Grotesk', sans-serif;
            transition: all 0.2s;
        }
        [data-theme="normal"] .mobile-theme-submenu a {
            color: #111827;
            border-bottom-color: rgba(0,0,0,0.04) !important;
        }
        .mobile-theme-submenu a:last-child { border-bottom: none !important; }
        .mobile-theme-submenu a:hover {
            background: rgba(124,58,237,0.1);
            padding-left: 36px !important;
        }
        .mobile-theme-toggle-btn {
            display: flex !important;
            align-items: center;
            justify-content: space-between !important;
            width: 100%;
            background: none;
            border: none;
            cursor: pointer;
            font-family: inherit;
        }
        .mobile-theme-toggle-btn .theme-arrow {
            transition: transform 0.3s ease;
            font-size: 12px;
            margin-left: auto;
        }
        .mobile-theme-toggle-btn.active .theme-arrow { transform: rotate(180deg); }
        .mobile-theme-submenu a.active-theme {
            color: var(--accent, #7c3aed) !important;
            font-weight: 600;
            background: rgba(124,58,237,0.08);
        }
        .mobile-theme-submenu a .theme-active-dot {
            width: 8px; height: 8px;
            background: var(--accent, #7c3aed);
            border-radius: 50%;
            display: inline-block;
            box-shadow: 0 0 8px var(--accent, #7c3aed);
            flex-shrink: 0;
        }

        /* Hamburger Button Enhanced - HIDDEN ON DESKTOP */
        .hamburger {
            display: none;
            width: 44px;
            height: 44px;
            cursor: pointer;
            background: rgba(255,255,255,0.05);
            border: 1px solid rgba(255,255,255,0.1);
            border-radius: 10px;
            padding: 10px 8px;
            flex-direction: column;
            justify-content: space-between;
            align-items: center;
            box-sizing: border-box;
            transition: all 0.3s;
            flex-shrink: 0;
            z-index: 10000;
        }
        [data-theme="normal"] .hamburger {
            background: #f3f4f6;
            border-color: #e5e7eb;
        }
        .hamburger:hover {
            background: rgba(124, 58, 237, 0.1);
            border-color: rgba(124, 58, 237, 0.3);
        }
        .hamburger span {
            display: block;
            width: 24px;
            height: 2.5px;
            background: var(--text-primary, #fff);
            border-radius: 2px;
            transition: all 0.3s ease;
            transform-origin: center;
        }
        [data-theme="normal"] .hamburger span { background: #111827; }
        .hamburger.active span:nth-child(1) {
            transform: translateY(9px) rotate(45deg);
        }
        .hamburger.active span:nth-child(2) {
            opacity: 0;
            transform: scaleX(0);
        }
        .hamburger.active span:nth-child(3) {
            transform: translateY(-9px) rotate(-45deg);
        }

        /* Lock body scroll when menu open */
        body.menu-open {
            overflow: hidden !important;
            touch-action: none;
        }

        /* Mobile Developer Mode Popup */
        .mobile-dev-popup {
            display: none;
            position: fixed;
            top: 0; left: 0; right: 0; bottom: 0;
            z-index: 99999;
            align-items: center;
            justify-content: center;
            background: rgba(0,0,0,0.6);
            backdrop-filter: blur(6px);
            padding: 20px;
        }
        .mobile-dev-popup.show { display: flex; }
        .mobile-dev-popup-box {
            background: var(--card-bg, #1a1a2e);
            border: 2px solid var(--accent, #7c3aed);
            border-radius: 20px;
            padding: 36px 28px;
            max-width: 340px;
            width: 100%;
            text-align: center;
            box-shadow: 0 20px 60px rgba(124,58,237,0.4);
            animation: popupIn 0.3s cubic-bezier(0.34,1.56,0.64,1);
        }
        [data-theme="normal"] .mobile-dev-popup-box { background: #fff; }
        @keyframes popupIn {
            from { opacity: 0; transform: scale(0.7) translateY(30px); }
            to   { opacity: 1; transform: scale(1) translateY(0); }
        }
        .mobile-dev-popup-icon {
            font-size: 52px;
            margin-bottom: 16px;
            display: block;
            filter: drop-shadow(0 0 16px rgba(124,58,237,0.6));
        }
        .mobile-dev-popup-title {
            font-size: 20px;
            font-weight: 700;
            color: var(--text-primary, #fff);
            margin-bottom: 12px;
            font-family: 'Space Grotesk', sans-serif;
        }
        [data-theme="normal"] .mobile-dev-popup-title { color: #111827; }
        .mobile-dev-popup-msg {
            font-size: 14px;
            color: var(--text-secondary, #a0aec0);
            line-height: 1.6;
            margin-bottom: 24px;
        }
        [data-theme="normal"] .mobile-dev-popup-msg { color: #4b5563; }
        .mobile-dev-popup-msg strong { color: var(--accent, #7c3aed); }
        .mobile-dev-popup-close {
            background: linear-gradient(135deg, #7c3aed, #3b82f6);
            color: #fff;
            border: none;
            border-radius: 12px;
            padding: 12px 32px;
            font-size: 15px;
            font-weight: 600;
            cursor: pointer;
            font-family: 'Space Grotesk', sans-serif;
            transition: transform 0.2s, box-shadow 0.2s;
            width: 100%;
        }
        .mobile-dev-popup-close:hover {
            transform: translateY(-2px);
            box-shadow: 0 8px 24px rgba(124,58,237,0.5);
        }

        /* ═══════════════════════════════════════════════════
           TOOL CARDS — Equal Height
        ═══════════════════════════════════════════════════ */
        .tools-grid {
            display: grid !important;
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)) !important;
            gap: 24px !important;
            max-width: 1300px;
            margin: 0 auto;
            padding: 0 20px;
            align-items: stretch !important;
        }
        .tool-card {
            border-radius: 16px;
            padding: 28px;
            transition: all 0.4s;
            cursor: pointer;
            position: relative;
            overflow: hidden;
            display: flex !important;
            flex-direction: column !important;
            justify-content: flex-start !important;
            text-decoration: none;
            color: inherit;
            height: 100% !important;
            box-sizing: border-box;
        }
        [data-theme="normal"] .tool-card {
            background: #fff; border: 1px solid var(--glass-border);
            box-shadow: var(--shadow);
        }
        [data-theme="hacker"] .tool-card {
            background: #050505; border: 1px solid rgba(0, 255, 65, 0.15);
        }
        .tool-card::before {
            content: ''; position: absolute;
            top: 0; left: 0; right: 0; height: 2px;
            opacity: 0; transition: opacity 0.4s;
        }
        [data-theme="normal"] .tool-card::before {
            background: linear-gradient(90deg, #6C63FF, #00B4D8);
        }
        [data-theme="hacker"] .tool-card::before {
            background: linear-gradient(90deg, #00FF41, #00FFFF);
            box-shadow: 0 0 10px #00FF41;
        }
        .tool-card:hover::before { opacity: 1; }
        [data-theme="normal"] .tool-card:hover {
            border-color: rgba(108, 99, 255, 0.4);
            transform: translateY(-6px);
            box-shadow: var(--shadow-hover);
        }
        [data-theme="hacker"] .tool-card:hover {
            border-color: var(--primary);
            transform: translateY(-4px);
            box-shadow: 0 0 25px var(--primary-glow);
            animation: none;
        }
        .tool-card .tool-tags { margin-bottom: auto !important; }

        .feature-card { border-radius: 14px; padding: 22px; transition: all 0.3s; }
        [data-theme="normal"] .feature-card { background: #fff; border: 1px solid var(--glass-border); box-shadow: var(--shadow); }
        [data-theme="hacker"] .feature-card { background: #050505; border: 1px solid rgba(0, 255, 65, 0.1); }
        [data-theme="normal"] .feature-card:hover { border-color: rgba(108, 99, 255, 0.3); box-shadow: var(--shadow-hover); }
        [data-theme="hacker"] .feature-card:hover { border-color: rgba(0, 255, 65, 0.4); animation: none; }

        .stat-card { border-radius: 16px; padding: 28px 20px; text-align: center; transition: all 0.3s; }
        [data-theme="normal"] .stat-card { background: #fff; border: 1px solid var(--glass-border); box-shadow: var(--shadow); }
        [data-theme="hacker"] .stat-card { background: #050505; border: 1px solid rgba(0, 255, 65, 0.15); }
        [data-theme="normal"] .stat-card:hover { transform: translateY(-4px); box-shadow: var(--shadow-hover); }
        [data-theme="hacker"] .stat-card:hover { transform: translateY(-4px); border-color: var(--primary); box-shadow: 0 0 20px var(--primary-glow); animation: none; }

        .review-card { border-radius: 16px; padding: 28px; transition: all 0.3s; }
        [data-theme="normal"] .review-card { background: #fff; border: 1px solid var(--glass-border); box-shadow: var(--shadow); }
        [data-theme="hacker"] .review-card { background: #050505; border: 1px solid rgba(0, 255, 65, 0.12); }
        [data-theme="normal"] .review-card:hover { box-shadow: var(--shadow-hover); transform: translateY(-4px); }
        [data-theme="hacker"] .review-card:hover { border-color: rgba(0, 255, 65, 0.4); transform: translateY(-4px); }

        .tools-section, .tools-grid { display: block !important; visibility: visible !important; opacity: 1 !important; }
        .tools-grid { display: grid !important; }

        /* ═══════════════════════════════════
           USE NOW BUTTON ON TOOL CARDS
        ═══════════════════════════════════ */
        .tool-cta.use-now-btn {
            display: inline-flex !important; align-items: center; justify-content: center;
            gap: 8px; margin-top: 15px; padding: 12px 18px; border-radius: 10px;
            font-size: 13px; font-weight: 600; opacity: 1 !important; transform: none !important;
            width: 100%; box-sizing: border-box; transition: all 0.25s ease; cursor: pointer;
        }
        [data-theme="normal"] .tool-cta.use-now-btn { background: linear-gradient(135deg, #6C63FF, #8B5CF6); color: #fff !important; box-shadow: 0 4px 14px rgba(108, 99, 255, 0.35); }
        [data-theme="normal"] .tool-card:hover .tool-cta.use-now-btn { background: linear-gradient(135deg, #5b54e6, #7c4fe0); box-shadow: 0 6px 20px rgba(108, 99, 255, 0.5); transform: translateY(-2px) !important; }
        [data-theme="hacker"] .tool-cta.use-now-btn { background: transparent; color: #00FF41 !important; border: 1px solid #00FF41; box-shadow: 0 0 12px rgba(0, 255, 65, 0.3); letter-spacing: 1px; text-transform: uppercase; }
        [data-theme="hacker"] .tool-card:hover .tool-cta.use-now-btn { background: #00FF41; color: #000 !important; box-shadow: 0 0 25px rgba(0, 255, 65, 0.6); }

        .live-demo { display: flex; justify-content: center; align-items: center; width: 100%; }
        .demo-container { margin-left: auto; margin-right: auto; width: 100%; max-width: 900px; }
        .demo-header { text-align: center; }
        .auth-screen-hidden { display: none !important; }
        .main-app-hidden { display: none !important; }

        /* ═══════════════════════════════════════════════════
           NAVBAR
        ═══════════════════════════════════════════════════ */
        .navbar { display: flex !important; align-items: center !important; justify-content: space-between !important; padding: 15px 24px !important; gap: 16px !important; flex-wrap: nowrap !important; width: 100%; box-sizing: border-box; }
        .nav-logo { display: flex !important; align-items: center !important; gap: 10px !important; flex-shrink: 0 !important; text-decoration: none !important; }
        .nav-links { display: flex !important; align-items: center !important; justify-content: center !important; gap: 16px !important; flex-grow: 1 !important; margin: 0 !important; padding: 0 !important; list-style: none !important; min-width: 0 !important; }
        .nav-links li a { display: inline-flex !important; align-items: center !important; gap: 5px !important; white-space: nowrap !important; text-decoration: none !important; font-size: 14px !important; font-weight: 500 !important; }
        .nav-actions { display: flex !important; align-items: center !important; gap: 10px !important; flex-shrink: 0 !important; flex-wrap: nowrap !important; }
        .btn-nav-auth, .btn-nav-cta {
            display: inline-flex !important; align-items: center !important; justify-content: center !important;
            white-space: nowrap !important; height: 38px !important; box-sizing: border-box !important;
            padding: 0 14px !important; margin: 0 !important; border-radius: 8px !important;
            font-family: 'Space Grotesk', sans-serif !important; font-size: 13px !important;
            font-weight: 600 !important; text-decoration: none !important; cursor: pointer;
            transition: all 0.2s ease; line-height: 1 !important;
        }
        .btn-nav-auth { gap: 6px !important; background: rgba(255,255,255,0.05) !important; color: var(--text-primary, #fff) !important; border: 1px solid rgba(255,255,255,0.15) !important; }
        .btn-nav-auth:hover { background: rgba(255,255,255,0.1) !important; transform: translateY(-1px); }

        /* Logged-in state red Logout button */
        .btn-nav-auth.is-logout {
            background: rgba(239, 68, 68, 0.1) !important;
            border-color: rgba(239, 68, 68, 0.4) !important;
            color: #ef4444 !important;
        }
        .btn-nav-auth.is-logout:hover {
            background: rgba(239, 68, 68, 0.2) !important;
            border-color: #ef4444 !important;
            color: #ef4444 !important;
        }
        [data-theme="normal"] .btn-nav-auth { background: #f3f4f6 !important; border-color: #e5e7eb !important; color: #111827 !important; }
        [data-theme="normal"] .btn-nav-auth:hover { background: #e5e7eb !important; }
        [data-theme="normal"] .btn-nav-auth.is-logout { background: #fef2f2 !important; border-color: #fecaca !important; color: #dc2626 !important; }
        [data-theme="normal"] .btn-nav-auth.is-logout:hover { background: #fee2e2 !important; border-color: #ef4444 !important; }

        .mode-selector .mode-btn { height: 38px !important; padding: 0 12px !important; font-size: 13px !important; }

        /* ═══════════════════════════════════════════════════
           CENTERED SECTION HEADERS (Pro Cipher / Quantum)
        ═══════════════════════════════════════════════════ */
        .premium-tools-header,
        .tools-header {
            text-align: center !important;
            margin-left: auto !important;
            margin-right: auto !important;
            max-width: 800px;
            padding: 0 20px;
        }
        .premium-tools-header .section-badge,
        .tools-header .section-badge {
            display: inline-flex !important;
            align-items: center;
            justify-content: center;
            margin: 0 auto 16px auto !important;
        }
        .premium-tools-header .section-title,
        .tools-header .section-title {
            text-align: center !important;
            margin: 0 auto 14px auto !important;
            width: 100%;
        }
        .premium-tools-header .section-subtitle,
        .tools-header .section-subtitle {
            text-align: center !important;
            margin: 0 auto !important;
            max-width: 620px !important;
            width: 100%;
            display: block !important;
        }

        /* ═══════════════════════════════════════════════════
           RESPONSIVE BREAKPOINTS
        ═══════════════════════════════════════════════════ */

        @media (max-width: 1250px) {
            .navbar { padding: 15px 16px !important; gap: 12px !important; }
            .nav-links { gap: 12px !important; }
            .nav-links li a { font-size: 13px !important; }
        }

        /* Tablet landscape - Show hamburger, hide desktop nav */
        @media (max-width: 1100px) {
            .nav-links { display: none !important; }
            .nav-actions { display: none !important; }
            .hamburger { display: flex !important; }
        }

        @media (max-width: 900px) {
            .navbar { padding: 14px 18px !important; }
            .nav-logo-text { font-size: 18px !important; }
            .tools-grid { gap: 20px !important; padding: 0 16px; }
            .premium-tools-grid { gap: 20px !important; padding: 0 16px; }
        }

        @media (max-width: 768px) {
            .navbar { padding: 12px 16px !important; }
            .nav-logo-icon svg { width: 24px !important; height: 24px !important; }
            .nav-logo-text { font-size: 17px !important; }
            .hamburger { width: 40px; height: 40px; padding: 10px 7px; }
            .hamburger span { width: 22px; }
            .tools-grid, .premium-tools-grid {
                grid-template-columns: 1fr !important;
                padding: 0 16px;
                gap: 16px !important;
            }
            .tool-card { padding: 22px 20px; }
            .premium-tool-card { padding: 24px 20px 22px 20px; min-height: auto !important; }
            .premium-tools-section { padding: 60px 16px 40px; }
            .section-title { font-size: 28px !important; }
            .hero-title { font-size: 36px !important; }
            .hero-subtitle { font-size: 15px !important; }
            .mobile-menu { width: 90% !important; max-width: 340px !important; }
        }

        @media (max-width: 480px) {
            .navbar { padding: 10px 14px !important; gap: 10px !important; }
            .nav-logo-icon svg { width: 22px !important; height: 22px !important; }
            .nav-logo-text { font-size: 16px !important; }
            .hamburger { width: 38px; height: 38px; padding: 9px 6px; }
            .hamburger span { width: 20px; height: 2px; }
            .mobile-menu { width: 100% !important; max-width: 100% !important; }
            .mobile-menu-header { padding: 18px 18px 14px 18px; }
            .mobile-menu .mobile-menu-body a {
                padding: 14px 18px !important;
                font-size: 14.5px !important;
            }
            .section-title { font-size: 24px !important; }
            .hero-title { font-size: 30px !important; }
            .hero-subtitle { font-size: 14px !important; }
            .tool-card { padding: 20px 18px; }
            .tool-icon { width: 42px !important; height: 42px !important; font-size: 18px !important; }
            .tool-name { font-size: 17px !important; }
            .tool-desc { font-size: 13.5px !important; }
            .premium-tool-card { padding: 22px 18px 20px 18px; }
            .premium-tool-name { font-size: 18px !important; }
            .premium-tool-desc { font-size: 13.5px !important; }
            .premium-tool-icon { width: 44px !important; height: 44px !important; font-size: 18px !important; }
            .section-badge { font-size: 12px !important; }
            .mobile-dev-popup-box { padding: 28px 20px; }
            .mobile-dev-popup-title { font-size: 18px; }
            .mobile-dev-popup-icon { font-size: 44px; }
            .premium-tools-header, .tools-header { padding: 0 14px; }
        }

        @media (max-width: 360px) {
            .navbar { padding: 10px 12px !important; }
            .nav-logo-text { font-size: 15px !important; }
            .hamburger { width: 36px; height: 36px; }
            .mobile-menu .mobile-menu-body a { padding: 13px 16px !important; font-size: 14px !important; }
            .hero-title { font-size: 26px !important; }
            .section-title { font-size: 22px !important; }
        }

        @media (max-height: 500px) and (orientation: landscape) {
            .mobile-menu-header { padding: 12px 20px; }
            .mobile-menu .mobile-menu-body a { padding: 10px 20px !important; }
            .mobile-menu-divider { padding: 8px 20px 4px 20px; }
        }

        /* ═══════════════════════════════════════════════════
           PREMIUM TOOLS & QUANTUM TOOLS SECTIONS
        ═══════════════════════════════════════════════════ */
        .premium-tools-section { display: block; padding: 80px 20px 60px; position: relative; z-index: 10; }
        .premium-tools-header { margin-bottom: 50px; }
        .premium-tools-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 24px; max-width: 1200px; margin: 0 auto; align-items: stretch !important; }

        .premium-tool-card {
            display: flex !important; flex-direction: column !important; align-items: flex-start !important;
            text-decoration: none; color: inherit; border-radius: 16px; padding: 28px 24px 24px 24px;
            position: relative; overflow: hidden; transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            cursor: pointer; height: 100% !important; min-height: 360px !important; box-sizing: border-box !important;
        }
        [data-theme="normal"] .premium-tool-card { background: #ffffff; border: 1px solid #e5e7eb; box-shadow: 0 4px 20px rgba(0, 0, 0, 0.04); }
        [data-theme="normal"] .premium-tool-card:hover { transform: translateY(-6px); box-shadow: 0 14px 35px rgba(0, 0, 0, 0.08); border-color: #cbd5e1; }
        [data-theme="hacker"] .premium-tool-card { background: var(--card-bg, rgba(20,20,35,0.7)); border: 1px solid rgba(251,191,36,0.15); backdrop-filter: blur(12px); }
        [data-theme="hacker"] .premium-tool-card:hover { transform: translateY(-6px); border-color: #fbbf24; box-shadow: 0 16px 40px rgba(251, 191, 36, 0.15); }

        .premium-tool-card::before { content: ''; position: absolute; top: 0; left: 0; right: 0; height: 4px; background: linear-gradient(90deg, #6366f1, #06b6d4, #a855f7); }
        .quantum-tool-card::before { background: linear-gradient(90deg, #3b82f6, #8b5cf6, #ec4899); }

        .premium-tool-icon { width: 48px; height: 48px; border-radius: 12px; display: flex; align-items: center; justify-content: center; font-size: 20px; margin-bottom: 24px; flex-shrink: 0; transition: all 0.3s; }
        [data-theme="normal"] .premium-tool-icon { background: #eef2ff; color: #6366f1; }
        [data-theme="normal"] .quantum-tool-card .premium-tool-icon { background: #f5f3ff; color: #8b5cf6; }
        [data-theme="hacker"] .premium-tool-icon { background: rgba(251,191,36,0.1); color: #fbbf24; }
        [data-theme="hacker"] .quantum-tool-card .premium-tool-icon { background: rgba(139,92,246,0.15); color: #a78bfa; }

        .premium-tool-name { font-family: 'Space Grotesk', sans-serif; font-size: 20px; font-weight: 700; margin-bottom: 12px; text-align: left; }
        [data-theme="normal"] .premium-tool-name { color: #111827; }
        [data-theme="hacker"] .premium-tool-name { color: #fff; }

        .premium-tool-desc { font-size: 14.5px; line-height: 1.6; margin-bottom: 24px; text-align: left; }
        [data-theme="normal"] .premium-tool-desc { color: #4b5563; }
        [data-theme="hacker"] .premium-tool-desc { color: #a0aec0; }

        .premium-tool-tags { display: flex; flex-wrap: wrap; gap: 8px; margin-bottom: auto !important; margin-top: 0 !important; }
        .premium-tool-tags .ptag, .premium-tool-tags .qtag { padding: 4px 14px; border-radius: 20px; font-size: 12px; font-weight: 500; font-family: 'JetBrains Mono', monospace; white-space: nowrap; }
        [data-theme="normal"] .premium-tool-tags .ptag, [data-theme="normal"] .premium-tool-tags .qtag { background: #f8fafc; color: #64748b; border: 1px solid #e2e8f0; }
        [data-theme="hacker"] .premium-tool-tags .ptag { background: rgba(251,191,36,0.1); color: #fbbf24; border: 1px solid rgba(251,191,36,0.3); }
        [data-theme="hacker"] .premium-tool-tags .qtag { background: rgba(139,92,246,0.15); color: #a78bfa; border: 1px solid rgba(139,92,246,0.3); }

        .premium-tool-cta {
            width: 100%; display: flex !important; align-items: center; justify-content: center;
            gap: 8px; padding: 14px; border-radius: 10px; font-size: 15px; font-weight: 600;
            font-family: 'Space Grotesk', sans-serif; margin-top: 30px !important;
            transition: all 0.3s ease; box-sizing: border-box;
            background: linear-gradient(180deg, #f5a623, #d97706); color: #111827 !important;
            border: none; box-shadow: 0 8px 25px rgba(245, 158, 11, 0.35);
        }
        .premium-tool-cta i { font-size: 12px; }
        .premium-tool-card:hover .premium-tool-cta { transform: translateY(-2px); box-shadow: 0 12px 30px rgba(245, 158, 11, 0.5); background: linear-gradient(180deg, #fbbf24, #f59e0b); }
        .quantum-tool-card .premium-tool-cta { background: linear-gradient(180deg, #a855f7, #7c3aed); color: #fff !important; box-shadow: 0 8px 25px rgba(139, 92, 246, 0.4); }
        .quantum-tool-card:hover .premium-tool-cta { background: linear-gradient(180deg, #c084fc, #a855f7); box-shadow: 0 12px 30px rgba(139, 92, 246, 0.55); }

        /* Locked Premium Cards Styles */
        .premium-tool-card.locked::after {
            content: ''; position: absolute; top: 0; left: 0; right: 0; bottom: 0;
            background: rgba(15, 23, 42, 0.02); pointer-events: none; transition: all 0.3s ease;
        }
        [data-theme="hacker"] .premium-tool-card.locked::after { background: rgba(0, 0, 0, 0.15); }
        .premium-tool-card.locked:hover::after { background: rgba(15, 23, 42, 0.06); backdrop-filter: blur(1px); }
        [data-theme="hacker"] .premium-tool-card.locked:hover::after { background: rgba(0, 0, 0, 0.35); backdrop-filter: blur(1px); }

        .premium-tool-card.locked .premium-tool-cta {
            background: linear-gradient(135deg, #1e293b, #0f172a) !important;
            color: #cbd5e1 !important; border: 1px solid rgba(255, 255, 255, 0.08) !important;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1) !important;
        }
        .premium-tool-card.locked:hover .premium-tool-cta {
            background: linear-gradient(135deg, #334155, #1e293b) !important;
            color: #f8fafc !important; box-shadow: 0 6px 18px rgba(0, 0, 0, 0.2) !important;
            transform: translateY(-1px);
        }
        .premium-tool-card.quantum-tool-card.locked .premium-tool-cta {
            background: linear-gradient(135deg, #2e1065, #0f052d) !important;
            color: #e9d5ff !important; border: 1px solid rgba(168, 85, 247, 0.15) !important;
        }
        .premium-tool-card.quantum-tool-card.locked:hover .premium-tool-cta {
            background: linear-gradient(135deg, #4c1d95, #2e1065) !important;
            color: #f3e8ff !important; border-color: rgba(168, 85, 247, 0.3) !important;
        }

        .premium-tool-card .premium-crown { position: absolute; top: 16px; right: 20px; font-size: 18px; }
        [data-theme="normal"] .premium-tool-card .premium-crown { filter: drop-shadow(0 0 4px rgba(251,191,36,0.4)); opacity: 0.85; }
        [data-theme="hacker"] .premium-tool-card .premium-crown { filter: drop-shadow(0 0 6px rgba(251,191,36,0.6)); }
        [data-theme="hacker"] .quantum-tool-card .premium-crown { filter: drop-shadow(0 0 8px rgba(139,92,246,0.8)); }

        .premium-tool-card.coming-soon { opacity: 0.7; cursor: default; }
        [data-theme="normal"] .premium-tool-card.coming-soon { border: 1px dashed #cbd5e1; background: #fafafa; }
        .premium-tool-card.coming-soon:hover { transform: none; }
        [data-theme="normal"] .premium-tool-card.coming-soon:hover { box-shadow: 0 4px 20px rgba(0, 0, 0, 0.03); border-color: #cbd5e1; }
        [data-theme="hacker"] .premium-tool-card.coming-soon { border: 1px dashed rgba(255,255,255,0.15); box-shadow: none; }

        .coming-soon-badge {
            display: inline-flex; align-items: center; gap: 6px; padding: 14px; border-radius: 10px;
            font-size: 14px; font-weight: 600; width: 100%; justify-content: center; margin-top: 30px;
            box-sizing: border-box; font-family: 'Space Grotesk', sans-serif;
        }
        [data-theme="normal"] .coming-soon-badge { background: #f1f5f9; color: #64748b; border: 1px dashed #cbd5e1; }
        [data-theme="hacker"] .coming-soon-badge { background: rgba(255,255,255,0.06); color: #a0aec0; }

        /* ═══════════════════════════════════════════════════════════
           PREMIUM ACTIVE — WARM GOLDEN THEME OVERRIDES
        ═══════════════════════════════════════════════════════════ */
        html.premium-active[data-theme="normal"] .navbar {
            border-bottom: 1px solid rgba(251, 191, 36, 0.2) !important;
            background: linear-gradient(180deg, rgba(255,251,235,0.95), rgba(255,255,255,0.95)) !important;
        }
        html.premium-active[data-theme="normal"] .hero-badge {
            background: linear-gradient(135deg, rgba(251,191,36,0.12), rgba(245,158,11,0.08)) !important;
            border-color: rgba(251,191,36,0.3) !important;
        }
        html.premium-active[data-theme="normal"] .hero-badge .dot { background: #f59e0b !important; box-shadow: 0 0 8px #f59e0b !important; }
        html.premium-active[data-theme="normal"] .gradient-text {
            background: linear-gradient(135deg, #d97706, #f59e0b, #eab308) !important;
            -webkit-background-clip: text !important;
            -webkit-text-fill-color: transparent !important;
            background-clip: text !important;
        }
        html.premium-active[data-theme="normal"] .tool-card::before { background: linear-gradient(90deg, #f59e0b, #d97706, #fbbf24) !important; }
        html.premium-active[data-theme="normal"] .tool-card:hover { border-color: rgba(245, 158, 11, 0.35) !important; box-shadow: 0 12px 35px rgba(245, 158, 11, 0.1) !important; }
        html.premium-active[data-theme="normal"] .tool-cta.use-now-btn { background: linear-gradient(135deg, #f59e0b, #d97706) !important; box-shadow: 0 4px 14px rgba(245, 158, 11, 0.3) !important; }
        html.premium-active[data-theme="normal"] .tool-card:hover .tool-cta.use-now-btn { background: linear-gradient(135deg, #d97706, #b45309) !important; box-shadow: 0 6px 20px rgba(245, 158, 11, 0.45) !important; }
        html.premium-active[data-theme="normal"] .section-badge { background: rgba(251, 191, 36, 0.08) !important; color: #d97706 !important; border-color: rgba(251, 191, 36, 0.2) !important; }
        html.premium-active[data-theme="normal"] .btn-primary { background: linear-gradient(135deg, #f59e0b, #d97706) !important; box-shadow: 0 4px 16px rgba(245, 158, 11, 0.3) !important; }
        html.premium-active[data-theme="normal"] .btn-primary:hover { background: linear-gradient(135deg, #d97706, #b45309) !important; box-shadow: 0 6px 24px rgba(245, 158, 11, 0.45) !important; }
        html.premium-active[data-theme="normal"] .scroll-top { background: linear-gradient(135deg, #f59e0b, #d97706) !important; color: #fff !important; }
        html.premium-active[data-theme="normal"] .stat-card:hover { border-color: rgba(245, 158, 11, 0.3) !important; box-shadow: 0 8px 25px rgba(245, 158, 11, 0.1) !important; }
        html.premium-active[data-theme="normal"] .feature-card:hover { border-color: rgba(245, 158, 11, 0.3) !important; }
        html.premium-active[data-theme="normal"] .cta-section .cta-glow { background: radial-gradient(circle, rgba(245, 158, 11, 0.12), transparent 70%) !important; }
        html.premium-active[data-theme="normal"] .premium-tool-card::before { background: linear-gradient(90deg, #f59e0b, #d97706, #fbbf24) !important; }
        html.premium-active[data-theme="normal"] .premium-tool-icon { background: #fef3c7 !important; color: #d97706 !important; }
        html.premium-active[data-theme="normal"] .step-number { background: linear-gradient(135deg, #f59e0b, #d97706) !important; }
        html.premium-active[data-theme="normal"] .ai-fab { background: linear-gradient(135deg, #f59e0b, #d97706) !important; box-shadow: 0 4px 20px rgba(245,158,11,0.4) !important; }
        html.premium-active[data-theme="normal"] .ai-chat-header { background: linear-gradient(135deg, #f59e0b, #d97706) !important; }

        /* Hacker Mode + Premium Active (Golden Matrix) */
        html.premium-active[data-theme="hacker"] .tool-card { border-color: rgba(251, 191, 36, 0.12) !important; }
        html.premium-active[data-theme="hacker"] .tool-card::before { background: linear-gradient(90deg, #fbbf24, #f59e0b, #d97706) !important; box-shadow: 0 0 10px rgba(251, 191, 36, 0.5) !important; }
        html.premium-active[data-theme="hacker"] .tool-card:hover { border-color: rgba(251, 191, 36, 0.4) !important; box-shadow: 0 0 25px rgba(251, 191, 36, 0.15) !important; }
        html.premium-active[data-theme="hacker"] .tool-cta.use-now-btn { color: #fbbf24 !important; border-color: #fbbf24 !important; box-shadow: 0 0 12px rgba(251, 191, 36, 0.3) !important; }
        html.premium-active[data-theme="hacker"] .tool-card:hover .tool-cta.use-now-btn { background: #fbbf24 !important; color: #000 !important; box-shadow: 0 0 25px rgba(251, 191, 36, 0.6) !important; }
        html.premium-active[data-theme="hacker"] .navbar { border-bottom: 1px solid rgba(251, 191, 36, 0.15) !important; }
        html.premium-active[data-theme="hacker"] .hero-badge .dot { background: #fbbf24 !important; box-shadow: 0 0 8px #fbbf24 !important; }
        html.premium-active[data-theme="hacker"] .ai-fab { box-shadow: 0 4px 20px rgba(251,191,36,0.4) !important; }

        /* Enterprise / Quantum Active */
        html.enterprise-active[data-theme="normal"] .navbar {
            border-bottom: 1px solid rgba(139, 92, 246, 0.2) !important;
            background: linear-gradient(180deg, rgba(245,243,255,0.95), rgba(255,255,255,0.95)) !important;
        }
        html.enterprise-active[data-theme="normal"] .gradient-text {
            background: linear-gradient(135deg, #7c3aed, #3b82f6, #06b6d4) !important;
            -webkit-background-clip: text !important;
            -webkit-text-fill-color: transparent !important;
            background-clip: text !important;
        }
        html.enterprise-active[data-theme="normal"] .tool-card::before { background: linear-gradient(90deg, #8b5cf6, #3b82f6, #06b6d4) !important; }
        html.enterprise-active[data-theme="normal"] .tool-cta.use-now-btn { background: linear-gradient(135deg, #7c3aed, #6366f1) !important; box-shadow: 0 4px 14px rgba(124, 58, 237, 0.3) !important; }
        html.enterprise-active[data-theme="normal"] .btn-primary { background: linear-gradient(135deg, #7c3aed, #3b82f6) !important; box-shadow: 0 4px 16px rgba(124, 58, 237, 0.3) !important; }
        html.enterprise-active[data-theme="normal"] .scroll-top { background: linear-gradient(135deg, #7c3aed, #3b82f6) !important; color: #fff !important; }
        html.enterprise-active[data-theme="normal"] .section-badge { background: rgba(139, 92, 246, 0.08) !important; color: #7c3aed !important; border-color: rgba(139, 92, 246, 0.2) !important; }
        html.enterprise-active[data-theme="normal"] .cta-section .cta-glow { background: radial-gradient(circle, rgba(139, 92, 246, 0.15), transparent 70%) !important; }
        html.enterprise-active[data-theme="normal"] .premium-tool-icon { background: #ede9fe !important; color: #7c3aed !important; }
        html.enterprise-active[data-theme="normal"] .hero-badge { background: linear-gradient(135deg, rgba(139,92,246,0.12), rgba(59,130,246,0.08)) !important; border-color: rgba(139,92,246,0.3) !important; }
        html.enterprise-active[data-theme="normal"] .hero-badge .dot { background: #7c3aed !important; box-shadow: 0 0 8px #7c3aed !important; }
        html.enterprise-active[data-theme="normal"] .ai-fab { background: linear-gradient(135deg, #7c3aed, #3b82f6) !important; box-shadow: 0 4px 20px rgba(124,58,237,0.4) !important; }
        html.enterprise-active[data-theme="normal"] .ai-chat-header { background: linear-gradient(135deg, #7c3aed, #3b82f6) !important; }
        html.enterprise-active[data-theme="hacker"] .tool-card::before { background: linear-gradient(90deg, #a78bfa, #818cf8, #60a5fa) !important; box-shadow: 0 0 10px rgba(139, 92, 246, 0.5) !important; }
        html.enterprise-active[data-theme="hacker"] .tool-cta.use-now-btn { color: #a78bfa !important; border-color: #a78bfa !important; box-shadow: 0 0 12px rgba(139, 92, 246, 0.3) !important; }
        html.enterprise-active[data-theme="hacker"] .tool-card:hover .tool-cta.use-now-btn { background: #a78bfa !important; color: #000 !important; }
        html.enterprise-active[data-theme="hacker"] .ai-fab { box-shadow: 0 4px 20px rgba(139,92,246,0.4) !important; }

        /* Premium Mode Selector Badge */
        html.premium-active .mode-selector .mode-btn { border-color: rgba(251,191,36,0.3) !important; }
        html.enterprise-active .mode-selector .mode-btn { border-color: rgba(139,92,246,0.3) !important; }
        html.premium-active .mode-option-title { color: #d97706 !important; }
        html.enterprise-active .mode-option-title { color: #7c3aed !important; }
        [data-theme="hacker"].premium-active .mode-option-title { color: #fbbf24 !important; }
        [data-theme="hacker"].enterprise-active .mode-option-title { color: #a78bfa !important; }

        /* Premium mobile menu accent */
        html.premium-active .mobile-menu .mobile-menu-body a:hover,
        html.premium-active .mobile-menu .mobile-menu-body a:active {
            background: rgba(245, 158, 11, 0.08) !important;
            color: #d97706 !important;
        }
        html.enterprise-active .mobile-menu .mobile-menu-body a:hover,
        html.enterprise-active .mobile-menu .mobile-menu-body a:active {
            background: rgba(124, 58, 237, 0.08) !important;
            color: #7c3aed !important;
        }

        /* AI Elite Badge */
        .ai-elite-badge {
            display: inline-flex; align-items: center; gap: 4px;
            font-size: 9px; font-weight: 800; padding: 2px 7px;
            border-radius: 10px; margin-left: 6px; letter-spacing: 0.5px;
            vertical-align: middle; text-transform: uppercase;
        }
        html.premium-active .ai-elite-badge { background: rgba(255,255,255,0.25); color: #fff; }
        html.enterprise-active .ai-elite-badge { background: rgba(255,255,255,0.25); color: #fff; }
    </style>
</head>
<body>

    <!-- OVERLAYS -->
    <div class="theme-transition-overlay" id="themeOverlay">
        <div class="transition-text" id="transitionText"></div>
    </div>
    <div class="scanlines"></div>
    <div class="bg-shapes">
        <div class="bg-shape bg-shape-1"></div>
        <div class="bg-shape bg-shape-2"></div>
        <div class="bg-shape bg-shape-3"></div>
    </div>
    <canvas id="matrix-canvas"></canvas>
    <canvas id="particle-canvas"></canvas>

    <!-- AUTH SCREEN -->
    <div class="auth-screen" id="authScreen">
        <div class="auth-container">
            <a href="#" class="auth-brand" onclick="event.preventDefault();">
                <div class="nav-logo-icon">
                    <svg viewBox="0 0 40 40" width="28" height="28" fill="none">
                        <rect x="2" y="2" width="36" height="36" rx="8" stroke="currentColor" stroke-width="2.5"/>
                        <path d="M20 8L20 14" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/>
                        <rect x="12" y="14" width="16" height="18" rx="3" stroke="currentColor" stroke-width="2.5"/>
                        <circle cx="20" cy="23" r="3" stroke="currentColor" stroke-width="2"/>
                        <path d="M20 26L20 28" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                    </svg>
                </div>
                <span class="nav-logo-text">CryptoKit</span>
            </a>
            <div class="auth-card">
                <div class="auth-panel active" id="loginPanel">
                    <div class="auth-panel-head">
                        <div class="section-badge">🔐 Welcome Back</div>
                        <h1 class="auth-title">Log in to <span class="gradient-text">CryptoKit</span></h1>
                        <p class="auth-subtitle">Access your cryptography toolkit and saved tools.</p>
                    </div>
                    <div class="auth-banner" id="loginBanner"></div>
                    <form class="auth-form" id="loginForm" novalidate onsubmit="return handleLogin(event);">
                        <div class="auth-field"><label class="auth-label" for="loginEmail">Email</label><div class="auth-input-wrap"><i class="fas fa-envelope auth-input-icon"></i><input type="text" class="auth-input" id="loginEmail" placeholder="you@example.com" autocomplete="username"></div><span class="auth-error" id="loginEmailError"></span></div>
                        <div class="auth-field"><label class="auth-label" for="loginPassword">Password</label><div class="auth-input-wrap"><i class="fas fa-lock auth-input-icon"></i><input type="password" class="auth-input" id="loginPassword" placeholder="Enter your password" autocomplete="current-password"><button type="button" class="auth-toggle-eye" id="loginPasswordToggle" onclick="togglePasswordVisibility('loginPassword', this);" aria-label="Show password"><i class="fas fa-eye"></i></button></div><span class="auth-error" id="loginPasswordError"></span></div>
                        <div class="auth-row-between"><label class="auth-checkbox"><input type="checkbox" id="rememberMe"><span class="auth-checkbox-box"></span><span class="auth-checkbox-label">Remember me</span></label><a href="#" class="auth-link-muted" onclick="event.preventDefault();handleForgotPassword();">Forgot password?</a></div>
                        <button type="submit" class="btn-primary auth-submit-btn"><i class="fas fa-arrow-right-to-bracket"></i> Login</button>
                    </form>
                    <p class="auth-switch-text">Don't have an account? <a href="#" onclick="event.preventDefault();switchAuthPanel('signup');">Sign Up</a></p>
                </div>
                <div class="auth-panel" id="signupPanel">
                    <div class="auth-panel-head">
                        <div class="section-badge">✨ Get Started</div>
                        <h1 class="auth-title">Create your <span class="gradient-text">account</span></h1>
                        <p class="auth-subtitle">Join CryptoKit — free, open source and privacy-first.</p>
                    </div>
                    <div class="auth-banner" id="signupBanner"></div>
                    <form class="auth-form" id="signupForm" novalidate onsubmit="return handleSignup(event);">
                        <div class="auth-field"><label class="auth-label" for="signupName">Name</label><div class="auth-input-wrap"><i class="fas fa-user auth-input-icon"></i><input type="text" class="auth-input" id="signupName" placeholder="Your full name" autocomplete="name"></div><span class="auth-error" id="signupNameError"></span></div>
                        <div class="auth-field"><label class="auth-label" for="signupEmail">Email</label><div class="auth-input-wrap"><i class="fas fa-envelope auth-input-icon"></i><input type="text" class="auth-input" id="signupEmail" placeholder="you@example.com" autocomplete="email"></div><span class="auth-error" id="signupEmailError"></span></div>
                        <div class="auth-field"><label class="auth-label" for="signupPassword">Password</label><div class="auth-input-wrap"><i class="fas fa-lock auth-input-icon"></i><input type="password" class="auth-input" id="signupPassword" placeholder="Create a password" autocomplete="new-password"><button type="button" class="auth-toggle-eye" id="signupPasswordToggle" onclick="togglePasswordVisibility('signupPassword', this);" aria-label="Show password"><i class="fas fa-eye"></i></button></div><span class="auth-error" id="signupPasswordError"></span></div>
                        <div class="auth-field"><label class="auth-label" for="signupConfirmPassword">Confirm Password</label><div class="auth-input-wrap"><i class="fas fa-lock auth-input-icon"></i><input type="password" class="auth-input" id="signupConfirmPassword" placeholder="Re-enter your password" autocomplete="new-password"><button type="button" class="auth-toggle-eye" id="signupConfirmPasswordToggle" onclick="togglePasswordVisibility('signupConfirmPassword', this);" aria-label="Show password"><i class="fas fa-eye"></i></button></div><span class="auth-error" id="signupConfirmPasswordError"></span></div>
                        <button type="submit" class="btn-primary auth-submit-btn"><i class="fas fa-user-plus"></i> Sign Up</button>
                    </form>
                    <p class="auth-switch-text">Already have an account? <a href="#" onclick="event.preventDefault();switchAuthPanel('login');">Login</a></p>
                </div>
            </div>
            <p class="auth-footnote"><i class="fas fa-circle-info"></i> Frontend preview only — no data is stored or sent anywhere yet.</p>
        </div>
    </div>

    <!-- MAIN WEBSITE UI -->
    <div id="mainApp" class="main-app-hidden">

    <nav class="navbar" id="navbar">
        <a href="#home" class="nav-logo">
            <div class="nav-logo-icon"><svg viewBox="0 0 40 40" width="28" height="28" fill="none"><rect x="2" y="2" width="36" height="36" rx="8" stroke="currentColor" stroke-width="2.5"/><path d="M20 8L20 14" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/><rect x="12" y="14" width="16" height="18" rx="3" stroke="currentColor" stroke-width="2.5"/><circle cx="20" cy="23" r="3" stroke="currentColor" stroke-width="2"/><path d="M20 26L20 28" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg></div>
            <span class="nav-logo-text">CryptoKit</span>
        </a>
        <ul class="nav-links">
            <li><a href="#tools">Tools</a></li>
            <li><a href="#how">How it Works</a></li>
            <li><a href="pricing.html">Pricing</a></li>
            <li><a href="team.html">Team</a></li>
            <li><a href="developer.html"><i class="fas fa-terminal"></i> Terminal</a></li>
            <li><a href="#about">About</a></li>
            <li><a href="#feedback">Feedback</a></li>
            <li><a href="#" onclick="event.preventDefault();if(typeof toggleChat==='function')toggleChat();">Assistant</a></li>
        </ul>
        <div class="nav-actions">
            <div class="mode-selector" id="modeSelector">
                <button class="mode-btn" onclick="if(typeof toggleModeDropdown==='function')toggleModeDropdown();">
                    <span id="modeIcon">☀️</span>
                    <span class="mode-label" id="modeLabel">Normal</span>
                    <i class="fas fa-chevron-down mode-arrow" id="modeArrow"></i>
                </button>
                <div class="mode-dropdown" id="modeDropdown">
                    <div class="mode-option" onclick="if(typeof selectMode==='function')selectMode('normal');setTimeout(applyTierLabels,50);">
                        <span class="mode-option-icon" id="optNormalIcon">☀️</span>
                        <div><div class="mode-option-title" id="optNormalTitle">Normal Mode</div><div class="mode-option-desc" id="optNormalDesc">Clean &amp; professional</div></div>
                        <i class="fas fa-check mode-check" id="checkNormal"></i>
                    </div>
                    <div class="mode-option" onclick="if(typeof selectMode==='function')selectMode('hacker');setTimeout(applyTierLabels,50);">
                        <span class="mode-option-icon" id="optHackerIcon">💀</span>
                        <div><div class="mode-option-title" id="optHackerTitle">Hacker Mode</div><div class="mode-option-desc" id="optHackerDesc">Matrix &amp; hacker vibes</div></div>
                        <i class="fas fa-check mode-check" id="checkHacker" style="display:none;"></i>
                    </div>
                    <div class="mode-option" onclick="window.location.href='developer.html';">
                        <span class="mode-option-icon">💻</span>
                        <div><div class="mode-option-title">Terminal Mode</div><div class="mode-option-desc">Interactive terminal</div></div>
                        <i class="fas fa-terminal mode-check" style="display:none;"></i>
                    </div>
                </div>
            </div>
            <button class="btn-nav-auth" id="navAuthBtn" onclick="handleAuthToggle();"><i class="fas fa-user"></i> Login</button>
            <a href="pricing.html" class="btn-nav-cta" id="navPremiumBtn">👑 Go Premium</a>
        </div>
        <div class="hamburger" id="hamburgerBtn" onclick="toggleMobileMenu();" aria-label="Toggle menu">
            <span></span><span></span><span></span>
        </div>
    </nav>

    <!-- Mobile Menu Overlay (click outside to close) -->
    <div class="mobile-menu-overlay" id="mobileMenuOverlay" onclick="closeMobileMenu();"></div>

    <!-- Mobile Menu -->
    <div class="mobile-menu" id="mobileMenu">
        <div class="mobile-menu-header">
            <a href="#home" class="mobile-menu-brand" onclick="closeMobileMenu();">
                <svg viewBox="0 0 40 40" width="26" height="26" fill="none">
                    <rect x="2" y="2" width="36" height="36" rx="8" stroke="currentColor" stroke-width="2.5"/>
                    <path d="M20 8L20 14" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/>
                    <rect x="12" y="14" width="16" height="18" rx="3" stroke="currentColor" stroke-width="2.5"/>
                    <circle cx="20" cy="23" r="3" stroke="currentColor" stroke-width="2"/>
                    <path d="M20 26L20 28" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                </svg>
                <span class="mobile-menu-brand-text">CryptoKit</span>
            </a>
            <button class="mobile-menu-close" onclick="closeMobileMenu();" aria-label="Close menu">
                <i class="fas fa-times"></i>
            </button>
        </div>

        <div class="mobile-menu-body">
            <a href="pricing.html" id="mobilePremiumLink" onclick="closeMobileMenu();">👑 Go Premium</a>
            <a href="#" id="mobileAuthBtn" onclick="event.preventDefault();handleAuthToggle();">👤 Login</a>

            <div class="mobile-menu-divider">Navigation</div>
            <a href="#tools" onclick="closeMobileMenu();"><i class="fas fa-tools" style="width:20px;"></i> Tools</a>
            <a href="#how" onclick="closeMobileMenu();"><i class="fas fa-book-open" style="width:20px;"></i> How it Works</a>
            <a href="pricing.html" onclick="closeMobileMenu();"><i class="fas fa-credit-card" style="width:20px;"></i> Pricing</a>
            <a href="team.html" onclick="closeMobileMenu();"><i class="fas fa-users" style="width:20px;"></i> Team</a>
            <a href="#about" onclick="closeMobileMenu();"><i class="fas fa-info-circle" style="width:20px;"></i> About</a>
            <a href="#feedback" onclick="closeMobileMenu();"><i class="fas fa-comment-dots" style="width:20px;"></i> Feedback</a>

            <div class="mobile-menu-divider">Features</div>
            <a href="#" id="mobileAssistantLink" onclick="event.preventDefault();closeMobileMenu();if(typeof toggleChat==='function')toggleChat();"><i class="fas fa-robot" style="width:20px;"></i> Assistant</a>

            <div class="mobile-menu-divider">Appearance</div>
            <a href="#" onclick="event.preventDefault();toggleMobileThemeMenu(this);" class="mobile-theme-toggle-btn" id="mobileThemeToggleLink">
                <span><i class="fas fa-palette" style="width:20px;"></i> Switch Theme</span>
                <i class="fas fa-chevron-down theme-arrow" id="mobileThemeArrow"></i>
            </a>
            <div class="mobile-theme-submenu" id="mobileThemeSubmenu">
                <a href="#" id="mobileNormalOption" onclick="event.preventDefault();mobileSwitchTheme('normal');"><span id="mobNormalLabel">☀️ Normal Mode</span> <span class="theme-active-dot" id="normalDot" style="display:none;"></span></a>
                <a href="#" id="mobileHackerOption" onclick="event.preventDefault();mobileSwitchTheme('hacker');"><span id="mobHackerLabel">💀 Hacker Mode</span> <span class="theme-active-dot" id="hackerDot" style="display:none;"></span></a>
                <a href="#" id="mobileDevOption" onclick="event.preventDefault();showMobileDevPopup();"><span>💻 Terminal Mode</span></a>
            </div>
        </div>
    </div>

    <div class="mobile-dev-popup" id="mobileDevPopup">
        <div class="mobile-dev-popup-box">
            <span class="mobile-dev-popup-icon">🖥️</span>
            <div class="mobile-dev-popup-title">Desktop Only Feature</div>
            <p class="mobile-dev-popup-msg"><strong>Terminal Mode</strong> is optimized for larger screens.<br><br>Please visit on a <strong>desktop or laptop</strong>.</p>
            <button class="mobile-dev-popup-close" id="mobileDevPopupCloseBtn">Got it! 👍</button>
        </div>
    </div>

    <section class="hero" id="home">
        <div class="hero-container">
            <div class="hero-left">
                <div class="hero-badge"><span class="dot"></span><span id="heroVersionText">v1.0 Now Live — Open Source &amp; Free</span></div>
                <h1 class="hero-title glitch" data-text="Your Complete Cryptography Toolkit">Your Complete <span class="gradient-text">Cryptography</span> Toolkit</h1>
                <p class="hero-subtitle">Encrypt, hash, verify and secure your data with professional-grade cryptographic tools — all in one place.</p>
                <div class="hero-buttons">
                    <a href="pricing.html" class="btn-primary" id="heroPremiumBtn"><i class="fas fa-crown"></i> Go Premium</a>
                    <a href="#demo" class="btn-secondary"><i class="fas fa-play"></i> Live Demo</a>
                </div>
                <div class="hero-trust">
                    <div class="trust-item"><i class="fas fa-check-circle"></i> No data stored</div>
                    <div class="trust-item"><i class="fas fa-check-circle"></i> Client-side</div>
                    <div class="trust-item"><i class="fas fa-check-circle"></i> Open Source</div>
                    <div class="trust-item"><i class="fas fa-check-circle"></i> Premium set available</div>
                </div>
            </div>
            <div class="hero-terminal">
                <div class="terminal-header">
                    <div class="terminal-dots"><div class="terminal-dot red"></div><div class="terminal-dot yellow"></div><div class="terminal-dot green"></div></div>
                    <span class="terminal-title" id="terminalTitle">cryptokit ~ zsh</span>
                    <div class="terminal-os-switch">
                        <button class="os-btn active" id="osMac" onclick="if(typeof switchTermOS==='function')switchTermOS('mac');"><i class="fab fa-apple"></i></button>
                        <button class="os-btn" id="osWin" onclick="if(typeof switchTermOS==='function')switchTermOS('win');"><i class="fab fa-windows"></i></button>
                    </div>
                </div>
                <div class="terminal-body" id="terminalBody"></div>
            </div>
        </div>
    </section>

    <section class="live-demo" id="demo">
        <div class="demo-container">
            <div class="demo-header"><h2>⚡ Try It <span class="gradient-text">Right Now</span></h2><p>No sign up needed — experience the tools instantly</p></div>
            <div class="demo-tabs">
                <button class="demo-tab active" onclick="if(typeof setDemoTab==='function')setDemoTab(this,'hash');"># Hash Generator</button>
                <button class="demo-tab" onclick="if(typeof setDemoTab==='function')setDemoTab(this,'base64');">⇄ Base64 Encode</button>
                <button class="demo-tab" onclick="if(typeof setDemoTab==='function')setDemoTab(this,'password');">🔑 Password Check</button>
            </div>
            <div class="demo-input-area">
                <textarea class="demo-input" id="demoInput" placeholder="Type anything here..." oninput="if(typeof runDemo==='function')runDemo();"></textarea>
                <div class="demo-controls">
                    <select class="demo-select" id="demoAlgo" onchange="if(typeof runDemo==='function')runDemo();"><option value="sha256">SHA-256</option><option value="sha512">SHA-512</option><option value="md5">MD5 (weak)</option></select>
                    <button class="btn-primary" onclick="if(typeof runDemo==='function')runDemo();" style="padding:10px 18px;font-size:13px;">Generate</button>
                </div>
            </div>
            <div class="demo-result" id="demoResult"><span class="demo-result-placeholder">Your result will appear here...</span></div>
        </div>
    </section>

    <!-- Free Tools Section -->
    <section class="tools-section" id="tools">
        <div class="tools-header">
            <div class="section-badge">🔧 Our Tools</div>
            <h2 class="section-title">Powerful <span class="gradient-text">Cryptography Tools</span></h2>
            <p class="section-subtitle">Everything you need for data security in one place.</p>
        </div>
        <div class="tools-grid">
            <a href="rsa-keytool.html" class="tool-card"><div class="tool-icon purple"><i class="fas fa-key"></i></div><div class="tool-name">RSA Key Generator</div><div class="tool-desc">Generate secure RSA key pairs with configurable sizes.</div><div class="tool-tags"><span class="tag">RSA-2048</span><span class="tag">RSA-4096</span><span class="tag">PEM</span></div><div class="tool-cta use-now-btn"><i class="fas fa-play"></i> Use Now</div></a>
            <a href="file-integrity.html" class="tool-card"><div class="tool-icon blue"><i class="fas fa-fingerprint"></i></div><div class="tool-name">File Integrity Checker</div><div class="tool-desc">Verify file authenticity by comparing cryptographic hashes.</div><div class="tool-tags"><span class="tag">SHA-256</span><span class="tag">SHA-512</span><span class="tag">MD5</span></div><div class="tool-cta use-now-btn"><i class="fas fa-play"></i> Use Now</div></a>
            <a href="hash-generator.html" class="tool-card"><div class="tool-icon green"><i class="fas fa-barcode"></i></div><div class="tool-name">Hash Generator</div><div class="tool-desc">Generate cryptographic hashes using multiple algorithms.</div><div class="tool-tags"><span class="tag">MD5</span><span class="tag">SHA-1</span><span class="tag">BLAKE2</span></div><div class="tool-cta use-now-btn"><i class="fas fa-play"></i> Use Now</div></a>
            <a href="text-encrypt.html" class="tool-card"><div class="tool-icon red"><i class="fas fa-user-lock"></i></div><div class="tool-name">Text Encrypt / Decrypt</div><div class="tool-desc">Encrypt and decrypt messages using AES-256 or RSA.</div><div class="tool-tags"><span class="tag">AES-256</span><span class="tag">RSA</span><span class="tag">CBC</span></div><div class="tool-cta use-now-btn"><i class="fas fa-play"></i> Use Now</div></a>
            <a href="digital-signature.html" class="tool-card"><div class="tool-icon yellow"><i class="fas fa-file-contract"></i></div><div class="tool-name">Digital Signature</div><div class="tool-desc">Sign and verify documents digitally.</div><div class="tool-tags"><span class="tag">RSA-PSS</span><span class="tag">ECDSA</span><span class="tag">Verify</span></div><div class="tool-cta use-now-btn"><i class="fas fa-play"></i> Use Now</div></a>
            <a href="password-generator.html" class="tool-card"><div class="tool-icon pink"><i class="fas fa-unlock-keyhole"></i></div><div class="tool-name">Password Tools</div><div class="tool-desc">Generate secure passwords and analyze strength.</div><div class="tool-tags"><span class="tag">Entropy</span><span class="tag">CSPRNG</span><span class="tag">Strength</span></div><div class="tool-cta use-now-btn"><i class="fas fa-play"></i> Use Now</div></a>
        </div>
    </section>

    <!-- Pro Cipher Premium Section -->
    <section class="premium-tools-section" id="proToolsSection">
        <div class="premium-tools-header">
            <div class="section-badge" style="background: rgba(251,191,36,0.1); color: #fbbf24;">⚡ Pro Cipher</div>
            <h2 class="section-title">Pro <span class="gradient-text">Arsenal</span></h2>
            <p class="section-subtitle">Advanced vulnerability testing and key diagnostic suites.</p>
        </div>
        <div class="premium-tools-grid">
            <a href="premium/Crypto-Security-Scanner.html" class="premium-tool-card locked" id="ptool-scanner">
                <span class="premium-crown">👑</span>
                <div class="premium-tool-icon"><i class="fas fa-shield-virus"></i></div>
                <div class="premium-tool-name">Crypto Security Scanner</div>
                <div class="premium-tool-desc">Deep-scan cryptographic implementations for vulnerabilities, weak ciphers, and deprecated protocols.</div>
                <div class="premium-tool-tags">
                    <span class="ptag">Vuln Scan</span>
                    <span class="ptag">OWASP Audit</span>
                    <span class="ptag">Cipher Check</span>
                </div>
                <div class="premium-tool-cta"><i class="fas fa-lock"></i> Unlock with Pro</div>
            </a>

            <a href="premium/advance-rsa-lab.html" class="premium-tool-card locked" id="ptool-rsa-lab">
                <span class="premium-crown">👑</span>
                <div class="premium-tool-icon"><i class="fas fa-microscope"></i></div>
                <div class="premium-tool-name">Advanced RSA Lab</div>
                <div class="premium-tool-desc">Inspect RSA keys down to raw prime factors, analyze CRT speed-ups, and run factorization attack simulators.</div>
                <div class="premium-tool-tags">
                    <span class="ptag">CRT Params</span>
                    <span class="ptag">OAEP / PSS</span>
                    <span class="ptag">Pollard's Rho</span>
                </div>
                <div class="premium-tool-cta"><i class="fas fa-lock"></i> Unlock with Pro</div>
            </a>

            <a href="premium/advance-ecc-suite.html" class="premium-tool-card locked" id="ptool-ecc-suite">
                <span class="premium-crown">👑</span>
                <div class="premium-tool-icon"><i class="fas fa-wave-square"></i></div>
                <div class="premium-tool-name">Advanced ECC Suite</div>
                <div class="premium-tool-desc">Live ECDH handshakes, signature component inspection, and Weierstrass curve plotting.</div>
                <div class="premium-tool-tags">
                    <span class="ptag">ECDH Exchange</span>
                    <span class="ptag">ECDSA Sign</span>
                    <span class="ptag">Curve Plotter</span>
                </div>
                <div class="premium-tool-cta"><i class="fas fa-lock"></i> Unlock with Pro</div>
            </a>

            <a href="premium/batch-file-integrity.html" class="premium-tool-card locked" id="ptool-batch-integrity">
                <span class="premium-crown">👑</span>
                <div class="premium-tool-icon"><i class="fas fa-layer-group"></i></div>
                <div class="premium-tool-name">Batch File Integrity Checker</div>
                <div class="premium-tool-desc">Verify integrity of multiple files simultaneously with parallel hashing, bulk comparison, and detailed diff reports.</div>
                <div class="premium-tool-tags">
                    <span class="ptag">Bulk Hash</span>
                    <span class="ptag">Parallel Scan</span>
                    <span class="ptag">Diff Report</span>
                </div>
                <div class="premium-tool-cta"><i class="fas fa-lock"></i> Unlock with Pro</div>
            </a>

            <a href="premium/security-report-generator.html" class="premium-tool-card locked" id="ptool-security-report">
                <span class="premium-crown">👑</span>
                <div class="premium-tool-icon"><i class="fas fa-file-shield"></i></div>
                <div class="premium-tool-name">Security Report Generator</div>
                <div class="premium-tool-desc">Generate comprehensive PDF security audit reports with vulnerability findings, risk scores, and remediation guidelines.</div>
                <div class="premium-tool-tags">
                    <span class="ptag">PDF Export</span>
                    <span class="ptag">Risk Score</span>
                    <span class="ptag">Audit Trail</span>
                </div>
                <div class="premium-tool-cta"><i class="fas fa-lock"></i> Unlock with Pro</div>
            </a>
        </div>
    </section>

    <!----------------------------------------- Quantum Elite Premium Section -------------------------->
    <section class="premium-tools-section" id="quantumToolsSection">
        <div class="premium-tools-header">
            <div class="section-badge" style="background: rgba(139,92,246,0.15); color: #a78bfa; border: 1px solid rgba(139,92,246,0.3);">
                🌌 Quantum Elite
            </div>
            <h2 class="section-title">
                Quantum Elite <span style="background: linear-gradient(135deg, #3b82f6, #a855f7); -webkit-background-clip: text; -webkit-text-fill-color: transparent;">Labs</span>
            </h2>
            <p class="section-subtitle">Next-generation cryptographic simulators, challenge modules, and forensic suites.</p>
        </div>

        <div class="premium-tools-grid">
            <!-- Cryptographic Attack Simulator -->
            <a href="premium/attack-simulator.html" class="premium-tool-card quantum-tool-card locked" id="qtool-attack-sim">
                <span class="premium-crown">🌌</span>
                <div class="premium-tool-icon"><i class="fas fa-crosshairs"></i></div>
                <div class="premium-tool-name">Cryptographic Attack Simulator</div>
                <div class="premium-tool-desc">Simulate Padding Oracles, Brute Force, and Length Extension attacks on custom payloads.</div>
                <div class="premium-tool-tags">
                    <span class="qtag">Red Team</span>
                    <span class="qtag">Padding Oracle</span>
                    <span class="qtag">Simulation</span>
                </div>
                <div class="premium-tool-cta"><i class="fas fa-lock"></i> Unlock with Quantum</div>
            </a>

            <!-- Crypto CTF / Challenge Mode -->
            <a href="premium/crypto-ctf.html" class="premium-tool-card quantum-tool-card locked" id="qtool-ctf">
                <span class="premium-crown">🌌</span>
                <div class="premium-tool-icon"><i class="fas fa-flag"></i></div>
                <div class="premium-tool-name">Crypto CTF / Challenge Mode</div>
                <div class="premium-tool-desc">Six hands-on cryptography puzzles — from Base64 warm-ups to RSA factorization. Crack ciphers, capture flags, earn points.</div>
                <div class="premium-tool-tags">
                    <span class="qtag">CTF</span>
                    <span class="qtag">Challenges</span>
                    <span class="qtag">Scoring</span>
                </div>
                <div class="premium-tool-cta"><i class="fas fa-lock"></i> Unlock with Quantum</div>
            </a>

            <!-- Crypto Forensics Lab -->
            <a href="premium/crypto-forensic-lab.html" class="premium-tool-card quantum-tool-card locked" id="qtool-forensics">
                <span class="premium-crown">🌌</span>
                <div class="premium-tool-icon"><i class="fas fa-microscope"></i></div>
                <div class="premium-tool-name">Crypto Forensics Lab</div>
                <div class="premium-tool-desc">Four investigative tools — scan packet captures for leaked credentials, hunt secrets in raw strings, crack predictable tokens, and extract steganographic data.</div>
                <div class="premium-tool-tags">
                    <span class="qtag">Forensics</span>
                    <span class="qtag">PCAP</span>
                    <span class="qtag">Steganography</span>
                </div>
                <div class="premium-tool-cta"><i class="fas fa-lock"></i> Unlock with Quantum</div>
            </a>
        </div>
    </section>
    <!----------------------------------------- End Quantum Elite Premium Section -------------------------->

    <section class="why-section" id="about">
        <div class="why-container">
            <div class="why-content">
                <div class="section-badge">✨ Why CryptoKit</div>
                <h2 class="section-title">Built for <span class="gradient-text">Security First</span></h2>
                <p class="section-subtitle" style="margin-bottom:28px;">Privacy and security as the top priority.</p>
                <ul class="why-list">
                    <li><div class="check"><i class="fas fa-check"></i></div><span>Files and keys <strong>never stored</strong></span></li>
                    <li><div class="check"><i class="fas fa-check"></i></div><span>Operations run <strong>client-side</strong></span></li>
                    <li><div class="check"><i class="fas fa-check"></i></div><span>Follows <strong>NIST &amp; OWASP</strong> standards</span></li>
                    <li><div class="check"><i class="fas fa-check"></i></div><span>Full source on <strong>GitHub</strong></span></li>
                    <li><div class="check"><i class="fas fa-check"></i></div><span>Weak algorithm <strong>warnings built-in</strong></span></li>
                </ul>
            </div>
            <div class="why-features">
                <div class="feature-card"><div class="feature-icon">🛡️</div><div class="feature-title">Secure by Design</div><div class="feature-desc">Industry-standard crypto only</div></div>
                <div class="feature-card"><div class="feature-icon">⚡</div><div class="feature-title">Lightning Fast</div><div class="feature-desc">Results in milliseconds</div></div>
                <div class="feature-card"><div class="feature-icon">🔒</div><div class="feature-title">Privacy First</div><div class="feature-desc">Zero data retention</div></div>
                <div class="feature-card"><div class="feature-icon">📖</div><div class="feature-title">Open Source</div><div class="feature-desc">MIT licensed</div></div>
                <div class="feature-card"><div class="feature-icon">🌐</div><div class="feature-title">No Install</div><div class="feature-desc">100% browser-based</div></div>
                <div class="feature-card"><div class="feature-icon">🆓</div><div class="feature-title">Premium Sets</div><div class="feature-desc">Advanced tooling suites</div></div>
            </div>
        </div>
    </section>

    <section class="how-section" id="how">
        <div class="how-header"><div class="section-badge">📖 Process</div><h2 class="section-title">How It <span class="gradient-text">Works</span></h2><p class="section-subtitle" style="margin:0 auto;">Three simple steps</p></div>
        <div class="how-steps">
            <div class="step-card"><div class="step-number">1</div><div class="step-icon">🎯</div><div class="step-title">Choose Your Tool</div><div class="step-desc">Browse and pick the right tool</div></div>
            <div class="step-connector"><i class="fas fa-chevron-right"></i></div>
            <div class="step-card"><div class="step-number">2</div><div class="step-icon">📥</div><div class="step-title">Input Your Data</div><div class="step-desc">Enter text, upload, or paste keys</div></div>
            <div class="step-connector"><i class="fas fa-chevron-right"></i></div>
            <div class="step-card"><div class="step-number">3</div><div class="step-icon">📤</div><div class="step-title">Get Results</div><div class="step-desc">Download, copy, or share</div></div>
        </div>
    </section>

    <section class="stats-section">
        <div class="stats-container">
            <div class="stat-card"><div class="stat-icon">🔧</div><span class="stat-number" data-target="12">0</span><div class="stat-label">Tools Available</div></div>
            <div class="stat-card"><div class="stat-icon">⚡</div><span class="stat-number" data-target="50" data-suffix="K+">0</span><div class="stat-label">Operations Done</div></div>
            <div class="stat-card"><div class="stat-icon">🔒</div><span class="stat-number" data-target="256" data-suffix="-bit">0</span><div class="stat-label">Max Encryption</div></div>
            <div class="stat-card"><div class="stat-icon">🗄️</div><span class="stat-number" data-target="0" data-suffix=" Files">0</span><div class="stat-label">Data Stored</div></div>
        </div>
    </section>

    <section class="feedback-section" id="feedback">
        <div class="feedback-header"><div class="section-badge">💬 Feedback</div><h2 class="section-title">What People <span class="gradient-text">Say</span></h2><p class="section-subtitle" style="margin:0 auto;">Reviews from our community</p></div>
        <div class="reviews-grid">
            <div class="review-card"><div class="review-stars">⭐⭐⭐⭐⭐</div><p class="review-text">"Comments will be available soon"</p><div class="review-author"><div class="review-avatar">D</div><div><div class="review-name">---</div></div></div></div>
            <div class="review-card"><div class="review-stars">⭐⭐⭐⭐⭐</div><p class="review-text">"Comments will be available soon"</p><div class="review-author"><div class="review-avatar">E</div><div><div class="review-name">---</div></div></div></div>
            <div class="review-card"><div class="review-stars">⭐⭐⭐⭐⭐</div><p class="review-text">"Comments will be available soon"</p><div class="review-author"><div class="review-avatar">R</div><div><div class="review-name">---</div></div></div></div>
        </div>
        <div class="feedback-form-wrapper" id="feedbackFormWrapper">
            <h3 class="feedback-form-title">Share Your <span class="gradient-text">Feedback</span></h3>
            <form class="feedback-form" id="feedbackForm" onsubmit="if(typeof submitFeedback==='function')return submitFeedback(event);event.preventDefault();">
                <div class="feedback-row"><input type="text" class="feedback-input" id="fbName" placeholder="Your Name" required><input type="email" class="feedback-input" placeholder="Your Email" required></div>
                <div class="feedback-rating" id="feedbackRating"><span class="rating-label">Rating:</span><span class="rating-star" onclick="if(typeof setRating==='function')setRating(1);">☆</span><span class="rating-star" onclick="if(typeof setRating==='function')setRating(2);">☆</span><span class="rating-star" onclick="if(typeof setRating==='function')setRating(3);">☆</span><span class="rating-star" onclick="if(typeof setRating==='function')setRating(4);">☆</span><span class="rating-star" onclick="if(typeof setRating==='function')setRating(5);">☆</span></div>
                <textarea class="feedback-textarea" placeholder="Tell us what you think..." rows="4" required></textarea>
                <button type="submit" class="btn-primary" style="width:100%;justify-content:center;"><i class="fas fa-paper-plane"></i> Submit Feedback</button>
            </form>
        </div>
    </section>

    <section class="cta-section">
        <div class="cta-container">
            <div class="cta-glow"></div>
            <h2>Ready to <span class="gradient-text">Secure Your Data?</span></h2>
            <p>Join thousands of developers who trust CryptoKit.</p>
            <div class="cta-buttons">
                <a href="#tools" class="btn-primary"><i class="fas fa-rocket"></i> Start Using Tools</a>
                <a href="https://github.com/CryptoKit-Team/OurCryptoKit" class="btn-secondary"><i class="fab fa-github"></i> View on GitHub</a>
            </div>
        </div>
    </section>

    <footer class="footer">
        <div class="footer-container">
            <div class="footer-top">
                <div class="footer-brand">
                    <a href="#home" class="nav-logo"><div class="nav-logo-icon"><svg viewBox="0 0 40 40" width="24" height="24" fill="none"><rect x="2" y="2" width="36" height="36" rx="8" stroke="currentColor" stroke-width="2.5"/><path d="M20 8L20 14" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/><rect x="12" y="14" width="16" height="18" rx="3" stroke="currentColor" stroke-width="2.5"/><circle cx="20" cy="23" r="3" stroke="currentColor" stroke-width="2"/><path d="M20 26L20 28" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg></div><span class="nav-logo-text">CryptoKit</span></a>
                    <p>A free, open-source cryptography toolkit.</p>
                    <div class="footer-social"><a href="https://github.com/CryptoKit-Team/OurCryptoKit" class="social-btn"><i class="fab fa-github"></i></a><a href="#" class="social-btn"><i class="fab fa-twitter"></i></a><a href="#" class="social-btn"><i class="fab fa-discord"></i></a><a href="#" class="social-btn"><i class="fab fa-linkedin"></i></a></div>
                </div>
                <div class="footer-col"><h4>Tools</h4><ul><li><a href="hash-generator.html">Hash Generator</a></li><li><a href="rsa-keytool.html">RSA Key Generator</a></li><li><a href="file-integrity.html">File Integrity</a></li><li><a href="text-encrypt.html">Text Encrypt</a></li><li><a href="password-generator.html">Password Tools</a></li></ul></div>
                <div class="footer-col"><h4>Resources</h4><ul><li><a href="documentation.html">Documentation</a></li><li><a href="security.html">Security</a></li><li><a href="faq.html">FAQ</a></li><li><a href="limitations.html">Limitations</a></li></ul></div>
                <div class="footer-col"><h4>Company</h4><ul><li><a href="team.html">Team</a></li><li><a href="pricing.html">Pricing</a></li><li><a href="#feedback">Feedback</a></li><li><a href="Privacy Policy.html">Privacy</a></li><li><a href="Terms.html">Terms</a></li><li><a href="Support.html">Support</a></li></ul></div>
            </div>
            <div class="footer-bottom"><p id="footerVersionText">&copy; 2026 CryptoKit. MIT License. Made with ❤️</p><div class="footer-bottom-links"><a href="Privacy Policy.html">Privacy</a><a href="Terms.html">Terms</a><a href="Security.html">Security</a></div></div>
        </div>
    </footer>

    <button class="scroll-top" id="scrollTop" onclick="window.scrollTo({top:0,behavior:'smooth'});"><i class="fas fa-chevron-up"></i></button>
    <button class="ai-fab" id="aiFab" onclick="if(typeof toggleChat==='function')toggleChat();" title="Ask CryptoBot"><span id="fabIcon">🤖</span></button>

    <div class="ai-chat-window" id="aiChatWindow">
        <div class="ai-chat-header">
            <div class="ai-header-info">
                <div class="ai-avatar" id="aiAvatar">🤖</div>
                <div>
                    <span class="ai-name" id="aiName">CryptoBot</span>
                    <span class="ai-status"><span class="ai-status-dot"></span><span id="aiStatusText">Online · Ready</span></span>
                </div>
            </div>
            <div class="ai-header-actions">
                <button class="ai-header-btn" onclick="if(typeof clearChat==='function')clearChat();"><i class="fas fa-trash-alt"></i></button>
                <button class="ai-header-btn" onclick="if(typeof toggleChat==='function')toggleChat();"><i class="fas fa-times"></i></button>
            </div>
        </div>
        <div class="ai-categories"><span class="ai-categories-label">Browse by topic</span><div class="ai-category-chips"><button class="ai-chip" onclick="if(typeof askCategory==='function')askCategory('tools');">🔧 Tools</button><button class="ai-chip" onclick="if(typeof askCategory==='function')askCategory('learn');">📚 Learn</button><button class="ai-chip" onclick="if(typeof askCategory==='function')askCategory('security');">🛡️ Security</button><button class="ai-chip" onclick="if(typeof askCategory==='function')askCategory('help');">❓ Help</button></div></div>
        <div class="ai-messages" id="aiMessages"></div>
        <div class="ai-input-area"><textarea class="ai-input" id="aiInput" placeholder="Ask me anything..." rows="1" onkeydown="if(event.key==='Enter'&&!event.shiftKey){event.preventDefault();if(typeof sendMessage==='function')sendMessage();}" oninput="this.style.height='auto';this.style.height=Math.min(this.scrollHeight,90)+'px';"></textarea><button class="ai-send-btn" onclick="if(typeof sendMessage==='function')sendMessage();"><i class="fas fa-paper-plane"></i></button></div>
    </div>

    </div>

    <script>
        (function () {
            var isAuthed = (function () {
                try { return sessionStorage.getItem('cryptokit_auth') === 'true' || localStorage.getItem('cryptokit_auth') === 'true'; } catch (e) { return false; }
            })();
            if (isAuthed) {
                document.getElementById('authScreen').classList.add('auth-screen-hidden');
                document.getElementById('mainApp').classList.remove('main-app-hidden');
            }
        })();
    </script>

    <script src="script.js"></script>
    <script src="auth.js"></script>

    <script>
        window.addEventListener('error', function(e) { console.warn('Resource loading error:', e.message || e); }, true);

        if (typeof toggleChat !== 'function') { window.toggleChat = function() { var cw = document.getElementById('aiChatWindow'); if (cw) cw.style.display = cw.style.display === 'flex' ? 'none' : 'flex'; }; }
        if (typeof selectMode !== 'function') { window.selectMode = function(mode) { document.documentElement.setAttribute('data-theme', mode); localStorage.setItem('cryptokit-theme', mode); }; }
        if (typeof toggleModeDropdown !== 'function') { window.toggleModeDropdown = function() { var d = document.getElementById('modeDropdown'); if (d) d.classList.toggle('active'); }; }

        /* ═══════════════════════════════════════════════════
           MOBILE MENU FUNCTIONS
        ═══════════════════════════════════════════════════ */
        window.toggleMobileMenu = function() {
            var menu = document.getElementById('mobileMenu');
            var overlay = document.getElementById('mobileMenuOverlay');
            var hamburger = document.getElementById('hamburgerBtn');
            if (!menu) return;

            if (menu.classList.contains('active')) {
                closeMobileMenu();
            } else {
                menu.classList.add('active');
                if (overlay) overlay.classList.add('active');
                if (hamburger) hamburger.classList.add('active');
                document.body.classList.add('menu-open');
            }
        };

        window.closeMobileMenu = function() {
            var menu = document.getElementById('mobileMenu');
            var overlay = document.getElementById('mobileMenuOverlay');
            var hamburger = document.getElementById('hamburgerBtn');
            var submenu = document.getElementById('mobileThemeSubmenu');
            var arrow = document.getElementById('mobileThemeArrow');

            if (menu) menu.classList.remove('active');
            if (overlay) overlay.classList.remove('active');
            if (hamburger) hamburger.classList.remove('active');
            document.body.classList.remove('menu-open');

            if (submenu) submenu.classList.remove('open');
            if (arrow) arrow.style.transform = 'rotate(0deg)';
        };

        // Legacy compat
        window.toggleMenu = window.toggleMobileMenu;

        /* ═══════════════════════════════════════════════════
           AUTH STATE — LOGIN / LOGOUT BUTTON (AUTO SYNC)
        ═══════════════════════════════════════════════════ */
        function isUserAuthed() {
            try {
                return sessionStorage.getItem('cryptokit_auth') === 'true' ||
                       localStorage.getItem('cryptokit_auth') === 'true';
            } catch (e) { return false; }
        }

        var __lastAuthState = null;

        function syncAuthUI(force) {
            var authed = isUserAuthed();
            if (!force && authed === __lastAuthState) return;
            __lastAuthState = authed;

            var nb = document.getElementById('navAuthBtn');
            if (nb) {
                nb.innerHTML = authed
                    ? '<i class="fas fa-arrow-right-from-bracket"></i> Logout'
                    : '<i class="fas fa-user"></i> Login';
                nb.classList.toggle('is-logout', authed);
                nb.setAttribute('title', authed ? 'Log out of CryptoKit' : 'Log in to CryptoKit');
            }

            var mb = document.getElementById('mobileAuthBtn');
            if (mb) {
                mb.innerHTML = authed ? '🚪 Logout' : '👤 Login';
                mb.classList.toggle('is-logout', authed);
            }
        }
        window.updateAuthButtons = syncAuthUI;

        /* Login / Logout toggle */
        window.handleAuthToggle = function() {
            var authed = isUserAuthed();
            closeMobileMenu();

            if (authed) {
                /* ---- LOGOUT ---- */
                if (typeof handleLogout === 'function') {
                    handleLogout();
                } else {
                    try {
                        sessionStorage.removeItem('cryptokit_auth');
                        localStorage.removeItem('cryptokit_auth');
                    } catch(e) {}
                    document.getElementById('mainApp').classList.add('main-app-hidden');
                    document.getElementById('authScreen').classList.remove('auth-screen-hidden');
                    if (typeof switchAuthPanel === 'function') switchAuthPanel('login');
                }
                syncAuthUI(true);
            } else {
                /* ---- GO TO LOGIN SCREEN ---- */
                document.getElementById('mainApp').classList.add('main-app-hidden');
                document.getElementById('authScreen').classList.remove('auth-screen-hidden');
                if (typeof switchAuthPanel === 'function') switchAuthPanel('login');
                syncAuthUI(true);
            }
        };

        /* Watch for auth changes from auth.js (login/signup success) */
        (function setupAuthWatchers() {
            // 1) Poll (cheap, catches everything)
            setInterval(function(){ syncAuthUI(false); }, 400);

            // 2) Observe #mainApp visibility toggles
            document.addEventListener('DOMContentLoaded', function() {
                var mainAppEl = document.getElementById('mainApp');
                if (mainAppEl && window.MutationObserver) {
                    new MutationObserver(function() {
                        syncAuthUI(true);
                    }).observe(mainAppEl, { attributes: true, attributeFilter: ['class'] });
                }
            });

            // 3) Cross-tab storage changes
            window.addEventListener('storage', function(e) {
                if (e.key === 'cryptokit_auth') syncAuthUI(true);
            });

            // 4) Focus / visibility
            window.addEventListener('focus', function(){ syncAuthUI(true); });
            document.addEventListener('visibilitychange', function(){ if (!document.hidden) syncAuthUI(true); });
        })();

        /* ═══════════════════════════════════════════════════
           THEME SUBMENU (MOBILE)
        ═══════════════════════════════════════════════════ */
        function toggleMobileThemeMenu() {
            var s = document.getElementById('mobileThemeSubmenu'), a = document.getElementById('mobileThemeArrow');
            if (!s || !a) return;
            if (s.classList.contains('open')) { s.classList.remove('open'); a.style.transform = 'rotate(0deg)'; }
            else { s.classList.add('open'); a.style.transform = 'rotate(180deg)'; updateMobileThemeDots(); }
        }
        function mobileSwitchTheme(mode) {
            if (typeof selectMode === 'function') selectMode(mode); else document.documentElement.setAttribute('data-theme', mode);
            setTimeout(applyTierLabels, 50);
            updateMobileThemeDots();
            setTimeout(function() { closeMobileMenu(); }, 350);
        }
        function updateMobileThemeDots() {
            var t = document.documentElement.getAttribute('data-theme') || 'normal';
            var nd = document.getElementById('normalDot'), hd = document.getElementById('hackerDot');
            var nl = document.getElementById('mobileNormalOption'), hl = document.getElementById('mobileHackerOption');
            if (nd) nd.style.display = 'none'; if (hd) hd.style.display = 'none';
            if (nl) nl.classList.remove('active-theme'); if (hl) hl.classList.remove('active-theme');
            if (t === 'hacker') { if (hd) hd.style.display = 'inline-block'; if (hl) hl.classList.add('active-theme'); }
            else { if (nd) nd.style.display = 'inline-block'; if (nl) nl.classList.add('active-theme'); }
        }
        function showMobileDevPopup() {
            closeMobileMenu();
            var p = document.getElementById('mobileDevPopup');
            if (p) { p.classList.add('show'); document.body.style.overflow = 'hidden'; }
        }

        /* Close menu on window resize if it gets too wide */
        window.addEventListener('resize', function() {
            if (window.innerWidth > 1100) closeMobileMenu();
        });

        /* Close menu on ESC key */
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape') {
                var menu = document.getElementById('mobileMenu');
                if (menu && menu.classList.contains('active')) closeMobileMenu();
                var p = document.getElementById('mobileDevPopup');
                if (p && p.classList.contains('show')) { p.classList.remove('show'); document.body.style.overflow = ''; }
            }
        });

        /* Swipe-to-close support on mobile menu */
        (function() {
            var touchStartX = 0, touchEndX = 0;
            document.addEventListener('DOMContentLoaded', function() {
                var menu = document.getElementById('mobileMenu');
                if (!menu) return;
                menu.addEventListener('touchstart', function(e) {
                    touchStartX = e.changedTouches[0].screenX;
                }, { passive: true });
                menu.addEventListener('touchend', function(e) {
                    touchEndX = e.changedTouches[0].screenX;
                    if (touchEndX - touchStartX > 70) closeMobileMenu();
                }, { passive: true });
            });
        })();

        /* ═══════════════════════════════════════════════════════
           GET CURRENT TIER
        ═══════════════════════════════════════════════════════ */
        function getCurrentTier() {
            try { return localStorage.getItem('cryptokit_premium_tier') || 'free'; } catch(e) { return 'free'; }
        }

        /* ═══════════════════════════════════════════════════════
           1. THEME TOGGLE LABELS
        ═══════════════════════════════════════════════════════ */
        function applyTierLabels() {
            var tier = getCurrentTier();
            var theme = document.documentElement.getAttribute('data-theme') || 'normal';

            var modeIcon   = document.getElementById('modeIcon');
            var modeLabel  = document.getElementById('modeLabel');
            var optNTitle  = document.getElementById('optNormalTitle');
            var optNDesc   = document.getElementById('optNormalDesc');
            var optNIcon   = document.getElementById('optNormalIcon');
            var optHTitle  = document.getElementById('optHackerTitle');
            var optHDesc   = document.getElementById('optHackerDesc');
            var optHIcon   = document.getElementById('optHackerIcon');
            var mobN       = document.getElementById('mobNormalLabel');
            var mobH       = document.getElementById('mobHackerLabel');

            var labels;
            if (tier === 'pro') {
                labels = {
                    nIcon: '👑', nTitle: 'Premium Mode', nDesc: 'Golden professional theme', nBtn: 'Premium',
                    hIcon: '⚜️', hTitle: 'Elite Mode',    hDesc: 'Golden matrix rain',       hBtn: 'Elite',
                    mobN: '👑 Premium Mode', mobH: '⚜️ Elite Mode'
                };
            } else if (tier === 'enterprise') {
                labels = {
                    nIcon: '🌌', nTitle: 'Premium Mode', nDesc: 'Quantum professional theme', nBtn: 'Premium',
                    hIcon: '🔮', hTitle: 'Elite Mode',    hDesc: 'Quantum matrix rain',       hBtn: 'Elite',
                    mobN: '🌌 Premium Mode', mobH: '🔮 Elite Mode'
                };
            } else {
                labels = {
                    nIcon: '☀️', nTitle: 'Normal Mode', nDesc: 'Clean & professional', nBtn: 'Normal',
                    hIcon: '💀', hTitle: 'Hacker Mode', hDesc: 'Matrix & hacker vibes', hBtn: 'Hacker',
                    mobN: '☀️ Normal Mode', mobH: '💀 Hacker Mode'
                };
            }

            if (optNIcon)  optNIcon.textContent  = labels.nIcon;
            if (optNTitle) optNTitle.textContent = labels.nTitle;
            if (optNDesc)  optNDesc.textContent  = labels.nDesc;
            if (optHIcon)  optHIcon.textContent  = labels.hIcon;
            if (optHTitle) optHTitle.textContent = labels.hTitle;
            if (optHDesc)  optHDesc.textContent  = labels.hDesc;
            if (mobN)      mobN.textContent      = labels.mobN;
            if (mobH)      mobH.textContent      = labels.mobH;

            if (theme === 'hacker') {
                if (modeIcon)  modeIcon.textContent  = labels.hIcon;
                if (modeLabel) modeLabel.textContent = labels.hBtn;
            } else {
                if (modeIcon)  modeIcon.textContent  = labels.nIcon;
                if (modeLabel) modeLabel.textContent = labels.nBtn;
            }

            var cn = document.getElementById('checkNormal'), ch = document.getElementById('checkHacker');
            if (cn) cn.style.display = (theme === 'hacker') ? 'none' : '';
            if (ch) ch.style.display = (theme === 'hacker') ? '' : 'none';
        }

        /* ═══════════════════════════════════════════════════════
           2. VERSION LABEL
        ═══════════════════════════════════════════════════════ */
        function applyVersionLabel() {
            var tier = getCurrentTier();
            var heroVer = document.getElementById('heroVersionText');
            var footVer = document.getElementById('footerVersionText');
            var termTitle = document.getElementById('terminalTitle');

            if (tier === 'pro') {
                if (heroVer) heroVer.innerHTML = 'v2.0 Pro Cipher — Advanced Arsenal Unlocked';
                if (footVer) footVer.innerHTML = '&copy; 2026 CryptoKit <strong style="color:#f59e0b;">v2.0 Pro Cipher</strong>. MIT License. Made with ❤️';
                if (termTitle) termTitle.textContent = 'cryptokit v2.0-pro ~ zsh';
                document.title = 'CryptoKit v2.0 Pro Cipher — Advanced Cryptography Arsenal';
            } else if (tier === 'enterprise') {
                if (heroVer) heroVer.innerHTML = 'v3.0 Quantum — Elite Labs Fully Unlocked';
                if (footVer) footVer.innerHTML = '&copy; 2026 CryptoKit <strong style="color:#a78bfa;">v3.0 Quantum</strong>. MIT License. Made with ❤️';
                if (termTitle) termTitle.textContent = 'cryptokit v3.0-quantum ~ zsh';
                document.title = 'CryptoKit v3.0 Quantum — Elite Cryptography Labs';
            } else {
                if (heroVer) heroVer.innerHTML = 'v1.0 Now Live — Open Source &amp; Free';
                if (footVer) footVer.innerHTML = '&copy; 2026 CryptoKit. MIT License. Made with ❤️';
                if (termTitle) termTitle.textContent = 'cryptokit ~ zsh';
                document.title = 'CryptoKit - Your Complete Cryptography Toolkit';
            }
        }

        /* ═══════════════════════════════════════════════════════
           3. CRYPTOBOT ELITE
        ═══════════════════════════════════════════════════════ */
        function applyBotIdentity() {
            var tier = getCurrentTier();
            var aiName   = document.getElementById('aiName');
            var aiAvatar = document.getElementById('aiAvatar');
            var aiStatus = document.getElementById('aiStatusText');
            var fabIcon  = document.getElementById('fabIcon');
            var aiFab    = document.getElementById('aiFab');
            var mobAsst  = document.getElementById('mobileAssistantLink');

            if (tier === 'pro' || tier === 'enterprise') {
                if (aiName) aiName.innerHTML = 'CryptoBot <span class="ai-elite-badge">Elite</span>';
                if (aiAvatar) aiAvatar.textContent = '🤖';
                if (aiStatus) aiStatus.textContent = 'Online · Elite Engine';
                if (fabIcon) fabIcon.textContent = '🤖';
                if (aiFab) aiFab.title = 'Ask CryptoBot Elite';
                if (mobAsst) mobAsst.innerHTML = '<i class="fas fa-robot" style="width:20px;"></i> Assistant <span style="font-size:10px;font-weight:700;color:' + (tier === 'enterprise' ? '#a78bfa' : '#f59e0b') + ';margin-left:4px;">ELITE</span>';
                window.cryptobotName = 'CryptoBot Elite';
            } else {
                if (aiName) aiName.textContent = 'CryptoBot';
                if (aiAvatar) aiAvatar.textContent = '🤖';
                if (aiStatus) aiStatus.textContent = 'Online · Ready';
                if (fabIcon) fabIcon.textContent = '🤖';
                if (aiFab) aiFab.title = 'Ask CryptoBot';
                if (mobAsst) mobAsst.innerHTML = '<i class="fas fa-robot" style="width:20px;"></i> Assistant';
                window.cryptobotName = 'CryptoBot';
            }
        }

        /* ═══════════════════════════════════════════════════════
           PREMIUM UNLOCK SYSTEM
        ═══════════════════════════════════════════════════════ */
        function unlockPremiumTools() {
            var savedTier = getCurrentTier();

            document.documentElement.classList.remove('premium-active', 'enterprise-active');

            document.querySelectorAll('#proToolsSection .premium-tool-card:not(.coming-soon)').forEach(function(card) {
                card.classList.add('locked');
                card.setAttribute('href', 'pricing.html');
                var cta = card.querySelector('.premium-tool-cta');
                if (cta) cta.innerHTML = '<i class="fas fa-lock"></i> Unlock with Pro';
            });
            document.querySelectorAll('#quantumToolsSection .premium-tool-card:not(.coming-soon)').forEach(function(card) {
                card.classList.add('locked');
                card.setAttribute('href', 'pricing.html');
                var cta = card.querySelector('.premium-tool-cta');
                if (cta) cta.innerHTML = '<i class="fas fa-lock"></i> Unlock with Quantum';
            });

            if (savedTier === 'pro' || savedTier === 'enterprise') {
                document.documentElement.classList.add('premium-active');
                document.querySelectorAll('#proToolsSection .premium-tool-card:not(.coming-soon)').forEach(function(card) {
                    card.classList.remove('locked');
                    if (card.id === 'ptool-scanner')          card.setAttribute('href', 'premium/Crypto-Security-Scanner.html');
                    if (card.id === 'ptool-rsa-lab')          card.setAttribute('href', 'premium/advance-rsa-lab.html');
                    if (card.id === 'ptool-ecc-suite')        card.setAttribute('href', 'premium/advance-ecc-suite.html');
                    if (card.id === 'ptool-batch-integrity')  card.setAttribute('href', 'premium/batch-file-integrity.html');
                    if (card.id === 'ptool-security-report')  card.setAttribute('href', 'premium/security-report-generator.html');
                    var cta = card.querySelector('.premium-tool-cta');
                    if (cta) cta.innerHTML = '<i class="fas fa-play"></i> Use Now';
                });
            }

            if (savedTier === 'enterprise') {
                document.documentElement.classList.remove('premium-active');
                document.documentElement.classList.add('enterprise-active');
                document.querySelectorAll('#quantumToolsSection .premium-tool-card:not(.coming-soon)').forEach(function(card) {
                    card.classList.remove('locked');
                    if (card.id === 'qtool-attack-sim') card.setAttribute('href', 'premium/attack-simulator.html');
                    if (card.id === 'qtool-ctf')        card.setAttribute('href', 'premium/crypto-ctf.html');
                    if (card.id === 'qtool-forensics')  card.setAttribute('href', 'premium/crypto-forensic-lab.html');
                    var cta = card.querySelector('.premium-tool-cta');
                    if (cta) cta.innerHTML = '<i class="fas fa-play"></i> Use Now';
                });
            }

            var navCta     = document.getElementById('navPremiumBtn');
            var heroBtn    = document.getElementById('heroPremiumBtn');
            var mobileLink = document.getElementById('mobilePremiumLink');

            if (savedTier === 'pro') {
                if (navCta)     { navCta.innerHTML = '✨ Pro Active';  navCta.href = '#proToolsSection'; }
                if (heroBtn)    { heroBtn.innerHTML = '<i class="fas fa-star"></i> Pro Active'; heroBtn.href = '#proToolsSection'; }
                if (mobileLink) { mobileLink.innerHTML = '✨ Pro Active'; mobileLink.href = '#proToolsSection'; }
            } else if (savedTier === 'enterprise') {
                if (navCta)     { navCta.innerHTML = '🌌 Quantum Active'; navCta.href = '#quantumToolsSection'; }
                if (heroBtn)    { heroBtn.innerHTML = '<i class="fas fa-bolt"></i> Quantum Active'; heroBtn.href = '#quantumToolsSection'; }
                if (mobileLink) { mobileLink.innerHTML = '🌌 Quantum Active'; mobileLink.href = '#quantumToolsSection'; }
            } else {
                if (navCta)     { navCta.innerHTML = '👑 Go Premium'; navCta.href = 'pricing.html'; }
                if (heroBtn)    { heroBtn.innerHTML = '<i class="fas fa-crown"></i> Go Premium'; heroBtn.href = 'pricing.html'; }
                if (mobileLink) { mobileLink.innerHTML = '👑 Go Premium'; mobileLink.href = 'pricing.html'; }
            }

            applyGoldenMatrix(savedTier);
            applyTierLabels();
            applyVersionLabel();
            applyBotIdentity();
        }

        function applyGoldenMatrix(tier) {
            var canvas = document.getElementById('matrix-canvas');
            if (!canvas) return;
            window.cryptokitPremiumTier = tier;
            if (tier === 'enterprise')      window.matrixRainColor = '#a78bfa';
            else if (tier === 'pro')        window.matrixRainColor = '#fbbf24';
            else                            window.matrixRainColor = '#00FF41';
            if (canvas._matrixColor !== undefined) canvas._matrixColor = window.matrixRainColor;
            if (typeof window.setMatrixColor === 'function') window.setMatrixColor(window.matrixRainColor);
        }

        /* ═══════════════════════════════════════
           DOMContentLoaded
        ═══════════════════════════════════════ */
        document.addEventListener('DOMContentLoaded', function () {
            var closeBtn = document.getElementById('mobileDevPopupCloseBtn');
            if (closeBtn) closeBtn.addEventListener('click', function(e) { e.stopPropagation(); var p = document.getElementById('mobileDevPopup'); if (p) { p.classList.remove('show'); document.body.style.overflow = ''; } });

            var popupOv = document.getElementById('mobileDevPopup');
            if (popupOv) popupOv.addEventListener('click', function(e) { if (e.target === popupOv) { popupOv.classList.remove('show'); document.body.style.overflow = ''; } });

            updateMobileThemeDots();
            syncAuthUI(true);
            unlockPremiumTools();
        });

        document.addEventListener('visibilitychange', function() { if (!document.hidden) unlockPremiumTools(); });
        window.addEventListener('focus', function() { unlockPremiumTools(); });
    </script>

</body>
</html>
