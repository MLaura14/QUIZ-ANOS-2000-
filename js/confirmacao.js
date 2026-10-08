const quiz =
pegarDadosQuiz();

if(!quiz){

location.href =
"../index.html";

}

/* EXIBIR */

document.getElementById(
"nomeSpan"
).textContent =
quiz.nome || "";

document.getElementById(
"emailSpan"
).textContent =
quiz.email || "";

document.getElementById(
"enderecoSpan"
).textContent =
quiz.endereco || "";

document.getElementById(
"estadoSpan"
).textContent =
quiz.estado || "";

document.getElementById(
"sexoSpan"
).textContent =
quiz.sexo || "";

/* IMPRIMIR */

const imprimirBtn =
document.getElementById(
"imprimirBtn"
);

imprimirBtn.addEventListener(
"click",
function(){

    imprimirBtn.style.display =
    "none";

    window.print();

    imprimirBtn.style.display =
    "inline-block";
}
);
