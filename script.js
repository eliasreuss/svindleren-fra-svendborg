const gameData = [
    { category: "Frugt", civilian: "Æble", imposter: "Pære" },
    { category: "Transport", civilian: "Bil", imposter: "Cykel" },
    { category: "Dyr", civilian: "Hund", imposter: "Kat" },
    { category: "Møbler", civilian: "Sofa", imposter: "Lænestol" },
    { category: "Vejr", civilian: "Regn", imposter: "Sne" },
    { category: "Mad", civilian: "Pizza", imposter: "Burger" },
    { category: "Drikke", civilian: "Kaffe", imposter: "Te" },
    { category: "Farver", civilian: "Rød", imposter: "Orange" },
    { category: "Tøj", civilian: "Trøje", imposter: "Jakke" },
    { category: "Sport", civilian: "Fodbold", imposter: "Håndbold" },
    { category: "Instrumenter", civilian: "Guitar", imposter: "Klaver" },
    { category: "Erhverv", civilian: "Læge", imposter: "Sygeplejerske" },
    { category: "Krop", civilian: "Hånd", imposter: "Fod" },
    { category: "Skole", civilian: "Matematik", imposter: "Fysik" },
    { category: "Bygninger", civilian: "Hus", imposter: "Lejlighed" },
    { category: "Slik", civilian: "Chokolade", imposter: "Vingummi" },
    { category: "Elektronik", civilian: "Telefon", imposter: "Tablet" },
    { category: "Følelser", civilian: "Glad", imposter: "Sur" },
    { category: "Landskab", civilian: "Skov", imposter: "Strand" },
    { category: "Film", civilian: "Gyser", imposter: "Komedie" },
    { category: "By", civilian: "København", imposter: "Aarhus" },
    { category: "Transportmiddel", civilian: "Fly", imposter: "Tog" },
    { category: "Sko", civilian: "Sneakers", imposter: "Støvler" },
    { category: "Værktøj", civilian: "Hammer", imposter: "Skruetrækker" }
];

let players = [];
let gameSettings = {
    imposterCount: 1,
    category: null
};

let gameState = {
    assignedRoles: [],
    currentPlayerIndex: null,
    seenCount: 0
};

const stages = document.querySelectorAll('.stage');
const playerNameInput = document.getElementById('player-name-input');
const addPlayerBtn = document.getElementById('add-player-btn');
const playerList = document.getElementById('player-list');
const imposterCountInput = document.getElementById('imposter-count');
const startGameBtn = document.getElementById('start-game-btn');
const passAroundList = document.getElementById('pass-around-list');
const securityPrompt = document.getElementById('security-prompt');
const confirmIdentityBtn = document.getElementById('confirm-identity-btn');
const cancelIdentityBtn = document.getElementById('cancel-identity-btn');
const secretWordDisplay = document.getElementById('secret-word-display');
const hideWordBtn = document.getElementById('hide-word-btn');
const revealRolesBtn = document.getElementById('reveal-roles-btn');
const resultCivilWord = document.getElementById('result-civil-word');
const resultImposterWord = document.getElementById('result-imposter-word');
const resultCivils = document.getElementById('result-civils');
const resultImposters = document.getElementById('result-imposters');
const newGameBtn = document.getElementById('new-game-btn');
const decImposterBtn = document.getElementById('dec-imposter');
const incImposterBtn = document.getElementById('inc-imposter');
const playerCountBadge = document.getElementById('player-count-badge');

function init() {
    setupEventListeners();
    updateStartButton();
    renderPlayerList(); // To show empty state
}

function setupEventListeners() {
    addPlayerBtn.addEventListener('click', addPlayer);
    playerNameInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            addPlayer();
        }
    });

    decImposterBtn.addEventListener('click', () => {
        const current = parseInt(imposterCountInput.value) || 1;
        if (current > 1) {
            imposterCountInput.value = current - 1;
            updateStartButton();
        }
    });

    incImposterBtn.addEventListener('click', () => {
        const current = parseInt(imposterCountInput.value) || 1;
        const max = Math.max(1, players.length - 1);
        if (current < max) {
            imposterCountInput.value = current + 1;
            updateStartButton();
        }
    });

    startGameBtn.addEventListener('click', startGame);
    confirmIdentityBtn.addEventListener('click', showSecretWord);
    cancelIdentityBtn.addEventListener('click', () => showStage('stage-2'));
    hideWordBtn.addEventListener('click', handleHideWord);
    revealRolesBtn.addEventListener('click', showResults);
    newGameBtn.addEventListener('click', resetToLobby);
}

function showStage(stageId) {
    stages.forEach(stage => stage.classList.remove('active'));
    document.getElementById(stageId).classList.add('active');
    window.scrollTo(0, 0);
}

function addPlayer() {
    const name = playerNameInput.value.trim();
    if (!name) return;
    if (players.includes(name)) {
        shakeInput();
        return;
    }
    players.push(name);
    playerNameInput.value = '';
    renderPlayerList();
    updateStartButton();
    playerNameInput.focus();
}

