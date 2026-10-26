/**
 * Polymath VSN - Interactive 3D Rubik's Cube Engine (Three.js)
 */
class Cube3D {
  constructor(containerId, options = {}) {
    this.container = document.getElementById(containerId);
    this.options = Object.assign({
      onStateChange: null,
      onMoveComplete: null
    }, options);

    // Color definitions
    this.COLORS = {
      U: 0xFFFFFF, // Up: White
      D: 0xFFD500, // Down: Yellow
      F: 0x009B48, // Front: Green
      B: 0x0046AD, // Back: Blue
      L: 0xFF5800, // Left: Orange
      R: 0xB71234, // Right: Red
      INNER: 0x1E293B // Inner / Hidden
    };

    this.HEX_MAP = {
      'U': '#FFFFFF',
      'D': '#FFD500',
      'F': '#009B48',
      'B': '#0046AD',
      'L': '#FF5800',
      'R': '#B71234'
    };

    // State representation (54 facelets)
    // Order: U1-U9, R1-R9, F1-F9, D1-D9, L1-L9, B1-B9
    this.state = "UUUUUUUUURRRRRRRRRFFFFFFFFFDDDDDDDDDLLLLLLLLLBBBBBBBBB";
    this.isAnimating = false;
    this.animationQueue = [];
    this.activeColor = 'U'; // default selected color for painting
    this.paintMode = false;

    this.init();
  }

  init() {
    if (!this.container) return;

    const width = this.container.clientWidth || 400;
    const height = this.container.clientHeight || 400;

    // 1. Scene
    this.scene = new THREE.Scene();

    // 2. Camera
    this.camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    this.camera.position.set(5.5, 4.5, 6.5);

    // 3. Renderer
    this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    this.renderer.setSize(width, height);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.shadowMap.enabled = true;
    this.container.innerHTML = '';
    this.container.appendChild(this.renderer.domElement);

    // 4. Orbit Controls
    if (window.THREE && THREE.OrbitControls) {
      this.controls = new THREE.OrbitControls(this.camera, this.renderer.domElement);
      this.controls.enableDamping = true;
      this.controls.dampingFactor = 0.05;
      this.controls.minDistance = 4;
      this.controls.maxDistance = 14;
    }

    // 5. Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.85);
    this.scene.add(ambientLight);

    const dirLight1 = new THREE.DirectionalLight(0xffffff, 0.7);
    dirLight1.position.set(10, 20, 15);
    this.scene.add(dirLight1);

    const dirLight2 = new THREE.DirectionalLight(0xffffff, 0.4);
    dirLight2.position.set(-10, -10, -10);
    this.scene.add(dirLight2);

    // 6. Cube Root & Pivot for rotation
    this.cubeGroup = new THREE.Group();
    this.scene.add(this.cubeGroup);

    this.pivot = new THREE.Group();
    this.scene.add(this.pivot);

    // 7. Raycaster for clicking stickers
    this.raycaster = new THREE.Raycaster();
    this.mouse = new THREE.Vector2();

    this.buildCubies();
    this.bindEvents();
    this.animate();
  }

