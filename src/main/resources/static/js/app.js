/**
 * Polymath VSN - Enterprise Application Controller (Pre-Login & Post-Login Flow with Collapsible Tree Navigation)
 */

// Global App State
const AppState = {
  currentView: 'landing', // 'landing', 'auth', 'dashboard', 'studio', 'skills', or skill workspaces
  activeSkill: 'rubiks-3d',
  cube3d: null,
  activePaletteColor: 'U',
  currentScramble: [],
  currentSolution: null,
  currentMoveIndex: -1,
  isPlayingSolution: false,
  playbackSpeed: 300,
  solveTimer: {
    running: false,
    startTime: 0,
    interval: null,
    elapsedMs: 0
  },
  netState: "UUUUUUUUURRRRRRRRRFFFFFFFFFDDDDDDDDDLLLLLLLLLBBBBBBBBB",
  authMode: 'signup', // 'signup' or 'signin'
  activeDsaQuestion: null,
  activeDsaLang: 'cpp',
  dsaCodeCache: {}
};

document.addEventListener('DOMContentLoaded', () => {
  initNavigation();
  initSidebarTree();
  initAuthView();
  initCubeStudio();
  initSkillsModules();
  initSpecializedWorkspaces();
  initDsaModule();
  if (window.CHESS_MODULE) window.CHESS_MODULE.init();
  if (window.GUITAR_MODULE) window.GUITAR_MODULE.init();
  if (window.WISDOM_MODULE && typeof window.WISDOM_MODULE.init === 'function') window.WISDOM_MODULE.init();
  if (window.CRYPTO_MODULE && typeof window.CRYPTO_MODULE.init === 'function') window.CRYPTO_MODULE.init();
  if (window.FINANCE_MODULE && typeof window.FINANCE_MODULE.init === 'function') window.FINANCE_MODULE.init();
  if (window.SIGN_LANGUAGE_MODULE && typeof window.SIGN_LANGUAGE_MODULE.init === 'function') window.SIGN_LANGUAGE_MODULE.init();
  if (window.SAMPLE_PAPERS_MODULE && typeof window.SAMPLE_PAPERS_MODULE.init === 'function') window.SAMPLE_PAPERS_MODULE.init();
  if (window.GEOPOLITICS_MODULE && typeof window.GEOPOLITICS_MODULE.init === 'function') window.GEOPOLITICS_MODULE.init();
  checkAuthStatus();
});

// ==========================================
// 1. Navigation & Routing (Gated Flow)
// ==========================================
function switchView(viewName) {
  const isAuth = API.isAuthenticated();

  // Normalize aliases
  if (viewName === 'dsa') viewName = 'dsa-curriculum';
  if (viewName === 'rubiks-3d') viewName = 'studio';
  if (viewName === 'root-mapping' || viewName === 'syntopical-reading') viewName = 'sample-papers';
  if (viewName === 'geopolitics' || viewName === 'geopolitics-conflicts') viewName = 'geopolitics-territorial';

  // If a protected view is requested by an unauthenticated user, route to auth page
  const protectedViews = [
    'dashboard', 'studio', 'skills',
    'glass-chess', 'vedic-math', 'memory-palaces',
    'major-system', 'dsa-curriculum', 'dsa-sandbox',
    'sample-papers', 'trachtenberg',
    'guitar-3d', 'fretboard-harmony',
    'wisdom-compendium', 'wisdom-archetypes',
    'crypto-ciphers', 'crypto-asymmetric', 'crypto-hashing', 'crypto-zkp',
    'wealth-growth', 'quant-dcf', 'quant-black-scholes', 'quant-portfolio', 'quant-backtest',
    'sign-tutor', 'sign-curriculum', 'sign-review',
    'geopolitics-territorial', 'geopolitics-sanctions', 'geopolitics-diplomacy', 'geopolitics-chokepoints'
  ];

  if (protectedViews.includes(viewName) && !isAuth) {
    AppState.authMode = 'signin';
    showAuthNotice("Please sign in or create an account to access Polymath modules.");
    viewName = 'auth';
  }

  AppState.currentView = viewName;

  // Toggle layout mode on body
  if (isAuth) {
    document.body.classList.add('authenticated');
    document.body.classList.remove('unauthenticated');
  } else {
    document.body.classList.remove('authenticated');
    document.body.classList.add('unauthenticated');
  }

  // Hide all view containers
  const allViewElements = document.querySelectorAll('.polymath-view-panel');
  allViewElements.forEach(el => el.classList.add('hidden'));

  // Display target view
  const target = document.getElementById(`${viewName}-view`);
  if (target) {
    target.classList.remove('hidden');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  // Update top-level sidebar link active state
  document.querySelectorAll('.sidebar-link').forEach(link => {
    if (link.dataset.view === viewName) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });

  // Update sub-skill link active state
  document.querySelectorAll('.sidebar-subskill-link').forEach(link => {
    if (link.dataset.skillTarget === viewName || (viewName === 'studio' && link.dataset.skillTarget === 'rubiks-3d')) {
      link.classList.add('active');
      // Ensure parent domain is expanded
      const parentDomain = link.closest('.sidebar-domain-item');
      if (parentDomain) parentDomain.classList.add('expanded');
    } else {
      link.classList.remove('active');
    }
  });

  // Close mobile sidebar if open
  const sidebar = document.getElementById('polymath-sidebar');
  if (sidebar && sidebar.classList.contains('open')) {
    sidebar.classList.remove('open');
  }

  if (viewName === 'studio' || viewName === 'rubiks-3d') {
    setTimeout(() => {
      if (AppState.cube3d) AppState.cube3d.onResize();
      else initCube3D();
    }, 100);
  }

  if (viewName === 'glass-chess') {
    if (window.CHESS_MODULE) window.CHESS_MODULE.init();
  }

  if (viewName === 'dsa-curriculum' || viewName === 'dsa-sandbox') {
    if (typeof initDsaModule === 'function') initDsaModule();
  }

  if (viewName === 'guitar-3d' || viewName === 'fretboard-harmony') {
    if (window.GUITAR_MODULE) {
      window.GUITAR_MODULE.init();
      setTimeout(() => {
        window.GUITAR_MODULE.onResize();
      }, 100);
    }
  }

  if (viewName === 'wisdom-compendium' || viewName === 'wisdom-archetypes') {
    if (window.WISDOM_MODULE && typeof window.WISDOM_MODULE.init === 'function') {
      window.WISDOM_MODULE.init();
    }
  }

  if (viewName.startsWith('crypto-')) {
    if (window.CRYPTO_MODULE && typeof window.CRYPTO_MODULE.initView === 'function') {
      window.CRYPTO_MODULE.initView(viewName);
    }
  }

  if (viewName.startsWith('quant-') || viewName.startsWith('wealth-')) {
    if (window.FINANCE_MODULE && typeof window.FINANCE_MODULE.initView === 'function') {
      window.FINANCE_MODULE.initView(viewName);
    }
  }

  if (viewName.startsWith('sign-')) {
    if (window.SIGN_LANGUAGE_MODULE && typeof window.SIGN_LANGUAGE_MODULE.initView === 'function') {
      window.SIGN_LANGUAGE_MODULE.initView(viewName);
    }
  }

  if (viewName === 'sample-papers') {
    if (window.SAMPLE_PAPERS_MODULE && typeof window.SAMPLE_PAPERS_MODULE.init === 'function') {
      window.SAMPLE_PAPERS_MODULE.init();
    }
  }

  if (viewName.startsWith('geopolitics-')) {
    if (window.GEOPOLITICS_MODULE && typeof window.GEOPOLITICS_MODULE.initView === 'function') {
      window.GEOPOLITICS_MODULE.initView(viewName);
    }
  }
}

function showAuthNotice(message) {
  const alert = document.getElementById('auth-error-alert');
  if (alert) {
    alert.textContent = message;
    alert.className = "mb-4 p-2.5 rounded bg-[#F7F4EF] border border-[#D8CFBF] text-[#2C221E] text-xs font-semibold";
    alert.classList.remove('hidden');
  }
}

function initNavigation() {
  document.querySelectorAll('[data-view-target]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const target = btn.dataset.viewTarget;
      const authModeAttr = btn.dataset.authMode;

      if (authModeAttr) {
        setAuthMode(authModeAttr);
      }

      switchView(target);
    });
  });

  // Mobile menu toggle
  const mobileToggleBtn = document.getElementById('sidebar-mobile-toggle');
  const sidebar = document.getElementById('polymath-sidebar');
  if (mobileToggleBtn && sidebar) {
    mobileToggleBtn.addEventListener('click', () => {
      sidebar.classList.toggle('open');
    });
  }
}

