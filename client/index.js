// Constants
const ELEVATOR_MAX_FLOOR = 15;
const ELEVATOR_MIN_FLOOR = 1;
const ELEVATOR_LINE_LENGTH = 3;
const ELEVATORS_ALL_BUSY = -1;
const ELEVATORS_ALREADY = -2;
const ELEVATORS_WATCH_DELAY = 200;
const DISABLED_STYLE = 'background: lightgray';
const ENABLE_STYLE = 'background: normal';
const HIGHLIGHT_STYE = 'font-weight: bold; color: red';
const NORMAL_STYE = 'font-weight: normal; color: normal';

// Elements
const elCallContainer = $$('.call-container');
const elCallBoxes = [];
const elMain = $$('main');

// Elevators
const elevators = Array.from(Array(ELEVATOR_LINE_LENGTH).keys()).map(() => ({
  element: null,
  floor: 1,
  accumulation: 0,
  isMoving: false,
  line: null,
}));

// Init
(function makeCallBoxes() {
  for (let i = ELEVATOR_MIN_FLOOR; i <= ELEVATOR_MAX_FLOOR; i++) {
    const box = document.createElement('div');
    box.innerHTML = i;
    addClass(box, 'box');
    elCallContainer.appendChild(box);

    elCallBoxes.push(box);
  }
})();

(function makeElevators() {
  for (let i = 0; i < ELEVATOR_LINE_LENGTH; i++) {
    const lineContainer = document.createElement('div');
    addClass(lineContainer, 'line-container');
    elMain.appendChild(lineContainer);

    const elevator = document.createElement('div');
    addClass(elevator, 'elevator');
    elevator.innerHTML = 1;
    lineContainer.appendChild(elevator);

    elevators[i].element = elevator;
    elevators[i].line = i;
  }
})();

function getAvailableElevator(destFloor) {
  let closest = Number.MAX_SAFE_INTEGER;
  let findIndex = ELEVATORS_ALL_BUSY;

  for (let i = 0; i < elevators.length; i++) {
    const { isMoving, floor } = elevators[i];
    const diff = Math.abs(destFloor - floor);
    if (!isMoving && closest > diff) {
      closest = diff;
      findIndex = i;
      if (diff === 0) findIndex = ELEVATORS_ALREADY;
    }
  }

  return findIndex;
}

function toggleCallAvailableEffect(isAllBusy) {
  if (isAllBusy) {
    elCallContainer.style = DISABLED_STYLE;
    return;
  }

  elCallContainer.style = ENABLE_STYLE;
}

function toggleCallBox(toggle, callBox) {
  if (toggle) {
    callBox.style = HIGHLIGHT_STYE;
    return;
  }

  callBox.style = NORMAL_STYE;
}

// Watcher
(function watchElevators() {
  const isAllBusy = elevators.every(elevator => elevator.isMoving);
  toggleCallAvailableEffect(isAllBusy);

  setTimeout(watchElevators, ELEVATORS_WATCH_DELAY);
})();

// Handlers
async function handlerOnClickedCallContainer({ target }) {
  const { innerHTML } = target;
  const availElevatorIndex = getAvailableElevator(+innerHTML);
  const isNotElevatorAvailable =
    availElevatorIndex === ELEVATORS_ALL_BUSY ||
    availElevatorIndex === ELEVATORS_ALREADY;

  if (isNotElevatorAvailable) {
    return;
  }

  toggleCallBox(true, target);
  await goTo(elevators[availElevatorIndex], +innerHTML);
  toggleCallBox(false, target);
}

// Events
elCallContainer.addEventListener('click', handlerOnClickedCallContainer);
