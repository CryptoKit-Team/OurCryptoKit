// CryptoBotEngine.js
// Core processing logic for CryptoBot.
// Integrates new modular files without breaking existing handlers.

// ===== New module integrations =====
import { BOT_CONFIG, FALLBACK_RESPONSE, LEARNING_LEVELS } from "./BotConfig.js";

import {
    normalizeText,
    cleanText,
    escapeHtml,
    generateId
} from "./CryptoBotUtils.js";

import {
    detectSensitiveData,
    sanitizeMessage,
    getSecurityWarning
} from "./SecurityGuard.js";

import {
    getUserTier,
    setUserTier,
    getTierLabel,
    isFeatureAvailable,
    getLockedFeatureMessage,
    FEATURE_TIER_MAP
} from "./PremiumManager.js";

import {
    addMessage,
    getConversationContext,
    getLastMessage,
    setCurrentTopic,
    setActiveChallenge,
    getActiveChallenge,
    setLearningLevel,
    getLearningLevel,
    clearConversation
} from "./ConversationManager.js";

import {
    getRandomChallenge,
    getChallenge,
    getHint,
    getSolution,
    checkAnswer,
    createChallengeSession,
    getChallengeProgress
} from "./ChallengeManager.js";

import {
    generateResponse,
    renderResponseText,
    buildSecurityResponse,
    buildChallengeResponse
} from "./ResponseGenerator.js";

import {
    getQuickQuestions,
    getQuestionsByCategory,
    getRandomQuestions
} from "./QuickQuestions.js";


/**
 * CryptoBotEngine — Core processing logic.
 * Routes user input to the appropriate handler.
 */
export class CryptoBotEngine {
  constructor({
    knowledgeBase,
    intentDetector,
    toolGuide,
    challengeGenerator,
    examFormatter,
    tierManager,
    securityGuard,
    apiEndpoint
  }) {
    this.kb = knowledgeBase;
    this.intent = intentDetector;
    this.tools = toolGuide;
    this.challenges = challengeGenerator;
    this.exam = examFormatter;
    this.tier = tierManager;
    this.security = securityGuard;
    this.apiEndpoint = apiEndpoint;
    this.history = [];
    this.currentChallengeState = null;
  }

  getWelcomeMessage() {
    return `
      <div class="cryptobot-welcome">
        <p>👋 <strong>Hey! I'm CryptoBot.</strong></p>
        <p>Your AI Cryptography Companion.</p>
        <p>I can help you understand cryptography, use CryptoKit tools, learn cybersecurity concepts, and explore advanced security challenges.</p>
        <p><strong>What would you like to do?</strong></p>
        <div class="cryptobot-welcome__modes">
          <span>🔧 Explore Tools</span>
          <span>📚 Learn Cryptography</span>
          <span>🛡️ Security</span>
          <span>⚡ Pro Cipher</span>
          <span>🌌 Quantum Elite</span>
          <span>🧩 Take a Challenge</span>
        </div>
      </div>
    `;
  }

  clearHistory() {
    this.history = [];
    this.currentChallengeState = null;
    // Also clear the modular ConversationManager state
    try { clearConversation(); } catch (e) { /* silent */ }
  }

