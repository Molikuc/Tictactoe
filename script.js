/* Gameboard */
const gameBoard= (() => {
    let board = ["","X","","","","O","","",""];
    const displayBoard = document.querySelectorAll('.block');
    const win = [
        [0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]
    ];

    function render(){
        console.log("init");
        for(let i=0; i < board.length; i++){
            displayBoard[i].textContent = board[i];
        }
    }

    return {render};
})();
/* Players */

const player = (name) => {
    return {name};
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
        console.log("oui");
    }

    return {init, startGame};
})();

game.init();
