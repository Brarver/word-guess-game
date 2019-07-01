////////VARIABLES///////////////
var words = ['mountain', 'avalanche', 'slope', 'summit', 'cornice']
var lettersGuessed = []
var wins = ''
var guessesRemaining = 6
var word 

var wordDisplay = document.querySelector(".word-display")
wordDisplay.textContent = 'Press any key to get started!'

//////////FUNCTIONS//////////////

var randomSplitWord = function (array) {
    var word = array[Math.floor(Math.random() * array.length)]
    return word.split('')
}

word = randomSplitWord(words)
console.log(word)


var displayWord = function (word, letters) {
    var content = []

    word.forEach(function (letter) {
        if (letters.includes(letter)) {
            content.push(letter)
        } else {
            content.push('_')
        }
    })

    var joined = content.join('')
    
    var wordSpan = document.createElement('span')
    wordSpan.textContent = joined
    return wordSpan  
}

var checkLetter = function (guess) {
    
    if (!lettersGuessed.includes(guess) && word.includes(guess)) {
        lettersGuessed.push(guess)
        
    } else if (!lettersGuessed.includes(guess) && !word.includes(guess)) {
        guessesRemaining--
    }
}

var checkWin = function (word, lettersGuessed) {
    
    var winStatus = word.every(letter => {
         return lettersGuessed.includes(letter)
    })

    if (winStatus) {
        wordDisplay.textContent = 'You Win!'
        word = randomSplitWord(words)
        console.log(word)
    }

    if (guessesRemaining === 0) {
        wordDisplay.textContent = 'You Lose!'
    }
}


//////EVENTS/CALLS///////////////

document.addEventListener('keypress', function (e) {
    wordDisplay.innerHTML = ''
    checkLetter(e.key)
    wordDisplay.appendChild(displayWord(word, lettersGuessed))
    checkWin(word, lettersGuessed) 
})

//install win/lose game reset!!!










