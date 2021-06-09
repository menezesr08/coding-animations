const inputDiv = document.getElementById("input");
var startBtn = document.getElementById("startBtn");
var outputTable = document.getElementById("output-table");
generateInputBlocks();
startBtn.addEventListener("click", function () {
  $("label").remove();
  $(".block").remove();
  $(".values").remove();
  startBtn.disabled = true;
  generateInputBlocks();
  solution();
});

function generateInputBlocks() {
  let nums = [1, 2, 3, 1, 1, 3];
  let standardLabelMargin = 51;
  let label = createIndexLabel(0, 22);
  let block = createBlock(0, nums[0]);
  inputDiv.appendChild(label);
  inputDiv.appendChild(block);

  for (let i = 1; i < nums.length; i++) {
    let label = createIndexLabel(i, standardLabelMargin);
    let block = createBlock(i, nums[i]);
    inputDiv.appendChild(label);
    inputDiv.appendChild(block);
  }
}

async function solution() {
  let numOccurences = {};
  let numGoodPairs = 0;
  let inputBlocks = inputDiv.querySelectorAll(".block");

  for (let i = 0; i < inputBlocks.length; i += 1) {
    inputBlocks[i].style.backgroundColor = "#58B7FF";
    const blockValue = inputBlocks[i].firstElementChild.innerHTML;
    const value = parseInt(blockValue, 10);
    if (value in numOccurences) {
      inputBlocks[i].style.backgroundColor = "#FFFF00";
      numGoodPairs += numOccurences[value];
      numOccurences[value] += 1;
    } else {
      numOccurences[value] = 1;
    }
    const row = document.createElement("tr");
    row.classList.add("values");
    const elementHeader = document.createElement("th");
    elementHeader.innerHTML = value;
    const countHeader = document.createElement("th");
    countHeader.innerHTML = numOccurences[value];
    const numGoodPairsHeader = document.createElement("th");
    numGoodPairsHeader.innerHTML = numGoodPairs;
    row.appendChild(elementHeader);
    row.appendChild(countHeader);
    row.appendChild(numGoodPairsHeader);
    outputTable.appendChild(row);

    await new Promise((resolve) =>
      setTimeout(() => {
        resolve();
      }, 3000)
    );

    inputBlocks[i].style.backgroundColor = "#ff5858";
  }
  startBtn.disabled = false;
}

function createBlock(i, label) {
  const block = document.createElement("div");
  block.classList.add("block");
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
