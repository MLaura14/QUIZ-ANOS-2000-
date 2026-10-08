// TEXTO DIGITANDO

const frases = [

    "Seu alter ego dos anos 2000 te espera...",
    "Descubra sua energia anos 2000...",
    "Você é caos, glamour ou velocidade?"

];

let fraseIndex = 0;
let letraIndex = 0;

const typing = document.querySelector(".typing");

function escrever(){

    if(letraIndex < frases[fraseIndex].length){

        typing.innerHTML += frases[fraseIndex].charAt(letraIndex);

        letraIndex++;

        setTimeout(escrever, 60);

    } else {

        setTimeout(apagar, 2000);

    }
}

function apagar(){

    if(letraIndex > 0){

        typing.innerHTML =
        frases[fraseIndex].substring(0, letraIndex - 1);

        letraIndex--;

        setTimeout(apagar, 30);

    } else {

        fraseIndex++;

        if(fraseIndex >= frases.length){

            fraseIndex = 0;
        }

        setTimeout(escrever, 500);
    }
}

escrever();


// CARD 3D

const card = document.querySelector(".glass-card");

document.addEventListener("mousemove", (e) => {

    let x =
    (window.innerWidth / 2 - e.pageX) / 25;

    let y =
    (window.innerHeight / 2 - e.pageY) / 25;

    card.style.transform =
    `rotateY(${x}deg) rotateX(${-y}deg)`;

});


// CURSOR GLOW

const glow =
document.querySelector(".cursor-glow");

document.addEventListener("mousemove", (e) => {

    glow.style.left = e.clientX + "px";

    glow.style.top = e.clientY + "px";

});

