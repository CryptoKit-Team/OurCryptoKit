// ChallengeManager.js
// Manages cryptography challenges and CTF-style learning.
// Solutions are never revealed unless explicitly requested.

import { BOT_CONFIG } from "./BotConfig.js";
import { generateId } from "./CryptoBotUtils.js";

export const CHALLENGE_CATEGORIES = [
    "Hashing",
    "RSA",
    "ECC",
    "Digital Signatures",
    "Encoding",
    "Classical Cryptography",
    "Blockchain Cryptography",
    "Cryptanalysis"
];

export const DIFFICULTIES = ["Easy", "Medium", "Hard", "Expert"];

const DIFFICULTY_POINTS = {
    Easy: BOT_CONFIG.challenge.pointsEasy,
    Medium: BOT_CONFIG.challenge.pointsMedium,
    Hard: BOT_CONFIG.challenge.pointsHard,
    Expert: BOT_CONFIG.challenge.pointsExpert
};

// Challenge dataset
const CHALLENGES = [
    {
        id: "hash-001",
        title: "Identify the Hash",
        category: "Hashing",
        difficulty: "Easy",
        question: "Which algorithm produces the hash: 5d41402abc4b2a76b9719d911017c592 ?",
        description: "A 32-character hexadecimal digest is given. Identify the hash algorithm.",
        hints: [
            "Count the hex characters.",
            "Hex length 32 = 128 bits.",
            "Legacy algorithm, widely considered broken."
        ],
        solution: "MD5",
        explanation: "MD5 produces a 128-bit (32 hex characters) digest. It is deprecated due to collisions.",
        points: DIFFICULTY_POINTS.Easy
    },
    {
        id: "enc-001",
        title: "Decode the Message",
        category: "Encoding",
        difficulty: "Easy",
        question: "Decode: Q3J5cHRvS2l0",
        description: "Classic encoding — not encryption.",
        hints: ["Characters A-Z, a-z, 0-9, +, /", "Length divisible by 4 with possible '=' padding"],
        solution: "CryptoKit",
        explanation: "This is Base64. Decoding yields 'CryptoKit'. Base64 is encoding, NOT encryption.",
        points: DIFFICULTY_POINTS.Easy
    },
    {
        id: "classical-001",
        title: "Caesar Cipher",
        category: "Classical Cryptography",
        difficulty: "Easy",
        question: "Decrypt: 'FUBSWRNLW' using a Caesar cipher.",
        description: "A simple shift cipher.",
        hints: ["Try shift 3", "Each letter was shifted forward during encryption"],
        solution: "CRYPTOKIT",
        explanation: "The Caesar cipher with shift 3 (reversed) decrypts FUBSWRNLW → CRYPTOKIT.",
        points: DIFFICULTY_POINTS.Easy
    },
    {
        id: "rsa-001",
        title: "RSA Small Modulus",
        category: "RSA",
        difficulty: "Medium",
        question: "Given n=3233, e=17. Factor n and compute d.",
        description: "A toy RSA example to show why small keys are dangerous.",
        hints: [
            "Try trial division on small primes.",
            "n = p × q where p,q are small primes.",
            "Compute φ(n) = (p-1)(q-1), then d = e⁻¹ mod φ(n)."
        ],
        solution: "p=61, q=53, φ(n)=3120, d=2753",
        explanation: "Factoring 3233 gives 61 × 53. φ(n)=3120. d = modular inverse of 17 mod 3120 = 2753.",
        points: DIFFICULTY_POINTS.Medium
    },
    {
        id: "sig-001",
        title: "Signature Verification",
        category: "Digital Signatures",
        difficulty: "Medium",
        question: "Which key verifies a digital signature — private or public?",
        description: "Core concept of asymmetric signatures.",
        hints: ["Signing uses one key, verification uses the other.", "Public operations use the public key."],
        solution: "Public key",
        explanation: "Signatures are produced with the signer's PRIVATE key and verified with the signer's PUBLIC key.",
        points: DIFFICULTY_POINTS.Medium
    },
    {
        id: "ecc-001",
        title: "ECC Curve Identification",
        category: "ECC",
        difficulty: "Hard",
        question: "Which curve is used by Bitcoin for ECDSA signatures?",
        description: "A widely used ECC curve.",
        hints: ["256-bit", "Koblitz curve", "Named after a SECG standard"],
        solution: "secp256k1",
        explanation: "Bitcoin uses secp256k1, a Koblitz curve offering ~128-bit security.",
        points: DIFFICULTY_POINTS.Hard
    },
    {
        id: "crypta-001",
        title: "Padding Oracle",
        category: "Cryptanalysis",
        difficulty: "Expert",
        question: "What makes CBC mode vulnerable to a padding-oracle attack?",
        description: "A classic AES-CBC vulnerability.",
        hints: [
            "The server reveals whether padding is valid.",
            "Attacker modifies ciphertext blocks and observes responses.",
            "PKCS#7 padding leakage"
        ],
        solution: "The server distinguishes valid vs invalid PKCS#7 padding, letting an attacker recover plaintext byte-by-byte.",
        explanation: "A padding-oracle leaks 1 bit per request. By XOR-manipulating the previous ciphertext block and observing padding validity, attackers decrypt without the key.",
        points: DIFFICULTY_POINTS.Expert
    },
    {
        id: "blockchain-001",
        title: "Merkle Root",
        category: "Blockchain Cryptography",
        difficulty: "Hard",
        question: "What is the purpose of a Merkle root in a blockchain block?",
        description: "Core blockchain data structure.",
        hints: ["Tree of hashes", "Efficient inclusion proofs", "Tamper-evident"],
        solution: "It is a hash summary of all transactions, enabling efficient and tamper-evident verification.",
        explanation: "A Merkle root is the top hash of a binary tree of transaction hashes. Any transaction change alters the root, and inclusion can be proven with O(log n) hashes.",
        points: DIFFICULTY_POINTS.Hard
    }
];

