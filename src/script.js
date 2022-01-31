const header = document.getElementById("header");
const boxList = Array.from(document.getElementsByTagName("td"));
const resetBn = document.getElementById("restart");
let turn = 0;

const manageBoard = (clean, str = "X") => {
  if (clean) {
    boxList.map((box) => (box.innerText = ""));
    header.innerHTML = "Start Playing Now!";
  } else {
    boxList.map((box) => (box.innerText = str));
  }
};

const getInnerTexts = () => {
  const textList = boxList.map((box) => {
    return box.innerText;
  });
  textList.unshift(0);
  return textList;
};

const checkCombinations = (textList, check) => {
  return (
    textList[1] + textList[2] + textList[3] === check ||
    textList[4] + textList[5] + textList[6] === check ||
    textList[7] + textList[8] + textList[9] === check ||
    textList[1] + textList[4] + textList[7] === check ||
    textList[2] + textList[5] + textList[8] === check ||
    textList[3] + textList[6] + textList[9] === check ||
    textList[1] + textList[5] + textList[9] === check ||
    textList[3] + textList[5] + textList[7] === check
  );
};

const checkWin = () => {
  const textList = getInnerTexts();
  if (checkCombinations(textList, "XXX")) {
    if (header.innerText !== "Player O Wins!") {
      header.innerText = "Player X Wins!";
      manageBoard(false);
    }
  }
  if (checkCombinations(textList, "OOO")) {
    if (header.innerText !== "Player X Wins!") {
      header.innerText = "Player O Wins!";
      manageBoard(false, (str = "O"));
    }
  }
};

resetBn.addEventListener("click", () => {
  manageBoard(true);
});

boxList.map((box) => {
  box.addEventListener("click", () => {
    if (box.innerText === "" && turn === 0) {
      box.innerText = "X";
      turn++;
      checkWin();
    }
    if (box.innerText === "" && turn === 1) {
      box.innerText = "O";
      turn--;
      checkWin();
    }
  });
});
