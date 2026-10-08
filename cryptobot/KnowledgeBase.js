/**
 * KnowledgeBase — Central knowledge aggregator.
 * Imports from tier-specific knowledge modules.
 */

import { knowledgeFree } from './KnowledgeFree.js';
import { knowledgeProCipher } from './KnowledgeProCipher.js';
import { knowledgeQuantumElite } from './KnowledgeQuantumElite.js';

export class KnowledgeBase {
  constructor() {
    this.data = {
      ...knowledgeFree,
      ...knowledgeProCipher,
      ...knowledgeQuantumElite
    };

    this.comparisons = this._buildComparisons();
    this.troubleshooting = this._buildTroubleshooting();
    this.premiumInfo = this._buildPremiumInfo();
    this._searchIndex = this._buildSearchIndex();
  }

  getAnswer(topic, subtopic) {
    if (this.data[topic] && this.data[topic][subtopic]) {
      return this.data[topic][subtopic];
    }
    return null;
  }

  getComparison(topicObj) {
    if (!topicObj || !topicObj.a || !topicObj.b) return null;

    const key = this._normalizeComparisonKey(topicObj.a, topicObj.b);
    return this.comparisons[key] || null;
  }

  getTroubleshoot(topic) {
    return this.troubleshooting[topic] || this.troubleshooting['general'];
  }

  getPremiumInfo(feature) {
    return this.premiumInfo[feature] || this.premiumInfo['general'];
  }

  fuzzySearch(input) {
    const lower = input.toLowerCase();
    const words = lower.split(/\s+/).filter(w => w.length > 2);

    let bestMatch = null;
    let bestScore = 0;

    for (const entry of this._searchIndex) {
      let score = 0;
      for (const word of words) {
        if (entry.keywords.includes(word)) score += 2;
        else if (entry.keywords.some(k => k.includes(word) || word.includes(k))) score += 1;
      }
      if (score > bestScore) {
        bestScore = score;
        bestMatch = entry;
      }
    }

    if (bestScore >= 2 && bestMatch) {
      return {
        answer: this.getAnswer(bestMatch.topic, bestMatch.subtopic),
        related: bestMatch.related || []
      };
    }

    return null;
  }

  _buildSearchIndex() {
    const index = [];
    for (const [topic, subtopics] of Object.entries(this.data)) {
      for (const [subtopic] of Object.entries(subtopics)) {
        const keywords = [topic, subtopic, ...subtopic.split('_'), ...topic.split('_')]
          .map(k => k.toLowerCase())
          .filter(k => k.length > 1);
        index.push({ topic, subtopic, keywords });
      }
    }
    return index;
  }

  _normalizeComparisonKey(a, b) {
    const normalize = (s) => s.toLowerCase().replace(/[^a-z0-9]/g, '');
    const na = normalize(a);
    const nb = normalize(b);
    return [na, nb].sort().join('_vs_');
  }

