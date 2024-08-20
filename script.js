const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth * 0.8;
canvas.height = window.innerHeight * 0.6;

let drawing = false;
let color = '#000000';
let thickness = 5;

canvas.addEventListener('mousedown', () => {
    drawing = true;
    ctx.beginPath();
});

canvas.addEventListener('mouseup', () => {
    drawing = false;
});

canvas.addEventListener('mousemove', (event) => {
    if (!drawing) return;
    ctx.lineWidth = thickness;
    ctx.lineCap = 'round';
    ctx.strokeStyle = color;
    ctx.lineTo(event.clientX - canvas.offsetLeft, event.clientY - canvas.offsetTop);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(event.clientX - canvas.offsetLeft, event.clientY - canvas.offsetTop);
});

document.getElementById('color').addEventListener('input', (event) => {
    color = event.target.value;
});

document.getElementById('thickness').addEventListener('input', (event) => {
    thickness = event.target.value;
});

document.getElementById('save').addEventListener('click', () => {
    const dataURL = canvas.toDataURL();
    localStorage.setItem('drawing', dataURL);
    alert('Рисунок сохранен!');
});

document.getElementById('clear').addEventListener('click', () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
});

window.addEventListener('load', () => {
    const dataURL = localStorage.getItem('drawing');
    if (dataURL) {
        const img = new Image();
        img.src = dataURL;
        img.onload = () => {
            ctx.drawImage(img, 0, 0);
        };
    }
});
