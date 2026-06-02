# Font Size Scaler

[Fluid Modular Type Scale](https://coliss.com/articles/build-websites/operation/css/fluid-modular-type-scale.html) の変数を調整し、スケール見本と CSS（Vanilla / Tailwind v4）を生成する HTML ツールです。

## デモ

https://mtbk4919naoki.github.io/font-size-scaler/

## 使い方

```bash
# 推奨: 簡易サーバー（Cursor プレビュー / file:// 制限を回避）
./scripts/serve.sh
# → http://localhost:8080

# またはブラウザで直接
open index.html
```

ビルド不要。`css/styles.css` と `js/app.js` を相対参照します。

### 設定の保存・共有

左サイドバー上部のボタン:

| ボタン | 動作 |
|--------|------|
| **ブラウザに保存** | 全設定（用途ラベル含む）を `localStorage` に保存 |
| **共有URLをコピー** | 現在の設定を URL クエリにエンコードしてクリップボードへコピー |
| **初期状態に戻す** | デフォルト値に復元。`localStorage` と URL パラメータもクリア |

起動時の復元優先順位: **URL パラメータ → localStorage → デフォルト**

### Figma へのエクスポート

メインエリアの **Figma エクスポート** セクション:

1. **JSON をコピー** — 各レベルの `fontSize.SP` / `fontSize.PC` と `cssClamp` 等を含む JSON をクリップボードへ
2. **使い方** — Figma への取り込み手順をモーダルで表示

Figma は fluid `clamp()` を再現できないため、JSON は **離散モード（SP / PC）** 向け。`cssClamp` は開発向け参考情報です。

## 機能

- **変数調整** — 基底フォント（SP/PC）、スケール比、ビューポート、絶対下限、レベル範囲
- **スケール表** — (SP)/(PC)/プレビュー vw 各列、ジャンプ率 SP/PC、備考（WCAG・目標 px バッジ）、行ごとの CSS クラス名コピー
- **タイポグラフィプレビュー** — スライダー + 数値入力
- **WCAG チェック** — 本文 16px 推奨、大文字 AA/AAA、200% 拡大
- **実用チェック** — SP A/B・PC A/B の 4 目標 px について、各端点で最接近レベル ±1 段階をコンパクト表で表示
- **Figma エクスポート** — SP/PC 端の font-size を JSON でコピー。使い方モーダル付き（[Variables Import](https://www.figma.com/community/plugin/1253424530216967528/variables-import) 向け）
- **CSS 出力** — Vanilla CSS / Tailwind v4（コピー）
- **日英切替** — ヘッダー右上

## プロジェクト構成

```
index.html          シェル + GitHub Pages 用 base href
css/styles.css      UI スタイル
js/app.js           アプリロジック
docs/               開発ガイド
scripts/
  serve.sh          ローカルサーバー
  verify-formula.mjs  計算式検証
```

## 開発

詳細は [docs/DEVELOPMENT.md](./docs/DEVELOPMENT.md) を参照。

```bash
node scripts/verify-formula.mjs   # 計算式の一致確認
```

## デフォルト値

| 項目 | 値 |
|------|-----|
| SP / PC 基底 | 15px / 16px |
| SP / PC スケール比 | 1.2 / 1.333 |
| ビューポート | 360px 〜 1440px |
| 絶対下限 | 8px |
| 表示レベル | -3 〜 9 |
| 実用チェック SP A / B | 10px / 18px |
| 実用チェック PC A / B | 12px / 21px |
| プレビュー vw | 768px |

## 参考

- [docs/DEVELOPMENT.md](./docs/DEVELOPMENT.md) — アーキテクチャ・引き継ぎ
- [PLAN.md](./PLAN.md) — 初期設計メモ（アーカイブ）
