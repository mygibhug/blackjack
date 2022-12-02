var cards = [];
var suits = ["spades", "hearts", "clubs", "diamonds"];
var numb = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];
var playerHand = [];
var dealerHand = [];

var cardCount = 0;
var playerWallet = 1000;
var endplay   = false;

var message = document.getElementById('message');
var output = document.getElementById('output');
var dealerHolder = document.getElementById('dealerHolder');
var playerHolder = document.getElementById('playerHolder');
var pValue = document.getElementById('pValue');
var dValue = document.getElementById('dValue');
var dollarValue = document.getElementById('dollars');

document.getElementById('mybet').onchange = function () {
    if (this.value < 0) {
        this.value = 0;
    }
    if (this.value > playerWallet) {
        this.value = playerWallet;
    }
}

for (s in suits) {
    var suit = suits[s][0].toUpperCase();
    var bgcolor = (suit == "S" || suit == "C") ? "black" : "red";
    for (n in numb) {
        //output.innerHTML += "<span style='color:" + bgcolor + "'>&" + suits[s] + ";" + numb[n] + "</span> ";
        var cardValue = (n > 9) ? 10 : parseInt(n) + 1;
        //var cardValue = 1;
        var card = {
            suit: suit,
            icon: suits[s],
            bgcolor: bgcolor,
            cardnum: numb[n],
            cardvalue: cardValue
        }
        cards.push(card);
    }
}

function Start() {
    console.log("Game Started :)");
    shuffleDeck(cards);
    dealNew();
    document.getElementById('start').style.display = 'none';
    dollarValue.innerHTML = playerWallet;
}

function dealNew() {
    dValue.innerHTML = "?";
    playerHand = [];
    dealerHand = [];
    dealerHolder.innerHTML = "";
    playerHolder.innerHTML = "";
    var betvalue = document.getElementById('mybet').value;
    playerWallet = playerWallet - betvalue;
    document.getElementById('dollars').innerHTML = playerWallet;
    document.getElementById('myactions').style.display = 'block';
    message.innerHTML = "Get up to 21 and beat the dealer to win.<br>Current bet is $" + betvalue;
    document.getElementById('mybet').disabled = true;
    document.getElementById('maxbet').disabled = true;
    deal();
    document.getElementById('btndeal').style.display = 'none';
}

function redeal() {
    cardCount++;
    if (cardCount > 40) {
        console.log("NEW DECK");
        shuffleDeck(cards);
        cardCount = 0;
        message.innerHTML = "New Shuffle";
    }
}

function deal() {
    for (x = 0; x < 2; x++) {
        dealerHand.push(cards[cardCount]);
        dealerHolder.innerHTML += cardOutput(cardCount, x);
        if (x == 0) {
            dealerHolder.innerHTML += '<div id="cover" style="left:100px;"></div>';
        }
        redeal();
        playerHand.push(cards[cardCount]);
        playerHolder.innerHTML += cardOutput(cardCount, x);
        redeal();
    }
    var playerScore = checktotal(playerHand);
    var dealerScore = checktotal(dealerHand);
    if (playerScore == 21 && playerHand.length == 2) {
        endRound();
    }
    //else if(dealerScore == 21 && dealerHand.length == 2){
      //  endRound();
    //}
    
    pValue.innerHTML = playerScore;

}

function cardOutput(n, x) {
    var typeCard = (x > 0) ? x * 60 + 100 : 100; 
    return '<div class="icard ' + cards[n].icon + '" style="left:' + typeCard + 'px;">  <div class="top-card suit">' + cards[n].cardnum + '<br></div>  <div class="content-card suit"></div>  <div class="bottom-card suit">' + cards[n].cardnum +
        '<br></div> </div>';
}

function maxbet() {
    document.getElementById('mybet').value = playerWallet;
    message.innerHTML = "Bet changed to $" + playerWallet;
}