function shakeInput() {
    playerNameInput.style.animation = 'none';
    playerNameInput.offsetHeight; // trigger reflow
    playerNameInput.style.animation = 'shake 0.4s ease';
    setTimeout(() => { playerNameInput.style.animation = ''; }, 400);
}

function removePlayer(name) {
    players = players.filter(p => p !== name);
    renderPlayerList();
    updateStartButton();
}

function renderPlayerList() {
    playerList.innerHTML = '';
    
    if (players.length === 0) {
        playerList.innerHTML = '<div class="empty-state">Tilføj mindst 3 spillere for at starte</div>';
        playerCountBadge.textContent = '0 spillere';
        return;
    }

    playerCountBadge.textContent = `${players.length} spiller${players.length !== 1 ? 'e' : ''}`;

    players.forEach(player => {
        const chip = document.createElement('div');
        chip.className = 'chip';

        const nameSpan = document.createElement('span');
        nameSpan.textContent = player;

        const removeBtn = document.createElement('button');
        removeBtn.innerHTML = '×';
        removeBtn.setAttribute('aria-label', `Fjern ${player}`);
        removeBtn.onclick = (e) => {
            e.stopPropagation();
            removePlayer(player);
        };

        chip.appendChild(nameSpan);
        chip.appendChild(removeBtn);
        playerList.appendChild(chip);
    });
}

function updateStartButton() {
    const imposterCount = parseInt(imposterCountInput.value) || 0;
    const hasEnoughPlayers = players.length >= 3;
    const isValidImposterCount = imposterCount > 0 && imposterCount < players.length;

    if (imposterCount >= players.length && players.length > 0) {
        imposterCountInput.value = Math.max(1, players.length - 1);
    }

    startGameBtn.disabled = !(hasEnoughPlayers && isValidImposterCount);
}

function startGame() {
    // Select random category
    const selectedCategoryIndex = Math.floor(Math.random() * gameData.length);
    gameSettings.category = gameData[selectedCategoryIndex];
    gameSettings.imposterCount = parseInt(imposterCountInput.value);

    assignRoles();
    renderPassAroundList();
    showStage('stage-2');
}

function assignRoles() {
    gameState.assignedRoles = [];
    gameState.seenCount = 0;

    const shuffled = [...players].sort(() => 0.5 - Math.random());

    for (let i = 0; i < shuffled.length; i++) {
        const isImposter = i < gameSettings.imposterCount;
        gameState.assignedRoles.push({
            name: shuffled[i],
            role: isImposter ? 'imposter' : 'civil',
            word: isImposter ? gameSettings.category.imposter : gameSettings.category.civilian,
            seen: false
        });
    }

    gameState.assignedRoles.sort(() => 0.5 - Math.random());
}

function renderPassAroundList() {
    passAroundList.innerHTML = '';
    const sorted = [...gameState.assignedRoles].sort((a, b) => a.name.localeCompare(b.name));

    sorted.forEach((playerObj) => {
        const btn = document.createElement('button');
        btn.textContent = playerObj.name;
        btn.className = 'player-card-btn'; 
        if (playerObj.seen) {
            btn.disabled = true;
        }
        
        btn.onclick = () => confirmIdentity(playerObj.name);
        passAroundList.appendChild(btn);
    });
}

function confirmIdentity(playerName) {
    gameState.currentPlayerIndex = gameState.assignedRoles.findIndex(p => p.name === playerName);
    securityPrompt.textContent = `Er du ${playerName}?`;
    showStage('stage-3');
}

function showSecretWord() {
    const player = gameState.assignedRoles[gameState.currentPlayerIndex];
    secretWordDisplay.textContent = player.word;
    showStage('stage-4');
}

function handleHideWord() {
    gameState.assignedRoles[gameState.currentPlayerIndex].seen = true;
    gameState.seenCount++;

    if (gameState.seenCount >= players.length) {
        showStage('stage-5');
    } else {
        renderPassAroundList();
        showStage('stage-2');
    }
}

function showResults() {
    resultCivilWord.textContent = gameSettings.category.civilian;
    resultImposterWord.textContent = gameSettings.category.imposter;

    resultCivils.innerHTML = '';
    resultImposters.innerHTML = '';

    let civilCount = 0;
    let imposterCount = 0;

    const sorted = [...gameState.assignedRoles].sort((a, b) => a.name.localeCompare(b.name));

    sorted.forEach(player => {
        const li = document.createElement('li');
        li.textContent = player.name;

        if (player.role === 'civil') {
            resultCivils.appendChild(li);
            civilCount++;
        } else {
            resultImposters.appendChild(li);
            imposterCount++;
        }
    });

    document.getElementById('civil-count').textContent = `(${civilCount})`;
    document.getElementById('imposter-count-result').textContent = `(${imposterCount})`;

    showStage('stage-6');
}

function resetToLobby() {
    gameState = {
        assignedRoles: [],
        currentPlayerIndex: null,
        seenCount: 0
    };
    updateStartButton();
    showStage('stage-1');
}

// Inject shake animation into stylesheet
const style = document.createElement('style');
style.textContent = `@keyframes shake { 0%,100%{transform:translateX(0)} 25%{transform:translateX(-8px)} 75%{transform:translateX(8px)} }`;
document.head.appendChild(style);

init();