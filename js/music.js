/**
 * Music Controller with Web Audio Synthesizer (Indian Wedding Melodic Ambient Synth)
 */
class WeddingMusicPlayer {
    constructor() {
        this.isPlaying = false;
        this.audioCtx = null;
        this.audioElement = null;
        this.synthInterval = null;
        this.button = null;
        this.noteIndex = 0;
        
        // Raga Bhupali / Mohanam pentatonic scale notes (Hz) for wedding ambient melody
        // C4, D4, E4, G4, A4, C5, D5, E5
        this.scale = [261.63, 293.66, 329.63, 392.00, 440.00, 523.25, 587.33, 659.25];
        this.melody = [0, 2, 3, 4, 5, 4, 3, 2, 0, 3, 4, 5, 7, 5, 4, 3];
    }

    init(buttonId) {
        this.button = document.getElementById(buttonId);
        if (this.button) {
            this.button.addEventListener('click', () => this.toggle());
        }

        // Check if custom audio file exists
        this.audioElement = new Audio();
        this.audioElement.src = 'assets/audio/alaipayuthey_flute.mp3';
        this.audioElement.loop = true;
        this.audioElement.volume = 0.5;
    }

    async toggle() {
        if (this.isPlaying) {
            this.pause();
        } else {
            await this.play();
        }
    }

    async play() {
        try {
            // Attempt playing MP3 audio first
            const playPromise = this.audioElement.play();
            if (playPromise !== undefined) {
                await playPromise;
                this.isPlaying = true;
                this.updateUI();
                return;
            }
        } catch (e) {
            console.log("Audio file playback blocked or missing. Launching Web Audio Indian Flute Synthesizer...", e);
        }

        // Web Audio Synthesizer Fallback
        if (!this.audioCtx) {
            const AudioContext = window.AudioContext || window.webkitAudioContext;
            this.audioCtx = new AudioContext();
        }
        if (this.audioCtx.state === 'suspended') {
            await this.audioCtx.resume();
        }

        this.isPlaying = true;
        this.startSynthMelody();
        this.updateUI();
    }

    pause() {
        this.isPlaying = false;
        if (this.audioElement) {
            this.audioElement.pause();
        }
        if (this.synthInterval) {
            clearInterval(this.synthInterval);
            this.synthInterval = null;
        }
        this.updateUI();
    }

    startSynthMelody() {
        if (this.synthInterval) clearInterval(this.synthInterval);
        
        // Play ambient tanpura drone + flute notes every 800ms
        this.playDrone();
        this.synthInterval = setInterval(() => {
            if (!this.isPlaying) return;
            const scaleIdx = this.melody[this.noteIndex % this.melody.length];
            const freq = this.scale[scaleIdx];
            this.playFluteNote(freq);
            this.noteIndex++;
        }, 900);
    }

    playFluteNote(freq) {
        if (!this.audioCtx) return;
        const now = this.audioCtx.currentTime;
        
        const osc = this.audioCtx.createOscillator();
        const gain = this.audioCtx.createGain();

        osc.type = 'sine'; // Soft flute sine wave
        osc.frequency.setValueAtTime(freq, now);

        // Soft envelope: attack 0.2s, decay 0.6s
        gain.gain.setValueAtTime(0.001, now);
        gain.gain.linearRampToValueAtTime(0.12, now + 0.2);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.85);

        osc.connect(gain);
        gain.connect(this.audioCtx.destination);

        osc.start(now);
        osc.stop(now + 0.9);
    }

    playDrone() {
        if (!this.audioCtx) return;
        const now = this.audioCtx.currentTime;
        // Low C3 drone (130.81 Hz)
        const osc = this.audioCtx.createOscillator();
        const gain = this.audioCtx.createGain();

        osc.type = 'triangle';
        osc.frequency.setValueAtTime(130.81, now);

        gain.gain.setValueAtTime(0.03, now);

        osc.connect(gain);
        gain.connect(this.audioCtx.destination);
        osc.start(now);
    }

    updateUI() {
        if (!this.button) return;
        if (this.isPlaying) {
            this.button.classList.add('playing');
            this.button.setAttribute('aria-label', 'Mute Music');
            this.button.innerHTML = `
                <span class="music-icon">🔊</span>
                <span class="music-waves">
                    <span></span><span></span><span></span>
                </span>
            `;
        } else {
            this.button.classList.remove('playing');
            this.button.setAttribute('aria-label', 'Play Music');
            this.button.innerHTML = `
                <span class="music-icon">🔇</span>
            `;
        }
    }
}

window.weddingMusicPlayer = new WeddingMusicPlayer();
