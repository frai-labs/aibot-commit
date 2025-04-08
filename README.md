# 🤖 frai-commit

> Let an AI bot write your Git commit messages — powered by Google Gemini.

**frai-commit** reads your staged changes, sends them to Gemini, and generates clear, concise, and professional Git commit messages automatically.

---

## ✨ Features

- 🧠 Uses Google Gemini AI (via `@google/generative-ai`)
- 📄 Parses your `git diff` to understand code changes
- 💬 Generates commit messages in natural language (English)
- ⚙️ Easy setup using `.env` for your API key
- ✅ Works with any Git project using Node.js

---

## 🚀 Installation

### 1. Clone the repo

```bash
git clone https://github.com/your-username/frai-commit.git
cd frai-commit
```

### 2. Install dependencies
```bash
npm install
```

## 🔐 Setup
Create a .env file in the root of the project with your Gemini API key:
```env
GEMINI_API_KEY=your_google_gemini_api_key_here
```
🔑 Get your API key here: https://makersuite.google.com/app/apikey

## 🧪 Usage
Stage your changes:

```bash
git add .
```

Run the bot:

```bash
node frai-commit.js
```
You'll see something like:

```sql
🔄 Checking for modified files...
🔍 Reading staged changes...
🤖 Generating commit message...

✅ Generated commit message:

Refactor: Remove git object instantiation from AICommitMessageGenerator constructor.

🚀 Commit completed successfully!
```

## 📦 Optional: Use it as a global CLI
To run frai-commit from anywhere:

Make the script executable:

```bash
chmod +x frai-commit.js
```
(Optional) Move or link it to your global path:

```bash
ln -s $(pwd)/frai-commit.js /usr/local/bin/frai-commit
```
Now you can run it globally:
```bash
frai-commit
```
## 🛡️ Disclaimer
This tool uses the Gemini API to generate commit messages based on your code diffs. Review the generated messages before pushing to production.

## 📄 License
MIT License

Made with 🍟 by Frai Labs
