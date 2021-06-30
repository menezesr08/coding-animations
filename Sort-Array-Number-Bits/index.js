const numsDiv = document.getElementById("nums");
const sortedNumsDiv = document.getElementById("sortedNums");
const sortedToBinaryDiv = document.getElementById("sortedToBinary");
const sortedBinaryDiv = document.getElementById("sortedBinary");
const outputDiv = document.getElementById("output");
var nums = [];
var binaryValues = [];
var sortedNums;
var startBtn = document.getElementById("startBtn");
generateInputBlocks();
startBtn.addEventListener("click", function () {
  if (!nums || nums.length === 0) {
    $(".block").remove();
    $(".values").remove();
    $(".processingBlock").remove();
    $(".outputBlock").remove();
    generateInputBlocks();
  }
  startBtn.disabled = true;
  solution();
});

function generateInputBlocks(numBlocks = 7) {
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
  const block = createBlock(0, sortedNums[0], "processingBlock");
  sortedNumsDiv.append(block);
  for (let i = 1; i < sortedNums.length; i++) {
    const block = createBlock(i, sortedNums[i], "processingBlock");
    sortedNumsDiv.append(block);
  }
}

async function sortedToBinary() {
  await addDelay(2000);
  const numToBinary = sortedNums[0].toString(2);
  binaryValues.push(numToBinary);
  const block = createBlock(0, numToBinary, "processingBlock");
  sortedToBinaryDiv.append(block);
  await addDelay(2000);
  for (let i = 1; i < sortedNums.length; i++) {
    const numToBinary = sortedNums[i].toString(2);
    const block = createBlock(i, sortedNums[i].toString(2), "processingBlock");
    sortedToBinaryDiv.append(block);
    binaryValues.push(numToBinary);
    await addDelay(2000);
  }
}

async function sortBinaryValues() {
  await addDelay(2000);
  const sortedBinaryValues = binaryValues.sort(
    (a, b) => convertToBits(a) - convertToBits(b)
  );
  const block = createBlock(0, sortedBinaryValues[0], "processingBlock");
  sortedBinaryDiv.append(block);
  await addDelay(2000);
  for (let i = 1; i < sortedBinaryValues.length; i++) {
    const block = createBlock(
      i,
      sortedBinaryValues[i].toString(2),
      "processingBlock"
    );
    sortedBinaryDiv.append(block);
    await addDelay(2000);
  }
}

async function generateOutputBlocks() {
  var binaryToNums = binaryValues.map((e) => parseInt(e, 2));
  for (let i = 0; i < binaryToNums.length; i++) {
    let outputBlock = createBlock(i, binaryToNums[i], "outputBlock");
    outputDiv.append(outputBlock);
    await addDelay(2000);
  }
}

async function solution() {
  generateSortedBlocks();
  sortedToBinary().then(function (value) {
    sortBinaryValues().then(function (value) {
      generateOutputBlocks().then(function (value) {
        startBtn.disabled = false;
        nums = [];
        binaryValues = [];
        sortedNums = [];
      });
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

function addDelay(time) {
  let promise = new Promise((resolve) =>
    setTimeout(() => {
      resolve();
    }, time)
  );
  return promise;
}

function convertToBits(binaryValue) {
  const bits = binaryValue.match(/1/g);
  return bits ? bits.length : 0;
}