  buildCubies() {
    this.cubies = [];
    const size = 0.95;
    const gap = 1.0;
    const geom = new THREE.BoxGeometry(size, size, size);

    // Three.js Box Materials order:
    // 0: +X (Right / R)
    // 1: -X (Left / L)
    // 2: +Y (Up / U)
    // 3: -Y (Down / D)
    // 4: +Z (Front / F)
    // 5: -Z (Back / B)

    for (let x = -1; x <= 1; x++) {
      for (let y = -1; y <= 1; y++) {
        for (let z = -1; z <= 1; z++) {
          const materials = [
            new THREE.MeshStandardMaterial({ color: x === 1 ? this.COLORS.R : this.COLORS.INNER, roughness: 0.2 }),
            new THREE.MeshStandardMaterial({ color: x === -1 ? this.COLORS.L : this.COLORS.INNER, roughness: 0.2 }),
            new THREE.MeshStandardMaterial({ color: y === 1 ? this.COLORS.U : this.COLORS.INNER, roughness: 0.2 }),
            new THREE.MeshStandardMaterial({ color: y === -1 ? this.COLORS.D : this.COLORS.INNER, roughness: 0.2 }),
            new THREE.MeshStandardMaterial({ color: z === 1 ? this.COLORS.F : this.COLORS.INNER, roughness: 0.2 }),
            new THREE.MeshStandardMaterial({ color: z === -1 ? this.COLORS.B : this.COLORS.INNER, roughness: 0.2 })
          ];

          const mesh = new THREE.Mesh(geom, materials);
          mesh.position.set(x * gap, y * gap, z * gap);
          mesh.userData = { initX: x, initY: y, initZ: z };

          this.cubeGroup.add(mesh);
          this.cubies.push(mesh);
        }
      }
    }
  }

  bindEvents() {
    window.addEventListener('resize', () => this.onResize());

    this.renderer.domElement.addEventListener('pointerdown', (e) => {
      this.pointerDownTime = Date.now();
      this.pointerDownPos = { x: e.clientX, y: e.clientY };
    });

    this.renderer.domElement.addEventListener('pointerup', (e) => {
      // Check if it's a click rather than drag
      const diffX = Math.abs(e.clientX - (this.pointerDownPos ? this.pointerDownPos.x : 0));
      const diffY = Math.abs(e.clientY - (this.pointerDownPos ? this.pointerDownPos.y : 0));
      const timeDiff = Date.now() - (this.pointerDownTime || 0);

      if (diffX < 5 && diffY < 5 && timeDiff < 300) {
        this.onClick(e);
      }
    });
  }

  onResize() {
    if (!this.container || !this.renderer) return;
    const width = this.container.clientWidth;
    const height = this.container.clientHeight;
    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(width, height);
  }

  onClick(e) {
    if (!this.paintMode) return;

    const rect = this.renderer.domElement.getBoundingClientRect();
    this.mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    this.mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

    this.raycaster.setFromCamera(this.mouse, this.camera);
    const intersects = this.raycaster.intersectObjects(this.cubies);

    if (intersects.length > 0) {
      const hit = intersects[0];
      const materialIndex = hit.face.materialIndex;

      // Only allow painting visible outside faces
      const targetColorHex = this.COLORS[this.activeColor];
      if (targetColorHex !== undefined && hit.object.material[materialIndex]) {
        // Center pieces should ideally keep their original color or allow user paint
        hit.object.material[materialIndex].color.setHex(targetColorHex);
        this.readStateFromCubies();
        if (this.options.onStateChange) {
          this.options.onStateChange(this.state);
        }
      }
    }
  }

