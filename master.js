let title = document.createTextNode("Hangman Game")
document.querySelector("title").append(title)

// Customizing Landing Page

const boxs = document.querySelectorAll(".instructions .welcome")
const boxsArr = Array.from(boxs);
const leftArr = document.querySelector(".left-arr");
const rightArr = document.querySelector(".right-arr");
const bullets = document.querySelectorAll('.bullets span')
const bulletsArr = Array.from(bullets);

leftArr.style.display = "none"
let currentIndex = 0;
boxsArr[currentIndex].style.display = "block"
bulletsArr[currentIndex].style.backgroundColor = "#9b00d8"

rightArr.onclick = function howToPlay() {
    leftArr.style.display = "block"
    boxsArr[currentIndex].style.display = "none"
    bulletsArr[currentIndex].style.backgroundColor = "transparent" 
    currentIndex++
    boxsArr[currentIndex].style.display = "block"
    bulletsArr[currentIndex].style.backgroundColor = "#9b00d8"   
    if (currentIndex === boxsArr.length - 1) {
        rightArr.style.display = "none"
    }
}

leftArr.onclick = function() {
    rightArr.style.display = "block"
    boxsArr[currentIndex].style.display = "none"
    bulletsArr[currentIndex].style.backgroundColor = "transparent"
    currentIndex--
    boxsArr[currentIndex].style.display = "block"
    bulletsArr[currentIndex].style.backgroundColor = "#9b00d8"  
    if (currentIndex === 0) {
        leftArr.style.display = "none"
    }
}
document.querySelector(".skip").onclick = function() {
    document.querySelector(".instructions").remove();
}

// ============================================

// Random Word Generator

let words = ["Absolute",
"Computer","Abstract","Bacteria","Conclude",
"Academic","Baseball","Concrete","Accepted",
"Bathroom","Conflict","Accident","Becoming",
"Confused","Accuracy","Birthday","Congress",
"Accurate","Boundary","Consider","Dressing",
"Employee","Disabled","Dropping","Endeavor",
"Disaster","Duration","Engaging","Disclose",
"Dynamics","Engineer","Discount","Bachelor",
"Enormous","Discover","Economic","Entirely",
"Disorder","Educated","Entrance","Disposal",
]
let wordsDescriptions = ["not qualified or diminished in any way; total",
"an electric divice for storing and processing data","make a written summary of (an article or book)","a member of a large group of unicellular microorganisms","bring (something) to an end",
"relating to education and scholarship","a ball game played between two teams of nine","existing in a material or physical form; not abstract","generally believed or recognized to be valid or correct",
"a room containing a toilet and sink","a serious disagreement or argument, typically a protracted one","an unfortunate incident that happens unexpectedly and unintentionally","the process of coming to be something or of passing into a state",
"(of a person) unable to think clearly; bewildered","the quality or state of being correct or precise","the anniversary of the day on which a person was born","a national legislative body, especially that of the US",
"(of information, measurements, statistics, etc.) correct in all details; exact","a line that marks the limits of an area; a dividing line","think carefully about (something), typically before making a decision","a piece of material placed on a wound to protect it",
"a person employed for wages or salary, especially at nonexecutive level","(of a person) having a physical or mental condition that limits movements, senses, or activities","let or make (something) fall vertically","try hard to do or achieve something",
"a sudden event, such as an accident or a natural catastrophe, that causes great damage or loss of life","the time during which something continues","charming and attractive","make (secret or new information) known",
"a branch concerned with the motion of bodies under the action of forces","a person who designs, builds, or maintains engines, machines, or public works","deduct an amount from (the usual price of something)","a man who is not and has never been married",
"very large in size, quantity, or extent","find (something or someone) unexpectedly or in the course of a search","relating to economics or the economy","completely (often used for emphasis)",
"a state of confusion","an opening, such as a door, passage, or gate, that allows access to a place","the action or process of throwing away or getting rid of something"
]
let randomIndex = Math.floor(Math.random() * words.length);
let randomWord = words[randomIndex]
let randomWordDesc = wordsDescriptions[randomIndex]
console.log(randomWord)

// ============================================
const startBtn = document.querySelector(".start button");
startBtn.addEventListener("click", function() {
    document.querySelector(".start").remove()
    inputsParent.children[0].focus()
    
    // show word description
    document.querySelector(".word-desc").innerHTML = `The word is defined as : <span>${wordsDescriptions[randomIndex]}.</span>`

    startTimer();
})

