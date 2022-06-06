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

document.addEventListener('keyup', function (e) {
  if (e.key === 'ArrowRight' && position.x < 4) {
    lookDirection = 'img/pepe_right.png';
    document.getElementById(`${position.cell()}`).classList.add('hidden');
    position.x += 1;
    document.getElementById(`${position.cell()}`).src = lookDirection;
    document.getElementById(`${position.cell()}`).classList.remove('hidden');
  }
});

document.addEventListener('keyup', function (e) {
  if (e.key === 'ArrowLeft' && position.x > 1) {
    lookDirection = 'img/pepe_left.png';
    document.getElementById(`${position.cell()}`).classList.add('hidden');
    position.x -= 1;
    document.getElementById(`${position.cell()}`).src = lookDirection;
    document.getElementById(`${position.cell()}`).classList.remove('hidden');
  }
});

// DOWN===================================================
document.addEventListener('keydown', function (e) {
  if (e.key === 'ArrowDown' && lookDirection === 'img/pepe_left.png') {
    document.getElementById(`${position.cell()}`).src =
      'img/pepe_left_down.png';
  } else if (e.key === 'ArrowDown' && lookDirection === 'img/pepe_right.png') {
    document.getElementById(`${position.cell()}`).src =
      'img/pepe_right_down.png';
  }
});

document.addEventListener('keyup', function (e) {
  document.getElementById(`${position.cell()}`).src = lookDirection;
  if (e.key === 'ArrowDown' && position.y < 4) {
    document.getElementById(`${position.cell()}`).classList.add('hidden');
    position.y += 1;
    document.getElementById(`${position.cell()}`).src = lookDirection;
    document.getElementById(`${position.cell()}`).classList.remove('hidden');
  }
});

// UP======================================================
document.addEventListener('keydown', function (e) {
  if (e.key === 'ArrowUp' && lookDirection === 'img/pepe_left.png') {
    document.getElementById(`${position.cell()}`).src = 'img/pepe_left_up.png';
  } else if (e.key === 'ArrowUp' && lookDirection === 'img/pepe_right.png') {
    document.getElementById(`${position.cell()}`).src = 'img/pepe_right_up.png';
  }
});

document.addEventListener('keyup', function (e) {
  document.getElementById(`${position.cell()}`).src = lookDirection;
  if (e.key === 'ArrowUp' && position.y > 1) {
    document.getElementById(`${position.cell()}`).classList.add('hidden');
    position.y -= 1;
    document.getElementById(`${position.cell()}`).src = lookDirection;
    document.getElementById(`${position.cell()}`).classList.remove('hidden');
  }
});
