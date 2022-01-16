const gridContainer = document.querySelector('#grid-container');
drawGrid(gridContainer);
const resetButton = document.querySelector('#reset');

resetButton.addEventListener('click', event => {
  drawGrid(gridContainer, true);
});

function drawGrid(gridContainer, changeSize = false) {
  let size = 16;

  if (changeSize) {
    size = parseInt(prompt('What size would you like the new grid to be?', 16));
    if (isNaN(size)) {
      size = parseInt(prompt('Please enter a whole number.', 16));
    }
  }

  gridContainer.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
  gridContainer.style.gridTemplateRows = `repeat(${size}, 1fr)`;

  gridContainer.innerHTML = '';

  for (let i = 1; i <= size; i++) {
    for (let j = 1; j <= size; j++) {
      let gridItem = document.createElement('div');
      gridItem.id = `row${i}col${j}`;
      gridItem.classList.add('grid-item');
      gridItem.style.backgroundColor = 'white';
      gridItem.style.borderColor = '#EEEEEE';
      gridContainer.appendChild(gridItem);
    }
  }

  const gridItems = document.querySelectorAll('.grid-item');

  gridItems.forEach(gridItem => gridItem.addEventListener('mouseenter', event => {
    let color = '';
    if (event.target.style.backgroundColor === 'white') {
      color = `rgb(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)})`;
    } else {
      color = getComputedStyle(event.target).backgroundColor;
      let red = parseInt(color.substring(4, color.length - 1).split(',')[0]);
      let green = parseInt(color.substring(4, color.length - 1).split(',')[1]);
      let blue = parseInt(color.substring(4, color.length - 1).split(',')[2]);

      color = `rgb(${red * 0.9}, ${green * 0.9}, ${blue * 0.9})`;
    }

    event.target.style.backgroundColor = color;
    event.target.style.borderColor = color;
  }));
}
