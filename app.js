const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext('2d');
const colors = document.getElementsByClassName('jsColor');
const range = document.getElementById('jsRange');
const mode = document.getElementById('jsMode');
const clear = document.getElementById('jsClear');
const saveBtn = document.getElementById('jsSave');

const initial_color = "#2c2c2c";

canvas.width = document.getElementsByClassName("canvas")[0].offsetWidth;
canvas.height = document.getElementsByClassName("canvas")[0].offsetHeight;

ctx.clearRect(0, 0, canvas.width, canvas.height);
ctx.fillStyle = "white"; // 캔버스 기본 색상

ctx.strokeStyle = initial_color; // 선색 기본값
ctx.lineWidth = 2.5; // 선 두께

let painting = false;
let filling = false;

function stopPainting(){
  painting = false;
}

function startPainting(){
  if (filling === false) {
    painting = true;
  }
}

function onMouseMove(event){
  const x = event.offsetX;
  const y = event.offsetY;
  if(!painting){ // 경로 만들기
    ctx.beginPath(); //경로 생성
    ctx.moveTo(x, y); //선 시작 좌표

    
  } else { // 그리기
    ctx.lineTo(x, y); //선 끝 좌표
    ctx.stroke(); //선 그리기    
  }
}

function handleColorClick(event){
  const color = event.target.style.backgroundColor;
  ctx.strokeStyle = color;
  ctx.fillStyle = color;  
}

function handleRangeChange(event){
  const range = event.target.value; // range를 움직였을 때 두께 가져오기
  ctx.lineWidth = range;
}

function handleModeClick(){
  if(filling === true){
    filling = false;
    mode.innerText = "Fill";
  } else {
    filling = true;
    mode.innerText = "Paint";
    ctx.fillStyle = ctx.strokeStyle;
  }
}

function handleCanvasClick(){
  if(filling){
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  } else {
  }
}

function clearCanvas(){
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = 'white'; 
}

function handleContextMenu(event){
  event.preventDefault();
}

function saveCanvas(){
  const image = canvas.toDataURL("image/png");
  const link = document.createElement("a");
  link.href = image;
  link.download = "painting🎨";
  link.click();
}


if(canvas){
  canvas.addEventListener("mousemove", onMouseMove);
  canvas.addEventListener("mousedown", startPainting);
  canvas.addEventListener("mouseleave", stopPainting);
  canvas.addEventListener("mouseup", stopPainting);
  canvas.addEventListener("click", handleCanvasClick);
  canvas.addEventListener("contextmenu", handleContextMenu);
}

Array.from(colors).forEach(color => color.addEventListener("click", handleColorClick));

if(range){
  range.addEventListener("input", handleRangeChange)
}

if(mode){
  mode.addEventListener("click", handleModeClick);
}

if(clear){
  clear.addEventListener("click", clearCanvas);
}

if(saveBtn){
  saveBtn.addEventListener("click", saveCanvas);
}