  /**
   * MAIN ENTRY — processes a user message end-to-end.
   *
   * Flow:
   *   1. Input validation (length / empty)
   *   2. SecurityGuard scan (new module) — redact + warn on sensitive data
   *   3. Legacy security check (existing securityGuard dependency)
   *   4. Record sanitized message in ConversationManager + history
   *   5. Try remote API if configured
   *   6. Local processing (existing handlers)
   *   7. Store bot reply + return
   */
  async processMessage(userInput) {
    // ─── 1. Input validation ─────────────────────────────────────────
    const cleanedInput = cleanText(userInput || "");
    if (!cleanedInput) {
      return {
        text: "Please type a question so I can help.",
        quickQuestions: this._getDefaultQuick()
      };
    }

    if (cleanedInput.length > BOT_CONFIG.maxMessageLength) {
      return {
        text: `⚠️ Your message is too long (max ${BOT_CONFIG.maxMessageLength} characters). Please shorten it and try again.`,
        quickQuestions: []
      };
    }

    // ─── 2. SecurityGuard scan (new module) ──────────────────────────
    // Runs BEFORE any processing so secrets never reach the pipeline.
    const scan = detectSensitiveData(cleanedInput);
    if (scan.sensitive) {
      const warningObj = getSecurityWarning(scan.types);
      const warningResponse = buildSecurityResponse(warningObj);
      const warningHtml = this._renderStructuredResponseAsHtml(warningResponse);

      // Store a sanitized placeholder — never raw secrets
      addMessage("user", "[REDACTED — sensitive data detected]", { intent: "security_warning" });
      addMessage("bot", warningResponse.title, { intent: "security_warning" });

      return {
        text: warningHtml,
        quickQuestions: [
          { label: "🔐 Password Security", query: "What makes a strong password?" },
          { label: "🔑 Key Management", query: "What is secure key management?" },
          { label: "🛡️ Protect Private Keys", query: "How can I protect private keys?" }
        ]
      };
    }

    // ─── 3. Legacy security check (existing dependency) ──────────────
    if (this.security && typeof this.security.check === "function") {
      const securityResult = this.security.check(cleanedInput);
      if (securityResult && securityResult.blocked) {
        return { text: securityResult.message, quickQuestions: [] };
      }
    }

    // ─── 4. Record history (sanitized) ───────────────────────────────
    const safeInput = sanitizeMessage(cleanedInput);
    this.history.push({ role: "user", content: safeInput });
    addMessage("user", safeInput);

    // ─── 5. Try remote API first (if configured) ─────────────────────
    if (this.apiEndpoint) {
      try {
        const apiResponse = await this._callAPI(safeInput);
        if (apiResponse) {
          this.history.push({ role: "bot", content: apiResponse });
          addMessage("bot", apiResponse, { intent: "api_response" });
          return { text: apiResponse, quickQuestions: [] };
        }
      } catch (e) {
        console.warn("[CryptoBot] API unavailable, using local fallback.");
      }
    }

    // ─── 6. Local processing (existing handlers) ─────────────────────
    let response;
    try {
      response = this._processLocally(safeInput);
    } catch (err) {
      console.error("[CryptoBot] Local processing error:", err);
      response = {
        text: FALLBACK_RESPONSE,
        quickQuestions: this._getDefaultQuick()
      };
    }

    // ─── 7. Store bot reply ──────────────────────────────────────────
    this.history.push({ role: "bot", content: response.text });
    addMessage("bot", this._stripHtml(response.text), {
      intent: response.intent || "local_response"
    });

    // Enforce in-memory history cap
    if (this.history.length > BOT_CONFIG.maxHistoryLength) {
      this.history.splice(0, this.history.length - BOT_CONFIG.maxHistoryLength);
    }

    return response;
  }

  _processLocally(input) {
    const lower = normalizeText(input);

    // Challenge interaction (hints / solution / answers)
    if (this.currentChallengeState) {
      const challengeResponse = this._handleChallengeInteraction(lower);
      if (challengeResponse) return challengeResponse;
    }

    // Detect intent
    const detected = this.intent.detect(lower);

    // Track topic for context (used by ConversationManager)
    if (detected && detected.topic) {
      try { setCurrentTopic(detected.topic); } catch (e) { /* silent */ }
    }

    switch (detected.intent) {
      case 'GREETING':         return this._handleGreeting();
      case 'MODE_TOOLS':       return this._handleModeTools();
      case 'MODE_LEARN':       return this._handleModeLearn();
      case 'MODE_SECURITY':    return this._handleModeSecurity();
      case 'MODE_CHALLENGE':   return this._handleModeChallenge(detected);
      case 'MODE_PREMIUM':     return this._handleModePremium();
      case 'MODE_HELP':        return this._handleModeHelp();
      case 'EXAM':             return this._handleExam(input, detected);
      case 'COMPARISON':       return this._handleComparison(detected);
      case 'TOOL_HOWTO':       return this._handleToolHowTo(detected);
      case 'LEARNING_PATH':    return this._handleLearningPath();
      case 'CHALLENGE_REQUEST':return this._handleChallengeRequest(detected);
      case 'KNOWLEDGE_FREE':   return this._handleKnowledgeQuery(detected, 'free');
      case 'KNOWLEDGE_PRO':    return this._handleKnowledgeQuery(detected, 'pro');
      case 'KNOWLEDGE_QUANTUM':return this._handleKnowledgeQuery(detected, 'quantum');
      case 'PREMIUM_INFO':     return this._handlePremiumInfo(detected);
      case 'TROUBLESHOOT':     return this._handleTroubleshoot(detected);
      case 'TOOL_RECOMMEND':   return this._handleToolRecommend(detected);
      default:                 return this._handleFuzzyMatch(input);
    }
  }