  _buildComparisons() {
    return {
      'aes_vs_rsa': `
        <h3>AES vs RSA</h3>
        <table class="cryptobot-table">
          <thead><tr><th>Feature</th><th>AES</th><th>RSA</th></tr></thead>
          <tbody>
            <tr><td>Type</td><td>Symmetric</td><td>Asymmetric</td></tr>
            <tr><td>Keys</td><td>Single shared key</td><td>Public/Private key pair</td></tr>
            <tr><td>Speed</td><td>Fast</td><td>Slow</td></tr>
            <tr><td>Key Size</td><td>128/192/256 bits</td><td>2048/4096 bits</td></tr>
            <tr><td>Use Case</td><td>Data encryption</td><td>Key exchange, signatures</td></tr>
            <tr><td>Scalability</td><td>Key distribution challenge</td><td>Better for multiple parties</td></tr>
          </tbody>
        </table>
        <p>💡 In practice, AES and RSA are often used together: RSA secures the AES key, and AES encrypts the data.</p>
      `,
      'encryption_vs_hashing': `
        <h3>Encryption vs Hashing</h3>
        <table class="cryptobot-table">
          <thead><tr><th>Feature</th><th>Encryption</th><th>Hashing</th></tr></thead>
          <tbody>
            <tr><td>Reversible</td><td>Yes (with key)</td><td>No (one-way)</td></tr>
            <tr><td>Output Size</td><td>Variable</td><td>Fixed length</td></tr>
            <tr><td>Key Required</td><td>Yes</td><td>No</td></tr>
            <tr><td>Purpose</td><td>Confidentiality</td><td>Integrity verification</td></tr>
            <tr><td>Example</td><td>AES-256</td><td>SHA-256</td></tr>
          </tbody>
        </table>
      `,
      'md5_vs_sha256': `
        <h3>MD5 vs SHA-256</h3>
        <table class="cryptobot-table">
          <thead><tr><th>Feature</th><th>MD5</th><th>SHA-256</th></tr></thead>
          <tbody>
            <tr><td>Digest Size</td><td>128 bits</td><td>256 bits</td></tr>
            <tr><td>Security</td><td>Broken (collisions found)</td><td>Secure</td></tr>
            <tr><td>Speed</td><td>Faster</td><td>Slower</td></tr>
            <tr><td>Recommendation</td><td>Avoid for security</td><td>Recommended</td></tr>
          </tbody>
        </table>
      `,
      'sha1_vs_sha256': `
        <h3>SHA-1 vs SHA-256</h3>
        <table class="cryptobot-table">
          <thead><tr><th>Feature</th><th>SHA-1</th><th>SHA-256</th></tr></thead>
          <tbody>
            <tr><td>Digest Size</td><td>160 bits</td><td>256 bits</td></tr>
            <tr><td>Security</td><td>Deprecated (collisions demonstrated)</td><td>Secure</td></tr>
            <tr><td>Use</td><td>Legacy systems only</td><td>Current standard</td></tr>
          </tbody>
        </table>
      `,
      'ecc_vs_rsa': `
        <h3>ECC vs RSA</h3>
        <table class="cryptobot-table">
          <thead><tr><th>Feature</th><th>ECC</th><th>RSA</th></tr></thead>
          <tbody>
            <tr><td>Key Size (equiv. 128-bit security)</td><td>~256 bits</td><td>~3072 bits</td></tr>
            <tr><td>Performance</td><td>Faster</td><td>Slower</td></tr>
            <tr><td>Bandwidth</td><td>Smaller signatures/keys</td><td>Larger</td></tr>
            <tr><td>Adoption</td><td>Growing (TLS, Bitcoin)</td><td>Widespread (legacy)</td></tr>
            <tr><td>Complexity</td><td>More complex math</td><td>Simpler concept</td></tr>
          </tbody>
        </table>
      `,
      'symmetric_vs_asymmetric': `
        <h3>Symmetric vs Asymmetric Cryptography</h3>
        <table class="cryptobot-table">
          <thead><tr><th>Feature</th><th>Symmetric</th><th>Asymmetric</th></tr></thead>
          <tbody>
            <tr><td>Keys</td><td>One shared key</td><td>Public + Private key pair</td></tr>
            <tr><td>Speed</td><td>Fast</td><td>Slow</td></tr>
            <tr><td>Key Distribution</td><td>Challenging</td><td>Easier (public key is shared)</td></tr>
            <tr><td>Examples</td><td>AES, ChaCha20</td><td>RSA, ECC</td></tr>
            <tr><td>Use Case</td><td>Bulk data encryption</td><td>Key exchange, signatures</td></tr>
          </tbody>
        </table>
      `,
      'rsa_vs_ecdsa': `
        <h3>RSA Signature vs ECDSA</h3>
        <table class="cryptobot-table">
          <thead><tr><th>Feature</th><th>RSA Signature</th><th>ECDSA</th></tr></thead>
          <tbody>
            <tr><td>Key Size</td><td>2048–4096 bits</td><td>256–384 bits</td></tr>
            <tr><td>Signature Size</td><td>Larger</td><td>Smaller</td></tr>
            <tr><td>Performance</td><td>Slower signing</td><td>Faster signing</td></tr>
            <tr><td>Verification</td><td>Faster verification</td><td>Slower verification</td></tr>
            <tr><td>Adoption</td><td>Legacy, widely supported</td><td>Modern, growing</td></tr>
          </tbody>
        </table>
      `,
      'checksum_vs_hash': `
        <h3>Checksum vs Cryptographic Hash</h3>
        <table class="cryptobot-table">
          <thead><tr><th>Feature</th><th>Checksum</th><th>Cryptographic Hash</th></tr></thead>
          <tbody>
            <tr><td>Purpose</td><td>Error detection</td><td>Security & integrity</td></tr>
            <tr><td>Collision Resistance</td><td>Low</td><td>High</td></tr>
            <tr><td>Speed</td><td>Very fast</td><td>Slower</td></tr>
            <tr><td>Examples</td><td>CRC32, Adler32</td><td>SHA-256, BLAKE2</td></tr>
            <tr><td>Tamper Resistant</td><td>No</td><td>Yes</td></tr>
          </tbody>
        </table>
      `
    };
  }

