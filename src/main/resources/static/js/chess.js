// ============================================================================
// Polymath VSN - Glass Chess Engine & Master Strategy Explorer
// Transparent / Glassmorphic UI with Master Openings, Tactics & Endgames
// ============================================================================

const CHESS_MODULE = (() => {
  // Master Strategy Library
  const STRATEGIES = {
    // ----------------------------------------------------
    // Master Openings
    // ----------------------------------------------------
    "sicilian-najdorf": {
      category: "Master Openings",
      name: "Sicilian Defense: Najdorf Variation",
      eco: "B90",
      description: "One of the most revered and sharp counter-attacking openings in grandmaster chess, popularized by Bobby Fischer and Garry Kasparov. Black immediately creates asymmetric counterplay on the half-open c-file.",
      moves: [
        { notation: "1. e4", from: "e2", to: "e4", piece: "wP", comment: "White stakes a claim in the center and opens diagonals for the queen and light-squared bishop." },
        { notation: "1... c5", from: "c7", to: "c5", piece: "bP", comment: "The Sicilian Defense. Black challenges the d4 push asymmetrically rather than mirroring with 1... e5." },
        { notation: "2. Nf3", from: "g1", to: "f3", piece: "wN", comment: "White develops the king's knight, preparing the central break d2-d4 while keeping control of e5 and d4." },
        { notation: "2... d6", from: "d7", to: "d6", piece: "bP", comment: "Guards c5 and prevents White from advancing e4-e5 while freeing the c8 bishop's diagonal." },
        { notation: "3. d4", from: "d2", to: "d4", piece: "wP", comment: "The Open Sicilian. White strikes in the center to accelerate piece development." },
        { notation: "3... cxd4", from: "c5", to: "d4", piece: "bP", comment: "Black trades a flank pawn for White's central d-pawn, creating long-term central pawn superiority." },
        { notation: "4. Nxd4", from: "f3", to: "d4", piece: "wN", comment: "White recaptures with the knight, establishing an active centralized outpost." },
        { notation: "4... Nf6", from: "g8", to: "f6", piece: "bN", comment: "Black develops the knight to its natural outpost, attacking White's undefended e4 pawn." },
        { notation: "5. Nc3", from: "b1", to: "c3", piece: "wN", comment: "White defends e4 naturally with the queen's knight while eyeing central outposts." },
        { notation: "5... a6", from: "a7", to: "a6", piece: "bP", comment: "The defining move of the Najdorf. Prevents White's pieces from landing on b5 (Nb5 or Bb5+) and prepares b7-b5 queenside expansion." }
      ]
    },
    "queens-gambit": {
      category: "Master Openings",
      name: "Queen's Gambit Declined: Orthodox Defense",
      eco: "D30",
      description: "The benchmark of classical positional mastery. Black solidly fortifies d5 with e6 rather than accepting the wing pawn sacrifice.",
      moves: [
        { notation: "1. d4", from: "d2", to: "d4", piece: "wP", comment: "White places a pawn in the center, immediately protected by the queen." },
        { notation: "1... d5", from: "d7", to: "d5", piece: "bP", comment: "Black matches White's central stake with equal control of e4 and c4." },
        { notation: "2. c4", from: "c2", to: "c4", piece: "wP", comment: "The Queen's Gambit. White offers a flank c-pawn to undermine Black's grip on the center." },
        { notation: "2... e6", from: "e7", to: "e6", piece: "bP", comment: "The Declined (QGD). Black maintains a firm d5 stronghold, cementing central stability." },
        { notation: "3. Nc3", from: "b1", to: "c3", piece: "wN", comment: "White pressures d5 and controls e4, preparing future central occupation." },
        { notation: "3... Nf6", from: "g8", to: "f6", piece: "bN", comment: "Black reinforces d5 and prepares rapid kingside castling." },
        { notation: "4. Bg5", from: "c1", to: "g5", piece: "wB", comment: "White pins Black's knight to the queen, renewing acute tactical pressure on d5." },
        { notation: "4... Be7", from: "f8", to: "e7", piece: "bB", comment: "Black unpins the knight, preparing to castle kingside safely." },
        { notation: "5. e3", from: "e2", to: "e3", piece: "wP", comment: "White solidifies the c4 pawn and opens path for the light-squared bishop." },
        { notation: "5... O-O", from: "e8", to: "g8", piece: "bK", comment: "Black castles kingside into safety, completing basic king shelter." }
      ]
    },
    "ruy-lopez": {
      category: "Master Openings",
      name: "Ruy Lopez: Spanish Opening",
      eco: "C65",
      description: "One of the oldest and most strategically profound openings in chess history. White targets the knight defending e5 to exert indirect central pressure.",
      moves: [
        { notation: "1. e4", from: "e2", to: "e4", piece: "wP", comment: "White opens with the classical king's pawn." },
        { notation: "1... e5", from: "e7", to: "e5", piece: "bP", comment: "Black counters symmetrically in the center." },
        { notation: "2. Nf3", from: "g1", to: "f3", piece: "wN", comment: "Developing with tempo by directly attacking e5." },
        { notation: "2... Nc6", from: "b8", to: "c6", piece: "bN", comment: "Black defends the e5 pawn naturally with development." },
        { notation: "3. Bb5", from: "f1", to: "b5", piece: "wB", comment: "The Spanish Bishop pin. Directly threatens the defender of the e5 pawn." },
        { notation: "3... a6", from: "a7", to: "a6", piece: "bP", comment: "Morphy's Defense: Black questions the bishop's intentions immediately." },
        { notation: "4. Ba4", from: "b5", to: "a4", piece: "wB", comment: "White retreats while keeping the diagonal pin active." },
        { notation: "4... Nf6", from: "g8", to: "f6", piece: "bN", comment: "Developing the knight and targeting White's e4 pawn." },
        { notation: "5. O-O", from: "e1", to: "g1", piece: "wK", comment: "White castles kingside, prioritizing safety before resolving the center." },
        { notation: "5... Be7", from: "f8", to: "e7", piece: "bB", comment: "Preparing kingside castling and guarding key dark squares." }
      ]
    },
    "kings-indian": {
      category: "Master Openings",
      name: "King's Indian Defense: Classical",
      eco: "E97",
      description: "A hypermodern fighting weapon. Black concedes the center early to build an indestructible pawn chain and launch a devastating kingside pawn storm.",
      moves: [
        { notation: "1. d4", from: "d2", to: "d4", piece: "wP", comment: "White opens with d4." },
        { notation: "1... Nf6", from: "g8", to: "f6", piece: "bN", comment: "Flexible Indian development preventing e4." },
        { notation: "2. c4", from: "c2", to: "c4", piece: "wP", comment: "White expands spatial domain on the queenside." },
        { notation: "2... g6", from: "g7", to: "g6", piece: "bP", comment: "Black prepares the dark-squared kingside fianchetto." },
        { notation: "3. Nc3", from: "b1", to: "c3", piece: "wN", comment: "White prepares e2-e4 dominance." },
        { notation: "3... Bg7", from: "f8", to: "g7", piece: "bB", comment: "The dragon bishop sits on the long h8-a1 diagonal." },
        { notation: "4. e4", from: "e2", to: "e4", piece: "wP", comment: "White builds a massive classical pawn center." },
        { notation: "4... d6", from: "d7", to: "d6", piece: "bP", comment: "Prevents e4-e5 while preparing ...e7-e5." },
        { notation: "5. Nf3", from: "g1", to: "f3", piece: "wN", comment: "White develops harmoniously towards kingside castling." },
        { notation: "5... O-O", from: "e8", to: "g8", piece: "bK", comment: "Black castles kingside into safety." },
        { notation: "6. Be2", from: "f1", to: "e2", piece: "wB", comment: "Classical setup: White solidifies the center." },
        { notation: "6... e5", from: "e7", to: "e5", piece: "bP", comment: "Black strikes at the heart of White's center." }
      ]
    },

    // ----------------------------------------------------
    // Master Tactical Motifs
    // ----------------------------------------------------
    "greek-gift": {
      category: "Master Tactical Motifs",
      name: "The Greek Gift Sacrifice (Bxh7+)",
      eco: "Tactics",
      description: "The quintessential classical kingside bishop sacrifice tearing open Black's castled king shelter, leading to decisive checkmate threats.",
      moves: [
        { notation: "1. e4", from: "e2", to: "e4", piece: "wP", comment: "Standard open center setup." },
        { notation: "1... e6", from: "e7", to: "e6", piece: "bP", comment: "French Defense formation." },
        { notation: "2. d4", from: "d2", to: "d4", piece: "wP", comment: "White occupies full center." },
        { notation: "2... d5", from: "d7", to: "d5", piece: "bP", comment: "Black contests center." },
        { notation: "3. e5", from: "e4", to: "e5", piece: "wP", comment: "Advance variation, creating space on the kingside." },
        { notation: "3... c5", from: "c7", to: "c5", piece: "bP", comment: "Attacking White's d4 pawn base." },
        { notation: "4. c3", from: "c2", to: "c3", piece: "wP", comment: "White shores up the pawn chain." },
        { notation: "4... Nc6", from: "b8", to: "c6", piece: "bN", comment: "Black increases pressure on d4." },
        { notation: "5. Nf3", from: "g1", to: "f3", piece: "wN", comment: "White supports d4." },
        { notation: "5... Qb6", from: "d8", to: "b6", piece: "bQ", comment: "Triple attack on d4 and b2." },
        { notation: "6. Bd3", from: "f1", to: "d3", piece: "wB", comment: "Setting the crosshairs directly on the h7 square." },
        { notation: "6... Bd7", from: "c8", to: "d7", piece: "bB", comment: "Developing queenside bishop." },
        { notation: "7. O-O", from: "e1", to: "g1", piece: "wK", comment: "White castles kingside." },
        { notation: "7... cxd4", from: "c5", to: "d4", piece: "bP", comment: "Pawn trade in center." },
        { notation: "8. cxd4", from: "c3", to: "d4", piece: "wP", comment: "White recaptures." },
        { notation: "8... Be7", from: "f8", to: "e7", piece: "bB", comment: "Black prepares to castle." },
        { notation: "9. Nc3", from: "b1", to: "c3", piece: "wN", comment: "White finishes development." },
        { notation: "9... O-O", from: "e8", to: "g8", piece: "bK", comment: "Black walks directly into the tactical gun sights on h7." },
        { notation: "10. Bxh7+!", from: "d3", to: "h7", piece: "wB", comment: "THE GREEK GIFT SACRIFICE! White shreds the h-pawn cover. If 10... Kxh7, 11. Ng5+ Kg8 12. Qh5 wins on the spot." }
      ]
    },
    "absolute-pin": {
      category: "Master Tactical Motifs",
      name: "Absolute Pin & Skewer Overload",
      eco: "Tactics",
      description: "Exploiting aligned high-value pieces on ranks, files, and diagonals to paralyze enemy defensive coordination.",
      moves: [
        { notation: "1. e4", from: "e2", to: "e4", piece: "wP", comment: "King's pawn advance." },
        { notation: "1... e5", from: "e7", to: "e5", piece: "bP", comment: "Open game." },
        { notation: "2. Nf3", from: "g1", to: "f3", piece: "wN", comment: "Knight develops towards center." },
        { notation: "2... Nc6", from: "b8", to: "c6", piece: "bN", comment: "Knight guards e5." },
        { notation: "3. Bc4", from: "f1", to: "c4", piece: "wB", comment: "Italian bishop aimed at f7." },
        { notation: "3... Nf6", from: "g8", to: "f6", piece: "bN", comment: "Two Knights Defense." },
        { notation: "4. d3", from: "d2", to: "d3", piece: "wP", comment: "Solidifying center." },
        { notation: "4... d6", from: "d7", to: "d6", piece: "bP", comment: "Symmetric support." },
        { notation: "5. Bg5", from: "c1", to: "g5", piece: "wB", comment: "THE ABSOLUTE PIN. Black's f6 knight is pinned against the queen at d8, restricting its mobility." }
      ]
    },

    // ----------------------------------------------------
    // Endgame Masteries
    // ----------------------------------------------------
    "lucena-bridge": {
      category: "Endgame Masteries",
      name: "Lucena Position: Building the Bridge",
      eco: "Endgame",
      description: "The fundamental winning method in Rook and Pawn versus Rook endgames. White builds a 4th-rank rook bridge to shield the king from vertical checks.",
      moves: [
        { notation: "1. Re1+", from: "a1", to: "e1", piece: "wR", comment: "Step 1: Check the enemy king to drive it away from the promoting file." },
        { notation: "1... Kd7", from: "e8", to: "d7", piece: "bK", comment: "Black king is driven to the d-file." },
        { notation: "2. Re4!", from: "e1", to: "e4", piece: "wR", comment: "THE KEY MOVE! White lifts the rook to the 4th rank to build the bridge." },
        { notation: "2... Rd2", from: "f2", to: "d2", piece: "bR", comment: "Black maintains waiting checks." },
        { notation: "3. Kf7", from: "e7", to: "f7", piece: "wK", comment: "White king emerges from the shelter of the e8 pawn." },
        { notation: "3... Rf2+", from: "d2", to: "f2", piece: "bR", comment: "Black delivers a vertical checking harassment." },
        { notation: "4. Kg6", from: "f7", to: "g6", piece: "wK", comment: "King marches down towards the 4th rank." },
        { notation: "4... Rg2+", from: "f2", to: "g2", piece: "bR", comment: "Second checking check." },
        { notation: "5. Kf6", from: "g6", to: "f6", piece: "wK", comment: "King coordinates closer to rook." },
        { notation: "5... Rf2+", from: "g2", to: "f2", piece: "bR", comment: "Third check." },
        { notation: "6. Kg5", from: "f6", to: "g5", piece: "wK", comment: "King moves down." },
        { notation: "6... Rg2+", from: "f2", to: "g2", piece: "bR", comment: "Fourth check." },
        { notation: "7. Rg4!", from: "e4", to: "g4", piece: "wR", comment: "THE BRIDGE IS COMPLETE! The rook blocks the check. After Rook trade or retreat, pawn promotes to Queen with winning advantage." }
      ]
    },
    "philidor-defense": {
      category: "Endgame Masteries",
      name: "Philidor Defense: Third Rank Drawing Technique",
      eco: "Endgame",
      description: "The ultimate drawing technique in Rook and Pawn endgames. Black keeps the rook on the 6th rank (or 3rd rank for White) to prevent king advance, then drops to the 1st rank for infinite rear checks.",
      moves: [
        { notation: "1... Ra6!", from: "a8", to: "a6", piece: "bR", comment: "The Philidor maneuver: Cuts off the White king along the 6th rank." },
        { notation: "2. e6", from: "e5", to: "e6", piece: "wP", comment: "White has no king advance, so is forced to push the pawn." },
        { notation: "3... Ra1!", from: "a6", to: "a1", piece: "bR", comment: "THE SWITCH! As soon as the pawn advances, the White king has no front shelter. Black drops the rook to the 1st rank to deliver endless checks from behind." }
      ]
    }
  };

  // State Management
  let currentKey = "sicilian-najdorf";
  let currentMoveIndex = -1; // -1 = start position
  let isPlaying = false;
  let playInterval = null;
  let selectedSquare = null;
  let currentBoard = {}; // map of 'a1' -> 'wR', etc.

  // Initial standard chess board setup
  function getInitialBoard() {
    return {
      a1: "wR", b1: "wN", c1: "wB", d1: "wQ", e1: "wK", f1: "wB", g1: "wN", h1: "wR",
      a2: "wP", b2: "wP", c2: "wP", d2: "wP", e2: "wP", f2: "wP", g2: "wP", h2: "wP",
      a7: "bP", b7: "bP", c7: "bP", d7: "bP", e7: "bP", f7: "bP", g7: "bP", h7: "bP",
      a8: "bR", b8: "bN", c8: "bB", d8: "bQ", e8: "bK", f8: "bB", g8: "bN", h8: "bR"
    };
  }

  // Unicode Vector Glyphs for Frosted Glass Rendering (Fallback)
  const PIECE_GLYPHS = {
    wK: "♔", wQ: "♕", wR: "♖", wB: "♗", wN: "♘", wP: "♙",
    bK: "♚", bQ: "♛", bR: "♜", bB: "♝", bN: "♞", bP: "♟"
  };

  // High-Contrast Staunton SVG Vector Piece Generators
  // White Pieces: Solid frosted crystal white (fill: #FFFFFF) with crisp espresso contour (stroke: #2C221E)
  // Black Pieces: Deep obsidian / dark espresso (fill: #1C1512) with high-contrast warm bronze/taupe outline (stroke: #EAE3D9)
  function getPawnSvg(isWhite) {
    const fill = isWhite ? "#FFFFFF" : "#1C1512";
    const stroke = isWhite ? "#2C221E" : "#EAE3D9";
    const strokeWidth = isWhite ? "1.5" : "1.8";
    return `<svg viewBox="0 0 45 45" class="chess-piece-svg" style="width:100%;height:100%;display:block;overflow:visible;"><path d="M 22.5,9 C 20.3,9 18.5,10.8 18.5,13 C 18.5,13.9 18.8,14.7 19.3,15.4 C 17.3,16.5 16,18.6 16,21 C 16,23 16.9,24.8 18.4,26 C 15.4,27.1 11,31.6 11,39.5 L 34,39.5 C 34,31.6 29.6,27.1 26.6,26 C 28.1,24.8 29,23 29,21 C 29,18.6 27.7,16.5 25.7,15.4 C 26.2,14.7 26.5,13.9 26.5,13 C 26.5,10.8 24.7,9 22.5,9 Z" fill="${fill}" stroke="${stroke}" stroke-width="${strokeWidth}" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
  }

  function getRookSvg(isWhite) {
    const fill = isWhite ? "#FFFFFF" : "#1C1512";
    const stroke = isWhite ? "#2C221E" : "#EAE3D9";
    const strokeWidth = isWhite ? "1.5" : "1.8";
    const accent = isWhite ? "#2C221E" : "#D8CFBF";
    return `<svg viewBox="0 0 45 45" class="chess-piece-svg" style="width:100%;height:100%;display:block;overflow:visible;"><g fill="${fill}" stroke="${stroke}" stroke-width="${strokeWidth}" stroke-linecap="round" stroke-linejoin="round"><path d="M 9,39 L 36,39 L 36,36 L 9,36 Z"/><path d="M 12,36 L 12,32 L 33,32 L 33,36 Z"/><path d="M 12,32 C 13,25 14,21 14,17 L 31,17 C 31,21 32,25 33,32 Z"/><path d="M 14,17 L 31,17 L 34,14 L 11,14 Z"/><path d="M 11,14 L 11,9 L 15,9 L 15,11.5 L 20,11.5 L 20,9 L 25,9 L 25,11.5 L 30,11.5 L 30,9 L 34,9 L 34,14 Z"/><path d="M 14,14 L 31,14" fill="none" stroke="${accent}" stroke-width="${strokeWidth}"/><path d="M 13,32 L 32,32" fill="none" stroke="${accent}" stroke-width="${strokeWidth}"/></g></svg>`;
  }

  function getKnightSvg(isWhite) {
    const fill = isWhite ? "#FFFFFF" : "#1C1512";
    const stroke = isWhite ? "#2C221E" : "#EAE3D9";
    const strokeWidth = isWhite ? "1.5" : "1.8";
    const accent = isWhite ? "#2C221E" : "#D8CFBF";
    const eye = isWhite ? "#2C221E" : "#EAE3D9";
    return `<svg viewBox="0 0 45 45" class="chess-piece-svg" style="width:100%;height:100%;display:block;overflow:visible;"><g fill="${fill}" stroke="${stroke}" stroke-width="${strokeWidth}" stroke-linecap="round" stroke-linejoin="round"><path d="M 22,10 C 32.5,11 38.5,18 38,39 L 11,39 C 11,30 13,26 13,26 C 13,26 14.5,23 13,20.5 C 11.5,18 9,18 9,18 C 9,18 11.5,15 15.5,15 C 19.5,15 19.5,12 19.5,12 L 22,10 Z"/><circle cx="15.5" cy="20.5" r="1.5" fill="${eye}" stroke="none"/><path d="M 24.5,18 C 24.5,18 21,17 19,26" fill="none" stroke="${accent}" stroke-width="${strokeWidth}"/><path d="M 9.5,25.5 A 0.5,0.5 0 1,1 8.5,25.5 A 0.5,0.5 0 1,1 9.5,25.5" fill="${eye}" stroke="none"/><path d="M 24.5,10.5 C 24,12 24,14.5 26.5,15.5 C 29,16.5 29,18.5 28.5,20.5" fill="none" stroke="${accent}" stroke-width="${strokeWidth}"/></g></svg>`;
  }

  function getBishopSvg(isWhite) {
    const fill = isWhite ? "#FFFFFF" : "#1C1512";
    const stroke = isWhite ? "#2C221E" : "#EAE3D9";
    const strokeWidth = isWhite ? "1.5" : "1.8";
    const accent = isWhite ? "#2C221E" : "#D8CFBF";
    return `<svg viewBox="0 0 45 45" class="chess-piece-svg" style="width:100%;height:100%;display:block;overflow:visible;"><g fill="${fill}" stroke="${stroke}" stroke-width="${strokeWidth}" stroke-linecap="round" stroke-linejoin="round"><path d="M 9,39 L 36,39 L 36,36 L 9,36 Z"/><path d="M 12,36 C 13.5,31 14.5,27 15,24 L 30,24 C 30.5,27 31.5,31 33,36 Z"/><path d="M 15,24 C 13,21 13.5,15 17,12 C 19,10.2 21,9.5 22.5,9.5 C 24,9.5 26,10.2 28,12 C 31.5,15 32,21 30,24 Z"/><circle cx="22.5" cy="7.5" r="1.8" fill="${fill}" stroke="${stroke}" stroke-width="${strokeWidth}"/><path d="M 17.5,16.5 L 27.5,26.5" fill="none" stroke="${accent}" stroke-width="${strokeWidth}"/><path d="M 22.5,5.5 L 22.5,9.5 M 20.5,7.5 L 24.5,7.5" fill="none" stroke="${accent}" stroke-width="1.3"/></g></svg>`;
  }

  function getQueenSvg(isWhite) {
    const fill = isWhite ? "#FFFFFF" : "#1C1512";
    const stroke = isWhite ? "#2C221E" : "#EAE3D9";
    const strokeWidth = isWhite ? "1.5" : "1.8";
    const accent = isWhite ? "#2C221E" : "#D8CFBF";
    return `<svg viewBox="0 0 45 45" class="chess-piece-svg" style="width:100%;height:100%;display:block;overflow:visible;"><g fill="${fill}" stroke="${stroke}" stroke-width="${strokeWidth}" stroke-linecap="round" stroke-linejoin="round"><path d="M 9,39 L 36,39 L 36,36 L 9,36 Z"/><path d="M 11.5,36 C 12.5,32 13.5,28 13.5,26 L 31.5,26 C 31.5,28 32.5,32 33.5,36 Z"/><path d="M 9,26 L 9,14 L 14,22 L 22.5,12 L 31,22 L 36,14 L 36,26 Z"/><circle cx="9" cy="13" r="2" fill="${fill}" stroke="${stroke}" stroke-width="${strokeWidth}"/><circle cx="14" cy="21" r="1.5" fill="${fill}" stroke="${stroke}" stroke-width="${strokeWidth}"/><circle cx="22.5" cy="11" r="2" fill="${fill}" stroke="${stroke}" stroke-width="${strokeWidth}"/><circle cx="31" cy="21" r="1.5" fill="${fill}" stroke="${stroke}" stroke-width="${strokeWidth}"/><circle cx="36" cy="13" r="2" fill="${fill}" stroke="${stroke}" stroke-width="${strokeWidth}"/><path d="M 11.5,30 C 15,29 30,29 33.5,30" fill="none" stroke="${accent}" stroke-width="${strokeWidth}"/></g></svg>`;
  }

  function getKingSvg(isWhite) {
    const fill = isWhite ? "#FFFFFF" : "#1C1512";
    const stroke = isWhite ? "#2C221E" : "#EAE3D9";
    const strokeWidth = isWhite ? "1.5" : "1.8";
    const accent = isWhite ? "#2C221E" : "#D8CFBF";
    return `<svg viewBox="0 0 45 45" class="chess-piece-svg" style="width:100%;height:100%;display:block;overflow:visible;"><g fill="${fill}" stroke="${stroke}" stroke-width="${strokeWidth}" stroke-linecap="round" stroke-linejoin="round"><path d="M 9,39 L 36,39 L 36,36 L 9,36 Z"/><path d="M 11.5,36 C 13,31 14,27 14,24 L 31,24 C 31,27 32,31 33.5,36 Z"/><path d="M 22.5,14 C 16,14 13.5,18 13.5,22 C 13.5,25 16.5,27 22.5,27 C 28.5,27 31.5,25 31.5,22 C 31.5,18 29,14 22.5,14 Z"/><path d="M 22.5,5 L 22.5,14 M 18.5,9.5 L 26.5,9.5" fill="none" stroke="${accent}" stroke-width="2.2"/><path d="M 11.5,30 C 15,28.5 30,28.5 33.5,30" fill="none" stroke="${accent}" stroke-width="${strokeWidth}"/></g></svg>`;
  }

  function getPieceSvg(pieceCode) {
    if (!pieceCode || pieceCode.length < 2) return "";
    const isWhite = pieceCode.charAt(0) === "w";
    const type = pieceCode.charAt(1);
    switch (type) {
      case "P": return getPawnSvg(isWhite);
      case "R": return getRookSvg(isWhite);
      case "N": return getKnightSvg(isWhite);
      case "B": return getBishopSvg(isWhite);
      case "Q": return getQueenSvg(isWhite);
      case "K": return getKingSvg(isWhite);
      default: return "";
    }
  }

  function init() {
    buildStrategySelector();
    loadStrategy(currentKey);
    bindControls();
  }

  function buildStrategySelector() {
    const select = document.getElementById("chess-strategy-select");
    if (!select) return;

    select.innerHTML = "";
    const categories = {};
    for (const [key, strat] of Object.entries(STRATEGIES)) {
      if (!categories[strat.category]) categories[strat.category] = [];
      categories[strat.category].push({ key, name: strat.name, eco: strat.eco });
    }

    for (const [catName, items] of Object.entries(categories)) {
      const optGroup = document.createElement("optgroup");
      optGroup.label = catName;
      items.forEach(item => {
        const opt = document.createElement("option");
        opt.value = item.key;
        opt.textContent = `${item.name} (${item.eco})`;
        if (item.key === currentKey) opt.selected = true;
        optGroup.appendChild(opt);
      });
      select.appendChild(optGroup);
    }

    select.addEventListener("change", (e) => {
      pause();
      loadStrategy(e.target.value);
    });
  }

  function loadStrategy(key) {
    if (!STRATEGIES[key]) return;
    currentKey = key;
    currentMoveIndex = -1;
    currentBoard = getInitialBoard();
    selectedSquare = null;

    const strat = STRATEGIES[key];
    const titleEl = document.getElementById("chess-module-title");
    const descEl = document.getElementById("chess-module-desc");
    const ecoEl = document.getElementById("chess-eco-badge");
    const catEl = document.getElementById("chess-category-badge");

    if (titleEl) titleEl.textContent = strat.name;
    if (descEl) descEl.textContent = strat.description;
    if (ecoEl) ecoEl.textContent = strat.eco;
    if (catEl) catEl.textContent = strat.category;

    renderBoard();
    renderMoveList();
    updateCommentary();
  }

  function renderBoard() {
    const boardEl = document.getElementById("glass-chess-board");
    if (!boardEl) return;

    boardEl.innerHTML = "";
    const files = ["a", "b", "c", "d", "e", "f", "g", "h"];
    const ranks = ["8", "7", "6", "5", "4", "3", "2", "1"];

    const currentMove = (currentMoveIndex >= 0 && currentMoveIndex < STRATEGIES[currentKey].moves.length)
      ? STRATEGIES[currentKey].moves[currentMoveIndex]
      : null;

    ranks.forEach((rank, rIdx) => {
      files.forEach((file, fIdx) => {
        const sq = `${file}${rank}`;
        const isLight = (rIdx + fIdx) % 2 === 0;

        const squareDiv = document.createElement("div");
        squareDiv.className = `glass-chess-square ${isLight ? "light-square" : "dark-square"}`;
        squareDiv.dataset.square = sq;

        // Move highlights
        if (currentMove) {
          if (currentMove.from === sq) squareDiv.classList.add("prev-from-highlight");
          if (currentMove.to === sq) squareDiv.classList.add("prev-to-highlight");
        }
        if (selectedSquare === sq) {
          squareDiv.classList.add("selected-square-highlight");
        }

        // Rank / File Coordinates labels
        if (fIdx === 0) {
          const rankLabel = document.createElement("span");
          rankLabel.className = "square-rank-label";
          rankLabel.textContent = rank;
          squareDiv.appendChild(rankLabel);
        }
        if (rIdx === 7) {
          const fileLabel = document.createElement("span");
          fileLabel.className = "square-file-label";
          fileLabel.textContent = file;
          squareDiv.appendChild(fileLabel);
        }

        // Piece (Solid frosted crystal white or deep obsidian with high-contrast warm bronze/taupe outline)
        const pieceCode = currentBoard[sq];
        if (pieceCode) {
          const isWhite = pieceCode.startsWith("w");
          const pieceDiv = document.createElement("div");
          pieceDiv.className = `glass-piece ${isWhite ? "piece-white" : "piece-black"}`;
          pieceDiv.innerHTML = getPieceSvg(pieceCode) || `<span class="piece-fallback">${PIECE_GLYPHS[pieceCode] || ""}</span>`;
          squareDiv.appendChild(pieceDiv);
        }

        // Click handler for interactive piece touch
        squareDiv.addEventListener("click", () => handleSquareClick(sq));

        boardEl.appendChild(squareDiv);
      });
    });
  }

  function handleSquareClick(sq) {
    if (!selectedSquare) {
      if (currentBoard[sq]) {
        selectedSquare = sq;
        renderBoard();
      }
    } else {
      if (selectedSquare === sq) {
        selectedSquare = null;
        renderBoard();
      } else {
        // Free move on board
        const movingPiece = currentBoard[selectedSquare];
        delete currentBoard[selectedSquare];
        currentBoard[sq] = movingPiece;
        selectedSquare = null;
        renderBoard();
      }
    }
  }

  function renderMoveList() {
    const listEl = document.getElementById("chess-moves-list");
    if (!listEl) return;

    listEl.innerHTML = "";
    const moves = STRATEGIES[currentKey].moves;

    moves.forEach((m, idx) => {
      const item = document.createElement("button");
      item.type = "button";
      item.className = `chess-move-pill ${idx === currentMoveIndex ? "active" : ""}`;
      item.textContent = m.notation;
      item.addEventListener("click", () => {
        pause();
        jumpToMove(idx);
      });
      listEl.appendChild(item);
    });

    // Update progress bar
    const progressEl = document.getElementById("chess-move-progress");
    if (progressEl) {
      const pct = moves.length > 0 ? ((currentMoveIndex + 1) / moves.length) * 100 : 0;
      progressEl.style.width = `${pct}%`;
    }
  }

  function updateCommentary() {
    const commentEl = document.getElementById("chess-commentary-text");
    const notationEl = document.getElementById("chess-current-notation");
    const countEl = document.getElementById("chess-move-counter");

    const moves = STRATEGIES[currentKey].moves;
    if (countEl) countEl.textContent = `Move ${Math.max(0, currentMoveIndex + 1)} of ${moves.length}`;

    if (currentMoveIndex < 0) {
      if (notationEl) notationEl.textContent = "Initial Board Position";
      if (commentEl) commentEl.textContent = "Select a move or click 'Next Move' or 'Play' to observe the grandmaster sequence unfolding.";
    } else if (currentMoveIndex < moves.length) {
      const cur = moves[currentMoveIndex];
      if (notationEl) notationEl.textContent = cur.notation;
      if (commentEl) commentEl.textContent = cur.comment;
    }
  }

  function rebuildBoardUpTo(index) {
    const board = getInitialBoard();
    const moves = STRATEGIES[currentKey].moves;
    for (let i = 0; i <= index && i < moves.length; i++) {
      const m = moves[i];
      const piece = board[m.from];
      delete board[m.from];
      board[m.to] = piece;

      // Handle castling rook movements
      if (piece === "wK" && m.from === "e1" && m.to === "g1") {
        delete board["h1"]; board["f1"] = "wR";
      } else if (piece === "wK" && m.from === "e1" && m.to === "c1") {
        delete board["a1"]; board["d1"] = "wR";
      } else if (piece === "bK" && m.from === "e8" && m.to === "g8") {
        delete board["h8"]; board["f8"] = "bR";
      } else if (piece === "bK" && m.from === "e8" && m.to === "c8") {
        delete board["a8"]; board["d8"] = "bR";
      }
    }
    return board;
  }

  function jumpToMove(idx) {
    const moves = STRATEGIES[currentKey].moves;
    if (idx < -1) idx = -1;
    if (idx >= moves.length) idx = moves.length - 1;

    currentMoveIndex = idx;
    currentBoard = rebuildBoardUpTo(currentMoveIndex);
    selectedSquare = null;

    renderBoard();
    renderMoveList();
    updateCommentary();
  }

  function nextMove() {
    const moves = STRATEGIES[currentKey].moves;
    if (currentMoveIndex < moves.length - 1) {
      jumpToMove(currentMoveIndex + 1);
      return true;
    }
    return false;
  }

  function prevMove() {
    if (currentMoveIndex >= 0) {
      jumpToMove(currentMoveIndex - 1);
      return true;
    }
    return false;
  }

  function resetBoard() {
    pause();
    jumpToMove(-1);
  }

  function togglePlay() {
    if (isPlaying) {
      pause();
    } else {
      play();
    }
  }

  function play() {
    isPlaying = true;
    const playBtn = document.getElementById("chess-play-btn");
    if (playBtn) playBtn.textContent = "Pause";

    // If at end, loop back to start
    if (currentMoveIndex >= STRATEGIES[currentKey].moves.length - 1) {
      jumpToMove(-1);
    }

    playInterval = setInterval(() => {
      const hasMore = nextMove();
      if (!hasMore) {
        pause();
      }
    }, 1200);
  }

  function pause() {
    isPlaying = false;
    if (playInterval) {
      clearInterval(playInterval);
      playInterval = null;
    }
    const playBtn = document.getElementById("chess-play-btn");
    if (playBtn) playBtn.textContent = "Play";
  }

  function bindControls() {
    const prevBtn = document.getElementById("chess-prev-btn");
    const nextBtn = document.getElementById("chess-next-btn");
    const playBtn = document.getElementById("chess-play-btn");
    const resetBtn = document.getElementById("chess-reset-btn");
    const firstBtn = document.getElementById("chess-first-btn");
    const lastBtn = document.getElementById("chess-last-btn");

    if (prevBtn) prevBtn.addEventListener("click", () => { pause(); prevMove(); });
    if (nextBtn) nextBtn.addEventListener("click", () => { pause(); nextMove(); });
    if (playBtn) playBtn.addEventListener("click", togglePlay);
    if (resetBtn) resetBtn.addEventListener("click", resetBoard);
    if (firstBtn) firstBtn.addEventListener("click", () => { pause(); jumpToMove(-1); });
    if (lastBtn) lastBtn.addEventListener("click", () => { pause(); jumpToMove(STRATEGIES[currentKey].moves.length - 1); });
  }

  return {
    init,
    loadStrategy,
    nextMove,
    prevMove,
    resetBoard
  };
})();

if (typeof window !== "undefined") {
  window.CHESS_MODULE = CHESS_MODULE;
}