// ==========================================
// 1b. Collapsible Sidebar Tree Navigation
// ==========================================
function initSidebarTree() {
  // Collapsible Domain Headers
  document.querySelectorAll('.sidebar-domain-header').forEach(header => {
    header.addEventListener('click', (e) => {
      e.preventDefault();
      const domainItem = header.closest('.sidebar-domain-item');
      if (domainItem) {
        domainItem.classList.toggle('expanded');
      }
    });
  });

  // Sub-skill Navigation Links
  document.querySelectorAll('.sidebar-subskill-link').forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const targetSkill = link.dataset.skillTarget;
      AppState.activeSkill = targetSkill;

      if (targetSkill === 'rubiks-3d') {
        switchView('studio');
      } else {
        switchView(targetSkill);
      }
    });
  });
}

// ==========================================
// 2. Authentication View (Split-Screen)
// ==========================================
function setAuthMode(mode) {
  AppState.authMode = mode;
  const tabSignup = document.getElementById('tab-auth-signup');
  const tabSignin = document.getElementById('tab-auth-signin');
  const authTitle = document.getElementById('auth-form-title');
  const authSubtitle = document.getElementById('auth-form-subtitle');
  const authSubmitBtn = document.getElementById('auth-submit-btn');
  const usernameFieldGroup = document.getElementById('username-field-group');
  const authErrorAlert = document.getElementById('auth-error-alert');

  if (authErrorAlert) authErrorAlert.classList.add('hidden');

  if (mode === 'signup') {
    if (tabSignup) {
      tabSignup.classList.add('border-[#2C221E]', 'text-[#2C221E]');
      tabSignup.classList.remove('border-transparent', 'text-[#7C7067]');
    }
    if (tabSignin) {
      tabSignin.classList.remove('border-[#2C221E]', 'text-[#2C221E]');
      tabSignin.classList.add('border-transparent', 'text-[#7C7067]');
    }

    if (authTitle) authTitle.textContent = "Create Polymath VSN Account";
    if (authSubtitle) authSubtitle.textContent = "Start your multidisciplinary mastery curriculum.";
    if (authSubmitBtn) authSubmitBtn.textContent = "Sign up";
    if (usernameFieldGroup) usernameFieldGroup.classList.remove('hidden');
  } else {
    if (tabSignin) {
      tabSignin.classList.add('border-[#2C221E]', 'text-[#2C221E]');
      tabSignin.classList.remove('border-transparent', 'text-[#7C7067]');
    }
    if (tabSignup) {
      tabSignup.classList.remove('border-[#2C221E]', 'text-[#2C221E]');
      tabSignup.classList.add('border-transparent', 'text-[#7C7067]');
    }

    if (authTitle) authTitle.textContent = "Sign In to Polymath VSN";
    if (authSubtitle) authSubtitle.textContent = "Enter your credentials to continue your skill drills.";
    if (authSubmitBtn) authSubmitBtn.textContent = "Sign in";
    if (usernameFieldGroup) usernameFieldGroup.classList.add('hidden');
  }
}

function initAuthView() {
  const tabSignup = document.getElementById('tab-auth-signup');
  const tabSignin = document.getElementById('tab-auth-signin');
  const authForm = document.getElementById('polymath-auth-form');
  const authSubmitBtn = document.getElementById('auth-submit-btn');
  const authErrorAlert = document.getElementById('auth-error-alert');
  const quickDemoFillBtn = document.getElementById('quick-demo-fill-btn');

  if (tabSignup) tabSignup.addEventListener('click', () => setAuthMode('signup'));
  if (tabSignin) tabSignin.addEventListener('click', () => setAuthMode('signin'));

  if (quickDemoFillBtn) {
    quickDemoFillBtn.addEventListener('click', async () => {
      setAuthMode('signin');
      const emailInput = document.getElementById('auth-email');
      const passInput = document.getElementById('auth-password');
      if (emailInput) emailInput.value = "polymath@vsn.com";
      if (passInput) passInput.value = "Password123!";
      try {
        const res = await API.signin("polymath@vsn.com", "Password123!");
        updateUserUI(res);
        switchView('dashboard');
      } catch (e) {
        quickDemoLogin();
      }
    });
  }

  if (authForm) {
    authForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      if (authErrorAlert) authErrorAlert.classList.add('hidden');

      const email = document.getElementById('auth-email').value.trim();
      const password = document.getElementById('auth-password').value;
      const username = document.getElementById('auth-username') ? document.getElementById('auth-username').value.trim() : '';

      authSubmitBtn.disabled = true;
      authSubmitBtn.textContent = "Authenticating...";

      try {
        let res;
        if (AppState.authMode === 'signup') {
          res = await API.signup(email, username, password);
        } else {
          res = await API.signin(email, password);
        }

        updateUserUI(res);
        switchView('dashboard');
      } catch (err) {
        if (authErrorAlert) {
          authErrorAlert.textContent = err.message || "Authentication failed. Please verify credentials.";
          authErrorAlert.className = "mb-4 p-2.5 rounded bg-rose-50 border border-rose-200 text-rose-700 text-xs font-medium";
          authErrorAlert.classList.remove('hidden');
        }
      } finally {
        authSubmitBtn.disabled = false;
        authSubmitBtn.textContent = AppState.authMode === 'signup' ? "Sign up" : "Sign in";
      }
    });
  }

  // Institutional SSO Buttons
  document.querySelectorAll('.social-login-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const provider = btn.dataset.provider || 'Google';
      const mockUser = {
        token: "demo_jwt_token_" + Date.now(),
        email: `polymath.${provider.toLowerCase()}@vsn.com`,
        username: `${provider}User`,
        skillMasteryRate: 126.6
      };
      API.setToken(mockUser.token);
      API.setCurrentUser(mockUser);
      updateUserUI(mockUser);
      switchView('dashboard');
    });
  });
}

