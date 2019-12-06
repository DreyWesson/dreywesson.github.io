
//Challenge 1: Your Age in Days
document.querySelector('#age-calc').addEventListener('click', ()=> {
  let birthYear = +prompt("Whats your date of birth",'Enter year')
  if (birthYear !== isNaN) {
    let calcAge = (2018 - birthYear) * 365;
    let h4 = document.createElement('h4');
    let textAnswer = document.createTextNode(`You're ${calcAge} days old`);
    h4.appendChild(textAnswer);
    h4.setAttribute('id', 'ageInDays');
    return document.getElementById('flex-box-result').appendChild(h4)
  } else {
    alert(`Enter a number`);
    let birthYear = +prompt("Whats your date of birth",'Enter year');
  }
})

document.querySelector('#age-reset').addEventListener('click', ()=>{
  document.getElementById('ageInDays').remove();
})










//Challenge 2: Mood Sync
const getForm = document.forms['add-mood'];
getForm.addEventListener('submit', (e)=> {
  e.preventDefault()
  let moodImages =document.querySelector("div.flex-box-container-2");
  let img = document.createElement('img');
  const value = getForm.querySelector('input[type="text"]').value;
  console.log(value);
  img.setAttribute('src',`https://source.unsplash.com/300x300/?${value}`);
  moodImages.appendChild(img);
})








const getRepo = document.forms['fetch-repo'];
getRepo.addEventListener('submit', (e)=> {
  e.preventDefault()
  // let repo =document.querySelector("div.flex-box-repo-container");
  // let h4 = document.createElement('h4');
  // repo.appendChild(h4);

  const value = getRepo.querySelector('input[type="text"]').value;
  // console.log(JSON.stringify(value));
  const winSound = new Audio('/cash.mp3');





  async function gitHub(user) {
    try {const res = fetch(`https://api.github.com/users/${user}/repos`);
      const response = fetch(`https://api.github.com/users/${user}`);
      
      // Using promise.all for concurrency sake 
      // since the two fetch are not dependent on each other
      const encaps = await Promise.all([res, response])
  
      // Using destructuring to get the res and response from the encaps array
      const [resDestructure, responseDestructure] = encaps;
      const data = await resDestructure.json();
      const data2 = await responseDestructure.json();
      console.log(data);
      console.log(data2);
      data.map((element, index) => {
        if (index < 10) 
          console.log(`0${index}. ${element.full_name} (${element.id})`)
        else
          console.log(`${index}. ${element.full_name}`)
      });
    } catch (error) {
      console.log(`An error occurred ${error}`)
    }
  }
  gitHub(value);
  document.querySelector('#repo-result').innerHTML = `Geeky stuff. Check <span>${value}'s</span> most forked repo in the console!!!`
  winSound.play()
})





//Challenge 3: Rock, Paper, Scissors
function rpsGame(yourChoice) {
  let botAlgorithm = Math.floor(Math.random() * 3)
  let options = ['rock', 'paper', 'scissors']; 
  let botChoice = options[botAlgorithm];
  let message, messageColor;

  if (botChoice === yourChoice.id) {
    message = `Bot chose ${botChoice}. You chose ${yourChoice.id}. You drew ${emojiProcessor(unifiedValue[0])}`;
    messageColor = '#657786';
  } else if (botChoice=='rock' && yourChoice.id=='scissors' ||
            botChoice=='paper' && yourChoice.id=='rock' ||
            botChoice=='scissors' && yourChoice.id=='paper') {
    message = `Bot chose ${botChoice}. You chose ${yourChoice.id}. Bot wins ${emojiProcessor(unifiedValue[2])}!`;
    messageColor = '#dc3545';
    lossSound.play()
  } else {
    message = `Bot chose ${botChoice}. You chose ${yourChoice.id}. You win ${emojiProcessor(unifiedValue[1])}!`;
    messageColor = 'green';
    winSound.play()
  }
  document.querySelector('#roc-result').textContent = message;
  document.querySelector('#roc-result').style.color = messageColor;
}

// function rpsGame(yourChoice) {
//   let botAlgorithm = Math.floor(Math.random() * 3)

//   let rpsResult = document.querySelector("#rps-result");
//   let h4you = document.createElement('h4');
//   let h4Bot = document.createElement('h4');
//   let h4Tie = document.createElement('h4');
//   let options = ['rock', 'paper', 'scissors']; 
//   let botChoice = options[botAlgorithm];

//   rpsResult.appendChild(h4you);
//   rpsResult.appendChild(h4Bot);
//   rpsResult.appendChild(h4Tie);
//   h4you.setAttribute('id', 'won')
//   h4Bot.setAttribute('id', 'loss');
//   h4Tie.setAttribute('id', 'tie');