  _buildTroubleshooting() {
    return {
      hash_mismatch: `
        <h3>🔧 Hash Mismatch Troubleshooting</h3>
        <p>If your hashes don't match, consider these possibilities:</p>
        <ul>
          <li><strong>File modification</strong> — The file may have been altered (even 1 bit changes the hash entirely)</li>
          <li><strong>Different algorithms</strong> — Ensure you're using the same hash algorithm for both comparisons</li>
          <li><strong>Encoding differences</strong> — Check for whitespace, line endings, or encoding differences in text input</li>
          <li><strong>Incomplete download</strong> — The file may not have downloaded completely</li>
          <li><strong>Copy/paste errors</strong> — Verify the hash was copied correctly</li>
        </ul>
        <p>💡 <strong>Tip:</strong> Use CryptoKit's File Integrity Checker to compare hashes reliably.</p>
      `,
      key_error: `
        <h3>🔧 Key Error Troubleshooting</h3>
        <ul>
          <li>Ensure you're using the correct key format (PEM, DER, etc.)</li>
          <li>Check that you're using the right key — public key for encryption, private key for decryption</li>
          <li>Verify the key hasn't been truncated or corrupted</li>
          <li>Ensure the key size matches your algorithm's requirements</li>
        </ul>
      `,
      encryption_error: `
        <h3>🔧 Encryption/Decryption Troubleshooting</h3>
        <ul>
          <li>Ensure you're using the same key for encryption and decryption</li>
          <li>For AES-CBC, verify the IV matches</li>
          <li>Check that the ciphertext hasn't been modified or truncated</li>
          <li>Verify the encoding format (Base64, Hex, etc.)</li>
          <li>Ensure the correct padding mode is used</li>
        </ul>
      `,
      signature_error: `
        <h3>🔧 Signature Verification Troubleshooting</h3>
        <ul>
          <li>Ensure the message hasn't been modified after signing</li>
          <li>Verify you're using the correct public key that corresponds to the signing private key</li>
          <li>Check the signature algorithm matches (RSA-PSS, ECDSA, etc.)</li>
          <li>Ensure the signature data hasn't been truncated</li>
        </ul>
      `,
      general: `
        <h3>🔧 Troubleshooting</h3>
        <p>Please describe your issue in more detail. Common areas I can help with:</p>
        <ul>
          <li>Hash mismatches</li>
          <li>Key generation or format errors</li>
          <li>Encryption/decryption failures</li>
          <li>Signature verification issues</li>
        </ul>
        <p>Tell me what tool you're using and what error or unexpected result you're seeing.</p>
      `
    };
  }

  _buildPremiumInfo() {
    return {
      pro: `
        <h3>⚡ Pro Cipher</h3>
        <p>Pro Cipher unlocks advanced cryptography tools for security professionals and learners:</p>
        <ul>
          <li><strong>Crypto Security Scanner</strong> — Detect weak algorithms, insecure configurations, and deprecated ciphers in cryptographic implementations</li>
          <li><strong>Advanced RSA Lab</strong> — Explore RSA-CRT, OAEP, PSS, key analysis, and common implementation mistakes</li>
          <li><strong>Advanced ECC Suite</strong> — Work with ECDSA, ECDH, curve operations, and key derivation</li>
        </ul>
        <p>🔒 Available with <strong>Pro Cipher</strong> access.</p>
        <p>You can ask me about any of these concepts — I'll explain them even without Pro access.</p>
      `,
      quantum: `
        <h3>🌌 Quantum Elite</h3>
        <p>Quantum Elite is CryptoKit's most advanced tier, designed for deep security research and learning:</p>
        <ul>
          <li><strong>Cryptographic Attack Simulator</strong> — Educational simulations of brute-force, padding-oracle, collision, and other attacks</li>
          <li><strong>Crypto CTF Lab</strong> — Capture-the-flag cryptography challenges at multiple difficulty levels</li>
          <li><strong>Crypto Forensics</strong> — Cryptographic evidence analysis, hash verification, key analysis</li>
          <li><strong>Blockchain Security Lab</strong> — Advanced blockchain security analysis and attack concepts</li>
        </ul>
        <p>🔒 Available with <strong>Quantum Elite</strong> access.</p>
        <p>I can explain the concepts behind any of these features right now.</p>
      `,
      general: `
        <h3>💎 CryptoKit Premium Tiers</h3>
        <p>CryptoKit offers three access levels:</p>
        <ul>
          <li><strong>🆓 Free</strong> — Core tools: Hash Generator, RSA Key Generator, File Integrity Checker, Text Encrypt/Decrypt, Digital Signature</li>
          <li><strong>⚡ Pro Cipher</strong> — Advanced tools: Security Scanner, RSA Lab, ECC Suite</li>
          <li><strong>🌌 Quantum Elite</strong> — Elite tools: Attack Simulator, CTF Lab, Forensics, Blockchain Security</li>
        </ul>
        <p>I can teach you about concepts at any tier level. Premium tiers unlock the interactive tools.</p>
      `
    };
  }
}