  // ─── Handlers ───

  _handleGreeting() {
    const greetings = [
      "👋 Hey! How can I help you with cryptography today?",
      "🔐 Hello! Ready to explore cryptography? Ask me anything or pick a mode below.",
      "👋 Hi there! I'm CryptoBot — your cryptography companion. What would you like to learn?"
    ];
    return {
      text: greetings[Math.floor(Math.random() * greetings.length)],
      quickQuestions: this._getDefaultQuick()
    };
  }

  _handleModeTools() {
    return {
      text: `
        <h3>🔧 CryptoKit Tools</h3>
        <div class="cryptobot-tools-grid">
          <div class="cryptobot-tool-card cryptobot-tier--free">
            <span class="cryptobot-tier-badge">🆓 FREE</span>
            <strong>Hash Generator</strong>
            <p>Generate SHA-256, SHA-512, MD5, SHA-1, BLAKE2 hashes</p>
          </div>
          <div class="cryptobot-tool-card cryptobot-tier--free">
            <span class="cryptobot-tier-badge">🆓 FREE</span>
            <strong>RSA Key Generator</strong>
            <p>Generate RSA-2048 / RSA-4096 key pairs</p>
          </div>
          <div class="cryptobot-tool-card cryptobot-tier--free">
            <span class="cryptobot-tier-badge">🆓 FREE</span>
            <strong>File Integrity Checker</strong>
            <p>Verify file integrity using cryptographic hashes</p>
          </div>
          <div class="cryptobot-tool-card cryptobot-tier--free">
            <span class="cryptobot-tier-badge">🆓 FREE</span>
            <strong>Text Encrypt/Decrypt</strong>
            <p>AES-256 text encryption and decryption</p>
          </div>
          <div class="cryptobot-tool-card cryptobot-tier--free">
            <span class="cryptobot-tier-badge">🆓 FREE</span>
            <strong>Digital Signature</strong>
            <p>Create and verify digital signatures</p>
          </div>
          <div class="cryptobot-tool-card cryptobot-tier--pro">
            <span class="cryptobot-tier-badge">⚡ PRO CIPHER</span>
            <strong>Crypto Security Scanner</strong>
            <p>Detect cryptographic weaknesses</p>
          </div>
          <div class="cryptobot-tool-card cryptobot-tier--pro">
            <span class="cryptobot-tier-badge">⚡ PRO CIPHER</span>
            <strong>Advanced RSA Lab</strong>
            <p>RSA-CRT, OAEP, PSS, key analysis</p>
          </div>
          <div class="cryptobot-tool-card cryptobot-tier--pro">
            <span class="cryptobot-tier-badge">⚡ PRO CIPHER</span>
            <strong>Advanced ECC Suite</strong>
            <p>ECDSA, ECDH, curve operations</p>
          </div>
          <div class="cryptobot-tool-card cryptobot-tier--quantum">
            <span class="cryptobot-tier-badge">🌌 QUANTUM ELITE</span>
            <strong>Attack Simulator</strong>
            <p>Educational cryptographic attack simulations</p>
          </div>
          <div class="cryptobot-tool-card cryptobot-tier--quantum">
            <span class="cryptobot-tier-badge">🌌 QUANTUM ELITE</span>
            <strong>Crypto CTF Lab</strong>
            <p>Capture-the-flag cryptography challenges</p>
          </div>
          <div class="cryptobot-tool-card cryptobot-tier--quantum">
            <span class="cryptobot-tier-badge">🌌 QUANTUM ELITE</span>
            <strong>Crypto Forensics</strong>
            <p>Cryptographic forensic analysis</p>
          </div>
          <div class="cryptobot-tool-card cryptobot-tier--quantum">
            <span class="cryptobot-tier-badge">🌌 QUANTUM ELITE</span>
            <strong>Blockchain Security Lab</strong>
            <p>Advanced blockchain security analysis</p>
          </div>
        </div>
        <p>Ask me about any tool for details!</p>
      `,
      quickQuestions: [
        { label: '🔐 Hash Generator', query: 'How do I generate a hash?' },
        { label: '🔑 RSA Keys', query: 'How do I generate RSA keys?' },
        { label: '🛡️ File Integrity', query: 'How do I check file integrity?' },
        { label: '✍️ Digital Signature', query: 'How do I create a digital signature?' }
      ]
    };
  }

