const elements = {
    input: document.getElementById('city-input'),
    btn: document.getElementById('search-btn'),
    city: document.getElementById('city-name'),
    date: document.getElementById('current-date'),
    temp: document.getElementById('temperature'),
    desc: document.getElementById('weather-desc'),
    icon: document.getElementById('weather-icon'),
    wind: document.getElementById('wind'),
    humidity: document.getElementById('humidity'),
    tip: document.getElementById('smart-tip'),
    forecast: document.getElementById('forecast-container'),
    error: document.getElementById('error-msg')
};

const weatherMap = {
    0: { desc: 'Céu Limpo', icon: 'https://cdn-icons-png.flaticon.com/512/869/869869.png' },
    1: { desc: 'Poucas Nuvens', icon: 'https://cdn-icons-png.flaticon.com/512/1163/1163661.png' },
    2: { desc: 'Nublado', icon: 'https://cdn-icons-png.flaticon.com/512/1163/1163624.png' },
    3: { desc: 'Encoberto', icon: 'https://cdn-icons-png.flaticon.com/512/1163/1163624.png' },
    61: { desc: 'Chuva Fraca', icon: 'https://cdn-icons-png.flaticon.com/512/1163/1163657.png' },
    63: { desc: 'Chuva Moderada', icon: 'https://cdn-icons-png.flaticon.com/512/2469/2469994.png' },
    80: { desc: 'Pancadas de Chuva', icon: 'https://cdn-icons-png.flaticon.com/512/1163/1163628.png' },
    95: { desc: 'Tempestade', icon: 'https://cdn-icons-png.flaticon.com/512/1146/1146860.png' }
};

function getWeatherInfo(code) {
    if ([51, 53, 55].includes(code)) return weatherMap[61]; 
    if ([96, 99].includes(code)) return weatherMap[95];
    return weatherMap[code] || { desc: 'Indefinido', icon: 'https://cdn-icons-png.flaticon.com/512/1163/1163657.png' };
}

function getSmartTip(temp, code) {
    if (code >= 95) return "⛈️ Cuidado! Tempestades na região. Fique seguro em casa.";
    if (code >= 60 && code <= 82) return "☔ Dia de chuva. Um café quente e um bom livro são a pedida!";
    if (temp > 30) return "☀️ Muito calor! Hidrate-se e use protetor solar.";
    if (temp < 15) return "🧣 Esfriou! Ótimo para usar aquele casaco favorito.";
    return "⛅ Clima agradável. Aproveite para dar uma caminhada.";
}

function formatDate(dateStr) {
    const options = { weekday: 'short', day: 'numeric', month: 'short' };
    return new Date(dateStr + 'T00:00:00').toLocaleDateString('pt-BR', options); 
}

async function fetchWeather(cityName) {
    try {
        elements.error.classList.add('hidden');
        elements.btn.textContent = '...';

        const geoRes = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${cityName}&count=1&language=pt&format=json`);
        const geoData = await geoRes.json();

        if (!geoData.results) throw new Error("Cidade não encontrada");
        
        const { latitude, longitude, name, country } = geoData.results[0];

        const weatherRes = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,wind_speed_10m,weather_code&daily=weather_code,temperature_2m_max,temperature_2m_min&timezone=auto`);
        const weatherData = await weatherRes.json();

        // 3. Atualizar a Tela
        updateUI(name, country, weatherData);

    } catch (err) {
        console.error(err);
        elements.error.classList.remove('hidden');
    } finally {
        elements.btn.textContent = 'Buscar';
    }
}

function updateUI(city, country, data) {
    const current = data.current;
    const info = getWeatherInfo(current.weather_code);

    elements.city.textContent = `${city}, ${country}`;
    
    const today = new Date();
    elements.date.textContent = today.toLocaleDateString('pt-BR', { weekday: 'long', day: 'numeric', month: 'long' });

    elements.temp.textContent = `${Math.round(current.temperature_2m)}°C`;
    elements.desc.textContent = info.desc;
    elements.icon.src = info.icon;
    elements.wind.textContent = `${current.wind_speed_10m} km/h`;
    elements.humidity.textContent = `${current.relative_humidity_2m}%`;

    elements.tip.textContent = getSmartTip(current.temperature_2m, current.weather_code);

    elements.forecast.innerHTML = '';
    
    for(let i = 1; i <= 3; i++) {
        const dayCode = data.daily.weather_code[i];
        const dayInfo = getWeatherInfo(dayCode);
        const max = Math.round(data.daily.temperature_2m_max[i]);
        const date = data.daily.time[i];

        const cardHTML = `
            <div class="bg-gray-800/50 rounded-lg p-3 flex flex-col items-center border border-white/5 shadow-sm">
                <span class="text-[10px] text-gray-400 font-semibold uppercase">${formatDate(date)}</span>
                <img src="${dayInfo.icon}" class="w-8 h-8 my-2 opacity-90">
                <span class="text-sm font-bold text-white">${max}°C</span>
            </div>
        `;
        elements.forecast.innerHTML += cardHTML;
    }
}

elements.btn.addEventListener('click', () => {
    if(elements.input.value) fetchWeather(elements.input.value);
});

elements.input.addEventListener('keypress', (e) => {
    if(e.key === 'Enter' && elements.input.value) fetchWeather(elements.input.value);
});

fetchWeather('Jaraguá do Sul');