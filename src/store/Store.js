import { store } from "@risingstack/react-easy-state";

function firstZeroFinder(index, arr, type = "split") {
  for (let i = 0; i < arr[index].array.length; i++) {
    if (arr[index].array[i] === 0) {
      if (type === "merge" && state.maxMergLen < i) {
        state.maxMergLen = i;
      }
      return i;
    }
  }
}
function firstZeroFinder1D(arr) {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === 0) {
      return i;
    }
  }
  return -1;
}

function appendSheet(move, array, row) {
  //If move is merge
  if (move === "merge") {
    state.sheetMerge[row].array.splice(
      firstZeroFinder(row, state.sheetMerge, "merge"),
      array.length,
      ...array
    );
  }

  //Otherwise move is split
  else {
    state.sheetSplit[row].array.splice(
      firstZeroFinder(row, state.sheetSplit),
      array.length,
      ...array
    );
  }
}

function fillGapsArr(start, end) {
  let arr = [];

  for (let i = 0; i < end - start; i++) {
    arr.push("x");
  }

  return arr;
}

function fillTheGaps(zeroesEncountered, type) {
  if (type === "merge") {
    for (let i = 0; i < state.depth - 2; i++) {
      firstZeroFinder(i, state.sheetMerge, "merge");
    }

    let firstZero = firstZeroFinder(0, state.sheetMerge, "merge");
    state.sheetMerge[0].array.splice(
      firstZero,
      state.maxMergLen - firstZero,
      ...fillGapsArr(firstZero, state.maxMergLen)
    );
  } else {
    let firstZero = firstZeroFinder(state.depth - 1, state.sheetSplit);

    state.sheetSplit[state.depth - 1].array.splice(
      firstZero,
      zeroesEncountered - firstZero,
      ...fillGapsArr(firstZero, zeroesEncountered)
    );
  }
}

function resetStates() {
  state.lives = 3;
  state.input = [];
  state.ans = [];
  state.level = 0;
  state.sheetMerge = [];
  state.sheetSplit = [];
  state.depth = 1;
  state.runnable = 1;
  state.step = 1;
  state.gameOver = false;
  state.instruct = 0;
  state.loseGame = false;
}

const state = store({
  lives: 3,
  input: [],
  ans: [],
  level: 0,
  instruct: 0,
  algo: "merge",
  sheetMerge: [],
  sheetSplit: [],
  depth: 1,
  runnable: 1,
  step: 1,
  gameOver: false,
  splits: [0],
  zeroesEncountered: 0,
  maxMergLen: 0,
  reseting: false,
  feedbackColor: "rgba(220,220,220, .6)",
  loseGame: false,
  depthInc: () => (state.runnable ? state.depth++ : state.depth),
  stepInc: () => state.step++,
  appendSheet: (move, array, row) => appendSheet(move, array, row),
  fillTheGaps: (zeroesEncountered, type) =>
    fillTheGaps(zeroesEncountered, type),
  resetStates: () => resetStates(),
  firstZeroFinder1D: (arr) => firstZeroFinder1D(arr),
});

export default state;
