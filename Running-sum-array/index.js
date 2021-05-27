const inputContainer = document.querySelector(".data-container");
const outputContainer = document.querySelector(".second-data-container");
var startBtn = document.getElementById("startBtn");
startBtn.addEventListener("click", function () {
  $(".block").remove();
  startBtn.disabled = true;
  generateBlocks();
  solution();
});

function generateBlocks(num = 5) {
  if (num && typeof num !== "number") {
    alert("First argument must be a typeof Number");
    return;
  }
  for (let i = 0; i < num; i += 1) {
    const value = Math.floor(Math.random() * 10);
    const block = createBlock(i, value);
    inputContainer.appendChild(block);
  }
}

async function solution() {
  var sums = [];
  let inputBlocks = inputContainer.querySelectorAll(".block");
  inputBlocks[0].style.backgroundColor = "#58B7FF";
  const firstOuputBlockValue = inputBlocks[0].firstElementChild.innerHTML;
  let firstOutputBlock = createBlock(0, firstOuputBlockValue);
  firstOutputBlock.style.backgroundColor = "#58B7FF";
  outputContainer.appendChild(firstOutputBlock);
  sums[0] = parseInt(firstOuputBlockValue, 10);
  console.log("test");

  await new Promise((resolve) =>
    setTimeout(() => {
      resolve();
    }, 3000)
  );

  for (let i = 1; i < inputBlocks.length; i += 1) {
    inputBlocks[i].style.backgroundColor = "#58B7FF";

    let outputBlocks = outputContainer.querySelectorAll(".block");
    console.log(outputBlocks);
    outputBlocks[i - 1].style.backgroundColor = "#ff5858";

    const blockValue = inputBlocks[i].firstElementChild.innerHTML;
    sums[i] = sums[i - 1] + parseInt(blockValue, 10);
    const block = createBlock(i, sums[i]);
    block.style.backgroundColor = "#58B7FF";
    outputContainer.append(block);
    await new Promise((resolve) =>
      setTimeout(() => {
        resolve();
      }, 2000)
    );
  }
  startBtn.disabled = false;
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
