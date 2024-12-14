// 主题切换
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

// 筛选功能
const categoryBtns = document.querySelectorAll('.category-btn');
const tagBtns = document.querySelectorAll('.tag-btn');
const blogCards = document.querySelectorAll('.blog-card');

let selectedCategory = '全部';
let selectedTags = new Set();

// 分类按钮事件
categoryBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        categoryBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        selectedCategory = btn.textContent;
        filterPosts();
    });
});

// 标签按钮事件
tagBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        btn.classList.toggle('active');
        const tag = btn.textContent;
        if (selectedTags.has(tag)) {
            selectedTags.delete(tag);
        } else {
            selectedTags.add(tag);
        }
        filterPosts();
    });
});

// 筛选文章
function filterPosts() {
    blogCards.forEach(card => {
        const category = card.dataset.category;
        const tags = Array.from(card.querySelectorAll('.tag')).map(tag => tag.textContent);

        const matchCategory = selectedCategory === '全部' || category === selectedCategory;
        const matchTags = selectedTags.size === 0 ||
            Array.from(selectedTags).some(tag => tags.includes(tag));

        if (matchCategory && matchTags) {
            card.style.display = 'block';
            card.style.animation = 'fadeIn 0.5s ease';
        } else {
            card.style.display = 'none';
        }
    });
}
// 搜索功能
const searchInput = document.getElementById('searchInput');

searchInput.addEventListener('input', () => {
    const searchTerm = searchInput.value.toLowerCase();
    filterPosts();
});

// 修改筛选函数，加入搜索功能
function filterPosts() {
    const searchTerm = searchInput.value.toLowerCase();

    blogCards.forEach(card => {
        const category = card.dataset.category;
        const tags = Array.from(card.querySelectorAll('.tag')).map(tag => tag.textContent);
        const title = card.querySelector('.blog-title').textContent.toLowerCase();
        const excerpt = card.querySelector('.blog-excerpt').textContent.toLowerCase();

        // 检查是否匹配搜索词
        const matchSearch = searchTerm === '' ||
            title.includes(searchTerm) ||
            excerpt.includes(searchTerm) ||
            tags.some(tag => tag.toLowerCase().includes(searchTerm));

        // 检查是否匹配分类
        const matchCategory = selectedCategory === '全部' || category === selectedCategory;

        // 检查是否匹配标签
        const matchTags = selectedTags.size === 0 ||
            Array.from(selectedTags).some(tag => tags.includes(tag));

        if (matchSearch && matchCategory && matchTags) {
            card.style.display = 'block';
            card.style.animation = 'fadeIn 0.5s ease';
        } else {
            card.style.display = 'none';
        }
    });
}