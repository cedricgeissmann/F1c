<script>
  import { base } from '$app/paths';
  import { onMount } from 'svelte';
  import Weather from '$lib/components/Weather.svelte';

  let weatherExpanded = false;

  const packItems = [
    '🎒 Rucksack / Reisetasche',
    '🥾 Gute Wanderschuhe (eingelaufen)',
    '👟 Turnschuhe / bequeme Schuhe',
    '🩴 Hausschuhe / Finken',
    '🧥 Warme Jacke / Fleece',
    '🌧️ Regenschutz / Regenjacke',
    '👕 T-Shirts (für eine Woche)',
    '👖 Lange & kurze Hosen',
    '🧦 Socken & Unterwäsche (für eine Woche)',
    '🩱 Badezeug',
    '🛌 Schlafanzug',
    '☀️ Sonnenschutz (Creme, Kappe, Sonnenbrille)',
    '🧴 Waschzeug (Zahnbürste, Zahnpasta, Duschgel)',
    '🧻 Handtücher (Dusche & Badesee)',
    '💧 Trinkflasche',
    '🍱 Znüni / Verpflegung für die Hinreise',
    '🔦 Taschenlampe / Stirnlampe',
    '💊 Persönliche Medikamente',
    '📱 Handy & Ladegerät',
    '🎮 Kartenspiel / Gesellschaftsspiele',
    '📷 Fotoapparat (optional)',
    '💰 Etwas Taschengeld'
  ];

  const STORAGE_KEY = 'klassenlager-packliste';
  let checked = {};

  onMount(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        checked = JSON.parse(saved);
      } catch {
        checked = {};
      }
    }
  });

  function toggle(item) {
    checked[item] = !checked[item];
    checked = { ...checked };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(checked));
  }
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
    <div class="weather-panel__header">
      <h2 class="mb-2">🌤️ Wetter im Klassenlager</h2>
      <button class="weather-panel__toggle" on:click={() => weatherExpanded = !weatherExpanded}>
        {weatherExpanded ? '▲ Weniger anzeigen' : '▼ Alle Orte anzeigen'}
      </button>
    </div>
    <p class="mb-2">7-Tage-Wettervorhersage für das Klassenlager vom <strong>21. bis 25. September 2026</strong> in Elsigbach:</p>
    <div class="weather-grid">
      <Weather 
        locationName="Achseten" 
        latitude={47.2556} 
        longitude={7.7833} 
        targetDate={new Date(2026, 8, 22)} 
        compact={!weatherExpanded}
      />
      {#if weatherExpanded}
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
      {/if}
    </div>
  </div>
</section>

<!-- Unterkunft und Erreichbarkeit -->
<section class="section">
  <div class="container">
    <h2 class="mb-2">🏠 Unterkunft & Erreichbarkeit</h2>
    <div class="list">
      <div class="list__item" style="background: #e8f5e9; padding: 12px; border-radius: 8px;">
        <strong>Adresse:</strong> Elsigbach Lodge, Alte Adelbodenstrasse 35, 3725 Achseten
      </div>
      <div class="list__item" style="background: #fff3cd; padding: 12px; border-radius: 8px;">
        <strong>Telefon:</strong> <a href="tel:+41797219271">+41 79 721 92 71</a>
      </div>
    </div>
  </div>
</section>

<!-- ÖV-Informationen -->
<section class="section">
  <div class="container">
    <h2 class="mb-2">🚌 Hin- und Rückreise</h2>
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

<!-- Begleitung -->
<section class="section section--alt">
  <div class="container">
    <h2 class="mb-2">👥 Begleitung</h2>
    <div class="list">
      <div class="list__item">
        <strong>Cedric Geissmann:</strong> Klassenlehrperson, Mathematik und Informatik – <a href="tel:+41797219271">+41 79 721 92 71</a>
      </div>
      <div class="list__item">
        <strong>Thomas Reber:</strong> Co-Klassenlehrperson, Wirtschaft und Recht
      </div>
    </div>
  </div>
</section>

<!-- Themen, Ziele und Programm -->
<section class="section">
  <div class="container">
    <h2 class="mb-2">🎯 Themen, Ziele & Programm</h2>
    <p class="mb-2">Während der Klassenlagerwoche beschäftigen wir uns mit folgenden Themen und Zielen:</p>
    <div class="list">
      <div class="list__item">
        🏔️ <strong>Schweizer Bergwelt:</strong> Die SuS erkunden die Schweizer Bergwelt und beschäftigen sich mit den Wasserspeichern in der Region Frutigen sowie mit dem Hochwasserschutz in Thun – unter anderem mit dem Wasser, das aus der Region Frutigen stammt.
      </div>
      <div class="list__item">
        🥗 <strong>Bewusste Ernährung:</strong> Begleitend wird der Fleischkonsum bewusst reduziert.
      </div>
    </div>
  </div>
</section>

<!-- Lagerprogramm (ausführlich) -->
<section class="section section--alt">
  <div class="container">
    <h2 class="mb-2">📋 Ausführliches Lagerprogramm</h2>
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

<!-- Daten und Ort -->
<section class="section">
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

<!-- Packliste -->
<section class="section section--alt">
  <div class="container">
    <h2 class="mb-2">🎒 Was mitzunehmen ist</h2>
    <div class="list__item" style="background: #fff3cd; padding: 12px; border-radius: 8px; margin-bottom: 1rem;">
      <strong>ℹ️ Gepäck-Tipp:</strong> Am Bahnhof Spiez müssen wir über eine Treppe umsteigen. Rollkoffer sind möglich, wegen diesem Abschnitt aber nicht zu empfehlen – ein Rucksack oder eine Reisetasche ist praktischer.
    </div>
    <p class="mb-2">Hake ab, was du bereits eingepackt hast – dein Fortschritt bleibt auf diesem Gerät gespeichert.</p>
    <div class="packlist">
      {#each packItems as item}
        <button
          type="button"
          class="packlist__item"
          class:packlist__item--checked={checked[item]}
          on:click={() => toggle(item)}
        >
          <span class="packlist__box">{checked[item] ? '✓' : ''}</span>
          <span class="packlist__label">{item}</span>
        </button>
      {/each}
    </div>
  </div>
</section>

<!-- Kosten -->
<section class="section">
  <div class="container">
    <h2 class="mb-2">💰 Kosten</h2>
    <div class="list">
      <div class="list__item">
        <strong>Budget:</strong> Für das Klassenlager ist ein Budget von 300.– CHF vorgesehen. Wir sind bemüht, die Kosten möglichst tief zu halten und diesen Betrag wenn möglich zu unterschreiten.
      </div>
    </div>
  </div>
</section>

<!-- Lagerregeln -->
<section class="section section--alt">
  <div class="container">
    <h2 class="mb-2">📜 Lagerregeln</h2>
    <p class="mb-2">Folgende Regeln gelten während des Klassenlagers:</p>
    <div class="list">
      <div class="list__item">
        🚫 <strong>Kein Alkohol</strong> und keine anderen Rauschmittel.
      </div>
      <div class="list__item">
        🌙 <strong>Nachtruhe um 23:00 Uhr</strong> – danach ist Ruhe in den Zimmern.
      </div>
      <div class="list__item">
        ⏰ <strong>Pünktlichkeit</strong> bei allen Programmpunkten und Mahlzeiten.
      </div>
      <div class="list__item">
        🙋 <strong>Aktive Teilnahme</strong> am gesamten Lagerprogramm.
      </div>
      <div class="list__item">
        🍽️ <strong>Kein Essen in den Zimmern</strong> – gegessen wird nur in den dafür vorgesehenen Bereichen.
      </div>
      <div class="list__item">
        🧹 <strong>Müll und Dreck</strong> immer direkt wegräumen und Ordnung halten.
      </div>
      <div class="list__item">
        👩‍🍳 <strong>Aktive Mithilfe</strong> beim Kochen, Abwaschen und Putzen.
      </div>
      <div class="list__item">
        🤝 <strong>Respektvoller Umgang</strong> miteinander und mit der Unterkunft.
      </div>
      <div class="list__item">
        🚶 <strong>Das Lagerhaus-Gelände</strong> wird nur mit Absprache der Lehrpersonen verlassen.
      </div>
    </div>
  </div>
</section>

<style>
  .weather-panel__header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 1rem;
    flex-wrap: wrap;
  }

  .weather-panel__toggle {
    padding: 0.5rem 1rem;
    background: var(--color-bg-alt);
    border: 1px solid var(--color-border);
    border-radius: 8px;
    color: var(--color-primary);
    font-size: 0.9rem;
    font-weight: 600;
    cursor: pointer;
    transition: background 0.2s ease, border-color 0.2s ease;
  }

  .weather-panel__toggle:hover {
    background: var(--color-border);
    border-color: var(--color-primary);
  }

  .packlist {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  .packlist__item {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    width: 100%;
    padding: 0.75rem 1rem;
    background: var(--color-bg-alt);
    border: 1px solid var(--color-border);
    border-radius: 8px;
    color: var(--color-text);
    font-size: 1rem;
    text-align: left;
    cursor: pointer;
    transition: background 0.2s ease, border-color 0.2s ease;
  }

  .packlist__item:hover {
    border-color: var(--color-primary);
  }

  .packlist__item--checked {
    background: #e8f5e9;
    border-color: #4caf50;
  }

  .packlist__item--checked .packlist__label {
    text-decoration: line-through;
    opacity: 0.6;
  }

  .packlist__box {
    flex-shrink: 0;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 1.5rem;
    height: 1.5rem;
    border: 2px solid var(--color-border);
    border-radius: 6px;
    background: var(--color-bg);
    color: #4caf50;
    font-weight: 700;
    font-size: 1rem;
  }

  .packlist__item--checked .packlist__box {
    border-color: #4caf50;
  }
</style>
