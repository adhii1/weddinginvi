/**
 * Interactive HTML5 Scratch-to-Reveal Card Module
 */
class ScratchRevealCard {
    constructor() {
        this.canvas = null;
        this.ctx = null;
        this.isDrawing = false;
        this.isRevealed = false;
    }

    init(canvasId, containerId) {
        this.canvas = document.getElementById(canvasId);
        if (!this.canvas) return;
        this.ctx = this.canvas.getContext('2d');
        const container = document.getElementById(containerId);

        // Match container bounds
        const rect = container.getBoundingClientRect();
        this.canvas.width = rect.width || 320;
        this.canvas.height = rect.height || 90;

        this.drawScratchLayer();

        // Mouse & Touch events
        const startScratch = (e) => {
            this.isDrawing = true;
            this.scratch(e);
        };
        const endScratch = () => {
            this.isDrawing = false;
            this.checkRevealPercentage();
        };
        const doScratch = (e) => {
            if (this.isDrawing) this.scratch(e);
        };

        this.canvas.addEventListener('mousedown', startScratch);
        this.canvas.addEventListener('touchstart', startScratch, { passive: true });

        window.addEventListener('mouseup', endScratch);
        window.addEventListener('touchend', endScratch);

        this.canvas.addEventListener('mousemove', doScratch);
        this.canvas.addEventListener('touchmove', doScratch, { passive: true });

        // Tap fallback to reveal immediately if tapped twice
        let tapCount = 0;
        this.canvas.addEventListener('click', () => {
            tapCount++;
            if (tapCount >= 2 || this.isRevealed) {
                this.revealFully();
            }
        });
    }

    drawScratchLayer() {
        const w = this.canvas.width;
        const h = this.canvas.height;
        
        // Metallic Champagne Gold Foil Gradient
        const grad = this.ctx.createLinearGradient(0, 0, w, h);
        grad.addColorStop(0, '#F9E8BF');
        grad.addColorStop(0.3, '#DFC486');
        grad.addColorStop(0.5, '#FFF8E6');
        grad.addColorStop(0.8, '#C9A45C');
        grad.addColorStop(1, '#B8974B');

        this.ctx.fillStyle = grad;
        this.ctx.fillRect(0, 0, w, h);

        // Subtle champagne sparkles & readable English text
        this.ctx.fillStyle = '#2A3A2E';
        this.ctx.font = '600 13px Poppins, sans-serif';
        this.ctx.textAlign = 'center';
        this.ctx.textBaseline = 'middle';
        this.ctx.fillText('✦ SCRATCH TO REVEAL ✦', w / 2, h / 2);
    }

    scratch(e) {
        if (this.isRevealed) return;
        const rect = this.canvas.getBoundingClientRect();
        const clientX = e.touches ? e.touches[0].clientX : e.clientX;
        const clientY = e.touches ? e.touches[0].clientY : e.clientY;
        const x = clientX - rect.left;
        const y = clientY - rect.top;

        this.ctx.globalCompositeOperation = 'destination-out';
        this.ctx.beginPath();
        this.ctx.arc(x, y, 22, 0, Math.PI * 2);
        this.ctx.fill();
    }

    checkRevealPercentage() {
        if (this.isRevealed) return;
        const imageData = this.ctx.getImageData(0, 0, this.canvas.width, this.canvas.height);
        const pixels = imageData.data;
        let transparentPixels = 0;

        for (let i = 3; i < pixels.length; i += 4) {
            if (pixels[i] === 0) transparentPixels++;
        }

        const percentage = (transparentPixels / (pixels.length / 4)) * 100;
        if (percentage > 40) {
            this.revealFully();
        }
    }

    revealFully() {
        if (this.isRevealed) return;
        this.isRevealed = true;
        this.canvas.style.transition = 'opacity 0.6s ease';
        this.canvas.style.opacity = '0';
        setTimeout(() => {
            this.canvas.style.display = 'none';
        }, 600);
    }
}

window.scratchRevealCard = new ScratchRevealCard();
