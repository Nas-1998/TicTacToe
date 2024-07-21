const prompt = require('prompt-sync')();
let sides = ['X', 'O']

let gameBoard = 
[[" . ", " . ", " . "]
,[" . ", " . ", " . "]
,[" . ", " . ", " . "]]

class Player {
    constructor(name) {
        //this.wins = 0
        //this.losses = 0
        this.name = name
        this.side = null
    }

    askName() 
    {
        this.name = prompt("What is your name?  ");
    }
}

class HumanPlayer extends Player 
{
    constructor(name) {
        super(name);
        this.side = null
    }

    pickSide(sides) 
    {
        let pass = false
        let sideChoice 
        while(!pass)
        {
            let index = prompt("Are you 1. X or are you 2. O:   ")
            if(index == 1 || index == 2)
            {
                this.side = sides[parseInt(index) - 1]
                sides.splice(parseInt(index) - 1, 1);
                pass = true
            }
            
            else
            {
                console.log("Try again")
            }
        }    
    }

    choice() 
    {
        let posRow = prompt("Select your row position on the 3 x 3 gameboard 0, 1, 2:   ");
        let posCol = prompt("Select your column position on the 3 x 3 gameboard 0, 1, 2:   ");
        posRow = parseInt(posRow);
        posCol = parseInt(posCol);
        let done = false
        while(!done)
        if((posRow >= 0 && posCol < 3) && (posCol >= 0 && posCol < 3)) 
        {
            if(gameBoard[posRow][posCol] === ' . ')
            {
                gameBoard[posRow][posCol] = this.side
                done = true
            }
            else 
            {
                alert("Invalid choice, pick again");
            }
        } 
        else 
        {
            alert("Invalid choice, pick again");
        }
    }
}

class CPU extends Player {
    constructor(name = 'CPU') {
        super(name);
        this.side = null
    }
    cpuSide(sides)
    {  
        this.side = sides[0]    
    }

    choice() 
    {
        
        let done = false
        while(!done)
        {
        let posRow = Math.floor(Math.random() * 3)
        let posCol = Math.floor(Math.random() * 3)
        if((posRow >= 0 && posCol < 3) && (posCol >= 0 && posCol < 3)) 
        {
            if(gameBoard[posRow][posCol] === ' . ')
            {
                gameBoard[posRow][posCol] = this.side
                done = true
            }
        } 
    }
    }
}

class Game {
    constructor(player1, cpu) 
    {
        this.player1 = player1;
        this.cpu = cpu;
        this.winner = null;
    }

    logic() 
    {
        let whoWon = false
        while(!whoWon)
        {
            
            this.player1.choice();
            if(this.checkWin(this.player1.side))
            {
                this.winner = this.player1
                console.log("Winner " + this.player1.name)
                console.log(gameBoard.map(row => row.join(' ')).join('\n'));
                return
            }
        
            this.cpu.choice();
            if(this.checkWin(this.cpu.side))
            {
                this.winner = this.cpu
                console.log("Winner " + this.cpu.name)
                console.log(gameBoard.map(row => row.join(' ')).join('\n'));
                return
            }
            console.log(gameBoard.map(row => row.join(' ')).join('\n'));
            
        }
    }
    
    checkWin(side)
    {
        //for rows
        for(let row = 0; row < 3; row++)
            {
                if(gameBoard[row][0] !== ' . ' && gameBoard[row][0] == gameBoard[row][1] && gameBoard[row][0] == gameBoard[row][2])
                {
                    return true     
                }
                
            }
        for(let col = 0;  col < 3; col++)
            {
                if(gameBoard[0][col] !== ' . ' && gameBoard[0][col] == gameBoard[1][col] && gameBoard[0][col] == gameBoard[2][col])
                {
                    return true
                }
                    
            }
        if(gameBoard[0][0] !== ' . ' && gameBoard[0][0] == gameBoard[1][1] && gameBoard[0][0] && gameBoard[2][2])
        {
            return true       
        }
        if(gameBoard[0][2] !== ' . ' && gameBoard[0][2] == gameBoard[1][1] && gameBoard[0][2] && gameBoard[2][0])
        {
            return true
        }
        return false
    }
    
}


let player = new HumanPlayer();
player.askName();
let cpu = new CPU();
player.pickSide(sides)
cpu.cpuSide(sides)
console.log(gameBoard.map(row => row.join(' ')).join('\n'));

let game = new Game(player, cpu);
game.logic()

// 