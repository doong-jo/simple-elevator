// Constants
const DIRECTION_DOWN = -1;
const DIRECTION_UP = 1;
const DIRECTION_NONE = 0;
const MOVE_DELAY = 1000;
const ELEVATOR_REQUIRED_REPAIR = 20;
const HEIGHT_BASIS = 4;

function step(elevator, direction) {
  elevator.floor += direction;
  const { element, floor } = elevator;
  element.innerHTML = floor;

  const transformY = amount => `transform: translateY(${amount}rem)`;
  element.style = transformY(-HEIGHT_BASIS * (floor - 1));
}

function decideDirectionAndAmount(destFloor, currentFloor) {
  const diff = destFloor - currentFloor;

  if (diff > 0) {
    return { amount: Math.abs(diff), direction: DIRECTION_UP };
  } else if (diff < 0) {
    return { amount: Math.abs(diff), direction: DIRECTION_DOWN };
  }

  return DIRECTION_NONE;
}

async function goTo(elevator, destFloor) {
  const { floor, isMoving } = elevator;
  if (isMoving) return;

  const { amount, direction } = decideDirectionAndAmount(destFloor, floor);
  if (direction === DIRECTION_NONE) return;
  elevator.isMoving = true;

  async function going(resolved) {
    setTimeout(() => {
      step(elevator, direction);
      elevator.accumulation++;

      count--;
      if (count === 0) {
        resolved();
        return;
      }

      going(resolved);
    }, MOVE_DELAY);
  }

  let count = amount;
  const isMovingDone = new Promise(going);

  await isMovingDone;
  elevator.isMoving = false;

  if (elevator.accumulation >= ELEVATOR_REQUIRED_REPAIR) {
    requestRepair(elevator);
  }
  requestSaveMove(elevator, floor, destFloor);
}
