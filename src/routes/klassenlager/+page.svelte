<script>
  import { base } from '$app/paths';
  import Weather from '$lib/components/Weather.svelte';
</script>

<svelte:head>
  <title>Klassenlager - F1c</title>
  <meta name="description" content="Informationen zum Klassenlager der F1c" />
</svelte:head>

<!-- Hero Section -->
<section class="hero">
  <div class="hero__overlay"></div>
  <img src={base + '/img/elsigbach.jpg'} alt="Elsigbach - Klassenlager" class="hero__image" />
  <div class="hero__content">
    <h1 class="hero__title">Klassenlager</h1>
    <p class="hero__subtitle">Auf zum Klassenlager nach Elsigbach</p>
  </div>
</section>

<!-- Wetter für Klassenlager -->
<section class="section section--alt">
  <div class="container">
    <h2 class="mb-2">🌤️ Wetter im Klassenlager</h2>
    <p class="mb-2">7-Tage-Wettervorhersage für das Klassenlager vom <strong>21. bis 25. September 2026</strong> in Elsigbach:</p>
    <div class="weather-grid">
      <Weather 
        locationName="Achseten" 
        latitude={47.2556} 
        longitude={7.7833} 
        targetDate={new Date(2026, 8, 22)} 
      />
      <Weather 
        locationName="Elsigenalp" 
        latitude={47.2333} 
        longitude={7.8167} 
        targetDate={new Date(2026, 8, 22)} 
      />
      <Weather 
        locationName="Thun" 
        latitude={46.7572} 
        longitude={7.6207} 
        targetDate={new Date(2026, 8, 22)} 
      />
      <Weather 
        locationName="Oeschinensee" 
        latitude={46.7283} 
        longitude={7.7383} 
        targetDate={new Date(2026, 8, 22)} 
      />
    </div>
  </div>
</section>

<!-- Grobes Programm -->
<section class="section">
  <div class="container">
    <h2 class="mb-2">📋 Lagerprogramm</h2>
    <div class="list">
      <div class="list__item">
        <strong>Montag:</strong> Anreise
      </div>
      <div class="list__item">
        <strong>Dienstag:</strong> Wanderung auf Elsigenalp
      </div>
      <div class="list__item">
        <strong>Mittwoch:</strong> Stadtbesichtigung Thun
      </div>
      <div class="list__item">
        <strong>Donnerstag:</strong> Wanderung zum Oeschinensee
      </div>
      <div class="list__item">
        <strong>Freitag:</strong> Putzen und Heimreise
      </div>
    </div>
  </div>
</section>

<section class="section section--alt">
  <div class="container">
    <div class="list">
      <div class="list__item">
        <strong>Datum:</strong> Montag, 21. September bis Freitag, 25. September 2026
      </div>
      <div class="list__item">
        <strong>Ort:</strong> Elsigbach
      </div>
    </div>
  </div>
</section>

<section class="section">
  <div class="container">
    <h2 class="mb-2">ÖV-Informationen</h2>
    <div class="list">
      <div class="list__item">
        <strong>Treffpunkt:</strong> 8:15 auf der Passerelle, Basel SBB
      </div>
      <div class="list__item">
        <strong>Abreise:</strong> 8:30 Basel SBB
      </div>
      <div class="list__item">
        <strong>Ankunft in Basel SBB:</strong> 15:29
      </div>
    </div>
  </div>
</section>

<section class="section section--alt">
  <div class="container">
    <h2 class="mb-2">Mitbringen</h2>
    <div class="list">
      <div class="list__item" style="background: #fff3cd; padding: 12px; border-radius: 8px;">
        <strong>📝 Packliste folgt noch.</strong>
      </div>
    </div>
  </div>
</section>

<section class="section">
  <div class="container">
    <h2 class="mb-2">Kontakt</h2>
    <div class="list">
      <div class="list__item" style="background: #e7f3ff; padding: 12px; border-radius: 8px;">
        <strong>📞 Notfallkontakt:</strong> Bei Notfällen oder anderen Zwischenfällen melden Sie sich am besten direkt bei der Klassenlehrperson Cedric Geissmann unter <a href="tel:+41797219271">+41 79 721 92 71</a>.
      </div>
    </div>
  </div>
</section>
