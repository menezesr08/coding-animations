const numsDiv = document.getElementById("nums");
const increasingNumsDiv = document.getElementById("increasingNums");
var outputTable = document.getElementById("output-table");
var nums = [];
var operations = {};
var startBtn = document.getElementById("startBtn");
let sumTag = document.getElementById("sum");
generateInputBlocks();
startBtn.addEventListener("click", function () {
  if (!nums || nums.length === 0) {
    $("label").remove();
    $(".block").remove();
    $(".values").remove();
    $(".increasing").remove();
    generateInputBlocks();
  }
  sumTag.innerHTML = 0;
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

async function generateIncreasingBlocks() {
  let inputBlocks = numsDiv.querySelectorAll(".block");
  inputBlocks[0].style.backgroundColor = "#ffff00";
  const block = createBlock(0, nums[0], "increasing");
  increasingNumsDiv.append(block);
  await addDelay(3000);
  inputBlocks[0].style.backgroundColor = "#ff5858";
  for (let i = 1; i < nums.length; i++) {
    inputBlocks[i].style.backgroundColor = "#ffff00";
    if (nums[i] <= nums[i - 1]) {
      const difference = nums[i - 1] - nums[i] + 1;
      operations[i] = difference;
      nums[i] = nums[i] + difference;
      const block = createBlock(i, nums[i], "increasing");
      block.style.backgroundColor = "#FFA500";
      increasingNumsDiv.append(block);

      const row = document.createElement("tr");
      row.classList.add("values");
      row.id = i;
      const differenceCell = document.createElement("th");
      differenceCell.innerHTML = difference;
      row.append(differenceCell);
      outputTable.append(row);
    } else {
      const block = createBlock(i, nums[i], "increasing");
      increasingNumsDiv.append(block);
    }
    await addDelay(3000);
    inputBlocks[i].style.backgroundColor = "#ff5858";
  }
}

async function generateOutput() {
  let sum = 0;
  for (const index in operations) {
    let selectedRow = document.getElementById(index);
    selectedRow.style.backgroundColor = "#FFFF00";
    sum += operations[index];
    sumTag.innerHTML = sum;
    await addDelay(3000);
    selectedRow.style.backgroundColor = "";
  }
}

async function solution() {
  generateIncreasingBlocks().then(function (value) {
    generateOutput().then(function (value) {
      nums = [];
      operations = {};
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
