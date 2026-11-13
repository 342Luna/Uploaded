document.addEventListener('DOMContentLoaded', () => {
            const startBtn = document.getElementById('startButton');
            const btnLabel = document.getElementById('btnLabel');
            const navToast = document.getElementById('navToast');
            
            let isTransitioning = false;
            const originalText = 'START';
            const glitchChars = '!<>-_\\/[]{}—=+*^?#01';

            function navigateToExplain(wasGlitched) {
                navToast.classList.remove('opacity-0');

                const isSandboxedPreview = window.location.protocol === 'about:' || 
                                           window.location.protocol === 'blob:' || 
                                           window.location.protocol === 'data:';

                if (!isSandboxedPreview) {
                    try {
                        window.location.assign('explain.HTML');
                    } catch (err) {
                        navToast.textContent = 'Ready to load explain.HTML (Preview Mode)';
                    }
                } else {
                    navToast.textContent = wasGlitched 
                        ? 'Glitch triggered (20% roll)! → explain.HTML' 
                        : 'Normal start (80% roll) → explain.HTML';
                    
                    setTimeout(() => {
                        startBtn.classList.remove('glitching-active');
                        btnLabel.textContent = originalText;
                        isTransitioning = false;
                    }, 400);
                }
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

                    // Navigate after the 650ms button glitch sequence completes
                    setTimeout(() => {
                        navigateToExplain(true);
                    }, 650);
                } else {
                    navigateToExplain(false);
                }
            }

            startBtn.addEventListener('click', handleStartClick);
        });