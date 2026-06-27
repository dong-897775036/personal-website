// ===== 主题切换功能 =====
const themeToggle = document.getElementById('themeToggle');
const body = document.body;

// 检查本地存储的主题偏好
const savedTheme = localStorage.getItem('theme') || 'light';
body.setAttribute('data-theme', savedTheme);

themeToggle.addEventListener('click', () => {
    const currentTheme = body.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    
    body.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
});

// ===== 移动端导航栏切换 =====
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');

navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
});

// 点击导航链接后关闭移动端菜单
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
    });
});

// ===== 表单提交处理 =====
const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // 获取表单数据
    const formData = new FormData(contactForm);
    const name = contactForm.querySelector('input[type="text"]').value;
    const email = contactForm.querySelector('input[type="email"]').value;
    const subject = contactForm.querySelectorAll('input[type="text"]')[1].value;
    const message = contactForm.querySelector('textarea').value;
    
    // 这里可以集成真实的表单提交逻辑
    // 例如使用 EmailJS、Formspree 或自己的后端 API
    
    console.log('表单提交:', { name, email, subject, message });
    
    // 显示成功消息
    alert('感谢您的留言！我会尽快回复您。');
    
    // 重置表单
    contactForm.reset();
});

// ===== 平滑滚动增强 =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        
        if (target) {
            const navHeight = document.querySelector('.navbar').offsetHeight;
            const targetPosition = target.offsetTop - navHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ===== 滚动时导航栏样式变化 =====
let lastScroll = 0;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll <= 0) {
        navbar.style.boxShadow = '0 2px 10px var(--shadow)';
        return;
    }
    
    if (currentScroll > lastScroll && currentScroll > 100) {
        // 向下滚动 - 隐藏导航栏
        navbar.style.transform = 'translateY(-100%)';
    } else {
        // 向上滚动 - 显示导航栏
        navbar.style.transform = 'translateY(0)';
        navbar.style.boxShadow = '0 2px 20px var(--shadow)';
    }
    
    lastScroll = currentScroll;
});

// ===== 滚动动画（简单版本）=====
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// 观察所有需要动画的元素
document.querySelectorAll('.skill-item, .project-card, .stat-item, .contact-item').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
    observer.observe(el);
});

// ===== 打字机效果（可选）=====
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// 如果想要打字机效果，可以取消注释下面这行
// typeWriter(document.querySelector('.hero-title'), '你好，我是一名开发者', 80);

// ===== 页面加载完成后的初始化 =====
window.addEventListener('load', () => {
    // 添加页面加载动画
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s';
        document.body.style.opacity = '1';
    }, 100);
    
    console.log('🎉 个人网站加载完成！');
    console.log('💡 提示：点击右上角🌗按钮切换深色/浅色主题');
});

// ===== 项目卡片点击效果（可选）=====
document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('click', function(e) {
        // 如果点击的是链接，不触发卡片点击
        if (e.target.tagName === 'A' || e.target.closest('a')) {
            return;
        }
        
        // 可以在这里添加卡片点击后的行为
        console.log('项目卡片被点击:', this.querySelector('.project-title').textContent);
    });
});

// ===== 统计数字动画 =====
function animateNumbers() {
    const stats = document.querySelectorAll('.stat-number');
    
    stats.forEach(stat => {
        const target = parseInt(stat.textContent);
        const suffix = stat.textContent.includes('+') ? '+' : 
                      stat.textContent.includes('%') ? '%' : '';
        let current = 0;
        const increment = target / 50;
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            stat.textContent = Math.floor(current) + suffix;
        }, 30);
    });
}

// 当统计区域进入视口时触发动画
const statsSection = document.querySelector('.about-stats');
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateNumbers();
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

if (statsSection) {
    statsObserver.observe(statsSection);
}
