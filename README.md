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

ビルド不要。`css/styles.css` と `js/preview-sample.js` · `js/app.js` を相対参照します。

### 設定の保存・共有

左サイドバー上部のボタン:

| ボタン | 動作 |
|--------|------|
| **ブラウザに保存** | 全設定（用途ラベル含む）を `localStorage` に保存 |
| **共有URLをコピー** | 現在の設定を URL クエリにエンコードしてクリップボードへコピー |
| **初期状態に戻す** | デフォルト値に復元。`localStorage` と URL パラメータもクリア |

起動時の復元優先順位: **URL パラメータ → localStorage → デフォルト**

共有 URL にはプレビュー字体（`ff`）やプレビュータブ（`ptab=list|sample`）も含まれます。

### Figma へのエクスポート

**CSS / Figma 出力** セクション（4 タブ）:

| タブ | 出力 | 向け |
|------|------|------|
| **Variables Import** | ZIP（DTCG + manifest） | Figma Variables |
| **Tokens Studio** | JSON（Typography + テーマ） | Text Style |

各 Figma タブの **使い方** ボタンで取り込み手順を表示。

- **Variables Import** — Starter では SP / PC が別コレクション（Default モード）
- **Tokens Studio** — プラグイン上部のテーマ SP / PC で切替。モバイル用フレームに SP、PC 用フレームに PC を適用（Figma 上にトグルはない）
- Figma は fluid `clamp()` 非対応。実装は **Vanilla CSS** タブが正

## 機能

- **変数調整** — 基底フォント（SP/PC）、スケール比、ビューポート、絶対下限、レベル範囲
- **Google Fonts** — サイドバーでプレビュー字体を選択。Vanilla CSS の `@import` と Tokens Studio 出力にも反映
- **スケール表** — SP / PC / プレビュー vw、ジャンプ率、**WCAG**、**目標**（目標 px バッジ）、CSS クラス名コピー
- **タイポグラフィプレビュー** — **一覧** / **サンプル** タブ。スライダー + 数値入力でプレビュー vw を変更
  - **一覧** — 各レベルのサイズとサンプル文
  - **サンプル** — ドキュメントサイト風レイアウト（サイドバー、KV、記事カード等）。639px 未満でサイドバーはドロワーに切替
- **CSS / Figma 出力** — Vanilla CSS / Tailwind v4 / Variables Import / Tokens Studio（4 タブ・コピー・ダウンロード）。Figma タブに使い方モーダル付き
- **日英切替** — ヘッダー右上

## プロジェクト構成

```
index.html              シェル + GTM + CSP + GitHub Pages 用 base href
css/styles.css          UI スタイル
js/preview-sample.js    プレビュー（一覧 / サンプルレイアウト）
js/app.js               アプリロジック
docs/                   開発ガイド
scripts/
  serve.sh              ローカルサーバー
  verify-formula.mjs    計算式検証
  verify-security.mjs   入力サニタイズの回帰チェック
```

## 開発

詳細は [docs/DEVELOPMENT.md](./docs/DEVELOPMENT.md) を参照。

```bash
node scripts/verify-formula.mjs   # 計算式の一致確認
node scripts/verify-security.mjs  # URL/localStorage サニタイズの回帰チェック
```

## デフォルト値

| 項目 | 値 |
|------|-----|
| SP / PC 基底 | 15px / 16px |
| SP / PC スケール比 | 1.15 / 1.3 |
| ビューポート | 360px 〜 1440px |
| 絶対下限 | 8px |
| 表示レベル | -3 〜 9 |
| 目標サイズ SP 1 / 2 / 3 | 10px / 18px / 24px |
| 目標サイズ PC 1 / 2 / 3 | 10px / 21px / 36px |
| プレビュー vw | 768px |

## 参考

- [docs/DEVELOPMENT.md](./docs/DEVELOPMENT.md) — アーキテクチャ・引き継ぎ
- [PLAN.md](./PLAN.md) — 初期設計メモ（アーカイブ）
