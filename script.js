// 妆点 - 简洁版交互脚本

document.addEventListener('DOMContentLoaded', () => {

    // ========== 轮播逻辑 ==========
    const heroContent = document.getElementById('heroContent');
    const thumbnails = document.querySelectorAll('.thumbnail');
    const prevBtn = document.querySelector('.hero-prev');
    const nextBtn = document.querySelector('.hero-next');

    // 作品数据
    const works = [
        '作品 1',
        '作品 2',
        '作品 3',
        '作品 4',
        '作品 5',
        '作品 6'
    ];

    let currentIndex = 0;

    // 更新主显示区
    function updateHero(index) {
        // 边界处理
        if (index < 0) index = works.length - 1;
        if (index >= works.length) index = 0;

        currentIndex = index;
        heroContent.querySelector('.placeholder-text').textContent = works[index];

        // 更新缩略图 active 状态
        thumbnails.forEach((thumb, i) => {
            thumb.classList.toggle('active', i === index);
        });
    }

    // 下一张
    nextBtn.addEventListener('click', () => {
        updateHero(currentIndex + 1);
    });

    // 上一张
    prevBtn.addEventListener('click', () => {
        updateHero(currentIndex - 1);
    });

    // 缩略图点击
    thumbnails.forEach((thumb, i) => {
        thumb.addEventListener('click', () => {
            updateHero(i);
        });
    });

    // 主显示区点击 -> 下一张
    heroContent.addEventListener('click', () => {
        updateHero(currentIndex + 1);
    });

    // ========== 键盘快捷键 ==========
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') {
            updateHero(currentIndex - 1);
        } else if (e.key === 'ArrowRight') {
            updateHero(currentIndex + 1);
        }
    });

    // ========== 初始化 ==========
    updateHero(0);

    console.log('✨ 妆点 - 简洁版已加载');
    console.log('💡 提示：按左右箭头键切换作品');
});
