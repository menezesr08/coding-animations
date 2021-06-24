const numsDiv = document.getElementById("nums");
const sortedNumsDiv = document.getElementById("sortedNums");
let maxSumMinPairs = document.getElementById("pairs");
var outputTable = document.getElementById("output-table");
var nums = [];
var sortedNums;
var startBtn = document.getElementById("startBtn");
generateInputBlocks();
startBtn.addEventListener("click", function () {
  if (!nums || nums.length === 0) {
    $("label").remove();
    $(".block").remove();
    $(".values").remove();
    $(".sorted").remove();
    generateInputBlocks();
  }
  maxSumMinPairs.innerHTML = "";
  startBtn.disabled = true;
  solution();
});

function generateInputBlocks(numBlocks = 6) {
  for (let i = 0; i < numBlocks; i++) {
    const randomNumber = Math.floor(Math.random() * 20) + 1;
    nums.push(randomNumber);
    const block = createBlock(i, randomNumber);
    numsDiv.append(block);
  }
}

function generateSortedBlocks() {
  sortedNums = [...nums].sort(function (a, b) {
    return a - b;
  });
  let standardLabelMargin = 51;
  const label = createIndexLabel(0, 22);
  const block = createBlock(0, sortedNums[0], "sorted");
  sortedNumsDiv.append(label);
  sortedNumsDiv.append(block);
  for (let i = 1; i < sortedNums.length; i++) {
    const label = createIndexLabel(i, standardLabelMargin);
    const block = createBlock(i, sortedNums[i], "sorted");
    sortedNumsDiv.append(label);
    sortedNumsDiv.append(block);
  }
}

async function mapValues() {
  let sortedBlocks = sortedNumsDiv.querySelectorAll(".sorted");
  let i = 0;
  let j = sortedNums.length - 1;
  let pairSums = [];
  while (i < j) {
    sortedBlocks[i].style.backgroundColor = "#ffff00";
    sortedBlocks[j].style.backgroundColor = "#ffff00";
    const row = document.createElement("tr");
    row.classList.add("values");
    const pair = document.createElement("th");
    pair.innerHTML = `(${sortedNums[i]}, ${sortedNums[j]})`;
    const pairSum = sortedNums[i] + sortedNums[j];
    pairSums.push(pairSum);
    const sum = document.createElement("th");
    sum.innerHTML = pairSum;
    row.append(pair);
    row.append(sum);
    outputTable.append(row);
    await addDelay(3000);
    sortedBlocks[i].style.backgroundColor = "#6699ff";
    sortedBlocks[j].style.backgroundColor = "#6699ff";
    j--;
    i++;
  }

  maxSumMinPairs.innerHTML = Math.max(...pairSums);
}

async function solution() {
  generateSortedBlocks();
  mapValues().then(function (value) {
    nums = [];
    sortedNums = [];
    startBtn.disabled = false;
  });
}

function createBlock(i, label, type = "block") {
  const block = document.createElement("div");
  block.classList.add(type);
  block.style.transform = `translateX(${i * 60}px)`;

  const blockLabel = document.createElement("label");
  blockLabel.innerHTML = label;

  block.appendChild(blockLabel);

  return block;
}

function createIndexLabel(i, margin) {
  const label = document.createElement("label");
  label.innerHTML = i;
  label.style.marginLeft = `${margin}px`;
  return label;
}

function addDelay(time) {
  let promise = new Promise((resolve) =>
    setTimeout(() => {
      resolve();
    }, time)
  );
  return promise;
}
