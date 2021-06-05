const numsDiv = document.getElementById("nums");
const sortedNumsDiv = document.getElementById("sortedNums");
const outputDiv = document.getElementById("outputDiv");
var outputTable = document.getElementById("output-table");
var nums = [];
var sortedNums;
var mapping = {};
var startBtn = document.getElementById("startBtn");
generateBlocks();
startBtn.addEventListener("click", function () {
  if (!nums || nums.length === 0) {
    $("label").remove();
    $(".block").remove();
    $(".values").remove();
    $(".sorted").remove();
    $(".outputBlock").remove();
    generateBlocks();
  }
  startBtn.disabled = true;
  solution();
});

function generateBlocks(numBlocks = 5) {
  for (let i = 0; i < numBlocks; i++) {
    const randomNumber = Math.floor(Math.random() * 20) + 1;
    nums.push(randomNumber);
    const block = createBlock(i, randomNumber);
    numsDiv.append(block);
  }
}

function createSortedBlocks() {
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
  console.log(sortedNums);
  for (let i = 0; i < sortedNums.length; i++) {
    sortedBlocks[i].style.backgroundColor = "#ffff00";
    if (!(sortedNums[i] in mapping)) {
      mapping[sortedNums[i]] = i;
      const row = document.createElement("tr");
      row.classList.add("values");
      row.id = sortedNums[i];
      const element = document.createElement("th");
      element.innerHTML = sortedNums[i];
      const index = document.createElement("th");
      index.innerHTML = i;
      row.append(index);
      row.append(element);

      outputTable.appendChild(row);
    }
    await addDelay(1000);
    sortedBlocks[i].style.backgroundColor = "#6699ff";
  }
}

async function createOutputBlocks() {
  let inputBlocks = numsDiv.querySelectorAll(".block");
  for (let i = 0; i < nums.length; i++) {
    inputBlocks[i].style.backgroundColor = "#FFFF00";
    const blockValue = inputBlocks[i].firstElementChild.innerHTML;
    let selectedRow = document.getElementById(blockValue);
    selectedRow.style.backgroundColor = "#FFFF00";
    const value = parseInt(blockValue, 10);
    let outputBlock = createBlock(i, mapping[value], "outputBlock");
    outputDiv.append(outputBlock);

    await addDelay(1000);
    inputBlocks[i].style.backgroundColor = "";
    selectedRow.style.backgroundColor = "";
  }
}

async function solution() {
  createSortedBlocks();
  mapValues().then(function (value) {
    createOutputBlocks().then(function (value) {
      nums = [];
      sortedNums = [];
      mapping = {};
      startBtn.disabled = false;
    });
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
