#!/bin/bash

# === CONFIG ===
src="/c/Users/flori/Desktop/dax-quizz"
dest="/c/Users/flori/Desktop/cybersecurity-quiz-clean"
repo_url="https://github.com/ton-user/cybersecurity-quiz.git"  # À adapter

# === COPY PROJECT ===
if [ -d "$dest" ]; then
  echo "❌ Le dossier $dest existe déjà. Supprime-le manuellement si tu veux le recréer."
  exit 1
fi

cp -r "$src" "$dest"
cd "$dest" || exit 1

# === CLEAN PREVIOUS FILES ===
rm -rf node_modules .git dist build

# === CREATE .gitignore ===
cat <<EOF > .gitignore
node_modules
dist
build
.env
.DS_Store
EOF

# === CREATE README.md ===
cat <<EOF > README.md
# Cybersecurity Quiz App

This is a React-based quiz app focused on cybersecurity knowledge.
It includes ranking logic, animated feedback, and local storage of scores.

## Features

- Adjustable number of questions (20, 50, 100, 150, up to 200)
- Timer and performance-based rank
- Confetti animation on final result
- Built with React + TypeScript + Material UI

## Demo

[Play the live version](https://torpedobyte.solutions/cybersecurity-quiz)

## Install locally

\`\`\`bash
npm install
npm run dev
\`\`\`
EOF

# === INIT GIT AND PUSH ===
git init
git remote add origin "$repo_url"
git add .
git commit -m "🚀 Initial commit of clean Cybersecurity Quiz"
git branch -M main
git push -u origin main

echo "✅ Projet copié, initialisé et pushé vers $repo_url"
