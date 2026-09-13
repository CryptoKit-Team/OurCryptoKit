/* ═══════════════════════════════════════════════════════
   CRYPTOKIT — WINDOWS CMD TERMINAL ENGINE v2.0
   Pure Windows Command Prompt Emulator
   Authentic CMD commands + CryptoKit crypto extensions
═══════════════════════════════════════════════════════ */

'use strict';

/* ── STATE ─────────────────────────────────────────── */
const STATE = {
    history:       [],
    historyIndex:  -1,
    lastOutput:    '',
    busy:          false,
    acIndex:       -1,
    currentDir:    'C:\\CryptoKit',
    envVars: {
        USERNAME:      'Administrator',
        USERPROFILE:   'C:\\Users\\Administrator',
        COMPUTERNAME:  'CRYPTOKIT-PC',
        OS:            'Windows_NT',
        PROCESSOR_ARCHITECTURE: 'AMD64',
        PATH:          'C:\\Windows\\system32;C:\\Windows;C:\\Program Files\\CryptoKit',
        TEMP:          'C:\\Users\\Administrator\\AppData\\Local\\Temp',
        SystemRoot:    'C:\\Windows',
    },
};

/* ── CMD CONFIG ─────────────────────────────────────── */
const CMD_CONFIG = {
    label:       'Command Prompt',
    chromeTitle: 'C:\\WINDOWS\\system32\\cmd.exe — CryptoKit',
    engineLabel: 'CMD',
    bootLines: [
        { text: 'Microsoft Windows [Version 10.0.22631.3007]', cls: 't-white' },
        { text: '(c) Microsoft Corporation. All rights reserved.', cls: 't-muted' },
        { text: '', cls: 'blank' },
        { text: 'CryptoKit Crypto Engine v2.0.0 loaded ✔', cls: 't-success' },
        { text: 'WebCrypto API  : Available ✔', cls: 't-success' },
        { text: 'Type  help  for CMD commands or  cryptokit help  for crypto tools.', cls: 't-info' },
        { text: '', cls: 'blank' },
    ],
};

/* ── QUICK COMMANDS ─────────────────────────────────── */
const QUICK_CMDS = [
    // Native CMD
    { icon: '📁', name: 'List Files',            desc: 'dir - list directory',            cmd: 'dir' },
    { icon: '📁', name: 'List Wide',              desc: 'Wide directory format',           cmd: 'dir /w' },
    { icon: '📁', name: 'List All',               desc: 'Show hidden files too',           cmd: 'dir /a' },
    { icon: '📂', name: 'Change Dir',             desc: 'Change directory',                cmd: 'cd C:\\Users' },
    { icon: '🌲', name: 'Directory Tree',         desc: 'tree - folder tree',              cmd: 'tree' },
    { icon: '🖨️', name: 'Print Text',             desc: 'echo text to screen',             cmd: 'echo Hello, CryptoKit!' },
    { icon: '🕒', name: 'Show Date',              desc: 'Current system date',             cmd: 'date /t' },
    { icon: '⏰', name: 'Show Time',              desc: 'Current system time',             cmd: 'time /t' },
    { icon: '🖥️', name: 'System Info',            desc: 'systeminfo',                      cmd: 'systeminfo' },
    { icon: '📋', name: 'Version',                desc: 'Windows version',                 cmd: 'ver' },
    { icon: '👤', name: 'Who Am I',               desc: 'Current username',                cmd: 'whoami' },
    { icon: '🌐', name: 'IP Config',              desc: 'Network configuration',           cmd: 'ipconfig' },
    { icon: '🌐', name: 'IP Config /all',         desc: 'Full network info',               cmd: 'ipconfig /all' },
    { icon: '📶', name: 'Ping Google',            desc: 'Test connectivity',               cmd: 'ping google.com' },
    { icon: '🔌', name: 'Netstat',                desc: 'Network connections',             cmd: 'netstat -an' },
    { icon: '⚙️', name: 'Task List',              desc: 'Running processes',               cmd: 'tasklist' },
    { icon: '🧹', name: 'Clear Screen',           desc: 'cls - clear terminal',            cmd: 'cls' },
    { icon: '📍', name: 'Current Path',           desc: 'Show current directory',          cmd: 'cd' },
    { icon: '🔢', name: 'Environment',            desc: 'Show all env variables',          cmd: 'set' },
    // Certutil (native CMD)
    { icon: '#️⃣', name: 'certutil SHA256',        desc: 'Hash file SHA256',                cmd: 'certutil -hashfile document.txt SHA256' },
    { icon: '#️⃣', name: 'certutil MD5',           desc: 'Hash file MD5',                   cmd: 'certutil -hashfile document.txt MD5' },
    { icon: '#️⃣', name: 'certutil SHA512',        desc: 'Hash file SHA512',                cmd: 'certutil -hashfile document.txt SHA512' },
    { icon: '📄', name: 'certutil encode',        desc: 'Base64 encode file',              cmd: 'certutil -encode input.txt output.b64' },
    { icon: '📄', name: 'certutil decode',        desc: 'Base64 decode file',              cmd: 'certutil -decode input.b64 output.txt' },
    // CryptoKit
    { icon: '🔑', name: 'SHA-256 Hash',           desc: 'Hash text with SHA-256',          cmd: 'cryptokit hash --algo sha256 "Type your text here"' },
    { icon: '#️⃣', name: 'All Hashes',             desc: 'All algorithms at once',          cmd: 'cryptokit hash --all "Type your text here"' },
    { icon: '🔐', name: 'RSA 2048 Key',           desc: 'Generate RSA-2048 pair',          cmd: 'cryptokit rsa --generate --bits 2048' },
    { icon: '🔐', name: 'RSA 4096 Key',           desc: 'Generate RSA-4096 pair',          cmd: 'cryptokit rsa --generate --bits 4096' },
    { icon: '🔑', name: 'Password Gen',           desc: 'Strong random password',          cmd: 'cryptokit passwd --generate --length 16 --strong' },
    { icon: '✅', name: 'Check Password',         desc: 'Analyze strength',                cmd: 'cryptokit passwd --check "Type your password here"' },
    { icon: '📄', name: 'Base64 Encode',          desc: 'Encode text to Base64',           cmd: 'cryptokit encode --base64 "Type your sentence here"' },
    { icon: '📄', name: 'Base64 Decode',          desc: 'Decode Base64 to text',           cmd: 'cryptokit decode --base64 "paste base64 here"' },
    { icon: '🔒', name: 'AES Encrypt',            desc: 'AES-256 encrypt',                 cmd: 'cryptokit aes --encrypt "Your secret message" --key "your-password"' },
    { icon: '🔓', name: 'AES Decrypt',            desc: 'AES-256 decrypt',                 cmd: 'cryptokit aes --decrypt "paste-cipher" --key "your-password"' },
    { icon: '🔀', name: 'Random Hex',             desc: 'Random hex string',               cmd: 'cryptokit random --hex 32' },
    { icon: '🔢', name: 'UUID Generator',         desc: 'Generate UUID v4',                cmd: 'cryptokit uuid' },
    { icon: '🔤', name: 'ROT13',                  desc: 'ROT13 cipher',                    cmd: 'cryptokit rot13 "Type your text here"' },
    { icon: '📏', name: 'Char Count',             desc: 'Count characters and words',      cmd: 'cryptokit count "Type your sentence here"' },
    { icon: 'ℹ️', name: 'System Info',            desc: 'Engine details',                  cmd: 'cryptokit --info' },
    { icon: '❓', name: 'Help',                    desc: 'All available commands',          cmd: 'help' },
];

/* ── AUTOCOMPLETE SUGGESTIONS ───────────────────────── */
const AC_SUGGESTIONS = [
    // Native CMD
    { cmd: 'dir',                                                desc: 'List directory contents' },
    { cmd: 'dir /w',                                             desc: 'Wide format listing' },
    { cmd: 'dir /a',                                             desc: 'Include hidden files' },
    { cmd: 'dir /s',                                             desc: 'Recursive listing' },
    { cmd: 'dir /p',                                             desc: 'Paged listing' },
    { cmd: 'cd',                                                 desc: 'Show current directory' },
    { cmd: 'cd ..',                                              desc: 'Parent directory' },
    { cmd: 'cd \\',                                              desc: 'Root directory' },
    { cmd: 'cd C:\\Users',                                       desc: 'Change to Users folder' },
    { cmd: 'cls',                                                desc: 'Clear screen' },
    { cmd: 'echo Hello World',                                   desc: 'Print text' },
    { cmd: 'echo %USERNAME%',                                    desc: 'Print env variable' },
    { cmd: 'echo off',                                           desc: 'Turn off echo' },
    { cmd: 'echo on',                                            desc: 'Turn on echo' },
    { cmd: 'date',                                               desc: 'Show or set date' },
    { cmd: 'date /t',                                            desc: 'Show current date only' },
    { cmd: 'time',                                               desc: 'Show or set time' },
    { cmd: 'time /t',                                            desc: 'Show current time only' },
    { cmd: 'ver',                                                desc: 'Windows version' },
    { cmd: 'vol',                                                desc: 'Volume label & serial' },
    { cmd: 'hostname',                                           desc: 'Computer hostname' },
    { cmd: 'whoami',                                             desc: 'Current user' },
    { cmd: 'whoami /all',                                        desc: 'Detailed user info' },
    { cmd: 'systeminfo',                                         desc: 'Full system info' },
    { cmd: 'tasklist',                                           desc: 'Running processes' },
    { cmd: 'tasklist /v',                                        desc: 'Verbose process list' },
    { cmd: 'taskkill /IM notepad.exe',                           desc: 'Kill process by name' },
    { cmd: 'ipconfig',                                           desc: 'Network configuration' },
    { cmd: 'ipconfig /all',                                      desc: 'Full network info' },
    { cmd: 'ipconfig /flushdns',                                 desc: 'Flush DNS cache' },
    { cmd: 'ipconfig /release',                                  desc: 'Release IP address' },
    { cmd: 'ipconfig /renew',                                    desc: 'Renew IP address' },
    { cmd: 'ping google.com',                                    desc: 'Ping a host' },
    { cmd: 'ping 8.8.8.8 -n 4',                                  desc: 'Ping with count' },
    { cmd: 'tracert google.com',                                 desc: 'Trace route' },
    { cmd: 'nslookup google.com',                                desc: 'DNS lookup' },
    { cmd: 'netstat -an',                                        desc: 'Network connections' },
    { cmd: 'netstat -b',                                         desc: 'Show binary/process' },
    { cmd: 'arp -a',                                             desc: 'ARP cache' },
    { cmd: 'getmac',                                             desc: 'MAC addresses' },
    { cmd: 'set',                                                desc: 'Show all env variables' },
    { cmd: 'set PATH',                                           desc: 'Show PATH variable' },
    { cmd: 'path',                                               desc: 'Show PATH' },
    { cmd: 'tree',                                               desc: 'Folder tree' },
    { cmd: 'tree /f',                                            desc: 'Tree with files' },
    { cmd: 'mkdir newfolder',                                    desc: 'Create directory' },
    { cmd: 'rmdir oldfolder',                                    desc: 'Remove directory' },
    { cmd: 'type file.txt',                                      desc: 'Display file content' },
    { cmd: 'copy source.txt dest.txt',                           desc: 'Copy files' },
    { cmd: 'move source.txt dest.txt',                           desc: 'Move files' },
    { cmd: 'del file.txt',                                       desc: 'Delete file' },
    { cmd: 'ren old.txt new.txt',                                desc: 'Rename file' },
    { cmd: 'title My Terminal',                                  desc: 'Set window title' },
    { cmd: 'color 0A',                                           desc: 'Change colors' },
    { cmd: 'exit',                                               desc: 'Close CMD' },
    { cmd: 'help',                                               desc: 'Show CMD help' },
    { cmd: 'help dir',                                           desc: 'Help for specific command' },
    // Certutil
    { cmd: 'certutil -hashfile document.txt SHA256',             desc: 'Hash file SHA256' },
    { cmd: 'certutil -hashfile document.txt MD5',                desc: 'Hash file MD5' },
    { cmd: 'certutil -hashfile document.txt SHA512',             desc: 'Hash file SHA512' },
    { cmd: 'certutil -hashfile document.txt SHA1',               desc: 'Hash file SHA1' },
    { cmd: 'certutil -encode input.txt output.b64',              desc: 'Base64 encode' },
    { cmd: 'certutil -decode input.b64 output.txt',              desc: 'Base64 decode' },
    // CryptoKit
    { cmd: 'cryptokit hash --algo sha256 "text"',                desc: 'SHA-256 hash' },
    { cmd: 'cryptokit hash --algo sha512 "text"',                desc: 'SHA-512 hash' },
    { cmd: 'cryptokit hash --algo md5 "text"',                   desc: 'MD5 hash' },
    { cmd: 'cryptokit hash --all "text"',                        desc: 'All algorithms' },
    { cmd: 'cryptokit hash --compare "hash1" "hash2"',           desc: 'Compare hashes' },
    { cmd: 'cryptokit rsa --generate',                           desc: 'Generate RSA-2048' },
    { cmd: 'cryptokit rsa --generate --bits 4096',               desc: 'Generate RSA-4096' },
    { cmd: 'cryptokit rsa --analyze',                            desc: 'RSA security guide' },
    { cmd: 'cryptokit passwd --generate',                        desc: 'Random password' },
    { cmd: 'cryptokit passwd --generate --length 20 --strong',   desc: 'Strong password' },
    { cmd: 'cryptokit passwd --generate --passphrase',           desc: 'Memorable passphrase' },
    { cmd: 'cryptokit passwd --check "password"',                desc: 'Check strength' },
    { cmd: 'cryptokit encode --base64 "text"',                   desc: 'Base64 encode' },
    { cmd: 'cryptokit decode --base64 "b64string"',              desc: 'Base64 decode' },
    { cmd: 'cryptokit aes --encrypt "msg" --key "pass"',         desc: 'AES-256 encrypt' },
    { cmd: 'cryptokit aes --decrypt "cipher" --key "pass"',      desc: 'AES-256 decrypt' },
    { cmd: 'cryptokit random --hex 32',                          desc: 'Random hex' },
    { cmd: 'cryptokit random --base64 32',                       desc: 'Random base64' },
    { cmd: 'cryptokit uuid',                                     desc: 'Generate UUID v4' },
    { cmd: 'cryptokit rot13 "text"',                             desc: 'ROT13 cipher' },
    { cmd: 'cryptokit hex --encode "text"',                      desc: 'Text to hex' },
    { cmd: 'cryptokit hex --decode "hex"',                       desc: 'Hex to text' },
    { cmd: 'cryptokit caesar --shift 3 "text"',                  desc: 'Caesar cipher' },
    { cmd: 'cryptokit morse --encode "text"',                    desc: 'Text to Morse' },
    { cmd: 'cryptokit count "text"',                             desc: 'Char/word count' },
    { cmd: 'cryptokit reverse "text"',                           desc: 'Reverse string' },
    { cmd: 'cryptokit --info',                                   desc: 'System info' },
    { cmd: 'cryptokit --version',                                desc: 'Version info' },
    { cmd: 'history',                                            desc: 'Command history' },
];

