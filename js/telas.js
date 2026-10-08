//ERRO NAS QUESTIONS
let pergunta1Respondida = false;
let pergunta2Respondida = false;

// CURSOR

const glow =
document.querySelector(".cursor-glow");

document.addEventListener("mousemove", (e) => {

    glow.style.left = e.clientX + "px";

    glow.style.top = e.clientY + "px";

});


// ANIMAÇÃO AO CLICAR NAS OPÇÕES

const perguntas =
document.querySelectorAll(".question-box");

perguntas.forEach((pergunta, index) => {

    const botoes =
    pergunta.querySelectorAll(".option");

    botoes.forEach((botao) => {

        /*negocio pra nn bugar tudo*/ 

        botao.addEventListener("click", () => {

            botoes.forEach((b) => {

                b.classList.remove("active");

            });

            botao.classList.add("active");

            if(index === 0){

                pergunta1Respondida = true;

            }else{

                pergunta2Respondida = true;

            }

        });

    });

});


/*QUARTINHOS*/
const roomCards =
document.querySelectorAll(".room-card");

roomCards.forEach((card) => {

    card.addEventListener("click", () => {

        roomCards.forEach((c) => {

            c.classList.remove("active");

        });

        card.classList.add("active");

        pergunta1Respondida = true;

    });

});

/*PARA NN CONTINUAR */
const continuar =
document.querySelector(".next-btn");

const erro =
document.querySelector(".erro-msg");

continuar.addEventListener("click", (e) => {

    if(!pergunta1Respondida ||
       !pergunta2Respondida){

        e.preventDefault();

        erro.style.display = "block";

        erro.classList.remove("warning-animation");

        void erro.offsetWidth;

        erro.classList.add("warning-animation");

    }

});
