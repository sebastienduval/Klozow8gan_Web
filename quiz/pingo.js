const PINGO_COLUMNS = [
    { label: 'P', min: 1, max: 15 },
    { label: 'I', min: 16, max: 30 },
    { label: 'N', min: 31, max: 45 },
    { label: 'G', min: 46, max: 60 },
    { label: 'O', min: 61, max: 75 }
];

const WINNING_LINES = [
    [0, 1, 2, 3, 4],
    [5, 6, 7, 8, 9],
    [10, 11, 12, 13, 14],
    [15, 16, 17, 18, 19],
    [20, 21, 22, 23, 24],
    [0, 5, 10, 15, 20],
    [1, 6, 11, 16, 21],
    [2, 7, 12, 17, 22],
    [3, 8, 13, 18, 23],
    [4, 9, 14, 19, 24],
    [0, 6, 12, 18, 24],
    [4, 8, 12, 16, 20]
];

let drawOrder = [];
let drawIndex = -1;
let boardNumbers = [];
let selectedCells = [];
let drawnNumbers = new Set();
let gameOver = false;
let winningLine = null;

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

function shuffle(array) {
    const result = array.slice();
    for (let i = result.length - 1; i > 0; i--) {
        const j = getRandomInt(i + 1);
        [result[i], result[j]] = [result[j], result[i]];
    }
    return result;
}

function generateColumnNumbers(min, max, count) {
    const numbers = [];
    for (let value = min; value <= max; value++) {
        numbers.push(value);
    }
    return shuffle(numbers).slice(0, count);
}

function generateBoardNumbers() {
    boardNumbers = [];
    for (const column of PINGO_COLUMNS) {
        boardNumbers.push(generateColumnNumbers(column.min, column.max, 5));
    }
}

function buildBoard() {
    const board = document.getElementById('pingo-board');
    board.innerHTML = '';

    const header = document.createElement('div');
    header.className = 'board-header-cell row-header';
    header.textContent = 'P';
    board.appendChild(header);
    const headerI = document.createElement('div');
    headerI.className = 'board-header-cell';
    headerI.textContent = 'I';
    board.appendChild(headerI);
    const headerN = document.createElement('div');
    headerN.className = 'board-header-cell';
    headerN.textContent = 'N';
    board.appendChild(headerN);
    const headerG = document.createElement('div');
    headerG.className = 'board-header-cell';
    headerG.textContent = 'G';
    board.appendChild(headerG);
    const headerO = document.createElement('div');
    headerO.className = 'board-header-cell';
    headerO.textContent = 'O';
    board.appendChild(headerO);

    selectedCells = new Array(25).fill(false);

    for (let row = 0; row < 5; row++) {
        for (let column = 0; column < 5; column++) {
            const cellIndex = row * 5 + column;
            const value = boardNumbers[column][row];
            const cell = document.createElement('div');
            cell.id = `cell-${cellIndex}`;
            cell.className = 'board-cell';
            cell.dataset.number = value;
            cell.tabIndex = 0;
            cell.title = `Numéro ${value}`;
            cell.innerHTML = `<span class="cell-number">${value}</span>`;
            cell.addEventListener('click', () => onCellClicked(cellIndex));
            cell.addEventListener('keydown', event => {
                if (event.key === 'Enter' || event.key === ' ') {
                    event.preventDefault();
                    onCellClicked(cellIndex);
                }
            });
            board.appendChild(cell);
        }
    }
}

function updateStatus(message) 
{
    document.getElementById('status-text').textContent = message;
}

function generateDrawnList()
{
    let drawList = "";
    for ( let i = drawIndex; i >= 0; i -- )
    {
        drawList += GenerateNumber(drawOrder[i]) + "(" + drawOrder[i] + ")";
        if ( i > 0 )
        {
            drawList += ", ";
        }
    }
    return drawList;
}

function updateDrawInfo() 
{
    document.getElementById('draw-count').textContent = `${Math.min(drawIndex + 1, drawOrder.length)} / ${drawOrder.length}`;
    document.getElementById('drawn-list').textContent = generateDrawnList();
}

function onCellClicked(index) {
    if (gameOver) {
        return;
    }

    selectedCells[index] = !selectedCells[index];
    const cell = document.getElementById(`cell-${index}`);
    cell.classList.toggle('selected', selectedCells[index]);

    if (checkForBingo()) {
        finishGame();
    }
}

function checkForBingo() {
    for (const line of WINNING_LINES) {
        if (line.every(index => selectedCells[index])) {
            winningLine = line;
            return true;
        }
    }
    return false;
}

function updateCellsAfterValidation() {
    const flattenedBoard = boardNumbers.flat();
    for (let index = 0; index < flattenedBoard.length; index++) {
        const cell = document.getElementById(`cell-${index}`);
        cell.classList.remove('correct', 'incorrect', 'missed');
        const number = flattenedBoard[index];
        const isSelected = selectedCells[index];
        const wasDrawn = drawnNumbers.has(number);

        if (isSelected && wasDrawn) {
            cell.classList.add('correct');
        } else if (isSelected && !wasDrawn) {
            cell.classList.add('incorrect');
        } else if (!isSelected && wasDrawn) {
            cell.classList.add('missed');
        }
    }
}

function finishGame() {
    gameOver = true;    
    updateCellsAfterValidation();
    document.getElementById('next-button').disabled = true;
    const flattenedBoard = boardNumbers.flat();
    const lineIsValid = winningLine && winningLine.every(index => drawnNumbers.has(flattenedBoard[index]));

    const summary = lineIsValid ? 'Bingo valide !' : 'Bingo invalide.';
    document.getElementById('history').hidden = false;
    document.getElementById('summary-text').textContent = summary;
    document.getElementById('summary-panel').hidden = false;
}

function drawNextNumber() {
    if (gameOver) {
        return;
    }

    drawIndex++;
    if (drawIndex >= drawOrder.length) {
        drawIndex = drawOrder.length - 1;
        updateStatus('Tous les numéros ont été tirés.');
        document.getElementById('next-button').disabled = true;
        return;
    }

    const number = drawOrder[drawIndex];
    drawnNumbers.add(number);
    document.getElementById('current-drawn-abenaki').textContent = GenerateNumber(number);
    updateDrawInfo();
    updateStatus('Cliquez sur la case correspondant à ce numéro, puis appuyez sur Suivant.');
}

function startNewGame() {
    drawOrder = shuffle(Array.from({ length: 75 }, (_, index) => index + 1));
    drawIndex = -1;
    drawnNumbers = new Set();
    gameOver = false;
    winningLine = null;
    document.getElementById('summary-panel').hidden = true;
    document.getElementById('next-button').disabled = false;

    generateBoardNumbers();
    buildBoard();
    document.getElementById('history').hidden = true;    
    document.getElementById('drawn-list').textContent = '';
    document.getElementById('current-drawn-abenaki').textContent = '---';
    updateStatus('Nouvelle partie générée. Un numéro a déjà été tiré. Cliquez sur la case correspondante, puis appuyez sur Suivant.');
    updateDrawInfo();
    drawNextNumber();
}

function initPingo() {
    document.getElementById('next-button').addEventListener('click', drawNextNumber);
    document.getElementById('new-game-button').addEventListener('click', startNewGame);
    startNewGame();
}

window.addEventListener('DOMContentLoaded', initPingo);