function quickDemoLogin() {
  const mockUser = {
    token: "demo_jwt_token_demo",
    email: "polymath@vsn.com",
    username: "PolymathUser",
    skillMasteryRate: 126.6
  };
  API.setToken(mockUser.token);
  API.setCurrentUser(mockUser);
  updateUserUI(mockUser);
  switchView('dashboard');
  if (window.WISDOM_MODULE && typeof window.WISDOM_MODULE.init === 'function') {
    window.WISDOM_MODULE.init();
  }
}
window.quickDemoLogin = quickDemoLogin;

function checkAuthStatus() {
  const user = API.getCurrentUser();
  if (user && API.isAuthenticated()) {
    document.body.classList.add('authenticated');
    document.body.classList.remove('unauthenticated');
    updateUserUI(user);
    API.getProfile().then(profile => {
      if (profile) updateUserUI(profile);
    }).catch(() => {});
    switchView('dashboard');
  } else {
    document.body.classList.remove('authenticated');
    document.body.classList.add('unauthenticated');
    switchView('landing');
  }
}

function updateUserUI(user) {
  const userEmailLabel = document.getElementById('sidebar-user-email');
  const userMasteryLabel = document.getElementById('sidebar-user-mastery');

  if (user && API.isAuthenticated()) {
    document.body.classList.add('authenticated');
    document.body.classList.remove('unauthenticated');
    if (userEmailLabel) userEmailLabel.textContent = user.email || user.username;
    if (userMasteryLabel) userMasteryLabel.textContent = user.skillMasteryRate ? `${user.skillMasteryRate.toFixed(1)}%` : 'Active';
  } else {
    document.body.classList.remove('authenticated');
    document.body.classList.add('unauthenticated');
  }

  const signoutBtn = document.getElementById('sidebar-signout-btn');
  if (signoutBtn) {
    signoutBtn.onclick = () => {
      API.setToken(null);
      API.setCurrentUser(null);
      document.body.classList.remove('authenticated');
      document.body.classList.add('unauthenticated');
      switchView('landing');
    };
  }
}

// ==========================================
// 3. 3x3 Rubik's Cube Solver Studio
// ==========================================
function initCubeStudio() {
  initColorPalette();
  init2DNet();
  initStudioControls();
}

function initCube3D() {
  const container = document.getElementById('cube-3d-canvas-container');
  if (!container || AppState.cube3d) return;

  AppState.cube3d = new Cube3D('cube-3d-canvas-container', {
    onStateChange: (newState) => {
      AppState.netState = newState;
      render2DNet();
    },
    onMoveComplete: (move) => {}
  });
}

function initColorPalette() {
  const paletteBtns = document.querySelectorAll('.palette-btn');
  paletteBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      paletteBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      AppState.activePaletteColor = btn.dataset.color;
      if (AppState.cube3d) {
        AppState.cube3d.activeColor = btn.dataset.color;
      }
    });
  });

  const paintModeToggle = document.getElementById('toggle-paint-mode-btn');
  if (paintModeToggle) {
    paintModeToggle.addEventListener('click', () => {
      const isPainting = !AppState.cube3d?.paintMode;
      if (AppState.cube3d) AppState.cube3d.paintMode = isPainting;
      paintModeToggle.classList.toggle('bg-[#2C221E]', isPainting);
      paintModeToggle.classList.toggle('text-white', isPainting);
      paintModeToggle.classList.toggle('bg-white', !isPainting);
      paintModeToggle.classList.toggle('text-[#3E3632]', !isPainting);
      paintModeToggle.textContent = isPainting ? "3D Painting Active" : "Enable 3D Painting";
    });
  }
}

const FACE_ORDER = [
  { name: 'U', offset: 0, label: 'Up (White)', defaultColor: 'U', centerIndex: 4 },
  { name: 'L', offset: 36, label: 'Left (Orange)', defaultColor: 'L', centerIndex: 40 },
  { name: 'F', offset: 18, label: 'Front (Green)', defaultColor: 'F', centerIndex: 22 },
  { name: 'R', offset: 9, label: 'Right (Red)', defaultColor: 'R', centerIndex: 13 },
  { name: 'B', offset: 45, label: 'Back (Blue)', defaultColor: 'B', centerIndex: 49 },
  { name: 'D', offset: 27, label: 'Down (Yellow)', defaultColor: 'D', centerIndex: 31 }
];

function init2DNet() {
  FACE_ORDER.forEach(face => {
    const faceContainer = document.getElementById(`net-face-${face.name.toLowerCase()}`);
    if (!faceContainer) return;
    faceContainer.innerHTML = '';

    for (let i = 0; i < 9; i++) {
      const stickerIdx = face.offset + i;
      const sticker = document.createElement('div');
      sticker.className = `cube-sticker sticker-${face.defaultColor}`;
      sticker.dataset.index = stickerIdx;

      if (i === 4) {
        sticker.classList.add('center-sticker');
      }

      sticker.addEventListener('click', () => {
        paintSticker(stickerIdx, AppState.activePaletteColor);
      });

      faceContainer.appendChild(sticker);
    }
  });

  render2DNet();
}

function paintSticker(index, color) {
  const stateArr = AppState.netState.split('');
  stateArr[index] = color;
  AppState.netState = stateArr.join('');

  render2DNet();
  if (AppState.cube3d) {
    AppState.cube3d.setState(AppState.netState);
  }
}

function render2DNet() {
  const stickers = document.querySelectorAll('.cube-sticker');
  stickers.forEach(el => {
    const idx = parseInt(el.dataset.index, 10);
    const colorChar = AppState.netState.charAt(idx) || 'U';

    el.className = `cube-sticker sticker-${colorChar}`;
    if ([4, 13, 22, 31, 40, 49].includes(idx)) {
      el.classList.add('center-sticker');
    }
  });
}

