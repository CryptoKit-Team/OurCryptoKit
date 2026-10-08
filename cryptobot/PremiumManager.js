// PremiumManager.js
// Manages CryptoKit tiers: FREE, PRO_CIPHER, QUANTUM_ELITE.
// Educational information is NEVER blocked — only tool execution is gated.

import { TIER_NAMES, TIER_LABELS, FEATURE_NAMES, BOT_CONFIG } from "./BotConfig.js";

export const TIERS = TIER_NAMES;

// Rank for comparing tiers
const TIER_RANK = {
    FREE: 0,
    PRO_CIPHER: 1,
    QUANTUM_ELITE: 2
};

// Feature → required tier mapping
export const FEATURE_TIER_MAP = {
    // FREE
    [FEATURE_NAMES.HASH_GENERATOR]: "FREE",
    [FEATURE_NAMES.RSA_KEY_GENERATOR]: "FREE",
    [FEATURE_NAMES.FILE_INTEGRITY_CHECKER]: "FREE",
    [FEATURE_NAMES.TEXT_ENCRYPTION]: "FREE",
    [FEATURE_NAMES.DIGITAL_SIGNATURE]: "FREE",
    [FEATURE_NAMES.PASSWORD_TOOLS]: "FREE",

    // PRO CIPHER
    [FEATURE_NAMES.CRYPTO_SECURITY_SCANNER]: "PRO_CIPHER",
    [FEATURE_NAMES.ADVANCED_RSA_LAB]: "PRO_CIPHER",
    [FEATURE_NAMES.ADVANCED_ECC_SUITE]: "PRO_CIPHER",
    [FEATURE_NAMES.CRYPTO_ANALYSIS]: "PRO_CIPHER",

    // QUANTUM ELITE
    [FEATURE_NAMES.ATTACK_SIMULATOR]: "QUANTUM_ELITE",
    [FEATURE_NAMES.CRYPTO_CTF]: "QUANTUM_ELITE",
    [FEATURE_NAMES.FORENSICS_LAB]: "QUANTUM_ELITE",
    [FEATURE_NAMES.BLOCKCHAIN_SECURITY]: "QUANTUM_ELITE",
    [FEATURE_NAMES.CRYPTO_LABS]: "QUANTUM_ELITE"
};

// In-memory tier state (replace with backend session later)
let currentUserTier = BOT_CONFIG.defaultTier;

export function getUserTier() {
    return currentUserTier;
}

export function setUserTier(tier) {
    if (!TIER_RANK.hasOwnProperty(tier)) {
        console.warn(`[PremiumManager] Invalid tier: ${tier}`);
        return false;
    }
    currentUserTier = tier;
    return true;
}

export function getTierName(tier = currentUserTier) {
    return TIER_NAMES[tier] || "FREE";
}

export function getTierLabel(tier = currentUserTier) {
    return TIER_LABELS[tier] || TIER_LABELS.FREE;
}

export function getRequiredTier(featureName) {
    return FEATURE_TIER_MAP[featureName] || "FREE";
}

export function isFeatureAvailable(featureName, tier = currentUserTier) {
    const required = getRequiredTier(featureName);
    return TIER_RANK[tier] >= TIER_RANK[required];
}

export function canAccessFeature(featureName, tier = currentUserTier) {
    return isFeatureAvailable(featureName, tier);
}

/**
 * Returns a message that explains WHY a feature is locked
 * while still inviting the user to learn the concept.
 */
export function getLockedFeatureMessage(featureName) {
    const required = getRequiredTier(featureName);
    const tierLabel = TIER_LABELS[required];

    return {
        title: `🔒 ${featureName} — ${tierLabel}`,
        explanation:
`This feature belongs to ${tierLabel}.

You can still ask me how ${featureName} works, what algorithms it uses, and how to use it conceptually.`,
        keyPoints: [
            `Required tier: ${tierLabel}`,
            "Educational explanations are always free",
            "Upgrade in CryptoKit to unlock the live tool"
        ],
        tierLabel
    };
}