  // Execute a move like "R", "U'", "F2"
  applyMove(moveNotation, duration = 300) {
    return new Promise((resolve) => {
      if (this.isAnimating) {
        this.animationQueue.push({ move: moveNotation, duration, resolve });
        return;
      }

      this.isAnimating = true;
      const parsed = this.parseMove(moveNotation);
      if (!parsed) {
        this.isAnimating = false;
        resolve();
        return;
      }

      const { axis, slice, angle } = parsed;

      // Find cubies in this slice
      const rotatingCubies = [];
      const threshold = 0.5;

      this.cubies.forEach(cubie => {
        const pos = new THREE.Vector3();
        cubie.getWorldPosition(pos);

        if (axis === 'x' && Math.abs(pos.x - slice) < threshold) rotatingCubies.push(cubie);
        else if (axis === 'y' && Math.abs(pos.y - slice) < threshold) rotatingCubies.push(cubie);
        else if (axis === 'z' && Math.abs(pos.z - slice) < threshold) rotatingCubies.push(cubie);
      });

      // Attach to pivot
      this.pivot.rotation.set(0, 0, 0);
      this.pivot.position.set(0, 0, 0);
      this.pivot.scale.set(1, 1, 1);
      this.pivot.updateMatrixWorld();

      rotatingCubies.forEach(c => {
        this.pivot.attach(c);
      });

      // Animate rotation
      const startTime = performance.now();
      const initialRot = this.pivot.rotation[axis];
      const targetRot = initialRot + angle;

      const animateStep = (now) => {
        const elapsed = now - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const ease = 0.5 - 0.5 * Math.cos(progress * Math.PI); // easeInOutSine

        this.pivot.rotation[axis] = initialRot + angle * ease;

        if (progress < 1) {
          requestAnimationFrame(animateStep);
        } else {
          this.pivot.rotation[axis] = targetRot;
          this.pivot.updateMatrixWorld();

          // Detach back to cubeGroup
          rotatingCubies.forEach(c => {
            this.cubeGroup.attach(c);
            // Snap positions to integer coords
            c.position.x = Math.round(c.position.x);
            c.position.y = Math.round(c.position.y);
            c.position.z = Math.round(c.position.z);
          });

          this.isAnimating = false;
          this.readStateFromCubies();

          if (this.options.onMoveComplete) {
            this.options.onMoveComplete(moveNotation);
          }
          if (this.options.onStateChange) {
            this.options.onStateChange(this.state);
          }

          resolve();

          // Process next in queue
          if (this.animationQueue.length > 0) {
            const next = this.animationQueue.shift();
            this.applyMove(next.move, next.duration).then(next.resolve);
          }
        }
      };

      requestAnimationFrame(animateStep);
    });
  }

  parseMove(m) {
    if (!m) return null;
    m = m.trim().toUpperCase();
    const face = m.charAt(0);
    const isPrime = m.includes("'");
    const isDouble = m.includes("2");

    let angleMultiplier = isPrime ? 1 : -1;
    if (isDouble) angleMultiplier *= 2;
    const baseAngle = (Math.PI / 2) * angleMultiplier;

    switch (face) {
      case 'R': return { axis: 'x', slice: 1, angle: baseAngle };
      case 'L': return { axis: 'x', slice: -1, angle: -baseAngle };
      case 'U': return { axis: 'y', slice: 1, angle: baseAngle };
      case 'D': return { axis: 'y', slice: -1, angle: -baseAngle };
      case 'F': return { axis: 'z', slice: 1, angle: baseAngle };
      case 'B': return { axis: 'z', slice: -1, angle: -baseAngle };
      default: return null;
    }
  }

  // Play a full list of moves sequentially
  async playMoves(movesList, speedMs = 250, onStepCallback = null) {
    for (let i = 0; i < movesList.length; i++) {
      if (this.stopPlaybackRequested) {
        this.stopPlaybackRequested = false;
        break;
      }
      if (onStepCallback) onStepCallback(i, movesList[i]);
      await this.applyMove(movesList[i], speedMs);
      await new Promise(r => setTimeout(r, 60));
    }
  }

  stopPlayback() {
    this.stopPlaybackRequested = true;
  }

  // Reset to initial solved orientation and colors
  reset() {
    this.animationQueue = [];
    this.isAnimating = false;
    this.stopPlaybackRequested = false;

    // Remove all cubies
    while (this.cubeGroup.children.length > 0) {
      this.cubeGroup.remove(this.cubeGroup.children[0]);
    }
    while (this.pivot.children.length > 0) {
      this.pivot.remove(this.pivot.children[0]);
    }

    this.pivot.rotation.set(0, 0, 0);
    this.buildCubies();
    this.state = "UUUUUUUUURRRRRRRRRFFFFFFFFFDDDDDDDDDLLLLLLLLLBBBBBBBBB";

    if (this.options.onStateChange) {
      this.options.onStateChange(this.state);
    }
  }

  // Update facelet colors from 54-char string
  setState(faceletStr) {
    if (!faceletStr || faceletStr.length !== 54) return;
    this.state = faceletStr.toUpperCase();
    this.applyStateToCubies();
    if (this.options.onStateChange) {
      this.options.onStateChange(this.state);
    }
  }

