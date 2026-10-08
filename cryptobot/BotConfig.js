// BotConfig.js
// Global configuration for CryptoBot
// Do NOT store API keys or secrets here. Use backend environment variables.

export const BOT_CONFIG = {
    name: "CryptoBot",
    tagline: "Your AI Cryptography Companion",
    version: "1.0.0",

    // Message limits
    maxMessageLength: 4000,
    maxHistoryLength: 50,

    // Defaults
    defaultTier: "FREE",
    defaultLearningLevel: "Beginner",

    // UI
    ui: {
        typingDelayMs: 600,
        minTypingMs: 300,
        maxTypingMs: 1500,
        showTimestamps: true,
        showTierBadges: true
    },

    // Challenges
    challenge: {
        maxHints: 3,
        pointsEasy: 10,
        pointsMedium: 25,
        pointsHard: 50,
        pointsExpert: 100
    },

    // Security
    security: {
        enableSensitiveDataScan: true,
        warnOnPrivateKey: true,
        warnOnSeedPhrase: true,
        warnOnApiKey: true,
        blockSensitiveLogging: true
    }
};

export const TIER_NAMES = {
    FREE: "FREE",
    PRO_CIPHER: "PRO_CIPHER",
    QUANTUM_ELITE: "QUANTUM_ELITE"
};

export const TIER_LABELS = {
    FREE: "🆓 Free",
    PRO_CIPHER: "⚡ Pro Cipher",
    QUANTUM_ELITE: "🌌 Quantum Elite"
};

export const LEARNING_LEVELS = {
    BEGINNER: "Beginner",
    INTERMEDIATE: "Intermediate",
    ADVANCED: "Advanced",
    EXAM: "Exam",
    DEVELOPER: "Developer"
};

export const FEATURE_NAMES = {
    // FREE
    HASH_GENERATOR: "Hash Generator",
    RSA_KEY_GENERATOR: "RSA Key Generator",
    FILE_INTEGRITY_CHECKER: "File Integrity Checker",
    TEXT_ENCRYPTION: "Text Encryption/Decryption",
    DIGITAL_SIGNATURE: "Digital Signature",
    PASSWORD_TOOLS: "Password Tools",

    // PRO CIPHER
    CRYPTO_SECURITY_SCANNER: "Crypto Security Scanner",
    ADVANCED_RSA_LAB: "Advanced RSA Lab",
    ADVANCED_ECC_SUITE: "Advanced ECC Suite",
    CRYPTO_ANALYSIS: "Advanced Cryptographic Analysis",

    // QUANTUM ELITE
    ATTACK_SIMULATOR: "Cryptographic Attack Simulator",
    CRYPTO_CTF: "Crypto CTF",
    FORENSICS_LAB: "Crypto Forensics Lab",
    BLOCKCHAIN_SECURITY: "Advanced Blockchain Security",
    CRYPTO_LABS: "Advanced Cryptographic Laboratories"
};

export const FALLBACK_RESPONSE =
    "I couldn't identify that question yet. Try asking me about cryptography, CryptoKit tools, security, Pro Cipher, Quantum Elite, or crypto challenges.";