/* ── REFERENCE PANEL DATA ───────────────────────────── */
const REF_GROUPS = [
    {
        icon: 'fas fa-folder', title: 'File & Directory',
        items: [
            { syn: 'dir',                                    desc: 'List directory contents' },
            { syn: 'dir /w /a',                              desc: 'Wide + all files' },
            { syn: 'cd <path>',                              desc: 'Change directory' },
            { syn: 'mkdir <name>',                           desc: 'Create folder' },
            { syn: 'rmdir <name>',                           desc: 'Remove folder' },
            { syn: 'tree /f',                                desc: 'Folder tree with files' },
            { syn: 'type <file>',                            desc: 'Show file contents' },
            { syn: 'copy / move / del / ren',                desc: 'File operations' },
        ],
    },
    {
        icon: 'fas fa-network-wired', title: 'Networking',
        items: [
            { syn: 'ipconfig /all',                          desc: 'Network info' },
            { syn: 'ping <host>',                            desc: 'Test connectivity' },
            { syn: 'tracert <host>',                         desc: 'Trace route' },
            { syn: 'nslookup <domain>',                      desc: 'DNS lookup' },
            { syn: 'netstat -an',                            desc: 'Active connections' },
            { syn: 'arp -a',                                 desc: 'ARP cache' },
            { syn: 'getmac',                                 desc: 'MAC addresses' },
        ],
    },
    {
        icon: 'fas fa-microchip', title: 'System',
        items: [
            { syn: 'systeminfo',                             desc: 'Full system info' },
            { syn: 'ver',                                    desc: 'Windows version' },
            { syn: 'hostname',                               desc: 'Computer name' },
            { syn: 'whoami /all',                            desc: 'User details' },
            { syn: 'tasklist',                               desc: 'Running processes' },
            { syn: 'taskkill /IM <name>',                    desc: 'Kill a process' },
            { syn: 'set',                                    desc: 'Environment variables' },
        ],
    },
    {
        icon: 'fas fa-shield-alt', title: 'Certutil (Native)',
        items: [
            { syn: 'certutil -hashfile file SHA256',         desc: 'Hash file SHA256' },
            { syn: 'certutil -hashfile file MD5',            desc: 'Hash file MD5' },
            { syn: 'certutil -hashfile file SHA512',         desc: 'Hash file SHA512' },
            { syn: 'certutil -encode in out.b64',            desc: 'Base64 encode file' },
            { syn: 'certutil -decode in.b64 out',            desc: 'Base64 decode file' },
        ],
    },
    {
        icon: 'fas fa-hashtag', title: 'CryptoKit Hashing',
        items: [
            { syn: 'cryptokit hash --algo sha256 "text"',    desc: 'SHA-256 hash' },
            { syn: 'cryptokit hash --algo sha512 "text"',    desc: 'SHA-512 hash' },
            { syn: 'cryptokit hash --algo md5 "text"',       desc: 'MD5 hash (weak)' },
            { syn: 'cryptokit hash --all "text"',            desc: 'All algorithms' },
            { syn: 'cryptokit hash --compare "h1" "h2"',    desc: 'Compare hashes' },
        ],
    },
    {
        icon: 'fas fa-key', title: 'CryptoKit RSA',
        items: [
            { syn: 'cryptokit rsa --generate',               desc: 'RSA-2048 key pair' },
            { syn: 'cryptokit rsa --generate --bits 4096',   desc: 'RSA-4096 key pair' },
            { syn: 'cryptokit rsa --analyze',                desc: 'Security guide' },
        ],
    },
    {
        icon: 'fas fa-lock', title: 'CryptoKit Passwords',
        items: [
            { syn: 'cryptokit passwd --generate --length 16', desc: 'Generate password' },
            { syn: 'cryptokit passwd --generate --strong',    desc: 'Strong password' },
            { syn: 'cryptokit passwd --generate --passphrase',desc: 'Passphrase' },
            { syn: 'cryptokit passwd --check "password"',     desc: 'Check strength' },
        ],
    },
    {
        icon: 'fas fa-code', title: 'CryptoKit Encoding',
        items: [
            { syn: 'cryptokit encode --base64 "text"',        desc: 'Base64 encode' },
            { syn: 'cryptokit decode --base64 "b64"',         desc: 'Base64 decode' },
            { syn: 'cryptokit hex --encode "text"',           desc: 'Text to hex' },
            { syn: 'cryptokit hex --decode "hex"',            desc: 'Hex to text' },
            { syn: 'cryptokit rot13 "text"',                  desc: 'ROT13 cipher' },
            { syn: 'cryptokit caesar --shift 3 "text"',       desc: 'Caesar cipher' },
            { syn: 'cryptokit morse --encode "text"',         desc: 'Morse encode' },
        ],
    },
    {
        icon: 'fas fa-shield-virus', title: 'CryptoKit Encryption',
        items: [
            { syn: 'cryptokit aes --encrypt "msg" --key "pass"', desc: 'AES-256 encrypt' },
            { syn: 'cryptokit aes --decrypt "enc" --key "pass"', desc: 'AES-256 decrypt' },
        ],
    },
    {
        icon: 'fas fa-random', title: 'CryptoKit Random & Utils',
        items: [
            { syn: 'cryptokit random --hex 32',               desc: 'Random hex' },
            { syn: 'cryptokit random --base64 32',            desc: 'Random base64' },
            { syn: 'cryptokit uuid',                          desc: 'UUID v4' },
            { syn: 'cryptokit count "text"',                  desc: 'Char/word count' },
            { syn: 'cryptokit reverse "text"',                desc: 'Reverse string' },
        ],
    },
];


/* ═══════════════════════════════════════════════════════
   INIT
═══════════════════════════════════════════════════════ */
const SESSION_START = Date.now();

document.addEventListener('DOMContentLoaded', () => {
    initMatrix();
    bootTerminal();
    buildSidebar();
    buildRefPanel();
    initInputListeners();
});