function initStudioControls() {
  const scrambleBtn = document.getElementById('scramble-btn');
  if (scrambleBtn) {
    scrambleBtn.addEventListener('click', async () => {
      scrambleBtn.disabled = true;
      scrambleBtn.textContent = "Scrambling...";

      try {
        const res = await API.getScramble(20);
        AppState.currentScramble = res.moves;
        AppState.currentSolution = null;
        clearSolutionUI();

        document.getElementById('scramble-display-container').classList.remove('hidden');
        document.getElementById('scramble-moves-text').textContent = res.scrambleString;

        if (AppState.cube3d) {
          await AppState.cube3d.playMoves(res.moves, 110);
        }
      } catch (err) {
        console.error("Scramble failed:", err);
      } finally {
        scrambleBtn.disabled = false;
        scrambleBtn.textContent = "Scramble Cube";
      }
    });
  }

  const resetBtn = document.getElementById('reset-cube-btn');
  if (resetBtn) {
    resetBtn.addEventListener('click', () => {
      if (AppState.cube3d) AppState.cube3d.reset();
      AppState.netState = "UUUUUUUUURRRRRRRRRFFFFFFFFFDDDDDDDDDLLLLLLLLLBBBBBBBBB";
      AppState.currentScramble = [];
      AppState.currentSolution = null;
      render2DNet();
      clearSolutionUI();
      document.getElementById('scramble-display-container').classList.add('hidden');
    });
  }

  const validateBtn = document.getElementById('validate-cube-btn');
  const validationAlert = document.getElementById('validation-result-alert');
  if (validateBtn) {
    validateBtn.addEventListener('click', async () => {
      try {
        const res = await API.validateCube(AppState.netState);
        validationAlert.classList.remove('hidden');
        if (res.valid) {
          validationAlert.className = "p-3 rounded-lg bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-semibold";
          validationAlert.innerHTML = `<strong>Valid Configuration:</strong> All 6 faces have exactly 9 stickers. State verified.`;
        } else {
          validationAlert.className = "p-3 rounded-lg bg-amber-50 text-amber-800 border border-amber-200 text-xs font-semibold";
          validationAlert.innerHTML = `<strong>Invalid Distribution:</strong> ${res.message}`;
        }
      } catch (err) {
        validationAlert.classList.remove('hidden');
        validationAlert.className = "p-3 rounded-lg bg-rose-50 text-rose-800 border border-rose-200 text-xs font-semibold";
        validationAlert.textContent = err.message;
      }
    });
  }

  const solveBtn = document.getElementById('solve-cube-btn');
  if (solveBtn) {
    solveBtn.addEventListener('click', async () => {
      solveBtn.disabled = true;
      solveBtn.textContent = "Computing Solution...";

      startSolveTimer();

      try {
        const payload = {
          faceletString: AppState.netState,
          scrambleMoves: AppState.currentScramble && AppState.currentScramble.length > 0 ? AppState.currentScramble : null
        };

        const solutionRes = await API.solveCube(payload);
        stopSolveTimer();

        AppState.currentSolution = solutionRes;
        renderSolutionUI(solutionRes);

        if (API.isAuthenticated()) {
          const solveTime = (AppState.solveTimer.elapsedMs / 1000).toFixed(2);
          API.recordSolve(parseFloat(solveTime)).then(updatedProfile => {
            if (updatedProfile) updateUserUI(updatedProfile);
          }).catch(() => {});
        }
      } catch (err) {
        stopSolveTimer();
        alert("Failed to compute cube solution: " + err.message);
      } finally {
        solveBtn.disabled = false;
        solveBtn.textContent = "Solve Cube";
      }
    });
  }

  // Playback Controls
  const playAllBtn = document.getElementById('play-solution-btn');
  const prevMoveBtn = document.getElementById('prev-move-btn');
  const nextMoveBtn = document.getElementById('next-move-btn');
  const speedSlider = document.getElementById('playback-speed-slider');

  if (speedSlider) {
    speedSlider.addEventListener('input', (e) => {
      AppState.playbackSpeed = parseInt(e.target.value, 10);
      document.getElementById('speed-value-label').textContent = `${AppState.playbackSpeed}ms`;
    });
  }

  if (playAllBtn) {
    playAllBtn.addEventListener('click', () => {
      if (!AppState.currentSolution || !AppState.currentSolution.moves.length) return;

      if (AppState.isPlayingSolution) {
        AppState.isPlayingSolution = false;
        if (AppState.cube3d) AppState.cube3d.stopPlayback();
        playAllBtn.textContent = "Resume";
      } else {
        AppState.isPlayingSolution = true;
        playAllBtn.textContent = "Pause";
        playSolutionSequence();
      }
    });
  }

  if (nextMoveBtn) {
    nextMoveBtn.addEventListener('click', async () => {
      if (!AppState.currentSolution || !AppState.currentSolution.moves.length) return;
      if (AppState.currentMoveIndex + 1 < AppState.currentSolution.moves.length) {
        AppState.currentMoveIndex++;
        const move = AppState.currentSolution.moves[AppState.currentMoveIndex];
        highlightCurrentMove(AppState.currentMoveIndex);
        if (AppState.cube3d) await AppState.cube3d.applyMove(move, AppState.playbackSpeed);
      }
    });
  }

  if (prevMoveBtn) {
    prevMoveBtn.addEventListener('click', async () => {
      if (!AppState.currentSolution || AppState.currentMoveIndex < 0) return;
      const move = AppState.currentSolution.moves[AppState.currentMoveIndex];
      const invMove = invertMoveNotation(move);
      AppState.currentMoveIndex--;
      highlightCurrentMove(AppState.currentMoveIndex);
      if (AppState.cube3d) await AppState.cube3d.applyMove(invMove, AppState.playbackSpeed);
    });
  }
}

function invertMoveNotation(m) {
  if (m.endsWith("2")) return m;
  if (m.endsWith("'")) return m.substring(0, 1);
  return m + "'";
}

async function playSolutionSequence() {
  if (!AppState.currentSolution || !AppState.currentSolution.moves) return;
  const moves = AppState.currentSolution.moves;

  while (AppState.isPlayingSolution && AppState.currentMoveIndex + 1 < moves.length) {
    AppState.currentMoveIndex++;
    const move = moves[AppState.currentMoveIndex];
    highlightCurrentMove(AppState.currentMoveIndex);

    if (AppState.cube3d) {
      await AppState.cube3d.applyMove(move, AppState.playbackSpeed);
      await new Promise(r => setTimeout(r, 80));
    }
  }

  if (AppState.currentMoveIndex >= moves.length - 1) {
    AppState.isPlayingSolution = false;
    const playBtn = document.getElementById('play-solution-btn');
    if (playBtn) playBtn.textContent = "Solved";
  }
}

