////////VARIABLES///////////////
var words = ['mountain', 'avalanche', 'slope', 'summit', 'cornice']
var lettersGuessed = []
var wins = 0
var guessesRemaining = 6
var word = []

/////DOM VARIABLES///////////////
var wordDisplay = document.querySelector(".word-display")
var guessedDisplay = document.querySelector(".letters-guessed-display")
var remainingDisplay = document.querySelector(".guesses-remaining-display")
var winsDisplay = document.querySelector(".wins-display")


//////////FUNCTIONS//////////////

var randomSplitWord = function (array) {
    return array[Math.floor(Math.random() * array.length)].split('')
}

var displayStats = function () {
    guessedDisplay.textContent =  `Letters Guessed: ${lettersGuessed}`
    remainingDisplay.textContent = `Guesses Remaining: ${guessesRemaining}`
    winsDisplay.textContent = `Wins: ${wins}`
}

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
        guessedDisplay.textContent = `Letters Guessed: ${lettersGuessed}`
        
    } else if (!lettersGuessed.includes(guess) && !word.includes(guess)) {
        guessesRemaining--
        lettersGuessed.push(guess)
        guessedDisplay.textContent = `Letters Guessed: ${lettersGuessed}`
        remainingDisplay.textContent = `Guesses Remaining: ${guessesRemaining}`
    }
}

var gameReset = function () {
    word = randomSplitWord(words)
    lettersGuessed = []
    guessesRemaining = 6
    displayStats()
    setTimeout(function () {
        wordDisplay.innerHTML = ''
        wordDisplay.appendChild(displayWord(word, lettersGuessed))
    }, 2000)   
}

var checkWin = function (arg) {
    
    var winStatus = arg.every(letter => {
         return lettersGuessed.includes(letter)
    })

    if (winStatus) {
        wordDisplay.textContent = 'You Won!'
        wins++
        gameReset()  
    }

    if (guessesRemaining === 0) {
        wordDisplay.textContent = 'You Lose!'
        wins--
        gameReset()
    }

}

//////EVENTS/CALLS///////////////

word = randomSplitWord(words)
console.log(word)

wordDisplay.textContent = 'Press any key to get started!'

displayStats()

document.addEventListener('keypress', function (e) {
    wordDisplay.innerHTML = ''
    checkLetter(e.key)
    wordDisplay.appendChild(displayWord(word, lettersGuessed))
    checkWin(word) 
})










