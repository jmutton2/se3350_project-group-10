import React from "react";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import state from "../store/Store";
import { mergeSort } from "../algorithms/mergesort";

export function generateEmptyArr() {
  state.input = [];
  for (let i = 0; i < state.ans[state.step].array.length; i++) {
    state.input.push(0);
  }
}

const random = (min, max) => {
  let num = [];
  for (let i = 0; i < 10; i++) {
    num.push(Math.floor(Math.random() * (max - min) + min));
  }
  return num;
};

function initializeSplit() {
  for (let i = 1; i < state.depth; i++) {
    state.splits.push(i);
  }
  //Switch to -2 for 0,1,2,3,4,3,2,1,0 instead of 0,1,2,3,4,4,3,2,1,0
  for (let i = state.depth - 1; i > 0; i--) {
    state.splits.push(i);
  }
  state.splits.push(0);
}

function initializeSheets() {
  let depth = state.depth;
  //Fill sheetSplit
  let temp = [];
  for (let i = 0; i < depth; i++) {
    temp = [];
    for (let j = 0; j < state.ans[0].array.length; j++) {
      temp.push(0);
    }
    state.sheetSplit.push(temp);
  }

  //Fill sheetMerge
  for (let i = 0; i < depth - 1; i++) {
    temp = [];
    for (let j = 0; j < state.ans[0].array.length; j++) {
      temp.push(0);
    }
    state.sheetMerge.push(temp);
  }
}

function handleClick(level) {
  switch (level) {
    case 1:
      console.log("level 1");
      break;
    case 2:
      console.log("level 2");
      break;
    case 3:
      mergeSort([...random(1, 11)]);
      generateEmptyArr();
      initializeSplit();
      initializeSheets();
      break;
    default:
  }
}

export default function Home() {
  return (
    <div>
      HOME SCREEN
      <div>
        <Link to="/app">
          <Button
            variant="contained"
            onClick={() => {
              handleClick(3);
            }}
            sx={{
              backgroundColor: "#3D3D3D",
              height: "50px",
              width: "250px",
            }}
          >
            This goes to App.js
          </Button>
        </Link>
      </div>
    </div>
  );
}
