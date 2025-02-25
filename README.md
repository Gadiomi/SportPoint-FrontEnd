# Sport Point

https://docs.google.com/document/d/1ZeBXfhvbVgRwDyG9G8xv85buT0qzjYjr/edit?usp=sharing&ouid=109194603441641051052&rtpof=true&sd=true

# 📌 Git Rebase Guide

📖 This guide explains how to use `git rebase` to integrate changes from the `main` branch into your feature branch.

---

## 📌 What is Git Rebase?

🛠️ Git rebase is a way to integrate changes from one branch into another by applying your commits on top of the latest version of the target branch.

---

## 🚀 Steps to Rebase Your Branch onto `main`

### ✅ 1. Checkout Your Feature Branch

```sh
git checkout <your_branch_name>
```

🔹 Make sure you're on the branch you want to rebase.

### ✅ 2. Fetch the Latest Changes

```sh
git fetch origin main
```

🔹 This ensures you have the latest updates from `main`.

### ✅ 3. Start the Rebase

```sh
git rebase origin/main
```

🔹 This will take all the commits from `feat/theme` and reapply them on top of the latest `main` branch.

### ⚠️ 4. Resolve Any Conflicts (If Needed)

If there are conflicts, Git will pause and ask you to resolve them.

- Open the conflicting files, fix the issues, and then run:
  ```sh
  git add <resolved-file>
  git rebase --continue
  ```
- If you want to abort the rebase:
  ```sh
  git rebase --abort
  ```

### 📤 5. Push the Rebased Branch

If you have already pushed `feat/theme` before rebasing, you'll need to force push:

```sh
git push --force
```

⚠️ **Warning:** Be careful with force pushing if working in a shared branch.

---

## 🔧 Alternative: Interactive Rebase

If you want to modify commits before applying them:

```sh
git rebase -i origin/main
```

🔹 This lets you edit, squash, or reorder commits before completing the rebase.

---

## 🎯 Conclusion

✅ Rebasing helps keep your feature branch up to date with `main` while maintaining a clean commit history. Use it wisely! 🚀
