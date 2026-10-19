/**
 * envelope.js — Wedding Envelope Opening Interaction
 *
 * Closed Burgundy Envelope Opening Directly into Existing First Page:
 *   1. Opening screen: Closed burgundy-red envelope with K & S gold seal.
 *   2. On single click/tap:
 *      - Seal releases smoothly.
 *      - Left and right panels swing outward from the center.
 *      - The existing first invitation page is revealed immediately.
 *      - Visitor lands directly on the existing first page.
 *   3. Zero intermediate cards, preview pages, or duplicate screens.
 */

(function () {
    'use strict';

    // Guard: ensure single opening sequence
    let hasOpened = false;

    // Timing constants (ms) — direct, elegant, seamless opening
    const T = {
        PRESS_EFFECT:  40,   // Tactile press response
        SEAL_RELEASE:  60,   // Center seal releases
        PANEL_OPEN:    90,   // Left & right doors swing open outward
        REVEAL_PAGE:  240,   // Immediate dissolve revealing Page 1 directly
        COMPLETE:     780,   // Overlay removed, viewport scroll unlocked, Page 1 active
    };

    function onReady(fn) {
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', fn);
        } else {
            fn();
        }
    }

    onReady(function () {
        const overlay     = document.getElementById('envelope-intro');
        const clickable   = document.getElementById('env-clickable');
        const panelLeft   = document.getElementById('env-panel-left');
        const panelRight  = document.getElementById('env-panel-right');
        const envSeal     = document.getElementById('env-seal');
        const tapHint     = document.querySelector('.env-tap-hint');
        const container   = document.getElementById('invitation-container');
        const firstScreen = document.getElementById('screen-welcome');

        if (!overlay || !clickable) return;

        // 1. Lock scrolling on invitation container & body while envelope is closed
        if (container) {
            container.style.overflow = 'hidden';
            container.style.pointerEvents = 'none';
        }
        document.body.style.overflow = 'hidden';

        // 2. Keyboard accessibility (Enter / Space)
        clickable.addEventListener('keydown', function (e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                triggerOpen();
            }
        });

        // 3. Touch / Click on the envelope or seal
        overlay.addEventListener('click', triggerOpen);
        overlay.addEventListener('touchend', function (e) {
            e.preventDefault();
            triggerOpen();
        }, { passive: false });

        // 4. Direct opening sequence into existing Page 1
        function triggerOpen() {
            if (hasOpened) return;
            hasOpened = true;

            // Block duplicate clicks
            overlay.style.pointerEvents = 'none';

            // Tactile feedback
            clickable.classList.add('opening');
            clickable.classList.add('stage-pressed');

            // Hide tap instruction immediately
            if (tapHint) {
                tapHint.classList.add('hint-hide');
            }

            // Step 1: Center wax seal releases
            setTimeout(function () {
                if (envSeal) {
                    envSeal.classList.add('seal-release');
                }
            }, T.SEAL_RELEASE);

            // Step 2: Left and right panels swing open outward from the center
            setTimeout(function () {
                if (panelLeft) {
                    panelLeft.classList.add('panel-open');
                }
                if (panelRight) {
                    panelRight.classList.add('panel-open');
                }
            }, T.PANEL_OPEN);

            // Step 3: Reveal existing first invitation page immediately as part of the opening
            setTimeout(function () {
                overlay.classList.add('env-exit');

                // Pre-activate first screen so it appears seamlessly
                if (firstScreen) {
                    firstScreen.classList.add('screen-active');
                }

                // Play wedding music on first guest interaction
                if (window.weddingMusicPlayer && !window.weddingMusicPlayer.isPlaying) {
                    try {
                        window.weddingMusicPlayer.play();
                    } catch (err) {
                        /* Ignore if audio context not ready */
                    }
                }
            }, T.REVEAL_PAGE);

            // Step 4: Complete reveal — land directly on existing Page 1
            setTimeout(function () {
                overlay.classList.add('env-hidden');

                // Unlock invitation container and scroll snapping
                if (container) {
                    container.style.overflow = '';
                    container.style.pointerEvents = '';
                    container.scrollTop = 0;
                }

                // Unlock document body
                document.body.style.overflow = '';

                // Ensure first screen is fully active
                if (firstScreen) {
                    firstScreen.classList.add('screen-active');
                }
            }, T.COMPLETE);
        }
    });

}());
