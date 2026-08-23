# 🥾 Wanderkarten Komponente

Die `HikeMap` Komponente ersetzt die alten map.geo.admin.ch iframe Embeds und bietet:

- ✅ Interaktive Karte (Zoom, Pan, GPX Overlay)
- ✅ Höhenprofil (interaktiv mit Hover)
- ✅ Wander-Stats (Distanz, Höhenmeter, Zeit)
- ✅ Schweizer Karten via swisstopo (kostenlos)
- ✅ Keine API Keys nötig

## Verwendung

```svelte
<script>
  import HikeMap from '$lib/components/HikeMap.svelte';
</script>

<HikeMap
  gpxUrl="/gpx/meine-wanderung.gpx"
  title="Wanderung zur Alpsicht"
  distance="5.2 km"
  elevationUp="450 m"
  elevationDown="320 m"
  estimatedTime="2h 30min"
/>
```

## Props

| Prop | Typ | Beschreibung |
|------|-----|--------------|
| `gpxUrl` | string | Pfad zur GPX Datei (lokal oder URL) |
| `title` | string | Titel der Wanderung |
| `distance` | string | Distanz (z.B. "5.2 km") |
| `elevationUp` | string | Höhenmeter auf (z.B. "450 m") |
| `elevationDown` | string | Höhenmeter ab (z.B. "320 m") |
| `estimatedTime` | string | Geschätzte Zeit (z.B. "2h 30min") |

## GPX Dateien hinzufügen

1. GPX Datei in `public/gpx/` ablegen
2. Pfad im Component angeben: `gpxUrl="/gpx/mein-gpx.gpx"`

### GPX muss elevation data enthalten

Die GPX Datei muss `<ele>` Tags haben für das Höhenprofil:

```xml
<trkpt lat="46.529" lon="7.606">
  <ele>1319.2</ele>
</trkpt>
```

Ohne elevation data wird das Höhenprofil nicht angezeigt.

## Generierung von GPX Dateien

GPX Dateien kannst du mit folgenden Tools erstellen:

- **Swisstopo App** (iOS/Android) - wie kt-aufstieg.gpx
- **Komoot** - Export als GPX
- **SwissMap** - Wanderwege exportieren
- **OpenStreetMap** - Overpass Turbo für Routen

## Technologie-Stack

- **Leaflet** - Interaktive Karte
- **chart.js** - Höhenprofil Chart
- **swisstopo WMTS** - Schweizer Karten (Public Data)
- **DOMParser** - GPX Parsing im Browser