// Per-session progress (replace with user storage later)
const progress = {
    attempted: new Set(),
    solved: new Set(),
    points: 0
};

export function getChallenge(id) {
    return CHALLENGES.find(c => c.id === id) || null;
}

export function getRandomChallenge(filter = {}) {
    let pool = CHALLENGES;
    if (filter.category) pool = pool.filter(c => c.category === filter.category);
    if (filter.difficulty) pool = pool.filter(c => c.difficulty === filter.difficulty);
    if (!pool.length) return null;
    return pool[Math.floor(Math.random() * pool.length)];
}

export function getChallengesByCategory(category) {
    return CHALLENGES.filter(c => c.category === category);
}

export function getChallengesByDifficulty(difficulty) {
    return CHALLENGES.filter(c => c.difficulty === difficulty);
}

/**
 * Returns hint N (1-indexed). Null if none left.
 */
export function getHint(challengeId, hintIndex = 1) {
    const ch = getChallenge(challengeId);
    if (!ch) return null;
    const idx = Math.max(1, hintIndex) - 1;
    if (idx >= ch.hints.length) return null;
    return ch.hints[idx];
}

export function getSolution(challengeId) {
    const ch = getChallenge(challengeId);
    if (!ch) return null;
    return { solution: ch.solution, explanation: ch.explanation };
}

export function checkAnswer(challengeId, userAnswer) {
    const ch = getChallenge(challengeId);
    if (!ch) return { correct: false, message: "Challenge not found." };

    progress.attempted.add(challengeId);

    const normalize = s => String(s || "").toLowerCase().replace(/[\s_\-]+/g, "");
    const correct = normalize(userAnswer).includes(normalize(ch.solution).slice(0, 6));

    if (correct && !progress.solved.has(challengeId)) {
        progress.solved.add(challengeId);
        progress.points += ch.points;
    }

    return {
        correct,
        message: correct
            ? `✅ Correct! +${ch.points} points.`
            : "❌ Not quite. Try asking for 'HINT' or 'HINT 2'."
    };
}

export function getChallengeProgress() {
    return {
        attempted: progress.attempted.size,
        solved: progress.solved.size,
        points: progress.points,
        total: CHALLENGES.length
    };
}

export function createChallengeSession(challenge) {
    if (!challenge) return null;
    return {
        sessionId: generateId("ch"),
        challengeId: challenge.id,
        hintsUsed: 0,
        solved: false
    };
}
