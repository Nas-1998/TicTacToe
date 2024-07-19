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
        this.name = prompt("What is your name?");
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
        while(pass == false)
        {
            let index = prompt("Are you 1. X or are you 2. O")
            if(index == 1 || index == 2)
            {
                this.side = sides[parseInt(index)]
                sides[parseInt(index)] = " . "
                return this.side
            }
            
            else
            {
                console.log("Try again")
            }
        }    
    }

    choice() 
    {
        let posRow = prompt("Select your row position on the 3 x 3 gameboard 0, 1, 2 ");
        let posCol = prompt("Select your column position on the 3 x 3 gameboard 0, 1, 2");
        let done = false
        while(done == false)
        if((posRow >= 0 && posCol < 3) && (posCol >= 0 && posCol < 3)) 
        {
            if(gameBoard[posRow][posCol] !== ('X' || 'Y'))
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
        if(sides[0] !== 'X' || sides[0] !== 'Y')
        {
            this.side = sides[1]
        }
        else
        {
            this.side = sides[0]
        }
    }

    choice() {
        let randomIndex = Math.floor(Math.random() * choices.length);
        return choices[randomIndex];
    }
}

class Game {
    constructor(player1, cpu) {
        this.player1 = player1;
        this.cpu = cpu;
        this.winner = null;
    }

    logic() {
        const humanChoice = this.player1.choice();
        const cpuChoice = this.cpu.choice();

        if (humanChoice === cpuChoice) {
            this.winner = "It's a tie";
            return this.winner;
        }

        if (
            (humanChoice === "Rock" && cpuChoice === "Scissors") ||
            (humanChoice === "Scissors" && cpuChoice === "Paper") ||
            (humanChoice === "Paper" && cpuChoice === "Rock")
        ) {
            this.player1.wins++;
            this.cpu.losses++;
            this.winner = `${this.player1.name} has won`;
            return this.winner;
        } else {
            this.player1.losses++;
            this.cpu.wins++;
            this.winner = `${this.cpu.name} has won`;
            return this.winner;
        }
    }
}

// Example usage
let player = new HumanPlayer();
player.askName();
let cpu = new CPU();

let game = new Game(player, cpu);

console.log(game.logic());
