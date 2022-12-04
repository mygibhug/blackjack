import React, {useRef, useEffect, useState} from "react";
import "../assets/gameboard.css";
import Button from 'react-bootstrap/Button';
import { renderToString } from 'react-dom/server'

function Game(){

var cards = [];
var suits = ["spades", "hearts", "clubs", "diamonds"];
var numb = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];
var playerHand = [];
var dealerHand = [];

var cardCount = 0;
var playerWallet = 1000;
var endplay   = false;


//useRef(null); //document.getElementById('message');
var output = useRef(null);           //document.getElementById('output');
//const dealerHolder = React.useRef<HTMLDivElement>(null);               //document.getElementById('dealerHolder');
var dealerHolder = useRef(null);



var playerHolder = useRef(null);          //document.getElementById('playerHolder');
var pValue = useRef(null);                //document.getElementById('pValue');
var dValue = useRef(null);            //document.getElementById('dValue');
var dollarValue = useRef(null);           //document.getElementById('dollars');

var mybet = useRef(0);

//var mybetInputDisabled = new Boolean();
//var maxbetButtonDisabled = false;

var startEl = useRef(null);
//var startElStyleDisplay;

var btndeal = useRef(null);
//var btndealStyleDisplay;

var cover = useRef(null);
//var coverStyleDisplay;

//var maxbet = useRef(null);

//var myactions = useRef(initialValue);

const [message, setMessage] = useState("Press Start Button");
const [myactionsStyleDisplay, setmyactionsStyleDisplay] = useState("");

const [btndealStyleDisplay, setbtndealStyleDisplay] = useState("");
const [startElStyleDisplay, setStartElStyleDisplay] = useState("");
const [coverStyleDisplay, setCoverStyleDisplay] = useState("");
const [maxbetButtonDisabled, setmaxbetButtonDisabled] = useState(false);
const [mybetInputDisabled, setmybetInputDisabled] = useState(false);

const [dealerHolderCards, setDealerHolderCards] = useState("")

function calculateMyBet(inputBet) {
console.log("check this");
    if (inputBet.value < 0) {
        mybet.current = 0;
    }
    if (inputBet.value > playerWallet) {
        mybet.current = playerWallet;
    }
}

