# 概要

韻を踏んでる単語の組み合わせを回答するクイズサイトを作成中です

# 完成イメージ図

<img width="1280" alt="スクリーンショット 2023-02-02 13 15 49" src="https://user-images.githubusercontent.com/67419083/216257676-a378d53c-d6e5-4cd9-94f1-f13911322b51.png">
Figmaで作成

# 技術

- 言語

  - TypeScript

- フロントエンド

  - Next.js
  - React
    - フォーム
      - React Hook Form
    - 状態管理
      - Jotai
    - トースト
      - react-hot-toast
  - スタイリング
    - Tailwind CSS
    - daisyUI

- バックエンド

  - Next.js API Routes
  - O/R マッパー
    - Prisma
  - データベース
    - Supabase

- デプロイメント

  - Vercel

- 認証
  - Supabase Auth

# ER 図

![quiz_ER](https://user-images.githubusercontent.com/67419083/216257616-f6e0c2c4-1db8-455c-9406-9af15eca3254.png)

# 工夫した点

- Custom Hooks の導入

# 機能

- 認証
  - ログイン
  - ログアウト
- クイズ
  - CRUD
