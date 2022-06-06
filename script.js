'use strict';

const position = {
  x: 1,
  y: 1,
  cell: function () {
    return this.x + this.y * 10;
  },
};

let lookDirection = '';
let playing = false;

function init() {
  playing = false;
  position.x = Math.trunc(4 * Math.random() + 1);
  position.y = Math.trunc(4 * Math.random() + 1);
  document.querySelector('.pepe').classList.add('hidden');
  document.getElementById(`${position.cell()}`).classList.remove('hidden');
  document.getElementById(`${position.cell()}`).src = 'img/pepe_rest.png';
  lookDirection = 'img/pepe_right.png';
}

init();

// adding random object ===============================================================================

const loot1 = {
  type: 'pistol',
  imgPath() {
    return `img/${this.type}.png`;
  },
  x: 1,
  y: 1,
  cell: function () {
    // refactor on BIND method from POSITION object
    return this.x + this.y * 10;
  },
};

function addItem(item) {
  document.getElementById(`${item.cell()}`).classList.remove('hidden');
  document.getElementById(`${item.cell()}`).src = item.imgPath();
  console.log(item.imgPath());
}

addItem(loot1);
// =======================================================================================================
// trying to react on collision
function pistolCollision(item) {
  if (item.cell() === position.cell()) {
    document.getElementById(`${item.cell()}`).src = 'img/pepegaaim.gif';
    item.x = -1;
    item.y = -1;
    moveToInventory(item);
  }
}

//========================================================================================================
// PUSHING ITEM IN INVENTORY
const inventory = document.querySelector('.inner-sidebar');

function moveToInventory(item) {
  inventory.insertAdjacentHTML(
    'afterbegin',
    `<img src="img/${item.type}.png" class="inventory-item">`
  );
}

//========================================================================================================

function moveToNextCell() {
  preserveHorizontalDirection();
  document.getElementById(`${position.cell()}`).classList.remove('hidden');
}

function hidePreviousCell() {
  document.getElementById(`${position.cell()}`).classList.add('hidden');
}

function preserveHorizontalDirection() {
  document.getElementById(`${position.cell()}`).src = lookDirection;
}

function lookRight() {
  lookDirection = 'img/pepe_right.png';
}

function lookLeft() {
  lookDirection = 'img/pepe_left.png';
}

function moveRight() {
  lookRight();
  hidePreviousCell();
  position.x += 1;
  moveToNextCell();
}

function moveLeft() {
  lookLeft();
  hidePreviousCell();
  position.x -= 1;
  moveToNextCell();
}

function moveDown() {
  preserveHorizontalDirection();
  hidePreviousCell();
  position.y += 1;
  moveToNextCell();
}

function moveUp() {
  preserveHorizontalDirection();
  hidePreviousCell();
  position.y -= 1;
  moveToNextCell();
}

document.addEventListener('keyup', function (e) {
  if (e.key === 'ArrowRight' && position.x < 4) moveRight();
  else if (e.key === 'ArrowLeft' && position.x > 1) moveLeft();
  else if (e.key === 'ArrowDown' && position.y < 4) moveDown();
  else if (e.key === 'ArrowUp' && position.y > 1) moveUp();
  if (playing === true) preserveHorizontalDirection();
  console.log(position.cell());
  pistolCollision(loot1);
});

// look down
document.addEventListener('keydown', function (e) {
  playing = true;
  if (e.key === 'ArrowDown' && lookDirection === 'img/pepe_left.png') {
    document.getElementById(`${position.cell()}`).src =
      'img/pepe_left_down.png';
  } else if (e.key === 'ArrowDown' && lookDirection === 'img/pepe_right.png') {
    document.getElementById(`${position.cell()}`).src =
      'img/pepe_right_down.png';
  }
});

// look up
document.addEventListener('keydown', function (e) {
  if (e.key === 'ArrowUp' && lookDirection === 'img/pepe_left.png') {
    document.getElementById(`${position.cell()}`).src = 'img/pepe_left_up.png';
  } else if (e.key === 'ArrowUp' && lookDirection === 'img/pepe_right.png') {
    document.getElementById(`${position.cell()}`).src = 'img/pepe_right_up.png';
  }
});
