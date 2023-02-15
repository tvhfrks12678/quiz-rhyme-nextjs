# 概要

　韻を踏んでる単語の組み合わせを回答するクイズサイトです

# 制作理由

　普段から、ラップが好きで聞いているのですが、ラップを聞いた時にどこで韻を踏んでいるか、分からない場合があります
 
　韻をどこで踏んでいるかわかった方がより音楽を楽しめるので、どこで韻を踏んでいるかの判断を練習できるサイトがあれば役に立つかと考え作成しています

# 機能

- 認証
  - ログイン
  - ログアウト
- クイズ
  - CRUD
  - PLAY
    - 問題表示 <img width="1541" alt="スクリーンショット 2023-02-14 14 33 12" src="https://user-images.githubusercontent.com/67419083/218648433-967e759a-c6d1-4dad-a4b7-b37e3879b158.png">
    - 回答結果 <img width="1548" alt="スクリーンショット 2023-02-14 14 33 33" src="https://user-images.githubusercontent.com/67419083/218648471-a68ce3ee-e683-466f-9c13-35727370dda7.png">

# URL

[quiz-rhyme-nextjs.vercel.app](https://quiz-rhyme-nextjs.vercel.app/)

# 技術

- 効率よく制作できそうと考え、バックエンドとフロントエンドを実装できるNext.js、インフラ構築の手間がかからないVercelとSupabase、クラス名を考えなくていいTailwind CSSを使用しました

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
      - PostgreSQL

- デプロイメント

  - Vercel

- 認証
  - Supabase Auth

# ER 図

![quiz_ER](https://user-images.githubusercontent.com/67419083/216257616-f6e0c2c4-1db8-455c-9406-9af15eca3254.png)

# 工夫した点

　機能の追加や保守性を考慮して、Custom Hooksの導入、Componentと処理の分割、類似した処理とまとまった処理のメソッド化をして、コードが簡潔になるように実装していこうと考えています