function highlightCurrentMove(index) {
  document.querySelectorAll('.move-badge').forEach((badge, i) => {
    badge.classList.remove('current-move');
    if (i === index) {
      badge.classList.add('current-move');
      badge.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
    } else if (i < index) {
      badge.classList.add('done-move');
    }
  });

  const progressLabel = document.getElementById('solution-progress-label');
  const total = AppState.currentSolution ? AppState.currentSolution.moves.length : 0;
  if (progressLabel) {
    progressLabel.textContent = `Move ${index + 1} of ${total}`;
  }
}

function renderSolutionUI(solution) {
  const panel = document.getElementById('solution-output-panel');
  panel.classList.remove('hidden');

  document.getElementById('solution-move-count').textContent = solution.moveCount;
  document.getElementById('solution-time-badge').textContent = `${solution.executionTimeMs} ms`;
  document.getElementById('solution-notation-string').textContent = solution.solutionString || solution.moves.join(' ');

  const moveBadgesContainer = document.getElementById('solution-move-badges-container');
  moveBadgesContainer.innerHTML = '';

  solution.moves.forEach((move, idx) => {
    const badge = document.createElement('button');
    badge.className = 'move-badge';
    badge.textContent = move;
    badge.title = `Move ${idx + 1}: ${move}`;
    badge.addEventListener('click', async () => {
      AppState.currentMoveIndex = idx;
      highlightCurrentMove(idx);
      if (AppState.cube3d) await AppState.cube3d.applyMove(move, AppState.playbackSpeed);
    });
    moveBadgesContainer.appendChild(badge);
  });

  const phasesContainer = document.getElementById('solution-phases-container');
  phasesContainer.innerHTML = '';

  if (solution.phases && solution.phases.length > 0) {
    solution.phases.forEach((phase, pIdx) => {
      const card = document.createElement('div');
      card.className = 'p-3.5 rounded-lg bg-[#F7F4EF] border border-[#EAE3D9]';

      const phaseMovesStr = phase.moves && phase.moves.length > 0 ? phase.moves.join(' ') : 'Completed';

      card.innerHTML = `
        <div class="flex items-center justify-between mb-1.5">
          <div class="flex items-center space-x-2">
            <span class="w-5 h-5 rounded bg-[#EFECE6] text-[#2C221E] text-[11px] font-bold flex items-center justify-center">${pIdx + 1}</span>
            <h4 class="font-bold text-[#1C1613] text-xs">${phase.name}</h4>
          </div>
          <span class="text-[10px] font-semibold px-1.5 py-0.5 rounded bg-[#F7F4EF] text-[#5C524C] border border-[#EAE3D9]">
            ${phase.moves ? phase.moves.length : 0} moves
          </span>
        </div>
        <p class="text-[11px] text-[#7C7067] mb-2">${phase.description}</p>
        <div class="font-mono text-[11px] text-[#3E3632] bg-white p-2 rounded border border-[#EAE3D9] overflow-x-auto whitespace-nowrap">
          ${phaseMovesStr}
        </div>
      `;
      phasesContainer.appendChild(card);
    });
  }

  AppState.currentMoveIndex = -1;
  highlightCurrentMove(-1);
}

function clearSolutionUI() {
  document.getElementById('solution-output-panel').classList.add('hidden');
  document.getElementById('solution-move-badges-container').innerHTML = '';
  document.getElementById('solution-phases-container').innerHTML = '';
}

function startSolveTimer() {
  AppState.solveTimer.running = true;
  AppState.solveTimer.startTime = performance.now();
  const timerDisplay = document.getElementById('live-solve-timer');

  AppState.solveTimer.interval = setInterval(() => {
    AppState.solveTimer.elapsedMs = performance.now() - AppState.solveTimer.startTime;
    const seconds = (AppState.solveTimer.elapsedMs / 1000).toFixed(2);
    if (timerDisplay) timerDisplay.textContent = `${seconds}s`;
  }, 50);
}

function stopSolveTimer() {
  if (AppState.solveTimer.interval) {
    clearInterval(AppState.solveTimer.interval);
    AppState.solveTimer.running = false;
  }
}

// ==========================================
// 4. Multidisciplinary Skills Modules
// ==========================================
function initSkillsModules() {
  const mathGenerateBtn = document.getElementById('math-drill-generate-btn');
  const mathCheckBtn = document.getElementById('math-drill-check-btn');
  const mathInput = document.getElementById('math-drill-answer-input');
  const mathProblemEl = document.getElementById('math-drill-problem');
  const mathFeedback = document.getElementById('math-drill-feedback');

  let currentMathAnswer = 0;

  function generateMathProblem() {
    const a = Math.floor(Math.random() * 89) + 11;
    const b = [11, 12, 5, 9, 25, 15][Math.floor(Math.random() * 6)];
    currentMathAnswer = a * b;
    if (mathProblemEl) mathProblemEl.textContent = `${a} × ${b} = ?`;
    if (mathInput) {
      mathInput.value = '';
      mathInput.focus();
    }
    if (mathFeedback) mathFeedback.classList.add('hidden');
  }

  if (mathGenerateBtn) mathGenerateBtn.addEventListener('click', generateMathProblem);

  if (mathCheckBtn && mathInput) {
    mathCheckBtn.addEventListener('click', () => {
      const val = parseInt(mathInput.value, 10);
      mathFeedback.classList.remove('hidden');
      if (val === currentMathAnswer) {
        mathFeedback.className = "text-xs font-semibold text-emerald-700";
        mathFeedback.textContent = "Correct. Calculation matches expected result.";
      } else {
        mathFeedback.className = "text-xs font-semibold text-rose-700";
        mathFeedback.textContent = `Incorrect. Expected result: ${currentMathAnswer}`;
      }
    });
  }

  const memoryPegBtn = document.getElementById('memory-peg-test-btn');
  const memoryPegCard = document.getElementById('memory-peg-card-word');
  const memoryWords = ["TIE", "NOAH", "MA", "RYE", "LAW", "SHOE", "COW", "IVY", "BEE", "TOES"];
  if (memoryPegBtn && memoryPegCard) {
    memoryPegBtn.addEventListener('click', () => {
      const idx = Math.floor(Math.random() * memoryWords.length);
      memoryPegCard.innerHTML = `
        <span class="text-2xl font-bold text-[#2C221E]">Item ${idx + 1}:</span>
        <span class="text-2xl font-bold text-[#1C1613] ml-3">${memoryWords[idx]}</span>
      `;
    });
  }

  const cipherInput = document.getElementById('cipher-input');
  const cipherShift = document.getElementById('cipher-shift');
  const cipherOutput = document.getElementById('cipher-output');

  function updateCipher() {
    if (!cipherInput || !cipherOutput || !cipherShift) return;
    const text = cipherInput.value;
    const shift = parseInt(cipherShift.value, 10);
    const decoded = text.split('').map(c => {
      const code = c.charCodeAt(0);
      if (code >= 65 && code <= 90) {
        return String.fromCharCode(((code - 65 - shift + 26) % 26) + 65);
      }
      if (code >= 97 && code <= 122) {
        return String.fromCharCode(((code - 97 - shift + 26) % 26) + 97);
      }
      return c;
    }).join('');

    cipherOutput.textContent = decoded || "Decoded message output...";
  }

  if (cipherInput) cipherInput.addEventListener('input', updateCipher);
  if (cipherShift) cipherShift.addEventListener('input', () => {
    document.getElementById('cipher-shift-label').textContent = `Shift: ${cipherShift.value}`;
    updateCipher();
  });
}

