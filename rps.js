      const score = JSON.parse(localStorage.getItem('score')) || { wins:0,loses:0,ties:0 };

      //DOM
      updateScoreElement();

      function resetScore() {
       
        localStorage.removeItem('score');
        //Resets the current game score
        score.wins = 0;
        score.loses = 0;
        score.ties = 0;
      }
      
      //Defaultly autoplay is disbled at first and then when we click the button.it sets to 'true'.
      let isAutoPlaying = false;
      //setInterval returns a number.The number can be used to stop the interval by passing to a built-in function CLEARINTERVAL().It acts as an ID to stop the interval.We defined it outside so 
      let intervalId;

      //AUTOPLAY FEATURE
      function autoPlay() {
        //Check if autoplay is off.If its off,start autoplay.else stop it.
        if (!isAutoPlaying){
          //This is a callback function so used arrow function.

          intervalId = setInterval(() => { 
            let playerMove = pickComputerMove();
            playGame(playerMove);
          },1000 ); 
          //set it true as autoplay is on.
          isAutoPlaying = true;
          autoplayButton.innerHTML = 'Stop AutoPlay';
        } else { 
          clearInterval(intervalId);
          //set it to false as autoplay is off.
          isAutoPlaying = false;
          autoplayButton.innerHTML = 'AutoPlay';
        }
        }

      //EventListeners
       
      document.querySelector('.js-rock-button')
        .addEventListener('click', () => {
          playGame('rock');
        });

      document.querySelector('.js-paper-button')
        .addEventListener('click', () => {
          playGame('paper');
        });
      document.querySelector('.js-scissor-button')
        .addEventListener('click', () => {
          playGame('scissors');
        });
        //Autoplay event listener.
        const autoplayButton = document.querySelector('.js-autoplay-button');
        autoplayButton.addEventListener('click',() => {
          autoPlay();
        })
        //resetscore event listener
        document.querySelector('.js-reset-button')
          .addEventListener('click',() =>{
            resetConfirmation(); 
          })


        //Responding to keys being pressed anywhere in the webpage.
        document.body.addEventListener('keydown',(event) => {
          if(event.key === 'a')
            autoPlay();
        })
        document.body.addEventListener('keydown',(event) => {
          if(event.key === 'Backspace')
            resetConfirmation();
        })

        document.body.addEventListener('keydown',(event) => {
          if(event.key === 'r'){
            playGame('rock')
          } else if(event.key === 'p'){
            playGame('paper');
          } else if (event.key === 's') {
            playGame('scissors');
          }
        });

        function resetConfirmation() {
          document.querySelector('.js-reset-confirmation')
            .innerHTML = `Are you Sure? 
            <button class="confirm-yes js-confirm-yes">Yes</button>
            <button class="confirm-no js-confirm-no">No</button> `;
          //clicking Yes button.  
          document.querySelector('.js-confirm-yes')
            .addEventListener('click',() => {
              resetScore();
              updateScoreElement();
              document.querySelector('.js-reset-confirmation')
            .innerHTML = ``;
            });
           //clicking no button
           document.querySelector('.js-confirm-no')
           .addEventListener('click',() => {
             document.querySelector('.js-reset-confirmation')
           .innerHTML = ``;
           });
        }


        //Player Move

      function playGame(playerMove) {        
        const computerMove = pickComputerMove();
        //DOM
        document.querySelector('.js-moves')
          .innerHTML = `You <img src="images/${playerMove}-emoji.png" alt="rock-png" class="your-move-emoji"><img src="images/${computerMove}-emoji.png" alt="rock-png" class="your-move-emoji"> Computer `; 

        let result = "";
        
        //Rock Move
        if (playerMove === 'rock') {
          if (computerMove=== 'rock') {
            result = 'Tie';
          }
          else if (computerMove === 'paper') {
            result = 'Lose'; 
          }
          else if (computerMove === 'scissors') {
            result = 'Win';
          }

        }

        //paper Move
        else if (playerMove === "paper") {
          if (computerMove === "rock") {
            result = "Win";
          } else if (computerMove === "paper") {
            result = "Tie";
          } else if (computerMove === "scissors") {
            result = "Lose";
          }
        }

        //scissors Move
        else {
          if (computerMove === "rock") {
            result = "Lose";
          } else if (computerMove === "paper") {
            result = "Win";
          } else if (computerMove === "scissors") {
            result = "Tie";
          }
        }

        //DOM
        document.querySelector('.js-result').innerHTML = result;
        
        if (result === 'Win') {
          score.wins += 1;
        }
        else if (result === 'Lose') {
          score.loses += 1;
        }

        else {
          score.ties += 1;
        }
     
        localStorage.setItem('score',JSON.stringify(score));

        //DOM
        updateScoreElement();

      }
      //DOM
      function updateScoreElement() {
        document.querySelector('.js-score')
          .innerHTML = `Wins: ${score.wins},Loses: ${score.loses},Ties: ${score.ties}`;
                       
      }

      function pickComputerMove() {
        //RANDOM MOVE BY COMPUTER
    
        let randomNumber = Math.random();
        let computerMove = "";

        if (randomNumber >= 0 && randomNumber < 1 / 3) {
          computerMove = "rock";
        } else if (randomNumber >= 1 / 3 && randomNumber < 2 / 3) {
          computerMove = "paper";
        } else if (randomNumber >= 2 / 3 && randomNumber < 1) {
          computerMove = "scissors";
        }

        return computerMove;
      }
   