function cardAction(a) {
    console.log(a);
    switch (a) {
        case 'hit':
            addCard(); //add another card to players hand
            break;
        case 'hold':
            endRound(); //end round and update the payout function
            break;
        case 'double':
            var betvalue = parseInt(document.getElementById('mybet').value);
            if ((playerWallet - betvalue) < 0) {
                betvalue = betvalue + playerWallet;
                playerWallet = 0;
            } else {
                playerWallet = playerWallet - betvalue;
                betvalue = betvalue * 2;
            }
            document.getElementById('dollars').innerHTML = playerWallet;
            document.getElementById('mybet').value = betvalue;
            addCard(); 
            endRound(); 
            break;
        default:
            console.log('done');
            endRound(); 
    }
}

function addCard() {
    playerHand.push(cards[cardCount]);
    playerHolder.innerHTML += cardOutput(cardCount, (playerHand.length - 1));
    redeal();
    var rValu = checktotal(playerHand);
    pValue.innerHTML = rValu;
    if (rValu > 21) {
        message.innerHTML = "busted!";
        endRound();
    }
}

function endRound() {
    endplay = true;
    document.getElementById('cover').style.display = 'none';
    document.getElementById('myactions').style.display = 'none';
    document.getElementById('btndeal').style.display = 'block';
    document.getElementById('mybet').disabled = false;
    document.getElementById('maxbet').disabled = false;
    message.innerHTML = "Game Over<br>";
    var payoutJack = 1;
    var dealervalue = checktotal(dealerHand);
    dValue.innerHTML = dealervalue;

    while (dealervalue < 17) {
        dealerHand.push(cards[cardCount]);
        dealerHolder.innerHTML += cardOutput(cardCount, (dealerHand.length - 1));
        redeal();
        dealervalue = checktotal(dealerHand);
        dValue.innerHTML = dealervalue;
    }

    
    var playerScore = checktotal(playerHand);
    if (playerScore == 21 && playerHand.length == 2) {
        message.innerHTML = "Blackjack Baby!!! ";
        payoutJack = 1.5;
        
    }
    //else if (dealerScore == 21 && playerHand.length ==2){
      //  message.innerHTML = "Hey it's not the Dealers Fault. It's the house's. ";
    //}
    //else if ((dealerScore == 21 && playerHand.length ==2) && (playerScore == 21 && playerHand.length ==2)){
       // message.innerHTML = "Wow, that doesn't happen everyday. A ";
    //}

    var betvalue = parseInt(document.getElementById('mybet').value) * payoutJack;
    if ((playerScore < 22 && dealervalue < playerScore) || (dealervalue > 21 && playerScore < 22)) {
        message.innerHTML += '<span style="color:green;">You WIN: $' + betvalue + '</span>';
        playerWallet = playerWallet + (betvalue * 2);
        
    } else if (playerScore > 21) {
        message.innerHTML += '<span style="color:red;">Dealer Wins! You lost $' + betvalue + '</span>';
        
    } else if (playerScore == dealervalue) {
        message.innerHTML += '<span style="color:blue;">PUSH!</span>';
        playerWallet = playerWallet + betvalue;
        
    } else {
        message.innerHTML += '<span style="color:red;">Dealer Wins! You lost $' + betvalue + '</span>';
        
    }
    pValue.innerHTML = playerScore;
    dollarValue.innerHTML = playerWallet;
    newDeal();
}

function checktotal(arr) {
    var rValue = 0;
    var aceAdjust = false;
    for (var i in arr) {
        if (arr[i].cardnum == 'A' && !aceAdjust) {
            aceAdjust = true;
            rValue = rValue + 10;
        }
        rValue = rValue + arr[i].cardvalue;
    }

    if (aceAdjust && rValue > 21) {
        rValue = rValue - 10;
    }
    return rValue;
}

function shuffleDeck(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    return array;
}

function outputCard() {
    output.innerHTML += "<span style='color:" + cards[cardCount].bgcolor + "'>" + cards[cardCount].cardnum + "&" + cards[cardCount].icon + ";</span>  ";
}