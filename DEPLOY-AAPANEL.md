# 🚀 Trojan Recovery — aaPanel Automatic Deployment Guide

This guide explains how to connect your **GitHub repository** to your **aaPanel Server** so that every time you run `git push origin main`, your website automatically pulls, compiles, and restarts in real-time.

Since your website is **full-stack** (Vite frontend with an Express Node.js backend inside `/server.ts`), you cannot use standard static hosting like GitHub Pages. It must run on your aaPanel VPS using Node.js.

We have provided two high-performance ways to configure this auto-update. Choose **Option A (easiest)** or **Option B (most secure)**.

---

## Option A: Using aaPanel Webhooks (Recommended & Easiest)

aaPanel has an official **WebHook** plugin that generates a custom URL. When GitHub sends a notification to this URL on a code push, aaPanel runs our deployment script automatically.

### Step 1: Install WebHook Plugin on aaPanel
1. Log in to your **aaPanel control panel**.
2. Go to the **App Store** on the left menu.
3. Search for **"WebHook"** and install the latest version (it is completely free).

### Step 2: Create the WebHook on aaPanel
1. Open the **WebHook plugin** from your App Store list.
2. Click **Add Webhook**.
3. Fill out the details:
   - **Name**: `trojan-recovery-deploy`
   - **Shell script**: Copy and paste the contents of the `deploy-aapanel.sh` file we created in your codebase.
4. Click **Submit**.

### Step 3: Get the WebHook Key URL
1. In the WebHook list, find your new webhook and click **Show Key**.
2. Copy the full link shown. It will look like this:
   `http://your-server-ip:8888/webhook?hook=xxxxxx&key=yyyyyy`

### Step 4: Configure GitHub Repository Webhook
1. Go to your repository on **GitHub**.
2. Click on **Settings** (top tabs) -> **Webhooks** (left sidebar).
3. Click the **Add webhook** button on the right.
4. Paste your copied URL into the **Payload URL** field.
5. Set **Content type** to `application/json`.
6. Leave everything else as default, ensure **Just the push event** is checked, and click **Add webhook**.

🎉 **You're done!** Next time you push to the `main` branch, GitHub will trigger this URL, and aaPanel will automatically run `deploy-aapanel.sh` to compile and restart your full-stack app.

---

## Option B: Using GitHub Actions (Most Secure & Developer Standard)

This method uses **GitHub Actions** to compile the application inside GitHub's free virtual servers, and then securely uploads only the built production files (`/dist`) and restarts your server. This keeps your server CPU and RAM usage low!

We have updated your `.github/workflows/deploy.yml` workflow file. Here is how to link it:

### Step 1: Create SSH Keys
If you do not have SSH keys on your server, generate them inside your aaPanel terminal:
```bash
ssh-keygen -t rsa -b 4096 -C "deploy@trojanrecovery"
```
Press Enter to save in the default location with no password.

### Step 2: Add Keys to Authorized Lists
Append the newly generated public key to your authorized keys:
```bash
cat ~/.ssh/id_rsa.pub >> ~/.ssh/authorized_keys
chmod 600 ~/.ssh/authorized_keys
```

### Step 3: Configure GitHub Actions Secrets
Go to your GitHub Repository -> **Settings** -> **Secrets and variables** -> **Actions** -> **New repository secret** and add these four secrets:

1. **`SSH_HOST`**: Your server's public IP address (e.g. `123.45.67.89`).
2. **`SSH_USERNAME`**: Your server login user (usually `root`).
3. **`SSH_KEY`**: Paste the entire contents of your private key (run `cat ~/.ssh/id_rsa` on your server and copy EVERYTHING including the BEGIN/END headers).
4. **`SSH_PORT`**: Your SSH port (default is `22`, unless customized in aaPanel).

---

## 🛠️ Configuring aaPanel for full-stack Node.js Apps

To ensure your app runs persistently, use aaPanel's built-in **PM2 Manager** or **Node.js Release Manager**:

1. Go to **App Store** -> Search for **"PM2 Manager"** or **"NodeJS Version Manager"** and install.
2. Under the PM2 Manager, add your project:
   - **Startup File**: Select `/www/wwwroot/trojanrecovery.com/dist/server.cjs`
   - **Run Directory**: `/www/wwwroot/trojanrecovery.com`
   - **Project Name**: `trojan-recovery`
3. If you run a custom reverse proxy inside aaPanel, go to **Website** -> **Node Project** -> **Add Node Project** or go to your main PHP/HTML website and click **Reverse Proxy** -> **Add Reverse Proxy** sending port `80/443` traffic to `http://127.0.0.1:3000`.

---

### How to test your setup:
Simply run your normal developer loop:
```bash
git add .
git commit -m "feat: automatic update test"
git push origin main
```
You can view the logs directly inside your aaPanel WebHook script history or inside GitHub's **Actions** tab to confirm success!
