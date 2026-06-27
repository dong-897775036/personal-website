/* ============================================
   站酷风格设计作品展示平台 - 交互脚本
   ============================================ */

// 等待 DOM 加载完成
document.addEventListener('DOMContentLoaded', () => {

    // ========== 主题切换 ==========
    const themeToggle = document.getElementById('themeToggle');
    const body = document.body;

    // 切换主题
    themeToggle.addEventListener('click', () => {
        body.classList.toggle('light-theme');
        const isLight = body.classList.contains('light-theme');
        themeToggle.textContent = isLight ? '☀️' : '🌙';
        localStorage.setItem('theme', isLight ? 'light' : 'dark');
    });

    // 加载保存的主题
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light') {
        body.classList.add('light-theme');
        themeToggle.textContent = '☀️';
    }

    // ========== Banner 轮播 ==========
    const slides = document.querySelectorAll('.banner-slide');
    const dots = document.querySelectorAll('.dot');
    const prevBtn = document.querySelector('.banner-prev');
    const nextBtn = document.querySelector('.banner-next');
    let currentSlide = 0;
    let slideInterval;

    function showSlide(index) {
        // 移除所有 active 类
        slides.forEach(s => s.classList.remove('active'));
        dots.forEach(d => d.classList.remove('active'));

        // 确保索引在有效范围内
        if (index < 0) index = slides.length - 1;
        if (index >= slides.length) index = 0;

        // 显示目标幻灯片
        slides[index].classList.add('active');
        dots[index].classList.add('active');
        currentSlide = index;
    }

    function nextSlide() {
        showSlide(currentSlide + 1);
    }

    function prevSlide() {
        showSlide(currentSlide - 1);
    }

    // 下一张
    nextBtn.addEventListener('click', () => {
        nextSlide();
        resetInterval();
    });

    // 上一张
    prevBtn.addEventListener('click', () => {
        prevSlide();
        resetInterval();
    });

    // 点击指示点
    dots.forEach((dot, i) => {
        dot.addEventListener('click', () => {
            showSlide(i);
            resetInterval();
        });
    });

    // 自动轮播
    function startInterval() {
        slideInterval = setInterval(nextSlide, 5000);
    }

    function resetInterval() {
        clearInterval(slideInterval);
        startInterval();
    }

    startInterval();

    // ========== 标签切换 ==========
    const tabItems = document.querySelectorAll('.tab-list li');
    const tabLinks = document.querySelectorAll('.tab-link');

    tabItems.forEach(tab => {
        tab.addEventListener('click', () => {
            tabItems.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
        });
    });

    tabLinks.forEach(link => {
        link.addEventListener('click', () => {
            tabLinks.forEach(l => l.classList.remove('active'));
            link.classList.add('active');
        });
    });

    // ========== 侧边栏菜单 ==========
    const menuItems = document.querySelectorAll('.sidebar-menu li');

    menuItems.forEach(item => {
        item.addEventListener('click', () => {
            // 移除所有 active 类（只针对当前菜单区域）
            const parentMenu = item.closest('.sidebar-section').querySelector('.sidebar-menu');
            parentMenu.querySelectorAll('li').forEach(i => i.classList.remove('active'));
            item.classList.add('active');
        });
    });

    // ========== 收藏按钮 ==========
    const favButtons = document.querySelectorAll('.work-fav');

    favButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation(); // 防止触发卡片点击
            if (btn.textContent === '♡') {
                btn.textContent = '♥';
                btn.style.color = '#ff5722';
                // 可以添加收藏逻辑
                showToast('已添加到收藏');
            } else {
                btn.textContent = '♡';
                btn.style.color = 'white';
                showToast('已取消收藏');
            }
        });
    });

    // ========== 作品卡片点击 ==========
    const workCards = document.querySelectorAll('.work-card');

    workCards.forEach(card => {
        card.addEventListener('click', () => {
            const title = card.querySelector('.work-title').textContent;
            showToast(`打开作品: ${title}`);
            // 这里可以添加跳转到作品详情页的逻辑
        });
    });

    // ========== 搜索功能 ==========
    const searchInput = document.querySelector('.search-box input');
    const searchBtn = document.querySelector('.search-box button');

    function performSearch() {
        const query = searchInput.value.trim();
        if (query) {
            showToast(`搜索: ${query}`);
            // 这里可以添加搜索逻辑
        }
    }

    searchBtn.addEventListener('click', performSearch);

    searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            performSearch();
        }
    });

    // ========== 导航按钮 ==========
    const btnHome = document.querySelector('.btn-home');
    const btnLogin = document.querySelector('.btn-login');

    btnHome.addEventListener('click', () => {
        showToast('返回首页');
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    btnLogin.addEventListener('click', () => {
        showToast('登录功能开发中...');
        // 这里可以添加登录逻辑
    });

    // ========== 工具函数：显示提示 ==========
    function showToast(message) {
        // 移除已存在的 toast
        const existingToast = document.querySelector('.toast');
        if (existingToast) {
            existingToast.remove();
        }

        // 创建新 toast
        const toast = document.createElement('div');
        toast.className = 'toast';
        toast.textContent = message;
        toast.style.cssText = `
            position: fixed;
            bottom: 24px;
            left: 50%;
            transform: translateX(-50%);
            background: var(--accent);
            color: white;
            padding: 12px 24px;
            border-radius: 25px;
            font-size: 14px;
            z-index: 1000;
            animation: slideUp 0.3s ease-out;
            box-shadow: 0 4px 12px rgba(0,0,0,0.3);
        `;

        document.body.appendChild(toast);

        // 3秒后移除
        setTimeout(() => {
            toast.style.animation = 'slideDown 0.3s ease-out';
            setTimeout(() => toast.remove(), 300);
        }, 3000);
    }

    // 添加动画样式
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideUp {
            from {
                opacity: 0;
                transform: translateX(-50%) translateY(20px);
            }
            to {
                opacity: 1;
                transform: translateX(-50%) translateY(0);
            }
        }

        @keyframes slideDown {
            from {
                opacity: 1;
                transform: translateX(-50%) translateY(0);
            }
            to {
                opacity: 0;
                transform: translateX(-50%) translateY(20px);
            }
        }
    `;
    document.head.appendChild(style);

    // ========== 响应式侧边栏切换（移动端）==========
    // 可以在这里添加移动端侧边栏展开/收起的逻辑

    // ========== 滚动效果 ==========
    let lastScroll = 0;
    const topNav = document.querySelector('.top-nav');

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;

        // 可以添加滚动时导航栏样式变化的效果
        if (currentScroll > 100) {
            topNav.style.boxShadow = '0 4px 12px rgba(0,0,0,0.15)';
        } else {
            topNav.style.boxShadow = '0 2px 8px rgba(0,0,0,0.1)';
        }

        lastScroll = currentScroll;
    });

    // ========== 键盘快捷键 ==========
    document.addEventListener('keydown', (e) => {
        // 左右箭头键切换轮播
        if (e.key === 'ArrowLeft') {
            prevSlide();
            resetInterval();
        } else if (e.key === 'ArrowRight') {
            nextSlide();
            resetInterval();
        }

        // T 键切换主题
        if (e.key === 't' && !e.ctrlKey && !e.metaKey && document.activeElement !== searchInput) {
            themeToggle.click();
        }
    });

    console.log('🎨 设计作品展示平台已加载完成！');
    console.log('💡 提示：按 T 键快速切换主题，按左右箭头键切换轮播');
});
