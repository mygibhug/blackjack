var dealerSum = 0;
var playerSum = 0;

var dealerAces = 0;
var playerAces = 0;

var playerWallet = 0;
var playerBet = 0;

var hidden;
var deck;
var decks;
var numDecks = 5;

var canHit = true;
var canSplit = false;
var canDouble = true;
var cont= true;
var hitCount = true;

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

function shuffleDeck(){
    for(let i=0; i<deck.length;i++){
        let j = Math.floor(Math.random() * deck.length);
        let temp = deck[i];
        deck[i] = deck[j];
        deck[j] = temp;
    }
}

function startGame(){
    playerWallet=1000;

       // playerBet = document.getElementById("bet").submit();
    hidden = deck.pop();
    dealerSum += getValue(hidden);
    dealerAces += ace(hidden);

    for(let i = 0; i<1; i++){
        let cardImg = document.createElement("img");
        let card = deck.pop();
        cardImg.src = "./cards/" + card + ".png";
        dealerSum += getValue(card);
        dealerAces += ace(card);
        document.getElementById("dealer-cards").append(cardImg);
    }

    for(let i = 0; i<2; i++){
        let cardImg = document.createElement("img");
        let card = deck.pop();
        cardImg.src = "./cards/" + card + ".png";
        playerSum += getValue(card);
        playerAces += ace(card);
        document.getElementById("your-cards").append(cardImg);
        document.getElementById("your-sum").innerText = playerSum;
    }
    
    document.getElementById("hit").addEventListener("click", hit);
    document.getElementById("stay").addEventListener("click", stay);

    //nextround();
    }
//}

function hit(){
    if(!canHit) {
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

    if(reduceAce(playerSum,playerAces)> 21){
        canHit=false;
    }

}

function stay(){
    dealerSum = reduceAce(dealerSum, dealerAces);
    playerSum = reduceAce(playerSum, playerAces);

    canHit=false;
    document.getElementById("hidden").src = "./cards/" + hidden + ".png";
    while(dealerSum < 17){
        let cardImg = document.createElement("img");
        let card = deck.pop();
        cardImg.src = "./cards/" + card + ".png";
        dealerSum += getValue(card);
        dealerAces += ace(card);
        document.getElementById("dealer-cards").append(cardImg);
    }

    let message = "";
    if(playerSum > 21){
        message= "You Lose!";
    }

    else if (dealerSum > 21){
        message= "You Win!";
    }

    else if (playerSum==dealerSum){
        message="A Push!";
    }

    else if (playerSum>dealerSum){
        message= "You Win!";
    }

    else if (playerSum<dealerSum){
        message= "You Lose!";
    }

    document.getElementById("results").innerText = message;
    document.getElementById("dealer-sum").innerText = dealerSum;
}

function getValue(card){
    let data = card.split('-');
    let value = data[0];


    if(isNaN(value)){
        if (value == "A"){
            return 11;
        }
        return 10;
    }
    return parseInt(value);
}

function ace(card){
    if (card[0] == "A" ){
        return 1;
    }
    return 0;
}

function reduceAce(playerSum,playerAces){

    while(playerSum > 21 && playerAces > 0){
        playerSum -=10;
        playerAces -=1;
    }

    return playerSum;
}

//function nextround(){

//}
