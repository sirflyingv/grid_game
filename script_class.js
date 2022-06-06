'use strict';

const gridBBox = document.querySelector('.main-grid');
const startBtn = document.querySelector('.start_button');
const modalEl = document.querySelector('.modal');

class GameObject {
  constructor(name, coords, isPlayable = false) {
    this.lookDirection = 'right';
    this.name = name;
    this.coords = coords;
    this.isPlayable = isPlayable;
  }
}

class GridGameApp {
  #cellsArr = [];
  #cellsIDArr = [];
  freeCellsIDArr = [];
  #gameObjects = [];
  #playableCharacter;
  #turn = -2;
  constructor(height, width) {
    this.height = height;
    this.width = width;
    this.mapSize = [this.height, this.width];
    this._composeField();
    this.freeCellsIDArr = this.#cellsIDArr;

    // Adding Listeners
    document.addEventListener('keyup', this._keyboard.bind(this));
    document.addEventListener('keydown', this._keyDownWatch.bind(this));

    this._createGameObject('pepe', true);
    this._createGameObject('Cheems');
    this._createGameObject('Wojak');
  }
  _composeField() {
    gridBBox.style.cssText += `grid-template-columns: repeat(${this.width}, 1fr)`;
    for (let h = 1; h <= this.height; h++) {
      for (let w = 1; w <= this.width; w++) {
        const div = document.createElement('div');
        div.classList.add('cell-0');
        div.id = `${h}${w}`;
        this.#cellsArr.push(div);
        this.#cellsIDArr.push(+div.id);
      }
    }
    this.#cellsArr.forEach(e => gridBBox.append(e));
    // console.log(this.#cellsArr);
  }
  _createGameObject(name, isPlayable) {
    // Finding free cell
    const idNum = Math.trunc(this.freeCellsIDArr.length * Math.random() + 1);
    const [x, y] = [...String(this.freeCellsIDArr[idNum - 1])];
    const id = Number(x + y);

    // deleting occupied cell ID
    this.freeCellsIDArr.splice(idNum - 1, 1);
    // Creating object
    const obj = new GameObject(name, [Number(x), Number(y)], isPlayable);
    if (isPlayable) this.#playableCharacter = obj;
    if (!isPlayable) this.#gameObjects.push(obj);
    // console.log(obj);
    this._update();
  }

  _keyboard(e) {
    const char = this.#playableCharacter;
    let [x, y] = char.coords;
    if (e.key === 'ArrowUp' && x <= this.height && x > 1) {
      char.coords[0]--;
    }
    if (e.key === 'ArrowDown' && x < this.height && x > 0) {
      char.coords[0]++;
    }

    if (e.key === 'ArrowRight' && y < this.width && y > 0) {
      char.lookDirection === 'right'
        ? char.coords[1]++
        : (char.lookDirection = 'right');
    }
    if (e.key === 'ArrowRight' && y === this.width)
      char.lookDirection = 'right';

    if (e.key === 'ArrowLeft' && y <= this.width && y > 1) {
      char.lookDirection === 'left'
        ? char.coords[1]--
        : (char.lookDirection = 'left');
    }
    if (e.key === 'ArrowLeft' && y === 1) char.lookDirection = 'left';
    // console.log(this.#playableCharacter);
    this._update();
  }

  _keyDownWatch(e) {
    const char = this.#playableCharacter;
    if (e.key === 'ArrowUp' || e.key === 'ArrowDown')
      document.getElementById(
        `${char.coords.join('')}`
      ).innerHTML = `<img src="img/${char.name}_${char.lookDirection}_${e.key
        .slice(5)
        .toLowerCase()}.png">`;
  }

  _update() {
    this.#turn++;
    this.#cellsArr.forEach(div => (div.innerText = ''));
    this.#gameObjects.forEach(
      obj =>
        (document.getElementById(
          `${obj.coords.join('')}`
        ).innerText = `${obj.name}`)
    );

    document.getElementById(
      `${this.#playableCharacter.coords.join('')}`
    ).innerHTML = `<img src="img/${this.#playableCharacter.name}_${
      this.#playableCharacter.lookDirection
    }.png">`;

    console.log(this.#turn);
  }
}

const createGame = function () {
  const validInputs = (...inputs) => inputs.every(inp => Number.isFinite(inp));
  const allPositive = (...inputs) => inputs.every(inp => inp > 0);
  const h_input = document.querySelector('.h_input');
  const w_input = document.querySelector('.w_input');

  const height = h_input.value ? +h_input.value : +h_input.placeholder;
  const width = w_input.value ? +w_input.value : +w_input.placeholder;

  if (!validInputs(height, width) || !allPositive(height, width))
    return alert('Inputs have to be positive numbers');

  gridBBox.classList.remove('hidden');
  modalEl.classList.add('hidden');

  const game = new GridGameApp(height, width);
};

startBtn.addEventListener('click', createGame);
