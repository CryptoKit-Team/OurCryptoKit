/**
 * CryptoBotUI — Handles all DOM rendering, events, and UI state.
 */

export class CryptoBotUI {
  constructor({ containerId, engine, messageRenderer, quickQuestions, tierManager }) {
    this.containerId = containerId;
    this.engine = engine;
    this.messageRenderer = messageRenderer;
    this.quickQuestions = quickQuestions;
    this.tierManager = tierManager;

    this.isOpen = false;
    this.isTyping = false;
    this.messages = [];
    this.elements = {};
  }

  mount() {
    let container = document.getElementById(this.containerId);
    if (!container) {
      container = document.createElement('div');
      container.id = this.containerId;
      document.body.appendChild(container);
    }

    container.innerHTML = '';
    container.appendChild(this._createFloatingButton());
    container.appendChild(this._createChatWindow());

    this._cacheElements();
    this._bindEvents();
    this._showWelcome();
  }

  unmount() {
    const container = document.getElementById(this.containerId);
    if (container) container.innerHTML = '';
  }

  // ─── Build Floating Button ───

  _createFloatingButton() {
    const btn = document.createElement('button');
    btn.className = 'cryptobot-fab';
    btn.id = 'cryptobot-fab';
    btn.setAttribute('aria-label', 'Open CryptoBot');
    btn.setAttribute('title', 'CryptoBot — AI Cryptography Companion');
    btn.innerHTML = `
      <span class="cryptobot-fab__icon cryptobot-fab__icon--chat">
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/>
        </svg>
      </span>
      <span class="cryptobot-fab__icon cryptobot-fab__icon--close" style="display:none;">
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
        </svg>
      </span>
      <span class="cryptobot-fab__pulse"></span>
    `;
    return btn;
  }

  // ─── Build Chat Window ───

  _createChatWindow() {
    const win = document.createElement('div');
    win.className = 'cryptobot-window';
    win.id = 'cryptobot-window';
    win.setAttribute('role', 'dialog');
    win.setAttribute('aria-label', 'CryptoBot Chat');
    win.style.display = 'none';

    win.innerHTML = `
      <div class="cryptobot-header">
        <div class="cryptobot-header__left">
          <div class="cryptobot-header__avatar">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
              <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
            </svg>
          </div>
          <div class="cryptobot-header__info">
            <span class="cryptobot-header__name">CryptoBot</span>
            <span class="cryptobot-header__status">
              <span class="cryptobot-header__dot"></span>
              Online
            </span>
          </div>
        </div>
        <div class="cryptobot-header__actions">
          <button class="cryptobot-header__btn" id="cryptobot-clear" title="Clear chat" aria-label="Clear chat">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
            </svg>
          </button>
          <button class="cryptobot-header__btn" id="cryptobot-minimize" title="Close chat" aria-label="Close chat">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <line x1="5" y1="12" x2="19" y2="12"/>
            </svg>
          </button>
        </div>
      </div>

      <div class="cryptobot-messages" id="cryptobot-messages" role="log" aria-live="polite">
      </div>

      <div class="cryptobot-typing" id="cryptobot-typing" style="display:none;">
        <div class="cryptobot-typing__dots">
          <span></span><span></span><span></span>
        </div>
        <span class="cryptobot-typing__text">CryptoBot is thinking...</span>
      </div>

      <div class="cryptobot-quick" id="cryptobot-quick"></div>

      <div class="cryptobot-input-area">
        <input
          type="text"
          class="cryptobot-input"
          id="cryptobot-input"
          placeholder="Ask about cryptography..."
          autocomplete="off"
          aria-label="Type your message"
        />
        <button class="cryptobot-send" id="cryptobot-send" title="Send" aria-label="Send message">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/>
          </svg>
        </button>
      </div>
    `;
    return win;
  }

  // ─── Cache Elements ───

  _cacheElements() {
    this.elements = {
      fab: document.getElementById('cryptobot-fab'),
      window: document.getElementById('cryptobot-window'),
      messages: document.getElementById('cryptobot-messages'),
      input: document.getElementById('cryptobot-input'),
      send: document.getElementById('cryptobot-send'),
      clear: document.getElementById('cryptobot-clear'),
      minimize: document.getElementById('cryptobot-minimize'),
      typing: document.getElementById('cryptobot-typing'),
      quick: document.getElementById('cryptobot-quick')
    };
  }

