// Here we declare the varubles .
const deck = document.getElementById('Deck');
const cards = deck.getElementsByTagName("li");
const icons = deck.getElementsByTagName("i");
let timecount = 0;
let openedCards = [];
let numOfMove = 0;
let time = 0;
let timeleft = 3;
let numberOfMatchedCards = 0 ;

// here we call the function that we need .
randomClass();
numberOfMoves();

// Timer https://stackoverflow.com/questions/31106189/create-a-simple-10-second-countdown
let startTimer = setInterval(function(){
  timeleft--;
  document.getElementById("countdowntimer").textContent = timeleft;
  if(timeleft <= 0){
      clearInterval(startTimer);
  }

  if(timeleft == 0){
    document.getElementById("countdowntimer").textContent = "Good Luck !!";
    timer();
  }
},1000);

// here th function of the timer
function timer() {
  time = setInterval(function(){ // here we used var so we canm stop the time from outside the function
    timecount++;
    document.getElementById("countdowntimer").textContent = timecount;
    removeStars();
  },1000);
}

//Delay from https://stackoverflow.com/questions/17883692/how-to-set-time-delay-in-javascript
setTimeout(function(){
        setUpCards();
},3000); // 3 Sec

// this function to remove the old classes and add the new random classes
function randomClass(){
  let iconClassName = [];
  for (let i = 0; i < icons.length; i++) {
     iconClassName[i] = icons[i].className;
   }

   shuffle(iconClassName);

   for (let i = 0; i < iconClassName.length; i++) {
     icons[i].removeAttribute("class");
     icons[i].setAttribute("class",iconClassName[i]);
     // here we give every card an id to use it later in clicking
     icons[i].setAttribute("id",i);
   }
}

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    let currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

// This function to add event Listener to the cards list
function setUpCards(){
  for (let i = 0; i < cards.length; i++) {
    cards[i].removeAttribute("class");
    cards[i].setAttribute("class","card");
    cards[i].onclick = function() {
      if (!cards[i].classList.contains('match')){
        if (!cards[i].classList.contains('open') && !cards[i].classList.contains('show')){
          clicked(i);
        }
      }
    }
  }
}

// this function fire when any of the card has been clicked
function clicked(i){
  if (openedCards.length == 2) {
    openedCards = [];
  }
    open(i);
}

//this function to open a card when it's clicked
function open(i){
  cards[i].classList.add('open','show');
  openedCards.push(icons[i].className);
  isMatch(i);
}

//This function to check if the Two cards are equals or not
function isMatch(i){
  if (openedCards !== 'undefined' && openedCards.length == 2) {
    if (openedCards[0] == openedCards[1]){
      matched();
      win(i);

    }else if (openedCards[0] != openedCards[1]){
      notMatched();
    }
    numOfMove++;
    numberOfMoves();
  }
}

//This function fire when the two cards are matched.
function matched(){
  // add a class to multiple elements
  // From here https://stackoverflow.com/questions/32586594/how-to-add-a-class-to-multiple-elements
  let classIcon = openedCards[0];
  classIcon = "."+classIcon.replace(/ /g,".");
  let icon = document.querySelectorAll(classIcon);
  for (let i = 0; i < icon.length; i++) {
    icon[i].parentElement.classList.add('match');
    icon[i].parentElement.classList.remove('open','show');
  }
}

//function if the two cards didn't match
function notMatched(){
  let icon = document.querySelectorAll('.open','.show');
  for (let i = 0; i < icon.length; i++) {
    setTimeout(function(){
      icon[i].classList.remove('open','show');
    },500);
  }
}

// this function for increasing the number of movement
function numberOfMoves(){
  let move = document.getElementsByClassName('moves');
  move[0].textContent = numOfMove;
  removeStars();
}

//In this function we reomve the stars
function removeStars() {
  if (timecount > 30 || numOfMove > 16) {
    document.getElementById('1').style.visibility = "hidden";
    document.getElementById('W1').style.visibility = "hidden";
  }
  if (timecount > 60 || numOfMove > 32) {
    document.getElementById('2').style.visibility = "hidden";
    document.getElementById('W2').style.visibility = "hidden";
  }
  if (timecount > 90 || numOfMove > 48){
    document.getElementById('3').style.visibility = "hidden";
    document.getElementById('W3').style.visibility = "hidden";
  }
}

//this function to restart the game
function restart() {
    console.log('test');
    window.location.reload();
}

// this function for win View
function win(i){
  const winView = document.getElementsByClassName('win')[0];

  if (cards[i].classList.contains('match')) {
    numberOfMatchedCards ++;
  }

  // the player has win the game
  if(numberOfMatchedCards == 8){
    // stop the time
    clearInterval(time);
    // here we hide everything
    document.getElementsByClassName('main')[0].style.visibility = "hidden";
    // Here we show the win view
    winView.style.visibility = "visible";
    winView.style.display = "flex"
    document.getElementById('timer').textContent= timecount;
    document.getElementById('allmoves').textContent = numOfMove;
    removeStars();
  }
}