//   if (botChoice === yourChoice.id) {
//     let tie = document.createTextNode(`Bot chose ${botChoice}. You chose ${yourChoice.id}. You tie`);
//     h4Tie.appendChild(tie);
//   } else if (botChoice=='rock' && yourChoice.id=='scissors' ||
//             botChoice=='paper' && yourChoice.id=='rock' ||
//             botChoice=='scissors' && yourChoice.id=='paper') {
//     let botWins = document.createTextNode(`Bot chose ${botChoice}. You chose ${yourChoice.id}. Bot won`);
//     h4Bot.appendChild(botWins);
//   } else {
//     let youWin = document.createTextNode(`Bot chose ${botChoice}. You chose ${yourChoice.id}. You won`);
//     h4you.appendChild(youWin);
//   }
// }










//Changing all button interface with colors
let allButtons = document.querySelectorAll('button');
let eachButton = [];
for (let i=0; i < allButtons.length; i++){
  eachButton.push(allButtons[i].classList[1]);
}

function buttonColorChange(tags) {
  if (tags.value == 'red')
    buttonsRed()
  else if (tags.value == 'green') 
    buttonsGreen();
  else if (tags.value == 'reset')
    buttonsColorReset();
  else if (tags.value == 'random')
    randomColors();
}

function buttonsRed() {
  allButtons.forEach((tags, i) => {
    allButtons[i].classList.remove(allButtons[i].classList[1]);
    allButtons[i].classList.add('btn-danger');
  })
}

function buttonsGreen() {
  allButtons.forEach((tags, i) => {
    allButtons[i].classList.remove(allButtons[i].classList[1]);
    allButtons[i].classList.add('btn-success');
  })
}

function buttonsColorReset() {
  // console.log(eachButton[0])
  for (let i = 0; i < allButtons.length; i++) {
    allButtons[i].classList.remove(allButtons[i].classList[1]);
    allButtons[i].classList.add(eachButton[i]);
    // console.log(allButtons[i].classList)
    // console.log(eachButton[i])
  }
}

function randomColors() {
  let arrayOfColor = ['btn-primary', 'btn-danger', 'btn-warning', 'btn-success'];
  allButtons.forEach((tags, i) => {
    let random = Math.floor(Math.random() * 4)
    allButtons[i].classList.remove(allButtons[i].classList[1]);
    allButtons[i].classList.add(arrayOfColor[random]);
  })
}










//Blackjack
let unifiedValue = ['1F610', '1F929', '1F614'];
function emojiProcessor(uv) {
  return String.fromCodePoint(parseInt(uv, 16));
}

let cardList = ['/2.png','/3.png','/4.png', '/5.png','/6.png','/7.png', '/8.png','/9.png', '/10.png', '/K.png','/J.png','/Q.png','/A.png'];

console.log(cardList[0], cardList[1], cardList[2], cardList[3],
  cardList[4], cardList[5], cardList[6], cardList[7],
  cardList[8], cardList[9], cardList[10], cardList[11],
  cardList[12])

let blackjackGame = {
  you: { 'scoreSpan': '#your-blackjack-score', 'div': '#your-box', 'score': 0},
  bot: { 'scoreSpan': '#bot-blackjack-score', 'div': '#bot-box', 'score': 0},
  'cards': [cardList[0], cardList[1], cardList[2], cardList[3],
            cardList[4], cardList[5], cardList[6], cardList[7],
            cardList[8], cardList[9], cardList[10], cardList[11],
            cardList[12]],
  'cardsMap': {
    [cardList[0]] : 2,
    [cardList[1]] : 3,
    [cardList[2]] : 4,
    [cardList[3]] : 5,
    [cardList[4]] : 6,
    [cardList[5]] : 7,
    [cardList[6]] : 8,
    [cardList[7]] : 9,
    [cardList[8]] : 10,
    [cardList[9]] : 10,
    [cardList[10]] : 10,
    [cardList[11]] : 10,
    [cardList[12]] : [1, 11]
  },
  'wins': 0,
  'losses': 0,
  'draws' : 0,
  'isStand': false,
  'turnsOver': false,
}

let {you, bot} = blackjackGame;
const hitSound = new Audio('/swish.m4a');
const winSound = new Audio('/cash.mp3');
const lossSound = new Audio('/aww.mp3');

document.querySelector('#blackjack-hit-button').addEventListener('click', ()=> blackjackHit())
//refactor later
function blackjackHit() {
  if (blackjackGame['isStand'] === false) {
    let card = randomCard();
    updateScore(card, you);
    scoreboard(card, you);
    showCard(card, you);
  } 
}

