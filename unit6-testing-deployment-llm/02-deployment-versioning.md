# 📘 LESSON 02: Deployment & API Versioning

Building an app is 50% of the work. The other 50% is keeping it running for users.

---

## 🚀 1. Deployment Workflow (GitHub)

1.  **Version Control**: Save your code in a GitHub Repository.
2.  **CI/CD**: Connect GitHub to a hosting provider like **Render**, **Vercel**, or **Heroku**.
3.  **Auto-Deploy**: Every time you `git push`, the provider automatically:
    - Downloads your new code.
    - Runs `npm install`.
    - Restarts your server.

---

## 🛠️ 2. Third-Party Rendering
In modern web development, we often separate the "Data" from the "View".
- **Backend**: Serves JSON (Node.js/Express).
- **Frontend**: Renders the UI (React/Next.js).
- This is called **Decoupled Architecture**.

---

## 🔢 3. API Versioning
Imagine you have 10,000 users. If you change your API suddenly, their apps will break! 
To prevent this, we version our APIs.

### Method A: URL Versioning (Most Popular)
- `https://api.myapp.com/v1/users`
- `https://api.myapp.com/v2/users` (The new, improved version)

### Method B: Header Versioning
Users send a header like `Accept-Version: 2.0`.

---

## 🎯 Pro Tip: Environment Variables
NEVER put your passwords or API keys (like MongoDB URL or OpenAI Key) in your code! 
Use an `.env` file and the `dotenv` package.
```bash
# .env file
PORT=3000
DATABASE_URL=mongodb+srv://...
OPENAI_KEY=sk-abc123...
```
Then use it as `process.env.PORT`.
