/////DOM VARIABLES///////////////
var wordDisplay = document.querySelector(".word-display")
var guessedDisplay = document.querySelector(".letters-guessed-display")
var remainingDisplay = document.querySelector(".guesses-remaining-display")
var winsDisplay = document.querySelector(".wins-display")
var audioElement1 = document.createElement("audio")
audioElement1.setAttribute("src", "assets/images/falling.wav");
var audioElement2 = document.createElement("audio")
audioElement2.setAttribute("src", "assets/images/homer-simpson-woohoo-sound-fx.mp3");

var hangman = {
    words: ['mountain', 'avalanche', 'slope', 'summit', 'cornice'],
    lettersGuessed: [],
    wins: 0,
    guessesRemaining: 6,
    word: "",

    randomSplitWord (array) {
        return this.word = array[Math.floor(Math.random() * array.length)].split('')
    },

    displayStats() {
        guessedDisplay.textContent =  `Letters Guessed: ${this.lettersGuessed}`
        remainingDisplay.textContent = `Guesses Remaining: ${this.guessesRemaining}`
        winsDisplay.textContent = `Wins: ${this.wins}`
    },

    displayWord (word, letters) {
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
    },

    checkLetter (guess) {
    
        if (!this.lettersGuessed.includes(guess) && this.word.includes(guess)) {
            this.lettersGuessed.push(guess)
            guessedDisplay.textContent = `Letters Guessed: ${this.lettersGuessed}`
            
        } else if (!this.lettersGuessed.includes(guess) && !this.word.includes(guess)) {
            this.guessesRemaining--
            this.lettersGuessed.push(guess)
            guessedDisplay.textContent = `Letters Guessed: ${this.lettersGuessed}`
            remainingDisplay.textContent = `Guesses Remaining: ${this.guessesRemaining}`
        }
    },

    gameReset() {
        this.word = this.randomSplitWord(this.words)
        console.log(this.word)
        this.lettersGuessed = []
        this.guessesRemaining = 6
        this.displayStats()
        setTimeout(function () {
            wordDisplay.innerHTML = ''
            wordDisplay.appendChild(hangman.displayWord(hangman.word, hangman.lettersGuessed))
        }, 4000)   
    },

    checkWin (arg) {
    
        var winStatus = arg.every(letter => {
             return this.lettersGuessed.includes(letter)
        })
    
        if (winStatus) {
            wordDisplay.textContent = 'You Won!'
            this.wins++
            audioElement2.play()
            this.gameReset()  
        }
    
        if (this.guessesRemaining === 0) {
            wordDisplay.textContent = 'You Lose!'
            audioElement1.play()
            this.gameReset()
        }
    
    }
}

//////EVENTS/CALLS///////////////

// alert('Devin, I have logged all the answers to the console to make it easier for you to check functionality')

hangman.randomSplitWord(hangman.words)

wordDisplay.textContent = 'Press any key to get started!'

hangman.displayStats()

document.addEventListener('keypress', function (e) {
    wordDisplay.innerHTML = ''
    hangman.checkLetter(e.key)
    wordDisplay.appendChild(hangman.displayWord(hangman.word, hangman.lettersGuessed))
    hangman.checkWin(hangman.word) 
})

console.log(hangman.word)