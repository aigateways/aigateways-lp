# GitHub Pages を有効にする手順（無料）

GitHub Pages は **無料** で利用できます。このリポジトリ用のワークフローはすでにあるので、**「公開方法」を 1 回だけ設定**すれば動きます。

---

## ⚠️ リポジトリが Private の場合

**Private リポジトリでは GitHub Pages を有効にできません**（有料プランが必要です）。  
無料で使うには、**リポジトリを Public に変更**してください。

### リポジトリを Public にする手順

1. **https://github.com/aigateways/aigateways-lp/settings** を開く
2. 左メニューを一番下までスクロールし、**Danger Zone**（危険なゾーン）を表示
3. **Change repository visibility**（リポジトリの公開設定を変更）の **Change visibility** をクリック
4. **Make public** を選ぶ
5. 表示されるダイアログで、リポジトリ名 `aigateways/aigateways-lp` を入力して確認
6. **I understand, change repository visibility** をクリック

これでリポジトリが Public になり、Settings → Pages で **Source: GitHub Actions** を選べるようになります。

※ 公開するのは「リポジトリのコード」です。LP の内容がそのまま見える状態になります。機密情報はリポジトリに含めないでください。

---

## 1. リポジトリの設定を開く

1. ブラウザで **https://github.com/aigateways/aigateways-lp** を開く
2. リポジトリ上部の **Settings**（設定）をクリック
3. 左メニューの **Pages** をクリック

---

## 2. 公開方法を「GitHub Actions」にする

1. **Build and deployment** の **Source**（ソース）で、ドロップダウンをクリック
2. **GitHub Actions** を選ぶ
3. 保存ボタンがあればクリック（選んだだけで保存される場合もあります）

これで、`main` ブランチに push するたびにワークフローが実行され、ビルド結果が自動で GitHub Pages にデプロイされます。

---

## 3. 初回だけ：ワークフローを動かす

- すでに `main` に push 済みなら、**Actions** タブで「Deploy to GitHub Pages」が実行されているか確認する
- まだ一度も push していない、または Source を今初めて「GitHub Actions」にした場合は、**空のコミットで push** するとワークフローが動きます

```bash
git commit --allow-empty -m "chore: trigger GitHub Pages deploy"
git push origin main
```

---

## 4. 公開URLの確認

設定後、数分以内に次のURLでサイトが表示されます。

- **https://aigateways.github.io/aigateways-lp/**

「404 There isn't a GitHub Pages site here」が出ていた場合は、上記 **Source を「GitHub Actions」にすること** が原因であることが多いです。

---

## 料金について

- **GitHub Pages** は **無料**
- パブリックリポジトリでは **無制限**
- 詳しくは [GitHub Pages の公式説明](https://docs.github.com/ja/pages) を参照
