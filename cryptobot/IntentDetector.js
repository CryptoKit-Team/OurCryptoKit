/**
 * IntentDetector — Classifies user input into actionable intents.
 */

export class IntentDetector {
  constructor() {
    this.patterns = this._buildPatterns();
  }

  detect(input) {
    const lower = input.toLowerCase().trim();

    // ─── Greetings ───
    if (/^(hi|hello|hey|howdy|yo|sup|good morning|good evening|good afternoon|greetings)\b/i.test(lower)) {
      return { intent: 'GREETING' };
    }

    // ─── Mode Commands ───
    if (/^(tools|show.*tools|explore.*tools|🔧)$/i.test(lower)) {
      return { intent: 'MODE_TOOLS' };
    }
    if (/^(learn|learning|📚|start learn|teach me)$/i.test(lower)) {
      return { intent: 'MODE_LEARN' };
    }
    if (/^(security|🛡️|cybersecurity)$/i.test(lower)) {
      return { intent: 'MODE_SECURITY' };
    }
    if (/^(challenge|challenges|🧩|ctf|puzzle)$/i.test(lower)) {
      return { intent: 'MODE_CHALLENGE' };
    }
    if (/^(premium|💎|pro cipher|quantum elite|pricing|upgrade|tiers|plans)$/i.test(lower)) {
      return { intent: 'MODE_PREMIUM' };
    }
    if (/^(help|❓|commands|what can you do|menu)$/i.test(lower)) {
      return { intent: 'MODE_HELP' };
    }

    // ─── Exam Patterns ───
    if (/(\d+\s*marks?|\bexam\b|short note|explain.*for.*marks?)/i.test(lower)) {
      const marks = lower.match(/(\d+)\s*marks?/);
      const topic = this._extractExamTopic(lower);
      return { intent: 'EXAM', marks: marks ? parseInt(marks[1]) : 7, topic };
    }

    // ─── Challenge Requests ───
    if (/give\s*me.*challenge|crypto\s*challenge|ctf\s*challenge|start.*challenge/i.test(lower)) {
      let difficulty = 'medium';
      if (/easy|beginner|simple/i.test(lower)) difficulty = 'easy';
      if (/hard|difficult|advanced|expert/i.test(lower)) difficulty = 'hard';
      return { intent: 'CHALLENGE_REQUEST', difficulty };
    }

    // ─── Learning Path ───
    if (/learn.*crypt|start.*learn|learning.*path|teach.*crypt|beginner.*crypt|from.*beginning|from.*scratch/i.test(lower)) {
      return { intent: 'LEARNING_PATH' };
    }

    // ─── Comparisons ───
    if (/\bvs\.?\b|\bversus\b|compare|difference.*between|differ/i.test(lower)) {
      const topic = this._extractComparisonTopic(lower);
      return { intent: 'COMPARISON', topic };
    }

    // ─── Tool How-To ───
    if (/how\s*(do\s*i|to|can\s*i)\s*(generate|create|make|check|verify|encrypt|decrypt|sign|hash)/i.test(lower)) {
      const tool = this._extractTool(lower);
      return { intent: 'TOOL_HOWTO', tool };
    }

    // ─── Tool Recommendation ───
    if (/which\s*tool|what\s*tool|recommend.*tool|suggest.*tool/i.test(lower)) {
      return { intent: 'TOOL_RECOMMEND', context: lower };
    }

    // ─── Troubleshooting ───
    if (/doesn'?t\s*(work|match)|error|problem|issue|wrong|fail|broken|not\s*working/i.test(lower)) {
      const topic = this._extractTroubleshootTopic(lower);
      return { intent: 'TROUBLESHOOT', topic };
    }

    // ─── Premium Info ───
    if (/pro\s*cipher|what.*pro|about.*pro/i.test(lower) && !/what\s+is\s+(rsa|aes|ecc|sha|hash|encrypt|key)/i.test(lower)) {
      return { intent: 'PREMIUM_INFO', feature: 'pro' };
    }
    if (/quantum\s*elite|what.*quantum|about.*quantum/i.test(lower)) {
      return { intent: 'PREMIUM_INFO', feature: 'quantum' };
    }

    // ─── Knowledge Queries ───
    const knowledgeResult = this._matchKnowledge(lower);
    if (knowledgeResult) return knowledgeResult;

    return { intent: 'UNKNOWN', original: input };
  }

