# TaskFlow QA Internship Practical App

This small application is intentionally designed for an internship-ending QA practical. It contains working core flows and several testable defects. Candidates should test against `PRODUCT_REQUIREMENTS.md`; they should not assume the current behavior is correct.

## Test accounts
- QA User: `intern@example.com` / `Intern@123`
- Viewer: `viewer@example.com` / `Viewer@123`

## Run the application
No application dependencies are required.

### Windows
Double-click `run-app.bat`, or from this folder run:

```powershell
py -m http.server 4173
```

### macOS/Linux
```bash
python3 -m http.server 4173
```

Open: `http://127.0.0.1:4173`

Use **Reset demo data** on the login page whenever you want the original task dataset back.

## Playwright starter
A minimal Playwright folder is included in `playwright-starter/` to reduce environment setup time. Candidates still write their own tests and page objects.

```bash
cd playwright-starter
npm install
npx playwright install
npm test
```

The starter config expects the web app to already be running on port 4173.
