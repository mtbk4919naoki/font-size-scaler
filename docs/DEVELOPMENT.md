# 開発ガイド

Fluid Modular Type Scale 設定ツールの引き継ぎ用ドキュメント。

## リポジトリ構成

```
font-size-scaler/
├── index.html          # シェル（HTML のみ）
├── css/styles.css      # UI スタイル
├── js/app.js           # アプリ本体（ビルド不要）
├── scripts/
│   └── verify-formula.mjs  # 計算式の Node 検証
├── docs/
│   └── DEVELOPMENT.md  # 本ファイル
├── PLAN.md             # 初期設計・背景（アーカイブ）
└── README.md           # ユーザー向け概要
```

## 公開

| 環境 | URL / 方法 |
|------|------------|
| GitHub Pages | https://mtbk4919naoki.github.io/font-size-scaler/ |
| ローカル | `./scripts/serve.sh` → http://localhost:8080（推奨） |

Pages は `main` ブランチ root 配信。push 後 1〜2 分で反映。

## `js/app.js` の構成

| セクション | 主な責務 |
|------------|----------|
| **i18n** | `I18N`, `t()`, `thTip()` — 日英切替 |
| **constants / state** | `DEFAULTS`, `state`, `getConfig()`, `readControls()` |
| **scale math** | `fluidMin/Max`, `sizeAtViewport`, `applyFloor`, WCAG 判定 |
| **CSS export** | `cssClampLiteral`, `generateVanillaCSS`, `generateTailwindCSS` |
| **UI render** | `renderScaleTable`, `renderPreview`, `renderWCAG`, … |
| **init** | `buildControls`, `renderLangToggle`, `render()` |

グローバル `state` に UI 入力値を保持。`render()` が `#main` を丸ごと再描画する。

### 部分更新

プレビュー vw スライダー操作時のみ `updatePreviewViewport()` で表のプレビュー列などを更新（フル `render()` しない）。

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

## i18n の追加

1. `I18N.ja` と `I18N.en` に同じキーを追加
2. `t('yourKey', { var: value })` で `{var}` 置換
3. 言語切替はヘッダー `#langToggle` → `setLang()` → `buildControls()` + `render()`

## よく触る箇所

| やりたいこと | ファイル / 関数 |
|--------------|-----------------|
| 列見出し・ツールチップ | `I18N` + `renderScaleTable()` |
| 新しい CSS 変数 | `generateVanillaCSS`, `getConfig`, `buildControls` |
| 実用チェック | `getPracticalTargets()`, `closestIntegerLevel()`, `renderNeighborTable()` |
| レベル名 | `defaultLabel()` |

## 既知の制約・今後の候補

- **状態永続化なし** — URL クエリや localStorage 未実装
- **file://** — 相対パス `css/` `js/` でローカル打开可（ES modules 不使用）
- **プリセット保存** — 設定の export/import JSON
- **CSS ダウンロード** — 現状コピーのみ
- **pow vs 線形比較** — 表からは削除済み。再掲するなら折りたたみセクション
- **デザイントークン連携** — Figma Variables / Style Dictionary 等

## コミット & デプロイ

```bash
git add .
git commit -m "your message"
git push   # main → GitHub Pages 自動反映
```

## 参照

- [PLAN.md](../PLAN.md) — 当初の設計意図・懸念への対応
- [README.md](../README.md) — 使い方・機能一覧
