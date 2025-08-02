const apiKey = 'b24be52ac44a24de4463d99e7ec632bb'; // 🔐 เปลี่ยนเป็นของคุณถ้ามี

const searchForm = document.querySelector('#search-form');
const cityInput = document.querySelector('#city-input');
const weatherInfoContainer = document.querySelector('#weather-info-container');

// แปลงชื่อเมืองไทยเป็นอังกฤษ (ใช้กับ API)
const cityMap = {
    "กรุงเทพ": "Bangkok",
    "เชียงใหม่": "Chiang Mai",
    "ขอนแก่น": "Khon Kaen",
    "ภูเก็ต": "Phuket",
    "พัทยา": "Pattaya",
    "อุดรธานี": "Udon Thani",
    "โคราช": "Nakhon Ratchasima",
    "หาดใหญ่": "Hat Yai"
};

searchForm.addEventListener('submit', (event) => {
    event.preventDefault();

    let cityName = cityInput.value.trim();

    if (!cityName) {
        alert('กรุณาป้อนชื่อเมือง');
        return;
    }

    // ถ้ามีใน cityMap ให้ใช้ชื่ออังกฤษแทน
    if (cityMap[cityName]) {
        cityName = cityMap[cityName];
    }

    getWeather(cityName);
});

async function getWeather(city) {
    weatherInfoContainer.innerHTML = `<p>กำลังโหลดข้อมูล...</p>`;
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${apiKey}&units=metric&lang=th`;

    try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error('ไม่พบข้อมูลเมืองนี้');
        }
        const data = await response.json();
        displayWeather(data);
    } catch (error) {
        weatherInfoContainer.innerHTML = `<p class="error">${error.message}</p>`;
    }
}

function displayWeather(data) {
    const { name, main, weather } = data;
    const { temp, humidity } = main;
    const { description, icon } = weather[0];

    const weatherHtml = `
        <h2>${name}</h2>
        <img src="https://openweathermap.org/img/wn/${icon}@2x.png" alt="${description}">
        <p class="temp">${temp.toFixed(1)}°C</p>
        <p>${description}</p>
        <p>ความชื้น: ${humidity}%</p>
    `;
    weatherInfoContainer.innerHTML = weatherHtml;
}
