/*
 * Create a list that holds all of your cards
 */


/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

 
//Create an Array which holds all of the cards
let icons = ["fa-diamond", "fa-diamond", "fa-paper-plane-o", "fa-paper-plane-o", "fa-anchor", "fa-anchor",
				"fa-bolt", "fa-bolt", "fa-cube", "fa-cube", "fa-leaf", "fa-leaf", "fa-bicycle", "fa-bicycle", "fa-bomb", "fa-bomb"];
const deck = $('.deck');

//Variables for moves
let moves = 0;
let movesCounter = document.querySelector('.moves');

//Variable for matched cards
let matchedCards = document.querySelectorAll('.match');				

//Array to hold the comparing cards value
let openedArray = [];

//Variables for timer
let timer = document.getElementById('timer');
let sec = 0;
let	min = 0; 
let interval;
let winTime;

//Variable for stars
let stars = document.querySelectorAll('.fa-star');

//popup variable
let popup = document.querySelector('.popup-container');

//Variable for rating
let rating = document.querySelector('.rating');

//close-icon variable
let closeIcon = document.querySelector('.close-icon');

//play-again button
let replay = document.getElementById('replay-button');
 
// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

//Function to change the rating
function starRating () {

	if (moves === 10) {
		for(let i= 0; i < 3; i++){
            if(i > 1){
                stars[i].style.visibility = 'hidden';
            }
        }
	}
	
	else if (moves === 16 ) {
		for( i= 0; i < 3; i++){
            if(i > 0){
                stars[i].style.visibility = 'hidden';
            }
        }
	}
	
}	

//Show cards and check if they are matching or not.
function flipCard () {
	let cards = document.getElementsByClassName('card');
	for(let i = 0; i <cards.length; i++) {
		
		//Add cilck event to show cards
		let element = cards[i];
		element.addEventListener('click', function() {
			
			//Put the open card to the openedArray
			openedArray.push(cards[i]);
			
			//Make sure that, just the two cards open
			if (openedArray.length < 3) {
				this.classList.add('open', 'show', 'disabled');
			}
			
			//Check if the symbols are matched or not
			if (openedArray.length === 2) {
			
				//count the moves
				moves++;
				movesCounter.innerHTML = moves;
				
				//change the star rating, according to the moves
				starRating();
				
				//if the card matched 
				if (openedArray[0].innerHTML === openedArray[1].innerHTML) {
					
					openedArray[0].classList.add('match');
					openedArray[1].classList.add('match');
					openedArray[0].classList.remove('show', 'open');
					openedArray[1].classList.remove('show', 'open');
					openedArray = [];
					matchedCards++;
				}
				
				//if the card not matched
				else {
					openedArray[0].classList.add("notmatched");
					openedArray[1].classList.add("notmatched");
					
					//Call setTimeout method
					setTimeout(function(){
						openedArray[0].classList.remove("show", "open", "disabled", "notmatched");
						openedArray[1].classList.remove("show", "open", "disabled", "notmatched");
						openedArray = [];
					},1000);
				}
			}
		});
	}
}

//Timer function
function startTimer () {
	
	interval = setInterval( function () {
		timer.innerHTML = 'Time: '+((min < 10) ? '0' + min : min) + ':' + ((sec < 10) ? '0' + sec : sec);
		sec++;
		if(sec === 60) {
			min++;
			sec = 0;
		}
	},1000);
	
}

//When the pageload, start the startGame function
document.body.onload = startGame();

//startGame function	
function startGame() {
	
	//Call shuffle function
	cards = shuffle(icons);
	
	//Remove all child nodes
	deck.empty();
	
	//Add the shuffled child nodes to
    for (let i = 0; i < icons.length; i++){
		deck.append('<li class="card"><i class="fa ' + icons[i] + '"></i></li>');
	}	
	
	//Call flipCard function
	flipCard();
	
	//reset moves and matched cards
	moves = 0;
	movesCounter.innerHTML = moves;
	matchedCards = 0;
	openedArray = [];
	
	//reset rating
	for (var i= 0; i < stars.length; i++){
        stars[i].style.visibility = 'visible';
    }
	
	//reset timer
	sec =0;
	min = 0;
	hour = 0;
	clearInterval(interval);
	
	//start timer
	startTimer();
	
	//Event listener if the player win the game
	let card = document.getElementsByClassName('card');
		for(let i = 0; i <card.length; i++) {
			card[i].addEventListener('click', winGame);
		}
	
}

//Function, if player win the game
function winGame() {
	if(matchedCards === 8) {
		
		clearInterval(interval);
		let winTime = timer.innerHTML;
		
		//show the congrat popup
		popup.classList.remove('hidden');
		let star = document.querySelector('.stars').innerHTML;
		document.querySelector('.final-moves').innerHTML = moves;
		document.querySelector('.final-time').innerHTML = winTime;
		rating.innerHTML = star;
		
		//close congrat popup
		closePopup();
		
		//play again the game
		playAgain();
	}
}

//Handle the restart button, onclick reset the game
function restart () {
	//Variable for restart button
	let restart = document.querySelector('.fa-repeat');
	restart.addEventListener('click', startGame);
}

//Function to close the popup modal
function closePopup() {
	closeIcon.addEventListener('click', function () {
		popup.classList.add('hidden');
		rating.innerHTML = '';
		startGame();
	});
}

//Function to play again the game
function playAgain() {
	replay.addEventListener('click', function () {
		popup.classList.add('hidden');
		rating.innerHTML = '';
		startGame();
	});
}

restart();
winGame();
/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
