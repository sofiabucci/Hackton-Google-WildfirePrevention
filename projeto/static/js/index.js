document.addEventListener("DOMContentLoaded", function () {
    // Carregar o conteúdo HTML dos painéis
    initializePanel("history-panel", "/panel/history");
    initializePanel("resources-panel", "/panel/resources");
    initializePanel("weather-panel", "/panel/weather");
    initializePanel("situation-panel", "/panel/situation");
    initializePanel("gateway-panel", "/panel/gateway");
    initializePanel("predictions-panel", "/panel/predictions");
    initializePanel("camera-panel", "/panel/camera");
    initializePanel("log-panel", "/panel/log");


});

// Função para carregar o conteúdo HTML no painel
function initializePanel(panelId, panelUrl) {
    const panel = document.getElementById(panelId);
    if (panel) {
        fetch(panelUrl)
            .then(response => response.text())
            .then(content => {
                panel.innerHTML = content; // Insere o conteúdo HTML no painel
            })
            .catch(error => {
                console.error("Erro ao carregar o conteúdo do painel:", error);
                panel.innerHTML = `<p>Erro ao carregar o conteúdo. Tente novamente mais tarde.</p>`;
            });
    }
}
