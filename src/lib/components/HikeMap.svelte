<script>
  import { onMount, onDestroy, tick } from 'svelte';
  import { Chart } from 'chart.js';
  import { registerables } from 'chart.js';
  
  Chart.register(...registerables);
  
  let mapContainer;
  let chartContainer;
  let map;
  let chart;
  let L; // Leaflet (dynamisch geladen)
  
  export let gpxUrl;
  export let title = '';
  export let distance = '';
  export let elevationUp = '';
  export let elevationDown = '';
  export let estimatedTime = '';
  
  let gpxData = null;
  let elevationProfile = [];
  let isLoading = false;
  let error = null;
  let isReady = false;
  
  // Swiss coordinate system (LV03/LV95)
  const swissCenter = [46.9480, 7.4474]; // Switzerland center
  
  onMount(async () => {
    if (!gpxUrl) return;
    
    // Dynamisch importieren – nur client-seitig!
    try {
      const leafletModule = await import('leaflet');
      L = leafletModule.default;
      
      // Leaflet CSS einfügen
      await import('leaflet/dist/leaflet.css');
      
      isReady = true;
      
      // Warte auf DOM-Update, damit bind:this gesetzt wird
      await tick();
      
      await loadGPX();
    } catch (err) {
      error = 'Karte konnte nicht geladen werden: ' + err.message;
    }
  });
  
  async function loadGPX() {
    try {
      isLoading = true;
      error = null;
      
      // Load GPX file
      const response = await fetch(gpxUrl);
      if (!response.ok) throw new Error('GPX file could not be loaded');
      
      const gpxText = await response.text();
      gpxData = gpxText;
      
      // Parse GPX to extract coordinates and elevation
      const parser = new DOMParser();
      const gpxDoc = parser.parseFromString(gpxText, 'text/xml');
      
      const trkpts = gpxDoc.getElementsByTagName('trkpt');
      const rtepts = gpxDoc.getElementsByTagName('rtept');
      const wpts = gpxDoc.getElementsByTagName('wpt');
      
      let points = [];
      
      // Prefer track points (trkpt), then route points (rtept), then waypoints (wpt)
      if (trkpts.length > 0) {
        for (let i = 0; i < trkpts.length; i++) {
          const lat = parseFloat(trkpts[i].getAttribute('lat'));
          const lon = parseFloat(trkpts[i].getAttribute('lon'));
          const ele = trkpts[i].getElementsByTagName('ele')[0];
          const elevation = ele ? parseFloat(ele.textContent) : null;
          points.push({ lat, lon, ele: elevation });
        }
      } else if (rtepts.length > 0) {
        for (let i = 0; i < rtepts.length; i++) {
          const lat = parseFloat(rtepts[i].getAttribute('lat'));
          const lon = parseFloat(rtepts[i].getAttribute('lon'));
          const ele = rtepts[i].getElementsByTagName('ele')[0];
          const elevation = ele ? parseFloat(ele.textContent) : null;
          points.push({ lat, lon, ele: elevation });
        }
      } else if (wpts.length > 0) {
        for (let i = 0; i < wpts.length; i++) {
          const lat = parseFloat(wpts[i].getAttribute('lat'));
          const lon = parseFloat(wpts[i].getAttribute('lon'));
          const ele = wpts[i].getElementsByTagName('ele')[0];
          const elevation = ele ? parseFloat(ele.textContent) : null;
          points.push({ lat, lon, ele: elevation });
        }
      }
      
      if (points.length === 0) {
        throw new Error('No points found in GPX file');
      }
      
      // Build elevation profile data
      let totalDist = 0;
      elevationProfile = [{ lat: points[0].lat, lon: points[0].lon, ele: points[0].ele, dist: 0 }];
      
      for (let i = 1; i < points.length; i++) {
        const dist = getDistanceFromLatLonInKm(points[i-1].lat, points[i-1].lon, points[i].lat, points[i].lon);
        totalDist += dist;
        
        if (points[i].ele !== null) {
          elevationProfile.push({
            lat: points[i].lat,
            lon: points[i].lon,
            ele: points[i].ele,
            dist: totalDist
          });
        }
      }
      
      // Loading false setzen, damit das DOM-Element gerendert wird
      isLoading = false;
      await tick();
      
      // Jetzt kann die Karte erstellt werden
      initMap(points);
    } catch (err) {
      error = err.message;
    }
  }
  
  function initMap(points) {
    if (!L || !mapContainer) {
      error = 'Map container not available';
      return;
    }
    
    // Create map
    map = L.map(mapContainer).setView(swissCenter, 8);
    
    // Add OpenTopoMap tiles (free, topographic, perfect for hiking)
    L.tileLayer(
      'https://tile.opentopomap.org/{z}/{x}/{y}.png',
      {
        attribution: '&copy; <a href="https://opentopomap.org">OpenTopoMap</a> | &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        crossOrigin: true
      }
    ).addTo(map);
    
    // Add GPX track as polyline
    const latlngs = points.map(p => [p.lat, p.lon]);
    
    // Draw track line
    L.polyline(latlngs, {
      color: '#2563eb',
      weight: 4,
      opacity: 0.8,
      smoothFactor: 1
    }).addTo(map);
    
    // Add start marker
    if (points.length > 0) {
      L.marker([points[0].lat, points[0].lon], {
        icon: L.divIcon({
          className: 'hike-marker',
          html: '<div style="background: #22c55e; width: 12px; height: 12px; border-radius: 50%; border: 2px solid white; box-shadow: 0 2px 4px rgba(0,0,0,0.3);"></div>',
          iconSize: [16, 16],
          iconAnchor: [8, 8]
        })
      }).addTo(map).bindPopup('Start');
      
      // Add end marker
      L.marker([points[points.length - 1].lat, points[points.length - 1].lon], {
        icon: L.divIcon({
          className: 'hike-marker',
          html: '<div style="background: #ef4444; width: 12px; height: 12px; border-radius: 50%; border: 2px solid white; box-shadow: 0 2px 4px rgba(0,0,0,0.3);"></div>',
          iconSize: [16, 16],
          iconAnchor: [8, 8]
        })
      }).addTo(map).bindPopup('Ziel');
    }
    
    // Fit map to bounds
    if (latlngs.length > 0) {
      map.fitBounds(L.latLngBounds(latlngs), { padding: [40, 40] });
    }
    
    // Initialize chart after map is ready
    initChart();
  }
  
  function initChart() {
    if (!chartContainer) return;
    
    const labels = elevationProfile.map(p => p.dist.toFixed(1));
    const elevations = elevationProfile.map(p => p.ele);
    
    // chartContainer ist ein div, hole das canvas daraus
    const canvas = chartContainer.querySelector('canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    
    chart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: labels,
        datasets: [{
          label: 'Höhe (m ü. M.)',
          data: elevations,
          borderColor: '#2563eb',
          backgroundColor: createGradient(ctx),
          borderWidth: 2,
          fill: true,
          tension: 0.3,
          pointRadius: 0,
          pointHoverRadius: 4,
          pointHoverBackgroundColor: '#2563eb',
          pointHoverBorderColor: '#ffffff',
          pointHoverBorderWidth: 2
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        interaction: {
          mode: 'index',
          intersect: false
        },
        plugins: {
          legend: {
            display: false
          },
          tooltip: {
            callbacks: {
              title: function(items) {
                return `Distanz: ${items[0].label} km`;
              },
              label: function(item) {
                return `Höhe: ${item.raw} m ü. M.`;
              }
            }
          }
        },
        scales: {
          x: {
            title: {
              display: true,
              text: 'Distanz (km)'
            },
            grid: {
              display: false
            }
          },
          y: {
            title: {
              display: true,
              text: 'Höhe (m ü. M.)'
            },
            grid: {
              color: function(context) {
                return context.tick.value === 0 ? '#00000033' : '#e5e7eb';
              }
            }
          }
        }
      }
    });
  }
  
  function createGradient(ctx) {
    const gradient = ctx.createLinearGradient(0, 0, 0, 300);
    gradient.addColorStop(0, 'rgba(37, 99, 235, 0.3)');
    gradient.addColorStop(1, 'rgba(37, 99, 235, 0.02)');
    return gradient;
  }
  
  function getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {
    const R = 6371; // Earth's radius in km
    const dLat = deg2rad(lat2 - lat1);
    const dLon = deg2rad(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  }
  
  function deg2rad(deg) {
    return deg * (Math.PI / 180);
  }
  
  // Cleanup on destroy
  onDestroy(() => {
    if (map && map.remove) {
      map.remove();
      map = null;
    }
    if (chart) {
      chart.destroy();
      chart = null;
    }
  });
</script>

<div class="hike-map">
  {#if !isReady}
    <div class="hike-map__loading">
      <p>Karte wird initialisiert...</p>
    </div>
  {:else if isLoading}
    <div class="hike-map__loading">
      <p>Lade Karte und GPX-Daten...</p>
    </div>
  {:else if error}
    <div class="hike-map__error">
      <p>⚠️ {error}</p>
    </div>
  {:else}
    <div class="hike-map__header">
      {#if title}
        <h3 class="hike-map__title">{title}</h3>
      {/if}
      <div class="hike-map__stats">
        {#if distance}
          <span class="hike-map__stat">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M12 2L2 7l10 5 10-5-10-5z"/>
              <path d="M2 17l10 5 10-5"/>
              <path d="M2 12l10 5 10-5"/>
            </svg>
            {distance}
          </span>
        {/if}
        {#if elevationUp}
          <span class="hike-map__stat hike-map__stat--up">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M12 19V5"/>
              <path d="M5 12l7-7 7 7"/>
            </svg>
            +{elevationUp}
          </span>
        {/if}
        {#if elevationDown}
          <span class="hike-map__stat hike-map__stat--down">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M12 5v14"/>
              <path d="M19 12l-7 7-7-7"/>
            </svg>
            -{elevationDown}
          </span>
        {/if}
        {#if estimatedTime}
          <span class="hike-map__stat hike-map__stat--time">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="12" cy="12" r="10"/>
              <path d="M12 6v6l4 2"/>
            </svg>
            {estimatedTime}
          </span>
        {/if}
      </div>
    </div>
    
    <div class="hike-map__map" bind:this={mapContainer}></div>
    
    <div class="hike-map__elevation" bind:this={chartContainer}>
      <canvas></canvas>
    </div>
  {/if}
</div>

<style>
  .hike-map {
    border: 1px solid #e5e7eb;
    border-radius: 12px;
    overflow: hidden;
    background: #ffffff;
    position: relative;
    z-index: 0;
  }
  
  .hike-map__map {
    height: 400px;
    width: 100%;
    position: relative;
    z-index: 1;
    overflow: hidden;
    max-height: 400px;
  }
  
  .leaflet-container {
    z-index: 1 !important;
  }
  
  .leaflet-tile-pane {
    z-index: 1 !important;
  }
  
  .hike-map__loading,
  .hike-map__error {
    padding: 60px 20px;
    text-align: center;
    color: #6b7280;
  }
  
  .hike-map__error {
    color: #dc2626;
    background: #fef2f2;
  }
  
  .hike-map__header {
    padding: 16px 20px;
    border-bottom: 1px solid #e5e7eb;
    background: #f9fafb;
  }
  
  .hike-map__title {
    margin: 0 0 8px 0;
    font-size: 1.1rem;
    font-weight: 600;
    color: #111827;
  }
  
  .hike-map__stats {
    display: flex;
    gap: 16px;
    flex-wrap: wrap;
  }
  
  .hike-map__stat {
    display: flex;
    align-items: center;
    gap: 6px;
    font-size: 0.875rem;
    color: #4b5563;
    font-weight: 500;
  }
  
  .hike-map__stat svg {
    flex-shrink: 0;
  }
  
  .hike-map__stat--up {
    color: #16a34a;
  }
  
  .hike-map__stat--down {
    color: #dc2626;
  }
  
  .hike-map__stat--time {
    color: #2563eb;
  }
  
  .hike-map__map {
    height: 400px;
    width: 100%;
  }
  
  .hike-map__elevation {
    height: 200px;
    padding: 16px 20px;
    border-top: 1px solid #e5e7eb;
    background: #f9fafb;
  }
  
  .hike-map__elevation canvas {
    width: 100% !important;
    height: 100% !important;
  }
</style>
