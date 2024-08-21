(function() {
    // 创建canvas并添加到body
    const canvas = document.createElement('canvas');
    document.body.appendChild(canvas);
    const ctx = canvas.getContext('2d');

    // 设置canvas的大小
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    // 马卡龙颜色数组
    const colors = ['#ffadc6', '#ffd1b8', '#fff4ba', '#b3e5c7', '#c4d7f4'];
    let particlesArray = [];

    // 粒子类
    class Particle {
        constructor(x, y) {
            this.x = x;
            this.y = y;
            this.size = Math.random() * 10 + 5;
            this.color = colors[Math.floor(Math.random() * colors.length)];
            this.speedX = (Math.random() * 3) - 1.5;
            this.speedY = (Math.random() * 3) - 1.5;
            this.gravity = 0.05;
            this.alpha = 1;
        }

        update() {
            this.x += this.speedX;
            this.y += this.speedY;
            this.speedY += this.gravity;
            this.alpha -= 0.02;
            if (this.alpha < 0) this.alpha = 0;
        }

        draw() {
            ctx.globalAlpha = this.alpha;
            ctx.fillStyle = this.color;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
            ctx.globalAlpha = 1;
        }
    }

    function createParticles(x, y) {
        for (let i = 0; i < 10; i++) {
            particlesArray.push(new Particle(x, y));
        }
    }

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particlesArray.forEach((particle, index) => {
            particle.update();
            particle.draw();
            if (particle.alpha <= 0) {
                particlesArray.splice(index, 1);
            }
        });
        requestAnimationFrame(animate);
    }

    // 监听鼠标点击事件，生成粒子
    document.addEventListener('click', function(event) {
        createParticles(event.clientX, event.clientY);
    });

    // 开始动画
    animate();
})();
