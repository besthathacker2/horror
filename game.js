const text = document.getElementById('text');
const title = document.getElementById('title');

let fear = 0;
let clicks = 0;
let startTime = Date.now();
let mouseHistory = [];

if(localStorage.getItem('mirror_state') === 'infected') {
    document.body.innerHTML = '<div style="display:flex;align-items:center;justify-content:center;height:100vh;color:red;font-size:3rem;background:black;">CORRUPTED MEMORY DETECTED</div>';
}

document.addEventListener('mousemove', e => {
    mouseHistory.push({x:e.clientX,y:e.clientY});

    if(mouseHistory.length > 50){
        mouseHistory.shift();
    }

    if(Math.random() < 0.0007){
        document.body.style.filter = 'invert(1)';

        setTimeout(() => {
            document.body.style.filter = 'invert(0)';
        }, 100);
    }
});

document.addEventListener('click', () => {
    clicks++;
});

setInterval(() => {
    if(Math.random() < 0.15){
        document.title = 'DON'T LOOK AWAY';

        setTimeout(() => {
            document.title = 'THE MIRROR ROOM';
        }, 500);
    }
}, 4000);

function choose(choice){

    const hesitation = (Date.now() - startTime) / 1000;

    if(hesitation > 8){
        fear += 2;
    }

    if(choice === 'mirror'){

        fear += 3;

        title.classList.add('glitch');

        text.innerHTML = `
            Your reflection is smiling.<br><br>
            You are not smiling.
        `;

        setTimeout(() => {
            text.innerHTML = 'Why did you look?';
        }, 3000);
    }

    else if(choice === 'door'){

        fear += 1;

        text.innerHTML = `
            The door leads back into the same room.
        `;
    }

    else if(choice === 'sit'){

        fear += 2;

        text.innerHTML = `
            You sit quietly.<br><br>
            Something sits beside you.
        `;
    }

    analyzeMovement();

    setTimeout(runPsychologyCheck, 4000);
}

function analyzeMovement(){

    let chaos = 0;

    for(let i = 1; i < mouseHistory.length; i++){
        chaos += Math.abs(mouseHistory[i].x - mouseHistory[i - 1].x);
    }

    if(chaos > 3500){
        text.innerHTML += '<br><br>Your hands are shaking.';
    }
}

function runPsychologyCheck(){

    if(fear > 5){

        document.body.style.background = '#120000';

        text.innerHTML = `
            We know you are uncomfortable now.
        `;

        setTimeout(() => {
            text.innerHTML = 'Most people stop playing around this point.';
        }, 3000);
    }

    if(clicks > 12){
        setTimeout(() => {
            text.innerHTML = `
                Repeated behavior detected.<br><br>
                Anxiety response increasing.
            `;
        }, 5000);
    }

    if(Math.random() < 0.35){
        fakeCrash();
    }
}

function fakeCrash(){

    localStorage.setItem('mirror_state', 'infected');

    document.body.innerHTML = `
        <div style="
            width:100vw;
            height:100vh;
            display:flex;
            align-items:center;
            justify-content:center;
            background:black;
            color:white;
            font-family:monospace;
            font-size:2rem;
        ">
            FATAL ERROR
        </div>
    `;

    setTimeout(() => {
        location.reload();
    }, 3000);
}