const canvas = document.getElementById('confetti');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let confettiPieces = [];

class Confetti {
    constructor(x, y, velocity) {
        this.x = x;
        this.y = y;
        this.size = Math.random() * 10 + 5;
        this.color = `hsl(${Math.random() * 360}, 100%, 50%)`;
        this.velocity = velocity || {
            x: (Math.random() - 0.5) * 4,
            y: Math.random() * 5 + 2
        };
        this.rotation = Math.random() * 360;
        this.rotationSpeed = Math.random() * 5;
        this.gravity = 0.1;
    }

    draw() {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.rotation * Math.PI / 180);
        ctx.fillStyle = this.color;
        ctx.fillRect(-this.size / 2, -this.size / 2, this.size, this.size);
        ctx.restore();
    }

    update() {
        this.x += this.velocity.x;
        this.y += this.velocity.y;
        this.velocity.y += this.gravity;
        this.rotation += this.rotationSpeed;

        if (this.y > canvas.height || this.x < 0 || this.x > canvas.width) {
            this.x = Math.random() * canvas.width;
            this.y = -this.size;
            this.velocity.y = Math.random() * 5 + 2;
        }
    }
}

function shootConfetti() {
    const cannonLeft = { x: canvas.width * 0.2, y: canvas.height };
    const cannonRight = { x: canvas.width * 0.8, y: canvas.height };

    for (let i = 0; i < 50; i++) {
        confettiPieces.push(new Confetti(cannonLeft.x, cannonLeft.y, { x: (Math.random() - 0.5) * 10, y: -Math.random() * 20 - 10 }));
        confettiPieces.push(new Confetti(cannonRight.x, cannonRight.y, { x: (Math.random() - 0.5) * 10, y: -Math.random() * 20 - 10 }));
    }
}

function init() {
    for (let i = 0; i < 100; i++) {
        confettiPieces.push(new Confetti(Math.random() * canvas.width, Math.random() * canvas.height));
    }
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    confettiPieces.forEach(confetti => {
        confetti.draw();
        confetti.update();
    });
    requestAnimationFrame(animate);
}

init();
animate();
setInterval(shootConfetti, 2000);

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});