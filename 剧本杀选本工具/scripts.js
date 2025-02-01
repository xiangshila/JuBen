const scriptList = document.getElementById('scriptList');
const playerCountInput = document.getElementById('playerCount');
const typeFilterInput = document.getElementById('typeFilter');

// 加载剧本数据
function loadScripts() {
    const scripts = JSON.parse(localStorage.getItem('scripts')) || [];
    renderScripts(scripts);
    playerCountInput.addEventListener('input', () => renderScripts(scripts));
    typeFilterInput.addEventListener('change', () => renderScripts(scripts));
}

// 渲染剧本列表
function renderScripts(scripts) {
    const playerCount = parseInt(playerCountInput.value);
    const typeFilter = typeFilterInput.value;

    // 筛选剧本
    const filteredScripts = scripts.filter(script => {
        const matchesPlayerCount = isNaN(playerCount) || script.players === playerCount;
        const matchesType = !typeFilter || script.type === typeFilter;
        return matchesPlayerCount && matchesType;
    });

    // 渲染剧本
    scriptList.innerHTML = filteredScripts.map(script => `
        <div class="script-item">
            <img src="${script.cover}" alt="${script.title}" onerror="this.src='default.jpg'">
            <h3>${script.title}</h3>
            <p>人数：${script.players}人</p>
            <p>类型：${script.type}</p>
            <p>${script.description}</p>
        </div>
    `).join('');
}

// 初始化
loadScripts();