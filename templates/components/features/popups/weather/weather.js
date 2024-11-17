// modal.js - Lógica para carregar o conteúdo da modal e obter a previsão do tempo

// Função para carregar o conteúdo HTML da modal (modal.html)
function loadModalContent(modalId) {
    fetch('../../../static/html/modal.html')
        .then(response => response.text())
        .then(data => {
            const modalContainer = document.getElementById(modalId);
            modalContainer.innerHTML = data; // Insere o conteúdo da modal dentro do contêiner especificado
            // Configura a ação de fechar a modal
            const closeButton = modalContainer.querySelector('.close-button');
            closeButton.addEventListener('click', () => closeModal(modalId));
        })
        .catch(error => console.error('Erro ao carregar o conteúdo da modal:', error));
}

// Função para buscar os dados do clima
function getWeatherData(modalId) {
    return new Promise((resolve, reject) => {
        const regionId = 1010500; // Região de Aveiro no IPMA
        const apiUrl = `https://api.ipma.pt/open-data/forecast/meteorology/cities/daily/${regionId}.json`;

        fetch(apiUrl)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Erro ao obter dados da API');
                }
                return response.json();
            })
            .then(data => {
                const forecast = data.data[0];
                const date = forecast.forecastDate;
                const minTemp = forecast.tMin;
                const maxTemp = forecast.tMax;
                const weatherType = forecast.idWeatherType;
                const weatherDescription = getWeatherDescription(weatherType);

                resolve({
                    date,
                    minTemp,
                    maxTemp,
                    weatherDescription
                });
            })
            .catch(error => reject(error));
    });
}

// Função para obter a descrição do tempo
function getWeatherDescription(weatherType) {
    const weatherTypes = {
        1: 'Céu limpo',
        2: 'Céu pouco nublado',
        3: 'Céu nublado',
        4: 'Céu muito nublado',
        5: 'Chuva',
        6: 'Aguaceiros',
        7: 'Trovoada',
        8: 'Neve',
        9: 'Nevoeiro',
    };
    return weatherTypes[weatherType] || 'Condições desconhecidas';
}

// Função para exibir dados de previsão do tempo na modal
function showWeatherInModal(modalId) {
    const weatherInfo = document.getElementById(`${modalId}-weather-info`);
    weatherInfo.innerHTML = 'Carregando previsão do tempo...';

    getWeatherData(modalId).then(data => {
        weatherInfo.innerHTML = `
            <h2>Previsão do Tempo em Aveiro</h2>
            <p>Data: ${data.date}</p>
            <p>Temperatura Mínima: ${data.minTemp}°C</p>
            <p>Temperatura Máxima: ${data.maxTemp}°C</p>
            <p>Condições: ${data.weatherDescription}</p>
        `;
    }).catch(error => {
        weatherInfo.innerHTML = 'Erro ao carregar a previsão do tempo.';
        console.error(error);
    });
}

// Exemplo de uso para carregar conteúdo e mostrar a previsão do tempo na modal
window.onload = function() {
    const modalId = 'weather-modal'; // Exemplo de ID da modal
    loadModalContent(modalId);
    showWeatherInModal(modalId);
};
