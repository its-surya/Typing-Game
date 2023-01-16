const RANDOM_QUOTE_API_URL = 'http://api.quotable.io/random'
const quoteDisplayElement = document.getElementById('quoteDisplay')
const quoteInputElement = document.getElementById('quoteInput')
const timerElement = document.getElementById('timer')
const speedElement=document.getElementById('speed')
const Inc=document.getElementById('IncorrectType')
var Words=1, IncorrectWords=0, chars=0
 let check1=true, check2=true

quoteInputElement.addEventListener('input', () => {
  const arrayQuote = quoteDisplayElement.querySelectorAll('span')
  const arrayValue = quoteInputElement.value.split('')

  let correct = true
 
  arrayQuote.forEach((characterSpan, index) => {
    const character = arrayValue[index]
    if (character == null) {
      characterSpan.classList.remove('correct')
      characterSpan.classList.remove('incorrect')
      correct = false
    } 
    else if (character === characterSpan.innerText) {
    
      characterSpan.classList.add('correct')
      characterSpan.classList.remove('incorrect')
    } 
    else {
      check2=false
      characterSpan.classList.remove('correct')
      characterSpan.classList.add('incorrect')
      correct = false
    }
  })

  if(check2===false)
  {
    if(check1===true)
      IncorrectWords++
    check1=false
  }
  if(check2==true)
    check1=true
  check2=true

 if (correct) 
  {  var s=Words/getTimerTime()*60
    s=Math.floor(s)
    var accuracy=((chars)/(chars+IncorrectWords))*100
    accuracy=accuracy.toPrecision(4)
    speedElement.innerText="Your Speed was "+s+" Words per minute"
    Inc.innerText="Accuracy: "+accuracy+"%"
    IncorrectWords=0
    
    renderNewQuote()
  }
})


function getRandomQuote() {
  return fetch(RANDOM_QUOTE_API_URL)
    .then(response => response.json())
    .then(data => data.content)
}


async function renderNewQuote() {
  Words=1
  chars=0
  const quote = await getRandomQuote()
  quoteDisplayElement.innerHTML = ''
  quote.split('').forEach(character => {
   chars++
    if(character===' ')
      Words++
    const characterSpan = document.createElement('span')
    characterSpan.innerText = character
    quoteDisplayElement.appendChild(characterSpan)
  })
  quoteInputElement.value = null
  startTimer()
}

let startTime
function startTimer() {
  timerElement.innerText = 0
  startTime = new Date()
  setInterval(() => {
    timer.innerText = getTimerTime()
  }, 1000)
}

function getTimerTime() {
  return Math.floor((new Date() - startTime) / 1000)
}

renderNewQuote()