  _handleModeLearn() {
    return {
      text: `
        <h3>📚 Learn Cryptography</h3>
        <p>Choose your level:</p>
        <div class="cryptobot-levels">
          <div class="cryptobot-level">📗 <strong>Beginner</strong> — Basics, hashing, simple encryption</div>
          <div class="cryptobot-level">📘 <strong>Intermediate</strong> — RSA, AES, digital signatures</div>
          <div class="cryptobot-level">📕 <strong>Advanced</strong> — ECC, cryptanalysis, blockchain security</div>
          <div class="cryptobot-level">🎓 <strong>Exam Mode</strong> — Exam-formatted answers with mark allocations</div>
          <div class="cryptobot-level">💻 <strong>Developer Mode</strong> — Implementation-focused explanations</div>
        </div>
        <p>Just ask a question and I'll adapt to your level, or tell me your level to get started!</p>
      `,
      quickQuestions: [
        { label: '📗 Start Beginner', query: 'I want to learn cryptography from the beginning' },
        { label: '🎓 Exam Mode', query: 'Explain RSA for exam' },
        { label: '📕 Advanced', query: 'Explain ECC in detail' }
      ]
    };
  }

  _handleModeSecurity() {
    return {
      text: `
        <h3>🛡️ Security Topics</h3>
        <p>I can help you with:</p>
        <ul>
          <li>🔐 Password security and best practices</li>
          <li>🔑 Key management</li>
          <li>📝 File integrity verification</li>
          <li>✍️ Digital signature verification</li>
          <li>⚠️ Cryptographic weakness detection</li>
          <li>🛡️ Blockchain security</li>
          <li>🔍 Cryptographic forensics</li>
        </ul>
        <p>What security topic interests you?</p>
      `,
      quickQuestions: [
        { label: '🔐 Password Security', query: 'What makes a strong password?' },
        { label: '🔑 Key Management', query: 'What is a cryptographic key?' },
        { label: '⚠️ Weak Algorithms', query: 'Which hashing algorithms are considered weak?' }
      ]
    };
  }

  _handleModeChallenge(detected) {
    return {
      text: `
        <h3>🧩 Crypto Challenges</h3>
        <p>Test your cryptography knowledge!</p>
        <p>Choose a difficulty:</p>
        <div class="cryptobot-challenge-levels">
          <div class="cryptobot-challenge-level cryptobot-challenge--easy">🟢 <strong>Easy</strong> — Encoding, basic hashing, simple ciphers</div>
          <div class="cryptobot-challenge-level cryptobot-challenge--medium">🟡 <strong>Medium</strong> — RSA, signatures, hash analysis</div>
          <div class="cryptobot-challenge-level cryptobot-challenge--hard">🔴 <strong>Hard</strong> — Cryptanalysis, multi-step reasoning</div>
        </div>
      `,
      quickQuestions: [
        { label: '🟢 Easy Challenge', query: 'Give me an easy crypto challenge' },
        { label: '🟡 Medium Challenge', query: 'Give me a medium crypto challenge' },
        { label: '🔴 Hard Challenge', query: 'Give me a hard crypto challenge' }
      ]
    };
  }

