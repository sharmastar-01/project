const months = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
const days = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

// Create the text elements dynamically
function initRings() {
    createElements('month-ring', months);
    createElements('day-ring', days);
    createElements('date-ring', Array.from({length: 31}, (_, i) => (i + 1).toString().padStart(2, '0')));
}

function createElements(id, data) {
    const ring = document.getElementById(id);
    const step = 360 / data.length;
    data.forEach((text, i) => {
        const span = document.createElement('span');
        span.innerText = text;
        span.style.transform = `translate(-50%, -100%) rotate(${i * step}deg)`;
        ring.appendChild(span);
    });
}

function updateClock() {
    const now = new Date();
    
    // 1. Analog Movement
    const s = now.getSeconds();
    const m = now.getMinutes();
    const h = now.getHours();
    
    document.getElementById('sec-hand').style.transform = `translateX(-50%) rotate(${s * 6}deg)`;
    document.getElementById('min-hand').style.transform = `translateX(-50%) rotate(${m * 6}deg)`;
    document.getElementById('hour-hand').style.transform = `translateX(-50%) rotate(${(h * 30) + (m / 2)}deg)`;

    // 2. Digital Update
    const dTime = `${h.toString().padStart(2,'0')}:${m.toString().padStart(2,'0')}:${s.toString().padStart(2,'0')}`;
    document.getElementById('digital-clock').innerText = dTime;

    // 3. Ring Rotations
    const curMonth = now.getMonth();
    const curDay = now.getDay();
    const curDate = now.getDate() - 1;

    rotateRing('month-ring', curMonth, 12);
    rotateRing('day-ring', curDay, 7);
    rotateRing('date-ring', curDate, 31);
}

function rotateRing(id, index, total) {
    const ring = document.getElementById(id);
    ring.style.transform = `rotate(-${index * (360 / total)}deg)`;
    
    // Highlight Active
    ring.querySelectorAll('span').forEach((span, i) => {
        span.classList.toggle('active', i === index);
    });
}

// Start
initRings();
setInterval(updateClock, 1000);
updateClock();