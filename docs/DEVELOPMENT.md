# 開発ガイド

Fluid Modular Type Scale 設定ツールの引き継ぎ用ドキュメント。

## リポジトリ構成

```
font-size-scaler/
├── index.html              # シェル（HTML + base href 自動設定）
├── css/styles.css          # UI スタイル
├── js/app.js               # アプリ本体（ビルド不要）
├── scripts/
│   ├── serve.sh            # python3 -m http.server 8080
│   └── verify-formula.mjs  # 計算式の Node 検証
├── docs/
│   └── DEVELOPMENT.md      # 本ファイル
├── PLAN.md                 # 初期設計・背景（アーカイブ）
└── README.md               # ユーザー向け概要
```

## 公開

| 環境 | URL / 方法 |
|------|------------|
| GitHub Pages | https://mtbk4919naoki.github.io/font-size-scaler/ |
| ローカル | `./scripts/serve.sh` → http://localhost:8080（推奨） |

Pages は `main` ブランチ root 配信。push 後 1〜2 分で反映。

`index.html` 先頭の `<base href>` スクリプトで GitHub Pages のサブパス配信に対応。

## `js/app.js` の構成

| セクション | 主な責務 |
|------------|----------|
| **i18n** | `I18N`, `t()`, `thTip()` — 日英切替 |
| **constants / state** | `DEFAULTS`, `state`, `getConfig()`, `readControls()` |
| **persistence** | `serializeState`, `applyState`, `saveToStorage`, `loadFromStorage`, `loadFromUrl`, `buildShareUrl`, `resetToDefaults` |
| **scale math** | `fluidMin/Max`, `sizeAtViewport`, `applyFloor`, WCAG 判定 |
| **CSS export** | `cssClampLiteral`, `generateVanillaCSS`, `generateTailwindCSS` |
| **Figma export** | `generateFigmaJSON`, `renderFigmaExport`, `ensureFigmaModal`, `openFigmaModal` |
| **UI render** | `renderScaleTable`, `renderPreview`, `renderWCAG`, `renderPractical`, … |
| **init** | `loadFromStorage`, `loadFromUrl`, `buildControls`, `bindControlActions`, `render()` |

グローバル `state` に UI 入力値を保持。`render()` が `#main` を丸ごと再描画する。

サイドバー `#controls` の保存・共有・リセットは `bindControlActions()` でイベント委譲（言語切替で `buildControls()` が再実行されてもリスナー重複しない）。

### 部分更新

プレビュー vw スライダー操作時のみ `updatePreviewViewport()` で表のプレビュー列などを更新（フル `render()` しない）。

## 状態の永続化

### localStorage

- キー: `font-size-scaler-v1`
- 保存内容: `DEFAULTS` 全項目 + `previewViewport` + `labels` + `cssTab` + `lang`
- 「ブラウザに保存」ボタンで明示保存

### URL パラメータ

「共有URLをコピー」で全設定をクエリにエンコード。起動時 `loadFromUrl()` が **localStorage より優先**。

| 短縮キー | state キー | 例 |
|----------|------------|-----|
| `sm` | `fontSizeMin` | 15 |
| `sx` | `fontSizeMax` | 16 |
| `rm` | `fontRatioMin` | 1.2 |
| `rx` | `fontRatioMax` | 1.333 |
| `wm` | `fontWidthMin` | 360 |
| `wx` | `fontWidthMax` | 1440 |
| `fl` | `fontSizeFloor` | 8 |
| `rb` | `remBase` | 16 |
| `vu` | `variableUnit` | 100vi |
| `lmi` | `levelMin` | -3 |
| `lmx` | `levelMax` | 9 |
| `vw` | `previewViewport` | 768 |
| `spa` | `practicalSpA` | 10 |
| `spb` | `practicalSpB` | 18 |
| `pca` | `practicalPcA` | 12 |
| `pcb` | `practicalPcB` | 21 |
| `lng` | `lang` | ja |
| `tab` | `cssTab` | vanilla |
| `lb` | `labels` | `0:body,1:lead`（level:encodeURIComponent(label) をカンマ連結） |

旧 `practicalTarget1/2` の localStorage データは `applyState()` で `practicalSpA` / `practicalPcA` へ移行。

### リセット

`resetToDefaults()` — `DEFAULTS` + 空 labels + `cssTab: vanilla` に復元（`lang` は維持）。localStorage 削除 + `history.replaceState` で URL クリア。

## コア計算

```
fluid-min(L) = font-size-min × pow(font-ratio-min, L)
fluid-max(L) = font-size-max × pow(font-ratio-max, L)
slope        = (fluid-max − fluid-min) / (font-width-max − font-width-min)
size(vw)     = clamp(fluid-min, fluid-min − slope×font-width-min + slope×vw, fluid-max)
output       = max(font-size-floor, size(vw))
```

