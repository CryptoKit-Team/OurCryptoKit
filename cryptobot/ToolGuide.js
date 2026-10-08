/**
 * ToolGuide — Provides guidance for CryptoKit tools.
 */

export class ToolGuide {
  constructor() {
    this.guides = this._buildGuides();
  }

  getGuide(tool) {
    return this.guides[tool] || null;
  }

  recommend(context) {
    const lower = context.toLowerCase();

    if (/hash|digest|sha|md5|blake/i.test(lower)) {
      return this.guides.hash_generator + `<p>💡 <strong>Recommendation:</strong> Use the <strong>Hash Generator</strong> (🆓 Free).</p>`;
    }
    if (/rsa|key\s*pair|public.*private|asymmetric/i.test(lower)) {
      return `<p>🔑 For generating RSA key pairs, use the <strong>RSA Key Generator</strong> (🆓 Free).</p>` + this.guides.rsa_generator;
    }
    if (/file|integrity|verify|download|check/i.test(lower)) {
      return `<p>🛡️ To verify file integrity, use the <strong>File Integrity Checker</strong> (🆓 Free).</p>` + this.guides.file_integrity;
    }
    if (/encrypt|decrypt|aes|secret|confidential/i.test(lower)) {
      return `<p>🔐 For text encryption and decryption, use <strong>Text Encrypt/Decrypt</strong> (🆓 Free).</p>` + this.guides.text_encrypt;
    }
    if (/sign|signature|verify|authentic/i.test(lower)) {
      return `<p>✍️ To create or verify digital signatures, use the <strong>Digital Signature</strong> tool (🆓 Free).</p>` + this.guides.digital_signature;
    }
    if (/scan|weak|vulnerability|audit/i.test(lower)) {
      return `<p>⚡ For cryptographic weakness detection, use the <strong>Crypto Security Scanner</strong> (⚡ Pro Cipher).</p>`;
    }

    return `
      <h3>🔧 CryptoKit Tool Recommendations</h3>
      <p>Here are the tools available:</p>
      <ul>
        <li><strong>Hash Generator</strong> (🆓 Free) — Generate SHA-256, SHA-512, MD5, SHA-1, BLAKE2 hashes</li>
        <li><strong>RSA Key Generator</strong> (🆓 Free) — Generate RSA-2048/4096 key pairs</li>
        <li><strong>File Integrity Checker</strong> (🆓 Free) — Verify file integrity using hashes</li>
        <li><strong>Text Encrypt/Decrypt</strong> (🆓 Free) — AES-256 encryption and decryption</li>
        <li><strong>Digital Signature</strong> (🆓 Free) — Create and verify digital signatures</li>
        <li><strong>Crypto Security Scanner</strong> (⚡ Pro) — Detect cryptographic weaknesses</li>
        <li><strong>Advanced RSA Lab</strong> (⚡ Pro) — RSA analysis and experiments</li>
        <li><strong>Advanced ECC Suite</strong> (⚡ Pro) — ECC operations</li>
      </ul>
      <p>What are you trying to do? I'll recommend the right tool.</p>
    `;
  }

