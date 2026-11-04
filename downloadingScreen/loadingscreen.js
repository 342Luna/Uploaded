// destination link
const DESTINATION_URL = "gettingPulledIn.html"; 
const TOTAL_SIZE_MB = 450;

// getting elements
const progressFill = document.getElementById('progress-fill');
const percentageText = document.getElementById('percentage');
const statusText = document.getElementById('status-text');
const subStatusText = document.getElementById('sub-status');
const statSpeed = document.getElementById('stat-speed');
const statSize = document.getElementById('stat-size');
const statTime = document.getElementById('stat-time');
const continueBtn = document.getElementById('continue-btn');
const downloadIcon = document.getElementById('download-icon');
const completeIcon = document.getElementById('complete-icon');
const badge = document.getElementById('badge');

let progress = 0;
let downloadInterval;

function startDownload() {
    progress = 0;
    progressFill.style.width = '0%';
    percentageText.innerText = '0%';
    statusText.innerText = 'Downloading...';
    
    downloadInterval = setInterval(() => {
        const increment = Math.random() * 6 + 2;
        progress += increment;

        if (progress >= 100) {
            progress = 100;
            clearInterval(downloadInterval);
            completeDownload();
        }

        // Calculate statistics
        const currentMB = Math.floor((progress / 100) * TOTAL_SIZE_MB);
        const speed = (Math.random() * 8 + 4).toFixed(1); 
        const remainingMB = TOTAL_SIZE_MB - currentMB;
        const remainingSecs = Math.ceil(remainingMB / speed);

        // Update UI
        progressFill.style.width = `${progress}%`; // I did not forget to put the `` thingies :D
        percentageText.innerText = `${Math.floor(progress)}%`;
        statSpeed.innerText = `${speed} MB/s`;
        statSize.innerText = `${currentMB} / ${TOTAL_SIZE_MB} MB`;
        statTime.innerText = progress === 100 ? '0s' : `${remainingSecs}s`;

    }, 300);
}

function completeDownload() {
    statusText.innerText = 'Download Complete!';
    subStatusText.innerText = 'Package verified successfully.';
    
    // Change badge style 
    badge.innerText = 'Ready';
    badge.className = 'text-xs font-normal px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20';

    // Toggle Icons
    downloadIcon.classList.add('hidden');
    completeIcon.classList.remove('hidden');

    // Enable button (slightly important ;-;)
    continueBtn.disabled = false;
    continueBtn.className = 'w-full py-3.5 px-6 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold rounded-xl transition-all duration-300 cursor-pointer shadow-lg shadow-cyan-500/25 flex items-center justify-center space-x-2';
    continueBtn.innerHTML = '<span>Continue</span>';
}

// Click Continue -> Glitch -> Redirect
continueBtn.addEventListener('click', () => {
    if (continueBtn.disabled) return;

    // Trigger glitch effect
    document.body.classList.add('glitching-active');

    // Wait for glitch animation then change page
    setTimeout(() => {
        window.location.href = DESTINATION_URL;
    }, 800);
});

// Start download when page loads
startDownload();