// ==========================================
// 5. Interactive Specialized Workspaces
// ==========================================
function initSpecializedWorkspaces() {
  // 1. Vedic Math Simulator
  const vedicBtn = document.getElementById('vedic-calc-btn');
  const vedicNum1 = document.getElementById('vedic-num1');
  const vedicNum2 = document.getElementById('vedic-num2');
  const vedicSteps = document.getElementById('vedic-steps-output');
  if (vedicBtn && vedicNum1 && vedicNum2 && vedicSteps) {
    vedicBtn.addEventListener('click', () => {
      const n1 = parseInt(vedicNum1.value, 10) || 23;
      const n2 = parseInt(vedicNum2.value, 10) || 14;
      const a = Math.floor(n1 / 10), b = n1 % 10;
      const c = Math.floor(n2 / 10), d = n2 % 10;

      const step1 = b * d; // right vertical
      const step2 = (a * d) + (b * c); // crosswise
      const step3 = a * c; // left vertical
      const total = n1 * n2;

      vedicSteps.innerHTML = `
        <div class="p-3 bg-white rounded border border-[#EAE3D9] text-xs font-mono space-y-1">
          <div>Step 1: Vertical right (${b} × ${d}) = ${step1}</div>
          <div>Step 2: Crosswise (${a}×${d} + ${b}×${c}) = ${step2}</div>
          <div>Step 3: Vertical left (${a} × ${c}) = ${step3}</div>
          <div class="pt-2 font-bold text-[#2C221E] font-sans border-t border-[#EAE3D9]">Product: ${n1} × ${n2} = ${total}</div>
        </div>
      `;
    });
  }

  // 2. Spatial Drafting Rotation Simulator
  const draftAngle = document.getElementById('drafting-angle-slider');
  const draftLabel = document.getElementById('drafting-angle-label');
  const draftSvg = document.getElementById('drafting-svg-mesh');
  if (draftAngle && draftLabel && draftSvg) {
    draftAngle.addEventListener('input', () => {
      draftLabel.textContent = `${draftAngle.value}°`;
      draftSvg.style.transform = `rotate(${draftAngle.value}deg)`;
    });
  }

  // 3. Complexity Calculator
  const compInput = document.getElementById('complexity-n-input');
  const compBtn = document.getElementById('complexity-calc-btn');
  if (compInput && compBtn) {
    compBtn.addEventListener('click', () => {
      const n = parseInt(compInput.value, 10) || 1000;
      document.getElementById('comp-o1').textContent = "1";
      document.getElementById('comp-ologn').textContent = Math.round(Math.log2(n));
      document.getElementById('comp-on').textContent = n.toLocaleString();
      document.getElementById('comp-onlogn').textContent = Math.round(n * Math.log2(n)).toLocaleString();
      document.getElementById('comp-on2').textContent = (n * n).toLocaleString();
    });
  }
}

// ==========================================
// 6. DSA Module: Topic Tree & LeetCode Sandbox
// ==========================================
let dsaModuleInitialized = false;

function initDsaModule() {
  if (typeof DSA_CURRICULUM === 'undefined') return;

  if (!dsaModuleInitialized) {
    dsaModuleInitialized = true;
    setupDsaEvents();
  }

  renderDsaCurriculumTree();

  // If no question active yet, load the first question (Two Sum)
  if (!AppState.activeDsaQuestion) {
    const defaultQ = findDsaQuestionById('two-sum') || (DSA_CURRICULUM[2] && DSA_CURRICULUM[2].questions[0]);
    if (defaultQ) loadDsaQuestion(defaultQ, false);
  }
}

function findDsaQuestionById(qId) {
  if (typeof DSA_CURRICULUM === 'undefined') return null;
  for (const topic of DSA_CURRICULUM) {
    for (const q of topic.questions) {
      if (q.id === qId) return q;
    }
  }
  return null;
}

function renderDsaCurriculumTree(filterQuery = '') {
  const container = document.getElementById('dsa-topic-accordion-container');
  if (!container || typeof DSA_CURRICULUM === 'undefined') return;

  container.innerHTML = '';
  const query = filterQuery.toLowerCase().trim();

  DSA_CURRICULUM.forEach((topic, tIdx) => {
    // Filter questions if query present
    const filteredQuestions = topic.questions.filter(q => {
      if (!query) return true;
      return q.title.toLowerCase().includes(query) ||
             (q.tags && q.tags.some(t => t.toLowerCase().includes(query))) ||
             topic.title.toLowerCase().includes(query);
    });

    if (query && filteredQuestions.length === 0) return;

    const topicItem = document.createElement('div');
    topicItem.className = `dsa-topic-item ${tIdx === 2 || query ? 'expanded' : ''}`; // Arrays open by default
    topicItem.dataset.topicId = topic.id;

    // Header
    const header = document.createElement('div');
    header.className = 'dsa-topic-header p-4 flex items-center justify-between cursor-pointer select-none';
    header.innerHTML = `
      <div class="flex items-center space-x-3">
        <svg class="dsa-topic-chevron w-4 h-4 text-[#7C7067]" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <polyline points="9 18 15 12 9 6"></polyline>
        </svg>
        <div>
          <span class="text-sm font-bold text-[#1C1613]">${topic.title}</span>
          <span class="block text-[11px] text-[#7C7067] mt-0.5">${topic.description}</span>
        </div>
      </div>
      <div class="flex items-center space-x-2">
        <span class="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-[#EFECE6] text-[#5C524C] border border-[#EAE3D9]">
          ${topic.questions.length} Questions
        </span>
      </div>
    `;

    header.addEventListener('click', () => {
      topicItem.classList.toggle('expanded');
    });

    // Content: questions list
    const content = document.createElement('div');
    content.className = 'dsa-topic-content';

    filteredQuestions.forEach((q) => {
      const qRow = document.createElement('div');
      const diffClass = q.difficulty === 'Easy' ? 'badge-easy' : (q.difficulty === 'Medium' ? 'badge-medium' : 'badge-hard');
      const isActive = AppState.activeDsaQuestion && AppState.activeDsaQuestion.id === q.id;

      qRow.className = `dsa-question-row ${isActive ? 'active' : ''}`;
      qRow.innerHTML = `
        <div class="flex items-center space-x-3">
          <span class="font-mono text-[#7C7067] text-[11px] w-6 text-right">${q.id.slice(0, 3)}</span>
          <span class="font-semibold text-[#1C1613] hover:text-[#4E4038] transition-colors">${q.title}</span>
          <div class="hidden sm:flex items-center space-x-1">
            ${(q.tags || []).slice(0, 2).map(t => `<span class="px-1.5 py-0.2 rounded bg-[#F7F4EF] text-[#7C7067] text-[10px]">${t}</span>`).join('')}
          </div>
        </div>
        <div class="flex items-center space-x-4">
          <span class="font-mono text-[11px] text-[#7C7067] hidden sm:inline">${q.acceptance || '50%'}</span>
          <span class="px-2 py-0.5 rounded text-[10px] font-bold uppercase ${diffClass}">${q.difficulty}</span>
          <button class="px-2.5 py-1 rounded bg-[#F7F4EF] hover:bg-[#2C221E] text-[#5C524C] hover:text-white font-semibold text-[11px] transition-colors cursor-pointer">
            Solve
          </button>
        </div>
      `;

      qRow.addEventListener('click', () => {
        loadDsaQuestion(q, true);
      });

      content.appendChild(qRow);
    });

    topicItem.appendChild(header);
    topicItem.appendChild(content);
    container.appendChild(topicItem);
  });
}