  // ─── Bind Events ───

  _bindEvents() {
    this.elements.fab.addEventListener('click', () => this.toggleChat());
    this.elements.minimize.addEventListener('click', () => this.closeChat());
    this.elements.clear.addEventListener('click', () => this._clearChat());
    this.elements.send.addEventListener('click', () => this._handleSend());
    this.elements.input.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        this._handleSend();
      }
    });

    // Close on Escape
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.isOpen) this.closeChat();
    });
  }

  // ─── Toggle / Open / Close ───

  toggleChat() {
    this.isOpen ? this.closeChat() : this.openChat();
  }

  openChat() {
    this.isOpen = true;
    this.elements.window.style.display = 'flex';
    this.elements.fab.classList.add('cryptobot-fab--active');
    this.elements.fab.querySelector('.cryptobot-fab__icon--chat').style.display = 'none';
    this.elements.fab.querySelector('.cryptobot-fab__icon--close').style.display = 'flex';
    this.elements.fab.querySelector('.cryptobot-fab__pulse').style.display = 'none';

    requestAnimationFrame(() => {
      this.elements.window.classList.add('cryptobot-window--open');
      this.elements.input.focus();
    });
  }

  closeChat() {
    this.isOpen = false;
    this.elements.window.classList.remove('cryptobot-window--open');
    this.elements.fab.classList.remove('cryptobot-fab--active');
    this.elements.fab.querySelector('.cryptobot-fab__icon--chat').style.display = 'flex';
    this.elements.fab.querySelector('.cryptobot-fab__icon--close').style.display = 'none';
    this.elements.fab.querySelector('.cryptobot-fab__pulse').style.display = '';

    setTimeout(() => {
      if (!this.isOpen) this.elements.window.style.display = 'none';
    }, 350);
  }

  // ─── Welcome Message ───

  _showWelcome() {
    const welcome = this.engine.getWelcomeMessage();
    this._appendBotMessage(welcome);
    this._renderQuickQuestions(this.quickQuestions.getStarter());
  }

  // ─── Send Message ───

  async _handleSend() {
    const text = this.elements.input.value.trim();
    if (!text || this.isTyping) return;

    this.elements.input.value = '';
    this._appendUserMessage(text);
    this._hideQuick();
    this._showTyping();

    try {
      const response = await this.engine.processMessage(text);
      this._hideTyping();
      this._appendBotMessage(response.text);

      if (response.quickQuestions && response.quickQuestions.length > 0) {
        this._renderQuickQuestions(response.quickQuestions);
      }
    } catch (err) {
      this._hideTyping();
      this._appendBotMessage("⚠️ Something went wrong. Please try again.");
      console.error('[CryptoBot] Error:', err);
    }
  }

  // ─── Append Messages ───

  _appendUserMessage(text) {
    const msg = this.messageRenderer.renderUserMessage(text);
    this.elements.messages.appendChild(msg);
    this._scrollToBottom();
  }

  _appendBotMessage(html) {
    const msg = this.messageRenderer.renderBotMessage(html);
    this.elements.messages.appendChild(msg);
    this._scrollToBottom();
  }

  // ─── Typing Indicator ───

  _showTyping() {
    this.isTyping = true;
    this.elements.typing.style.display = 'flex';
    this._scrollToBottom();
  }

  _hideTyping() {
    this.isTyping = false;
    this.elements.typing.style.display = 'none';
  }

  // ─── Quick Questions ───

  _renderQuickQuestions(questions) {
    this.elements.quick.innerHTML = '';
    if (!questions || questions.length === 0) return;

    questions.forEach((q) => {
      const btn = document.createElement('button');
      btn.className = 'cryptobot-quick__btn';
      btn.textContent = q.label;
      btn.setAttribute('title', q.query);
      btn.addEventListener('click', () => {
        this.elements.input.value = q.query;
        this._handleSend();
      });
      this.elements.quick.appendChild(btn);
    });
  }

  _hideQuick() {
    this.elements.quick.innerHTML = '';
  }

  // ─── Clear Chat ───

  _clearChat() {
    this.elements.messages.innerHTML = '';
    this.messages = [];
    this.engine.clearHistory();
    this._showWelcome();
  }

  // ─── Scroll ───

  _scrollToBottom() {
    requestAnimationFrame(() => {
      this.elements.messages.scrollTop = this.elements.messages.scrollHeight;
    });
  }
}
