document.addEventListener("DOMContentLoaded", function () {
    initializePanel("situation-panel", "/panel/situation");
    initializePanel("resources-panel", "/panel/resources");
    initializePanel("features-panel", "/panel/features");
    initializePanel("predictions-panel", "/panel/predictions");
    initializePanel("log-panel", "/panel/log");

    // Inicializa o relógio com data e hora
    initializeClock("time-panel");
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

// Função para inicializar o relógio com data e hora
function initializeClock(panelId) {
    const panel = document.getElementById(panelId);
    if (panel) {
        // Função para atualizar a data e a hora
        function updateDateTime() {
            const now = new Date();
            const daysOfWeek = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];
            const monthsOfYear = ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"];
            const dayOfWeek = daysOfWeek[now.getDay()];
            const dayOfMonth = String(now.getDate()).padStart(2, '0');
            const month = monthsOfYear[now.getMonth()];
            const year = now.getFullYear();
            const hours = String(now.getHours()).padStart(2, '0');
            const minutes = String(now.getMinutes()).padStart(2, '0');
            const seconds = String(now.getSeconds()).padStart(2, '0');

            const dateTime = `${dayOfWeek}, ${dayOfMonth} ${month} ${year} - ${hours}:${minutes}:${seconds}`;
            panel.innerHTML = dateTime; // Atualiza o conteúdo do painel com a data e hora
        }

        // Atualiza a data e hora a cada segundo
        setInterval(updateDateTime, 1000);

        // Atualiza imediatamente ao carregar
        updateDateTime();
    }
}
