/*--------------Documentation js starts here--------------------------------------------------------*/

// ═══════════════════════════════════
// THEME TOGGLE
// ═══════════════════════════════════
const themeToggle = document.getElementById('themeToggle');
const savedTheme = localStorage.getItem('docs-theme') || 'normal';
document.documentElement.setAttribute('data-theme', savedTheme === 'dark' ? 'dark' : 'normal');

if (themeToggle) {
    updateThemeIcon(savedTheme);
    themeToggle.addEventListener('click', () => {
        const current = document.documentElement.getAttribute('data-theme');
        const next = current === 'dark' ? 'normal' : 'dark';
        document.documentElement.setAttribute('data-theme', next);
        localStorage.setItem('docs-theme', next);
        updateThemeIcon(next);
    });
}

function updateThemeIcon(theme) {
    const icon = themeToggle?.querySelector('i');
    if (icon) {
        icon.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
    }
}

// ═══════════════════════════════════
// COPY TO CLIPBOARD
// ═══════════════════════════════════
document.addEventListener('click', function(e) {
    if (e.target.closest('.copy-btn')) {
        const btn = e.target.closest('.copy-btn');
        const codeBlock = btn.closest('.code-block').querySelector('code');
        const text = codeBlock.innerText;
        
        navigator.clipboard.writeText(text).then(() => {
            btn.classList.add('copied');
            btn.innerHTML = '<i class="fas fa-check"></i> Copied!';
            setTimeout(() => {
                btn.classList.remove('copied');
                btn.innerHTML = '<i class="far fa-copy"></i> Copy';
            }, 2000);
        });
    }
});

// ═══════════════════════════════════
// PROGRESS BAR
// ═══════════════════════════════════
const progressBar = document.querySelector('.progress-fill');
if (progressBar) {
    window.addEventListener('scroll', () => {
        const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrolled = (window.scrollY / scrollHeight) * 100;
        progressBar.style.width = scrolled + '%';
    });
}

// ═══════════════════════════════════
// SCROLL TO TOP
// ═══════════════════════════════════
const scrollTopBtn = document.getElementById('scrollTop');
if (scrollTopBtn) {
    window.addEventListener('scroll', () => {
        if (window.scrollY > 500) {
            scrollTopBtn.classList.add('show');
        } else {
            scrollTopBtn.classList.remove('show');
        }
    });
    scrollTopBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

// ═══════════════════════════════════
// SEARCH (Updated: All flat paths — no docs/ folder)
// ═══════════════════════════════════
const searchData = [
    { title: 'Overview',              desc: 'Documentation home',              url: 'documentation.html' },
    { title: 'Getting Started',       desc: 'Quick start guide',               url: 'getting-started.html' },
    { title: 'Core Concepts',         desc: 'Cryptography fundamentals',       url: 'core-concepts.html' },
    { title: 'Tool Documentation',    desc: 'All tools explained',             url: 'tool-docs.html' },
    { title: 'RSA Key Generator',     desc: 'Generate RSA keys',               url: 'tool-docs.html#rsa' },
    { title: 'Hash Generator',        desc: 'Create cryptographic hashes',     url: 'tool-docs.html#hash' },
    { title: 'File Integrity',        desc: 'Verify file authenticity',        url: 'tool-docs.html#integrity' },
    { title: 'AES Encryption',        desc: 'Encrypt with AES-256',            url: 'tool-docs.html#encrypt' },
    { title: 'Digital Signatures',    desc: 'Sign and verify documents',       url: 'tool-docs.html#signature' },
    { title: 'Password Tools',        desc: 'Generate strong passwords',       url: 'tool-docs.html#password' },
    { title: 'Algorithm Reference',   desc: 'All supported algorithms',        url: 'algorithm-reference.html' },
    { title: 'Security Best Practices', desc: 'Stay secure',                   url: 'security-practices.html' },
    { title: 'Code Examples',         desc: 'Copy-paste snippets',             url: 'code-examples.html' },
    { title: 'JavaScript Examples',   desc: 'Browser Web Crypto examples',     url: 'code-examples.html#javascript' },
    { title: 'Python Examples',       desc: 'Python cryptography snippets',    url: 'code-examples.html#python' },
    { title: 'Node.js Examples',      desc: 'Node crypto module examples',     url: 'code-examples.html#nodejs' },
    { title: 'FAQ',                   desc: 'Common questions',                url: 'faq.html' },
    { title: 'Terminal Commands',     desc: 'CLI reference',                   url: 'terminal-docs.html' },
    { title: 'Glossary',              desc: 'Cryptography terms',              url: 'glossary.html' },
    { title: 'Limitations',           desc: 'Known limitations',               url: 'limitations.html' },
    { title: 'Changelog',             desc: 'Version history',                 url: 'changelog.html' }
];

const searchInput = document.getElementById('docsSearch');
const searchResults = document.getElementById('searchResults');

if (searchInput && searchResults) {
    searchInput.addEventListener('input', function() {
        const q = this.value.toLowerCase().trim();
        if (!q) {
            searchResults.classList.remove('show');
            return;
        }
        const matches = searchData.filter(item =>
            item.title.toLowerCase().includes(q) ||
            item.desc.toLowerCase().includes(q)
        );
        if (matches.length === 0) {
            searchResults.innerHTML = '<div class="search-result-item">No results found</div>';
        } else {
            searchResults.innerHTML = matches.map(m => `
                <a class="search-result-item" href="${m.url}">
                    <div class="result-title">${m.title}</div>
                    <div class="result-desc">${m.desc}</div>
                </a>`
            ).join('');
        }
        searchResults.classList.add('show');
    });

    document.addEventListener('click', (e) => {
        if (!e.target.closest('.docs-nav-search')) {
            searchResults.classList.remove('show');
        }
    });

    document.addEventListener('keydown', (e) => {
        if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
            e.preventDefault();
            searchInput.focus();
        }
    });
}

