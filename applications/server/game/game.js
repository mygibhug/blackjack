var dealerSum = 0;
var playerSum = 0;

var dealerAces = 0;
var playerAces = 0;

var playerWallet = 1000;
var playerBet = 0;

var hidden;
var deck;
var decks;
var numDecks = 5;

var canHit = true;
var canSplit = false;
var canDouble = true;
var cont = true;
var hitCount = true;
var playerNatural = false;
var dealerNatural = false;
var blackJackPush = false;
var playAgain = true;

window.onload = function () {
    buildDeck();
    shuffleDeck();
    startGame();
}

function buildDeck() {
    let values = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];
    let types = ["C", "D", "H", "S"];
    deck = [];
    decks = [];

    for (let i = 0; i < types.length; i++) {
        for (let j = 0; j < values.length; j++) {
            deck.push(values[j] + "-" + types[i]);
        }
    }

}

function shuffleDeck() {
    for (let i = 0; i < deck.length; i++) {
        let j = Math.floor(Math.random() * deck.length);
        let temp = deck[i];
        deck[i] = deck[j];
        deck[j] = temp;
    }
}

//Most of the code for the game is written here.
function startGame() {
    //while(playAgain){
    // playerBet = document.getElementById("bet").submit();
    hidden = deck.pop();
    dealerSum += getValue(hidden);
    dealerAces += ace(hidden);

    //Code for showing and updating the playerBet
    document.getElementById("minimum").addEventListener("click", updateBet);
    document.getElementById("playerBet").innerText = playerBet;
    document.getElementById("playerWallet").innerText = playerWallet;

    //Dealer related code for cards and dealer sum
    for (let i = 0; i < 1; i++) {
        let cardImg = document.createElement("img");
        let card = deck.pop();
        cardImg.src = "./cards/" + card + ".png";
        dealerSum += getValue(card);
        dealerAces += ace(card);
        document.getElementById("dealer-cards").append(cardImg);
    }

    //Player related code for cards and player sum
    for (let i = 0; i < 2; i++) {
        let cardImg = document.createElement("img");
        let card = deck.pop();
        cardImg.src = "./cards/" + card + ".png";
        playerSum += getValue(card);
        playerAces += ace(card);
        document.getElementById("your-cards").append(cardImg);
        document.getElementById("your-sum").innerText = playerSum;
    }

    //This chunk of code will figure out the current score
    //of the player/dealer and will dictate which win scenario
    //will be triggered when stay is called.
    if ((playerSum == 21) && (dealerSum != 21)) {
        playerNatural = true;
        stay();
    }
    else if ((playerSum == 21) && (dealerSum == 21)) {
        blackJackPush = true;
        stay();
    }
    else if ((dealerSum == 21) && (playerSum != 21)) {
        dealerNatural = true;
        stay();
    }

    //Hit and Stay buttons- main buttons.
    //We will be adding the double down button shortly.
    document.getElementById("hit").addEventListener("click", hit);
    document.getElementById("stay").addEventListener("click", stay);
    document.getElementById("Double-Down").addEventListener("click", doubleDown);

    //nextround();
}
//}
//}

function hit() {
    if (!canHit) {
        return;
    }
    let cardImg = document.createElement("img");
    let card = deck.pop();
    cardImg.src = "./cards/" + card + ".png";
    playerSum += getValue(card);
    playerAces += ace(card);
    //
    document.getElementById("your-cards").append(cardImg);
    document.getElementById("your-sum").innerText = playerSum;

    if (reduceAce(playerSum, playerAces) > 21) {
        canHit = false;
        stay();
    }
    if (playerSum == 21) {
        stay();
    }

}

function stay() {
    dealerSum = reduceAce(dealerSum, dealerAces);
    playerSum = reduceAce(playerSum, playerAces);

    canHit = false;
    document.getElementById("hidden").src = "./cards/" + hidden + ".png";
    while (dealerSum < 17) {
        let cardImg = document.createElement("img");
        let card = deck.pop();
        cardImg.src = "./cards/" + card + ".png";
        dealerSum += getValue(card);
        dealerAces += ace(card);
        document.getElementById("dealer-cards").append(cardImg);
    }

    let message = "";
    if (playerSum > 21 && dealerNatural != true) {
        message = "You Lose!";
    }

    else if (dealerSum > 21 && playerNatural !=true) {
        message = "You Win!";
        playerWallet = win(false,playerWallet,playerBet);
        document.getElementById("playerWallet").innerText = playerWallet;
    }

    else if (playerSum == dealerSum && blackJackPush != true) {
        message = "A Push!";
    }

    else if (playerSum > dealerSum && playerNatural != true) {
        message = "You Win!";
        playerWallet = win(playerNatural,playerWallet,playerBet);
        document.getElementById("playerWallet").innerText = playerWallet;

    }

    else if (playerSum < dealerSum && dealerNatural != true) {
        message = "You Lose!";
    }
    else if (playerNatural == true) {
        message = "Blackjack Baby!";
        playerWallet = win(playerNatural,playerWallet,playerBet);
        document.getElementById("playerWallet").innerText = playerWallet;

    }
    else if (dealerNatural == true) {
        message = "Hey it's not the dealer's fault- it's the house's!"
    }


    document.getElementById("results").innerText = message;
    document.getElementById("dealer-sum").innerText = dealerSum;
}

function getValue(card) {
    let data = card.split('-');
    let value = data[0];


    if (isNaN(value)) {
        if (value == "A") {
            return 11;
        }
        return 10;
    }
    return parseInt(value);
}

function ace(card) {
    if (card[0] == "A") {
        return 1;
    }
    return 0;
}

function reduceAce(playerSum, playerAces) {

    while (playerSum > 21 && playerAces > 0) {
        playerSum -= 10;
        playerAces -= 1;
    }

    return playerSum;
}

//this does not work- trying to get done by EOD 11/28/2022
function playAgain() {

}

function updateBet() {
    playerBet += 10;
    playerWallet -= 10;
    document.getElementById("playerBet").innerText = playerBet;
    document.getElementById("playerWallet").innerText = playerWallet;

    return playerBet;
}

function win(playerNatural,playerWallet,playerBet) {
    var temp = 0
    var bet = playerBet;
    var wallet = playerWallet;

    if (playerNatural == true) {
        temp = (2.5 * bet);
        wallet += temp;
        document.getElementById("playerWallet").innerText = wallet;
    }
    else if(playerNatural!=true){
        temp = (2 * bet);
        wallet += temp;
        document.getElementById("playerWallet").innerText = wallet;
    }
    return wallet;
}

function doubleDown(){
    var temp = playerBet;
    playerBet = (2*temp);
    hit();
    playerWallet -=playerBet;
    document.getElementById("playerBet").innerText = playerBet;
    document.getElementById("playerWallet").innerText = playerWallet;

}