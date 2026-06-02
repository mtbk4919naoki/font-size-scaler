/**
 * Font Size Scaler — application logic
 * Sections: i18n → constants/state → scale math → CSS export → UI render → init
 * @see docs/DEVELOPMENT.md
 */
    const I18N = {
      ja: {
        headerSubtitle: '<code>pow()</code> ベースの流動タイポグラフィ設定ツール — 参照: <a href="https://coliss.com/articles/build-websites/operation/css/fluid-modular-type-scale.html" target="_blank" rel="noopener">coliss 記事</a>',
        langJa: '日本語', langEn: 'English',
        secBaseSize: '基底フォントサイズ', secFloor: '絶対下限', secRatio: 'スケール比',
        secViewport: 'ビューポート幅', secOther: 'その他',
        fontSizeMin: 'SP (--font-size-min)', fontSizeMax: 'PC (--font-size-max)',
        fontSizeFloor: 'フォント下限 (--font-size-floor)',
        fontRatioMin: 'SP (--font-ratio-min)', fontRatioMax: 'PC (--font-ratio-max)',
        fontWidthMin: '最小 (--font-width-min)', fontWidthMax: '最大 (--font-width-max)',
        remBase: 'rem 換算基準 (px)', variableUnit: '--variable-unit',
        unitVi: '100vi (viewport)', unitCqi: '100cqi (container)',
        levelMin: '表示レベル min', levelMax: '表示レベル max',
        secPractical: '実用チェック',
        practicalTarget1: '目標サイズ A (px)',
        practicalTarget2: '目標サイズ B (px)',
        practicalIntro: '各目標 px について、SP / PC それぞれで最も近い整数レベルとその前後 1 段階を表示します。',
        practicalTargetHeading: '目標 {px}px',
        practicalSpBlock: 'SP（{vw}px 時）— 最接近 Lv {level}（{size}、Δ {diff}px）',
        practicalPcBlock: 'PC（{vw}px 時）— 最接近 Lv {level}（{size}、Δ {diff}px）',
        colDiff: '差分',
        badgeClosest: '最接近',
        rowPrev: '1つ下', rowNext: '1つ上',
        scaleTable: 'スケール表',
        scaleNote: '<strong>pow()</strong>: base × ratio<sup>level</sup> — ジャンプ率は SP {spJump} / PC {pcJump} で一定（下限適用時のみ SP が変動）。絶対下限 {floor}px 未満はクランプ。',
        colLevel: 'レベル', colUsage: '用途', colSp: '(SP)', colPc: '(PC)',
        colJumpSp: 'ジャンプ率 SP', colJumpPc: 'ジャンプ率 PC', colNotes: '備考',
        tipLevel: 'モジュラースケールの段階。0 = 基底、正 = 大きい、負 = 小さい。',
        tipUsage: 'CSS クラス名などに使う用途ラベル。編集可能。',
        tipSp: '最小ビューポート ({vw}px) 時の clamp 下限。絶対下限 {floor}px を適用後。',
        tipPc: '最大ビューポート ({vw}px) 時の clamp 上限。',
        tipPreview: 'プレビュー中のビューポート ({vw}px) での実際の font-size。',
        tipJumpSp: 'ひとつ下のレベルからの倍率（SP 端）。通常 {ratio}×。下限適用時は * 付き。',
        tipJumpPc: 'ひとつ下のレベルからの倍率（PC 端）。通常 {ratio}×。',
        tipNotes: 'WCAG 判定、下限クランプ、目標本文サイズに近いレベルなど。',
        badgeFloor: '下限', badgeTarget: '≈{px}px',
        floorTitle: '計算値 {raw}',
        previewTitle: 'タイポグラフィプレビュー', previewViewport: 'ビューポート',
        previewSample: 'あいうえお The quick brown fox — {label}',
        wcagTitle: 'WCAG アクセシビリティチェック',
        wcagNote: 'WCAG は px 固定の最小フォントを規定しませんが、本文 <strong>16px 推奨</strong>（1.4.4）。大文字 AA: ≥24px（太字 ≥19px）で 3:1（1.4.3）。AAA 大文字: ≥18.67px 太字 / ≥24px で 4.5:1（1.4.6）。(SP) は下限 {floor}px 適用後。{vw}px 列はプレビュー幅でのサイズ。200% 列は ×2。',
        wcagColSp: '(SP)', wcagColPreview: '{vw}px', wcagColBody: '本文 16px',
        wcagColType: '文字種別 (AA)', wcagCol200: '200% 時',
        tipWcagBody: '16px 以上が本文として推奨。12px 未満は注釈用途に限定。',
        tipWcagType: '大文字 (≥24px / 太字 ≥19px) は AA コントラスト 3:1。通常文字は 4.5:1。',
        tipWcag200: '1.4.4 目安: ブラウザ 200% 拡大時のサイズ（プレビュー列 ×2）。',
        wcagBodyOk: 'AA 推奨', wcagBodySmall: 'やや小', wcagBodyCaption: '注釈向け',
        wcagBodyCheck: '要確認', wcagBodyFail: '非推奨',
        wcagLargeAaa: '大文字 AAA', wcagLargeAa: '大文字 AA', wcagNormal: '通常文字',
        wcagNormalShort: '通常 (4.5:1)',
        practicalTitle: '実用チェック',
        practicalLv0Note: 'Lv0 (SP) = {size}。',
        practicalLv0Sp: 'Lv0 (SP)', practicalLv0Hint: 'これより小さい字は Lv < 0',
        cssTitle: 'CSS 出力', cssVanilla: 'Vanilla CSS', cssTailwind: 'Tailwind v4',
        copy: 'コピー', copied: 'コピー済',
        intLevel: '（整数なら Lv {n}）',
      },
      en: {
        headerSubtitle: 'Fluid typography configurator with <code>pow()</code> — Ref: <a href="https://coliss.com/articles/build-websites/operation/css/fluid-modular-type-scale.html" target="_blank" rel="noopener">coliss article</a>',
        langJa: '日本語', langEn: 'English',
        secBaseSize: 'Base font size', secFloor: 'Absolute floor', secRatio: 'Scale ratio',
        secViewport: 'Viewport width', secOther: 'Other',
        fontSizeMin: 'SP (--font-size-min)', fontSizeMax: 'PC (--font-size-max)',
        fontSizeFloor: 'Font floor (--font-size-floor)',
        fontRatioMin: 'SP (--font-ratio-min)', fontRatioMax: 'PC (--font-ratio-max)',
        fontWidthMin: 'Min (--font-width-min)', fontWidthMax: 'Max (--font-width-max)',
        remBase: 'rem base (px)', variableUnit: '--variable-unit',
        unitVi: '100vi (viewport)', unitCqi: '100cqi (container)',
        levelMin: 'Display level min', levelMax: 'Display level max',
        secPractical: 'Practical check',
        practicalTarget1: 'Target size A (px)',
        practicalTarget2: 'Target size B (px)',
        practicalIntro: 'For each target px, shows the nearest integer level on SP / PC and one step above and below.',
        practicalTargetHeading: 'Target {px}px',
        practicalSpBlock: 'SP ({vw}px) — nearest Lv {level} ({size}, Δ {diff}px)',
        practicalPcBlock: 'PC ({vw}px) — nearest Lv {level} ({size}, Δ {diff}px)',
        colDiff: 'Diff',
        badgeClosest: 'nearest',
        rowPrev: 'below', rowNext: 'above',
        scaleTable: 'Scale table',
        scaleNote: '<strong>pow()</strong>: base × ratio<sup>level</sup> — jump rate is constant at SP {spJump} / PC {pcJump} (SP varies when floor applies). Values below {floor}px are clamped.',
        colLevel: 'Level', colUsage: 'Usage', colSp: '(SP)', colPc: '(PC)',
        colJumpSp: 'Jump SP', colJumpPc: 'Jump PC', colNotes: 'Notes',
        tipLevel: 'Modular scale step. 0 = base, positive = larger, negative = smaller.',
        tipUsage: 'Usage label for CSS class names. Editable.',
        tipSp: 'clamp minimum at min viewport ({vw}px), after {floor}px floor.',
        tipPc: 'clamp maximum at max viewport ({vw}px).',
        tipPreview: 'Computed font-size at preview viewport ({vw}px).',
        tipJumpSp: 'Ratio from previous level (SP end). Usually {ratio}×. * when floor applies.',
        tipJumpPc: 'Ratio from previous level (PC end). Usually {ratio}×.',
        tipNotes: 'WCAG status, floor clamp, level nearest target body size, etc.',
        badgeFloor: 'floor', badgeTarget: '≈{px}px',
        floorTitle: 'Computed {raw}',
        previewTitle: 'Typography preview', previewViewport: 'Viewport',
        previewSample: 'The quick brown fox — {label}',
        wcagTitle: 'WCAG accessibility check',
        wcagNote: 'WCAG does not mandate a minimum px size; <strong>16px body</strong> is recommended (1.4.4). Large AA: ≥24px (bold ≥19px) at 3:1 (1.4.3). AAA large: ≥18.67px bold / ≥24px at 4.5:1 (1.4.6). (SP) after {floor}px floor. {vw}px column = size at preview width. 200% = ×2.',
        wcagColSp: '(SP)', wcagColPreview: '{vw}px', wcagColBody: 'Body 16px',
        wcagColType: 'Text type (AA)', wcagCol200: 'At 200%',
        tipWcagBody: '16px+ recommended for body. Below 12px suits captions only.',
        tipWcagType: 'Large text (≥24px / bold ≥19px) uses 3:1 AA contrast. Normal text uses 4.5:1.',
        tipWcag200: '1.4.4 guide: size at 200% browser zoom (preview column ×2).',
        wcagBodyOk: 'AA OK', wcagBodySmall: 'Slightly small', wcagBodyCaption: 'Caption',
        wcagBodyCheck: 'Review', wcagBodyFail: 'Not recommended',
        wcagLargeAaa: 'Large AAA', wcagLargeAa: 'Large AA', wcagNormal: 'Normal',
        wcagNormalShort: 'Normal (4.5:1)',
        practicalTitle: 'Practical check',
        practicalLv0Note: 'Lv0 (SP) = {size}.',
        practicalLv0Sp: 'Lv0 (SP)', practicalLv0Hint: 'Smaller text uses Lv < 0',
        cssTitle: 'CSS output', cssVanilla: 'Vanilla CSS', cssTailwind: 'Tailwind v4',
        copy: 'Copy', copied: 'Copied',
        intLevel: '(integer ≈ Lv {n})',
      },
    };

    function t(key, vars = {}) {
      let s = (I18N[state.lang] || I18N.en)[key] ?? key;
      Object.entries(vars).forEach(([k, v]) => { s = s.replaceAll(`{${k}}`, v); });
      return s;
    }

    function escapeAttr(s) {
      return s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');
    }

    function thTip(label, tip) {
      return `<span class="th-inner">${label}<span class="tip-icon" data-tip="${escapeAttr(tip)}" tabindex="0" role="note">ⓘ</span></span>`;
    }

    const RATIO_PRESETS = [
      { value: 1.067, ja: '短二度', en: 'Minor 2nd' },
      { value: 1.125, ja: '長二度', en: 'Major 2nd' },
      { value: 1.2, ja: '短三度', en: 'Minor 3rd' },
      { value: 1.25, ja: '長三度', en: 'Major 3rd' },
      { value: 1.333, ja: '完全四度', en: 'Perfect 4th' },
      { value: 1.414, ja: '増四度', en: 'Augmented 4th' },
      { value: 1.5, ja: '完全五度', en: 'Perfect 5th' },
      { value: 1.618, ja: '黄金比', en: 'Golden Ratio' },
    ];

    const WCAG = {
      bodyRecommended: 16,
      captionMin: 12,
      absoluteMin: 10,
      largeTextAA: 24,
      largeTextAABold: 19,
      largeTextAAA: 24,
      largeTextAAABold: 18.67,
    };

    const DEFAULTS = {
      fontSizeMin: 15,
      fontSizeMax: 16,
      fontRatioMin: 1.2,
      fontRatioMax: 1.333,
      fontWidthMin: 360,
      fontWidthMax: 1440,
      fontSizeFloor: 8,
      remBase: 16,
      variableUnit: '100vi',
      levelMin: -3,
      levelMax: 9,
      practicalTarget1: 16,
      practicalTarget2: 12,
      previewViewport: 768,
    };

    const state = {
      ...DEFAULTS,
      labels: {},
      cssTab: 'vanilla',
      lang: 'ja',
    };

    function getConfig() {
      return {
        fontSizeMin: state.fontSizeMin,
        fontSizeMax: state.fontSizeMax,
        fontRatioMin: state.fontRatioMin,
        fontRatioMax: state.fontRatioMax,
        fontWidthMin: state.fontWidthMin,
        fontWidthMax: state.fontWidthMax,
        fontSizeFloor: state.fontSizeFloor,
        remBase: state.remBase,
        variableUnit: state.variableUnit,
      };
    }

    // --- Scale math ---

    function applyFloor(px, c) {
      return Math.max(px, c.fontSizeFloor);
    }

    function fluidMin(level, c) {
      return c.fontSizeMin * Math.pow(c.fontRatioMin, level);
    }

    function fluidMax(level, c) {
      return c.fontSizeMax * Math.pow(c.fontRatioMax, level);
    }

    function slope(level, c) {
      return (fluidMax(level, c) - fluidMin(level, c)) / (c.fontWidthMax - c.fontWidthMin);
    }

    function sizeAtViewport(level, vw, c) {
      const min = fluidMin(level, c);
      const max = fluidMax(level, c);
      const m = slope(level, c);
      const preferred = min - m * c.fontWidthMin + m * vw;
      return applyFloor(Math.max(min, Math.min(max, preferred)), c);
    }

    function effectiveSpMin(level, c) {
      return applyFloor(fluidMin(level, c), c);
    }

    function isFloored(level, c) {
      return fluidMin(level, c) < c.fontSizeFloor;
    }

    function levelForSize(targetPx, isMin, c) {
      const base = isMin ? c.fontSizeMin : c.fontSizeMax;
      const ratio = isMin ? c.fontRatioMin : c.fontRatioMax;
      if (targetPx <= 0 || base <= 0 || ratio <= 0 || ratio === 1) return null;
      return Math.log(targetPx / base) / Math.log(ratio);
    }

    function fmt(px, digits = 2) {
      return Number(px.toFixed(digits));
    }

    function fmtPx(px) {
      return `${fmt(px)}px`;
    }

    function fmtRatio(a, b) {
      if (!b) return '—';
      return fmt(a / b, 3) + '×';
    }

    function getLabel(level) {
      return state.labels[level] ?? defaultLabel(level);
    }

    function defaultLabel(level) {
      const map = {
        '-3': 'micro', '-2': 'caption', '-1': 'small', 0: 'body',
        1: 'lead', 2: 'h4', 3: 'h3', 4: 'h2', 5: 'h1',
        6: 'display', 7: 'hero', 8: 'mega', 9: 'jumbo',
      };
      return map[String(level)] ?? `level-${level}`;
    }

    function presetLabel(p) {
      return state.lang === 'ja' ? p.ja : p.en;
    }

    function wcagBodyStatus(px) {
      if (px >= WCAG.bodyRecommended) return { label: t('wcagBodyOk'), badge: 'badge-aa' };
      if (px >= 14) return { label: t('wcagBodySmall'), badge: 'badge-warn' };
      if (px >= WCAG.captionMin) return { label: t('wcagBodyCaption'), badge: 'badge-warn' };
      if (px >= WCAG.absoluteMin) return { label: t('wcagBodyCheck'), badge: 'badge-danger' };
      return { label: t('wcagBodyFail'), badge: 'badge-fail' };
    }

    function wcagLargeTextStatus(px, bold = false) {
      const isLargeAA = bold ? px >= WCAG.largeTextAABold : px >= WCAG.largeTextAA;
      const isLargeAAA = bold ? px >= WCAG.largeTextAAABold : px >= WCAG.largeTextAAA;
      if (isLargeAAA) return { label: t('wcagLargeAaa'), badge: 'badge-aaa', contrast: '4.5:1' };
      if (isLargeAA) return { label: t('wcagLargeAa'), badge: 'badge-aa', contrast: '3:1' };
      return { label: t('wcagNormal'), badge: '', contrast: '4.5:1 (AA)' };
    }

    function wcagCheckLevel(level, c) {
      const rawSp = fluidMin(level, c);
      const sp = effectiveSpMin(level, c);
      const pc = fluidMax(level, c);
      const atVw = sizeAtViewport(level, state.previewViewport, c);
      const body = wcagBodyStatus(sp);
      const largeSp = wcagLargeTextStatus(sp);
      const largePc = wcagLargeTextStatus(pc);
      const zoom200 = atVw * 2;
      return { rawSp, sp, pc, atVw, body, largeSp, largePc, zoom200, floored: rawSp < c.fontSizeFloor };
    }

    function levelsRange() {
      const arr = [];
      for (let i = state.levelMin; i <= state.levelMax; i++) arr.push(i);
      return arr;
    }

    // --- UI render ---

    function buildControls() {
      const el = document.getElementById('controls');
      el.innerHTML = `
        <div class="section-title">${t('secBaseSize')}</div>
        <div class="field-row">
          <div class="field">
            <label for="fontSizeMin">${t('fontSizeMin')}</label>
            <input type="number" id="fontSizeMin" value="${state.fontSizeMin}" min="8" max="48" step="0.5">
          </div>
          <div class="field">
            <label for="fontSizeMax">${t('fontSizeMax')}</label>
            <input type="number" id="fontSizeMax" value="${state.fontSizeMax}" min="8" max="72" step="0.5">
          </div>
        </div>

        <div class="section-title">${t('secFloor')}</div>
        <div class="field">
          <label for="fontSizeFloor">${t('fontSizeFloor')}</label>
          <input type="number" id="fontSizeFloor" value="${state.fontSizeFloor}" min="0" max="24" step="0.5">
        </div>

        <div class="section-title">${t('secRatio')}</div>
        <div class="preset-btns" id="ratioMinPresets"></div>
        <div class="field">
          <label for="fontRatioMin">${t('fontRatioMin')}</label>
          <input type="number" id="fontRatioMin" value="${state.fontRatioMin}" min="1.01" max="2" step="0.001">
        </div>
        <div class="preset-btns" id="ratioMaxPresets"></div>
        <div class="field">
          <label for="fontRatioMax">${t('fontRatioMax')}</label>
          <input type="number" id="fontRatioMax" value="${state.fontRatioMax}" min="1.01" max="2" step="0.001">
        </div>

        <div class="section-title">${t('secViewport')}</div>
        <div class="field-row">
          <div class="field">
            <label for="fontWidthMin">${t('fontWidthMin')}</label>
            <input type="number" id="fontWidthMin" value="${state.fontWidthMin}" min="240" max="1200" step="1">
          </div>
          <div class="field">
            <label for="fontWidthMax">${t('fontWidthMax')}</label>
            <input type="number" id="fontWidthMax" value="${state.fontWidthMax}" min="600" max="2560" step="1">
          </div>
        </div>

        <div class="section-title">${t('secOther')}</div>
        <div class="field-row">
          <div class="field">
            <label for="remBase">${t('remBase')}</label>
            <input type="number" id="remBase" value="${state.remBase}" min="10" max="24" step="1">
          </div>
          <div class="field">
            <label for="variableUnit">${t('variableUnit')}</label>
            <select id="variableUnit">
              <option value="100vi" ${state.variableUnit === '100vi' ? 'selected' : ''}>${t('unitVi')}</option>
              <option value="100cqi" ${state.variableUnit === '100cqi' ? 'selected' : ''}>${t('unitCqi')}</option>
            </select>
          </div>
        </div>
        <div class="field-row">
          <div class="field">
            <label for="levelMin">${t('levelMin')}</label>
            <input type="number" id="levelMin" value="${state.levelMin}" min="-6" max="10" step="1">
          </div>
          <div class="field">
            <label for="levelMax">${t('levelMax')}</label>
            <input type="number" id="levelMax" value="${state.levelMax}" min="-6" max="12" step="1">
          </div>
        </div>
        <div class="section-title">${t('secPractical')}</div>
        <div class="field-row">
          <div class="field">
            <label for="practicalTarget1">${t('practicalTarget1')}</label>
            <input type="number" id="practicalTarget1" value="${state.practicalTarget1}" min="6" max="72" step="0.5">
          </div>
          <div class="field">
            <label for="practicalTarget2">${t('practicalTarget2')}</label>
            <input type="number" id="practicalTarget2" value="${state.practicalTarget2}" min="6" max="72" step="0.5">
          </div>
        </div>
      `;

      refreshPresetButtons();

      el.querySelectorAll('input, select').forEach(input => {
        input.addEventListener('input', () => { readControls(); render(); });
        input.addEventListener('change', () => { readControls(); render(); });
      });
    }

    function renderLangToggle() {
      const el = document.getElementById('langToggle');
      el.innerHTML = `
        <button type="button" data-lang="ja" class="${state.lang === 'ja' ? 'active' : ''}">${t('langJa')}</button>
        <button type="button" data-lang="en" class="${state.lang === 'en' ? 'active' : ''}">${t('langEn')}</button>
      `;
      el.querySelectorAll('button').forEach(btn => {
        btn.addEventListener('click', () => setLang(btn.dataset.lang));
      });
    }

    function setLang(lang) {
      if (document.getElementById('fontSizeMin')) readControls();
      state.lang = lang;
      document.documentElement.lang = lang;
      document.getElementById('headerSubtitle').innerHTML = t('headerSubtitle');
      renderLangToggle();
      buildControls();
      render();
    }

    function refreshPresetButtons() {
      ['ratioMinPresets', 'ratioMaxPresets'].forEach((id, idx) => {
        const targetId = idx === 0 ? 'fontRatioMin' : 'fontRatioMax';
        const container = document.getElementById(id);
        if (!container) return;
        container.innerHTML = '';
        RATIO_PRESETS.forEach(p => {
          const btn = document.createElement('button');
          btn.type = 'button';
          btn.textContent = presetLabel(p);
          btn.title = `${p.ja} / ${p.en} (${p.value})`;
          btn.addEventListener('click', () => {
            document.getElementById(targetId).value = p.value;
            readControls();
            render();
          });
          container.appendChild(btn);
        });
      });
    }

    function readControls() {
      const num = id => parseFloat(document.getElementById(id).value);
      const int = id => parseInt(document.getElementById(id).value, 10);
      state.fontSizeMin = num('fontSizeMin');
      state.fontSizeMax = num('fontSizeMax');
      state.fontRatioMin = num('fontRatioMin');
      state.fontRatioMax = num('fontRatioMax');
      state.fontWidthMin = int('fontWidthMin');
      state.fontWidthMax = int('fontWidthMax');
      state.fontSizeFloor = num('fontSizeFloor');
      state.remBase = int('remBase');
      state.variableUnit = document.getElementById('variableUnit').value;
      state.levelMin = int('levelMin');
      state.levelMax = int('levelMax');
      state.practicalTarget1 = num('practicalTarget1');
      state.practicalTarget2 = num('practicalTarget2');
      if (state.levelMin > state.levelMax) {
        [state.levelMin, state.levelMax] = [state.levelMax, state.levelMin];
      }
    }

    function getPracticalTargets() {
      return [state.practicalTarget1, state.practicalTarget2].filter(px => px > 0);
    }

    function sizeAtEndpoint(level, isSp, c) {
      return isSp ? effectiveSpMin(level, c) : fluidMax(level, c);
    }

    function closestIntegerLevel(targetPx, isSp, c) {
      let bestLevel = null;
      let bestDiff = Infinity;
      const lo = state.levelMin - 6;
      const hi = state.levelMax + 6;
      for (let l = lo; l <= hi; l++) {
        const size = sizeAtEndpoint(l, isSp, c);
        const diff = Math.abs(size - targetPx);
        if (diff < bestDiff) {
          bestDiff = diff;
          bestLevel = l;
        }
      }
      return {
        level: bestLevel,
        size: sizeAtEndpoint(bestLevel, isSp, c),
        diff: bestDiff,
      };
    }

    function neighborLevels(centerLevel) {
      return [centerLevel - 1, centerLevel, centerLevel + 1];
    }

    function renderNeighborTable(targetPx, isSp, c) {
      const vw = isSp ? c.fontWidthMin : c.fontWidthMax;
      const closest = closestIntegerLevel(targetPx, isSp, c);
      const rows = neighborLevels(closest.level).map(level => {
        const size = sizeAtEndpoint(level, isSp, c);
        const diff = size - targetPx;
        const diffStr = (diff >= 0 ? '+' : '') + fmt(diff, 2) + 'px';
        const isCenter = level === closest.level;
        const posLabel = level < closest.level ? t('rowPrev') : level > closest.level ? t('rowNext') : t('badgeClosest');
        return `<tr class="${isCenter ? 'highlight-row' : ''}">
          <td>${level}</td>
          <td>${getLabel(level)}</td>
          <td>${fmtPx(size)}</td>
          <td>${diffStr}</td>
          <td>${isCenter ? `<span class="badge badge-ok">${t('badgeClosest')}</span>` : posLabel}</td>
        </tr>`;
      }).join('');

      const blockTitle = isSp
        ? t('practicalSpBlock', { vw, level: closest.level, size: fmtPx(closest.size), diff: fmt(closest.diff, 2) })
        : t('practicalPcBlock', { vw, level: closest.level, size: fmtPx(closest.size), diff: fmt(closest.diff, 2) });

      return `
        <h4 style="margin:0.75rem 0 0.35rem;font-size:0.8125rem;color:var(--text-muted)">${blockTitle}</h4>
        <table>
          <thead><tr>
            <th>${t('colLevel')}</th><th>${t('colUsage')}</th>
            <th>${isSp ? t('colSp') : t('colPc')}</th><th>${t('colDiff')}</th><th></th>
          </tr></thead>
          <tbody>${rows}</tbody>
        </table>`;
    }

    function renderTargetBlock(targetPx, c) {
      if (!targetPx || targetPx <= 0) return '';
      return `
        <div class="practical-target-block" style="margin-top:1rem">
          <h3 style="margin:0 0 0.5rem">${t('practicalTargetHeading', { px: targetPx })}</h3>
          ${renderNeighborTable(targetPx, true, c)}
          ${renderNeighborTable(targetPx, false, c)}
        </div>`;
    }

    // --- CSS export ---

    function cssClampLiteral(level, c) {
      const rb = c.remBase;
      const min = fluidMin(level, c);
      const max = fluidMax(level, c);
      const m = slope(level, c);
      const floorRem = (c.fontSizeFloor / rb).toFixed(4);
      const minRem = (min / rb).toFixed(4);
      const maxRem = (max / rb).toFixed(4);
      const intercept = ((min / rb) - (m * c.fontWidthMin / rb)).toFixed(4);
      const clamp = `max(${floorRem}rem, clamp(${minRem}rem, ${intercept}rem + ${m.toFixed(6)}${c.variableUnit}, ${maxRem}rem))`;
      return { min, max, m, clamp, intercept, minRem, maxRem, floorRem };
    }

    function generateVanillaCSS(c) {
      const rb = c.remBase;
      const vu = c.variableUnit;
      const levels = levelsRange();

      let utilClasses = levels.map(l => {
        const name = getLabel(l);
        return `.text-${name} {\n  --font-level: ${l};\n}`;
      }).join('\n\n');

      return `/*
 * Fluid Modular Type Scale
 * Generated by Font Size Scaler
 * https://coliss.com/articles/build-websites/operation/css/fluid-modular-type-scale.html
 */

:root {
  --font-size-min: ${c.fontSizeMin};
  --font-size-max: ${c.fontSizeMax};
  --font-ratio-min: ${c.fontRatioMin};
  --font-ratio-max: ${c.fontRatioMax};
  --font-width-min: ${c.fontWidthMin};
  --font-width-max: ${c.fontWidthMax};
  --font-size-floor: ${c.fontSizeFloor};
}

:where(.fluid) {
  --fluid-min: calc(
    var(--font-size-min) * pow(var(--font-ratio-min), var(--font-level, 0))
  );
  --fluid-max: calc(
    var(--font-size-max) * pow(var(--font-ratio-max), var(--font-level, 0))
  );
  --fluid-preferred: calc(
    (var(--fluid-max) - var(--fluid-min)) /
    (var(--font-width-max) - var(--font-width-min))
  );
  --fluid-type: clamp(
    (var(--fluid-min) / ${rb}) * 1rem,
    ((var(--fluid-min) / ${rb}) * 1rem) -
    (((var(--fluid-preferred) * var(--font-width-min)) / ${rb}) * 1rem) +
    (var(--fluid-preferred) * var(--variable-unit, ${vu})),
    (var(--fluid-max) / ${rb}) * 1rem
  );
  font-size: max(
    calc(var(--font-size-floor) / ${rb}) * 1rem,
    var(--fluid-type)
  );
}

${utilClasses}`;
    }

    function generateTailwindCSS(c) {
      const rb = c.remBase;
      const vu = c.variableUnit;
      const levels = levelsRange();

      const themeTokens = levels.map(l => {
        const name = getLabel(l);
        return `  --text-fluid-${name}: ${cssClampLiteral(l, c).clamp};`;
      }).join('\n');

      const fluidBlock = `:where(.fluid) {
  --fluid-min: calc(var(--font-size-min) * pow(var(--font-ratio-min), var(--font-level, 0)));
  --fluid-max: calc(var(--font-size-max) * pow(var(--font-ratio-max), var(--font-level, 0)));
  --fluid-preferred: calc((var(--fluid-max) - var(--fluid-min)) / (var(--font-width-max) - var(--font-width-min)));
  --fluid-type: clamp(
    (var(--fluid-min) / ${rb}) * 1rem,
    ((var(--fluid-min) / ${rb}) * 1rem) - (((var(--fluid-preferred) * var(--font-width-min)) / ${rb}) * 1rem) + (var(--fluid-preferred) * var(--variable-unit, ${vu})),
    (var(--fluid-max) / ${rb}) * 1rem
  );
  font-size: max(calc(var(--font-size-floor) / ${rb}) * 1rem, var(--fluid-type));
}`;

      return `/* Tailwind CSS v4 — Fluid Modular Type Scale */
@import "tailwindcss";

@theme {
  --font-size-min: ${c.fontSizeMin};
  --font-size-max: ${c.fontSizeMax};
  --font-ratio-min: ${c.fontRatioMin};
  --font-ratio-max: ${c.fontRatioMax};
  --font-width-min: ${c.fontWidthMin};
  --font-width-max: ${c.fontWidthMax};
  --font-size-floor: ${c.fontSizeFloor};

${themeTokens}
}

${fluidBlock}

/* Usage:
 *   <p class="fluid text-fluid-body">...</p>  (precomputed clamp tokens)
 *   <p class="fluid text-body">...</p>         (level utility + .fluid)
 */
${levels.map(l => `.text-${getLabel(l)} { --font-level: ${l}; }`).join('\n')}`;
    }

    function renderScaleTable(c) {
      const levels = levelsRange();
      const targets = getPracticalTargets();
      const vw = state.previewViewport;

      let rows = '';
      levels.forEach((level, i) => {
        const rawSp = fluidMin(level, c);
        const sp = effectiveSpMin(level, c);
        const pc = fluidMax(level, c);
        const atVw = sizeAtViewport(level, vw, c);
        const prevSp = i > 0 ? effectiveSpMin(levels[i - 1], c) : null;
        const prevPc = i > 0 ? fluidMax(levels[i - 1], c) : null;
        const jumpPc = prevPc ? fmtRatio(pc, prevPc) : '—';
        const jumpSpFloored = isFloored(level, c) && prevSp;
        const jumpSp = prevSp
          ? fmtRatio(sp, prevSp) + (jumpSpFloored ? '*' : '')
          : '—';
        const spCell = isFloored(level, c)
          ? `${fmtPx(sp)} <span class="badge badge-warn" title="${t('floorTitle', { raw: fmtPx(rawSp) })}">${t('badgeFloor')}</span>`
          : fmtPx(sp);

        let rowClass = '';
        const wcag = wcagCheckLevel(level, c);
        let notes = `<span class="badge ${wcag.body.badge}">${wcag.body.label}</span>`;
        if (wcag.largeSp.badge) notes += ` <span class="badge ${wcag.largeSp.badge}">${wcag.largeSp.label}</span>`;
        if (isFloored(level, c)) notes += ` <span class="badge badge-warn">${t('badgeFloor')}</span>`;
        targets.forEach(px => {
          if (closestIntegerLevel(px, true, c).level === level || closestIntegerLevel(px, false, c).level === level) {
            notes += ` <span class="badge badge-ok">${t('badgeTarget', { px })}</span>`;
          }
        });
        if (sp < WCAG.absoluteMin) rowClass = 'danger-row';
        else if (sp < WCAG.captionMin) rowClass = rowClass || 'warn-row';

        rows += `<tr class="${rowClass}">
          <td>${level}</td>
          <td><input class="label-input" data-level="${level}" value="${getLabel(level)}"></td>
          <td>${spCell}</td>
          <td>${fmtPx(pc)}</td>
          <td>${fmtPx(atVw)}</td>
          <td>${jumpSp}</td>
          <td>${jumpPc}</td>
          <td>${notes}</td>
        </tr>`;
      });

      const heads = [
        thTip(t('colLevel'), t('tipLevel')),
        thTip(t('colUsage'), t('tipUsage')),
        thTip(t('colSp'), t('tipSp', { vw: c.fontWidthMin, floor: c.fontSizeFloor })),
        thTip(t('colPc'), t('tipPc', { vw: c.fontWidthMax })),
        thTip(`${vw}px`, t('tipPreview', { vw })),
        thTip(t('colJumpSp'), t('tipJumpSp', { ratio: c.fontRatioMin })),
        thTip(t('colJumpPc'), t('tipJumpPc', { ratio: c.fontRatioMax })),
        thTip(t('colNotes'), t('tipNotes')),
      ];

      return `<div class="card">
        <h2>${t('scaleTable')}</h2>
        <p class="compare-note">${t('scaleNote', {
          spJump: fmtRatio(fluidMin(1, c), fluidMin(0, c)),
          pcJump: fmtRatio(fluidMax(1, c), fluidMax(0, c)),
          floor: c.fontSizeFloor,
        })}</p>
        <table id="scaleTable">
          <thead><tr>${heads.map(h => `<th>${h}</th>`).join('')}</tr></thead>
          <tbody>${rows}</tbody>
        </table>
      </div>`;
    }

    function renderPreview(c) {
      const levels = levelsRange();
      const vw = clampViewport(state.previewViewport, c);
      const blocks = levels.map(level => {
        const px = sizeAtViewport(level, vw, c);
        return `<div class="preview-block" data-preview-level="${level}">
          <div class="preview-meta">Lv ${level} · ${getLabel(level)} · <span class="preview-px">${fmtPx(px)}</span> @ <span class="preview-vw">${vw}</span>px</div>
          <div class="preview-text" style="font-size: ${px}px">${t('previewSample', { label: getLabel(level) })}</div>
        </div>`;
      }).join('');

      return `<div class="card" id="previewCard">
        <h2>${t('previewTitle')}</h2>
        <div class="viewport-bar">
          <label for="previewViewport">${t('previewViewport')}</label>
          <input type="range" id="previewViewport" min="${c.fontWidthMin}" max="${c.fontWidthMax}" value="${vw}" step="1">
          <input type="number" id="previewViewportNum" min="${c.fontWidthMin}" max="${c.fontWidthMax}" value="${vw}" step="1">
          <span style="font-size:0.75rem;color:var(--text-muted)">px</span>
        </div>
        <div id="previewBlocks">${blocks}</div>
      </div>`;
    }

    function clampViewport(vw, c) {
      return Math.max(c.fontWidthMin, Math.min(c.fontWidthMax, vw));
    }

    function updatePreviewViewport(vw, c) {
      state.previewViewport = clampViewport(vw, c);
      const slider = document.getElementById('previewViewport');
      const num = document.getElementById('previewViewportNum');
      if (slider) slider.value = state.previewViewport;
      if (num && document.activeElement !== num) num.value = state.previewViewport;

      const previewTh = document.querySelector('#scaleTable thead th:nth-child(5)');
      if (previewTh) previewTh.innerHTML = thTip(`${state.previewViewport}px`, t('tipPreview', { vw: state.previewViewport }));
      document.querySelectorAll('#scaleTable tbody tr').forEach((row, i) => {
        const level = levelsRange()[i];
        if (level == null) return;
        const px = sizeAtViewport(level, state.previewViewport, c);
        const cells = row.querySelectorAll('td');
        if (cells[4]) cells[4].textContent = fmtPx(px);
      });

      document.querySelectorAll('[data-preview-level]').forEach(el => {
        const level = parseInt(el.dataset.previewLevel, 10);
        const px = sizeAtViewport(level, state.previewViewport, c);
        el.querySelector('.preview-px').textContent = fmtPx(px);
        el.querySelector('.preview-vw').textContent = state.previewViewport;
        el.querySelector('.preview-text').style.fontSize = px + 'px';
      });

      const wcagHdr = document.querySelector('#wcagTable thead th:nth-child(4)');
      if (wcagHdr) wcagHdr.textContent = `${state.previewViewport}px`;
      document.querySelectorAll('#wcagTable tbody tr').forEach((row, i) => {
        const level = levelsRange()[i];
        if (level == null) return;
        const w = wcagCheckLevel(level, c);
        const cells = row.querySelectorAll('td');
        if (cells[3]) cells[3].textContent = fmtPx(w.atVw);
        if (cells[4]) cells[4].innerHTML = `<span class="badge ${w.body.badge}">${w.body.label}</span>`;
        if (cells[5]) cells[5].innerHTML = w.largeSp.badge
          ? `<span class="badge ${w.largeSp.badge}">${w.largeSp.label}</span>`
          : t('wcagNormalShort');
        if (cells[6]) cells[6].textContent = fmtPx(w.zoom200);
      });
    }

    function renderWCAG(c) {
      const levels = levelsRange();
      const vw = state.previewViewport;
      const rows = levels.map(level => {
        const w = wcagCheckLevel(level, c);
        const largeCell = w.largeSp.badge
          ? `<span class="badge ${w.largeSp.badge}">${w.largeSp.label}</span> <small>(${w.largeSp.contrast})</small>`
          : `${t('wcagNormal')} <small>(${w.largeSp.contrast})</small>`;
        return `<tr>
          <td>${level}</td>
          <td>${getLabel(level)}</td>
          <td>${fmtPx(w.sp)}</td>
          <td>${fmtPx(w.atVw)}</td>
          <td><span class="badge ${w.body.badge}">${w.body.label}</span></td>
          <td>${largeCell}</td>
          <td>${fmtPx(w.zoom200)}</td>
        </tr>`;
      }).join('');

      const heads = [
        thTip(t('colLevel'), t('tipLevel')),
        thTip(t('colUsage'), t('tipUsage')),
        thTip(t('wcagColSp'), t('tipSp', { vw: c.fontWidthMin, floor: c.fontSizeFloor })),
        thTip(t('wcagColPreview', { vw }), t('tipPreview', { vw })),
        thTip(t('wcagColBody'), t('tipWcagBody')),
        thTip(t('wcagColType'), t('tipWcagType')),
        thTip(t('wcagCol200'), t('tipWcag200')),
      ];

      return `<div class="card">
        <h2>${t('wcagTitle')}</h2>
        <p class="compare-note">${t('wcagNote', { floor: c.fontSizeFloor, vw })}</p>
        <table id="wcagTable">
          <thead><tr>${heads.map(h => `<th>${h}</th>`).join('')}</tr></thead>
          <tbody>${rows}</tbody>
        </table>
      </div>`;
    }

    function renderPractical(c) {
      const level0sp = effectiveSpMin(0, c);
      const targets = getPracticalTargets();
      const targetBlocks = targets.map(px => renderTargetBlock(px, c)).join('');

      return `<div class="card">
        <h2>${t('practicalTitle')}</h2>
        <p class="compare-note">${t('practicalIntro')} ${t('practicalLv0Note', { size: fmtPx(level0sp) })} ${t('practicalLv0Hint')}</p>
        ${targetBlocks || `<p class="compare-note">${t('practicalIntro')}</p>`}
      </div>`;
    }

    function renderCSS(c) {
      const vanilla = generateVanillaCSS(c);
      const tailwind = generateTailwindCSS(c);
      const active = state.cssTab;
      const code = active === 'vanilla' ? vanilla : tailwind;

      return `<div class="card">
        <h2>${t('cssTitle')}</h2>
        <div class="tabs">
          <button type="button" class="${active === 'vanilla' ? 'active' : ''}" data-tab="vanilla">${t('cssVanilla')}</button>
          <button type="button" class="${active === 'tailwind' ? 'active' : ''}" data-tab="tailwind">${t('cssTailwind')}</button>
        </div>
        <div class="code-wrap">
          <button type="button" class="copy-btn" data-copy>${t('copy')}</button>
          <pre id="cssOutput">${escapeHtml(code)}</pre>
        </div>
      </div>`;
    }

    function escapeHtml(s) {
      return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    }

    function render() {
      const c = getConfig();
      const main = document.getElementById('main');
      main.innerHTML =
        renderScaleTable(c) +
        renderPreview(c) +
        renderWCAG(c) +
        renderPractical(c) +
        renderCSS(c);

      bindMainEvents(c);
    }

    function bindMainEvents(c) {
      const main = document.getElementById('main');
      const slider = document.getElementById('previewViewport');
      const num = document.getElementById('previewViewportNum');

      if (slider) {
        slider.addEventListener('input', () => {
          updatePreviewViewport(parseInt(slider.value, 10), c);
        });
      }

      if (num) {
        num.addEventListener('change', () => {
          updatePreviewViewport(parseInt(num.value, 10) || c.fontWidthMin, c);
        });
        num.addEventListener('keydown', e => {
          if (e.key === 'Enter') {
            e.preventDefault();
            updatePreviewViewport(parseInt(num.value, 10) || c.fontWidthMin, c);
            num.blur();
          }
        });
      }

      main.querySelectorAll('.label-input').forEach(input => {
        input.addEventListener('change', () => {
          state.labels[parseInt(input.dataset.level, 10)] = input.value.trim() || defaultLabel(parseInt(input.dataset.level, 10));
          render();
        });
      });

      main.querySelectorAll('.tabs button').forEach(btn => {
        btn.addEventListener('click', () => {
          state.cssTab = btn.dataset.tab;
          render();
        });
      });

      main.querySelector('[data-copy]')?.addEventListener('click', () => {
        const text = state.cssTab === 'vanilla' ? generateVanillaCSS(c) : generateTailwindCSS(c);
        navigator.clipboard.writeText(text).then(() => {
          const btn = main.querySelector('[data-copy]');
          btn.textContent = t('copied');
          setTimeout(() => { btn.textContent = t('copy'); }, 1500);
        });
      });
    }

    document.getElementById('headerSubtitle').innerHTML = t('headerSubtitle');
    renderLangToggle();
    buildControls();
    render();
