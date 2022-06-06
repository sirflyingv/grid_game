'use strict';

const position = {
  x: 1,
  y: 1,
  cell: function () {
    return this.x + this.y * 10;
  },
};

let currentCellEl = document.getElementById(`${position.cell()}`);

let lookDirection = 'img/pepe_right.png';

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
  preserveHorizontalDirection();
  if (e.key === 'ArrowRight' && position.x < 4) moveRight();
  else if (e.key === 'ArrowLeft' && position.x > 1) moveLeft();
  else if (e.key === 'ArrowDown' && position.y < 4) moveDown();
  else if (e.key === 'ArrowUp' && position.y > 1) moveUp();
});

// look down
document.addEventListener('keydown', function (e) {
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