  _handleModePremium() {
    return {
      text: `
        <h3>💎 CryptoKit Tiers</h3>
        <div class="cryptobot-tiers">
          <div class="cryptobot-tier-info cryptobot-tier--free">
            <h4>🆓 FREE</h4>
            <ul>
              <li>Hash Generator</li>
              <li>RSA Key Generator</li>
              <li>File Integrity Checker</li>
              <li>Text Encrypt/Decrypt</li>
              <li>Digital Signature</li>
              <li>CryptoBot Basic Support</li>
            </ul>
          </div>
          <div class="cryptobot-tier-info cryptobot-tier--pro">
            <h4>⚡ PRO CIPHER</h4>
            <ul>
              <li>Everything in Free</li>
              <li>Crypto Security Scanner</li>
              <li>Advanced RSA Lab</li>
              <li>Advanced ECC Suite</li>
              <li>Priority support</li>
            </ul>
          </div>
          <div class="cryptobot-tier-info cryptobot-tier--quantum">
            <h4>🌌 QUANTUM ELITE</h4>
            <ul>
              <li>Everything in Pro Cipher</li>
              <li>Cryptographic Attack Simulator</li>
              <li>Crypto CTF Lab</li>
              <li>Crypto Forensics</li>
              <li>Blockchain Security Lab</li>
              <li>Advanced analysis tools</li>
            </ul>
          </div>
        </div>
        <p>Ask me about any feature for a detailed explanation!</p>
      `,
      quickQuestions: [
        { label: '⚡ What is Pro Cipher?', query: 'What is Pro Cipher?' },
        { label: '🌌 What is Quantum Elite?', query: 'What is Quantum Elite?' }
      ]
    };
  }

  _handleModeHelp() {
    return {
      text: `
        <h3>❓ CryptoBot Help</h3>
        <p>Here's what I can do:</p>
        <ul>
          <li><strong>🔧 Tools</strong> — Guide you through CryptoKit tools</li>
          <li><strong>📚 Learn</strong> — Explain cryptography concepts at any level</li>
          <li><strong>🛡️ Security</strong> — Discuss cybersecurity and best practices</li>
          <li><strong>🧩 Challenges</strong> — Generate crypto puzzles and CTF challenges</li>
          <li><strong>💎 Premium</strong> — Explain Pro Cipher and Quantum Elite features</li>
          <li><strong>🎓 Exam</strong> — Format answers for exams (say "explain X for 7 marks")</li>
          <li><strong>🔍 Compare</strong> — Compare algorithms (say "RSA vs AES")</li>
        </ul>
        <p>Just type a question or pick an option below!</p>
      `,
      quickQuestions: this._getDefaultQuick()
    };
  }

  _handleExam(input, detected) {
    const result = this.exam.format(input, detected, this.kb);
    return { text: result, quickQuestions: [] };
  }

  _handleComparison(detected) {
    const result = this.kb.getComparison(detected.topic);
    return {
      text: result || "I can compare cryptographic algorithms and concepts. Try asking something like 'RSA vs AES' or 'SHA-256 vs MD5'.",
      quickQuestions: []
    };
  }

  _handleToolHowTo(detected) {
    const guide = this.tools.getGuide(detected.tool);

    // If a specific tool is referenced, check tier availability (education stays free)
    if (detected.tool && FEATURE_TIER_MAP[detected.tool]) {
      const available = isFeatureAvailable(detected.tool, getUserTier());
      if (!available) {
        const locked = getLockedFeatureMessage(detected.tool);
        return {
          text: `
            <div class="cryptobot-tier-note cryptobot-tier--locked">
              <h4>${locked.title}</h4>
              <p>${locked.explanation.replace(/\n/g, "<br>")}</p>
            </div>
            ${guide || ""}
          `,
          quickQuestions: [
            { label: '💎 View Tiers', query: 'What features are in Pro Cipher?' }
          ]
        };
      }
    }

    return {
      text: guide || "I can guide you through CryptoKit tools. Which tool would you like help with?",
      quickQuestions: [
        { label: '🔐 Hash Generator', query: 'How do I generate a hash?' },
        { label: '🔑 RSA Keys', query: 'How do I generate RSA keys?' }
      ]
    };
  }