  _matchKnowledge(lower) {
    // ─── Quantum Elite Topics ───
    for (const pattern of this.patterns.quantum) {
      if (pattern.regex.test(lower)) {
        return {
          intent: 'KNOWLEDGE_QUANTUM',
          topic: pattern.topic,
          subtopic: pattern.subtopic,
          relatedQuestions: pattern.related || [],
          original: lower
        };
      }
    }

    // ─── Pro Cipher Topics ───
    for (const pattern of this.patterns.pro) {
      if (pattern.regex.test(lower)) {
        return {
          intent: 'KNOWLEDGE_PRO',
          topic: pattern.topic,
          subtopic: pattern.subtopic,
          relatedQuestions: pattern.related || [],
          original: lower
        };
      }
    }

    // ─── Free Topics ───
    for (const pattern of this.patterns.free) {
      if (pattern.regex.test(lower)) {
        return {
          intent: 'KNOWLEDGE_FREE',
          topic: pattern.topic,
          subtopic: pattern.subtopic,
          relatedQuestions: pattern.related || [],
          original: lower
        };
      }
    }

    return null;
  }

  _buildPatterns() {
    return {
      free: [
        // Cryptography Basics
        { regex: /what\s*is\s*cryptography/i, topic: 'basics', subtopic: 'cryptography', related: [{ label: '🔐 What is encryption?', query: 'What is encryption?' }] },
        { regex: /what\s*is\s*encryption/i, topic: 'basics', subtopic: 'encryption', related: [{ label: '🔓 What is decryption?', query: 'What is decryption?' }] },
        { regex: /what\s*is\s*decryption/i, topic: 'basics', subtopic: 'decryption' },
        { regex: /what\s*is\s*(a\s*)?hash(ing)?(\s*function)?/i, topic: 'hashing', subtopic: 'what_is_hashing', related: [{ label: '🔐 What is SHA-256?', query: 'What is SHA-256?' }] },
        { regex: /encryption\s*vs\.?\s*hash/i, topic: 'basics', subtopic: 'encryption_vs_hashing' },
        { regex: /encryption\s*vs\.?\s*encoding/i, topic: 'basics', subtopic: 'encryption_vs_encoding' },
        { regex: /what\s*is\s*(a\s*)?(plain\s*text|plaintext)/i, topic: 'basics', subtopic: 'plaintext' },
        { regex: /what\s*is\s*(a\s*)?(cipher\s*text|ciphertext)/i, topic: 'basics', subtopic: 'ciphertext' },
        { regex: /what\s*is\s*(a\s*)?cryptographic\s*key/i, topic: 'basics', subtopic: 'cryptographic_key' },
        { regex: /what\s*is\s*symmetric\s*(cryptography|encryption)/i, topic: 'basics', subtopic: 'symmetric' },
        { regex: /what\s*is\s*asymmetric\s*(cryptography|encryption)/i, topic: 'basics', subtopic: 'asymmetric' },
        { regex: /symmetric\s*vs\.?\s*asymmetric/i, topic: 'basics', subtopic: 'symmetric_vs_asymmetric' },
        { regex: /what\s*is\s*(a\s*)?public\s*key/i, topic: 'basics', subtopic: 'public_key' },
        { regex: /what\s*is\s*(a\s*)?private\s*key/i, topic: 'basics', subtopic: 'private_key' },
        { regex: /what\s*is\s*(a\s*)?nonce/i, topic: 'basics', subtopic: 'nonce' },
        { regex: /what\s*is\s*(a\s*)?salt/i, topic: 'basics', subtopic: 'salt' },
        { regex: /what\s*is\s*entropy/i, topic: 'basics', subtopic: 'entropy' },

        // Hashing
        { regex: /what\s*is\s*sha-?256/i, topic: 'hashing', subtopic: 'sha256' },
        { regex: /what\s*is\s*sha-?512/i, topic: 'hashing', subtopic: 'sha512' },
        { regex: /what\s*is\s*sha-?1/i, topic: 'hashing', subtopic: 'sha1' },
        { regex: /what\s*is\s*md5/i, topic: 'hashing', subtopic: 'md5' },
        { regex: /what\s*is\s*blake\s*2/i, topic: 'hashing', subtopic: 'blake2' },
        { regex: /weak\s*(hashing|hash)\s*algorithm/i, topic: 'hashing', subtopic: 'weak_algorithms' },
        { regex: /why\s*(should\s*)?md5\s*not/i, topic: 'hashing', subtopic: 'md5_insecure' },
        { regex: /why\s*(is\s*)?sha-?1\s*(deprecated|weak|insecure)/i, topic: 'hashing', subtopic: 'sha1_deprecated' },
        { regex: /can\s*(a\s*)?hash\s*be\s*(decrypted|reversed)/i, topic: 'hashing', subtopic: 'hash_irreversible' },
        { regex: /hash\s*collision/i, topic: 'hashing', subtopic: 'collision' },
        { regex: /avalanche\s*effect/i, topic: 'hashing', subtopic: 'avalanche' },
        { regex: /hash\s*digest/i, topic: 'hashing', subtopic: 'digest' },

        // RSA
        { regex: /(what\s*is|explain)\s*rsa(?!\s*-?(crt|oaep|pss|lab))/i, topic: 'rsa', subtopic: 'what_is_rsa' },
        { regex: /how\s*(does\s*)?rsa\s*work/i, topic: 'rsa', subtopic: 'how_rsa_works' },
        { regex: /rsa\s*public\s*key/i, topic: 'rsa', subtopic: 'rsa_public_key' },
        { regex: /rsa\s*private\s*key/i, topic: 'rsa', subtopic: 'rsa_private_key' },
        { regex: /rsa-?2048/i, topic: 'rsa', subtopic: 'rsa2048' },
        { regex: /rsa-?4096/i, topic: 'rsa', subtopic: 'rsa4096' },
        { regex: /rsa\s*(encryption|encrypt)\s*vs\.?\s*(rsa\s*)?(signature|sign)/i, topic: 'rsa', subtopic: 'rsa_enc_vs_sig' },
        { regex: /what\s*is\s*rsa-?oaep/i, topic: 'rsa', subtopic: 'rsa_oaep' },
        { regex: /what\s*is\s*rsa-?pss/i, topic: 'rsa', subtopic: 'rsa_pss' },
        { regex: /why\s*(is\s*)?rsa\s*slow/i, topic: 'rsa', subtopic: 'rsa_slow' },
        { regex: /rsa\s*key.*generat/i, topic: 'rsa', subtopic: 'rsa_keygen' },

        // File Integrity
        { regex: /file\s*integrity/i, topic: 'file_integrity', subtopic: 'what_is_file_integrity' },
        { regex: /(file\s*integrity|integrity)\s*check/i, topic: 'file_integrity', subtopic: 'how_checker_works' },
        { regex: /sha-?256\s*detect\s*file/i, topic: 'file_integrity', subtopic: 'sha256_detect' },
        { regex: /file\s*change/i, topic: 'file_integrity', subtopic: 'file_changed' },
        { regex: /compare\s*hash/i, topic: 'file_integrity', subtopic: 'compare_hashes' },
        { regex: /what\s*is\s*(a\s*)?checksum/i, topic: 'file_integrity', subtopic: 'checksum' },
        { regex: /checksum\s*vs.*hash/i, topic: 'file_integrity', subtopic: 'checksum_vs_hash' },

        // Digital Signatures
        { regex: /what\s*is\s*(a\s*)?digital\s*signature/i, topic: 'digital_signatures', subtopic: 'what_is_signature' },
        { regex: /digital\s*signature\s*verif/i, topic: 'digital_signatures', subtopic: 'verification' },
        { regex: /what\s*is\s*signing/i, topic: 'digital_signatures', subtopic: 'signing' },
        { regex: /what\s*(does\s*)?.*signature\s*provide/i, topic: 'digital_signatures', subtopic: 'provides' },
        { regex: /signature\s*provide\s*encrypt/i, topic: 'digital_signatures', subtopic: 'sig_vs_encrypt' },
        { regex: /rsa\s*signature\s*vs.*ecdsa/i, topic: 'digital_signatures', subtopic: 'rsa_vs_ecdsa' },
        { regex: /integrity.*authenticity.*non-?repudiation|non-?repudiation/i, topic: 'digital_signatures', subtopic: 'integrity_auth_nonrep' },

        // Password Security
        { regex: /strong\s*password/i, topic: 'password', subtopic: 'strong_password' },
        { regex: /password\s*entropy/i, topic: 'password', subtopic: 'password_entropy' },
        { regex: /password.*plaintext|plaintext.*password/i, topic: 'password', subtopic: 'no_plaintext' },
        { regex: /password\s*hash/i, topic: 'password', subtopic: 'password_hashing' },
        { regex: /what\s*is\s*salt/i, topic: 'password', subtopic: 'salting' },
        { regex: /brute\s*force/i, topic: 'password', subtopic: 'brute_force' },
        { regex: /password\s*attack/i, topic: 'password', subtopic: 'password_attack' },

        // AES
        { regex: /what\s*is\s*aes(?!.*ecc|.*rsa)/i, topic: 'aes', subtopic: 'what_is_aes' },
        { regex: /what\s*is\s*aes-?256/i, topic: 'aes', subtopic: 'aes256' },
        { regex: /aes\s*vs\.?\s*rsa/i, topic: 'aes', subtopic: 'aes_vs_rsa' },
        { regex: /what\s*is\s*(a\s*)?cbc/i, topic: 'aes', subtopic: 'cbc' },
        { regex: /what\s*is\s*(a\s*)?iv|initialization\s*vector/i, topic: 'aes', subtopic: 'iv' },
        { regex: /encryption\s*vs\.?\s*hash/i, topic: 'aes', subtopic: 'enc_vs_hash' },
      ],

      pro: [
        // Crypto Security Scanner
        { regex: /crypto(graphic)?\s*(security\s*)?scan/i, topic: 'scanner', subtopic: 'what_is_scanner' },
        { regex: /cryptographic\s*weakness/i, topic: 'scanner', subtopic: 'weakness' },
        { regex: /weak\s*algorithm.*detect|detect.*weak/i, topic: 'scanner', subtopic: 'detect_weak' },
        { regex: /deprecated\s*cipher/i, topic: 'scanner', subtopic: 'deprecated' },
        { regex: /insecure\s*key\s*manage/i, topic: 'scanner', subtopic: 'key_management' },
        { regex: /weak\s*crypto.*config/i, topic: 'scanner', subtopic: 'weak_config' },

        // Advanced RSA Lab
        { regex: /rsa\s*(key\s*)?strength/i, topic: 'rsa_lab', subtopic: 'key_strength' },
        { regex: /rsa-?crt|chinese\s*remainder.*rsa/i, topic: 'rsa_lab', subtopic: 'rsa_crt' },
        { regex: /rsa\s*padding/i, topic: 'rsa_lab', subtopic: 'padding' },
        { regex: /textbook\s*rsa|raw\s*rsa/i, topic: 'rsa_lab', subtopic: 'textbook_rsa' },
        { regex: /rsa.*implementation.*mistake|rsa.*mistake/i, topic: 'rsa_lab', subtopic: 'mistakes' },

        // ECC
        { regex: /elliptic\s*curve|what\s*is\s*ecc/i, topic: 'ecc', subtopic: 'what_is_ecc' },
        { regex: /what\s*is\s*ecdsa/i, topic: 'ecc', subtopic: 'ecdsa' },
        { regex: /what\s*is\s*ecdh|explain\s*ecdh/i, topic: 'ecc', subtopic: 'ecdh' },
        { regex: /how\s*(does\s*)?ecdh\s*work/i, topic: 'ecc', subtopic: 'ecdh_how' },
        { regex: /what\s*is\s*(a\s*)?(curve|elliptic.*curve)\b/i, topic: 'ecc', subtopic: 'curve' },
        { regex: /generator\s*point/i, topic: 'ecc', subtopic: 'generator_point' },
        { regex: /private\s*scalar/i, topic: 'ecc', subtopic: 'private_scalar' },
        { regex: /public\s*point/i, topic: 'ecc', subtopic: 'public_point' },
        { regex: /ecc\s*vs\.?\s*rsa|rsa\s*vs\.?\s*ecc/i, topic: 'ecc', subtopic: 'ecc_vs_rsa' },
        { regex: /ecc.*smaller\s*key|smaller.*key.*ecc/i, topic: 'ecc', subtopic: 'smaller_keys' },
        { regex: /secp256k1/i, topic: 'ecc', subtopic: 'secp256k1' },
      ],

      quantum: [
        // Attack Simulator
        { regex: /brute\s*force\s*attack/i, topic: 'attacks', subtopic: 'brute_force' },
        { regex: /padding\s*oracle/i, topic: 'attacks', subtopic: 'padding_oracle' },
        { regex: /length\s*extension/i, topic: 'attacks', subtopic: 'length_extension' },
        { regex: /collision\s*attack/i, topic: 'attacks', subtopic: 'collision_attack' },
        { regex: /birthday\s*attack/i, topic: 'attacks', subtopic: 'birthday_attack' },
        { regex: /replay\s*attack/i, topic: 'attacks', subtopic: 'replay_attack' },
        { regex: /chosen[\s-]*(plain\s*text|plaintext)\s*attack/i, topic: 'attacks', subtopic: 'chosen_plaintext' },
        { regex: /chosen[\s-]*(cipher\s*text|ciphertext)\s*attack/i, topic: 'attacks', subtopic: 'chosen_ciphertext' },
        { regex: /how\s*(do\s*)?crypto.*attack.*work/i, topic: 'attacks', subtopic: 'how_attacks_work' },
        { regex: /prevent.*crypto.*attack|crypto.*attack.*prevent/i, topic: 'attacks', subtopic: 'prevention' },

        // Forensics
        { regex: /crypto(graphic)?\s*forensic/i, topic: 'forensics', subtopic: 'what_is_forensics' },
        { regex: /hash.*investigation|investigation.*hash/i, topic: 'forensics', subtopic: 'hash_investigation' },
        { regex: /evidence\s*integrity/i, topic: 'forensics', subtopic: 'evidence_integrity' },
        { regex: /chain\s*of\s*custody/i, topic: 'forensics', subtopic: 'chain_of_custody' },

        // Blockchain Security
        { regex: /blockchain.*hash|hash.*blockchain/i, topic: 'blockchain', subtopic: 'blockchain_hashing' },
        { regex: /merkle\s*tree/i, topic: 'blockchain', subtopic: 'merkle_tree' },
        { regex: /transaction.*sign|sign.*transaction/i, topic: 'blockchain', subtopic: 'transaction_signing' },
        { regex: /blockchain\s*wallet/i, topic: 'blockchain', subtopic: 'wallet' },
        { regex: /private\s*key.*expos|expos.*private\s*key/i, topic: 'blockchain', subtopic: 'key_exposure' },
        { regex: /51\s*%?\s*attack/i, topic: 'blockchain', subtopic: '51_attack' },
        { regex: /double\s*spend/i, topic: 'blockchain', subtopic: 'double_spend' },
        { regex: /crypto.*protect.*blockchain|blockchain.*crypto.*protect/i, topic: 'blockchain', subtopic: 'crypto_protects_blockchain' },
        { regex: /relationship.*blockchain.*crypto|blockchain.*crypto.*relation/i, topic: 'blockchain', subtopic: 'blockchain_crypto_relationship' },
      ]
    };
  }

