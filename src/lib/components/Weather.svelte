<script>
  import { onMount, onDestroy } from 'svelte';

  export let locationName = '';
  export let latitude = 0;
  export let longitude = 0;
  export let targetDate = null;
  export let daysAhead = 7;

  let weatherData = null;
  let loading = true;
  let error = null;
  let interval = null;
  let today = new Date();
  today.setHours(0, 0, 0, 0);

  function fetchWeather() {
    if (!targetDate) return;

    const startDate = today.toISOString().split('T')[0];
    const endDate = new Date(today.getTime() + daysAhead * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&start_date=${startDate}&end_date=${endDate}&daily=weather_code,temperature_2m_max,temperature_2m_min,apparent_temperature_max,apparent_temperature_min,precipitation_sum,wind_speed_10m_max,wind_gusts_10m_max,precipitation_probability_max&timezone=Europe%2FBerlin&temperature_unit=celsius&wind_speed_unit=kmh&precipitation_unit=mm`;

    fetch(url)
      .then(res => res.json())
      .then(data => {
        weatherData = data;
        loading = false;
      })
      .catch(err => {
        error = 'Wetterdaten konnten nicht geladen werden';
        loading = false;
        console.error('Fehler beim Laden der Wetterdaten:', err);
      });
  }

  onMount(() => {
    fetchWeather();
    interval = setInterval(fetchWeather, 600000);
  });

  onDestroy(() => {
    if (interval) clearInterval(interval);
  });

  function getWeatherIcon(code) {
    if (code === null || code === undefined) return '🌤️';
    const icons = {
      0: '☀️', 1: '🌤️', 2: '⛅', 3: '☁️',
      45: '🌫️', 48: '🌫️',
      51: '🌦️', 53: '🌦️', 55: '🌧️',
      61: '🌧️', 63: '🌧️', 65: '🌧️',
      71: '🌨️', 73: '🌨️', 75: '❄️', 77: '❄️',
      80: '🌦️', 81: '🌧️', 82: '🌧️',
      85: '🌨️', 86: '🌨️',
      95: '⛈️', 96: '⛈️', 99: '⛈️',
    };
    return icons[code] || '🌤️';
  }

  function formatTemp(temp) {
    if (temp === null || temp === undefined) return '--';
    return `${Math.round(temp)}°`;
  }

  function formatWind(speed) {
    if (speed === null || speed === undefined) return '--';
    return `${Math.round(speed)} km/h`;
  }

  function formatPrecipitation(prec) {
    if (prec === null || prec === undefined) return '--';
    if (prec < 0.1) return '0 mm';
    return `${prec.toFixed(1)} mm`;
  }

  function formatDateDisplay(date) {
    if (!date) return '';
    const d = new Date(date);
    return d.toLocaleDateString('de-CH', { weekday: 'long', day: 'numeric', month: 'numeric' });
  }
</script>

<div class="weather-card">
  <div class="weather-card__header">
    <h3 class="weather-card__title">
      <span class="weather-card__icon">🏔️</span>
      {locationName}
    </h3>
    {#if loading}
      <span class="weather-card__loading">Laden...</span>
    {/if}
    {#if error}
      <span class="weather-card__error">{error}</span>
    {/if}
  </div>

  {#if weatherData && !loading}
    <div class="weather-card__forecast">
      <p class="forecast-note">📅 {daysAhead}-Tage-Vorhersage</p>
      <div class="forecast-grid">
        {#each weatherData.daily.time as day, i}
          {#if new Date(day) >= today}
            <div class="forecast-day">
            <span class="forecast-day__date">{formatDateDisplay(day)}</span>
            <span class="forecast-day__icon">{getWeatherIcon(weatherData.daily.weather_code[i])}</span>
            <span class="forecast-day__temp">
              {formatTemp(weatherData.daily.temperature_2m_min[i])} / {formatTemp(weatherData.daily.temperature_2m_max[i])}
            </span>
            <span class="forecast-day__precip">
              🌧️ {formatPrecipitation(weatherData.daily.precipitation_sum[i])}
            </span>
          </div>
          {/if}
        {/each}
      </div>
    </div>
  {/if}
</div>

<style>
  .weather-card {
    background: white;
    border-radius: 12px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    overflow: hidden;
    transition: box-shadow 0.3s ease;
  }

  .weather-card:hover {
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);
  }

  .weather-card__header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 1rem 1.25rem;
    background: linear-gradient(135deg, var(--color-primary) 0%, var(--color-secondary) 100%);
    color: white;
  }

  .weather-card__title {
    margin: 0;
    font-size: 1.1rem;
    font-weight: 600;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    color: #ffffff;
    text-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
  }

  .weather-card__icon {
    font-size: 1.2rem;
  }

  .weather-card__loading,
  .weather-card__error {
    font-size: 0.85rem;
    opacity: 0.8;
  }

  .weather-card__error {
    color: #ffcccc;
  }

  .weather-card__forecast {
    padding: 1.25rem;
  }

  .forecast-note {
    font-size: 0.85rem;
    color: var(--color-text-light);
    margin-bottom: 0.75rem;
    font-style: italic;
  }

  .forecast-grid {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  .forecast-day {
    display: flex;
    align-items: center;
    gap: 1rem;
    padding: 0.75rem 1rem;
    background: var(--color-bg-alt);
    border-radius: 8px;
    transition: background 0.2s ease;
  }

  .forecast-day:hover {
    background: var(--color-border);
  }

  .forecast-day__date {
    font-weight: 600;
    color: var(--color-primary);
    min-width: 100px;
    font-size: 0.9rem;
  }

  .forecast-day__icon {
    font-size: 1.8rem;
  }

  .forecast-day__temp {
    font-size: 1rem;
    font-weight: 600;
    color: var(--color-text);
    min-width: 100px;
  }

  .forecast-day__precip {
    font-size: 0.85rem;
    color: var(--color-text-light);
    margin-left: auto;
  }


</style>
