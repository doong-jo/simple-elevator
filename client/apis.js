const REQUEST_MOVE_URL = 'https://localhost:3000/api/moved';
const REQUEST_REPAIR_URL =
  'https://hooks.slack.com/services/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';

// APIs
function requestRepair(elevator) {
  fetch(REQUEST_REPAIR_URL, {
    method: 'POST',
    body: JSON.stringify({
      text: `${elevator.line + 1}번 라인의 엘리베이터가 ${
        elevator.accumulation
      }개층을 이동했습니다. 점검이 필요합니다.`,
    }),
  });
  elevator.accumulation = 0;
}

function requestSaveMove(elevator, start, dest) {
  fetch(REQUEST_MOVE_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      line_number: elevator.line,
      start,
      dest,
    }),
  });
}
