const themeToggle = document.querySelector('.theme-toggle');
const html = document.documentElement;

const savedTheme = localStorage.getItem('theme') || 'light';
html.setAttribute('data-theme', savedTheme);

themeToggle.addEventListener('click', () => {
    const currentTheme = html.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';

    document.body.style.transition = 'all 0.3s ease';

    html.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);

    setTimeout(() => {
        document.body.style.transition = '';
    }, 300);
});