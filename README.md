# StrongGrid 🔐  

**StrongGrid** — Ultra-Strong Password Generator  
Live demo: https://saptads14.github.io/StrongGrid/  

---

## 🚀 What is StrongGrid  

StrongGrid is a fast, secure, and privacy-first password generator web app that lets you generate complex and highly secure passwords instantly — directly in your browser, without server-side storage.  

---

## ✅ Key Features  

- **Secure & random** — uses cryptographic randomness (CSPRNG) to produce unpredictable, unique passwords that resist brute-force attacks.  
- **Customizable rules** — choose password length, include/exclude uppercase, lowercase, numbers, symbols; enable advanced settings.  
- **Pronounceable mode (optional)** — generate passwords that are secure **and** easier to remember.  
- **Real-time strength meter** — see password complexity immediately.  
- **One-click copy** — copy generated password with a single click.  
- **Local, browser-only storage** — password history stored temporarily in browser, with **no server storage** (privacy-first design).  
- **Offline capable** — once the page is loaded, you can generate passwords without an internet connection.  
- **Mobile-friendly & responsive design** — works well on desktops, tablets, and phones.  

---

## 🛠️ How to Use  

1. Open the live site, or clone/download this repo and open `index.html` in your browser.  
2. Select your desired options:  
   - Password length  
   - Include uppercase, lowercase, numbers, symbols  
   - (Optional) Enable “Pronounceable" mode  
3. Click **“Generate”** — your password will appear immediately.  
4. Click **“Copy”** to copy the password to clipboard (or copy manually).  
5. (Optional) View recent history (stored locally) for convenience.  

---

## 📦 Project Structure  
```bash
PASSWORD GENERATOR
│
├── assets
│   ├── audio
│   │   └── sound.mp3
│   ├── css
│   │   └── style.css
│   └── images
│       └── logo.png
│
├── js
│   └── script.js
│
└── index.html
```

---

▶️ **How to Run Locally**
Step 1: Download or Clone the Project
```bash
git clone https://github.com/saptads14/StrongGrid.git
```
Option 2 — Download ZIP:
 - Go to your GitHub repo
 - Click Code → Download ZIP
 - Extract the ZIP folder
Step 2: Open the Project Folder
```bash
StrongGrid/
```
Step 3: Run the Website Locally
 - Method 1 — Just double-click: `index.html`
 - Method 2 — Run with VS Code Live Server (Recommended)
 - If you're using VS Code, do this:
    - Install the extension Live Server
    - Right-click index.html
    - Select "Open with Live Server"
Your website will run at: 
```bash
http://127.0.0.1:5500/
```
---

## 📄 Why Use StrongGrid  

- Weak or reused passwords are a leading cause of data breaches. A properly generated, high-entropy password — long, complex, and unique — makes brute-force or dictionary attacks impractical.
- StrongGrid allows you to generate such passwords instantly, with full control and no external dependencies or storage.  

---

## ⚠️ Security & Privacy Considerations  

- All password generation is done **locally in your browser**. **No password or user data is sent to any server.**  
- Browser-local password history (if used) is stored only temporarily and not transmitted elsewhere.  
- Always use different passwords for different accounts, and avoid re-using generated passwords across multiple services. 

---

## 🙋‍♂️ Author & License  

**Author:** Saptadeep  
**License:** MIT

---
