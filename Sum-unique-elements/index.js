const inputDiv = document.getElementById("input");
var outputTable = document.getElementById("output-table");
let sumTag = document.getElementById("sum");
var nums = [];
var mapping = {};
var startBtn = document.getElementById("startBtn");

generateInputBlocks();

startBtn.addEventListener("click", function () {
  if (!nums || nums.length === 0) {
    $(".block").remove();
    $(".values").remove();
    generateInputBlocks();
  }
  startBtn.disabled = true;
  sumTag.innerHTML = "0";
  solution();
});

function generateInputBlocks(numBlocks = 5) {
  for (let i = 0; i < numBlocks; i++) {
    const randomNumber = Math.floor(Math.random() * 5) + 1;
    nums.push(randomNumber);
    const block = createBlock(i, randomNumber);
    inputDiv.append(block);
  }
}

async function mapValues() {
  let inputBlocks = inputDiv.querySelectorAll(".block");
  for (let i = 0; i < nums.length; i++) {
    inputBlocks[i].style.backgroundColor = "#ffff00";
    if (!(nums[i] in mapping)) {
      mapping[nums[i]] = 1;

      const row = document.createElement("tr");
      row.classList.add("values");
      row.id = nums[i];

      const elementCell = document.createElement("th");
      elementCell.classList.add("element");
      elementCell.innerHTML = nums[i];

      const countCell = document.createElement("th");
      countCell.classList.add("count");
      countCell.innerHTML = 1;

      row.append(elementCell);
      row.append(countCell);
      outputTable.appendChild(row);
    } else {
      let existingRow = document.getElementById(nums[i].toString());
      let count = existingRow.querySelector(".count");
      count.innerHTML = mapping[nums[i]] += 1;
    }

    await addDelay(3000);
    inputBlocks[i].style.backgroundColor = "#6699ff";
  }
}

async function generateOutput() {
  let sum = 0;
  let uniqueNums = nums.filter(onlyUnique);
  console.log(uniqueNums);
  for (let i = 0; i < uniqueNums.length; i++) {
    let selectedRow = document.getElementById(uniqueNums[i].toString());
    if (mapping[uniqueNums[i]] === 1) {
      selectedRow.style.backgroundColor = "#90ee90";
      sum += parseInt(uniqueNums[i], 10);
      sumTag.innerHTML = sum;
    } else {
      selectedRow.style.backgroundColor = "#ff0000";
    }
    await addDelay(3000);
    selectedRow.style.backgroundColor = "";
  }
}

async function solution() {
  mapValues().then(function (value) {
    generateOutput().then(function (value) {
      nums = [];
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

function onlyUnique(value, index, self) {
  return self.indexOf(value) === index;
}
