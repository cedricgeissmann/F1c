

<svelte:head>
  <title>Startseite - F1c</title>
  <meta name="description" content="Klassenwebseite F1c" />
</svelte:head>

<div class="container">
  <!-- Hero Section -->
  <section class="section">
    <h1>Willkommen auf der F1c Klassenwebseite</h1>
    <p>Hier findest du alle wichtigen Informationen zur Klasse, zum Klassentag und zum Klassenlager.</p>
    <a href="/die-klasse" class="btn mt-2">Mehr erfahren</a>
  </section>

  <!-- Schnelle Infos -->
  <section class="section section--alt">
    <div class="cards">
      <a href="/die-klasse" class="card">
        <h3 class="card__title">Die Klasse</h3>
        <p class="card__text">Infos über unsere Klasse, Lehrkräfte und den Unterricht.</p>
      </a>
      <a href="/klassentag" class="card">
        <h3 class="card__title">Klassentag</h3>
        <p class="card__text">Termine, Planung und Rückblicke auf unsere Klassentage.</p>
      </a>
      <a href="/klassenlager" class="card">
        <h3 class="card__title">Klassenlager</h3>
        <p class="card__text">Erinnerungen, Packlisten und Infos zum nächsten Lager.</p>
      </a>
    </div>
  </section>

  <!-- Ankündigungen -->
  <section class="section">
    <h2 class="mb-2">Aktuelles</h2>
    <div class="list">
      <div class="list__item">
        <strong>Demnächst:</strong> Klassentag am Dienstag, 25. August
      </div>
    </div>
  </section>
</div>
