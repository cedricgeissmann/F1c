# F1c Klassenwebseite

Eine Webseite für die Klasse F1c mit allen wichtigen Informationen, Events und mehr.

## Technologien

- **[SvelteKit](https://kit.svelte.io/)** - Framework für die Webseite
- **[Vite](https://vitejs.dev/)** - Build Tool
- **[Biome](https://biomejs.dev/)** - Linter und Formatter

## Development

```bash
# Dependencies installieren
npm install

# Entwicklungsserver starten
npm run dev

# Code checken
npm run check

# Code formatieren
npm run format
```

## Build

```bash
# Statische Seite bauen
npm run build

# Preview des Builds
npm run preview
```

## Deployment

Die Webseite wird automatisch über GitHub Actions auf GitHub Pages veröffentlicht, sobald Changes auf den `main` Branch gepusht werden.

### GitHub Pages aktivieren

1. Gehe zu **Settings** → **Pages**
2. Wähle bei **Source** die Option **GitHub Actions**
3. Commite und push die Änderungen

## Struktur

```
src/
├── lib/
│   └── events.js      # Zentrale Events-Daten
├── routes/
│   ├── +page.svelte   # Startseite
│   └── +layout.svelte # Globales Layout
└── app.html           # HTML Template
```
