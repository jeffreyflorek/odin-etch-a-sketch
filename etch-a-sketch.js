const gridContainer = document.querySelector('#grid-container');

for (let i = 1; i <= 16; i++) {
  for (let j = 1; j <= 16; j++) {
    let gridItem = document.createElement('div');
    gridItem.id = `row${i}col${j}`;
    gridItem.classList.add('grid-item');
    gridContainer.appendChild(gridItem);
  }
}
