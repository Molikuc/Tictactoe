/* Gameboard */
const gameBoard= (() => {
    let board = ["","","","","","","","",""];
    const displayBoard = document.querySelectorAll('.block');
    const win = [
        [0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]
    ];

    function eventListener(){
        displayBoard.forEach(function(element) {
            element.addEventListener("click", fill);
        });
    }

    function fill(cell){

        if (cell.type === "click"){
            board[cell.target.id] = game.getWeapon();
            displayBoard[cell.target.id].removeEventListener("click", fill);
        } 
        render();
        checkgame();
    }

    function render(){
        console.log("init");
        for(let i=0; i < board.length; i++){
            displayBoard[i].textContent = board[i];
        }
    }

    function checkgame(){
        if (checkWin()){
            game.endGame(game.getWeapon());
        } else if(board.every(full)){
            game.endGame("T");
        } else {
            game.changePlayer();
        }  
    }

    function full(boardElement){
        return boardElement !== "";
    }

    function testResult(sub){
        return board[sub] === game.getWeapon();
    }

    function testArray(subArray){
        return (subArray.every(testResult));
    }

    function checkWin() {
        return (win.some(testArray));
    }

    function removeListener(){
        displayBoard.forEach(function(element) {
            element.removeEventListener("click", fill);
        })
    }

    function resetBoard(){
        board.fill("");
    }


    return {render, eventListener,removeListener, resetBoard};
})();
/* Players */

const player = (name, weapon) => {
    const active = false;
    return {name, weapon, active};
}

/* Flow of the Game */
const game = (() => {
    let gameRunning = false;
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
        this.announceWinner = document.querySelector("#announce-winner");
    }
    
    function setPlayerName(){
        player1.name = (player1Name.value) ? player1Name.value : "Player 1";
        player2.name = (player2Name.value) ? player2Name.value : "Player 2";
    }

    function eventListener() {
        startBtn.addEventListener('click', startGame);
        restart.addEventListener('click', function() {
            form.style.display = 'block';
            if(gameRunning) endGame("C");
        });
    }

    function startGame(){
        gameRunning = true;
        setPlayerName();
        announceWinner.textContent = "";
        gameBoard.render();
        gameBoard.eventListener();
        form.style.display = 'none';
        player1.active = true;
    }

    function getWeapon(){
        return (player1.active) ? player1.weapon : player2.weapon;
    }

    function changePlayer(){
        player1.active = (player1.active) ? false : true;
        player2.active = (player2.active) ? false : true;
    }

    function endGame(winCode){
        announceWinner.textContent = (winCode === "T") ? "It's a tie!":
            (winCode === "X") ? '' + player1.name + " won":
            (winCode === "O") ? '' + player2.name + " won":
            (winCode === "C") ? "Game was cancelled!": "Something wrong happened";
            gameBoard.resetBoard();
            gameBoard.removeListener();
            gameRunning = false;
        }

    return {init, startGame, getWeapon, changePlayer, endGame};
})();

game.init();
