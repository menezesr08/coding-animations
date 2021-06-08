const inputDiv = document.getElementById("input");
const outputDiv = document.getElementById("output");
var startBtn = document.getElementById("startBtn");
var nums = [];

generateInputBlocks();
startBtn.addEventListener("click", function () {
  if (!nums || !nums.length) {
    $(".block").remove();
    generateInputBlocks();
  }
  solution();
  startBtn.disabled = true;
});

function generateInputBlocks(num = 6) {
  if (num && typeof num !== "number") {
    alert("First argument must be a typeof Number");
    return;
  }
  for (let i = 0; i < num; i += 1) {
    const value = Math.floor(Math.random() * 20);
    nums.push(value);
    const block = createBlock(i, value);
    inputDiv.appendChild(block);
  }
}

async function solution() {
  let inputBlocks = inputDiv.querySelectorAll(".block");
  // j controls the index of the output blocks
  var j = -1;

  for (let i = 0; i < 3; i += 1) {
    inputBlocks[i].style.backgroundColor = "#58B7FF";
    const firstOutputBlockValue = inputBlocks[i].firstElementChild.innerHTML;
    const firstOutputBlock = createBlock((j += 1), firstOutputBlockValue);
    firstOutputBlock.style.backgroundColor = "#58B7FF";
    outputDiv.append(firstOutputBlock);
    await new Promise((resolve) =>
      setTimeout(() => {
        resolve();
      }, 2000)
    );
    inputBlocks[i + 3].style.backgroundColor = "#90ee90";
    const secondOutputBlockValue = inputBlocks[i + 3].firstElementChild.innerHTML;
    const secondOutputBlock = createBlock((j += 1), secondOutputBlockValue);
    secondOutputBlock.style.backgroundColor = "#90ee90";
    outputDiv.append(secondOutputBlock);
    await new Promise((resolve) =>
      setTimeout(() => {
        resolve();
      }, 2000)
    );
  }
  nums = [];
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