CSS 出力は [coliss 記事](https://coliss.com/articles/build-websites/operation/css/fluid-modular-type-scale.html) の `:where(.fluid)` + `pow()` に `--font-size-floor` を追加。

`cssClampLiteral()` が JS プレビューと Tailwind 事前計算 clamp の**単一ソース**。

### 検証

```bash
node scripts/verify-formula.mjs
```

全レベル × 代表 vw で JS `sizeAtViewport` と CSS 式の結果一致を確認。

## デフォルト値

| 変数 | 初期値 |
|------|--------|
| SP / PC 基底 | 15px / 16px |
| SP / PC スケール比 | 1.2 / 1.333 |
| ビューポート | 360px 〜 1440px |
| 絶対下限 | 8px |
| 表示レベル | -3 〜 9 |
| 実用チェック SP A / B | 10px / 18px |
| 実用チェック PC A / B | 12px / 21px |
| プレビュー vw | 768px |

## UI セクション概要

### 左サイドバー

変数入力 + 上部アクションバー（保存 / 共有 / リセット）。表ヘッダーのみ ⓘ ツールチップあり（サイドバーラベルには tips なし — 横スクロール回避のため）。

### スケール表

列: レベル / 用途 / (SP) / (PC) / {previewVw}px / ジャンプ率 SP / ジャンプ率 PC / 備考 / CSS

- 備考: WCAG バッジ、下限クランプ、実用チェック目標（SP A ≈10px 等）
- CSS 列: `text-{label}` クラス名をクリップボードへコピー

### 実用チェック

4 目標（SP A/B, PC A/B）× 各端点のみ。1 目標 1 行、最接近 ±1 段階を横並び表示。

関連関数: `getPracticalChecks()`, `closestIntegerLevel()`, `renderPracticalRow()`

### Figma エクスポート

`generateFigmaJSON(c)` が `format: font-size-scaler-figma-v1` の JSON を生成。

```json
{
  "format": "font-size-scaler-figma-v1",
  "meta": { "viewportMin", "viewportMax", "modes": ["SP", "PC"], ... },
  "styles": [
    {
      "name": "body",
      "level": 0,
      "cssClass": "text-body",
      "fontSize": { "SP": 15, "PC": 16 },
      "previewPx": 15.38,
      "cssClamp": "max(...)"
    }
  ]
}
```

- UI: `renderFigmaExport()` + モーダル（`ensureFigmaModal`, `updateFigmaModalContent`）
- 取り込み先の例: [Variables Import](https://www.figma.com/community/plugin/1253424530216967528/variables-import)（モード SP/PC → Mobile/Desktop 等にマッピング）
- **制約**: Figma は連続補間非対応。font family / weight は JSON に含めない

## i18n の追加

1. `I18N.ja` と `I18N.en` に同じキーを追加
2. `t('yourKey', { var: value })` で `{var}` 置換
3. 言語切替はヘッダー `#langToggle` → `setLang()` → `buildControls()` + `render()`

## よく触る箇所

| やりたいこと | ファイル / 関数 |
|--------------|-----------------|
| 列見出し・ツールチップ | `I18N` + `renderScaleTable()` |
| 新しい CSS 変数 | `generateVanillaCSS`, `getConfig`, `buildControls`, `PARAM_MAP` |
| 実用チェック | `getPracticalChecks()`, `closestIntegerLevel()`, `renderPractical()` |
| 永続化キー追加 | `DEFAULTS`, `serializeState`, `PARAM_MAP`, `buildControls` |
| レベル名 | `defaultLabel()`, `state.labels` |
| クラス名コピー | `cssClassName()`, `.class-copy-btn` in `renderScaleTable` |
| Figma JSON | `generateFigmaJSON()`, `renderFigmaExport()`, `I18N` の `figma*` キー |

## 既知の制約・今後の候補

- **file://** — 相対パス `css/` `js/` でローカル打开可（ES modules 不使用）。`localStorage` は利用可
- **CSS ダウンロード** — 現状コピーのみ
- **Figma** — JSON エクスポート（SP/PC 離散値）のみ。専用 Figma プラグインでの自動 Style 生成は未実装
- **pow vs 線形比較** — 表からは削除済み。再掲するなら折りたたみセクション
- **設定 JSON import** — Figma 以外のファイル import は未実装

## コミット & デプロイ

```bash
git add .
git commit -m "your message"
git push   # main → GitHub Pages 自動反映
```

## 参照

- [PLAN.md](../PLAN.md) — 当初の設計意図
- [README.md](../README.md) — 使い方・機能一覧
