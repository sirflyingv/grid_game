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
    this.pics = this._buildElements(name);
  }

  _buildElements(name) {
    const defaultPose = document.createElement('img');
    defaultPose.src = `img/${name}/${name}.png`;

    const lookUp = document.createElement('img');
    lookUp.src = `img/${name}/${name}_up.png`;

    const lookDown = document.createElement('img');
    lookDown.src = `img/${name}/${name}_down.png`;

    const rest = document.createElement('img');
    rest.src = `img/${name}/${name}_rest.png`;

    const pics = {
      defaultPose: defaultPose,
      lookUp: lookUp,
      lookDown: lookDown,
      rest: rest,
    };
    return pics;
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
    document.addEventListener('keyup', this._keyUpMove.bind(this));
    document.addEventListener('keydown', this._keyDownEyesMove.bind(this));

    this._createGameObject('pepe', true);
    // this._createGameObject('Cheems');
    // this._createGameObject('Wojak');
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
    console.log(idNum, this.freeCellsIDArr);
    console.log(this.freeCellsIDArr[idNum - 1]);
    const [x, y] = [...String(this.freeCellsIDArr[idNum - 1])];
    const id = Number(x + y);
    // deleting occupied cell ID
    this.freeCellsIDArr.splice(idNum - 1, 1);
    // Creating object
    const obj = new GameObject(name, [Number(x), Number(y)], isPlayable);
    if (isPlayable) this.#playableCharacter = obj;
    if (!isPlayable) this.#gameObjects.push(obj);

    console.log(obj);

    this._update();
  }

  _keyUpMove(e) {
    const char = this.#playableCharacter;
    let [x, y] = char.coords;

    if (e.key === 'ArrowUp' && x <= this.height && x > 1) {
      char.coords[0]--;
    }
    if (e.key === 'ArrowDown' && x < this.height && x > 0) {
      char.coords[0]++;
    }

    if (e.key === 'ArrowRight' && y < this.width && y > 0)
      char.lookDirection === 'right'
        ? char.coords[1]++
        : (char.lookDirection = 'right');

    //  just turning right (when facing wall to left)
    if (e.key === 'ArrowRight') char.lookDirection = 'right';

    if (e.key === 'ArrowLeft' && y === 1) char.lookDirection = 'left';

    if (e.key === 'ArrowLeft' && y <= this.width && y > 1)
      char.lookDirection === 'left'
        ? char.coords[1]--
        : (char.lookDirection = 'left');

    if (e.key === 'ArrowLeft' && y === 1) char.lookDirection = 'left';

    this._update();
  }

  _keyDownEyesMove(e) {
    const char = this.#playableCharacter;
    if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
      document.getElementById(`${char.coords.join('')}`).firstChild.remove();
      // getting correct pic using last letters of e.key
      const lookUpDownPic = char.pics[`look${e.key.slice(5)}`];
      // settling CSS class "left" according to LookDirection
      char.lookDirection === 'left'
        ? lookUpDownPic.classList.add('left')
        : lookUpDownPic.classList.remove('left');
      // appeing pic that looks up or down
      document
        .getElementById(`${char.coords.join('')}`)
        .appendChild(lookUpDownPic);
    }
  }

  _update() {
    const char = this.#playableCharacter;
    this.#turn++;
    this.#cellsArr.forEach(div => (div.innerText = ''));
    this.#gameObjects.forEach(
      obj =>
        (document.getElementById(
          `${obj.coords.join('')}`
        ).innerText = `${obj.name}`)
    );

    if (char.lookDirection === 'left')
      char.pics.defaultPose.classList.add('left');
    if (char.lookDirection === 'right')
      char.pics.defaultPose.classList.remove('left');

    document
      .getElementById(`${char.coords.join('')}`)
      .appendChild(char.pics.defaultPose);

    // console.log(this.#turn);
  }
}

const createGame = function () {
  const validInputs = (...inputs) => inputs.every(inp => Number.isFinite(inp));
  const allPositive = (...inputs) => inputs.every(inp => inp > 0);
  const h_input = document.querySelector('.h_input');
  const w_input = document.querySelector('.w_input');

  const height = h_input.value ? +h_input.value : +h_input.placeholder;
  const width = w_input.value ? +w_input.value : +w_input.placeholder;

  if (
    !validInputs(height, width) ||
    !allPositive(height, width) ||
    height > 9 ||
    width > 9
  )
    return alert('Inputs have to be positive numbers from 1 to 9');

  gridBBox.classList.remove('hidden');
  modalEl.classList.add('hidden');

  return new GridGameApp(height, width);
};

startBtn.addEventListener('click', createGame);