  _extractExamTopic(input) {
    const cleaned = input
      .replace(/\d+\s*marks?/gi, '')
      .replace(/\b(explain|describe|define|discuss|write|give|for|exam|short\s*note(s)?|about|in|a|the|an|on)\b/gi, '')
      .trim();
    return cleaned || 'cryptography';
  }

  _extractComparisonTopic(input) {
    const match = input.match(/(.+?)\s*(vs\.?|versus|compared?\s*(to|with)?|differ.*(?:from|between)?)\s*(.+)/i);
    if (match) {
      return { a: match[1].trim(), b: match[4].trim() };
    }
    return { a: '', b: '' };
  }

  _extractTool(input) {
    if (/hash/i.test(input)) return 'hash_generator';
    if (/rsa\s*key/i.test(input)) return 'rsa_generator';
    if (/file\s*integrity|file.*check/i.test(input)) return 'file_integrity';
    if (/encrypt|decrypt/i.test(input)) return 'text_encrypt';
    if (/sign|signature/i.test(input)) return 'digital_signature';
    return 'general';
  }

  _extractTroubleshootTopic(input) {
    if (/hash/i.test(input)) return 'hash_mismatch';
    if (/key/i.test(input)) return 'key_error';
    if (/encrypt|decrypt/i.test(input)) return 'encryption_error';
    if (/sign/i.test(input)) return 'signature_error';
    return 'general';
  }
}
