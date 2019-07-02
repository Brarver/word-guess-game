////////VARIABLES///////////////
var words = ['mountain', 'avalanche', 'slope', 'summit', 'cornice']
var lettersGuessed = []
var wins = 0
var guessesRemaining = 6
var word = []


var wordDisplay = document.querySelector(".word-display")
wordDisplay.textContent = 'Press any key to get started!'

var guessedDisplay = document.querySelector(".letters-guessed-display")
guessedDisplay.textContent =  `LettersGuessed: ${lettersGuessed}`
var remainingDisplay = document.querySelector(".guesses-remaining-display")
remainingDisplay.textContent = `Guesses Remaining: ${guessesRemaining}`
var winsDisplay = document.querySelector(".wins-display")
winsDisplay.textContent = `Wins: ${wins}`




//////////FUNCTIONS//////////////

var randomSplitWord = function (array) {
    return array[Math.floor(Math.random() * array.length)].split('')
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
        guessedDisplay.textContent = `Letters Guessed: ${lettersGuessed}`
        
    } else if (!lettersGuessed.includes(guess) && !word.includes(guess)) {
        guessesRemaining--
        lettersGuessed.push(guess)
        guessedDisplay.textContent = `Letters Guessed: ${lettersGuessed}`
        remainingDisplay.textContent = `Guesses Remaining: ${guessesRemaining}`
    }
}

var checkWin = function (arg) {
    
    var winStatus = arg.every(letter => {
         return lettersGuessed.includes(letter)
    })


    if (winStatus) {
        wordDisplay.textContent = 'You Win!'
        word = randomSplitWord(words)
        lettersGuessed = []
        wins++
        guessesRemaining = 6
        winsDisplay.textContent = `Wins: ${wins}`
        guessedDisplay.textContent =  `LettersGuessed: ${lettersGuessed}`
        remainingDisplay.textContent = `Guesses Remaining: ${guessesRemaining}`
        setTimeout(function () {
            wordDisplay.innerHTML = ''
            wordDisplay.appendChild(displayWord(word, lettersGuessed))
        }, 2000)   
    }

    if (guessesRemaining === 0) {
        wordDisplay.textContent = 'You Lose!'
        word = randomSplitWord(words)
        lettersGuessed = []
        guessesRemaining = 6
        guessedDisplay.textContent =  `LettersGuessed: ${lettersGuessed}`
        remainingDisplay.textContent = `Guesses Remaining: ${guessesRemaining}`
        setTimeout(function () {
            wordDisplay.innerHTML = ''
            wordDisplay.appendChild(displayWord(word, lettersGuessed))
        }, 2000)
    }

}




//////EVENTS/CALLS///////////////

document.addEventListener('keypress', function (e) {
    wordDisplay.innerHTML = ''
    checkLetter(e.key)
    wordDisplay.appendChild(displayWord(word, lettersGuessed))
    checkWin(word, lettersGuessed) 
})
//yep









