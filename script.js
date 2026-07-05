// PASSWORD PROTECTION
const CORRECT_PASSWORD = '1822';

function checkPassword() {
    const input = document.getElementById('passwordInput');
    const error = document.getElementById('passwordError');
    
    if (input.value === CORRECT_PASSWORD) {
        document.getElementById('passwordOverlay').classList.add('hidden');
        document.getElementById('mainApp').classList.remove('hidden');
        initializeApp();
    } else {
        error.textContent = '❌ Incorrect password. Try again.';
        input.value = '';
        input.focus();
    }
}

// Allow Enter key to submit password
document.addEventListener('keypress', (e) => {
    if (e.key === 'Enter' && !document.getElementById('passwordOverlay').classList.contains('hidden')) {
        checkPassword();
    }
});

// ARK DINOS DATABASE
const arkDinos = {
    'Baryonyx': { health: 350, stamina: 300, oxygen: 150, food: 450, weight: 300, melee: 150, speed: 120 },
    'Basilisk': { health: 520, stamina: 420, oxygen: 200, food: 500, weight: 400, melee: 200, speed: 100 },
    'Basilisk Ghost': { health: 520, stamina: 420, oxygen: 200, food: 500, weight: 400, melee: 200, speed: 100 },
    'Basilosaurus': { health: 650, stamina: 500, oxygen: 300, food: 600, weight: 500, melee: 180, speed: 90 },
    'Carnotaurus': { health: 580, stamina: 450, oxygen: 150, food: 550, weight: 380, melee: 220, speed: 140 },
    'Tapejara': { health: 420, stamina: 380, oxygen: 150, food: 480, weight: 250, melee: 140, speed: 160 },
    'Argentavis': { health: 500, stamina: 420, oxygen: 150, food: 520, weight: 350, melee: 180, speed: 130 },
    'Phoenix': { health: 600, stamina: 480, oxygen: 200, food: 550, weight: 450, melee: 250, speed: 120 },
    'Reaper King': { health: 700, stamina: 550, oxygen: 250, food: 650, weight: 550, melee: 300, speed: 110 },
    'Managarmr': { health: 550, stamina: 500, oxygen: 150, food: 530, weight: 420, melee: 190, speed: 180 },
    'Griffin': { health: 480, stamina: 400, oxygen: 150, food: 500, weight: 380, melee: 170, speed: 150 },
    'Wyvern': { health: 520, stamina: 420, oxygen: 100, food: 480, weight: 320, melee: 200, speed: 160 },
    'Rock Drake': { health: 560, stamina: 450, oxygen: 180, food: 510, weight: 400, melee: 210, speed: 170 },
    'Managarmr Queen': { health: 650, stamina: 550, oxygen: 200, food: 600, weight: 500, melee: 250, speed: 190 },
    'Alpha Rex': { health: 800, stamina: 600, oxygen: 150, food: 700, weight: 600, melee: 350, speed: 130 },
};

const arkColors = {
    'Cyan': { r: 0, g: 255, b: 255 },
    'Red': { r: 255, g: 0, b: 0 },
    'Blue': { r: 0, g: 0, b: 255 },
    'Green': { r: 0, g: 255, b: 0 },
    'Yellow': { r: 255, g: 255, b: 0 },
    'Purple': { r: 128, g: 0, b: 128 },
    'Orange': { r: 255, g: 165, b: 0 },
    'Pink': { r: 255, g: 192, b: 203 },
    'White': { r: 255, g: 255, b: 255 },
    'Black': { r: 0, g: 0, b: 0 },
};

let selectedDino = null;

function initializeApp() {
    populateCreatures();
    populateColors();
}

function populateCreatures() {
    const creatureList = document.getElementById('creatureList');
    creatureList.innerHTML = '';
    
    Object.keys(arkDinos).forEach(dino => {
        const div = document.createElement('div');
        div.className = 'creature-item';
        div.textContent = dino;
        div.onclick = () => selectCreature(dino);
        creatureList.appendChild(div);
    });
}

function filterCreatures() {
    const search = document.getElementById('creatureSearch').value.toLowerCase();
    const items = document.querySelectorAll('.creature-item');
    
    items.forEach(item => {
        if (item.textContent.toLowerCase().includes(search)) {
            item.style.display = 'block';
        } else {
            item.style.display = 'none';
        }
    });
}

function selectCreature(dino) {
    selectedDino = dino;
    document.getElementById('selectedCreature').textContent = dino;
    document.getElementById('creatureSearch').value = dino;
    document.getElementById('creatureList').innerHTML = '';
    
    const stats = arkDinos[dino];
    document.getElementById('health').value = stats.health;
    document.getElementById('stamina').value = stats.stamina;
    document.getElementById('oxygen').value = stats.oxygen;
    document.getElementById('food').value = stats.food;
    document.getElementById('weight').value = stats.weight;
    document.getElementById('melee').value = stats.melee;
    document.getElementById('speed').value = stats.speed;
    
    updateStats();
}

