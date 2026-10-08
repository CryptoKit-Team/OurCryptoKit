// CryptoBotUtils.js
// Generic reusable helpers. No business logic should live here.

/**
 * Lowercase + trim + collapse whitespace
 */
export function normalizeText(text) {
    if (!text || typeof text !== "string") return "";
    return text.toLowerCase().trim().replace(/\s+/g, " ");
}

/**
 * Remove dangerous control characters, keep readable text
 */
export function cleanText(text) {
    if (!text || typeof text !== "string") return "";
    return text.replace(/[\u0000-\u001F\u007F]/g, "").trim();
}

export function capitalize(text) {
    if (!text || typeof text !== "string") return "";
    return text.charAt(0).toUpperCase() + text.slice(1);
}

export function truncateText(text, maxLength = 200) {
    if (!text) return "";
    if (text.length <= maxLength) return text;
    return text.slice(0, maxLength - 1) + "…";
}

export function generateId(prefix = "id") {
    return `${prefix}-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;
}

export function isEmpty(value) {
    if (value == null) return true;
    if (typeof value === "string") return value.trim().length === 0;
    if (Array.isArray(value)) return value.length === 0;
    if (typeof value === "object") return Object.keys(value).length === 0;
    return false;
}

export function safeString(value, fallback = "") {
    if (value == null) return fallback;
    try {
        return String(value);
    } catch {
        return fallback;
    }
}

/**
 * Escape HTML to prevent XSS when rendering user content
 */
export function escapeHtml(text) {
    if (!text) return "";
    return String(text)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#39;");
}

export function formatTierLabel(tier) {
    const map = {
        FREE: "🆓 Free",
        PRO_CIPHER: "⚡ Pro Cipher",
        QUANTUM_ELITE: "🌌 Quantum Elite"
    };
    return map[tier] || "🆓 Free";
}

export function formatTimestamp(date = new Date()) {
    try {
        const d = date instanceof Date ? date : new Date(date);
        const hh = String(d.getHours()).padStart(2, "0");
        const mm = String(d.getMinutes()).padStart(2, "0");
        return `${hh}:${mm}`;
    } catch {
        return "";
    }
}

/**
 * Build a structured response object into a formatted string.
 * Used by ResponseGenerator but kept generic.
 */
export function formatResponse(response) {
    if (!response || typeof response !== "object") return "";

    const parts = [];

    if (response.title) parts.push(`${response.title}`);
    if (response.explanation) parts.push(`\n${response.explanation}`);

    if (Array.isArray(response.keyPoints) && response.keyPoints.length) {
        parts.push("\nKey Points:");
        response.keyPoints.forEach(p => parts.push(`• ${p}`));
    }

    if (response.example) {
        parts.push(`\nExample:\n${response.example}`);
    }

    if (response.tool) {
        parts.push(`\nCryptoKit Tool:\n${response.tool}`);
    }

    if (response.tierLabel) {
        parts.push(`\nTier:\n${response.tierLabel}`);
    }

    if (Array.isArray(response.related) && response.related.length) {
        parts.push("\nRelated:");
        response.related.forEach(r => parts.push(`• ${r}`));
    }

    return parts.join("\n");
}
