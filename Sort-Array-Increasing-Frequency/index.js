const numsDiv = document.getElementById("nums");
const decreasingNumsDiv = document.getElementById("decreasingNums");
const outputDiv = document.getElementById("output");
var outputTable = document.getElementById("output-table");
var nums = [];
var decreasingNums;
var mapping = new Map();
var startBtn = document.getElementById("startBtn");
generateInputBlocks();
startBtn.addEventListener("click", function () {
  if (!nums || nums.length === 0) {
    $(".block").remove();
    $(".values").remove();
    $(".sorted").remove();
    $(".outputBlock").remove();
    generateInputBlocks();
  }
  startBtn.disabled = true;
  solution();
});

function generateInputBlocks(numBlocks = 5) {
  for (let i = 0; i < numBlocks; i++) {
    const randomNumber = Math.floor(Math.random() * 5) + 1;
    nums.push(randomNumber);
    const block = createBlock(i, randomNumber);
    numsDiv.append(block);
  }
}

function generateSortedBlocks() {
  decreasingNums = [...nums].sort(function (a, b) {
    return b - a;
  });
  const block = createBlock(0, decreasingNums[0], "sorted");
  decreasingNumsDiv.append(block);
  for (let i = 1; i < decreasingNums.length; i++) {
    const block = createBlock(i, decreasingNums[i], "sorted");
    decreasingNumsDiv.append(block);
  }
}

async function mapValues() {
  let sortedBlocks = numsDiv.querySelectorAll(".block");
  for (let i = 0; i < nums.length; i++) {
    sortedBlocks[i].style.backgroundColor = "#ffff00";
    if (!mapping.has(nums[i])) {
      mapping.set(nums[i], 1);
      const row = document.createElement("tr");
      row.classList.add("values");
      row.id = nums[i];
      const elementCell = document.createElement("th");
      elementCell.innerHTML = nums[i];
      const frequencyCell = document.createElement("th");
      frequencyCell.classList.add("frequency");
      frequencyCell.innerHTML = 1;
      row.append(elementCell);
      row.append(frequencyCell);

      outputTable.appendChild(row);
    } else {
      let existingRow = document.getElementById(nums[i].toString());
      let frequency = existingRow.querySelector(".frequency");
      mapping.set(nums[i], mapping.get(nums[i]) + 1);
      frequency.innerHTML = mapping.get(nums[i]);
    }
    await addDelay(3000);
    sortedBlocks[i].style.backgroundColor = "#6699ff";
  }
  await addDelay(1000);
}

async function generateOutputBlocks() {
  var increasingFrequency = [...decreasingNums].sort(function (a, b) {
    return mapping.get(a) - mapping.get(b);
  });
  for (let i = 0; i < increasingFrequency.length; i++) {
    let selectedRow = document.getElementById(increasingFrequency[i]);
    selectedRow.style.backgroundColor = "#FFFF00";
    let outputBlock = createBlock(i, increasingFrequency[i], "outputBlock");
    outputDiv.append(outputBlock);

    await addDelay(3000);
    selectedRow.style.backgroundColor = "";
  }
}

async function solution() {
  mapValues()
    .then(async function (value) {
      generateSortedBlocks();
      await addDelay(3000);
    })
    .then(function (value) {
      generateOutputBlocks().then(function (value) {
        nums = [];
        decreasingNums = [];
        mapping = new Map();
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

function addDelay(time) {
  let promise = new Promise((resolve) =>
    setTimeout(() => {
      resolve();
    }, time)
  );
  return promise;
}