// ═══════════════════════════════════
// FEEDBACK
// ═══════════════════════════════════
function submitFeedback(type) {
    const box = document.querySelector('.feedback-box');
    if (box) {
        box.innerHTML = '<h3>✅ Thanks for your feedback!</h3><p>We appreciate you helping us improve the docs.</p>';
    }
}

// ═══════════════════════════════════
// AUTO-GENERATE TOC
// ═══════════════════════════════════
const tocContainer = document.getElementById('tocList');
if (tocContainer) {
    const headings = document.querySelectorAll('.docs-section h2, .docs-section h3');
    let html = '';
    headings.forEach(h => {
        const id = h.id || h.innerText.toLowerCase().replace(/[^a-z0-9]+/g, '-');
        h.id = id;
        const cls = h.tagName === 'H3' ? 'toc-h3' : '';
        html += `<li class="${cls}"><a href="#${id}">${h.innerText}</a></li>`;
    });
    tocContainer.innerHTML = html;
}

// ═══════════════════════════════════
// SIDEBAR ACTIVE LINK
// ═══════════════════════════════════
const currentPath = window.location.pathname.split('/').pop() || 'documentation.html';
document.querySelectorAll('.docs-sidebar a').forEach(link => {
    const linkPath = link.getAttribute('href').split('/').pop();
    if (linkPath === currentPath) {
        link.classList.add('active');
    } else {
        link.classList.remove('active');
    }
});

// ═══════════════════════════════════
// LIVE DEMO — HASH
// ═══════════════════════════════════
async function runHashDemo() {
    const input = document.getElementById('demoHashInput');
    const algo = document.getElementById('demoHashAlgo');
    const output = document.getElementById('demoHashOutput');
    if (!input || !output) return;
    if (!input.value) {
        output.textContent = 'Please enter text to hash';
        return;
    }
    const encoder = new TextEncoder();
    const data = encoder.encode(input.value);
    const algoName = algo.value === 'sha256' ? 'SHA-256' : 'SHA-512';
    const hash = await crypto.subtle.digest(algoName, data);
    const hex = Array.from(new Uint8Array(hash))
        .map(b => b.toString(16).padStart(2, '0'))
        .join('');
    output.textContent = hex;
}

// ═══════════════════════════════════
// LIVE DEMO — BASE64
// ═══════════════════════════════════
function runBase64Demo() {
    const input = document.getElementById('demoBase64Input');
    const output = document.getElementById('demoBase64Output');
    if (!input || !output) return;
    if (!input.value) {
        output.textContent = 'Please enter text';
        return;
    }
    output.textContent = btoa(input.value);
}

// ═══════════════════════════════════
// LIVE DEMO — PASSWORD
// ═══════════════════════════════════
function runPasswordDemo() {
    const length = document.getElementById('demoPassLength');
    const output = document.getElementById('demoPassOutput');
    if (!length || !output) return;
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*';
    const arr = new Uint32Array(parseInt(length.value));
    crypto.getRandomValues(arr);
    let password = '';
    for (let i = 0; i < arr.length; i++) {
        password += chars[arr[i] % chars.length];
    }
    output.textContent = password;
}