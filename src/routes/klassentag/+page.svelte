<script>
  import HikeMap from '$lib/components/HikeMap.svelte';
</script>

<svelte:head>
  <title>Klassentag - F1c</title>
  <meta name="description" content="Informationen zum Klassentag der F1c" />
</svelte:head>

<!-- Hero Section -->
<section class="hero">
  <div class="hero__overlay"></div>
  <img src="{$base}/img/elsigenalp.jpg" alt="Elsigenalp - Klassentag" class="hero__image" />
  <div class="hero__content">
    <h1 class="hero__title">Klassentag</h1>
    <p class="hero__subtitle">Auf zum Klassentag auf der Elsigenalp</p>
  </div>
</section>

<section class="section">
  <div class="container">
    <h1>Klassentag</h1>
    <p>Alle Informationen zum Klassentag der F1c.</p>
  </div>
</section>

<section class="section section--alt">
  <div class="container">
    <h2 class="mb-2">Nächster Klassentag</h2>
    <div class="list">
      <div class="list__item">
        <strong>Datum:</strong> Dienstag, 25. August 2025
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
        <strong>Treffpunkt:</strong> 7:15 Basel SBB
      </div>
      <div class="list__item">
        <strong>Abreise:</strong> 7:30 Basel SBB
      </div>
      <div class="list__item">
        <strong>Ankunft:</strong> 16:29 Basel SBB
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
    </div>
  </div>
</section>

<section class="section">
  <div class="container">
    <h2 class="mb-2">Wanderung</h2>

    <h3 class="mb-2">1. Aufstieg</h3>
    <p>Der Aufstieg ist der erste Teil, den die ganze Klasse gemeinsam geht.</p>
    <HikeMap
      gpxUrl="{$base}/gpx/kt-aufstieg.gpx"
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
      gpxUrl="{$base}/gpx/kt-abstieg-01.gpx"
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
      gpxUrl="{$base}/gpx/kt-abstieg-02.gpx"
      title="Rückweg zum Bus"
      distance="2.0 km"
      elevationUp="8 m"
      elevationDown="254 m"
      estimatedTime="35min"
    />
  </div>
</section>
