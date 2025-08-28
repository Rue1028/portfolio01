document.addEventListener('DOMContentLoaded', function() {
    // 导航菜单切换
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');

    if (navToggle) {
        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            navToggle.classList.toggle('active');
        });
    }

    // 导航链接点击后关闭菜单（移动端）
    const navLinks = document.querySelectorAll('.nav-menu a');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (window.innerWidth <= 768) {
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
            }

            // 点击时高亮
        navLinks.forEach(l => l.classList.remove('active')); // 先清除所有
        this.classList.add('active'); // 给当前点击的加上
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

    // 滚动时激活对应的导航链接
    window.addEventListener('scroll', function() {
        const sections = document.querySelectorAll('section');
        const navLinks = document.querySelectorAll('.nav-menu a');
        
        let current = '';
        
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

    // 滚动动画
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
    checkFade(); // 初始检查


    // 视频播放控制
    const videos = document.querySelectorAll('video');
    const playButtons = document.querySelectorAll('.play-video-btn');
    
    if (videos.length > 0 && playButtons.length > 0) {
        playButtons.forEach((button, index) => {
            if (index < videos.length) {
                button.addEventListener('click', function() {
                    const video = videos[index];
                    if (video.paused) {
                        video.play();
                        this.innerHTML = '<i class="fas fa-pause"></i>';
                    } else {
                        video.pause();
                        this.innerHTML = '<i class="fas fa-play"></i>';
                    }
                });
            }
        });
    }

    // 图片懒加载
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
        
        lazyImages.forEach(img => {
            imageObserver.observe(img);
        });
    }




    // 表单验证
    const contactForm = document.querySelector('.contact-form form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            let isValid = true;
            const inputs = this.querySelectorAll('input, textarea');
            
            inputs.forEach(input => {
                if (input.hasAttribute('required') && !input.value.trim()) {
                    isValid = false;
                    input.classList.add('error');
                } else {
                    input.classList.remove('error');
                }
                
                if (input.type === 'email' && input.value.trim()) {
                    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                    if (!emailPattern.test(input.value.trim())) {
                        isValid = false;
                        input.classList.add('error');
                    }
                }
            });
            
            if (isValid) {
                // 模拟表单提交成功
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
        
        // 实时验证
        const inputs = contactForm.querySelectorAll('input, textarea');
        inputs.forEach(input => {
            input.addEventListener('blur', function() {
                if (this.hasAttribute('required') && !this.value.trim()) {
                    this.classList.add('error');
                } else {
                    this.classList.remove('error');
                }
                
                if (this.type === 'email' && this.value.trim()) {
                    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                    if (!emailPattern.test(this.value.trim())) {
                        this.classList.add('error');
                    }
                }
            });
        });
    }

    // 微信二维码点击放大
    const qr = document.getElementById("wechatQR");
    const modal = document.getElementById("imageModal");
    const modalImg = document.getElementById("modalImg");
    const closeBtn = document.querySelector(".modal .close");

    // 点击二维码显示模态框
    if (qr && modal && modalImg) {
        qr.addEventListener("click", function() {
            modal.style.display = "block";
            modalImg.src = this.src;
            modalImg.alt = this.alt;
            
            // 禁止页面滚动
            document.body.style.overflow = 'hidden';
            
            // 添加键盘监听（ESC键关闭）
            document.addEventListener('keydown', handleEscKey);
        });
    }

    // 点击关闭按钮
    if (closeBtn && modal) {
        closeBtn.addEventListener("click", function() {
            closeModal();
        });
    }

    // 点击模态框空白处关闭
    if (modal) {
        modal.addEventListener("click", function(e) {
            if (e.target === modal) {
                closeModal();
            }
        });
    }

      // 关闭模态框的统一函数
    function closeModal() {
        if (modal) {
            modal.style.display = "none";
            document.body.style.overflow = 'auto'; // 恢复页面滚动
            document.removeEventListener('keydown', handleEscKey);
        }
    }

    // ESC键关闭功能
    function handleEscKey(e) {
        if (e.key === 'Escape' && modal && modal.style.display === 'block') {
            closeModal();
        }
    }

    // 防止模态框内容被点击时关闭
    const modalContent = document.querySelector('.modal-content');
    if (modalContent) {
        modalContent.addEventListener('click', function(e) {
            e.stopPropagation();
        });
    }

    // 全屏视频按钮功能
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

document.getElementById('fullscreenBtn').addEventListener('click', function() {
    const video = document.getElementById('mainVideo');
    if (video.requestFullscreen) {
        video.requestFullscreen();
    } else if (video.webkitRequestFullscreen) { // Safari
        video.webkitRequestFullscreen();
    } else if (video.msRequestFullscreen) { // IE/Edge
        video.msRequestFullscreen();
    }
});

        // 汉堡菜单切换
        const hamburger = document.querySelector('.hamburger');
        const navMenu = document.querySelector('.nav-menu');
    
        hamburger.addEventListener('click', () => {
            navMenu.classList.toggle('active');
});


