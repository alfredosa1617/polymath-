/**
 * Polymath VSN - Wisdom & Lore Module (Domain 7)
 * Curated Stoic Philosophy, High-Performance Mental Models, and Mythological Archetypes
 * Interactive Philosophical Compendium & Mythological Archetypes Lab
 * Strictly emoji-free enterprise design
 */

const WISDOM_MODULE = (() => {

  const WISDOM_ARTICLES = [
    {
      id: "stoic-marcus-aurelius",
      pillar: "Stoic Philosophy",
      pillarCode: "stoic",
      title: "The Inner Citadel: Cognitive Sovereignty in Volatile Arenas",
      quote: "You have power over your mind - not outside events. Realize this, and you will find strength.",
      author: "Marcus Aurelius",
      source: "Meditations (Book IV, Section 3)",
      era: "c. 170–180 CE &bull; Roman Stoicism",
      readTime: "4 min read",
      summary: "How emperor Marcus Aurelius forged psychological immunity on the Germanic frontier, and why modern polymaths decouple emotional volatility from algorithmic execution.",
      sections: [
        {
          heading: "Historical & Philosophical Context",
          paragraphs: [
            "Written not for public consumption but as private spiritual exercises (*ta eis heauton*) while commanding legions along the frozen Danube, Marcus Aurelius faced catastrophic pressures: the Antonine Plague decimating Rome, continuous frontier warfare, and personal betrayal by trusted general Avidius Cassius.",
            "Central to Aurelius's cognitive model was the Stoic principle of the *hegemonikon*—the ruling center of the soul. He observed that external circumstances, no matter how chaotic, are intrinsically morally neutral (*adiaphora*). It is solely the mind's internal judgment (*dogma*) that transforms external volatility into psychological distress or purposeful composure."
          ]
        },
        {
          heading: "Cognitive Architecture & High-Performance Synthesis",
          paragraphs: [
            "In modern computational intelligence and competitive chess, practitioners frequently suffer from outcome bias and emotional tilt. When a complex algorithmic proof fails or a tactical gambit collapses under time pressure, the untrained mind blames external unfairness or panics.",
            "The 'Inner Citadel' is essentially a cognitive sandbox isolation boundary. Just as secure software processes execute in containerized memory spaces to prevent systemic crashes, a polymath must insulate the reasoning faculty from external turbulence. By treating errors as raw empirical telemetry rather than personal indictments, intellectual stamina multiplies."
          ]
        },
        {
          heading: "Polymath Actionable Protocol",
          points: [
            "<strong>Dichotomy of Control Triage:</strong> In every debugging session, chess impasse, or career pivot, immediately bifurcate elements into exactly two buckets: Variables under your direct agency, and external deterministic conditions. Channel 100% of energetic capital solely into the former.",
            "<strong>Pre-Mortem Inoculation (Premeditatio Malorum):</strong> Before deploying a major codebase or entering a competitive tournament, systematically visualize worst-case failure modes without panic, engineering defensive fallbacks in advance.",
            "<strong>Objective Description Reframing:</strong> Describe setbacks stripped of emotive vocabulary. Instead of 'This catastrophic bug ruined my week,' articulate: 'The recursive function exceeded the allocated stack frames due to an unbounded base condition.'"
          ]
        }
      ],
      relatedSkills: [
        { name: "Cognitive Architecture: Memory Palaces", target: "memory-palaces" },
        { name: "Logic & Spatial: Glass Chess Strategies", target: "glass-chess" },
        { name: "DSA: Complexity Analysis", target: "dsa-curriculum" }
      ]
    },
    {
      id: "legends-michael-jordan",
      pillar: "High-Performance Legends",
      pillarCode: "performance",
      title: "The Architecture of Failure-Tolerance: Asymmetric Upside in Elite Performance",
      quote: "I've missed more than 9,000 shots in my career. I've lost almost 300 games. Twenty-six times, I've been trusted to take the game-winning shot and missed. I've failed over and over and over again in my life. And that is why I succeed.",
      author: "Michael Jordan",
      source: "Career Retrospective & Championship Manifesto",
      era: "1997 &bull; Six-Time NBA Champion & Finals MVP",
      readTime: "5 min read",
      summary: "Deconstructing Jordan's statistical relationship with high-stakes failure: how relentless iteration and radical accountability cultivate unshakeable competitive mastery.",
      sections: [
        {
          heading: "Historical & Athletic Context",
          paragraphs: [
            "Widely regarded as the preeminent competitive athlete of the twentieth century, Michael Jordan's trajectory was neither linear nor spared from acute adversity. Cut from his high school varsity team as a sophomore, repeatedly eliminated by the Detroit Pistons' aggressive physical defense in the late 1980s, Jordan converted public failure into an obsessive feedback loop.",
            "Rather than shielding his ego by reducing attempts or passing the final shot to avoid negative publicity, Jordan leaned into high-variance exposure. He recognized that high aggregate volume in hostile conditions is the sole mathematical prerequisite for statistical dominance."
          ]
        },
        {
          heading: "Cognitive Architecture & High-Performance Synthesis",
          paragraphs: [
            "Polymathy requires crossing into unfamiliar domains where one begins as a clumsy novice—whether a software engineer learning guitar chord voice leading, or a mathematician memorizing 100-digit sequences via the Major System.",
            "Amateurs conflate a high failure count with incompetence; elites recognize high failure count as evidence of high sampling frequency. In reinforcement learning, an agent cannot find optimal policies without extensive state exploration and negative reward signals. Jordan's mindset is an operational manifestation of stochastic gradient optimization under real-time psychological pressure."
          ]
        },
        {
          heading: "Polymath Actionable Protocol",
          points: [
            "<strong>Normalize Repetition Density:</strong> When tackling difficult LeetCode patterns or speed mental math, measure daily problem attempts rather than mere win rate. Speed of feedback acquisition dictates learning velocity.",
            "<strong>Unforgiving Video & Trace Review:</strong> Jordan obsessively analyzed game film to detect micro-flaws in footwork. Conduct systematic post-mortems on your own failed code submissions, chess losses, and speed math calculations.",
            "<strong>Emotional Amnesia on the Next Repetition:</strong> Never carry the psychological baggage of a missed shot into the subsequent play. Each iteration is an independent stochastic event requiring pure presence."
          ]
        }
      ],
      relatedSkills: [
        { name: "DSA: 100 Coding Interview Mastery", target: "dsa-curriculum" },
        { name: "Numerical Intel: Trachtenberg Speed Math", target: "trachtenberg" },
        { name: "Logic & Spatial: 3x3 Rubik's Cube Solver 3D", target: "studio" }
      ]
    },
    {
      id: "myth-prometheus",
      pillar: "Mythological Wisdom",
      pillarCode: "mythology",
      title: "The Promethean Archetype: Foresight, Craft, and the Defiance of Mediocrity",
      quote: "He who forethinks shall never fall into the snare. Knowledge stolen from the gods belongs to the craftsman who dares to kindle it.",
      author: "Prometheus",
      source: "Aeschylus (Prometheus Bound)",
      era: "c. 430 BCE &bull; Classical Hellenic Lore",
      readTime: "4 min read",
      summary: "Exploring the mythic titan of foresight (*promētheia*): why technical mastery demands forward-looking architectural vision and courageous intellectual craftsmanship.",
      sections: [
        {
          heading: "Mythological & Archetypal Context",
          paragraphs: [
            "In Greek mythology, while his brother Epimetheus ('after-thinker') acted impulsively and dealt with catastrophic aftermath, Prometheus ('fore-thinker') possessed the gift of anticipatory structural analysis. Witnessing mortal humanity shivering in darkness and intellectual helplessness, Prometheus climbed Mount Olympus, captured celestial fire in a hollow fennel stalk, and delivered it to humanity.",
            "In Hellenic thought, 'fire' was not merely thermal energy; it was the divine archetype of *technē*—applied mathematics, architecture, metalworking, medicine, astronomy, and written language. Prometheus paid an agonizing eternal price, chained to the Caucasian rock, affirming that authentic innovation demands profound personal conviction."
          ]
        },
        {
          heading: "Cognitive Architecture & High-Performance Synthesis",
          paragraphs: [
            "The polymath is, by definition, a Promethean figure. Rather than passively accepting the fragmented knowledge siloes dictated by institutional specialization, the multi-disciplinary thinker ascends multiple peaks to cross-pollinate divine technical insights.",
            "True engineering and spatial mastery require anticipatory thinking over retroactive patching. In algorithmic design, a Promethean architect evaluates asymptotic space and time complexity before writing a line of code, anticipating cache misses and memory bottlenecks before they manifest."
          ]
        },
        {
          heading: "Polymath Actionable Protocol",
          points: [
            "<strong>Architectural Pre-Computation:</strong> Before initiating any implementation, draft the entire data structure topology, invariants, and edge cases on paper or a dry-erase board.",
            "<strong>Cross-Domain Fire Harvesting:</strong> Intentionally extract principles from one discipline to illuminate another—for example, mapping musical chord intervals to harmonic ratios in physical geometry.",
            "<strong>Courageous Independent Inquiry:</strong> Refuse intellectual complacency. When consensus claims a problem is impossible, inspect the underlying axioms for hidden assumptions."
          ]
        }
      ],
      relatedSkills: [
        { name: "Cognitive Arch: Major System Mapping", target: "major-system" },
        { name: "Music & Acoustics: Fretboard Harmony & Theory", target: "fretboard-harmony" },
        { name: "DSA: C++ Algorithmic Decomposition", target: "dsa-sandbox" }
      ]
    },
    {
      id: "stoic-seneca",
      pillar: "Stoic Philosophy",
      pillarCode: "stoic",
      title: "Temporal Capital: The Art of Syntopical Time-Multiplexing",
      quote: "It is not that we have a short time to live, but that we waste a lot of it. Life is long enough if you know how to use it.",
      author: "Seneca the Younger",
      source: "De Brevitate Vitae (On the Shortness of Life)",
      era: "c. 49 CE &bull; Roman Imperial Stoicism",
      readTime: "4 min read",
      summary: "Seneca's timeless diagnosis of synthetic busyness: how to treat cognitive attention and waking hours as finite, non-renewable capital.",
      sections: [
        {
          heading: "Historical & Philosophical Context",
          paragraphs: [
            "Lucius Annaeus Seneca composed this treatise to Paulinus, the superintendent of Rome's grain supply, dissecting humanity's tragic illusion regarding the scarcity of time. Seneca noted that individuals are fiercely protective of their money and real estate, yet casually squander their most precious, non-recoverable asset: focused attention.",
            "People allow hours to be carved away by sycophants, banquet trifles, bureaucratic rituals, and unfocused ambitions. Seneca famously observed that most people do not live; they merely exist for long stretches before death."
          ]
        },
        {
          heading: "Cognitive Architecture & High-Performance Synthesis",
          paragraphs: [
            "Modern polymathic aspirants frequently complain of having 'no time' to master coding, study chess, learn musical harmony, or memorize philosophical texts. Yet analytical audit often reveals hours leaked into context-switching, notifications, and low-signal browsing.",
            "By treating focused cognitive attention as investment capital with compounding interest, a polymath discovers that two hours of deep, unfragmented deliberate practice exceeds twelve hours of distracted multi-tasking."
          ]
        },
        {
          heading: "Polymath Actionable Protocol",
          points: [
            "<strong>Ruthless Distraction Audit:</strong> Strip down your digital workstation. Disable all non-critical notifications and preserve dedicated multi-hour deep focus blocks.",
            "<strong>Syntopical Multiplexing:</strong> Pair active technical exertion (e.g., coding) with passive physical integration (e.g., walking while reviewing mental palace loci).",
            "<strong>Daily Retrospective Ledger:</strong> Before sleep, account for your day's expenditure of hours as strictly as a financial ledger. Was your temporal capital invested or squandered?"
          ]
        }
      ],
      relatedSkills: [
        { name: "Sample Papers: Global Exam Repository", target: "sample-papers" },
        { name: "Numerical Intel: Vedic Mathematics", target: "vedic-math" },
        { name: "Cognitive Arch: Mnemonic Memory Palaces", target: "memory-palaces" }
      ]
    },
    {
      id: "legends-da-vinci",
      pillar: "High-Performance Legends",
      pillarCode: "performance",
      title: "Syntopic Convergence: The Renaissance Art of Cross-Domain Mapping",
      quote: "To develop a complete mind: Study the science of art; Study the art of science. Learn how to see. Realize that everything connects to everything else.",
      author: "Leonardo da Vinci",
      source: "Codex Atlanticus & Notebooks",
      era: "c. 1490–1510 &bull; Italian High Renaissance",
      readTime: "5 min read",
      summary: "The quintessential polymathic doctrine: how da Vinci weaponized visual observation, mechanical physics, and musical theory to unlock transcendent creativity.",
      sections: [
        {
          heading: "Historical & Polymathic Context",
          paragraphs: [
            "Leonardo da Vinci refused the narrow guild boundaries of Florence and Milan. He was simultaneously an anatomical dissector, military siege engineer, theatrical scenographer, skilled lyre musician, geometric theorist, and master painter.",
            "In his notebooks (*Codex Arundel*, *Codex Leicester*), a single page often fluidly shifts from the eddy currents of mountain rivers, to the hydrodynamics of blood flowing past aortic heart valves, to the chiaroscuro shading on the veil of a portrait. For Leonardo, nature possessed a singular mathematical grammar."
          ]
        },
        {
          heading: "Cognitive Architecture & High-Performance Synthesis",
          paragraphs: [
            "Modern hyper-specialization often produces 'trained incapacity'—the inability to perceive solutions outside one's formal domain. A pure mathematician may miss spatial symmetry; a visual artist may lack analytical rigor.",
            "When you practice disparate disciplines simultaneously (e.g., 3D Rubik's cube spatial geometry, Vedic numerical decomposition, and acoustic guitar fretboard harmonics), your neural architecture begins recognizing meta-patterns. You learn to 'see' the structural isomorphism binding seemingly distinct phenomena."
          ]
        },
        {
          heading: "Polymath Actionable Protocol",
          points: [
            "<strong>Analog Visual Decomposition:</strong> Maintain an unlined sketchbook. When learning an abstract data structure or mathematical theorem, draft its visual geometric equivalent by hand.",
            "<strong>Cross-Domain Metaphor Mapping:</strong> Challenge yourself to explain a computational concept (e.g., binary search) using musical harmony or spatial navigation metaphors.",
            "<strong>Bi-Weekly Multi-Disciplinary Sprint:</strong> Ensure your weekly routine actively exercises both analytical rigor (logic/math/code) and sensory perception (music/spatial drafting)."
          ]
        }
      ],
      relatedSkills: [
        { name: "Logic & Spatial: 3x3 Rubik's Cube Solver 3D", target: "studio" },
        { name: "Music & Acoustics: 3D Guitar Chord Lab", target: "guitar-3d" },
        { name: "Sample Papers: Global Exam Repository", target: "sample-papers" }
      ]
    },
    {
      id: "myth-athena",
      pillar: "Mythological Wisdom",
      pillarCode: "mythology",
      title: "Metis: The Cunning Strategic Intelligence of Ancient Tacticians",
      quote: "Counsel and strategy win battles where brute force falters. Craftsmanship of the mind outlasts the sharpness of any blade.",
      author: "Athena & The Odyssean Tradition",
      source: "Homer (The Iliad & Odyssey)",
      era: "c. 750 BCE &bull; Classical Hellenic Epic",
      readTime: "4 min read",
      summary: "Exploring *metis*—the ancient Greek concept of cunning, strategic foresight, and craftsmanship—and its application to modern tactical problem-solving.",
      sections: [
        {
          heading: "Mythological & Archetypal Context",
          paragraphs: [
            "In ancient Greek mythology, Athena was born fully armored from the forehead of Zeus after he swallowed the Titaness Metis ('wisdom', 'cunning craft'). Unlike Ares, the god of mindless bloodlust and brute martial force, Athena represented strategic warfare, tactical diplomacy, weaving, and the craftsmanship of ships.",
            "Her favored mortal was Odysseus, defined not by Herculean muscle, but by *polytropos*—the 'many-turned' mind capable of adapting to shifting circumstances, unravelling riddles, and defeating giants through structural leverage rather than direct clash."
          ]
        },
        {
          heading: "Cognitive Architecture & High-Performance Synthesis",
          paragraphs: [
            "In software engineering and tactical chess, beginners instinctively resort to brute force: writing bloated, unoptimized nested loops or desperately launching aggressive piece attacks without solid pawn structure.",
            "Mastery is the triumph of *metis*. In glass chess, a single quiet pawn move (prophylaxis) can completely freeze an opponent's aggressive army. In algorithmic thinking, dynamic programming replaces exponential brute-force operations ($O(2^n)$) with polynomial memoized lookups ($O(n)$) through pure structural leverage."
          ]
        },
        {
          heading: "Polymath Actionable Protocol",
          points: [
            "<strong>Seek Positional Leverage:</strong> Before launching direct execution, ask: 'What single structural alteration renders this entire problem trivial?'",
            "<strong>Cultivate Prophylaxis:</strong> In code design and strategic games, proactively anticipate your system's weaknesses and neutralize them before the opponent or client stress tests them.",
            "<strong>Master Adaptive Flexibility (Polytropia):</strong> Avoid rigid dogma. If a chosen architectural path encounters fundamental friction, pivot fluidly without emotional resistance."
          ]
        }
      ],
      relatedSkills: [
        { name: "Logic & Spatial: Glass Chess Strategies & Moves", target: "glass-chess" },
        { name: "Geopolitics: Territorial & Maritime Standoffs", target: "geopolitics-territorial" },
        { name: "DSA: Algorithmic Problem Solving", target: "dsa-curriculum" }
      ]
    },
    {
      id: "myth-eastern-gita",
      pillar: "Mythological Wisdom",
      pillarCode: "mythology",
      title: "Process-Centric Equanimity: Decoupling Mastery from Outcome Anxiety",
      quote: "You have a right to your actions, but never to the fruits of your actions. Let not the fruits of action be your motive, nor let your attachment be to inaction.",
      author: "The Gita Dialogue",
      source: "The Bhagavad Gita (Chapter II, Verse 47)",
      era: "c. 400 BCE &bull; Eastern Classical Ethics",
      readTime: "4 min read",
      summary: "The philosophical doctrine of Nishkama Karma: why detaching your ego from future accolades unlocks supreme flow state and flawless technical execution.",
      sections: [
        {
          heading: "Historical & Philosophical Context",
          paragraphs: [
            "Spoken on the battlefield of Kurukshetra as the warrior-prince Arjuna collapses from existential paralysis, this verse establishes the core doctrine of *Karma Yoga* (the discipline of selfless, detached action).",
            "Arjuna's crisis was caused by outcome fixation: anticipating grief, victory, praise, and judgment. Krishna's counsel asserts that anxiety resides entirely in the imaginary future. True mastery demands 100% presence in the immediate duty (*dharma*), with radical indifference to external praise or defeat."
          ]
        },
        {
          heading: "Cognitive Architecture & High-Performance Synthesis",
          paragraphs: [
            "Psychological research into 'Flow' (Csikszentmihalyi) mirrors this ancient insight: peak cognitive performance occurs when the prefrontal ego-narrative deactivates. When you code or play chess while constantly worrying about status, salary, or performance reviews, working memory bandwidth is cut in half.",
            "By divorcing your identity from the outcome, you liberate full cognitive capacity for the immediate problem. The code executes cleaner, the chess calculation runs deeper, and the fingers move across the guitar fretboard with unforced fluency."
          ]
        },
        {
          heading: "Polymath Actionable Protocol",
          points: [
            "<strong>Outcome-Independent Session Goal:</strong> Enter every practice session committed to impeccable craftsmanship, regardless of whether you achieve a rapid win.",
            "<strong>Radical Flow Surrender:</strong> When performance anxiety arises, gently return attention to the immediate keystroke, note, or calculation step.",
            "<strong>Celebrate Process Integrity:</strong> Measure self-worth by whether you adhered to high standards and deep focus, never by transient external validation."
          ]
        }
      ],
      relatedSkills: [
        { name: "Cognitive Arch: Mnemonic Memory Palaces", target: "memory-palaces" },
        { name: "Music & Acoustics: 3D Guitar Chord Lab", target: "guitar-3d" },
        { name: "Numerical Intel: Vedic Mathematics", target: "vedic-math" }
      ]
    }
  ];

  const ARCHETYPES = [
    {
      id: "promethean",
      name: "The Promethean Architect",
      greekTitle: "Promētheus (Foresight & Technē)",
      principle: "Technē & Pre-Computation",
      motto: "He who forethinks shall master complexity before runtime.",
      analogy: "Dynamic Programming & Memoization: solving and caching subproblems in advance so catastrophic overhead is eliminated during critical execution.",
      drive: "Relentless architectural ambition, democratizing high-order knowledge, crafting systems that outlive their creator.",
      shadow: "Hubris and ungrounded over-engineering. Building overly intricate monuments without empirical unit testing.",
      synergies: [
        { name: "DSA: Dynamic Programming", target: "dsa-curriculum" },
        { name: "Logic & Spatial: Rubik's Solver 3D", target: "studio" },
        { name: "Cognitive Arch: Major System", target: "major-system" }
      ],
      protocol: "Before writing any production logic, draft a rigorous state transition diagram and define boundary constraints."
    },
    {
      id: "metis",
      name: "The Metis Tactician",
      greekTitle: "Mētis (Cunning Adaptability)",
      principle: "Asymmetric Leverage vs. Force",
      motto: "Better is skill than brute force; the wise steersman navigates by foresight.",
      analogy: "Heuristic Search & Pruning (A* & Minimax Alpha-Beta): evaluating only high-utility branches instead of choking memory on exhaustive brute-force trees.",
      drive: "Fluid adaptation under time pressure, exploiting structural imbalances, turning opponents' inertia against them.",
      shadow: "Cynicism, paralysis by analysis, or deceit. Over-optimizing micro-tactics at the expense of strategic clarity.",
      synergies: [
        { name: "Logic & Spatial: Glass Chess Strategies", target: "glass-chess" },
        { name: "DSA: Binary Search & Two Pointers", target: "dsa-curriculum" },
        { name: "Numerical Intel: Trachtenberg Speed Math", target: "trachtenberg" }
      ],
      protocol: "In every tactical impasse, look for the quiet transposition move that transforms defensive tension into active leverage."
    },
    {
      id: "stoic",
      name: "The Stoic Sovereign",
      greekTitle: "Hēgemonikon (Ruling Faculty)",
      principle: "Dichotomy of Control & Sandbox",
      motto: "You have power over your mind - not outside events.",
      analogy: "Process Isolation & Fault Domains: containing faults within isolated worker sandboxes so system panics never cascade into core operational memory.",
      drive: "Unshakeable emotional equilibrium, immunity to praise and condemnation, disciplined empirical reason.",
      shadow: "Emotional detachment calcifying into apathy or suppressed isolation. Confusing stoicism with indifference to quality.",
      synergies: [
        { name: "Cognitive Arch: Mnemonic Memory Palaces", target: "memory-palaces" },
        { name: "DSA: Complexity Analysis", target: "dsa-curriculum" },
        { name: "Numerical Intel: Vedic Mathematics", target: "vedic-math" }
      ],
      protocol: "Bifurcate daily friction into internal variables (effort, integrity, logic) versus external deterministic noise. Discard the noise."
    },
    {
      id: "vitruvian",
      name: "The Vitruvian Polymath",
      greekTitle: "Uomo Universale (Cross-Domain)",
      principle: "Interdisciplinary Synthesis",
      motto: "Study the science of art; study the art of science; realize that everything connects to everything else.",
      analogy: "Graph Embedding & Isomorphism: mapping structural patterns from one domain topology directly into an apparently unrelated problem space.",
      drive: "Insatiable multi-domain curiosity, merging spatial geometry with computational mechanics, auditory harmony with mathematics.",
      shadow: "Dilettantism. Superficial dabbling across ten disciplines without achieving deep algorithmic fluency in any.",
      synergies: [
        { name: "Music & Acoustics: 3D Guitar Chord Lab", target: "guitar-3d" },
        { name: "Logic & Spatial: 3D Spatial Geometry", target: "studio" },
        { name: "Sample Papers: Global Exam Repository", target: "sample-papers" }
      ],
      protocol: "Spend one dedicated session each week forcing an explicit analogy between two disparate skills (e.g. guitar fretboard intervals and modular arithmetic)."
    },
    {
      id: "detached",
      name: "The Detached Executor",
      greekTitle: "Nishkama Karma (Equanimity)",
      principle: "Process Purely Decoupled from Outcome",
      motto: "You have a right to your actions, but never to the fruits of your actions.",
      analogy: "Pure Functional Execution & Idempotence: functions produce deterministic outputs strictly based on input arguments without side-effect contamination.",
      drive: "Effortless Flow state under extreme pressure, relentless execution without egoic friction or panic.",
      shadow: "Fatalism. Abdicating responsibility for outcomes under the guise of philosophical detachment.",
      synergies: [
        { name: "Numerical Intel: Trachtenberg Rapid Arithmetic", target: "trachtenberg" },
        { name: "DSA: Coding Interview Sandboxes", target: "dsa-sandbox" },
        { name: "Cognitive Arch: Major System Mapping", target: "major-system" }
      ],
      protocol: "Engage in timed algorithmic calculations with full intensity, yet measure success solely by focus and adherence to rules, not by immediate applause."
    }
  ];

  // Internal State
  let currentQuoteIndex = 0;
  let activeFilter = 'all';
  let searchQuery = '';
  let activeArchetypeId = 'promethean';
  let autoRotateTimer = null;

  function init() {
    renderFeaturedQuote();
    renderCompendiumGrid();
    renderArchetypeTabs();
    renderArchetypeDetail();
    bindCompendiumEvents();
    bindArchetypeEvents();
    bindModalEvents();
    startAutoRotate();
  }

  // ============================================================
  // 1. Featured Quote & Compendium Grid
  // ============================================================

  function renderFeaturedQuote() {
    const article = WISDOM_ARTICLES[currentQuoteIndex];
    if (!article) return;

    // Featured callout in Compendium
    const pillarEl = document.getElementById('compendium-featured-pillar');
    const metaEl = document.getElementById('compendium-featured-meta');
    const quoteEl = document.getElementById('compendium-featured-quote');
    const summaryEl = document.getElementById('compendium-featured-summary');
    const counterEl = document.getElementById('compendium-featured-counter');

    if (pillarEl) pillarEl.textContent = article.pillar;
    if (metaEl) metaEl.innerHTML = `${article.author} &bull; ${article.source}`;
    if (quoteEl) quoteEl.textContent = `"${article.quote}"`;
    if (summaryEl) summaryEl.textContent = article.summary;
    if (counterEl) counterEl.textContent = `${currentQuoteIndex + 1} / ${WISDOM_ARTICLES.length}`;

    // Also update modal if currently viewing this quote
    const modalQuoteEl = document.getElementById('wisdom-modal-quote');
    if (modalQuoteEl && isModalOpen()) {
      populateModal(article);
    }
  }

  function renderCompendiumGrid() {
    const container = document.getElementById('wisdom-compendium-grid');
    if (!container) return;

    const filtered = WISDOM_ARTICLES.filter(item => {
      const matchesFilter = (activeFilter === 'all') || (item.pillarCode === activeFilter);
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch = !q ||
        item.title.toLowerCase().includes(q) ||
        item.author.toLowerCase().includes(q) ||
        item.quote.toLowerCase().includes(q) ||
        item.summary.toLowerCase().includes(q);
      return matchesFilter && matchesSearch;
    });

    if (filtered.length === 0) {
      container.innerHTML = `
        <div class="col-span-full p-8 text-center bg-white rounded-xl border border-[#EAE3D9] text-[#7C7067]">
          <p class="text-sm font-semibold text-[#1C1613]">No insights match your search criteria.</p>
          <p class="text-xs mt-1">Try resetting the pillar filter or searching for Marcus Aurelius, Jordan, or Prometheus.</p>
          <button onclick="if(window.WISDOM_MODULE) window.WISDOM_MODULE.resetFilters();" class="mt-3 px-3.5 py-1.5 text-xs font-semibold rounded bg-[#F7F4EF] hover:bg-[#EFECE6] border border-[#D8CFBF] text-[#2C221E] cursor-pointer">
            Reset Filters
          </button>
        </div>
      `;
      return;
    }

    container.innerHTML = filtered.map(item => `
      <div class="polymath-card p-6 flex flex-col justify-between hover:shadow-md transition-all duration-200 bg-[#FFFCF9]">
        <div>
          <div class="flex items-center justify-between gap-2 mb-2">
            <span class="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-[#EFECE6] text-[#2C221E] border border-[#D8CFBF]">
              ${item.pillar}
            </span>
            <span class="text-[11px] font-mono text-[#9C9087]">${item.readTime}</span>
          </div>

          <h3 class="text-base font-bold text-[#1C1613] tracking-tight leading-snug mb-2 font-serif">
            ${item.title}
          </h3>

          <div class="p-3 rounded-lg bg-[#F7F4EF] border-l-2 border-[#2C221E] border border-[#EAE3D9] my-3">
            <p class="font-serif italic text-xs text-[#2C221E] leading-relaxed">
              "${item.quote}"
            </p>
            <div class="text-[10px] text-[#7C7067] font-medium mt-1.5">
              &mdash; ${item.author} (${item.era})
            </div>
          </div>

          <p class="text-xs text-[#5C524C] leading-relaxed mb-4">
            ${item.summary}
          </p>
        </div>

        <div class="pt-4 border-t border-[#EAE3D9] flex flex-col gap-3">
          <div class="flex flex-wrap gap-1.5">
            ${item.relatedSkills.map(sk => `
              <span class="text-[10px] px-2 py-0.5 rounded bg-white border border-[#EAE3D9] text-[#7C7067] font-mono">
                ${sk.name.split(':')[0]}
              </span>
            `).join('')}
          </div>

          <button onclick="if(window.WISDOM_MODULE) window.WISDOM_MODULE.openArticle('${item.id}');" class="w-full py-2 px-3 text-xs font-semibold rounded-lg bg-[#2C221E] hover:bg-[#4E4038] text-white transition-colors cursor-pointer text-center shadow-sm">
            Read Full Analysis &amp; Protocol &rarr;
          </button>
        </div>
      </div>
    `).join('');
  }

  function bindCompendiumEvents() {
    // Search input
    const searchInput = document.getElementById('wisdom-search-input');
    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        searchQuery = e.target.value;
        renderCompendiumGrid();
      });
    }

    // Filter buttons
    document.querySelectorAll('.wisdom-filter-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.wisdom-filter-btn').forEach(b => {
          b.classList.remove('active', 'bg-[#2C221E]', 'text-white');
          b.classList.add('bg-[#F7F4EF]', 'text-[#3E3632]');
        });
        btn.classList.add('active', 'bg-[#2C221E]', 'text-white');
        btn.classList.remove('bg-[#F7F4EF]', 'text-[#3E3632]');
        activeFilter = btn.dataset.pillar || 'all';
        renderCompendiumGrid();
      });
    });
  }

  function resetFilters() {
    activeFilter = 'all';
    searchQuery = '';
    const searchInput = document.getElementById('wisdom-search-input');
    if (searchInput) searchInput.value = '';
    document.querySelectorAll('.wisdom-filter-btn').forEach(b => {
      if (b.dataset.pillar === 'all') {
        b.classList.add('active', 'bg-[#2C221E]', 'text-white');
        b.classList.remove('bg-[#F7F4EF]', 'text-[#3E3632]');
      } else {
        b.classList.remove('active', 'bg-[#2C221E]', 'text-white');
        b.classList.add('bg-[#F7F4EF]', 'text-[#3E3632]');
      }
    });
    renderCompendiumGrid();
  }

  // ============================================================
  // 2. Mythological Archetypes Lab
  // ============================================================

  function renderArchetypeTabs() {
    const tabsContainer = document.getElementById('archetype-tabs-container');
    if (!tabsContainer) return;

    tabsContainer.innerHTML = ARCHETYPES.map(arch => {
      const isActive = arch.id === activeArchetypeId;
      return `
        <button onclick="if(window.WISDOM_MODULE) window.WISDOM_MODULE.selectArchetype('${arch.id}');" class="px-3 py-2 text-xs font-semibold rounded-lg border transition-all cursor-pointer text-left truncate ${
          isActive
            ? 'bg-[#2C221E] text-white border-[#2C221E] shadow-sm'
            : 'bg-[#F7F4EF] hover:bg-[#EFECE6] text-[#3E3632] border-[#EAE3D9]'
        }">
          <span class="block text-[9px] ${isActive ? 'text-[#D8CFBF]' : 'text-[#7C7067]'} uppercase tracking-wider">${arch.greekTitle.split(' ')[0]}</span>
          ${arch.name.replace('The ', '')}
        </button>
      `;
    }).join('');
  }

  function renderArchetypeDetail() {
    const arch = ARCHETYPES.find(a => a.id === activeArchetypeId) || ARCHETYPES[0];
    if (!arch) return;

    const greekTitleEl = document.getElementById('archetype-greek-title');
    const nameEl = document.getElementById('archetype-name');
    const badgeEl = document.getElementById('archetype-principle-badge');
    const mottoEl = document.getElementById('archetype-motto');
    const analogyEl = document.getElementById('archetype-analogy');
    const driveEl = document.getElementById('archetype-drive');
    const shadowEl = document.getElementById('archetype-shadow');
    const protocolEl = document.getElementById('archetype-protocol');
    const synergiesEl = document.getElementById('archetype-synergies');

    if (greekTitleEl) greekTitleEl.textContent = arch.greekTitle;
    if (nameEl) nameEl.textContent = arch.name;
    if (badgeEl) badgeEl.textContent = arch.principle;
    if (mottoEl) mottoEl.textContent = `"${arch.motto}"`;
    if (analogyEl) analogyEl.textContent = arch.analogy;
    if (driveEl) driveEl.textContent = arch.drive;
    if (shadowEl) shadowEl.textContent = arch.shadow;
    if (protocolEl) protocolEl.textContent = arch.protocol;

    if (synergiesEl && arch.synergies) {
      synergiesEl.innerHTML = arch.synergies.map(syn => `
        <button onclick="if(typeof window.switchView === 'function') window.switchView('${syn.target}');" class="px-2.5 py-1 text-[11px] font-semibold rounded-lg bg-white border border-[#EAE3D9] text-[#2C221E] hover:bg-[#F7F4EF] hover:border-[#D8CFBF] transition-all cursor-pointer">
          ${syn.name} &rarr;
        </button>
      `).join('');
    }
  }

  function selectArchetype(archetypeId) {
    activeArchetypeId = archetypeId;
    renderArchetypeTabs();
    renderArchetypeDetail();
  }

  function bindArchetypeEvents() {
    const sliders = [
      { id: 'slider-foresight', labelId: 'val-foresight' },
      { id: 'slider-agility', labelId: 'val-agility' },
      { id: 'slider-sovereignty', labelId: 'val-sovereignty' },
      { id: 'slider-synthesis', labelId: 'val-synthesis' },
      { id: 'slider-detachment', labelId: 'val-detachment' }
    ];

    sliders.forEach(s => {
      const slider = document.getElementById(s.id);
      const label = document.getElementById(s.labelId);
      if (slider && label) {
        slider.addEventListener('input', () => {
          label.textContent = `${slider.value}%`;
        });
      }
    });
  }

  function evaluateAudit() {
    const foresight = parseInt(document.getElementById('slider-foresight')?.value || "75");
    const agility = parseInt(document.getElementById('slider-agility')?.value || "60");
    const sovereignty = parseInt(document.getElementById('slider-sovereignty')?.value || "80");
    const synthesis = parseInt(document.getElementById('slider-synthesis')?.value || "85");
    const detachment = parseInt(document.getElementById('slider-detachment')?.value || "55");

    const dimensions = [
      { name: "Promethean Foresight", val: foresight, target: "dsa-curriculum", module: "DSA Topic Curriculum", focus: "algorithmic pre-computation" },
      { name: "Metis Tactical Agility", val: agility, target: "glass-chess", module: "Glass Chess Strategies", focus: "tactical transposition and prophylaxis" },
      { name: "Stoic Sovereignty", val: sovereignty, target: "memory-palaces", module: "Mnemonic Memory Palaces", focus: "cognitive isolation and spatial loci" },
      { name: "Vitruvian Synthesis", val: synthesis, target: "guitar-3d", module: "3D Guitar Chord Lab", focus: "auditory and spatial harmonic modeling" },
      { name: "Process Detachment", val: detachment, target: "trachtenberg", module: "Trachtenberg Speed Math", focus: "rapid calculation under time pressure without anxiety" }
    ];

    dimensions.sort((a, b) => a.val - b.val);
    const lowest = dimensions[0]; // highest growth opportunity
    const highest = dimensions[dimensions.length - 1]; // primary superpower

    const titleEl = document.getElementById('audit-result-title');
    const descEl = document.getElementById('audit-result-desc');
    const actionEl = document.getElementById('audit-result-action');

    if (titleEl) {
      titleEl.innerHTML = `Superpower: <strong>${highest.name} (${highest.val}%)</strong> &bull; Growth Target: <strong>${lowest.name} (${lowest.val}%)</strong>`;
    }

    if (descEl) {
      descEl.innerHTML = `Your peak asset is <strong>${highest.name}</strong>, providing strong leverage. To achieve balanced multidisciplinary mastery, your immediate growth opportunity lies in <strong>${lowest.name}</strong> (${lowest.focus}). Prioritizing the <strong>${lowest.module}</strong> module will bridge this cognitive gap.`;
    }

    if (actionEl) {
      actionEl.innerHTML = `
        <button onclick="if(typeof window.switchView === 'function') window.switchView('${lowest.target}');" class="text-xs font-bold text-[#2C221E] underline hover:text-[#4E4038] cursor-pointer">
          Launch Recommended Module: ${lowest.module} &rarr;
        </button>
      `;
    }
  }

  // ============================================================
  // 3. In-Depth Article Reader Modal
  // ============================================================

  function populateModal(article) {
    const modalPillar = document.getElementById('wisdom-modal-pillar');
    const modalMeta = document.getElementById('wisdom-modal-meta');
    const modalTitle = document.getElementById('wisdom-modal-title');
    const modalQuote = document.getElementById('wisdom-modal-quote');
    const modalAttribution = document.getElementById('wisdom-modal-attribution');
    const modalSummary = document.getElementById('wisdom-modal-summary');

    if (modalPillar) modalPillar.textContent = article.pillar;
    if (modalMeta) modalMeta.innerHTML = `${article.era} &bull; ${article.readTime}`;
    if (modalTitle) modalTitle.textContent = article.title;
    if (modalQuote) modalQuote.textContent = `"${article.quote}"`;
    if (modalAttribution) modalAttribution.innerHTML = `&mdash; ${article.author}, ${article.source}`;
    if (modalSummary) modalSummary.textContent = article.summary;

    // Structured Body Sections
    const bodyContainer = document.getElementById('wisdom-modal-sections');
    if (bodyContainer && article.sections) {
      bodyContainer.innerHTML = '';
      article.sections.forEach(sec => {
        const secDiv = document.createElement('div');
        secDiv.className = "space-y-2";

        const h3 = document.createElement('h3');
        h3.className = "text-xs font-bold uppercase tracking-wider text-[#1C1613] pb-1 border-b border-[#EAE3D9]";
        h3.textContent = sec.heading;
        secDiv.appendChild(h3);

        if (sec.paragraphs) {
          sec.paragraphs.forEach(pText => {
            const p = document.createElement('p');
            p.className = "text-xs text-[#3E3632] leading-relaxed font-sans";
            p.innerHTML = pText;
            secDiv.appendChild(p);
          });
        }

        if (sec.points) {
          const ul = document.createElement('ul');
          ul.className = "space-y-2.5 mt-2 pl-3 border-l-2 border-[#D8CFBF]";
          sec.points.forEach(ptText => {
            const li = document.createElement('li');
            li.className = "text-xs text-[#3E3632] leading-relaxed";
            li.innerHTML = ptText;
            ul.appendChild(li);
          });
          secDiv.appendChild(ul);
        }

        bodyContainer.appendChild(secDiv);
      });
    }

    // Related Curriculum Cross-Links
    const pathwaysContainer = document.getElementById('wisdom-modal-pathways');
    if (pathwaysContainer && article.relatedSkills) {
      pathwaysContainer.innerHTML = '';
      article.relatedSkills.forEach(skill => {
        const btn = document.createElement('button');
        btn.type = "button";
        btn.className = "px-3 py-2 text-xs font-semibold rounded-lg bg-[#F7F4EF] border border-[#EAE3D9] text-[#2C221E] hover:bg-[#EFECE6] hover:border-[#D8CFBF] transition-all cursor-pointer text-left";
        btn.innerHTML = `<span class="block text-[10px] text-[#7C7067] font-normal uppercase tracking-wider">Curriculum Pathway</span>${skill.name}`;
        btn.addEventListener('click', () => {
          closeArticle();
          if (typeof window.switchView === 'function') {
            window.switchView(skill.target);
          }
        });
        pathwaysContainer.appendChild(btn);
      });
    }
  }

  function openArticle(articleId) {
    const modal = document.getElementById('wisdom-article-modal');
    if (!modal) return;

    let article = null;
    if (articleId) {
      article = WISDOM_ARTICLES.find(a => a.id === articleId);
      if (article) {
        currentQuoteIndex = WISDOM_ARTICLES.indexOf(article);
      }
    }

    if (!article) {
      article = WISDOM_ARTICLES[currentQuoteIndex];
    }

    if (!article) return;

    populateModal(article);

    modal.classList.remove('hidden');
    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
  }

  function closeArticle() {
    const modal = document.getElementById('wisdom-article-modal');
    if (!modal) return;
    modal.classList.add('hidden');
    modal.style.display = 'none';
    document.body.style.overflow = '';
  }

  function isModalOpen() {
    const modal = document.getElementById('wisdom-article-modal');
    return modal && !modal.classList.contains('hidden') && modal.style.display !== 'none';
  }

  function nextQuote() {
    currentQuoteIndex = (currentQuoteIndex + 1) % WISDOM_ARTICLES.length;
    renderFeaturedQuote();
  }

  function prevQuote() {
    currentQuoteIndex = (currentQuoteIndex - 1 + WISDOM_ARTICLES.length) % WISDOM_ARTICLES.length;
    renderFeaturedQuote();
  }

  function startAutoRotate() {
    stopAutoRotate();
    autoRotateTimer = setInterval(() => {
      if (!isModalOpen()) {
        nextQuote();
      }
    }, 14000);
  }

  function stopAutoRotate() {
    if (autoRotateTimer) {
      clearInterval(autoRotateTimer);
      autoRotateTimer = null;
    }
  }

  function bindModalEvents() {
    // Modal Close Button
    const closeBtn = document.getElementById('wisdom-modal-close-btn');
    const modalBackdrop = document.getElementById('wisdom-article-modal');
    if (closeBtn) closeBtn.onclick = closeArticle;
    if (modalBackdrop) {
      modalBackdrop.onclick = (e) => {
        if (e.target === modalBackdrop) closeArticle();
      };
    }

    // Modal Prev / Next Buttons
    const modalPrevBtn = document.getElementById('wisdom-modal-prev-btn');
    const modalNextBtn = document.getElementById('wisdom-modal-next-btn');
    if (modalPrevBtn) {
      modalPrevBtn.onclick = () => {
        prevQuote();
        openArticle();
      };
    }
    if (modalNextBtn) {
      modalNextBtn.onclick = () => {
        nextQuote();
        openArticle();
      };
    }

    // Escape Key Listener
    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && isModalOpen()) {
        closeArticle();
      }
    });
  }

  // Auto-init immediately if DOM is ready, or on DOMContentLoaded
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      init();
    });
  } else {
    init();
  }

  // Public Interface
  return {
    init,
    openArticle,
    closeArticle,
    nextQuote,
    prevQuote,
    selectArchetype,
    evaluateAudit,
    resetFilters,
    renderFeaturedQuote,
    renderCompendiumGrid
  };

})();

// Expose globally
window.WISDOM_MODULE = WISDOM_MODULE;
