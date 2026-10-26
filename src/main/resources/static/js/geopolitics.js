/**
 * Polymath VSN - Geopolitics & Strategic Conflicts Module (Domain 11)
 * 1. Territorial & Maritime Sovereignty Disputes (Conflict Matrix Cards)
 * 2. Economic Sanctions & Tech Trade Wars (Policy Simulator & Entity Tracker)
 * 3. Diplomatic Clashes & Verbatim Statement Archives (Side-by-Side Comparator)
 * 4. Resource Security & Energy Corridors (Maritime Chokepoint Analyzer)
 * 
 * Strict enterprise design: cream/beige canvas, dark espresso accents, zero emojis.
 */

window.GEOPOLITICS_MODULE = (function() {
  'use strict';

  // ============================================================
  // 1. DATA REPOSITORIES
  // ============================================================

  // 1.1 Territorial & Maritime Disputes
  const DISPUTES_DATA = [
    {
      id: 'south-china-sea',
      theater: 'indo-pacific',
      title: 'South China Sea & First Island Chain',
      claimants: 'PRC, Philippines, Vietnam, Malaysia, Taiwan, Brunei (US FONOP Operations)',
      status: 'Active Gray-Zone Standoff',
      statusClass: 'bg-rose-100 text-rose-800 border-rose-300',
      strategicCore: 'Maritime highway carrying $3.37 Trillion in annual commercial trade (over 30% of global maritime freight) and 11 billion barrels of estimated oil reserves. Encompasses critical deep-water submarine trenches connecting the Pacific to the Indian Ocean through the Luzon Strait. Sovereignty over features dictates the perimeter of the First Island Chain and access to deep-water bastions for ballistic missile submarines (SSBNs).',
      opposingStances: [
        {
          actor: 'People\'s Republic of China (Beijing)',
          doctrine: 'Nine-Dash Line / Ten-Dash Line Historical Rights',
          points: [
            'Claims sovereignty over the Paracel (Xisha) and Spratly (Nansha) archipelagos based on continuous historical discovery and administration.',
            'Deploys China Coast Guard (CCG) and Maritime Militia to enforce administrative control at Second Thomas Shoal (Ayungin) and Scarborough Shoal (Panatag).',
            'Categorically rejects the 2016 Permanent Court of Arbitration ruling as null, void, and non-binding.'
          ]
        },
        {
          actor: 'Republic of the Philippines & Southeast Asian Littorals',
          doctrine: 'UNCLOS 1982 & 2016 Hague Arbitral Award',
          points: [
            'Asserts exclusive sovereign rights within the 200-nautical-mile Exclusive Economic Zone (EEZ) under UNCLOS Part V.',
            'Relies on the 2016 PCA landmark ruling (PCA Case 2013-19) that concluded low-tide elevations and submerged banks cannot generate territorial seas.',
            'Maintains military outpost on the grounded BRP Sierra Madre; backed by the 1951 US-Philippines Mutual Defense Treaty (MDT).'
          ]
        }
      ],
      catalyst: '1947 Republic of China eleven-dash line map; absence of explicit territorial allocation in the 1951 San Francisco Peace Treaty; 1994 Chinese construction of wooden stilt structures on Mischief Reef; 1999 deliberate grounding of BRP Sierra Madre.',
      unLegalBasis: 'UNCLOS 1982 Articles 13, 60, 121; PCA Case No. 2013-19 (Philippines v. China, July 12, 2016).',
      coordinates: '9.9° N, 115.5° E (Spratly Complex)',
      riskLevel: 'Critical'
    },
    {
      id: 'taiwan-strait',
      theater: 'indo-pacific',
      title: 'Taiwan Strait & Semiconductor Hegemony',
      claimants: 'People\'s Republic of China (PRC) vs. Republic of China (ROC / Taiwan)',
      status: 'High Deterrence Posture',
      statusClass: 'bg-amber-100 text-amber-800 border-amber-300',
      strategicCore: 'Centerpiece of global semiconductor manufacturing: Taiwan manufactures over 60% of all foundry microchips and over 90% of advanced sub-3nm nodes (TSMC). Strategically commands the central maritime corridor between Northeast Asia and Southeast Asia, vital for energy transit to Japan and South Korea. Geopolitically forms the fulcrum of the First Island Chain.',
      opposingStances: [
        {
          actor: 'Beijing (PRC)',
          doctrine: 'One China Principle & Anti-Secession Law',
          points: [
            'Regards Taiwan as a renegade province and an indivisible portion of sovereign Chinese territory; non-peaceful means authorized under the 2005 Anti-Secession Law.',
            'Denies the existence of an international maritime median line in the Taiwan Strait, conducting regular air/naval encirclement operations (Joint Sword series).',
            'Insists UN General Assembly Resolution 2758 settled Taiwan\'s international political status once and for all.'
          ]
        },
        {
          actor: 'Taipei (ROC) & Western Partners',
          doctrine: 'Democratic Status Quo & Asymmetric Porcupine Defense',
          points: [
            'Maintains that the ROC and PRC are not subordinate to one another; the future of Taiwan must be determined by its 23.5 million democratic citizens.',
            'Adopts the Overall Defense Concept (ODC): mobile anti-ship missiles, coastal mines, resilient grid communications, and civil defense.',
            'United States executes strategic ambiguity under the Taiwan Relations Act (PL 96-8) and the Six Assurances, opposing unilateral change to status quo by force.'
          ]
        }
      ],
      catalyst: '1949 Chinese Civil War retreat of the Nationalist Government to Taiwan; 1971 UNGA Resolution 2758; 1979 US diplomatic normalization with Beijing paired with congressional passage of the Taiwan Relations Act.',
      unLegalBasis: 'UNGA Resolution 2758 (1971); 1979 Taiwan Relations Act; US-PRC Three Joint Communiques (1972, 1979, 1982).',
      coordinates: '24.0° N, 119.5° E (Strait Median Axis)',
      riskLevel: 'Severe'
    },
    {
      id: 'arctic-lomonosov',
      theater: 'polar-arctic',
      title: 'Arctic Lomonosov Ridge & Northern Sea Route',
      claimants: 'Russian Federation, Canada, Denmark (Greenland), Norway, United States',
      status: 'Militarized Legal Contestation',
      statusClass: 'bg-blue-100 text-blue-800 border-blue-300',
      strategicCore: 'Control over an estimated 90 billion barrels of oil, 1,670 trillion cubic feet of natural gas (30% of undiscovered global reserves), and vast rare-earth deposits beneath the seabed. Rapidly melting polar ice enables the Northern Sea Route (NSR), which reduces maritime transit time between Rotterdam and Shanghai by 40% (18 days vs. 32 days via Suez).',
      opposingStances: [
        {
          actor: 'Russian Federation',
          doctrine: 'Extended Continental Shelf & Internal Waterways Doctrine',
          points: [
            'Submitted formal claims to the UN Commission on the Limits of the Continental Shelf (CLCS) arguing the Lomonosov and Mendeleev ridges are natural extensions of the Siberian landmass.',
            'Mandates Russian pilots and authorization for foreign vessels navigating the NSR; heavily militarized the region with Nagurskoye airbase and Arctic Trefoil outposts.',
            'Planted a rust-proof titanium flag on the Arctic seabed at 4,300 meters beneath the North Pole in 2007.'
          ]
        },
        {
          actor: 'Canada, Denmark, & United States (NATO)',
          doctrine: 'Freedom of Navigation & Competing Shelf Claims',
          points: [
            'Denmark (Greenland) and Canada lodged overlapping continental shelf submissions claiming the Lomonosov Ridge attaches to North America.',
            'The United States (non-signatory to UNCLOS but treating its navigation provisions as customary law) asserts Arctic straits are international waterways subject to transit passage.',
            'NATO initiated regular Arctic Edge exercises and opened an Arctic naval command center in Norway.'
          ]
        }
      ],
      catalyst: '2001 initial Russian CLCS submission; 2007 Arktika-2007 expedition; 2008 Ilulissat Declaration; 2022 suspension of Arctic Council operational governance following the Ukraine conflict.',
      unLegalBasis: 'UNCLOS 1982 Article 76 (Definition of Continental Shelf) & Article 234 (Ice-Covered Areas); 2008 Ilulissat Declaration.',
      coordinates: '88.5° N, 140.0° E (Central Arctic Basin)',
      riskLevel: 'Moderate-High'
    },
    {
      id: 'kashmir-loc',
      theater: 'south-asia',
      title: 'Kashmir Line of Control & Siachen Glacier',
      claimants: 'India vs. Pakistan & China (Aksai Chin / Shaksgam Valley)',
      status: 'Nuclearized Triple-Junction Standoff',
      statusClass: 'bg-rose-100 text-rose-800 border-rose-300',
      strategicCore: 'Headwaters of the Indus River basin system, sustaining agriculture and potable water for over 220 million people across South Asia. The Siachen Glacier (highest battlefield on earth at 6,000m+) overlooks the Karakoram Pass, preventing a physical linkup between Pakistani forces and Chinese forces in the Shaksgam Valley (ceded by Pakistan to China in 1963). Critical nexus for the China-Pakistan Economic Corridor (CPEC).',
      opposingStances: [
        {
          actor: 'Republic of India',
          doctrine: 'Integral Sovereign Territory & Bilateralism',
          points: [
            'Maintains that the entire princely state of Jammu & Kashmir lawfully acceded to the Indian Union in October 1947 via the Instrument of Accession.',
            'Revoked Article 370 in August 2019, bifurcating the region into Union Territories (J&K and Ladakh) to cement full constitutional integration.',
            'Rejects third-party mediation based on the 1972 Simla Agreement; insists on cessation of cross-border terrorism as a prerequisite for bilateral talks.'
          ]
        },
        {
          actor: 'Islamic Republic of Pakistan',
          doctrine: 'Self-Determination & UN Mandate',
          points: [
            'Categorizes Jammu & Kashmir as disputed territory whose final status must be decided by a UN-supervised plebiscite under UNSC Resolution 47.',
            'Opposes India\'s 2019 constitutional actions as unilateral violations of international law and UNSC resolutions.',
            'Directly coordinates strategic infrastructure with China along the Karakoram Highway traversing Gilgit-Baltistan.'
          ]
        }
      ],
      catalyst: '1947 Partition and tribal invasion; 1948 Indo-Pakistani War; 1949 Karachi Ceasefire Agreement terminating coordinates at Point NJ9842; 1972 Simla Agreement establishing the LoC; 1984 Indian military deployment in Operation Meghdoot.',
      unLegalBasis: 'UNSC Resolutions 38, 39, 47 (1948); 1949 Karachi Agreement; 1972 Simla Agreement.',
      coordinates: '35.5° N, 77.0° E (Siachen Ridge)',
      riskLevel: 'High'
    },
    {
      id: 'essequibo-basin',
      theater: 'latin-america',
      title: 'Essequibo Basin & Guiana Shield',
      claimants: 'Co-operative Republic of Guyana vs. Bolivarian Republic of Venezuela',
      status: 'Territorial Annexation Threats',
      statusClass: 'bg-amber-100 text-amber-800 border-amber-300',
      strategicCore: 'Encompasses 159,500 square kilometers (approx. 74% of Guyana\'s recognized sovereign landmass) and vast mineral wealth (gold, diamonds, bauxite). The adjacent offshore Stabroek Block contains over 11 billion barrels of high-grade sweet crude oil discovered by ExxonMobil, propelling Guyana into one of the fastest-growing economies per capita globally.',
      opposingStances: [
        {
          actor: 'Venezuela (Caracas)',
          doctrine: '1966 Geneva Agreement & Historical Revocation',
          points: [
            'Declares the 1899 Paris Arbitral Award null and void due to alleged Anglo-Russian collusion revealed posthumously in the Mallet-Prevost memorandum.',
            'Demands bilateral negotiations based on the 1966 Geneva Agreement; held a national referendum in December 2023 creating the provisional state of "Guayana Esequiba".',
            'Deployed naval flotillas to contest offshore exploration concessions granted by Georgetown.'
          ]
        },
        {
          actor: 'Guyana (Georgetown) & CARICOM / US',
          doctrine: '1899 Paris Arbitral Award & ICJ Jurisdiction',
          points: [
            'Holds the 1899 Paris Award to be a full, perfect, and definitive settlement of the border, acquiesced to by Venezuela for over six decades.',
            'Filed proceedings before the International Court of Justice (ICJ) in 2018 seeking a binding judicial confirmation of the 1899 boundary line.',
            'Conducted joint military exercises with the United States Southern Command (SOUTHCOM) to deter territorial encroachment.'
          ]
        }
      ],
      catalyst: '1899 Paris Tribunal of Arbitration; 1962 Venezuelan memorandum to the UN; 1966 Geneva Agreement signed immediately prior to Guyanese independence; 2015 ExxonMobil Liza-1 deepwater discovery.',
      unLegalBasis: '1899 Paris Arbitral Award; 1966 Geneva Agreement; ICJ Order on Provisional Measures (Dec 1, 2023).',
      coordinates: '6.5° N, 59.5° W (Essequibo Basin)',
      riskLevel: 'Moderate'
    },
    {
      id: 'suwalki-corridor',
      theater: 'eastern-europe',
      title: 'Suwalki Gap & Kaliningrad Exclave',
      claimants: 'Republic of Poland & Republic of Lithuania (NATO) vs. Russian Federation & Belarus',
      status: 'Critical NATO Vulnerability Corridor',
      statusClass: 'bg-rose-100 text-rose-800 border-rose-300',
      strategicCore: 'A 65-mile (104 km) narrow strip of land along the Polish-Lithuanian border. Represents the sole land connection linking the three Baltic NATO republics (Estonia, Latvia, Lithuania) to the European continental NATO alliance. Wedged directly between the heavily militarized Russian Kaliningrad exclave (home of the Baltic Fleet and Iskander-M missile systems) and Belarus.',
      opposingStances: [
        {
          actor: 'NATO Alliance (Warsaw & Vilnius)',
          doctrine: 'Forward Defense & Enhanced Vigilance Activity',
          points: [
            'Considers the corridor the most critical vulnerability in NATO\'s eastern flank; vulnerable to a rapid pincer offensive severing the Baltics in a conflict.',
            'Stationed multinational NATO Enhanced Forward Presence (eFP) battle groups across the Baltics and Poland; established permanent US Army V Corps presence.',
            'Enforces EU sanctions restrictions on sanctioned goods transiting by rail through Lithuania into Kaliningrad.'
          ]
        },
        {
          actor: 'Russian Federation & Republic of Belarus',
          doctrine: 'Strategic Access & Exclave Protection',
          points: [
            'Maintains anti-access/area-denial (A2/AD) missile bubbles (S-400, Bastion-P, Iskander-M) within Kaliningrad to neutralize Baltic airspace.',
            'Views Lithuanian rail transit restrictions on sanctioned industrial cargo as an illegal commercial blockade of sovereign Russian territory.',
            'Conducts joint Union State military exercises (Zapad maneuvers) simulating the rapid securing of the logistical land bridge.'
          ]
        }
      ],
      catalyst: '1945 Potsdam Conference awarding northern East Prussia (Königsberg) to the USSR; 1991 Soviet dissolution leaving Kaliningrad geographically severed; 2004 Baltic NATO accession.',
      unLegalBasis: '1945 Potsdam Agreement; 1990 Treaty on the Final Settlement with Respect to Germany; 1997 NATO-Russia Founding Act.',
      coordinates: '54.2° N, 23.3° E (Polish-Lithuanian Border)',
      riskLevel: 'Severe'
    }
  ];

  // 1.2 Primary Source Diplomatic Statements (Quote Comparator)
  const DIPLOMATIC_CASES = [
    {
      id: 'taiwan-strait-2758',
      title: 'Taiwan Strait Legal Status & UN Resolution 2758',
      actors: ['People\'s Republic of China (Beijing)', 'United States (Washington)'],
      forum: 'UN General Assembly & Bilateral State Statements',
      year: '2022 - 2024',
      sideA: {
        actor: 'PRC Ministry of Foreign Affairs (Wang Yi)',
        date: 'September 2022 / June 2024',
        citation: 'Address to the 77th UNGA Plenary & MFA Official Press Briefing',
        verbatimQuote: 'There is only one China in the world, Taiwan is an inalienable part of China’s territory, and the Government of the People’s Republic of China is the sole legal government representing the whole of China. UN General Assembly Resolution 2758, adopted in 1971, thoroughly resolved the issue of representation of the whole of China, including Taiwan, in the United Nations. It completely blocked anyone, any country, or any force from creating "two Chinas" or "one China, one Taiwan". Any attempt to challenge this principle will inevitably be crushed by the historic tide of national reunification.',
        stanceCategory: 'Revisionist & Sovereign Absolutism',
        keyTerms: ['Inalienable Territory', 'UNGA Resolution 2758', 'Sole Legal Government', 'National Reunification']
      },
      sideB: {
        actor: 'US Department of State & National Security Council (Antony Blinken)',
        date: 'October 2022 / May 2024',
        citation: 'Official State Department Press Statement & G7 Foreign Ministers Communiqué',
        verbatimQuote: 'The United States remains committed to our One China policy, which is guided by the Taiwan Relations Act, the three Joint Communiqués, and the Six Assurances. UN General Assembly Resolution 2758 does not constitute the UN’s adoption of an official position on the political status of Taiwan. The resolution addresses only the representation of China at the UN and makes no reference to Taiwan’s sovereignty or its people. The United States opposes any unilateral changes to the status quo from either side and affirms that international law guarantees freedom of navigation and overflight through the Taiwan Strait.',
        stanceCategory: 'Rules-Based Legalism & Strategic Ambiguity',
        keyTerms: ['One China Policy', 'Taiwan Relations Act', 'Status Quo', 'International Waters / High Seas Freedom']
      },
      semanticAnalysis: 'Beijing interprets Resolution 2758 expansively as an international endorsement of its sovereign claim over Taiwan\'s territory. Washington counters strictly by textual analysis: UNGA 2758 only unseated the representatives of Chiang Kai-shek and assigned China\'s seat to Beijing, without using the word "Taiwan" once in its operational paragraphs.'
    },
    {
      id: 'nato-expansion-security',
      title: 'European Security Architecture & NATO Expansion',
      actors: ['Russian Federation (Moscow)', 'NATO Alliance (Brussels / Washington)'],
      forum: 'Kremlin Security Council & NATO Summit Declarations',
      year: '2021 - 2024',
      sideA: {
        actor: 'President of the Russian Federation (Vladimir Putin)',
        date: 'December 2021 & February 2022',
        citation: 'Draft Security Guarantees Treaty & Address on National Security',
        verbatimQuote: 'You promised us in the 1990s that NATO would not expand a single inch to the East. You brazenly deceived us. We have made it clear that any further NATO expansion to the East is unacceptable. Is it us who are putting missiles near the borders of the United States? No, it is the United States and its alliance that have brought their weapons to our doorstep. The principle of indivisible security, enshrined in the 1999 Istanbul Charter, explicitly states that no state may enhance its own security at the expense of the security of other states.',
        stanceCategory: 'Historical Grievance & Spheres of Influence',
        keyTerms: ['Indivisible Security', 'Broken Promises', 'Red Lines', 'Strategic Buffer']
      },
      sideB: {
        actor: 'NATO Secretary General (Jens Stoltenberg)',
        date: 'January 2022 & July 2023',
        citation: 'Official NATO Council Response & Vilnius Summit Communiqué',
        verbatimQuote: 'NATO is a defensive alliance that threatens no nation. Every sovereign nation in Europe has the fundamental right to choose its own security arrangements, foreign policy, and alliances, as reaffirmed by the 1975 Helsinki Final Act and the 1990 Charter of Paris. Russia cannot have a sphere of influence and possesses no veto right over sovereign decisions taken by independent European democracies under Article 10 of the Washington Treaty. NATO’s open door has brought peace, stability, and democracy to millions across Europe.',
        stanceCategory: 'Sovereign Self-Determination & Open Door Norms',
        keyTerms: ['Article 10 Open Door', 'Helsinki Final Act', 'No Veto Rights', 'Defensive Alliance']
      },
      semanticAnalysis: 'Russia invokes the principle of "indivisible security" (codified in the 1999 OSCE Istanbul Charter) to argue that NATO expansion degrades Russian survival parity. NATO anchors its position in the Helsinki Final Act\'s principle of sovereign autonomy, arguing that buffer zones and non-expansion agreements constitute obsolete 19th-century imperial spheres of influence.'
    },
    {
      id: 'himalayan-lac-disengagement',
      title: 'Himalayan Boundary Disengagement & Bilateral Relations',
      actors: ['Republic of India (New Delhi)', 'People\'s Republic of China (Beijing)'],
      forum: 'Raisina Dialogue & SCO Foreign Ministers Summit',
      year: '2022 - 2024',
      sideA: {
        actor: 'Minister of External Affairs, India (Dr. S. Jaishankar)',
        date: 'August 2022 / March 2024',
        citation: 'Chatham House Address & MEA Annual Policy Statement',
        verbatimQuote: 'The state of the border will determine the state of the relationship. Peace and tranquility along the Line of Actual Control is the foundational basis for bilateral ties. You cannot disrupt the border, amass tens of thousands of troops in violation of written agreements signed in 1993 and 1996, and then say, "let us normalize trade, tourism, and investment as if nothing has occurred." Normalcy cannot be decoupled from full disengagement, de-escalation, and restoration of the status quo ante.',
        stanceCategory: 'Reciprocal Linkage & Status Quo Restoration',
        keyTerms: ['Peace and Tranquility', '1993/1996 Agreements', 'Status Quo Ante', 'Direct Linkage']
      },
      sideB: {
        actor: 'PRC Ministry of Foreign Affairs (Wang Yi & Spokespersons)',
        date: 'September 2022 / July 2024',
        citation: 'MFA Readout of Bilateral Meeting & Diplomatic Briefing',
        verbatimQuote: 'The China-India boundary dispute is a legacy of history. Both sides should place the boundary question in an appropriate position in overall bilateral relations, and avoid letting specific differences interfere with the broader trend of bilateral cooperation. China and India are two ancient civilizations and emerging economies; we should be partners who help each other succeed rather than rivals who undermine one another. The border situation is generally stable, and differences should be resolved through established border negotiation mechanisms.',
        stanceCategory: 'Compartmentalization & Economic Decoupling',
        keyTerms: ['Appropriate Position', 'Legacy of History', 'Mutual Cooperation', 'Stable and Controllable']
      },
      semanticAnalysis: 'India insists on a strict linkage strategy: without military de-escalation and disengagement along the LAC, broader political and economic relations remain chilled. China pursues a compartmentalization strategy, attempting to sideline the territorial standoff while resuming full access to India\'s vast consumer, technology, and manufacturing markets.'
    },
    {
      id: 'strait-of-hormuz-transit',
      title: 'Strait of Hormuz Freedom of Transit vs. Coastal Sovereignty',
      actors: ['Islamic Republic of Iran (Tehran)', 'United States Fifth Fleet (Bahrain / USCENTCOM)'],
      forum: 'UN Security Council Letters & USCENTCOM Operational Advisories',
      year: '2023 - 2024',
      sideA: {
        actor: 'IRGC Navy Commander & Iranian Foreign Ministry',
        date: 'April 2023 / January 2024',
        citation: 'Official Statements to IRNA & Diplomatic Protest to IMO',
        verbatimQuote: 'The Strait of Hormuz is situated within the territorial and contiguous waters of the Islamic Republic of Iran. Iran is the principal guarantor of security in the Persian Gulf. Foreign naval vessels that fail to observe innocent passage regulations, conduct espionage, or facilitate the illegal enforcement of unilateral coercive economic sanctions against the Iranian nation forfeit their rights under maritime law. If Iranian petroleum exports are completely obstructed, the security of the waterway for all maritime traffic will become unsustainable.',
        stanceCategory: 'Asymmetric Maritime Leverage & Coercive Deterrence',
        keyTerms: ['Territorial Waters', 'Innocent Passage', 'Guarantor of Security', 'Retaliatory Closure']
      },
      sideB: {
        actor: 'Commander, US Naval Forces Central Command / Fifth Fleet',
        date: 'May 2023 / February 2024',
        citation: 'International Maritime Security Construct (IMSC) Operational Directive',
        verbatimQuote: 'The Strait of Hormuz is an international strait recognized under the United Nations Convention on the Law of the Sea. All merchant vessels and state-owned ships enjoy the unimpeded right of transit passage, which cannot be suspended, hampered, or impeded under any circumstances during peacetime. Iran’s unlawful seizures of commercial tankers, boarding actions via armed helicopters, and harassment of maritime traffic violate established international law and undermine global economic stability. U.S. and coalition forces will deter aggression and protect critical shipping corridors.',
        stanceCategory: 'Transit Passage Absolute Enforcement & Freedom of Navigation',
        keyTerms: ['Transit Passage', 'International Strait', 'Unlawful Seizure', 'IMSC Coalition']
      },
      semanticAnalysis: 'Iran views the passage through its 12-nautical-mile territorial waters as subject to regulatory permission and innocent passage rules (which allow states to restrict ships deemed prejudicial to peace). The US and coalition partners maintain that Hormuz is an international strait governed by "transit passage" (UNCLOS Part III), a non-suspendable right granting full navigational freedom equivalent to high seas passage.'
    }
  ];

  // 1.3 Strategic Maritime & Energy Chokepoints
  const CHOKEPOINTS_DATA = [
    {
      id: 'strait-of-hormuz',
      name: 'Strait of Hormuz',
      location: 'Between Iran and Oman (Connecting Persian Gulf to Gulf of Oman)',
      widthMin: '21 Nautical Miles (Shipping Lanes: 2 miles each way with 2-mile buffer)',
      dailyVolume: '20.5 - 21.0 Million Barrels/Day (Petroleum & Condensates)',
      globalShare: 'Approx. 21% of total global petroleum consumption; 20% of global LNG trade (Qatar)',
      vulnerabilities: [
        'Iranian shoreline equipped with shore-to-ship anti-ship cruise missiles (Noor, Qader), drone swarms, and fast attack craft.',
        'Shallow waters suitable for covert naval sea-mining (EM-52 influence mines).',
        'Lack of alternative bypass pipeline capacity: only Saudi East-West pipeline (5M bpd) and UAE Habshan-Fujairah pipeline (1.5M bpd) can bypass Hormuz.'
      ],
      economicImpactIfClosed: 'Crude oil benchmark (Brent) projected to surge immediately past $150-$180/bbl; instant maritime insurance freeze across Persian Gulf.',
      annualTransits: 'Approx. 13,000 tankers annually'
    },
    {
      id: 'strait-of-malacca',
      name: 'Strait of Malacca',
      location: 'Between Peninsular Malaysia, Indonesia (Sumatra), and Singapore',
      widthMin: '1.5 Nautical Miles at Phillips Channel (Singapore Strait bottleneck)',
      dailyVolume: '16.0 - 17.0 Million Barrels/Day (Crude Oil) + 94,000 vessels annually',
      globalShare: 'Approx. 25% of all global seaborne traded merchandise; 80% of China’s maritime crude oil imports ("Malacca Dilemma")',
      vulnerabilities: [
        'Extreme nautical congestion and shallow depth (25m maximum draft / Malaccamax threshold).',
        'High vulnerability to maritime accidents, groundings, and localized piracy in the Riau Archipelago.',
        'Vulnerable to naval blockade during high-end conflict, cutting off Northeast Asian industrial supply chains.'
      ],
      economicImpactIfClosed: 'Forced diversion via Sunda Strait or Lombok-Makassar Strait adds 3 to 5 steaming days, increases global container freight rates by 35-50%, and causes severe regional fuel shortages.',
      annualTransits: 'Approx. 94,000 commercial vessels annually'
    },
    {
      id: 'bab-el-mandeb',
      name: 'Bab el-Mandeb & Red Sea Corridor',
      location: 'Between Djibouti / Eritrea (Horn of Africa) and Yemen (Arabian Peninsula)',
      widthMin: '18 Nautical Miles (Two 2-mile navigation channels separated by Perim Island)',
      dailyVolume: '7.0 - 8.5 Million Barrels/Day + 12% of global seaborne trade volume',
      globalShare: 'Sole southern maritime gate to the Suez Canal; critical conduit for European-Asian manufactured goods and fuel',
      vulnerabilities: [
        'Yemeni littoral controlled by Ansar Allah (Houthi movement) deploying anti-ship ballistic missiles (ASBMs), one-way attack drones, and unmanned surface vessels (USVs).',
        'Proximity of commercial shipping lanes to shore-based radar and coastal launching sites (less than 15-30 miles).',
        'Mass diversion of major container carriers (Maersk, MSC, Hapag-Lloyd) around the Cape of Good Hope.'
      ],
      economicImpactIfClosed: 'Cape of Good Hope rerouting adds 10 to 14 days and 3,500 nautical miles per voyage; increases fuel consumption by 30-40%; adds $1.5M-$2M in round-trip operating expenses per ultra-large container ship.',
      annualTransits: 'Approx. 23,000 vessels annually (prior to Red Sea crisis)'
    },
    {
      id: 'turkish-straits',
      name: 'Turkish Straits (Bosphorus & Dardanelles)',
      location: 'Connecting the Black Sea to the Sea of Marmara and the Aegean / Mediterranean',
      widthMin: '700 Meters at narrowest point in Bosphorus (Istanbul)',
      dailyVolume: '3.0 - 3.5 Million Barrels/Day (Russian and Caspian crude) + 25% of global wheat exports',
      globalShare: 'Sole maritime egress for Black Sea states (Russia, Ukraine, Romania, Bulgaria, Georgia)',
      vulnerabilities: [
        'Regulated under the 1936 Montreux Convention: Turkey exercises sovereign authority to close the straits to belligerent warships during wartime (invoked in 2022).',
        'Extremely tortuous navigation, heavy civilian urban ferry traffic, and dense population centers directly lining the channel walls.'
      ],
      economicImpactIfClosed: 'Severe global grain supply shock and paralysis of Kazakh/Caspian CPC pipeline oil export terminals at Novorossiysk.',
      annualTransits: 'Approx. 40,000 vessels annually'
    },
    {
      id: 'panama-canal',
      name: 'Panama Canal',
      location: 'Isthmus of Panama connecting the Atlantic (Caribbean Sea) to the Pacific Ocean',
      widthMin: 'Locks: 33.5m (Panamax) / 55m (Neopanamax locks)',
      dailyVolume: 'Approx. 5% of global maritime commerce; 40% of all US container ship traffic',
      globalShare: 'Critical artery for US Gulf Coast Liquefied Natural Gas (LNG) and grain exports to East Asia',
      vulnerabilities: [
        'Dependent entirely on freshwater reservoirs (Gatun Lake and Alajuela Lake); prolonged climate droughts reduce daily transit slots from 36+ to fewer than 24.',
        'Draft restrictions force container ships to reduce cargo capacity by 20-30% to avoid grounding.',
        'High waiting queue times forcing diversion around Cape Horn or via the Suez Canal.'
      ],
      economicImpactIfClosed: 'Adds 8,000 nautical miles and 21 transit days via Cape Horn for US East Coast-to-Asia routes, creating acute bottlenecks in global LNG and agricultural trade.',
      annualTransits: 'Approx. 13,000 - 14,000 vessels annually'
    }
  ];

  // 1.4 Critical Mineral Supply Chain Dependencies
  const CRITICAL_MINERALS = [
    {
      mineral: 'Gallium & Germanium',
      useCase: 'Advanced radar systems (AESA), compound semiconductors (GaAs/GaN), fiber optics, infrared night vision',
      refiningConcentration: 'PRC: 85-98% of global refined output',
      chokeAction: 'China Ministry of Commerce export licensing restrictions enacted in August 2023 requiring dual-use authorization',
      redundancyLeadTime: '3 to 5 years (smelter bauxite by-product extraction facilities in Europe/North America)'
    },
    {
      mineral: 'Antimony',
      useCase: 'Ammunition primers, armor-piercing munitions, flame retardants, military infrared optics, lead-acid batteries',
      refiningConcentration: 'PRC: 48-60% of global mine supply and 70% of refined smelting capacity',
      chokeAction: 'Beijing export quotas and ban on exports to unauthorized foreign military defense contractors (Sept 2024)',
      redundancyLeadTime: '4 to 6 years (Stibnite mining and environmental permitting timelines in the US and Australia)'
    },
    {
      mineral: 'Lithium (Battery Grade)',
      useCase: 'Electric mobility, grid-scale energy storage, military tactical battery packs',
      refiningConcentration: 'Extraction: Australia (Hard rock) & Chile/Argentina (Brine); Refining: PRC 65-75%',
      chokeAction: 'Nationalization of reserves in Latin America; refining bottleneck monopolies in East Asia',
      redundancyLeadTime: '4 to 7 years (direct lithium extraction DLE plants and Western refining hubs)'
    },
    {
      mineral: 'Rare Earth Elements (NdFeB Magnets)',
      useCase: 'Permanent magnets for F-35 fighter jet generators, Virginia-class submarine drive motors, wind turbines',
      refiningConcentration: 'PRC: 70% of mining, 90% of magnet-grade chemical separation and sintering',
      chokeAction: 'Export control lists on heavy rare-earth separation technology and intellectual property',
      redundancyLeadTime: '5 to 8 years (complex radioactive thorium/uranium separation chemistry infrastructure)'
    }
  ];

  // ============================================================
  // 2. STATE MANAGEMENT
  // ============================================================

  const state = {
    // Sub-Skill 1: Territorial Disputes
    disputeFilter: 'all',
    disputeSearch: '',
    selectedDisputeId: 'south-china-sea',

    // Sub-Skill 2: Sanctions Simulator
    sanctionSector: 'semiconductors',
    sanctionSeverity: 2, // 1: Mild, 2: Spec Control, 3: Total Secondary Ban
    tariffRate: 25,
    enforcementScope: 'multilateral',

    // Sub-Skill 3: Diplomatic Comparator
    selectedCaseId: 'taiwan-strait-2758',
    comparatorSearch: '',

    // Sub-Skill 4: Chokepoints
    selectedChokepointId: 'strait-of-hormuz',
    simulatedChokepointThrottle: 40 // % reduction in transit capacity
  };

  // ============================================================
  // 3. INITIALIZATION & ROUTING
  // ============================================================

  function init() {
    renderDisputesGrid();
    renderSanctionsSimulator();
    renderDiplomaticComparator();
    renderChokepointWorkspace();
    setupEventListeners();
  }

  function initView(viewName) {
    if (viewName === 'geopolitics-territorial') {
      renderDisputesGrid();
    } else if (viewName === 'geopolitics-sanctions') {
      renderSanctionsSimulator();
    } else if (viewName === 'geopolitics-diplomacy') {
      renderDiplomaticComparator();
    } else if (viewName === 'geopolitics-chokepoints') {
      renderChokepointWorkspace();
    }
  }

  function setupEventListeners() {
    // Dispute search
    const disputeSearchInput = document.getElementById('geopolitics-dispute-search');
    if (disputeSearchInput) {
      disputeSearchInput.addEventListener('input', (e) => {
        state.disputeSearch = e.target.value.toLowerCase().trim();
        renderDisputesGrid();
      });
    }

    // Comparator case select
    const caseSelect = document.getElementById('geopolitics-case-select');
    if (caseSelect) {
      caseSelect.addEventListener('change', (e) => {
        state.selectedCaseId = e.target.value;
        renderDiplomaticComparator();
      });
    }
  }

  // ============================================================
  // 4. SUB-SKILL 1: CONFLICT MATRIX CARDS
  // ============================================================

  function setDisputeFilter(theater) {
    state.disputeFilter = theater;
    document.querySelectorAll('.dispute-filter-btn').forEach(btn => {
      if (btn.dataset.theater === theater) {
        btn.classList.add('bg-[#2C221E]', 'text-white', 'shadow-sm');
        btn.classList.remove('bg-white', 'text-[#3E3632]');
      } else {
        btn.classList.remove('bg-[#2C221E]', 'text-white', 'shadow-sm');
        btn.classList.add('bg-white', 'text-[#3E3632]');
      }
    });
    renderDisputesGrid();
  }

  function renderDisputesGrid() {
    const container = document.getElementById('conflict-matrix-grid');
    if (!container) return;

    let filtered = DISPUTES_DATA;
    if (state.disputeFilter !== 'all') {
      filtered = filtered.filter(item => item.theater === state.disputeFilter);
    }
    if (state.disputeSearch) {
      filtered = filtered.filter(item =>
        item.title.toLowerCase().includes(state.disputeSearch) ||
        item.claimants.toLowerCase().includes(state.disputeSearch) ||
        item.strategicCore.toLowerCase().includes(state.disputeSearch)
      );
    }

    if (filtered.length === 0) {
      container.innerHTML = `
        <div class="col-span-full p-8 text-center bg-white rounded-2xl border border-[#EAE3D9]">
          <div class="text-xs font-bold text-[#1C1613]">No Strategic Standoffs Found</div>
          <p class="text-[11px] text-[#7C7067] mt-1">Refine your search keyword or reset regional theater filters.</p>
        </div>
      `;
      return;
    }

    container.innerHTML = filtered.map(dispute => `
      <div class="polymath-card p-6 bg-white border border-[#EAE3D9] rounded-2xl flex flex-col justify-between hover:shadow-md transition-all">
        <div>
          <!-- Ribbon & Status -->
          <div class="flex items-center justify-between gap-2 mb-3">
            <span class="px-2.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider font-mono ${dispute.statusClass} border">
              ${dispute.status}
            </span>
            <span class="text-[11px] font-mono text-[#7C7067]">
              Risk: <strong class="text-[#2C221E]">${dispute.riskLevel}</strong>
            </span>
          </div>

          <!-- Title & Claimants -->
          <h3 class="text-base font-bold text-[#1C1613] tracking-tight">${dispute.title}</h3>
          <div class="text-[11px] text-[#7C7067] font-medium mt-0.5">
            <strong>Claimants:</strong> ${dispute.claimants}
          </div>

          <!-- SECTION 1: STRATEGIC CORE -->
          <div class="mt-4 p-3.5 rounded-xl bg-[#FDFBF7] border border-[#EAE3D9]">
            <div class="text-[10px] font-bold uppercase tracking-wider text-[#2C221E] mb-1 flex items-center justify-between">
              <span>Strategic Core &amp; Value</span>
              <span class="font-mono text-[9px] text-[#7C7067]">${dispute.coordinates}</span>
            </div>
            <p class="text-xs text-[#4E4038] leading-relaxed">
              ${dispute.strategicCore}
            </p>
          </div>

          <!-- SECTION 2: OPPOSING STANCES -->
          <div class="mt-4">
            <div class="text-[10px] font-bold uppercase tracking-wider text-[#7C7067] mb-2">Opposing Sovereign Stances</div>
            <div class="space-y-2.5">
              ${dispute.opposingStances.map(stance => `
                <div class="p-3 rounded-xl bg-white border border-[#EAE3D9] text-xs">
                  <div class="font-bold text-[#1C1613] text-xs flex items-center justify-between">
                    <span>${stance.actor}</span>
                    <span class="text-[10px] font-mono text-[#7C7067] font-normal">${stance.doctrine}</span>
                  </div>
                  <ul class="mt-1.5 space-y-1 list-disc pl-4 text-[11px] text-[#5C524C]">
                    ${stance.points.map(pt => `<li>${pt}</li>`).join('')}
                  </ul>
                </div>
              `).join('')}
            </div>
          </div>

          <!-- SECTION 3: HISTORICAL CATALYST -->
          <div class="mt-4 p-3 rounded-xl bg-[#F7F4EF] border border-[#EAE3D9] text-xs">
            <span class="text-[10px] font-bold uppercase tracking-wider text-[#7C7067] block mb-1">Historical Catalyst &amp; Treaty Nexus</span>
            <p class="text-[11px] text-[#5C524C] leading-relaxed">
              ${dispute.catalyst}
            </p>
            <div class="mt-2 text-[10px] font-mono text-[#7C7067] border-t border-[#EAE3D9] pt-1.5">
              <strong>Legal Benchmark:</strong> ${dispute.unLegalBasis}
            </div>
          </div>
        </div>

        <!-- Detail Action Button -->
        <div class="mt-5 pt-3 border-t border-[#EAE3D9] flex items-center justify-between">
          <button type="button" onclick="window.GEOPOLITICS_MODULE.openDisputeModal('${dispute.id}')" class="w-full py-2 px-3 rounded-lg bg-[#2C221E] text-white hover:bg-[#4E4038] font-bold text-xs transition-colors cursor-pointer text-center shadow-sm">
            Examine Deep-Dive Dossier &rarr;
          </button>
        </div>
      </div>
    `).join('');
  }

  function openDisputeModal(disputeId) {
    const dispute = DISPUTES_DATA.find(d => d.id === disputeId);
    if (!dispute) return;

    const modal = document.getElementById('geopolitics-dossier-modal');
    if (!modal) return;

    document.getElementById('modal-dossier-title').textContent = dispute.title;
    document.getElementById('modal-dossier-claimants').textContent = dispute.claimants;
    document.getElementById('modal-dossier-core').textContent = dispute.strategicCore;
    document.getElementById('modal-dossier-catalyst').textContent = dispute.catalyst;
    document.getElementById('modal-dossier-legal').textContent = dispute.unLegalBasis;
    document.getElementById('modal-dossier-coords').textContent = dispute.coordinates;

    const stancesContainer = document.getElementById('modal-dossier-stances');
    if (stancesContainer) {
      stancesContainer.innerHTML = dispute.opposingStances.map(s => `
        <div class="p-3.5 rounded-xl border border-[#EAE3D9] bg-[#FDFBF7]">
          <div class="font-bold text-xs text-[#2C221E]">${s.actor}</div>
          <div class="text-[10px] font-mono text-[#7C7067] mb-2">${s.doctrine}</div>
          <ul class="text-xs text-[#5C524C] space-y-1 list-disc pl-4">
            ${s.points.map(p => `<li>${p}</li>`).join('')}
          </ul>
        </div>
      `).join('');
    }

    modal.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
  }

  function closeDisputeModal() {
    const modal = document.getElementById('geopolitics-dossier-modal');
    if (modal) modal.classList.add('hidden');
    document.body.style.overflow = '';
  }

  // ============================================================
  // 5. SUB-SKILL 2: SANCTIONS & TECH TRADE WARS SIMULATOR
  // ============================================================

  function setSanctionSector(sector) {
    state.sanctionSector = sector;
    document.querySelectorAll('.sanction-sector-btn').forEach(btn => {
      if (btn.dataset.sector === sector) {
        btn.classList.add('bg-[#2C221E]', 'text-white', 'shadow-sm');
        btn.classList.remove('bg-white', 'text-[#3E3632]');
      } else {
        btn.classList.remove('bg-[#2C221E]', 'text-white', 'shadow-sm');
        btn.classList.add('bg-white', 'text-[#3E3632]');
      }
    });
    renderSanctionsSimulator();
  }

  function updateSanctionSeverity(level) {
    state.sanctionSeverity = parseInt(level, 10);
    renderSanctionsSimulator();
  }

  function updateTariffRate(rate) {
    state.tariffRate = parseInt(rate, 10);
    renderSanctionsSimulator();
  }

  function renderSanctionsSimulator() {
    // Sliders & inputs
    const severityLabel = document.getElementById('sanctions-severity-label');
    const severityInput = document.getElementById('sanctions-severity-slider');
    if (severityInput && severityInput.value != state.sanctionSeverity) {
      severityInput.value = state.sanctionSeverity;
    }
    if (severityLabel) {
      const labels = [
        'Level 0: Baseline Trade Tariffs (10-25%)',
        'Level 1: Targeted Entity List & License Scrutiny',
        'Level 2: Strict Multilateral Tech Export Controls (FDPR)',
        'Level 3: Comprehensive Secondary Capital Bans & Full SWIFT Freeze'
      ];
      severityLabel.textContent = labels[state.sanctionSeverity] || labels[2];
    }

    const tariffVal = document.getElementById('tariff-rate-display');
    if (tariffVal) tariffVal.textContent = `${state.tariffRate}%`;

    // Mathematical calculations for impact metrics
    const baseImpact = {
      semiconductors: 125,
      swift: 280,
      critical_minerals: 95,
      aerospace: 75
    }[state.sanctionSector] || 100;

    const mult = state.sanctionSeverity * 0.95 + (state.tariffRate / 50.0);
    const globalLossVal = Math.round(baseImpact * mult * 1.85); // $ billions
    const redundancyCostPct = Math.min(85, Math.round(14 + state.sanctionSeverity * 16.5 + state.tariffRate * 0.28));
    const circumventionRisk = Math.min(95, Math.round(25 + state.sanctionSeverity * 18.2));
    const retaliationIndex = Math.min(100, Math.round(30 + state.sanctionSeverity * 22 + (state.tariffRate * 0.4)));

    // Update Output HUD metrics
    const metricA = document.getElementById('metric-global-impact');
    if (metricA) metricA.textContent = `$${globalLossVal} Billion`;

    const metricB = document.getElementById('metric-redundancy-cost');
    if (metricB) metricB.textContent = `+${redundancyCostPct}%`;

    const metricC = document.getElementById('metric-circumvention-risk');
    if (metricC) metricC.textContent = `${circumventionRisk}% Index`;

    const metricD = document.getElementById('metric-retaliation-index');
    if (metricD) metricD.textContent = `${retaliationIndex} / 100`;

    // Narrative analysis
    const narrativeEl = document.getElementById('sanctions-narrative-output');
    if (narrativeEl) {
      let narrative = '';
      if (state.sanctionSector === 'semiconductors') {
        narrative = `Targeting advanced computing nodes (sub-14nm logic, High Bandwidth Memory HBM3e, and EUV/ArFi lithography tools via US BIS Foreign Direct Product Rule). Severity Level ${state.sanctionSeverity} with a ${state.tariffRate}% countervailing duty compels allied foundries (TSMC, ASML, Tokyo Electron) to halt servicing tool fleets in sanctioned jurisdictions. Result: Prompts accelerated indigenous R&D substitution programs, transshipment through third-party intermediaries (UAE, Southeast Asia), and retaliatory export quotas on critical precursor elements (Gallium, Germanium).`;
      } else if (state.sanctionSector === 'swift') {
        narrative = `Freezing foreign currency reserves and disconnecting major commercial banks from the SWIFT messaging protocol. Severity Level ${state.sanctionSeverity} isolates primary clearing mechanisms. Result: Drives non-dollar bilateral settlement mechanisms (e.g. CIPS, SPFS, digital currencies), commodity transactions denominated in local currencies (INR, CNY, AED), and creates shadow tanker/freight financing cartels.`;
      } else if (state.sanctionSector === 'critical_minerals') {
        narrative = `Enforcing weaponized export quotas on refined antimony, heavy rare earth elements (Dysprosium, Terbium), and battery-grade anode materials. Severity Level ${state.sanctionSeverity} triggers a severe supply bottleneck for Western defense contractors (AESA radar modules, missile guidance, and EV battery supply chains). Lead time for alternative smelting infrastructure remains 4 to 7 years.`;
      } else {
        narrative = `Restricting dual-use aerospace alloys (titanium sponge), carbon fiber composites, and aviation gas turbine maintenance parts. Drives airframe cannibalization, domestic reverse-engineering, and re-routing through Central Asian commercial conduits.`;
      }
      narrativeEl.textContent = narrative;
    }
  }

  // ============================================================
  // 6. SUB-SKILL 3: DIPLOMATIC CLASHES & VERBATIM QUOTE COMPARATOR
  // ============================================================

  function selectCase(caseId) {
    state.selectedCaseId = caseId;
    const select = document.getElementById('geopolitics-case-select');
    if (select) select.value = caseId;
    renderDiplomaticComparator();
  }

  function renderDiplomaticComparator() {
    const activeCase = DIPLOMATIC_CASES.find(c => c.id === state.selectedCaseId) || DIPLOMATIC_CASES[0];
    if (!activeCase) return;

    // Header metadata
    const caseTitle = document.getElementById('comparator-case-title');
    if (caseTitle) caseTitle.textContent = activeCase.title;

    const caseForum = document.getElementById('comparator-case-forum');
    if (caseForum) caseForum.textContent = `${activeCase.forum} • Archive Range: ${activeCase.year}`;

    // Left Pane (Side A)
    const sideAActor = document.getElementById('comparator-side-a-actor');
    if (sideAActor) sideAActor.textContent = activeCase.sideA.actor;

    const sideADate = document.getElementById('comparator-side-a-date');
    if (sideADate) sideADate.textContent = `${activeCase.sideA.date} • ${activeCase.sideA.citation}`;

    const sideAQuote = document.getElementById('comparator-side-a-quote');
    if (sideAQuote) sideAQuote.textContent = `"${activeCase.sideA.verbatimQuote}"`;

    const sideACat = document.getElementById('comparator-side-a-category');
    if (sideACat) sideACat.textContent = activeCase.sideA.stanceCategory;

    const sideATerms = document.getElementById('comparator-side-a-terms');
    if (sideATerms) {
      sideATerms.innerHTML = activeCase.sideA.keyTerms.map(t => `
        <span class="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-[#EFECE6] text-[#2C221E] border border-[#D8CFBF]">${t}</span>
      `).join('');
    }

    // Right Pane (Side B)
    const sideBActor = document.getElementById('comparator-side-b-actor');
    if (sideBActor) sideBActor.textContent = activeCase.sideB.actor;

    const sideBDate = document.getElementById('comparator-side-b-date');
    if (sideBDate) sideBDate.textContent = `${activeCase.sideB.date} • ${activeCase.sideB.citation}`;

    const sideBQuote = document.getElementById('comparator-side-b-quote');
    if (sideBQuote) sideBQuote.textContent = `"${activeCase.sideB.verbatimQuote}"`;

    const sideBCat = document.getElementById('comparator-side-b-category');
    if (sideBCat) sideBCat.textContent = activeCase.sideB.stanceCategory;

    const sideBTerms = document.getElementById('comparator-side-b-terms');
    if (sideBTerms) {
      sideBTerms.innerHTML = activeCase.sideB.keyTerms.map(t => `
        <span class="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-[#EFECE6] text-[#2C221E] border border-[#D8CFBF]">${t}</span>
      `).join('');
    }

    // Semantic Differential Breakdown
    const semanticEl = document.getElementById('comparator-semantic-analysis');
    if (semanticEl) semanticEl.textContent = activeCase.semanticAnalysis;
  }

  // ============================================================
  // 7. SUB-SKILL 4: RESOURCE SECURITY & CHOKEPOINT VISUALIZERS
  // ============================================================

  function selectChokepoint(pointId) {
    state.selectedChokepointId = pointId;
    renderChokepointWorkspace();
  }

  function updateChokepointThrottle(val) {
    state.simulatedChokepointThrottle = parseInt(val, 10);
    renderChokepointWorkspace();
  }

  function renderChokepointWorkspace() {
    const point = CHOKEPOINTS_DATA.find(p => p.id === state.selectedChokepointId) || CHOKEPOINTS_DATA[0];
    if (!point) return;

    // Selector buttons active state
    document.querySelectorAll('.chokepoint-select-btn').forEach(btn => {
      if (btn.dataset.id === point.id) {
        btn.classList.add('bg-[#2C221E]', 'text-white', 'shadow-sm');
        btn.classList.remove('bg-white', 'text-[#3E3632]');
      } else {
        btn.classList.remove('bg-[#2C221E]', 'text-white', 'shadow-sm');
        btn.classList.add('bg-white', 'text-[#3E3632]');
      }
    });

    // Overview cards
    const nameEl = document.getElementById('chokepoint-name');
    if (nameEl) nameEl.textContent = point.name;

    const locEl = document.getElementById('chokepoint-location');
    if (locEl) locEl.textContent = point.location;

    const volEl = document.getElementById('chokepoint-volume');
    if (volEl) volEl.textContent = point.dailyVolume;

    const shareEl = document.getElementById('chokepoint-share');
    if (shareEl) shareEl.textContent = point.globalShare;

    const widthEl = document.getElementById('chokepoint-width');
    if (widthEl) widthEl.textContent = point.widthMin;

    const transitEl = document.getElementById('chokepoint-transits');
    if (transitEl) transitEl.textContent = point.annualTransits;

    const econEl = document.getElementById('chokepoint-economic-impact');
    if (econEl) econEl.textContent = point.economicImpactIfClosed;

    const vulnsEl = document.getElementById('chokepoint-vulnerabilities');
    if (vulnsEl) {
      vulnsEl.innerHTML = point.vulnerabilities.map(v => `
        <li class="flex items-start gap-2">
          <span class="w-1.5 h-1.5 rounded-full bg-[#2C221E] mt-1.5 flex-shrink-0"></span>
          <span>${v}</span>
        </li>
      `).join('');
    }

    // Dynamic Simulation calculations based on throttle slider
    const throttleSlider = document.getElementById('chokepoint-throttle-slider');
    if (throttleSlider && throttleSlider.value != state.simulatedChokepointThrottle) {
      throttleSlider.value = state.simulatedChokepointThrottle;
    }
    const throttleDisplay = document.getElementById('chokepoint-throttle-display');
    if (throttleDisplay) throttleDisplay.textContent = `${state.simulatedChokepointThrottle}% Capacity Reduction`;

    const delayDays = Math.round((state.simulatedChokepointThrottle / 100.0) * 14.5);
    const freightSurgePct = Math.round((state.simulatedChokepointThrottle / 100.0) * 165);
    const fuelCostBurn = ((state.simulatedChokepointThrottle / 100.0) * 3.8).toFixed(1);

    const outDelay = document.getElementById('sim-delay-days');
    if (outDelay) outDelay.textContent = `+${delayDays} Days`;

    const outFreight = document.getElementById('sim-freight-surge');
    if (outFreight) outFreight.textContent = `+${freightSurgePct}% Rate Spike`;

    const outFuel = document.getElementById('sim-fuel-overhead');
    if (outFuel) outFuel.textContent = `+$${fuelCostBurn}M / Voyage`;

    // Critical Minerals Grid
    const mineralsContainer = document.getElementById('critical-minerals-list');
    if (mineralsContainer) {
      mineralsContainer.innerHTML = CRITICAL_MINERALS.map(m => `
        <div class="p-3.5 rounded-xl border border-[#EAE3D9] bg-white flex flex-col justify-between">
          <div>
            <div class="flex items-center justify-between text-xs font-bold text-[#1C1613]">
              <span>${m.mineral}</span>
              <span class="text-[10px] font-mono text-[#7C7067] font-normal">Lead Time: ${m.redundancyLeadTime}</span>
            </div>
            <div class="text-[11px] text-[#2C221E] font-semibold mt-1">Refining Bottleneck: ${m.refiningConcentration}</div>
            <p class="text-[11px] text-[#5C524C] mt-1.5 leading-relaxed">
              <strong>Military / Industrial Applications:</strong> ${m.useCase}
            </p>
          </div>
          <div class="mt-2.5 pt-2 border-t border-[#EAE3D9] text-[10px] text-[#7C7067]">
            <strong>Vulnerability Vector:</strong> ${m.chokeAction}
          </div>
        </div>
      `).join('');
    }
  }

  // Public Interface
  return {
    init,
    initView,
    setDisputeFilter,
    openDisputeModal,
    closeDisputeModal,
    setSanctionSector,
    updateSanctionSeverity,
    updateTariffRate,
    selectCase,
    selectChokepoint,
    updateChokepointThrottle
  };

})();
