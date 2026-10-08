// QuickQuestions.js
// Clickable suggested questions for the CryptoBot UI.

export const QUESTION_CATEGORIES = {
    GENERAL: "GENERAL",
    TOOLS: "TOOLS",
    SECURITY: "SECURITY",
    PRO_CIPHER: "PRO_CIPHER",
    QUANTUM_ELITE: "QUANTUM_ELITE",
    LEARNING: "LEARNING",
    CHALLENGES: "CHALLENGES"
};

const QUESTIONS = {
    GENERAL: [
        "What is cryptography?",
        "What is hashing?",
        "Encryption vs hashing",
        "What is a digital signature?"
    ],
    TOOLS: [
        "How do I generate an RSA key?",
        "How do I check file integrity?",
        "How does the Hash Generator work?",
        "How do I create a digital signature?"
    ],
    SECURITY: [
        "What is brute force?",
        "What is a hash collision?",
        "What is secure key management?",
        "How can I protect private keys?"
    ],
    PRO_CIPHER: [
        "What is Crypto Security Scanner?",
        "Explain Advanced RSA Lab",
        "What is ECDSA?",
        "What is ECDH?"
    ],
    QUANTUM_ELITE: [
        "What is a padding-oracle attack?",
        "What is cryptographic forensics?",
        "Give me a Crypto CTF",
        "Explain blockchain security"
    ],
    LEARNING: [
        "Start learning cryptography",
        "Teach me RSA",
        "Teach me ECC",
        "Give me a 7-mark answer on hashing"
    ],
    CHALLENGES: [
        "Give me an easy challenge",
        "Give me a medium challenge",
        "Give me a hard challenge",
        "Give me a random crypto challenge"
    ]
};

export function getQuickQuestions() {
    return { ...QUESTIONS };
}

export function getQuestionsByCategory(category) {
    if (!category || !QUESTIONS[category]) return [];
    return [...QUESTIONS[category]];
}

/**
 * Return N random questions from all categories mixed.
 */
export function getRandomQuestions(count = 4) {
    const all = Object.values(QUESTIONS).flat();
    const shuffled = all.sort(() => Math.random() - 0.5);
    return shuffled.slice(0, Math.max(1, count));
}
