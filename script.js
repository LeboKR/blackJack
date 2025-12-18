
const startGameBtn = document.getElementById('start-game');

startGameBtn.addEventListener('click', function() {
    const playerName = document.getElementById('player-name').value;
    let betAmount = document.getElementById('bet-amount').value;
    const okayBtnEl = document.getElementById('okayBtn');

    if (playerName && betAmount) {
        
        const gameAreaDiv = document.querySelector('#game-area');
        gameAreaDiv.innerHTML = 
        `
        <h4 style= "font-weight: light;">
            Welcome ${playerName}!<br>
            Your bet amount is $${betAmount}.<br>
            Here are the game instructions:
        </h4>
        <p>
        ~ Click 'Get New Card' to draw a card.<br>
        ~ Click 'Cash Out' to end the game.<br>
        ~ Click 'Clear Hand' to reset your hand.<br>
        </p>
        `
        okayBtnEl.innerHTML = '<button>Okay</button>'

        okayBtnEl.addEventListener('click', function() {
            renderGame();
        })
    }

    if (!playerName) {
       alert('Please enter your name to start the game');
        
    }

    if (!betAmount) {
        alert('Please enter a bet amount to start the game');
    }

    function renderGame()
{
    console.log("Game started")
    const gameContainer = document.getElementById('game-area')
    gameContainer.style.display = 'block'
    const getCardsBtn = document.querySelector('#render-btn')
    let cardsInHand = []
    gameContainer.innerHTML = `
    <h4>${playerName} : ${"$" + betAmount}</h4>
    <p id="cardsInHandRendered">Cards : </p>
    
    <p id="sumRendered">Sum : </p>
    <button id="new-card-btn">Get New Card</button>
    <button id="cash-out-btn">Cash Out</button>
    `
    okayBtnEl.innerHTML = '<button>Clear Hand</button>'
    let renderedCardsEl = document.querySelector('#cardsInHandRendered')
    let sumRenderedEl = document.querySelector('#sumRendered')
    let renderedCards = ""
    let sum = 0
    let hasBlackJack = false
    let isAlive = true
    //TODO: Add event listeners for the new buttons
    //Cards logic to be implemented using arrays and random number generation
    let newCardBtnEl = document.getElementById('new-card-btn')

    newCardBtnEl.addEventListener('click', function() {

        if (isAlive && !hasBlackJack)
        {
            let newCard = Math.floor(Math.random() * 13) + 1
            cardsInHand.push(newCard)
            renderedCards = ''

                for(let x =0; x < cardsInHand.length; x++ )
                {
                    renderedCards += cardsInHand[x] + " "
                }

            sum += newCard
            renderedCardsEl.textContent = "Cards :" + renderedCards
            sumRenderedEl.textContent = "Sum :" + sum

            if (sum > 21)
            {
                isAlive = false
                gameContainer.innerHTML += `
                <p>
                    You are out of the game!
                    <br>
                    You lost $${(betAmount*0.25).toFixed(2)}
                </p>
                `
                okayBtnEl.innerHTML = '<button>Try Again</button>'
                newCardBtnEl.innerHTML = ""
                betAmount -= betAmount*0.25
                betAmount = betAmount.toFixed(2)
                
            }

            if (sum === 21)
            {
                hasBlackJack = true
                gameContainer.innerHTML += `
                <p>
                Congratulations! You've got Blackjack!
                <br>
                You won $${((betAmount * 1.5)-betAmount).toFixed(2)}
                </p>
                `
                okayBtnEl.innerHTML = '<button>Continue playing</button>'
                newCardBtnEl.innerHTML = ""
                betAmount *= 1.5
                betAmount = betAmount.toFixed(2)

        }
        }
})
    



}
})
