document.addEventListener('DOMContentLoaded', () => {
            const startBtn = document.getElementById('startButton');
            const btnLabel = document.getElementById('btnLabel');
            
            let isTransitioning = false;
            const originalText = 'START';
            const glitchChars = '!<>-_\\/[]{}—=+*^?#01';

            function navigateToExplain(wasGlitched) {
                setTimeout(() => {
                    window.location.href = 'explain.HTML';
                }, wasGlitched ? 300 : 100); // slightly longer pause if it glitched so you can see it!
            }

            function handleStartClick() {
                if (isTransitioning) return;
                isTransitioning = true;

                // trigger chance
                const shouldGlitch = Math.random() < 0.3;

                if (shouldGlitch) {
                    // Apply glitch
                    startBtn.classList.add('glitching-active');

                    // scramble 
                    let scrambleCount = 0;
                    const scrambleInterval = setInterval(() => {
                        scrambleCount++;
                        let scrambled = '';
                        for (let i = 0; i < originalText.length; i++) {
                            if (Math.random() < 0.65) {
                                scrambled += glitchChars[Math.floor(Math.random() * glitchChars.length)];
                            } else {
                                scrambled += originalText[i];
                            }
                        }
                        btnLabel.textContent = scrambled;

                        if (scrambleCount >= 10) {
                            clearInterval(scrambleInterval);
                            btnLabel.textContent = '01001';
                        }
                    }, 50);

                    // after 650ms button-glitch sequence complete
                    setTimeout(() => {
                        navigateToExplain(true);
                    }, 650);
                } else {
                    navigateToExplain(false);
                }
            }

            startBtn.addEventListener('click', handleStartClick);
        });