function populateColors() {
    const colorSelects = document.querySelectorAll('.color-select');
    const colorOptions = Object.keys(arkColors);
    
    colorSelects.forEach(select => {
        colorOptions.forEach(color => {
            const option = document.createElement('option');
            option.value = color;
            option.textContent = color;
            select.appendChild(option);
        });
        select.value = 'Cyan';
    });
}

function updateStats() {
    const health = parseInt(document.getElementById('health').value) || 0;
    const stamina = parseInt(document.getElementById('stamina').value) || 0;
    const oxygen = parseInt(document.getElementById('oxygen').value) || 0;
    const food = parseInt(document.getElementById('food').value) || 0;
    const weight = parseInt(document.getElementById('weight').value) || 0;
    const melee = parseInt(document.getElementById('melee').value) || 0;
    const speed = parseInt(document.getElementById('speed').value) || 0;
    
    const total = health + stamina + oxygen + food + weight + melee + speed;
    document.getElementById('totalStats').textContent = total;
}

function updatePreset() {
    const preset = document.getElementById('presetSelect').value;
    if (!selectedDino) return;
    
    const baseStats = arkDinos[selectedDino];
    let multiplier = 1;
    
    switch(preset) {
        case 'flex':
            multiplier = 1.2;
            break;
        case 'triple':
            multiplier = 1.5;
            break;
        case 'double':
            multiplier = 2;
            break;
        case 'single':
            multiplier = 0.5;
            break;
        default:
            multiplier = 1;
    }
    
    document.getElementById('health').value = Math.round(baseStats.health * multiplier);
    document.getElementById('stamina').value = Math.round(baseStats.stamina * multiplier);
    document.getElementById('oxygen').value = Math.round(baseStats.oxygen * multiplier);
    document.getElementById('food').value = Math.round(baseStats.food * multiplier);
    document.getElementById('weight').value = Math.round(baseStats.weight * multiplier);
    document.getElementById('melee').value = Math.round(baseStats.melee * multiplier);
    document.getElementById('speed').value = Math.round(baseStats.speed * multiplier);
    
    updateStats();
}

function generateCommand() {
    if (!selectedDino) {
        alert('Please select a creature first!');
        return;
    }
    
    const health = document.getElementById('health').value;
    const stamina = document.getElementById('stamina').value;
    const oxygen = document.getElementById('oxygen').value;
    const food = document.getElementById('food').value;
    const weight = document.getElementById('weight').value;
    const melee = document.getElementById('melee').value;
    const speed = document.getElementById('speed').value;
    
    const region0 = document.getElementById('region0').value;
    const region1 = document.getElementById('region1').value;
    const region2 = document.getElementById('region2').value;
    const region3 = document.getElementById('region3').value;
    const region4 = document.getElementById('region4').value;
    const region5 = document.getElementById('region5').value;
    
    const colors = [
        arkColors[region0], arkColors[region1], arkColors[region2],
        arkColors[region3], arkColors[region4], arkColors[region5]
    ];
    
    let command = `GMSummon "${selectedDino}_Character_BP_C" 1 0 0 ${health}\n`;
    command += `GMSummon "${selectedDino}_Character_BP_C" 1 0 0 ${stamina}\n`;
    
    // Add color commands
    colors.forEach((color, index) => {
        command += `SetTargetDinoColor ${index} ${color.r} ${color.g} ${color.b}\n`;
    });
    
    if (document.getElementById('pairs').checked) {
        command += `# Pairs mode enabled\n`;
    }
    
    if (document.getElementById('cryopod').checked) {
        command += `# Cryopod mode enabled\n`;
    }
    
    document.getElementById('commandOutput').value = command;
}

function copyToClipboard() {
    const output = document.getElementById('commandOutput');
    if (!output.value) {
        alert('Generate a command first!');
        return;
    }
    
    output.select();
    document.execCommand('copy');
    alert('✅ Command copied to clipboard!');
}

function clearForm() {
    selectedDino = null;
    document.getElementById('selectedCreature').textContent = 'None';
    document.getElementById('creatureSearch').value = '';
    document.getElementById('commandOutput').value = '';
    document.getElementById('presetSelect').value = 'standard';
    populateCreatures();
}

function switchTab(tabName) {
    // Hide all tabs
    document.querySelectorAll('.tab-content').forEach(tab => {
        tab.classList.remove('active');
    });
    
    // Remove active class from all buttons
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    
    document.querySelectorAll('.nav-item').forEach(item => {
        item.classList.remove('active');
    });
    
    // Show selected tab
    const tab = document.getElementById(tabName);
    if (tab) {
        tab.classList.add('active');
    }
    
    // Add active class to corresponding button
    const btnId = 'tab-' + tabName.split('-')[0];
    const btn = document.getElementById(btnId);
    if (btn) {
        btn.classList.add('active');
    }
    
    // Add active to nav item
    document.querySelectorAll('.nav-item').forEach(item => {
        if (item.textContent.toLowerCase().includes(tabName.split('-')[0])) {
            item.classList.add('active');
        }
    });
}

// Initialize on load
window.addEventListener('load', () => {
    document.getElementById('passwordInput').focus();
});
