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
- **プレビュー**: ビューポートスライダー付きタイポグラフィ見本
- **CSS 出力**: Vanilla CSS（`:where(.fluid)` + レベルユーティリティ）、Tailwind v4（`@theme` + `--text-fluid-*`）

## デフォルト値

| 変数 | 値 |
|------|-----|
| SP 基底 | 16px |
| PC 基底 | 20px |
| SP スケール比 | 1.2 (Minor Third) |
| PC スケール比 | 1.333 (Perfect Fourth) |
| ビューポート | 320px 〜 1440px |

## 計算例

```
Lv0 → SP: 16 × 1.2^0 = 16px,  PC: 20 × 1.333^0 = 20px
Lv1 → SP: 16 × 1.2^1 = 19.2px, PC: 20 × 1.333^1 ≈ 26.66px
Lv2 → SP: 16 × 1.2^2 = 23.04px, PC: 20 × 1.333^2 ≈ 35.54px
```

## 参考

- [PLAN.md](./PLAN.md) — 設計・懸念への対応方針
