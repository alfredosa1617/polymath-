/**
 * Polymath VSN - Music & Acoustics Domain
 * Sub-Skill 1: 3D Guitar Chord Interactive Lab (Acoustic & Electric)
 * Sub-Skill 2: Fretboard Harmony & Theory
 * Professional enterprise audio-visual laboratory (Web Audio API & Three.js WebGL)
 */

const GUITAR_MODULE = (() => {

  // ==========================================================================
  // 1. DATA: Standard Tuning, Chord Library & Scale Theory
  // ==========================================================================

  // Standard Guitar Tuning (String 6 to String 1: E2, A2, D3, G3, B3, E4)
  const STRINGS = [
    { index: 0, name: "E", octave: 2, openFreq: 82.4069, label: "6th (Low E)" },
    { index: 1, name: "A", octave: 2, openFreq: 110.0000, label: "5th (A)" },
    { index: 2, name: "D", octave: 3, openFreq: 146.8324, label: "4th (D)" },
    { index: 3, name: "G", octave: 3, openFreq: 195.9977, label: "3rd (G)" },
    { index: 4, name: "B", octave: 3, openFreq: 246.9417, label: "2nd (B)" },
    { index: 5, name: "E", octave: 4, openFreq: 329.6276, label: "1st (High E)" }
  ];

  const NOTE_NAMES = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];

  // Helper: calculate frequency for string and fret
  function getFrequency(stringIndex, fret) {
    if (fret < 0 || fret === 'x' || fret === 'X') return 0;
    const baseFreq = STRINGS[stringIndex].openFreq;
    return baseFreq * Math.pow(2, fret / 12);
  }

  // Helper: get note name for string and fret
  function getNoteName(stringIndex, fret) {
    if (fret < 0 || fret === 'x' || fret === 'X') return "X";
    const openNotes = [4, 9, 2, 7, 11, 4]; // E, A, D, G, B, E indices in NOTE_NAMES
    const noteIdx = (openNotes[stringIndex] + fret) % 12;
    return NOTE_NAMES[noteIdx];
  }

  // Chord Library (Open, Barre, 7th, Extended)
  // frets: [E6, A5, D4, G3, B2, E1] where -1 = muted (x), 0 = open
  // fingers: finger number for each string ('1'=index, '2'=middle, '3'=ring, '4'=pinky, '0'=open, 'x'=muted)
  const CHORDS = {
    // Open Chords
    "c-major": {
      id: "c-major",
      name: "C Major",
      category: "Open Triads",
      root: "C",
      formula: "1 - 3 - 5",
      intervals: "Root, Major 3rd, Perfect 5th",
      notes: ["C", "E", "G"],
      frets: [-1, 3, 2, 0, 1, 0],
      fingers: ["x", "3", "2", "0", "1", "0"],
      barre: null,
      harmonicRole: "Tonic (I) in C Major, Subdominant (IV) in G Major, Dominant (V) in F Major.",
      tips: "Arch the index finger to keep the open high E string ringing cleanly."
    },
    "a-minor": {
      id: "a-minor",
      name: "A Minor",
      category: "Open Triads",
      root: "A",
      formula: "1 - b3 - 5",
      intervals: "Root, Minor 3rd, Perfect 5th",
      notes: ["A", "C", "E"],
      frets: [-1, 0, 2, 2, 1, 0],
      fingers: ["x", "0", "2", "3", "1", "0"],
      barre: null,
      harmonicRole: "Relative minor (vi) of C Major. Foundational natural minor triad.",
      tips: "Keep your knuckles elevated so the ring finger on G string doesn't touch the B string."
    },
    "g-major": {
      id: "g-major",
      name: "G Major",
      category: "Open Triads",
      root: "G",
      formula: "1 - 3 - 5",
      intervals: "Root, Major 3rd, Perfect 5th",
      notes: ["G", "B", "D"],
      frets: [3, 2, 0, 0, 0, 3],
      fingers: ["2", "1", "0", "0", "0", "3"],
      barre: null,
      harmonicRole: "Dominant (V) in C Major, Tonic (I) in G Major.",
      tips: "Standard folk voicing utilizing 3 fingers, maintaining high dynamic acoustic resonance."
    },
    "e-minor": {
      id: "e-minor",
      name: "E Minor",
      category: "Open Triads",
      root: "E",
      formula: "1 - b3 - 5",
      intervals: "Root, Minor 3rd, Perfect 5th",
      notes: ["E", "G", "B"],
      frets: [0, 2, 2, 0, 0, 0],
      fingers: ["0", "2", "3", "0", "0", "0"],
      barre: null,
      harmonicRole: "Relative minor (vi) of G Major. Heavy resonant low-end tone.",
      tips: "All six strings ring out. Excellent for examining open string harmonic decay."
    },
    "d-major": {
      id: "d-major",
      name: "D Major",
      category: "Open Triads",
      root: "D",
      formula: "1 - 3 - 5",
      intervals: "Root, Major 3rd, Perfect 5th",
      notes: ["D", "F#", "A"],
      frets: [-1, -1, 0, 2, 3, 2],
      fingers: ["x", "x", "0", "1", "3", "2"],
      barre: null,
      harmonicRole: "Subdominant (IV) in A Major, Dominant (V) in G Major.",
      tips: "Mute the 6th and 5th strings with the thumb or avoid strumming them."
    },
    "e-major": {
      id: "e-major",
      name: "E Major",
      category: "Open Triads",
      root: "E",
      formula: "1 - 3 - 5",
      intervals: "Root, Major 3rd, Perfect 5th",
      notes: ["E", "G#", "B"],
      frets: [0, 2, 2, 1, 0, 0],
      fingers: ["0", "2", "3", "1", "0", "0"],
      barre: null,
      harmonicRole: "Tonic (I) in E Major, Dominant (V) in A Major.",
      tips: "Index finger on G string fret 1 provides the bright Major 3rd (G#)."
    },
    "a-major": {
      id: "a-major",
      name: "A Major",
      category: "Open Triads",
      root: "A",
      formula: "1 - 3 - 5",
      intervals: "Root, Major 3rd, Perfect 5th",
      notes: ["A", "C#", "E"],
      frets: [-1, 0, 2, 2, 2, 0],
      fingers: ["x", "0", "1", "2", "3", "0"],
      barre: null,
      harmonicRole: "Tonic (I) in A Major, Dominant (V) in D Major.",
      tips: "Keep fingers 1, 2, 3 stacked neatly inside the second fret."
    },
    "d-minor": {
      id: "d-minor",
      name: "D Minor",
      category: "Open Triads",
      root: "D",
      formula: "1 - b3 - 5",
      intervals: "Root, Minor 3rd, Perfect 5th",
      notes: ["D", "F", "A"],
      frets: [-1, -1, 0, 2, 3, 1],
      fingers: ["x", "x", "0", "2", "3", "1"],
      barre: null,
      harmonicRole: "Supertonic (ii) in C Major, Relative minor (vi) in F Major.",
      tips: "The minor 3rd (F natural) is held on the 1st fret of the high E string."
    },
    "c-add9": {
      id: "c-add9",
      name: "Cadd9",
      category: "Open Extended",
      root: "C",
      formula: "1 - 3 - 5 - 9",
      intervals: "Root, Major 3rd, Perfect 5th, Major 9th",
      notes: ["C", "E", "G", "D"],
      frets: [-1, 3, 2, 0, 3, 3],
      fingers: ["x", "2", "1", "0", "3", "4"],
      barre: null,
      harmonicRole: "Modern acoustic harmonic anchor. Smooth voice leading to G Major.",
      tips: "Pinky and ring fingers lock the top two strings on fret 3."
    },

    // Barre Chords
    "f-major": {
      id: "f-major",
      name: "F Major",
      category: "Barre Chords",
      root: "F",
      formula: "1 - 3 - 5",
      intervals: "Root, Major 3rd, Perfect 5th",
      notes: ["F", "A", "C"],
      frets: [1, 3, 3, 2, 1, 1],
      fingers: ["1", "3", "4", "2", "1", "1"],
      barre: { fret: 1, startString: 0, endString: 5 },
      harmonicRole: "Subdominant (IV) in C Major. E-shape barre at Fret 1.",
      tips: "Rotate the index finger slightly on its bony side to ensure clean contact across all strings."
    },
    "b-minor": {
      id: "b-minor",
      name: "B Minor",
      category: "Barre Chords",
      root: "B",
      formula: "1 - b3 - 5",
      intervals: "Root, Minor 3rd, Perfect 5th",
      notes: ["B", "D", "F#"],
      frets: [-1, 2, 4, 4, 3, 2],
      fingers: ["x", "1", "3", "4", "2", "1"],
      barre: { fret: 2, startString: 1, endString: 5 },
      harmonicRole: "Relative minor (vi) of D Major. A-minor shape barre at Fret 2.",
      tips: "The index finger barres strings 5 through 1 on the 2nd fret."
    },
    "f-sharp-minor": {
      id: "f-sharp-minor",
      name: "F# Minor",
      category: "Barre Chords",
      root: "F#",
      formula: "1 - b3 - 5",
      intervals: "Root, Minor 3rd, Perfect 5th",
      notes: ["F#", "A", "C#"],
      frets: [2, 4, 4, 2, 2, 2],
      fingers: ["1", "3", "4", "1", "1", "1"],
      barre: { fret: 2, startString: 0, endString: 5 },
      harmonicRole: "Relative minor (vi) of A Major. E-minor shape barre at Fret 2.",
      tips: "Flat index finger barres all six strings at Fret 2."
    },
    "b-major": {
      id: "b-major",
      name: "B Major",
      category: "Barre Chords",
      root: "B",
      formula: "1 - 3 - 5",
      intervals: "Root, Major 3rd, Perfect 5th",
      notes: ["B", "D#", "F#"],
      frets: [-1, 2, 4, 4, 4, 2],
      fingers: ["x", "1", "2", "3", "4", "1"],
      barre: { fret: 2, startString: 1, endString: 5 },
      harmonicRole: "Dominant (V) in E Major. A-shape barre at Fret 2.",
      tips: "Can be voiced with ring finger barring the 3 strings on fret 4."
    },

    // Seventh Chords
    "c-maj7": {
      id: "c-maj7",
      name: "Cmaj7",
      category: "Seventh Chords",
      root: "C",
      formula: "1 - 3 - 5 - 7",
      intervals: "Root, Major 3rd, Perfect 5th, Major 7th",
      notes: ["C", "E", "G", "B"],
      frets: [-1, 3, 2, 0, 0, 0],
      fingers: ["x", "3", "2", "0", "0", "0"],
      barre: null,
      harmonicRole: "Tonic 7th chord in jazz and bossa nova. Dreamy, open consonant texture.",
      tips: "Simply remove the index finger from a standard C Major chord."
    },
    "a-min7": {
      id: "a-min7",
      name: "Am7",
      category: "Seventh Chords",
      root: "A",
      formula: "1 - b3 - 5 - b7",
      intervals: "Root, Minor 3rd, Perfect 5th, Minor 7th",
      notes: ["A", "C", "E", "G"],
      frets: [-1, 0, 2, 0, 1, 0],
      fingers: ["x", "0", "2", "0", "1", "0"],
      barre: null,
      harmonicRole: "Supertonic (ii7) in G Major, Tonic minor in jazz ballads.",
      tips: "The open G string provides the minor 7th interval."
    },
    "g7": {
      id: "g7",
      name: "G7",
      category: "Seventh Chords",
      root: "G",
      formula: "1 - 3 - 5 - b7",
      intervals: "Root, Major 3rd, Perfect 5th, Minor 7th",
      notes: ["G", "B", "D", "F"],
      frets: [3, 2, 0, 0, 0, 1],
      fingers: ["3", "2", "0", "0", "0", "1"],
      barre: null,
      harmonicRole: "Dominant 7th (V7) resolving definitively to C Major.",
      tips: "The tritone between B (3rd) and F (b7th) creates the classical tension."
    },
    "d7": {
      id: "d7",
      name: "D7",
      category: "Seventh Chords",
      root: "D",
      formula: "1 - 3 - 5 - b7",
      intervals: "Root, Major 3rd, Perfect 5th, Minor 7th",
      notes: ["D", "F#", "A", "C"],
      frets: [-1, -1, 0, 2, 1, 2],
      fingers: ["x", "x", "0", "2", "1", "3"],
      barre: null,
      harmonicRole: "Secondary dominant (V7/V) in C Major, Dominant 7th in G Major.",
      tips: "Inverted triangle fingering pattern."
    },
    "e7": {
      id: "e7",
      name: "E7",
      category: "Seventh Chords",
      root: "E",
      formula: "1 - 3 - 5 - b7",
      intervals: "Root, Major 3rd, Perfect 5th, Minor 7th",
      notes: ["E", "G#", "B", "D"],
      frets: [0, 2, 0, 1, 0, 0],
      fingers: ["0", "2", "0", "1", "0", "0"],
      barre: null,
      harmonicRole: "Primary blues dominant (I7 or V7) in A Major and E Blues.",
      tips: "Lift the ring finger off the D string to let the open D7 ring."
    }
  };

  // Scale Definitions for Fretboard Theory
  const SCALES = {
    "major": {
      name: "Major (Ionian)",
      intervals: [0, 2, 4, 5, 7, 9, 11],
      degreeLabels: ["1", "2", "3", "4", "5", "6", "7"],
      formula: "W - W - H - W - W - W - H",
      mood: "Bright, resolute, foundational diatonic structure."
    },
    "natural-minor": {
      name: "Natural Minor (Aeolian)",
      intervals: [0, 2, 3, 5, 7, 8, 10],
      degreeLabels: ["1", "2", "b3", "4", "5", "b6", "b7"],
      formula: "W - H - W - W - H - W - W",
      mood: "Somber, reflective, classical minor tonality."
    },
    "minor-pentatonic": {
      name: "Minor Pentatonic",
      intervals: [0, 3, 5, 7, 10],
      degreeLabels: ["1", "b3", "4", "5", "b7"],
      formula: "1.5W - W - W - 1.5W - W",
      mood: "Essential blues, rock, and soloing framework."
    },
    "major-pentatonic": {
      name: "Major Pentatonic",
      intervals: [0, 2, 4, 7, 9],
      degreeLabels: ["1", "2", "3", "5", "6"],
      formula: "W - W - 1.5W - W - 1.5W",
      mood: "Warm, sweet melodic contour without half-step dissonance."
    },
    "blues": {
      name: "Blues Scale (Hexatonic)",
      intervals: [0, 3, 5, 6, 7, 10],
      degreeLabels: ["1", "b3", "4", "b5", "5", "b7"],
      formula: "1.5W - W - H - H - 1.5W - W",
      mood: "Blues inflection featuring the expressive flat-fifth blue note."
    },
    "dorian": {
      name: "Dorian Mode",
      intervals: [0, 2, 3, 5, 7, 9, 10],
      degreeLabels: ["1", "2", "b3", "4", "5", "6", "b7"],
      formula: "W - H - W - W - W - H - W",
      mood: "Sophisticated jazz-minor sound with natural 6th."
    },
    "mixolydian": {
      name: "Mixolydian Mode",
      intervals: [0, 2, 4, 5, 7, 9, 10],
      degreeLabels: ["1", "2", "3", "4", "5", "6", "b7"],
      formula: "W - W - H - W - W - H - W",
      mood: "Dominant 7th scale foundation for rock and blues."
    },
    "harmonic-minor": {
      name: "Harmonic Minor",
      intervals: [0, 2, 3, 5, 7, 8, 11],
      degreeLabels: ["1", "2", "b3", "4", "5", "b6", "7"],
      formula: "W - H - W - W - H - 1.5W - H",
      mood: "Exotic neoclassical tension with leading tone 7th."
    }
  };


  // ==========================================================================
  // 2. AUDIO ENGINE: Web Audio API Guitar Synthesizer
  // ==========================================================================

  class GuitarAudioEngine {
    constructor() {
      this.ctx = null;
      this.masterGain = null;
      this.guitarType = 'acoustic'; // 'acoustic' or 'electric'
      this.volume = 0.8;
      this.activeVoices = [];
    }

    init() {
      if (!this.ctx) {
        const AudioCtx = window.AudioContext || window.webkitAudioContext;
        this.ctx = new AudioCtx();
        this.masterGain = this.ctx.createGain();
        this.masterGain.gain.setValueAtTime(this.volume, this.ctx.currentTime);
        this.masterGain.connect(this.ctx.destination);
      }
      if (this.ctx.state === 'suspended') {
        this.ctx.resume();
      }
    }

    setVolume(val) {
      this.volume = Math.max(0, Math.min(1, val));
      if (this.masterGain && this.ctx) {
        this.masterGain.gain.setValueAtTime(this.volume, this.ctx.currentTime);
      }
    }

    setGuitarType(type) {
      this.guitarType = type;
    }

    // Synthesize realistic acoustic or electric guitar pluck
    pluckString(stringIndex, fret, delayTime = 0) {
      if (fret < 0 || fret === 'x' || fret === 'X') return;
      this.init();

      const freq = getFrequency(stringIndex, fret);
      if (!freq || freq <= 0) return;

      const now = this.ctx.currentTime + delayTime;
      const isElectric = (this.guitarType === 'electric');

      // 1. Voice Gain Envelope
      const voiceGain = this.ctx.createGain();
      voiceGain.gain.setValueAtTime(0, now);

      // Sharp attack transient (2-4ms)
      voiceGain.gain.linearRampToValueAtTime(0.65, now + 0.003);

      // Natural physical decay: bass strings sustain longer than high strings
      const sustainTime = isElectric ? (3.5 - stringIndex * 0.25) : (2.8 - stringIndex * 0.22);
      voiceGain.gain.exponentialRampToValueAtTime(0.0001, now + sustainTime);

      // 2. Harmonic Oscillator Bank (Fundamental + 5 Overtones with physical decay)
      const harmonics = [
        { mult: 1, gain: 1.0, decayMult: 1.0 },
        { mult: 2, gain: 0.55, decayMult: 0.85 },
        { mult: 3, gain: 0.35, decayMult: 0.65 },
        { mult: 4, gain: 0.20, decayMult: 0.5 },
        { mult: 5, gain: 0.12, decayMult: 0.38 },
        { mult: 6, gain: 0.07, decayMult: 0.28 }
      ];

      const oscGroup = this.ctx.createGain();
      oscGroup.gain.setValueAtTime(1.0, now);

      harmonics.forEach(h => {
        const osc = this.ctx.createOscillator();
        const hGain = this.ctx.createGain();

        // Waveform: triangle gives warm wooden string spectrum, sawtooth gives electric bite
        osc.type = isElectric ? 'sawtooth' : 'triangle';
        osc.frequency.setValueAtTime(freq * h.mult, now);

        // High frequency damping: higher harmonics decay significantly faster
        hGain.gain.setValueAtTime(h.gain, now);
        hGain.gain.exponentialRampToValueAtTime(0.0001, now + sustainTime * h.decayMult);

        osc.connect(hGain);
        hGain.connect(oscGroup);

        osc.start(now);
        osc.stop(now + sustainTime);
      });

      // 3. Plectrum Pluck Noise Transient (short burst of bandpass filtered noise)
      const noiseBuffer = this.ctx.createBuffer(1, Math.floor(this.ctx.sampleRate * 0.03), this.ctx.sampleRate);
      const output = noiseBuffer.getChannelData(0);
      for (let i = 0; i < noiseBuffer.length; i++) {
        output[i] = (Math.random() * 2 - 1) * Math.exp(-i / (this.ctx.sampleRate * 0.005));
      }
      const noiseSource = this.ctx.createBufferSource();
      noiseSource.buffer = noiseBuffer;

      const noiseFilter = this.ctx.createBiquadFilter();
      noiseFilter.type = 'bandpass';
      noiseFilter.frequency.setValueAtTime(isElectric ? 3200 : 1800, now);
      noiseFilter.Q.setValueAtTime(1.5, now);

      const noiseGain = this.ctx.createGain();
      noiseGain.gain.setValueAtTime(0.18, now);

      noiseSource.connect(noiseFilter);
      noiseFilter.connect(noiseGain);
      noiseGain.connect(voiceGain);

      noiseSource.start(now);

      // 4. Body Resonance / Pickup Voicing Filter
      const bodyFilter = this.ctx.createBiquadFilter();
      if (isElectric) {
        // Electric Guitar: Clean pickup resonance (mid-high resonant peak around 2.4 kHz)
        bodyFilter.type = 'peaking';
        bodyFilter.frequency.setValueAtTime(2400, now);
        bodyFilter.Q.setValueAtTime(2.0, now);
        bodyFilter.gain.setValueAtTime(4.0, now);
      } else {
        // Acoustic Guitar: Wooden body cavity Helmholtz resonance (110 Hz) & soundboard warmth (240 Hz)
        bodyFilter.type = 'peaking';
        bodyFilter.frequency.setValueAtTime(180, now);
        bodyFilter.Q.setValueAtTime(1.8, now);
        bodyFilter.gain.setValueAtTime(5.0, now);
      }

      oscGroup.connect(voiceGain);
      voiceGain.connect(bodyFilter);
      bodyFilter.connect(this.masterGain);

      // Clean up after sustain
      setTimeout(() => {
        try {
          bodyFilter.disconnect();
          voiceGain.disconnect();
        } catch (e) {}
      }, (sustainTime + delayTime + 0.1) * 1000);
    }

    // Strum an entire chord with staggered plectrum delay
    strumChord(chordData, direction = 'down', speedMs = 30) {
      if (!chordData || !chordData.frets) return;
      this.init();

      const stringIndices = (direction === 'down')
        ? [0, 1, 2, 3, 4, 5] // 6th to 1st
        : [5, 4, 3, 2, 1, 0]; // 1st to 6th

      let playedCount = 0;
      stringIndices.forEach(sIdx => {
        const fret = chordData.frets[sIdx];
        if (fret >= 0) {
          const delaySec = (playedCount * speedMs) / 1000;
          this.pluckString(sIdx, fret, delaySec);
          playedCount++;
        }
      });
    }

    // Play single frequency directly (for fretboard harmony clicks)
    playTone(freq, duration = 1.8) {
      if (!freq || freq <= 0) return;
      this.init();
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = (this.guitarType === 'electric') ? 'sawtooth' : 'triangle';
      osc.frequency.setValueAtTime(freq, now);

      gain.gain.setValueAtTime(0, now);
      gain.gain.linearRampToValueAtTime(0.5, now + 0.005);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

      osc.connect(gain);
      gain.connect(this.masterGain);

      osc.start(now);
      osc.stop(now + duration);
    }
  }


  // ==========================================================================
  // 3. THREE.JS 3D GUITAR MODEL & RENDERING ENGINE
  // ==========================================================================

  // Helper: Procedural Hex-Grid Carbon Fiber Weave Texture (#26282B with subtle metallic luster)
  function createCarbonHexTexture() {
    const canvas = document.createElement('canvas');
    canvas.width = 1024;
    canvas.height = 1024;
    const ctx = canvas.getContext('2d');

    // Base matte dark charcoal/graphite (#26282B)
    ctx.fillStyle = '#26282B';
    ctx.fillRect(0, 0, 1024, 1024);

    const r = 20; // hexagon radius
    const h = r * Math.sqrt(3);
    const wStep = r * 1.5;
    const hStep = h;

    function drawHex(cx, cy, radius) {
      ctx.beginPath();
      for (let i = 0; i < 6; i++) {
        const a = (Math.PI / 3) * i;
        const x = cx + radius * Math.cos(a);
        const y = cy + radius * Math.sin(a);
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.closePath();
    }

    // Honeycomb tessellation across the entire faceplate
    for (let col = -2; col < 1024 / wStep + 3; col++) {
      for (let row = -2; row < 1024 / hStep + 3; row++) {
        const cx = col * wStep;
        const cy = row * hStep + ((Math.abs(col) % 2 === 0) ? 0 : hStep / 2);

        const isAlt = (Math.abs(col + row) % 2 === 0);

        // Fill cell with subtle anisotropic tonal contrast
        ctx.fillStyle = isAlt ? '#2B2E32' : '#212326';
        drawHex(cx, cy, r - 0.8);
        ctx.fill();

        // Directional micro carbon weave hatch lines inside each hexagon
        ctx.save();
        drawHex(cx, cy, r - 1.2);
        ctx.clip();
        ctx.strokeStyle = isAlt ? 'rgba(72, 78, 86, 0.45)' : 'rgba(44, 47, 52, 0.45)';
        ctx.lineWidth = 1.0;
        const angle = isAlt ? 0.58 : -0.58;
        for (let l = -r * 2; l <= r * 2; l += 4) {
          ctx.beginPath();
          ctx.moveTo(cx - r * 1.6, cy + l + (cx - r * 1.6) * angle);
          ctx.lineTo(cx + r * 1.6, cy + l + (cx + r * 1.6) * angle);
          ctx.stroke();
        }
        ctx.restore();

        // Delicate graphite hexagon cell perimeter
        ctx.strokeStyle = '#383C42';
        ctx.lineWidth = 1.1;
        drawHex(cx, cy, r);
        ctx.stroke();
      }
    }

    const tex = new THREE.CanvasTexture(canvas);
    tex.wrapS = THREE.RepeatWrapping;
    tex.wrapT = THREE.RepeatWrapping;
    tex.repeat.set(3.0, 2.2);
    return tex;
  }


  // ==========================================================================
  // 3. THREE.JS 3D GUITAR MODEL & RENDERING ENGINE (CARBON FIBER CUTAWAY)
  // ==========================================================================

  class Guitar3DScene {
    constructor(containerId) {
      this.container = document.getElementById(containerId);
      this.scene = null;
      this.camera = null;
      this.renderer = null;
      this.controls = null;
      this.guitarGroup = null;
      this.acousticBody = null; // Unibody Carbon-Fiber Cutaway with Offset Soundhole
      this.electricBody = null; // Solid-Body Electric Model
      this.stringMeshes = [];
      this.hitboxMeshes = [];
      this.fingerMarkerGroup = null;
      this.guitarType = 'acoustic'; // 'acoustic' (Carbon Fiber) or 'electric'
      this.cameraMode = 'full'; // 'full' or 'neck'
      this.raycaster = new THREE.Raycaster();
      this.mouse = new THREE.Vector2();
      this.activeChord = null;

      // Mathematically Proportional Dimensions
      // Scale length: 18.0 units (Bridge saddle to nut)
      // Nut is at X = 8.0, Bridge saddle is at X = -10.0
      // 14th Fret (Body Joint) is at X = -2.0
      // Fret 12 (Octave & Custom Accent) is at X = -1.0
      // Fret 21 is at X = -4.3 (extended fingerboard over cutaway)
      // Unibody Carbon Acoustic spans from X = -2.0 to X = -15.5
      // Headstock spans from X = 8.0 to X = 13.5 (Tilted backward ~11 deg)
      this.SCALE_LENGTH = 18.0;
      this.NUT_X = 8.0;
      this.BRIDGE_X = -10.0;
      this.FRET_COUNT = 21;

      // String Spacings (realistic taper from nut to bridge)
      this.NUT_STRING_SPACING = 0.36;   // total span: -0.90 to +0.90
      this.BRIDGE_STRING_SPACING = 0.46;// total span: -1.15 to +1.15

      // Precompute exact mathematical fret X positions (d = L * (1 - 2^(-n/12)))
      this.fretXPositions = [this.NUT_X]; // Index 0 is Nut
      for (let f = 1; f <= this.FRET_COUNT; f++) {
        const distFromNut = this.SCALE_LENGTH * (1 - Math.pow(2, -f / 12));
        this.fretXPositions.push(this.NUT_X - distFromNut);
      }

      this.init();
    }

    // Calculate string Z position at any point X along the guitar length
    getStringZ(stringIndex, x) {
      const factor = (stringIndex - 2.5);
      const t = Math.max(0, Math.min(1, (this.NUT_X - x) / this.SCALE_LENGTH));
      const spacing = this.NUT_STRING_SPACING + t * (this.BRIDGE_STRING_SPACING - this.NUT_STRING_SPACING);
      return factor * spacing;
    }

    init() {
      if (!this.container) return;

      const width = this.container.clientWidth || 600;
      const height = this.container.clientHeight || 420;

      // Scene with dark charcoal/black canvas background (#121315)
      this.scene = new THREE.Scene();
      this.scene.background = new THREE.Color(0x121315);

      // Camera
      this.camera = new THREE.PerspectiveCamera(38, width / height, 0.1, 1000);
      this.setCameraPreset('full', false);

      // Renderer
      this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
      this.renderer.setSize(width, height);
      this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      this.renderer.shadowMap.enabled = true;
      this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;

      this.container.innerHTML = '';
      this.container.appendChild(this.renderer.domElement);

      // OrbitControls
      if (typeof THREE.OrbitControls !== 'undefined') {
        this.controls = new THREE.OrbitControls(this.camera, this.renderer.domElement);
        this.controls.enableDamping = true;
        this.controls.dampingFactor = 0.08;
        this.controls.minDistance = 6;
        this.controls.maxDistance = 55;
        this.controls.maxPolarAngle = Math.PI / 2 + 0.18;
      }

      // Studio Lighting calibrated for carbon fiber luster and gold hardware
      this.setupLighting();

      // Build Complete Unibody Carbon Fiber Acoustic & Electric Models
      this.buildGuitarModel();

      // Event Listeners
      window.addEventListener('resize', () => this.onResize());
      this.renderer.domElement.addEventListener('click', (e) => this.onCanvasClick(e));

      // Animation Loop
      this.animate();
    }

    setupLighting() {
      // Soft ambient fill
      const ambientLight = new THREE.AmbientLight(0x2C3038, 1.2);
      this.scene.add(ambientLight);

      // Key light with soft shadow casting (highlights hex carbon weave)
      const keyLight = new THREE.DirectionalLight(0xFFFFFF, 1.45);
      keyLight.position.set(10, 22, 16);
      keyLight.castShadow = true;
      keyLight.shadow.mapSize.width = 1024;
      keyLight.shadow.mapSize.height = 1024;
      keyLight.shadow.bias = -0.001;
      this.scene.add(keyLight);

      // Cool metallic rim light for cutaway and headstock contours
      const rimLight = new THREE.DirectionalLight(0x647890, 0.95);
      rimLight.position.set(-16, 12, -14);
      this.scene.add(rimLight);

      // Warm accent light for gold fret wires, gold tuning hardware & gold strings
      const goldAccentLight = new THREE.DirectionalLight(0xFFD700, 0.55);
      goldAccentLight.position.set(6, 12, 10);
      this.scene.add(goldAccentLight);

      // Subtle bottom bounce fill
      const fillLight = new THREE.DirectionalLight(0x1A1C20, 0.55);
      fillLight.position.set(0, -12, 8);
      this.scene.add(fillLight);
    }

    buildGuitarModel() {
      this.guitarGroup = new THREE.Group();
      this.scene.add(this.guitarGroup);

      // 1. Build Neck & Fretboard (Integrated ergonomic neck, gold frets, 12th fret wave marker)
      this.buildNeckAndFretboard();

      // 2. Build Headstock (Modern contoured carbon headstock with 6 precision gold tuning pegs)
      this.buildHeadstock();

      // 3. Build Unibody Carbon-Fiber Cutaway Acoustic (Hex-grid carbon top, offset soundhole, ebony bridge)
      this.buildCarbonAcousticBody();

      // 4. Build Solid-Body Double Cutaway Electric Body
      this.buildElectricBody();

      // 5. Build 6 Gold-Wound Metallic Strings & Bridge Saddles
      this.buildStringsAndBridge();

      // 6. Dynamic 3D Finger Position Markers Group
      this.fingerMarkerGroup = new THREE.Group();
      this.guitarGroup.add(this.fingerMarkerGroup);

      // Apply initial body visibility
      this.setGuitarType(this.guitarType);
    }

    // Build the Neck, Fretboard Slab, Gold Frets, Edge Dots, and 12th Fret Accent Marker
    buildNeckAndFretboard() {
      const nutX = this.NUT_X;           // 8.0
      const bodyJointX = -2.0;          // 14th fret
      const endOfFretboardX = -4.3;     // 21st fret (over cutaway)

      // 1. Integrated Ergonomic Neck in Dark Matte Carbon (#1D1E20)
      const neckLen = nutX - bodyJointX; // 10.0 units
      const neckCenter = (nutX + bodyJointX) / 2; // 3.0

      const neckGeo = new THREE.CylinderGeometry(1.08, 1.38, neckLen, 24, 1, false, 0, Math.PI);
      const neckMat = new THREE.MeshStandardMaterial({
        color: 0x1D1E20,
        roughness: 0.42,
        metalness: 0.12
      });
      const neckMesh = new THREE.Mesh(neckGeo, neckMat);
      neckMesh.rotation.z = -Math.PI / 2;
      neckMesh.rotation.x = Math.PI;
      neckMesh.position.set(neckCenter, -0.15, 0);
      neckMesh.castShadow = true;
      this.guitarGroup.add(neckMesh);

      // Ergonomic Neck Heel Block transitioning seamlessly into cutaway
      const heelGeo = new THREE.CylinderGeometry(1.38, 1.65, 1.4, 20, 1, false, 0, Math.PI);
      const heelMesh = new THREE.Mesh(heelGeo, neckMat);
      heelMesh.rotation.z = -Math.PI / 2;
      heelMesh.rotation.x = Math.PI;
      heelMesh.position.set(bodyJointX - 0.7, -0.22, 0);
      this.guitarGroup.add(heelMesh);

      // Miniature Gold Strap Button Screw on back of neck heel
      const strapBtnMat = new THREE.MeshStandardMaterial({ color: 0xD4AF37, metalness: 0.95, roughness: 0.15 });
      const strapBtn = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.08, 0.18, 12), strapBtnMat);
      strapBtn.rotation.x = Math.PI / 2;
      strapBtn.position.set(bodyJointX - 0.4, -0.95, 0);
      this.guitarGroup.add(strapBtn);

      // 2. Fretboard Slab in Dark Ebony/Carbon (#141517)
      const fbLen = nutX - endOfFretboardX; // 12.3 units
      const fbCenter = (nutX + endOfFretboardX) / 2;
      const fbGeo = new THREE.BoxGeometry(fbLen, 0.16, 2.8);
      const fbMat = new THREE.MeshStandardMaterial({
        color: 0x141517,
        roughness: 0.55,
        metalness: 0.1
      });
      const fretboard = new THREE.Mesh(fbGeo, fbMat);
      fretboard.position.set(fbCenter, 0.14, 0);
      fretboard.receiveShadow = true;
      this.guitarGroup.add(fretboard);

      // 3. Sleek Dark Tusq/Graphite Nut at X = 8.0
      const nutGeo = new THREE.BoxGeometry(0.24, 0.28, 2.4);
      const nutMat = new THREE.MeshStandardMaterial({
        color: 0x1C1D20,
        roughness: 0.25,
        metalness: 0.2
      });
      const nut = new THREE.Mesh(nutGeo, nutMat);
      nut.position.set(nutX, 0.26, 0);
      this.guitarGroup.add(nut);

      // 4. 21 Precision Gold Fret Wires at Exact Mathematical Positions
      const goldFretMat = new THREE.MeshStandardMaterial({
        color: 0xD4AF37,
        metalness: 0.92,
        roughness: 0.18
      });

      for (let f = 1; f <= this.FRET_COUNT; f++) {
        const fx = this.fretXPositions[f];
        const t = (this.NUT_X - fx) / this.SCALE_LENGTH;
        const fretW = 2.3 + t * 0.7; // subtle neck taper

        const fretGeo = new THREE.CylinderGeometry(0.035, 0.035, fretW, 8);
        const fretMesh = new THREE.Mesh(fretGeo, goldFretMat);
        fretMesh.rotation.x = Math.PI / 2;
        fretMesh.position.set(fx, 0.23, 0);
        this.guitarGroup.add(fretMesh);
      }

      // 5. White Edge Inlay Dots along Bass Edge (Frets 3, 5, 7, 9, 12, 15, 17, 19)
      const edgeDotMat = new THREE.MeshStandardMaterial({
        color: 0xFFFFFF,
        roughness: 0.2,
        metalness: 0.2
      });
      const edgeMarkerFrets = [3, 5, 7, 9, 12, 15, 17, 19];
      edgeMarkerFrets.forEach(f => {
        if (f < this.fretXPositions.length) {
          const prevX = this.fretXPositions[f - 1];
          const currX = this.fretXPositions[f];
          const midX = (prevX + currX) / 2;

          const edgeDot = new THREE.Mesh(new THREE.CylinderGeometry(0.045, 0.045, 0.04, 12), edgeDotMat);
          edgeDot.rotation.x = Math.PI / 2;
          edgeDot.position.set(midX, 0.14, -1.38);
          this.guitarGroup.add(edgeDot);
        }
      });

      // 6. Custom 12th Fret Accent Marker: Aerodynamic Dual-Arc Wave in Pearl Silver/White
      const waveMarkerMat = new THREE.MeshStandardMaterial({
        color: 0xFFFFFF,
        roughness: 0.15,
        metalness: 0.65
      });

      const fx11 = this.fretXPositions[11];
      const fx12 = this.fretXPositions[12];
      const mid12X = (fx11 + fx12) / 2;

      // Upper and lower parallel curved wings at fret 12
      [-0.10, 0.10].forEach(xOff => {
        const waveCurve = new THREE.QuadraticBezierCurve3(
          new THREE.Vector3(mid12X + xOff, 0.23, -0.65),
          new THREE.Vector3(mid12X + xOff + 0.08, 0.23, 0.0),
          new THREE.Vector3(mid12X + xOff, 0.23, 0.65)
        );
        const waveGeo = new THREE.TubeGeometry(waveCurve, 20, 0.03, 8, false);
        const waveMesh = new THREE.Mesh(waveGeo, waveMarkerMat);
        this.guitarGroup.add(waveMesh);
      });
    }

    // Build the Modern Contoured Carbon Headstock with 6 Precision Gold Tuning Pegs
    buildHeadstock() {
      const headstockGroup = new THREE.Group();
      const nutX = this.NUT_X; // 8.0

      // 1. Asymmetrical Modern Sculpted Headstock Plate (angled backward ~11 degrees)
      const headShape = new THREE.Shape();
      headShape.moveTo(0, 1.15);
      headShape.lineTo(4.6, 1.25);
      headShape.bezierCurveTo(5.2, 1.25, 5.4, 0.8, 5.4, 0.0); // Modern crest tip
      headShape.bezierCurveTo(5.4, -0.8, 5.2, -1.25, 4.6, -1.25);
      headShape.lineTo(0, -1.15);
      headShape.closePath();

      const headGeo = new THREE.ExtrudeGeometry(headShape, {
        depth: 0.32,
        bevelEnabled: true,
        bevelThickness: 0.06,
        bevelSize: 0.06,
        bevelSegments: 3
      });
      const headMat = new THREE.MeshStandardMaterial({
        color: 0x1D1E20,
        roughness: 0.35,
        metalness: 0.15
      });
      const headMesh = new THREE.Mesh(headGeo, headMat);
      headMesh.rotation.x = -Math.PI / 2;
      headMesh.rotation.z = -0.19; // ~11 deg break angle
      headMesh.position.set(nutX, 0.20, 0);
      headstockGroup.add(headMesh);

      // Metallic Gold Script Brand Badge ("POLYMATH")
      const logoMat = new THREE.MeshStandardMaterial({ color: 0xD4AF37, metalness: 0.95, roughness: 0.2 });
      const logo = new THREE.Mesh(new THREE.BoxGeometry(1.5, 0.03, 0.5), logoMat);
      logo.position.set(nutX + 3.4, 0.22, 0);
      logo.rotation.z = -0.19;
      headstockGroup.add(logo);

      // 2. 6 Precision Gold Tuning Machines (3 on bass side Z = -1.18, 3 on treble side Z = +1.18)
      const goldHardwareMat = new THREE.MeshStandardMaterial({
        color: 0xD4AF37,
        metalness: 0.92,
        roughness: 0.18
      });
      const pegXOffsets = [nutX + 1.2, nutX + 2.5, nutX + 3.8];
      const pegZOffsets = [-1.18, 1.18];

      pegXOffsets.forEach((x, idx) => {
        pegZOffsets.forEach((z) => {
          const zSide = (z > 0) ? 1 : -1;

          // Vertical Gold Tuning Post with string through-hole
          const post = new THREE.Mesh(new THREE.CylinderGeometry(0.065, 0.065, 0.48, 12), goldHardwareMat);
          post.position.set(x, 0.26 - idx * 0.12, z * 0.65);
          headstockGroup.add(post);

          // Gold Enclosed Gear Housing on rear of headstock
          const casing = new THREE.Mesh(new THREE.CylinderGeometry(0.18, 0.18, 0.24, 16), goldHardwareMat);
          casing.rotation.x = Math.PI / 2;
          casing.position.set(x - 0.05, -0.14 - idx * 0.12, z * 0.65);
          headstockGroup.add(casing);

          // Horizontal Gold Tuning Shaft & Button (oval key on outer side)
          const shaft = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.04, 0.5, 8), goldHardwareMat);
          shaft.rotation.x = Math.PI / 2;
          shaft.position.set(x - 0.05, -0.14 - idx * 0.12, z * 0.88);
          headstockGroup.add(shaft);

          const button = new THREE.Mesh(new THREE.CylinderGeometry(0.18, 0.18, 0.08, 16), goldHardwareMat);
          button.rotation.z = Math.PI / 2;
          button.position.set(x - 0.05, -0.14 - idx * 0.12, z * 1.15);
          headstockGroup.add(button);
        });
      });

      this.guitarGroup.add(headstockGroup);
    }

    // Build Futuristic Unibody Carbon-Fiber Cutaway Guitar Body (Matching Reference Screenshots)
    buildCarbonAcousticBody() {
      this.acousticBody = new THREE.Group();

      // 1. Unibody Carbon-Fiber Geometry with Deep Venetian Cutaway
      const bodyShape = new THREE.Shape();
      const neckHalfW = 1.45;
      bodyShape.moveTo(-2.0, -neckHalfW); // Start at neck joint bass shoulder

      // Bass side (y < 0 in 2D shape, which maps to Z < 0 / top shoulder in 3D)
      bodyShape.bezierCurveTo(-3.2, -3.8, -4.8, -4.6, -6.6, -4.6);  // Upper bout
      bodyShape.bezierCurveTo(-7.8, -4.6, -8.4, -3.8, -8.8, -3.6);  // Waist indentation
      bodyShape.bezierCurveTo(-9.6, -3.4, -11.0, -5.2, -12.5, -5.2);// Lower bout swell
      bodyShape.bezierCurveTo(-14.2, -5.2, -15.5, -3.2, -15.5, 0.0);// Smooth rounded bottom butt

      // Treble side (y > 0 in 2D shape, which maps to Z > 0 / cutaway side in 3D)
      bodyShape.bezierCurveTo(-15.5, 3.2, -14.2, 5.2, -12.5, 5.2); // Symmetrical lower bout
      bodyShape.bezierCurveTo(-11.0, 5.2, -9.6, 3.4, -8.8, 3.6);   // Waist
      bodyShape.bezierCurveTo(-8.0, 3.8, -6.8, 4.4, -5.6, 4.4);    // Lower horn curve
      // Deep sleek Venetian cutaway scoop for effortless upper-fret reach
      bodyShape.bezierCurveTo(-4.8, 4.2, -3.8, 2.8, -3.0, 2.2);
      bodyShape.bezierCurveTo(-2.5, 1.8, -2.1, 1.55, -2.0, neckHalfW);
      bodyShape.lineTo(-2.0, -neckHalfW);

      // Extruded Unibody Rim & Back Shell in Textured Dark Matte Graphite (#1D1E20)
      const bodyDepth = 2.4;
      const unibodyExtrudeSettings = {
        depth: bodyDepth,
        bevelEnabled: true,
        bevelThickness: 0.18,
        bevelSize: 0.18,
        bevelSegments: 5
      };
      const unibodyGeo = new THREE.ExtrudeGeometry(bodyShape, unibodyExtrudeSettings);
      const graphiteMat = new THREE.MeshStandardMaterial({
        color: 0x1D1E20,
        roughness: 0.45,
        metalness: 0.15
      });
      const unibodyMesh = new THREE.Mesh(unibodyGeo, graphiteMat);
      unibodyMesh.rotation.x = -Math.PI / 2;
      unibodyMesh.position.set(0, 0, 0);
      unibodyMesh.castShadow = true;
      unibodyMesh.receiveShadow = true;
      this.acousticBody.add(unibodyMesh);

      // 2. Patterned Hex-Grid Carbon Fiber Soundboard Top Plate with Offset Soundhole
      const topPlateShape = new THREE.Shape();
      topPlateShape.moveTo(-2.0, -neckHalfW);
      topPlateShape.bezierCurveTo(-3.2, -3.8, -4.8, -4.6, -6.6, -4.6);
      topPlateShape.bezierCurveTo(-7.8, -4.6, -8.4, -3.8, -8.8, -3.6);
      topPlateShape.bezierCurveTo(-9.6, -3.4, -11.0, -5.2, -12.5, -5.2);
      topPlateShape.bezierCurveTo(-14.2, -5.2, -15.5, -3.2, -15.5, 0.0);
      topPlateShape.bezierCurveTo(-15.5, 3.2, -14.2, 5.2, -12.5, 5.2);
      topPlateShape.bezierCurveTo(-11.0, 5.2, -9.6, 3.4, -8.8, 3.6);
      topPlateShape.bezierCurveTo(-8.0, 3.8, -6.8, 4.4, -5.6, 4.4);
      topPlateShape.bezierCurveTo(-4.8, 4.2, -3.8, 2.8, -3.0, 2.2);
      topPlateShape.bezierCurveTo(-2.5, 1.8, -2.1, 1.55, -2.0, neckHalfW);
      topPlateShape.lineTo(-2.0, -neckHalfW);

      // Offset Soundhole: Ergonomic asymmetrical teardrop cutout at the upper bout (top shoulder)
      const offsetSoundhole = new THREE.Path();
      offsetSoundhole.moveTo(-4.2, -1.85);
      offsetSoundhole.bezierCurveTo(-5.0, -1.80, -5.8, -1.85, -6.4, -2.0);
      offsetSoundhole.bezierCurveTo(-6.9, -2.2, -7.1, -2.9, -6.8, -3.4);
      offsetSoundhole.bezierCurveTo(-6.4, -3.7, -5.6, -3.75, -4.8, -3.5);
      offsetSoundhole.bezierCurveTo(-4.2, -3.2, -3.9, -2.4, -4.2, -1.85);
      topPlateShape.holes.push(offsetSoundhole);

      const topPlateGeo = new THREE.ExtrudeGeometry(topPlateShape, {
        depth: 0.06,
        bevelEnabled: false
      });

      // Procedural hex-grid carbon weave texture with metallic luster
      const carbonHexTexture = createCarbonHexTexture();
      const carbonTopMat = new THREE.MeshStandardMaterial({
        map: carbonHexTexture,
        color: 0x26282B,
        roughness: 0.32,
        metalness: 0.45
      });
      const topPlateMesh = new THREE.Mesh(topPlateGeo, carbonTopMat);
      topPlateMesh.rotation.x = -Math.PI / 2;
      topPlateMesh.position.set(0, 0.02, 0);
      topPlateMesh.receiveShadow = true;
      this.acousticBody.add(topPlateMesh);

      // 3. Offset Soundhole Dark Acoustic Cavity & Chamfered Beveled Collar
      const cavityGeo = new THREE.CylinderGeometry(1.4, 1.4, 1.6, 24);
      const cavityMat = new THREE.MeshBasicMaterial({ color: 0x0A0A0C });
      const cavityMesh = new THREE.Mesh(cavityGeo, cavityMat);
      cavityMesh.position.set(-5.5, -0.8, -2.7);
      this.acousticBody.add(cavityMesh);

      // Chamfered Beveled Ring Collar around the offset soundhole
      const collarShape = new THREE.Shape();
      collarShape.moveTo(-4.1, -1.75);
      collarShape.bezierCurveTo(-5.0, -1.70, -5.9, -1.75, -6.5, -1.9);
      collarShape.bezierCurveTo(-7.1, -2.1, -7.3, -3.0, -7.0, -3.5);
      collarShape.bezierCurveTo(-6.5, -3.9, -5.5, -3.9, -4.7, -3.6);
      collarShape.bezierCurveTo(-4.0, -3.3, -3.8, -2.3, -4.1, -1.75);
      collarShape.holes.push(offsetSoundhole);

      const collarGeo = new THREE.ExtrudeGeometry(collarShape, { depth: 0.04, bevelEnabled: false });
      const collarMat = new THREE.MeshStandardMaterial({ color: 0x1D1E20, roughness: 0.35, metalness: 0.25 });
      const collarMesh = new THREE.Mesh(collarGeo, collarMat);
      collarMesh.rotation.x = -Math.PI / 2;
      collarMesh.position.set(0, 0.04, 0);
      this.acousticBody.add(collarMesh);

      // 4. Sleek Modern Acoustic Bridge & Pins in Dark Ebony (#161719)
      const bridgeBaseGeo = new THREE.BoxGeometry(1.2, 0.18, 3.6);
      const bridgeMat = new THREE.MeshStandardMaterial({
        color: 0x161719,
        roughness: 0.5,
        metalness: 0.1
      });
      const bridgeMesh = new THREE.Mesh(bridgeBaseGeo, bridgeMat);
      bridgeMesh.position.set(-10.0, 0.10, 0);
      this.acousticBody.add(bridgeMesh);

      // Compensated Dark Tusq Saddle with intonation slant
      const saddleGeo = new THREE.BoxGeometry(0.14, 0.26, 2.5);
      const saddleMat = new THREE.MeshStandardMaterial({ color: 0x222428, roughness: 0.25, metalness: 0.2 });
      const saddleMesh = new THREE.Mesh(saddleGeo, saddleMat);
      saddleMesh.position.set(-9.85, 0.22, 0);
      saddleMesh.rotation.y = 0.03;
      this.acousticBody.add(saddleMesh);

      // 6 Dark Ebony Bridge Pins with Polished Gold Center Dots
      const pinMat = new THREE.MeshStandardMaterial({ color: 0x1D1E20, roughness: 0.3 });
      const pinGoldMat = new THREE.MeshStandardMaterial({ color: 0xD4AF37, metalness: 0.95, roughness: 0.15 });

      for (let s = 0; s < 6; s++) {
        const pinZ = (s - 2.5) * this.BRIDGE_STRING_SPACING;
        const pin = new THREE.Mesh(new THREE.CylinderGeometry(0.065, 0.065, 0.12, 12), pinMat);
        pin.position.set(-10.45, 0.20, pinZ);

        // Gold center dot inlay
        const goldDot = new THREE.Mesh(new THREE.CylinderGeometry(0.025, 0.025, 0.025, 8), pinGoldMat);
        goldDot.position.set(0, 0.06, 0);
        pin.add(goldDot);

        this.acousticBody.add(pin);
      }

      this.guitarGroup.add(this.acousticBody);
    }

    // Build Contoured Solid-Body Double Cutaway Electric Guitar Body
    buildElectricBody() {
      this.electricBody = new THREE.Group();

      // Double Cutaway Solid Body Contour
      const eShape = new THREE.Shape();
      eShape.moveTo(-2.0, 1.6);
      eShape.bezierCurveTo(-2.3, 1.8, -3.2, 2.2, -3.2, 2.8);
      eShape.bezierCurveTo(-3.2, 3.4, -2.0, 3.6, -1.2, 3.5);
      eShape.bezierCurveTo(-0.6, 3.4, -1.2, 2.8, -2.2, 2.6);
      eShape.bezierCurveTo(-3.5, 2.4, -5.5, 2.8, -7.0, 2.9);
      eShape.bezierCurveTo(-8.0, 3.0, -9.5, 3.2, -10.5, 3.5);
      eShape.bezierCurveTo(-12.0, 4.0, -13.5, 4.5, -14.8, 3.5);
      eShape.bezierCurveTo(-15.6, 2.5, -15.8, 1.0, -15.8, 0.0);

      eShape.bezierCurveTo(-15.8, -1.0, -15.6, -2.5, -14.8, -3.5);
      eShape.bezierCurveTo(-13.5, -4.5, -12.0, -4.0, -10.5, -3.5);
      eShape.bezierCurveTo(-9.5, -3.2, -8.0, -3.0, -7.0, -3.2);
      eShape.bezierCurveTo(-5.5, -3.5, -3.5, -4.0, -1.5, -4.2);
      eShape.bezierCurveTo(0.0, -4.3, 0.8, -4.0, 0.8, -3.2);
      eShape.bezierCurveTo(0.8, -2.6, 0.0, -2.2, -1.0, -1.8);
      eShape.lineTo(-2.0, -1.6);
      eShape.lineTo(-2.0, 1.6);

      const eExtrudeSettings = { depth: 1.4, bevelEnabled: true, bevelThickness: 0.18, bevelSize: 0.18, bevelSegments: 5 };
      const eBodyGeo = new THREE.ExtrudeGeometry(eShape, eExtrudeSettings);
      const eBodyMat = new THREE.MeshStandardMaterial({ color: 0x140F0D, roughness: 0.12, metalness: 0.25 });
      const eBodyMesh = new THREE.Mesh(eBodyGeo, eBodyMat);
      eBodyMesh.rotation.x = -Math.PI / 2;
      eBodyMesh.position.set(0, 0, 0);
      eBodyMesh.castShadow = true;
      eBodyMesh.receiveShadow = true;
      this.electricBody.add(eBodyMesh);

      // Pickups, Pickguard & Chrome Hardware
      const chromeMat = new THREE.MeshStandardMaterial({ color: 0xF0F0F0, metalness: 0.95, roughness: 0.12 });
      const bobbinMat = new THREE.MeshStandardMaterial({ color: 0x1A1513, roughness: 0.2 });

      [-4.5, -7.8].forEach(xPos => {
        const bezel = new THREE.Mesh(new THREE.BoxGeometry(1.5, 0.16, 3.0), chromeMat);
        bezel.position.set(xPos, 0.08, 0);
        this.electricBody.add(bezel);

        const b1 = new THREE.Mesh(new THREE.BoxGeometry(0.55, 0.18, 2.7), bobbinMat);
        b1.position.set(xPos - 0.32, 0.12, 0);
        this.electricBody.add(b1);

        const b2 = new THREE.Mesh(new THREE.BoxGeometry(0.55, 0.18, 2.7), bobbinMat);
        b2.position.set(xPos + 0.32, 0.12, 0);
        this.electricBody.add(b2);
      });

      const eBridge = new THREE.Mesh(new THREE.BoxGeometry(0.9, 0.24, 2.8), chromeMat);
      eBridge.position.set(-9.8, 0.16, 0);
      this.electricBody.add(eBridge);

      const tailpiece = new THREE.Mesh(new THREE.BoxGeometry(0.65, 0.20, 2.8), chromeMat);
      tailpiece.position.set(-11.5, 0.14, 0);
      this.electricBody.add(tailpiece);

      this.guitarGroup.add(this.electricBody);
    }

    // Build the 6 Tightly Stretched Gold-Wound Metallic Strings & Accurate Saddles
    buildStringsAndBridge() {
      this.stringMeshes = [];
      this.hitboxMeshes = [];

      const bridgeX = this.BRIDGE_X; // -10.0
      const nutX = this.NUT_X;       // 8.0
      const stringLength = (nutX - bridgeX) + 4.5;
      const stringCenterX = (bridgeX + nutX) / 2 + 1.2;

      // Realistic string gauges & gold-wound metallic finishes
      const gauges = [0.038, 0.032, 0.026, 0.020, 0.015, 0.012];
      const stringColors = [0xD4AF37, 0xD4AF37, 0xD4AF37, 0xDFB757, 0xE6C875, 0xF0E0A0];

      for (let s = 0; s < 6; s++) {
        const radius = gauges[s];

        const strMat = new THREE.MeshStandardMaterial({
          color: (this.guitarType === 'acoustic') ? stringColors[s] : 0xEAEAEA,
          metalness: 0.95,
          roughness: 0.14
        });

        const strGeo = new THREE.CylinderGeometry(radius, radius, stringLength, 8);
        const strMesh = new THREE.Mesh(strGeo, strMat);
        strMesh.rotation.z = Math.PI / 2;

        const baseZ = this.getStringZ(s, stringCenterX);
        strMesh.position.set(stringCenterX, 0.32, baseZ);
        strMesh.castShadow = true;

        // Angle matching string taper from nut to bridge
        const zNut = this.getStringZ(s, nutX);
        const zBridge = this.getStringZ(s, bridgeX);
        const angleY = Math.atan2(zNut - zBridge, nutX - bridgeX);
        strMesh.rotation.y = angleY;

        strMesh.userData = {
          stringIndex: s,
          baseZ: baseZ,
          baseY: 0.32,
          isVibrating: false,
          vibrateStartTime: 0
        };

        this.guitarGroup.add(strMesh);
        this.stringMeshes.push(strMesh);

        // Invisible Hitbox Cylinder for smooth raycast click plucking
        const hitGeo = new THREE.CylinderGeometry(0.18, 0.18, stringLength, 8);
        const hitMat = new THREE.MeshBasicMaterial({ visible: false });
        const hitMesh = new THREE.Mesh(hitGeo, hitMat);
        hitMesh.rotation.z = Math.PI / 2;
        hitMesh.rotation.y = angleY;
        hitMesh.position.copy(strMesh.position);
        hitMesh.userData = { stringIndex: s };
        this.guitarGroup.add(hitMesh);
        this.hitboxMeshes.push(hitMesh);
      }
    }

    // Toggle Guitar Type (Carbon Fiber Acoustic vs Solid Electric)
    setGuitarType(type) {
      this.guitarType = type;
      if (this.acousticBody) this.acousticBody.visible = (type === 'acoustic');
      if (this.electricBody) this.electricBody.visible = (type === 'electric');

      // Update string material tint (gold-wound for carbon acoustic, clean nickel for electric)
      const stringColors = [0xD4AF37, 0xD4AF37, 0xD4AF37, 0xDFB757, 0xE6C875, 0xF0E0A0];
      this.stringMeshes.forEach((mesh, idx) => {
        if (type === 'electric') {
          mesh.material.color.setHex(0xEAEAEA);
        } else {
          mesh.material.color.setHex(stringColors[idx]);
        }
      });
    }

    // Set Camera Preset Views
    setCameraPreset(mode, animate = true) {
      this.cameraMode = mode;

      let targetPos, targetLookAt;
      if (mode === 'neck') {
        // Zoomed Fretboard Neck View: Focuses closely on Frets 0 through 14
        targetPos = new THREE.Vector3(3.5, 7.0, 7.5);
        targetLookAt = new THREE.Vector3(3.5, 0.3, 0);
      } else {
        // Full Instrument View: Shows complete unibody cutaway, offset soundhole, and gold hardware
        targetPos = new THREE.Vector3(-2.0, 16.0, 21.0);
        targetLookAt = new THREE.Vector3(-2.0, 0, 0);
      }

      if (!animate || !this.controls) {
        this.camera.position.copy(targetPos);
        if (this.controls) {
          this.controls.target.copy(targetLookAt);
          this.controls.update();
        } else {
          this.camera.lookAt(targetLookAt);
        }
        return;
      }

      // Smooth cubic easing camera transition
      const startPos = this.camera.position.clone();
      const startTarget = this.controls.target.clone();
      const duration = 600;
      const startTime = performance.now();

      const step = (now) => {
        const elapsed = now - startTime;
        const progress = Math.min(elapsed / duration, 1.0);
        const ease = progress < 0.5
          ? 4 * progress * progress * progress
          : 1 - Math.pow(-2 * progress + 2, 3) / 2;

        this.camera.position.lerpVectors(startPos, targetPos, ease);
        this.controls.target.lerpVectors(startTarget, targetLookAt, ease);
        this.controls.update();

        if (progress < 1.0) {
          requestAnimationFrame(step);
        }
      };
      requestAnimationFrame(step);
    }

    // Display Active Chord Finger Placement Markers on the 3D Fretboard
    displayChord(chordData) {
      this.activeChord = chordData;
      if (!this.fingerMarkerGroup) return;

      // Clear previous markers
      while (this.fingerMarkerGroup.children.length > 0) {
        const child = this.fingerMarkerGroup.children[0];
        this.fingerMarkerGroup.remove(child);
      }

      if (!chordData || !chordData.frets) return;

      // Procedural texture for finger numbers (1, 2, 3, 4) with gold rim on carbon disc
      const createMarkerTexture = (text) => {
        const canvas = document.createElement('canvas');
        canvas.width = 64;
        canvas.height = 64;
        const ctx = canvas.getContext('2d');

        // Dark graphite disc
        ctx.fillStyle = '#1D1E20';
        ctx.beginPath();
        ctx.arc(32, 32, 31, 0, Math.PI * 2);
        ctx.fill();

        // Metallic gold perimeter ring
        ctx.strokeStyle = '#D4AF37';
        ctx.lineWidth = 4;
        ctx.stroke();

        // Finger Number in clean white
        if (text && text !== '0' && text !== 'x') {
          ctx.fillStyle = '#FFFFFF';
          ctx.font = 'bold 36px sans-serif';
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.fillText(text, 32, 34);
        }

        const tex = new THREE.CanvasTexture(canvas);
        tex.needsUpdate = true;
        return tex;
      };

      chordData.frets.forEach((fret, sIdx) => {
        if (fret > 0 && fret < this.fretXPositions.length) {
          const prevX = this.fretXPositions[fret - 1];
          const currX = this.fretXPositions[fret];
          const midX = (prevX + currX) / 2;
          const midZ = this.getStringZ(sIdx, midX);
          const finger = chordData.fingers ? chordData.fingers[sIdx] : "";

          // Position Marker Disc
          const discGeo = new THREE.CylinderGeometry(0.24, 0.24, 0.08, 24);
          const topTex = createMarkerTexture(finger);
          const discMat = [
            new THREE.MeshStandardMaterial({ color: 0x1D1E20, roughness: 0.3 }),
            new THREE.MeshBasicMaterial({ map: topTex }),
            new THREE.MeshStandardMaterial({ color: 0x1D1E20, roughness: 0.3 })
          ];
          const disc = new THREE.Mesh(discGeo, discMat);
          disc.position.set(midX, 0.36, midZ);
          this.fingerMarkerGroup.add(disc);
        } else if (fret === 0) {
          // Open string indicator (Gold torus at the nut)
          const nutZ = this.getStringZ(sIdx, this.NUT_X);
          const openRingGeo = new THREE.TorusGeometry(0.16, 0.035, 12, 24);
          const openRingMat = new THREE.MeshStandardMaterial({ color: 0xD4AF37, metalness: 0.9, roughness: 0.2 });
          const openRing = new THREE.Mesh(openRingGeo, openRingMat);
          openRing.rotation.x = Math.PI / 2;
          openRing.position.set(this.NUT_X + 0.3, 0.32, nutZ);
          this.fingerMarkerGroup.add(openRing);
        } else if (fret < 0 || fret === 'x') {
          // Muted string indicator (Crimson cross at the nut)
          const nutZ = this.getStringZ(sIdx, this.NUT_X);
          const muteGeo = new THREE.BoxGeometry(0.10, 0.03, 0.24);
          const muteMat = new THREE.MeshStandardMaterial({ color: 0xDC2626 });
          const m1 = new THREE.Mesh(muteGeo, muteMat);
          m1.position.set(this.NUT_X + 0.3, 0.32, nutZ);
          m1.rotation.y = Math.PI / 4;
          const m2 = new THREE.Mesh(muteGeo, muteMat);
          m2.position.set(this.NUT_X + 0.3, 0.32, nutZ);
          m2.rotation.y = -Math.PI / 4;
          this.fingerMarkerGroup.add(m1);
          this.fingerMarkerGroup.add(m2);
        }
      });
    }

    // Trigger visual string vibration feedback
    vibrateString(stringIndex) {
      if (stringIndex < 0 || stringIndex >= this.stringMeshes.length) return;
      const mesh = this.stringMeshes[stringIndex];
      mesh.userData.isVibrating = true;
      mesh.userData.vibrateStartTime = performance.now();
    }

    // Raycast click detection on 3D strings
    onCanvasClick(event) {
      if (!this.container || !this.camera) return;

      const rect = this.renderer.domElement.getBoundingClientRect();
      this.mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      this.mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

      this.raycaster.setFromCamera(this.mouse, this.camera);
      const targets = this.hitboxMeshes.length > 0 ? this.hitboxMeshes : this.stringMeshes;
      const intersects = this.raycaster.intersectObjects(targets, false);

      if (intersects.length > 0) {
        const hit = intersects[0].object;
        const stringIdx = hit.userData.stringIndex;
        if (typeof stringIdx === 'number') {
          if (window.GUITAR_MODULE) {
            window.GUITAR_MODULE.pluckIndividualString(stringIdx);
          }
        }
      }
    }

    onResize() {
      if (!this.container || !this.renderer || !this.camera) return;
      const width = this.container.clientWidth;
      const height = this.container.clientHeight;
      if (width === 0 || height === 0) return;

      this.camera.aspect = width / height;
      this.camera.updateProjectionMatrix();
      this.renderer.setSize(width, height);
    }

    animate() {
      requestAnimationFrame(() => this.animate());

      // Dynamic harmonic string vibration decay
      const now = performance.now();
      this.stringMeshes.forEach(mesh => {
        if (mesh.userData.isVibrating) {
          const elapsed = (now - mesh.userData.vibrateStartTime) / 1000;
          if (elapsed > 0.8) {
            mesh.userData.isVibrating = false;
            mesh.position.z = mesh.userData.baseZ;
          } else {
            const decay = Math.exp(-elapsed * 5.0);
            const freq = 45.0 + mesh.userData.stringIndex * 12.0;
            const offset = Math.sin(elapsed * freq) * 0.06 * decay;
            mesh.position.z = mesh.userData.baseZ + offset;
          }
        }
      });

      if (this.controls) this.controls.update();
      if (this.renderer && this.scene && this.camera) {
        this.renderer.render(this.scene, this.camera);
      }
    }
  }


  // ==========================================================================
  // 4. SVG CHORD DIAGRAM VECTOR GENERATOR
  // ==========================================================================

  function renderSvgChordDiagram(chordData) {
    if (!chordData) return '<svg width="180" height="210"></svg>';

    const width = 180;
    const height = 210;
    const topMargin = 42;
    const leftMargin = 32;
    const stringSpacing = 23;
    const fretSpacing = 28;
    const gridWidth = stringSpacing * 5;
    const gridHeight = fretSpacing * 5;

    // Determine starting fret (for high barre chords)
    const validFrets = chordData.frets.filter(f => typeof f === 'number' && f > 0);
    const minFret = validFrets.length > 0 ? Math.min(...validFrets) : 1;
    const maxFret = validFrets.length > 0 ? Math.max(...validFrets) : 1;
    const startFret = (maxFret > 5) ? minFret : 1;
    const isNut = (startFret === 1);

    let svg = `<svg viewBox="0 0 ${width} ${height}" class="w-full max-w-[200px] select-none" xmlns="http://www.w3.org/2000/svg">`;

    // Chord Title above diagram
    svg += `<text x="${width / 2}" y="18" text-anchor="middle" font-family="sans-serif" font-size="14" font-weight="bold" fill="#1C1613">${chordData.name}</text>`;

    // Start Fret Label if > 1
    if (!isNut) {
      svg += `<text x="${leftMargin - 12}" y="${topMargin + 18}" text-anchor="middle" font-family="monospace" font-size="10" font-weight="bold" fill="#7C7067">${startFret}fr</text>`;
    }

    // Top Nut Bar or Regular Fret Line
    const nutStrokeWidth = isNut ? 4 : 1.5;
    const nutColor = isNut ? "#2C221E" : "#D8CFBF";
    svg += `<line x1="${leftMargin}" y1="${topMargin}" x2="${leftMargin + gridWidth}" y2="${topMargin}" stroke="${nutColor}" stroke-width="${nutStrokeWidth}" stroke-linecap="round"/>`;

    // 5 Horizontal Fret Wires
    for (let f = 1; f <= 5; f++) {
      const y = topMargin + f * fretSpacing;
      svg += `<line x1="${leftMargin}" y1="${y}" x2="${leftMargin + gridWidth}" y2="${y}" stroke="#D8CFBF" stroke-width="1.2"/>`;
    }

    // 6 Vertical String Lines
    for (let s = 0; s < 6; s++) {
      const x = leftMargin + s * stringSpacing;
      const strokeWidth = 1.0 + (5 - s) * 0.25; // low strings slightly thicker
      svg += `<line x1="${x}" y1="${topMargin}" x2="${x}" y2="${topMargin + gridHeight}" stroke="#8C8077" stroke-width="${strokeWidth}"/>`;
    }

    // String Names at the bottom
    const stringNames = ["E", "A", "D", "G", "B", "E"];
    for (let s = 0; s < 6; s++) {
      const x = leftMargin + s * stringSpacing;
      svg += `<text x="${x}" y="${topMargin + gridHeight + 16}" text-anchor="middle" font-family="monospace" font-size="9" fill="#9C9087">${stringNames[s]}</text>`;
    }

    // Barre Bracket if defined
    if (chordData.barre) {
      const b = chordData.barre;
      const relFret = b.fret - startFret + 1;
      if (relFret >= 1 && relFret <= 5) {
        const y = topMargin + (relFret - 0.5) * fretSpacing;
        const x1 = leftMargin + b.startString * stringSpacing;
        const x2 = leftMargin + b.endString * stringSpacing;
        svg += `<line x1="${x1}" y1="${y}" x2="${x2}" y2="${y}" stroke="#2C221E" stroke-width="8" stroke-linecap="round"/>`;
      }
    }

    // Markers: Finger Dots, Open 'O', and Muted 'X'
    chordData.frets.forEach((fret, s) => {
      const x = leftMargin + s * stringSpacing;

      if (fret === -1 || fret === 'x' || fret === 'X') {
        // Muted X above the nut
        svg += `<text x="${x}" y="${topMargin - 8}" text-anchor="middle" font-family="sans-serif" font-size="12" font-weight="bold" fill="#7C7067">X</text>`;
      } else if (fret === 0) {
        // Open O above the nut
        svg += `<circle cx="${x}" cy="${topMargin - 12}" r="4.5" fill="none" stroke="#2C221E" stroke-width="1.5"/>`;
      } else {
        // Fretted Note Dot
        const relFret = fret - startFret + 1;
        if (relFret >= 1 && relFret <= 5) {
          const y = topMargin + (relFret - 0.5) * fretSpacing;
          const finger = chordData.fingers ? chordData.fingers[s] : "";

          // Outer circle
          svg += `<circle cx="${x}" cy="${y}" r="8" fill="#2C221E" stroke="#FFFFFF" stroke-width="1"/>`;
          // Finger Number
          if (finger && finger !== '0' && finger !== 'x') {
            svg += `<text x="${x}" y="${y + 3.5}" text-anchor="middle" font-family="sans-serif" font-size="9" font-weight="bold" fill="#FFFFFF">${finger}</text>`;
          }
        }
      }
    });

    svg += `</svg>`;
    return svg;
  }


  // ==========================================================================
  // 5. MODULE STATE & UI CONTROLLER
  // ==========================================================================

  let audio = null;
  let scene3d = null;
  let activeChordId = "c-major";
  let activeScaleKey = "C";
  let activeScaleType = "major";
  let fretboardDisplayMode = "notes"; // "notes" or "degrees"

  function init() {
    // 1. Audio Engine
    if (!audio) {
      audio = new GuitarAudioEngine();
    }

    // 2. 3D Scene
    if (!scene3d) {
      const container = document.getElementById('guitar-3d-canvas-container');
      if (container) {
        scene3d = new Guitar3DScene('guitar-3d-canvas-container');
      }
    }

    // 3. Populate Chord Selector
    populateChordSelector();

    // 4. Bind UI Event Listeners
    bindEvents();

    // 5. Select Default Chord
    selectChord(activeChordId);

    // 6. Initialize Fretboard Harmony View
    initFretboardHarmonyView();
  }

  function populateChordSelector() {
    const selectEl = document.getElementById('guitar-chord-select');
    if (!selectEl) return;

    selectEl.innerHTML = '';
    const categories = {};

    Object.values(CHORDS).forEach(chord => {
      if (!categories[chord.category]) categories[chord.category] = [];
      categories[chord.category].push(chord);
    });

    Object.keys(categories).forEach(cat => {
      const optGroup = document.createElement('optgroup');
      optGroup.label = cat;
      categories[cat].forEach(chord => {
        const opt = document.createElement('option');
        opt.value = chord.id;
        opt.textContent = chord.name;
        optGroup.appendChild(opt);
      });
      selectEl.appendChild(optGroup);
    });

    selectEl.value = activeChordId;
  }

  function bindEvents() {
    // Chord dropdown change
    const chordSelect = document.getElementById('guitar-chord-select');
    if (chordSelect) {
      chordSelect.addEventListener('change', (e) => {
        selectChord(e.target.value);
      });
    }

    // Strum Chord Button
    const strumBtn = document.getElementById('guitar-strum-btn');
    if (strumBtn) {
      strumBtn.addEventListener('click', () => {
        const chord = CHORDS[activeChordId];
        if (!chord) return;

        const directionSelect = document.getElementById('guitar-strum-dir-select');
        const dir = directionSelect ? directionSelect.value : 'down';

        const speedSlider = document.getElementById('guitar-strum-speed-slider');
        const speed = speedSlider ? parseInt(speedSlider.value) : 30;

        // Trigger Audio Strum
        audio.strumChord(chord, dir, speed);

        // Trigger Visual 3D String Vibrations
        const stringIndices = (dir === 'down') ? [0, 1, 2, 3, 4, 5] : [5, 4, 3, 2, 1, 0];
        let delayCount = 0;
        stringIndices.forEach(sIdx => {
          if (chord.frets[sIdx] >= 0) {
            setTimeout(() => {
              if (scene3d) scene3d.vibrateString(sIdx);
              highlightStringButton(sIdx);
            }, delayCount * speed);
            delayCount++;
          }
        });
      });
    }

    // Acoustic / Electric Body Type Toggle
    const typeToggle = document.getElementById('guitar-type-toggle-btn');
    if (typeToggle) {
      typeToggle.addEventListener('click', () => {
        const nextType = (audio.guitarType === 'acoustic') ? 'electric' : 'acoustic';
        audio.setGuitarType(nextType);
        if (scene3d) scene3d.setGuitarType(nextType);

        typeToggle.textContent = (nextType === 'acoustic') ? "Model: Carbon Fiber Cutaway" : "Model: Solid Electric";
        typeToggle.classList.toggle('bg-[#2C221E]', nextType === 'electric');
        typeToggle.classList.toggle('text-white', nextType === 'electric');

        const toneBadge = document.getElementById('guitar-tone-mode-badge');
        if (toneBadge) {
          toneBadge.textContent = (nextType === 'acoustic') ? "Carbon Fiber Acoustic (Helmholtz 105Hz)" : "Electric Clean (Pickup Voicing 2.4kHz)";
        }
      });
    }

    // Camera Preset Views (Full vs Neck)
    const btnCamFull = document.getElementById('guitar-cam-full-btn');
    const btnCamNeck = document.getElementById('guitar-cam-neck-btn');

    if (btnCamFull) {
      btnCamFull.addEventListener('click', () => {
        if (scene3d) scene3d.setCameraPreset('full');
        btnCamFull.classList.add('bg-[#2C221E]', 'text-white');
        btnCamFull.classList.remove('bg-white', 'text-[#3E3632]');
        if (btnCamNeck) {
          btnCamNeck.classList.remove('bg-[#2C221E]', 'text-white');
          btnCamNeck.classList.add('bg-white', 'text-[#3E3632]');
        }
      });
    }

    if (btnCamNeck) {
      btnCamNeck.addEventListener('click', () => {
        if (scene3d) scene3d.setCameraPreset('neck');
        btnCamNeck.classList.add('bg-[#2C221E]', 'text-white');
        btnCamNeck.classList.remove('bg-white', 'text-[#3E3632]');
        if (btnCamFull) {
          btnCamFull.classList.remove('bg-[#2C221E]', 'text-white');
          btnCamFull.classList.add('bg-white', 'text-[#3E3632]');
        }
      });
    }

    // Strum Speed Slider
    const speedSlider = document.getElementById('guitar-strum-speed-slider');
    const speedLabel = document.getElementById('guitar-strum-speed-val');
    if (speedSlider && speedLabel) {
      speedSlider.addEventListener('input', () => {
        speedLabel.textContent = `${speedSlider.value}ms`;
      });
    }

    // Volume Slider
    const volSlider = document.getElementById('guitar-volume-slider');
    if (volSlider) {
      volSlider.addEventListener('input', () => {
        const val = parseFloat(volSlider.value) / 100;
        audio.setVolume(val);
      });
    }

    // Individual string buttons setup (6th string to 1st string)
    for (let s = 0; s < 6; s++) {
      const btn = document.getElementById(`guitar-string-btn-${s}`);
      if (btn) {
        btn.addEventListener('click', () => {
          pluckIndividualString(s);
        });
      }
    }
  }

  // Select and Render Chord
  function selectChord(chordId) {
    const chord = CHORDS[chordId];
    if (!chord) return;
    activeChordId = chordId;

    // 1. Update dropdown if needed
    const selectEl = document.getElementById('guitar-chord-select');
    if (selectEl && selectEl.value !== chordId) selectEl.value = chordId;

    // 2. Update 3D Finger Markers
    if (scene3d) scene3d.displayChord(chord);

    // 3. Render 2D Vector SVG Chord Box
    const svgContainer = document.getElementById('guitar-chord-svg-container');
    if (svgContainer) {
      svgContainer.innerHTML = renderSvgChordDiagram(chord);
    }

    // 4. Update Harmonic Theory Panel
    const nameEl = document.getElementById('guitar-chord-name');
    const catEl = document.getElementById('guitar-chord-category');
    const formulaEl = document.getElementById('guitar-chord-formula');
    const intervalsEl = document.getElementById('guitar-chord-intervals');
    const notesEl = document.getElementById('guitar-chord-notes');
    const roleEl = document.getElementById('guitar-chord-role');
    const tipsEl = document.getElementById('guitar-chord-tips');

    if (nameEl) nameEl.textContent = chord.name;
    if (catEl) catEl.textContent = chord.category;
    if (formulaEl) formulaEl.textContent = chord.formula;
    if (intervalsEl) intervalsEl.textContent = chord.intervals;
    if (notesEl) notesEl.textContent = chord.notes.join(' - ');
    if (roleEl) roleEl.textContent = chord.harmonicRole;
    if (tipsEl) tipsEl.textContent = chord.tips;

    // 5. Update Individual String Pluck Triggers with Chord Note Names
    updateStringButtons(chord);
  }

  // Update Individual String Buttons
  function updateStringButtons(chord) {
    if (!chord) return;
    for (let s = 0; s < 6; s++) {
      const btn = document.getElementById(`guitar-string-btn-${s}`);
      const noteLabel = document.getElementById(`guitar-string-note-${s}`);
      const fret = chord.frets[s];

      if (btn && noteLabel) {
        if (fret === -1 || fret === 'x') {
          noteLabel.textContent = "X";
          btn.classList.add('opacity-40');
        } else if (fret === 0) {
          noteLabel.textContent = `${getNoteName(s, 0)} (Open)`;
          btn.classList.remove('opacity-40');
        } else {
          noteLabel.textContent = `${getNoteName(s, fret)} (Fr ${fret})`;
          btn.classList.remove('opacity-40');
        }
      }
    }
  }

  function pluckIndividualString(stringIndex) {
    const chord = CHORDS[activeChordId];
    if (!chord) return;
    const fret = chord.frets[stringIndex];

    if (fret >= 0) {
      audio.pluckString(stringIndex, fret, 0);
      if (scene3d) scene3d.vibrateString(stringIndex);
      highlightStringButton(stringIndex);
    }
  }

  function highlightStringButton(stringIndex) {
    const btn = document.getElementById(`guitar-string-btn-${stringIndex}`);
    if (btn) {
      btn.classList.add('bg-[#EFECE6]', 'border-[#2C221E]');
      setTimeout(() => {
        btn.classList.remove('bg-[#EFECE6]', 'border-[#2C221E]');
      }, 250);
    }
  }


  // ==========================================================================
  // 6. SUB-SKILL 2: FRETBOARD HARMONY & THEORY MODULE
  // ==========================================================================

  function initFretboardHarmonyView() {
    // Populate Root Note Selector
    const rootSelect = document.getElementById('fretboard-root-select');
    if (rootSelect) {
      rootSelect.innerHTML = '';
      NOTE_NAMES.forEach(n => {
        const opt = document.createElement('option');
        opt.value = n;
        opt.textContent = n;
        rootSelect.appendChild(opt);
      });
      rootSelect.value = activeScaleKey;
      rootSelect.addEventListener('change', (e) => {
        activeScaleKey = e.target.value;
        renderFretboardGrid();
      });
    }

    // Populate Scale / Mode Selector
    const scaleSelect = document.getElementById('fretboard-scale-select');
    if (scaleSelect) {
      scaleSelect.innerHTML = '';
      Object.keys(SCALES).forEach(k => {
        const opt = document.createElement('option');
        opt.value = k;
        opt.textContent = SCALES[k].name;
        scaleSelect.appendChild(opt);
      });
      scaleSelect.value = activeScaleType;
      scaleSelect.addEventListener('change', (e) => {
        activeScaleType = e.target.value;
        renderFretboardGrid();
      });
    }

    // Display Mode Toggle (Notes vs Degrees)
    const toggleNotesBtn = document.getElementById('fretboard-mode-notes-btn');
    const toggleDegreesBtn = document.getElementById('fretboard-mode-degrees-btn');

    if (toggleNotesBtn) {
      toggleNotesBtn.addEventListener('click', () => {
        fretboardDisplayMode = 'notes';
        toggleNotesBtn.classList.add('bg-[#2C221E]', 'text-white');
        toggleNotesBtn.classList.remove('bg-white', 'text-[#3E3632]');
        if (toggleDegreesBtn) {
          toggleDegreesBtn.classList.remove('bg-[#2C221E]', 'text-white');
          toggleDegreesBtn.classList.add('bg-white', 'text-[#3E3632]');
        }
        renderFretboardGrid();
      });
    }

    if (toggleDegreesBtn) {
      toggleDegreesBtn.addEventListener('click', () => {
        fretboardDisplayMode = 'degrees';
        toggleDegreesBtn.classList.add('bg-[#2C221E]', 'text-white');
        toggleDegreesBtn.classList.remove('bg-white', 'text-[#3E3632]');
        if (toggleNotesBtn) {
          toggleNotesBtn.classList.remove('bg-[#2C221E]', 'text-white');
          toggleNotesBtn.classList.add('bg-white', 'text-[#3E3632]');
        }
        renderFretboardGrid();
      });
    }

    // Initial Render of Fretboard Matrix
    renderFretboardGrid();
  }

  function renderFretboardGrid() {
    const container = document.getElementById('fretboard-matrix-container');
    if (!container) return;

    const scale = SCALES[activeScaleType];
    if (!scale) return;

    const rootIdx = NOTE_NAMES.indexOf(activeScaleKey);

    // Calculate all chromatic note indices in scale
    const scaleNoteIndices = scale.intervals.map(inter => (rootIdx + inter) % 12);
    const scaleNotes = scaleNoteIndices.map(idx => NOTE_NAMES[idx]);

    // Update Theory Overview Card
    const scaleTitle = document.getElementById('fretboard-scale-title');
    const scaleFormula = document.getElementById('fretboard-scale-formula');
    const scaleNotesList = document.getElementById('fretboard-scale-notes-list');
    const scaleMood = document.getElementById('fretboard-scale-mood');

    if (scaleTitle) scaleTitle.textContent = `${activeScaleKey} ${scale.name}`;
    if (scaleFormula) scaleFormula.textContent = scale.formula;
    if (scaleNotesList) scaleNotesList.textContent = scaleNotes.join('  -  ');
    if (scaleMood) scaleMood.textContent = scale.mood;

    // Construct 6 Strings x 16 Frets (Frets 0 through 15)
    // Strings in reverse order so High E (1st) is at the top, Low E (6th) at the bottom
    const displayStrings = [5, 4, 3, 2, 1, 0];
    const fretCount = 15;

    let html = `<div class="overflow-x-auto pb-4"><div class="min-w-[780px]">`;

    // Fret Header Numbers
    html += `<div class="flex items-center mb-1 text-[11px] font-mono font-bold text-[#7C7067]">`;
    html += `<div class="w-16 shrink-0 text-center">Str</div>`;
    for (let f = 0; f <= fretCount; f++) {
      const isDotted = [3, 5, 7, 9, 12, 15].includes(f);
      html += `<div class="flex-1 text-center ${f === 12 ? 'text-[#1C1613] font-extrabold' : ''}">${f === 0 ? 'Nut' : f}${isDotted ? '*' : ''}</div>`;
    }
    html += `</div>`;

    // String Rows
    displayStrings.forEach(sIdx => {
      const strInfo = STRINGS[sIdx];
      html += `<div class="flex items-center h-10 border-b border-[#EAE3D9] hover:bg-[#F7F4EF]/50 transition-colors">`;
      // String Header
      html += `<div class="w-16 shrink-0 text-xs font-bold text-[#2C221E] px-2 flex items-center justify-between border-r-2 border-[#1C1613]">
        <span>${strInfo.name}</span>
        <span class="text-[10px] text-[#7C7067] font-mono">${strInfo.label.split(' ')[0]}</span>
      </div>`;

      // Frets
      for (let f = 0; f <= fretCount; f++) {
        const noteName = getNoteName(sIdx, f);
        const noteIdx = NOTE_NAMES.indexOf(noteName);
        const inScale = scaleNoteIndices.includes(noteIdx);
        const isRoot = (noteIdx === rootIdx);
        const freq = getFrequency(sIdx, f);

        let cellContent = "";
        let cellClass = "flex-1 h-full flex items-center justify-center border-r border-[#EAE3D9] cursor-pointer transition-all";

        if (inScale) {
          const degreeIndex = scaleNoteIndices.indexOf(noteIdx);
          const label = (fretboardDisplayMode === 'notes') ? noteName : scale.degreeLabels[degreeIndex];

          if (isRoot) {
            cellContent = `<span class="w-6 h-6 rounded-full bg-[#2C221E] text-white font-bold text-[11px] flex items-center justify-center shadow-sm">${label}</span>`;
          } else {
            cellContent = `<span class="w-6 h-6 rounded-full bg-[#EFECE6] text-[#1C1613] border border-[#D8CFBF] font-semibold text-[11px] flex items-center justify-center">${label}</span>`;
          }
        } else {
          // Dimmed non-scale note (still playable on click)
          cellContent = `<span class="text-[10px] text-[#BDB1A1] hover:text-[#7C7067]">${noteName}</span>`;
        }

        html += `<div class="${cellClass}" onclick="GUITAR_MODULE.playTone(${freq})" title="${noteName} (${freq.toFixed(1)} Hz) &bull; Click to play">${cellContent}</div>`;
      }

      html += `</div>`;
    });

    html += `</div></div>`;
    container.innerHTML = html;
  }

  function playTone(freq) {
    if (audio) audio.playTone(freq);
  }

  // Public Interface
  return {
    init,
    selectChord,
    pluckIndividualString,
    playTone,
    onResize: () => {
      if (scene3d) scene3d.onResize();
    }
  };

})();

// Expose globally
window.GUITAR_MODULE = GUITAR_MODULE;