function randomCard() {
  let random =  Math.floor(Math.random() * 13);
  return blackjackGame['cards'][random];
}

function showCard(card, activePlayer){
  if ((activePlayer['score']) <= 21) {
    let cardImage = document.createElement('img')
    cardImage.src = `${card}`;
    let test =document.querySelector(activePlayer['div'])
    test.appendChild(cardImage);
    hitSound.play();
  }
};

document.querySelector('#blackjack-deal-button').addEventListener('click', ()=> blackjackDeal())
function blackjackDeal() {
  // logic for two players
  // showResult(computeWinner())
  if (blackjackGame['turnsOver'] === true) {
    blackjackGame['isStand'] = false;

    let yourImages = document.querySelector('#your-box').querySelectorAll('img');
    yourImages.forEach((val, i) => {
      yourImages[i].remove()
    });

    let botImages = document.querySelector('#bot-box').querySelectorAll('img');
    botImages.forEach((val, i) => {
      botImages[i].remove()
    });

    you['score'] = 0;
    bot['score'] = 0;

    document.querySelector('#your-blackjack-score').textContent = 0;
    document.querySelector('#bot-blackjack-score').textContent = 0;
    document.querySelector('#your-blackjack-score').style.color = '#ffffff';
    document.querySelector('#bot-blackjack-score').style.color = '#ffffff';
    document.querySelector('#blackjack-result').textContent = "Let's play!";
    document.querySelector('#blackjack-result').style.color = "black";
  
    blackjackGame['turnsOver'] = true;
  }
}

document.querySelector('#blackjack-stand-button').addEventListener('click', ()=> botLogic())

function updateScore(card, activePlayer) {
  if (card === Object.keys(blackjackGame.cardsMap)[12]) {
    if (activePlayer['score'] + blackjackGame['cardsMap'][card][1] <= 21) {
      activePlayer['score'] += blackjackGame['cardsMap'][card][1];
    } else {
      activePlayer['score'] += blackjackGame['cardsMap'][card][0];
    }
  } else {
    activePlayer['score'] += blackjackGame['cardsMap'][card];
  }
}

function scoreboard(card,activePlayer) {
  if ((activePlayer['score']) > 21) {
    document.querySelector(activePlayer['scoreSpan']).textContent = 'BUST!!!';
    document.querySelector(activePlayer['scoreSpan']).style.color = '#dc3545';
  } else {
    document.querySelector(activePlayer['scoreSpan']).textContent = activePlayer['score'];
  }
}

function sleep(ms) {
  return new Promise((res, req) => {
    setTimeout(res, ms)
  })
}

async function botLogic() {
  blackjackGame['isStand'] = true;

  while (bot['score'] < 16 && blackjackGame['isStand'] === true) {
    let card = randomCard();
    updateScore(card, bot);
    scoreboard(card, bot);
    showCard(card, bot);
    await sleep(1000);
  }

  blackjackGame['turnsOver'] = true;
  showResult(computeWinner());
}

function computeWinner() {
  let winner;

  if (you['score'] <= 21) {
    if (you['score'] > bot['score'] || (bot['score'] > 21)) {
      blackjackGame['wins']++;
      winner = you;

    } else if (you['score'] < bot['score']) {
      blackjackGame['losses']++;
      winner = bot;

    } else if (you['score'] === bot['score']) {
      blackjackGame['draws']++;
    }
  } else if (you['score'] > 21 && bot['score'] <= 21) {
    blackjackGame['losses']++;
    winner =  bot;

  } else if (you['score'] > 21 && bot['score'] > 21) {
    blackjackGame['draws']++;
  }

  return winner;
}

function showResult(winner) {
  let message, messageColor;

  if (blackjackGame['turnsOver'] === true) {
  
    if (winner === you){
      document.querySelector('#wins').textContent = blackjackGame['wins'];
      message = `You won ${emojiProcessor(unifiedValue[1])}!`;
      messageColor = 'green';
      winSound.play()
    } else if (winner === bot) {
      document.querySelector('#losses').textContent = blackjackGame['losses'];
      message = `You lost ${emojiProcessor(unifiedValue[2])}!`;
      messageColor = '#dc3545';
      lossSound.play()
    } else {
      document.querySelector('#draws').textContent = blackjackGame['draws'];
      message = `You drew ${emojiProcessor(unifiedValue[0])}`;
      messageColor = '#657786';
    }

    document.querySelector('#blackjack-result').textContent = message;
    document.querySelector('#blackjack-result').style.color = messageColor;
  }
}


