const Modes = {
  Eraser: 'eraser-mode',
  Color: 'color-mode',
  Rainbow: 'rainbow-mode',
};

let mode = Modes.Color;
let color = {
  h: 0,
  s: 100,
  l: 0,
}

const colorPicker = document.querySelector('#color-picker');
colorPicker.value = HSLToHex(color);
colorPicker.addEventListener('change', event => {
  color = hexToHSL(event.target.value);
});

const gridContainer = document.querySelector('#grid-container');
drawGrid(gridContainer);

const resetButton = document.querySelector('#reset');
resetButton.addEventListener('click', event => {
  drawGrid(gridContainer, true);
});

const modeButtons = document.querySelectorAll('.mode-button');
modeButtons.forEach(button => button.addEventListener('click', event => {
  mode = event.target.id;
  document.querySelector('#mode-label').textContent = mode.split('-')[0];
}));

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
    let colorString = '';
    let borderColorString = '';

    switch (mode) {
      case Modes.Color:
        colorString = `hsl(${color.h}, ${color.s}%, ${color.l}%)`;
        borderColorString = colorString;
        break;

      case Modes.Eraser:
        colorString = 'white';
        borderColorString = '#EEEEEE'
        break;

      case Modes.Rainbow:
        color.l = 50;
        color.s = 100;
        colorString = `hsl(${color.h}, ${color.s}%, ${color.l}%)`;
        borderColorString = colorString;
        color.h += 10;
        colorPicker.value = HSLToHex(color);
    }

    event.target.style.backgroundColor = colorString;
    event.target.style.borderColor = borderColorString;
  }));
}

// Adapted from: https://css-tricks.com/converting-color-spaces-in-javascript/
function hexToHSL(H) {
  // Convert hex to RGB first
  let r = 0, g = 0, b = 0;
  if (H.length == 4) {
    r = "0x" + H[1] + H[1];
    g = "0x" + H[2] + H[2];
    b = "0x" + H[3] + H[3];
  } else if (H.length == 7) {
    r = "0x" + H[1] + H[2];
    g = "0x" + H[3] + H[4];
    b = "0x" + H[5] + H[6];
  }
  // Then to HSL
  r /= 255;
  g /= 255;
  b /= 255;
  let cmin = Math.min(r, g, b),
    cmax = Math.max(r, g, b),
    delta = cmax - cmin,
    hue = 0,
    sat = 0,
    lig = 0;

  if (delta == 0)
    hue = 0;
  else if (cmax == r)
    hue = ((g - b) / delta) % 6;
  else if (cmax == g)
    hue = (b - r) / delta + 2;
  else
    hue = (r - g) / delta + 4;

  hue = Math.round(hue * 60);

  if (hue < 0)
    hue += 360;

  lig = (cmax + cmin) / 2;
  sat = delta == 0 ? 0 : delta / (1 - Math.abs(2 * lig - 1));
  sat = +(sat * 100).toFixed(1);
  lig = +(lig * 100).toFixed(1);

  let hsl = {
    h: hue,
    s: sat,
    l: lig,
  }

  return hsl;
}

// Adapted from: https://css-tricks.com/converting-color-spaces-in-javascript/
function HSLToHex(hsl) {
  let h = hsl.h % 360;
  let s = hsl.s / 100;
  let l = hsl.l / 100;

  let c = (1 - Math.abs(2 * l - 1)) * s,
    x = c * (1 - Math.abs((h / 60) % 2 - 1)),
    m = l - c / 2,
    r = 0,
    g = 0,
    b = 0;

  if (0 <= h && h < 60) {
    r = c; g = x; b = 0;
  } else if (60 <= h && h < 120) {
    r = x; g = c; b = 0;
  } else if (120 <= h && h < 180) {
    r = 0; g = c; b = x;
  } else if (180 <= h && h < 240) {
    r = 0; g = x; b = c;
  } else if (240 <= h && h < 300) {
    r = x; g = 0; b = c;
  } else if (300 <= h && h < 360) {
    r = c; g = 0; b = x;
  }
  // Having obtained RGB, convert channels to hex
  r = Math.round((r + m) * 255).toString(16);
  g = Math.round((g + m) * 255).toString(16);
  b = Math.round((b + m) * 255).toString(16);

  // Prepend 0s, if necessary
  if (r.length == 1)
    r = "0" + r;
  if (g.length == 1)
    g = "0" + g;
  if (b.length == 1)
    b = "0" + b;

  return "#" + r + g + b;
}
