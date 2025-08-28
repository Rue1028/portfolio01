document.addEventListener('DOMContentLoaded', function() { 

    // ---------------- 导航菜单切换 ----------------
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (navToggle) {
        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            navToggle.classList.toggle('active');
        });
    }

    // 导航链接点击后关闭菜单（移动端）并高亮
    const navLinks = document.querySelectorAll('.nav-menu a');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (window.innerWidth <= 768) {
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
            }
            navLinks.forEach(l => l.classList.remove('active'));
            this.classList.add('active');
        });
    });

    // 滚动时导航栏样式变化
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 50) {
            navbar.style.padding = '10px 0';
            navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.padding = '15px 0';
            navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.05)';
        }
    });

    // 滚动时激活对应导航链接
    window.addEventListener('scroll', function() {
        let current = '';
        const sections = document.querySelectorAll('section');

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (window.scrollY >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + current) {
                link.classList.add('active');
            }
        });
    });

    // ---------------- 滚动动画 ----------------
    const fadeElements = document.querySelectorAll('.fade-in');
    
    function checkFade() {
        fadeElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementVisible = 150;
            if (elementTop < window.innerHeight - elementVisible) {
                element.classList.add('visible');
            }
        });
    }
    window.addEventListener('scroll', checkFade);
    checkFade(); // 页面加载时检查一次

    // ---------------- 视频播放控制 ----------------
    function syncCardHeight() {
        const video = document.getElementById('mainVideo');
        const card = document.getElementById('interactionCard');

        if (video && card) {
            video.addEventListener('loadedmetadata', () => {
                card.style.height = video.clientHeight + 'px';
            });

            window.addEventListener('resize', () => {
                card.style.height = video.clientHeight + 'px';
            });
        }
    }
    syncCardHeight();

    // ---------------- 图片懒加载 ----------------
    const lazyImages = document.querySelectorAll('img[data-src]');
    if (lazyImages.length > 0) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    imageObserver.unobserve(img);
                }
            });
        });
        lazyImages.forEach(img => imageObserver.observe(img));
    }

    // ---------------- 表单验证 ----------------
    const contactForm = document.querySelector('.contact-form form');
    if (contactForm) {
        const inputs = contactForm.querySelectorAll('input, textarea');

        function validateInput(input) {
            let valid = true;
            if (input.hasAttribute('required') && !input.value.trim()) valid = false;
            if (input.type === 'email' && input.value.trim()) {
                const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailPattern.test(input.value.trim())) valid = false;
            }
            if (!valid) input.classList.add('error');
            else input.classList.remove('error');
            return valid;
        }

        inputs.forEach(input => {
            input.addEventListener('blur', () => validateInput(input));
        });

        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            let isValid = true;
            inputs.forEach(input => {
                if (!validateInput(input)) isValid = false;
            });
            if (isValid) {
                const submitButton = this.querySelector('.btn-submit');
                const originalText = submitButton.textContent;
                submitButton.disabled = true;
                submitButton.textContent = '提交中...';
                setTimeout(() => {
                    submitButton.textContent = '提交成功！';
                    this.reset();
                    setTimeout(() => {
                        submitButton.disabled = false;
                        submitButton.textContent = originalText;
                    }, 2000);
                }, 1500);
            }
        });
    }

    // ---------------- 模态框二维码 ----------------
    const modal = document.getElementById("qrModal");
    const btn = document.getElementById("showQr");
    const modalContent = document.querySelector('.modal-content');

    if (btn && modal && modalContent) {
        // 点击按钮显示
        btn.addEventListener('click', function(e) {
            e.stopPropagation();
            modal.style.display = 'flex';
            document.body.style.overflow = 'hidden'; // 禁止背景滚动
        });

        // 点击背景关闭
        modal.addEventListener('click', function() {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        });

        // 点击内容区域不关闭
        modalContent.addEventListener('click', function(e) {
            e.stopPropagation();
        });

        // ESC 键关闭
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && modal.style.display !== 'none') {
                modal.style.display = 'none';
                document.body.style.overflow = 'auto';
            }
        });
    }

    // ---------------- 全屏视频按钮 ----------------
    const fullscreenBtn = document.getElementById('fullscreenBtn');
    const mainVideo = document.getElementById('mainVideo');
    if (fullscreenBtn && mainVideo) {
        fullscreenBtn.addEventListener('click', function() {
            if (mainVideo.requestFullscreen) {
                mainVideo.requestFullscreen();
            } else if (mainVideo.webkitRequestFullscreen) { // Safari
                mainVideo.webkitRequestFullscreen();
            } else if (mainVideo.msRequestFullscreen) { // IE/Edge
                mainVideo.msRequestFullscreen();
            }
        });
    }

});

const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
});
