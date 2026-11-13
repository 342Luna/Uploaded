<?php
session_start();

// Default character
$defaultState = [
    'skinColor'  => '#f5cba7',
    'hairStyle'  => 'spiky',
    'hairColor'  => '#3b2f2f',
    'eyeStyle'   => 'round',
    'eyeColor'   => '#2563eb',
    'shirtStyle' => 'tshirt',
    'shirtColor' => '#6366f1',
    'pantsStyle' => 'jeans',
    'pantsColor' => '#1e293b'
];

// save state with $_SESSION
if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['save_character'])) {
    $input = json_decode(file_get_contents('php://input'), true);
    if ($input) {
        $_SESSION['character'] = array_merge($defaultState, $input);
        echo json_encode(['status' => 'success']);
        exit;
    }
}

// Load session data 
$charState = $_SESSION['character'] ?? $defaultState;
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Uploaded</title>
    <link rel="icon" type="image/x-icon" href="../../../intro/Pictures/borderIcon.png">
    <script src="https://cdn.tailwindcss.com"></script>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="style.css">
    <!-- PHP session -> JavaScript -->
    <script>
      window.initialCharacterState = <?php echo json_encode($charState); ?>;
    </script>
</head>
<body class="bg-slate-200 text-slate-800 h-screen w-screen flex flex-col select-none overflow-hidden">

  <!-- REALISTIC BROWSER CHROME HEADER -->
  <header class="bg-slate-200 pt-2 px-2 sm:px-4 border-b border-slate-300 shadow-sm z-20 flex-shrink-0">
    <!-- Top Tab Bar -->
    <div class="flex items-center space-x-2">
      <div class="hidden sm:flex items-center space-x-2 px-2 pb-1">
        <span class="w-3 h-3 rounded-full bg-rose-500 inline-block"></span>
        <span class="w-3 h-3 rounded-full bg-amber-400 inline-block"></span>
        <span class="w-3 h-3 rounded-full bg-emerald-500 inline-block"></span>
      </div>

      <div class="flex items-end space-x-1 overflow-x-auto no-scrollbar">
        <div class="bg-white text-slate-800 px-4 py-2 rounded-t-xl text-xs sm:text-sm font-medium flex items-center space-x-2 shadow-sm min-w-[160px] sm:min-w-[200px] justify-between">
          <div class="flex items-center space-x-2 truncate">
            <span class="w-4 h-4 rounded-full flex items-center justify-center text-white text-[10px] font-bold flex-shrink-0"><img src="../../../intro/Pictures/borderIcon.png" alt=""></span>
            <span class="truncate">Border &bull; New Tab</span>
          </div>
          <span class="text-slate-400 hover:text-slate-700 cursor-pointer rounded-full p-0.5">&times;</span>
        </div>
      </div>
    </div>

    <!-- Navigation & URL Address Bar -->
    <div class="bg-white -mx-2 sm:-mx-4 px-3 sm:px-5 py-2 flex items-center space-x-2 sm:space-x-3 border-t border-slate-200/80">
      <div class="flex items-center space-x-1 text-slate-500">
        <button id="nav-back" class="p-1.5 rounded-full hover:bg-slate-100 transition"><svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7"/></svg></button>
        <button id="nav-forward" class="p-1.5 rounded-full hover:bg-slate-100 transition text-slate-300"><svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7"/></svg></button>
        <button id="nav-refresh" class="p-1.5 rounded-full hover:bg-slate-100 transition"><svg id="refresh-icon" class="w-4 h-4 transition-transform duration-500" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/></svg></button>
      </div>

      <div class="flex-1 bg-slate-100 rounded-full px-3.5 py-1.5 flex items-center justify-between text-xs sm:text-sm border border-transparent">
        <div class="flex items-center space-x-2 w-full">
          <svg class="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clip-rule="evenodd"/></svg>
          <span class="text-slate-400 hidden sm:inline">https://</span>
          <input type="text" value="www.border.com/" class="bg-transparent outline-none text-slate-700 w-full font-normal">
        </div>
      </div>
    </div>
  </header>

  <!-- MAIN BROWSER VIEWPORT AREA -->
  <div class="relative flex-1 flex overflow-hidden bg-slate-50">
    
      </div>

      <!-- Quick Summary Badges -->
      <div id="summary-pills" class="flex flex-wrap items-center justify-center gap-2 mt-5"></div>
    </main>

    <!-- RIGHT-SIDE CUSTOMIZATION DRAWER -->
    <aside id="customization-drawer" aria-hidden="true" class="fixed top-[88px] sm:top-[92px] right-0 bottom-0 w-full sm:w-1/2 lg:w-1/3 bg-white/95 backdrop-blur-md border-l border-slate-200 shadow-2xl transform translate-x-full transition-transform duration-300 ease-in-out z-30 flex flex-col">
      <div class="px-5 py-4 border-b border-slate-200 flex items-center justify-between bg-slate-50/80 flex-shrink-0">
        <div>
          <h2 class="text-base sm:text-lg font-bold text-slate-800">Customize Character</h2>
          <p class="text-xs text-slate-500">Saved automatically via PHP Session</p>
        </div>
        <button id="randomize-btn" class="flex items-center space-x-1.5 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 px-3 py-1.5 rounded-xl text-xs font-semibold transition border border-indigo-200/70">
          <span>Randomize</span>
        </button>
      </div>

      <!-- Scrollable Controls Container -->
      <div class="flex-1 overflow-y-auto custom-scrollbar p-5 space-y-6 pb-24">
        
        <!-- 1. SKIN TONE SECTION -->
        <section class="bg-slate-50 rounded-2xl p-4 border border-slate-200/70">
          <div class="flex items-center justify-between mb-3">
            <label for="skin-color-picker" class="text-xs font-bold uppercase tracking-wider text-slate-600">Skin Color</label>
            <input type="color" id="skin-color-picker" value="#f5cba7">
          </div>
          <div class="flex items-center justify-between gap-2">
            <button type="button" data-skin="#ffdbac" class="skin-swatch w-8 h-8 rounded-full border-2 border-white shadow-sm hover:scale-110 transition" style="background-color: #ffdbac;"></button>
            <button type="button" data-skin="#f5cba7" class="skin-swatch w-8 h-8 rounded-full border-2 border-indigo-500 ring-2 ring-indigo-200 shadow-sm hover:scale-110 transition" style="background-color: #f5cba7;"></button>
            <button type="button" data-skin="#e0ac69" class="skin-swatch w-8 h-8 rounded-full border-2 border-white shadow-sm hover:scale-110 transition" style="background-color: #e0ac69;"></button>
            <button type="button" data-skin="#c68642" class="skin-swatch w-8 h-8 rounded-full border-2 border-white shadow-sm hover:scale-110 transition" style="background-color: #c68642;"></button>
            <button type="button" data-skin="#8d5524" class="skin-swatch w-8 h-8 rounded-full border-2 border-white shadow-sm hover:scale-110 transition" style="background-color: #8d5524;"></button>
            <button type="button" data-skin="#523318" class="skin-swatch w-8 h-8 rounded-full border-2 border-white shadow-sm hover:scale-110 transition" style="background-color: #523318;"></button>
          </div>
        </section>

        <!-- 2. HAIR STYLE & COLOR -->
        <section class="bg-slate-50 rounded-2xl p-4 border border-slate-200/70">
          <div class="flex items-center justify-between mb-3">
            <label for="hair-color-picker" class="text-xs font-bold uppercase tracking-wider text-slate-600">2. Hair (3 Styles)</label>
            <input type="color" id="hair-color-picker" value="#3b2f2f">
          </div>
          <div class="grid grid-cols-3 gap-2">
            <button type="button" data-hair="spiky" class="hair-btn py-2.5 px-2 rounded-xl text-xs font-semibold border-2 border-indigo-600 bg-indigo-50 text-indigo-700 transition">Spiky</button>
            <button type="button" data-hair="long" class="hair-btn py-2.5 px-2 rounded-xl text-xs font-semibold border-2 border-slate-200 bg-white text-slate-600 hover:border-slate-300 transition">Long Wavy</button>
            <button type="button" data-hair="bun" class="hair-btn py-2.5 px-2 rounded-xl text-xs font-semibold border-2 border-slate-200 bg-white text-slate-600 hover:border-slate-300 transition">Top Bun</button>
          </div>
        </section>

        <!-- 3. EYES STYLE & COLOR -->
        <section class="bg-slate-50 rounded-2xl p-4 border border-slate-200/70">
          <div class="flex items-center justify-between mb-3">
            <label for="eye-color-picker" class="text-xs font-bold uppercase tracking-wider text-slate-600">3. Eyes (3 Styles)</label>
            <input type="color" id="eye-color-picker" value="#2563eb">
          </div>
          <div class="grid grid-cols-3 gap-2">
            <button type="button" data-eyes="round" class="eyes-btn py-2.5 px-2 rounded-xl text-xs font-semibold border-2 border-indigo-600 bg-indigo-50 text-indigo-700 transition">Round</button>
            <button type="button" data-eyes="cool" class="eyes-btn py-2.5 px-2 rounded-xl text-xs font-semibold border-2 border-slate-200 bg-white text-slate-600 hover:border-slate-300 transition">Almond</button>
            <button type="button" data-eyes="starry" class="eyes-btn py-2.5 px-2 rounded-xl text-xs font-semibold border-2 border-slate-200 bg-white text-slate-600 hover:border-slate-300 transition">Sparkle</button>
          </div>
        </section>

        <!-- 4. UPPER CLOTHES -->
        <section class="bg-slate-50 rounded-2xl p-4 border border-slate-200/70">
          <div class="flex items-center justify-between mb-3">
            <label for="shirt-color-picker" class="text-xs font-bold uppercase tracking-wider text-slate-600">4. Upper Clothes</label>
            <input type="color" id="shirt-color-picker" value="#6366f1">
          </div>
          <div class="grid grid-cols-2 gap-2.5">
            <button type="button" data-shirt="tshirt" class="shirt-btn py-2.5 px-3 rounded-xl text-xs font-semibold border-2 border-indigo-600 bg-indigo-50 text-indigo-700 transition">Classic T-Shirt</button>
            <button type="button" data-shirt="hoodie" class="shirt-btn py-2.5 px-3 rounded-xl text-xs font-semibold border-2 border-slate-200 bg-white text-slate-600 hover:border-slate-300 transition">Cozy Hoodie</button>
          </div>
        </section>

        <!-- 5. PANTS -->
        <section class="bg-slate-50 rounded-2xl p-4 border border-slate-200/70">
          <div class="flex items-center justify-between mb-3">
            <label for="pants-color-picker" class="text-xs font-bold uppercase tracking-wider text-slate-600">5. Pants</label>
            <input type="color" id="pants-color-picker" value="#1e293b">
          </div>
          <div class="grid grid-cols-2 gap-2.5">
            <button type="button" data-pants="jeans" class="pants-btn py-2.5 px-3 rounded-xl text-xs font-semibold border-2 border-indigo-600 bg-indigo-50 text-indigo-700 transition">Long Jeans</button>
            <button type="button" data-pants="shorts" class="pants-btn py-2.5 px-3 rounded-xl text-xs font-semibold border-2 border-slate-200 bg-white text-slate-600 hover:border-slate-300 transition">Casual Shorts</button>
          </div>
        </section>
      </div>
    </aside>

    <!-- ROUND FLOATING ACTION BUTTON WITH PEN ICON -->
    <button id="toggle-customizer-btn" aria-label="Toggle Character Customizer" aria-expanded="false" class="fixed bottom-6 right-6 z-40 w-16 h-16 rounded-full bg-white border-4 border-indigo-600 shadow-2xl hover:scale-105 active:scale-95 transition-all duration-200 flex items-center justify-center overflow-hidden group focus:outline-none">
      <img src="../../../intro/Pictures/pen.png" alt="Pen Icon" class="w-7 h-7 object-contain">
    </button>
  </div>

  <script src="script.js"></script>
</body>
</html>