const inputDiv = document.getElementById("input");
let numGoodPairsTag = document.getElementById("pairs");
var startBtn = document.getElementById("startBtn");
var outputTable = document.getElementById("output-table");
generateInputBlocks();
startBtn.addEventListener("click", function () {
  $("label").remove();
  $(".block").remove();
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
  let goodPairsIndexes = {}
  let inputBlocks = inputDiv.querySelectorAll(".block");

  for (let i = 0; i < inputBlocks.length; i += 1) {
    inputBlocks[i].style.backgroundColor = "#58B7FF";
    const blockValue = inputBlocks[i].firstElementChild.innerHTML;
    const value = parseInt(blockValue, 10);
    if (value in numOccurences) {
      inputBlocks[i].style.backgroundColor = "#FFFF00";
      let currentGoodPairIndexes = goodPairsIndexes[value];
      for(let j = 0; j<currentGoodPairIndexes.length; j++) {
        const row = document.createElement("tr");
        const indexPairCell = document.createElement("th");
        indexPairCell.innerHTML = `(${currentGoodPairIndexes[j]}, ${i})`
        row.append(indexPairCell);
        outputTable.append(row);
      }
      goodPairsIndexes[value].push(i);
      numGoodPairs += numOccurences[value];
      numOccurences[value] += 1;
    } else {
      numOccurences[value] = 1;
      goodPairsIndexes[value] = [i];
      
    }
    numGoodPairsTag.innerHTML = numGoodPairs;
    await new Promise((resolve) =>
      setTimeout(() => {
        resolve();
      }, 2000)
    );

    inputBlocks[i].style.backgroundColor = "#ff5858";
  }
  console.log(goodPairsIndexes);
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
