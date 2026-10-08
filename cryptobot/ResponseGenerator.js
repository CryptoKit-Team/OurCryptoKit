// ResponseGenerator.js
// Produces the final response object given an intent + knowledge entry.
// Does not fetch knowledge or detect intent itself.

import { formatResponse, capitalize, isEmpty } from "./CryptoBotUtils.js";
import {
    getUserTier,
    getTierLabel,
    isFeatureAvailable,
    getLockedFeatureMessage
} from "./PremiumManager.js";
import { FALLBACK_RESPONSE, TIER_LABELS } from "./BotConfig.js";

/**
 * Build a normalized response object from a knowledge entry.
 * knowledge = { title, explanation, keyPoints, example, tool, tier, related, requiredTier }
 */
function buildStructuredResponse(knowledge, intent) {
    const tier = knowledge.tier || knowledge.requiredTier || "FREE";

    return {
        type: intent || "explanation",
        title: knowledge.title || "CryptoBot",
        explanation: knowledge.explanation || knowledge.description || "",
        keyPoints: knowledge.keyPoints || knowledge.points || [],
        example: knowledge.example || null,
        tool: knowledge.tool || knowledge.cryptoKitTool || null,
        tierLabel: TIER_LABELS[tier] || getTierLabel(),
        related: knowledge.related || knowledge.relatedQuestions || []
    };
}

/**
 * Main entry — called by CryptoBotEngine.
 *
 * @param {Object} params
 * @param {string} params.intent - detected intent
 * @param {Object|null} params.knowledge - knowledge entry (any tier)
 * @param {string} params.message - raw user message (already sanitized)
 */
export function generateResponse({ intent, knowledge, message } = {}) {
    // 1. No intent detected
    if (!intent) {
        return buildStructuredResponse({
            title: "🤖 CryptoBot",
            explanation: FALLBACK_RESPONSE,
            tier: "FREE"
        }, "fallback");
    }

    // 2. No knowledge available
    if (isEmpty(knowledge)) {
        return buildStructuredResponse({
            title: `🤖 CryptoBot — ${capitalize(intent)}`,
            explanation: FALLBACK_RESPONSE,
            tier: "FREE"
        }, intent);
    }

    // 3. Premium feature gating (education remains free)
    const requiredTier = knowledge.requiredTier || knowledge.tier;
    const featureName = knowledge.tool || knowledge.feature;
    if (featureName && requiredTier && !isFeatureAvailable(featureName, getUserTier())) {
        // User asked to USE a tool they don't own
        if (intent === "tool_run" || intent === "execute_tool") {
            const locked = getLockedFeatureMessage(featureName);
            return {
                type: "locked_feature",
                title: locked.title,
                explanation: locked.explanation,
                keyPoints: locked.keyPoints,
                example: null,
                tool: featureName,
                tierLabel: locked.tierLabel,
                related: knowledge.related || []
            };
        }
        // Otherwise fall through — explanations are always allowed
    }

    // 4. Normal structured response
    return buildStructuredResponse(knowledge, intent);
}

/**
 * Convert a response object into a formatted display string.
 */
export function renderResponseText(response) {
    return formatResponse(response);
}

/**
 * Shortcut for building a security-warning response.
 */
export function buildSecurityResponse(warningObj) {
    return {
        type: "security_warning",
        title: warningObj.title,
        explanation: warningObj.explanation,
        keyPoints: warningObj.keyPoints || [],
        example: null,
        tool: null,
        tierLabel: warningObj.tierLabel || "🛡️ Security",
        related: []
    };
}

/**
 * Shortcut for a challenge-style response.
 */
export function buildChallengeResponse(challenge) {
    if (!challenge) {
        return buildStructuredResponse({
            title: "🏁 No challenge available",
            explanation: "I couldn't find a matching challenge. Try a different category or difficulty.",
            tier: "FREE"
        }, "challenge");
    }

    return {
        type: "challenge",
        title: `🏁 ${challenge.title} (${challenge.difficulty})`,
        explanation: challenge.question,
        keyPoints: [
            `Category: ${challenge.category}`,
            `Difficulty: ${challenge.difficulty}`,
            `Points: ${challenge.points}`,
            "Type 'HINT' for a hint, 'SOLUTION' to reveal the answer."
        ],
        example: challenge.description || null,
        tool: null,
        tierLabel: TIER_LABELS.FREE,
        related: []
    };
}
