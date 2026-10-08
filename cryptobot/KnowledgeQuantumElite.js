/**
 * KnowledgeQuantumElite — Quantum Elite tier knowledge base.
 */

export const knowledgeQuantumElite = {
  attacks: {
    brute_force: `
      <h3>🌌 Brute-Force Attack</h3>
      <p>A brute-force attack tries every possible key or password combination until the correct one is found.</p>
      <h4>How It Works</h4>
      <ol>
        <li>Start from the first possible key value</li>
        <li>Try decrypting/authenticating with that key</li>
        <li>If unsuccessful, try the next value</li>
        <li>Continue until the correct key is found or all possibilities are exhausted</li>
      </ol>
      <h4>Defense</h4>
      <ul>
        <li>Use sufficiently long keys (AES-256 = 2²⁵⁶ possible keys)</li>
        <li>Use strong passwords with high entropy</li>
        <li>Implement rate limiting and account lockout</li>
        <li>Use key stretching (bcrypt, Argon2)</li>
      </ul>
      <div class="cryptobot-tier-note cryptobot-tier--quantum">
        <span>🌌 Quantum Elite</span> — The Cryptographic Attack Simulator provides controlled educational simulations. Available with Quantum Elite access.
      </div>
    `,
    padding_oracle: `
      <h3>🌌 Padding Oracle Attack</h3>
      <p>A padding oracle attack exploits error messages from a decryption system to gradually decrypt ciphertext without knowing the key.</p>
      <h4>How It Works</h4>
      <ol>
        <li>The attacker sends modified ciphertext to the server</li>
        <li>The server responds differently for valid vs invalid padding</li>
        <li>By analyzing these responses, the attacker deduces one byte at a time</li>
        <li>Eventually, the entire plaintext is recovered</li>
      </ol>
      <h4>Defense</h4>
      <ul>
        <li>Use authenticated encryption (AES-GCM) instead of CBC</li>
        <li>Don't reveal padding errors to the user</li>
        <li>Use constant-time comparison for all validation</li>
        <li>Encrypt-then-MAC approach</li>
      </ul>
      <p>⚠️ <strong>Ethical note:</strong> Only test systems you own or are authorized to test.</p>
    `,
    length_extension: `
      <h3>🌌 Length Extension Attack</h3>
      <p>A length extension attack allows an attacker to compute H(message || attacker_data) from H(message) without knowing the original message, for hash functions using Merkle–Damgård construction.</p>
      <h4>Vulnerable Algorithms</h4>
      <ul>
        <li>SHA-1, SHA-256, SHA-512, MD5</li>
      </ul>
      <h4>Not Vulnerable</h4>
      <ul>
        <li>SHA-3 (uses sponge construction)</li>
        <li>HMAC (protects against this attack)</li>
        <li>BLAKE2 (when used correctly)</li>
      </ul>
      <h4>Defense</h4>
      <ul>
        <li>Use HMAC instead of H(secret || message)</li>
        <li>Use SHA-3 or BLAKE2</li>
      </ul>
    `,
    collision_attack: `
      <h3>🌌 Collision Attack</h3>
      <p>A collision attack finds two different inputs that produce the same hash output.</p>
      <h4>Impact</h4>
      <ul>
        <li>Can be used to forge certificates, documents, or signatures</li>
        <li>MD5 and SHA-1 have practical collision attacks</li>
      </ul>
      <h4>Defense</h4>
      <ul>
        <li>Use collision-resistant hash functions (SHA-256, SHA-3, BLAKE2)</li>
        <li>Avoid MD5 and SHA-1 for security-sensitive applications</li>
      </ul>
    `,
    birthday_attack: `
      <h3>🌌 Birthday Attack</h3>
      <p>The birthday attack exploits the birthday paradox to find hash collisions more quickly than brute force.</p>
      <h4>How It Works</h4>
      <ul>
        <li>For a hash with n-bit output, a collision can be expected after approximately 2^(n/2) hashes</li>
        <li>For SHA-256 (256-bit output): ~2¹²⁸ operations needed</li>
        <li>For MD5 (128-bit output): ~2⁶⁴ operations — feasible with modern hardware</li>
      </ul>
      <h4>Implication</h4>
      <p>Hash functions need output lengths at least twice the desired security level.</p>
    `,
    replay_attack: `
      <h3>🌌 Replay Attack</h3>
      <p>A replay attack captures valid network data and retransmits it to trick the system into processing it again.</p>
      <h4>Example</h4>
      <p>An attacker captures an authentication token and replays it to gain unauthorized access.</p>
      <h4>Defense</h4>
      <ul>
        <li>Use nonces (numbers used once)</li>
        <li>Timestamps with expiration</li>
        <li>Session tokens that cannot be reused</li>
        <li>Challenge-response protocols</li>
      </ul>
    `,
    chosen_plaintext: `
      <h3>🌌 Chosen-Plaintext Attack</h3>
      <p>In a chosen-plaintext attack (CPA), the attacker can choose arbitrary plaintexts and obtain their corresponding ciphertexts.</p>
      <ul>
        <li>The attacker tries to deduce the encryption key or decrypt other ciphertexts</li>
        <li>Modern encryption schemes (AES-GCM, AES-CBC with random IV) are designed to resist CPA</li>
        <li>ECB mode is particularly vulnerable (identical blocks produce identical ciphertext)</li>
      </ul>
    `,
    chosen_ciphertext: `
      <h3>🌌 Chosen-Ciphertext Attack</h3>
      <p>In a chosen-ciphertext attack (CCA), the attacker can choose ciphertexts and obtain their decryptions.</p>
      <ul>
        <li>Stronger threat model than CPA</li>
        <li>RSA without proper padding (OAEP) is vulnerable</li>
        <li>Padding oracle attacks are a form of adaptive CCA</li>
        <li>Modern schemes like RSA-OAEP and AES-GCM provide CCA security</li>
      </ul>
    `,
    how_attacks_work: `
      <h3>How Do Cryptographic Attacks Work?</h3>
      <p>Cryptographic attacks exploit weaknesses in algorithms, implementations, or protocols:</p>
      <ul>
        <li><strong>Mathematical attacks</strong> — Exploit algorithmic weaknesses (collision attacks)</li>
        <li><strong>Implementation attacks</strong> — Exploit coding flaws (buffer overflows, timing leaks)</li>
        <li><strong>Side-channel attacks</strong> — Analyze timing, power consumption, or electromagnetic emissions</li>
        <li><strong>Protocol attacks</strong> — Exploit flaws in how algorithms are combined (padding oracles, downgrade attacks)</li>
        <li><strong>Social engineering</strong> — Bypass cryptography entirely by targeting humans</li>
      </ul>
    `,
    prevention: `
      <h3>How Can Cryptographic Attacks Be Prevented?</h3>
      <ul>
        <li>Use <strong>modern, well-vetted algorithms</strong> (AES-256, SHA-256, RSA-2048+, ECC)</li>
        <li>Use <strong>proper padding</strong> (OAEP, PSS) and <strong>authenticated encryption</strong> (GCM)</li>
        <li>Use <strong>cryptographically secure random number generators</strong></li>
        <li>Keep software and libraries <strong>updated</strong></li>
        <li>Follow <strong>established protocols</strong> rather than designing your own</li>
        <li>Implement <strong>constant-time operations</strong> to prevent timing attacks</li>
        <li>Use <strong>HMAC</strong> for message authentication</li>
        <li>Regular <strong>security audits</strong> and code reviews</li>
      </ul>
    `
  },

  forensics: {
    what_is_forensics: `
      <h3>🌌 What is Cryptographic Forensics?</h3>
      <p>Cryptographic forensics involves analyzing and verifying cryptographic artifacts as part of digital investigations.</p>
      <h4>Key Activities</h4>
      <ul>
        <li>Verifying file integrity using cryptographic hashes</li>
        <li>Analyzing digital signatures for authenticity</li>
        <li>Examining cryptographic keys and certificates</li>
        <li>Detecting suspicious cryptographic artifacts</li>
        <li>Establishing chain of custody through hashing</li>
      </ul>
      <div class="cryptobot-tier-note cryptobot-tier--quantum">
        <span>🌌 Quantum Elite</span> — The Crypto Forensics Lab provides interactive forensic analysis tools. Available with Quantum Elite access.
      </div>
    `,
    hash_investigation: `
      <h3>How Can Hashes Help Investigations?</h3>
      <ul>
        <li><strong>Evidence integrity</strong> — Hashing evidence upon collection proves it wasn't modified</li>
        <li><strong>File identification</strong> — Known-file databases use hashes to identify malware or illegal content</li>
        <li><strong>Timeline analysis</strong> — Hash comparisons show when files were changed</li>
        <li><strong>Deduplication</strong> — Identical hashes identify duplicate files</li>
      </ul>
    `,
    evidence_integrity: `
      <h3>What is Evidence Integrity?</h3>
      <p>Evidence integrity ensures that digital evidence has not been altered, tampered with, or corrupted from the time of collection to presentation.</p>
      <ul>
        <li>Hash evidence immediately upon collection</li>
        <li>Store hashes separately and securely</li>
        <li>Verify hashes at every stage of handling</li>
        <li>Use multiple hash algorithms for redundancy</li>
      </ul>
    `,
    chain_of_custody: `
      <h3>Why is Chain of Custody Important?</h3>
      <p>Chain of custody is the documented, unbroken trail showing how evidence was collected, handled, and preserved.</p>
      <ul>
        <li>Cryptographic hashing proves evidence integrity at each custody transfer</li>
        <li>Digital signatures can authenticate custody records</li>
        <li>Timestamps provide temporal proof</li>
        <li>Any break in the chain can make evidence inadmissible</li>
      </ul>
    `
  },

  blockchain: {
    blockchain_hashing: `
      <h3>🌌 Why Does Blockchain Use Hashing?</h3>
      <p>Hashing is fundamental to blockchain technology:</p>
      <ul>
        <li><strong>Block linking</strong> — Each block contains the hash of the previous block, creating an immutable chain</li>
        <li><strong>Transaction integrity</strong> — Transaction data is hashed and included in Merkle trees</li>
        <li><strong>Proof of Work</strong> — Miners hash block headers to find valid nonces (Bitcoin)</li>
        <li><strong>Address generation</strong> — Wallet addresses are derived from public key hashes</li>
        <li><strong>Tamper detection</strong> — Modifying any block changes all subsequent hashes</li>
      </ul>
    `,
    merkle_tree: `
      <h3>What is a Merkle Tree?</h3>
      <p>A Merkle tree (hash tree) is a data structure where each leaf node contains a hash of a data block, and each non-leaf node contains a hash of its children.</p>
      <h4>How It Works</h4>
      <ol>
        <li>Hash each transaction individually (leaf nodes)</li>
        <li>Pair hashes and hash them together</li>
        <li>Repeat until a single hash remains (Merkle root)</li>
      </ol>
      <h4>Benefits</h4>
      <ul>
        <li><strong>Efficient verification</strong> — Verify a single transaction without downloading the entire block</li>
        <li><strong>Tamper detection</strong> — Changing any transaction changes the Merkle root</li>
        <li><strong>Light clients</strong> — SPV (Simplified Payment Verification) in Bitcoin</li>
      </ul>
    `,
    transaction_signing: `
      <h3>How Are Blockchain Transactions Signed?</h3>
      <ol>
        <li>The sender creates a transaction (recipient, amount, etc.)</li>
        <li>The transaction data is hashed</li>
        <li>The hash is signed with the sender's <strong>private key</strong> (using ECDSA in Bitcoin/Ethereum)</li>
        <li>The signature is broadcast with the transaction</li>
        <li>Nodes verify the signature using the sender's <strong>public key</strong></li>
        <li>Valid signatures prove the sender authorized the transaction</li>
      </ol>
    `,
    wallet: `
      <h3>What is a Blockchain Wallet?</h3>
      <p>A blockchain wallet is software that manages a user's <strong>cryptographic key pairs</strong> and enables them to interact with the blockchain.</p>
      <ul>
        <li>Stores private keys securely</li>
        <li>Derives wallet addresses from public keys</li>
        <li>Signs transactions using private keys</li>
        <li>Does NOT actually "store" cryptocurrency — the blockchain records balances</li>
      </ul>
      <p>⚠️ Losing access to your private key means losing access to your funds permanently.</p>
    `,
    key_exposure: `
      <h3>What Happens If a Private Key is Exposed?</h3>
      <p>If a blockchain private key is exposed:</p>
      <ul>
        <li>The attacker can <strong>sign transactions</strong> and steal all funds</li>
        <li>The attacker can <strong>impersonate</strong> the key owner</li>
        <li>There is <strong>no recovery mechanism</strong> — blockchain transactions are irreversible</li>
        <li>All funds should be immediately transferred to a new wallet</li>
      </ul>
      <p>⚠️ <strong>Never share your private key or seed phrase.</strong></p>
    `,
    '51_attack': `
      <h3>What is a 51% Attack?</h3>
      <p>A 51% attack occurs when a single entity controls more than 50% of a blockchain's mining/validation power.</p>
      <h4>What They Can Do</h4>
      <ul>
        <li>Reverse recent transactions (double spending)</li>
        <li>Prevent new transactions from being confirmed</li>
        <li>Prevent other miners from finding blocks</li>
      </ul>
      <h4>What They Cannot Do</h4>
      <ul>
        <li>Create new coins out of nothing (violates protocol rules)</li>
        <li>Steal coins from wallets without private keys</li>
        <li>Modify old, deeply confirmed transactions (practically)</li>
      </ul>
    `,
    double_spend: `
      <h3>What is Double Spending?</h3>
      <p>Double spending is the risk of spending the same digital currency twice.</p>
      <ul>
        <li>Blockchain prevents this through <strong>consensus mechanisms</strong></li>
        <li>Each transaction is verified and recorded in a block</li>
        <li>Once confirmed, a transaction cannot be spent again</li>
        <li>A 51% attack could potentially enable double spending</li>
      </ul>
    `,
    crypto_protects_blockchain: `
      <h3>How Does Cryptography Protect Blockchain?</h3>
      <ul>
        <li><strong>Hashing</strong> — Links blocks, verifies data integrity, generates addresses</li>
        <li><strong>Digital signatures (ECDSA)</strong> — Authenticates transactions</li>
        <li><strong>Public-key cryptography</strong> — Manages ownership without trusted third parties</li>
        <li><strong>Merkle trees</strong> — Efficiently verifies transaction inclusion</li>
        <li><strong>Proof of Work</strong> — Uses hash puzzles for consensus</li>
      </ul>
    `,
    blockchain_crypto_relationship: `
      <h3>Relationship Between Blockchain and Cryptography</h3>
      <p>Blockchain is fundamentally built on cryptographic primitives:</p>
      <ul>
        <li>Without <strong>hash functions</strong>, blocks cannot be linked or verified</li>
        <li>Without <strong>digital signatures</strong>, transactions cannot be authenticated</li>
        <li>Without <strong>public-key cryptography</strong>, trustless ownership is impossible</li>
        <li>Cryptography provides the <strong>trust layer</strong> that eliminates the need for intermediaries</li>
      </ul>
      <p>💡 Blockchain is an application of cryptography — not the other way around.</p>
    `
  }
};
