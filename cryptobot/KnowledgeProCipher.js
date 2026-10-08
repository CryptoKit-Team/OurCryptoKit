/**
 * KnowledgeProCipher — Pro Cipher tier knowledge base.
 */

export const knowledgeProCipher = {
  scanner: {
    what_is_scanner: `
      <h3>⚡ Crypto Security Scanner</h3>
      <p>A Crypto Security Scanner analyzes cryptographic implementations to identify potential <strong>weaknesses, misconfigurations, and deprecated algorithms</strong>.</p>
      <h4>What It Checks</h4>
      <ul>
        <li>Use of weak algorithms (MD5, SHA-1, DES, RC4)</li>
        <li>Insufficient key lengths (RSA < 2048, AES-128 when 256 is needed)</li>
        <li>Missing or weak padding schemes</li>
        <li>Hardcoded keys or secrets</li>
        <li>Insecure random number generation</li>
        <li>Deprecated TLS versions or cipher suites</li>
      </ul>
      <h4>Who Should Use It</h4>
      <ul>
        <li>Developers building security-sensitive applications</li>
        <li>Cybersecurity students and learners</li>
        <li>Security auditors reviewing code</li>
      </ul>
      <div class="cryptobot-tier-note cryptobot-tier--pro">
        <span>⚡ Pro Cipher Feature</span> — The interactive Crypto Security Scanner is available with Pro Cipher access. You can still ask me about cryptographic security concepts.
      </div>
    `,
    weakness: `
      <h3>What is Cryptographic Weakness?</h3>
      <p>A cryptographic weakness is any flaw in a cryptographic system that could allow an attacker to break, bypass, or degrade its security guarantees.</p>
      <h4>Common Weaknesses</h4>
      <ul>
        <li><strong>Weak algorithms</strong> — Using MD5, SHA-1, DES, or RC4</li>
        <li><strong>Short keys</strong> — RSA < 2048 bits, AES-128 in high-security contexts</li>
        <li><strong>Poor randomness</strong> — Predictable keys, nonces, or IVs</li>
        <li><strong>No padding or wrong padding</strong> — Textbook RSA, ECB mode</li>
        <li><strong>Key reuse</strong> — Using the same key/nonce combination</li>
        <li><strong>Hardcoded secrets</strong> — Keys embedded in source code</li>
      </ul>
    `,
    detect_weak: `
      <h3>How Can Weak Algorithms Be Detected?</h3>
      <ul>
        <li>Scan code for references to deprecated functions (md5(), sha1(), DES)</li>
        <li>Check TLS configurations for weak cipher suites</li>
        <li>Verify key lengths meet current recommendations</li>
        <li>Review random number generation sources</li>
        <li>Analyze padding schemes and modes of operation</li>
      </ul>
      <p>⚡ CryptoKit's <strong>Crypto Security Scanner</strong> (Pro Cipher) automates this analysis.</p>
    `,
    deprecated: `
      <h3>What is a Deprecated Cipher?</h3>
      <p>A deprecated cipher is a cryptographic algorithm that is no longer considered secure and is officially discouraged from use.</p>
      <h4>Examples</h4>
      <ul>
        <li><strong>DES</strong> — 56-bit key, easily brute-forced</li>
        <li><strong>3DES</strong> — Being phased out due to small block size</li>
        <li><strong>RC4</strong> — Biases in output stream; banned in TLS</li>
        <li><strong>MD5</strong> — Collision attacks</li>
        <li><strong>SHA-1</strong> — Collision attacks demonstrated</li>
      </ul>
    `,
    key_management: `
      <h3>What is Insecure Key Management?</h3>
      <p>Insecure key management refers to poor practices in generating, storing, distributing, and rotating cryptographic keys.</p>
      <h4>Common Issues</h4>
      <ul>
        <li>Hardcoding keys in source code</li>
        <li>Storing keys in plaintext configuration files</li>
        <li>Not rotating keys regularly</li>
        <li>Using weak or predictable key generation</li>
        <li>Sharing private keys over insecure channels</li>
        <li>Not revoking compromised keys</li>
      </ul>
    `,
    weak_config: `
      <h3>What is a Weak Cryptographic Configuration?</h3>
      <p>A weak configuration uses cryptography in a way that reduces its effectiveness:</p>
      <ul>
        <li>Using ECB mode (reveals patterns in data)</li>
        <li>Reusing IVs or nonces</li>
        <li>Not using authenticated encryption (e.g., using CBC without HMAC)</li>
        <li>Using default or example keys</li>
        <li>Disabling certificate validation</li>
      </ul>
    `
  },

  rsa_lab: {
    key_strength: `
      <h3>⚡ RSA Key Strength</h3>
      <p>RSA key strength depends on the key size and the quality of key generation:</p>
      <table class="cryptobot-table">
        <thead><tr><th>Key Size</th><th>Security Level (bits)</th><th>Status</th></tr></thead>
        <tbody>
          <tr><td>1024</td><td>~80</td><td>⚠️ Insecure — should not be used</td></tr>
          <tr><td>2048</td><td>~112</td><td>✅ Minimum recommended</td></tr>
          <tr><td>3072</td><td>~128</td><td>✅ Good</td></tr>
          <tr><td>4096</td><td>~140+</td><td>✅ Strong</td></tr>
        </tbody>
      </table>
      <div class="cryptobot-tier-note cryptobot-tier--pro">
        <span>⚡ Pro Cipher Feature</span> — The Advanced RSA Lab provides detailed key analysis tools.
      </div>
    `,
    rsa_crt: `
      <h3>What is RSA-CRT?</h3>
      <p>RSA-CRT (Chinese Remainder Theorem) is an optimization technique that speeds up RSA private-key operations.</p>
      <h4>How It Works</h4>
      <ul>
        <li>Instead of computing m = c^d mod n directly, CRT splits the computation using p and q separately</li>
        <li>Computes m₁ = c^(d mod p-1) mod p and m₂ = c^(d mod q-1) mod q</li>
        <li>Combines the results using CRT</li>
        <li>Approximately <strong>4× faster</strong> than standard RSA decryption</li>
      </ul>
      <p>⚠️ Requires careful implementation to avoid fault attacks.</p>
    `,
    padding: `
      <h3>RSA Padding</h3>
      <p>RSA padding adds structure and randomness to the plaintext before encryption or signing. Without proper padding, RSA is vulnerable to multiple attacks.</p>
      <h4>Padding Schemes</h4>
      <ul>
        <li><strong>OAEP</strong> — Recommended for encryption; adds randomness and prevents chosen-ciphertext attacks</li>
        <li><strong>PSS</strong> — Recommended for signatures; provides probabilistic security</li>
        <li><strong>PKCS#1 v1.5</strong> — Legacy; vulnerable to Bleichenbacher's attack in encryption mode</li>
      </ul>
    `,
    textbook_rsa: `
      <h3>Why is Textbook RSA Unsafe?</h3>
      <p>Textbook (raw) RSA applies the algorithm directly without padding: c = m^e mod n.</p>
      <h4>Vulnerabilities</h4>
      <ul>
        <li><strong>Deterministic</strong> — Same plaintext always produces the same ciphertext</li>
        <li><strong>Malleable</strong> — Attacker can manipulate ciphertext to produce related plaintext</li>
        <li><strong>Small message attack</strong> — Small values of m can be easily recovered</li>
        <li><strong>No semantic security</strong> — Leaks information about the plaintext</li>
      </ul>
      <p>💡 <strong>Always use proper padding</strong> (OAEP for encryption, PSS for signatures).</p>
    `,
    mistakes: `
      <h3>Common RSA Implementation Mistakes</h3>
      <ul>
        <li>Using textbook RSA without padding</li>
        <li>Using PKCS#1 v1.5 padding for new implementations</li>
        <li>Key sizes smaller than 2048 bits</li>
        <li>Sharing or leaking private key components</li>
        <li>Using the same key for both encryption and signing</li>
        <li>Poor random number generation for key creation</li>
        <li>Not validating inputs/outputs properly</li>
        <li>Vulnerable to timing side-channel attacks</li>
      </ul>
    `
  },

  ecc: {
    what_is_ecc: `
      <h3>⚡ What is Elliptic Curve Cryptography (ECC)?</h3>
      <p>ECC is a family of asymmetric cryptographic algorithms based on the mathematical structure of <strong>elliptic curves over finite fields</strong>.</p>
      <h4>Key Points</h4>
      <ul>
        <li>Provides the same security as RSA with <strong>much smaller key sizes</strong></li>
        <li>A 256-bit ECC key ≈ 3072-bit RSA key in security</li>
        <li>Faster operations, smaller signatures, and less bandwidth</li>
        <li>Used in TLS, SSH, cryptocurrency (Bitcoin, Ethereum), and modern protocols</li>
      </ul>
      <div class="cryptobot-tier-note cryptobot-tier--pro">
        <span>⚡ Pro Cipher Feature</span> — The Advanced ECC Suite is available with Pro Cipher access. I can explain ECC concepts here.
      </div>
    `,
    ecdsa: `
      <h3>What is ECDSA?</h3>
      <p>ECDSA (Elliptic Curve Digital Signature Algorithm) is a digital signature algorithm based on ECC.</p>
      <h4>Key Points</h4>
      <ul>
        <li>Creates digital signatures using elliptic curve private keys</li>
        <li>Verified using the corresponding public key</li>
        <li>Smaller signatures than RSA with equivalent security</li>
        <li>Used in Bitcoin, Ethereum, TLS, and SSH</li>
      </ul>
      <h4>Workflow</h4>
      <ol>
        <li>Hash the message</li>
        <li>Generate a random k value</li>
        <li>Compute signature components (r, s) using the private key</li>
        <li>Verify using the public key</li>
      </ol>
    `,
    ecdh: `
      <h3>What is ECDH?</h3>
      <p>ECDH (Elliptic Curve Diffie-Hellman) is a key agreement protocol that allows two parties to establish a <strong>shared secret</strong> over an insecure channel.</p>
      <h4>Key Points</h4>
      <ul>
        <li>Each party generates an ECC key pair</li>
        <li>They exchange public keys</li>
        <li>Each party computes the shared secret using their private key and the other's public key</li>
        <li>The shared secret can be used to derive encryption keys</li>
      </ul>
    `,
    ecdh_how: `
      <h3>How Does ECDH Work?</h3>
      <ol>
        <li><strong>Alice</strong> generates private key <em>a</em> and public key <em>A = a × G</em></li>
        <li><strong>Bob</strong> generates private key <em>b</em> and public key <em>B = b × G</em></li>
        <li>They exchange public keys A and B</li>
        <li><strong>Alice</strong> computes shared secret: <em>S = a × B = a × b × G</em></li>
        <li><strong>Bob</strong> computes shared secret: <em>S = b × A = b × a × G</em></li>
        <li>Both arrive at the same point S (shared secret)</li>
      </ol>
      <p>💡 An eavesdropper who sees A and B cannot compute S without knowing a or b (Elliptic Curve Discrete Logarithm Problem).</p>
    `,
    curve: `
      <h3>What is an Elliptic Curve?</h3>
      <p>In ECC, an elliptic curve is defined by the equation: <strong>y² = x³ + ax + b</strong> over a finite field.</p>
      <ul>
        <li>Points on the curve form a mathematical group</li>
        <li>The "point addition" and "scalar multiplication" operations are the foundation of ECC</li>
        <li>Standard curves include P-256, P-384, secp256k1, and Curve25519</li>
      </ul>
    `,
    generator_point: `
      <h3>What is a Generator Point?</h3>
      <p>The generator point (G) is a predefined point on the elliptic curve that serves as the starting point for key generation.</p>
      <ul>
        <li>All public keys are computed as multiples of G</li>
        <li>Public Key = Private Key × G (scalar multiplication)</li>
        <li>G is defined by the curve standard and is publicly known</li>
      </ul>
    `,
    private_scalar: `
      <h3>What is a Private Scalar?</h3>
      <p>In ECC, the private key is a randomly chosen large integer (scalar) used to multiply the generator point.</p>
      <ul>
        <li>Must be kept secret</li>
        <li>Used to compute the public key: Public Key = Private Scalar × G</li>
        <li>Must be within the valid range for the chosen curve</li>
      </ul>
    `,
    public_point: `
      <h3>What is a Public Point?</h3>
      <p>The public key in ECC is a point on the elliptic curve, computed as:</p>
      <p><strong>Public Point = Private Scalar × Generator Point</strong></p>
      <ul>
        <li>Consists of (x, y) coordinates on the curve</li>
        <li>Can be shared openly</li>
        <li>Computing the private scalar from the public point is computationally infeasible (ECDLP)</li>
      </ul>
    `,
    ecc_vs_rsa: `
      <h3>ECC vs RSA</h3>
      <table class="cryptobot-table">
        <thead><tr><th>Feature</th><th>ECC</th><th>RSA</th></tr></thead>
        <tbody>
          <tr><td>Key Size (128-bit security)</td><td>~256 bits</td><td>~3072 bits</td></tr>
          <tr><td>Performance</td><td>Faster</td><td>Slower</td></tr>
          <tr><td>Signature Size</td><td>Smaller</td><td>Larger</td></tr>
          <tr><td>Bandwidth</td><td>Lower</td><td>Higher</td></tr>
          <tr><td>Adoption</td><td>Growing (TLS, Bitcoin)</td><td>Legacy standard</td></tr>
          <tr><td>Mathematical Basis</td><td>Elliptic Curve DLP</td><td>Integer Factorization</td></tr>
        </tbody>
      </table>
    `,
    smaller_keys: `
      <h3>Why Does ECC Use Smaller Keys?</h3>
      <p>ECC's security is based on the <strong>Elliptic Curve Discrete Logarithm Problem (ECDLP)</strong>, which is harder to solve per bit than RSA's integer factorization problem.</p>
      <ul>
        <li>256-bit ECC ≈ 3072-bit RSA in security</li>
        <li>This means ECC achieves the same security with 10-15× smaller keys</li>
        <li>Results in faster computations, smaller certificates, and less bandwidth</li>
      </ul>
    `,
    secp256k1: `
      <h3>What is secp256k1?</h3>
      <p>secp256k1 is a specific elliptic curve defined by the SEC (Standards for Efficient Cryptography).</p>
      <h4>Key Points</h4>
      <ul>
        <li>Equation: y² = x³ + 7 (a = 0, b = 7)</li>
        <li>256-bit prime field</li>
        <li>Used by <strong>Bitcoin</strong> and other cryptocurrencies for key generation and transaction signing</li>
        <li>Chosen for efficiency properties rather than being a NIST curve</li>
        <li>Not considered backdoored (unlike some concerns about NIST P-256)</li>
      </ul>
    `
  }
};
