# GitHub Pages einrichten

## 1. Pages aktivieren

1. Repo **PiMaV/WETTER** auf GitHub oeffnen
2. **Settings** → links **Pages** (unter "Code and automation")
3. Unter **Build and deployment**:
   - **Source:** Deploy from a branch
   - **Branch:** `main` (oder dein Default-Branch)
   - **Folder:** `/ (root)`
4. **Save**

Nach wenigen Minuten: Seite unter  
`https://<username>.github.io/WETTER/`  
(Username = Repo-Owner, z.B. PiMaV → `https://pimav.github.io/WETTER/`)

---

## 2. Custom Domain (wetter.mess.engineering)

Falls du die Domain **wetter.mess.engineering** nutzen willst (wie im canonical im index):

1. In **Settings → Pages** bei **Custom domain** eintragen: `wetter.mess.engineering`
2. **Enforce HTTPS** ankreuzen (nach DNS-Propagierung)
3. Beim DNS-Provider (wo mess.engineering liegt):
   - **CNAME**: `wetter` → `pimav.github.io` (oder `<user>.github.io`)
   - Oder **A**-Records auf GitHub-IPs (siehe GitHub-Doku "Custom domain")

---

## 3. Pruefliste vor/nach Go-Live

| Check | Status |
|-------|--------|
| **index.html** im Repo-Root | ✓ |
| **assets/** mit `WETTER_Framework_1024.png` committed | Pruefen |
| **docs/BLITZ_WOLKE_DPG25V2_Compact.pdf** im Repo | Sonst PDF-Link ergaenzen oder Datei hinzufuegen |
| **.gitignore** ignoriert weder index.html noch assets/ | ✓ (.gitignore ist OK) |
| Nach Deploy: Seite unter Pages-URL oeffnen | Links (GitHub, DAMPF, …), Bild, ggf. PDF testen |
| Canonical/OG-URLs: passen zu echter Domain (wetter.mess.engineering oder github.io) | Pruefen |

---

## 4. Wichtig: PDF-Link

Die Seite verlinkt auf `docs/BLITZ_WOLKE_DPG25V2_Compact.pdf`.  
Entweder:

- **Option A:** Ordner `docs/` anlegen und die PDF dort committen (z.B. exportiert aus dem PPTX), **oder**
- **Option B:** Link aendern auf eine andere URL (z.B. Raw-GitHub, oder anderer Host), falls die PDF nicht ins Repo soll.