/* ── MATRIX CANVAS ─────────────────────────────────── */
function initMatrix() {
    const canvas = document.getElementById('matrixCanvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    canvas.width  = window.innerWidth;
    canvas.height = window.innerHeight;

    const chars = '0123456789ABCDEFabcdef{}[]<>/\\|=+-*&%$#@!';
    const cols  = Math.floor(canvas.width / 18);
    const drops = Array(cols).fill(1);

    setInterval(() => {
        ctx.fillStyle = 'rgba(0,0,0,0.05)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = '#7c3aed';
        ctx.font = '13px JetBrains Mono';
        drops.forEach((y, i) => {
            const ch = chars[Math.floor(Math.random() * chars.length)];
            ctx.fillText(ch, i * 18, y * 18);
            if (y * 18 > canvas.height && Math.random() > 0.975) drops[i] = 0;
            drops[i]++;
        });
    }, 60);

    window.addEventListener('resize', () => {
        canvas.width  = window.innerWidth;
        canvas.height = window.innerHeight;
    });
}

/* ── BOOT TERMINAL ──────────────────────────────────── */
function bootTerminal() {
    updateShellUI();
    const out = document.getElementById('terminalOutput');
    if (!out) return;
    out.innerHTML = '';

    // Create persistent boot banner container
    const banner = document.createElement('div');
    banner.id = 'bootBanner';
    banner.className = 'boot-banner-container';
    out.appendChild(banner);

    // Create dynamic command logs container
    const logs = document.createElement('div');
    logs.id = 'commandLogs';
    logs.className = 'command-logs-container';
    out.appendChild(logs);

    let dl = 0;
    CMD_CONFIG.bootLines.forEach(line => {
        setTimeout(() => {
            const span = document.createElement('span');
            if (line.cls === 'blank') {
                span.className = 'output-blank';
            } else {
                span.className = `output-line ${line.cls}`;
                span.textContent = line.text;
            }
            banner.appendChild(span);
            scrollBottom();
        }, dl);
        dl += 35;
    });
    setTimeout(() => focusInput(), dl + 50);
}

/* ── UPDATE UI ──────────────────────────────────────── */
function updateShellUI() {
    const prompt = document.getElementById('terminalPrompt');
    const chrome = document.getElementById('chromeTitle');
    const engine = document.getElementById('engineShellLabel');
    if (chrome) chrome.textContent = CMD_CONFIG.chromeTitle;
    if (prompt) {
        prompt.textContent = `${STATE.currentDir}>`;
        prompt.className   = 'terminal-prompt t-prompt-cmd';
    }
    if (engine) engine.textContent = CMD_CONFIG.engineLabel;
}

/* ── BUILD SIDEBAR ──────────────────────────────────── */
function buildSidebar() {
    const list = document.getElementById('quickCmdList');
    if (!list) return;
    list.innerHTML = '';
    QUICK_CMDS.forEach(item => {
        const el = document.createElement('div');
        el.className = 'cmd-item';
        el.innerHTML = `
            <span class="cmd-item-icon">${item.icon}</span>
            <div class="cmd-item-info">
                <span class="cmd-item-name">${escapeHtml(item.name)}</span>
                <span class="cmd-item-desc">${escapeHtml(item.desc)}</span>
            </div>`;
        el.onclick = () => {
            document.getElementById('terminalInput').value = item.cmd;
            focusInput();
            hideAutocomplete();
        };
        list.appendChild(el);
    });
}

/* ── BUILD REF PANEL ────────────────────────────────── */
function buildRefPanel() {
    const acc = document.getElementById('refAccordion');
    if (!acc) return;
    acc.innerHTML = '';
    REF_GROUPS.forEach((group, gi) => {
        const div = document.createElement('div');
        div.className = 'ref-group';
        div.innerHTML = `
            <div class="ref-group-header" onclick="toggleRefGroup(${gi})">
                <span><i class="${group.icon}"></i> ${group.title}</span>
                <i class="fas fa-chevron-right ref-arrow"></i>
            </div>
            <div class="ref-group-body">
                ${group.items.map(it => `
                    <div class="ref-cmd-item" onclick="injectCommand(\`${it.syn.replace(/`/g,"\\`")}\`)">
                        <span class="ref-cmd-syntax">${escapeHtml(it.syn)}</span>
                        <span class="ref-cmd-desc">${it.desc}</span>
                    </div>`).join('')}
            </div>`;
        acc.appendChild(div);
    });
}

function toggleRefGroup(index) {
    document.querySelectorAll('.ref-group').forEach((g, i) => {
        if (i === index) g.classList.toggle('open');
    });
}

/* ── INPUT LISTENERS ────────────────────────────────── */
function initInputListeners() {
    const input = document.getElementById('terminalInput');
    if (!input) return;

    input.addEventListener('keydown', e => {
        if (e.key === 'Enter') {
            e.preventDefault();
            const acBox = document.getElementById('autocompleteBox');
            if (acBox && acBox.style.display === 'block' && STATE.acIndex >= 0) {
                const items = acBox.querySelectorAll('.ac-item');
                if (items[STATE.acIndex]) {
                    input.value = items[STATE.acIndex].dataset.cmd;
                    hideAutocomplete();
                    return;
                }
            }
            runCommand();
            return;
        }
        if (e.key === 'ArrowUp') {
            e.preventDefault();
            const acBox = document.getElementById('autocompleteBox');
            if (acBox && acBox.style.display === 'block') { navigateAC(-1); return; }
            navigateHistory(1);
            return;
        }
        if (e.key === 'ArrowDown') {
            e.preventDefault();
            const acBox = document.getElementById('autocompleteBox');
            if (acBox && acBox.style.display === 'block') { navigateAC(1); return; }
            navigateHistory(-1);
            return;
        }
        if (e.key === 'Tab') {
            e.preventDefault();
            const acBox = document.getElementById('autocompleteBox');
            if (acBox && acBox.style.display === 'block') navigateAC(1);
            else showAutocomplete(input.value);
            return;
        }
        if (e.key === 'Escape') { hideAutocomplete(); return; }
        if (e.key === 'l' && e.ctrlKey) { e.preventDefault(); clearTerminal(); return; }
        if (e.key === 'c' && e.ctrlKey && !e.shiftKey) {
            if (STATE.busy) {
                STATE.busy = false;
                appendLine('^C', 't-error');
                appendBlank();
            }
        }
    });

    input.addEventListener('input', () => {
        const val = input.value.trim();
        if (val.length > 0) showAutocomplete(val);
        else hideAutocomplete();
    });

    document.addEventListener('click', e => {
        if (!e.target.closest('#autocompleteBox') && !e.target.closest('#terminalInput'))
            hideAutocomplete();
    });

    const termOut = document.getElementById('terminalOutput');
    if (termOut) termOut.addEventListener('click', () => focusInput());
}

/* ── HISTORY ────────────────────────────────────────── */
function navigateHistory(dir) {
    const input = document.getElementById('terminalInput');
    if (!STATE.history.length) return;
    STATE.historyIndex = Math.max(-1, Math.min(STATE.history.length - 1, STATE.historyIndex + dir));
    input.value = STATE.historyIndex === -1 ? '' : STATE.history[STATE.history.length - 1 - STATE.historyIndex];
}

/* ── AUTOCOMPLETE ───────────────────────────────────── */
function showAutocomplete(query) {
    const box   = document.getElementById('autocompleteBox');
    const input = document.getElementById('terminalInput');
    if (!box || !input) return;
    const lq = query.toLowerCase();
    const matches = AC_SUGGESTIONS.filter(s =>
        s.cmd.toLowerCase().includes(lq) || s.desc.toLowerCase().includes(lq)
    ).slice(0, 10);

    if (!matches.length) { hideAutocomplete(); return; }

    box.innerHTML = matches.map((m, i) => `
        <div class="ac-item" data-cmd="${escapeHtml(m.cmd)}" data-index="${i}"
             onclick="selectAC(\`${m.cmd.replace(/`/g,'\\`')}\`)">
            <span class="ac-cmd">${escapeHtml(m.cmd)}</span>
            <span class="ac-desc">${escapeHtml(m.desc)}</span>
        </div>`).join('');

    const rect = input.getBoundingClientRect();
    box.style.left   = rect.left + 'px';
    box.style.bottom = (window.innerHeight - rect.top + 6) + 'px';
    box.style.display = 'block';
    STATE.acIndex = -1;
}

function hideAutocomplete() {
    const box = document.getElementById('autocompleteBox');
    if (box) box.style.display = 'none';
    STATE.acIndex = -1;
}

function navigateAC(dir) {
    const box   = document.getElementById('autocompleteBox');
    const items = box ? box.querySelectorAll('.ac-item') : [];
    if (!items.length) return;
    STATE.acIndex = (STATE.acIndex + dir + items.length) % items.length;
    items.forEach((it, i) => it.classList.toggle('active', i === STATE.acIndex));
    document.getElementById('terminalInput').value = items[STATE.acIndex].dataset.cmd;
}

function selectAC(cmd) {
    document.getElementById('terminalInput').value = cmd;
    hideAutocomplete();
    focusInput();
}

/* ── RUN COMMAND ────────────────────────────────────── */
function runCommand() {
    if (STATE.busy) return;
    const input = document.getElementById('terminalInput');
    const raw   = input.value.trim();
    if (!raw) return;

    STATE.history.push(raw);
    STATE.historyIndex = -1;
    input.value = '';
    hideAutocomplete();
    updateHistoryUI();
    echoCommand(raw);
    executeCommand(raw);
}

/* ── ECHO COMMAND ───────────────────────────────────── */
function echoCommand(raw) {
    const target = document.getElementById('commandLogs') || document.getElementById('terminalOutput');
    const line  = document.createElement('span');
    line.className = 'output-line line-cmd-echo';
    const parts = tokenize(raw);
    let html = `<span class="t-prompt-cmd">${escapeHtml(STATE.currentDir)}&gt;</span>`;
    parts.forEach((p, i) => {
        if (i === 0) html += `<span class="t-cmd">${escapeHtml(p)}</span>`;
        else if (p.startsWith('/') || p.startsWith('-')) html += `&nbsp;<span class="t-flag">${escapeHtml(p)}</span>`;
        else if (p.startsWith('"') || p.startsWith("'")) html += `&nbsp;<span class="t-value">${escapeHtml(p)}</span>`;
        else html += `&nbsp;<span class="t-string">${escapeHtml(p)}</span>`;
    });
    line.innerHTML = html;
    target.appendChild(line);
    scrollBottom();
}


/* ═══════════════════════════════════════════════════════
   TOKENIZER
═══════════════════════════════════════════════════════ */
function tokenize(raw) {
    const tokens = [];
    const regex  = /"([^"]*?)"|'([^']*?)'|(\S+)/g;
    let   m;
    while ((m = regex.exec(raw)) !== null) {
        if (m[1] !== undefined)      tokens.push(`"${m[1]}"`);
        else if (m[2] !== undefined) tokens.push(`'${m[2]}'`);
        else                         tokens.push(m[3]);
    }
    return tokens;
}

function extractAllQuoted(raw) {
    const results = [];
    const regex   = /"([^"]*?)"|'([^']*?)'/g;
    let   m;
    while ((m = regex.exec(raw)) !== null) {
        results.push(m[1] !== undefined ? m[1] : m[2]);
    }
    return results;
}

function extractQuoted(raw) {
    const all = extractAllQuoted(raw);
    return all.length > 0 ? all[0] : null;
}

function parseFlags(raw) {
    const flags  = {};
    const tokens = tokenize(raw);
    for (let i = 0; i < tokens.length; i++) {
        const t = tokens[i];
        if (t.startsWith('--')) {
            const key  = t.slice(2);
            const next = tokens[i + 1];
            if (next && !next.startsWith('-')) {
                flags[key] = next.replace(/^["']|["']$/g, '');
                i++;
            } else {
                flags[key] = true;
            }
        } else if (t.startsWith('-') && t.length === 2) {
            const key  = t.slice(1);
            const next = tokens[i + 1];
            if (next && !next.startsWith('-')) {
                flags[key] = next.replace(/^["']|["']$/g, '');
                i++;
            } else {
                flags[key] = true;
            }
        }
    }
    return flags;
}


/* ═══════════════════════════════════════════════════════
   EXECUTE COMMAND — MAIN ROUTER
═══════════════════════════════════════════════════════ */
function executeCommand(raw) {
    const lower = raw.toLowerCase().trim();
    const tokens = tokenize(raw);
    const first = tokens[0]?.toLowerCase();

    // Handle env variable echo: echo %VAR%
    if (first === 'echo')       { cmdEcho(raw);        return; }

    // Native CMD commands
    switch (first) {
        case 'help':         cmdHelp(raw);         return;
        case 'cls':          clearTerminal();      return;
        case 'dir':          cmdDir(raw);          return;
        case 'cd':
        case 'chdir':        cmdCd(raw);           return;
        case 'mkdir':
        case 'md':           cmdMkdir(raw);        return;
        case 'rmdir':
        case 'rd':           cmdRmdir(raw);        return;
        case 'tree':         cmdTree(raw);         return;
        case 'type':         cmdType(raw);         return;
        case 'copy':         cmdCopy(raw);         return;
        case 'move':         cmdMove(raw);         return;
        case 'del':
        case 'erase':        cmdDel(raw);          return;
        case 'ren':
        case 'rename':       cmdRen(raw);          return;
        case 'date':         cmdDate(raw);         return;
        case 'time':         cmdTime(raw);         return;
        case 'ver':          cmdVer();             return;
        case 'vol':          cmdVol();             return;
        case 'hostname':     cmdHostname();        return;
        case 'whoami':       cmdWhoami(raw);       return;
        case 'systeminfo':   cmdSystemInfo();      return;
        case 'tasklist':     cmdTasklist(raw);     return;
        case 'taskkill':     cmdTaskkill(raw);     return;
        case 'ipconfig':     cmdIpconfig(raw);     return;
        case 'ping':         cmdPing(raw);         return;
        case 'tracert':      cmdTracert(raw);      return;
        case 'nslookup':     cmdNslookup(raw);     return;
        case 'netstat':      cmdNetstat(raw);      return;
        case 'arp':          cmdArp(raw);          return;
        case 'getmac':       cmdGetmac();          return;
        case 'set':          cmdSet(raw);          return;
        case 'path':         cmdPath();            return;
        case 'title':        cmdTitle(raw);        return;
        case 'color':        cmdColor(raw);        return;
        case 'history':      cmdHistory();         return;
        case 'exit':         cmdExit();            return;
        case 'certutil':     cmdCertutil(raw);     return;
        case 'cryptokit':    cmdCryptokit(raw);    return;
    }

    cmdUnknown(raw);
}


/* ═══════════════════════════════════════════════════════
   NATIVE CMD COMMAND IMPLEMENTATIONS
═══════════════════════════════════════════════════════ */

/* ── HELP ───────────────────────────────────────────── */
function cmdHelp(raw) {
    const tokens = tokenize(raw);
    if (tokens.length > 1) {
        cmdHelpSpecific(tokens[1].toLowerCase());
        return;
    }
    printLines([
        { t: '', c: 'blank' },
        { t: 'For more information on a specific command, type HELP command-name', c: 't-white' },
        { t: '', c: 'blank' },
        { t: 'CD             Displays name of or changes current directory.', c: 't-white' },
        { t: 'CERTUTIL       Displays certification authority (CA) info and hashes files.', c: 't-white' },
        { t: 'CLS            Clears the screen.', c: 't-white' },
        { t: 'COPY           Copies one or more files to another location.', c: 't-white' },
        { t: 'CRYPTOKIT      CryptoKit developer cryptography toolkit.', c: 't-accent' },
        { t: 'DATE           Displays or sets the date.', c: 't-white' },
        { t: 'DEL            Deletes one or more files.', c: 't-white' },
        { t: 'DIR            Displays a list of files and subdirectories.', c: 't-white' },
        { t: 'ECHO           Displays messages or turns echoing on/off.', c: 't-white' },
        { t: 'EXIT           Quits the CMD.EXE program.', c: 't-white' },
        { t: 'GETMAC         Displays the MAC address of network adapters.', c: 't-white' },
        { t: 'HELP           Provides help information for Windows commands.', c: 't-white' },
        { t: 'HOSTNAME       Displays the host name of the computer.', c: 't-white' },
        { t: 'IPCONFIG       Displays TCP/IP configuration information.', c: 't-white' },
        { t: 'MKDIR (MD)     Creates a directory.', c: 't-white' },
        { t: 'MOVE           Moves one or more files.', c: 't-white' },
        { t: 'NETSTAT        Displays network connections and statistics.', c: 't-white' },
        { t: 'NSLOOKUP       Displays information about DNS records.', c: 't-white' },
        { t: 'PATH           Displays or sets a search path for executable files.', c: 't-white' },
        { t: 'PING           Sends ICMP echo requests to a host.', c: 't-white' },
        { t: 'RENAME (REN)   Renames a file or files.', c: 't-white' },
        { t: 'RMDIR (RD)     Removes a directory.', c: 't-white' },
        { t: 'SET            Displays, sets, or removes environment variables.', c: 't-white' },
        { t: 'SYSTEMINFO     Displays machine-specific system properties.', c: 't-white' },
        { t: 'TASKKILL       Terminates running processes.', c: 't-white' },
        { t: 'TASKLIST       Displays all currently running tasks.', c: 't-white' },
        { t: 'TIME           Displays or sets the system time.', c: 't-white' },
        { t: 'TITLE          Sets the window title for the CMD.EXE session.', c: 't-white' },
        { t: 'TRACERT        Traces the route packets take to a network host.', c: 't-white' },
        { t: 'TREE           Graphically displays folder structure.', c: 't-white' },
        { t: 'TYPE           Displays the contents of a text file.', c: 't-white' },
        { t: 'VER            Displays the Windows version.', c: 't-white' },
        { t: 'VOL            Displays a disk volume label and serial number.', c: 't-white' },
        { t: 'WHOAMI         Displays the current user.', c: 't-white' },
        { t: '', c: 'blank' },
    ]);
}

function cmdHelpSpecific(cmd) {
    const helpMap = {
        dir: [
            'Displays a list of files and subdirectories in a directory.',
            '',
            'DIR [drive:][path][filename] [/A[[:]attributes]] [/B] [/C] [/D] [/L] [/N]',
            '  [/O[[:]sortorder]] [/P] [/Q] [/S] [/T[[:]timefield]] [/W] [/X] [/4]',
            '',
            '  /A    Displays files with specified attributes.',
            '  /B    Uses bare format (no heading information or summary).',
            '  /P    Pauses after each screenful of information.',
            '  /Q    Displays the owner of the file.',
            '  /S    Displays files in specified directory and all subdirectories.',
            '  /W    Uses wide list format.',
        ],
        cd: [
            'Displays the name of or changes the current directory.',
            '',
            'CHDIR [/D] [drive:][path]',
            'CHDIR [..]',
            'CD [/D] [drive:][path]',
            'CD [..]',
            '',
            '  ..    Specifies that you want to change to the parent directory.',
            '  /D    Change current drive in addition to changing current directory.',
        ],
        ping: [
            'Sends ICMP ECHO_REQUEST packets to network hosts.',
            '',
            'PING [-t] [-a] [-n count] [-l size] [-f] [-i TTL] target',
            '',
            '  -t         Ping the specified host until stopped.',
            '  -n count   Number of echo requests to send.',
            '  -l size    Send buffer size.',
        ],
    };
    const lines = helpMap[cmd];
    if (lines) {
        printLines([{ t: '', c: 'blank' }, ...lines.map(t => ({ t, c: 't-white' })), { t: '', c: 'blank' }]);
    } else {
        printLines([{ t: '', c: 'blank' }, { t: `This command is not supported by the help utility. Try "${cmd} /?"`, c: 't-muted' }, { t: '', c: 'blank' }]);
    }
}

/* ── DIR ────────────────────────────────────────────── */
function cmdDir(raw) {
    const wide = raw.includes('/w');
    const bare = raw.includes('/b');
    const files = [
        { name: '.',              size: '<DIR>',    date: '01/15/2025  09:30 AM' },
        { name: '..',             size: '<DIR>',    date: '01/15/2025  09:30 AM' },
        { name: 'Documents',      size: '<DIR>',    date: '01/10/2025  14:22 PM' },
        { name: 'Downloads',      size: '<DIR>',    date: '01/12/2025  10:45 AM' },
        { name: 'Keys',           size: '<DIR>',    date: '01/14/2025  16:33 PM' },
        { name: 'readme.txt',     size: '2,048',    date: '01/08/2025  11:05 AM' },
        { name: 'config.json',    size: '1,024',    date: '01/09/2025  08:15 AM' },
        { name: 'secrets.enc',    size: '5,632',    date: '01/13/2025  20:41 PM' },
        { name: 'private.pem',    size: '1,704',    date: '01/14/2025  16:33 PM' },
        { name: 'public.pem',     size: '451',      date: '01/14/2025  16:33 PM' },
    ];

    if (bare) {
        printLines([
            { t: '', c: 'blank' },
            ...files.filter(f => f.name !== '.' && f.name !== '..').map(f => ({ t: f.name, c: 't-white' })),
            { t: '', c: 'blank' },
        ]);
        return;
    }

    const lines = [
        { t: '', c: 'blank' },
        { t: ` Volume in drive C has no label.`, c: 't-white' },
        { t: ` Volume Serial Number is C0DE-1337`, c: 't-white' },
        { t: '', c: 'blank' },
        { t: ` Directory of ${STATE.currentDir}`, c: 't-white' },
        { t: '', c: 'blank' },
    ];

    if (wide) {
        const names = files.filter(f => f.name !== '.' && f.name !== '..').map(f => f.size === '<DIR>' ? `[${f.name}]` : f.name);
        const rows = [];
        for (let i = 0; i < names.length; i += 4) rows.push(names.slice(i, i + 4).map(n => n.padEnd(20)).join(''));
        rows.forEach(r => lines.push({ t: r, c: 't-white' }));
    } else {
        files.forEach(f => {
            const isDir = f.size === '<DIR>';
            const line = `${f.date}    ${f.size.padStart(14)} ${f.name}`;
            lines.push({ t: line, c: isDir ? 't-accent' : 't-white' });
        });
    }

    const fileCount = files.filter(f => f.size !== '<DIR>').length;
    const dirCount  = files.filter(f => f.size === '<DIR>' && f.name !== '.' && f.name !== '..').length;
    lines.push({ t: `               ${fileCount} File(s)          10,859 bytes`, c: 't-white' });
    lines.push({ t: `               ${dirCount + 2} Dir(s)  245,678,123,456 bytes free`, c: 't-white' });
    lines.push({ t: '', c: 'blank' });
    printLines(lines);
}

/* ── CD ─────────────────────────────────────────────── */
function cmdCd(raw) {
    const tokens = tokenize(raw);
    if (tokens.length === 1) {
        printLines([{ t: '', c: 'blank' }, { t: STATE.currentDir, c: 't-white' }, { t: '', c: 'blank' }]);
        return;
    }
    let target = tokens.slice(1).join(' ').replace(/["']/g, '');
    if (target === '..') {
        const parts = STATE.currentDir.split('\\').filter(p => p);
        if (parts.length > 1) parts.pop();
        STATE.currentDir = parts.join('\\') || 'C:';
        if (!STATE.currentDir.includes('\\')) STATE.currentDir += '\\';
    } else if (target === '\\' || target === '/') {
        STATE.currentDir = 'C:\\';
    } else if (/^[A-Z]:/i.test(target)) {
        STATE.currentDir = target;
    } else {
        STATE.currentDir = STATE.currentDir.endsWith('\\') ? STATE.currentDir + target : STATE.currentDir + '\\' + target;
    }
    updateShellUI();
    appendBlank();
}

/* ── MKDIR / RMDIR ──────────────────────────────────── */
function cmdMkdir(raw) {
    const tokens = tokenize(raw);
    if (tokens.length < 2) { printError('The syntax of the command is incorrect.'); return; }
    const name = tokens[1].replace(/["']/g, '');
    printLines([{ t: '', c: 'blank' }, { t: `Directory created: ${name}`, c: 't-success' }, { t: '', c: 'blank' }]);
}

function cmdRmdir(raw) {
    const tokens = tokenize(raw);
    if (tokens.length < 2) { printError('The syntax of the command is incorrect.'); return; }
    const name = tokens[1].replace(/["']/g, '');
    printLines([{ t: '', c: 'blank' }, { t: `Directory removed: ${name}`, c: 't-success' }, { t: '', c: 'blank' }]);
}

/* ── TREE ───────────────────────────────────────────── */
function cmdTree(raw) {
    const showFiles = raw.includes('/f');
    const lines = [
        { t: '', c: 'blank' },
        { t: `Folder PATH listing`, c: 't-white' },
        { t: `Volume serial number is C0DE-1337`, c: 't-white' },
        { t: `${STATE.currentDir}`, c: 't-accent' },
        { t: '├───Documents', c: 't-white' },
        showFiles ? { t: '│       report.docx', c: 't-muted' } : null,
        showFiles ? { t: '│       notes.txt', c: 't-muted' } : null,
        { t: '├───Downloads', c: 't-white' },
        showFiles ? { t: '│       installer.exe', c: 't-muted' } : null,
        { t: '├───Keys', c: 't-white' },
        showFiles ? { t: '│       private.pem', c: 't-muted' } : null,
        showFiles ? { t: '│       public.pem', c: 't-muted' } : null,
        { t: '└───Scripts', c: 't-white' },
        showFiles ? { t: '        backup.bat', c: 't-muted' } : null,
        { t: '', c: 'blank' },
    ].filter(Boolean);
    printLines(lines);
}

/* ── TYPE ───────────────────────────────────────────── */
function cmdType(raw) {
    const tokens = tokenize(raw);
    if (tokens.length < 2) { printError('The syntax of the command is incorrect.'); return; }
    const file = tokens[1].replace(/["']/g, '');
    printLines([
        { t: '', c: 'blank' },
        { t: `[Simulated content of ${file}]`, c: 't-muted' },
        { t: '', c: 'blank' },
        { t: 'This is a demonstration file for the CryptoKit terminal.', c: 't-white' },
        { t: 'File contents are simulated in browser mode.', c: 't-white' },
        { t: '', c: 'blank' },
    ]);
}

/* ── COPY / MOVE / DEL / REN ────────────────────────── */
function cmdCopy(raw) {
    const tokens = tokenize(raw);
    if (tokens.length < 3) { printError('The syntax of the command is incorrect.'); return; }
    printLines([{ t: '', c: 'blank' }, { t: `        1 file(s) copied.`, c: 't-success' }, { t: '', c: 'blank' }]);
}

function cmdMove(raw) {
    const tokens = tokenize(raw);
    if (tokens.length < 3) { printError('The syntax of the command is incorrect.'); return; }
    printLines([{ t: '', c: 'blank' }, { t: `        1 file(s) moved.`, c: 't-success' }, { t: '', c: 'blank' }]);
}

function cmdDel(raw) {
    const tokens = tokenize(raw);
    if (tokens.length < 2) { printError('The syntax of the command is incorrect.'); return; }
    appendBlank();
}

function cmdRen(raw) {
    const tokens = tokenize(raw);
    if (tokens.length < 3) { printError('The syntax of the command is incorrect.'); return; }
    appendBlank();
}

/* ── DATE / TIME / VER / VOL ────────────────────────── */
function cmdDate(raw) {
    const now = new Date();
    const days = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
    const dateStr = `${days[now.getDay()]} ${String(now.getMonth()+1).padStart(2,'0')}/${String(now.getDate()).padStart(2,'0')}/${now.getFullYear()}`;
    if (raw.includes('/t')) {
        printLines([{ t: '', c: 'blank' }, { t: dateStr, c: 't-white' }, { t: '', c: 'blank' }]);
    } else {
        printLines([
            { t: '', c: 'blank' },
            { t: `The current date is: ${dateStr}`, c: 't-white' },
            { t: `Enter the new date: (mm-dd-yy) [not supported in browser]`, c: 't-muted' },
            { t: '', c: 'blank' },
        ]);
    }
}

function cmdTime(raw) {
    const now = new Date();
    const h = now.getHours();
    const m = now.getMinutes();
    const s = now.getSeconds();
    const ms = now.getMilliseconds();
    const ampm = h >= 12 ? 'PM' : 'AM';
    const h12 = h % 12 || 12;
    const timeStr = `${String(h12).padStart(2,'0')}:${String(m).padStart(2,'0')}:${String(s).padStart(2,'0')}.${String(ms).padStart(2,'0').substring(0,2)} ${ampm}`;
    if (raw.includes('/t')) {
        printLines([{ t: '', c: 'blank' }, { t: `${String(h12).padStart(2,'0')}:${String(m).padStart(2,'0')} ${ampm}`, c: 't-white' }, { t: '', c: 'blank' }]);
    } else {
        printLines([
            { t: '', c: 'blank' },
            { t: `The current time is: ${timeStr}`, c: 't-white' },
            { t: `Enter the new time: [not supported in browser]`, c: 't-muted' },
            { t: '', c: 'blank' },
        ]);
    }
}

function cmdVer() {
    printLines([
        { t: '', c: 'blank' },
        { t: 'Microsoft Windows [Version 10.0.22631.3007]', c: 't-white' },
        { t: '', c: 'blank' },
    ]);
}

function cmdVol() {
    printLines([
        { t: '', c: 'blank' },
        { t: ' Volume in drive C has no label.', c: 't-white' },
        { t: ' Volume Serial Number is C0DE-1337', c: 't-white' },
        { t: '', c: 'blank' },
    ]);
}

/* ── HOSTNAME / WHOAMI ──────────────────────────────── */
function cmdHostname() {
    printLines([{ t: '', c: 'blank' }, { t: STATE.envVars.COMPUTERNAME.toLowerCase(), c: 't-white' }, { t: '', c: 'blank' }]);
}

function cmdWhoami(raw) {
    if (raw.includes('/all')) {
        printLines([
            { t: '', c: 'blank' },
            { t: 'USER INFORMATION', c: 't-accent' },
            { t: '----------------', c: 't-muted' },
            { t: '', c: 'blank' },
            { t: 'User Name              SID', c: 't-white' },
            { t: '====================== =============================================', c: 't-muted' },
            { t: `${STATE.envVars.COMPUTERNAME.toLowerCase()}\\${STATE.envVars.USERNAME.toLowerCase()}  S-1-5-21-3623811015-3361044348-30300820-1013`, c: 't-white' },
            { t: '', c: 'blank' },
            { t: 'GROUP INFORMATION', c: 't-accent' },
            { t: '-----------------', c: 't-muted' },
            { t: 'BUILTIN\\Administrators      Group      Enabled by default', c: 't-white' },
            { t: 'BUILTIN\\Users               Group      Enabled by default', c: 't-white' },
            { t: 'NT AUTHORITY\\Authenticated Users  Group  Enabled by default', c: 't-white' },
            { t: '', c: 'blank' },
        ]);
    } else {
        printLines([{ t: '', c: 'blank' }, { t: `${STATE.envVars.COMPUTERNAME.toLowerCase()}\\${STATE.envVars.USERNAME.toLowerCase()}`, c: 't-white' }, { t: '', c: 'blank' }]);
    }
}

/* ── SYSTEMINFO ─────────────────────────────────────── */
function cmdSystemInfo() {
    STATE.busy = true;
    printLines([{ t: '', c: 'blank' }, { t: 'Loading system information...', c: 't-info' }]);
    setTimeout(() => {
        const now = new Date();
        printLines([
            { t: '', c: 'blank' },
            { t: `Host Name:                 ${STATE.envVars.COMPUTERNAME}`, c: 't-white' },
            { t: `OS Name:                   Microsoft Windows 11 Pro`, c: 't-white' },
            { t: `OS Version:                10.0.22631 N/A Build 22631`, c: 't-white' },
            { t: `OS Manufacturer:           Microsoft Corporation`, c: 't-white' },
            { t: `OS Configuration:          Standalone Workstation`, c: 't-white' },
            { t: `OS Build Type:             Multiprocessor Free`, c: 't-white' },
            { t: `Registered Owner:          ${STATE.envVars.USERNAME}`, c: 't-white' },
            { t: `Registered Organization:   CryptoKit`, c: 't-white' },
            { t: `Product ID:                00330-80000-00000-AA001`, c: 't-white' },
            { t: `Original Install Date:     01/01/2024, 12:00:00 AM`, c: 't-white' },
            { t: `System Boot Time:          ${now.toLocaleString()}`, c: 't-white' },
            { t: `System Manufacturer:       CryptoKit Virtual Systems`, c: 't-white' },
            { t: `System Model:              WebCrypto VM`, c: 't-white' },
            { t: `System Type:               x64-based PC`, c: 't-white' },
            { t: `Processor(s):              1 Processor(s) Installed.`, c: 't-white' },
            { t: `                           [01]: Intel64 Family 6 Model 158`, c: 't-white' },
            { t: `BIOS Version:              CryptoKit BIOS v2.0, 01/01/2024`, c: 't-white' },
            { t: `Windows Directory:         C:\\Windows`, c: 't-white' },
            { t: `System Directory:          C:\\Windows\\system32`, c: 't-white' },
            { t: `Boot Device:               \\Device\\HarddiskVolume1`, c: 't-white' },
            { t: `System Locale:             en-us;English (United States)`, c: 't-white' },
            { t: `Input Locale:              en-us;English (United States)`, c: 't-white' },
            { t: `Time Zone:                 (UTC+00:00) Coordinated Universal Time`, c: 't-white' },
            { t: `Total Physical Memory:     16,384 MB`, c: 't-white' },
            { t: `Available Physical Memory: 10,240 MB`, c: 't-white' },
            { t: `Virtual Memory: Max Size:  32,768 MB`, c: 't-white' },
            { t: `Virtual Memory: Available: 24,576 MB`, c: 't-white' },
            { t: `Virtual Memory: In Use:    8,192 MB`, c: 't-white' },
            { t: `Page File Location(s):     C:\\pagefile.sys`, c: 't-white' },
            { t: `Domain:                    WORKGROUP`, c: 't-white' },
            { t: `Logon Server:              \\\\${STATE.envVars.COMPUTERNAME}`, c: 't-white' },
            { t: '', c: 'blank' },
        ]);
        STATE.busy = false;
    }, 800);
}

/* ── TASKLIST / TASKKILL ────────────────────────────── */
function cmdTasklist(raw) {
    const tasks = [
        { name: 'System Idle Process',    pid: 0,    session: 'Services', sid: 0,    mem: '8 K' },
        { name: 'System',                  pid: 4,    session: 'Services', sid: 0,    mem: '148 K' },
        { name: 'smss.exe',                pid: 388,  session: 'Services', sid: 0,    mem: '1,024 K' },
        { name: 'csrss.exe',               pid: 512,  session: 'Services', sid: 0,    mem: '4,096 K' },
        { name: 'winlogon.exe',            pid: 636,  session: 'Console',  sid: 1,    mem: '9,216 K' },
        { name: 'explorer.exe',            pid: 2340, session: 'Console',  sid: 1,    mem: '87,432 K' },
        { name: 'chrome.exe',              pid: 5820, session: 'Console',  sid: 1,    mem: '245,120 K' },
        { name: 'cmd.exe',                 pid: 7412, session: 'Console',  sid: 1,    mem: '3,584 K' },
        { name: 'cryptokit.exe',           pid: 9010, session: 'Console',  sid: 1,    mem: '32,768 K' },
    ];
    printLines([
        { t: '', c: 'blank' },
        { t: 'Image Name                     PID Session Name        Session#    Mem Usage', c: 't-white' },
        { t: '========================= ======== ================ =========== ============', c: 't-muted' },
        ...tasks.map(t => ({
            t: `${t.name.padEnd(25)} ${String(t.pid).padStart(8)} ${t.session.padEnd(16)} ${String(t.sid).padStart(11)} ${t.mem.padStart(12)}`,
            c: 't-white'
        })),
        { t: '', c: 'blank' },
    ]);
}

function cmdTaskkill(raw) {
    const tokens = tokenize(raw);
    const nameIdx = tokens.findIndex(t => t.toLowerCase() === '/im');
    const pidIdx  = tokens.findIndex(t => t.toLowerCase() === '/pid');
    if (nameIdx !== -1 && tokens[nameIdx + 1]) {
        printLines([{ t: '', c: 'blank' }, { t: `SUCCESS: Sent termination signal to the process "${tokens[nameIdx+1]}"`, c: 't-success' }, { t: '', c: 'blank' }]);
    } else if (pidIdx !== -1 && tokens[pidIdx + 1]) {
        printLines([{ t: '', c: 'blank' }, { t: `SUCCESS: The process with PID ${tokens[pidIdx+1]} has been terminated.`, c: 't-success' }, { t: '', c: 'blank' }]);
    } else {
        printError('ERROR: Invalid syntax. Use: taskkill /IM <name> or taskkill /PID <pid>');
    }
}

/* ── IPCONFIG ───────────────────────────────────────── */
function cmdIpconfig(raw) {
    const isAll     = raw.includes('/all');
    const isFlush   = raw.includes('/flushdns');
    const isRelease = raw.includes('/release');
    const isRenew   = raw.includes('/renew');

    if (isFlush) {
        printLines([
            { t: '', c: 'blank' },
            { t: 'Windows IP Configuration', c: 't-white' },
            { t: '', c: 'blank' },
            { t: 'Successfully flushed the DNS Resolver Cache.', c: 't-success' },
            { t: '', c: 'blank' },
        ]);
        return;
    }
    if (isRelease) {
        printLines([{ t: '', c: 'blank' }, { t: 'Windows IP Configuration', c: 't-white' }, { t: 'IP address released successfully.', c: 't-success' }, { t: '', c: 'blank' }]);
        return;
    }
    if (isRenew) {
        printLines([{ t: '', c: 'blank' }, { t: 'Windows IP Configuration', c: 't-white' }, { t: 'IP address renewed: 192.168.1.42', c: 't-success' }, { t: '', c: 'blank' }]);
        return;
    }

    const lines = [
        { t: '', c: 'blank' },
        { t: 'Windows IP Configuration', c: 't-accent' },
        { t: '', c: 'blank' },
    ];

    if (isAll) {
        lines.push({ t: `   Host Name . . . . . . . . . . . : ${STATE.envVars.COMPUTERNAME.toLowerCase()}`, c: 't-white' });
        lines.push({ t: `   Primary Dns Suffix  . . . . . . : `, c: 't-white' });
        lines.push({ t: `   Node Type . . . . . . . . . . . : Hybrid`, c: 't-white' });
        lines.push({ t: `   IP Routing Enabled. . . . . . . : No`, c: 't-white' });
        lines.push({ t: `   WINS Proxy Enabled. . . . . . . : No`, c: 't-white' });
        lines.push({ t: '', c: 'blank' });
    }

    lines.push({ t: 'Ethernet adapter Ethernet:', c: 't-accent' });
    lines.push({ t: '', c: 'blank' });
    lines.push({ t: '   Connection-specific DNS Suffix  . : localdomain', c: 't-white' });
    if (isAll) {
        lines.push({ t: '   Description . . . . . . . . . . : CryptoKit Virtual Ethernet Adapter', c: 't-white' });
        lines.push({ t: '   Physical Address. . . . . . . . : 00-1A-2B-3C-4D-5E', c: 't-white' });
        lines.push({ t: '   DHCP Enabled. . . . . . . . . . : Yes', c: 't-white' });
        lines.push({ t: '   Autoconfiguration Enabled . . . : Yes', c: 't-white' });
    }
    lines.push({ t: '   Link-local IPv6 Address . . . . : fe80::a1b2:c3d4:e5f6:7890%12', c: 't-white' });
    lines.push({ t: '   IPv4 Address. . . . . . . . . . : 192.168.1.42', c: 't-white' });
    lines.push({ t: '   Subnet Mask . . . . . . . . . . : 255.255.255.0', c: 't-white' });
    lines.push({ t: '   Default Gateway . . . . . . . . : 192.168.1.1', c: 't-white' });
    if (isAll) {
        lines.push({ t: '   DHCP Server . . . . . . . . . . : 192.168.1.1', c: 't-white' });
        lines.push({ t: '   DNS Servers . . . . . . . . . . : 8.8.8.8', c: 't-white' });
        lines.push({ t: '                                       8.8.4.4', c: 't-white' });
        lines.push({ t: '   NetBIOS over Tcpip. . . . . . . : Enabled', c: 't-white' });
    }
    lines.push({ t: '', c: 'blank' });
    printLines(lines);
}

/* ── PING ───────────────────────────────────────────── */
async function cmdPing(raw) {
    const tokens = tokenize(raw);
    const host = tokens.find((t, i) => i > 0 && !t.startsWith('-')) || 'google.com';
    const nIdx = tokens.indexOf('-n');
    const count = nIdx !== -1 ? parseInt(tokens[nIdx + 1]) || 4 : 4;
    const ip = fakeIp(host);

    STATE.busy = true;
    printLines([
        { t: '', c: 'blank' },
        { t: `Pinging ${host} [${ip}] with 32 bytes of data:`, c: 't-white' },
    ]);

    let sent = 0, received = 0;
    const times = [];
    for (let i = 0; i < count; i++) {
        await delay(600);
        if (!STATE.busy) return;
        const time = Math.floor(Math.random() * 40) + 5;
        times.push(time);
        sent++;
        received++;
        appendLine(`Reply from ${ip}: bytes=32 time=${time}ms TTL=118`, 't-white');
    }
    const min = Math.min(...times);
    const max = Math.max(...times);
    const avg = Math.round(times.reduce((a,b) => a+b, 0) / times.length);
    printLines([
        { t: '', c: 'blank' },
        { t: `Ping statistics for ${ip}:`, c: 't-white' },
        { t: `    Packets: Sent = ${sent}, Received = ${received}, Lost = 0 (0% loss),`, c: 't-white' },
        { t: `Approximate round trip times in milli-seconds:`, c: 't-white' },
        { t: `    Minimum = ${min}ms, Maximum = ${max}ms, Average = ${avg}ms`, c: 't-white' },
        { t: '', c: 'blank' },
    ]);
    STATE.busy = false;
}

/* ── TRACERT ────────────────────────────────────────── */
async function cmdTracert(raw) {
    const tokens = tokenize(raw);
    const host = tokens[1] || 'google.com';
    const ip = fakeIp(host);
    STATE.busy = true;
    printLines([
        { t: '', c: 'blank' },
        { t: `Tracing route to ${host} [${ip}]`, c: 't-white' },
        { t: `over a maximum of 30 hops:`, c: 't-white' },
        { t: '', c: 'blank' },
    ]);
    const hops = [
        '192.168.1.1',
        '10.0.0.1',
        '172.16.42.1',
        '203.0.113.5',
        '198.51.100.22',
        ip,
    ];
    for (let i = 0; i < hops.length; i++) {
        await delay(400);
        if (!STATE.busy) return;
        const t1 = Math.floor(Math.random() * 20) + 1;
        const t2 = Math.floor(Math.random() * 20) + 1;
        const t3 = Math.floor(Math.random() * 20) + 1;
        appendLine(`  ${String(i+1).padStart(2)}    ${String(t1).padStart(3)} ms   ${String(t2).padStart(3)} ms   ${String(t3).padStart(3)} ms  ${hops[i]}`, 't-white');
    }
    printLines([{ t: '', c: 'blank' }, { t: 'Trace complete.', c: 't-success' }, { t: '', c: 'blank' }]);
    STATE.busy = false;
}

/* ── NSLOOKUP ───────────────────────────────────────── */
function cmdNslookup(raw) {
    const tokens = tokenize(raw);
    const host = tokens[1] || 'google.com';
    const ip = fakeIp(host);
    printLines([
        { t: '', c: 'blank' },
        { t: `Server:  dns.google`, c: 't-white' },
        { t: `Address: 8.8.8.8`, c: 't-white' },
        { t: '', c: 'blank' },
        { t: `Non-authoritative answer:`, c: 't-white' },
        { t: `Name:    ${host}`, c: 't-white' },
        { t: `Address: ${ip}`, c: 't-white' },
        { t: '', c: 'blank' },
    ]);
}

/* ── NETSTAT ────────────────────────────────────────── */
function cmdNetstat(raw) {
    printLines([
        { t: '', c: 'blank' },
        { t: 'Active Connections', c: 't-accent' },
        { t: '', c: 'blank' },
        { t: '  Proto  Local Address          Foreign Address        State', c: 't-white' },
        { t: '  TCP    0.0.0.0:135            0.0.0.0:0              LISTENING', c: 't-white' },
        { t: '  TCP    0.0.0.0:445            0.0.0.0:0              LISTENING', c: 't-white' },
        { t: '  TCP    0.0.0.0:5040           0.0.0.0:0              LISTENING', c: 't-white' },
        { t: '  TCP    192.168.1.42:49670     140.82.112.22:443      ESTABLISHED', c: 't-white' },
        { t: '  TCP    192.168.1.42:49671     52.96.165.18:443       ESTABLISHED', c: 't-white' },
        { t: '  TCP    192.168.1.42:49672     172.217.16.174:443     ESTABLISHED', c: 't-white' },
        { t: '  TCP    [::]:135               [::]:0                 LISTENING', c: 't-white' },
        { t: '  TCP    [::]:445               [::]:0                 LISTENING', c: 't-white' },
        { t: '  UDP    0.0.0.0:500            *:*', c: 't-white' },
        { t: '  UDP    0.0.0.0:4500           *:*', c: 't-white' },
        { t: '', c: 'blank' },
    ]);
}

/* ── ARP / GETMAC ───────────────────────────────────── */
function cmdArp(raw) {
    printLines([
        { t: '', c: 'blank' },
        { t: 'Interface: 192.168.1.42 --- 0x12', c: 't-accent' },
        { t: '  Internet Address      Physical Address      Type', c: 't-white' },
        { t: '  192.168.1.1           00-50-56-c0-00-01     dynamic', c: 't-white' },
        { t: '  192.168.1.255         ff-ff-ff-ff-ff-ff     static', c: 't-white' },
        { t: '  224.0.0.22            01-00-5e-00-00-16     static', c: 't-white' },
        { t: '  239.255.255.250       01-00-5e-7f-ff-fa     static', c: 't-white' },
        { t: '', c: 'blank' },
    ]);
}

function cmdGetmac() {
    printLines([
        { t: '', c: 'blank' },
        { t: 'Physical Address    Transport Name', c: 't-white' },
        { t: '=================== ==========================================================', c: 't-muted' },
        { t: '00-1A-2B-3C-4D-5E   \\Device\\Tcpip_{A1B2C3D4-E5F6-7890-ABCD-1234567890AB}', c: 't-white' },
        { t: '', c: 'blank' },
    ]);
}

/* ── SET / PATH ─────────────────────────────────────── */
function cmdSet(raw) {
    const tokens = tokenize(raw);
    if (tokens.length > 1) {
        const key = tokens[1].toUpperCase();
        const val = STATE.envVars[key];
        if (val !== undefined) {
            printLines([{ t: '', c: 'blank' }, { t: `${key}=${val}`, c: 't-white' }, { t: '', c: 'blank' }]);
        } else {
            printLines([{ t: '', c: 'blank' }, { t: `Environment variable ${key} not defined`, c: 't-error' }, { t: '', c: 'blank' }]);
        }
        return;
    }
    const lines = [{ t: '', c: 'blank' }];
    Object.keys(STATE.envVars).sort().forEach(k => {
        lines.push({ t: `${k}=${STATE.envVars[k]}`, c: 't-white' });
    });
    lines.push({ t: '', c: 'blank' });
    printLines(lines);
}

function cmdPath() {
    printLines([{ t: '', c: 'blank' }, { t: `PATH=${STATE.envVars.PATH}`, c: 't-white' }, { t: '', c: 'blank' }]);
}

/* ── TITLE / COLOR ──────────────────────────────────── */
function cmdTitle(raw) {
    const title = raw.replace(/^title\s+/i, '').trim();
    if (title) {
        const chrome = document.getElementById('chromeTitle');
        if (chrome) chrome.textContent = title;
    }
    appendBlank();
}

function cmdColor(raw) {
    printLines([{ t: '', c: 'blank' }, { t: '(Color changes are not supported in browser mode)', c: 't-muted' }, { t: '', c: 'blank' }]);
}

/* ── HISTORY ────────────────────────────────────────── */
function cmdHistory() {
    if (!STATE.history.length) {
        printLines([{ t: '', c: 'blank' }, { t: '  No commands in history yet.', c: 't-muted' }, { t: '', c: 'blank' }]);
        return;
    }
    const lines = [{ t: '', c: 'blank' }];
    STATE.history.forEach((cmd, i) => {
        lines.push({ t: `  ${String(i + 1).padStart(4)}  ${cmd}`, c: 't-white' });
    });
    lines.push({ t: '', c: 'blank' });
    printLines(lines);
}

/* ── EXIT ───────────────────────────────────────────── */
function cmdExit() {
    printLines([
        { t: '', c: 'blank' },
        { t: 'Terminating CMD session...', c: 't-warning' },
        { t: '(In browser mode, this simply clears the terminal)', c: 't-muted' },
        { t: '', c: 'blank' },
    ]);
    setTimeout(() => clearTerminal(), 800);
}

/* ── ECHO ───────────────────────────────────────────── */
function cmdEcho(raw) {
    let text = raw.replace(/^echo\s*/i, '');
    if (text.toLowerCase() === 'off' || text.toLowerCase() === 'on') {
        printLines([{ t: '', c: 'blank' }, { t: `ECHO is ${text.toLowerCase()}.`, c: 't-white' }, { t: '', c: 'blank' }]);
        return;
    }
    if (!text) {
        printLines([{ t: '', c: 'blank' }, { t: 'ECHO is on.', c: 't-white' }, { t: '', c: 'blank' }]);
        return;
    }
    // Expand environment variables %VAR%
    text = text.replace(/%([A-Z_][A-Z0-9_]*)%/gi, (match, key) => {
        return STATE.envVars[key.toUpperCase()] !== undefined ? STATE.envVars[key.toUpperCase()] : match;
    });
    printLines([{ t: '', c: 'blank' }, { t: text, c: 't-white' }, { t: '', c: 'blank' }]);
}


/* ═══════════════════════════════════════════════════════
   CERTUTIL (Native Windows Crypto Tool)
═══════════════════════════════════════════════════════ */
async function cmdCertutil(raw) {
    const tokens = tokenize(raw);
    const flag = tokens[1]?.toLowerCase();

    if (flag === '-hashfile') {
        const filename = tokens[2] || 'file.txt';
        const algoStr = tokens[3]?.toUpperCase() || 'SHA1';
        const map = { SHA256:'SHA-256', SHA512:'SHA-512', SHA384:'SHA-384', SHA1:'SHA-1', MD5:null };
        const algo = map[algoStr];
        if (algo === undefined) {
            printError(`Unknown algorithm: ${algoStr}. Try: MD5, SHA1, SHA256, SHA384, SHA512`);
            return;
        }
        const text = `[File content simulation: ${filename}]`;
        STATE.busy = true;
        await delay(300);
        let hash;
        if (algo === null) hash = md5Sim(text);
        else { const buf = await crypto.subtle.digest(algo, new TextEncoder().encode(text)); hash = bufToHex(buf); }
        printLines([
            { t: '', c: 'blank' },
            { t: `${algoStr} hash of ${filename}:`, c: 't-white' },
            { t: hash, c: 't-hash' },
            { t: 'CertUtil: -hashfile command completed successfully.', c: 't-success' },
            { t: '', c: 'blank' },
        ]);
        STATE.lastOutput = hash;
        STATE.busy = false;
    } else if (flag === '-encode') {
        const inFile = tokens[2] || 'input.txt';
        const outFile = tokens[3] || 'output.b64';
        const sample = btoa(`[Simulated content of ${inFile}]`);
        const wrapped = sample.match(/.{1,64}/g).join('\n');
        printLines([
            { t: '', c: 'blank' },
            { t: `Input Length = ${sample.length}`, c: 't-white' },
            { t: `Output Length = ${sample.length + 64}`, c: 't-white' },
            { t: '', c: 'blank' },
            { t: '-----BEGIN CERTIFICATE-----', c: 't-key' },
            ...wrapped.split('\n').map(l => ({ t: l, c: 't-key' })),
            { t: '-----END CERTIFICATE-----', c: 't-key' },
            { t: '', c: 'blank' },
            { t: `CertUtil: -encode command completed successfully.`, c: 't-success' },
            { t: `Output written to: ${outFile}`, c: 't-muted' },
            { t: '', c: 'blank' },
        ]);
        STATE.lastOutput = sample;
    } else if (flag === '-decode') {
        const inFile = tokens[2] || 'input.b64';
        const outFile = tokens[3] || 'output.txt';
        printLines([
            { t: '', c: 'blank' },
            { t: `Input Length = 128`, c: 't-white' },
            { t: `Output Length = 96`, c: 't-white' },
            { t: `CertUtil: -decode command completed successfully.`, c: 't-success' },
            { t: `Output written to: ${outFile}`, c: 't-muted' },
            { t: '', c: 'blank' },
        ]);
    } else {
        printLines([
            { t: '', c: 'blank' },
            { t: 'Usage:', c: 't-info' },
            { t: '  certutil -hashfile <file> [MD5|SHA1|SHA256|SHA384|SHA512]', c: 't-white' },
            { t: '  certutil -encode <infile> <outfile>          Base64 encode', c: 't-white' },
            { t: '  certutil -decode <infile> <outfile>          Base64 decode', c: 't-white' },
            { t: '', c: 'blank' },
        ]);
    }
}


/* ═══════════════════════════════════════════════════════
   CRYPTOKIT UNIVERSAL ROUTER
═══════════════════════════════════════════════════════ */
function cmdCryptokit(raw) {
    const tokens = tokenize(raw);
    const sub    = tokens[1]?.toLowerCase();

    if (!sub || sub === 'help') {
        cmdCryptokitHelp();
        return;
    }

    switch (sub) {
        case 'hash':     cmdCryptokitHash(raw);   break;
        case 'rsa':      cmdCryptokitRSA(raw);    break;
        case 'passwd':   cmdCryptokitPasswd(raw); break;
        case 'encode':   cmdCryptokitEncode(raw); break;
        case 'decode':   cmdCryptokitDecode(raw); break;
        case 'aes':      cmdCryptokitAES(raw);    break;
        case 'random':   cmdCryptokitRandom(raw); break;
        case 'uuid':     cmdUUID();               break;
        case 'rot13':    cmdROT13(raw);           break;
        case 'hex':      cmdHex(raw);             break;
        case 'count':    cmdCount(raw);           break;
        case 'reverse':  cmdReverse(raw);         break;
        case 'morse':    cmdMorse(raw);           break;
        case 'caesar':   cmdCaesar(raw);          break;
        case '--info':   cmdInfo();               break;
        case '--version':cmdVersion();            break;
        default:
            printLines([
                { t: '', c: 'blank' },
                { t: `  Unknown subcommand: ${sub}`, c: 't-error' },
                { t: '  Type  cryptokit help  for full list.', c: 't-info' },
                { t: '', c: 'blank' },
            ]);
    }
}

function cmdCryptokitHelp() {
    printLines([
        { t: '', c: 'blank' },
        { t: '  ╔══════════════════════════════════════════════════════════╗', c: 't-accent' },
        { t: '  ║        CryptoKit v2.0 — CryptoKit CMD Commands            ║', c: 't-accent' },
        { t: '  ╚══════════════════════════════════════════════════════════╝', c: 't-accent' },
        { t: '', c: 'blank' },
        { t: '  ── HASHING ─────────────────────────────────────────────────', c: 't-muted' },
        { t: '  cryptokit hash --algo <alg> "your text"          Hash string', c: 't-white' },
        { t: '  cryptokit hash --all "your text"                  All algorithms', c: 't-white' },
        { t: '  cryptokit hash --compare "hash1" "hash2"         Compare', c: 't-white' },
        { t: '', c: 'blank' },
        { t: '  ── RSA KEYS ────────────────────────────────────────────────', c: 't-muted' },
        { t: '  cryptokit rsa --generate [--bits 2048|4096]      Generate pair', c: 't-white' },
        { t: '  cryptokit rsa --analyze                           Security guide', c: 't-white' },
        { t: '', c: 'blank' },
        { t: '  ── PASSWORDS ───────────────────────────────────────────────', c: 't-muted' },
        { t: '  cryptokit passwd --generate [options]             Random password', c: 't-white' },
        { t: '  cryptokit passwd --check "your password"         Strength check', c: 't-white' },
        { t: '', c: 'blank' },
        { t: '  ── ENCODING & CIPHERS ──────────────────────────────────────', c: 't-muted' },
        { t: '  cryptokit encode --base64 "text"                  Base64 encode', c: 't-white' },
        { t: '  cryptokit decode --base64 "b64"                   Base64 decode', c: 't-white' },
        { t: '  cryptokit hex --encode/--decode "text"            Hex conversion', c: 't-white' },
        { t: '  cryptokit rot13 "text"                            ROT13 cipher', c: 't-white' },
        { t: '  cryptokit caesar --shift 3 "text"                 Caesar cipher', c: 't-white' },
        { t: '  cryptokit morse --encode/--decode "text"          Morse code', c: 't-white' },
        { t: '', c: 'blank' },
        { t: '  ── ENCRYPTION ──────────────────────────────────────────────', c: 't-muted' },
        { t: '  cryptokit aes --encrypt "msg" --key "pass"       AES-256-GCM', c: 't-white' },
        { t: '  cryptokit aes --decrypt "cipher" --key "pass"    AES decrypt', c: 't-white' },
        { t: '', c: 'blank' },
        { t: '  ── UTILITIES ───────────────────────────────────────────────', c: 't-muted' },
        { t: '  cryptokit random --hex/--base64 <n>               Random bytes', c: 't-white' },
        { t: '  cryptokit uuid                                    UUID v4', c: 't-white' },
        { t: '  cryptokit count "text"                            Char/word count', c: 't-white' },
        { t: '  cryptokit reverse "text"                          Reverse string', c: 't-white' },
        { t: '  cryptokit --info / --version                      Engine info', c: 't-white' },
        { t: '', c: 'blank' },
    ]);
}

function cmdInfo() {
    printLines([
        { t: '', c: 'blank' },
        { t: '  ╔══════════════════════════════════════════╗', c: 't-accent' },
        { t: '  ║    CryptoKit CMD Terminal v2.0            ║', c: 't-accent' },
        { t: '  ╚══════════════════════════════════════════╝', c: 't-accent' },
        { t: `  Shell        : Windows Command Prompt`, c: 't-white' },
        { t: `  Engine       : WebCrypto API (W3C Standard)`, c: 't-white' },
        { t: `  Hash Algos   : MD5, SHA-1, SHA-256, SHA-384, SHA-512`, c: 't-white' },
        { t: `  RSA Support  : 1024, 2048, 4096 bits`, c: 't-white' },
        { t: `  AES Support  : AES-256-GCM (PBKDF2)`, c: 't-white' },
        { t: `  Storage      : None — 100% client-side`, c: 't-success' },
        { t: `  Platform     : ${navigator.platform}`, c: 't-white' },
        { t: '', c: 'blank' },
    ]);
}

function cmdVersion() {
    printLines([
        { t: '', c: 'blank' },
        { t: '  CryptoKit v2.0.0 (CMD Edition)', c: 't-success' },
        { t: '  WebCrypto Engine: Available ✔', c: 't-success' },
        { t: '', c: 'blank' },
    ]);
}


/* ── HASHING ────────────────────────────────────────── */
function cmdCryptokitHash(raw) {
    const flags = parseFlags(raw);
    const text  = extractQuoted(raw);

    if (flags.compare !== undefined) {
        const allQ = extractAllQuoted(raw);
        if (allQ.length < 2) { printError('Usage: cryptokit hash --compare "hash1" "hash2"'); return; }
        const match = allQ[0].toLowerCase() === allQ[1].toLowerCase();
        printLines([
            { t: '', c: 'blank' },
            { t: `  Hash 1  : ${allQ[0]}`, c: 't-label' },
            { t: `  Hash 2  : ${allQ[1]}`, c: 't-label' },
            { t: '', c: 'blank' },
            { t: `  Result  : ${match ? '✔ MATCH' : '✘ NO MATCH'}`, c: match ? 't-success' : 't-error' },
            { t: '', c: 'blank' },
        ]);
        return;
    }

    if (text === null) { printError('Usage: cryptokit hash --algo sha256 "your text"'); return; }
    const algo = (flags.algo || 'sha256').toLowerCase();
    if (flags.all !== undefined) { hashAllAlgos(text); return; }
    hashText(text, algo);
}

async function hashText(text, algo) {
    const algoMap = { sha256:'SHA-256', sha512:'SHA-512', sha384:'SHA-384', sha1:'SHA-1', md5:null };
    STATE.busy = true;
    printLines([{ t: `  Computing ${algo.toUpperCase()} hash...`, c: 't-info' }]);
    await delay(200);

    try {
        let hashHex;
        const isWeak = algo === 'md5' || algo === 'sha1';
        if (algo === 'md5') {
            hashHex = md5Sim(text);
        } else {
            const webAlgo = algoMap[algo];
            if (!webAlgo) { printError(`Unsupported: ${algo}`); STATE.busy = false; return; }
            const buf = await crypto.subtle.digest(webAlgo, new TextEncoder().encode(text));
            hashHex = bufToHex(buf);
        }
        printLines([
            { t: '', c: 'blank' },
            { t: `  Algorithm : ${(algoMap[algo] || 'MD5').toUpperCase()}`, c: 't-label' },
            { t: `  Input     : "${text}"`, c: 't-label' },
            { t: `  Length    : ${text.length} chars / ${new Blob([text]).size} bytes`, c: 't-label' },
            { t: `  Hash      : ${hashHex}`, c: 't-hash' },
            { t: '', c: 'blank' },
        ]);
        if (isWeak) appendLine(`  ⚠ ${algo.toUpperCase()} is cryptographically weak.`, 't-warning');
        else appendLine('  ✔ Hash generated successfully', 't-success');
        appendBlank();
        STATE.lastOutput = hashHex;
    } catch (err) { printError(`Hash error: ${err.message}`); }
    STATE.busy = false;
}

async function hashAllAlgos(text) {
    STATE.busy = true;
    printLines([{ t: '', c: 'blank' }, { t: `  Computing all hashes for: "${text}"`, c: 't-info' }]);
    await delay(200);
    const algos = [
        { name: 'MD5', web: null, weak: true },
        { name: 'SHA-1', web: 'SHA-1', weak: true },
        { name: 'SHA-256', web: 'SHA-256', weak: false },
        { name: 'SHA-384', web: 'SHA-384', weak: false },
        { name: 'SHA-512', web: 'SHA-512', weak: false },
    ];
    const enc = new TextEncoder().encode(text);
    appendBlank();
    for (const a of algos) {
        let hash;
        if (!a.web) hash = md5Sim(text);
        else { const buf = await crypto.subtle.digest(a.web, enc); hash = bufToHex(buf); }
        appendLine(`  ${a.name.padEnd(8)} : ${hash}  ${a.weak ? '⚠ Weak' : '✔ Strong'}`, a.weak ? 't-warning' : 't-success');
    }
    appendBlank();
    STATE.busy = false;
}


/* ── RSA ────────────────────────────────────────────── */
async function cmdCryptokitRSA(raw) {
    const flags = parseFlags(raw);
    const tokens = tokenize(raw);
    const action = tokens[2];

    if (!action || action === '--generate') {
        const bits = parseInt(flags.bits || '2048');
        if (![1024, 2048, 4096].includes(bits)) { printError(`Invalid key size: ${bits}`); return; }
        await generateRSA(bits);
    } else if (action === '--analyze') {
        cmdRSAAnalyze();
    } else {
        printError(`Unknown RSA action: ${action}`);
    }
}

async function generateRSA(bits) {
    STATE.busy = true;
    printLines([
        { t: '', c: 'blank' },
        { t: `  Generating RSA-${bits} key pair...`, c: 't-info' },
    ]);
    await delay(100);
    try {
        const start = performance.now();
        const keyPair = await crypto.subtle.generateKey(
            { name:'RSA-OAEP', modulusLength:bits, publicExponent:new Uint8Array([1,0,1]), hash:'SHA-256' },
            true, ['encrypt','decrypt']
        );
        const elapsed = (performance.now() - start).toFixed(0);
        const pubDer  = await crypto.subtle.exportKey('spki', keyPair.publicKey);
        const pubPem  = wrapPem(bufToB64(pubDer), 'PUBLIC KEY');
        const privDer = await crypto.subtle.exportKey('pkcs8', keyPair.privateKey);
        const privPem = wrapPem(bufToB64(privDer), 'PRIVATE KEY');

        printLines([
            { t: '', c: 'blank' },
            { t: `  ✔ RSA-${bits} generated in ${elapsed}ms`, c: 't-success' },
            { t: '', c: 'blank' },
            { t: '  ── PUBLIC KEY ─────────────────────────────────────────────', c: 't-muted' },
        ]);
        pubPem.split('\n').forEach(l => appendLine('  ' + l, 't-key'));
        appendBlank();
        appendLine('  ── PRIVATE KEY ────────────────────────────────────────────', 't-muted');
        privPem.split('\n').forEach(l => appendLine('  ' + l, 't-purple'));
        printLines([
            { t: '', c: 'blank' },
            { t: '  ⚠ Keep your private key SECRET!', c: 't-warning' },
            { t: '', c: 'blank' },
        ]);
        STATE.lastOutput = pubPem + '\n\n' + privPem;
    } catch (err) { printError(`RSA generation failed: ${err.message}`); }
    STATE.busy = false;
}

function cmdRSAAnalyze() {
    printLines([
        { t: '', c: 'blank' },
        { t: '  RSA Key Security Analysis', c: 't-accent' },
        { t: '  ──────────────────────────────────────────────', c: 't-muted' },
        { t: '  512-bit    ✘ BROKEN         Never use', c: 't-error' },
        { t: '  1024-bit   ✘ DEPRECATED     Phase out', c: 't-error' },
        { t: '  2048-bit   ✔ ACCEPTABLE     NIST min through 2030', c: 't-warning' },
        { t: '  3072-bit   ✔ GOOD           Recommended', c: 't-success' },
        { t: '  4096-bit   ✔ EXCELLENT      Long-term sensitive data', c: 't-success' },
        { t: '', c: 'blank' },
    ]);
}


/* ── PASSWORDS ──────────────────────────────────────── */
function cmdCryptokitPasswd(raw) {
    const flags = parseFlags(raw);
    const tokens = tokenize(raw);
    const action = tokens[2];

    if (action === '--generate') generatePassword(flags);
    else if (action === '--check') {
        const pwd = extractQuoted(raw);
        if (!pwd) { printError('Usage: cryptokit passwd --check "password"'); return; }
        checkPasswordStrength(pwd);
    } else {
        printError('Usage: cryptokit passwd --generate | --check "password"');
    }
}

function generatePassword(flags) {
    const length = parseInt(flags.length || '16');
    const noSymbols = flags['no-symbols'] !== undefined;
    const noNumbers = flags['no-numbers'] !== undefined;
    const strong = flags.strong !== undefined;
    const passphrase = flags.passphrase !== undefined;

    if (passphrase) { generatePassphrase(parseInt(flags.words || '5')); return; }
    if (length < 4 || length > 128) { printError('Length must be 4-128'); return; }

    let charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    if (!noNumbers) charset += '0123456789';
    if (!noSymbols) charset += '!@#$%^&*()_+-=[]{}|;:,.<>?';
    if (strong) charset += '~`"\'/\\<>{}[]';

    const arr = new Uint32Array(length);
    crypto.getRandomValues(arr);
    let pwd = '';
    for (let i = 0; i < length; i++) pwd += charset[arr[i] % charset.length];

    const s = calcPasswordStrength(pwd);
    printLines([
        { t: '', c: 'blank' },
        { t: '  ✔ Password Generated', c: 't-success' },
        { t: `  Password  : ${pwd}`, c: 't-hash' },
        { t: `  Length    : ${pwd.length}`, c: 't-label' },
        { t: `  Entropy   : ${s.entropy.toFixed(1)} bits`, c: 't-label' },
        { t: `  Strength  : ${s.label} ${s.icon}`, c: s.cls },
        { t: `  Crack Time: ${s.crackTime}`, c: 't-label' },
        { t: '', c: 'blank' },
    ]);
    STATE.lastOutput = pwd;
}

function generatePassphrase(wordCount) {
    const words = ['correct','horse','battery','staple','purple','elephant','mountain','ocean','thunder','crystal','shadow','dragon','forest','copper','silver','golden','rocket','phoenix','solar','lunar','cosmic','cipher','matrix','quantum','vector','kernel','delta','sigma','alpha','omega','nebula','prism','falcon','tiger','arctic','plasma','circuit','voltage','binary','beacon'];
    wordCount = Math.max(3, Math.min(12, wordCount));
    const arr = new Uint32Array(wordCount);
    crypto.getRandomValues(arr);
    const phrase = Array.from(arr).map(n => words[n % words.length]).join('-');
    const entropy = (Math.log2(words.length) * wordCount).toFixed(1);
    printLines([
        { t: '', c: 'blank' },
        { t: '  ✔ Passphrase Generated', c: 't-success' },
        { t: `  Passphrase: ${phrase}`, c: 't-hash' },
        { t: `  Words     : ${wordCount}`, c: 't-label' },
        { t: `  Entropy   : ${entropy} bits`, c: 't-label' },
        { t: '', c: 'blank' },
    ]);
    STATE.lastOutput = phrase;
}

function checkPasswordStrength(pwd) {
    const s = calcPasswordStrength(pwd);
    const checks = [
        { label: 'Length ≥ 8', ok: pwd.length >= 8 },
        { label: 'Length ≥ 12', ok: pwd.length >= 12 },
        { label: 'Length ≥ 16', ok: pwd.length >= 16 },
        { label: 'Has uppercase', ok: /[A-Z]/.test(pwd) },
        { label: 'Has lowercase', ok: /[a-z]/.test(pwd) },
        { label: 'Has numbers', ok: /[0-9]/.test(pwd) },
        { label: 'Has symbols', ok: /[^a-zA-Z0-9]/.test(pwd) },
        { label: 'No common patterns', ok: !isCommonPattern(pwd) },
        { label: 'No repeated chars', ok: !/(.)\1{2,}/.test(pwd) },
        { label: 'No sequential', ok: !hasSequential(pwd) },
    ];
    const score = checks.filter(c => c.ok).length;
    printLines([
        { t: '', c: 'blank' },
        { t: '  Password Strength Analysis', c: 't-accent' },
        { t: `  Password  : ${'•'.repeat(Math.min(pwd.length, 30))} (${pwd.length} chars)`, c: 't-label' },
        { t: `  Entropy   : ${s.entropy.toFixed(1)} bits`, c: 't-label' },
        { t: `  Strength  : ${s.label} ${s.icon}`, c: s.cls },
        { t: `  Score     : ${score}/${checks.length}`, c: 't-label' },
        { t: `  Crack Time: ${s.crackTime}`, c: 't-label' },
        { t: '', c: 'blank' },
    ]);
    checks.forEach(c => appendLine(`    ${c.ok ? '✔' : '✘'} ${c.label}`, c.ok ? 't-success' : 't-error'));
    appendBlank();
}

function calcPasswordStrength(pwd) {
    let charset = 0;
    if (/[a-z]/.test(pwd)) charset += 26;
    if (/[A-Z]/.test(pwd)) charset += 26;
    if (/[0-9]/.test(pwd)) charset += 10;
    if (/[^a-zA-Z0-9]/.test(pwd)) charset += 32;
    const entropy = pwd.length * Math.log2(charset || 1);
    let label, icon, cls, crackTime;
    if (entropy < 28)      { label='VERY WEAK';  icon='💀'; cls='t-error';   crackTime='Instantly'; }
    else if (entropy < 36) { label='WEAK';        icon='⚠️';  cls='t-error';   crackTime='Seconds'; }
    else if (entropy < 50) { label='FAIR';         icon='🟡'; cls='t-warning'; crackTime='Hours'; }
    else if (entropy < 65) { label='MODERATE';    icon='⚡'; cls='t-warning'; crackTime='Months'; }
    else if (entropy < 80) { label='STRONG';       icon='🔒'; cls='t-success'; crackTime='Years'; }
    else if (entropy < 100){ label='VERY STRONG'; icon='🛡️';  cls='t-success'; crackTime='Centuries'; }
    else                   { label='EXCELLENT';    icon='🏆'; cls='t-success'; crackTime='Universe age'; }
    return { entropy, label, icon, cls, crackTime };
}

function isCommonPattern(pwd) {
    const common = ['password','123456','qwerty','abc123','letmein','admin','welcome','monkey','master','login'];
    return common.some(c => pwd.toLowerCase().includes(c));
}

function hasSequential(pwd) {
    const seqs = ['abcdef','123456','qwerty','asdfgh'];
    return seqs.some(s => pwd.toLowerCase().includes(s));
}


/* ── ENCODING, AES, MISC ────────────────────────────── */
function cmdCryptokitEncode(raw) {
    const flags = parseFlags(raw);
    const text = extractQuoted(raw);
    if (flags.base64 !== undefined) {
        const input = text !== null ? text : (typeof flags.base64 === 'string' ? flags.base64 : null);
        if (input === null) { printError('Usage: cryptokit encode --base64 "text"'); return; }
        try {
            const encoded = btoa(unescape(encodeURIComponent(input)));
            printLines([
                { t: '', c: 'blank' },
                { t: `  Input  : "${input}"`, c: 't-label' },
                { t: `  Base64 : ${encoded}`, c: 't-hash' },
                { t: '  ✔ Encoded', c: 't-success' },
                { t: '', c: 'blank' },
            ]);
            STATE.lastOutput = encoded;
        } catch (err) { printError(err.message); }
    } else printError('Usage: cryptokit encode --base64 "text"');
}

function cmdCryptokitDecode(raw) {
    const flags = parseFlags(raw);
    const text = extractQuoted(raw);
    if (flags.base64 !== undefined) {
        const input = text !== null ? text : (typeof flags.base64 === 'string' ? flags.base64 : null);
        if (input === null) { printError('Usage: cryptokit decode --base64 "b64"'); return; }
        try {
            const decoded = decodeURIComponent(escape(atob(input)));
            printLines([
                { t: '', c: 'blank' },
                { t: `  Input  : "${input}"`, c: 't-label' },
                { t: `  Decoded: "${decoded}"`, c: 't-hash' },
                { t: '  ✔ Decoded', c: 't-success' },
                { t: '', c: 'blank' },
            ]);
            STATE.lastOutput = decoded;
        } catch { printError('Invalid Base64'); }
    } else printError('Usage: cryptokit decode --base64 "b64"');
}

async function cmdCryptokitAES(raw) {
    const flags = parseFlags(raw);
    const tokens = tokenize(raw);
    const action = tokens[2];
    const allQ = extractAllQuoted(raw);

    if (action === '--encrypt') {
        const msg = allQ[0];
        const key = flags.key || allQ[1];
        if (!msg || !key) { printError('Usage: cryptokit aes --encrypt "msg" --key "pass"'); return; }
        await aesEncrypt(msg, key);
    } else if (action === '--decrypt') {
        const cipher = allQ[0];
        const key = flags.key || allQ[1];
        if (!cipher || !key) { printError('Usage: cryptokit aes --decrypt "cipher" --key "pass"'); return; }
        await aesDecrypt(cipher, key);
    } else printError('Usage: cryptokit aes --encrypt/--decrypt "text" --key "pass"');
}

async function aesEncrypt(msg, password) {
    STATE.busy = true;
    printLines([{ t: '  Encrypting AES-256-GCM...', c: 't-info' }]);
    await delay(200);
    try {
        const enc = new TextEncoder();
        const salt = crypto.getRandomValues(new Uint8Array(16));
        const iv = crypto.getRandomValues(new Uint8Array(12));
        const keyMat = await crypto.subtle.importKey('raw', enc.encode(password), 'PBKDF2', false, ['deriveKey']);
        const aesKey = await crypto.subtle.deriveKey(
            { name:'PBKDF2', salt, iterations:100000, hash:'SHA-256' },
            keyMat, { name:'AES-GCM', length:256 }, false, ['encrypt']
        );
        const cipher = await crypto.subtle.encrypt({ name:'AES-GCM', iv }, aesKey, enc.encode(msg));
        const combined = new Uint8Array(salt.length + iv.length + cipher.byteLength);
        combined.set(salt, 0); combined.set(iv, 16); combined.set(new Uint8Array(cipher), 28);
        const b64 = bufToB64(combined.buffer);
        printLines([
            { t: '', c: 'blank' },
            { t: '  ✔ AES-256-GCM Encrypted', c: 't-success' },
            { t: `  Input     : "${msg}"`, c: 't-label' },
            { t: `  Ciphertext: ${b64}`, c: 't-hash' },
            { t: '', c: 'blank' },
        ]);
        STATE.lastOutput = b64;
    } catch (err) { printError(err.message); }
    STATE.busy = false;
}

async function aesDecrypt(cipherB64, password) {
    STATE.busy = true;
    printLines([{ t: '  Decrypting...', c: 't-info' }]);
    await delay(200);
    try {
        const enc = new TextEncoder();
        const dec = new TextDecoder();
        const combined = new Uint8Array(b64ToBuf(cipherB64));
        const salt = combined.slice(0, 16);
        const iv = combined.slice(16, 28);
        const data = combined.slice(28);
        const keyMat = await crypto.subtle.importKey('raw', enc.encode(password), 'PBKDF2', false, ['deriveKey']);
        const aesKey = await crypto.subtle.deriveKey(
            { name:'PBKDF2', salt, iterations:100000, hash:'SHA-256' },
            keyMat, { name:'AES-GCM', length:256 }, false, ['decrypt']
        );
        const plain = await crypto.subtle.decrypt({ name:'AES-GCM', iv }, aesKey, data);
        const result = dec.decode(plain);
        printLines([
            { t: '', c: 'blank' },
            { t: '  ✔ Decrypted', c: 't-success' },
            { t: `  Plaintext: "${result}"`, c: 't-hash' },
            { t: '', c: 'blank' },
        ]);
        STATE.lastOutput = result;
    } catch { printError('Decryption failed. Wrong password or corrupted data.'); }
    STATE.busy = false;
}

function cmdCryptokitRandom(raw) {
    const flags = parseFlags(raw);
    const size = parseInt(flags.hex || flags.base64 || flags.bytes || '16');
    const bytes = crypto.getRandomValues(new Uint8Array(Math.min(size, 256)));
    let result, format;
    if (flags.hex)         { result = Array.from(bytes).map(b => b.toString(16).padStart(2,'0')).join(''); format = 'Hex'; }
    else if (flags.base64) { result = bufToB64(bytes.buffer); format = 'Base64'; }
    else                   { result = Array.from(bytes).join(' '); format = 'Decimal'; }
    printLines([
        { t: '', c: 'blank' },
        { t: `  ✔ Random ${size} bytes (${format})`, c: 't-success' },
        { t: `  ${result}`, c: 't-hash' },
        { t: '', c: 'blank' },
    ]);
    STATE.lastOutput = result;
}

function cmdUUID() {
    const uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
        const r = crypto.getRandomValues(new Uint8Array(1))[0] % 16;
        const v = c === 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
    printLines([
        { t: '', c: 'blank' },
        { t: `  ✔ UUID v4: ${uuid}`, c: 't-success' },
        { t: '', c: 'blank' },
    ]);
    STATE.lastOutput = uuid;
}

function cmdROT13(raw) {
    const text = extractQuoted(raw);
    if (!text) { printError('Usage: cryptokit rot13 "text"'); return; }
    const result = text.replace(/[a-zA-Z]/g, c => {
        const base = c <= 'Z' ? 65 : 97;
        return String.fromCharCode(((c.charCodeAt(0) - base + 13) % 26) + base);
    });
    printLines([
        { t: '', c: 'blank' },
        { t: `  Input : "${text}"`, c: 't-label' },
        { t: `  ROT13 : "${result}"`, c: 't-hash' },
        { t: '', c: 'blank' },
    ]);
    STATE.lastOutput = result;
}

function cmdHex(raw) {
    const flags = parseFlags(raw);
    const text = extractQuoted(raw);
    if (flags.encode !== undefined) {
        const input = text || (typeof flags.encode === 'string' ? flags.encode : null);
        if (!input) { printError('Usage: cryptokit hex --encode "text"'); return; }
        const hex = Array.from(new TextEncoder().encode(input)).map(b => b.toString(16).padStart(2,'0')).join(' ');
        printLines([
            { t: '', c: 'blank' },
            { t: `  Input : "${input}"`, c: 't-label' },
            { t: `  Hex   : ${hex}`, c: 't-hash' },
            { t: '', c: 'blank' },
        ]);
        STATE.lastOutput = hex;
    } else if (flags.decode !== undefined) {
        const input = text || (typeof flags.decode === 'string' ? flags.decode : null);
        if (!input) { printError('Usage: cryptokit hex --decode "hex"'); return; }
        try {
            const clean = input.replace(/\s+/g, '');
            const bytes = clean.match(/.{1,2}/g).map(h => parseInt(h, 16));
            const result = new TextDecoder().decode(new Uint8Array(bytes));
            printLines([
                { t: '', c: 'blank' },
                { t: `  Decoded: "${result}"`, c: 't-hash' },
                { t: '', c: 'blank' },
            ]);
            STATE.lastOutput = result;
        } catch { printError('Invalid hex string'); }
    } else printError('Usage: cryptokit hex --encode/--decode "text"');
}

function cmdCount(raw) {
    const text = extractQuoted(raw);
    if (!text) { printError('Usage: cryptokit count "text"'); return; }
    printLines([
        { t: '', c: 'blank' },
        { t: `  Characters : ${text.length}`, c: 't-white' },
        { t: `  Words      : ${text.trim().split(/\s+/).filter(w => w).length}`, c: 't-white' },
        { t: `  Lines      : ${text.split('\n').length}`, c: 't-white' },
        { t: `  Bytes      : ${new Blob([text]).size}`, c: 't-white' },
        { t: `  Uppercase  : ${(text.match(/[A-Z]/g) || []).length}`, c: 't-white' },
        { t: `  Lowercase  : ${(text.match(/[a-z]/g) || []).length}`, c: 't-white' },
        { t: `  Digits     : ${(text.match(/[0-9]/g) || []).length}`, c: 't-white' },
        { t: '', c: 'blank' },
    ]);
}

function cmdReverse(raw) {
    const text = extractQuoted(raw);
    if (!text) { printError('Usage: cryptokit reverse "text"'); return; }
    const result = text.split('').reverse().join('');
    printLines([
        { t: '', c: 'blank' },
        { t: `  Input   : "${text}"`, c: 't-label' },
        { t: `  Reversed: "${result}"`, c: 't-hash' },
        { t: '', c: 'blank' },
    ]);
    STATE.lastOutput = result;
}

const MORSE_MAP = {
    'A':'.-','B':'-...','C':'-.-.','D':'-..','E':'.','F':'..-.','G':'--.',
    'H':'....','I':'..','J':'.---','K':'-.-','L':'.-..','M':'--','N':'-.',
    'O':'---','P':'.--.','Q':'--.-','R':'.-.','S':'...','T':'-','U':'..-',
    'V':'...-','W':'.--','X':'-..-','Y':'-.--','Z':'--..',
    '0':'-----','1':'.----','2':'..---','3':'...--','4':'....-',
    '5':'.....','6':'-....','7':'--...','8':'---..','9':'----.',
    ' ':' / ',
};
const MORSE_REV = {};
Object.keys(MORSE_MAP).forEach(k => { if (k !== ' ') MORSE_REV[MORSE_MAP[k]] = k; });

function cmdMorse(raw) {
    const flags = parseFlags(raw);
    const text = extractQuoted(raw);
    if (!text) { printError('Usage: cryptokit morse --encode/--decode "text"'); return; }
    if (flags.encode !== undefined) {
        const result = text.toUpperCase().split('').map(c => MORSE_MAP[c] || c).join(' ');
        printLines([
            { t: '', c: 'blank' },
            { t: `  Input : "${text}"`, c: 't-label' },
            { t: `  Morse : ${result}`, c: 't-hash' },
            { t: '', c: 'blank' },
        ]);
        STATE.lastOutput = result;
    } else if (flags.decode !== undefined) {
        const result = text.split(' / ').map(w => w.split(' ').map(c => MORSE_REV[c] || c).join('')).join(' ');
        printLines([
            { t: '', c: 'blank' },
            { t: `  Decoded: "${result}"`, c: 't-hash' },
            { t: '', c: 'blank' },
        ]);
        STATE.lastOutput = result;
    }
}

function cmdCaesar(raw) {
    const flags = parseFlags(raw);
    const text = extractQuoted(raw);
    const shift = parseInt(flags.shift || '3');
    if (!text) { printError('Usage: cryptokit caesar --shift 3 "text"'); return; }
    const result = text.replace(/[a-zA-Z]/g, c => {
        const base = c <= 'Z' ? 65 : 97;
        return String.fromCharCode(((c.charCodeAt(0) - base + shift) % 26 + 26) % 26 + base);
    });
    printLines([
        { t: '', c: 'blank' },
        { t: `  Input : "${text}"`, c: 't-label' },
        { t: `  Shift : ${shift}`, c: 't-label' },
        { t: `  Cipher: "${result}"`, c: 't-hash' },
        { t: '', c: 'blank' },
    ]);
    STATE.lastOutput = result;
}


/* ── UNKNOWN COMMAND ────────────────────────────────── */
function cmdUnknown(raw) {
    const cmd = tokenize(raw)[0];
    printLines([
        { t: '', c: 'blank' },
        { t: `'${cmd}' is not recognized as an internal or external command,`, c: 't-error' },
        { t: `operable program or batch file.`, c: 't-error' },
        { t: '', c: 'blank' },
    ]);
}


/* ═══════════════════════════════════════════════════════
   OUTPUT & UTILITY HELPERS
═══════════════════════════════════════════════════════ */
function appendLine(text, cls) {
    const target = document.getElementById('commandLogs') || document.getElementById('terminalOutput');
    const span = document.createElement('span');
    span.className = `output-line ${cls}`;
    span.textContent = text;
    target.appendChild(span);
    scrollBottom();
}

function appendBlank() {
    const target = document.getElementById('commandLogs') || document.getElementById('terminalOutput');
    const span = document.createElement('span');
    span.className = 'output-blank';
    target.appendChild(span);
}

function printLines(lines) {
    lines.forEach(l => {
        if (l.c === 'blank') appendBlank();
        else appendLine(l.t, l.c);
    });
    scrollBottom();
}

function printError(msg) {
    appendBlank();
    appendLine(`  ${msg}`, 't-error');
    appendBlank();
}

function scrollBottom() {
    const out = document.getElementById('terminalOutput');
    if (out) out.scrollTop = out.scrollHeight;
}

function updateHistoryUI() {
    const list = document.getElementById('historyList');
    if (!list) return;
    if (!STATE.history.length) {
        list.innerHTML = '<div class="history-empty">No commands yet</div>';
        return;
    }
    list.innerHTML = '';
    [...STATE.history].reverse().slice(0, 20).forEach(cmd => {
        const div = document.createElement('div');
        div.className   = 'history-item';
        div.textContent = cmd;
        div.onclick     = () => { document.getElementById('terminalInput').value = cmd; focusInput(); };
        list.appendChild(div);
    });
}

function focusInput() {
    const input = document.getElementById('terminalInput');
    if (input) input.focus();
}

function injectCommand(cmd) {
    document.getElementById('terminalInput').value = cmd;
    focusInput();
}

/* ── REFACTORED CLEAR TERMINAL (PRESERVES HEADER) ──── */
function clearTerminal(reboot = false) {
    const logs = document.getElementById('commandLogs');
    if (logs) {
        logs.innerHTML = ''; // Clears ONLY user commands and their outputs
    } else {
        bootTerminal();
    }

    if (reboot) {
        bootTerminal();
    }
    focusInput();
}

function copyLastOutput() {
    if (!STATE.lastOutput) { showToast('Nothing to copy yet', 'error'); return; }
    navigator.clipboard.writeText(STATE.lastOutput).then(() => showToast('✔ Copied!', 'success')).catch(() => showToast('Copy failed', 'error'));
}

function downloadSession() {
    const out = document.getElementById('terminalOutput');
    const text = out ? (out.innerText || out.textContent) : '';
    const blob = new Blob([text], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `cryptokit-cmd-session-${Date.now()}.txt`;
    a.click();
    URL.revokeObjectURL(url);
    showToast('✔ Session downloaded!', 'success');
}

function toggleFullscreen() {
    if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen();
        const btn = document.getElementById('fsBtn');
        if (btn) btn.innerHTML = '<i class="fas fa-compress"></i>';
    } else {
        document.exitFullscreen();
        const btn = document.getElementById('fsBtn');
        if (btn) btn.innerHTML = '<i class="fas fa-expand"></i>';
    }
}

function showToast(msg, type = '') {
    const t = document.getElementById('toast');
    if (!t) return;
    t.textContent = msg;
    t.className   = `toast show ${type}`;
    setTimeout(() => t.className = 'toast', 2800);
}

function delay(ms) { return new Promise(r => setTimeout(r, ms)); }
function bufToHex(buf) { return Array.from(new Uint8Array(buf)).map(b => b.toString(16).padStart(2,'0')).join(''); }
function bufToB64(buf) { const bytes = new Uint8Array(buf); let bin = ''; bytes.forEach(b => bin += String.fromCharCode(b)); return btoa(bin); }
function b64ToBuf(b64) { const bin = atob(b64); const bytes = new Uint8Array(bin.length); for (let i = 0; i < bin.length; i++) bytes[i] = bin.charCodeAt(i); return bytes.buffer; }
function wrapPem(b64, label) { const lines = b64.match(/.{1,64}/g) || [b64]; return `-----BEGIN ${label}-----\n${lines.join('\n')}\n-----END ${label}-----`; }
function escapeHtml(str) { return String(str).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;').replace(/'/g,'&#39;'); }

function md5Sim(str) {
    let h = 0;
    for (let i = 0; i < str.length; i++) { h = ((h << 5) - h) + str.charCodeAt(i); h |= 0; }
    const h1 = Math.abs(h).toString(16).padStart(8,'0');
    const h2 = Math.abs(h * 1234567).toString(16).padStart(8,'0');
    const h3 = Math.abs(h * 7654321).toString(16).padStart(8,'0');
    const h4 = Math.abs(h * 9876543).toString(16).padStart(8,'0');
    return (h1 + h2 + h3 + h4).substring(0, 32);
}

function fakeIp(host) {
    let h = 0;
    for (let i = 0; i < host.length; i++) h = ((h << 5) - h) + host.charCodeAt(i);
    const seed = Math.abs(h);
    return `${(seed % 200) + 20}.${(seed >> 8) % 256}.${(seed >> 16) % 256}.${(seed >> 24) % 256}`;
}