function loadDsaQuestion(q, shouldSwitchView = true) {
  if (!q) return;
  AppState.activeDsaQuestion = q;

  // Header Elements
  const titleEl = document.getElementById('sandbox-problem-title');
  const badgeEl = document.getElementById('sandbox-difficulty-badge');
  const acceptEl = document.getElementById('sandbox-acceptance-badge');
  const breadcrumbEl = document.getElementById('sandbox-topic-breadcrumb');

  if (titleEl) titleEl.textContent = q.title;
  if (acceptEl) acceptEl.textContent = `${q.acceptance || '52.0%'} Acceptance`;
  if (breadcrumbEl && typeof DSA_CURRICULUM !== 'undefined') {
    const parentTopic = DSA_CURRICULUM.find(t => t.questions.some(item => item.id === q.id));
    breadcrumbEl.textContent = parentTopic ? parentTopic.title : "DSA Curriculum";
  }
  if (badgeEl) {
    badgeEl.textContent = q.difficulty;
    badgeEl.className = `px-2 py-0.5 rounded text-[10px] font-bold uppercase ${q.difficulty === 'Easy' ? 'badge-easy' : (q.difficulty === 'Medium' ? 'badge-medium' : 'badge-hard')}`;
  }

  // Description
  const descEl = document.getElementById('sandbox-problem-desc');
  if (descEl) descEl.innerHTML = q.description;

  // Examples
  const exEl = document.getElementById('sandbox-examples-container');
  if (exEl) {
    exEl.innerHTML = (q.examples || []).map((ex, i) => `
      <div class="p-3 bg-[#F7F4EF] rounded-lg border border-[#EAE3D9] text-xs font-mono space-y-1">
        <div class="font-bold text-[#3E3632]">Example ${i + 1}:</div>
        <div><span class="text-[#7C7067]">Input:</span> <span class="text-[#2C221E]">${ex.input}</span></div>
        <div><span class="text-[#7C7067]">Output:</span> <span class="text-emerald-700 font-bold">${ex.output}</span></div>
        ${ex.explanation ? `<div class="text-[11px] text-[#7C7067] pt-1 font-sans border-t border-[#EAE3D9]">${ex.explanation}</div>` : ''}
      </div>
    `).join('');
  }

  // Constraints
  const consEl = document.getElementById('sandbox-constraints-container');
  if (consEl) {
    consEl.innerHTML = (q.constraints || []).map(c => `<li>${c}</li>`).join('');
  }

  // Tags
  const tagsEl = document.getElementById('sandbox-tags-container');
  if (tagsEl) {
    tagsEl.innerHTML = (q.tags || []).map(t => `<span class="px-2 py-0.5 rounded bg-[#EFECE6] text-[#5C524C] font-semibold text-[11px]">${t}</span>`).join('');
  }

  // Code Editor content
  const lang = AppState.activeDsaLang || 'cpp';
  const editor = document.getElementById('sandbox-code-editor');
  if (editor) {
    const cached = AppState.dsaCodeCache[`${q.id}_${lang}`];
    editor.value = cached || (q.starterCode && q.starterCode[lang]) || `// Implement solution for ${q.title}\n`;
    updateEditorLineNumbers();
  }

  // Hide previous verdicts
  const verdictCard = document.getElementById('sandbox-verdict-card');
  if (verdictCard) verdictCard.classList.add('hidden');

  if (shouldSwitchView) {
    switchView('dsa-sandbox');
  }
}

function updateEditorLineNumbers() {
  const editor = document.getElementById('sandbox-code-editor');
  const gutter = document.getElementById('sandbox-line-gutter');
  if (!editor || !gutter) return;

  const lineCount = (editor.value.match(/\n/g) || []).length + 1;
  let numbers = '';
  for (let i = 1; i <= lineCount; i++) {
    numbers += `${i}<br>`;
  }
  gutter.innerHTML = numbers;
}