  _buildGuides() {
    return {
      hash_generator: `
        <h3>🔐 Hash Generator</h3>
        <p>A hash converts your input into a fixed-length digest using a mathematical one-way function.</p>
        <h4>Steps</h4>
        <ol>
          <li>Open <strong>Hash Generator</strong> on CryptoKit</li>
          <li>Enter your text in the input field</li>
          <li>Select a hash algorithm (SHA-256, SHA-512, MD5, SHA-1, or BLAKE2)</li>
          <li>Click <strong>Generate Hash</strong></li>
          <li>The hash digest will appear — copy it for comparison or storage</li>
        </ol>
        <h4>Supported Algorithms</h4>
        <ul>
          <li><strong>SHA-256</strong> — ✅ Recommended for most uses</li>
          <li><strong>SHA-512</strong> — ✅ Higher security margin</li>
          <li><strong>BLAKE2</strong> — ✅ Fast and secure</li>
          <li><strong>SHA-1</strong> — ⚠️ Deprecated, avoid for security</li>
          <li><strong>MD5</strong> — ⚠️ Broken, avoid for security</li>
        </ul>
        <p>💡 For security-sensitive applications, prefer <strong>SHA-256</strong> or <strong>SHA-512</strong> over MD5/SHA-1.</p>
        <p>🔧 <strong>Tier:</strong> 🆓 Free</p>
      `,

      rsa_generator: `
        <h3>🔑 RSA Key Generator</h3>
        <p>Generate RSA public/private key pairs for encryption and digital signatures.</p>
        <h4>Steps</h4>
        <ol>
          <li>Open <strong>RSA Key Generator</strong> on CryptoKit</li>
          <li>Select key size: <strong>2048-bit</strong> (standard) or <strong>4096-bit</strong> (high security)</li>
          <li>Click <strong>Generate Keys</strong></li>
          <li>Your <strong>public key</strong> and <strong>private key</strong> will be displayed in PEM format</li>
          <li>Download or copy the keys</li>
        </ol>
        <h4>Important</h4>
        <ul>
          <li><strong>Public key</strong> — Share this with others for encryption or verification</li>
          <li><strong>Private key</strong> — Keep this SECRET. Never share it.</li>
          <li>PEM format is the standard text encoding for cryptographic keys</li>
        </ul>
        <p>💡 For most applications, <strong>RSA-2048</strong> is sufficient. Use <strong>RSA-4096</strong> for higher security needs.</p>
        <p>🔧 <strong>Tier:</strong> 🆓 Free</p>
      `,

      file_integrity: `
        <h3>🛡️ File Integrity Checker</h3>
        <p>Verify that a file hasn't been tampered with by comparing cryptographic hashes.</p>
        <h4>Steps</h4>
        <ol>
          <li>Open <strong>File Integrity Checker</strong> on CryptoKit</li>
          <li>Upload your file</li>
          <li>Select the hash algorithm (SHA-256 recommended)</li>
          <li>The tool generates the file's hash</li>
          <li>Compare this hash with the trusted/expected hash</li>
        </ol>
        <h4>Interpreting Results</h4>
        <ul>
          <li><strong>✅ Hashes match</strong> — File is intact and unmodified</li>
          <li><strong>❌ Hashes differ</strong> — File has been modified, corrupted, or tampered with</li>
        </ul>
        <p>💡 Always obtain the trusted hash from a secure, separate source.</p>
        <p>🔧 <strong>Tier:</strong> 🆓 Free</p>
      `,

      text_encrypt: `
        <h3>🔐 Text Encrypt/Decrypt</h3>
        <p>Encrypt and decrypt text using AES-256 symmetric encryption.</p>
        <h4>Encryption Steps</h4>
        <ol>
          <li>Open <strong>Text Encrypt/Decrypt</strong> on CryptoKit</li>
          <li>Enter the text you want to encrypt</li>
          <li>Enter a strong secret key (password)</li>
          <li>Click <strong>Encrypt</strong></li>
          <li>Copy the encrypted ciphertext</li>
        </ol>
        <h4>Decryption Steps</h4>
        <ol>
          <li>Paste the encrypted ciphertext</li>
          <li>Enter the same secret key used for encryption</li>
          <li>Click <strong>Decrypt</strong></li>
          <li>The original plaintext is revealed</li>
        </ol>
        <p>⚠️ If you lose the key, the encrypted data cannot be recovered.</p>
        <p>🔧 <strong>Tier:</strong> 🆓 Free</p>
      `,

      digital_signature: `
        <h3>✍️ Digital Signature</h3>
        <p>Create and verify digital signatures to prove authenticity and integrity.</p>
        <h4>Signing Steps</h4>
        <ol>
          <li>Open <strong>Digital Signature</strong> on CryptoKit</li>
          <li>Enter the message to sign</li>
          <li>Provide your <strong>private key</strong></li>
          <li>Select the signature algorithm</li>
          <li>Click <strong>Sign</strong></li>
          <li>The digital signature is generated</li>
        </ol>
        <h4>Verification Steps</h4>
        <ol>
          <li>Enter the original message</li>
          <li>Paste the signature</li>
          <li>Provide the signer's <strong>public key</strong></li>
          <li>Click <strong>Verify</strong></li>
          <li>The tool confirms whether the signature is <strong>valid</strong> or <strong>invalid</strong></li>
        </ol>
        <p>💡 Signing does NOT encrypt the message — it only proves authenticity and integrity.</p>
        <p>🔧 <strong>Tier:</strong> 🆓 Free</p>
      `,

      general: `
        <p>Which CryptoKit tool would you like help with? I can guide you through:</p>
        <ul>
          <li>🔐 Hash Generator</li>
          <li>🔑 RSA Key Generator</li>
          <li>🛡️ File Integrity Checker</li>
          <li>🔐 Text Encrypt/Decrypt</li>
          <li>✍️ Digital Signature</li>
        </ul>
      `
    };
  }
}
