// Create 16*16 GRID of square

const etchASketch = document.querySelector(".etch-a-sketch");

function createGrid() {
  for (let i = 0; i < 30; i++) {
    let container = document.createElement("div");
    container.classList.add("container");

    for (let j = 0; j < 30; j++) {
      let square = document.createElement("div");
      square.classList.add("square");
      container.appendChild(square);
    }

    etchASketch.appendChild(container);
  }
}

createGrid();

let allSquare = document.querySelectorAll('.square');

for (let i = 0; i < allSquare.length; i++) {
    allSquare[i].style.height = allSquare[i].clientWidth + "px";
}

etchASketch.addEventListener('mouseover', function(e) {
    if (!e.target.classList.contains('etch-a-sketch')) {
        e.target.style.backgroundColor = "red";
    }
})