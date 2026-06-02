# Font Size Scaler — 実装プラン

参照: [CSSのpow()関数が便利！ Fluid Modular Type Scale](https://coliss.com/articles/build-websites/operation/css/fluid-modular-type-scale.html)

> **ステータス:** 初期プランは完了。最新の機能・構成は [README.md](./README.md) と [docs/DEVELOPMENT.md](./docs/DEVELOPMENT.md) を参照。

## 目的

Fluid Modular Type Scale の各変数を調整し、**スケール見本のプレビュー**と **CSS 出力（Vanilla / Tailwind）** を行える HTML ツールを提供する。

## 背景・ユーザーの懸念（当初）

| 懸念 | 対応状況 |
|------|----------|
| レベル0=16px だとそれより小さい字が扱いにくい | ✅ 負のレベル表示、実用チェックで目標 px から最接近レベルを逆算 |
| pow() vs 線形補完の違い | ⚠️ 比較列は削除済み（pow() のみ） |
| デザイン側がスケール概念を使っていないと意味がない | ✅ 用途ラベル編集、CSS クラス名コピー、Vanilla / Tailwind 出力、Figma JSON エクスポート |
| 実用に耐えるか計算してみないとわからない | ✅ WCAG セクション、12px/10px 警告、ビューポートプレビュー |

## コア計算式

```
fluid-min(level) = font-size-min × pow(font-ratio-min, level)
fluid-max(level) = font-size-max × pow(font-ratio-max, level)
slope            = (fluid-max - fluid-min) / (font-width-max - font-width-min)
clamp(min, preferred, max)  // preferred = y = mx + b（100vi 基準）
output           = max(font-size-floor, size(vw))
```

## ファイル構成（現行）

```
font-size-scaler/
├── index.html
├── css/styles.css
├── js/app.js
├── scripts/
│   ├── serve.sh
│   └── verify-formula.mjs
├── docs/DEVELOPMENT.md
├── README.md
└── PLAN.md          ← 本ファイル（アーカイブ）
```

## 実装済み機能

### 変数パネル（左サイドバー）

- [x] 基底フォント SP/PC、スケール比（プリセット付き）、ビューポート幅
- [x] 絶対下限 `--font-size-floor`、rem 換算、variable-unit（100vi / 100cqi）
- [x] 表示レベル min/max
- [x] 実用チェック 4 値（SP A/B, PC A/B）
- [x] 保存 / 共有URL / リセット（サイドバー上部）

### スケール見本（メイン）

- [x] 数値テーブル（SP / PC / プレビュー vw / ジャンプ率 / 備考 / CSS コピー）
- [x] 列ヘッダー ⓘ ツールチップ
- [x] タイポグラフィプレビュー + ビューポートスライダー
- [x] WCAG アクセシビリティチェック表
- [x] 実用チェック（コンパクト 4 行表）

### Figma エクスポート

- [x] Variables Import 向け DTCG ZIP（SP/PC 別コレクション）
- [x] Tokens Studio 向け Typography JSON + `$themes`
- [x] 4 タブ出力 + 使い方モーダル（Variables Import / Tokens Studio）

### CSS 出力

- [x] Vanilla CSS（`:root` + `:where(.fluid)` + `.text-*`）
- [x] Tailwind CSS v4（`@theme` + clamp トークン）
- [x] コピーボタン

### その他

- [x] 日英切替
- [x] localStorage 保存・復元
- [x] URL パラメータ共有・復元
- [x] GitHub Pages 配信（base href 対応）
- [x] 計算式 Node 検証スクリプト

## 初期実装ステップ（完了）

1. [x] PLAN.md 作成
2. [x] 計算ロジック
3. [x] 変数フォーム + 状態管理
4. [x] スケールテーブル + タイポプレビュー + ビューポートスライダー
5. [x] 実用チェック
6. [x] Vanilla / Tailwind CSS ジェネレータ + コピー
7. [x] css/js 分割リファクタ
8. [x] README / DEVELOPMENT 整備

## 未着手・将来候補

- [ ] CSS ファイルダウンロード
- [ ] 設定 JSON import（Web アプリ側）
- [ ] 専用 Figma プラグイン（Text Style / Variables 自動生成）
- [ ] pow vs 線形比較の再掲（折りたたみ）
