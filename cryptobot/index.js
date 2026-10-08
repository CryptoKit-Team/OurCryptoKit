/**
 * CryptoBot — Main Entry Point
 * Initializes and mounts CryptoBot onto the CryptoKit website.
 */

import { CryptoBotUI } from './CryptoBotUI.js';
import { CryptoBotEngine } from './CryptoBotEngine.js';
import { IntentDetector } from './IntentDetector.js';
import { KnowledgeBase } from './KnowledgeBase.js';
import { ToolGuide } from './ToolGuide.js';
import { ChallengeGenerator } from './ChallengeGenerator.js';
import { ExamFormatter } from './ExamFormatter.js';
import { TierManager } from './TierManager.js';
import { MessageRenderer } from './MessageRenderer.js';
import { QuickQuestions } from './QuickQuestions.js';
import { SecurityGuard } from './SecurityGuard.js';

class CryptoBot {
  constructor(options = {}) {
    this.containerId = options.containerId || 'cryptobot-root';
    this.userTier = options.userTier || 'free'; // 'free' | 'pro' | 'quantum'
    this.apiEndpoint = options.apiEndpoint || null;
    this.onReady = options.onReady || null;

    // Initialize modules
    this.tierManager = new TierManager(this.userTier);
    this.knowledgeBase = new KnowledgeBase();
    this.intentDetector = new IntentDetector();
    this.toolGuide = new ToolGuide();
    this.challengeGenerator = new ChallengeGenerator();
    this.examFormatter = new ExamFormatter();
    this.messageRenderer = new MessageRenderer();
    this.quickQuestions = new QuickQuestions();
    this.securityGuard = new SecurityGuard();

    this.engine = new CryptoBotEngine({
      knowledgeBase: this.knowledgeBase,
      intentDetector: this.intentDetector,
      toolGuide: this.toolGuide,
      challengeGenerator: this.challengeGenerator,
      examFormatter: this.examFormatter,
      tierManager: this.tierManager,
      securityGuard: this.securityGuard,
      apiEndpoint: this.apiEndpoint
    });

    this.ui = new CryptoBotUI({
      containerId: this.containerId,
      engine: this.engine,
      messageRenderer: this.messageRenderer,
      quickQuestions: this.quickQuestions,
      tierManager: this.tierManager
    });
  }

  init() {
    this._injectStyles();
    this.ui.mount();

    if (this.onReady && typeof this.onReady === 'function') {
      this.onReady(this);
    }

    console.log('[CryptoBot] Initialized successfully.');
    return this;
  }

  _injectStyles() {
    if (document.getElementById('cryptobot-styles')) return;
    const link = document.createElement('link');
    link.id = 'cryptobot-styles';
    link.rel = 'stylesheet';
    link.href = this._getStylePath();
    document.head.appendChild(link);
  }

  _getStylePath() {
    const scripts = document.querySelectorAll('script[src]');
    for (const s of scripts) {
      if (s.src.includes('cryptobot')) {
        return s.src.replace(/[^/]*$/, 'styles.css');
      }
    }
    return './cryptobot/styles.css';
  }

  setTier(tier) {
    this.tierManager.setTier(tier);
    this.userTier = tier;
  }

  destroy() {
    this.ui.unmount();
  }

  open() {
    this.ui.openChat();
  }

  close() {
    this.ui.closeChat();
  }

  toggle() {
    this.ui.toggleChat();
  }
}

// Auto-init if script has data-auto-init
if (typeof document !== 'undefined') {
  document.addEventListener('DOMContentLoaded', () => {
    const autoInit = document.querySelector('[data-cryptobot-auto]');
    if (autoInit) {
      window.cryptoBot = new CryptoBot({
        userTier: autoInit.dataset.tier || 'free',
        apiEndpoint: autoInit.dataset.api || null
      }).init();
    }
  });
}

export default CryptoBot;

// Global access
if (typeof window !== 'undefined') {
  window.CryptoBot = CryptoBot;
}
