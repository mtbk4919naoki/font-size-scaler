# Font Size Scaler

[Fluid Modular Type Scale](https://coliss.com/articles/build-websites/operation/css/fluid-modular-type-scale.html) の変数を調整し、スケール見本と CSS（Vanilla / Tailwind v4）を生成する HTML ツールです。

## 使い方

### ローカル

```bash
open index.html
```

### GitHub Pages

https://mtbk4919naoki.github.io/font-size-scaler/

ブラウザで直接開けます（ビルド不要）。

## 機能

- **変数調整**: 基底フォント（SP/PC）、スケール比、ビューポート幅、レベル範囲
- **スケール表**: 各レベルの SP min / PC max / 任意ビューポート時のサイズ、ジャンプ率
- **pow vs 線形**: 同一設定でのモジュラースケールと固定増分スケールの比較
- **実用チェック**: 目標本文サイズ（例: 16px）を通るレベルの逆算、Lv2〜4 で 16px になる base 候補
- **WCAG チェック**: 本文16px推奨、大文字 AA/AAA 閾値、200% 拡大時サイズ
- **プレビュー**: ビューポートスライダー + 数値入力付きタイポグラフィ見本
- **CSS 出力**: Vanilla CSS（`:where(.fluid)` + レベルユーティリティ）、Tailwind v4（`@theme` + `--text-fluid-*`）

## デフォルト値

| 変数 | 値 |
|------|-----|
| SP 基底 | 15px |
| PC 基底 | 16px |
| SP スケール比 | 1.2 (短三度) |
| PC スケール比 | 1.333 (完全四度) |
| ビューポート | 360px 〜 1440px |
| 表示レベル | -3 〜 9 |

## 計算例

```
Lv0 → SP: 15 × 1.2^0 = 15px,  PC: 16 × 1.333^0 = 16px
Lv1 → SP: 15 × 1.2^1 = 18px,  PC: 16 × 1.333^1 ≈ 21.33px
Lv2 → SP: 15 × 1.2^2 = 21.6px, PC: 16 × 1.333^2 ≈ 28.43px
```

## 参考

- [PLAN.md](./PLAN.md) — 設計・懸念への対応方針
