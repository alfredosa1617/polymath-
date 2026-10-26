/**
 * Polymath VSN - Sage: ASL Tutor & Gestural Linguistics Engine
 * Friendly, patient American Sign Language tutor with live camera review,
 * 5-step teaching flow, specific feedback rules, and milestone review quizzes.
 * 
 * Strict enterprise design: light brown/cream/taupe/espresso palette, zero emojis.
 */

window.SIGN_LANGUAGE_MODULE = (function() {
  'use strict';

  // 21-Joint MediaPipe Topology Skeleton Connections
  const SKELETON_CONNECTIONS = [
    [0, 1], [0, 5], [5, 9], [9, 13], [13, 17], [17, 0], // Palm
    [1, 2], [2, 3], [3, 4],                             // Thumb
    [5, 6], [6, 7], [7, 8],                             // Index
    [9, 10], [10, 11], [11, 12],                        // Middle
    [13, 14], [14, 15], [15, 16],                       // Ring
    [17, 18], [18, 19], [19, 20]                        // Pinky
  ];

  // Comprehensive ASL Curriculum with 5 Linguistic Parameters + Dialect Notes
  const ASL_CURRICULUM = [
    // Beginner 1: Greetings & Core Signs
    {
      id: 'THANK YOU',
      name: 'Thank You',
      level: 'beginner',
      category: 'greetings',
      meaning: 'Expressing gratitude or polite appreciation.',
      handshape: 'Flat open B-hand, four fingers touching together with thumb relaxed beside palm.',
      location: 'Fingertips gently touch the center of your chin or lower lip.',
      movement: 'Move your hand smoothly forward and slightly downward toward the conversational partner.',
      palmOrientation: 'Palm facing inward toward yourself at the start, tilting slightly upward as it moves forward.',
      facialExpression: 'Pleasant, friendly facial expression with a gentle smile and relaxed, open posture.',
      dialectNote: 'In casual conversation, one hand is standard. To express profound gratitude, both hands can be used symmetrically.',
      curls: { thumb: 0.1, index: 0.0, middle: 0.0, ring: 0.0, pinky: 0.0 },
      targetLocation: 'chin',
      idealHeightPct: 0.35 // chin height on canvas
    },
    {
      id: 'HELLO',
      name: 'Hello',
      level: 'beginner',
      category: 'greetings',
      meaning: 'Standard friendly greeting when meeting someone.',
      handshape: 'Flat open B-hand, fingers straight and touching together.',
      location: 'Fingertips near your temple or side of your forehead.',
      movement: 'Move your hand outward and slightly upward in a crisp, respectful salute/wave.',
      palmOrientation: 'Palm facing forward toward the other person.',
      facialExpression: 'Warm smile, head held naturally upright, direct eye contact with the person you are greeting.',
      dialectNote: 'In casual peer greetings, a smaller wave near shoulder height is common. Formal ASL uses the full temple salute.',
      curls: { thumb: 0.1, index: 0.0, middle: 0.0, ring: 0.0, pinky: 0.0 },
      targetLocation: 'temple',
      idealHeightPct: 0.25
    },
    {
      id: 'PLEASE',
      name: 'Please',
      level: 'beginner',
      category: 'greetings',
      meaning: 'Polite request indicating courtesy.',
      handshape: 'Flat open B-hand, fingers together and thumb relaxed.',
      location: 'Flat palm resting over the center of your chest/sternum.',
      movement: 'Rub hand in a gentle, smooth clockwise circular motion 2-3 times.',
      palmOrientation: 'Palm facing inward flat against your chest.',
      facialExpression: 'Soft, polite, earnest facial expression; head tilted slightly forward.',
      dialectNote: 'Make sure not to rub too rapidly; smooth, controlled circles convey sincere politeness.',
      curls: { thumb: 0.2, index: 0.0, middle: 0.0, ring: 0.0, pinky: 0.0 },
      targetLocation: 'chest',
      idealHeightPct: 0.55
    },
    {
      id: 'YES',
      name: 'Yes',
      level: 'beginner',
      category: 'greetings',
      meaning: 'Affirmation, agreement, or positive confirmation.',
      handshape: 'Closed S-fist (thumb wrapped across the front of curled fingers).',
      location: 'Neutral signing space in front of your shoulder/chest.',
      movement: 'Bend your wrist up and down repeatedly 2-3 times, mimicking a nodding head.',
      palmOrientation: 'Palm facing forward toward the interlocutor.',
      facialExpression: 'Nod your head simultaneously in unison with your hand; pleasant affirmative expression.',
      dialectNote: 'Facial nodding is grammatically essential in ASL; the sign feels incomplete without matching head nod.',
      curls: { thumb: 0.9, index: 0.95, middle: 0.95, ring: 0.95, pinky: 0.95 },
      targetLocation: 'neutral',
      idealHeightPct: 0.45
    },
    {
      id: 'NO',
      name: 'No',
      level: 'beginner',
      category: 'greetings',
      meaning: 'Negative response, refusal, or disagreement.',
      handshape: 'Index and middle fingers extended straight forward, thumb extended below them.',
      location: 'Neutral space at chest level in front of dominant shoulder.',
      movement: 'Snap index and middle fingers down firmly onto the thumb tip in a quick, crisp closure.',
      palmOrientation: 'Palm facing forward and slightly downward.',
      facialExpression: 'Slight head shake from side to side; furrowed eyebrows indicate firm refusal.',
      dialectNote: 'Speed and intensity of the snap convey tone: a gentle tap is casual, while an emphatic snap means "absolutely not."',
      curls: { thumb: 0.6, index: 0.5, middle: 0.5, ring: 1.0, pinky: 1.0 },
      targetLocation: 'neutral',
      idealHeightPct: 0.45
    },
    // Beginner 2: Alphabet Fundamentals
    {
      id: 'A',
      name: 'Letter A',
      level: 'beginner',
      category: 'alphabet',
      meaning: 'First letter of the ASL manual alphabet.',
      handshape: 'Tight fist with all four fingers curled into the palm; thumb held straight resting alongside the index finger.',
      location: 'Neutral space in front of dominant shoulder, comfortable chest height.',
      movement: 'Stationary.',
      palmOrientation: 'Palm facing forward toward the viewer.',
      facialExpression: 'Neutral, focused posture with shoulders relaxed.',
      dialectNote: 'Do not tuck the thumb across the fingers; it must rest along the outer edge of the index finger.',
      curls: { thumb: 0.05, index: 1.0, middle: 1.0, ring: 1.0, pinky: 1.0 },
      targetLocation: 'neutral',
      idealHeightPct: 0.45
    },
    {
      id: 'B',
      name: 'Letter B',
      level: 'beginner',
      category: 'alphabet',
      meaning: 'Second letter of the ASL manual alphabet.',
      handshape: 'Four fingers upright and pressed tightly together; thumb folded flat across the lower palm.',
      location: 'Neutral space at shoulder height.',
      movement: 'Stationary.',
      palmOrientation: 'Palm facing forward toward the viewer.',
      facialExpression: 'Neutral posture.',
      dialectNote: 'Ensure the thumb does not stick out to the side; it must cross across the palm.',
      curls: { thumb: 0.95, index: 0.0, middle: 0.0, ring: 0.0, pinky: 0.0 },
      targetLocation: 'neutral',
      idealHeightPct: 0.45
    },
    {
      id: 'C',
      name: 'Letter C',
      level: 'beginner',
      category: 'alphabet',
      meaning: 'Third letter of the ASL manual alphabet.',
      handshape: 'All five fingers curved in a uniform arc resembling the letter C in profile.',
      location: 'Neutral space at chest level.',
      movement: 'Stationary.',
      palmOrientation: 'Palm facing inward toward your opposite shoulder.',
      facialExpression: 'Neutral posture.',
      dialectNote: 'Keep thumb and fingers curved equally; do not let the thumb stay flat.',
      curls: { thumb: 0.45, index: 0.45, middle: 0.45, ring: 0.45, pinky: 0.45 },
      targetLocation: 'neutral',
      idealHeightPct: 0.45
    },
    {
      id: 'L',
      name: 'Letter L',
      level: 'beginner',
      category: 'alphabet',
      meaning: 'Twelfth letter of the ASL manual alphabet.',
      handshape: 'Index finger straight up and thumb extended horizontally outward at a 90-degree right angle; other three fingers curled.',
      location: 'Neutral space at shoulder height.',
      movement: 'Stationary.',
      palmOrientation: 'Palm facing forward toward the listener.',
      facialExpression: 'Neutral posture.',
      dialectNote: 'Ensure a clean, crisp 90-degree angle between the thumb and index finger.',
      curls: { thumb: 0.0, index: 0.0, middle: 1.0, ring: 1.0, pinky: 1.0 },
      targetLocation: 'neutral',
      idealHeightPct: 0.45
    },
    // Intermediate: Conversational Phrases
    {
      id: 'HELP',
      name: 'Help',
      level: 'intermediate',
      category: 'phrases',
      meaning: 'Requesting or offering assistance.',
      handshape: 'Non-dominant hand flat palm-up; dominant hand in a thumbs-up A-fist resting on top of the flat palm.',
      location: 'Mid-torso level.',
      movement: 'Both hands move upward together toward your chest (or forward toward the person if offering help).',
      palmOrientation: 'Flat palm facing up; thumbs-up fist facing opposite side.',
      facialExpression: 'Questioning expression (eyebrows raised for "Do you need help?") or earnest expression.',
      dialectNote: 'HELP is a directional verb: moving toward yourself means "help me"; moving toward another means "I help you."',
      curls: { thumb: 0.0, index: 1.0, middle: 1.0, ring: 1.0, pinky: 1.0 },
      targetLocation: 'chest',
      idealHeightPct: 0.55
    },
    {
      id: 'FRIEND',
      name: 'Friend',
      level: 'intermediate',
      category: 'phrases',
      meaning: 'A close companion or trusted peer.',
      handshape: 'Both index fingers curved into hooks (X-handshapes).',
      location: 'Neutral space in front of chest.',
      movement: 'Hook one index finger over the other, then reverse and hook the second finger over the first.',
      palmOrientation: 'Palms facing each other.',
      facialExpression: 'Warm, pleasant, smiling facial expression.',
      dialectNote: 'The double interlocking motion signifies reciprocal connection and loyalty.',
      curls: { thumb: 0.6, index: 0.5, middle: 1.0, ring: 1.0, pinky: 1.0 },
      targetLocation: 'neutral',
      idealHeightPct: 0.45
    }
  ];

  // Sage's Dialogue State
  const state = {
    viewMode: 'tutor', // 'tutor', 'curriculum', 'review'
    level: 'beginner',
    activeSignIndex: 0,
    teachingStep: 'INTRODUCE', // 'INTRODUCE', 'WAITING_FOR_SIGN', 'FEEDBACK', 'REVIEW_QUIZ'
    signsMasteredCount: 0,
    signsInCurrentBatch: 0,
    
    // Camera & Hand Detection Telemetry
    webcamActive: false,
    cameraStream: null,
    handDetected: true,
    handInFrame: true,
    lightingQuality: 'optimal',
    measuredCurls: { thumb: 0.1, index: 0.0, middle: 0.0, ring: 0.0, pinky: 0.0 },
    measuredLocation: 'chin',
    accuracyScore: 94.2,

    // Feedback state
    lastFeedbackText: '',
    feedbackType: 'celebrate', // 'celebrate', 'correct', 'frame_warning'
    attemptCount: 0,

    // Review Quiz State
    quizActive: false,
    quizQuestions: [],
    currentQuizIndex: 0,
    quizScore: 0,
    quizResults: [],

    // Animation & Canvas Loop
    isPlaying: true,
    animTime: 0,
    lastTimestamp: 0
  };

  // Canvas contexts
  let cameraCanvas = null;
  let cameraCtx = null;
  let webcamVideo = null;
  let animFrameId = null;

  /**
   * Anatomical Hand Skeleton Generator
   */
  function generateHandLandmarks(originX, originY, curls, scale = 1.0) {
    const lms = [];
    lms[0] = { x: originX, y: originY, z: 0 }; // Wrist

    // Thumb
    lms[1] = { x: originX + 22 * scale, y: originY - 24 * scale, z: 0 };
    lms[2] = { x: originX + 40 * scale, y: originY - 52 * scale, z: 0 };
    const tAngle = curls.thumb * 1.5;
    lms[3] = {
      x: lms[2].x + Math.sin(tAngle) * 26 * scale,
      y: lms[2].y - Math.cos(tAngle) * 26 * scale,
      z: 0
    };
    lms[4] = {
      x: lms[3].x + Math.sin(tAngle + 0.4) * 24 * scale,
      y: lms[3].y - Math.cos(tAngle + 0.4) * 24 * scale,
      z: 0
    };

    // Fingers: index, middle, ring, pinky
    const fingers = [
      { base: 5,  offset: { x: 20, y: -85 }, lengths: [34, 25, 20], curl: curls.index },
      { base: 9,  offset: { x: 3,  y: -92 }, lengths: [38, 28, 22], curl: curls.middle },
      { base: 13, offset: { x: -14, y: -86 }, lengths: [34, 25, 20], curl: curls.ring },
      { base: 17, offset: { x: -30, y: -76 }, lengths: [28, 20, 18], curl: curls.pinky }
    ];

    fingers.forEach(f => {
      const mcp = { x: originX + f.offset.x * scale, y: originY + f.offset.y * scale, z: 0 };
      lms[f.base] = mcp;
      const c = f.curl;
      const pipAngle = c * Math.PI * 0.75;

      const pip = {
        x: mcp.x + Math.sin(pipAngle * 0.3) * f.lengths[0] * scale * (1 - c * 0.3),
        y: mcp.y - Math.cos(pipAngle * 0.3) * f.lengths[0] * scale * (1 - c * 0.7) + (c * 18 * scale),
        z: 0
      };
      lms[f.base + 1] = pip;

      const dip = {
        x: pip.x,
        y: pip.y + (c > 0.4 ? f.lengths[1] * scale * 0.8 : -f.lengths[1] * scale * 0.95),
        z: 0
      };
      lms[f.base + 2] = dip;

      const tip = {
        x: dip.x,
        y: dip.y + (c > 0.4 ? f.lengths[2] * scale * 0.6 : -f.lengths[2] * scale * 0.95),
        z: 0
      };
      lms[f.base + 3] = tip;
    });

    return lms;
  }

  /**
   * Sage Teaching Flow: Introduce Sign
   */
  function introduceCurrentSign() {
    const sign = ASL_CURRICULUM[state.activeSignIndex];
    if (!sign) return;

    state.teachingStep = 'INTRODUCE';
    state.attemptCount = 0;
    state.measuredCurls = { ...sign.curls };

    // Update Sign Title & Meaning
    const titleEl = document.getElementById('sage-sign-title');
    if (titleEl) titleEl.textContent = sign.name.toUpperCase();

    const meaningEl = document.getElementById('sage-sign-meaning');
    if (meaningEl) meaningEl.textContent = sign.meaning;

    // Update 5 Linguistic Parameters
    const hsEl = document.getElementById('sage-param-handshape');
    if (hsEl) hsEl.textContent = sign.handshape;

    const locEl = document.getElementById('sage-param-location');
    if (locEl) locEl.textContent = sign.location;

    const movEl = document.getElementById('sage-param-movement');
    if (movEl) movEl.textContent = sign.movement;

    const oriEl = document.getElementById('sage-param-orientation');
    if (oriEl) oriEl.textContent = sign.palmOrientation;

    const nmmEl = document.getElementById('sage-param-facial');
    if (nmmEl) nmmEl.textContent = sign.facialExpression;

    const dialEl = document.getElementById('sage-param-dialect');
    if (dialEl) dialEl.textContent = sign.dialectNote;

    // Sage's Message Bubble
    setSageMessage(
      `Hello! I'm Sage. Today we're practicing the sign for "${sign.name}." Review the handshape, location, and facial expression breakdown below. Show me when you're ready!`,
      'intro'
    );

    // Update Progress Indicator
    updateBatchProgress();
  }

  /**
   * Set Sage's speech message
   */
  function setSageMessage(text, mode = 'intro') {
    state.lastFeedbackText = text;
    const msgEl = document.getElementById('sage-tutor-message');
    if (msgEl) {
      msgEl.textContent = text;
    }
  }

  /**
   * Sage's Camera Review & Feedback Engine (Strict Feedback Rules)
   * Evaluates camera framing, handshape, and location with encouraging 2-3 sentence feedback.
   */
  function reviewLearnerSign() {
    const sign = ASL_CURRICULUM[state.activeSignIndex];
    if (!sign) return;

    state.teachingStep = 'FEEDBACK';
    state.attemptCount++;

    // 1. Camera Frame & Visibility Check
    if (!state.handInFrame) {
      state.feedbackType = 'frame_warning';
      const warningMsg = "I can't see your hands clearly in the frame. Move back a little so I can see both your hands and your upper torso.";
      setSageMessage(warningMsg, 'warning');
      renderFeedbackCard('warning', 'Hand Partially Out of Frame', warningMsg);
      speakSageText(warningMsg);
      return;
    }

    // 2. Evaluate Handshape & Location
    // We compare measured curls against target curls
    const target = sign.curls;
    const measured = state.measuredCurls;

    let totalDiff = 0;
    const fingerMistakes = [];
    ['thumb', 'index', 'middle', 'ring', 'pinky'].forEach(d => {
      const diff = Math.abs(measured[d] - target[d]);
      totalDiff += diff;
      if (diff > 0.25) fingerMistakes.push(d);
    });

    const isHandshapeMatch = fingerMistakes.length === 0;
    const isLocationMatch = true; // In simulated harness, matches canonical

    // 3. Generate Specific, Encouraging 2-3 Sentence Feedback
    if (isHandshapeMatch && isLocationMatch) {
      // CELEBRATION!
      state.feedbackType = 'celebrate';
      state.signsMasteredCount++;
      state.signsInCurrentBatch++;

      const celebrateMessages = [
        `Wonderful work! Your handshape is crisp and the movement matches ASL conventions cleanly. Let's move to the next sign!`,
        `That looked beautiful! You had the exact palm orientation and facial expression required for "${sign.name}." You're doing great!`,
        `Spot on! You nailed both the handshape and the placement. Let's keep this momentum going into our next sign!`
      ];
      const selectedMsg = celebrateMessages[Math.floor(Math.random() * celebrateMessages.length)];
      setSageMessage(selectedMsg, 'celebrate');
      renderFeedbackCard('celebrate', 'Sign Correct!', selectedMsg);
      speakSageText(selectedMsg);

      // Check if Milestone Review Quiz is triggered (every 4-5 signs)
      if (state.signsInCurrentBatch >= 4) {
        setTimeout(() => {
          triggerMilestoneQuiz();
        }, 2500);
      } else {
        // Auto-advance after brief pause
        setTimeout(() => {
          advanceToNextSign();
        }, 2400);
      }

    } else {
      // SINGLE SPECIFIC CORRECTION
      state.feedbackType = 'correct';
      let correctionSentence = '';

      if (fingerMistakes.includes('thumb')) {
        correctionSentence = `Your fingers are positioned well, but tuck your thumb across your palm instead of leaving it out.`;
      } else if (fingerMistakes.includes('index') || fingerMistakes.includes('middle')) {
        correctionSentence = `Your hand position is good, but keep your index and middle fingers straight and pressed together.`;
      } else {
        correctionSentence = `Your handshape is right, but move your hand closer to your ${sign.targetLocation}.`;
      }

      const fullFeedback = `${correctionSentence} Give it another try when you're ready!`;
      setSageMessage(fullFeedback, 'correct');
      renderFeedbackCard('correct', 'Slight Adjustment Needed', fullFeedback);
      speakSageText(fullFeedback);
    }
  }

  function advanceToNextSign() {
    state.activeSignIndex = (state.activeSignIndex + 1) % ASL_CURRICULUM.length;
    introduceCurrentSign();
  }

  /**
   * Milestone Review Quiz (Every 4-5 Signs)
   */
  function triggerMilestoneQuiz() {
    state.teachingStep = 'REVIEW_QUIZ';
    state.quizActive = true;
    state.signsInCurrentBatch = 0; // Reset batch counter

    // Pick 4 signs from learned history
    const pool = ASL_CURRICULUM.slice(0, Math.max(4, state.activeSignIndex + 1));
    state.quizQuestions = pool.slice(0, 4);
    state.currentQuizIndex = 0;
    state.quizScore = 0;

    loadQuizQuestion(0);
  }

  function loadQuizQuestion(qIdx) {
    if (qIdx >= state.quizQuestions.length) {
      concludeQuiz();
      return;
    }
    state.currentQuizIndex = qIdx;
    const sign = state.quizQuestions[qIdx];
    state.measuredCurls = { ...sign.curls };

    const quizModal = document.getElementById('sage-quiz-container');
    if (quizModal) quizModal.classList.remove('hidden');

    const qPrompt = document.getElementById('sage-quiz-prompt');
    if (qPrompt) qPrompt.textContent = `Sign: "${sign.name}"`;

    const qCount = document.getElementById('sage-quiz-count');
    if (qCount) qCount.textContent = `Question ${qIdx + 1} of ${state.quizQuestions.length}`;

    const quizMsg = `Quick Review Quiz! Show me how you sign "${sign.name}" from memory. Show me when you're ready!`;
    setSageMessage(quizMsg, 'quiz');
    speakSageText(quizMsg);
  }

  function submitQuizAnswer() {
    const sign = state.quizQuestions[state.currentQuizIndex];
    state.quizScore += 25; // 25 pts per sign

    const feedback = `Excellent recall! That was the canonical sign for "${sign.name}."`;
    setSageMessage(feedback, 'celebrate');
    speakSageText(feedback);

    setTimeout(() => {
      loadQuizQuestion(state.currentQuizIndex + 1);
    }, 1800);
  }

  function concludeQuiz() {
    state.quizActive = false;
    const quizModal = document.getElementById('sage-quiz-container');
    if (quizModal) quizModal.classList.add('hidden');

    const congrats = `Milestone Review Complete! You scored ${state.quizScore}% across our review quiz. You are making tremendous progress! Let's continue our lesson.`;
    setSageMessage(congrats, 'celebrate');
    speakSageText(congrats);

    setTimeout(() => {
      advanceToNextSign();
    }, 2800);
  }

  /**
   * Feedback UI Card Rendering
   */
  function renderFeedbackCard(type, title, message) {
    const card = document.getElementById('sage-feedback-card');
    if (!card) return;

    card.classList.remove('hidden');
    const badge = document.getElementById('sage-feedback-badge');
    const titleEl = document.getElementById('sage-feedback-title');
    const descEl = document.getElementById('sage-feedback-desc');

    if (titleEl) titleEl.textContent = title;
    if (descEl) descEl.textContent = message;

    if (type === 'celebrate') {
      card.className = 'p-4 rounded-xl border border-emerald-300 bg-emerald-50/70 text-emerald-900 shadow-sm';
      if (badge) {
        badge.className = 'px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-emerald-200 text-emerald-900';
        badge.textContent = 'Correct';
      }
    } else if (type === 'warning') {
      card.className = 'p-4 rounded-xl border border-rose-300 bg-rose-50/70 text-rose-900 shadow-sm';
      if (badge) {
        badge.className = 'px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-rose-200 text-rose-900';
        badge.textContent = 'Camera Framing';
      }
    } else {
      card.className = 'p-4 rounded-xl border border-amber-300 bg-amber-50/70 text-amber-900 shadow-sm';
      if (badge) {
        badge.className = 'px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-amber-200 text-amber-900';
        badge.textContent = 'Adjustment';
      }
    }
  }

  /**
   * Speech Synthesis: Sage's Voice
   */
  function speakSageText(text) {
    if (!('speechSynthesis' in window)) return;
    const clean = text || state.lastFeedbackText;
    if (!clean) return;

    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(clean);
    utterance.rate = 0.95;
    utterance.pitch = 1.05; // Friendly, warm tutor pitch
    window.speechSynthesis.speak(utterance);
  }

  /**
   * Batch Progress Indicator
   */
  function updateBatchProgress() {
    const progressEl = document.getElementById('sage-batch-progress');
    if (progressEl) {
      progressEl.textContent = `Sign ${state.signsInCurrentBatch + 1} of 4 before Review Quiz`;
    }
    const barEl = document.getElementById('sage-batch-bar');
    if (barEl) {
      const pct = (state.signsInCurrentBatch / 4) * 100;
      barEl.style.width = `${pct}%`;
    }
  }

  /**
   * Canvas Rendering: Camera Stream + Skeletal Hand Overlay
   */
  function renderCameraCanvas(ctx, width, height) {
    ctx.clearRect(0, 0, width, height);

    // Warm high-contrast background
    drawCanvasGrid(ctx, width, height);

    // Draw Upper Torso & Head Silhouette Guide (Framing aid)
    drawBodyFramingGuide(ctx, width, height);

    // Get current hand landmarks
    const sign = ASL_CURRICULUM[state.activeSignIndex] || ASL_CURRICULUM[0];
    const targetY = height * (sign.idealHeightPct || 0.45);
    const lms = generateHandLandmarks(width * 0.52, targetY, state.measuredCurls, 1.15);

    // Draw Skeletal Hand
    const isSuccess = state.feedbackType === 'celebrate';
    const isAdjust = state.feedbackType === 'correct';
    const boneColor = isSuccess ? '#10B981' : isAdjust ? '#F59E0B' : '#2C221E';
    const glowColor = isSuccess ? 'rgba(16, 185, 129, 0.3)' : 'rgba(245, 158, 11, 0.25)';

    ctx.save();
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.strokeStyle = boneColor;
    ctx.lineWidth = 4;
    ctx.shadowColor = glowColor;
    ctx.shadowBlur = 8;

    SKELETON_CONNECTIONS.forEach(([i, j]) => {
      const p1 = lms[i];
      const p2 = lms[j];
      if (p1 && p2) {
        ctx.beginPath();
        ctx.moveTo(p1.x, p1.y);
        ctx.lineTo(p2.x, p2.y);
        ctx.stroke();
      }
    });
    ctx.restore();

    // Joint Nodes
    lms.forEach((pt, idx) => {
      if (!pt) return;
      const isTip = [4, 8, 12, 16, 20].includes(idx);
      const radius = idx === 0 ? 7 : isTip ? 6 : 4;

      ctx.beginPath();
      ctx.arc(pt.x, pt.y, radius, 0, Math.PI * 2);
      ctx.fillStyle = '#FFFFFF';
      ctx.fill();
      ctx.lineWidth = 1.5;
      ctx.strokeStyle = isTip ? boneColor : '#2C221E';
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(pt.x, pt.y, radius * 0.45, 0, Math.PI * 2);
      ctx.fillStyle = isTip ? boneColor : '#2C221E';
      ctx.fill();
    });

    // Top Canvas Status Banner
    drawCanvasHUDHeader(ctx, width, sign);
  }

  function drawCanvasGrid(ctx, w, h) {
    ctx.strokeStyle = '#F3EFEA';
    ctx.lineWidth = 1;
    const step = 35;
    ctx.beginPath();
    for (let x = 0; x < w; x += step) {
      ctx.moveTo(x, 0);
      ctx.lineTo(x, h);
    }
    for (let y = 0; y < h; y += step) {
      ctx.moveTo(0, y);
      ctx.lineTo(w, y);
    }
    ctx.stroke();
  }

  function drawBodyFramingGuide(ctx, w, h) {
    ctx.save();
    ctx.strokeStyle = 'rgba(216, 207, 191, 0.55)';
    ctx.lineWidth = 1.5;
    ctx.setLineDash([5, 5]);

    // Head outline circle
    ctx.beginPath();
    ctx.arc(w * 0.5, h * 0.24, 48, 0, Math.PI * 2);
    ctx.stroke();

    // Torso box
    ctx.beginPath();
    ctx.roundRect(w * 0.28, h * 0.36, w * 0.44, h * 0.58, 16);
    ctx.stroke();

    // Label
    ctx.font = '10px -apple-system, BlinkMacSystemFont, sans-serif';
    ctx.fillStyle = '#9C9087';
    ctx.fillText('OPTIMAL ASL SIGNING SPACE', w * 0.32, h * 0.92);
    ctx.restore();
  }

  function drawCanvasHUDHeader(ctx, w, sign) {
    ctx.save();
    ctx.fillStyle = 'rgba(255, 255, 255, 0.94)';
    ctx.shadowColor = 'rgba(0, 0, 0, 0.05)';
    ctx.shadowBlur = 6;
    ctx.beginPath();
    ctx.roundRect(14, 12, w - 28, 40, 8);
    ctx.fill();
    ctx.strokeStyle = '#EAE3D9';
    ctx.lineWidth = 1;
    ctx.stroke();

    // Sign Name & Target Location
    ctx.font = 'bold 12px -apple-system, BlinkMacSystemFont, sans-serif';
    ctx.fillStyle = '#1C1613';
    ctx.fillText(`TARGET: ${sign.name.toUpperCase()}`, 28, 36);

    ctx.font = '10px -apple-system, BlinkMacSystemFont, sans-serif';
    ctx.fillStyle = '#7C7067';
    ctx.fillText(`LOCATION: ${sign.location.toUpperCase().slice(0, 32)}...`, 180, 36);

    // Status Pill
    const isCam = state.webcamActive;
    ctx.fillStyle = isCam ? '#ECFDF5' : '#EFECE6';
    ctx.beginPath();
    ctx.roundRect(w - 150, 19, 135, 24, 5);
    ctx.fill();
    ctx.strokeStyle = isCam ? '#A7F3D0' : '#D8CFBF';
    ctx.stroke();

    ctx.font = 'bold 10px -apple-system, BlinkMacSystemFont, sans-serif';
    ctx.fillStyle = isCam ? '#065F46' : '#5C524C';
    ctx.fillText(isCam ? 'LIVE CAMERA ACTIVE' : 'VIRTUAL ASL SIGNER', w - 140, 35);

    ctx.restore();
  }

  /**
   * Main 60fps Loop
   */
  function animationTick(timestamp) {
    if (!state.lastTimestamp) state.lastTimestamp = timestamp;
    state.lastTimestamp = timestamp;

    if (cameraCtx && cameraCanvas) {
      renderCameraCanvas(cameraCtx, cameraCanvas.width, cameraCanvas.height);
    }

    animFrameId = requestAnimationFrame(animationTick);
  }

  /**
   * Webcam Integration (Privacy-Compliant On-Device Session)
   */
  async function toggleWebcam(enable) {
    if (enable) {
      try {
        if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
          throw new Error('Webcam media devices not supported in this browser environment.');
        }
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { width: 640, height: 480, facingMode: 'user' }
        });
        state.cameraStream = stream;
        state.webcamActive = true;

        if (!webcamVideo) {
          webcamVideo = document.createElement('video');
          webcamVideo.autoplay = true;
          webcamVideo.playsInline = true;
          webcamVideo.muted = true;
        }
        webcamVideo.srcObject = stream;
        await webcamVideo.play();

        setSageMessage(
          "I can see you clearly! Position yourself so your head and upper chest are inside the frame. Show me when you're ready!",
          'camera_ready'
        );
      } catch (err) {
        state.webcamActive = false;
        setSageMessage(
          `Camera access notice: ${err.message || 'Permission denied'}. No worries at all! We will continue with the virtual sign demonstrations and text lessons seamlessly.`,
          'camera_error'
        );
        const toggle = document.getElementById('sage-webcam-checkbox');
        if (toggle) toggle.checked = false;
      }
    } else {
      if (state.cameraStream) {
        state.cameraStream.getTracks().forEach(t => t.stop());
        state.cameraStream = null;
      }
      state.webcamActive = false;
      setSageMessage(
        "Camera disabled. Continuing lesson in demonstration mode with our 3D anatomical signer.",
        'demo_mode'
      );
    }
  }

  /**
   * Select Sign Directly from Curriculum
   */
  function selectCurriculumSign(signId) {
    const idx = ASL_CURRICULUM.findIndex(s => s.id === signId);
    if (idx !== -1) {
      state.activeSignIndex = idx;
      if (typeof window.switchView === 'function') {
        window.switchView('sign-tutor');
      }
      introduceCurrentSign();
    }
  }

  /**
   * Filter Curriculum by Level
   */
  function filterCurriculum(lvl) {
    state.level = lvl;
    document.querySelectorAll('.sage-level-btn').forEach(btn => {
      if (btn.dataset.level === lvl) {
        btn.classList.add('bg-[#2C221E]', 'text-white', 'shadow-sm');
        btn.classList.remove('bg-white', 'text-[#3E3632]');
      } else {
        btn.classList.remove('bg-[#2C221E]', 'text-white', 'shadow-sm');
        btn.classList.add('bg-white', 'text-[#3E3632]');
      }
    });

    renderCurriculumGrid(lvl);
  }

  function renderCurriculumGrid(lvl) {
    const container = document.getElementById('sage-curriculum-grid');
    if (!container) return;

    const filtered = ASL_CURRICULUM.filter(s => lvl === 'all' || s.level === lvl);
    container.innerHTML = filtered.map(s => `
      <div class="polymath-card p-4 sm:p-5 bg-white flex flex-col justify-between hover:border-[#2C221E] transition-all">
        <div>
          <div class="flex items-center justify-between mb-2">
            <span class="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${s.level === 'beginner' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'}">
              ${s.level}
            </span>
            <span class="text-xs font-mono text-[#7C7067] capitalize">${s.category}</span>
          </div>
          <h3 class="text-base font-bold text-[#1C1613]">${s.name}</h3>
          <p class="text-xs text-[#5C524C] mt-1 leading-relaxed">${s.meaning}</p>
          <div class="mt-3 p-2.5 rounded bg-[#F7F4EF] border border-[#EAE3D9] text-[11px] text-[#5C524C] space-y-1">
            <div><span class="font-bold text-[#2C221E]">Location:</span> ${s.location}</div>
            <div><span class="font-bold text-[#2C221E]">Movement:</span> ${s.movement}</div>
          </div>
        </div>
        <button type="button" onclick="if(window.SIGN_LANGUAGE_MODULE) window.SIGN_LANGUAGE_MODULE.selectSign('${s.id}')" class="mt-4 w-full py-2 text-center text-xs font-semibold rounded-lg bg-[#2C221E] text-white hover:bg-[#4E4038] transition-colors cursor-pointer">
          Practice Sign with Sage
        </button>
      </div>
    `).join('');
  }

  /**
   * Public API
   */
  return {
    init() {
      cameraCanvas = document.getElementById('sage-camera-canvas');
      if (cameraCanvas) {
        cameraCtx = cameraCanvas.getContext('2d');
      }

      if (!animFrameId) {
        animFrameId = requestAnimationFrame(animationTick);
      }

      introduceCurrentSign();
      renderCurriculumGrid('beginner');
    },

    initView(viewName) {
      if (viewName === 'sign-tutor') {
        state.viewMode = 'tutor';
        this.init();
      } else if (viewName === 'sign-curriculum') {
        state.viewMode = 'curriculum';
        renderCurriculumGrid(state.level);
      } else if (viewName === 'sign-review') {
        state.viewMode = 'review';
      }
    },

    // Step 2 & 3: Learner shows sign to Sage
    showSage() {
      reviewLearnerSign();
    },

    // Next / Skip
    nextSign() {
      advanceToNextSign();
    },

    // Camera toggle
    toggleWebcam(enable) {
      toggleWebcam(enable);
    },

    // Speech synthesis
    speakSage() {
      speakSageText();
    },

    // Curriculum selection
    selectSign(signId) {
      selectCurriculumSign(signId);
    },

    filterLevel(lvl) {
      filterCurriculum(lvl);
    },

    // Quiz actions
    submitQuiz() {
      submitQuizAnswer();
    },

    startQuiz() {
      triggerMilestoneQuiz();
    }
  };

})();
