const scriptForm = document.getElementById('scriptForm');
const messageDiv = document.getElementById('message');
const scriptList = document.getElementById('scriptList');

// 加载剧本数据
let scripts = JSON.parse(localStorage.getItem('scripts')) || [];
renderScripts();

// 表单提交事件
scriptForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const title = document.getElementById('title').value;
    const players = parseInt(document.getElementById('players').value);
    const type = document.getElementById('type').value;
    const description = document.getElementById('description').value;
    const coverFile = document.getElementById('cover').files[0];

    if (coverFile) {
        const reader = new FileReader();
        reader.onload = (e) => {
            const cover = e.target.result; // 获取 Base64 格式的图片数据
            const newScript = { title, players, type, description, cover };
            scripts.push(newScript);
            localStorage.setItem('scripts', JSON.stringify(scripts));
            messageDiv.textContent = '剧本添加成功！';
            scriptForm.reset();
            renderScripts(); // 重新渲染剧本列表
        };
        reader.readAsDataURL(coverFile); // 将图片文件转换为 Base64
    } else {
        messageDiv.textContent = '请上传封面图片！';
    }
});

// 渲染剧本列表
function renderScripts() {
    scriptList.innerHTML = scripts.map((script, index) => `
        <div class="script-item">
            <img src="${script.cover}" alt="${script.title}" onerror="this.src='default.jpg'">
            <h3>${script.title}</h3>
            <p>人数：${script.players}人</p>
            <p>类型：${script.type}</p>
            <p>${script.description}</p>
            <button onclick="deleteScript(${index})">删除</button>
        </div>
    `).join('');
}

// 删除剧本
function deleteScript(index) {
    scripts.splice(index, 1); // 删除指定剧本
    localStorage.setItem('scripts', JSON.stringify(scripts)); // 更新本地存储
    renderScripts(); // 重新渲染剧本列表
    alert('剧本删除成功！');
}