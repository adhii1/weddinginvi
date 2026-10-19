/**
 * Live Wedding Countdown Timer Module
 */
class LiveCountdownTimer {
    constructor() {
        this.timerInterval = null;
        this.daysEl = null;
        this.hoursEl = null;
        this.minutesEl = null;
        this.secondsEl = null;
    }

    init() {
        this.daysEl = document.getElementById('count-days');
        this.hoursEl = document.getElementById('count-hours');
        this.minutesEl = document.getElementById('count-minutes');
        this.secondsEl = document.getElementById('count-seconds');

        if (!this.daysEl || !this.hoursEl || !this.minutesEl || !this.secondsEl) {
            console.warn("Countdown elements missing in DOM");
            return;
        }

        this.updateCountdown();
        this.timerInterval = setInterval(() => this.updateCountdown(), 1000);
    }

    updateCountdown() {
        const targetDate = new Date(window.weddingDetails?.weddingDateISO || "2026-11-16T09:30:00").getTime();
        const now = new Date().getTime();
        const difference = targetDate - now;

        if (difference <= 0) {
            this.setValues("00", "00", "00", "00");
            if (this.timerInterval) clearInterval(this.timerInterval);
            return;
        }

        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);

        this.setValues(
            this.formatNumber(days),
            this.formatNumber(hours),
            this.formatNumber(minutes),
            this.formatNumber(seconds)
        );
    }

    formatNumber(num) {
        return num < 10 ? `0${num}` : `${num}`;
    }

    setValues(days, hours, minutes, seconds) {
        this.updateDigit(this.daysEl, days);
        this.updateDigit(this.hoursEl, hours);
        this.updateDigit(this.minutesEl, minutes);
        this.updateDigit(this.secondsEl, seconds);
    }

    updateDigit(element, newValue) {
        if (element.textContent !== newValue) {
            element.classList.add('digit-flip');
            element.textContent = newValue;
            setTimeout(() => element.classList.remove('digit-flip'), 300);
        }
    }
}

window.liveCountdownTimer = new LiveCountdownTimer();