// inverse time counter
let timeContainer = document.querySelector(".timer");
let remainingTime = 180; // 3 minutes in seconds

function startTimer() {
let timer = setInterval(() => {
    remainingTime--;
    let minutes = Math.floor(remainingTime / 60);
    let seconds = remainingTime % 60;
    timeContainer.innerHTML = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;

    if (inputs[numOfLetters - 1].classList.contains("correct-input")) {
        clearInterval(timer);
    }
    if (gallowPart == hangManGallow.length) {
        clearInterval(timer);
    }
    
    if (remainingTime <= 0) {
        clearInterval(timer);
        // Handle timeout scenario
        let msg = document.querySelector(".message");
        msg.innerHTML = `<p>Time's up! The Word Is <span>${randomWord}</span>. Let's Play Again</p><button onclick="location.reload()">Play Again</button>`;
        msg.style.display = "block";
        for (const input of inputs) {
            input.disabled = true;
        }
        hint.classList.add("disabled");
        document.querySelectorAll(".hangman > div").forEach(input => input.style.display = "block");
        document.querySelector(".kill").play()
    }
}, 1000);
}

// ============================================

// game space

// Variables
let numOfLetters = 8
let inputsParent = document.querySelector(".inputs");
let hangManGallow = Array.from(document.querySelectorAll(".hangman > div"));
var gallowPart = 0;

// Create Inputs
for (let i = 0; i < numOfLetters; i++) {
    let input = document.createElement("input")
    inputsParent.append(input);
    if (i != 0) {
        input.classList.add("disabled")
    }
}

// Handle Inputs
let inputs = document.querySelectorAll("input");
inputs.forEach((input, index) => {
    input.addEventListener('input', function() {
        this.value = this.value.toUpperCase()
        if (this.value == randomWord[index].toUpperCase()) {
            this.classList.add("correct-input")
            this.classList.add("disabled")
            if (index < numOfLetters - 1) {
                index++
                inputs[index].focus()
                inputs[index].classList.remove("disabled")
            }
            remainingTime += 5;
            if (inputs[numOfLetters - 1].classList.contains("correct-input")) {
                for (input of inputs) {
                    input.disabled = true
                }
                let msg = document.querySelector(".message");
                msg.innerHTML = `<p>Great! You're So Smart. The Word Is <span>${randomWord}</span>. Let's Play Again</p><button onclick="location.reload()">Play Again</button>`
                msg.style.display = "block";

                hint.classList.add("disabled")
                numOfCoins++;
                document.querySelector(".hint span").innerHTML = numOfCoins;
                document.querySelectorAll(".rescued").forEach(one => one.style.display = "block")
                hangManGallow.filter(one => !one.classList.contains('rescued')).forEach(one => one.style.display = "none")
            }
        } else {
            this.value = ""
            if (gallowPart < hangManGallow.length) {
                hangManGallow[gallowPart].style.display = "block";
                gallowPart++
            }
            if (gallowPart == hangManGallow.length) {
                for (input of inputs) {
                    input.classList.add("disabled")
                }
                let msg = document.querySelector(".message");
                msg.innerHTML = `<p>Sorry! You're Out Of Attempts. The Word Is <span>${randomWord}</span>. Let's Play Again</p><button onclick="location.reload()">Play Again</button>`
                msg.style.display = "block";
                hint.classList.add("disabled")
                document.querySelector(".kill").play()
            }
        }
    })
});

// ============================================

// Hint Button
let hint = document.querySelector(".hint")
let numOfCoins = document.querySelector(".hint span").innerHTML;

hint.onclick =   function(){
    if (numOfCoins > 0) {
        numOfCoins--;
        document.querySelector(".hint span").innerHTML = numOfCoins;
    }
    if (numOfCoins <= 0){
        hint.classList.add('disabled')
    }

    let inputs = document.querySelectorAll("input")
    let inputsArr = Array.from(inputs)
    let input = document.querySelector("input:not(.disabled)")
    let targetIndex = inputsArr.indexOf(input)
    input.value = randomWord[targetIndex].toUpperCase();
    input.classList.add("correct-input", "disabled")
    if (targetIndex < numOfLetters - 1) {
        targetIndex++
        inputs[targetIndex].focus()
        inputs[targetIndex].classList.remove("disabled")
    }
} 