  _handleLearningPath() {
    return {
      text: `
        <h3>📚 Cryptography Learning Path</h3>
        <div class="cryptobot-path">
          <div class="cryptobot-path__step">
            <span class="cryptobot-path__num">1</span>
            <div>
              <strong>Cryptography Basics</strong>
              <p>Encryption, decryption, keys, plaintext, ciphertext</p>
            </div>
          </div>
          <div class="cryptobot-path__step">
            <span class="cryptobot-path__num">2</span>
            <div>
              <strong>Hashing</strong>
              <p>SHA-256, SHA-512, MD5, hash properties</p>
            </div>
          </div>
          <div class="cryptobot-path__step">
            <span class="cryptobot-path__num">3</span>
            <div>
              <strong>Symmetric Encryption</strong>
              <p>AES, AES-256, CBC, IV, key management</p>
            </div>
          </div>
          <div class="cryptobot-path__step">
            <span class="cryptobot-path__num">4</span>
            <div>
              <strong>Asymmetric Cryptography (RSA)</strong>
              <p>Key pairs, RSA-2048/4096, OAEP, PSS</p>
            </div>
          </div>
          <div class="cryptobot-path__step">
            <span class="cryptobot-path__num">5</span>
            <div>
              <strong>Elliptic Curve Cryptography</strong>
              <p>ECC, ECDSA, ECDH, curves</p>
            </div>
          </div>
          <div class="cryptobot-path__step">
            <span class="cryptobot-path__num">6</span>
            <div>
              <strong>Digital Signatures</strong>
              <p>Signing, verification, integrity, authenticity</p>
            </div>
          </div>
          <div class="cryptobot-path__step">
            <span class="cryptobot-path__num">7</span>
            <div>
              <strong>Blockchain Security</strong>
              <p>Merkle trees, transaction signing, wallet security</p>
            </div>
          </div>
          <div class="cryptobot-path__step">
            <span class="cryptobot-path__num">8</span>
            <div>
              <strong>Advanced Cryptanalysis</strong>
              <p>Attack vectors, security analysis, forensics</p>
            </div>
          </div>
        </div>
        <p>Where would you like to start?</p>
      `,
      quickQuestions: [
        { label: '1️⃣ Basics', query: 'What is cryptography?' },
        { label: '2️⃣ Hashing', query: 'What is hashing?' },
        { label: '3️⃣ AES', query: 'What is AES?' },
        { label: '4️⃣ RSA', query: 'What is RSA?' }
      ]
    };
  }

  _handleChallengeRequest(detected) {
    const difficulty = detected.difficulty || 'medium';

    // Prefer existing generator; fall back to new ChallengeManager
    let challenge = null;
    try {
      challenge = this.challenges.generate(difficulty);
    } catch (e) {
      challenge = null;
    }

    if (challenge && challenge.rendered) {
      this.currentChallengeState = challenge;
      // Also register with ConversationManager for context
      try { setActiveChallenge(createChallengeSession(challenge)); } catch (e) { /* silent */ }

      return {
        text: challenge.rendered,
        quickQuestions: [
          { label: '💡 Hint 1', query: 'hint 1' },
          { label: '💡 Hint 2', query: 'hint 2' },
          { label: '✅ Show Solution', query: 'show solution' }
        ]
      };
    }

    // Fallback — use the new ChallengeManager
    const normalizedDifficulty =
      difficulty.charAt(0).toUpperCase() + difficulty.slice(1).toLowerCase();
    const fallbackChallenge = getRandomChallenge({ difficulty: normalizedDifficulty });

    if (!fallbackChallenge) {
      return {
        text: "I couldn't find a challenge for that difficulty. Try 'easy', 'medium', or 'hard'.",
        quickQuestions: [
          { label: '🟢 Easy', query: 'Give me an easy crypto challenge' },
          { label: '🟡 Medium', query: 'Give me a medium crypto challenge' },
          { label: '🔴 Hard', query: 'Give me a hard crypto challenge' }
        ]
      };
    }

    const session = createChallengeSession(fallbackChallenge);
    setActiveChallenge(session);

    // Store a compatibility shape so _handleChallengeInteraction keeps working
    this.currentChallengeState = {
      id: fallbackChallenge.id,
      hint1: fallbackChallenge.hints[0] || "No hint available.",
      hint2: fallbackChallenge.hints[1] || "No further hint available.",
      solution: `<p>${escapeHtml(fallbackChallenge.solution)}</p><p>${escapeHtml(fallbackChallenge.explanation)}</p>`,
      rendered: renderResponseText(buildChallengeResponse(fallbackChallenge))
    };

    return {
      text: `<pre class="cryptobot-challenge">${escapeHtml(this.currentChallengeState.rendered)}</pre>`,
      quickQuestions: [
        { label: '💡 Hint 1', query: 'hint 1' },
        { label: '💡 Hint 2', query: 'hint 2' },
        { label: '✅ Show Solution', query: 'show solution' }
      ]
    };
  }

