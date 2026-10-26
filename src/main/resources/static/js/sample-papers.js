/**
 * Polymath VSN - Sample Papers (Global Examinations) Module
 * Standardized International Assessment Repository & Interactive Practice Papers
 * 
 * Strict enterprise design: light brown/cream/taupe/espresso palette, zero emojis.
 */

window.SAMPLE_PAPERS_MODULE = (function() {
  'use strict';

  // Global Examinations Database (13 International Suites)
  const EXAMS_DATA = [
    {
      id: 'jlpt-n5',
      name: 'JLPT N5',
      fullName: 'Japanese-Language Proficiency Test (Level N5)',
      country: 'Japan',
      authority: 'Japan Foundation / JEES',
      level: 'CEFR A1 (Basic)',
      region: 'east-asia',
      duration: '105 Mins',
      scoreScale: '180 Points (Pass: 80/180)',
      totalQuestions: '91 Questions',
      sampleQuestions: [
        {
          id: 1,
          section: 'Language Knowledge (Kanji)',
          stimulus: '問題：下線の言葉の読み方として最もよいものを一つ選びなさい。<br><span class="font-bold font-mono text-base text-[#1C1613]">毎朝、<u>水</u>を飲みます。</span>',
          options: ['みず (mizu)', 'おちゃ (ocha)', 'ごはん (gohan)', 'さけ (sake)'],
          correct: 0,
          explanation: 'The kanji「水」is read as「みず」(water) in kun-yomi. Hence, "Every morning, I drink water."'
        },
        {
          id: 2,
          section: 'Grammar (Particles)',
          stimulus: '問題：（　）に入れるのに最もよいものを一つ選びなさい。<br><span class="font-bold font-mono text-base text-[#1C1613]">わたしは　きのう　図書館（　）本を　読みました。</span>',
          options: ['に (ni)', 'で (de)', 'へ (e)', 'を (wo)'],
          correct: 1,
          explanation: 'The particle「で」marks the location where an action takes place (reading books at the library). Particle「に」marks static existence or arrival.'
        },
        {
          id: 3,
          section: 'Reading Comprehension',
          stimulus: '短文読解：次の文を読んで質問に答えなさい。<br><div class="p-3 bg-[#F7F4EF] rounded border border-[#EAE3D9] my-2 text-xs font-mono text-[#3E3632]">木村さんのへやは　ひろいです。あかるい　まどが　二つあります。つくえの　うえに　本と　時計があります。ねこが　ベッドの　したに　います。</div>質問：ねこは　どこに　いますか。',
          options: ['つくえの うえ', 'ベッドの した', 'まどの そと', 'へやの そと'],
          correct: 1,
          explanation: 'The text states:「ねこが ベッドの したに います」(The cat is under the bed).'
        }
      ]
    },
    {
      id: 'jlpt-n4',
      name: 'JLPT N4',
      fullName: 'Japanese-Language Proficiency Test (Level N4)',
      country: 'Japan',
      authority: 'Japan Foundation / JEES',
      level: 'CEFR A2 (Elementary)',
      region: 'east-asia',
      duration: '115 Mins',
      scoreScale: '180 Points (Pass: 90/180)',
      totalQuestions: '98 Questions',
      sampleQuestions: [
        {
          id: 1,
          section: 'Vocabulary (Kanji Compounds)',
          stimulus: '問題：下線の言葉はどう書きますか。<br><span class="font-bold font-mono text-base text-[#1C1613]">来週の月曜日に<u>しけん</u>があります。</span>',
          options: ['試験', '実験', '試用', '体験'],
          correct: 0,
          explanation: '「しけん」(examination/test) is written with the kanji「試験」.'
        },
        {
          id: 2,
          section: 'Grammar (Conditional Conjugation)',
          stimulus: '問題：（　）に入れるのに最もよいものを一つ選びなさい。<br><span class="font-bold font-mono text-base text-[#1C1613]">時間が（　）、京都へ行きたいです。</span>',
          options: ['あれば', 'あると', 'あって', 'あるので'],
          correct: 0,
          explanation: 'The conditional ba-form「あれば」(if there is time) correctly pairs with the speaker’s personal desire「行きたいです」.'
        },
        {
          id: 3,
          section: 'Reading Comprehension (Notices)',
          stimulus: '情報検索：次の掲示を読んで質問に答えなさい。<br><div class="p-3 bg-[#F7F4EF] rounded border border-[#EAE3D9] my-2 text-xs font-mono text-[#3E3632]">【ゴミ収集のお知らせ】<br>燃えるゴミ：月曜日・木曜日（朝8時までに出してください）<br>燃えないゴミ：第2・第4水曜日<br>ビン・カン：金曜日</div>質問：燃えるゴミは　いつ出しますか。',
          options: ['月曜日と木曜日の朝8時まで', '水曜日と金曜日の午後', '第2・第4水曜日', '毎日の朝8時'],
          correct: 0,
          explanation: 'The notice explicitly specifies that burnable waste (燃えるゴミ) must be taken out on Mondays and Thursdays by 8:00 AM.'
        }
      ]
    },
    {
      id: 'jlpt-n3',
      name: 'JLPT N3',
      fullName: 'Japanese-Language Proficiency Test (Level N3)',
      country: 'Japan',
      authority: 'Japan Foundation / JEES',
      level: 'CEFR B1 (Intermediate)',
      region: 'east-asia',
      duration: '140 Mins',
      scoreScale: '180 Points (Pass: 95/180)',
      totalQuestions: '105 Questions',
      sampleQuestions: [
        {
          id: 1,
          section: 'Language Knowledge (Kanji Reading)',
          stimulus: '問題：下線の言葉の読み方として最もよいものを一つ選びなさい。<br><span class="font-bold font-mono text-base text-[#1C1613]">会議の資料を<u>印刷</u>してください。</span>',
          options: ['いんさつ (insatsu)', 'いんしょう (inshou)', 'こうさつ (kousatsu)', 'けいさつ (keisatsu)'],
          correct: 0,
          explanation: 'The compound「印刷」is read as「いんさつ」(printing). Hence, "Please print the meeting handouts."'
        },
        {
          id: 2,
          section: 'Grammar (Nuance & Functional Expressions)',
          stimulus: '問題：（　）に入れるのに最もよいものを一つ選びなさい。<br><span class="font-bold font-mono text-base text-[#1C1613]">毎日一生懸命練習したからといって、必ずしも試合に勝てる（　）。</span>',
          options: ['わけではない', 'はずがない', 'に違いない', 'わけにはいかない'],
          correct: 0,
          explanation: '「〜わけではない」expresses partial negation: "Just because you practice hard every day does not necessarily mean you will win the match."'
        },
        {
          id: 3,
          section: 'Reading Comprehension (Workplace Etiquette)',
          stimulus: '短文読解：次の文章を読んで質問に答えなさい。<br><div class="p-3 bg-[#F7F4EF] rounded border border-[#EAE3D9] my-2 text-xs font-mono text-[#3E3632]">日本の職場では、依頼を断る際に「できません」と直接的に言うことは少なく、「あいにくその日は予定がございまして」などと婉曲な表現を使うことが多い。これにより相手への配慮を示し、関係の悪化を防ぐのである。</div>質問：筆者によると、なぜ婉曲な断り方をするのか。',
          options: ['相手への配慮を示し、良好な関係を維持するため', '仕事を早く終わらせるため', '会社の規則で決められているから', '自分の都合を相手に詳しく説明するため'],
          correct: 0,
          explanation: 'The passage explicitly clarifies:「相手への配慮を示し、関係の悪化を防ぐのである」(to demonstrate consideration for the other party and prevent deteriorating relationships).'
        }
      ]
    },
    {
      id: 'jlpt-n2',
      name: 'JLPT N2',
      fullName: 'Japanese-Language Proficiency Test (Level N2)',
      country: 'Japan',
      authority: 'Japan Foundation / JEES',
      level: 'CEFR B2 (Pre-Advanced)',
      region: 'east-asia',
      duration: '155 Mins',
      scoreScale: '180 Points (Pass: 90/180)',
      totalQuestions: '105 Questions',
      sampleQuestions: [
        {
          id: 1,
          section: 'Grammar (Complex Functional Expressions)',
          stimulus: '問題：（　）に入れるのに最もよいものを一つ選びなさい。<br><span class="font-bold font-mono text-base text-[#1C1613]">今回の不祥事について、経営陣として責任を（　）。</span>',
          options: ['負わざるを得ない', '負うわけにはいかない', '負うにすぎない', '負いかねない'],
          correct: 0,
          explanation: '「〜ざるを得ない」expresses that one cannot avoid doing something despite personal reluctance: "Regarding this scandal, the management team cannot help but bear responsibility."'
        },
        {
          id: 2,
          section: 'Vocabulary (Formal Collocations)',
          stimulus: '問題：（　）に入れるのに最もよいものを一つ選びなさい。<br><span class="font-bold font-mono text-base text-[#1C1613]">東京ドームでの公演を（　）、全国５大都市を巡る大規模ツアーがスタートした。</span>',
          options: ['皮切りに', 'きっかけに', '限りに', '境に'],
          correct: 0,
          explanation: '「〜を皮切りに（して）」indicates that an initial event or performance kicks off a succession of similar widespread actions.'
        },
        {
          id: 3,
          section: 'Reading Comprehension (Essay Analysis)',
          stimulus: '中文読解：次の文章を読んで質問に答えなさい。<br><div class="p-3 bg-[#F7F4EF] rounded border border-[#EAE3D9] my-2 text-xs font-mono text-[#3E3632]">技術の進歩は人間の労力を軽減した一方で、我々から「試行錯誤する時間」を奪いつつある。検索すれば瞬時に正解らしきものが手に入る現代において、自らの頭で悩み、迷い、結論を導き出す知的な粘り強さこそが、今まさに求められているのではないだろうか。</div>質問：筆者が最も主張したいことは何か。',
          options: ['便利さに頼らず、自ら深く考え抜く粘り強さが必要である', '最新の検索技術を積極的に業務に取り入れるべきである', '試行錯誤の時間は無駄であるため短縮すべきである', '技術の進歩を止めることは不可能である'],
          correct: 0,
          explanation: 'The author emphasizes that in an age of instant search answers, intellectual tenacity (自らの頭で悩み...知的な粘り強さ) is what is truly required.'
        }
      ]
    },
    {
      id: 'jlpt-n1',
      name: 'JLPT N1',
      fullName: 'Japanese-Language Proficiency Test (Level N1)',
      country: 'Japan',
      authority: 'Japan Foundation / JEES',
      level: 'CEFR C1 (Advanced)',
      region: 'east-asia',
      duration: '170 Mins',
      scoreScale: '180 Points (Pass: 100/180)',
      totalQuestions: '110 Questions',
      sampleQuestions: [
        {
          id: 1,
          section: 'Language Knowledge (Advanced Idiomatic Grammar)',
          stimulus: '問題：（　）に入れるのに最もよいものを一つ選びなさい。<br><span class="font-bold font-mono text-base text-[#1C1613]">公共の場における彼の無責任極まりない振る舞いには、憤りを（　）。</span>',
          options: ['禁じ得ない', '余儀なくされた', '堪えない', 'やまない'],
          correct: 0,
          explanation: '「〜を禁じ得ない」is an advanced formal expression meaning one cannot suppress a spontaneous emotion (such as indignation, tears, or anger): "Regarding his extremely irresponsible conduct in public, I cannot suppress my outrage."'
        },
        {
          id: 2,
          section: 'Grammar (Hypothetical & Concessive Constructs)',
          stimulus: '問題：（　）に入れるのに最もよいものを一つ選びなさい。<br><span class="font-bold font-mono text-base text-[#1C1613]">いかに困難な状況（　）、我々はこの学術プロジェクトを最後までやり遂げなければならない。</span>',
          options: ['であろうと', 'であれども', 'であってこそ', 'であればこそ'],
          correct: 0,
          explanation: '「いかに〜であろうと」is a formal written concessive construction meaning "no matter how [difficult] it may be".'
        },
        {
          id: 3,
          section: 'Scholarly Reading (Aesthetics & Philosophy)',
          stimulus: '長文読解（抜粋）：次の文章を読んで質問に答えなさい。<br><div class="p-3 bg-[#F7F4EF] rounded border border-[#EAE3D9] my-2 text-xs font-mono text-[#3E3632]">古典的な日本の美意識における「物の哀れ」とは、単なる悲哀の情情ではない。それは万物の移ろいやすさ、無常を直視したときに生じる、世界の本質に対する深い共鳴と知的諦観である。不完全性や有限性を愛でるこの感性は、完全無欠を志向する西洋近代の合理主義的審美眼とは鮮やかな対照をなしている。</div>質問：筆者は「物の哀れ」をどのように捉えているか。',
          options: ['万物の無常性に対する知的共鳴であり、有限性を愛でる感性', '単なる個人的な悲しみや絶望の感情', '西洋合理主義を模倣して生まれた近代の美学', '完全無欠な造形美を追求するための理論'],
          correct: 0,
          explanation: 'The passage explicitly defines Mono no aware as:「万物の移ろいやすさ、無常を直視したときに生じる...深い共鳴と知的諦観」「不完全性や有限性を愛でる感性」(an intellectual resonance with impermanence that cherishes finiteness).'
        }
      ]
    },
    {
      id: 'ielts-academic',
      name: 'IELTS Academic',
      fullName: 'International English Language Testing System (Academic)',
      country: 'United Kingdom',
      authority: 'British Council / Cambridge Assessment / IDP',
      level: 'CEFR B2-C2 (Band 0.0 - 9.0)',
      region: 'anglophone',
      duration: '165 Mins',
      scoreScale: 'Band 0.0 to 9.0 (Competent: 6.5+)',
      totalQuestions: '80 Questions',
      sampleQuestions: [
        {
          id: 1,
          section: 'Academic Reading (Geothermal Thermodynamics)',
          stimulus: 'Passage Excerpt: Enhanced Geothermal Systems (EGS) achieve thermal transfer by hydraulically fracturing impermeable crystalline rock mass at depths exceeding four kilometers. Fluid circulation loops extract thermal energy without direct reliance on naturally occurring hydrothermal aquifers, circumventing localized geographical constraints.',
          options: ['EGS systems bypass the necessity of preexisting hydrothermal reservoirs.', 'Deep fracturing invariably degrades seismic integrity across continental plates.', 'EGS extraction is only viable at depths under two kilometers.', 'Hydrothermal aquifers are mandatory prerequisites for crystalline fracturing.'],
          correct: 0,
          explanation: 'The text confirms: "without direct reliance on naturally occurring hydrothermal aquifers, circumventing localized geographical constraints".'
        },
        {
          id: 2,
          section: 'Academic Reading (Lexical Semantics in Context)',
          stimulus: 'Sentence Context: "The researchers observed that the algorithm\'s decision boundary was remarkably <u>brittle</u> when exposed to adversarial perturbations."',
          options: ['Susceptible to failure under slight modifications', 'Highly adaptable and resilient', 'Mathematically indisputable', 'Computationally accelerated'],
          correct: 0,
          explanation: '"Brittle" in computer science and mathematics refers to an algorithm or system that shatters or fails abruptly when encountering slight perturbations.'
        }
      ]
    },
    {
      id: 'ielts-general',
      name: 'IELTS General Training',
      fullName: 'International English Language Testing System (General Training)',
      country: 'United Kingdom',
      authority: 'British Council / IDP / Cambridge',
      level: 'CEFR B1-C1 (Band 0.0 - 9.0)',
      region: 'anglophone',
      duration: '165 Mins',
      scoreScale: 'Band 0.0 to 9.0 (Migration Benchmark: 7.0+)',
      totalQuestions: '80 Questions',
      sampleQuestions: [
        {
          id: 1,
          section: 'Section 1: Workplace Safety Protocols',
          stimulus: 'Notice Excerpt: "All employees must vacate the premises immediately upon activation of the intermittent alarm. Elevators will automatically ground and cease operation. Personnel must assemble at Muster Point B located on the eastern perimeter parking tier. Do not re-enter under any circumstance until the Incident Controller issues an all-clear notification."',
          options: ['Staff must assemble at Muster Point B on the eastern perimeter.', 'Staff may use elevators if vacating from floors above level 4.', 'Personnel may return to retrieve belongings once the alarm switches to intermittent.', 'Staff must proceed directly to their vehicles and exit the facility.'],
          correct: 0,
          explanation: 'The notice strictly mandates assembling at Muster Point B on the eastern perimeter and forbids re-entering without all-clear authorization.'
        },
        {
          id: 2,
          section: 'Section 2: Employment Benefits & Leave Accrual',
          stimulus: 'Contract Clause: "Full-time personnel accrue 1.66 days of annual paid leave for each completed month of continuous service. Unused leave balances exceeding five days at the close of the fiscal calendar year will not roll over automatically unless prior written sanction has been granted by the divisional human resources director."',
          options: ['Carrying forward more than five days of annual leave requires prior written HR authorization.', 'Employees lose all accrued leave if not fully taken by mid-year.', 'Part-time personnel accrue leave at twice the full-time rate.', 'Unused leave balances roll over indefinitely without formal notification.'],
          correct: 0,
          explanation: 'The clause clearly establishes that balances over 5 days do not roll over unless prior written sanction is provided by the HR director.'
        }
      ]
    },
    {
      id: 'toefl-ibt',
      name: 'TOEFL iBT',
      fullName: 'Test of English as a Foreign Language (Internet-Based Test)',
      country: 'United States',
      authority: 'Educational Testing Service (ETS)',
      level: 'CEFR B2-C1 (Scale 0-120)',
      region: 'anglophone',
      duration: '116 Mins',
      scoreScale: '0 to 120 Points (Admissions: 90-100+)',
      totalQuestions: '74 Questions',
      sampleQuestions: [
        {
          id: 1,
          section: 'Reading Comprehension (Plate Tectonics & Mantle Plumes)',
          stimulus: 'Passage: "Unlike the seismic friction characteristic of convergent boundary subduction, intraplate volcanic activity—such as that responsible for the Hawaiian-Emperor seamount chain—is driven by stationary thermal plumes ascending from the core-mantle boundary. As the lithospheric Pacific Plate glides northwestward over this persistent hotspot, a sequential succession of volcanic shield edifices is forged over geological epochs."<br><br>Question: Why does the author mention the "Hawaiian-Emperor seamount chain"?',
          options: ['To provide an empirical archetype of stationary hotspot intraplate volcanism', 'To argue that plate tectonics operates independently of mantle convection', 'To dispute the existence of subduction zones along the Pacific Ring of Fire', 'To illustrate how convergent boundary friction builds submarine volcanic ridges'],
          correct: 0,
          explanation: 'The author cites the Hawaiian-Emperor chain specifically as an example of intraplate volcanism driven by stationary plumes under a moving plate.'
        },
        {
          id: 2,
          section: 'Reading Comprehension (Factual Inference)',
          stimulus: 'Based on the passage above, what can be inferred regarding the relative age of the seamounts located farthest northwest along the Hawaiian chain?',
          options: ['They are older than the volcanic structures positioned to the southeast.', 'They are actively forming above the primary ascending mantle plume.', 'They are chemically distinct from intraplate basaltic deposits.', 'They originated from continental convergent collision.'],
          correct: 0,
          explanation: 'Because the Pacific Plate moves northwestward over a stationary plume, the volcanoes farthest northwest were formed earliest and are the oldest.'
        }
      ]
    },
    {
      id: 'goethe-b2',
      name: 'Goethe-Zertifikat B2',
      fullName: 'Goethe-Zertifikat B2 (German Language Proficiency)',
      country: 'Germany',
      authority: 'Goethe-Institut',
      level: 'CEFR B2 (Vantage)',
      region: 'european-union',
      duration: '190 Mins',
      scoreScale: '100 Points (Pass: 60/100 per Module)',
      totalQuestions: '65 Questions',
      sampleQuestions: [
        {
          id: 1,
          section: 'Leseverstehen (Arbeitswelt & Digitalisierung)',
          stimulus: 'Textauszug: "Die Zunahme mobiler Arbeitsmodelle erfordert eine Neuausrichtung betrieblicher Führungskulturen. An die Stelle starren Kontrollzwangs tritt die Führung über Zielvereinbarungen und Vertrauen. Unternehmen, die diesen Kulturwandel verschlafen, verlieren zusehends hochqualifizierte Fachkräfte an flexiblere Wettbewerber."',
          options: ['Unternehmen müssen ihre Führungsmethoden auf Vertrauen und Ziele umstellen.', 'Mitarbeiter im Homeoffice arbeiten nachweislich unproduktiver.', 'Flexible Arbeitsmodelle sollten aus Sicherheitsgründen abgeschafft werden.', 'Führungskräfte sollten die physische Anwesenheit ihrer Mitarbeiter strenger kontrollieren.'],
          correct: 0,
          explanation: 'Der Text besagt eindeutig: "An die Stelle starren Kontrollzwangs tritt die Führung über Zielvereinbarungen und Vertrauen."'
        },
        {
          id: 2,
          section: 'Sprachbausteine (Grammatik & Konnektoren)',
          stimulus: 'Aufgabe: Wählen Sie das passende Wort aus.<br><span class="font-bold font-mono text-base text-[#1C1613]">Die Verhandlungen wurden erfolgreich abgeschlossen, （　） es zu Beginn erhebliche Meinungsverschiedenheiten gab.</span>',
          options: ['obwohl', 'trotzdem', 'deshalb', 'insofern'],
          correct: 0,
          explanation: '„obwohl“ leitet einen konzessiven Nebensatz mit Verb am Ende ein (obwohl es ... gab). „trotzdem“ ist ein Hauptsatz-Adverb.'
        }
      ]
    },
    {
      id: 'goethe-c1',
      name: 'Goethe-Zertifikat C1',
      fullName: 'Goethe-Zertifikat C1 (Advanced German Competence)',
      country: 'Germany',
      authority: 'Goethe-Institut',
      level: 'CEFR C1 (Effective Operational)',
      region: 'european-union',
      duration: '210 Mins',
      scoreScale: '100 Points (Pass: 60/100 per Module)',
      totalQuestions: '70 Questions',
      sampleQuestions: [
        {
          id: 1,
          section: 'Sprachbausteine (Feste Nomen-Verb-Verbindungen)',
          stimulus: 'Aufgabe: Setzen Sie die korrekte Nomen-Verb-Verbindung ein.<br><span class="font-bold font-mono text-base text-[#1C1613]">Es steht völlig außer （　）, dass die Transformation zur klimaneutralen Industrie erhebliche Investitionen erfordert.</span>',
          options: ['Zweifel', 'Frage', 'Aussicht', 'Betracht'],
          correct: 0,
          explanation: 'Die feste Nomen-Verb-Verbindung „außer Zweifel stehen“ bedeutet „unumstößlich sicher sein“. („außer Frage stehen“ existiert auch, im Kontext von Gewissheit ist „außer Zweifel stehen“ die klassische Wendung).'
        },
        {
          id: 2,
          section: 'Grammatik (Passiversatzformen & Modale Infinitive)',
          stimulus: 'Aufgabe: Welche Umformulierung drückt dieselbe Bedeutung aus wie: „Dieser hochkomplexe Sachverhalt <u>kann</u> nur von Fachexperten <u>gelöst werden</u>“?',
          options: ['Dieser hochkomplexe Sachverhalt lässt sich nur von Fachexperten lösen.', 'Dieser hochkomplexe Sachverhalt muss gelöst werden.', 'Dieser Sachverhalt hat sich gelöst.', 'Experten dürfen den Sachverhalt lösen.'],
          correct: 0,
          explanation: 'Die Reflexivkonstruktion „sich lassen + Infinitiv“ ist eine Passiversatzform mit der Bedeutung „können + Passiv“.'
        }
      ]
    },
    {
      id: 'delf-b2',
      name: 'DELF B2',
      fullName: 'Diplôme d\'Études en Langue Française (Niveau B2)',
      country: 'France',
      authority: 'France Éducation International / Ministère de l\'Éducation',
      level: 'CEFR B2 (Indépendant)',
      region: 'european-union',
      duration: '150 Mins',
      scoreScale: '100 Points (Seuil: 50/100)',
      totalQuestions: '50 Questions',
      sampleQuestions: [
        {
          id: 1,
          section: 'Compréhension des Écrits (Transition Écologique)',
          stimulus: 'Texte: "La piétonnisation progressive des centres urbains suscite des débats passionnés entre défenseurs de la qualité de l\'air et commerçants craignant une baisse d\'affluence. Pourtant, les retours d\'expérience européens démontrent que la création d\'espaces publics apaisés stimule la fréquentation et dynamise l\'activité économique locale."',
          options: ['La piétonnisation stimule la fréquentation et favorise le commerce local.', 'Les commerçants refusent catégoriquement toute politique écologique.', 'Les villes européennes ont abandonné les zones piétonnes.', 'La piétonnisation diminue systématiquement le pouvoir d\'achat.'],
          correct: 0,
          explanation: 'Le texte conclut sans équivoque que "la création d\'espaces publics apaisés stimule la fréquentation et dynamise l\'activité économique locale".'
        },
        {
          id: 2,
          section: 'Grammaire & Syntaxe (Subjonctif)',
          stimulus: 'Question: Choisissez la forme verbale correcte.<br><span class="font-bold font-mono text-base text-[#1C1613]">Bien qu\'il （　） des efforts remarquables, les résultats restent insuffisants.</span>',
          options: ['fasse', 'fait', 'fera', 'ferait'],
          correct: 0,
          explanation: 'La conjonction concessive "bien que" exige impérativement l\'emploi du subjonctif ("qu\'il fasse").'
        }
      ]
    },
    {
      id: 'hsk-4',
      name: 'HSK 4',
      fullName: 'Hanyu Shuiping Kaoshi (Level 4 - Chinese Proficiency)',
      country: 'China',
      authority: 'Center for Language Education and Cooperation (Hanban)',
      level: 'CEFR B2 (Intermediate)',
      region: 'east-asia',
      duration: '105 Mins',
      scoreScale: '300 Points (Pass: 180/300)',
      totalQuestions: '100 Questions',
      sampleQuestions: [
        {
          id: 1,
          section: '词汇辨析 (Vocabulary in Context)',
          stimulus: '选择合适的词语填空。<br><span class="font-bold font-mono text-base text-[#1C1613]">随着现代互联网科技的（　）发展，人们的生活方式发生了巨大的变化。</span>',
          options: ['迅速 (xùnsù)', '热闹 (rènao)', '严格 (yángé)', '丰富 (fēngfù)'],
          correct: 0,
          explanation: '「迅速」(xùnsù - rapid/swift) is the natural standard collocation for technological development (迅速发展).'
        },
        {
          id: 2,
          section: '语法结构 (Correlative Conjunctions)',
          stimulus: '选择正确的关联词填空。<br><span class="font-bold font-mono text-base text-[#1C1613]">他（　）学习成绩非常优秀，（　）经常热情地帮助其他同学。</span>',
          options: ['不仅……而且……', '因为……所以……', '即使……也……', '虽然……但是……'],
          correct: 0,
          explanation: '「不仅……而且……」(not only... but also...) expresses progressive addition of merits.'
        }
      ]
    },
    {
      id: 'dele-b2',
      name: 'DELE B2',
      fullName: 'Diploma de Español como Lengua Extranjera (Nivel B2)',
      country: 'Spain',
      authority: 'Instituto Cervantes / Ministerio de Educación',
      level: 'CEFR B2 (Intermedio Alto)',
      region: 'european-union',
      duration: '190 Mins',
      scoreScale: '100 Puntos (Apto: 60/100)',
      totalQuestions: '66 Questions',
      sampleQuestions: [
        {
          id: 1,
          section: 'Comprensión de Lectura (Sostenibilidad)',
          stimulus: 'Texto: "La transición energética en las metrópolis iberoamericanas exige una descentralización de la matriz eléctrica. El fomento del autoconsumo fotovoltaico en comunidades residenciales no solo alivia la saturación de las redes de distribución, sino que democratiza el acceso a fuentes renovables no contaminantes."',
          options: ['El autoconsumo fotovoltaico alivia la red y democratiza la energía limpia.', 'La energía solar ha saturado las redes eléctricas urbanas.', 'Las metrópolis deben centralizar aún más la generación térmica.', 'El autoconsumo encarece el coste de la electricidad residencial.'],
          correct: 0,
          explanation: 'El texto afirma explícitamente que el autoconsumo fotovoltaico "alivia la saturación de las redes... y democratiza el acceso a fuentes renovables".'
        },
        {
          id: 2,
          section: 'Gramática & Expresión (Subjuntivo)',
          stimulus: 'Pregunta: Seleccione la opción correcta.<br><span class="font-bold font-mono text-base text-[#1C1613]">Es imprescindible que todos los ciudadanos （　） los recursos hídricos en épocas de sequía severa.</span>',
          options: ['cuiden', 'cuidan', 'cuidarán', 'cuidarían'],
          correct: 0,
          explanation: 'Las expresiones impersonales de necesidad ("Es imprescindible que...") exigen obligatoriamente el modo subjuntivo ("cuiden").'
        }
      ]
    }
  ];

  // State Management
  const state = {
    activeFilter: 'all',
    searchQuery: '',
    currentExam: null,
    currentQuestionIndex: 0,
    userAnswers: {},
    timerSeconds: 1500, // 25:00 minutes
    timerInterval: null,
    isExamSubmitted: false
  };

  /**
   * Initialize Module
   */
  function init() {
    renderExamsGrid();
    initFilterEvents();
  }

  function initFilterEvents() {
    const searchInput = document.getElementById('sample-paper-search');
    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        state.searchQuery = e.target.value.toLowerCase().trim();
        renderExamsGrid();
      });
    }
  }

  function setFilter(category) {
    state.activeFilter = category;
    document.querySelectorAll('.exam-filter-btn').forEach(btn => {
      if (btn.dataset.filter === category) {
        btn.classList.add('bg-[#2C221E]', 'text-white', 'shadow-sm');
        btn.classList.remove('bg-white', 'text-[#3E3632]');
      } else {
        btn.classList.remove('bg-[#2C221E]', 'text-white', 'shadow-sm');
        btn.classList.add('bg-white', 'text-[#3E3632]');
      }
    });
    renderExamsGrid();
  }

  /**
   * Render Streamlined Clean Exam Cards Grid
   * Paragraph descriptions removed to maximize screen space and visual clarity.
   * Keeps Title, Country Tag, Duration, Scoring Scale, and Action Button.
   */
  function renderExamsGrid() {
    const container = document.getElementById('sample-papers-grid');
    if (!container) return;

    let filtered = EXAMS_DATA;

    if (state.activeFilter !== 'all') {
      filtered = filtered.filter(item => item.region === state.activeFilter);
    }

    if (state.searchQuery) {
      filtered = filtered.filter(item => 
        item.name.toLowerCase().includes(state.searchQuery) ||
        item.fullName.toLowerCase().includes(state.searchQuery) ||
        item.country.toLowerCase().includes(state.searchQuery) ||
        item.level.toLowerCase().includes(state.searchQuery)
      );
    }

    if (filtered.length === 0) {
      container.innerHTML = `
        <div class="col-span-full p-12 text-center bg-white rounded-2xl border border-[#EAE3D9]">
          <div class="text-sm font-bold text-[#1C1613]">No Examination Blueprints Found</div>
          <p class="text-xs text-[#7C7067] mt-1">Try refining your keyword query or switching regional authority filters.</p>
        </div>
      `;
      return;
    }

    container.innerHTML = filtered.map(exam => `
      <div class="polymath-card p-5 bg-white border border-[#EAE3D9] rounded-2xl flex flex-col justify-between hover:shadow-md transition-all">
        <div>
          <!-- Header Tag Ribbon -->
          <div class="flex items-center justify-between gap-2 mb-2.5">
            <span class="px-2.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-[#EFECE6] text-[#2C221E] border border-[#D8CFBF]">
              ${exam.level}
            </span>
            <span class="text-xs font-mono font-medium text-[#7C7067]">
              ${exam.country}
            </span>
          </div>

          <!-- Exam Title & Admin Authority -->
          <h3 class="text-base font-bold text-[#1C1613] tracking-tight">${exam.name}</h3>
          <div class="text-[11px] text-[#7C7067] font-medium mt-0.5">${exam.authority}</div>

          <!-- Core Metadata Pills: Duration & Scoring Scale -->
          <div class="grid grid-cols-2 gap-2 mt-4 text-[11px] font-mono text-[#3E3632]">
            <div class="p-2.5 rounded-xl bg-[#FDFBF7] border border-[#EAE3D9]">
              <span class="text-[9px] uppercase font-bold text-[#7C7067] block">Duration</span>
              <span class="font-bold text-[#1C1613]">${exam.duration}</span>
            </div>
            <div class="p-2.5 rounded-xl bg-[#FDFBF7] border border-[#EAE3D9]">
              <span class="text-[9px] uppercase font-bold text-[#7C7067] block">Scoring Scale</span>
              <span class="font-bold text-[#1C1613] truncate block" title="${exam.scoreScale}">${exam.scoreScale}</span>
            </div>
          </div>
        </div>

        <!-- Start Practice Paper Button (Deep Espresso #2C221E) -->
        <button type="button" onclick="if(window.SAMPLE_PAPERS_MODULE) window.SAMPLE_PAPERS_MODULE.openPracticePaper('${exam.id}')" class="mt-4 w-full py-2.5 px-4 rounded-lg bg-[#2C221E] text-white hover:bg-[#4E4038] font-bold text-xs transition-colors cursor-pointer text-center shadow-sm flex items-center justify-center gap-1.5">
          Start Practice Paper
          <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="9 18 15 12 9 6"></polyline></svg>
        </button>
      </div>
    `).join('');
  }

  /**
   * Interactive Practice Paper Runner & Modal
   */
  function openPracticePaper(examId) {
    const exam = EXAMS_DATA.find(e => e.id === examId);
    if (!exam) return;

    state.currentExam = exam;
    state.currentQuestionIndex = 0;
    state.userAnswers = {};
    state.isExamSubmitted = false;
    state.timerSeconds = 1500; // 25 minutes for sample module

    const modal = document.getElementById('sample-paper-modal');
    if (!modal) return;

    // Reset visibility of submit buttons and score banner
    const scoreBanner = document.getElementById('modal-score-banner');
    if (scoreBanner) {
      scoreBanner.classList.add('hidden');
      scoreBanner.innerHTML = '';
    }
    const submitBtn = document.getElementById('modal-submit-btn');
    if (submitBtn) {
      submitBtn.classList.remove('hidden');
      submitBtn.disabled = false;
    }
    const headerSubmitBtn = document.getElementById('modal-header-submit-btn');
    if (headerSubmitBtn) {
      headerSubmitBtn.classList.remove('hidden');
      headerSubmitBtn.disabled = false;
    }

    // Header updates
    document.getElementById('modal-exam-title').textContent = `${exam.name}: Official Sample Paper`;
    document.getElementById('modal-exam-meta').textContent = `${exam.country} • ${exam.authority} • ${exam.level}`;

    renderQuestionView();
    startTimer();

    modal.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
  }

  function closePracticePaper() {
    const modal = document.getElementById('sample-paper-modal');
    if (modal) modal.classList.add('hidden');
    document.body.style.overflow = '';
    if (state.timerInterval) clearInterval(state.timerInterval);
  }

  function startTimer() {
    if (state.timerInterval) clearInterval(state.timerInterval);
    updateTimerDisplay();

    state.timerInterval = setInterval(() => {
      if (state.timerSeconds > 0) {
        state.timerSeconds--;
        updateTimerDisplay();
      } else {
        clearInterval(state.timerInterval);
        submitPracticePaper();
      }
    }, 1000);
  }

  function updateTimerDisplay() {
    const timerEl = document.getElementById('modal-exam-timer');
    if (!timerEl) return;
    const mins = Math.floor(state.timerSeconds / 60);
    const secs = state.timerSeconds % 60;
    timerEl.textContent = `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  }

  function renderQuestionView() {
    const exam = state.currentExam;
    const questions = exam.sampleQuestions || [];
    const q = questions[state.currentQuestionIndex];
    if (!q) return;

    // Question numbering ribbon
    const navEl = document.getElementById('modal-question-nav');
    if (navEl) {
      navEl.innerHTML = questions.map((item, idx) => {
        const isCurrent = idx === state.currentQuestionIndex;
        const isAnswered = state.userAnswers[idx] !== undefined;
        let bg = 'bg-white border-[#EAE3D9] text-[#5C524C]';
        if (isCurrent) bg = 'bg-[#2C221E] text-white border-[#2C221E] shadow-sm';
        else if (isAnswered) bg = 'bg-emerald-50 text-emerald-800 border-emerald-300';
        return `
          <button type="button" onclick="window.SAMPLE_PAPERS_MODULE.jumpToQuestion(${idx})" class="w-7 h-7 rounded text-xs font-mono font-bold border transition-colors cursor-pointer ${bg}">
            ${idx + 1}
          </button>
        `;
      }).join('');
    }

    // Section & Stimulus
    const sectionBadge = document.getElementById('modal-q-section');
    if (sectionBadge) sectionBadge.textContent = q.section;

    const stimulusEl = document.getElementById('modal-q-stimulus');
    if (stimulusEl) stimulusEl.innerHTML = q.stimulus;

    // Options list
    const optionsContainer = document.getElementById('modal-q-options');
    if (optionsContainer) {
      const selectedAnswer = state.userAnswers[state.currentQuestionIndex];
      optionsContainer.innerHTML = q.options.map((opt, optIdx) => {
        const isChecked = selectedAnswer === optIdx;
        let borderClass = isChecked ? 'border-[#2C221E] bg-[#EFECE6]/50' : 'border-[#EAE3D9] bg-white hover:bg-[#FDFBF7]';
        
        if (state.isExamSubmitted) {
          if (optIdx === q.correct) borderClass = 'border-emerald-500 bg-emerald-50 text-emerald-900 font-bold';
          else if (isChecked && optIdx !== q.correct) borderClass = 'border-rose-500 bg-rose-50 text-rose-900 line-through';
        }

        return `
          <label class="p-3 rounded-xl border flex items-center gap-3 transition-colors cursor-pointer ${borderClass}">
            <input type="radio" name="practice-option" value="${optIdx}" ${isChecked ? 'checked' : ''} ${state.isExamSubmitted ? 'disabled' : ''} onchange="window.SAMPLE_PAPERS_MODULE.selectAnswer(${optIdx})" class="accent-[#2C221E]">
            <span class="text-xs font-medium text-[#2C221E]">${opt}</span>
          </label>
        `;
      }).join('');
    }

    // Rationale (if submitted)
    const rationaleEl = document.getElementById('modal-q-rationale');
    if (rationaleEl) {
      if (state.isExamSubmitted) {
        rationaleEl.classList.remove('hidden');
        rationaleEl.innerHTML = `
          <div class="text-[10px] font-bold uppercase tracking-wider text-[#7C7067] mb-1">Official Test Explanation &amp; Rationale</div>
          <div class="text-xs text-[#3E3632] leading-relaxed">${q.explanation}</div>
        `;
      } else {
        rationaleEl.classList.add('hidden');
      }
    }

    // Submit Prompt on Final Question
    const endSubmitContainer = document.getElementById('modal-q-end-submit');
    if (endSubmitContainer) {
      if (!state.isExamSubmitted && state.currentQuestionIndex === questions.length - 1) {
        endSubmitContainer.classList.remove('hidden');
      } else {
        endSubmitContainer.classList.add('hidden');
      }
    }
  }

  function selectAnswer(optIdx) {
    if (state.isExamSubmitted) return;
    state.userAnswers[state.currentQuestionIndex] = optIdx;
    renderQuestionView();
  }

  function jumpToQuestion(idx) {
    state.currentQuestionIndex = idx;
    renderQuestionView();
  }

  function prevQuestion() {
    if (state.currentQuestionIndex > 0) {
      state.currentQuestionIndex--;
      renderQuestionView();
    }
  }

  function nextQuestion() {
    const maxIdx = (state.currentExam.sampleQuestions || []).length - 1;
    if (state.currentQuestionIndex < maxIdx) {
      state.currentQuestionIndex++;
      renderQuestionView();
    }
  }

  function submitPracticePaper() {
    if (state.timerInterval) clearInterval(state.timerInterval);
    state.isExamSubmitted = true;

    const questions = state.currentExam.sampleQuestions || [];
    let correctCount = 0;
    questions.forEach((q, idx) => {
      if (state.userAnswers[idx] === q.correct) {
        correctCount++;
      }
    });

    const scorePct = Math.round((correctCount / questions.length) * 100);

    // Show score banner in modal
    const scoreBanner = document.getElementById('modal-score-banner');
    if (scoreBanner) {
      scoreBanner.classList.remove('hidden');
      scoreBanner.innerHTML = `
        <div class="flex items-center justify-between">
          <div>
            <div class="text-xs font-bold text-[#1C1613]">Test Completed • Score: ${scorePct}% (${correctCount}/${questions.length} Correct)</div>
            <p class="text-[11px] text-[#5C524C] mt-0.5">Review question breakdown and official answer keys below.</p>
          </div>
          <span class="px-3 py-1 rounded-full text-xs font-bold font-mono ${scorePct >= 70 ? 'bg-emerald-100 text-emerald-800 border border-emerald-300' : 'bg-amber-100 text-amber-800 border border-amber-300'}">
            ${scorePct >= 70 ? 'PASS QUALIFIED' : 'REVIEW REQUIRED'}
          </span>
        </div>
      `;
    }

    const submitBtn = document.getElementById('modal-submit-btn');
    if (submitBtn) submitBtn.classList.add('hidden');

    const headerSubmitBtn = document.getElementById('modal-header-submit-btn');
    if (headerSubmitBtn) headerSubmitBtn.classList.add('hidden');

    const endSubmitContainer = document.getElementById('modal-q-end-submit');
    if (endSubmitContainer) endSubmitContainer.classList.add('hidden');

    renderQuestionView();
  }

  // Public API
  return {
    init,
    setFilter,
    openPracticePaper,
    closePracticePaper,
    jumpToQuestion,
    selectAnswer,
    prevQuestion,
    nextQuestion,
    submitPracticePaper
  };

})();
