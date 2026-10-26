# Polymath VSN (Enterprise Multidisciplinary Platform)

A comprehensive, enterprise-grade multidisciplinary cognitive and skill development platform built with **Java 21**, **Spring Boot 3.3.4**, **Spring Security (JWT)**, **Spring Data JPA**, **H2 Database**, **Three.js (WebGL)**, and **Tailwind CSS**.

---

## Design System & Aesthetic Standards

- **Color Canvas**: Warm cream and soft beige (`#FDFBF7`, `#FFFCF9`, `#F7F4EF`, `#EFECE6`).
- **Typography & Accents**: Deep espresso (`#2C221E`), dark taupe (`#4E4038`), and warm taupe structural borders (`#EAE3D9`, `#D8CFBF`).
- **Enterprise Standards**: Strictly emoji-free, utilizing precise typography (Playfair Display serif for editorial headings, sans-serif for UI), subtle drop shadows, and clean grid layouts.

---

## 10 Core Multidisciplinary Domains

1. **Domain 1: Logic & Spatial Reasoning**
   - 3x3 Rubik's Cube WebGL Solver 3D (Two-Phase CFOP algorithm, interactive facelet painting, scramble engine, 3D orbit controls).
   - Glass Chess Strategies & Master Moves (High-contrast obsidian/crystal pieces, opening theory, algebraic notation telemetry).

2. **Domain 2: Numerical Intelligence**
   - Trachtenberg Speed Mental Calculation drills.
   - Vedic Mathematics crosswise multiplication matrix.

3. **Domain 3: Data Structures & Algorithms (DSA)**
   - 20-Topic Comprehensive Curriculum Tree with 100 curated problems.
   - Integrated Code Execution Sandbox with multi-language support (C++, Java, Python).

4. **Domain 4: Sample Papers (Global Examinations)**
   - Standardized international assessment suites: JLPT (N5 to N1), IELTS Academic & General, TOEFL iBT, and Goethe-Zertifikat.
   - Timed interactive practice runners with question navigation and scoring benchmarks.

5. **Domain 5: Music & Acoustics**
   - 3D Interactive Guitar Chord Voicing Laboratory (Acoustic & Electric strings).
   - Interactive Fretboard Harmony and interval theory matrix.

6. **Domain 6: Wisdom & Lore**
   - Classical Philosophical Compendium with Socratic dialogues.
   - Mythological Archetypes and Jungian psychological models.

7. **Domain 7: Cryptography & Security**
   - Classical ciphers and frequency analysis cryptanalysis studio.
   - Asymmetric RSA/AES key exchange simulations and SHA-256 hash trees.
   - Zero-Knowledge Proof (ZK-SNARK) demonstration environments.

8. **Domain 8: Wealth Engineering (INR) & Quantitative Finance**
   - INR Wealth Growth Simulator: Dynamic comparison between SIP mutual fund accumulation (Large, Mid, Small Cap) and active equity trading.
   - Discounted Cash Flow (DCF) Valuation & WACC sensitivity matrix.
   - Black-Scholes Options Pricing visualizer and The Greeks sensitivity telemetry.
   - Modern Portfolio Theory (MPT) asset allocation simulator and Efficient Frontier curve.
   - Algorithmic trading backtesting and risk metrics (Value at Risk / Sharpe Ratio).

9. **Domain 9: Sign Language & Gestural Linguistics**
   - Real-time webcam hand tracking integration with Sage AI tutor.
   - Static fingerspelling sandbox, dynamic phrase translation HUD, and accuracy verification drills.
   - Multi-level ASL curriculum and mastery review quizzes.

10. **Domain 10: Geopolitics & Strategic Conflicts**
    - High-density Territorial & Maritime Sovereignty dispute matrix.
    - Semiconductor export restrictions, economic sanctions, and trade war trackers.
    - Verbatim diplomatic statement comparator and primary source archive.
    - Maritime energy corridors and chokepoint security analysis.

---

## Technical Stack

- **Backend**: Spring Boot 3.3.4 (Java 21), Spring Security with stateless JWT authentication, Spring Data JPA.
- **Database**: H2 In-Memory Database with console access at `/h2-console`.
- **Frontend**: Vanilla JavaScript (ES6+ modular state architecture), Tailwind CSS, Three.js WebGL rendering, OrbitControls.
- **Build System**: Apache Maven 3.9.9.

---

## Running Locally

### Prerequisites
- JDK 21+
- Apache Maven 3.9+

### Build & Run
```bash
# Package the application
mvn clean package -DskipTests

# Run the executable JAR
java -jar target/polymath-vsn-1.0.0.jar
```

Access the application in your browser at `http://localhost:8080`.
Pre-configured demo credentials: `polymath@vsn.com` / `Password123!`.
