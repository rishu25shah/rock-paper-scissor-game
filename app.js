/**
 * ROCK PAPER SCISSORS — GAME LOGIC & AUDIO ENGINE
 * Adapted and enhanced from rockpaperscissorgame.py
 */

(function () {
  'use strict';

  // Game Options & Rules Definition
  const OPTIONS = ['rock', 'paper', 'scissor'];

  const WEAPON_CONFIG = {
    rock: {
      name: 'Rock',
      emoji: '🪨',
      beats: 'scissor',
      verb: 'crushes',
      cssClass: 'weapon-rock'
    },
    paper: {
      name: 'Paper',
      emoji: '📄',
      beats: 'rock',
      verb: 'covers',
      cssClass: 'weapon-paper'
    },
    scissor: {
      name: 'Scissors',
      emoji: '✂️',
      beats: 'paper',
      verb: 'cuts',
      cssClass: 'weapon-scissor'
    }
  };

  // State Management
  const STORAGE_KEY = 'rps_arena_state_v1';
  let state = {
    playerScore: 0,
    computerScore: 0,
    tieCount: 0,
    roundNumber: 1,
    soundEnabled: true,
    history: []
  };

  let isPlayingRound = false;

  // DOM Elements
  const playerScoreEl = document.getElementById('player-score');
  const computerScoreEl = document.getElementById('computer-score');
  const tieCountEl = document.getElementById('tie-count');
  const roundNumberEl = document.getElementById('round-number');

  const playerChoiceSlot = document.getElementById('player-choice-display');
  const playerChoiceIcon = document.getElementById('player-choice-icon');
  const playerChoiceTitle = document.getElementById('player-choice-title');

  const computerChoiceSlot = document.getElementById('computer-choice-display');
  const computerChoiceIcon = document.getElementById('computer-choice-icon');
  const computerChoiceTitle = document.getElementById('computer-choice-title');

  const outcomeBanner = document.getElementById('outcome-banner');
  const outcomeIcon = document.getElementById('outcome-icon');
  const outcomeHeading = document.getElementById('outcome-heading');
  const outcomeDetail = document.getElementById('outcome-detail');

  const historyListEl = document.getElementById('history-list');
  const historyBadgeEl = document.getElementById('history-badge');

  const soundToggleBtn = document.getElementById('sound-toggle-btn');
  const soundIconEl = document.getElementById('sound-icon');
  const soundTextEl = document.getElementById('sound-text');
  const resetScoreBtn = document.getElementById('reset-score-btn');

  const weaponButtons = {
    rock: document.getElementById('btn-rock'),
    paper: document.getElementById('btn-paper'),
    scissor: document.getElementById('btn-scissor')
  };

  // =========================================================================
  // Web Audio Synthesizer (Zero External Dependencies)
  // =========================================================================
  let audioCtx = null;

  function initAudio() {
    if (!audioCtx) {
      const AudioContextClass = window.AudioContext || window.webkitAudioContext;
      if (AudioContextClass) {
        audioCtx = new AudioContextClass();
      }
    }
    if (audioCtx && audioCtx.state === 'suspended') {
      audioCtx.resume();
    }
  }

  function playTone(freq, type, duration, delay = 0, gainLevel = 0.15) {
    if (!state.soundEnabled) return;
    try {
      initAudio();
      if (!audioCtx) return;

      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();

      osc.type = type;
      osc.frequency.setValueAtTime(freq, audioCtx.currentTime + delay);

      gain.gain.setValueAtTime(gainLevel, audioCtx.currentTime + delay);
      gain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + delay + duration);

      osc.connect(gain);
      gain.connect(audioCtx.destination);

      osc.start(audioCtx.currentTime + delay);
      osc.stop(audioCtx.currentTime + delay + duration);
    } catch (e) {
      console.warn('Audio playback not permitted or supported', e);
    }
  }

  function playSound(name) {
    if (!state.soundEnabled) return;
    switch (name) {
      case 'click':
        playTone(600, 'sine', 0.08, 0, 0.1);
        break;
      case 'shuffle':
        playTone(320, 'triangle', 0.05, 0, 0.08);
        break;
      case 'win':
        // Ascending major chord fanfare
        playTone(523.25, 'triangle', 0.18, 0.0, 0.15); // C5
        playTone(659.25, 'triangle', 0.18, 0.08, 0.15); // E5
        playTone(783.99, 'triangle', 0.28, 0.16, 0.18); // G5
        playTone(1046.50, 'triangle', 0.45, 0.26, 0.22); // C6
        break;
      case 'lose':
        // Descending defeat tone
        playTone(392.00, 'sawtooth', 0.18, 0.0, 0.12);
        playTone(329.63, 'sawtooth', 0.22, 0.12, 0.12);
        playTone(261.63, 'sawtooth', 0.4, 0.24, 0.14);
        break;
      case 'tie':
        // Neutral dual tone
        playTone(440, 'sine', 0.15, 0.0, 0.12);
        playTone(440, 'sine', 0.25, 0.12, 0.12);
        break;
      case 'reset':
        playTone(300, 'sine', 0.1, 0, 0.1);
        playTone(200, 'sine', 0.2, 0.08, 0.1);
        break;
    }
  }

  // =========================================================================
  // State Storage
  // =========================================================================
  function loadSavedState() {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        state = { ...state, ...parsed };
      }
    } catch (e) {
      console.warn('Unable to read localStorage:', e);
    }
  }

  function saveState() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch (e) {
      console.warn('Unable to write localStorage:', e);
    }
  }

  // =========================================================================
  // UI Rendering Helpers
  // =========================================================================
  function updateScoreboardUI() {
    playerScoreEl.textContent = state.playerScore;
    computerScoreEl.textContent = state.computerScore;
    tieCountEl.textContent = state.tieCount;
    roundNumberEl.textContent = state.roundNumber;
  }

  function updateSoundUI() {
    if (state.soundEnabled) {
      soundIconEl.textContent = '🔊';
      soundTextEl.textContent = 'Sound: ON';
    } else {
      soundIconEl.textContent = '🔇';
      soundTextEl.textContent = 'Sound: OFF';
    }
  }

  function renderHistoryUI() {
    const totalMatches = state.history.length;
    historyBadgeEl.textContent = `${totalMatches} ${totalMatches === 1 ? 'Match' : 'Matches'}`;

    if (totalMatches === 0) {
      historyListEl.innerHTML = '<div class="history-empty">No rounds played yet. Make your first move!</div>';
      return;
    }

    historyListEl.innerHTML = '';
    state.history.slice(0, 10).forEach((item) => {
      const pConf = WEAPON_CONFIG[item.player] || { name: item.player, emoji: '❓' };
      const cConf = WEAPON_CONFIG[item.computer] || { name: item.computer, emoji: '❓' };

      const div = document.createElement('div');
      div.className = 'history-item';

      div.innerHTML = `
        <span class="history-round">#${item.round}</span>
        <div class="history-duel">
          <span class="history-weapon">${pConf.emoji} ${pConf.name}</span>
          <span style="opacity: 0.5;">vs</span>
          <span class="history-weapon">${cConf.emoji} ${cConf.name}</span>
        </div>
        <span class="history-pill ${item.result}">${item.result.toUpperCase()}</span>
      `;
      historyListEl.appendChild(div);
    });
  }

  function setWeaponButtonsDisabled(disabled) {
    Object.values(weaponButtons).forEach((btn) => {
      if (btn) btn.disabled = disabled;
    });
  }

  function resetFighterSlot(slotEl, iconEl, titleEl, defaultLabel) {
    slotEl.className = 'choice-slot empty';
    iconEl.textContent = '❓';
    titleEl.textContent = defaultLabel;
  }

  function setSlotWeapon(slotEl, iconEl, titleEl, weaponKey) {
    const config = WEAPON_CONFIG[weaponKey];
    if (!config) return;

    slotEl.className = `choice-slot active ${config.cssClass}`;
    iconEl.textContent = config.emoji;
    titleEl.textContent = config.name;
  }

  // =========================================================================
  // Game Logic (Faithful to Python core rules)
  // =========================================================================
  function determineWinner(player, computer) {
    if (player === computer) {
      return { result: 'tie', message: "It's a tie!", detail: 'Both opponents chose the same weapon.' };
    }

    const playerCfg = WEAPON_CONFIG[player];
    if (playerCfg && playerCfg.beats === computer) {
      const compCfg = WEAPON_CONFIG[computer];
      return {
        result: 'win',
        message: 'Victory! You Win!',
        detail: `${playerCfg.name} ${playerCfg.verb} ${compCfg.name}.`
      };
    }

    const compCfg = WEAPON_CONFIG[computer];
    return {
      result: 'lose',
      message: 'Defeat! Computer Wins!',
      detail: `${compCfg.name} ${compCfg.verb} ${playerCfg.name}.`
    };
  }

  function playRound(playerChoice) {
    if (isPlayingRound) return;
    if (!OPTIONS.includes(playerChoice)) return;

    isPlayingRound = true;
    setWeaponButtonsDisabled(true);
    playSound('click');

    // 1. Show Player's Immediate Choice
    setSlotWeapon(playerChoiceSlot, playerChoiceIcon, playerChoiceTitle, playerChoice);

    // 2. Animate Computer Thinking / Shuffling
    computerChoiceSlot.className = 'choice-slot shuffling';
    outcomeBanner.className = 'outcome-banner neutral';
    outcomeHeading.textContent = 'AI is Choosing...';
    outcomeDetail.textContent = 'Calculating optimal countermove...';
    outcomeIcon.textContent = '⚡';

    let shuffleCount = 0;
    const maxShuffles = 8;
    const shuffleInterval = setInterval(() => {
      const tempChoice = OPTIONS[Math.floor(Math.random() * OPTIONS.length)];
      computerChoiceIcon.textContent = WEAPON_CONFIG[tempChoice].emoji;
      computerChoiceTitle.textContent = 'Deciding...';
      playSound('shuffle');
      shuffleCount++;

      if (shuffleCount >= maxShuffles) {
        clearInterval(shuffleInterval);

        // 3. Final Computer Choice (Equivalent to Python: random.choice(options))
        const computerChoice = OPTIONS[Math.floor(Math.random() * OPTIONS.length)];
        setSlotWeapon(computerChoiceSlot, computerChoiceIcon, computerChoiceTitle, computerChoice);

        // 4. Resolve Match Outcome
        const outcome = determineWinner(playerChoice, computerChoice);

        if (outcome.result === 'win') {
          state.playerScore++;
          outcomeBanner.className = 'outcome-banner win';
          outcomeIcon.textContent = '🏆';
          playSound('win');
        } else if (outcome.result === 'lose') {
          state.computerScore++;
          outcomeBanner.className = 'outcome-banner lose';
          outcomeIcon.textContent = '💥';
          playSound('lose');
        } else {
          state.tieCount++;
          outcomeBanner.className = 'outcome-banner tie';
          outcomeIcon.textContent = '🤝';
          playSound('tie');
        }

        outcomeHeading.textContent = outcome.message;
        outcomeDetail.textContent = outcome.detail;

        // 5. Append to History
        state.history.unshift({
          round: state.roundNumber,
          player: playerChoice,
          computer: computerChoice,
          result: outcome.result,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        });

        // 6. Advance Round
        state.roundNumber++;

        // 7. Update UI and persist
        updateScoreboardUI();
        renderHistoryUI();
        saveState();

        isPlayingRound = false;
        setWeaponButtonsDisabled(false);
      }
    }, 90);
  }

  function resetGameStats() {
    playSound('reset');
    state.playerScore = 0;
    state.computerScore = 0;
    state.tieCount = 0;
    state.roundNumber = 1;
    state.history = [];

    saveState();
    updateScoreboardUI();
    renderHistoryUI();

    resetFighterSlot(playerChoiceSlot, playerChoiceIcon, playerChoiceTitle, 'Waiting...');
    resetFighterSlot(computerChoiceSlot, computerChoiceIcon, computerChoiceTitle, 'Waiting...');

    outcomeBanner.className = 'outcome-banner neutral';
    outcomeHeading.textContent = 'Stats Reset';
    outcomeDetail.textContent = 'Scores cleared. Choose a weapon to start a fresh game!';
    outcomeIcon.textContent = '✨';
  }

  function toggleSound() {
    state.soundEnabled = !state.soundEnabled;
    updateSoundUI();
    saveState();
    if (state.soundEnabled) {
      playSound('click');
    }
  }

  // =========================================================================
  // Event Listeners
  // =========================================================================
  function initEvents() {
    // Weapon Buttons
    Object.entries(weaponButtons).forEach(([weaponKey, btn]) => {
      if (btn) {
        btn.addEventListener('click', () => {
          initAudio();
          playRound(weaponKey);
        });
      }
    });

    // Reset Button
    if (resetScoreBtn) {
      resetScoreBtn.addEventListener('click', () => {
        if (confirm('Reset all scores and match history?')) {
          resetGameStats();
        }
      });
    }

    // Sound Toggle
    if (soundToggleBtn) {
      soundToggleBtn.addEventListener('click', () => {
        initAudio();
        toggleSound();
      });
    }

    // Keyboard Shortcuts (1 = Rock, 2 = Paper, 3 = Scissor, R = Reset)
    window.addEventListener('keydown', (e) => {
      if (isPlayingRound) return;
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;

      if (e.key === '1') {
        initAudio();
        playRound('rock');
      } else if (e.key === '2') {
        initAudio();
        playRound('paper');
      } else if (e.key === '3') {
        initAudio();
        playRound('scissor');
      } else if (e.key.toLowerCase() === 'r') {
        if (confirm('Reset all scores and match history?')) {
          resetGameStats();
        }
      }
    });
  }

  // =========================================================================
  // Initialize App
  // =========================================================================
  function init() {
    loadSavedState();
    updateScoreboardUI();
    updateSoundUI();
    renderHistoryUI();
    initEvents();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
