const numsDiv = document.getElementById("nums");
const outputTag = document.getElementById("output");
var outputTable = document.getElementById("output-table");
const nums = [1, 4, 2, 5, 3];
var startBtn = document.getElementById("startBtn");
generateInputBlocks();
startBtn.addEventListener("click", function () {
  startBtn.disabled = true;
  $("label").remove();
  $(".block").remove();
  $(".values").remove();
  $(".outputBlock").remove();
  generateInputBlocks();
  outputTag.innerHTML = 0;

  solution();
});

function generateInputBlocks(numBlocks = 5) {
  let standardLabelMargin = 51;
  let label = createIndexLabel(0, 22);
  let block = createBlock(0, nums[0]);
  block.id = nums[0];
  numsDiv.appendChild(label);
  numsDiv.appendChild(block);
  for (let i = 1; i < numBlocks; i++) {
    const label = createIndexLabel(i, standardLabelMargin);
    const block = createBlock(i, nums[i]);
    block.id = nums[i];
    numsDiv.append(label);
    numsDiv.append(block);
  }
}

async function generateSubarrays() {
  let total = 0;

  for (let i = 0; i < nums.length; i++) {
    let k = i;
    total += nums[i];
    outputTag.innerHTML = total;
    let row = createRow(nums[i], nums[i], i, k);
    outputTable.appendChild(row);
    let block = document.getElementById(nums[i].toString());
    block.style.backgroundColor = "#ffff00";
    await addDelay(1500);
    block.style.backgroundColor = "#ff5858";
    k = k + 2;
    await addDelay(1500);
    while (k < nums.length) {
      let subArray = nums.slice(i, k + 1);
      for (let i = 0; i < subArray.length; i++) {
        let block = document.getElementById(subArray[i].toString());
        block.style.backgroundColor = "#ffff00";
      }
      let subArraySum = subArray.reduce((a, b) => a + b, 0);
      total += subArraySum;
      outputTag.innerHTML = total;
      let row = createRow(subArray, subArraySum, i, k);
      outputTable.appendChild(row);
      await addDelay(1500);
      for (let i = 0; i < subArray.length; i++) {
        let block = document.getElementById(subArray[i].toString());
        block.style.backgroundColor = "#ff5858";
      }
      k = k + 2;
      await addDelay(1500);
    }
  }
}

function createRow(subArray, sum, i, k) {
  const row = document.createElement("tr");
  row.classList.add("values");

  const subArrayText = document.createElement("th");
  subArrayText.innerHTML = subArray;

  const sumText = document.createElement("th");
  sumText.innerHTML = sum;

  const indexText = document.createElement("th");
  indexText.innerHTML = i;

  const kText = document.createElement("th");
  kText.innerHTML = k;

  row.append(subArrayText);
  row.append(sumText);
  row.append(indexText);
  row.append(kText);
  return row;
}

async function solution() {
  generateSubarrays().then(function (value) {
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
