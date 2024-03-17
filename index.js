// Create 16*16 GRID of square

const etchASketch = document.querySelector(".etch-a-sketch");
const resetButton = document.querySelector(".reset");
const newGridButton = document.querySelector(".new-grid");
const randomButton = document.querySelector('.random');
const effectButton = document.querySelector('.effect');

// 10% effect

let isEffectActive = false;

effectButton.addEventListener('click', function() {
    isEffectActive = !(isEffectActive);
    effectButton.classList.toggle('active');
    isEffectActive == true && (color = `hsl(${randomHSL()}, 100%, 90%)`);
    isEffectActive == false && (color = "red");
});

// Random Color Functionality

let color = null;
let startPoint = 90;
let startPointString = startPoint + "%";

function random() {
    // I write it because i need a letter from hex numberic system for converting from decimal to hex
    let hex = ['A', 'B', 'C', 'D', 'E', 'E'];

    let randomColor = [];

    let j = 0;

    for (let i = 0; i < 6; i++) {
        let randomNumber = Math.floor(Math.random() * 10000 % 16);
        if (randomNumber > 9) randomColor[j++] = hex[randomNumber % 10];
        else randomColor[j++] = randomNumber;
    }

    return '#' + randomColor.join('');
}

function randomHSL() {
    let randomHue = Math.floor(Math.random() * 10000 % 360);

    return `${randomHue}`;
}

randomButton.addEventListener('click', function() {
    color = (!isEffectActive) ? random() : `hsl(${randomHSL()}, 100%, 90%)`;
});

// RESET BUTTON FUNCTIONALITY

resetButton.addEventListener("click", resetGrid);

// NEW GRID FUNCTIONALITY

let n = null;

newGridButton.addEventListener("click", function () {
  let prom = parseInt(prompt("Grid: > 5 and < 100", "5"));
  if (prom >= 5 && prom < 100) n = prom;
  resetGrid();
  deleteGrid();
  createGrid(n != null ? prom : undefined);
});

function resetGrid() {
  let allSquare = document.querySelectorAll(".square");
  allSquare.forEach((el) => (el.style.backgroundColor = ""));
  color = "";
  isEffectActive = false;
  effectButton.classList.remove('active');
  startPoint = 90;
  startPointString = 90 + "%";
}

// CREATE GRID FUNCTIONALITY

function createGrid(n = 16) {
  for (let i = 0; i < n; i++) {
    let container = document.createElement("div");
    container.classList.add("container");

    for (let j = 0; j < n; j++) {
      let square = document.createElement("div");
      square.classList.add("square");
      container.appendChild(square);
    }

    etchASketch.appendChild(container);
  }

  let allSquare = document.querySelectorAll(".square");

  for (let i = 0; i < allSquare.length; i++) {
    allSquare[i].style.height = allSquare[i].clientWidth + "px";
  }
}

createGrid(undefined);

// DELETE GRID FUNCTIONALITY

function deleteGrid() {
  let containers = document.querySelectorAll(".container");
  containers.forEach((el) => etchASketch.removeChild(el));
}

// RGB TO HSL FUNCTIONALITY ( IT IS NOT MY FUNCTION, I AM JUST VERY TIRED TO WRITE IT(((()))) )

function rgbToHsl(r, g, b) {
    r /= 255;
    g /= 255;
    b /= 255;
    const l = Math.max(r, g, b);
    const s = l - Math.min(r, g, b);
    const h = s
      ? l === r
        ? (g - b) / s
        : l === g
        ? 2 + (b - r) / s
        : 4 + (r - g) / s
      : 0;
    return [
      60 * h < 0 ? 60 * h + 360 : 60 * h,
      100 * (s ? (l <= 0.5 ? s / (2 * l - s) : s / (2 - (2 * l - s))) : 0),
      (100 * (2 * l - s)) / 2,
    ];
  };

etchASketch.addEventListener("mouseover", function (e) {
  if (!e.target.classList.contains("etch-a-sketch")) {
    if (isEffectActive && e.target.style.backgroundColor) {
        let rgb = window.getComputedStyle(e.target).getPropertyValue('background-color').split('');
        rgb = rgb.slice(4, rgb.length - 1).join(' ').split(',').map(item => item.split(' ').join(''));
        let hsl = rgbToHsl(rgb[0], rgb[1], rgb[2]);
        let getLightness = hsl[2];
        e.target.style.backgroundColor = `hsl(${hsl[0]}, 100%, ${getLightness - 10}%)`;
    } else {
        e.target.style.backgroundColor = color || "red";
    }
  }
});