  applyStateToCubies() {
    // Helper to map 54-facelet string to cubies
    // Facelets order: U (0..8), R (9..17), F (18..26), D (27..35), L (36..44), B (45..53)
    // Cubie lookup by current position
    const getCubieAt = (x, y, z) => {
      return this.cubies.find(c =>
        Math.round(c.position.x) === x &&
        Math.round(c.position.y) === y &&
        Math.round(c.position.z) === z
      );
    };

    const setColor = (cubie, materialIdx, colorChar) => {
      if (cubie && cubie.material[materialIdx]) {
        const hex = this.COLORS[colorChar] || this.COLORS.INNER;
        cubie.material[materialIdx].color.setHex(hex);
      }
    };

    // U face (y = 1): z = -1..1, x = -1..1
    // Standard U layout:
    // U1 (0): x=-1, z=-1 | U2 (1): x=0, z=-1 | U3 (2): x=1, z=-1
    // U4 (3): x=-1, z=0  | U5 (4): x=0, z=0  | U6 (5): x=1, z=0
    // U7 (6): x=-1, z=1  | U8 (7): x=0, z=1  | U9 (8): x=1, z=1
    const uCoords = [
      [-1, 1, -1], [0, 1, -1], [1, 1, -1],
      [-1, 1, 0],  [0, 1, 0],  [1, 1, 0],
      [-1, 1, 1],  [0, 1, 1],  [1, 1, 1]
    ];
    uCoords.forEach(([x, y, z], idx) => {
      setColor(getCubieAt(x, y, z), 2, this.state[idx]);
    });

    // R face (x = 1, mat 0): y = 1..-1, z = 1..-1
    // R1..R9 (9..17)
    const rCoords = [
      [1, 1, 1],  [1, 1, 0],  [1, 1, -1],
      [1, 0, 1],  [1, 0, 0],  [1, 0, -1],
      [1, -1, 1], [1, -1, 0], [1, -1, -1]
    ];
    rCoords.forEach(([x, y, z], idx) => {
      setColor(getCubieAt(x, y, z), 0, this.state[9 + idx]);
    });

    // F face (z = 1, mat 4): y = 1..-1, x = -1..1
    // F1..F9 (18..26)
    const fCoords = [
      [-1, 1, 1],  [0, 1, 1],  [1, 1, 1],
      [-1, 0, 1],  [0, 0, 1],  [1, 0, 1],
      [-1, -1, 1], [0, -1, 1], [1, -1, 1]
    ];
    fCoords.forEach(([x, y, z], idx) => {
      setColor(getCubieAt(x, y, z), 4, this.state[18 + idx]);
    });

    // D face (y = -1, mat 3): z = 1..-1, x = -1..1
    // D1..D9 (27..35)
    const dCoords = [
      [-1, -1, 1],  [0, -1, 1],  [1, -1, 1],
      [-1, -1, 0],  [0, -1, 0],  [1, -1, 0],
      [-1, -1, -1], [0, -1, -1], [1, -1, -1]
    ];
    dCoords.forEach(([x, y, z], idx) => {
      setColor(getCubieAt(x, y, z), 3, this.state[27 + idx]);
    });

    // L face (x = -1, mat 1): y = 1..-1, z = -1..1
    // L1..L9 (36..44)
    const lCoords = [
      [-1, 1, -1],  [-1, 1, 0],  [-1, 1, 1],
      [-1, 0, -1],  [-1, 0, 0],  [-1, 0, 1],
      [-1, -1, -1], [-1, -1, 0], [-1, -1, 1]
    ];
    lCoords.forEach(([x, y, z], idx) => {
      setColor(getCubieAt(x, y, z), 1, this.state[36 + idx]);
    });

    // B face (z = -1, mat 5): y = 1..-1, x = 1..-1
    // B1..B9 (45..53)
    const bCoords = [
      [1, 1, -1],  [0, 1, -1],  [-1, 1, -1],
      [1, 0, -1],  [0, 0, -1],  [-1, 0, -1],
      [1, -1, -1], [0, -1, -1], [-1, -1, -1]
    ];
    bCoords.forEach(([x, y, z], idx) => {
      setColor(getCubieAt(x, y, z), 5, this.state[45 + idx]);
    });
  }

