const numsDiv = document.getElementById("nums");
const outputTag = document.getElementById("output");
var outputTable = document.getElementById("output-table");
var startBtn = document.getElementById("startBtn");
var nums = [];
generateInputBlocks();
startBtn.addEventListener("click", function () {
  startBtn.disabled = true;
  if (!nums || nums.length === 0) {
    $(".block").remove();
    $(".values").remove();
    generateInputBlocks();
  }
  solution();
  outputTag.innerHTML = 0;
});

function generateInputBlocks(numBlocks = 5) {
  if (numBlocks && typeof numBlocks !== "number") {
    alert("First argument must be a typeof Number");
    return;
  }
  for (let i = 0; i < numBlocks; i += 1) {
    const value = Math.floor(Math.random() * 20);
    nums.push(value);
    const block = createBlock(i, value);
    numsDiv.appendChild(block);
  }
}

async function generateRowsInTable() {
  let first = 0;
  let second = 0;
  let inputBlocks = numsDiv.querySelectorAll(".block");
  for (let i = 0; i < nums.length; i++) {
    inputBlocks[i].style.backgroundColor = "#58B7FF";
    if (nums[i] > first) {
      second = first;
      first = nums[i];
    } else {
      second = Math.max(second, nums[i]);
    }
    let row = createRow(first, second);
    outputTable.appendChild(row);
    await addDelay(2000);
  }

  outputTag.innerHTML = (first - 1) * (second - 1);
}

function createRow(first, second) {
  const row = document.createElement("tr");
  row.classList.add("values");

  const firstText = document.createElement("th");
  firstText.innerHTML = first;

  const secondText = document.createElement("th");
  secondText.innerHTML = second;

  row.append(firstText);
  row.append(secondText);
  return row;
}

async function solution() {
  generateRowsInTable().then(function (value) {
    startBtn.disabled = false;
    nums = [];
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