  _handleChallengeInteraction(input) {
    if (!this.currentChallengeState) return null;

    if (input.includes('hint 1') || input === 'hint1') {
      return {
        text: `<p>💡 <strong>Hint 1:</strong> ${escapeHtml(this.currentChallengeState.hint1 || "No hint available.")}</p>`,
        quickQuestions: [
          { label: '💡 Hint 2', query: 'hint 2' },
          { label: '✅ Show Solution', query: 'show solution' },
          { label: '🧩 New Challenge', query: 'Give me a crypto challenge' }
        ]
      };
    }

    if (input.includes('hint 2') || input === 'hint2') {
      return {
        text: `<p>💡 <strong>Hint 2:</strong> ${escapeHtml(this.currentChallengeState.hint2 || "No further hint available.")}</p>`,
        quickQuestions: [
          { label: '✅ Show Solution', query: 'show solution' },
          { label: '🧩 New Challenge', query: 'Give me a crypto challenge' }
        ]
      };
    }

    if (input.includes('solution') || input.includes('answer') || input.includes('solve')) {
      const solution = this.currentChallengeState.solution;
      this.currentChallengeState = null;
      try { setActiveChallenge(null); } catch (e) { /* silent */ }
      return {
        text: `
          <div class="cryptobot-solution">
            <h4>✅ Solution</h4>
            ${solution}
          </div>
        `,
        quickQuestions: [
          { label: '🧩 Another Challenge', query: 'Give me a crypto challenge' },
          { label: '📚 Learn More', query: 'I want to learn cryptography' }
        ]
      };
    }

    // Try answer-checking via ChallengeManager if we have an id
    if (this.currentChallengeState.id) {
      const result = checkAnswer(this.currentChallengeState.id, input);
      if (result && result.correct) {
        this.currentChallengeState = null;
        try { setActiveChallenge(null); } catch (e) { /* silent */ }
        return {
          text: `<p>${escapeHtml(result.message)}</p>`,
          quickQuestions: [
            { label: '🧩 Another Challenge', query: 'Give me a crypto challenge' }
          ]
        };
      }
    }

    return null;
  }

  _handleKnowledgeQuery(detected, tier) {
    const answer = this.kb.getAnswer(detected.topic, detected.subtopic);
    if (!answer) return this._handleFuzzyMatch(detected.original || '');

    let tierNote = '';
    if (tier === 'pro') {
      tierNote = `<div class="cryptobot-tier-note cryptobot-tier--pro"><span>⚡ Pro Cipher Feature</span> — This feature is available with Pro Cipher access. You can still learn about the concepts here.</div>`;
    } else if (tier === 'quantum') {
      tierNote = `<div class="cryptobot-tier-note cryptobot-tier--quantum"><span>🌌 Quantum Elite</span> — This feature belongs to CryptoKit's advanced security laboratory. Available with Quantum Elite access.</div>`;
    }

    return {
      text: answer + tierNote,
      quickQuestions: detected.relatedQuestions || []
    };
  }