  // Read current colors from cubies into 54-char state
  readStateFromCubies() {
    const getColorChar = (hex) => {
      for (const [k, v] of Object.entries(this.COLORS)) {
        if (v === hex) return k;
      }
      return 'U';
    };

    const getCubieAt = (x, y, z) => {
      return this.cubies.find(c =>
        Math.round(c.position.x) === x &&
        Math.round(c.position.y) === y &&
        Math.round(c.position.z) === z
      );
    };

    const chars = new Array(54);

    // U
    const uCoords = [
      [-1, 1, -1], [0, 1, -1], [1, 1, -1],
      [-1, 1, 0],  [0, 1, 0],  [1, 1, 0],
      [-1, 1, 1],  [0, 1, 1],  [1, 1, 1]
    ];
    uCoords.forEach(([x, y, z], idx) => {
      const c = getCubieAt(x, y, z);
      chars[idx] = c ? getColorChar(c.material[2].color.getHex()) : 'U';
    });

    // R
    const rCoords = [
      [1, 1, 1],  [1, 1, 0],  [1, 1, -1],
      [1, 0, 1],  [1, 0, 0],  [1, 0, -1],
      [1, -1, 1], [1, -1, 0], [1, -1, -1]
    ];
    rCoords.forEach(([x, y, z], idx) => {
      const c = getCubieAt(x, y, z);
      chars[9 + idx] = c ? getColorChar(c.material[0].color.getHex()) : 'R';
    });

    // F
    const fCoords = [
      [-1, 1, 1],  [0, 1, 1],  [1, 1, 1],
      [-1, 0, 1],  [0, 0, 1],  [1, 0, 1],
      [-1, -1, 1], [0, -1, 1], [1, -1, 1]
    ];
    fCoords.forEach(([x, y, z], idx) => {
      const c = getCubieAt(x, y, z);
      chars[18 + idx] = c ? getColorChar(c.material[4].color.getHex()) : 'F';
    });

    // D
    const dCoords = [
      [-1, -1, 1],  [0, -1, 1],  [1, -1, 1],
      [-1, -1, 0],  [0, -1, 0],  [1, -1, 0],
      [-1, -1, -1], [0, -1, -1], [1, -1, -1]
    ];
    dCoords.forEach(([x, y, z], idx) => {
      const c = getCubieAt(x, y, z);
      chars[27 + idx] = c ? getColorChar(c.material[3].color.getHex()) : 'D';
    });

    // L
    const lCoords = [
      [-1, 1, -1],  [-1, 1, 0],  [-1, 1, 1],
      [-1, 0, -1],  [-1, 0, 0],  [-1, 0, 1],
      [-1, -1, -1], [-1, -1, 0], [-1, -1, 1]
    ];
    lCoords.forEach(([x, y, z], idx) => {
      const c = getCubieAt(x, y, z);
      chars[36 + idx] = c ? getColorChar(c.material[1].color.getHex()) : 'L';
    });

    // B
    const bCoords = [
      [1, 1, -1],  [0, 1, -1],  [-1, 1, -1],
      [1, 0, -1],  [0, 0, -1],  [-1, 0, -1],
      [1, -1, -1], [0, -1, -1], [-1, -1, -1]
    ];
    bCoords.forEach(([x, y, z], idx) => {
      const c = getCubieAt(x, y, z);
      chars[45 + idx] = c ? getColorChar(c.material[5].color.getHex()) : 'B';
    });

    this.state = chars.join('');
  }

  animate() {
    requestAnimationFrame(() => this.animate());
    if (this.controls) this.controls.update();
    this.renderer.render(this.scene, this.camera);
  }
}
