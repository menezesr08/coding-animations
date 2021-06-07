const numsDiv = document.getElementById("nums");
const outputDiv = document.getElementById("output");
var startBtn = document.getElementById("startBtn");
var nums = []

generateInputBlocks();
startBtn.addEventListener("click", function () {
  if(!nums || !nums.length) {
    $(".block").remove();
    generateInputBlocks();
  }
  solution();
  startBtn.disabled = true;

});

function generateInputBlocks(num = 5) {
  if (num && typeof num !== "number") {
    alert("First argument must be a typeof Number");
    return;
  }
  for (let i = 0; i < num; i += 1) {
    const value = Math.floor(Math.random() * 10);
    nums.push(value);
    const block = createBlock(i, value);
    numsDiv.appendChild(block);
  }
}

async function solution() {
  let sums = [];
  let inputBlocks = numsDiv.querySelectorAll(".block");
  inputBlocks[0].style.backgroundColor = "#58B7FF";
  const firstOuputBlockValue = inputBlocks[0].firstElementChild.innerHTML;
  let firstOutputBlock = createBlock(0, firstOuputBlockValue);
  firstOutputBlock.style.backgroundColor = "#58B7FF";
  outputDiv.appendChild(firstOutputBlock);
  sums[0] = parseInt(firstOuputBlockValue, 10);

  await new Promise((resolve) =>
    setTimeout(() => {
      resolve();
    }, 3000)
  );

  for (let i = 1; i < inputBlocks.length; i += 1) {
    inputBlocks[i].style.backgroundColor = "#58B7FF";

    let outputBlocks = outputDiv.querySelectorAll(".block");
    outputBlocks[i - 1].style.backgroundColor = "#ff5858";

    const blockValue = inputBlocks[i].firstElementChild.innerHTML;
    sums[i] = sums[i - 1] + parseInt(blockValue, 10);
    const block = createBlock(i, sums[i]);
    block.style.backgroundColor = "#58B7FF";
    outputDiv.append(block);
    await new Promise((resolve) =>
      setTimeout(() => {
        resolve();
      }, 2000)
    );
  }

  nums = []
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
