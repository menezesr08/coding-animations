const inputContainer = document.getElementById("input-container");
const outputContainer = document.getElementById("output-container");
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
    inputContainer.appendChild(block);
  }
}

async function solution() {
  let inputBlocks = inputContainer.querySelectorAll(".block");
  var j = -1;

  for (let i = 0; i < 3; i += 1) {
    inputBlocks[i].style.backgroundColor = "#58B7FF";
    const firstBlockValue = inputBlocks[i].firstElementChild.innerHTML;
    const firstBlock = createBlock((j += 1), firstBlockValue);
    firstBlock.style.backgroundColor = "#58B7FF";
    outputContainer.append(firstBlock);
    await new Promise((resolve) =>
      setTimeout(() => {
        resolve();
      }, 2000)
    );
    inputBlocks[i + 3].style.backgroundColor = "#90ee90";
    const secondBlockValue = inputBlocks[i + 3].firstElementChild.innerHTML;
    const secondBlock = createBlock((j += 1), secondBlockValue);
    secondBlock.style.backgroundColor = "#90ee90";
    outputContainer.append(secondBlock);
    await new Promise((resolve) =>
      setTimeout(() => {
        resolve();
      }, 2000)
    );
  }
  resetValues();
}

function createBlock(i, label) {
  const block = document.createElement("div");
  block.classList.add("block");
  block.style.transform = `translateX(${i * 60}px)`;

  const blockLabel = document.createElement("label");
  blockLabel.classList.add("block__id");
  blockLabel.innerHTML = label;

  block.appendChild(blockLabel);

  return block;
}

function resetValues() {
  nums = [];
  startBtn.disabled = false;
}
