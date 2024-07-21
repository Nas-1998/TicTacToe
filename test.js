logic() 
{
    let whoWon = false
    while(!whoWon)
    {
        console.log(gameBoard.map(row => row.join(' ')).join('\n'));
        this.player1.choice();
        if(this.checkWin(this.player1.side))
        {
            this.winner = this.player1
            console.log("Winner " + this.player1.name)
            return
        }
    
        console.log(gameBoard.map(row => row.join(' ')).join('\n'));
        this.cpu.choice();
        if(this.checkWin(this.cpu.side))
        {
            this.winner = this.cpu
            console.log("Winner " + this.cpu.name)
            return
        }
        
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
    if(gameBoard[0][0] !== ' . ' && gameBoard[0][0] == gameBoard[1][1] && gameBoard[1][1] && gameBoard[2][2])
    {
        return true       
    }
    if(gameBoard[0][2] !== ' . ' && gameBoard[0][2] == gameBoard[1][1] && gameBoard[1][1] && gameBoard[2][0])
    {
        return true
    }
    return false
}
