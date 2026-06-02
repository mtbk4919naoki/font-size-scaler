# Font Size Scaler

[Fluid Modular Type Scale](https://coliss.com/articles/build-websites/operation/css/fluid-modular-type-scale.html) の変数を調整し、スケール見本と CSS（Vanilla / Tailwind v4）を生成する HTML ツールです。

## デモ

https://mtbk4919naoki.github.io/font-size-scaler/

## 使い方

```bash
# リポジトリ root で
open index.html
```

ビルド不要。`css/styles.css` と `js/app.js` を相対参照します。

## 機能

- **変数調整** — 基底フォント（SP/PC）、スケール比、ビューポート、絶対下限、レベル範囲
- **スケール表** — (SP)/(PC)/プレビュー vw 各列、ジャンプ率 SP/PC、備考（WCAG 等）
- **タイポグラフィプレビュー** — スライダー + 数値入力
- **WCAG チェック** — 本文 16px 推奨、大文字 AA/AAA、200% 拡大
- **実用チェック** — 目標本文サイズの逆算、base 候補
- **CSS 出力** — Vanilla CSS / Tailwind v4（コピー）
- **日英切替** — ヘッダー右上

## プロジェクト構成

```
index.html       シェル
css/styles.css   スタイル
js/app.js        アプリロジック
docs/            開発ガイド
scripts/         計算式検証
```

## 開発

詳細は [docs/DEVELOPMENT.md](./docs/DEVELOPMENT.md) を参照。

```bash
node scripts/verify-formula.mjs   # 計算式の一致確認
```

## デフォルト値

| 変数 | 値 |
|------|-----|
| SP 基底 | 15px |
| PC 基底 | 16px |
| SP / PC スケール比 | 1.2 / 1.333 |
| ビューポート | 360px 〜 1440px |
| 絶対下限 | 8px |
| 表示レベル | -3 〜 9 |

## 参考

- [docs/DEVELOPMENT.md](./docs/DEVELOPMENT.md) — 引き継ぎ・ architecture
- [PLAN.md](./PLAN.md) — 初期設計メモ
