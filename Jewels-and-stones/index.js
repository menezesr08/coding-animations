const stonesDiv = document.getElementById("stones");
const jewelsDiv = document.getElementById("jewels");
var startBtn = document.getElementById("startBtn");
let output = document.getElementById("output");

function generateInputBlocks() {
  let stones = ["b", "a", "A", "A", "b", "b", "b", "a"];
  let jewels = ["a", "A"];

  for (let i = 0; i < stones.length; i++) {
    stonesDiv.appendChild(createBlock(i, stones[i], "stone"));
  }

  for (let i = 0; i < jewels.length; i++) {
    jewelsDiv.appendChild(createBlock(i, jewels[i], "jewel"));
  }
}

// we can differentiate blocks by passing in a type parameter
function createBlock(i, label, type) {
  const block = document.createElement("div");
  const blockLabel = document.createElement("p");
  if (type === "stone") {
    block.classList.add("stone");
    blockLabel.classList.add("stoneLabel");
  } else {
    block.classList.add("jewel");
    blockLabel.classList.add("jewelLabel");
  }
  block.style.transform = `translateX(${i * 60}px)`;

  blockLabel.innerHTML = label;

  block.appendChild(blockLabel);

  return block;
}

async function solution() {
  let stoneDivs = stonesDiv.querySelectorAll(".stone");
  let jewelsDivs = jewelsDiv.querySelectorAll(".jewel");
  let jewels = ["a", "A"];
  let stonesThatAreJewels = 0;
  for (let i = 0; i < stoneDivs.length; i++) {
    stoneDivs[i].style.backgroundColor = "#fafa02";
    const stone = stoneDivs[i].firstElementChild.innerHTML;
    let jewelIndex = jewels.indexOf(stone);
    if (jewelIndex > -1) {
      jewelsDivs[jewelIndex].style.backgroundColor = "#fafa02";
      stonesThatAreJewels++;
    }
    output.innerHTML = stonesThatAreJewels;
    await new Promise((resolve) =>
      setTimeout(() => {
        resolve();
      }, 2000)
    );
    stoneDivs[i].style.backgroundColor = "#ff5858";
    if (jewelIndex > -1) {
      jewelsDivs[jewelIndex].style.backgroundColor = "#ff69b4";
    }
  }
  startBtn.disabled = false;
}

generateInputBlocks();

startBtn.addEventListener("click", function () {
  // remove all blocks if user restarts the animation
  $(".stone").remove();
  $(".jewel").remove();
  startBtn.disabled = true;
  generateInputBlocks();
  solution();
});
