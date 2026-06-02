# Font Size Scaler — 実装プラン

参照: [CSSのpow()関数が便利！ Fluid Modular Type Scale](https://coliss.com/articles/build-websites/operation/css/fluid-modular-type-scale.html)

## 目的

Fluid Modular Type Scale の各変数を調整し、**スケール見本のプレビュー**と **CSS 出力（Vanilla / Tailwind）** を行える HTML 擬似アプリを `font-size-scaler/` に提供する。

## 背景・ユーザーの懸念

| 懸念 | アプリでの対応 |
|------|----------------|
| レベル0=16px だとそれより小さい字が扱いにくい | 負のレベル（-1, -2…）を含むスケール表を表示。16px を通るレベルを逆算する「実用チェック」セクション |
| pow() vs 線形補完の違い | 同一レベルで両方式の SP/PC サイズと「レベル間ジャンプ率」を並列表示 |
| デザイン側がスケール概念を使っていないと意味がない | レベル命名・用途ラベル（body, h1…）を編集可能にし、エクスポート CSS にコメント付与 |
| 実用に耐えるか計算してみないとわからない | 12px 未満警告、推奨レベル範囲のハイライト、ビューポートスライダーでのライブプレビュー |

## コア計算式

```
fluid-min(level) = font-size-min × pow(font-ratio-min, level)
fluid-max(level) = font-size-max × pow(font-ratio-max, level)
slope            = (fluid-max - fluid-min) / (font-width-max - font-width-min)
clamp(min, preferred, max)  // preferred = y = mx + b（100vi 基準）
```

## ファイル構成

```
font-size-scaler/
├── PLAN.md          ← 本ドキュメント
├── index.html       ← 単一ファイル擬似アプリ（CSS/JS 内包）
└── README.md        ← 使い方（完成後）
```

## UI 構成

### 1. 変数パネル（左 / 上）

- **基底フォント**: SP `--font-size-min`, PC `--font-size-max`
- **スケール比**: SP `--font-ratio-min`, PC `--font-ratio-max`（プリセット: Minor Third 1.2, Perfect Fourth 1.333… 等）
- **ビューポート幅**: `--font-width-min`, `--font-width-max`
- **その他**: rem 換算基準（既定 16）、`--variable-unit`（100vi / 100cqi）
- **レベル範囲**: 表示する min/max レベル（例: -2 〜 8）
- **用途ラベル**: 各レベルに body / small / h1 等（CSS コメント用）

### 2. スケール見本（中央）

- **数値テーブル**: レベル | SP min | PC max | 768px 時 | ジャンプ率(SP) | 警告
- **タイポグラフィプレビュー**: 各レベルのサンプル文
- **ビューポートスライダー**: 320〜1440px で font-size をリアルタイム表示
- **比較モード**: pow() スケール vs 2点線形補完（同一 SP/PC 端点）

### 3. 実用チェック（ユーザ懸念対応）

- 「**16px を通るレベル**」を現在の ratio/base から逆算表示
- レベル 2〜4 で 16px に近い設定の候補スキャン（ratio を微調整した場合の表）
- 12px / 10px 未満のレベルを赤色警告

### 4. CSS 出力（右 / 下）

- **Vanilla CSS**: `:root` 変数 + `:where(.fluid)` + `.text-level-N` ユーティリティ
- **Tailwind CSS**: `@theme` ブロック（v4）+ `@utility text-fluid-N` または `@layer utilities`
- コピーボタン、ダウンロード（.css）

## 技術方針

- ビルド不要の単一 `index.html`（オフラインで開ける）
- 計算は JavaScript（プレビュー・エクスポート用）。出力 CSS は記事通り `pow()` を使用
- デザイン: システムフォント、ダーク/ライト対応、コンパクトなツール UI

## 実装ステップ

1. [x] PLAN.md 作成
2. [x] 計算ロジック（fluidType, levelSizes, jumpRatio, findLevelForSize）
3. [x] 変数フォーム + 状態管理
4. [x] スケールテーブル + タイポプレビュー + ビューポートスライダー
5. [x] 実用チェック（16px 逆算・警告）
6. [x] pow vs 線形比較
7. [x] Vanilla / Tailwind CSS ジェネレータ + コピー
8. [x] README.md

## 完了条件

- デフォルト値（SP 1.2 / PC 1.333 / base 16&20 / width 320&1440）で記事と一致する数値が出る
- 変数変更が即座にプレビュー・CSS に反映される
- 16px 実用性チェックが動作する
