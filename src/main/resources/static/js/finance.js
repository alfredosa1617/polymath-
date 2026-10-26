/**
 * Polymath VSN - Quantitative Finance Module (Domain 9)
 * 1. Advanced DCF Valuation & WACC Modeling
 * 2. Black-Scholes Options Pricing & The Greeks
 * 3. Modern Portfolio Theory & Efficient Frontier
 * 4. Algorithmic Trading & Risk Metrics (VaR / Sharpe)
 * Strictly emoji-free enterprise design
 */

const FINANCE_MODULE = (() => {

  // ============================================================
  // Mathematical Helper Functions
  // ============================================================

  // Standard Normal Cumulative Distribution Function (Abramowitz & Stegun approximation)
  function normCdf(x) {
    const a1 =  0.254829592;
    const a2 = -0.284496736;
    const a3 =  1.421413741;
    const a4 = -1.453152027;
    const a5 =  1.061405429;
    const p  =  0.3275911;

    const sign = x < 0 ? -1 : 1;
    const absX = Math.abs(x) / Math.SQRT2;

    const t = 1.0 / (1.0 + p * absX);
    const y = 1.0 - (((((a5 * t + a4) * t) + a3) * t + a2) * t + a1) * t * Math.exp(-absX * absX);

    return 0.5 * (1.0 + sign * y);
  }

  // Standard Normal Probability Density Function
  function normPdf(x) {
    return Math.exp(-0.5 * x * x) / Math.sqrt(2 * Math.PI);
  }

  // ============================================================
  // State Management
  // ============================================================

  const state = {
    // 0. Wealth Engineering (INR) State
    wealth: {
      mode: 'sip', // 'sip' or 'trading'
      sipAmount: 25000, // Monthly SIP in INR
      lumpsumAmount: 1000000, // Initial Capital in INR (for trading mode)
      cagr: 15.0, // Expected CAGR %
      horizonYears: 15, // 1 to 30 years
      stepUpPct: 10.0, // Annual Step-up %
      adjustInflation: false,
      inflationRate: 6.0, // CPI Inflation %
      tradingCagr: 18.0, // Active Strategy CAGR %
      tradingVol: 22.0, // Annual Volatility %
      tradingHorizon: 10,
      projections: []
    },

    // 1. DCF Valuation State
    dcf: {
      revenueBase: 1000, // $ Millions
      growthRate: 12.0,   // %
      ebitMargin: 24.0,   // %
      taxRate: 21.0,      // %
      reinvestRate: 28.0, // CapEx & NWC as % of EBIT
      riskFreeRate: 4.25, // %
      beta: 1.20,
      erp: 5.50,          // %
      costOfDebt: 5.80,   // %
      debtWeight: 25.0,   // %
      terminalGrowth: 2.50, // %
      exitMultiple: 14.0,
      terminalMethod: 'gordon', // 'gordon' or 'multiple'
      sharesOut: 50.0,    // Millions
      netDebt: 150.0      // $ Millions (Debt - Cash)
    },

    // 2. Black-Scholes Options State
    bs: {
      spotPrice: 100.0,
      strikePrice: 100.0,
      timeDays: 60,       // Days
      riskFreeRate: 4.5,  // %
      volatility: 25.0,   // %
      optionType: 'call'  // 'call' or 'put'
    },

    // 3. Modern Portfolio Theory State
    mpt: {
      riskFreeRate: 4.0, // %
      assets: [
        { id: 'us_eq', name: 'US Large Cap', return: 10.5, vol: 16.0, weight: 35 },
        { id: 'tech',  name: 'Tech Growth',  return: 14.2, vol: 24.5, weight: 25 },
        { id: 'bonds', name: 'Govt Bonds',   return: 4.8,  vol: 6.2,  weight: 20 },
        { id: 'gold',  name: 'Commodities',  return: 7.1,  vol: 15.5, weight: 10 },
        { id: 'reit',  name: 'Real Estate',  return: 8.6,  vol: 18.0, weight: 10 }
      ],
      // Correlation Matrix (5x5)
      correlations: [
        [1.00, 0.78, 0.12, 0.05, 0.55], // US Eq
        [0.78, 1.00, 0.02, 0.15, 0.48], // Tech
        [0.12, 0.02, 1.00, 0.22, 0.20], // Bonds
        [0.05, 0.15, 0.22, 1.00, 0.18], // Gold
        [0.55, 0.48, 0.20, 0.18, 1.00]  // REIT
      ]
    },

    // 4. Algorithmic Trading & Risk State
    quant: {
      strategy: 'sma_cross', // 'sma_cross', 'bollinger', 'momentum', 'buy_hold'
      initialCapital: 100000,
      fastPeriod: 20,
      slowPeriod: 50,
      lookbackDays: 252,
      priceSeries: [],
      benchmarkSeries: [],
      strategySeries: []
    }
  };

  // ============================================================
  // Lifecycle & View Router
  // ============================================================

  function init() {
    initWealthControls();
    initDcfControls();
    initBsControls();
    initMptControls();
    initQuantControls();
    generateSyntheticPrices();
    calculateWealthGrowth();
  }

  function initView(viewName) {
    if (viewName === 'wealth-growth') {
      calculateWealthGrowth();
    } else if (viewName === 'quant-dcf') {
      calculateDcfValuation();
    } else if (viewName === 'quant-black-scholes') {
      calculateBlackScholes();
    } else if (viewName === 'quant-portfolio') {
      calculatePortfolio();
    } else if (viewName === 'quant-backtest') {
      runBacktest();
    }
  }

  // ============================================================
  // 0. Wealth Engineering (INR) Module
  // ============================================================

  // Indian Rupee currency formatter (₹, Lakhs, Crores)
  function formatINR(val, full = false) {
    if (val === null || val === undefined || isNaN(val)) return '₹ 0';
    const num = Math.round(val);
    if (full) {
      return '₹ ' + num.toLocaleString('en-IN');
    }
    if (num >= 10000000) {
      const cr = num / 10000000;
      return '₹ ' + cr.toFixed(2) + ' Cr';
    } else if (num >= 100000) {
      const lk = num / 100000;
      return '₹ ' + lk.toFixed(2) + ' Lakh';
    } else {
      return '₹ ' + num.toLocaleString('en-IN');
    }
  }

  function initWealthControls() {
    // SIP Slider
    const sipSlider = document.getElementById('wealth-sip-slider');
    const sipLabel = document.getElementById('wealth-sip-amt-label');
    if (sipSlider) {
      sipSlider.addEventListener('input', (e) => {
        state.wealth.sipAmount = parseFloat(e.target.value);
        if (sipLabel) sipLabel.textContent = `${formatINR(state.wealth.sipAmount)} / mo`;
        calculateWealthGrowth();
      });
    }

    // CAGR Slider
    const cagrSlider = document.getElementById('wealth-cagr-slider');
    const cagrLabel = document.getElementById('wealth-cagr-label');
    if (cagrSlider) {
      cagrSlider.addEventListener('input', (e) => {
        state.wealth.cagr = parseFloat(e.target.value);
        if (cagrLabel) cagrLabel.textContent = `${state.wealth.cagr.toFixed(1)}% p.a.`;
        calculateWealthGrowth();
      });
    }

    // Horizon Slider
    const horSlider = document.getElementById('wealth-horizon-slider');
    const horLabel = document.getElementById('wealth-horizon-label');
    if (horSlider) {
      horSlider.addEventListener('input', (e) => {
        state.wealth.horizonYears = parseInt(e.target.value, 10);
        if (horLabel) horLabel.textContent = `${state.wealth.horizonYears} Years`;
        calculateWealthGrowth();
      });
    }

    // Step-up Slider
    const stepSlider = document.getElementById('wealth-stepup-slider');
    const stepLabel = document.getElementById('wealth-stepup-label');
    if (stepSlider) {
      stepSlider.addEventListener('input', (e) => {
        state.wealth.stepUpPct = parseFloat(e.target.value);
        if (stepLabel) stepLabel.textContent = `${state.wealth.stepUpPct}% / year`;
        calculateWealthGrowth();
      });
    }

    // Trading Lumpsum Slider
    const lumpSlider = document.getElementById('wealth-lumpsum-slider');
    const lumpLabel = document.getElementById('wealth-lumpsum-label');
    if (lumpSlider) {
      lumpSlider.addEventListener('input', (e) => {
        state.wealth.lumpsumAmount = parseFloat(e.target.value);
        if (lumpLabel) lumpLabel.textContent = formatINR(state.wealth.lumpsumAmount);
        calculateWealthGrowth();
      });
    }

    // Trading CAGR Slider
    const tradeCagrSlider = document.getElementById('wealth-trade-cagr-slider');
    const tradeCagrLabel = document.getElementById('wealth-trade-cagr-label');
    if (tradeCagrSlider) {
      tradeCagrSlider.addEventListener('input', (e) => {
        state.wealth.tradingCagr = parseFloat(e.target.value);
        if (tradeCagrLabel) tradeCagrLabel.textContent = `${state.wealth.tradingCagr.toFixed(1)}% p.a.`;
        calculateWealthGrowth();
      });
    }

    // Trading Vol Slider
    const tradeVolSlider = document.getElementById('wealth-trade-vol-slider');
    const tradeVolLabel = document.getElementById('wealth-trade-vol-label');
    if (tradeVolSlider) {
      tradeVolSlider.addEventListener('input', (e) => {
        state.wealth.tradingVol = parseFloat(e.target.value);
        if (tradeVolLabel) tradeVolLabel.textContent = `${state.wealth.tradingVol.toFixed(1)}%`;
        calculateWealthGrowth();
      });
    }

    // Trading Horizon Slider
    const tradeHorSlider = document.getElementById('wealth-trade-horizon-slider');
    const tradeHorLabel = document.getElementById('wealth-trade-horizon-label');
    if (tradeHorSlider) {
      tradeHorSlider.addEventListener('input', (e) => {
        state.wealth.tradingHorizon = parseInt(e.target.value, 10);
        if (tradeHorLabel) tradeHorLabel.textContent = `${state.wealth.tradingHorizon} Years`;
        calculateWealthGrowth();
      });
    }
  }

  function setWealthMode(mode) {
    state.wealth.mode = mode;

    const sipBtn = document.getElementById('wealth-mode-sip-btn');
    const tradeBtn = document.getElementById('wealth-mode-trading-btn');
    const sipControls = document.getElementById('wealth-sip-controls');
    const tradeControls = document.getElementById('wealth-trading-controls');
    const chartTitle = document.getElementById('wealth-chart-title');
    const legend = document.getElementById('wealth-chart-legend');
    const capRibbon = document.getElementById('wealth-cap-ribbon');

    if (mode === 'sip') {
      if (sipBtn) {
        sipBtn.className = 'wealth-mode-btn px-3 py-1.5 text-xs font-semibold rounded-md transition-all cursor-pointer bg-[#2C221E] text-white shadow-sm';
      }
      if (tradeBtn) {
        tradeBtn.className = 'wealth-mode-btn px-3 py-1.5 text-xs font-semibold rounded-md transition-all cursor-pointer bg-white text-[#3E3632]';
      }
      if (sipControls) sipControls.classList.remove('hidden');
      if (tradeControls) tradeControls.classList.add('hidden');
      if (capRibbon) capRibbon.classList.remove('hidden');
      if (chartTitle) chartTitle.textContent = 'SIP Wealth Compounding Trajectory (INR)';
      if (legend) {
        legend.innerHTML = `
          <span class="inline-flex items-center gap-1">
            <span class="w-2.5 h-0.5 border-t-2 border-dashed border-[#7C7067]"></span> Invested
          </span>
          <span class="inline-flex items-center gap-1">
            <span class="w-2.5 h-1 rounded-sm bg-[#1E3A8A]"></span> Large Cap
          </span>
          <span class="inline-flex items-center gap-1">
            <span class="w-2.5 h-1 rounded-sm bg-[#059669]"></span> Mid Cap
          </span>
          <span class="inline-flex items-center gap-1">
            <span class="w-2.5 h-1 rounded-sm bg-[#B45309]"></span> Small Cap
          </span>
        `;
      }
    } else {
      if (tradeBtn) {
        tradeBtn.className = 'wealth-mode-btn px-3 py-1.5 text-xs font-semibold rounded-md transition-all cursor-pointer bg-[#2C221E] text-white shadow-sm';
      }
      if (sipBtn) {
        sipBtn.className = 'wealth-mode-btn px-3 py-1.5 text-xs font-semibold rounded-md transition-all cursor-pointer bg-white text-[#3E3632]';
      }
      if (tradeControls) tradeControls.classList.remove('hidden');
      if (sipControls) sipControls.classList.add('hidden');
      if (capRibbon) capRibbon.classList.add('hidden');
      if (chartTitle) chartTitle.textContent = 'Active Trading / Lumpsum Growth & Volatility Bands (INR)';
      if (legend) {
        legend.innerHTML = `
          <span class="inline-flex items-center gap-1">
            <span class="w-2.5 h-1 rounded-sm bg-[#2C221E]"></span> Expected Path
          </span>
          <span class="inline-flex items-center gap-1">
            <span class="w-2.5 h-1 rounded-sm bg-[#10B981]"></span> Upper Bull (+1&sigma;)
          </span>
          <span class="inline-flex items-center gap-1">
            <span class="w-2.5 h-1 rounded-sm bg-[#EF4444]"></span> Drawdown Risk (-1&sigma;)
          </span>
        `;
      }
    }

    calculateWealthGrowth();
  }

  function setWealthSip(amt) {
    state.wealth.sipAmount = amt;
    const slider = document.getElementById('wealth-sip-slider');
    const label = document.getElementById('wealth-sip-amt-label');
    if (slider) slider.value = amt;
    if (label) label.textContent = `${formatINR(amt)} / mo`;
    calculateWealthGrowth();
  }

  function setWealthCagr(cagr) {
    state.wealth.cagr = cagr;
    const slider = document.getElementById('wealth-cagr-slider');
    const label = document.getElementById('wealth-cagr-label');
    if (slider) slider.value = cagr;
    if (label) label.textContent = `${cagr.toFixed(1)}% p.a.`;
    calculateWealthGrowth();
  }

  function setWealthHorizon(yrs) {
    state.wealth.horizonYears = yrs;
    const slider = document.getElementById('wealth-horizon-slider');
    const label = document.getElementById('wealth-horizon-label');
    if (slider) slider.value = yrs;
    if (label) label.textContent = `${yrs} Years`;
    calculateWealthGrowth();
  }

  function toggleInflation(checked) {
    state.wealth.adjustInflation = checked;
    calculateWealthGrowth();
  }

  function calculateWealthGrowth() {
    const w = state.wealth;
    const isSip = w.mode === 'sip';
    const horizon = isSip ? w.horizonYears : w.tradingHorizon;
    const projections = [];

    if (isSip) {
      let currentMonthlySip = w.sipAmount;
      let cumInvested = 0;
      let largeCapBal = 0;
      let midCapBal = 0;
      let smallCapBal = 0;

      const largeRateMonth = (w.cagr * 0.85) / 1200; // Large cap baseline (~12.5% if CAGR=15)
      const midRateMonth = (w.cagr) / 1200;          // Mid cap (15%)
      const smallRateMonth = (w.cagr * 1.25) / 1200; // Small cap alpha (~18.75%)

      projections.push({
        year: 0,
        invested: 0,
        largeCap: 0,
        midCap: 0,
        smallCap: 0,
        gain: 0
      });

      for (let y = 1; y <= horizon; y++) {
        for (let m = 1; m <= 12; m++) {
          cumInvested += currentMonthlySip;
          largeCapBal = (largeCapBal + currentMonthlySip) * (1 + largeRateMonth);
          midCapBal = (midCapBal + currentMonthlySip) * (1 + midRateMonth);
          const cyclePerturb = 1 + (Math.sin((y * 12 + m) * 0.35) * 0.006);
          smallCapBal = (smallCapBal + currentMonthlySip) * (1 + smallRateMonth * cyclePerturb);
        }

        const inflFactor = w.adjustInflation ? Math.pow(1 + w.inflationRate / 100, y) : 1;
        const realInvested = cumInvested;
        const realLarge = largeCapBal / inflFactor;
        const realMid = midCapBal / inflFactor;
        const realSmall = smallCapBal / inflFactor;

        projections.push({
          year: y,
          invested: realInvested,
          largeCap: realLarge,
          midCap: realMid,
          smallCap: realSmall,
          gain: Math.max(0, realMid - realInvested)
        });

        // Step-up monthly SIP for the next year
        currentMonthlySip *= (1 + w.stepUpPct / 100);
      }

      const finalProj = projections[projections.length - 1];
      const multiple = finalProj.invested > 0 ? (finalProj.midCap / finalProj.invested).toFixed(2) + 'x' : '1.00x';

      updateWealthHud(finalProj.invested, finalProj.gain, finalProj.midCap, multiple, finalProj.largeCap, finalProj.midCap, finalProj.smallCap);
      renderWealthSvgChart(projections, 'sip');
      renderWealthAmortizationTable(projections, 'sip');

    } else {
      // Active Trading / Lumpsum Mode
      const P0 = w.lumpsumAmount;
      const mu = w.tradingCagr / 100;
      const sigma = w.tradingVol / 100;

      projections.push({
        year: 0,
        invested: P0,
        expected: P0,
        upperBand1: P0,
        lowerBand1: P0,
        upperBand2: P0,
        lowerBand2: P0,
        gain: 0
      });

      for (let y = 1; y <= horizon; y++) {
        const expected = P0 * Math.pow(1 + mu, y);
        const cumVol = sigma * Math.sqrt(y);
        const upper1 = expected * Math.exp(cumVol);
        const lower1 = expected * Math.exp(-cumVol);
        const upper2 = expected * Math.exp(1.96 * cumVol);
        const lower2 = expected * Math.exp(-1.96 * cumVol);

        projections.push({
          year: y,
          invested: P0,
          expected,
          upperBand1: upper1,
          lowerBand1: lower1,
          upperBand2: upper2,
          lowerBand2: lower2,
          gain: Math.max(0, expected - P0)
        });
      }

      const finalProj = projections[projections.length - 1];
      const multiple = P0 > 0 ? (finalProj.expected / P0).toFixed(2) + 'x' : '1.00x';

      updateWealthHud(P0, finalProj.gain, finalProj.expected, multiple, finalProj.lowerBand1, finalProj.expected, finalProj.upperBand1);
      renderWealthSvgChart(projections, 'trading');
      renderWealthAmortizationTable(projections, 'trading');
    }

    state.wealth.projections = projections;
  }

  function updateWealthHud(invested, gain, maturity, multiple, val1, val2, val3) {
    const invEl = document.getElementById('wealth-total-invested');
    const gainEl = document.getElementById('wealth-total-gain');
    const matEl = document.getElementById('wealth-maturity-val');
    const multEl = document.getElementById('wealth-multiple-val');

    if (invEl) invEl.textContent = formatINR(invested);
    if (gainEl) gainEl.textContent = formatINR(gain);
    if (matEl) matEl.textContent = formatINR(maturity);
    if (multEl) multEl.textContent = multiple;

    const largeEl = document.getElementById('wealth-largecap-val');
    const midEl = document.getElementById('wealth-midcap-val');
    const smallEl = document.getElementById('wealth-smallcap-val');

    if (largeEl) largeEl.textContent = formatINR(val1);
    if (midEl) midEl.textContent = formatINR(val2);
    if (smallEl) smallEl.textContent = formatINR(val3);
  }

  function renderWealthSvgChart(projections, mode) {
    const container = document.getElementById('wealth-svg-chart-container');
    if (!container || projections.length < 2) return;

    const width = 720;
    const height = 360;
    const padLeft = 70;
    const padRight = 30;
    const padTop = 30;
    const padBottom = 40;

    const plotW = width - padLeft - padRight;
    const plotH = height - padTop - padBottom;

    const maxYear = projections[projections.length - 1].year;
    let maxVal = 0;

    if (mode === 'sip') {
      maxVal = Math.max(...projections.map(p => Math.max(p.smallCap, p.midCap, p.largeCap, p.invested)));
    } else {
      maxVal = Math.max(...projections.map(p => Math.max(p.upperBand1, p.expected)));
    }
    maxVal = maxVal * 1.12 || 1000000; // 12% headroom

    const getX = (yr) => padLeft + (yr / maxYear) * plotW;
    const getY = (val) => padTop + plotH - (val / maxVal) * plotH;

    // Y-Axis Ticks (5 grid lines)
    const yTicks = [0, maxVal * 0.25, maxVal * 0.5, maxVal * 0.75, maxVal];
    let yGridSvg = '';
    yTicks.forEach(tickVal => {
      const y = getY(tickVal);
      yGridSvg += `
        <line x1="${padLeft}" y1="${y}" x2="${width - padRight}" y2="${y}" stroke="#EAE3D9" stroke-width="1" stroke-dasharray="3,3"/>
        <text x="${padLeft - 10}" y="${y + 4}" fill="#7C7067" font-size="10" font-family="monospace" text-anchor="end">${formatINR(tickVal)}</text>
      `;
    });

    // X-Axis Ticks (Years)
    let xGridSvg = '';
    const stepYr = maxYear <= 10 ? 2 : maxYear <= 20 ? 5 : 5;
    for (let yr = 0; yr <= maxYear; yr += stepYr) {
      const x = getX(yr);
      xGridSvg += `
        <line x1="${x}" y1="${padTop}" x2="${x}" y2="${height - padBottom}" stroke="#EAE3D9" stroke-width="1" stroke-dasharray="2,3"/>
        <text x="${x}" y="${height - padBottom + 18}" fill="#7C7067" font-size="10" font-family="sans-serif" text-anchor="middle">Yr ${yr}</text>
      `;
    }

    let pathsSvg = '';

    if (mode === 'sip') {
      // 1. Shaded Wealth Gain Polygon (between invested and mid cap)
      let areaD = `M ${getX(0)} ${getY(0)}`;
      projections.forEach(p => { areaD += ` L ${getX(p.year)} ${getY(p.midCap)}`; });
      for (let i = projections.length - 1; i >= 0; i--) {
        const p = projections[i];
        areaD += ` L ${getX(p.year)} ${getY(p.invested)}`;
      }
      areaD += ' Z';
      pathsSvg += `<path d="${areaD}" fill="#059669" fill-opacity="0.08"/>`;

      // 2. Invested Line (Dashed Grey)
      let invD = `M ${getX(0)} ${getY(0)}`;
      projections.forEach(p => { invD += ` L ${getX(p.year)} ${getY(p.invested)}`; });
      pathsSvg += `<path d="${invD}" fill="none" stroke="#7C7067" stroke-width="2" stroke-dasharray="4,4"/>`;

      // 3. Large Cap Line (Navy)
      let lgD = `M ${getX(0)} ${getY(0)}`;
      projections.forEach(p => { lgD += ` L ${getX(p.year)} ${getY(p.largeCap)}`; });
      pathsSvg += `<path d="${lgD}" fill="none" stroke="#1E3A8A" stroke-width="2.5"/>`;

      // 4. Mid Cap Line (Emerald)
      let midD = `M ${getX(0)} ${getY(0)}`;
      projections.forEach(p => { midD += ` L ${getX(p.year)} ${getY(p.midCap)}`; });
      pathsSvg += `<path d="${midD}" fill="none" stroke="#059669" stroke-width="3"/>`;

      // 5. Small Cap Line (Amber/Alpha)
      let smD = `M ${getX(0)} ${getY(0)}`;
      projections.forEach(p => { smD += ` L ${getX(p.year)} ${getY(p.smallCap)}`; });
      pathsSvg += `<path d="${smD}" fill="none" stroke="#B45309" stroke-width="2.5"/>`;

      // Terminal dots
      const lastP = projections[projections.length - 1];
      pathsSvg += `
        <circle cx="${getX(lastP.year)}" cy="${getY(lastP.midCap)}" r="4.5" fill="#059669" stroke="#FFFFFF" stroke-width="1.5"/>
        <circle cx="${getX(lastP.year)}" cy="${getY(lastP.smallCap)}" r="4" fill="#B45309" stroke="#FFFFFF" stroke-width="1.5"/>
      `;

    } else {
      // Active Trading / Lumpsum Mode: Volatility Channels
      // Shaded Bull Corridor (+1 sigma)
      let bullArea = `M ${getX(0)} ${getY(projections[0].expected)}`;
      projections.forEach(p => { bullArea += ` L ${getX(p.year)} ${getY(p.upperBand1)}`; });
      for (let i = projections.length - 1; i >= 0; i--) {
        const p = projections[i];
        bullArea += ` L ${getX(p.year)} ${getY(p.expected)}`;
      }
      bullArea += ' Z';
      pathsSvg += `<path d="${bullArea}" fill="#10B981" fill-opacity="0.12"/>`;

      // Shaded Drawdown Corridor (-1 sigma)
      let bearArea = `M ${getX(0)} ${getY(projections[0].expected)}`;
      projections.forEach(p => { bearArea += ` L ${getX(p.year)} ${getY(p.expected)}`; });
      for (let i = projections.length - 1; i >= 0; i--) {
        const p = projections[i];
        bearArea += ` L ${getX(p.year)} ${getY(p.lowerBand1)}`;
      }
      bearArea += ' Z';
      pathsSvg += `<path d="${bearArea}" fill="#EF4444" fill-opacity="0.10"/>`;

      // Expected Equity Path (Deep Espresso)
      let expD = `M ${getX(0)} ${getY(projections[0].expected)}`;
      projections.forEach(p => { expD += ` L ${getX(p.year)} ${getY(p.expected)}`; });
      pathsSvg += `<path d="${expD}" fill="none" stroke="#2C221E" stroke-width="3"/>`;

      // Upper Band (+1 sigma)
      let upD = `M ${getX(0)} ${getY(projections[0].upperBand1)}`;
      projections.forEach(p => { upD += ` L ${getX(p.year)} ${getY(p.upperBand1)}`; });
      pathsSvg += `<path d="${upD}" fill="none" stroke="#10B981" stroke-width="1.8" stroke-dasharray="3,3"/>`;

      // Lower Band (-1 sigma)
      let lowD = `M ${getX(0)} ${getY(projections[0].lowerBand1)}`;
      projections.forEach(p => { lowD += ` L ${getX(p.year)} ${getY(p.lowerBand1)}`; });
      pathsSvg += `<path d="${lowD}" fill="none" stroke="#EF4444" stroke-width="1.8" stroke-dasharray="3,3"/>`;

      // Terminal dot
      const lastP = projections[projections.length - 1];
      pathsSvg += `
        <circle cx="${getX(lastP.year)}" cy="${getY(lastP.expected)}" r="5" fill="#2C221E" stroke="#FFFFFF" stroke-width="1.5"/>
      `;
    }

    container.innerHTML = `
      <svg viewBox="0 0 ${width} ${height}" preserveAspectRatio="xMidYMid meet" class="w-full h-full block">
        <!-- Coordinate Axes & Gridlines -->
        ${yGridSvg}
        ${xGridSvg}

        <!-- Baseline Axis Line -->
        <line x1="${padLeft}" y1="${height - padBottom}" x2="${width - padRight}" y2="${height - padBottom}" stroke="#D8CFBF" stroke-width="1.5"/>
        <line x1="${padLeft}" y1="${padTop}" x2="${padLeft}" y2="${height - padBottom}" stroke="#D8CFBF" stroke-width="1.5"/>

        <!-- Plot Paths -->
        ${pathsSvg}

        <!-- Axes Titles -->
        <text x="${width - padRight}" y="${padTop - 10}" fill="#7C7067" font-size="10" font-family="sans-serif" text-anchor="end">Wealth Accumulation (₹)</text>
      </svg>
    `;
  }

  function renderWealthAmortizationTable(projections, mode) {
    const tbody = document.getElementById('wealth-amortization-tbody');
    if (!tbody) return;

    if (mode === 'sip') {
      tbody.innerHTML = projections.slice(1).map(p => `
        <tr class="border-b border-[#EAE3D9] text-[#3E3632]">
          <td class="py-2 px-2.5 font-bold font-mono text-[#1C1613]">Year ${p.year}</td>
          <td class="py-2 px-2.5 font-mono text-[#5C524C]">${formatINR(p.invested)}</td>
          <td class="py-2 px-2.5 font-mono font-bold text-emerald-800">${formatINR(p.gain)}</td>
          <td class="py-2 px-2.5 font-mono text-[#1E3A8A] font-semibold">${formatINR(p.largeCap)}</td>
          <td class="py-2 px-2.5 font-mono text-[#059669] font-bold">${formatINR(p.midCap)}</td>
          <td class="py-2 px-2.5 font-mono text-[#B45309] font-semibold">${formatINR(p.smallCap)}</td>
        </tr>
      `).join('');
    } else {
      tbody.innerHTML = projections.slice(1).map(p => `
        <tr class="border-b border-[#EAE3D9] text-[#3E3632]">
          <td class="py-2 px-2.5 font-bold font-mono text-[#1C1613]">Year ${p.year}</td>
          <td class="py-2 px-2.5 font-mono text-[#5C524C]">${formatINR(p.invested)}</td>
          <td class="py-2 px-2.5 font-mono font-bold text-emerald-800">${formatINR(p.gain)}</td>
          <td class="py-2 px-2.5 font-mono text-[#EF4444] font-semibold">${formatINR(p.lowerBand1)} (-1&sigma;)</td>
          <td class="py-2 px-2.5 font-mono text-[#2C221E] font-bold">${formatINR(p.expected)} (Expected)</td>
          <td class="py-2 px-2.5 font-mono text-[#10B981] font-semibold">${formatINR(p.upperBand1)} (+1&sigma;)</td>
        </tr>
      `).join('');
    }
  }
  // 1. Advanced DCF Valuation & WACC Modeling
  // ============================================================

  function initDcfControls() {
    const bindSlider = (id, prop, isPct = true) => {
      const el = document.getElementById(id);
      const valEl = document.getElementById(`${id}-val`);
      if (el) {
        el.addEventListener('input', (e) => {
          const v = parseFloat(e.target.value);
          state.dcf[prop] = v;
          if (valEl) valEl.textContent = isPct ? `${v.toFixed(1)}%` : v.toFixed(1);
          calculateDcfValuation();
        });
      }
    };

    bindSlider('dcf-growth-rate', 'growthRate');
    bindSlider('dcf-ebit-margin', 'ebitMargin');
    bindSlider('dcf-reinvest-rate', 'reinvestRate');
    bindSlider('dcf-beta', 'beta', false);
    bindSlider('dcf-rf-rate', 'riskFreeRate');
    bindSlider('dcf-debt-weight', 'debtWeight');
    bindSlider('dcf-terminal-growth', 'terminalGrowth');

    const revInput = document.getElementById('dcf-revenue-base');
    if (revInput) {
      revInput.addEventListener('input', (e) => {
        state.dcf.revenueBase = parseFloat(e.target.value) || 1000;
        calculateDcfValuation();
      });
    }

    calculateDcfValuation();
  }

  function setDcfTerminalMethod(method) {
    state.dcf.terminalMethod = method;
    const gordonBtn = document.getElementById('dcf-btn-gordon');
    const multipleBtn = document.getElementById('dcf-btn-multiple');
    const gordonRow = document.getElementById('dcf-gordon-controls');

    if (gordonBtn && multipleBtn) {
      if (method === 'gordon') {
        gordonBtn.className = "px-3 py-1 text-xs font-semibold rounded bg-[#2C221E] text-white transition-colors cursor-pointer";
        multipleBtn.className = "px-3 py-1 text-xs font-semibold rounded bg-white text-[#3E3632] hover:bg-[#EFECE6] transition-colors cursor-pointer";
        if (gordonRow) gordonRow.style.display = 'block';
      } else {
        multipleBtn.className = "px-3 py-1 text-xs font-semibold rounded bg-[#2C221E] text-white transition-colors cursor-pointer";
        gordonBtn.className = "px-3 py-1 text-xs font-semibold rounded bg-white text-[#3E3632] hover:bg-[#EFECE6] transition-colors cursor-pointer";
        if (gordonRow) gordonRow.style.display = 'none';
      }
    }
    calculateDcfValuation();
  }

  function calculateDcfValuation() {
    const d = state.dcf;

    // 1. Calculate WACC
    // Cost of Equity: r_e = r_f + beta * ERP
    const costOfEquity = (d.riskFreeRate / 100) + d.beta * (d.erp / 100);
    // After-tax Cost of Debt: r_d * (1 - t)
    const afterTaxCostOfDebt = (d.costOfDebt / 100) * (1 - (d.taxRate / 100));
    const we = 1.0 - (d.debtWeight / 100);
    const wd = d.debtWeight / 100;
    const wacc = (we * costOfEquity) + (wd * afterTaxCostOfDebt);
    const waccPct = wacc * 100;

    const waccBadge = document.getElementById('dcf-wacc-display');
    const costEqBadge = document.getElementById('dcf-cost-equity-display');
    if (waccBadge) waccBadge.textContent = `${waccPct.toFixed(2)}%`;
    if (costEqBadge) costEqBadge.textContent = `${(costOfEquity * 100).toFixed(2)}%`;

    // 2. 5-Year Cash Flow Projections
    const years = [1, 2, 3, 4, 5];
    let currentRev = d.revenueBase;
    const projections = [];
    let cumulativePvFcff = 0;

    for (const yr of years) {
      currentRev = currentRev * (1 + (d.growthRate / 100));
      const ebit = currentRev * (d.ebitMargin / 100);
      const nopat = ebit * (1 - (d.taxRate / 100));
      const reinvestment = ebit * (d.reinvestRate / 100);
      const fcff = nopat - reinvestment;
      const discountFactor = 1 / Math.pow(1 + wacc, yr);
      const pvFcff = fcff * discountFactor;
      cumulativePvFcff += pvFcff;

      projections.push({
        year: yr,
        revenue: currentRev,
        ebit,
        nopat,
        fcff,
        discountFactor,
        pvFcff
      });
    }

    // 3. Terminal Value
    const terminalGrowth = d.terminalGrowth / 100;
    const lastFcff = projections[projections.length - 1].fcff;
    let tv = 0;

    if (d.terminalMethod === 'gordon') {
      const denom = wacc - terminalGrowth;
      tv = denom > 0.005 ? (lastFcff * (1 + terminalGrowth)) / denom : (lastFcff * 25);
    } else {
      const lastEbit = projections[projections.length - 1].ebit;
      tv = lastEbit * d.exitMultiple;
    }

    const pvTv = tv / Math.pow(1 + wacc, 5);

    // 4. Valuation Bridge
    const enterpriseValue = cumulativePvFcff + pvTv;
    const equityValue = enterpriseValue - d.netDebt;
    const sharePrice = equityValue / d.sharesOut;

    // Render Table Rows
    const tableBody = document.getElementById('dcf-projection-rows');
    if (tableBody) {
      tableBody.innerHTML = `
        <tr class="border-b border-[#EAE3D9]">
          <td class="p-2.5 font-bold text-[#1C1613]">Revenue ($M)</td>
          ${projections.map(p => `<td class="p-2.5 font-mono text-right">$${p.revenue.toFixed(1)}</td>`).join('')}
        </tr>
        <tr class="border-b border-[#EAE3D9] bg-[#F7F4EF]/40">
          <td class="p-2.5 font-bold text-[#1C1613]">EBIT (${d.ebitMargin}%)</td>
          ${projections.map(p => `<td class="p-2.5 font-mono text-right text-[#2C221E]">$${p.ebit.toFixed(1)}</td>`).join('')}
        </tr>
        <tr class="border-b border-[#EAE3D9]">
          <td class="p-2.5 font-bold text-[#1C1613]">NOPAT (Tax ${d.taxRate}%)</td>
          ${projections.map(p => `<td class="p-2.5 font-mono text-right">$${p.nopat.toFixed(1)}</td>`).join('')}
        </tr>
        <tr class="border-b border-[#EAE3D9] bg-[#F7F4EF]/70 font-semibold">
          <td class="p-2.5 font-bold text-[#2C221E]">Unlevered FCF (FCFF)</td>
          ${projections.map(p => `<td class="p-2.5 font-mono text-right font-bold text-[#2C221E]">$${p.fcff.toFixed(1)}</td>`).join('')}
        </tr>
        <tr class="border-b border-[#EAE3D9] text-[#7C7067] text-[11px]">
          <td class="p-2.5">Discount Factor (WACC ${waccPct.toFixed(1)}%)</td>
          ${projections.map(p => `<td class="p-2.5 font-mono text-right">${p.discountFactor.toFixed(3)}</td>`).join('')}
        </tr>
        <tr class="bg-emerald-50/50 font-bold text-[#1C1613]">
          <td class="p-2.5">PV of FCFF ($M)</td>
          ${projections.map(p => `<td class="p-2.5 font-mono text-right text-emerald-900">$${p.pvFcff.toFixed(1)}</td>`).join('')}
        </tr>
      `;
    }

    // Render Summary Badges
    const pvFcffEl = document.getElementById('dcf-pv-fcff-val');
    const pvTvEl = document.getElementById('dcf-pv-tv-val');
    const evEl = document.getElementById('dcf-ev-val');
    const eqValEl = document.getElementById('dcf-equity-val');
    const sharePriceEl = document.getElementById('dcf-share-price-val');

    if (pvFcffEl) pvFcffEl.textContent = `$${cumulativePvFcff.toFixed(1)}M`;
    if (pvTvEl) pvTvEl.textContent = `$${pvTv.toFixed(1)}M (${((pvTv / enterpriseValue) * 100).toFixed(0)}%)`;
    if (evEl) evEl.textContent = `$${enterpriseValue.toFixed(1)}M`;
    if (eqValEl) eqValEl.textContent = `$${equityValue.toFixed(1)}M`;
    if (sharePriceEl) sharePriceEl.textContent = `$${sharePrice.toFixed(2)}`;

    // Render Sensitivity Table
    renderDcfSensitivity(cumulativePvFcff, lastFcff, d.sharesOut, d.netDebt);
  }

  function renderDcfSensitivity(cumPvFcff, lastFcff, shares, netDebt) {
    const tableContainer = document.getElementById('dcf-sensitivity-table');
    if (!tableContainer) return;

    const baseWacc = state.dcf.riskFreeRate + state.dcf.beta * state.dcf.erp; // rough proxy
    const waccSteps = [-1.0, -0.5, 0.0, 0.5, 1.0];
    const gSteps = [-0.5, 0.0, 0.5];

    let html = `
      <table class="w-full text-xs font-mono border-collapse text-center">
        <thead>
          <tr class="bg-[#F7F4EF] border-b border-[#EAE3D9] text-[10px] text-[#7C7067] uppercase">
            <th class="p-2 text-left font-sans font-bold">WACC \\ Growth (g)</th>
            ${gSteps.map(g => `<th class="p-2 font-bold">${(state.dcf.terminalGrowth + g).toFixed(1)}%</th>`).join('')}
          </tr>
        </thead>
        <tbody>
    `;

    waccSteps.forEach(wStep => {
      const activeWacc = (baseWacc + wStep) / 100;
      const isBaseRow = wStep === 0.0;
      html += `<tr class="border-b border-[#EAE3D9] ${isBaseRow ? 'bg-[#EFECE6]/70 font-bold' : ''}">`;
      html += `<td class="p-2 text-left font-bold text-[#1C1613]">${(baseWacc + wStep).toFixed(1)}%</td>`;

      gSteps.forEach(gStep => {
        const activeG = (state.dcf.terminalGrowth + gStep) / 100;
        const denom = activeWacc - activeG;
        const tv = denom > 0.005 ? (lastFcff * (1 + activeG)) / denom : 0;
        const pvTv = tv / Math.pow(1 + activeWacc, 5);
        const ev = cumPvFcff + pvTv;
        const price = (ev - netDebt) / shares;
        const isCenter = isBaseRow && gStep === 0.0;

        html += `
          <td class="p-2 ${isCenter ? 'bg-[#2C221E] text-white font-bold rounded' : 'text-[#2C221E]'}">
            $${price.toFixed(1)}
          </td>
        `;
      });
      html += `</tr>`;
    });

    html += `</tbody></table>`;
    tableContainer.innerHTML = html;
  }

  // ============================================================
  // 2. Black-Scholes Options Pricing & The Greeks
  // ============================================================

  function initBsControls() {
    const bindSlider = (id, prop, isPct = false) => {
      const el = document.getElementById(id);
      const valEl = document.getElementById(`${id}-val`);
      if (el) {
        el.addEventListener('input', (e) => {
          const v = parseFloat(e.target.value);
          state.bs[prop] = v;
          if (valEl) valEl.textContent = isPct ? `${v.toFixed(1)}%` : v.toFixed(1);
          calculateBlackScholes();
        });
      }
    };

    bindSlider('bs-spot-price', 'spotPrice');
    bindSlider('bs-strike-price', 'strikePrice');
    bindSlider('bs-time-days', 'timeDays');
    bindSlider('bs-rf-rate', 'riskFreeRate', true);
    bindSlider('bs-volatility', 'volatility', true);

    calculateBlackScholes();
  }

  function setBsOptionType(type) {
    state.bs.optionType = type;
    const callBtn = document.getElementById('bs-btn-call');
    const putBtn = document.getElementById('bs-btn-put');

    if (callBtn && putBtn) {
      if (type === 'call') {
        callBtn.className = "px-3.5 py-1.5 text-xs font-semibold rounded bg-[#2C221E] text-white transition-colors cursor-pointer";
        putBtn.className = "px-3.5 py-1.5 text-xs font-semibold rounded bg-white text-[#3E3632] hover:bg-[#EFECE6] transition-colors cursor-pointer";
      } else {
        putBtn.className = "px-3.5 py-1.5 text-xs font-semibold rounded bg-[#2C221E] text-white transition-colors cursor-pointer";
        callBtn.className = "px-3.5 py-1.5 text-xs font-semibold rounded bg-white text-[#3E3632] hover:bg-[#EFECE6] transition-colors cursor-pointer";
      }
    }
    calculateBlackScholes();
  }

  function calculateBlackScholes() {
    const S = state.bs.spotPrice;
    const K = state.bs.strikePrice;
    const T = Math.max(0.001, state.bs.timeDays / 365.0); // Years
    const r = state.bs.riskFreeRate / 100.0;
    const sigma = Math.max(0.01, state.bs.volatility / 100.0);

    const d1 = (Math.log(S / K) + (r + 0.5 * sigma * sigma) * T) / (sigma * Math.sqrt(T));
    const d2 = d1 - sigma * Math.sqrt(T);

    const callPrice = S * normCdf(d1) - K * Math.exp(-r * T) * normCdf(d2);
    const putPrice = K * Math.exp(-r * T) * normCdf(-d2) - S * normCdf(-d1);

    const isCall = state.bs.optionType === 'call';
    const price = isCall ? callPrice : putPrice;

    // Greeks Calculation
    const delta = isCall ? normCdf(d1) : normCdf(d1) - 1.0;
    const gamma = normPdf(d1) / (S * sigma * Math.sqrt(T));
    const vega = (S * Math.sqrt(T) * normPdf(d1)) / 100.0; // Per 1% vol

    let theta = 0;
    if (isCall) {
      theta = (- (S * normPdf(d1) * sigma) / (2 * Math.sqrt(T)) - r * K * Math.exp(-r * T) * normCdf(d2)) / 365.0;
    } else {
      theta = (- (S * normPdf(d1) * sigma) / (2 * Math.sqrt(T)) + r * K * Math.exp(-r * T) * normCdf(-d2)) / 365.0;
    }

    let rho = 0;
    if (isCall) {
      rho = (K * T * Math.exp(-r * T) * normCdf(d2)) / 100.0; // Per 1% rate
    } else {
      rho = (-K * T * Math.exp(-r * T) * normCdf(-d2)) / 100.0;
    }

    // Intrinsic vs Extrinsic Value
    const intrinsic = isCall ? Math.max(0, S - K) : Math.max(0, K - S);
    const timeValue = Math.max(0, price - intrinsic);

    // Update DOM Display
    const priceEl = document.getElementById('bs-option-price-display');
    const intrinsicEl = document.getElementById('bs-intrinsic-val');
    const timeValEl = document.getElementById('bs-time-val');
    const d1El = document.getElementById('bs-d1-val');
    const d2El = document.getElementById('bs-d2-val');

    if (priceEl) priceEl.textContent = `$${price.toFixed(2)}`;
    if (intrinsicEl) intrinsicEl.textContent = `$${intrinsic.toFixed(2)}`;
    if (timeValEl) timeValEl.textContent = `$${timeValue.toFixed(2)}`;
    if (d1El) d1El.textContent = d1.toFixed(3);
    if (d2El) d2El.textContent = d2.toFixed(3);

    // Update Greek Badges
    const deltaEl = document.getElementById('bs-greek-delta');
    const gammaEl = document.getElementById('bs-greek-gamma');
    const thetaEl = document.getElementById('bs-greek-theta');
    const vegaEl = document.getElementById('bs-greek-vega');
    const rhoEl = document.getElementById('bs-greek-rho');

    if (deltaEl) deltaEl.textContent = delta.toFixed(3);
    if (gammaEl) gammaEl.textContent = gamma.toFixed(4);
    if (thetaEl) thetaEl.textContent = `$${theta.toFixed(3)}/day`;
    if (vegaEl) vegaEl.textContent = `$${vega.toFixed(3)}/%`;
    if (rhoEl) rhoEl.textContent = `$${rho.toFixed(3)}/%`;

    renderBsChart(S, K, T, r, sigma, isCall);
  }

  function renderBsChart(S, K, T, r, sigma, isCall) {
    const chartContainer = document.getElementById('bs-curve-svg-container');
    if (!chartContainer) return;

    const width = 500;
    const height = 200;
    const padding = 35;

    const minS = Math.max(1, K * 0.6);
    const maxS = K * 1.4;
    const steps = 40;
    const curvePoints = [];
    const intrinsicPoints = [];

    let maxPrice = 0;

    for (let i = 0; i <= steps; i++) {
      const spot = minS + (i / steps) * (maxS - minS);
      const d1 = (Math.log(spot / K) + (r + 0.5 * sigma * sigma) * T) / (sigma * Math.sqrt(T));
      const d2 = d1 - sigma * Math.sqrt(T);
      const p = isCall ? spot * normCdf(d1) - K * Math.exp(-r * T) * normCdf(d2) : K * Math.exp(-r * T) * normCdf(-d2) - spot * normCdf(-d1);
      const intr = isCall ? Math.max(0, spot - K) : Math.max(0, K - spot);

      if (p > maxPrice) maxPrice = p;
      curvePoints.push({ s: spot, p });
      intrinsicPoints.push({ s: spot, intr });
    }

    maxPrice = Math.max(10, maxPrice * 1.15);

    const scaleX = (s) => padding + ((s - minS) / (maxS - minS)) * (width - 2 * padding);
    const scaleY = (val) => (height - padding) - (val / maxPrice) * (height - 2 * padding);

    const curvePath = curvePoints.map((pt, idx) => `${idx === 0 ? 'M' : 'L'} ${scaleX(pt.s)} ${scaleY(pt.p)}`).join(' ');
    const intrinsicPath = intrinsicPoints.map((pt, idx) => `${idx === 0 ? 'M' : 'L'} ${scaleX(pt.s)} ${scaleY(pt.intr)}`).join(' ');

    const currentX = scaleX(S);

    chartContainer.innerHTML = `
      <svg viewBox="0 0 ${width} ${height}" class="w-full h-auto">
        <!-- Axes -->
        <line x1="${padding}" y1="${height - padding}" x2="${width - padding}" y2="${height - padding}" stroke="#EAE3D9" stroke-width="1.5"/>
        <line x1="${padding}" y1="${padding}" x2="${padding}" y2="${height - padding}" stroke="#EAE3D9" stroke-width="1.5"/>

        <!-- Strike Marker Line -->
        <line x1="${scaleX(K)}" y1="${padding}" x2="${scaleX(K)}" y2="${height - padding}" stroke="#D8CFBF" stroke-dasharray="3 3"/>
        <text x="${scaleX(K)}" y="${height - padding + 15}" fill="#7C7067" font-size="9" font-family="monospace" text-anchor="middle">Strike K ($${K.toFixed(0)})</text>

        <!-- Current Spot Marker Line -->
        <line x1="${currentX}" y1="${padding}" x2="${currentX}" y2="${height - padding}" stroke="#2C221E" stroke-width="1.5" stroke-dasharray="2 2"/>
        <circle cx="${currentX}" cy="${scaleY(isCall ? S * normCdf((Math.log(S/K)+(r+0.5*sigma*sigma)*T)/(sigma*Math.sqrt(T))) - K*Math.exp(-r*T)*normCdf((Math.log(S/K)+(r+0.5*sigma*sigma)*T)/(sigma*Math.sqrt(T))-sigma*Math.sqrt(T)) : 0)}" r="4" fill="#2C221E"/>

        <!-- Intrinsic Line (Dashed) -->
        <path d="${intrinsicPath}" fill="none" stroke="#B8AEA0" stroke-width="1.5" stroke-dasharray="4 4"/>

        <!-- Black Scholes Option Value Curve -->
        <path d="${curvePath}" fill="none" stroke="#2C221E" stroke-width="2.5"/>

        <!-- Legend / Axis labels -->
        <text x="${padding + 5}" y="${padding + 10}" fill="#7C7067" font-size="9" font-family="sans-serif">Option Price ($)</text>
        <text x="${width - padding}" y="${height - padding - 6}" fill="#7C7067" font-size="9" font-family="sans-serif" text-anchor="end">Underlying Spot ($)</text>
      </svg>
    `;
  }

  // ============================================================
  // 3. Modern Portfolio Theory & Efficient Frontier
  // ============================================================

  function initMptControls() {
    const weightsContainer = document.getElementById('mpt-weights-container');
    if (!weightsContainer) return;

    weightsContainer.innerHTML = state.mpt.assets.map((asset, idx) => `
      <div class="space-y-1">
        <div class="flex justify-between items-center text-xs font-semibold text-[#2C221E]">
          <span>${asset.name}</span>
          <span id="mpt-w-label-${idx}" class="font-mono text-[11px] text-[#7C7067]">${asset.weight}%</span>
        </div>
        <input type="range" id="mpt-slider-${idx}" min="0" max="100" value="${asset.weight}" class="w-full accent-[#2C221E] cursor-pointer">
      </div>
    `).join('');

    state.mpt.assets.forEach((_, idx) => {
      const slider = document.getElementById(`mpt-slider-${idx}`);
      if (slider) {
        slider.addEventListener('input', (e) => {
          state.mpt.assets[idx].weight = parseFloat(e.target.value);
          normalizeMptWeights(idx);
          calculatePortfolio();
        });
      }
    });

    calculatePortfolio();
  }

  function normalizeMptWeights(changedIdx) {
    let sum = state.mpt.assets.reduce((acc, a) => acc + a.weight, 0);
    if (sum === 0) {
      state.mpt.assets[changedIdx].weight = 100;
      sum = 100;
    }

    state.mpt.assets.forEach((a, idx) => {
      a.weight = Math.round((a.weight / sum) * 100);
      const label = document.getElementById(`mpt-w-label-${idx}`);
      const slider = document.getElementById(`mpt-slider-${idx}`);
      if (label) label.textContent = `${a.weight}%`;
      if (slider) slider.value = a.weight;
    });
  }

  function applyMptPreset(preset) {
    if (preset === 'tangency') {
      // Max Sharpe preset
      state.mpt.assets[0].weight = 30;
      state.mpt.assets[1].weight = 40;
      state.mpt.assets[2].weight = 15;
      state.mpt.assets[3].weight = 5;
      state.mpt.assets[4].weight = 10;
    } else if (preset === 'min_var') {
      // Minimum Volatility preset
      state.mpt.assets[0].weight = 15;
      state.mpt.assets[1].weight = 5;
      state.mpt.assets[2].weight = 65;
      state.mpt.assets[3].weight = 10;
      state.mpt.assets[4].weight = 5;
    } else if (preset === 'parity') {
      // Equal risk allocation
      state.mpt.assets.forEach(a => a.weight = 20);
    }

    state.mpt.assets.forEach((a, idx) => {
      const label = document.getElementById(`mpt-w-label-${idx}`);
      const slider = document.getElementById(`mpt-slider-${idx}`);
      if (label) label.textContent = `${a.weight}%`;
      if (slider) slider.value = a.weight;
    });

    calculatePortfolio();
  }

  function calculatePortfolio() {
    const assets = state.mpt.assets;
    const corr = state.mpt.correlations;
    const n = assets.length;

    // Weights vector normalized
    const w = assets.map(a => a.weight / 100.0);

    // 1. Expected Return: E[R] = sum(w_i * R_i)
    let pReturn = 0;
    for (let i = 0; i < n; i++) {
      pReturn += w[i] * assets[i].return;
    }

    // 2. Portfolio Variance: sigma_p^2 = sum_i sum_j w_i w_j sigma_i sigma_j corr_ij
    let pVariance = 0;
    for (let i = 0; i < n; i++) {
      for (let j = 0; j < n; j++) {
        const cov = (assets[i].vol / 100.0) * (assets[j].vol / 100.0) * corr[i][j];
        pVariance += w[i] * w[j] * cov;
      }
    }
    const pVol = Math.sqrt(pVariance) * 100.0;

    // 3. Sharpe Ratio
    const rf = state.mpt.riskFreeRate;
    const pSharpe = (pReturn - rf) / pVol;

    // Update DOM
    const returnEl = document.getElementById('mpt-p-return-display');
    const volEl = document.getElementById('mpt-p-vol-display');
    const sharpeEl = document.getElementById('mpt-p-sharpe-display');

    if (returnEl) returnEl.textContent = `${pReturn.toFixed(2)}%`;
    if (volEl) volEl.textContent = `${pVol.toFixed(2)}%`;
    if (sharpeEl) sharpeEl.textContent = pSharpe.toFixed(2);

    renderEfficientFrontierChart(pVol, pReturn);
  }

  function renderEfficientFrontierChart(activeVol, activeReturn) {
    const container = document.getElementById('mpt-frontier-svg-container');
    if (!container) return;

    const width = 500;
    const height = 240;
    const padding = 35;

    // Pre-computed Markowitz Frontier curve (Vol % vs Return %)
    const frontierPoints = [
      { v: 5.2, r: 4.5 },
      { v: 5.5, r: 5.6 },
      { v: 6.2, r: 7.2 },
      { v: 7.5, r: 8.8 },
      { v: 9.2, r: 10.4 },
      { v: 11.5, r: 12.0 },
      { v: 14.5, r: 13.4 },
      { v: 18.0, r: 14.6 },
      { v: 22.0, r: 15.4 },
      { v: 25.0, r: 15.8 }
    ];

    const minX = 4.0;
    const maxX = 28.0;
    const minY = 3.0;
    const maxY = 17.0;

    const scaleX = (v) => padding + ((v - minX) / (maxX - minX)) * (width - 2 * padding);
    const scaleY = (r) => (height - padding) - ((r - minY) / (maxY - minY)) * (height - 2 * padding);

    const pathData = frontierPoints.map((pt, idx) => `${idx === 0 ? 'M' : 'L'} ${scaleX(pt.v)} ${scaleY(pt.r)}`).join(' ');

    // Capital Allocation Line (from Rf=4% tangent to ~ (11.5%, 12.0%))
    const calX1 = scaleX(0);
    const calY1 = scaleY(4.0);
    const calX2 = scaleX(26);
    const calY2 = scaleY(4.0 + (12.0 - 4.0) / 11.5 * 26);

    container.innerHTML = `
      <svg viewBox="0 0 ${width} ${height}" class="w-full h-auto">
        <!-- Axes -->
        <line x1="${padding}" y1="${height - padding}" x2="${width - padding}" y2="${height - padding}" stroke="#EAE3D9" stroke-width="1.5"/>
        <line x1="${padding}" y1="${padding}" x2="${padding}" y2="${height - padding}" stroke="#EAE3D9" stroke-width="1.5"/>

        <!-- Capital Allocation Line -->
        <line x1="${calX1}" y1="${calY1}" x2="${calX2}" y2="${calY2}" stroke="#D8CFBF" stroke-width="1.5" stroke-dasharray="3 3"/>
        <text x="${scaleX(22)}" y="${scaleY(16.5)}" fill="#7C7067" font-size="8" font-family="monospace">CAL (Tangency Line)</text>

        <!-- Efficient Frontier Curve -->
        <path d="${pathData}" fill="none" stroke="#2C221E" stroke-width="2.5"/>

        <!-- Individual Asset Dots -->
        ${state.mpt.assets.map(a => `
          <circle cx="${scaleX(a.vol)}" cy="${scaleY(a.return)}" r="4" fill="#B8AEA0"/>
          <text x="${scaleX(a.vol) + 6}" y="${scaleY(a.return) + 3}" fill="#7C7067" font-size="8" font-family="sans-serif">${a.name}</text>
        `).join('')}

        <!-- Active Portfolio Coordinate -->
        <circle cx="${scaleX(activeVol)}" cy="${scaleY(activeReturn)}" r="6" fill="#1C1613" stroke="#FFFFFF" stroke-width="2"/>
        <text x="${scaleX(activeVol)}" y="${scaleY(activeReturn) - 10}" fill="#1C1613" font-size="9" font-family="sans-serif" font-weight="bold" text-anchor="middle">Your Portfolio</text>

        <!-- Axis Labels -->
        <text x="${width - padding}" y="${height - padding - 6}" fill="#7C7067" font-size="9" font-family="sans-serif" text-anchor="end">Volatility &sigma; (%)</text>
        <text x="${padding + 5}" y="${padding + 10}" fill="#7C7067" font-size="9" font-family="sans-serif">Expected Return E[R] (%)</text>
      </svg>
    `;
  }

  // ============================================================
  // 4. Algorithmic Trading & Risk Metrics (VaR / Sharpe)
  // ============================================================

  function initQuantControls() {
    runBacktest();
  }

  function setQuantStrategy(strat) {
    state.quant.strategy = strat;
    document.querySelectorAll('.quant-strat-btn').forEach(btn => {
      if (btn.dataset.strat === strat) {
        btn.classList.add('bg-[#2C221E]', 'text-white', 'border-[#2C221E]');
        btn.classList.remove('bg-[#F7F4EF]', 'text-[#3E3632]');
      } else {
        btn.classList.remove('bg-[#2C221E]', 'text-white', 'border-[#2C221E]');
        btn.classList.add('bg-[#F7F4EF]', 'text-[#3E3632]');
      }
    });
    runBacktest();
  }

  function generateSyntheticPrices() {
    // Deterministic random walk for reproducibility
    const n = 252;
    const prices = [100.0];
    let seed = 42;
    const pseudoRandom = () => {
      seed = (seed * 9301 + 49297) % 233280;
      return seed / 233280;
    };

    for (let i = 1; i < n; i++) {
      const u1 = Math.max(0.0001, pseudoRandom());
      const u2 = pseudoRandom();
      const z = Math.sqrt(-2.0 * Math.log(u1)) * Math.cos(2.0 * Math.PI * u2); // Box-Muller
      const dailyReturn = (0.10 / 252) + (0.18 / Math.sqrt(252)) * z;
      prices.push(prices[i - 1] * (1 + dailyReturn));
    }

    state.quant.priceSeries = prices;
  }

  function runBacktest() {
    if (state.quant.priceSeries.length === 0) generateSyntheticPrices();
    const prices = state.quant.priceSeries;
    const n = prices.length;
    const strat = state.quant.strategy;

    const benchmarkEquity = [100000];
    const strategyEquity = [100000];
    const dailyStratReturns = [];

    let inPosition = true;

    for (let i = 1; i < n; i++) {
      const ret = (prices[i] - prices[i - 1]) / prices[i - 1];
      benchmarkEquity.push(benchmarkEquity[i - 1] * (1 + ret));

      // Strategy Signal
      if (strat === 'sma_cross') {
        const fastSma = i >= 20 ? prices.slice(i - 20, i).reduce((a, b) => a + b, 0) / 20 : prices[i];
        const slowSma = i >= 50 ? prices.slice(i - 50, i).reduce((a, b) => a + b, 0) / 50 : prices[i];
        inPosition = fastSma >= slowSma;
      } else if (strat === 'momentum') {
        const mom = i >= 14 ? (prices[i] - prices[i - 14]) / prices[i - 14] : 0;
        inPosition = mom > 0.01;
      } else if (strat === 'bollinger') {
        const mean = i >= 20 ? prices.slice(i - 20, i).reduce((a, b) => a + b, 0) / 20 : prices[i];
        inPosition = prices[i] <= mean;
      } else {
        inPosition = true; // Buy & Hold
      }

      const stratDailyRet = inPosition ? ret : 0.0001; // cash yield
      dailyStratReturns.push(stratDailyRet);
      strategyEquity.push(strategyEquity[i - 1] * (1 + stratDailyRet));
    }

    // Risk Metrics Calculation
    const totalReturn = ((strategyEquity[n - 1] - 100000) / 100000) * 100;
    const bmTotalReturn = ((benchmarkEquity[n - 1] - 100000) / 100000) * 100;

    const avgDaily = dailyStratReturns.reduce((a, b) => a + b, 0) / dailyStratReturns.length;
    const varDaily = dailyStratReturns.reduce((a, b) => a + Math.pow(b - avgDaily, 2), 0) / dailyStratReturns.length;
    const dailyVol = Math.sqrt(varDaily);
    const annualizedVol = dailyVol * Math.sqrt(252) * 100;

    const sharpe = ((totalReturn - 4.0) / annualizedVol);

    // Max Drawdown
    let peak = strategyEquity[0];
    let maxDd = 0;
    const ddSeries = [];

    for (let i = 0; i < n; i++) {
      if (strategyEquity[i] > peak) peak = strategyEquity[i];
      const dd = (peak - strategyEquity[i]) / peak;
      if (dd > maxDd) maxDd = dd;
      ddSeries.push(-dd * 100);
    }

    // Value at Risk (95% & 99% Parametric)
    const var95 = (1.645 * dailyVol * 100).toFixed(2);
    const var99 = (2.326 * dailyVol * 100).toFixed(2);

    // Update UI Elements
    const totalRetEl = document.getElementById('quant-tot-return');
    const bmRetEl = document.getElementById('quant-bm-return');
    const volEl = document.getElementById('quant-annual-vol');
    const sharpeEl = document.getElementById('quant-sharpe-val');
    const maxDdEl = document.getElementById('quant-max-dd');
    const var95El = document.getElementById('quant-var-95');
    const var99El = document.getElementById('quant-var-99');

    if (totalRetEl) totalRetEl.textContent = `${totalReturn >= 0 ? '+' : ''}${totalReturn.toFixed(1)}%`;
    if (bmRetEl) bmRetEl.textContent = `${bmTotalReturn >= 0 ? '+' : ''}${bmTotalReturn.toFixed(1)}%`;
    if (volEl) volEl.textContent = `${annualizedVol.toFixed(1)}%`;
    if (sharpeEl) sharpeEl.textContent = sharpe.toFixed(2);
    if (maxDdEl) maxDdEl.textContent = `-${(maxDd * 100).toFixed(1)}%`;
    if (var95El) var95El.textContent = `-${var95}% / day`;
    if (var99El) var99El.textContent = `-${var99}% / day`;

    renderBacktestChart(strategyEquity, benchmarkEquity, ddSeries);
  }

  function renderBacktestChart(stratEq, bmEq, ddSeries) {
    const container = document.getElementById('quant-chart-svg-container');
    if (!container) return;

    const width = 500;
    const height = 230;
    const padding = 35;
    const n = stratEq.length;

    const allVals = stratEq.concat(bmEq);
    const minVal = Math.min(...allVals) * 0.98;
    const maxVal = Math.max(...allVals) * 1.02;

    const scaleX = (i) => padding + (i / (n - 1)) * (width - 2 * padding);
    const scaleY = (v) => (height - 70) - ((v - minVal) / (maxVal - minVal)) * (height - 90);

    const stratPath = stratEq.map((v, i) => `${i === 0 ? 'M' : 'L'} ${scaleX(i)} ${scaleY(v)}`).join(' ');
    const bmPath = bmEq.map((v, i) => `${i === 0 ? 'M' : 'L'} ${scaleX(i)} ${scaleY(v)}`).join(' ');

    // Drawdown underwater profile (bottom 45px)
    const ddScaleY = (dd) => height - 10 + (dd / 30) * 45; // dd is negative
    const ddPath = ddSeries.map((dd, i) => `${i === 0 ? 'M' : 'L'} ${scaleX(i)} ${ddScaleY(dd)}`).join(' ');

    container.innerHTML = `
      <svg viewBox="0 0 ${width} ${height}" class="w-full h-auto">
        <!-- Gridlines -->
        <line x1="${padding}" y1="${height - 70}" x2="${width - padding}" y2="${height - 70}" stroke="#EAE3D9" stroke-width="1.5"/>
        <line x1="${padding}" y1="${height - 10}" x2="${width - padding}" y2="${height - 10}" stroke="#EAE3D9" stroke-width="1"/>

        <!-- Benchmark Equity Line (Dashed) -->
        <path d="${bmPath}" fill="none" stroke="#D8CFBF" stroke-width="1.5" stroke-dasharray="3 3"/>

        <!-- Strategy Equity Line -->
        <path d="${stratPath}" fill="none" stroke="#2C221E" stroke-width="2.5"/>

        <!-- Underwater Drawdown Area -->
        <path d="${ddPath}" fill="none" stroke="#E11D48" stroke-width="1"/>

        <!-- Text Annotations -->
        <text x="${padding + 5}" y="${padding + 5}" fill="#2C221E" font-size="9" font-family="sans-serif" font-weight="bold">Strategy Equity ($)</text>
        <text x="${width - padding}" y="${padding + 5}" fill="#7C7067" font-size="8" font-family="sans-serif" text-anchor="end">--- Benchmark</text>
        <text x="${padding + 5}" y="${height - 55}" fill="#9C9087" font-size="8" font-family="monospace">Underwater Drawdown Profile</text>
      </svg>
    `;
  }

  // Public API
  return {
    init,
    initView,

    // Wealth Engineering (INR)
    calculateWealthGrowth,
    setWealthMode,
    setWealthSip,
    setWealthCagr,
    setWealthHorizon,
    toggleInflation,
    formatINR,

    // DCF
    calculateDcfValuation,
    setDcfTerminalMethod,

    // Black-Scholes
    calculateBlackScholes,
    setBsOptionType,

    // MPT
    calculatePortfolio,
    applyMptPreset,

    // Quant
    setQuantStrategy,
    runBacktest
  };

})();

// Expose globally
window.FINANCE_MODULE = FINANCE_MODULE;
