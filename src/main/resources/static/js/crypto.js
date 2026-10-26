/**
 * Polymath VSN - Cryptography & Security Module (Domain 8)
 * 1. Classical Ciphers & Frequency Analysis
 * 2. Asymmetric Encryption & Key Exchange (RSA / AES)
 * 3. Cryptographic Hashing & Signatures (SHA-256)
 * 4. Zero-Knowledge Proofs (ZK-SNARKs)
 * Strictly emoji-free enterprise design
 */

const CRYPTO_MODULE = (() => {

  // Standard English Letter Frequencies (ETAOIN SHRDLU benchmark, in percent)
  const ENGLISH_FREQUENCIES = {
    A: 8.167, B: 1.492, C: 2.782, D: 4.253, E: 12.702,
    F: 2.228, G: 2.015, H: 6.094, I: 6.966, J: 0.153,
    K: 0.772, L: 4.025, M: 2.406, N: 6.749, O: 7.507,
    P: 1.929, Q: 0.095, R: 5.987, S: 6.327, T: 9.056,
    U: 2.758, V: 0.978, W: 2.360, X: 0.150, Y: 1.974, Z: 0.074
  };

  // State
  const state = {
    // Sub-Skill 1: Classical Ciphers
    cipherType: 'caesar', // 'caesar', 'rot13', 'vigenere', 'atbash'
    cipherMode: 'encrypt', // 'encrypt' or 'decrypt'
    caesarShift: 3,
    vigenereKey: 'POLYMATH',

    // Sub-Skill 2: Asymmetric RSA
    rsaP: 61,
    rsaQ: 53,
    rsaN: 3233,
    rsaPhi: 3120,
    rsaE: 17,
    rsaD: 2753,
    rsaPlaintext: 'HELLOPOLYMATH',
    rsaCipherBlocks: [],
    rsaDecryptedText: '',
    handshakeStep: 0,

    // Sub-Skill 3: Hashing SHA-256
    hashInput: 'Polymath VSN Enterprise 2026',
    avalancheA: 'Polymath VSN Enterprise 2026',
    avalancheB: 'Polymath VSN Enterprise 2027',
    signedDocText: 'Authorized Ledger Transfer: 1,000 Credits to Polymath Treasury',
    signedDocHash: '',
    signedDocSignature: '',
    isTampered: false,

    // Sub-Skill 4: Zero-Knowledge Proofs
    zkpSecretX: 137, // Secret witness
    zkpBaseG: 5,
    zkpPrimeP: 7919,
    zkpPublicKeyY: 2588, // (5^137) % 7919
    zkpRoundsCompleted: 0,
    zkpSuccessfulRounds: 0,
    zkpCheatDetected: false,
    zkpHistory: []
  };

  // ============================================================
  // Initialization & View Handlers
  // ============================================================

  function init() {
    initCiphers();
    initAsymmetric();
    initHashing();
    initZKP();
  }

  function initView(viewName) {
    if (viewName === 'crypto-ciphers') {
      updateCipherAnalysis();
    } else if (viewName === 'crypto-asymmetric') {
      calculateRsaKeys();
      runRsaEncryption();
    } else if (viewName === 'crypto-hashing') {
      updateLiveHash();
      updateAvalancheComparison();
      signDocument();
    } else if (viewName === 'crypto-zkp') {
      renderZkpState();
    }
  }

  // ============================================================
  // 1. Classical Ciphers & Frequency Analysis
  // ============================================================

  function initCiphers() {
    const inputEl = document.getElementById('cipher-input-text');
    const shiftSlider = document.getElementById('cipher-caesar-shift');
    const keyInput = document.getElementById('cipher-vigenere-key');

    if (inputEl) {
      inputEl.addEventListener('input', updateCipherAnalysis);
    }

    if (shiftSlider) {
      shiftSlider.addEventListener('input', (e) => {
        state.caesarShift = parseInt(e.target.value, 10);
        const shiftValEl = document.getElementById('cipher-caesar-shift-val');
        if (shiftValEl) shiftValEl.textContent = state.caesarShift;
        updateCipherAnalysis();
      });
    }

    if (keyInput) {
      keyInput.addEventListener('input', (e) => {
        state.vigenereKey = e.target.value.toUpperCase().replace(/[^A-Z]/g, '') || 'A';
        updateCipherAnalysis();
      });
    }

    // Set sample text if empty
    if (inputEl && !inputEl.value) {
      inputEl.value = "THE SECRET TO POLYMATHIC MASTERY LIES IN STRUCTURAL SYNTHESIS AND RIGOROUS PROOFS.";
    }

    updateCipherAnalysis();
  }

  function setCipherType(type) {
    state.cipherType = type;
    document.querySelectorAll('.cipher-tab-btn').forEach(btn => {
      if (btn.dataset.cipher === type) {
        btn.classList.add('bg-[#2C221E]', 'text-white', 'border-[#2C221E]');
        btn.classList.remove('bg-[#F7F4EF]', 'text-[#3E3632]');
      } else {
        btn.classList.remove('bg-[#2C221E]', 'text-white', 'border-[#2C221E]');
        btn.classList.add('bg-[#F7F4EF]', 'text-[#3E3632]');
      }
    });

    const caesarControls = document.getElementById('cipher-caesar-controls');
    const vigenereControls = document.getElementById('cipher-vigenere-controls');

    if (caesarControls) {
      caesarControls.style.display = (type === 'caesar') ? 'block' : 'none';
    }
    if (vigenereControls) {
      vigenereControls.style.display = (type === 'vigenere') ? 'block' : 'none';
    }

    updateCipherAnalysis();
  }

  function setCipherMode(mode) {
    state.cipherMode = mode;
    const encBtn = document.getElementById('cipher-mode-enc');
    const decBtn = document.getElementById('cipher-mode-dec');

    if (encBtn && decBtn) {
      if (mode === 'encrypt') {
        encBtn.className = "px-3.5 py-1.5 text-xs font-semibold rounded bg-[#2C221E] text-white transition-colors cursor-pointer";
        decBtn.className = "px-3.5 py-1.5 text-xs font-semibold rounded bg-white text-[#3E3632] hover:bg-[#EFECE6] transition-colors cursor-pointer";
      } else {
        decBtn.className = "px-3.5 py-1.5 text-xs font-semibold rounded bg-[#2C221E] text-white transition-colors cursor-pointer";
        encBtn.className = "px-3.5 py-1.5 text-xs font-semibold rounded bg-white text-[#3E3632] hover:bg-[#EFECE6] transition-colors cursor-pointer";
      }
    }
    updateCipherAnalysis();
  }

  function transformCaesar(text, shift, isDecrypt) {
    const s = isDecrypt ? (26 - (shift % 26)) % 26 : shift % 26;
    return text.split('').map(ch => {
      const code = ch.charCodeAt(0);
      if (code >= 65 && code <= 90) {
        return String.fromCharCode(((code - 65 + s) % 26) + 65);
      } else if (code >= 97 && code <= 122) {
        return String.fromCharCode(((code - 97 + s) % 26) + 97);
      }
      return ch;
    }).join('');
  }

  function transformVigenere(text, key, isDecrypt) {
    const cleanKey = key.toUpperCase().replace(/[^A-Z]/g, '') || 'A';
    let keyIdx = 0;
    return text.split('').map(ch => {
      const code = ch.charCodeAt(0);
      const isUpper = code >= 65 && code <= 90;
      const isLower = code >= 97 && code <= 122;

      if (isUpper || isLower) {
        const base = isUpper ? 65 : 97;
        const shift = cleanKey.charCodeAt(keyIdx % cleanKey.length) - 65;
        const s = isDecrypt ? (26 - shift) % 26 : shift;
        keyIdx++;
        return String.fromCharCode(((code - base + s) % 26) + base);
      }
      return ch;
    }).join('');
  }

  function transformAtbash(text) {
    return text.split('').map(ch => {
      const code = ch.charCodeAt(0);
      if (code >= 65 && code <= 90) {
        return String.fromCharCode(90 - (code - 65));
      } else if (code >= 97 && code <= 122) {
        return String.fromCharCode(122 - (code - 97));
      }
      return ch;
    }).join('');
  }

  function updateCipherAnalysis() {
    const inputEl = document.getElementById('cipher-input-text');
    const outputEl = document.getElementById('cipher-output-text');
    if (!inputEl) return;

    const raw = inputEl.value;
    const isDec = state.cipherMode === 'decrypt';
    let result = '';

    if (state.cipherType === 'caesar') {
      result = transformCaesar(raw, state.caesarShift, isDec);
    } else if (state.cipherType === 'rot13') {
      result = transformCaesar(raw, 13, false);
    } else if (state.cipherType === 'vigenere') {
      result = transformVigenere(raw, state.vigenereKey, isDec);
    } else if (state.cipherType === 'atbash') {
      result = transformAtbash(raw);
    }

    if (outputEl) outputEl.value = result;

    // Telemetry counts
    const charCountEl = document.getElementById('cipher-char-count');
    const wordCountEl = document.getElementById('cipher-word-count');
    if (charCountEl) charCountEl.textContent = `${raw.length} chars`;
    if (wordCountEl) {
      const words = raw.trim() ? raw.trim().split(/\s+/).length : 0;
      wordCountEl.textContent = `${words} words`;
    }

    // Run Frequency Analysis on the current target text (output or input)
    renderFrequencyChart(result || raw);
  }

  function swapCipherTexts() {
    const inputEl = document.getElementById('cipher-input-text');
    const outputEl = document.getElementById('cipher-output-text');
    if (inputEl && outputEl) {
      const temp = inputEl.value;
      inputEl.value = outputEl.value;
      outputEl.value = temp;
      updateCipherAnalysis();
    }
  }

  function loadCipherPreset(presetIndex) {
    const inputEl = document.getElementById('cipher-input-text');
    if (!inputEl) return;

    if (presetIndex === 1) {
      inputEl.value = "ALL HUMAN BEINGS BY NATURE DESIRE TO UNDERSTAND. AN ARISTOTELIAN PRINCIPLE ANCHORED IN COMPUTATION.";
    } else if (presetIndex === 2) {
      inputEl.value = "THE DIE IS CAST. CROSSING THE RUBICON REQUIRES RESOLUTE MATHEMATICAL CONVICTION AND STRUCTURAL CERTAINTY.";
    } else {
      inputEl.value = "";
    }
    updateCipherAnalysis();
  }

  function renderFrequencyChart(text) {
    const container = document.getElementById('cipher-freq-chart');
    if (!container) return;

    const clean = text.toUpperCase().replace(/[^A-Z]/g, '');
    const total = clean.length || 1;
    const counts = {};
    for (let c = 65; c <= 90; c++) counts[String.fromCharCode(c)] = 0;
    for (let i = 0; i < clean.length; i++) counts[clean[i]] = (counts[clean[i]] || 0) + 1;

    // Calculate Index of Coincidence
    let iocSum = 0;
    for (const letter in counts) {
      iocSum += counts[letter] * (counts[letter] - 1);
    }
    const ioc = clean.length > 1 ? (iocSum / (clean.length * (clean.length - 1))) : 0;

    const iocValEl = document.getElementById('cipher-ioc-val');
    const iocLabelEl = document.getElementById('cipher-ioc-label');
    if (iocValEl) iocValEl.textContent = ioc.toFixed(4);
    if (iocLabelEl) {
      if (clean.length < 10) {
        iocLabelEl.textContent = "Insufficient sample length";
      } else if (ioc >= 0.058) {
        iocLabelEl.textContent = "Monoalphabetic Characteristic (High probability Caesar/Atbash)";
        iocLabelEl.className = "text-[11px] font-semibold text-emerald-800";
      } else {
        iocLabelEl.textContent = "Polyalphabetic / Uniform Dispersion (Vigenère or random)";
        iocLabelEl.className = "text-[11px] font-semibold text-amber-800";
      }
    }

    // Render 26 comparative bars
    container.innerHTML = Object.keys(ENGLISH_FREQUENCIES).map(letter => {
      const textPct = ((counts[letter] / total) * 100);
      const engPct = ENGLISH_FREQUENCIES[letter];
      const maxPct = 15; // Max scale percentage
      const textHeightPx = Math.min(100, Math.round((textPct / maxPct) * 100));
      const engHeightPx = Math.min(100, Math.round((engPct / maxPct) * 100));

      return `
        <div class="flex flex-col items-center flex-1 min-w-[12px] group relative">
          <!-- Tooltip on hover -->
          <div class="absolute -top-12 left-1/2 -translate-x-1/2 hidden group-hover:flex flex-col items-center bg-[#1C1613] text-white text-[9px] px-1.5 py-1 rounded shadow-md z-20 pointer-events-none whitespace-nowrap">
            <span>${letter}: ${textPct.toFixed(1)}%</span>
            <span class="text-[#D8CFBF]">Eng: ${engPct.toFixed(1)}%</span>
          </div>

          <!-- Vertical Bar Column -->
          <div class="w-full h-24 bg-[#F7F4EF] rounded-t flex items-end justify-center relative border-b border-[#D8CFBF] overflow-hidden">
            <!-- English Reference Line Marker -->
            <div class="absolute w-full border-t border-dashed border-[#B8AEA0] z-10" style="bottom: ${engHeightPx}%;"></div>
            
            <!-- Actual Text Bar -->
            <div class="w-full bg-[#2C221E] transition-all duration-150 rounded-t" style="height: ${textHeightPx}%;"></div>
          </div>

          <!-- Letter Label -->
          <span class="text-[10px] font-mono font-bold text-[#3E3632] mt-1">${letter}</span>
        </div>
      `;
    }).join('');
  }

  function autoSolveCaesarShift() {
    const inputEl = document.getElementById('cipher-input-text');
    if (!inputEl) return;
    const text = inputEl.value.toUpperCase().replace(/[^A-Z]/g, '');
    if (text.length < 5) {
      alert("Please provide at least 5 letters of ciphertext to run the Chi-Squared Frequency Attack.");
      return;
    }

    let bestShift = 0;
    let minChiSquare = Infinity;

    for (let shift = 0; shift < 26; shift++) {
      const candidate = transformCaesar(text, shift, true);
      const counts = {};
      for (let c = 65; c <= 90; c++) counts[String.fromCharCode(c)] = 0;
      for (let i = 0; i < candidate.length; i++) counts[candidate[i]]++;

      let chiSq = 0;
      for (const letter in ENGLISH_FREQUENCIES) {
        const expected = (ENGLISH_FREQUENCIES[letter] / 100) * candidate.length;
        const observed = counts[letter] || 0;
        chiSq += Math.pow(observed - expected, 2) / (expected || 0.001);
      }

      if (chiSq < minChiSquare) {
        minChiSquare = chiSq;
        bestShift = shift;
      }
    }

    // Apply discovered shift
    state.caesarShift = bestShift;
    state.cipherType = 'caesar';
    state.cipherMode = 'decrypt';
    setCipherType('caesar');
    setCipherMode('decrypt');

    const slider = document.getElementById('cipher-caesar-shift');
    const label = document.getElementById('cipher-caesar-shift-val');
    if (slider) slider.value = bestShift;
    if (label) label.textContent = bestShift;

    const attackBanner = document.getElementById('cipher-attack-banner');
    if (attackBanner) {
      attackBanner.innerHTML = `
        <div class="p-3 bg-emerald-50 border border-emerald-300 rounded-lg text-xs text-emerald-900 font-semibold flex items-center justify-between">
          <span>Chi-Squared Cryptanalysis Success: Optimal Key Shift = <strong>${bestShift}</strong> (Score: ${minChiSquare.toFixed(1)})</span>
          <span class="font-mono text-[10px] text-emerald-700">Decryption Applied</span>
        </div>
      `;
      attackBanner.classList.remove('hidden');
    }

    updateCipherAnalysis();
  }

  // ============================================================
  // 2. Asymmetric Encryption & Key Exchange (RSA / AES)
  // ============================================================

  function initAsymmetric() {
    const pSelect = document.getElementById('rsa-p-select');
    const qSelect = document.getElementById('rsa-q-select');
    const msgInput = document.getElementById('rsa-message-input');

    if (pSelect) {
      pSelect.addEventListener('change', (e) => {
        state.rsaP = parseInt(e.target.value, 10);
        calculateRsaKeys();
      });
    }

    if (qSelect) {
      qSelect.addEventListener('change', (e) => {
        state.rsaQ = parseInt(e.target.value, 10);
        calculateRsaKeys();
      });
    }

    if (msgInput) {
      msgInput.addEventListener('input', (e) => {
        state.rsaPlaintext = e.target.value || 'A';
        runRsaEncryption();
      });
    }

    calculateRsaKeys();
    runRsaEncryption();
  }

  function gcd(a, b) {
    while (b !== 0) {
      const t = b;
      b = a % b;
      a = t;
    }
    return a;
  }

  function modInverse(e, phi) {
    let m0 = phi;
    let y = 0, x = 1;
    if (phi === 1) return 0;
    while (e > 1) {
      const q = Math.floor(e / phi);
      let t = phi;
      phi = e % phi;
      e = t;
      t = y;
      y = x - q * y;
      x = t;
    }
    if (x < 0) x += m0;
    return x;
  }

  function modPow(base, exp, mod) {
    let res = 1n;
    let b = BigInt(base) % BigInt(mod);
    let e = BigInt(exp);
    const m = BigInt(mod);

    while (e > 0n) {
      if (e % 2n === 1n) res = (res * b) % m;
      e = e / 2n;
      b = (b * b) % m;
    }
    return Number(res);
  }

  function calculateRsaKeys() {
    const p = state.rsaP;
    const q = state.rsaQ;
    const n = p * q;
    const phi = (p - 1) * (q - 1);

    // Pick e
    const candidates = [17, 65537, 3, 5, 7, 11, 13, 19, 23, 29, 31];
    let eVal = 17;
    for (const c of candidates) {
      if (c < phi && gcd(c, phi) === 1) {
        eVal = c;
        break;
      }
    }

    const dVal = modInverse(eVal, phi);

    state.rsaN = n;
    state.rsaPhi = phi;
    state.rsaE = eVal;
    state.rsaD = dVal;

    // Update DOM Display
    const pEl = document.getElementById('rsa-val-p');
    const qEl = document.getElementById('rsa-val-q');
    const nEl = document.getElementById('rsa-val-n');
    const phiEl = document.getElementById('rsa-val-phi');
    const pubKeyEl = document.getElementById('rsa-pub-key-display');
    const privKeyEl = document.getElementById('rsa-priv-key-display');

    if (pEl) pEl.textContent = p;
    if (qEl) qEl.textContent = q;
    if (nEl) nEl.textContent = n;
    if (phiEl) phiEl.textContent = phi;
    if (pubKeyEl) pubKeyEl.textContent = `(e = ${eVal}, n = ${n})`;
    if (privKeyEl) privKeyEl.textContent = `(d = ${dVal}, n = ${n})`;

    runRsaEncryption();
  }

  function runRsaEncryption() {
    const msg = state.rsaPlaintext || 'POLYMATH';
    const n = state.rsaN;
    const e = state.rsaE;
    const d = state.rsaD;

    const blockResults = [];
    let decryptedStr = '';

    for (let i = 0; i < msg.length; i++) {
      const asciiCode = msg.charCodeAt(i);
      // Ensure asciiCode < n
      const mVal = asciiCode % n;
      const cVal = modPow(mVal, e, n);
      const mDecrypted = modPow(cVal, d, n);
      const decryptedChar = String.fromCharCode(mDecrypted);

      blockResults.push({
        char: msg[i],
        ascii: asciiCode,
        cipher: cVal,
        decryptedAscii: mDecrypted,
        decryptedChar: decryptedChar
      });

      decryptedStr += decryptedChar;
    }

    state.rsaCipherBlocks = blockResults;
    state.rsaDecryptedText = decryptedStr;

    // Render Blocks in UI
    const blocksContainer = document.getElementById('rsa-blocks-container');
    const cipherTokensEl = document.getElementById('rsa-ciphertext-tokens');
    const decryptedOutputEl = document.getElementById('rsa-decrypted-output');

    if (cipherTokensEl) {
      cipherTokensEl.textContent = blockResults.map(b => b.cipher).join(' ');
    }

    if (decryptedOutputEl) {
      decryptedOutputEl.textContent = decryptedStr;
    }

    if (blocksContainer) {
      blocksContainer.innerHTML = blockResults.map((b, idx) => `
        <div class="p-2.5 rounded-lg border border-[#EAE3D9] bg-white text-xs font-mono text-center space-y-1">
          <div class="text-[10px] text-[#7C7067] uppercase font-sans font-bold">Char #${idx + 1}</div>
          <div class="text-sm font-bold text-[#1C1613]">${b.char} <span class="text-[10px] text-[#7C7067]">(${b.ascii})</span></div>
          <div class="p-1 bg-[#F7F4EF] rounded text-[#2C221E] font-bold">C: ${b.cipher}</div>
          <div class="text-[10px] text-emerald-700 font-bold">&rarr; Dec: '${b.decryptedChar}'</div>
        </div>
      `).join('');
    }
  }

  function advanceHandshakeStep() {
    state.handshakeStep = (state.handshakeStep + 1) % 4;
    renderHandshake();
  }

  function resetHandshake() {
    state.handshakeStep = 0;
    renderHandshake();
  }

  function renderHandshake() {
    const steps = [
      {
        title: "Step 1: Alice Connects & Receives Bob's RSA Certificate",
        desc: "Alice connects to server. Server presents Public Key (e=17, n=3233) signed by Certificate Authority.",
        stateBadge: "Handshake Initiated"
      },
      {
        title: "Step 2: Client Generates 256-bit AES Session Key",
        desc: "Alice securely generates ephemeral symmetric key (e.g. 0x9F4C2A1E8B...). No data transmitted yet.",
        stateBadge: "Session Key Created"
      },
      {
        title: "Step 3: Alice Encrypts AES Key via RSA Public Key",
        desc: "Ciphertext key sent over insecure wire. Eavesdropper cannot factor n=3233 to discover d.",
        stateBadge: "Encapsulation Complete"
      },
      {
        title: "Step 4: Bob Decrypts AES Key & Symmetric Channel Established",
        desc: "Both parties now share the identical 256-bit AES key. High-throughput AES-GCM data stream commences.",
        stateBadge: "TLS Tunnel Active"
      }
    ];

    const current = steps[state.handshakeStep];
    const stepTitle = document.getElementById('tls-step-title');
    const stepDesc = document.getElementById('tls-step-desc');
    const stepBadge = document.getElementById('tls-step-badge');

    if (stepTitle) stepTitle.textContent = current.title;
    if (stepDesc) stepDesc.textContent = current.desc;
    if (stepBadge) stepBadge.textContent = current.stateBadge;

    for (let i = 0; i < 4; i++) {
      const indicator = document.getElementById(`tls-step-dot-${i}`);
      if (indicator) {
        if (i <= state.handshakeStep) {
          indicator.className = "w-3 h-3 rounded-full bg-[#2C221E]";
        } else {
          indicator.className = "w-3 h-3 rounded-full bg-[#D8CFBF]";
        }
      }
    }
  }

  // ============================================================
  // 3. Cryptographic Hashing & Signatures (SHA-256)
  // ============================================================

  // Pure JS SHA-256 fallback to ensure synchronous instant responsiveness
  function sha256(ascii) {
    function rightRotate(value, amount) {
      return (value >>> amount) | (value << (32 - amount));
    }

    const mathPow = Math.pow;
    const maxWord = mathPow(2, 32);
    let lengthProperty = 'length';
    let i, j;
    let result = '';

    const words = [];
    const asciiBitLength = ascii[lengthProperty] * 8;

    let hash = [];
    const k = [];
    let primeCounter = 0;

    const isComposite = {};
    for (let candidate = 2; primeCounter < 64; candidate++) {
      if (!isComposite[candidate]) {
        for (i = 0; i < 313; i += candidate) {
          isComposite[i] = candidate;
        }
        hash[primeCounter] = (mathPow(candidate, 0.5) * maxWord) | 0;
        k[primeCounter++] = (mathPow(candidate, 1 / 3) * maxWord) | 0;
      }
    }

    ascii += '\x80';
    while ((ascii[lengthProperty] % 64) - 56) ascii += '\x00';
    for (i = 0; i < ascii[lengthProperty]; i++) {
      j = ascii.charCodeAt(i);
      if (j >> 8) return '';
      words[i >> 2] |= j << (((3 - i) % 4) * 8);
    }
    words[words[lengthProperty]] = (asciiBitLength / maxWord) | 0;
    words[words[lengthProperty]] = asciiBitLength;

    for (j = 0; j < words[lengthProperty];) {
      const w = words.slice(j, (j += 16));
      const oldHash = hash;
      hash = hash.slice(0, 8);

      for (i = 0; i < 64; i++) {
        const w15 = w[i - 15], w2 = w[i - 2];

        const s0 = rightRotate(w15, 7) ^ rightRotate(w15, 18) ^ (w15 >>> 3);
        const s1 = rightRotate(w2, 17) ^ rightRotate(w2, 19) ^ (w2 >>> 10);
        const ch = (hash[4] & hash[5]) ^ (~hash[4] & hash[6]);
        const maj = (hash[0] & hash[1]) ^ (hash[0] & hash[2]) ^ (hash[1] & hash[2]);

        const temp1 = hash[7] + (rightRotate(hash[4], 6) ^ rightRotate(hash[4], 11) ^ rightRotate(hash[4], 25)) + ch + k[i] + (w[i] = (i < 16) ? w[i] : (w[i - 16] + s0 + w[i - 7] + s1) | 0);
        const temp2 = (rightRotate(hash[0], 2) ^ rightRotate(hash[0], 13) ^ rightRotate(hash[0], 22)) + maj;

        hash = [(temp1 + temp2) | 0].concat(hash);
        hash[4] = (hash[4] + temp1) | 0;
      }

      for (i = 0; i < 8; i++) {
        hash[i] = (hash[i] + oldHash[i]) | 0;
      }
    }

    for (i = 0; i < 8; i++) {
      for (j = 3; j + 1; j--) {
        const b = (hash[i] >> (j * 8)) & 255;
        result += ((b < 16) ? '0' : '') + b.toString(16);
      }
    }
    return result;
  }

  function hexToBinaryString(hex) {
    let bin = '';
    for (let i = 0; i < hex.length; i++) {
      bin += parseInt(hex[i], 16).toString(2).padStart(4, '0');
    }
    return bin;
  }

  function initHashing() {
    const liveInput = document.getElementById('hash-live-input');
    const avalancheInputA = document.getElementById('avalanche-input-a');
    const avalancheInputB = document.getElementById('avalanche-input-b');

    if (liveInput) {
      liveInput.addEventListener('input', (e) => {
        state.hashInput = e.target.value;
        updateLiveHash();
      });
    }

    if (avalancheInputA) {
      avalancheInputA.addEventListener('input', (e) => {
        state.avalancheA = e.target.value;
        updateAvalancheComparison();
      });
    }

    if (avalancheInputB) {
      avalancheInputB.addEventListener('input', (e) => {
        state.avalancheB = e.target.value;
        updateAvalancheComparison();
      });
    }

    updateLiveHash();
    updateAvalancheComparison();
    signDocument();
  }

  function updateLiveHash() {
    const input = state.hashInput || '';
    const hash = sha256(input);
    const hexEl = document.getElementById('hash-live-output');
    const bitGridEl = document.getElementById('hash-bit-matrix');
    const byteLenEl = document.getElementById('hash-byte-len');

    if (hexEl) hexEl.textContent = hash;
    if (byteLenEl) byteLenEl.textContent = `${new TextEncoder().encode(input).length} bytes (${input.length} chars)`;

    if (bitGridEl) {
      const bin = hexToBinaryString(hash);
      bitGridEl.innerHTML = bin.split('').map((bit, idx) => `
        <span class="inline-block w-2.5 h-2.5 m-[1px] rounded-sm text-[8px] font-mono leading-none flex items-center justify-center font-bold ${
          bit === '1' ? 'bg-[#2C221E] text-white' : 'bg-[#EAE3D9] text-[#7C7067]'
        }" title="Bit ${idx + 1}: ${bit}">
          ${bit}
        </span>
      `).join('');
    }
  }

  function updateAvalancheComparison() {
    const hashA = sha256(state.avalancheA || '');
    const hashB = sha256(state.avalancheB || '');

    const binA = hexToBinaryString(hashA);
    const binB = hexToBinaryString(hashB);

    let diffBits = 0;
    for (let i = 0; i < 256; i++) {
      if (binA[i] !== binB[i]) diffBits++;
    }

    const pct = ((diffBits / 256) * 100).toFixed(1);

    const outA = document.getElementById('avalanche-hash-a');
    const outB = document.getElementById('avalanche-hash-b');
    const diffCountEl = document.getElementById('avalanche-diff-count');
    const diffPctEl = document.getElementById('avalanche-diff-pct');
    const diffBarEl = document.getElementById('avalanche-diff-bar');

    if (outA) outA.textContent = hashA;
    if (outB) outB.textContent = hashB;
    if (diffCountEl) diffCountEl.textContent = `${diffBits} / 256 Bits`;
    if (diffPctEl) diffPctEl.textContent = `${pct}% Flip`;
    if (diffBarEl) diffBarEl.style.width = `${pct}%`;
  }

  function signDocument() {
    state.isTampered = false;
    const docText = state.signedDocText;
    const hash = sha256(docText);
    state.signedDocHash = hash;

    // Simulated RSA signature = first 16 bytes encoded
    state.signedDocSignature = `SIG-RSA2048_${hash.substring(0, 32).toUpperCase()}`;

    renderSignatureState();
  }

  function tamperDocument() {
    state.isTampered = true;
    state.signedDocText = "Authorized Ledger Transfer: 9,000 Credits to Polymath Treasury"; // 1 char altered
    renderSignatureState();
  }

  function restoreDocument() {
    state.isTampered = false;
    state.signedDocText = "Authorized Ledger Transfer: 1,000 Credits to Polymath Treasury";
    renderSignatureState();
  }

  function renderSignatureState() {
    const docTextEl = document.getElementById('sig-doc-content');
    const sigValueEl = document.getElementById('sig-doc-signature');
    const statusCard = document.getElementById('sig-status-badge');

    if (docTextEl) docTextEl.value = state.signedDocText;
    if (sigValueEl) sigValueEl.textContent = state.signedDocSignature;

    if (statusCard) {
      const currentDocHash = sha256(state.signedDocText);
      const isValid = (currentDocHash === state.signedDocHash) && !state.isTampered;

      if (isValid) {
        statusCard.className = "p-4 rounded-xl bg-emerald-50 border border-emerald-300 text-emerald-900";
        statusCard.innerHTML = `
          <div class="flex items-center justify-between font-bold text-xs mb-1">
            <span>INTEGRITY VERIFIED: Document Authenticated</span>
            <span class="font-mono text-[10px] uppercase">Status 200 OK</span>
          </div>
          <p class="text-[11px] text-emerald-800 leading-relaxed">
            The cryptographic hash computed from the document payload matches the decrypted signature hash exactly. No tampering detected.
          </p>
        `;
      } else {
        statusCard.className = "p-4 rounded-xl bg-rose-50 border border-rose-300 text-rose-900";
        statusCard.innerHTML = `
          <div class="flex items-center justify-between font-bold text-xs mb-1">
            <span>TAMPER DETECTED: Signature Verification Failed</span>
            <span class="font-mono text-[10px] uppercase">Integrity Breach</span>
          </div>
          <p class="text-[11px] text-rose-800 leading-relaxed">
            A single character change altered the SHA-256 hash digest. The original signature is mathematically invalid for this tampered payload.
          </p>
        `;
      }
    }
  }

  // ============================================================
  // 4. Zero-Knowledge Proofs (ZK-SNARKs)
  // ============================================================

  function initZKP() {
    renderZkpState();
  }

  function executeZkpRound(isImposter = false) {
    const p = state.zkpPrimeP;
    const g = state.zkpBaseG;
    const Y = state.zkpPublicKeyY;
    const x = isImposter ? 9999 : state.zkpSecretX; // Fake key if imposter

    // 1. Prover Commitment: r random nonce, C = g^r % p
    const r = Math.floor(Math.random() * 500) + 1;
    const C = modPow(g, r, p);

    // 2. Verifier Challenge: e in {0, 1}
    const challengeE = Math.random() < 0.5 ? 0 : 1;

    // 3. Prover Response: s = r + e*x (mod p-1)
    const s = (r + challengeE * x) % (p - 1);

    // 4. Verifier Check: g^s % p == (C * (Y^e)) % p
    const leftSide = modPow(g, s, p);
    const rightSide = (C * modPow(Y, challengeE, p)) % p;

    const roundPassed = (leftSide === rightSide);

    state.zkpRoundsCompleted++;
    if (roundPassed) {
      state.zkpSuccessfulRounds++;
    } else {
      state.zkpCheatDetected = true;
    }

    state.zkpHistory.unshift({
      round: state.zkpRoundsCompleted,
      commitment: C,
      challenge: challengeE,
      response: s,
      passed: roundPassed,
      imposter: isImposter
    });

    if (state.zkpHistory.length > 8) state.zkpHistory.pop();

    renderZkpState();
  }

  function autoRunZkpRounds(count = 10) {
    for (let i = 0; i < count; i++) {
      executeZkpRound(false);
    }
  }

  function resetZkp() {
    state.zkpRoundsCompleted = 0;
    state.zkpSuccessfulRounds = 0;
    state.zkpCheatDetected = false;
    state.zkpHistory = [];
    renderZkpState();
  }

  function renderZkpState() {
    const rounds = state.zkpRoundsCompleted;
    const cheats = state.zkpCheatDetected;

    // Cheat probability = (1/2)^rounds
    const cheatProb = rounds === 0 ? 100 : (Math.pow(0.5, rounds) * 100);
    const confidence = rounds === 0 ? 0 : (100 - cheatProb);

    const roundsEl = document.getElementById('zkp-rounds-counter');
    const confidenceEl = document.getElementById('zkp-confidence-val');
    const cheatProbEl = document.getElementById('zkp-cheat-prob');
    const progressBar = document.getElementById('zkp-progress-bar');
    const statusBanner = document.getElementById('zkp-status-banner');
    const historyContainer = document.getElementById('zkp-rounds-history');

    if (roundsEl) roundsEl.textContent = `${rounds} Rounds`;
    if (confidenceEl) confidenceEl.textContent = `${confidence.toFixed(4)}%`;
    if (cheatProbEl) cheatProbEl.textContent = `${cheatProb.toFixed(4)}%`;
    if (progressBar) progressBar.style.width = `${confidence}%`;

    if (statusBanner) {
      if (cheats) {
        statusBanner.className = "p-4 rounded-xl bg-rose-50 border border-rose-300 text-rose-900";
        statusBanner.innerHTML = `
          <div class="font-bold text-xs uppercase mb-1">IMPOSTER DETECTED &bull; ZERO-KNOWLEDGE PROOF FAILED</div>
          <p class="text-[11px] text-rose-800 leading-relaxed">
            The prover attempted verification without knowledge of the secret witness <em>x</em>. The verifier's challenge caught the algebraic contradiction with mathematical certainty.
          </p>
        `;
      } else if (rounds >= 10) {
        statusBanner.className = "p-4 rounded-xl bg-emerald-50 border border-emerald-300 text-emerald-900";
        statusBanner.innerHTML = `
          <div class="font-bold text-xs uppercase mb-1">PROVED WITH ZERO SECRECY LEAKAGE &bull; CONFIDENCE > 99.9%</div>
          <p class="text-[11px] text-emerald-800 leading-relaxed">
            Peggy has convinced Victor she knows secret witness <em>x</em> without revealing even a single bit of <em>x</em>!
          </p>
        `;
      } else if (rounds > 0) {
        statusBanner.className = "p-4 rounded-xl bg-[#F7F4EF] border border-[#D8CFBF] text-[#2C221E]";
        statusBanner.innerHTML = `
          <div class="font-bold text-xs uppercase mb-1">INTERACTIVE VERIFICATION IN PROGRESS (${rounds} ROUNDS)</div>
          <p class="text-[11px] text-[#5C524C] leading-relaxed">
            Each challenge round bisects the imposter's chance of guessing the coin flip. Continue rounds to reach enterprise cryptographic confidence.
          </p>
        `;
      } else {
        statusBanner.className = "p-4 rounded-xl bg-[#F7F4EF] border border-[#EAE3D9] text-[#7C7067]";
        statusBanner.innerHTML = `
          <div class="font-bold text-xs uppercase mb-1">READY FOR INTERACTIVE PROTOCOL</div>
          <p class="text-[11px] text-[#7C7067] leading-relaxed">
            Click "Run Single Round" or "Auto-Run 10 Rounds" to watch Victor challenge Peggy's knowledge of secret witness <em>x = 137</em>.
          </p>
        `;
      }
    }

    if (historyContainer) {
      if (state.zkpHistory.length === 0) {
        historyContainer.innerHTML = `
          <div class="p-6 text-center text-xs text-[#7C7067] font-mono bg-white rounded-lg border border-[#EAE3D9]">
            No challenge rounds recorded yet.
          </div>
        `;
      } else {
        historyContainer.innerHTML = state.zkpHistory.map(h => `
          <div class="p-3 rounded-lg border text-xs font-mono flex items-center justify-between ${
            h.passed ? 'bg-emerald-50/60 border-emerald-200' : 'bg-rose-50/60 border-rose-200'
          }">
            <div class="flex items-center space-x-3">
              <span class="font-bold text-[#1C1613]">Round #${h.round}</span>
              <span class="text-[#7C7067]">Commit: ${h.commitment}</span>
              <span class="text-[#2C221E]">Challenge: e=${h.challenge}</span>
              <span class="text-[#7C7067]">Response: s=${h.response}</span>
            </div>
            <span class="font-bold text-xs ${h.passed ? 'text-emerald-800' : 'text-rose-800'}">
              ${h.passed ? 'VERIFIED' : 'FAILED'}
            </span>
          </div>
        `).join('');
      }
    }
  }

  // Public Interface
  return {
    init,
    initView,

    // Ciphers
    setCipherType,
    setCipherMode,
    swapCipherTexts,
    loadCipherPreset,
    autoSolveCaesarShift,

    // Asymmetric
    calculateRsaKeys,
    runRsaEncryption,
    advanceHandshakeStep,
    resetHandshake,

    // Hashing
    updateLiveHash,
    updateAvalancheComparison,
    tamperDocument,
    restoreDocument,

    // ZKP
    executeZkpRound,
    autoRunZkpRounds,
    resetZkp
  };

})();

// Expose globally
window.CRYPTO_MODULE = CRYPTO_MODULE;
