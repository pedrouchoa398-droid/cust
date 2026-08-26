// Weather Dashboard using Open-Meteo (no API key required)
// - Geocoding: https://geocoding-api.open-meteo.com/v1/search
// - Weather: https://api.open-meteo.com/v1/forecast

const $ = (sel) => document.querySelector(sel);
const form = $('#search-form');
const input = $('#city-input');
const statusEl = $('#status');
const currentEl = $('#current');
const forecastEl = $('#forecast');
const locationEl = $('#location');
const tempEl = $('#temp');
const condEl = $('#cond');
const windEl = $('#wind');
const timeEl = $('#time');
const forecastListEl = $('#forecast-list');

const weatherCodeMap = {
  0: 'Clear ☀️',
  1: 'Mainly clear 🌤️',
  2: 'Partly cloudy ⛅',
  3: 'Overcast ☁️',
  45: 'Fog 🌫️',
  48: 'Depositing rime fog 🌫️',
  51: 'Light drizzle 🌦️',
  53: 'Moderate drizzle 🌦️',
  55: 'Dense drizzle 🌧️',
  56: 'Light freezing drizzle ❄️',
  57: 'Dense freezing drizzle ❄️',
  61: 'Slight rain 🌧️',
  63: 'Moderate rain 🌧️',
  65: 'Heavy rain 🌧️',
  66: 'Light freezing rain ❄️',
  67: 'Heavy freezing rain ❄️',
  71: 'Slight snow ❄️',
  73: 'Moderate snow ❄️',
  75: 'Heavy snow ❄️',
  80: 'Rain showers 🌦️',
  81: 'Moderate showers 🌧️',
  82: 'Violent showers 🌧️',
  95: 'Thunderstorm ⛈️',
  96: 'Thunderstorm w/ hail ⛈️',
};

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const city = input.value.trim();
  if (!city) return setStatus('Digite o nome de uma cidade.');
  await searchCity(city);
});

async function searchCity(city){
  reset();
  setStatus('Procurando cidade...');
  try{
    const geo = await geocode(city);
    if(!geo) { setStatus('Cidade não encontrada. Tente outro nome.'); return }
    setStatus(`Cidade encontrada: ${geo.name}, ${geo.country}. Carregando clima...`);
    const weather = await fetchWeather(geo.latitude, geo.longitude, geo.timezone);
    renderWeather(geo, weather);
    setStatus('');
  }catch(err){
    console.error(err);
    setStatus('Erro ao buscar dados. Veja o console para detalhes.');
  }
}

function setStatus(msg){
  statusEl.textContent = msg;
}

function reset(){
  currentEl.classList.add('hidden');
  forecastEl.classList.add('hidden');
  forecastListEl.innerHTML = '';
  setStatus('');
}

async function geocode(name){
  const url = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(name)}&count=1`;
  const res = await fetch(url);
  if(!res.ok) throw new Error('Geocoding failed');
  const data = await res.json();
  if(!data.results || data.results.length===0) return null;
  const r = data.results[0];
  return { name: r.name, country: r.country, latitude: r.latitude, longitude: r.longitude, timezone: r.timezone || 'auto' };
}

async function fetchWeather(lat, lon, timezone){
  // daily: min/max temps and weathercode for forecast; current_weather for instant
  const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}`+
    `&current_weather=true&daily=temperature_2m_max,temperature_2m_min,weathercode&timezone=${encodeURIComponent(timezone)}`;
  const res = await fetch(url);
  if(!res.ok) throw new Error('Weather API failed');
  const data = await res.json();
  return data;
}

function renderWeather(geo, data){
  // Current
  const cur = data.current_weather;
  locationEl.textContent = `${geo.name}, ${geo.country}`;
  tempEl.textContent = `${Math.round(cur.temperature)}°C`;
  condEl.textContent = weatherCodeMap[cur.weathercode] || `Code ${cur.weathercode}`;
  windEl.textContent = `Wind: ${cur.windspeed} km/h (${cur.winddirection}°)`;
  timeEl.textContent = `As of: ${new Date(cur.time).toLocaleString()}`;
  currentEl.classList.remove('hidden');

  // Forecast
  if(data.daily && data.daily.time){
    forecastListEl.innerHTML = '';
    const times = data.daily.time;
    const mins = data.daily.temperature_2m_min;
    const maxs = data.daily.temperature_2m_max;
    const codes = data.daily.weathercode;
    for(let i=0;i<times.length;i++){
      const date = new Date(times[i]);
      const day = date.toLocaleDateString(undefined,{weekday:'short',month:'short',day:'numeric'});
      const item = document.createElement('div');
      item.className = 'forecast-item';
      item.innerHTML = `<div class="day">${day}</div>
                        <div class="icon">${weatherCodeMap[codes[i]]?emojiFromDesc(weatherCodeMap[codes[i]]):'-'}</div>
                        <div class="range"><strong>${Math.round(maxs[i])}°</strong> / ${Math.round(mins[i])}°</div>
                        <div class="code">${weatherCodeMap[codes[i]]||codes[i]}</div>`;
      forecastListEl.appendChild(item);
    }
    forecastEl.classList.remove('hidden');
  }
}

function emojiFromDesc(desc){
  // The mapping includes an emoji; return last token
  const parts = desc.split(' ');
  return parts[parts.length-1];
}

// Optional: quick demo search
if(!input.value) { input.value = 'Lisbon' }
// Auto-run an initial demo search so the page isn't empty
setTimeout(()=>{
  const evt = new Event('submit', {bubbles:true});
  form.dispatchEvent(evt);
}, 600);
