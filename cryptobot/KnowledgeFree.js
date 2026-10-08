/**
 * KnowledgeFree — Free tier knowledge base.
 */

export const knowledgeFree = {
  basics: {
    cryptography: `
      <h3>🔐 What is Cryptography?</h3>
      <p>Cryptography is the science of securing information by transforming it into an unreadable format, ensuring that only authorized parties can access it.</p>
      <h4>Key Points</h4>
      <ul>
        <li>Protects data <strong>confidentiality</strong> — only intended recipients can read it</li>
        <li>Ensures <strong>integrity</strong> — data hasn't been altered</li>
        <li>Provides <strong>authenticity</strong> — verifies the sender's identity</li>
        <li>Supports <strong>non-repudiation</strong> — sender cannot deny having sent the message</li>
      </ul>
      <p>💡 <strong>Example:</strong> When you visit a website using HTTPS, cryptography encrypts the data between your browser and the server.</p>
      <p>🔧 <strong>CryptoKit Tools:</strong> Explore Hash Generator, Text Encrypt/Decrypt, and Digital Signature tools to see cryptography in action.</p>
    `,
    encryption: `
      <h3>🔐 What is Encryption?</h3>
      <p>Encryption is the process of converting readable data (<strong>plaintext</strong>) into an unreadable format (<strong>ciphertext</strong>) using a cryptographic algorithm and a <strong>key</strong>.</p>
      <h4>Key Points</h4>
      <ul>
        <li>Encryption is <strong>reversible</strong> — ciphertext can be decrypted back to plaintext with the correct key</li>
        <li>Without the key, the ciphertext should be computationally infeasible to read</li>
        <li>Two main types: <strong>symmetric</strong> (same key) and <strong>asymmetric</strong> (public/private key pair)</li>
      </ul>
      <p>💡 <strong>Example:</strong> AES-256 encrypts your text into ciphertext that can only be decrypted with the correct secret key.</p>
      <p>🔧 <strong>CryptoKit Tool:</strong> Try the Text Encrypt/Decrypt tool.</p>
    `,
    decryption: `
      <h3>🔓 What is Decryption?</h3>
      <p>Decryption is the reverse process of encryption — it converts <strong>ciphertext</strong> back into readable <strong>plaintext</strong> using the correct decryption key.</p>
      <h4>Key Points</h4>
      <ul>
        <li>Requires the correct key (symmetric key or private key)</li>
        <li>Without the correct key, decryption should be impossible</li>
        <li>The algorithm must match the one used for encryption</li>
      </ul>
    `,
    encryption_vs_hashing: `
      <h3>Encryption vs Hashing</h3>
      <table class="cryptobot-table">
        <thead><tr><th>Feature</th><th>Encryption</th><th>Hashing</th></tr></thead>
        <tbody>
          <tr><td>Reversible</td><td>Yes (with key)</td><td>No (one-way)</td></tr>
          <tr><td>Key Required</td><td>Yes</td><td>No</td></tr>
          <tr><td>Output Size</td><td>Variable</td><td>Fixed length</td></tr>
          <tr><td>Purpose</td><td>Confidentiality</td><td>Integrity</td></tr>
          <tr><td>Example</td><td>AES-256</td><td>SHA-256</td></tr>
        </tbody>
      </table>
    `,
    encryption_vs_encoding: `
      <h3>Encryption vs Encoding</h3>
      <table class="cryptobot-table">
        <thead><tr><th>Feature</th><th>Encryption</th><th>Encoding</th></tr></thead>
        <tbody>
          <tr><td>Purpose</td><td>Security / confidentiality</td><td>Data representation</td></tr>
          <tr><td>Key Required</td><td>Yes</td><td>No</td></tr>
          <tr><td>Security</td><td>Designed to prevent unauthorized access</td><td>Not a security mechanism</td></tr>
          <tr><td>Reversible</td><td>Only with key</td><td>Freely reversible</td></tr>
          <tr><td>Examples</td><td>AES, RSA</td><td>Base64, UTF-8, URL encoding</td></tr>
        </tbody>
      </table>
      <p>⚠️ <strong>Important:</strong> Encoding (like Base64) is NOT encryption. Anyone can decode Base64 without a key.</p>
    `,
    plaintext: `
      <h3>What is Plaintext?</h3>
      <p>Plaintext is the original, readable data before it is encrypted. It can be text, a file, or any data that needs to be protected.</p>
      <p>💡 Once plaintext is encrypted, it becomes <strong>ciphertext</strong>.</p>
    `,
    ciphertext: `
      <h3>What is Ciphertext?</h3>
      <p>Ciphertext is the result of encrypting plaintext. It appears as scrambled, unreadable data.</p>
      <p>💡 Ciphertext can only be converted back to plaintext using the correct decryption key.</p>
    `,
    cryptographic_key: `
      <h3>🔑 What is a Cryptographic Key?</h3>
      <p>A cryptographic key is a piece of data (typically a string of bits) used by cryptographic algorithms to encrypt, decrypt, sign, or verify data.</p>
      <h4>Key Points</h4>
      <ul>
        <li><strong>Symmetric key</strong> — A single shared secret key used for both encryption and decryption</li>
        <li><strong>Asymmetric keys</strong> — A pair: public key (shared) and private key (secret)</li>
        <li>Key length directly affects security — longer keys are harder to break</li>
        <li>Keys must be kept secret and managed securely</li>
      </ul>
    `,
    symmetric: `
      <h3>What is Symmetric Cryptography?</h3>
      <p>Symmetric cryptography uses a <strong>single shared key</strong> for both encryption and decryption.</p>
      <h4>Key Points</h4>
      <ul>
        <li>Fast and efficient for large amounts of data</li>
        <li>The key must be shared securely between parties</li>
        <li>Examples: AES, ChaCha20, 3DES</li>
      </ul>
      <p>⚠️ <strong>Challenge:</strong> How do you securely share the key? This is known as the key distribution problem.</p>
    `,
    asymmetric: `
      <h3>What is Asymmetric Cryptography?</h3>
      <p>Asymmetric cryptography uses a <strong>pair of keys</strong>: a public key and a private key.</p>
      <h4>Key Points</h4>
      <ul>
        <li>Public key — can be shared openly; used to encrypt or verify</li>
        <li>Private key — must be kept secret; used to decrypt or sign</li>
        <li>Solves the key distribution problem of symmetric cryptography</li>
        <li>Slower than symmetric encryption</li>
        <li>Examples: RSA, ECC (ECDSA, ECDH)</li>
      </ul>
    `,
    symmetric_vs_asymmetric: `
      <h3>Symmetric vs Asymmetric Cryptography</h3>
      <table class="cryptobot-table">
        <thead><tr><th>Feature</th><th>Symmetric</th><th>Asymmetric</th></tr></thead>
        <tbody>
          <tr><td>Keys</td><td>One shared key</td><td>Public + Private key pair</td></tr>
          <tr><td>Speed</td><td>Fast</td><td>Slow</td></tr>
          <tr><td>Key Distribution</td><td>Challenging</td><td>Easier (public key is shared)</td></tr>
          <tr><td>Examples</td><td>AES, ChaCha20</td><td>RSA, ECC</td></tr>
          <tr><td>Use Case</td><td>Bulk data encryption</td><td>Key exchange, digital signatures</td></tr>
        </tbody>
      </table>
      <p>💡 <strong>In practice:</strong> Asymmetric encryption secures the symmetric key, then symmetric encryption handles the data (hybrid encryption).</p>
    `,
    public_key: `
      <h3>🔑 What is a Public Key?</h3>
      <p>A public key is the openly shared component of an asymmetric key pair. It is used to <strong>encrypt data</strong> or <strong>verify digital signatures</strong>.</p>
      <ul>
        <li>Can be freely distributed</li>
        <li>Cannot decrypt data or create signatures (that requires the private key)</li>
        <li>Mathematically linked to the corresponding private key</li>
      </ul>
    `,
    private_key: `
      <h3>🔑 What is a Private Key?</h3>
      <p>A private key is the secret component of an asymmetric key pair. It is used to <strong>decrypt data</strong> or <strong>create digital signatures</strong>.</p>
      <ul>
        <li>Must be kept secret at all times</li>
        <li>If compromised, all encrypted data and signatures are at risk</li>
        <li>Mathematically linked to the corresponding public key</li>
      </ul>
      <p>⚠️ <strong>Never share your private key.</strong></p>
    `,
    nonce: `
      <h3>What is a Nonce?</h3>
      <p>A nonce (<strong>Number used Once</strong>) is a random or unique value used only once in a cryptographic operation.</p>
      <h4>Key Points</h4>
      <ul>
        <li>Prevents replay attacks</li>
        <li>Ensures that the same plaintext produces different ciphertext each time</li>
        <li>Used in encryption (e.g., AES-GCM), authentication protocols, and blockchain mining</li>
      </ul>
    `,
    salt: `
      <h3>What is a Salt?</h3>
      <p>A salt is a random value added to input data before hashing, primarily used in password hashing.</p>
      <h4>Key Points</h4>
      <ul>
        <li>Prevents precomputed attacks (rainbow tables)</li>
        <li>Ensures identical passwords produce different hashes</li>
        <li>Should be unique per password</li>
        <li>Stored alongside the hash (it doesn't need to be secret)</li>
      </ul>
    `,
    entropy: `
      <h3>What is Entropy?</h3>
      <p>In cryptography, entropy measures the <strong>randomness</strong> or <strong>unpredictability</strong> of data, typically measured in bits.</p>
      <h4>Key Points</h4>
      <ul>
        <li>Higher entropy = more random = more secure</li>
        <li>Cryptographic keys need high entropy to resist brute-force attacks</li>
        <li>Password entropy depends on length and character diversity</li>
        <li>A password with 80+ bits of entropy is considered strong</li>
      </ul>
    `
  },

  hashing: {
    what_is_hashing: `
      <h3>🔐 What is Hashing?</h3>
      <p>Hashing is the process of converting input data of any size into a fixed-length string of characters (called a <strong>hash digest</strong>) using a mathematical function.</p>
      <h4>Key Properties</h4>
      <ul>
        <li><strong>One-way</strong> — Cannot be reversed to obtain the original input</li>
        <li><strong>Deterministic</strong> — Same input always produces the same hash</li>
        <li><strong>Avalanche effect</strong> — A tiny change in input produces a completely different hash</li>
        <li><strong>Fixed output size</strong> — Regardless of input size</li>
        <li><strong>Collision resistant</strong> — Extremely hard to find two inputs with the same hash</li>
      </ul>
      <p>💡 <strong>Example:</strong> SHA-256 always outputs a 256-bit (64 hex character) digest.</p>
      <p>🔧 <strong>CryptoKit Tool:</strong> Try the Hash Generator (🆓 Free).</p>
    `,
    sha256: `
      <h3>What is SHA-256?</h3>
      <p>SHA-256 (Secure Hash Algorithm 256-bit) is a cryptographic hash function from the SHA-2 family, producing a 256-bit (32-byte) digest.</p>
      <h4>Key Points</h4>
      <ul>
        <li>Output: 64 hexadecimal characters</li>
        <li>Widely used in security applications, TLS, blockchain (Bitcoin), and file verification</li>
        <li>No known practical collisions</li>
        <li>Recommended for most security-sensitive applications</li>
      </ul>
      <p>🔧 <strong>CryptoKit:</strong> Available in Hash Generator (🆓 Free).</p>
    `,
    sha512: `
      <h3>What is SHA-512?</h3>
      <p>SHA-512 is a cryptographic hash function from the SHA-2 family, producing a 512-bit (64-byte) digest.</p>
      <h4>Key Points</h4>
      <ul>
        <li>Output: 128 hexadecimal characters</li>
        <li>Offers a larger security margin than SHA-256</li>
        <li>Faster on 64-bit systems than SHA-256</li>
        <li>Used in security-critical applications</li>
      </ul>
    `,
    sha1: `
      <h3>What is SHA-1?</h3>
      <p>SHA-1 (Secure Hash Algorithm 1) produces a 160-bit (20-byte) hash digest.</p>
      <h4>Key Points</h4>
      <ul>
        <li>Output: 40 hexadecimal characters</li>
        <li>⚠️ <strong>Deprecated</strong> — Collision attacks have been demonstrated (SHAttered, 2017)</li>
        <li>Should not be used for security-sensitive applications</li>
        <li>Still found in some legacy systems</li>
      </ul>
      <p>💡 <strong>Recommendation:</strong> Use SHA-256 or SHA-512 instead.</p>
    `,
    md5: `
      <h3>What is MD5?</h3>
      <p>MD5 (Message Digest Algorithm 5) produces a 128-bit (16-byte) hash.</p>
      <h4>Key Points</h4>
      <ul>
        <li>Output: 32 hexadecimal characters</li>
        <li>⚠️ <strong>Cryptographically broken</strong> — Practical collision attacks exist</li>
        <li>Should NOT be used for security (password hashing, integrity verification, signatures)</li>
        <li>Sometimes still used for non-security checksums</li>
      </ul>
      <p>⚠️ <strong>Avoid MD5 for any security purpose.</strong></p>
    `,
    blake2: `
      <h3>What is BLAKE2?</h3>
      <p>BLAKE2 is a modern cryptographic hash function designed to be faster than MD5 and SHA-1 while being as secure as SHA-256.</p>
      <h4>Key Points</h4>
      <ul>
        <li>Faster than SHA-256 on most platforms</li>
        <li>Available in two variants: BLAKE2b (64-bit optimized) and BLAKE2s (32-bit optimized)</li>
        <li>Used in modern security applications, file systems, and password hashing</li>
        <li>Considered highly secure</li>
      </ul>
    `,
    weak_algorithms: `
      <h3>⚠️ Weak Hashing Algorithms</h3>
      <p>The following hash algorithms are considered weak or broken for security purposes:</p>
      <ul>
        <li><strong>MD5</strong> — Practical collision attacks exist. Avoid for all security uses.</li>
        <li><strong>SHA-1</strong> — Collision attacks demonstrated. Deprecated for most security applications.</li>
        <li><strong>MD4</strong> — Severely broken. Not used.</li>
        <li><strong>MD2</strong> — Obsolete.</li>
      </ul>
      <h4>Recommended Alternatives</h4>
      <ul>
        <li>SHA-256 or SHA-512 (SHA-2 family)</li>
        <li>SHA-3</li>
        <li>BLAKE2 / BLAKE3</li>
      </ul>
    `,
    md5_insecure: `
      <h3>Why Should MD5 Not Be Used for Security?</h3>
      <p>MD5 has been cryptographically broken:</p>
      <ul>
        <li><strong>Collision attacks</strong> are practical — two different inputs can produce the same MD5 hash</li>
        <li>Attackers can create forged files, certificates, or data with matching hashes</li>
        <li>Preimage resistance is weakened</li>
        <li>MD5 password hashes can be cracked quickly using rainbow tables and brute force</li>
      </ul>
      <p>💡 <strong>Use SHA-256 or BLAKE2 instead.</strong></p>
    `,
    sha1_deprecated: `
      <h3>Why is SHA-1 Deprecated?</h3>
      <p>SHA-1 has been shown to be vulnerable to collision attacks:</p>
      <ul>
        <li>In 2017, the <strong>SHAttered</strong> attack demonstrated a practical SHA-1 collision</li>
        <li>Two different PDF files were created with the same SHA-1 hash</li>
        <li>Major browsers and certificate authorities have stopped trusting SHA-1 certificates</li>
        <li>NIST recommends transitioning away from SHA-1</li>
      </ul>
    `,
    hash_irreversible: `
      <h3>Can a Hash Be Decrypted?</h3>
      <p><strong>No.</strong> Hashing is a <strong>one-way function</strong>. You cannot mathematically reverse a hash to obtain the original input.</p>
      <h4>Important Distinctions</h4>
      <ul>
        <li>Hashing ≠ Encryption. Encryption is reversible with a key; hashing is not.</li>
        <li>Attackers can attempt to <strong>guess</strong> the input by hashing many possibilities (brute force or dictionary attacks)</li>
        <li>This is why strong, salted hashing is important for passwords</li>
      </ul>
    `,
    collision: `
      <h3>What is a Hash Collision?</h3>
      <p>A hash collision occurs when two different inputs produce the <strong>same hash output</strong>.</p>
      <ul>
        <li>Collisions are theoretically inevitable (pigeonhole principle — infinite inputs map to finite outputs)</li>
        <li>A good hash function makes collisions <strong>computationally infeasible</strong> to find</li>
        <li>If collisions can be found easily, the hash function is considered <strong>broken</strong></li>
        <li>MD5 and SHA-1 have known practical collision attacks</li>
      </ul>
    `,
    avalanche: `
      <h3>What is the Avalanche Effect?</h3>
      <p>The avalanche effect means that a <strong>tiny change in input</strong> (even a single bit) produces a <strong>dramatically different hash output</strong>.</p>
      <p>💡 <strong>Example:</strong></p>
      <ul>
        <li>"hello" → <code>2cf24dba5...</code></li>
        <li>"Hello" → <code>185f8db32...</code></li>
      </ul>
      <p>This property is essential for security — it prevents attackers from deducing the input from similar outputs.</p>
    `,
    digest: `
      <h3>What is a Hash Digest?</h3>
      <p>A hash digest (also called hash value or hash output) is the fixed-length output produced by a hash function.</p>
      <ul>
        <li>SHA-256 produces a 256-bit (64-character hex) digest</li>
        <li>SHA-512 produces a 512-bit (128-character hex) digest</li>
        <li>The digest uniquely represents the input data</li>
      </ul>
    `
  },

  rsa: {
    what_is_rsa: `
      <h3>🔑 What is RSA?</h3>
      <p>RSA (Rivest–Shamir–Adleman) is an <strong>asymmetric cryptographic algorithm</strong> used for encryption, digital signatures, and key exchange.</p>
      <h4>Key Points</h4>
      <ul>
        <li>Uses a <strong>public/private key pair</strong></li>
        <li>Security is based on the difficulty of factoring large prime numbers</li>
        <li>Public key encrypts; private key decrypts</li>
        <li>Private key signs; public key verifies</li>
        <li>Commonly used key sizes: 2048-bit and 4096-bit</li>
      </ul>
      <p>🔧 <strong>CryptoKit Tool:</strong> RSA Key Generator (🆓 Free).</p>
    `,
    how_rsa_works: `
      <h3>How Does RSA Work?</h3>
      <h4>1. Key Generation</h4>
      <ul>
        <li>Choose two large prime numbers (p, q)</li>
        <li>Compute n = p × q (the modulus)</li>
        <li>Compute φ(n) = (p-1)(q-1)</li>
        <li>Choose e (public exponent, commonly 65537)</li>
        <li>Compute d = e⁻¹ mod φ(n) (private exponent)</li>
        <li>Public key = (e, n), Private key = (d, n)</li>
      </ul>
      <h4>2. Encryption</h4>
      <p>Ciphertext = Plaintext^e mod n</p>
      <h4>3. Decryption</h4>
      <p>Plaintext = Ciphertext^d mod n</p>
      <p>💡 The security relies on the fact that factoring n back into p and q is computationally infeasible for large key sizes.</p>
    `,
    rsa_public_key: `
      <h3>What is an RSA Public Key?</h3>
      <p>The RSA public key consists of the <strong>modulus (n)</strong> and the <strong>public exponent (e)</strong>.</p>
      <ul>
        <li>Freely shared with anyone</li>
        <li>Used to <strong>encrypt</strong> data or <strong>verify</strong> signatures</li>
        <li>Cannot be used to decrypt or sign</li>
      </ul>
    `,
    rsa_private_key: `
      <h3>What is an RSA Private Key?</h3>
      <p>The RSA private key consists of the <strong>modulus (n)</strong> and the <strong>private exponent (d)</strong>.</p>
      <ul>
        <li>Must be kept <strong>secret</strong></li>
        <li>Used to <strong>decrypt</strong> data or <strong>create</strong> digital signatures</li>
        <li>If compromised, regenerate the key pair immediately</li>
      </ul>
      <p>⚠️ Never share your private key.</p>
    `,
    rsa2048: `
      <h3>What is RSA-2048?</h3>
      <p>RSA-2048 uses a 2048-bit key, currently considered the <strong>minimum recommended key size</strong> for RSA.</p>
      <ul>
        <li>Provides approximately 112 bits of security</li>
        <li>Suitable for most current applications</li>
        <li>Expected to remain secure until at least 2030 (against classical computers)</li>
      </ul>
    `,
    rsa4096: `
      <h3>What is RSA-4096?</h3>
      <p>RSA-4096 uses a 4096-bit key, providing a larger security margin.</p>
      <ul>
        <li>Approximately 140+ bits of security</li>
        <li>Slower than RSA-2048 for encryption/decryption/signing</li>
        <li>Recommended for high-security or long-term protection scenarios</li>
      </ul>
    `,
    rsa_enc_vs_sig: `
      <h3>RSA Encryption vs RSA Signature</h3>
      <table class="cryptobot-table">
        <thead><tr><th>Feature</th><th>RSA Encryption</th><th>RSA Signature</th></tr></thead>
        <tbody>
          <tr><td>Purpose</td><td>Confidentiality</td><td>Authenticity & Integrity</td></tr>
          <tr><td>Encrypt/Sign with</td><td>Public key</td><td>Private key</td></tr>
          <tr><td>Decrypt/Verify with</td><td>Private key</td><td>Public key</td></tr>
          <tr><td>Padding</td><td>OAEP recommended</td><td>PSS recommended</td></tr>
        </tbody>
      </table>
    `,
    rsa_oaep: `
      <h3>What is RSA-OAEP?</h3>
      <p>RSA-OAEP (Optimal Asymmetric Encryption Padding) is the recommended padding scheme for RSA encryption.</p>
      <ul>
        <li>Adds randomness to prevent deterministic encryption</li>
        <li>Protects against chosen-ciphertext attacks</li>
        <li>Should always be used instead of PKCS#1 v1.5 for new implementations</li>
      </ul>
    `,
    rsa_pss: `
      <h3>What is RSA-PSS?</h3>
      <p>RSA-PSS (Probabilistic Signature Scheme) is the recommended padding scheme for RSA digital signatures.</p>
      <ul>
        <li>Adds randomness to signatures</li>
        <li>Provides provable security under standard assumptions</li>
        <li>Preferred over PKCS#1 v1.5 signatures</li>
      </ul>
    `,
    rsa_slow: `
      <h3>Why is RSA Slower Than Symmetric Encryption?</h3>
      <p>RSA involves <strong>modular exponentiation with very large numbers</strong> (2048+ bits), which is computationally expensive compared to symmetric operations like AES.</p>
      <ul>
        <li>RSA: Complex modular arithmetic on large primes</li>
        <li>AES: Efficient bitwise operations and substitutions</li>
        <li>RSA is typically 100-1000× slower than AES</li>
      </ul>
      <p>💡 This is why RSA is usually used to encrypt a small symmetric key, which then encrypts the data (hybrid encryption).</p>
    `,
    rsa_keygen: `
      <h3>How Are RSA Keys Generated?</h3>
      <ol>
        <li>Generate two large random prime numbers <strong>p</strong> and <strong>q</strong></li>
        <li>Compute <strong>n = p × q</strong> (the modulus)</li>
        <li>Compute <strong>φ(n) = (p-1)(q-1)</strong> (Euler's totient)</li>
        <li>Choose <strong>e</strong> (public exponent, commonly 65537)</li>
        <li>Compute <strong>d = e⁻¹ mod φ(n)</strong> (private exponent, using extended Euclidean algorithm)</li>
        <li><strong>Public key:</strong> (e, n)</li>
        <li><strong>Private key:</strong> (d, n)</li>
      </ol>
      <p>🔧 <strong>CryptoKit Tool:</strong> Use the RSA Key Generator to create key pairs instantly.</p>
    `
  },

  file_integrity: {
    what_is_file_integrity: `
      <h3>🛡️ What is File Integrity?</h3>
      <p>File integrity refers to the assurance that a file has <strong>not been altered, corrupted, or tampered with</strong>.</p>
      <ul>
        <li>Cryptographic hashes (like SHA-256) create a unique fingerprint of a file</li>
        <li>If even one bit changes, the hash changes completely (avalanche effect)</li>
        <li>Comparing hashes before and after transfer/storage verifies integrity</li>
      </ul>
      <p>🔧 <strong>CryptoKit Tool:</strong> File Integrity Checker (🆓 Free).</p>
    `,
    how_checker_works: `
      <h3>How Does a File Integrity Checker Work?</h3>
      <ol>
        <li><strong>Original file</strong> → Generate a trusted hash (e.g., SHA-256)</li>
        <li><strong>Store or transmit</strong> the hash securely</li>
        <li><strong>Later</strong> → Generate the hash of the current file</li>
        <li><strong>Compare</strong> the two hashes</li>
        <li><strong>Match</strong> = File is intact | <strong>Different</strong> = File was modified</li>
      </ol>
    `,
    sha256_detect: `
      <h3>How Can SHA-256 Detect File Modification?</h3>
      <p>SHA-256 produces a unique 256-bit hash for any input. If the file is modified in any way — even changing a single byte — the resulting hash will be completely different.</p>
      <p>By comparing the expected hash with the current hash, you can detect any modification.</p>
    `,
    file_changed: `
      <h3>What Happens If a File Changes?</h3>
      <p>If a file is modified:</p>
      <ul>
        <li>Its cryptographic hash will change completely</li>
        <li>The new hash will NOT match the original trusted hash</li>
        <li>This indicates the file has been altered, corrupted, or tampered with</li>
      </ul>
    `,
    compare_hashes: `
      <h3>Why Compare Hashes?</h3>
      <p>Comparing hashes is a reliable way to verify that data hasn't been modified. Instead of comparing entire files byte-by-byte, you compare short fixed-length hash values.</p>
      <ul>
        <li>Efficient — comparing 64 hex characters instead of millions of bytes</li>
        <li>Reliable — cryptographic hashes are collision-resistant</li>
        <li>Widely used for software downloads, backups, forensics, and data transfer</li>
      </ul>
    `,
    checksum: `
      <h3>What is a Checksum?</h3>
      <p>A checksum is a small value derived from a data block, used to detect errors in transmission or storage.</p>
      <ul>
        <li>Simple checksums (CRC32) are fast but not collision-resistant</li>
        <li>Cryptographic hashes (SHA-256) provide stronger guarantees</li>
        <li>Checksums are for error detection; cryptographic hashes are for security</li>
      </ul>
    `,
    checksum_vs_hash: `
      <h3>Checksum vs Cryptographic Hash</h3>
      <table class="cryptobot-table">
        <thead><tr><th>Feature</th><th>Checksum</th><th>Cryptographic Hash</th></tr></thead>
        <tbody>
          <tr><td>Purpose</td><td>Error detection</td><td>Security & integrity</td></tr>
          <tr><td>Collision Resistance</td><td>Low</td><td>High</td></tr>
          <tr><td>Speed</td><td>Very fast</td><td>Slower</td></tr>
          <tr><td>Tamper Resistant</td><td>No</td><td>Yes</td></tr>
          <tr><td>Examples</td><td>CRC32, Adler32</td><td>SHA-256, BLAKE2</td></tr>
        </tbody>
      </table>
    `
  },

  digital_signatures: {
    what_is_signature: `
      <h3>✍️ What is a Digital Signature?</h3>
      <p>A digital signature is a cryptographic mechanism that provides <strong>authentication</strong>, <strong>integrity</strong>, and <strong>non-repudiation</strong> for digital data.</p>
      <h4>How It Works</h4>
      <ol>
        <li>The signer hashes the message</li>
        <li>The hash is encrypted with the signer's <strong>private key</strong> (creating the signature)</li>
        <li>The recipient decrypts the signature with the signer's <strong>public key</strong></li>
        <li>The recipient hashes the message independently and compares</li>
        <li>If hashes match, the signature is <strong>valid</strong></li>
      </ol>
      <p>🔧 <strong>CryptoKit Tool:</strong> Digital Signature (🆓 Free).</p>
    `,
    verification: `
      <h3>How Does Digital Signature Verification Work?</h3>
      <ol>
        <li>Obtain the signer's <strong>public key</strong></li>
        <li>Use the public key to decrypt the signature, revealing the original hash</li>
        <li>Hash the received message independently</li>
        <li>Compare the two hashes</li>
        <li><strong>Match</strong> → Signature is valid (authentic and unmodified)</li>
        <li><strong>Mismatch</strong> → Message was altered or signature is invalid</li>
      </ol>
    `,
    signing: `
      <h3>What is Signing?</h3>
      <p>Signing is the process of creating a digital signature using a <strong>private key</strong>. The signer produces a cryptographic proof that they authored or approved the data.</p>
    `,
    provides: `
      <h3>What Does a Digital Signature Provide?</h3>
      <ul>
        <li><strong>Integrity</strong> — Proves the data hasn't been modified</li>
        <li><strong>Authenticity</strong> — Proves who created the signature</li>
        <li><strong>Non-repudiation</strong> — The signer cannot deny having signed</li>
      </ul>
      <p>⚠️ A digital signature does <strong>NOT</strong> provide encryption or confidentiality. The data itself remains readable.</p>
    `,
    sig_vs_encrypt: `
      <h3>Does a Digital Signature Provide Encryption?</h3>
      <p><strong>No.</strong> A digital signature provides authenticity, integrity, and non-repudiation — but it does NOT encrypt the message. The message content remains visible.</p>
      <p>To protect both authenticity and confidentiality, use digital signatures combined with encryption.</p>
    `,
    rsa_vs_ecdsa: `
      <h3>RSA Signature vs ECDSA</h3>
      <table class="cryptobot-table">
        <thead><tr><th>Feature</th><th>RSA Signature</th><th>ECDSA</th></tr></thead>
        <tbody>
          <tr><td>Key Size</td><td>2048–4096 bits</td><td>256–384 bits</td></tr>
          <tr><td>Signature Size</td><td>Larger</td><td>Smaller</td></tr>
          <tr><td>Signing Speed</td><td>Slower</td><td>Faster</td></tr>
          <tr><td>Verification Speed</td><td>Faster</td><td>Slower</td></tr>
          <tr><td>Adoption</td><td>Widely supported (legacy)</td><td>Modern, growing (TLS, blockchain)</td></tr>
        </tbody>
      </table>
    `,
    integrity_auth_nonrep: `
      <h3>Integrity, Authenticity, and Non-Repudiation</h3>
      <ul>
        <li><strong>Integrity</strong> — Assurance that data has not been altered or corrupted</li>
        <li><strong>Authenticity</strong> — Assurance that the data comes from a verified source</li>
        <li><strong>Non-repudiation</strong> — The sender cannot deny having sent or signed the data</li>
      </ul>
      <p>Digital signatures provide all three properties.</p>
    `
  },

  password: {
    strong_password: `
      <h3>🔐 What Makes a Strong Password?</h3>
      <ul>
        <li><strong>Length</strong> — At least 12-16 characters (longer is better)</li>
        <li><strong>Complexity</strong> — Mix of uppercase, lowercase, numbers, and symbols</li>
        <li><strong>Unpredictability</strong> — No dictionary words, common phrases, or personal information</li>
        <li><strong>Uniqueness</strong> — Never reuse passwords across different services</li>
        <li><strong>Randomness</strong> — Use a password manager to generate random passwords</li>
      </ul>
      <p>💡 <strong>Tip:</strong> A long passphrase like "correct-horse-battery-staple" can be both strong and memorable.</p>
    `,
    password_entropy: `
      <h3>What is Password Entropy?</h3>
      <p>Password entropy measures the unpredictability of a password, calculated in bits.</p>
      <p><strong>Formula:</strong> Entropy = log₂(CharacterSet^Length)</p>
      <ul>
        <li>8 lowercase letters: ~37 bits of entropy</li>
        <li>12 mixed characters: ~72 bits of entropy</li>
        <li>20 mixed characters: ~120 bits of entropy</li>
        <li><strong>80+ bits</strong> is considered strong for most applications</li>
      </ul>
    `,
    no_plaintext: `
      <h3>Why Should Passwords Not Be Stored as Plaintext?</h3>
      <p>Storing passwords as plaintext means anyone with access to the database can read every password.</p>
      <ul>
        <li>Database breaches expose all passwords instantly</li>
        <li>Insider threats can access passwords</li>
        <li>Users often reuse passwords, amplifying the damage</li>
      </ul>
      <p>💡 <strong>Best practice:</strong> Store passwords using a strong, salted hash (e.g., bcrypt, Argon2, scrypt).</p>
    `,
    password_hashing: `
      <h3>What is Password Hashing?</h3>
      <p>Password hashing converts a password into a fixed-length hash using a one-way function. The stored hash is compared against the hash of the user's input during login.</p>
      <ul>
        <li>The original password is never stored</li>
        <li>Use dedicated password hashing functions: <strong>bcrypt, Argon2, scrypt</strong></li>
        <li>General-purpose hashes (SHA-256) are too fast and vulnerable to brute force</li>
        <li>Always add a <strong>salt</strong> to prevent rainbow table attacks</li>
      </ul>
    `,
    salting: `
      <h3>What is Salting?</h3>
      <p>Salting adds a unique, random value to each password before hashing.</p>
      <ul>
        <li>Prevents precomputed attacks (rainbow tables)</li>
        <li>Two users with the same password will have different hashes</li>
        <li>The salt is stored alongside the hash (it's not secret)</li>
        <li>Each password should have its own unique salt</li>
      </ul>
    `,
    brute_force: `
      <h3>What is Brute Force?</h3>
      <p>A brute-force attack systematically tries every possible combination until the correct one is found.</p>
      <ul>
        <li>Effectiveness depends on password length and complexity</li>
        <li>Short, simple passwords can be cracked in seconds</li>
        <li>Strong passwords with high entropy make brute force impractical</li>
        <li>Rate limiting, account lockout, and CAPTCHAs help prevent brute-force attacks</li>
      </ul>
    `,
    password_attack: `
      <h3>What is a Password Attack?</h3>
      <p>Password attacks are techniques used to discover or bypass passwords:</p>
      <ul>
        <li><strong>Brute force</strong> — Try all combinations</li>
        <li><strong>Dictionary attack</strong> — Try common words and phrases</li>
        <li><strong>Rainbow table</strong> — Use precomputed hash tables</li>
        <li><strong>Credential stuffing</strong> — Use leaked credentials from other breaches</li>
        <li><strong>Phishing</strong> — Trick users into revealing passwords</li>
      </ul>
      <p>💡 <strong>Defense:</strong> Strong passwords, salted hashing, multi-factor authentication, rate limiting.</p>
    `
  },

  aes: {
    what_is_aes: `
      <h3>🔐 What is AES?</h3>
      <p>AES (Advanced Encryption Standard) is a <strong>symmetric encryption algorithm</strong> adopted as a standard by NIST. It is one of the most widely used encryption algorithms in the world.</p>
      <h4>Key Points</h4>
      <ul>
        <li>Block cipher operating on 128-bit blocks</li>
        <li>Supports key sizes: 128, 192, or 256 bits</li>
        <li>Fast, efficient, and secure</li>
        <li>Used in TLS, VPNs, disk encryption, and more</li>
      </ul>
      <p>🔧 <strong>CryptoKit Tool:</strong> Text Encrypt/Decrypt (🆓 Free).</p>
    `,
    aes256: `
      <h3>What is AES-256?</h3>
      <p>AES-256 is AES with a <strong>256-bit key</strong>, providing the highest security level in the AES standard.</p>
      <ul>
        <li>256-bit key = 2²⁵⁶ possible keys (computationally impossible to brute-force)</li>
        <li>Used by governments, military, and high-security applications</li>
        <li>Slightly slower than AES-128 but considered more future-proof</li>
      </ul>
    `,
    aes_vs_rsa: `
      <h3>AES vs RSA</h3>
      <table class="cryptobot-table">
        <thead><tr><th>Feature</th><th>AES</th><th>RSA</th></tr></thead>
        <tbody>
          <tr><td>Type</td><td>Symmetric</td><td>Asymmetric</td></tr>
          <tr><td>Speed</td><td>Fast</td><td>Slow</td></tr>
          <tr><td>Key Size</td><td>128/192/256 bits</td><td>2048/4096 bits</td></tr>
          <tr><td>Use Case</td><td>Data encryption</td><td>Key exchange, signatures</td></tr>
        </tbody>
      </table>
      <p>💡 They're commonly used together: RSA encrypts the AES key; AES encrypts the data.</p>
    `,
    cbc: `
      <h3>What is CBC?</h3>
      <p>CBC (Cipher Block Chaining) is a block cipher mode of operation where each plaintext block is XORed with the previous ciphertext block before being encrypted.</p>
      <ul>
        <li>Requires an <strong>Initialization Vector (IV)</strong></li>
        <li>Identical plaintext blocks produce different ciphertext</li>
        <li>Must use proper padding (e.g., PKCS7)</li>
        <li>Vulnerable to padding oracle attacks if not implemented carefully</li>
      </ul>
    `,
    iv: `
      <h3>What is an IV (Initialization Vector)?</h3>
      <p>An IV is a random value used as the starting input for a block cipher mode like CBC.</p>
      <ul>
        <li>Ensures that encrypting the same plaintext twice produces different ciphertext</li>
        <li>Must be unique (ideally random) for each encryption operation</li>
        <li>Does not need to be secret but must not be reused with the same key</li>
        <li>Typically the same size as the block (128 bits for AES)</li>
      </ul>
    `,
    enc_vs_hash: `
      <h3>Encryption vs Hashing</h3>
      <table class="cryptobot-table">
        <thead><tr><th>Feature</th><th>Encryption</th><th>Hashing</th></tr></thead>
        <tbody>
          <tr><td>Reversible</td><td>Yes (with key)</td><td>No</td></tr>
          <tr><td>Key Required</td><td>Yes</td><td>No</td></tr>
          <tr><td>Purpose</td><td>Confidentiality</td><td>Integrity</td></tr>
          <tr><td>Output Size</td><td>Variable</td><td>Fixed</td></tr>
        </tbody>
      </table>
    `
  }
};
