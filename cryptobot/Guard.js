// SecurityGuard.js
// Detects sensitive information in user messages BEFORE processing.
// Never logs or stores detected secrets.

import { BOT_CONFIG } from "./BotConfig.js";

const PRIVATE_KEY_PATTERNS = [
    /-----BEGIN (RSA |EC |DSA |OPENSSH |PGP |ENCRYPTED )?PRIVATE KEY-----/i,
    /-----BEGIN PRIVATE KEY-----/i
];

const API_KEY_PATTERNS = [
    /sk-[A-Za-z0-9]{20,}/,                // OpenAI style
    /AKIA[0-9A-Z]{16}/,                   // AWS Access Key
    /AIza[0-9A-Za-z\-_]{35}/,             // Google API
    /ghp_[A-Za-z0-9]{30,}/,               // GitHub token
    /xox[baprs]-[A-Za-z0-9-]{10,}/,       // Slack
    /eyJ[A-Za-z0-9_-]{10,}\.[A-Za-z0-9_-]{10,}\.[A-Za-z0-9_-]{10,}/ // JWT
];

const PASSWORD_HINT_PATTERNS = [
    /\b(my\s+password\s+is|password\s*[:=]\s*\S{4,})/i,
    /\b(passwd|pwd)\s*[:=]\s*\S{4,}/i
];

const DB_CREDENTIAL_PATTERNS = [
    /(mongodb(\+srv)?:\/\/[^\s]+:[^\s]+@)/i,
    /(postgres(ql)?:\/\/[^\s]+:[^\s]+@)/i,
    /(mysql:\/\/[^\s]+:[^\s]+@)/i
];

/**
 * BIP-39 style seed phrase detection:
 * 12 / 15 / 18 / 21 / 24 lowercase alphabetic words.
 */
export function detectSeedPhrase(text) {
    if (!text || typeof text !== "string") return false;
    const words = text.trim().split(/\s+/).filter(w => /^[a-zA-Z]+$/.test(w));
    const validLengths = [12, 15, 18, 21, 24];
    if (!validLengths.includes(words.length)) return false;

    // Heuristic: all lowercase short words typical of seed phrases
    const allShort = words.every(w => w.length >= 3 && w.length <= 8);
    return allShort;
}

export function detectPrivateKey(text) {
    if (!text) return false;
    return PRIVATE_KEY_PATTERNS.some(p => p.test(text));
}

export function detectApiKey(text) {
    if (!text) return false;
    return API_KEY_PATTERNS.some(p => p.test(text));
}

export function detectPassword(text) {
    if (!text) return false;
    return PASSWORD_HINT_PATTERNS.some(p => p.test(text));
}

export function detectDbCredentials(text) {
    if (!text) return false;
    return DB_CREDENTIAL_PATTERNS.some(p => p.test(text));
}

/**
 * Main entry: scans the message for ANY sensitive signal.
 * Returns a structured result.
 */
export function detectSensitiveData(text) {
    if (!BOT_CONFIG.security.enableSensitiveDataScan) {
        return { sensitive: false, types: [] };
    }

    const types = [];
    if (detectPrivateKey(text)) types.push("private_key");
    if (detectSeedPhrase(text)) types.push("seed_phrase");
    if (detectApiKey(text)) types.push("api_key");
    if (detectPassword(text)) types.push("password");
    if (detectDbCredentials(text)) types.push("db_credentials");

    return { sensitive: types.length > 0, types };
}

/**
 * Removes sensitive content from the string so it is never stored or logged.
 */
export function sanitizeMessage(text) {
    if (!text || typeof text !== "string") return "";
    let safe = text;

    PRIVATE_KEY_PATTERNS.forEach(p => { safe = safe.replace(p, "[REDACTED_PRIVATE_KEY]"); });
    API_KEY_PATTERNS.forEach(p => { safe = safe.replace(p, "[REDACTED_API_KEY]"); });
    DB_CREDENTIAL_PATTERNS.forEach(p => { safe = safe.replace(p, "[REDACTED_DB_URI]"); });
    PASSWORD_HINT_PATTERNS.forEach(p => { safe = safe.replace(p, "[REDACTED_PASSWORD]"); });

    // Redact seed phrase if detected
    if (detectSeedPhrase(safe)) {
        safe = "[REDACTED_SEED_PHRASE]";
    }
    return safe;
}

export function getSecurityWarning(types = []) {
    const map = {
        private_key: "a private key",
        seed_phrase: "a seed phrase",
        api_key: "an API key / access token",
        password: "a password",
        db_credentials: "database credentials"
    };

    const detected = types.map(t => map[t] || t).join(", ");

    return {
        type: "security_warning",
        title: "⚠️ Security Warning",
        explanation:
`It looks like your message may contain ${detected || "sensitive data"}.

Do not share private keys, seed phrases, passwords, API keys, or other secrets in CryptoBot.

If this is a real credential, treat it as EXPOSED and immediately:
• Rotate / revoke the credential
• Generate a new key pair
• Move funds to a new wallet (for seed phrases)
• Audit systems for unauthorized access`,
        keyPoints: [
            "CryptoBot never needs your real secrets",
            "Shared secrets must be considered compromised",
            "Use test / dummy values for learning"
        ],
        tierLabel: "🛡️ Security"
    };
}
