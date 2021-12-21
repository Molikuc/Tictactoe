/* Gameboard */
const gameBoard= (() => {
    let board = ["","","","","","","","",""];
    const displayBoard = document.querySelectorAll('.block');
    const win = [
        [0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]
    ];

    function eventListener(){
        displayBoard.forEach((cell) => {
            cell.addEventListener('click', () => {
                fill(cell);
            });
        });
    }

    function fill(cell){
        const cellID = cell.id;
       
        if(board[cellID] === ""){
            board[cellID] = game.getWeapon();
            displayBoard[cellID].removeEventListener('click', fill);
            checkgame();
        }
        render();
    }

    function render(){
        console.log("init");
        for(let i=0; i < board.length; i++){
            displayBoard[i].textContent = board[i];
        }
    }

    function checkgame(){
        game.changePlayer();
    }

    return {render, eventListener};
})();
/* Players */

const player = (name, weapon) => {
    const active = false;
    return {name, weapon, active};
}

/* Flow of the Game */
const game = (() => {
    const player1 = player("Player 1","X");
    const player2 = player("Player 2","O");

    function init(){
        infoGame();
        eventListener();
    }

    function infoGame(){
        this.startBtn = document.querySelector('#play');
        this.player1Name = document.querySelector('#player1-details');
        this.player2Name = document.querySelector('#player2-details');
        this.restart = document.querySelector('#restart');
        this.form = document.querySelector('#playerchoose');
    }
    
    function setPlayerName(){
        player1.name = (player1Name.value) ? player1Name.value : "Player 1";
        player2.name = (player2Name.value) ? player2Name.value : "Player 2";
    }

    function eventListener() {
        startBtn.addEventListener('click', startGame);
        restart.addEventListener('click', reload);
        
    }

    function reload(){
        location.reload();
    }

    function startGame(){
        setPlayerName();
        gameBoard.render();
        gameBoard.eventListener();
        form.style.visibility = 'hidden';
        player1.active = true;
    }

    function getWeapon(){
        return (player1.active) ? player1.weapon : player2.weapon;
    }

    function changePlayer(){
        player1.active = (player1.active) ? false : true;
        player2.active = (player2.active) ? false : true;
    }

    return {init, startGame, getWeapon, changePlayer};
})();

game.init();