  _handlePremiumInfo(detected) {
    const feature = detected.feature || 'general';
    const info = this.kb.getPremiumInfo(feature);
    return {
      text: info,
      quickQuestions: [
        { label: '⚡ Pro Cipher', query: 'What features are in Pro Cipher?' },
        { label: '🌌 Quantum Elite', query: 'What features are in Quantum Elite?' }
      ]
    };
  }

  _handleTroubleshoot(detected) {
    const result = this.kb.getTroubleshoot(detected.topic);
    return {
      text: result || "Please describe your issue in more detail and I'll try to help.",
      quickQuestions: []
    };
  }

  _handleToolRecommend(detected) {
    const result = this.tools.recommend(detected.context);
    return {
      text: result,
      quickQuestions: [
        { label: '🔧 All Tools', query: 'Show me all tools' }
      ]
    };
  }

  _handleFuzzyMatch(input) {
    const fuzzyResult = this.kb.fuzzySearch(input);
    if (fuzzyResult) {
      return { text: fuzzyResult.answer, quickQuestions: fuzzyResult.related || [] };
    }

    return {
      text: `
        <p>${escapeHtml(FALLBACK_RESPONSE)}</p>
        <p>Try asking about:</p>
        <ul>
          <li>Cryptography concepts (hashing, encryption, RSA, ECC)</li>
          <li>CryptoKit tools and how to use them</li>
          <li>Security best practices</li>
          <li>Crypto challenges</li>
        </ul>
      `,
      quickQuestions: this._getDefaultQuick()
    };
  }

  _getDefaultQuick() {
    // Prefer new QuickQuestions module for consistency
    try {
      const random = getRandomQuestions(4);
      if (random && random.length) {
        return random.map(q => ({ label: q, query: q }));
      }
    } catch (e) { /* fall through */ }

    return [
      { label: '🔐 What is Hashing?', query: 'What is hashing?' },
      { label: '🔑 Explain RSA', query: 'Explain RSA' },
      { label: '🧩 Challenge', query: 'Give me a crypto challenge' },
      { label: '🔧 Tools', query: 'Show me all tools' }
    ];
  }

  async _callAPI(input) {
    if (!this.apiEndpoint) return null;

    const response = await fetch(this.apiEndpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        message: input,
        history: this.history.slice(-10),
        tier: this.tier && typeof this.tier.getCurrentTier === "function"
          ? this.tier.getCurrentTier()
          : getUserTier()
      })
    });

    if (!response.ok) throw new Error('API error');
    const data = await response.json();
    return data.reply || null;
  }

  // ─── Internal helpers ───

  /**
   * Convert a structured ResponseGenerator object into safe HTML.
   */
  _renderStructuredResponseAsHtml(response) {
    if (!response) return "";
    const parts = [];

    if (response.title) {
      parts.push(`<h4>${escapeHtml(response.title)}</h4>`);
    }
    if (response.explanation) {
      parts.push(`<p>${escapeHtml(response.explanation).replace(/\n/g, "<br>")}</p>`);
    }
    if (Array.isArray(response.keyPoints) && response.keyPoints.length) {
      parts.push("<ul>");
      response.keyPoints.forEach(pt => {
        parts.push(`<li>${escapeHtml(pt)}</li>`);
      });
      parts.push("</ul>");
    }
    if (response.example) {
      parts.push(`<p><strong>Example:</strong><br>${escapeHtml(response.example)}</p>`);
    }
    if (response.tool) {
      parts.push(`<p><strong>CryptoKit Tool:</strong> ${escapeHtml(response.tool)}</p>`);
    }
    if (response.tierLabel) {
      parts.push(`<p><strong>Tier:</strong> ${escapeHtml(response.tierLabel)}</p>`);
    }

    return `<div class="cryptobot-structured cryptobot-${response.type || 'response'}">${parts.join("")}</div>`;
  }

  /**
   * Strip HTML tags from a string before storing in ConversationManager
   * so stored history stays lightweight and avoids embedded markup.
   */
  _stripHtml(html) {
    if (!html || typeof html !== "string") return "";
    return html.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
  }
}
