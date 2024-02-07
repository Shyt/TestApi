const socket = io(); //const socket = io('http://localhost:3000');

const form = document.getElementById('userForm');
const switchAreaDiv = document.getElementById('switchArea');
const switchBtn = document.getElementById('switchButton');
const gameArea = document.getElementById('gameArea');

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');


let clientRoom;
let userName;

let clientBalls = {};
let selfID;

socket.on('connect', () => {
    selfID = socket.id;
});


socket.on('serverMsg', (data) => {
    clientRoom = data;
    document.getElementById('playerWelcome').innerHTML = `Hi, enter your nickname and start to play (in room no.${data}) `;
});


socket.on('switchFromServer', () => {
    if(document.body.style.background === 'darkgray'){
        document.body.style.background = 'white';
    }else{
        document.body.style.background = 'darkgray';
    }
});

switchBtn.addEventListener('click', () => {
    socket.emit('buttonPressed', clientRoom);
});

form.onsubmit = function(e) {
    e.preventDefault();
    form.style.display = "none";
    switchAreaDiv.style.display = "block";
    gameArea.style.display = "block";

    userName = document.getElementById('userName').value;

    ctx.font = '30px Arial';
    ctx.fillStyle = 'green';
    ctx.textAlign = 'left';
    ctx.fillText(userName, 30, 70);


    return false;
}