let numSquare = 6;
let colors = generateRandomColor(numSquare);
let targetColor = document.querySelector("#targetColor");
let squares = document.querySelectorAll(".square");
let pickedColor = pickRandomColor();
let messageDisplay = document.querySelector("#message");
let h1 = document.querySelector("h1");
let resetButton = document.querySelector("#reset");
let easyMode = document.querySelector("#easyMode");
let hardMode = document.querySelector("#hardMode");
let success = new Audio("makeIt.mp3");

// ****************Supporter functions*************************
function changeColors(color) {
    //iterate through each squares to get their colors
    for (let i = 0; i < squares.length; i++) {
        //set each square colors to the paramete's color
        squares[i].style.background = color;
    }
}

function pickRandomColor() {
    let random = Math.floor(Math.random() * colors.length);
    return colors[random];
}

function generateRandomColor(count) {
    //make an array
    let colors = [];
    //add count colors to the array
    for (let i = 0; i < count; i++) {
        //generate colors and push it to the array
        colors.push(randomColor());
    }
    //retrun the array
    return colors;
}

function randomColor() {
    //random "red" from 0-255
    let red = Math.floor(Math.random() * 256);
    //random "green" from 0-255
    let green = Math.floor(Math.random() * 256);
    //random "blue" from 0-255
    let blue = Math.floor(Math.random() * 256);
    return `rgb(${red}, ${green}, ${blue})`;
}


// **********************Main problem solving****************************
targetColor.textContent = pickedColor;

resetButton.addEventListener("click", function () {
    // regenerate random colors
    colors = generateRandomColor(numSquare);
    // repick random color from regenerated colors array
    pickedColor = pickRandomColor();
    // reset targetColor
    targetColor.textContent = pickedColor;
    // reset the squares' background color
    for (let i = 0; i < squares.length; i++) {
        squares[i].style.background = colors[i];
    }
    // reset the background color of h1
    h1.style.background = "steelblue";
    // reset the textContent of resetButton
    this.textContent = "New Colors";
    // clear the message
    messageDisplay.textContent = "";
});

easyMode.addEventListener("click", function () {
    hardMode.classList.remove("selected");
    this.classList.add("selected");
    
    //make sure only 3 colors are generated
    numSquare = 3;
    //regenerate 3 random colors array
    colors = generateRandomColor(numSquare);
    //repick random color from regenerated colors array
    pickedColor = pickRandomColor();
    //reset target color
    targetColor.textContent = pickedColor;

    for (let i = 0; i < squares.length; i++) {
        //reset the first 3 squares' background color
        if (colors[i]) {
            squares[i].style.background = colors[i];
        } else {
            //hide the last 3 squares
            squares[i].style.display = "none";
        }
    }

    // reset the background color of h1
    h1.style.background = "steelblue";
    // reset the textContent of resetButton
    resetButton.textContent = "New Colors";
})

hardMode.addEventListener("click", function () {
    easyMode.classList.remove("selected");
    this.classList.add("selected");

    //make sure 6 colors are regenerated
    numSquare = 6;
    // regenerate random colors
    colors = generateRandomColor(6);
    // repick random color from regenerated colors array
    pickedColor = pickRandomColor();
    // reset targetColor
    targetColor.textContent = pickedColor;
    // reset the squares' background color
    for (let i = 0; i < squares.length; i++) {
        squares[i].style.background = colors[i];
        squares[i].style.display = "block";
    }

    // reset the background color of h1
    h1.style.background = "steelblue";
    // reset the textContent of resetButton
    resetButton.textContent = "New Colors";
})

for (let i = 0; i < squares.length; i++) {
    //add initial colors to squares
    squares[i].style.background = colors[i];

    //add click evens to squares
    squares[i].addEventListener("click", function () {
        //retrieve color of picked square
        let clickedColor = this.style.background;
        //compare clickedColor to pickedColor
        if (clickedColor === pickedColor) {
            success.play();
            messageDisplay.textContent = "Correct!";
            changeColors(clickedColor);
            h1.style.background = clickedColor;
            resetButton.textContent = "Play again?";
        } else {
            this.style.background = "#3a2e2e";
            messageDisplay.textContent = "Try again!";
        }
    });
}