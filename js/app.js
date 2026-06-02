/**
 * Font Size Scaler — application logic
 * Sections: i18n → constants/state → scale math → CSS export → UI render → init
 * Preview sample layout: js/preview-sample.js (FSSPreviewSample.create)
 * @see docs/DEVELOPMENT.md
 */
    const I18N = {
      ja: {
        headerSubtitle: '<code>pow()</code> ベースの流動タイポグラフィ設定ツール — 参照: <a href="https://coliss.com/articles/build-websites/operation/css/fluid-modular-type-scale.html" target="_blank" rel="noopener">coliss 記事</a>',
        langJa: '日本語', langEn: 'English',
        secBaseSize: '基底フォントサイズ', secFloor: '絶対下限', secRatio: 'スケール比',
        secViewport: 'ビューポート幅', secPreviewFont: 'プレビュー字体', secOther: 'その他',
        fontSizeMin: 'SP (--font-size-min)', fontSizeMax: 'PC (--font-size-max)',
        fontSizeFloor: 'フォント下限 (--font-size-floor)',
        fontRatioMin: 'SP (--font-ratio-min)', fontRatioMax: 'PC (--font-ratio-max)',
        fontWidthMin: '最小 (--font-width-min)', fontWidthMax: '最大 (--font-width-max)',
        remBase: 'rem 換算基準 (px)', variableUnit: '--variable-unit',
        unitVi: '100vi (viewport)', unitCqi: '100cqi (container)',
        levelMin: '表示レベル min', levelMax: '表示レベル max',
        secTargetSize: '目標サイズ',
        targetSp1: 'SP 1 (px)', targetSp2: 'SP 2 (px)', targetSp3: 'SP 3 (px)',
        targetPc1: 'PC 1 (px)', targetPc2: 'PC 2 (px)', targetPc3: 'PC 3 (px)',
        targetIntro: '各目標 px に SP / PC 端点で最接近するレベルにバッジ表示。',
        colTarget: '目標',
        tipTarget: 'SP / PC 端点の目標 px に最接近するレベル（サイドバーで設定）。',
        targetNote: '目標列: 各 px を SP/PC 端点サイズに最接近するレベルに表示。Lv0 (SP) = {size}。',
        btnSave: 'ブラウザに保存', btnShare: '共有URLをコピー', btnReset: '初期状態に戻す',
        saved: '保存しました', shared: 'URL をコピーしました', resetDone: '初期状態に戻しました',
        classCopied: 'コピーしました',
        colCss: 'CSS',
        tipColCss: '用途ラベルから生成したクラス名（text-*）をクリップボードにコピー。',
        scaleTable: 'スケール表',
        colLevel: 'レベル', colUsage: '用途', colSp: 'SP', colPc: 'PC',
        colJump: 'ジャンプ率',
        tipLevel: 'モジュラースケールの段階。0 = 基底、正 = 大きい、負 = 小さい。',
        tipUsage: 'CSS クラス名などに使う用途ラベル。編集可能。',
        tipSp: '最小ビューポート ({vw}px) 時の clamp 下限。絶対下限 {floor}px を適用後。',
        tipPc: '最大ビューポート ({vw}px) 時の clamp 上限。',
        tipPreview: 'プレビュー中のビューポート ({vw}px) での実際の font-size。',
        tipJump: 'プレビュー幅 ({vw}px) でのひとつ下のレベルからの倍率。',
        badgeFloor: '下限',
        floorTitle: '計算値 {raw}',
        previewTitle: 'タイポグラフィプレビュー', previewViewport: 'ビューポート',
        previewTabList: '一覧', previewTabSample: 'サンプル',
        sampleBrand: 'Acme Docs',
        sampleMenuOpen: 'メニューを開く',
        sampleHeaderSearch: '検索',
        sampleSidebarDoc: 'ドキュメント',
        sampleSidebarNav1: 'タイポグラフィスケール',
        sampleSidebarNav2: 'コンポーネント',
        sampleSidebarNav3: 'トークン',
        sampleSidebarProject: 'プロジェクト',
        sampleSidebarSub1: '設定',
        sampleSidebarSub2: 'メンバー',
        sampleBreadcrumb: 'Docs / タイポグラフィ / スケール',
        samplePageTitle: '流動タイプスケール',
        samplePageLead: 'サイドバー・リスト・セクション入れ子を含む、実ページに近いレイアウトで文字サイズ感を確認できます。',
        sampleKvEyebrow: 'ガイド',
        sampleKvTitle: '文脈の中のスケール',
        sampleKvLead: 'ヒーロー画像上の見出しとリード。display / lead レベルのバランス確認用です。',
        sampleSectionOverview: '概要',
        sampleMediaTitle: '画像と本文',
        sampleMediaBody: 'メディアブロックの見出し (h3) と本文 (body)。キャプションは caption レベルです。',
        sampleMediaCaption: '図1 — スクリーンショット例',
        sampleSectionArticles: '関連記事',
        sampleArticle1Title: 'モジュラ比の選び方',
        sampleArticle1Body: 'リスト項目のタイトル (h4) と概要 (body)。日付は caption レベルです。',
        sampleArticle1Meta: '2026年3月12日',
        sampleArticle2Title: 'トークンを CSS にマッピング',
        sampleArticle2Body: '2 件目のリスト項目。入れ子サイドバーと同じスケール階層を共有します。',
        sampleArticle2Meta: '2026年2月3日',
        sampleSectionFeatured: 'ピックアップ',
        sampleFeatured1Title: '比率プリセット',
        sampleFeatured1Body: 'Major Third や Perfect Fourth など、よく使う比率をワンクリックで試せます。',
        sampleFeatured1Meta: 'はじめに',
        sampleFeatured2Title: 'WCAG チェック',
        sampleFeatured2Body: '本文 16px 推奨や大文字 AA 基準を、各レベルごとに確認できます。',
        sampleFeatured2Meta: 'アクセシビリティ',
        sampleFeatured3Title: 'Figma エクスポート',
        sampleFeatured3Body: 'Variables Import と Tokens Studio 向けの JSON / ZIP を出力します。',
        sampleFeatured3Meta: 'デザイン引き渡し',
        sampleSectionCards: 'クイックリンク',
        sampleCard1Title: 'CSS をエクスポート',
        sampleCard1Body: 'カード見出し h4、本文 body、更新日 micro の例です。',
        sampleCard1Meta: '本日更新',
        sampleCard2Title: 'Figma Variables',
        sampleCard2Body: 'コンパクトなリンクカード。ボタンより控えめな情報密度です。',
        sampleCard2Meta: 'Variables Import',
        sampleBtnPrimary: 'プリセットを保存',
        sampleBtnSecondary: 'URL を共有',
        sampleFooterCol1: 'プロダクト', sampleFooterCol2: 'リソース', sampleFooterCol3: '法務',
        sampleFooterLink: 'リンク項目',
        sampleFooterCopy: '© 2026 Acme Docs',
        previewSample: 'あいうえお The quick brown fox — {label}',
        wcagNote: 'WCAG: 本文 <strong>16px 推奨</strong>（1.4.4）。大文字 AA ≥24px / 太字 ≥19px（3:1）、AAA ≥24px / 太字 ≥18.67px（4.5:1）。WCAG 列は SP サイズ基準。',
        colWcag: 'WCAG',
        tipWcag: '本文 16px 判定と大文字 AA/AAA 区分（SP 端点サイズ基準）。',
        wcagBodyOk: 'AA 推奨', wcagBodySmall: 'やや小', wcagBodyCaption: '注釈向け',
        wcagBodyCheck: '要確認', wcagBodyFail: '非推奨',
        wcagLargeAaa: '大文字 AAA', wcagLargeAa: '大文字 AA', wcagNormal: '通常文字',
        cssTitle: 'CSS / Figma 出力', cssVanilla: 'Vanilla CSS', cssTailwind: 'Tailwind v4',
        cssFigmaVars: 'Variables Import', cssTokensStudio: 'Tokens Studio',
        copy: 'コピー', copied: 'コピー済', btnDownload: 'ダウンロード', downloaded: '保存しました',
        exportHowTo: '使い方',
        exportModalClose: '閉じる',
        figmaVarsIntro: 'DTCG 形式の font-size Variables 用 ZIP。<a href="https://www.figma.com/community/plugin/1253424530216967528/variables-import" target="_blank" rel="noopener">Variables Import</a> プラグイン向け（fluid clamp は Figma 非対応）。',
        figmaVarsModalTitle: 'Variables Import への取り込み',
        figmaVarsModalNote: '<strong>注意:</strong> Figma は CSS の <code>clamp()</code> による連続補間を再現できません。SP / PC は離散値として取り込みます。<strong>Starter プラン</strong>は 1 コレクション 1 モード（Default）のみのため、ZIP は SP / PC を<strong>別コレクション</strong>として出力します。Professional 以上なら同一コレクションの 2 モード運用も可能です。',
        figmaVarsModalSteps: '<ol><li><strong>Variables Import</strong> タブで「<strong>ダウンロード</strong>」→ <code>font-size-scaler-variables.zip</code></li><li>ZIP を展開（<code>manifest.json</code> / <code>sp.tokens.json</code> / <code>pc.tokens.json</code>）</li><li>Figma で <a href="https://www.figma.com/community/plugin/1253424530216967528/variables-import" target="_blank" rel="noopener">Variables Import</a> を開き、<code>manifest.json</code> を選択</li><li><code>Type Scale SP</code> / <code>Type Scale PC</code> の 2 コレクションが作成されます（Default モード）</li><li>Variables を Text Style の font-size にバインド。font family / weight は Figma 側で別途指定</li></ol><p>プレビュー・コピーは SP トークン JSON です。インポートには ZIP 内 3 ファイルが必要です。</p>',
        tokensStudioIntro: 'Typography トークン + SP/PC テーマの JSON。<a href="https://www.figma.com/community/plugin/843461159747178978/tokens-studio-for-figma" target="_blank" rel="noopener">Tokens Studio</a> から Text Style としてエクスポート（Starter でもテーマ切替可）。',
        tokensStudioModalTitle: 'Tokens Studio への取り込み',
        tokensStudioModalNote: '<strong>注意:</strong> 出力は font-size 中心の Typography トークンです。font family は <code>Inter</code>、font weight は <code>Regular</code> のプレースホルダーです。Figma 側で書体を差し替えてください。fluid clamp は <code>description</code> に参考値として記載しています。',
        tokensStudioModalSteps: '<ol><li><strong>Tokens Studio</strong> タブで JSON を「<strong>ダウンロード</strong>」または「<strong>コピー</strong>」（<code>font-size-scaler-tokens-studio.json</code>）</li><li>Figma で <a href="https://www.figma.com/community/plugin/843461159747178978/tokens-studio-for-figma" target="_blank" rel="noopener">Tokens Studio for Figma</a> を開く</li><li>Settings（歯車）→ <strong>Load from file</strong> で JSON を読み込む</li><li>プラグイン上部のテーマ <strong>SP</strong> / <strong>PC</strong> で Token Set を切り替える</li><li>テキストを選択 → トークン（<code>text-body</code> 等）をクリックして適用（モバイル用フレーム＝SP、PC 用フレーム＝PC）</li><li>Text Style 化する場合: Styles &amp; Variables → <strong>Export to Figma</strong> → Typography（テーマごとに Export。同名スタイルは上書きされます）</li></ol><p><strong>SP / PC について:</strong> Figma 上に切替ボタンはありません。フレームごとにテーマとスタイルを使い分けてください。実装の <code>clamp()</code> は Vanilla CSS タブが正です。</p><p>Variables Import との併用: font-size Variables は Variables Import、Text Style は Tokens Studio。</p>',
        googleFontLabel: 'Google Fonts',
        googleFontDefault: 'システムデフォルト',
        intLevel: '（整数なら Lv {n}）',
      },
      en: {
        headerSubtitle: 'Fluid typography configurator with <code>pow()</code> — Ref: <a href="https://coliss.com/articles/build-websites/operation/css/fluid-modular-type-scale.html" target="_blank" rel="noopener">coliss article</a>',
        langJa: '日本語', langEn: 'English',
        secBaseSize: 'Base font size', secFloor: 'Absolute floor', secRatio: 'Scale ratio',
        secViewport: 'Viewport width', secPreviewFont: 'Preview typeface', secOther: 'Other',
        fontSizeMin: 'SP (--font-size-min)', fontSizeMax: 'PC (--font-size-max)',
        fontSizeFloor: 'Font floor (--font-size-floor)',
        fontRatioMin: 'SP (--font-ratio-min)', fontRatioMax: 'PC (--font-ratio-max)',
        fontWidthMin: 'Min (--font-width-min)', fontWidthMax: 'Max (--font-width-max)',
        remBase: 'rem base (px)', variableUnit: '--variable-unit',
        unitVi: '100vi (viewport)', unitCqi: '100cqi (container)',
        levelMin: 'Display level min', levelMax: 'Display level max',
        secTargetSize: 'Target sizes',
        targetSp1: 'SP 1 (px)', targetSp2: 'SP 2 (px)', targetSp3: 'SP 3 (px)',
        targetPc1: 'PC 1 (px)', targetPc2: 'PC 2 (px)', targetPc3: 'PC 3 (px)',
        targetIntro: 'Badge on the nearest level to each SP/PC endpoint target px.',
        colTarget: 'Target',
        tipTarget: 'Nearest level at SP/PC endpoint for sidebar target px values.',
        targetNote: 'Target column: nearest level per px at SP/PC endpoints. Lv0 (SP) = {size}.',
        btnSave: 'Save to browser', btnShare: 'Copy share URL', btnReset: 'Reset to defaults',
        saved: 'Saved', shared: 'URL copied', resetDone: 'Reset to defaults',
        classCopied: 'Copied',
        colCss: 'CSS',
        tipColCss: 'Copy the utility class name (text-*) from the usage label.',
        scaleTable: 'Scale table',
        colLevel: 'Level', colUsage: 'Usage', colSp: 'SP', colPc: 'PC',
        colJump: 'Jump',
        tipLevel: 'Modular scale step. 0 = base, positive = larger, negative = smaller.',
        tipUsage: 'Usage label for CSS class names. Editable.',
        tipSp: 'clamp minimum at min viewport ({vw}px), after {floor}px floor.',
        tipPc: 'clamp maximum at max viewport ({vw}px).',
        tipPreview: 'Computed font-size at preview viewport ({vw}px).',
        tipJump: 'Ratio from the previous level at preview width ({vw}px).',
        badgeFloor: 'floor',
        floorTitle: 'Computed {raw}',
        previewTitle: 'Typography preview', previewViewport: 'Viewport',
        previewTabList: 'List', previewTabSample: 'Sample',
        sampleBrand: 'Acme Docs',
        sampleMenuOpen: 'Open menu',
        sampleHeaderSearch: 'Search',
        sampleSidebarDoc: 'Documentation',
        sampleSidebarNav1: 'Typography scale',
        sampleSidebarNav2: 'Components',
        sampleSidebarNav3: 'Tokens',
        sampleSidebarProject: 'Project',
        sampleSidebarSub1: 'Settings',
        sampleSidebarSub2: 'Members',
        sampleBreadcrumb: 'Docs / Typography / Scale',
        samplePageTitle: 'Fluid type scale',
        samplePageLead: 'A page-like sample with sidebar, lists, and nested sections to judge type in context.',
        sampleKvEyebrow: 'Guide',
        sampleKvTitle: 'Scale in context',
        sampleKvLead: 'Hero headline and lead on imagery—display and lead levels at a practical size.',
        sampleSectionOverview: 'Overview',
        sampleMediaTitle: 'Image with supporting text',
        sampleMediaBody: 'Media block heading (h3) and body copy. Caption for the figure label.',
        sampleMediaCaption: 'Figure 1 — Example screenshot',
        sampleSectionArticles: 'Related articles',
        sampleArticle1Title: 'Choosing a modular ratio',
        sampleArticle1Body: 'List item title (h4) and summary (body). Date uses caption.',
        sampleArticle1Meta: 'Mar 12, 2026',
        sampleArticle2Title: 'Mapping tokens to CSS',
        sampleArticle2Body: 'Second list item—same scale hierarchy as the nested sidebar.',
        sampleArticle2Meta: 'Feb 3, 2026',
        sampleSectionFeatured: 'Spotlight',
        sampleFeatured1Title: 'Ratio presets',
        sampleFeatured1Body: 'Try common ratios like Major Third or Perfect Fourth in one click.',
        sampleFeatured1Meta: 'Getting started',
        sampleFeatured2Title: 'WCAG check',
        sampleFeatured2Body: 'Review 16px body guidance and large-text AA thresholds per level.',
        sampleFeatured2Meta: 'Accessibility',
        sampleFeatured3Title: 'Figma export',
        sampleFeatured3Body: 'Output JSON / ZIP for Variables Import and Tokens Studio.',
        sampleFeatured3Meta: 'Design handoff',
        sampleSectionCards: 'Quick links',
        sampleCard1Title: 'Export CSS',
        sampleCard1Body: 'Card heading h4, body text, updated stamp at micro.',
        sampleCard1Meta: 'Updated today',
        sampleCard2Title: 'Figma variables',
        sampleCard2Body: 'Compact link card—lighter density than primary actions.',
        sampleCard2Meta: 'Variables Import',
        sampleBtnPrimary: 'Save preset',
        sampleBtnSecondary: 'Share URL',
        sampleFooterCol1: 'Product', sampleFooterCol2: 'Resources', sampleFooterCol3: 'Legal',
        sampleFooterLink: 'Link item',
        sampleFooterCopy: '© 2026 Acme Docs',
        previewSample: 'The quick brown fox — {label}',
        wcagNote: 'WCAG: <strong>16px body</strong> recommended (1.4.4). Large AA ≥24px / bold ≥19px (3:1), AAA ≥24px / bold ≥18.67px (4.5:1). WCAG column uses SP endpoint size.',
        colWcag: 'WCAG',
        tipWcag: '16px body guidance and large-text AA/AAA (based on SP endpoint size).',
        wcagBodyOk: 'AA OK', wcagBodySmall: 'Slightly small', wcagBodyCaption: 'Caption',
        wcagBodyCheck: 'Review', wcagBodyFail: 'Not recommended',
        wcagLargeAaa: 'Large AAA', wcagLargeAa: 'Large AA', wcagNormal: 'Normal',
        cssTitle: 'CSS / Figma export', cssVanilla: 'Vanilla CSS', cssTailwind: 'Tailwind v4',
        cssFigmaVars: 'Variables Import', cssTokensStudio: 'Tokens Studio',
        copy: 'Copy', copied: 'Copied', btnDownload: 'Download', downloaded: 'Downloaded',
        exportHowTo: 'How to use',
        exportModalClose: 'Close',
        figmaVarsIntro: 'DTCG font-size Variables as a ZIP for the <a href="https://www.figma.com/community/plugin/1253424530216967528/variables-import" target="_blank" rel="noopener">Variables Import</a> plugin. Fluid clamp is not representable in Figma.',
        figmaVarsModalTitle: 'Import via Variables Import',
        figmaVarsModalNote: '<strong>Note:</strong> Figma cannot reproduce continuous <code>clamp()</code> interpolation. SP / PC are discrete values. On the <strong>Starter plan</strong> (one mode per collection), the ZIP exports SP / PC as <strong>separate collections</strong>. On Professional+, you can also use a single collection with two modes.',
        figmaVarsModalSteps: '<ol><li>On the <strong>Variables Import</strong> tab, click <strong>Download</strong> → <code>font-size-scaler-variables.zip</code></li><li>Extract the ZIP (<code>manifest.json</code>, <code>sp.tokens.json</code>, <code>pc.tokens.json</code>)</li><li>In Figma, open <a href="https://www.figma.com/community/plugin/1253424530216967528/variables-import" target="_blank" rel="noopener">Variables Import</a> and select <code>manifest.json</code></li><li>Collections <code>Type Scale SP</code> and <code>Type Scale PC</code> are created (Default mode each)</li><li>Bind variables to Text Style font-size. Set font family / weight in Figma separately</li></ol><p>Preview and Copy show the SP token JSON. Import requires all three ZIP files.</p>',
        tokensStudioIntro: 'Typography tokens + SP/PC themes as JSON for <a href="https://www.figma.com/community/plugin/843461159747178978/tokens-studio-for-figma" target="_blank" rel="noopener">Tokens Studio</a> → export as Text Styles (theme switching works on Starter).',
        tokensStudioModalTitle: 'Import via Tokens Studio',
        tokensStudioModalNote: '<strong>Note:</strong> Output is font-size–focused Typography tokens. <code>Inter</code> / <code>Regular</code> are placeholders—swap the typeface in Figma. Fluid clamp references are in each token\'s <code>description</code>.',
        tokensStudioModalSteps: '<ol><li>On the <strong>Tokens Studio</strong> tab, <strong>Download</strong> or <strong>Copy</strong> <code>font-size-scaler-tokens-studio.json</code></li><li>In Figma, open <a href="https://www.figma.com/community/plugin/843461159747178978/tokens-studio-for-figma" target="_blank" rel="noopener">Tokens Studio for Figma</a></li><li>Settings (gear) → <strong>Load from file</strong></li><li>Switch theme <strong>SP</strong> / <strong>PC</strong> at the top of the plugin</li><li>Select text → click a token (<code>text-body</code>, etc.) to apply (mobile frames = SP, desktop frames = PC)</li><li>For Text Styles: Styles &amp; Variables → <strong>Export to Figma</strong> → Typography (export per theme; same names overwrite)</li></ol><p><strong>SP / PC:</strong> There is no toggle in Figma—use themes and styles per frame. For production <code>clamp()</code>, use the Vanilla CSS tab.</p><p>Pair with Variables Import: variables there, Text Styles here.</p>',
        googleFontLabel: 'Google Fonts',
        googleFontDefault: 'System default',
        intLevel: '(integer ≈ Lv {n})',
      },
    };

    const EXPORT_HELP = {
      'figma-vars': {
        title: 'figmaVarsModalTitle',
        note: 'figmaVarsModalNote',
        steps: 'figmaVarsModalSteps',
      },
      'tokens-studio': {
        title: 'tokensStudioModalTitle',
        note: 'tokensStudioModalNote',
        steps: 'tokensStudioModalSteps',
      },
    };

    function normalizeCssTab(tab) {
      if (tab === 'figma') return 'figma-vars';
      if (tab === 'vanilla' || tab === 'tailwind' || tab === 'figma-vars' || tab === 'tokens-studio') return tab;
      return 'vanilla';
    }

    const ALLOWED_PREVIEW_TABS = new Set(['list', 'sample']);

    function normalizePreviewTab(tab) {
      return ALLOWED_PREVIEW_TABS.has(tab) ? tab : 'list';
    }

    function exportIntroKey(tab) {
      if (tab === 'figma-vars') return 'figmaVarsIntro';
      if (tab === 'tokens-studio') return 'tokensStudioIntro';
      return null;
    }

    function t(key, vars = {}) {
      let s = (I18N[state.lang] || I18N.en)[key] ?? key;
      Object.entries(vars).forEach(([k, v]) => {
        s = s.replaceAll(`{${k}}`, escapeHtml(String(v)));
      });
      return s;
    }

    function thTip(label, tip) {
      return `<span class="th-inner">${label}<span class="tip-icon" data-tip="${escapeAttr(tip)}" tabindex="0" role="note">ⓘ</span></span>`;
    }

    const ICONS = {
      save: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true"><path d="M13 14H3V2h7l1 1v1h2v10zM5 3v2h5V3H5zm0 9h6v2H5v-2z"/></svg>',
      share: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.25" aria-hidden="true"><path d="M6 9l4-2M6 7l4 2M3 6.5h2M11 9.5h2"/></svg>',
      copy: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true"><path d="M4 1h9v9H4V1zm1 1v7h7V2H5zm-2 3h1v9h9v1H3V4z"/></svg>',
      download: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.25" aria-hidden="true"><path d="M8 2v8M5 7l3 3 3-3M3 13h10"/></svg>',
      reset: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.25" aria-hidden="true"><path d="M2.5 8a5.5 5.5 0 0 1 9.3-4M13.5 8a5.5 5.5 0 0 1-9.3 4"/><path d="M11 2.5h2v2M5 13.5H3v-2"/></svg>',
      help: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.25" aria-hidden="true"><circle cx="8" cy="8" r="6.25"/><path d="M6.2 6.1a1.8 1.8 0 0 1 3.5.7c0 1.2-1.7 1.5-1.7 2.8M8 12.2h.01"/></svg>',
      menu: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.25" aria-hidden="true"><path d="M2.5 4h11M2.5 8h11M2.5 12h11"/></svg>',
      figma: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true"><path d="M5.5 16H8V9.3H5.5a2.7 2.7 0 1 0 0 5.4zM8 0H5.5A2.7 2.7 0 0 0 8 2.7V0zM8 8H10.5a2.7 2.7 0 1 0 0-5.4H8V8zm0 2.7V16h2.5A2.7 2.7 0 0 0 8 10.7z"/></svg>',
    };

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

    const GOOGLE_FONTS = [
      { id: '', category: 'sans' },
      { id: 'Noto Sans JP', category: 'sans' },
      { id: 'Noto Serif JP', category: 'serif' },
      { id: 'M PLUS 1p', category: 'sans' },
      { id: 'Zen Kaku Gothic New', category: 'sans' },
      { id: 'Kosugi Maru', category: 'sans' },
      { id: 'Shippori Mincho', category: 'serif' },
      { id: 'IBM Plex Sans JP', category: 'sans' },
      { id: 'Inter', category: 'sans' },
      { id: 'Roboto', category: 'sans' },
      { id: 'Open Sans', category: 'sans' },
      { id: 'Lato', category: 'sans' },
      { id: 'Poppins', category: 'sans' },
      { id: 'Source Sans 3', category: 'sans' },
      { id: 'Merriweather', category: 'serif' },
      { id: 'Playfair Display', category: 'serif' },
    ];
    const GOOGLE_FONT_IDS = new Set(GOOGLE_FONTS.map(f => f.id));
    const GOOGLE_FONT_LINK_ID = 'google-font-preview';

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
      targetSp1: 10,
      targetSp2: 18,
      targetSp3: 26,
      targetPc1: 10,
      targetPc2: 21,
      targetPc3: 38,
      previewViewport: 768,
      googleFont: '',
      previewTab: 'list',
    };

    const STORAGE_KEY = 'font-size-scaler-v1';
    const PARAM_MAP = {
      sm: 'fontSizeMin', sx: 'fontSizeMax', rm: 'fontRatioMin', rx: 'fontRatioMax',
      wm: 'fontWidthMin', wx: 'fontWidthMax', fl: 'fontSizeFloor', rb: 'remBase',
      vu: 'variableUnit', lmi: 'levelMin', lmx: 'levelMax', vw: 'previewViewport',
      sp1: 'targetSp1', sp2: 'targetSp2', sp3: 'targetSp3',
      pc1: 'targetPc1', pc2: 'targetPc2', pc3: 'targetPc3',
      spa: 'targetSp1', spb: 'targetSp2', pca: 'targetPc1', pcb: 'targetPc2',
      lng: 'lang', tab: 'cssTab', ff: 'googleFont', ptab: 'previewTab',
    };
    const INT_STATE_KEYS = new Set(['fontWidthMin', 'fontWidthMax', 'remBase', 'levelMin', 'levelMax', 'previewViewport']);
    const STRING_STATE_KEYS = new Set(['lang', 'cssTab', 'variableUnit', 'googleFont', 'previewTab']);
    const ALLOWED_LANGS = new Set(['ja', 'en']);
    const ALLOWED_VARIABLE_UNITS = new Set(['100vi', '100cqi']);
    const MAX_LABEL_LEN = 32;
    const MAX_LB_PARAM_LEN = 1024;
    const MAX_STORAGE_BYTES = 32768;
    const MAX_LEVEL_SPAN = 24;
    const LEVEL_KEY_MIN = -6;
    const LEVEL_KEY_MAX = 12;

    const FIELD_BOUNDS = {
      fontSizeMin: { min: 8, max: 48 },
      fontSizeMax: { min: 8, max: 72 },
      fontRatioMin: { min: 1.01, max: 2 },
      fontRatioMax: { min: 1.01, max: 2 },
      fontWidthMin: { min: 240, max: 1200 },
      fontWidthMax: { min: 600, max: 2560 },
      fontSizeFloor: { min: 0, max: 24 },
      remBase: { min: 10, max: 24 },
      levelMin: { min: -6, max: 10 },
      levelMax: { min: -6, max: 12 },
      previewViewport: { min: 240, max: 2560 },
      targetSp1: { min: 6, max: 72 },
      targetSp2: { min: 6, max: 72 },
      targetSp3: { min: 6, max: 72 },
      targetPc1: { min: 6, max: 72 },
      targetPc2: { min: 6, max: 72 },
      targetPc3: { min: 6, max: 72 },
    };

    function escapeHtml(s) {
      return String(s)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;');
    }

    function escapeAttr(s) {
      return escapeHtml(s);
    }

    function clampFiniteNumber(value, min, max, fallback) {
      const n = typeof value === 'number' ? value : parseFloat(value);
      if (!Number.isFinite(n)) return fallback;
      return Math.min(max, Math.max(min, n));
    }

    function normalizeLang(lang) {
      return ALLOWED_LANGS.has(lang) ? lang : 'ja';
    }

    function normalizeVariableUnit(unit) {
      return ALLOWED_VARIABLE_UNITS.has(unit) ? unit : DEFAULTS.variableUnit;
    }

    function normalizeGoogleFont(value) {
      if (!value || typeof value !== 'string') return '';
      return GOOGLE_FONT_IDS.has(value) ? value : '';
    }

    function googleFontEntry(id) {
      return GOOGLE_FONTS.find(f => f.id === id);
    }

    function googleFontOptionLabel(entry) {
      return entry.id || t('googleFontDefault');
    }

    function googleFontCssUrl(family) {
      const q = family.replace(/ /g, '+');
      return `https://fonts.googleapis.com/css2?family=${q}:wght@400;700&display=swap`;
    }

    function googleFontStack(family) {
      const entry = googleFontEntry(family);
      const cat = entry?.category === 'serif' ? 'serif' : 'sans-serif';
      return `'${family.replace(/'/g, '')}', ${cat}`;
    }

    function loadGoogleFontStylesheet(family) {
      const existing = document.getElementById(GOOGLE_FONT_LINK_ID);
      if (existing) existing.remove();
      if (!family) return;
      const link = document.createElement('link');
      link.id = GOOGLE_FONT_LINK_ID;
      link.rel = 'stylesheet';
      link.href = googleFontCssUrl(family);
      document.head.appendChild(link);
    }

    function previewFontFamilyStyle() {
      if (!state.googleFont) return '';
      return `font-family:${googleFontStack(state.googleFont)};`;
    }

    function tokensStudioFontFamily() {
      return state.googleFont || 'Inter';
    }

    function googleFontImportPrefix() {
      if (!state.googleFont) return '';
      return `@import url('${googleFontCssUrl(state.googleFont)}');\n\n`;
    }

    function sanitizeLabelString(value) {
      if (typeof value !== 'string') return '';
      return value
        .trim()
        .slice(0, MAX_LABEL_LEN)
        .replace(/[\x00-\x1f\x7f<>`]/g, '');
    }

    function sanitizeLabels(raw, levelMin, levelMax) {
      const labels = {};
      if (!raw || typeof raw !== 'object' || Array.isArray(raw)) return labels;
      const lo = Math.max(LEVEL_KEY_MIN, levelMin - 6);
      const hi = Math.min(LEVEL_KEY_MAX, levelMax + 6);
      for (const key of Object.keys(raw)) {
        if (key === '__proto__' || key === 'constructor' || key === 'prototype') continue;
        const level = parseInt(key, 10);
        if (!Number.isInteger(level) || level < lo || level > hi) continue;
        const label = sanitizeLabelString(raw[key]);
        if (label) labels[level] = label;
      }
      return labels;
    }

    function clampStateFields() {
      Object.entries(FIELD_BOUNDS).forEach(([key, bounds]) => {
        const fallback = DEFAULTS[key];
        const isInt = INT_STATE_KEYS.has(key);
        const n = clampFiniteNumber(state[key], bounds.min, bounds.max, fallback);
        state[key] = isInt ? Math.round(n) : n;
      });
      if (state.levelMin > state.levelMax) {
        [state.levelMin, state.levelMax] = [state.levelMax, state.levelMin];
      }
      state.variableUnit = normalizeVariableUnit(state.variableUnit);
      state.lang = normalizeLang(state.lang);
      state.cssTab = normalizeCssTab(state.cssTab);
      state.previewTab = normalizePreviewTab(state.previewTab);
      state.googleFont = normalizeGoogleFont(state.googleFont);
      state.labels = sanitizeLabels(state.labels, state.levelMin, state.levelMax);
    }

    function sanitizeExternalState(data) {
      if (!data || typeof data !== 'object' || Array.isArray(data)) return null;
      const out = {};
      Object.entries(FIELD_BOUNDS).forEach(([key, bounds]) => {
        if (data[key] == null) return;
        const fallback = DEFAULTS[key];
        const isInt = INT_STATE_KEYS.has(key);
        const n = clampFiniteNumber(data[key], bounds.min, bounds.max, fallback);
        out[key] = isInt ? Math.round(n) : n;
      });
      if (data.previewViewport != null) {
        out.previewViewport = Math.round(clampFiniteNumber(
          data.previewViewport,
          FIELD_BOUNDS.previewViewport.min,
          FIELD_BOUNDS.previewViewport.max,
          DEFAULTS.previewViewport,
        ));
      }
      if (data.lang != null) out.lang = normalizeLang(data.lang);
      if (data.cssTab != null) out.cssTab = normalizeCssTab(data.cssTab);
      if (data.previewTab != null) out.previewTab = normalizePreviewTab(data.previewTab);
      if (data.variableUnit != null) out.variableUnit = normalizeVariableUnit(data.variableUnit);
      if (data.googleFont != null) out.googleFont = normalizeGoogleFont(data.googleFont);
      const levelMin = out.levelMin ?? state.levelMin ?? DEFAULTS.levelMin;
      const levelMax = out.levelMax ?? state.levelMax ?? DEFAULTS.levelMax;
      if (data.labels && typeof data.labels === 'object' && !Array.isArray(data.labels)) {
        out.labels = sanitizeLabels(data.labels, levelMin, levelMax);
      }
      if (data.practicalTarget1 != null && data.targetSp1 == null) {
        out.targetSp1 = clampFiniteNumber(data.practicalTarget1, 6, 72, DEFAULTS.targetSp1);
      }
      if (data.practicalTarget2 != null && data.targetPc1 == null) {
        out.targetPc1 = clampFiniteNumber(data.practicalTarget2, 6, 72, DEFAULTS.targetPc1);
      }
      const legacyTargets = [
        ['practicalSpA', 'targetSp1'], ['practicalSpB', 'targetSp2'],
        ['practicalPcA', 'targetPc1'], ['practicalPcB', 'targetPc2'],
      ];
      legacyTargets.forEach(([oldKey, newKey]) => {
        if (data[oldKey] != null && out[newKey] == null) {
          out[newKey] = clampFiniteNumber(data[oldKey], 6, 72, DEFAULTS[newKey]);
        }
      });
      return out;
    }

    function serializeState() {
      return {
        ...Object.fromEntries(Object.keys(DEFAULTS).map(k => [k, state[k]])),
        previewViewport: state.previewViewport,
        labels: { ...state.labels },
        cssTab: state.cssTab,
        lang: state.lang,
      };
    }

    function applyState(data) {
      const clean = sanitizeExternalState(data);
      if (!clean) return;
      Object.keys(DEFAULTS).forEach(k => {
        if (clean[k] == null) return;
        state[k] = clean[k];
      });
      if (clean.previewViewport != null) state.previewViewport = clean.previewViewport;
      if (clean.labels) state.labels = clean.labels;
      if (clean.cssTab) state.cssTab = clean.cssTab;
      if (clean.previewTab) state.previewTab = clean.previewTab;
      if (clean.lang) state.lang = clean.lang;
      if (clean.variableUnit) state.variableUnit = clean.variableUnit;
      if (clean.googleFont != null) state.googleFont = clean.googleFont;
      clampStateFields();
    }

    function saveToStorage() {
      try { localStorage.setItem(STORAGE_KEY, JSON.stringify(serializeState())); } catch (_) {}
    }

    function loadFromStorage() {
      try {
        const raw = localStorage.getItem(STORAGE_KEY);
        if (!raw || raw.length > MAX_STORAGE_BYTES) return;
        const data = JSON.parse(raw);
        applyState(data);
      } catch (_) {}
    }

    function stateToParams() {
      const p = new URLSearchParams();
      Object.entries(PARAM_MAP).forEach(([short, key]) => {
        if (state[key] != null && state[key] !== '') p.set(short, state[key]);
      });
      const lb = Object.entries(state.labels)
        .filter(([, v]) => v)
        .map(([k, v]) => `${k}:${encodeURIComponent(v)}`)
        .join(',');
      if (lb) p.set('lb', lb);
      return p;
    }

    function loadFromUrl() {
      const p = new URLSearchParams(location.search);
      if (!p.toString()) return;
      const data = {};
      Object.entries(PARAM_MAP).forEach(([short, key]) => {
        if (!p.has(short)) return;
        const v = p.get(short);
        if (v == null || v.length > 64) return;
        if (INT_STATE_KEYS.has(key)) data[key] = parseInt(v, 10);
        else if (STRING_STATE_KEYS.has(key)) data[key] = v;
        else data[key] = parseFloat(v);
      });
      if (p.has('lb')) {
        const lbRaw = p.get('lb');
        if (lbRaw && lbRaw.length <= MAX_LB_PARAM_LEN) {
          data.labels = {};
          lbRaw.split(',').forEach(pair => {
            if (!pair) return;
            const i = pair.indexOf(':');
            if (i <= 0) return;
            const level = parseInt(pair.slice(0, i), 10);
            if (!Number.isInteger(level)) return;
            let label;
            try {
              label = decodeURIComponent(pair.slice(i + 1));
            } catch (_) {
              return;
            }
            data.labels[level] = label;
          });
        }
      }
      applyState(data);
    }

    function buildShareUrl() {
      return `${location.origin}${location.pathname}?${stateToParams()}`;
    }

    function showControlToast(msg) {
      const el = document.getElementById('controlToast');
      if (!el) return;
      el.textContent = msg;
      setTimeout(() => { if (el.textContent === msg) el.textContent = ''; }, 2000);
    }

    function showScaleToast(msg) {
      const el = document.getElementById('scaleToast');
      if (!el) return;
      el.textContent = msg;
      setTimeout(() => { if (el.textContent === msg) el.textContent = ''; }, 2000);
    }

    function cssSlug(level) {
      const raw = String(state.labels[level] ?? defaultLabel(level));
      const slug = raw.trim().toLowerCase()
        .replace(/[^\w-]/g, '-')
        .replace(/-+/g, '-')
        .replace(/^-+|-+$/g, '')
        .slice(0, MAX_LABEL_LEN);
      return slug || defaultLabel(level);
    }

    function cssClassName(level) {
      return `text-${cssSlug(level)}`;
    }

    function resetToDefaults() {
      const lang = state.lang;
      Object.assign(state, { ...DEFAULTS, labels: {}, cssTab: 'vanilla', lang });
      try { localStorage.removeItem(STORAGE_KEY); } catch (_) {}
      history.replaceState(null, '', location.pathname);
      buildControls();
      render();
      showControlToast(t('resetDone'));
    }

    function bindControlActions() {
      const el = document.getElementById('controls');
      if (!el || el.dataset.actionsBound) return;
      el.dataset.actionsBound = '1';
      el.addEventListener('click', e => {
        if (e.target.closest('#btnSave')) {
          readControls();
          saveToStorage();
          showControlToast(t('saved'));
        }
        if (e.target.closest('#btnShare')) {
          readControls();
          navigator.clipboard.writeText(buildShareUrl()).then(() => showControlToast(t('shared')));
        }
        if (e.target.closest('#btnReset')) {
          resetToDefaults();
        }
      });
    }

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
      const custom = state.labels[level];
      if (custom != null && custom !== '') {
        const safe = sanitizeLabelString(custom);
        if (safe) return safe;
      }
      return defaultLabel(level);
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
      return { label: t('wcagNormal'), badge: 'badge-normal', contrast: '4.5:1 (AA)' };
    }

    function wcagCheckLevel(level, c) {
      const rawSp = fluidMin(level, c);
      const sp = effectiveSpMin(level, c);
      const pc = fluidMax(level, c);
      const atVw = sizeAtViewport(level, state.previewViewport, c);
      const body = wcagBodyStatus(sp);
      const largeSp = wcagLargeTextStatus(sp);
      const largePc = wcagLargeTextStatus(pc);
      return { rawSp, sp, pc, atVw, body, largeSp, largePc, floored: rawSp < c.fontSizeFloor };
    }

    function renderWcagCell(w) {
      const parts = [`<span class="badge ${w.body.badge}">${w.body.label}</span>`];
      parts.push(`<span class="badge ${w.largeSp.badge}">${w.largeSp.label}</span>`);
      return parts.join(' ');
    }

    function levelsRange() {
      const lo = Math.max(LEVEL_KEY_MIN, Math.min(10, state.levelMin));
      const hi = Math.min(LEVEL_KEY_MAX, Math.max(-6, state.levelMax));
      const min = Math.min(lo, hi);
      const max = Math.max(lo, hi);
      const span = max - min;
      const cappedMax = span > MAX_LEVEL_SPAN ? min + MAX_LEVEL_SPAN : max;
      const arr = [];
      for (let i = min; i <= cappedMax; i++) arr.push(i);
      return arr;
    }

    function previewFontSizePx(level, c, vw) {
      return sizeAtViewport(level, vw ?? state.previewViewport, c);
    }

    function previewTextStyle(level, c, vw) {
      return `font-size:${previewFontSizePx(level, c, vw)}px`;
    }

    function jumpAtPreview(level, prevLevel, c, vw) {
      if (prevLevel == null) return '—';
      return fmtRatio(
        sizeAtViewport(level, vw, c),
        sizeAtViewport(prevLevel, vw, c),
      );
    }

    let previewUI = null;

    function getPreviewUI() {
      if (!previewUI) {
        previewUI = FSSPreviewSample.create({
          t,
          escapeHtml,
          escapeAttr,
          ICONS,
          previewTextStyle,
          previewFontFamilyStyle,
        });
      }
      return previewUI;
    }

    // --- UI render ---

    function buildControls() {
      const el = document.getElementById('controls');
      el.innerHTML = `
        <div class="sidebar-actions">
          <button type="button" id="btnSave" class="action-btn">${ICONS.save}<span>${t('btnSave')}</span></button>
          <button type="button" id="btnShare" class="action-btn">${ICONS.share}<span>${t('btnShare')}</span></button>
          <button type="button" id="btnReset" class="action-btn action-btn-muted">${ICONS.reset}<span>${t('btnReset')}</span></button>
        </div>
        <div id="controlToast" class="toast"></div>

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

        <div class="section-title">${t('secPreviewFont')}</div>
        <div class="field">
          <label for="googleFont">${t('googleFontLabel')}</label>
          <select id="googleFont">
            ${GOOGLE_FONTS.map(f => `<option value="${escapeAttr(f.id)}"${state.googleFont === f.id ? ' selected' : ''}>${escapeHtml(googleFontOptionLabel(f))}</option>`).join('')}
          </select>
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
        <div class="section-title">${t('secTargetSize')}</div>
        <div class="field-row field-row-3">
          <div class="field">
            <label for="targetSp1">${t('targetSp1')}</label>
            <input type="number" id="targetSp1" value="${state.targetSp1}" min="6" max="72" step="0.5">
          </div>
          <div class="field">
            <label for="targetSp2">${t('targetSp2')}</label>
            <input type="number" id="targetSp2" value="${state.targetSp2}" min="6" max="72" step="0.5">
          </div>
          <div class="field">
            <label for="targetSp3">${t('targetSp3')}</label>
            <input type="number" id="targetSp3" value="${state.targetSp3}" min="6" max="72" step="0.5">
          </div>
        </div>
        <div class="field-row field-row-3">
          <div class="field">
            <label for="targetPc1">${t('targetPc1')}</label>
            <input type="number" id="targetPc1" value="${state.targetPc1}" min="6" max="72" step="0.5">
          </div>
          <div class="field">
            <label for="targetPc2">${t('targetPc2')}</label>
            <input type="number" id="targetPc2" value="${state.targetPc2}" min="6" max="72" step="0.5">
          </div>
          <div class="field">
            <label for="targetPc3">${t('targetPc3')}</label>
            <input type="number" id="targetPc3" value="${state.targetPc3}" min="6" max="72" step="0.5">
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
      state.lang = normalizeLang(lang);
      document.documentElement.lang = lang;
      document.getElementById('headerSubtitle').innerHTML = t('headerSubtitle');
      renderLangToggle();
      buildControls();
      render();
      if (document.getElementById('exportHelpModal')?.classList.contains('is-open')) {
        const tab = document.getElementById('exportHelpModal').dataset.helpTab;
        if (tab) updateExportHelpModal(tab);
      }
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
      state.targetSp1 = num('targetSp1');
      state.targetSp2 = num('targetSp2');
      state.targetSp3 = num('targetSp3');
      state.targetPc1 = num('targetPc1');
      state.targetPc2 = num('targetPc2');
      state.targetPc3 = num('targetPc3');
      state.googleFont = normalizeGoogleFont(document.getElementById('googleFont')?.value ?? '');
      if (state.levelMin > state.levelMax) {
        [state.levelMin, state.levelMax] = [state.levelMax, state.levelMin];
      }
      clampStateFields();
    }

    function getTargetSizeChecks() {
      return [
        { id: 'sp1', label: `SP ${fmt(state.targetSp1, 1)}`, px: state.targetSp1, isSp: true, badgeClass: 'target-badge target-a target-sp' },
        { id: 'sp2', label: `SP ${fmt(state.targetSp2, 1)}`, px: state.targetSp2, isSp: true, badgeClass: 'target-badge target-b target-sp' },
        { id: 'sp3', label: `SP ${fmt(state.targetSp3, 1)}`, px: state.targetSp3, isSp: true, badgeClass: 'target-badge target-c target-sp' },
        { id: 'pc1', label: `PC ${fmt(state.targetPc1, 1)}`, px: state.targetPc1, isSp: false, badgeClass: 'target-badge target-a target-pc' },
        { id: 'pc2', label: `PC ${fmt(state.targetPc2, 1)}`, px: state.targetPc2, isSp: false, badgeClass: 'target-badge target-b target-pc' },
        { id: 'pc3', label: `PC ${fmt(state.targetPc3, 1)}`, px: state.targetPc3, isSp: false, badgeClass: 'target-badge target-c target-pc' },
      ].filter(ch => ch.px > 0);
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

    function formatTargetDiffPx(size, targetPx) {
      const diff = size - targetPx;
      if (Math.abs(diff) < 0.05) return '';
      return ` ${(diff >= 0 ? '+' : '')}${fmt(diff, 1)}px`;
    }

    function renderTargetCell(level, checks, c) {
      const badges = checks
        .map(ch => {
          const closest = closestIntegerLevel(ch.px, ch.isSp, c);
          if (closest.level !== level) return '';
          return `<span class="badge ${ch.badgeClass}">${ch.label}${formatTargetDiffPx(closest.size, ch.px)}</span>`;
        })
        .filter(Boolean)
        .join(' ');
      return badges || '—';
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
        return `.${cssClassName(l)} {\n  --font-level: ${l};\n}`;
      }).join('\n\n');

      return `${googleFontImportPrefix()}/*
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
        return `  --text-fluid-${cssSlug(l)}: ${cssClampLiteral(l, c).clamp};`;
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
${levels.map(l => `.${cssClassName(l)} { --font-level: ${l}; }`).join('\n')}`;
    }

    function buildFigmaModeTokens(c, mode) {
      const group = {};
      for (const level of levelsRange()) {
        const px = mode === 'SP' ? effectiveSpMin(level, c) : fluidMax(level, c);
        const key = cssSlug(level);
        group[key] = {
          $type: 'dimension',
          $value: `${fmt(px)}px`,
          $description: `${cssClassName(level)} · Lv ${level} · ${cssClampLiteral(level, c).clamp}`,
          $extensions: { 'com.figma.scopes': ['FONT_SIZE'] },
        };
      }
      return { 'Font Size': group };
    }

    function buildFigmaManifest() {
      return {
        name: 'Font Size Scaler',
        collections: {
          'Type Scale SP': {
            modes: { Default: ['sp.tokens.json'] },
          },
          'Type Scale PC': {
            modes: { Default: ['pc.tokens.json'] },
          },
        },
      };
    }

    function buildFigmaBundle(c) {
      return {
        manifest: JSON.stringify(buildFigmaManifest(), null, 2),
        sp: JSON.stringify(buildFigmaModeTokens(c, 'SP'), null, 2),
        pc: JSON.stringify(buildFigmaModeTokens(c, 'PC'), null, 2),
      };
    }

    function generateFigmaJSON(c) {
      return buildFigmaBundle(c).sp;
    }

    const TOKENS_STUDIO_SET_SP = 'Type Scale/SP';
    const TOKENS_STUDIO_SET_PC = 'Type Scale/PC';

    function buildTokensStudioTypographySet(c, mode) {
      const set = {};
      for (const level of levelsRange()) {
        const px = mode === 'SP' ? effectiveSpMin(level, c) : fluidMax(level, c);
        set[cssClassName(level)] = {
          value: {
            fontFamily: tokensStudioFontFamily(),
            fontWeight: 'Regular',
            lineHeight: '150%',
            letterSpacing: '0',
            paragraphSpacing: '0',
            paragraphIndent: '0',
            textCase: 'none',
            textDecoration: 'none',
            fontSize: `${fmt(px)}px`,
          },
          type: 'typography',
          description: `Lv ${level} · ${cssClampLiteral(level, c).clamp}`,
        };
      }
      return set;
    }

    function generateTokensStudioJSON(c) {
      return JSON.stringify({
        [TOKENS_STUDIO_SET_SP]: buildTokensStudioTypographySet(c, 'SP'),
        [TOKENS_STUDIO_SET_PC]: buildTokensStudioTypographySet(c, 'PC'),
        $themes: [
          {
            id: 'sp',
            name: 'SP',
            selectedTokenSets: {
              [TOKENS_STUDIO_SET_SP]: 'enabled',
              [TOKENS_STUDIO_SET_PC]: 'disabled',
            },
          },
          {
            id: 'pc',
            name: 'PC',
            selectedTokenSets: {
              [TOKENS_STUDIO_SET_SP]: 'disabled',
              [TOKENS_STUDIO_SET_PC]: 'enabled',
            },
          },
        ],
        $metadata: {
          tokenSetOrder: [TOKENS_STUDIO_SET_SP, TOKENS_STUDIO_SET_PC],
        },
      }, null, 2);
    }

    const CRC32_TABLE = (() => {
      const table = new Uint32Array(256);
      for (let i = 0; i < 256; i++) {
        let c = i;
        for (let k = 0; k < 8; k++) c = (c & 1) ? (0xEDB88320 ^ (c >>> 1)) : (c >>> 1);
        table[i] = c >>> 0;
      }
      return table;
    })();

    function crc32(bytes) {
      let crc = 0xFFFFFFFF;
      for (let i = 0; i < bytes.length; i++) crc = CRC32_TABLE[(crc ^ bytes[i]) & 0xFF] ^ (crc >>> 8);
      return (crc ^ 0xFFFFFFFF) >>> 0;
    }

    function writeUint32LE(view, offset, value) {
      view.setUint32(offset, value, true);
    }

    function writeUint16LE(view, offset, value) {
      view.setUint16(offset, value, true);
    }

    function createStoreZip(files) {
      const enc = new TextEncoder();
      const parts = [];
      const central = [];
      let offset = 0;

      for (const { name, content } of files) {
        const nameBytes = enc.encode(name);
        const data = enc.encode(content);
        const crc = crc32(data);
        const local = new Uint8Array(30 + nameBytes.length + data.length);
        const lv = new DataView(local.buffer);
        writeUint32LE(lv, 0, 0x04034B50);
        writeUint16LE(lv, 4, 20);
        writeUint16LE(lv, 6, 0);
        writeUint16LE(lv, 8, 0);
        writeUint16LE(lv, 10, 0);
        writeUint16LE(lv, 12, 0);
        writeUint32LE(lv, 14, crc);
        writeUint32LE(lv, 18, data.length);
        writeUint32LE(lv, 22, data.length);
        writeUint16LE(lv, 26, nameBytes.length);
        writeUint16LE(lv, 28, 0);
        local.set(nameBytes, 30);
        local.set(data, 30 + nameBytes.length);
        parts.push(local);

        const cd = new Uint8Array(46 + nameBytes.length);
        const cv = new DataView(cd.buffer);
        writeUint32LE(cv, 0, 0x02014B50);
        writeUint16LE(cv, 4, 20);
        writeUint16LE(cv, 6, 20);
        writeUint16LE(cv, 8, 0);
        writeUint16LE(cv, 10, 0);
        writeUint16LE(cv, 12, 0);
        writeUint16LE(cv, 14, 0);
        writeUint32LE(cv, 16, crc);
        writeUint32LE(cv, 20, data.length);
        writeUint32LE(cv, 24, data.length);
        writeUint16LE(cv, 28, nameBytes.length);
        writeUint16LE(cv, 30, 0);
        writeUint16LE(cv, 32, 0);
        writeUint16LE(cv, 34, 0);
        writeUint16LE(cv, 36, 0);
        writeUint32LE(cv, 38, 0);
        writeUint32LE(cv, 42, offset);
        cd.set(nameBytes, 46);
        central.push(cd);
        offset += local.length;
      }

      const centralSize = central.reduce((sum, part) => sum + part.length, 0);
      const end = new Uint8Array(22);
      const ev = new DataView(end.buffer);
      writeUint32LE(ev, 0, 0x06054B50);
      writeUint16LE(ev, 4, 0);
      writeUint16LE(ev, 6, 0);
      writeUint16LE(ev, 8, files.length);
      writeUint16LE(ev, 10, files.length);
      writeUint32LE(ev, 12, centralSize);
      writeUint32LE(ev, 16, offset);
      writeUint16LE(ev, 20, 0);

      const total = offset + centralSize + end.length;
      const zip = new Uint8Array(total);
      let pos = 0;
      for (const part of parts) { zip.set(part, pos); pos += part.length; }
      for (const part of central) { zip.set(part, pos); pos += part.length; }
      zip.set(end, pos);
      return zip;
    }

    function exportCode(c) {
      if (state.cssTab === 'tailwind') return generateTailwindCSS(c);
      if (state.cssTab === 'figma-vars') return generateFigmaJSON(c);
      if (state.cssTab === 'tokens-studio') return generateTokensStudioJSON(c);
      return generateVanillaCSS(c);
    }

    function exportFilename() {
      if (state.cssTab === 'tailwind') return 'fluid-modular-type-scale.tailwind.css';
      if (state.cssTab === 'figma-vars') return 'font-size-scaler-variables.zip';
      if (state.cssTab === 'tokens-studio') return 'font-size-scaler-tokens-studio.json';
      return 'fluid-modular-type-scale.css';
    }

    function exportMimeType() {
      if (state.cssTab === 'figma-vars') return 'application/zip';
      if (state.cssTab === 'tokens-studio') return 'application/json;charset=utf-8';
      return 'text/css;charset=utf-8';
    }

    function downloadExport() {
      readControls();
      const c = getConfig();
      let blob;
      if (state.cssTab === 'figma-vars') {
        const bundle = buildFigmaBundle(c);
        const zip = createStoreZip([
          { name: 'manifest.json', content: bundle.manifest },
          { name: 'sp.tokens.json', content: bundle.sp },
          { name: 'pc.tokens.json', content: bundle.pc },
        ]);
        blob = new Blob([zip], { type: exportMimeType() });
      } else {
        blob = new Blob([exportCode(c)], { type: exportMimeType() });
      }
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = exportFilename();
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url);
    }

    function updateExportHelpModal(tab) {
      const modal = document.getElementById('exportHelpModal');
      const cfg = EXPORT_HELP[tab];
      if (!modal || !cfg) return;
      modal.querySelector('#exportHelpModalTitle').textContent = t(cfg.title);
      modal.querySelector('#exportHelpModalNote').innerHTML = t(cfg.note);
      modal.querySelector('#exportHelpModalSteps').innerHTML = t(cfg.steps);
      modal.querySelector('[data-modal-close-btn]').textContent = t('exportModalClose');
      modal.querySelector('.modal-close').setAttribute('aria-label', t('exportModalClose'));
    }

    function openExportHelpModal(tab) {
      if (!EXPORT_HELP[tab]) return;
      ensureExportHelpModal();
      updateExportHelpModal(tab);
      const modal = document.getElementById('exportHelpModal');
      modal.dataset.helpTab = tab;
      modal.classList.add('is-open');
      modal.setAttribute('aria-hidden', 'false');
      document.body.classList.add('modal-open');
      modal.querySelector('.modal-close').focus();
    }

    function closeExportHelpModal() {
      const modal = document.getElementById('exportHelpModal');
      if (!modal) return;
      modal.classList.remove('is-open');
      modal.setAttribute('aria-hidden', 'true');
      document.body.classList.remove('modal-open');
    }

    function ensureExportHelpModal() {
      if (document.getElementById('exportHelpModal')) return;
      document.body.insertAdjacentHTML('beforeend', `
        <div id="exportHelpModal" class="modal" aria-hidden="true">
          <div class="modal-backdrop" data-modal-close tabindex="-1"></div>
          <div class="modal-panel" role="dialog" aria-modal="true" aria-labelledby="exportHelpModalTitle">
            <button type="button" class="modal-close" data-modal-close aria-label="">×</button>
            <h2 id="exportHelpModalTitle"></h2>
            <p id="exportHelpModalNote" class="modal-note"></p>
            <div id="exportHelpModalSteps" class="modal-steps"></div>
            <div class="modal-footer">
              <button type="button" class="export-btn" data-modal-close-btn data-modal-close></button>
            </div>
          </div>
        </div>`);
      bindExportHelpModal();
    }

    function bindExportHelpModal() {
      const modal = document.getElementById('exportHelpModal');
      if (!modal || modal.dataset.bound) return;
      modal.dataset.bound = '1';
      modal.addEventListener('click', e => {
        if (e.target.closest('[data-modal-close]')) closeExportHelpModal();
      });
      document.addEventListener('keydown', e => {
        if (e.key === 'Escape' && modal.classList.contains('is-open')) closeExportHelpModal();
      });
    }

    function renderScaleTable(c) {
      const levels = levelsRange();
      const checks = getTargetSizeChecks();
      const vw = state.previewViewport;

      let rows = '';
      levels.forEach((level, i) => {
        const rawSp = fluidMin(level, c);
        const sp = effectiveSpMin(level, c);
        const pc = fluidMax(level, c);
        const atVw = sizeAtViewport(level, vw, c);
        const prevLevel = i > 0 ? levels[i - 1] : null;
        const jump = jumpAtPreview(level, prevLevel, c, vw);
        const spCell = isFloored(level, c)
          ? `${fmtPx(sp)} <span class="badge badge-warn" title="${t('floorTitle', { raw: fmtPx(rawSp) })}">${t('badgeFloor')}</span>`
          : fmtPx(sp);

        let rowClass = '';
        const wcag = wcagCheckLevel(level, c);
        if (sp < WCAG.absoluteMin) rowClass = 'danger-row';
        else if (sp < WCAG.captionMin) rowClass = rowClass || 'warn-row';

        rows += `<tr class="${rowClass}">
          <td>${level}</td>
          <td><input class="label-input" data-level="${level}" value="${escapeAttr(getLabel(level))}"></td>
          <td>${spCell}</td>
          <td>${fmtPx(pc)}</td>
          <td>${fmtPx(atVw)}</td>
          <td>${jump}</td>
          <td>${renderWcagCell(wcag)}</td>
          <td>${renderTargetCell(level, checks, c)}</td>
          <td><button type="button" class="class-copy-btn" data-class="${escapeAttr(cssClassName(level))}" title="${escapeAttr(cssClassName(level))}">${ICONS.copy}<span>CSS</span></button></td>
        </tr>`;
      });

      const heads = [
        thTip(t('colLevel'), t('tipLevel')),
        thTip(t('colUsage'), t('tipUsage')),
        thTip(t('colSp'), t('tipSp', { vw: c.fontWidthMin, floor: c.fontSizeFloor })),
        thTip(t('colPc'), t('tipPc', { vw: c.fontWidthMax })),
        thTip(`${vw}px`, t('tipPreview', { vw })),
        thTip(t('colJump'), t('tipJump', { vw })),
        thTip(t('colWcag'), t('tipWcag')),
        thTip(t('colTarget'), t('tipTarget')),
        thTip(t('colCss'), t('tipColCss')),
      ];

      return `<div class="card">
        <div class="card-head-row">
          <h2>${t('scaleTable')}</h2>
          <span id="scaleToast" class="toast scale-toast"></span>
        </div>
        <p class="compare-note">${t('wcagNote', { floor: c.fontSizeFloor, vw })}</p>
        <p class="compare-note">${t('targetNote', { size: fmtPx(effectiveSpMin(0, c)) })} ${t('targetIntro')}</p>
        <table id="scaleTable">
          <thead><tr>${heads.map(h => `<th>${h}</th>`).join('')}</tr></thead>
          <tbody>${rows}</tbody>
        </table>
      </div>`;
    }

    function renderPreview(c) {
      const vw = clampViewport(state.previewViewport, c);
      const tab = state.previewTab;
      const listActive = tab === 'list';
      const fontWrap = previewFontFamilyStyle();
      const fontAttr = fontWrap ? ` style="${escapeAttr(fontWrap)}"` : '';
      const preview = getPreviewUI();
      const body = listActive
        ? `<div id="previewBlocks"${fontAttr}>${preview.renderList({
          c, vw, levels: levelsRange(), sizeAtViewport, fmtPx, getLabel,
        })}</div>`
        : `<div class="preview-sample-scroll"><div class="preview-sample-frame" id="previewSampleFrame" style="width:${vw}px" data-vw="${vw}px"><div id="previewSample">${preview.renderSample(c, vw)}</div></div></div>`;

      return `<div class="card" id="previewCard">
        <div class="card-head-row">
          <h2>${t('previewTitle')}</h2>
          <div class="tabs preview-tabs">
            <button type="button" class="${listActive ? 'active' : ''}" data-preview-tab="list">${t('previewTabList')}</button>
            <button type="button" class="${!listActive ? 'active' : ''}" data-preview-tab="sample">${t('previewTabSample')}</button>
          </div>
        </div>
        <div class="viewport-bar">
          <label for="previewViewport">${t('previewViewport')}</label>
          <input type="range" id="previewViewport" min="${c.fontWidthMin}" max="${c.fontWidthMax}" value="${vw}" step="1">
          <input type="number" id="previewViewportNum" min="${c.fontWidthMin}" max="${c.fontWidthMax}" value="${vw}" step="1">
          <span style="font-size:0.75rem;color:var(--text-muted)">px</span>
        </div>
        ${body}
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

      const sampleFrame = document.getElementById('previewSampleFrame');
      if (sampleFrame) {
        sampleFrame.style.width = state.previewViewport + 'px';
        sampleFrame.dataset.vw = state.previewViewport + 'px';
      }
      getPreviewUI().closeDrawerIfWide(state.previewViewport);

      const previewTh = document.querySelector('#scaleTable thead th:nth-child(5)');
      if (previewTh) previewTh.innerHTML = thTip(`${state.previewViewport}px`, t('tipPreview', { vw: state.previewViewport }));
      const jumpTh = document.querySelector('#scaleTable thead th:nth-child(6)');
      if (jumpTh) jumpTh.innerHTML = thTip(t('colJump'), t('tipJump', { vw: state.previewViewport }));

      const tableLevels = levelsRange();
      document.querySelectorAll('#scaleTable tbody tr').forEach((row, i) => {
        const level = tableLevels[i];
        if (level == null) return;
        const px = sizeAtViewport(level, state.previewViewport, c);
        const prevLevel = i > 0 ? tableLevels[i - 1] : null;
        const cells = row.querySelectorAll('td');
        if (cells[4]) cells[4].textContent = fmtPx(px);
        if (cells[5]) cells[5].textContent = jumpAtPreview(level, prevLevel, c, state.previewViewport);
      });

      document.querySelectorAll('.preview-block[data-preview-level]').forEach(el => {
        const level = parseInt(el.dataset.previewLevel, 10);
        const px = sizeAtViewport(level, state.previewViewport, c);
        el.querySelector('.preview-px').textContent = fmtPx(px);
        el.querySelector('.preview-vw').textContent = state.previewViewport;
        el.querySelector('.preview-text').style.fontSize = px + 'px';
      });

      document.querySelectorAll('.preview-scale-text[data-preview-level]').forEach(el => {
        const level = parseInt(el.dataset.previewLevel, 10);
        el.style.fontSize = sizeAtViewport(level, state.previewViewport, c) + 'px';
      });
    }

    function renderCSS(c) {
      const active = state.cssTab;
      const code = exportCode(c);
      const introKey = exportIntroKey(active);
      const showHelp = EXPORT_HELP[active];

      return `<div class="card" id="exportCard">
        <h2>${t('cssTitle')}</h2>
        <div class="tabs-row">
          <div class="tabs">
            <button type="button" class="${active === 'vanilla' ? 'active' : ''}" data-tab="vanilla">${t('cssVanilla')}</button>
            <button type="button" class="${active === 'tailwind' ? 'active' : ''}" data-tab="tailwind">${t('cssTailwind')}</button>
            <button type="button" class="${active === 'figma-vars' ? 'active' : ''}" data-tab="figma-vars">${t('cssFigmaVars')}</button>
            <button type="button" class="${active === 'tokens-studio' ? 'active' : ''}" data-tab="tokens-studio">${t('cssTokensStudio')}</button>
          </div>
          ${showHelp ? `<button type="button" class="tab-extra" data-export-help="${active}">${ICONS.help}<span>${t('exportHowTo')}</span></button>` : ''}
        </div>
        ${introKey ? `<p class="compare-note">${t(introKey)}</p>` : ''}
        <div class="code-wrap">
          <div class="code-wrap-actions">
            <button type="button" class="copy-btn" data-copy>${ICONS.copy}<span>${t('copy')}</span></button>
            <button type="button" class="copy-btn" data-download>${ICONS.download}<span>${t('btnDownload')}</span></button>
          </div>
          <pre id="cssOutput">${escapeHtml(code)}</pre>
        </div>
      </div>`;
    }

    function render() {
      const c = getConfig();
      const main = document.getElementById('main');
      main.innerHTML =
        renderScaleTable(c) +
        renderPreview(c) +
        renderCSS(c);

      bindMainEvents(c);
      loadGoogleFontStylesheet(state.googleFont);
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
          const level = parseInt(input.dataset.level, 10);
          const label = sanitizeLabelString(input.value.trim());
          state.labels[level] = label || defaultLabel(level);
          clampStateFields();
          render();
        });
      });

      main.querySelectorAll('#exportCard .tabs button').forEach(btn => {
        btn.addEventListener('click', () => {
          state.cssTab = normalizeCssTab(btn.dataset.tab);
          render();
        });
      });

      main.querySelectorAll('#previewCard .preview-tabs button').forEach(btn => {
        btn.addEventListener('click', () => {
          state.previewTab = normalizePreviewTab(btn.dataset.previewTab);
          render();
        });
      });

      getPreviewUI().bindDrawer();

      main.querySelectorAll('[data-export-help]').forEach(btn => {
        btn.addEventListener('click', () => {
          openExportHelpModal(btn.dataset.exportHelp);
        });
      });

      main.querySelectorAll('.class-copy-btn').forEach(btn => {
        btn.addEventListener('click', () => {
          const cls = btn.dataset.class;
          navigator.clipboard.writeText(cls).then(() => {
            showScaleToast(t('classCopied'));
            btn.classList.add('copied');
            setTimeout(() => btn.classList.remove('copied'), 1500);
          });
        });
      });

      main.querySelector('[data-copy]')?.addEventListener('click', () => {
        readControls();
        navigator.clipboard.writeText(exportCode(getConfig())).then(() => {
          const btn = main.querySelector('[data-copy] span');
          if (!btn) return;
          const prev = btn.textContent;
          btn.textContent = t('copied');
          setTimeout(() => { btn.textContent = prev; }, 1500);
        });
      });

      main.querySelector('[data-download]')?.addEventListener('click', () => {
        downloadExport();
        const btn = main.querySelector('[data-download] span');
        if (!btn) return;
        const prev = btn.textContent;
        btn.textContent = t('downloaded');
        setTimeout(() => { btn.textContent = prev; }, 1500);
      });
    }

    loadFromStorage();
    loadFromUrl();
    clampStateFields();
    document.documentElement.lang = state.lang;
    document.getElementById('headerSubtitle').innerHTML = t('headerSubtitle');
    renderLangToggle();
    buildControls();
    bindControlActions();
    ensureExportHelpModal();
    render();
