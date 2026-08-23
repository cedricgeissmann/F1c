<script>
  import { page } from '$app/stores';
  import { onMount } from 'svelte';
  import '../app.css';

  let menuOpen = false;

  function toggleMenu() {
    menuOpen = !menuOpen;
  }

  function closeMenu() {
    menuOpen = false;
  }
</script>

<nav class="nav">
  <div class="nav__container">
    <a href="/" class="nav__logo">F1c</a>

    <button
      class="nav__toggle"
      aria-label="Menü öffnen"
      aria-expanded={menuOpen}
      on:click={toggleMenu}
    >
      <span></span>
      <span></span>
      <span></span>
    </button>

    <div class="nav__menu" aria-expanded={menuOpen}>
      <ul class="nav__list">
        <li class="nav__item">
          <a
            href="/"
            class="nav__link"
            on:click={closeMenu}
          >
            Startseite
          </a>
        </li>
        <li class="nav__item">
          <a
            href="/die-klasse"
            class="nav__link"
            on:click={closeMenu}
          >
            Die Klasse
          </a>
        </li>
        <li class="nav__item">
          <a
            href="/klassentag"
            class="nav__link"
            on:click={closeMenu}
          >
            Klassentag
          </a>
        </li>
        <li class="nav__item">
          <a
            href="/klassenlager"
            class="nav__link"
            on:click={closeMenu}
          >
            Klassenlager
          </a>
        </li>
      </ul>
    </div>
  </div>
</nav>

<main class="main">
  <slot />
</main>

<footer class="footer">
  <p>&copy; {new Date().getFullYear()} F1c - Klassenwebseite</p>
</footer>