function setupDsaEvents() {
  const searchInput = document.getElementById('dsa-search-input');
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      renderDsaCurriculumTree(e.target.value);
    });
  }

  const expandAllBtn = document.getElementById('dsa-expand-all-btn');
  const collapseAllBtn = document.getElementById('dsa-collapse-all-btn');
  if (expandAllBtn) {
    expandAllBtn.addEventListener('click', () => {
      document.querySelectorAll('.dsa-topic-item').forEach(el => el.classList.add('expanded'));
    });
  }
  if (collapseAllBtn) {
    collapseAllBtn.addEventListener('click', () => {
      document.querySelectorAll('.dsa-topic-item').forEach(el => el.classList.remove('expanded'));
    });
  }

  const backBtn = document.getElementById('sandbox-back-btn');
  if (backBtn) {
    backBtn.addEventListener('click', () => switchView('dsa-curriculum'));
  }

  const editor = document.getElementById('sandbox-code-editor');
  if (editor) {
    editor.addEventListener('input', () => {
      if (AppState.activeDsaQuestion) {
        const lang = AppState.activeDsaLang;
        AppState.dsaCodeCache[`${AppState.activeDsaQuestion.id}_${lang}`] = editor.value;
      }
      updateEditorLineNumbers();
    });

    // Tab key indentation handling (4 spaces)
    editor.addEventListener('keydown', (e) => {
      if (e.key === 'Tab') {
        e.preventDefault();
        const start = editor.selectionStart;
        const end = editor.selectionEnd;
        editor.value = editor.value.substring(0, start) + '    ' + editor.value.substring(end);
        editor.selectionStart = editor.selectionEnd = start + 4;
        updateEditorLineNumbers();
      }
    });
  }

  // Language Dropdown
  const langSelect = document.getElementById('sandbox-lang-select');
  if (langSelect && editor) {
    langSelect.addEventListener('change', (e) => {
      AppState.activeDsaLang = e.target.value;
      if (AppState.activeDsaQuestion) {
        const q = AppState.activeDsaQuestion;
        const cached = AppState.dsaCodeCache[`${q.id}_${AppState.activeDsaLang}`];
        editor.value = cached || (q.starterCode && q.starterCode[AppState.activeDsaLang]) || '';
        updateEditorLineNumbers();
      }
    });
  }

  // Font Size
  const fontSelect = document.getElementById('sandbox-fontsize-select');
  if (fontSelect && editor) {
    fontSelect.addEventListener('change', (e) => {
      editor.style.fontSize = `${e.target.value}px`;
      const gutter = document.getElementById('sandbox-line-gutter');
      if (gutter) gutter.style.fontSize = `${Math.max(10, parseInt(e.target.value) - 1)}px`;
    });
  }

  // Reset Button
  const resetBtn = document.getElementById('sandbox-reset-btn');
  if (resetBtn && editor) {
    resetBtn.addEventListener('click', () => {
      if (AppState.activeDsaQuestion) {
        const q = AppState.activeDsaQuestion;
        const lang = AppState.activeDsaLang;
        delete AppState.dsaCodeCache[`${q.id}_${lang}`];
        editor.value = (q.starterCode && q.starterCode[lang]) || '';
        updateEditorLineNumbers();
      }
    });
  }

  // Copy Button
  const copyBtn = document.getElementById('sandbox-copy-btn');
  if (copyBtn && editor) {
    copyBtn.addEventListener('click', () => {
      navigator.clipboard.writeText(editor.value).then(() => {
        copyBtn.textContent = "Copied!";
        setTimeout(() => copyBtn.textContent = "Copy", 1500);
      });
    });
  }

  // Run Code Button
  const runBtn = document.getElementById('sandbox-run-btn');
  if (runBtn) {
    runBtn.addEventListener('click', () => executeDsaCode(false));
  }

  // Submit Button
  const submitBtn = document.getElementById('sandbox-submit-btn');
  if (submitBtn) {
    submitBtn.addEventListener('click', () => executeDsaCode(true));
  }
}

async function executeDsaCode(isSubmit) {
  const q = AppState.activeDsaQuestion;
  const editor = document.getElementById('sandbox-code-editor');
  const runBtn = document.getElementById('sandbox-run-btn');
  const submitBtn = document.getElementById('sandbox-submit-btn');
  const verdictCard = document.getElementById('sandbox-verdict-card');
  const badgeEl = document.getElementById('sandbox-verdict-badge');
  const summaryEl = document.getElementById('sandbox-verdict-summary');
  const runtimeEl = document.getElementById('sandbox-runtime-pill');
  const memoryEl = document.getElementById('sandbox-memory-pill');
  const errorEl = document.getElementById('sandbox-error-container');
  const casesEl = document.getElementById('sandbox-cases-container');

  if (!editor || !q) return;

  const btn = isSubmit ? submitBtn : runBtn;
  const origText = btn.textContent;
  btn.disabled = true;
  btn.textContent = isSubmit ? "Submitting..." : "Compiling & Running...";

  try {
    const payload = {
      language: AppState.activeDsaLang,
      code: editor.value,
      problemId: q.id
    };

    const result = isSubmit ? await API.submitDsaCode(payload) : await API.runDsaCode(payload);

    verdictCard.classList.remove('hidden');

    // Verdict Badge Styling
    const status = result.status || 'Accepted';
    badgeEl.textContent = status;
    badgeEl.className = 'px-2.5 py-1 rounded text-xs font-bold font-mono';

    if (status === 'Accepted') {
      badgeEl.classList.add('bg-emerald-100', 'text-emerald-800', 'border', 'border-emerald-300');
      verdictCard.className = 'polymath-card p-5 border-l-4 border-l-emerald-500';
    } else if (status === 'Compile Error') {
      badgeEl.classList.add('bg-amber-100', 'text-amber-800', 'border', 'border-amber-300');
      verdictCard.className = 'polymath-card p-5 border-l-4 border-l-amber-500';
    } else {
      badgeEl.classList.add('bg-rose-100', 'text-rose-800', 'border', 'border-rose-300');
      verdictCard.className = 'polymath-card p-5 border-l-4 border-l-rose-500';
    }

    summaryEl.textContent = `${result.passedCount || 0} / ${result.totalCount || 0} Test Cases Passed`;
    runtimeEl.textContent = `Runtime: ${result.runtimeMs || 0} ms`;
    memoryEl.textContent = `Memory: ${result.memory || '14.2 MB'}`;

    // Compiler errors
    if (result.compilerError) {
      errorEl.textContent = result.compilerError;
      errorEl.classList.remove('hidden');
    } else {
      errorEl.classList.add('hidden');
    }

    // Cases breakdown
    casesEl.innerHTML = (result.testCaseResults || []).map((tc, idx) => `
      <div class="p-3 rounded border text-xs font-mono ${tc.passed ? 'bg-emerald-50/60 border-emerald-200' : 'bg-rose-50/60 border-rose-200'}">
        <div class="flex items-center justify-between font-bold mb-1">
          <span class="text-[#2C221E]">Case ${idx + 1}: ${tc.input || ''}</span>
          <span class="${tc.passed ? 'text-emerald-700' : 'text-rose-700'}">${tc.passed ? 'PASSED' : 'FAILED'}</span>
        </div>
        <div class="space-y-0.5 text-[11px] text-[#5C524C]">
          <div>Expected: <span class="font-bold text-[#2C221E]">${tc.expectedOutput || ''}</span></div>
          <div>Your Output: <span class="font-bold ${tc.passed ? 'text-emerald-800' : 'text-rose-800'}">${tc.actualOutput || 'None'}</span></div>
        </div>
      </div>
    `).join('');

  } catch (err) {
    verdictCard.classList.remove('hidden');
    badgeEl.textContent = "Error";
    badgeEl.className = 'px-2.5 py-1 rounded text-xs font-bold font-mono bg-rose-100 text-rose-800';
    summaryEl.textContent = "Execution request failed.";
    errorEl.textContent = err.message || "Failed to communicate with compiler backend.";
    errorEl.classList.remove('hidden');
  } finally {
    btn.disabled = false;
    btn.textContent = origText;
  }
}