for (let s in suits) {
    var suit = suits[s][0].toUpperCase();
    var bgcolor = (suit == "S" || suit == "C") ? "black" : "red";
    for (let n in numb) {
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
//console.log("maxBet button disabled: " + maxbetButtonDisabled);

const Start = () => {
    console.log("Game Started :)");
    console.log("maxBet button disabled: " + maxbetButtonDisabled);
    console.log("maxBet button disabled should be: false");
    shuffleDeck(cards);
    dealNew();
    setStartElStyleDisplay('none');
    dollarValue.current = playerWallet;
}

function dealNew() {
    console.log("dealNew()");
    dValue.current = "?";
    playerHand = [];
    dealerHand = [];
    dealerHolder.current = "";
    setDealerHolderCards("");
    playerHolder.current = "";
    var betvalue = mybet.current.value;
    playerWallet = playerWallet - betvalue;
    dollarValue.current = playerWallet;
    setmyactionsStyleDisplay('block');
    console.log("get up to 21 and beat the dealer to win msg");
    setMessage("Get up to 21 and beat the dealer to win.<br>Current bet is $" + betvalue);
    setmybetInputDisabled(true);
    setmaxbetButtonDisabled(true);
    console.log("maxBet button disabled: should be true");
    console.log("maxBet button disabled: " + maxbetButtonDisabled);
    deal();
    setbtndealStyleDisplay('none');
}

function redeal() {
console.log("redeal()");
    cardCount++;
    if (cardCount > 40) {
        console.log("NEW DECK");
        shuffleDeck(cards);
        cardCount = 0;
        setMessage("New Shuffle");
    }
}

function deal() {
console.log("deal()");
console.log("start of deal() maxBet button disabled: " + maxbetButtonDisabled);
    for (let x = 0; x < 2; x++) {
        dealerHand.push(cards[cardCount]);
        console.log(dealerHand);
        setDealerHolderCards(cardOutput(cardCount, x));
        console.log("x (number of cards) = " + x);
        if (x == 0) {
            console.log("cover");
            setDealerHolderCards.setState(dealerHolderCards + '<div id="cover" style="left:100px;"></div>');
        }
        redeal();
        playerHand.push(cards[cardCount]);
        playerHolder.current += cardOutput(cardCount, x);
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

    pValue.current = playerScore;
    console.log("end of deal() maxBet button disabled: " + maxbetButtonDisabled);
}

function cardOutput(n, x) {
    var typeCard = (x > 0) ? x * 60 + 100 : 100;
    return '<div class="icard ' + cards[n].icon + '" style="left:' + typeCard + 'px;">  <div class="top-card suit">' + cards[n].cardnum + '<br></div>  <div class="content-card suit"></div>  <div class="bottom-card suit">' + cards[n].cardnum +
        '<br></div> </div>';
}

function maxbet() {
    console.log("maxbet()");
    mybet.current = playerWallet;
    setMessage("Bet changed to $" + playerWallet);
}

function cardAction(a){
    console.log(a);
    switch (a) {
        case 'hit':
            addCard(); //add another card to players hand
            break;
        case 'hold':
            endRound(); //end round and update the payout function
            break;
        case 'double':
            var betvalue = parseInt(mybet.current);
            if ((playerWallet - betvalue) < 0) {
                betvalue = betvalue + playerWallet;
                playerWallet = 0;
            } else {
                playerWallet = playerWallet - betvalue;
                betvalue = betvalue * 2;
            }
            dollarValue.current = playerWallet;
            mybet.current = betvalue;
            addCard();
            endRound();
            break;
        default:
            console.log('done');
            endRound();
    }
}

function addCard() {
console.log("addCard()");
    playerHand.push(cards[cardCount]);
    playerHolder.current += cardOutput(cardCount, (playerHand.length - 1));
    redeal();
    var rValu = checktotal(playerHand);
    pValue.current = rValu;
    if (rValu > 21) {
        setMessage("busted!");
        endRound();
    }
}

function endRound() {
    console.log("endRound()");
    endplay = true;
    setCoverStyleDisplay('none');
    setmyactionsStyleDisplay('none');
    setbtndealStyleDisplay('block');
    setmybetInputDisabled(false);
    setmaxbetButtonDisabled(false);
    console.log("maxBet button disabled = " + maxbetButtonDisabled);
    setMessage("Game Over<br>");
    var payoutJack = 1;
    var dealervalue = checktotal(dealerHand);
    dValue.current = dealervalue;

    while (dealervalue < 17) {
        dealerHand.push(cards[cardCount]);
        setDealerHolderCards(cardOutput(cardCount, (dealerHand.length - 1)));
        redeal();
        dealervalue = checktotal(dealerHand);
        dValue.current = dealervalue;
    }


    var playerScore = checktotal(playerHand);
    if (playerScore == 21 && playerHand.length == 2) {
        setMessage("Blackjack Baby!!! ");
        payoutJack = 1.5;

    }
    //else if (dealerScore == 21 && playerHand.length ==2){
      //  message.innerHTML = "Hey it's not the Dealers Fault. It's the house's. ";
    //}
    //else if ((dealerScore == 21 && playerHand.length ==2) && (playerScore == 21 && playerHand.length ==2)){
       // message.innerHTML = "Wow, that doesn't happen everyday. A ";
    //}

    var betvalue = parseInt(mybet.current) * payoutJack;
    if ((playerScore < 22 && dealervalue < playerScore) || (dealervalue > 21 && playerScore < 22)) {
        setMessage(message + '<span style="color:green;">You WIN: $' + betvalue + '</span>');
        playerWallet = playerWallet + (betvalue * 2);

    } else if (playerScore > 21) {
        setMessage(message + '<span style="color:red;">Dealer Wins! You lost $' + betvalue + '</span>');

    } else if (playerScore == dealervalue) {
        setMessage(message + '<span style="color:blue;">PUSH!</span>');
        playerWallet = playerWallet + betvalue;

    } else {
        setMessage(message + '<span style="color:red;">Dealer Wins! You lost $' + betvalue + '</span>');

    }
    pValue.current = playerScore;
    dollarValue.current = playerWallet;
    dealNew();
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

//function outputCard() {
//    output.innerHTML += "<span style='color:" + cards[cardCount].bgcolor + "'>" + cards[cardCount].cardnum + "&" + cards[cardCount].icon + ";</span>  ";
//}


    return (
      <div>
        <meta charSet="utf-8" />
        <title>BabyBlackJack</title>
        <link rel="stylesheet" href="gameboard.css" />
        <div>
          <div>
            <h1>BabyBlackJack</h1>
            <div id="start" ref={startEl} style={{display: startElStyleDisplay}}>
              <button id="btnstart" type="button" onClick={Start} className="btn">Start Game</button>
            </div>
            <div ref={output} id="output">
              <div id="cards">
                Cursed Dealer: <span className="dValue" ref={dValue}/>
                <div id="dealerHolder" dangerouslySetInnerHTML={{__html: dealerHolderCards}}/>
                Player: <span id="pValue" />
                <div id="playerHolder" />
              </div>
              <div id="myactions" style={{display: myactionsStyleDisplay}}>
                <button id="btnstay" type="button" onClick={() => {cardAction('stay');}} className="btn">stay</button>
                <button id="btnhit" type="button" onClick={() => {cardAction('hit');}} className="btn">Hit</button>
                <button id="btndouble" type="button" onClick={() => {cardAction('double');}} className="btn">Double</button>
              </div>
              <div id="deal">
                <button ref={btndeal} style={{display: btndealStyleDisplay}} type="button" onClick={() => {dealNew()}} className="btn">Play Again?</button>
              </div>
              <div className="Wallet">Wallet: $<span ref={dollarValue}>1000</span>
                <br />Bet: $<input type="number" ref={mybet} disabled={mybetInputDisabled} defaultValue={10} min={10} max={100}
                onChange={(e) => {
                calculateMyBet(e.target.value);
                }}
                />


                <br/>
                <button id="maxbet" type="button" disabled={maxbetButtonDisabled} onClick={() => {maxbet();}} className="btn">Max Bet</button>

              </div>
              <div id="message">
                <div dangerouslySetInnerHTML={{__html: message}}/>

              </div>
            </div>
          </div></div></div>
    );
}

export default Game;