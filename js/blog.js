const themeToggle = document.querySelector('.theme-toggle');
const html = document.documentElement;

// 检查本地存储中的主题设置
const savedTheme = localStorage.getItem('theme') || 'light';
html.setAttribute('data-theme', savedTheme);

themeToggle.addEventListener('click', () => {
    const currentTheme = html.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';

    // 添加过渡效果
    document.body.style.transition = 'all 0.3s ease';

    html.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);

    // 移除过渡效果
    setTimeout(() => {
        document.body.style.transition = '';
    }, 300);
});