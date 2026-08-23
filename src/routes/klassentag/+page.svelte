<script>
  import { base } from '$app/paths';
  import HikeMap from '$lib/components/HikeMap.svelte';
  import Weather from '$lib/components/Weather.svelte';
</script>

<svelte:head>
  <title>Klassentag - F1c</title>
  <meta name="description" content="Informationen zum Klassentag der F1c" />
</svelte:head>

<!-- Hero Section -->
<section class="hero">
  <div class="hero__overlay"></div>
  <img src={base + '/img/elsigenalp.jpg'} alt="Elsigenalp - Klassentag" class="hero__image hero__image--1" />
  <img src={base + '/img/elsigenalp-see.jpg'} alt="Elsigenalp-See - Klassentag" class="hero__image hero__image--2" />
  <div class="hero__content">
    <h1 class="hero__title">Klassentag</h1>
    <p class="hero__subtitle">Auf zum Klassentag auf der Elsigenalp</p>
  </div>
</section>

<!-- Wetter für Klassentag -->
<section class="section section--alt">
  <div class="container">
    <h2 class="mb-2">🌤️ Wetter am Klassentag</h2>
    <p class="mb-2">3-Tage-Wettervorhersage für den Klassentag am <strong>Dienstag, 25. August 2026</strong> auf der Elsigenalp:</p>
    <div class="weather-grid">
      <Weather 
        locationName="Achseten" 
        latitude={47.2556} 
        longitude={7.7833} 
        targetDate={new Date(2026, 7, 25)} 
      />
      <Weather 
        locationName="Elsigenalp" 
        latitude={47.2333} 
        longitude={7.8167} 
        targetDate={new Date(2026, 7, 25)} 
      />
    </div>
  </div>
</section>

<section class="section">
  <div class="container">
    <div class="list">
      <div class="list__item">
        <strong>Datum:</strong> Dienstag, 25. August 2026
      </div>
      <div class="list__item">
        <strong>Ort:</strong> Elsigenalp
      </div>
      <div class="list__item">
        <strong>Programm:</strong> Einfache Wanderung mit Picknick und Bademöglichkeit am See
      </div>
    </div>
  </div>
</section>

<section class="section">
  <div class="container">
    <h2 class="mb-2">ÖV-Informationen</h2>
    <div class="list">
      <div class="list__item">
        <strong>Treffpunkt:</strong> 7:15 auf der Passerelle, Basel SBB
      </div>
      <div class="list__item">
        <strong>Abreise:</strong> 7:30 Basel SBB
      </div>
      <div class="list__item">
        <a href="https://a.sbbmobile.ch/s/AgBWDzOC" target="_blank" rel="noopener noreferrer">📱 SBB Fahrplan Hinreise (Basel SBB → Achseten, Kirche)</a>
      </div>
      <div class="list__item">
        <strong>Ankunft:</strong> 16:29 Basel SBB
      </div>
      <div class="list__item">
        <a href="https://a.sbbmobile.ch/s/J7hfiwet" target="_blank" rel="noopener noreferrer">📱 SBB Fahrplan Heimreise (Achseten, Kirche → Basel SBB)</a>
      </div>
      <div class="list__item" style="background: #fff3cd; padding: 12px; border-radius: 8px; margin-top: 8px;">
        <strong>🎫 Tickets:</strong> Für die Anreise zum Basel SBB und für die Heimreise ab Basel SBB benötigen Sie bitte eigene Tickets. Ab Basel SBB stellen wir eine Gruppentageskarte der SBB zur Verfügung — hier müssen also keine weiteren Tickets gekauft werden.
      </div>
    </div>
  </div>
</section>

<section class="section section--alt">
  <div class="container">
    <h2 class="mb-2">Mitbringen</h2>
    <div class="list">
      <div class="list__item">
        🥾 Gute Schuhe
      </div>
      <div class="list__item">
        🌧️ Regenschutz
      </div>
      <div class="list__item">
        🥪 Picknick
      </div>
      <div class="list__item">
        🩱 Badezeug
      </div>
      <div class="list__item">
        ☀️ Sonnenschutz
      </div>
      <div class="list__item">
        👕 Trockene Kleidung für Heimreise
      </div>
    </div>
  </div>
</section>

<section class="section section--alt">
  <div class="container">
    <h2 class="mb-2">Verpflegung</h2>
    <div class="list">
      <div class="list__item" style="background: #fff3cd; padding: 12px; border-radius: 8px;">
        <strong>🍱 Verpflegung selbst mitbringen:</strong> Bitte bringen Sie für alle Mahlzeiten und Snacks selbst Sorge — sowohl für den Hinweg als auch für den Rückweg. Auf der Wanderung gibt es keine Einkaufsmöglichkeiten.
      </div>
      <div class="list__item">
        <strong>☕ Kurz-Einkauf in Frutigen:</strong> Je nachdem, ob der Bus pünktlich am Bahnhof in Frutigen ankommt, haben Sie beim Umsteigen knapp 9 Minuten Zeit, um etwas zu kaufen. Dies ist jedoch nicht immer möglich — planen Sie bitte nicht fest damit.
      </div>
    </div>
  </div>
</section>

<section class="section">
  <div class="container">
    <h2 class="mb-2">Wanderung</h2>

    <h3 class="mb-2">1. Aufstieg</h3>
    <p>Der Aufstieg ist der erste Teil, den die ganze Klasse gemeinsam geht.</p>
    <HikeMap
      gpxUrl={base + '/gpx/kt-aufstieg.gpx'}
      title="Aufstieg zur Elsigenalp"
      distance="2.9 km"
      elevationUp="497 m"
      elevationDown="6 m"
      estimatedTime="1h 30min"
    />
  </div>
</section>

<section class="section section--alt">
  <div class="container">
    <h2 class="mb-2">2. Abstieg</h2>
    <p>Je nach Zeit oder Wetter überspringen wir diesen Teil und fahren mit der Bahn runter.</p>
    <HikeMap
      gpxUrl={base + '/gpx/kt-abstieg-01.gpx'}
      title="Abstieg nach Elsigbach"
      distance="2.7 km"
      elevationUp="6 m"
      elevationDown="493 m"
      estimatedTime="55min"
    />
  </div>
</section>

<section class="section">
  <div class="container">
    <h2 class="mb-2">3. Rückweg zum Bus</h2>
    <p>Dieses Stück müssen wir evtl. sehr schnell laufen können, denn wir müssen die Busverbindung erwischen.</p>
    <HikeMap
      gpxUrl={base + '/gpx/kt-abstieg-02.gpx'}
      title="Rückweg zum Bus"
      distance="2.0 km"
      elevationUp="8 m"
      elevationDown="254 m"
      estimatedTime="35min"
    />
  </div>
</section>
